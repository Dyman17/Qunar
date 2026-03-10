export type ApiResult<T> = {
  data: T;
  status: number;
};

export type ApiErrorInfo = {
  status: number;
  detail: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_PREFIX = "/api/v1";

const ACCESS_KEY = "qunar_access";
const REFRESH_KEY = "qunar_refresh";

let refreshPromise: Promise<string | null> | null = null;

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const setTokens = (access?: string, refresh?: string) => {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

const buildFriendlyMessage = ({ status, detail, path, method }: { status: number; detail: string; path: string; method: string }) => {
  const detailText = detail || "";
  if (status === 401) return "Сессия истекла. Войдите заново.";
  if (status === 403 && method === "POST" && path === `${API_PREFIX}/farms`) {
    return "Лимит ферм по подписке достигнут. Удали старую ферму или оформи premium.";
  }
  if (status === 403 && detailText.toLowerCase().includes("plot limit exceeded")) {
    return "Лимит ферм по подписке достигнут. Удали старую ферму или оформи premium.";
  }
  if (status === 400 && path.includes("/plants/") && path.endsWith("/harvest")) {
    return "Растение ещё не готово к сбору. Доведите прогресс до 100%.";
  }
  if (status === 400 && detailText.toLowerCase().includes("not ready for harvest")) {
    return "Растение ещё не готово к сбору. Доведите прогресс до 100%.";
  }
  if (status === 400 && detailText.toLowerCase().includes("maximum crops per plot")) {
    return "Лимит растений на ферме достигнут. Освободите место или создайте новую ферму.";
  }
  if (status === 400 && detailText.toLowerCase().includes("maximum sensors per plot")) {
    return "Лимит сенсоров на ферме достигнут. Удалите старый сенсор или создайте новую ферму.";
  }
  if (status === 400 && detailText.toLowerCase().includes("cannot delete farm with existing crops")) {
    return "Нельзя удалить ферму, пока в ней есть растения. Сначала удалите растения.";
  }
  if (status === 422) return "Проверь поля формы. Некоторые значения неверны или не заполнены.";
  if (status === 404) return "Данные не найдены. Проверь идентификатор.";
  return detailText || `Request failed (${status})`;
};

const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${API_BASE}${API_PREFIX}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      });
      const data = await res.json();
      if (!res.ok) {
        clearTokens();
        return null;
      }
      setTokens(data.access_token);
      return data.access_token as string;
    })();
  }
  const token = await refreshPromise;
  refreshPromise = null;
  return token;
};

export const apiRequest = async <T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean; retry?: boolean } = {}
): Promise<ApiResult<T>> => {
  const { method = "GET", body, auth = false, retry = true } = options;
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const raw = await res.text();
  let data: any = raw;
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = raw;
  }

  if (res.status === 401 && auth && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest<T>(path, { method, body, auth, retry: false });
    }
  }

  if (!res.ok) {
    const detail = typeof data === "string" ? data : data?.detail;
    const friendly = buildFriendlyMessage({ status: res.status, detail, path, method });
    const error = new Error(friendly) as Error & ApiErrorInfo;
    error.status = res.status;
    error.detail = detail;
    throw error;
  }

  return { data, status: res.status };
};

export const apiGet = async <T>(path: string, auth = true) => apiRequest<T>(path, { method: "GET", auth });
export const apiPost = async <T>(path: string, body: unknown, auth = true) => apiRequest<T>(path, { method: "POST", body, auth });
export const apiPatch = async <T>(path: string, body: unknown, auth = true) => apiRequest<T>(path, { method: "PATCH", body, auth });
export const apiDelete = async <T>(path: string, auth = true) => apiRequest<T>(path, { method: "DELETE", auth });

export { API_PREFIX };

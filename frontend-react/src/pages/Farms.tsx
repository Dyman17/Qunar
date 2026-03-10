import { useEffect, useMemo, useState } from "react";
import { apiDelete, apiGet, apiPost, API_PREFIX } from "@/api/client";

const farmTemplates = [
  { id: "starter", label: "Starter Farm (5 ha)", size: 5, defaultName: "Starter Farm" },
  { id: "family", label: "Family Farm (10 ha)", size: 10, defaultName: "Family Farm" },
  { id: "pro", label: "Pro Farm (20 ha)", size: 20, defaultName: "Pro Farm" },
  { id: "enterprise", label: "Enterprise Farm (50 ha)", size: 50, defaultName: "Enterprise Farm" },
];

type Farm = {
  id: number;
  name: string;
  size: number;
  created_at: string;
};

const Farms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState<string>("");
  const [locationX, setLocationX] = useState("");
  const [locationY, setLocationY] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const template = useMemo(() => farmTemplates.find((item) => item.id === templateId), [templateId]);

  const loadFarms = async () => {
    setLoading(true);
    try {
      const { data } = await apiGet<Farm[]>(`${API_PREFIX}/farms`);
      setFarms(data || []);
      setMessage(null);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to load farms"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  useEffect(() => {
    if (template) {
      if (!name) setName(template.defaultName);
      if (!size) setSize(String(template.size));
    }
  }, [template, name, size]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const finalSize = Number(size || template?.size || 0);
      if (!finalSize) throw new Error("Укажи размер фермы");
      const payload: any = {
        name: name || template?.defaultName || "Farm",
        size: finalSize,
      };
      if (locationX && locationY) {
        payload.location = { x: Number(locationX), y: Number(locationY) };
      }
      await apiPost(`${API_PREFIX}/farms`, payload);
      setMessage("Успех: ферма создана");
      await loadFarms();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to create farm"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiDelete(`${API_PREFIX}/farms/${id}`);
      setMessage("Успех: ферма удалена");
      await loadFarms();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to delete farm"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>Create Farm</h2>
        <form className="form" onSubmit={handleCreate}>
          <select className="input" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
            <option value="">Select farm type</option>
            {farmTemplates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <input className="input" placeholder="Farm name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
          <input className="input" placeholder="Location X" value={locationX} onChange={(e) => setLocationX(e.target.value)} />
          <input className="input" placeholder="Location Y" value={locationY} onChange={(e) => setLocationY(e.target.value)} />
          <button className="button" type="submit" disabled={loading}>Create Farm</button>
        </form>
        {message && <div className={`notice ${message.startsWith("Ошибка") ? "error" : ""}`}>{message}</div>}
      </div>

      <div className="card">
        <div className="grid" style={{ gap: "8px" }}>
          <h2>Farms</h2>
          <button className="button secondary" onClick={loadFarms} disabled={loading}>
            Reload
          </button>
        </div>
        {farms.length === 0 && <div className="muted">No farms yet.</div>}
        {farms.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((farm) => (
                <tr key={farm.id}>
                  <td>{farm.id}</td>
                  <td>{farm.name}</td>
                  <td>{farm.size}</td>
                  <td>
                    <button className="button secondary" onClick={() => handleDelete(farm.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Farms;

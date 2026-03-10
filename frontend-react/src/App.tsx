import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getAccessToken } from "./api/client";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Plants from "./pages/Plants";
import Sensors from "./pages/Sensors";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { user, loading, logout, refreshUser } = useAuth();

  useEffect(() => {
    if (getAccessToken()) {
      refreshUser();
    }
  }, [refreshUser]);

  const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (loading) return <div className="muted">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>QUNAR Smart Farm</h1>
        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
          <NavLink to="/farms" className={({ isActive }) => (isActive ? "active" : "")}>Farms</NavLink>
          <NavLink to="/plants" className={({ isActive }) => (isActive ? "active" : "")}>Plants</NavLink>
          <NavLink to="/sensors" className={({ isActive }) => (isActive ? "active" : "")}>Sensors</NavLink>
        </nav>
        <div className="muted" style={{ marginTop: "24px" }}>
          Auth
        </div>
        <nav className="nav">
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <div>Smart Farm Console</div>
          <div className="muted">
            {user ? `${user.full_name || user.email} · ${user.subscription_type || "basic"}` : "Guest"}
          </div>
          {user && (
            <button className="button secondary" onClick={logout}>
              Logout
            </button>
          )}
        </header>
        <main className="page">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/farms"
              element={
                <RequireAuth>
                  <Farms />
                </RequireAuth>
              }
            />
            <Route
              path="/plants"
              element={
                <RequireAuth>
                  <Plants />
                </RequireAuth>
              }
            />
            <Route
              path="/sensors"
              element={
                <RequireAuth>
                  <Sensors />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

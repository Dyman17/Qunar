import { useEffect, useMemo, useState } from "react";
import { apiGet, API_PREFIX } from "@/api/client";
import { useAuth } from "@/context/AuthContext";

type Farm = { id: number; name: string; size: number; created_at: string };
type Plant = { id: number; crop_type: string; progress: number; status: string; plot_id: number };
type Sensor = { id: number; sensor_type: string; name?: string | null; plot_id: number };

const Dashboard = () => {
  const { user } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => {
    return {
      farms: farms.length,
      plants: plants.length,
      sensors: sensors.length,
    };
  }, [farms, plants, sensors]);

  const loadDashboard = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const farmsResp = await apiGet<Farm[]>(`${API_PREFIX}/farms`);
      const plantsResp = await apiGet<Plant[]>(`${API_PREFIX}/plants`);
      const sensorsResp = await apiGet<Sensor[]>(`${API_PREFIX}/sensors`);
      setFarms(farmsResp.data || []);
      setPlants(plantsResp.data || []);
      setSensors(sensorsResp.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [user]);

  if (!user) {
    return <div className="muted">Login to see your dashboard.</div>;
  }

  return (
    <div className="grid">
      <div className="grid two">
        <div className="card">
          <h3>Farms</h3>
          <div className="muted">Total: {totals.farms}</div>
        </div>
        <div className="card">
          <h3>Plants</h3>
          <div className="muted">Total: {totals.plants}</div>
        </div>
        <div className="card">
          <h3>Sensors</h3>
          <div className="muted">Total: {totals.sensors}</div>
        </div>
      </div>

      <div className="grid two">
        <div className="card">
          <h3>Your Farms</h3>
          {farms.length === 0 && <div className="muted">No farms yet.</div>}
          <ul className="grid" style={{ gap: "8px" }}>
            {farms.map((farm) => (
              <li key={farm.id} className="card" style={{ padding: "12px" }}>
                <strong>{farm.name}</strong>
                <div className="muted">Size: {farm.size}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Latest Plants</h3>
          {plants.length === 0 && <div className="muted">No plants yet.</div>}
          <ul className="grid" style={{ gap: "8px" }}>
            {plants.slice(0, 5).map((plant) => (
              <li key={plant.id} className="card" style={{ padding: "12px" }}>
                <strong>{plant.crop_type}</strong>
                <div className="muted">Progress: {plant.progress}% · {plant.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid" style={{ gap: "8px" }}>
        <button className="button" onClick={loadDashboard} disabled={loading}>
          {loading ? "Loading..." : "Reload Dashboard"}
        </button>
        {error && <div className="notice error">{error}</div>}
      </div>
    </div>
  );
};

export default Dashboard;

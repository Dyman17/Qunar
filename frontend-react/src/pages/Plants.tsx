import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch, apiPost, API_PREFIX } from "@/api/client";

type Farm = { id: number; name: string };

type Plant = {
  id: number;
  plot_id: number;
  crop_type: string;
  progress: number;
  status: string;
};

type CropType = { type: string; name: string };

const Plants = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [cropTypes, setCropTypes] = useState<CropType[]>([]);
  const [plotId, setPlotId] = useState("");
  const [cropType, setCropType] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadFarms = async () => {
    const { data } = await apiGet<Farm[]>(`${API_PREFIX}/farms`);
    setFarms(data || []);
  };

  const loadPlants = async () => {
    const { data } = await apiGet<Plant[]>(`${API_PREFIX}/plants`);
    setPlants(data || []);
  };

  const loadCropTypes = async () => {
    try {
      const { data } = await apiGet<{ plant_types: CropType[] }>(`${API_PREFIX}/plants/types/list`, false);
      setCropTypes(data.plant_types || []);
    } catch {
      setCropTypes([
        { type: "tomato", name: "Tomato" },
        { type: "carrot", name: "Carrot" },
        { type: "potato", name: "Potato" },
      ]);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadFarms(), loadPlants(), loadCropTypes()]);
      setMessage(null);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to load plants"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!plotId && farms.length > 0) {
      setPlotId(String(farms[0].id));
    }
  }, [farms, plotId]);

  useEffect(() => {
    if (!cropType && cropTypes.length > 0) {
      setCropType(cropTypes[0].type);
    }
  }, [cropTypes, cropType]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiPost(`${API_PREFIX}/plants`, {
        plot_id: Number(plotId),
        crop_type: cropType,
      });
      setMessage("Успех: растение создано");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to create plant"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeReady = async (plantId: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiPatch(`${API_PREFIX}/plants/${plantId}`, { progress: 100 });
      setMessage("Успех: растение готово к сбору");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to update plant"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHarvest = async (plantId: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiPost(`${API_PREFIX}/plants/${plantId}/harvest`, {});
      setMessage("Успех: урожай собран");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to harvest"}`);
    } finally {
      setLoading(false);
    }
  };

  const farmsById = useMemo(() => Object.fromEntries(farms.map((farm) => [farm.id, farm.name])), [farms]);

  return (
    <div className="grid">
      <div className="card">
        <h2>Create Plant</h2>
        <form className="form" onSubmit={handleCreate}>
          <select className="input" value={plotId} onChange={(e) => setPlotId(e.target.value)}>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name} (ID {farm.id})
              </option>
            ))}
          </select>
          <select className="input" value={cropType} onChange={(e) => setCropType(e.target.value)}>
            {cropTypes.map((type) => (
              <option key={type.type} value={type.type}>
                {type.name} ({type.type})
              </option>
            ))}
          </select>
          <button className="button" type="submit" disabled={loading}>Create Plant</button>
        </form>
        {message && <div className={`notice ${message.startsWith("Ошибка") ? "error" : ""}`}>{message}</div>}
      </div>

      <div className="card">
        <div className="grid" style={{ gap: "8px" }}>
          <h2>Plants</h2>
          <button className="button secondary" onClick={loadPlants} disabled={loading}>Reload</button>
        </div>
        {plants.length === 0 && <div className="muted">No plants yet.</div>}
        {plants.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Farm</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant.id}>
                  <td>{plant.id}</td>
                  <td>{plant.crop_type}</td>
                  <td>{farmsById[plant.plot_id] || plant.plot_id}</td>
                  <td>{plant.progress}%</td>
                  <td>{plant.status}</td>
                  <td style={{ display: "flex", gap: "8px" }}>
                    <button className="button secondary" onClick={() => handleMakeReady(plant.id)}>Make Ready</button>
                    <button className="button" onClick={() => handleHarvest(plant.id)}>Harvest</button>
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

export default Plants;

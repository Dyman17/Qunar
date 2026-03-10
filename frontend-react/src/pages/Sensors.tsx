import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, API_PREFIX } from "@/api/client";

type Farm = { id: number; name: string };

type Sensor = {
  id: number;
  plot_id: number;
  sensor_type: string;
  name?: string | null;
};

type SensorType = { type: string; name: string; unit: string };

const Sensors = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorTypes, setSensorTypes] = useState<SensorType[]>([]);
  const [plotId, setPlotId] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [dataSensorId, setDataSensorId] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [dataUnit, setDataUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const loadFarms = async () => {
    const { data } = await apiGet<Farm[]>(`${API_PREFIX}/farms`);
    setFarms(data || []);
  };

  const loadSensors = async () => {
    const { data } = await apiGet<Sensor[]>(`${API_PREFIX}/sensors`);
    setSensors(data || []);
  };

  const loadSensorTypes = async () => {
    try {
      const { data } = await apiGet<{ sensor_types: SensorType[] }>(`${API_PREFIX}/sensors/types/list`, false);
      setSensorTypes(data.sensor_types || []);
    } catch {
      setSensorTypes([
        { type: "humidity", name: "Humidity", unit: "%" },
        { type: "temperature", name: "Temperature", unit: "C" },
      ]);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadFarms(), loadSensors(), loadSensorTypes()]);
      setMessage(null);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to load sensors"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!plotId && farms.length > 0) setPlotId(String(farms[0].id));
  }, [farms, plotId]);

  useEffect(() => {
    if (!sensorType && sensorTypes.length > 0) {
      setSensorType(sensorTypes[0].type);
      setDataUnit(sensorTypes[0].unit);
    }
  }, [sensorTypes, sensorType]);

  useEffect(() => {
    if (!dataSensorId && sensors.length > 0) setDataSensorId(String(sensors[0].id));
  }, [sensors, dataSensorId]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      loadSensors();
    }, 10000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await apiPost(`${API_PREFIX}/sensors`, {
        plot_id: Number(plotId),
        sensor_type: sensorType,
        name: sensorName || null,
      });
      setMessage("Успех: сенсор создан");
      await loadSensors();
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to create sensor"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSensorId) return;
    setLoading(true);
    setMessage(null);
    try {
      await apiPost(`${API_PREFIX}/sensors/${dataSensorId}/data`, {
        value: Number(dataValue),
        unit: dataUnit || "%",
      });
      setMessage("Успех: данные отправлены");
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message || "Failed to send data"}`);
    } finally {
      setLoading(false);
    }
  };

  const farmsById = useMemo(() => Object.fromEntries(farms.map((farm) => [farm.id, farm.name])), [farms]);

  return (
    <div className="grid">
      <div className="card">
        <h2>Create Sensor</h2>
        <form className="form" onSubmit={handleCreate}>
          <select className="input" value={plotId} onChange={(e) => setPlotId(e.target.value)}>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name} (ID {farm.id})
              </option>
            ))}
          </select>
          <select className="input" value={sensorType} onChange={(e) => setSensorType(e.target.value)}>
            {sensorTypes.map((type) => (
              <option key={type.type} value={type.type}>
                {type.name} ({type.type})
              </option>
            ))}
          </select>
          <input className="input" placeholder="Sensor name" value={sensorName} onChange={(e) => setSensorName(e.target.value)} />
          <button className="button" type="submit" disabled={loading}>Create Sensor</button>
        </form>
      </div>

      <div className="card">
        <h2>Send Sensor Data</h2>
        <form className="form" onSubmit={handleSendData}>
          <select className="input" value={dataSensorId} onChange={(e) => setDataSensorId(e.target.value)}>
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name || sensor.sensor_type} (ID {sensor.id})
              </option>
            ))}
          </select>
          <input className="input" placeholder="Value" value={dataValue} onChange={(e) => setDataValue(e.target.value)} />
          <input className="input" placeholder="Unit" value={dataUnit} onChange={(e) => setDataUnit(e.target.value)} />
          <button className="button" type="submit" disabled={loading}>Send Data</button>
        </form>
        {message && <div className={`notice ${message.startsWith("Ошибка") ? "error" : ""}`}>{message}</div>}
      </div>

      <div className="card">
        <div className="grid" style={{ gap: "8px" }}>
          <h2>Sensors</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="button secondary" onClick={loadSensors} disabled={loading}>Reload</button>
            <label className="muted" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
              Auto refresh (10s)
            </label>
          </div>
        </div>
        {sensors.length === 0 && <div className="muted">No sensors yet.</div>}
        {sensors.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Farm</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.id}</td>
                  <td>{sensor.name || "-"}</td>
                  <td>{sensor.sensor_type}</td>
                  <td>{farmsById[sensor.plot_id] || sensor.plot_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sensors;

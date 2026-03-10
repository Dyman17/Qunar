import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiGet, apiPost, API_PREFIX } from "@/api/client";

const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

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
      setMessage(`Error: ${err.message || "Failed to load sensors"}`);
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
      if (!plotId) {
        setMessage("Create a farm first.");
        return;
      }
      await apiPost(`${API_PREFIX}/sensors`, {
        plot_id: Number(plotId),
        sensor_type: sensorType,
        name: sensorName || null,
      });
      setMessage("Success: sensor created");
      await loadSensors();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to create sensor"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (!dataSensorId) {
        setMessage("Create a sensor first.");
        return;
      }
      await apiPost(`${API_PREFIX}/sensors/${dataSensorId}/data`, {
        value: Number(dataValue),
        unit: dataUnit || "%",
      });
      setMessage("Success: data sent");
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to send data"}`);
    } finally {
      setLoading(false);
    }
  };

  const farmsById = useMemo(() => Object.fromEntries(farms.map((farm) => [farm.id, farm.name])), [farms]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container py-8 space-y-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card shadow-card">
              <h2 className="text-xl font-semibold mb-4">Create Sensor</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Сенсор привязывается к выбранной ферме. Тип определяет, какие данные будут приходить.
              </p>
              <form className="space-y-3" onSubmit={handleCreate}>
                <select className={selectClass} value={plotId} onChange={(e) => setPlotId(e.target.value)}>
                  {farms.map((farm) => (
                    <option key={farm.id} value={farm.id}>
                      {farm.name} (ID {farm.id})
                    </option>
                  ))}
                </select>
                <select className={selectClass} value={sensorType} onChange={(e) => setSensorType(e.target.value)}>
                  {sensorTypes.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.name} ({type.type})
                    </option>
                  ))}
                </select>
                <Input placeholder="Sensor name" value={sensorName} onChange={(e) => setSensorName(e.target.value)} />
                <Button type="submit" disabled={loading}>Create Sensor</Button>
              </form>
            </div>

            <div className="p-6 rounded-xl bg-card shadow-card">
              <h2 className="text-xl font-semibold mb-4">Send Sensor Data</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Для отправки данных сначала создайте сенсор. Укажите значение и единицу измерения.
              </p>
              <form className="space-y-3" onSubmit={handleSendData}>
                <select className={selectClass} value={dataSensorId} onChange={(e) => setDataSensorId(e.target.value)}>
                  {sensors.map((sensor) => (
                    <option key={sensor.id} value={sensor.id}>
                      {sensor.name || sensor.sensor_type} (ID {sensor.id})
                    </option>
                  ))}
                </select>
                <Input placeholder="Value" value={dataValue} onChange={(e) => setDataValue(e.target.value)} />
                <Input placeholder="Unit" value={dataUnit} onChange={(e) => setDataUnit(e.target.value)} />
                <Button type="submit" disabled={loading}>Send Data</Button>
              </form>
              {message && (
                <div className={`mt-3 text-sm ${message.startsWith("Error") ? "text-destructive" : "text-muted-foreground"}`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sensors</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={loadSensors} disabled={loading}>Reload</Button>
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
                  Auto refresh (10s)
                </label>
              </div>
            </div>
            {sensors.length === 0 && <div className="text-sm text-muted-foreground">No sensors yet.</div>}
            {sensors.length > 0 && (
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Farm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensors.map((sensor) => (
                      <tr key={sensor.id} className="border-t">
                        <td className="py-2">{sensor.id}</td>
                        <td>{sensor.name || "-"}</td>
                        <td>{sensor.sensor_type}</td>
                        <td>{farmsById[sensor.plot_id] || sensor.plot_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sensors;

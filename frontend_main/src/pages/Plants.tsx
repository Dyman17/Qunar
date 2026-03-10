import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { apiGet, apiPatch, apiPost, API_PREFIX } from "@/api/client";

const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

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
      setMessage(`Error: ${err.message || "Failed to load plants"}`);
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
      if (!plotId) {
        setMessage("Create a farm first.");
        return;
      }
      await apiPost(`${API_PREFIX}/plants`, {
        plot_id: Number(plotId),
        crop_type: cropType,
      });
      setMessage("Success: plant created");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to create plant"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeReady = async (plantId: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiPatch(`${API_PREFIX}/plants/${plantId}`, { progress: 100 });
      setMessage("Success: plant ready for harvest");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to update plant"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHarvest = async (plantId: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiPost(`${API_PREFIX}/plants/${plantId}/harvest`, {});
      setMessage("Success: harvest completed");
      await loadPlants();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to harvest"}`);
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
              <h2 className="text-xl font-semibold mb-4">Create Plant</h2>
              <form className="space-y-3" onSubmit={handleCreate}>
                <select className={selectClass} value={plotId} onChange={(e) => setPlotId(e.target.value)}>
                  {farms.map((farm) => (
                    <option key={farm.id} value={farm.id}>
                      {farm.name} (ID {farm.id})
                    </option>
                  ))}
                </select>
                <select className={selectClass} value={cropType} onChange={(e) => setCropType(e.target.value)}>
                  {cropTypes.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.name} ({type.type})
                    </option>
                  ))}
                </select>
                <Button type="submit" disabled={loading}>Create Plant</Button>
              </form>
              {message && (
                <div className={`mt-3 text-sm ${message.startsWith("Error") ? "text-destructive" : "text-muted-foreground"}`}>
                  {message}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Plants</h2>
                <Button variant="outline" onClick={loadPlants} disabled={loading}>Reload</Button>
              </div>
              {plants.length === 0 && <div className="text-sm text-muted-foreground">No plants yet.</div>}
              {plants.length > 0 && (
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">ID</th>
                        <th>Type</th>
                        <th>Farm</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plants.map((plant) => (
                        <tr key={plant.id} className="border-t">
                          <td className="py-2">{plant.id}</td>
                          <td>{plant.crop_type}</td>
                          <td>{farmsById[plant.plot_id] || plant.plot_id}</td>
                          <td>{plant.progress}%</td>
                          <td>{plant.status}</td>
                          <td className="flex flex-wrap gap-2 py-2">
                            <Button variant="outline" size="sm" onClick={() => handleMakeReady(plant.id)}>
                              Make Ready
                            </Button>
                            <Button size="sm" onClick={() => handleHarvest(plant.id)}>
                              Harvest
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Plants;

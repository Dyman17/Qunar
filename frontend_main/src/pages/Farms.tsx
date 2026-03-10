import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
};

const Farms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
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
      setMessage(`Error: ${err.message || "Failed to load farms"}`);
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
      if (!finalSize) throw new Error("Farm size is required");
      const payload: any = {
        name: name || template?.defaultName || "Farm",
        size: finalSize,
      };
      if (locationX && locationY) {
        payload.location = { x: Number(locationX), y: Number(locationY) };
      }
      await apiPost(`${API_PREFIX}/farms`, payload);
      setMessage("Success: farm created");
      await loadFarms();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to create farm"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await apiDelete(`${API_PREFIX}/farms/${id}`);
      setMessage("Success: farm deleted");
      await loadFarms();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Failed to delete farm"}`);
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container py-8 space-y-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card shadow-card">
              <h2 className="text-xl font-semibold mb-4">Create Farm</h2>
              <form className="space-y-3" onSubmit={handleCreate}>
                <select className={selectClass} value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                  <option value="">Select farm type</option>
                  {farmTemplates.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <Input placeholder="Farm name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
                <Input placeholder="Location X" value={locationX} onChange={(e) => setLocationX(e.target.value)} />
                <Input placeholder="Location Y" value={locationY} onChange={(e) => setLocationY(e.target.value)} />
                <Button type="submit" disabled={loading}>Create Farm</Button>
              </form>
              {message && (
                <div className={`mt-3 text-sm ${message.startsWith("Error") ? "text-destructive" : "text-muted-foreground"}`}>
                  {message}
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Farms</h2>
                <Button variant="outline" onClick={loadFarms} disabled={loading}>Reload</Button>
              </div>
              {farms.length === 0 && <div className="text-sm text-muted-foreground">No farms yet.</div>}
              {farms.length > 0 && (
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farms.map((farm) => (
                        <tr key={farm.id} className="border-t">
                          <td className="py-2">{farm.id}</td>
                          <td>{farm.name}</td>
                          <td>{farm.size}</td>
                          <td>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(farm.id)}>
                              Delete
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

export default Farms;

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { apiGet, API_PREFIX } from "@/api/client";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [farms, setFarms] = useState<any[]>([]);
  const [plants, setPlants] = useState<any[]>([]);
  const [sensors, setSensors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totals = useMemo(
    () => ({
      farms: farms.length,
      plants: plants.length,
      sensors: sensors.length,
    }),
    [farms, plants, sensors]
  );

  const loadDashboard = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const farmsResp = await apiGet<any[]>(`${API_PREFIX}/farms`);
      const plantsResp = await apiGet<any[]>(`${API_PREFIX}/plants`);
      const sensorsResp = await apiGet<any[]>(`${API_PREFIX}/sensors`);
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.full_name || user?.email}</p>
            </div>
            <Button onClick={loadDashboard} disabled={loading}>
              {loading ? "Loading..." : "Reload"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-card shadow-card">
              <div className="text-sm text-muted-foreground">Farms</div>
              <div className="text-2xl font-bold">{totals.farms}</div>
            </div>
            <div className="p-4 rounded-xl bg-card shadow-card">
              <div className="text-sm text-muted-foreground">Plants</div>
              <div className="text-2xl font-bold">{totals.plants}</div>
            </div>
            <div className="p-4 rounded-xl bg-card shadow-card">
              <div className="text-sm text-muted-foreground">Sensors</div>
              <div className="text-2xl font-bold">{totals.sensors}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-card shadow-card">
              <h2 className="font-semibold mb-4">Your Farms</h2>
              {farms.length === 0 && <div className="text-sm text-muted-foreground">No farms yet.</div>}
              <div className="space-y-3">
                {farms.map((farm) => (
                  <div key={farm.id} className="border rounded-lg p-3">
                    <div className="font-semibold">{farm.name}</div>
                    <div className="text-sm text-muted-foreground">Size: {farm.size}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-card shadow-card">
              <h2 className="font-semibold mb-4">Latest Plants</h2>
              {plants.length === 0 && <div className="text-sm text-muted-foreground">No plants yet.</div>}
              <div className="space-y-3">
                {plants.slice(0, 6).map((plant) => (
                  <div key={plant.id} className="border rounded-lg p-3">
                    <div className="font-semibold">{plant.crop_type}</div>
                    <div className="text-sm text-muted-foreground">Progress: {plant.progress}% · {plant.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && <div className="text-sm text-destructive mt-4">{error}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

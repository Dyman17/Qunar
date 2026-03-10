import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiPatch, API_PREFIX } from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AccountSettings = () => {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await apiPatch(`${API_PREFIX}/users/me`, {
        full_name: fullName || null,
        phone: phone || null,
        email: email || null,
      });
      await refreshUser();
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container py-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

          <div className="space-y-8">
            <section className="p-6 rounded-xl bg-card shadow-card space-y-4">
              <h2 className="font-display font-semibold text-lg">Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button onClick={handleSave} disabled={loading}>Save</Button>
            </section>

            <section className="p-6 rounded-xl bg-card shadow-card space-y-4">
              <h2 className="font-display font-semibold text-lg">Subscription</h2>
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent">
                <div>
                  <p className="font-semibold">{user?.subscription_type || "basic"} plan</p>
                  <p className="text-sm text-muted-foreground">Manage subscription in admin panel</p>
                </div>
                <Button variant="outline" onClick={() => toast.info("Contact admin to upgrade")}
                >
                  Upgrade
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings;

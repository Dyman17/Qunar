import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sprout } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { register, error, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirm) {
      setLocalError("Passwords do not match");
      return;
    }
    try {
      await register({ email, password, full_name: fullName });
      navigate("/dashboard");
    } catch (err: any) {
      setLocalError(err.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl text-primary">
            <Sprout className="w-8 h-8" />
            QUNAR
          </Link>
          <p className="text-muted-foreground mt-2">Create your smart farm account.</p>
        </div>
        <form className="p-6 rounded-xl bg-card shadow-elevated space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <p className="text-xs text-muted-foreground">Имя можно оставить пустым и добавить позже в настройках.</p>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <p className="text-xs text-muted-foreground">Мы используем email для входа и восстановления доступа.</p>
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <p className="text-xs text-muted-foreground">Минимум 8 символов.</p>
          <Input placeholder="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          <p className="text-xs text-muted-foreground">Повторите пароль, чтобы избежать ошибки.</p>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </Button>
          {(localError || error) && (
            <div className="text-sm text-destructive">{localError || error}</div>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/dashboard", label: "Панель управления" },
  { to: "/subscriptions", label: "Подписки" },
  { to: "/farms", label: "Фермы" },
  { to: "/plants", label: "Растения" },
  { to: "/sensors", label: "Датчики" },
  { to: "/settings", label: "Параметры" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
          <Sprout className="w-7 h-7" />
          QUNAR
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {!user && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Вход</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Регистрация</Link>
              </Button>
            </>
          )}
          {user && (
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Выход
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t">
              {!user && (
                <>
                  <Button variant="ghost" asChild className="flex-1">
                    <Link to="/login" onClick={() => setMobileOpen(false)}>Вход</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/register" onClick={() => setMobileOpen(false)}>Регистрация</Link>
                  </Button>
                </>
              )}
              {user && (
                <Button variant="outline" className="flex-1" onClick={logout}>
                  Выход
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

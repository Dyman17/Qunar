import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary mb-3">
            <Sprout className="w-6 h-6" />
            QUNAR
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm">
            Manage virtual and real farms from one dashboard. Track plants, sensors, and harvests in real time.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Support</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>hello@qunar.farm</span>
            <Link to="/settings" className="hover:text-foreground transition-colors">Account settings</Link>
          </div>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2026 QUNAR. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

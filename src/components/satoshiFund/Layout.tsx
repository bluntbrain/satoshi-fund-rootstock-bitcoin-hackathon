import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  PiggyBank,
  Wallet,
  Bell,
  Settings,
} from "lucide-react";
import WalletButton from "./WalletButton";

export const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/request", icon: PiggyBank, label: "Request Loan" },
    { path: "/manage", icon: Wallet, label: "Manage Loans" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <nav className="fixed top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-700">
        <div className="p-6">
          <Link to="/" className="block">
            <h1 className="text-2xl font-bold text-bitcoin mb-8">
              BTC Lending
            </h1>
          </Link>
          <ul className="space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === path
                      ? "bg-dark-600 text-bitcoin"
                      : "text-gray-400 hover:bg-dark-700 hover:text-bitcoin"
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <WalletButton />
        </div>
      </nav>
      <main className="ml-64">
        <div className="max-w-[1200px] mx-auto px-5 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

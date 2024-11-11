import { LayoutDashboard, PiggyBank, Wallet, Bell, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: PiggyBank, label: "Request Loan", path: "/request" },
    { icon: Wallet, label: "Manage Loans", path: "/manage" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-dark-800 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-10`}
      >
        <div className="w-64 min-h-screen bg-dark-800 border-r border-dark-700 relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-orange-500/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="p-6">
              <Link to="/" className="block">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Satoshi Fund
                </h2>
              </Link>
            </div>

            <nav className="mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-4 transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-dark-700/50 text-orange-500"
                        : "text-gray-400 hover:bg-dark-700/50 hover:text-orange-500"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

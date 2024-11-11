import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { Etherspot, Wagmi } from "@/pages";
import Dashboard from "./pages/Dashboard";
import ManageLoans from "./pages/ManageLoans";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Landing from "./pages/Landing";
import RequestLoan from "./pages/RequestLoan";
import { useState } from "react";
import Sidebar from "./components/satoshiFund/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const WithSidebar = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-dark-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="lg:ml-64">
        <div className="max-w-[1200px] mx-auto px-5 py-8">{children}</div>
      </div>
    </div>
  );

  return (
    <Router>
      <main className="min-h-screen flex flex-col justify-between">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Landing />
                <Footer />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <WithSidebar>
                <Dashboard />
              </WithSidebar>
            }
          />
          <Route
            path="/request"
            element={
              <WithSidebar>
                <RequestLoan />
              </WithSidebar>
            }
          />
          <Route
            path="/manage"
            element={
              <WithSidebar>
                <ManageLoans />
              </WithSidebar>
            }
          />
          <Route
            path="/notifications"
            element={
              <WithSidebar>
                <Notifications />
              </WithSidebar>
            }
          />
          <Route
            path="/analytics"
            element={
              <WithSidebar>
                <Analytics />
              </WithSidebar>
            }
          />

          <Route path="/aa" element={<Etherspot />} />
          <Route path="/wagmi" element={<Wagmi />} />
        </Routes>
        <Toaster />
      </main>
    </Router>
  );
}

export default App;

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

function App() {
  return (
    <Router>
      <main className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/aa" element={<Etherspot />} />
          <Route path="/wagmi" element={<Wagmi />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<RequestLoan />} />
          <Route path="/manage" element={<ManageLoans />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        <Footer />
        <Toaster />
      </main>
    </Router>
  );
}

export default App;

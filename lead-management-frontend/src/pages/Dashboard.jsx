import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadsTable from "../components/LeadsTable";
import Analytics from "../components/Analytics";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("leads");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lead Management Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {localStorage.getItem("username")}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "leads"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Analytics
          </button>
        </div>

        {activeTab === "leads" && <LeadsTable />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
}

export default Dashboard;

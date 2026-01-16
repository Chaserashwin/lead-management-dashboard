import { useState, useEffect } from "react";
import axios from "axios";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="text-center py-8">Failed to load analytics</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Leads</h3>
        <p className="text-4xl font-bold text-blue-600">
          {analytics.totalLeads}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">
          Converted Leads
        </h3>
        <p className="text-4xl font-bold text-green-600">
          {analytics.convertedLeads}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">
          Conversion Rate
        </h3>
        <p className="text-4xl font-bold text-purple-600">
          {analytics.conversionRate}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Value</h3>
        <p className="text-2xl font-bold text-orange-600">
          ₹{(analytics.totalValue / 100000).toFixed(1)}L
        </p>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Leads by Stage</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {analytics.stageDistribution?.map((stage) => (
            <div key={stage._id} className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stage.count}
              </div>
              <div className="text-sm text-gray-600 mt-2">{stage._id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;

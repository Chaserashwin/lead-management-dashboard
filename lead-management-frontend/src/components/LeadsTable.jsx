import { useState, useEffect } from "react";
import axios from "axios";

function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchLeads();
  }, [search, stage, source, page, sortBy, order]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          stage: stage !== "All" ? stage : undefined,
          source,
          page,
          limit: 10,
          sortBy,
          order,
        },
      });
      setLeads(response.data.leads);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Leads Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={stage}
          onChange={(e) => {
            setStage(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Stages</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Converted">Converted</option>
        </select>

        <select
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="Referral">Referral</option>
          <option value="Event">Event</option>
          <option value="Social Media">Social Media</option>
        </select>

        <select
          value={`${sortBy}:${order}`}
          onChange={(e) => {
            const [newSort, newOrder] = e.target.value.split(":");
            setSortBy(newSort);
            setOrder(newOrder);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="value:desc">Highest Value</option>
          <option value="value:asc">Lowest Value</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Stage</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.company}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lead.stage === "Converted"
                          ? "bg-green-100 text-green-800"
                          : lead.stage === "Negotiation"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.stage === "Qualified"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-4 py-2">₹{lead.value.toLocaleString()}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Lead Details</h3>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedLead.firstName}{" "}
                {selectedLead.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLead.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedLead.phone}
              </p>
              <p>
                <strong>Company:</strong> {selectedLead.company}
              </p>
              <p>
                <strong>Stage:</strong> {selectedLead.stage}
              </p>
              <p>
                <strong>Value:</strong> ₹{selectedLead.value.toLocaleString()}
              </p>
              <p>
                <strong>Source:</strong> {selectedLead.source}
              </p>
              <p>
                <strong>Notes:</strong> {selectedLead.notes || "N/A"}
              </p>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadsTable;

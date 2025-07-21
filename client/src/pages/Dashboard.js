import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/clients`);
        const employeeRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/employees`);
        setClients(clientRes.data);
        setEmployees(employeeRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">📊 Dashboard</h1>

      {error && (
        <p className="text-red-400 text-center mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-300">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
          {/* Client Card */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              👤 Select a Client
            </h2>
            <select
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              defaultValue=""
              onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                const client = clients.find((c) => c.id === selectedId);
                setSelectedClient(client);
              }}
              aria-label="Select a client"
            >
              <option value="" disabled>
                -- Choose a client --
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            {selectedClient && (
              <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-inner">
                <h3 className="text-lg font-semibold mb-3">🗂️ Client Details</h3>
                <dl className="space-y-2 text-sm sm:text-base">
                  <div>
                    <dt className="font-medium inline text-gray-300">Name:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedClient.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium inline text-gray-300">Role:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedClient.role}</dd>
                  </div>
                  <div>
                    <dt className="font-medium inline text-gray-300">Contact:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedClient.contact}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* Employee Card */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              👨‍💼 Select an Employee
            </h2>
            <select
              className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              defaultValue=""
              onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                const employee = employees.find((emp) => emp.id === selectedId);
                setSelectedEmployee(employee);
              }}
              aria-label="Select an employee"
            >
              <option value="" disabled>
                -- Choose an employee --
              </option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {selectedEmployee && (
              <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-inner">
                <h3 className="text-lg font-semibold mb-3">🧾 Employee Details</h3>
                <dl className="space-y-2 text-sm sm:text-base">
                  <div>
                    <dt className="font-medium inline text-gray-300">Name:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedEmployee.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium inline text-gray-300">Role:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedEmployee.role}</dd>
                  </div>
                  <div>
                    <dt className="font-medium inline text-gray-300">Contact:</dt>
                    <dd className="inline ml-2 text-gray-100">{selectedEmployee.contact}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

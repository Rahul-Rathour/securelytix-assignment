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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-900 mb-8 sm:mb-12 drop-shadow-sm">
          Securelytix Dashboard
        </h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Client Dropdown Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[100px] flex flex-col">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4">
                Select a Client
              </h2>
              <select
                className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                <div className="mt-6 bg-blue-50 rounded-lg p-5 border border-blue-200 animate-fade-in flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-blue-700 mb-3">
                    Client Details
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Name:</dt>
                      <dd className="inline ml-2">{selectedClient.name}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Role:</dt>
                      <dd className="inline ml-2">{selectedClient.role}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Contact:</dt>
                      <dd className="inline ml-2">{selectedClient.contact}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>

            {/* Employee Dropdown Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[100px] flex flex-col">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4">
                Select an Employee
              </h2>
              <select
                className="w-full border border-blue-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                <div className="mt-6 bg-blue-50 rounded-lg p-5 border border-blue-200 animate-fade-in flex-1">
                  <h3 className="text-lg sm:text-xl font-medium text-blue-700 mb-3">
                    Employee Details
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Name:</dt>
                      <dd className="inline ml-2">{selectedEmployee.name}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Role:</dt>
                      <dd className="inline ml-2">{selectedEmployee.role}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700 inline">Contact:</dt>
                      <dd className="inline ml-2">{selectedEmployee.contact}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Dashboard;
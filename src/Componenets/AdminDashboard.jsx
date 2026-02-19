import React from "react";
import BookingsTable from "./BookingsTable";

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
    <div className="mb-8">
      <h1 className="text-xl font-bold text-indigo-600">SalesPilot</h1>
      <p className="text-sm text-gray-500">Admin</p>
    </div>

    <nav className="space-y-2">
      <a className="block px-3 py-2 rounded bg-indigo-50 text-indigo-700 font-medium">
        Dashboard
      </a>
      <a className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Order Summary
      </a>
      <a className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Transaction
      </a>
      <a className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Messages
      </a>
      <a className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Product
      </a>
    </nav>

    <div className="mt-8">
      <h6 className="text-xs text-gray-400 uppercase">Support</h6>
      <a className="block mt-2 px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Account
      </a>
      <a className="block mt-2 px-3 py-2 rounded text-gray-600 hover:bg-gray-100">
        Settings
      </a>
    </div>

    <div className="mt-8">
      <button className="w-full px-3 py-2 bg-gray-100 rounded">Logout</button>
    </div>
  </aside>
);

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm w-full">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold">{value}</div>
    {subtitle && <div className="text-xs text-green-500 mt-1">{subtitle}</div>}
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <input
              placeholder="Search product"
              className="px-4 py-2 rounded-lg border w-96 bg-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Welcome Back</div>
              <div className="font-medium">Mark Parker</div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
          </div>
        </header>

        <section className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Net Revenue"
            value="$8,245.00"
            subtitle="-0.5% from last week"
          />
          <StatCard
            title="Total Orders"
            value="256"
            subtitle="+1.0% from last week"
          />
          <StatCard
            title="Resolved Issues"
            value="1,256"
            subtitle="+1.0% from last week"
          />
        </section>

        <section className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-2">Overall Sales</h3>
            <div className="h-48 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded flex items-center justify-center text-indigo-300">
              Chart Placeholder
            </div>
            <div className="mt-4">
              <BookingsTable />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="text-sm text-gray-500">Sales Report</h4>
              <div className="h-36 flex items-center justify-center text-indigo-300">
                Pie Chart
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="text-sm text-gray-500">
                Weekly Transaction Summary
              </h4>
              <div className="h-24 flex items-center justify-center text-indigo-300">
                Small Chart
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

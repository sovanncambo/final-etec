import { useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const STATUS_OPTIONS = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Preparing: "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const seedOrders = [
  {
    id: "ORD-1042",
    customer: "Sok Dara",
    items: [
      { name: "Crispy Chicken Burger", qty: 2 },
      { name: "Hot Latte", qty: 1 },
    ],
    total: 16.77,
    status: "Delivered",
    date: "2026-09-08",
  },
  {
    id: "ORD-1043",
    customer: "Chan Sopheak",
    items: [{ name: "Pepperoni Pizza", qty: 1 }],
    total: 12.25,
    status: "Preparing",
    date: "2026-09-09",
  },
  {
    id: "ORD-1044",
    customer: "Vin Van",
    items: [
      { name: "Beef Burritos", qty: 3 },
      { name: "Fresh Matcha Latte", qty: 2 },
    ],
    total: 26.85,
    status: "Pending",
    date: "2026-09-10",
  },
  {
    id: "ORD-1045",
    customer: "Ly Sreymom",
    items: [{ name: "Seafood Pizza", qty: 1 }],
    total: 19.99,
    status: "Out for Delivery",
    date: "2026-09-10",
  },
  {
    id: "ORD-1046",
    customer: "Chab Thia",
    items: [
      { name: "Croissant Sandwich", qty: 1 },
      { name: "Croissant", qty: 2 },
    ],
    total: 24.7,
    status: "Cancelled",
    date: "2026-09-07",
  },
  {
    id: "ORD-1047",
    customer: "Heng Ratana",
    items: [{ name: "Classic Beef Burger", qty: 2 }],
    total: 12.58,
    status: "Delivered",
    date: "2026-09-06",
  },
];

const Order = () => {
  const [orders, setOrders] = useState(seedOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "Pending").length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;
    const revenue = orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    return { total, pending, delivered, revenue };
  }, [orders]);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Orders
          </h1>
          <p className="text-sm text-gray-400">
            Track and manage incoming customer orders.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs text-gray-400">Delivered</p>
            <p className="text-2xl font-bold text-green-500">
              {stats.delivered}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs text-gray-400">Revenue</p>
            <p className="text-2xl font-bold text-red-500">
              ${stats.revenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2.5">
              <FaMagnifyingGlass className="text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search by customer or order ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-100 rounded-md px-4 py-2.5 text-sm outline-none"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Orders table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="py-2 pr-4 font-medium">Order ID</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Items</th>
                  <th className="py-2 pr-4 font-medium">Total</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-gray-400"
                    >
                      No orders match your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3 pr-4 font-medium text-gray-700">
                        {order.id}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {order.customer}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {order.items
                          .map((it) => `${it.name} x${it.qty}`)
                          .join(", ")}
                      </td>
                      <td className="py-3 pr-4 font-semibold text-gray-700">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {order.date}
                      </td>
                      <td className="py-3 pr-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value)
                          }
                          className={`text-xs font-medium px-2.5 py-1.5 rounded-full outline-none cursor-pointer ${STATUS_STYLES[order.status]}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
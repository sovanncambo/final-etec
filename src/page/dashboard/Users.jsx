import { useMemo, useState } from "react";
import { FaMagnifyingGlass, FaTrash } from "react-icons/fa6";
import StaffList from "../../Data/StaffList";

const seedCustomers = [
  {
    id: "c1",
    fullName: "Sok Dara",
    email: "sok.dara@example.com",
    joined: "2026-06-12",
    orders: 4,
  },
  {
    id: "c2",
    fullName: "Chan Sopheak",
    email: "chan.sopheak@example.com",
    joined: "2026-07-03",
    orders: 2,
  },
  {
    id: "c3",
    fullName: "Ly Sreymom",
    email: "ly.sreymom@example.com",
    joined: "2026-07-20",
    orders: 7,
  },
  {
    id: "c4",
    fullName: "Heng Ratana",
    email: "heng.ratana@example.com",
    joined: "2026-08-15",
    orders: 1,
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Users = () => {
  const staffUsers = useMemo(
    () =>
      StaffList.map((s) => ({
        id: `staff-${s.id}`,
        fullName: s.fullName,
        role: "STAFF",
        detail: `@${s.username}`,
        meta: `${s.gender} · ${s.placeOfBirth}`,
      })),
    []
  );

  const customerUsers = useMemo(
    () =>
      seedCustomers.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        role: "CUSTOMER",
        detail: c.email,
        meta: `${c.orders} order${c.orders === 1 ? "" : "s"} · joined ${c.joined}`,
      })),
    []
  );

  const [removedIds, setRemovedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const allUsers = [...staffUsers, ...customerUsers].filter(
    (u) => !removedIds.includes(u.id)
  );

  const filtered = allUsers.filter((u) => {
    const matchesTab = tab === "All" || u.role === tab;
    const matchesSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.detail.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRemove = (id) => {
    setRemovedIds((prev) => [...prev, id]);
    setDeleteTarget(null);
  };

  const tabCount = (role) =>
    role === "All"
      ? allUsers.length
      : allUsers.filter((u) => u.role === role).length;

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Users
          </h1>
          <p className="text-sm text-gray-400">
            Staff members and registered customers.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          {/* Tabs + search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex gap-2">
              {["All", "STAFF", "CUSTOMER"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    tab === t
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {t === "All" ? "All" : t === "STAFF" ? "Staff" : "Customers"}{" "}
                  <span className="opacity-70">({tabCount(t)})</span>
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-md px-4 py-2.5">
              <FaMagnifyingGlass className="text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* User list */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-10">
              No users match your search.
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {filtered.map((u) => (
                <li
                  key={u.id}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-4 py-3"
                >
                  <span className="w-10 h-10 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-semibold">
                    {initials(u.fullName)}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-800 truncate">
                        {u.fullName}
                      </p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          u.role === "STAFF"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {u.detail} · {u.meta}
                    </p>
                  </div>

                  {deleteTarget === u.id ? (
                    <div className="flex items-center gap-2 text-xs shrink-0">
                      <span className="text-gray-500 hidden sm:inline">
                        Remove?
                      </span>
                      <button
                        onClick={() => handleRemove(u.id)}
                        className="px-3 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteTarget(null)}
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 font-medium cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteTarget(u.id)}
                      className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-white cursor-pointer transition-colors"
                      title="Remove user"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
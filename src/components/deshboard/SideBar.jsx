// import { NavLink } from "react-router-dom";
// import Logout from "./Logout";
// import DashboardNav from "./DashboardNav";
// export default function SideBar() {
//   return (
//     <aside className=" w-[200px] h-[100vh] pt-2 px-5 flex flex-col  pb-10">
      
//       <div   >
//       <DashboardNav/>

//         {/* <h2 className="text-center p-2 border border-red-100 rounded font-semibold">Admin Panel</h2> */}
//         <ul className="flex flex-col gap-5 pt-[10px]">
//           <li>
//             <NavLink
//               to="/admin"
//               end
//               className={({ isActive }) =>
//                 `block text-center p-2 border border-red-100 rounded transition-colors ${
//                   isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/add-food"
//               className={({ isActive }) =>
//                 `block text-center p-2 border border-red-100 rounded transition-colors ${
//                   isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
//                 }`
//               }
//             >
//               Add Food
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/categories"
//               className={({ isActive }) =>
//                 `block text-center p-2 border border-red-100 rounded transition-colors ${
//                   isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
//                 }`
//               }
//             >
//               Categories
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/orders"
//               className={({ isActive }) =>
//                 `block text-center p-2 border border-red-100 rounded transition-colors ${
//                   isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
//                 }`
//               }
//             >
//               Orders
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/users"
//               className={({ isActive }) =>
//                 `block text-center p-2 border border-red-100 rounded transition-colors ${
//                   isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
//                 }`
//               }
//             >
//               Users
//             </NavLink>
//           </li>
//         </ul>
       
//       </div>

//       {/* Call Logout here at the bottom of the sidebar */}
//       <div>
//            <Logout />
//       </div>
//     </aside>
//   );
// }




import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import DashboardNav from "./DashboardNav";

export default function SideBar() {
  return (
    <aside className="w-[200px] h-[100vh] pt-2 px-5 flex flex-col justify-between pb-10  bg-white">
      {/* ផ្នែកខាងលើ៖ Logo និង Menu ទាំងអស់ */}
      <div>
        <DashboardNav />
        <ul className="flex flex-col gap-3 pt-5">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `block text-center p-2 border border-red-100 rounded transition-colors ${
                  isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-food"
              className={({ isActive }) =>
                `block text-center p-2 border border-red-100 rounded transition-colors ${
                  isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
                }`
              }
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `block text-center p-2 border border-red-100 rounded transition-colors ${
                  isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
                }`
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `block text-center p-2 border border-red-100 rounded transition-colors ${
                  isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
                }`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block text-center p-2 border border-red-100 rounded transition-colors ${
                  isActive ? "bg-red-500 text-white font-medium" : "hover:bg-red-50"
                }`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      {/* ផ្នែកខាងក្រោមបង្អស់៖ ប៊ូតុង Logout */}
      <div>
        <Logout />
      </div>
    </aside>
  );
}
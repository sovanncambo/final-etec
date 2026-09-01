import { Navigate, Outlet } from "react-router-dom";

const ProtectedRout = ({ currentUser }) => {
  // ១. បើមិនទាន់ Login ទេ (currentUser === null) ឱ្យរុញទៅ Login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ២. ឆែកមើល Property .role នៅក្នុង Object របស់ currentUser
  if (currentUser?.role !== "STAFF") {
    return <Navigate to="/" replace />;
  }

  // ៣. បើជា STAFF ឱ្យបង្ហាញ Child Routes (DashboardLayout)
  return <Outlet />;
};

export default ProtectedRout;
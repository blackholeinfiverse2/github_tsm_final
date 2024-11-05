// Updated App.tsx
import { useEffect, useRef } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/dashboard";
import Complete from "./pages/Complete";
import Progress from "./pages/Progress";
import RoleSelection from "./components/RoleSelection";
import { Web3Provider, useWeb3Context } from "./context/Web3Context";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Web3Provider>
      <Main />
      <Toaster richColors />
    </Web3Provider>
  );
};

// Main Component
const Main = () => {
  const { userRole, setUserRole } = useWeb3Context();

  // Effect to check sessionStorage on mount
  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole) {
      // If a role is stored, set it in the context
      setUserRole(storedRole);
    }
  }, [setUserRole]);

  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route path="/log-in" element={<Login />} />

        <Route path="/" element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route
              index
              path="/"
              element={
                <Navigate
                  to={
                    userRole
                      ? userRole === "Admin"
                        ? "/dashboard"
                        : "/tasks"
                      : "/role-selection"
                  }
                />
              }
            />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/completed/:status" element={<Complete />} />
            <Route path="/createTask" element={<Progress />} />
            {/* <Route path="/register" element={<ConditionalRegister />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/log-in" />} />
      </Routes>
    </main>
  );
};

// Layout component
const Layout = () => {
  const mobileMenuRef = useRef(null);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// RequireAuth component
const RequireAuth = () => {
  const { isAuthenticated } = useWeb3Context();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default App;

import { Navigate, Outlet } from "react-router-dom";

function Required() {
  const token = localStorage.getItem("token");
  return token ? <Outlet/> : <Navigate to="/" />;
}

export default Required;
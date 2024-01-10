import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TenantOnly() {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const isTenant = localStorage.getItem('isTenant')
console.log(isTenant);
  return isTenant ? <Outlet /> : <Navigate to='/' />
}

export default TenantOnly;

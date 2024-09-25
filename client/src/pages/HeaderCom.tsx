// Header.tsx
import { useLocation } from "react-router-dom";
import AdminHeader  from "../component/AdminHeader";
import Header from "../component/Header";

const HeaderContainer = () => {
  const location = useLocation();

  let header;
  if (location.pathname.startsWith('/admin')) {
    header = <AdminHeader />;
  } else if(location.pathname.startsWith('/home')) {
    header = <Header />;
  }

  return header;
};

export default HeaderContainer;
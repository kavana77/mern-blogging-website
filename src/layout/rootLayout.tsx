import ReactQueryProvide from "../providers/reactQueryProvider";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <ReactQueryProvide>
        <Navbar />
        <main>
          <Outlet />
        </main>
    </ReactQueryProvide>
  );
};

export default RootLayout;

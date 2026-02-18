import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./LayoutPage.css";
import { RootState } from "../../reducx/ReducxStrore";
import { LoginRegisterModal } from "../../features/authnication";
import { Navbar } from "../../features/Navigation";

export default function LayoutPage() {
  const state = useSelector((state: RootState) => state.modeal);

  return (
    <div className="layout-page">
      {state.displayLogin && <LoginRegisterModal />}
      <Navbar />
      <Outlet />
      <h1>FOOTER</h1>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./LayoutPage.css";
import type { RootState } from "../../reducx/ReducxStrore";
import {
  LibraryCardModal,
  LoginRegisterModal,
} from "../../features/authnication";
import { Navbar } from "../../features/Navigation";
import { Footer } from "../../features/Navigation";

export default function LayoutPage() {
  const state = useSelector((state: RootState) => state.modal);

  return (
    <div className="layout-page">
      {state.displayLogin && <LoginRegisterModal />}
      {state.displayLibraryCard && <LibraryCardModal />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

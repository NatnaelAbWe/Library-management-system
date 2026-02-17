import { useSelector } from "react-redux";
import { RootState } from "../../reducx/ReducxStrore";
import { JSX } from "react";
import { LoginRegisterModal } from "../../features/authnication";

export default function HomePage(): JSX.Element {
  const displayLogin = useSelector(
    (state: RootState) => state.modeal.displayLogin,
  );

  return (
    <div className="page">
      Home page
      {displayLogin ? <LoginRegisterModal /> : <></>}
    </div>
  );
}

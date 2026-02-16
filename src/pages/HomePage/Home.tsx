import { useSelector } from "react-redux";
import { RootState } from "../../reducx/ReducxStrore";
import LoginForm from "../../features/authnication/component/LoginForm/LoginForm";
import { JSX } from "react";

export default function HomePage(): JSX.Element {
  const displayLogin = useSelector(
    (state: RootState) => state.modeal.displayLogin,
  );

  return (
    <div className="page">
      Home page
      {displayLogin ? <LoginForm /> : <></>}
    </div>
  );
}

import type { JSX } from "react";
import "./Home.css";
import { LoginForm } from "../../features/authnication/component/LoginForm/LoginForm";

interface HomePageProps {
  displayLogin: Boolean;
}

const Home = (props: HomePageProps): JSX.Element => {
  return (
    <div className="page">
      home Page
      {props.displayLogin ? <LoginForm /> : <></>}
    </div>
  );
};

export default Home;

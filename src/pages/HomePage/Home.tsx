import type { JSX } from "react";
import "./Home.css";
import LoginForm from "../../features/authnication/component/LoginForm/LoginForm";
import { User } from "../../models/user";

interface HomePageProps {
  displayLogin: boolean;
}

const Home = (props: HomePageProps): JSX.Element => {
  return (
    <div className="page">
      home Page
      {props.displayLogin ? (
        <LoginForm />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

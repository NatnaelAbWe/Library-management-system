import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/HomePage/Home";
import { User } from "./models/user";

function App() {
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const updateLoggedInUser = (user: User) => {
    setLoggedInUser(user);
  };

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <div>
      <Home
        displayLogin={displayLogin}
        updateLoggedInUser={updateLoggedInUser}
      />
    </div>
  );
}

export default App;

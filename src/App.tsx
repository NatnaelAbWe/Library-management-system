import "./App.css";
import { useState } from "react";
import Home from "./pages/HomePage/Home";
import { User } from "./models/user";

function App() {
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<User>();

  return (
    <div>
      <Home displayLogin={displayLogin} />
    </div>
  );
}

export default App;

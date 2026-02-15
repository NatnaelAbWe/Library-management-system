import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/HomePage/Home";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "./reducx/ReducxStrore";

function App() {
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  const loggedInUser = useSelector((state:RootState) => state.authentication.loggedInUser)

  )

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <div>
      <Home displayLogin={displayLogin} />
    </div>
  );
}

function state(state: unknown): unknown {
  throw new Error("Function not implemented.");
}

export default App;



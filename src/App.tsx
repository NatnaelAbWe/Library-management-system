import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/HomePage/Home";
import { useSelector } from "react-redux";
import { RootState } from "./reducx/ReducxStrore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const loggedInUser = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
  );

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<></>} />
          <Route path="/catalog" element={<></>} />
          <Route path="/resource/:barcode" element={<></>} />
          <Route path="/profile/:userId" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function state(state: unknown): unknown {
  throw new Error("Function not implemented.");
}

export default App;

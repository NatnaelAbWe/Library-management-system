import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/HomePage/Home";
import { useSelector } from "react-redux";
import { RootState } from "./reducx/ReducxStrore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/Layoutpages/LayoutPage";

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
        <Route path="/" element={<LayoutPage />}>
          <Route path="" element={<Home />} />
          {/* <Route path="/catalog" element={<Catalog />} /> */}
          {/* <Route path="/resource/:barcode" element={<Resource />} /> */}
          {/* <Route path="/profile/:userId" element={<UserProfile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function state(state: unknown): unknown {
  throw new Error("Function not implemented.");
}

export default App;

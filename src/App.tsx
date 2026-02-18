import "./App.css";
import { useEffect } from "react";
import Home from "./pages/HomePage/Home";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./reducx/ReducxStrore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/Layoutpages/LayoutPage";
import { fetchUser } from "./reducx/slices/AuthnicationSlices";

function App() {
  const loggedInUser = useSelector(
    (state: RootState) => state.authentication.loggedInUser,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId && !loggedInUser) {
      dispatch(
        fetchUser({
          userId,
          property: "LoggedInUser",
        }),
      );
    }
  }, [dispatch, loggedInUser]);

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

export default App;

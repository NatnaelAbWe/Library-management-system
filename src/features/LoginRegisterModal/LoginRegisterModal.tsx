import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components";
import "./LoginRegisterModal.css";
import { AppDispatch, RootState } from "../../reducx/ReducxStrore";
import { useEffect, useState, useCallback } from "react"; // Added useCallback import
import { setDisplayLogin } from "../../reducx/slices/modelslices";
import LoginForm from "../authnication/component/LoginForm/LoginForm";

export const LoginRegisterModal: React.FC = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [login, setLogin] = useState<boolean>(true);

  // 1. Added dependency array to useCallback
  const closeModal = useCallback(() => {
    dispatch(setDisplayLogin(false));
  }, [dispatch]);

  const toggleLogin = () => {
    setLogin(!login);
  };

  useEffect(() => {
    if (authState.loggedInUser) {
      closeModal();
      // 2. Moved localStorage logic here instead of cleanup
      localStorage.setItem("userId", authState.loggedInUser._id);
    }
  }, [authState.loggedInUser, closeModal]);

  return (
    <Modal
      content={login ? <LoginForm toggleRegister={toggleLogin} /> : <></>}
      toggleModal={closeModal}
    />
  );
};

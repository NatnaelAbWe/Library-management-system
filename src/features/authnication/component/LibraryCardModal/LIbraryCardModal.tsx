import React from "react";
import type { AppDispatch, RootState } from "../../../../reducx/ReducxStrore";
import { useDispatch } from "react-redux";
import { setDisplayLibraryCard } from "../../../../reducx/slices/modelslices";
import { Modal } from "../../../../components";
import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";

export const LibraryCardModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  };

  return (
    <Modal content={<RegisterLibraryCardForm />} toggleModal={closeModal} />
  );
};
 
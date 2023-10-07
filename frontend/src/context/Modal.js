import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  // Example:
  //   Create toggle function for onClicks to change modal type to show
  //   const toggleLogin = () => {
  //     setType("login");
  //   };

  const addMemberModal = () => {
    setType('Add Member')
  }

  const cardDetailModal = () => {
    setType('Card Details')
  }

  const memberListModal = () => {
    setType('Member List')
  }

  const leaveDeleteProjectModal = () => {
    setType('Leave Delete')
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        type,
        setType,
        addMemberModal,
        cardDetailModal,
        memberListModal,
        leaveDeleteProjectModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {

    const [project, setProject] = useState(null)
    const [cardDetail, setCardDetail] = useState(null)

    return (
        <InfoContext.Provider
          value={{
            project,
            setProject,
            cardDetail,
            setCardDetail
          }}
        >
          {children}
        </InfoContext.Provider>
      );

}

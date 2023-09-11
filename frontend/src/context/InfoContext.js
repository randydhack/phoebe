import React, { createContext, useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {

    const [project, setProject] = useState(null)
    const [cardDetail, setCardDetail] = useState(null)
    const [cardRef, setCardRef] = useState(null)
    const [currentSection, setCurrentSection] = useState(null)
    const bottomEl = useRef(null)

    return (
        <InfoContext.Provider
          value={{
            project,
            setProject,
            cardDetail,
            setCardDetail,
            cardRef,
            setCardRef,
            currentSection,
            setCurrentSection,
            bottomEl
          }}
        >
          {children}
        </InfoContext.Provider>
      );

}

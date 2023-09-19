import React, { createContext, useState, useRef} from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {

    const [project, setProject] = useState(null)
    const [cardDetail, setCardDetail] = useState(null)
    const [cardRef, setCardRef] = useState(null)
    const [currentSection, setCurrentSection] = useState(null)
    const bottomEl = useRef(null)
    const [cardArr, setCardArr] = useState({});

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
            bottomEl,
            cardArr,
            setCardArr
          }}
        >
          {children}
        </InfoContext.Provider>
      );

}

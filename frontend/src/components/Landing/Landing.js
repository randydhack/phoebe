import { useSelector } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import { LuBird } from "react-icons/lu";
import boardExample from "../../images/board-example.png";
import LandingBody from "./LandingBody";
import { motion } from "framer-motion";
import "./Landing.css";
import { useEffect, useState, useContext } from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { InfoContext } from "../../context/InfoContext";

function widthChange() {
  return window.innerWidth <= 1366;
}

function checkHeight() {
  return window.innerHeight >= 1000;
}

function Landing() {
  const userSession = useSelector((state) => state.session.user);
  const { setLandingNav } = useContext(InfoContext)

  const [resize, setResize] = useState(null);
  const [height, setHeight] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    const resizable = () => setResize(widthChange());
    window.addEventListener("resize", resizable);
    return () => window.removeEventListener("resize", resizable);
  }, [resize, setResize]);

  useEffect(() => {
    const handleHeight = () => setHeight(checkHeight());
    window.addEventListener("resize", handleHeight);
    handleHeight();
    return () => window.removeEventListener("resize", handleHeight);
  }, [height, setHeight]);

  if (userSession) return <Redirect to="/home" />;

  setLandingNav(true)

  return (
    <div className="flex flex-col min-h-screen h-screen w-full bg-[#EDEBEA]">

      <div className="flex box-border flex-col h-screen bg-[#EDEBEA] w-full">
        <div
          className="px-[100px] pt-[40px] flex flex-col w-full"
          id="landing-body"
        >
          <div className="flex items-center flex-col w-full justify-center">
            <div className="w-full items-center flex justify-center flex-col h-[200px] ">
              <div className="flex flex-col text-center justify-evenly h-full w-[700px]">
                <h1 className="text-[52px] w-full text-center leading-[50px] font-light tracking-wider h-full flex justify-center items-center">
                  Work management platform for task organization
                </h1>
                <p className="text-center text-[18px] tracking-wide w-full font-light">
                  Want more efficiency in your organization? Phoebe is easy for
                  all teams and personal use, so you can deliver quality work,
                  faster.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center relative h-[500px]">
            <motion.img
              src={boardExample}
              className="w-[1000px] max-w-[1000px] rounded-xl absolute top-[50px] overflow-hidden"
              initial={{ width: "900px", opacity: 0, scale: 0.5 }}
              animate={{ width: "1000px", opacity: 1, scale: 1 }}
              transition={{
                opacity: {
                  duration: 2,
                },
                width: {
                  duration: 1.5,
                },
                ease: "easeOut",
                duration: 1.5,
              }}
            />
          </div>
        </div>
        <LandingBody resize={resize} />
        <div className="w-full bg-[#2A2B2C] h-[100px] text-white flex justify-between px-[20px] ">
          <div className="py-[10px] flex justify-between w-full">
            <div>Phoebe 2023</div>
            <div>Developer : Randy Hac</div>
            <div className="flex w-[150px] justify-between">
              <a
                href={"https://www.linkedin.com/in/randy-hac-4577a71b0/"}
                target="_blank"
                className="flex items-center"
              >
                <BsLinkedin className="mr-[5px]" /> linkedin
              </a>
              <a
                href={"https://github.com/randydhack"}
                target="_blank"
                className="flex items-center"
              >
                <FaGithubSquare className="mr-[5px]" /> github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

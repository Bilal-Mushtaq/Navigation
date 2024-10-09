import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link"; 

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Experience");
  const controls = useAnimation();

  useEffect(() => {
    document.body.style.transition = "background-color 0.3s ease";
    if (isOpen) {
      document.body.style.backgroundColor = "#F2EED7";
    } else {
      document.body.style.backgroundColor = "white";
    }

    return () => {
      document.body.style.backgroundColor = "white";
      document.body.style.transition = "";
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true);
      controls.start("open");
    }
  };

  const handleMouseLeave = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
        controls.start("closed");
      }, 100);
    }
  };

  const navVariants = {
    open: { y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      y: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const iconVariants = {
    open: {
      y: 92,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const leftBorderVariants = {
    open: {
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      x: "-100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const rightBorderVariants = {
    open: {
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      x: "100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const bottomBorderVariants = {
    open: {
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      y: "100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const handleLinkClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 8 }}>
        <motion.div
          variants={leftBorderVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="fixed left-0 top-0 bottom-0 w-6 bg-white shadow-lg"
          style={{ height: "100vh" }}
        />

        <motion.div
          variants={rightBorderVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="fixed right-0 top-0 bottom-0 w-6 bg-white shadow-lg"
          style={{ height: "100vh" }}
        />

        <motion.div
          variants={bottomBorderVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="fixed bottom-0 left-4 right-4 h-6 bg-white shadow-lg"
        />
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full"
      >
        <motion.nav
          className="fixed top-0 left-0 right-0 bg-white w-full h-24"
          initial="closed"
          animate={controls}
          variants={navVariants}
          style={{ zIndex: 9 }}
        >
          <div className="container mx-auto h-full flex justify-center space-x-2">
            {["Experience", "Technology", "Discover", "Watch"].map((item) => (
              <Link
                key={item}
                href={`#`} 
                onClick={() => handleLinkClick(item)}
                className={`text-black text-xl flex-1 flex justify-center flex-col border-t-4 items-start relative ${
                  activeItem === item
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-black"
                } ${
                  activeItem !== item ? "hover:text-gray-600" : "hover:text-orange-500"
                } ${
                  activeItem !== item ? "hover:border-gray-400" : ""
                }`}
              >
                {item} <br /><span className="text-black">Expedition Baikal</span>
              </Link>
            ))}
          </div>
        </motion.nav>

        <motion.div
          className="fixed top-0 left-0 right-0 flex justify-center"
          variants={iconVariants}
          initial="closed"
          animate={controls}
          style={{ height: "35px", zIndex: 10 }}
        >
          <div
            className="bg-white p-2 cursor-pointer flex justify-center items-center flex-col rounded-b-2xl shadow-md"
            style={{ width: "8rem", margin: "0 auto" }}
          >
            <div className="w-6 h-0.5 bg-black mb-1" />
            <div className="w-6 h-0.5 bg-black" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NavBar;

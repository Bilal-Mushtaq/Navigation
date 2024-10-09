import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function CombinedScrollAnimation() {
  const containerRef = useRef(null);
  const [activeGender, setActiveGender] = useState("Men");

  const handleGenderToggle = (gender) => {
    setActiveGender(gender);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const moveProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const scaleProgress = useTransform(
    scrollYProgress,
    [0.4, 0.6, 0.8],
    [0, 1, 0]
  );
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    ["0%", "50%", "50%", "30%"]
  );
  const imageY = useTransform(moveProgress, [0, 1], ["0%", "0%"]);
  const scale = useTransform(scaleProgress, [0, 1], [1, 2]);
  const textY = useTransform(moveProgress, [0, 1], ["0%", "-150%"]);
  const imageOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.38, 0.39],
    ["inherit", "#1e2736"]
  );
  const buttonOpacity = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);

  const firstOverlayTextOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.5],
    [0, 1, 0]
  );
  const secondOverlayTextOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.63],
    [0, 1, 0]
  );
  const thirdTextOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.95, 1],
    [0, 1, 1, 1]
  );

  const progressBars = [...Array(30)].map((_, index) => {
    const reverseIndex = 29 - index;
    const startPoint = 0.65 + reverseIndex * 0.01;

    return {
      backgroundColor: useTransform(
        scrollYProgress,
        [startPoint, startPoint + 0.001],
        ["#ffffff", "#0079BD"]
      ),
      opacity: useTransform(scrollYProgress, [0.6, 0.65], [0, 1]),
    };
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div className={styles.background} style={{ backgroundColor }} />
      <div className={styles.content}>
        {/* Previous content remains the same */}
        <motion.div
          className={styles.imageWrapper}
          style={{ x: imageX, y: imageY }}
        >
          <motion.div style={{ scale: scale, opacity: imageOpacity }}>
            <Image
              src={activeGender === "Men" ? "/images/1.jpeg" : "/images/2.jpeg"}
              alt="Scroll Animation Image"
              width={450}
              height={450}
              className={styles.image}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.text}
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className={styles.genderToggle}>
            <button
              className={`${styles.toggleButton} ${
                activeGender === "Men" ? styles.active : ""
              }`}
              onClick={() => handleGenderToggle("Men")}
            >
              Men
            </button>
            <button
              className={`${styles.toggleButton} ${
                activeGender === "Women" ? styles.active : ""
              }`}
              onClick={() => handleGenderToggle("Women")}
            >
              Women
            </button>
          </div>
          <h1>
            The{" "}
            <span className={styles.highlight}>
              Eigerjoch Pro IN Hooded Jacket
            </span>{" "}
            is designed for extremely cold and harsh conditions, keeping you
            warm even when temperatures drop to -40°C.
          </h1>
        </motion.div>

        <motion.div
          className={styles.overlayText}
          style={{ opacity: firstOverlayTextOpacity }}
        >
          <h2>
            Ultra-light{" "}
            <span className={styles.highlight}>Pertex® Quantum Pro</span>
          </h2>
        </motion.div>

        <motion.div
          className={styles.overlayText}
          style={{ opacity: secondOverlayTextOpacity }}
        >
          <h2>
            Treated with an{" "}
            <span className={styles.highlight}>ultra-thin water-repellent</span>{" "}
            and insulated with a water-resistant filling.
          </h2>
        </motion.div>

        <motion.div className={styles.progressContainer}>
          <motion.div
            className={styles.progressBars}
            style={{ opacity: thirdTextOpacity }}
          >
            {progressBars.map((bar, index) => (
              <motion.div
                key={index}
                className={styles.progressBar}
                style={{
                  backgroundColor: bar.backgroundColor,
                  opacity: bar.opacity,
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className={styles.sideText}
            style={{ opacity: thirdTextOpacity }}
          >
            <h2>
              <span>Fill power 850 in³</span> <br />
              Water-repellent 90/10 goose down The warmest jacket Mammut offers
            </h2>
          </motion.div>
        </motion.div>

        <motion.button
          className={styles.shopButton}
          style={{ opacity: buttonOpacity }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 448 512"
            className={styles.shopIcon}
          >
            <path
              fill="#f56905"
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
          <span className={styles.shopText}>Shop Jacket</span>
        </motion.button>
      </div>
    </div>
  );
}

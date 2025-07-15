import { useEffect, useState } from "react";

export default function AnimatedText() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Build", "Sell", "Create", "Succeed", "Innovate", "Scale"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="animated-text-container">
      <div className="content">
        <div className="content__container">
          <p className="content__container__text">
            {words[0]}
          </p>
          
          <ul className="content__container__list">
            {words.slice(1).map((word, index) => (
              <li key={index} className="content__container__list__item">
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
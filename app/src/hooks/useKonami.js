import { useEffect } from "react";

export default function useKonami(callback) {
  const code = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "b","a"
  ];

  useEffect(() => {
    let index = 0;

    function onKey(e) {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callback]);
}

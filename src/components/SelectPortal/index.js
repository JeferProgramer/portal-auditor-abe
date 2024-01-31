import ChevronDown from "@/Icons/ChevronDown";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SelectPortal.module.scss";

const SelectPortal = ({ title, placeholder, options, handleChange }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const selectRef = useRef(null);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleSelection = (option) => {
    setSelectedOption(option.label);
    setIsListOpen(false);
    handleChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsListOpen(false);
      }
    };
    // Agrega un event listener cuando el componente se monta
    document.addEventListener("mousedown", handleClickOutside);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.observationsFieldContainer}>
      <div className={styles.projectContainer} ref={selectRef}>
        <div className={styles.projectTitle}>{title}</div>
        <div className={styles.selectionContainer} onClick={toggleList}>
          <div className={styles.selectionBox}>
            <div className={styles.selectionText} title={selectedOption}>
              {selectedOption}
            </div>
            <div className={styles.arrowContainer}>
              <ChevronDown />
            </div>
          </div>
        </div>
        {isListOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <div
                key={index}
                className={styles.optionItem}
                onClick={() => handleSelection(option)}
              >
                <div className={styles.optionText}>{option.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPortal;
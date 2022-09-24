import React, { useEffect, useState } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption // This means that it is an optional field. We do not have to give a value to it. It can be an undefined
  onChange: (value: SelectOption | undefined) => void // it returns nothing
}

const Select = ({ options, value, onChange }: SelectProps) => {
  console.log("Rendering Select");

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0)
    }
  }, [isOpen])

  const clearOptions = (e: any) => {
    e.stopPropagation();
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (option !== value) {
      onChange(option)
    } else {
      console.log("Option === value");
    }
  };

  const isOptionSelected = (option: SelectOption) => option === value;

  return (
    <div
      onClick={() => setIsOpen(p => !p)}
      onBlur={() => setIsOpen(false)}
      className={styles.container}
      tabIndex={0}
    >
      <span className={styles.value}>{value?.label}</span>
      <button onClick={(e) => clearOptions(e)} className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => {
              console.log('mouseENter')
              setHighlightedIndex(index)
            }}
            key={option.value}
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${highlightedIndex === index ? styles.highlighted : ""}`}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Select;
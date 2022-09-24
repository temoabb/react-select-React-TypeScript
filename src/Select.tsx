import React, { useEffect, useState } from 'react';
import styles from './Select.module.css';

export type SelectOption = {
  label: string
  value: string | number
}

type SingleSelectProps = {
  multiple?: false,
  value?: SelectOption,
  onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
  multiple: true,
  value: SelectOption[], // it is gonna be an empty array or an array that has values inside of it
  onChange: (value: SelectOption[]) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)


const Select = ({ multiple, options, value, onChange }: SelectProps) => {
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
    multiple ? onChange([]) : onChange(undefined)
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(v => v !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) {
        onChange(option)
      }
    }
  };

  const isOptionSelected = (option: SelectOption) => multiple ? value.includes(option) : option === value;

  return (
    <div
      onClick={() => setIsOpen(p => !p)}
      onBlur={() => setIsOpen(false)}
      className={styles.container}
      tabIndex={0}
    >
      <span className={styles.value}>
        {
          multiple
            ? value.map(v => (
              <button
                key={Math.random()}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v)
                }}>
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            )) : value?.label
        }
      </span>
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
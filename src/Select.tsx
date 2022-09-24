import React, { useEffect, useState, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(ps => !ps);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener('keydown', handler);

    return () => containerRef.current?.removeEventListener('keydown', handler);

  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
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
                className={styles["option-badge"]}
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

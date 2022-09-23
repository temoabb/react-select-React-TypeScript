import styles from './Select.module.css';

type SelectOption = {
  label: string
  value: any
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption // This means that it is an optional field. We do not have to give a value to it. It can be an undefined
  onChange: (value: SelectOption | undefined) => void // it returns nothing
}

const Select = ({ value, onChange, options }: SelectProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.value}>Value</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={styles.iptions}>
        {options.map(option => (
          <li key={option.label} className={styles.option}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Select;
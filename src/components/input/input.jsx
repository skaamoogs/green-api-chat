import style from "./input.module.scss";

export const INPUT_VARIATIONS = {
  FORM: "form",
  CHAT: "chat",
};

export const Input = (props) => {
  const {
    label,
    value,
    name,
    type,
    placeholder,
    onChange,
    required,
    className,
    variation,
  } = props;

  return (
    <div className={`${style.container} ${className}`}>
      {label && <label className={`${style[variation]}`}>{label}</label>}
      <input
        className={`${style.input} ${style[`input_${variation}`]}`}
        value={value}
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

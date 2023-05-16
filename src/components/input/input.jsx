import style from "./input.module.scss";

export const Input = (props) => {
  const { label, value, name, type, placeholder, onChange } = props;

  return (
    <div className={style.container}>
      {label && <label>{label}</label>}
      <input
        value={value}
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

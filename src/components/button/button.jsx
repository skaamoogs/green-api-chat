import style from "./button.module.scss";

export const Button = (props) => {
  const { children, onClick, className, ...otherProps } = props;
  return (
    <button className={`${style.button} ${className}`} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

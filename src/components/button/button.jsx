import style from "./button.module.scss";

export const Button = (props) => {
  const { children, onClick, ...otherProps } = props;
  return (
    <button className={style.button} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

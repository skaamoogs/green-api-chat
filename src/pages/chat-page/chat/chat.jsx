import style from "./chat.module.scss";

export const Chat = (props) => {
  const { clickHandler, phone } = props;

  const chooseChat = () => {
    clickHandler(phone);
  }

  return (
    <div className={style.container} onClick={chooseChat}>
      <p className={style.title}>{phone}</p>
    </div>
  );
};

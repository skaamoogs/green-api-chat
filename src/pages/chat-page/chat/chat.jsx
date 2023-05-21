import style from "./chat.module.scss";

export const Chat = (props) => {
  const { clickHandler, phone, selected } = props;

  const chooseChat = () => {
    clickHandler(phone);
  };

  return (
    <div
      className={`${style.container} ${selected && style.selected}`}
      onClick={chooseChat}
    >
      <p className={style.title}>{phone}</p>
    </div>
  );
};

import style from "./message.module.scss";

const selectStatusIcon = (status) => {
  if (!status) {
    return;
  }

  switch (status) {
    case "sending":
      return "./sending.svg";
    case "sent":
      return "./sent.svg";
    case "delivered":
      return "./delivered.svg";
    case "read":
      return "./read.svg";
    default:
      break;
  }
};

export const Message = (props) => {
  const { text, status, time } = props;

  return (
    <div
      className={`${style.container} ${
        status ? style.outgoing : style.incoming
      }`}
    >
      <p className={style.text}>{text}</p>
      <div className={style.info}>
        <span className={style.time}>{time}</span>
        {status && (
          <img
            src={selectStatusIcon(status)}
            alt="delivered icon"
            className={style.status}
          />
        )}
      </div>
    </div>
  );
};

import { Input } from "../../components/input/input";
import style from "./chat.module.scss";

export const Chat = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.chatList}></div>
      <div className={style.chat}>
        <div className={style.chatHeader}>
          
        </div>
        <div className={style.messages}></div>
        <div className={style.sendMessageContainer}>
          <Input />
          <button type="button">
            <img src="./send.svg" alt="send icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

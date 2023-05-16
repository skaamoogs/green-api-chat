import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const typeMessage = (event) => {
    setMessage(event.target.value);
  };

  //const

  return (
    <div className={style.wrapper}>
      <div className={style.chatListContainer}>
        <div className={style.createChatContainer}>
          <Input label="Телефон получателя" />
          <Button type="submit">Создать чат</Button>
        </div>
        <div className={style.chatList}>
          {chats.map((chat) => (
            <Chat />
          ))}
        </div>
      </div>
      <div className={style.chatArea}>
        <div className={style.chatAreaHeader}></div>
        <div className={style.messages}></div>
        <form className={style.sendMessageContainer}>
          <Input
            name="message"
            type="submit"
            value={message}
            onChange={typeMessage}
            placeholder="Сообщение"
          />
          <button type="submit" className={style.sendButton} s>
            <img src="./send.svg" alt="send icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

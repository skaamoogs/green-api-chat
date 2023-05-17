import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [chats, setChats] = useState([]);

  const typeMessage = (event) => {
    setMessage(event.target.value);
  };

  const typePhone = (event) => {
    setPhone(event.target.value);
  };

  const createChat = () => {
    if (!chats.includes(phone)) {
      setChats((prevState) => [...prevState, phone]);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.chatListContainer}>
        <form className={style.createChatForm} onSubmit={createChat}>
          <Input
            label="Телефон получателя"
            type="tel"
            onChange={typePhone}
            value={phone}
            required
          />
          <Button type="submit">Создать чат</Button>
        </form>
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

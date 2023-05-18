import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import GreenAPIController from "../../controllers/greenAPI.controller";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";
import { AUTH_FIELDS } from "../../api/greenAPI.api";

const authParams = {
  [AUTH_FIELDS.id]: "1101820705",
  [AUTH_FIELDS.token]: "3b70bfc2a16a4b488ecfcf78a9547a0b5d8696730dd546439c",
};

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState("");

  const typeMessage = (event) => {
    setMessage(event.target.value);
  };

  const typePhone = (event) => {
    setPhone(event.target.value);
  };

  const createChat = (event) => {
    event.preventDefault();
    if (!Object.keys(chats).includes(phone)) {
      setChats((prevState) => ({ ...prevState, [phone]: {} }));
    }
  };

  const chooseChat = (phone) => {
    setCurrentChatId(`${phone}@c.us`);
    GreenAPIController.receiveNotification(authParams);
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
          {Object.keys(chats).map((phone) => (
            <Chat phone={phone} clickHandler={chooseChat} />
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
          <button type="submit" className={style.sendButton}>
            <img src="./send.svg" alt="send icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Button } from "../../components/button/button";
import { Input, INPUT_VARIATIONS } from "../../components/input/input";
import GreenAPIController from "../../controllers/greenAPI.controller";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { links } from "../../App";

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState("");
  const navigate = useNavigate();

  const currentUser = useLoaderData();

  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate(links.auth);
    }
  });

  const typeMessage = (event) => {
    setMessage(event.target.value);
  };

  const typePhone = (event) => {
    setError(false);
    const { value } = event.target;
    const pattern = /^\d*$/;
    if (pattern.test(value)) {
      setPhone(value);
    }
  };

  const createChat = (event) => {
    event.preventDefault();
    const pattern = /^\d{10,15}$/;
    const isValid = pattern.test(phone);
    if (!isValid) {
      setError(true);
    } else {
      if (!Object.keys(chats).includes(phone)) {
        setChats((prevState) => ({ ...prevState, [phone]: {} }));
        setPhone("");
      }
    }
  };

  const chooseChat = (phone) => {
    setCurrentChatId(`${phone}@c.us`);
    GreenAPIController.receiveNotification(currentUser);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.chatListContainer}>
        <div className={style.linkContainer}>
          <Link to={links.auth} className={style.link}>
            Изменить учетные данные
          </Link>
        </div>
        <form className={style.createChatForm} onSubmit={createChat}>
          <Input
            variation={INPUT_VARIATIONS.CHAT}
            label="Телефон получателя"
            type="tel"
            onChange={typePhone}
            value={phone}
            error={error}
            required
          />
          <p className={style.hint}>
            Формат номера: только цифры, без пробелов, с кодом страны
          </p>
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
            className={style.sendMessage}
            variation={INPUT_VARIATIONS.CHAT}
            name="message"
            value={message}
            onChange={typeMessage}
            placeholder="Сообщение"
          />
          <button type="submit" className={style.sendButton}>
            <img src="./send.svg" alt="send icon" className={style.sendIcon}/>
          </button>
        </form>
      </div>
    </div>
  );
};

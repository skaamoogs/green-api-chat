import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/button/button";
import { Input, INPUT_VARIATIONS } from "../../components/input/input";
import GreenAPIController from "../../controllers/greenAPI.controller";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { links } from "../../App";
import { storageService } from "../../service/storage/storage";
import { formatTime } from "../../utils/helpers";
import { Message } from "./message/message";

const setScroll = (elementRef) => {
  if (elementRef && elementRef.current) {
    elementRef.current.scrollTop = elementRef.current.scrollHeight;
  }
};

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [chats, setChats] = useState(storageService().get("chats") ?? {});
  const [currentChatId, setCurrentChatId] = useState("");
  const [messages, setMessages] = useState(
    storageService().get("messages") ?? []
  );
  const messagesRef = useRef(null);

  const currentUser = useLoaderData();

  useEffect(() => {
    if (currentUser) {
      GreenAPIController.receiveNotification(currentUser, notificationHandler);
    }
  }, []);

  useEffect(() => {
    storageService().set("messages", messages);
  }, [messages]);

  useEffect(() => {
    storageService().set("chats", chats);
  }, [chats]);

  useEffect(() => {
    setScroll(messagesRef);
  }, [currentChatId, messages]);

  const notificationHandler = (notification) => {
    let storageMessages = storageService().get("messages");
    const { typeWebhook, idMessage } = notification.body;
    if (typeWebhook === "outgoingMessageStatus") {
      const outgoingMessage = storageMessages.find(
        (message) => message.id === idMessage
      );
      if (outgoingMessage) {
        outgoingMessage.status = notification.body.status;
      }
      setMessages(storageMessages);
    }
    if (typeWebhook === "incomingMessageReceived") {
      if (storageMessages.find((message) => message.id === idMessage)) {
        return;
      }
      const { senderData, messageData, timestamp } = notification.body;
      if (messageData.typeMessage === "textMessage") {
        storageMessages.push({
          text: messageData.textMessageData.textMessage,
          time: formatTime(timestamp),
          id: idMessage,
          chatId: senderData.chatId,
          senderName: senderData.senderName,
        });
      }
      setMessages(storageMessages);
    }
  };

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
        setCurrentChatId(`${phone}@c.us`);
        setPhone("");
      }
    }
  };

  const chooseChat = (phone) => {
    setCurrentChatId(`${phone}@c.us`);
    setScroll(messagesRef);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const idMessage = await GreenAPIController.sendMessage(
      currentUser,
      currentChatId,
      message
    );
    if (idMessage) {
      const newMessage = {
        text: message,
        time: formatTime(),
        id: idMessage,
        chatId: currentChatId,
        status: "sending",
      };
      setMessages((prevState) => [...prevState, newMessage]);
      setMessage("");
      let storageMessages = storageService().get("messages");
      storageMessages.push(newMessage);
    }
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
            <Chat
              key={phone}
              phone={phone}
              clickHandler={chooseChat}
              selected={currentChatId && currentChatId.includes(phone)}
            />
          ))}
        </div>
      </div>
      {currentChatId ? (
        <div className={style.chatArea}>
          <div className={style.chatAreaHeader}></div>
          <div className={style.messages} ref={messagesRef}>
            {messages &&
              messages
                .filter((message) => message.chatId === currentChatId)
                .map((message) => (
                  <Message {...message} key={message.id}></Message>
                ))}
          </div>
          <form className={style.sendMessageContainer} onSubmit={sendMessage}>
            <Input
              className={style.sendMessage}
              variation={INPUT_VARIATIONS.CHAT}
              name="message"
              value={message}
              onChange={typeMessage}
              placeholder="Сообщение"
            />
            <button type="submit" className={style.sendButton}>
              <img
                src="./send.svg"
                alt="send icon"
                className={style.sendIcon}
              />
            </button>
          </form>
        </div>
      ) : (
        <div className={style.plug}>
          Создайте или выберите чат чтобы отправить сообщение
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Button } from "../../components/button/button";
import { Input, INPUT_VARIATIONS } from "../../components/input/input";
import GreenAPIController from "../../controllers/greenAPI.controller";
import style from "./chat-page.module.scss";
import { Chat } from "./chat/chat";
import { AUTH_FIELDS } from "../../api/greenAPI.api";

const authParams = {
  [AUTH_FIELDS.id]: "1101820705",
  [AUTH_FIELDS.token]: "3b70bfc2a16a4b488ecfcf78a9547a0b5d8696730dd546439c",
};

const notifications = [
  {
    receiptId: 16,
    body: {
      typeWebhook: "outgoingMessageStatus",
      chatId: "79115914491@c.us",
      instanceData: {
        idInstance: 1101820705,
        wid: "79115914491@c.us",
        typeInstance: "whatsapp",
      },
      timestamp: 1684399221,
      idMessage: "3A1EB40E10FBF089C2C2",
      status: "sent",
      sendByApi: false,
    },
  },
  {
    receiptId: 1234567,
    body: {
      typeWebhook: "incomingMessageReceived",
      instanceData: {
        idInstance: 1234,
        wid: "79115914491@c.us",
        typeInstance: "whatsapp",
      },
      timestamp: 1588091580,
      idMessage: "F7AEC1B7086ECDC7E6E45923F5EDB825",
      senderData: {
        chatId: "79001234568@c.us",
        sender: "79001234568@c.us",
        senderName: "Green API",
      },
      messageData: {
        typeMessage: "textMessage",
        textMessageData: {
          textMessage: "I use Green-API to send this message to you!",
        },
      },
    },
  },
  {
    receiptId: 123459,
    body: {
      typeWebhook: "incomingMessageReceived",
      instanceData: {
        idInstance: 1234,
        wid: "79115914491@c.us",
        typeInstance: "whatsapp",
      },
      timestamp: 1588091580,
      idMessage: "F7AEC1B7086ECDC7E6E45923F5EDB825",
      senderData: {
        chatId: "79001234568@c.us",
        sender: "79001234568@c.us",
        senderName: "Green API",
      },
      messageData: {
        typeMessage: "textMessage",
        textMessageData: {
          textMessage: "I use Green-API to send this message to you!",
        },
      },
    },
  },
];

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
            variation={INPUT_VARIATIONS.CHAT}
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
            variation={INPUT_VARIATIONS.CHAT}
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

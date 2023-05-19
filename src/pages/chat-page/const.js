export const notifications = [
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

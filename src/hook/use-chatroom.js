import { useEffect } from "react";
import { useState } from "react";

export function useChatroom(username) {
  const [ws, setWs] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialise la websocket
    if (!ws) {
      const ws = new WebSocket("wss://imr3-react.herokuapp.com");
      setWs(ws);
    } else {
      // On message
      ws.onmessage = (evt) => {
        const newMessages = JSON.parse(evt.data);
        setMessages([...messages, ...newMessages]);
      };
    }
  }, [ws, messages]);

  const sendMessage = (message, moment) => {
    if (!username) {
      return;
    }

    if (ws) {
      const msgObject = { name: username, message };
      if (moment) {
        msgObject.moment = moment;
      }
      ws.send(JSON.stringify(msgObject));
    }
  };

  return { messages, sendMessage };
}

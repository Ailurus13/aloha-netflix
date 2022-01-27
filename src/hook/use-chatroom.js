import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

export function useChatroom() {
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

  const sendMessage = (message) => {
    if (ws) {
      const msgObject = { name: "Tristan", message };
      ws.send(JSON.stringify(msgObject));
    }
  };

  return { messages, sendMessage };
}

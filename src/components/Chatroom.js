import { useState } from "react/cjs/react.development";
import { useChatroom } from "../hook/use-chatroom";

function Message({ message }) {
  return (
    <p>
      {message.name} : {message.message}
    </p>
  );
}

export function Chatroom({ className }) {
  const { messages, sendMessage } = useChatroom();
  const [message, setMessage] = useState("");

  return (
    <div className={className}>
      <h2>Chatroom</h2>
      {messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <button onClick={() => sendMessage(message)}>Send</button>
      </div>
    </div>
  );
}

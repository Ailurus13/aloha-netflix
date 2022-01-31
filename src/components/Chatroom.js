import { useState } from "react";
import { useChatroom } from "../hook/use-chatroom";
import { ChatroomControl } from "./ChatroomControl";

function convertToString(v, delim = " : ") {
  const showWith0 = (value) => (value < 10 ? `0${value}` : value);
  const hours = showWith0(Math.floor(v / 3600));
  const minutes = showWith0(Math.floor((v - hours * 3600) / 60));
  const seconds = showWith0(Math.floor(v - hours * 3600 - minutes * 60));
  return `${
    parseInt(hours) ? `${hours}${delim}` : ""
  }${minutes}${delim}${seconds}`;
}

function Message({ message, onMessageClick }) {
  return (
    <p
      className="border-t-2 hover:bg-gray-400"
      onClick={() => {
        onMessageClick(message);
      }}
    >
      {message.name}{" "}
      {message.moment && (
        <span className="font-bold text-blue-700">
          ({convertToString(message.moment)})
        </span>
      )}{" "}
      : {message.message}
    </p>
  );
}

export function Chatroom({ id, className, moment, onMessageClick }) {
  const [name, setName] = useState();
  const { messages, sendMessage } = useChatroom(name);

  const orderedMessages = messages.sort((a, b) => b.when - a.when);

  return (
    <div id={id} className={`flex flex-col ${className}`}>
      <h2 className="font-bold text-lg">Chatroom</h2>
      <div className="flex-1 flex flex-col h-4/5">
        <div className="flex-1 flex flex-col-reverse gap-2 pb-2 pt-2 overflow-y-scroll">
          {orderedMessages?.map((message, index) => (
            <Message
              key={index}
              message={message}
              onMessageClick={onMessageClick}
            />
          ))}
        </div>
        <ChatroomControl
          defaultName={name}
          onChangeName={(name) => setName(name)}
          moment={moment}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

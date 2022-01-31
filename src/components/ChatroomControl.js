import { useState } from "react";

export function ChatroomControl({
  moment,
  sendMessage,
  defaultName,
  onChangeName,
}) {
  const [name, setName] = useState();
  const [message, setMessage] = useState("");

  const control = (
    <div className="flex flex-col mt-3 bg-gray-300 p-3 rounded">
      <input
        className="border-2 rounded mr-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="mt-3">
        <button
          className="rounded bg-blue-300 pl-1 pr-1 w-full"
          onClick={() => {
            sendMessage(message, moment);
            setMessage("");
          }}
        >
          Partager
        </button>
        <button
          className="rounded bg-gray-400 pl-1 pr-1 w-full mt-1"
          onClick={() => {
            sendMessage(message);
            setMessage("");
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );

  const selectName = (
    <div className="flex flex-col mt-3 bg-gray-300 p-3 rounded">
      <div>Choisissez un pseudo :</div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="border-2 rounded mr-1"
      />
      <button
        className="rounded bg-gray-400 pl-1 pr-1 w-full mt-1"
        onClick={() => {
          onChangeName(name);
        }}
      >
        GO !!
      </button>
    </div>
  );

  return defaultName ? control : selectName;
}

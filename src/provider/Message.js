import React, { useState, useContext } from "react";

const MessageContext = React.createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState(null);

  const display = (message, type) => {
    setMessage(message);
    setType(type);
  };

  const hide = () => {
    setMessage("");
    setType(null);
  };

  const color = (type) => {
    if (type === "danger") {
      return "bg-danger";
    }

    if (type === "warning") {
      return "bg-warning";
    }

    if (type === "success") {
      return "bg-success";
    }

    return "bg-grey-500";
  };

  return (
    <MessageContext.Provider value={{ display }}>
      {message && (
        <div
          className={`z-50 ${color(
            type
          )} absolute w-1/2 left-0 right-0 mr-auto ml-auto mt-2 rounded p-2 flex`}
        >
          <div className="flex-1 border-r mr-2">{message}</div>
          <div className="self-center cursor-pointer">
            <span onClick={hide}>Fermer</span>
          </div>
        </div>
      )}
      <div>{children}</div>
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}

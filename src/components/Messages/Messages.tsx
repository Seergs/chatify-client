import React, { useRef, useEffect } from "react";
import Message, { IMessage } from "../Message/Message";

type MessagesProps = {
  messages: IMessage[];
  user: string;
};

export default function Messages({ messages, user }: MessagesProps) {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    executeScroll();
  }, [messages]);

  const executeScroll = () => {
    const node = myRef.current;

    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mb-16 mt-16 overflow-auto">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={user} />
        </div>
      ))}
      <div ref={myRef}></div>
    </div>
  );
}

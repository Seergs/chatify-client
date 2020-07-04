import React, { FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";

type WriteMessageProps = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (e: React.KeyboardEvent<HTMLInputElement> | FormEvent) => void;
};

export default function WriteMessage({
  message,
  setMessage,
  sendMessage,
}: WriteMessageProps) {
  return (
    <form
      className="fixed flex w-screen bottom-0 mb-1 sm:pr-4"
      onSubmit={(e) => sendMessage(e)}
    >
      <input
        className="h-16 bg-gray-100 p-2 w-4/5 md:w-11/12 border focus:outline-none focus:shadow-outline "
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button
        className="flex items-center justify-center w-1/5 md:w-1/12 bg-green-700 hover:bg-green-600 active:bg-green-800 text-green-100"
        type="submit"
      >
        <FaPaperPlane className="h-5 w-5 fill-current text-green-200" />
      </button>
    </form>
  );
}

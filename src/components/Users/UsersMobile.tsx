import React from "react";
import { FaTimes, FaCircle } from "react-icons/fa";

type UsersMobileProps = {
  users: string[];
  toggleList: () => void;
};

export default function UsersMobile({ users, toggleList }: UsersMobileProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl">Users in the chat</h3>
        <FaTimes
          onClick={toggleList}
          className="h-5 w-5 fill-current text-gray-600 cursor-pointer"
        />
      </div>
      {users.map((user, i) => (
        <div key={i} className="flex items-center">
          <FaCircle className="fill-current text-green-500 mr-2" />
          <div className="text-lg text-gray-700">{user}</div>
        </div>
      ))}
    </>
  );
}

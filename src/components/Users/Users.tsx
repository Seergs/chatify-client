import React from "react";
import { FaCircle } from "react-icons/fa";

type UserProps = {
  users: string[];
};

export default function Users({ users }: UserProps) {
  return (
    <div className="hidden lg:block  lg:fixed right-0 h-screen lg:w-1/5 overflow-auto z-10 pb-16 bg-gray-100">
      <h5 className="flex items-center justify-center h-8 m-2 font-medium text-gray-700">
        Users in the Chat
      </h5>
      {users.map((user, i) => (
        <div className="flex items-baseline px-4 mb-1 text-gray-700" key={i}>
          <FaCircle className="h-2 w-2 mr-2 fill-current text-green-500" />
          {user}
        </div>
      ))}
    </div>
  );
}

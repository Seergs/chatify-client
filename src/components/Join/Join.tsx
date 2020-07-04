import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Join() {
  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);
  const validate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!name) {
      e.preventDefault();
      setError("Please select a username");
    } else if (name.trim().length < 6) {
      e.preventDefault();
      setError("Username must be at least 6 characters long");
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-4xl text-green-800">Welcome to Chatify</h2>
      <h3 className="mt-3 text-lg">
        To start chatting you have to select a name
      </h3>
      <p className="text-gray-600">
        This is the name that other users will see
      </p>

      <form className="mt-6 flex flex-col">
        <label
          className="font-medium text-gray-600 tracking-wide"
          htmlFor="name"
        >
          USERNAME
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your username"
          className="mt-1 px-2 bg-gray-200 h-16 text-lg text-gray-800 border rounded focus:outline-none focus:shadow-outline"
        />
        {error && (
          <span className="p-1 text-sm bg-red-600 text-red-100">{error}</span>
        )}
        <Link
          className="py-4 mt-4 bg-green-600 rounded text-center text-gray-100 font-semibold shadow-md uppercase hover:bg-blue-500 active:bg-blue-700 active:shadow-none"
          onClick={validate}
          to={`/general?name=${name}`}
        >
          Join
        </Link>
      </form>
    </div>
  );
}

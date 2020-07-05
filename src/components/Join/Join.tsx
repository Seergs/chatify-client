import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Join() {
  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);

  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await validateUsername(name);
    if (error) {
      setError(error);
    } else {
      history.push(`/general?name=${name}`);
    }
  };
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-4xl text-green-800">Welcome to Chatify</h2>
      <h3 className="mt-3 text-lg">
        To start chatting you have to select a name
      </h3>
      <p className="text-gray-600">
        This is the name that other users will see
      </p>

      <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
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
        <button className="py-4 mt-4 bg-green-600 rounded text-center text-gray-100 font-semibold shadow-md uppercase hover:bg-green-500 active:bg-green-700 active:shadow-none">
          Join
        </button>
      </form>
    </div>
  );
}

export const validateUsername = async (name: string) => {
  type ReturnData = {
    error: null | string;
  };

  let returnData: ReturnData = {
    error: null,
  };
  if (!name || !name.trim().length) {
    returnData.error = "Please select a username";
  } else if (name === "Chatify") {
    returnData.error = "Not a valid username (this is the admin username)";
  } else if (name.trim().length < 6) {
    returnData.error = "Username must be 6 characters at least";
  } else {
    try {
      //await axios.post("http://localhost:5000/users", { name });
      await axios.post("https://chatify-server-socket.herokuapp.com/users", {
        name,
      });
    } catch (e) {
      returnData.error = e.response.data.message;
    }
  }

  return returnData;
};

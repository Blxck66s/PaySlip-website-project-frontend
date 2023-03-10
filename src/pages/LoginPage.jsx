import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import amiris from "../amiris.png";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

function LoginPage() {
  const { login, getuser } = useContext(AuthContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const [inputPL, setInputPL] = useState({
    username: "username",
    password: "password",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.username.trim() === "" || input.password.trim() === "") {
      return;
    }
    try {
      setLoading(true);

      await login(input);
      const res = await getuser();

      navigate("/");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data?.message);
      if (err.response?.data?.message === "password is invalid") {
        setInput({ ...input, password: "" });
        setInputPL({ ...inputPL, password: "password is invalid" });
      }
      if (err.response?.data?.message === "username is invalid") {
        setInput({ ...input, username: "" });
        setInputPL({ ...inputPL, username: "username is invalid" });
      }
      if (err.response?.data?.message === "this username doesnt exist") {
        setInput({ password: "", username: "" });
        setInputPL({
          password: "password",
          username: "this username doesnt exist",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="h-screen flex justify-center items-center">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col h-fit gap-5 rounded-md p-6 shadow-md bg-white bg-opacity-5 border border-b-0 border-r-0 border-white border-opacity-20 backdrop-blur-sm ">
            <span>
              <img src={amiris} alt="logo" className="h-[110px]" />
            </span>
            <input
              type="username"
              placeholder={inputPL.username}
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              className={
                inputPL.username !== "username"
                  ? `
                  text-white placeholder:px-2 placeholder:text-red-400 border-red-400 bg-transparent border-b focus:outline-none`
                  : "text-white placeholder:px-2 placeholder:text-gray-300 bg-transparent border-b focus:outline-none"
              }
            />
            <input
              type="password"
              placeholder={inputPL.password}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className={
                inputPL.password !== "password"
                  ? `
                text-white placeholder:px-2 placeholder:text-red-400 border-red-400 bg-transparent border-b focus:outline-none`
                  : "text-white placeholder:px-2 placeholder:text-gray-300 bg-transparent border-b focus:outline-none"
              }
            />
            <div className="flex justify-center">
              <button
                onClick={() => setLoading(false)}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 " />
                )}
                ?????????????????????????????????
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

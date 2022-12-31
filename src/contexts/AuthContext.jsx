import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (localStorage.getItem("token")) {
          await getuser();
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMe();
  }, []);

  const getuser = async () => {
    const res = await axios.get("https://payslipnode.onrender.com/auth/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data.user);
    return res.data.user;
  };
  const register = async (input) => {
    const res = await axios.post(
      "https://payslipnode.onrender.com/auth/register",
      input
    );
  };
  const login = async (input) => {
    const res = await axios.post(
      "https://payslipnode.onrender.com/auth/login",
      input
    );
    localStorage.setItem("token", res.data.token);
    return res;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        getuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

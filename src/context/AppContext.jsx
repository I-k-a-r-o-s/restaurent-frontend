import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.log("User not authenticated:", error);
      }
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const value = { navigate, loading, setLoading, user, setUser, axios };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

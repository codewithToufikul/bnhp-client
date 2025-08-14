import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Hooks/axiosIntance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const login = async (username, password) => {
    setUserLoading(true);
    try {
      const res = await axiosInstance.post("/adminUser/login", { username, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setUserLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/adminUser/profile");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, userLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fix ESLint Fast Refresh warning by disabling it just for this line
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

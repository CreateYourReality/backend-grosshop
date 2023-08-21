import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [user, setUser] = useState(null);


  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    await axios.get("/api/users/logout");
    setUser(null);
    nav("/");
  };

 

  useEffect(() => {
    axios
      .get("/api/users/secure")
      .then(({ data }) => setUser(data))
      .catch((e) => {
        setUser(null);
      })
      .catch((e) => {
        console.error("Error fetching user:", e);
        setUser(null);
      });
  }, [shouldRefetch]); 

  return (
    <UserContext.Provider
      value={{ setUser, user, isLoggedIn: !!user, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};

import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [shouldRefetch, _refetch] = useState(true);
  const [refreshToken, setRefreshToken] = useState(null)
  const [user, setUser] = useState(null);


  const refetch = () => _refetch((prev) => !prev);

  const logout = async () => {
    await axios.get("/api/users/logout");
    setUser(null);
    nav("/");
  };

/*   useEffect(() => {
    const fetchAccessToken = async () => {
      try { 
        if (refreshToken) {
          const response = await axios.get("/refresh", {
            headers: {
              Authorization: `${refreshToken}`,
            },
          });
          const newAccessToken = response.data.accessToken;
          axios.defaults.headers.common["Authorization"] = `${newAccessToken}`; 
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAccessToken();
  }, [refreshToken]) */

  useEffect(() => {
    axios
      .get("/api/users/secure")
      .then(({ data }) => {
        axios.get(`/api/users/${data.user._id}`).then((userData) => {setUser(userData.data)})
        .catch((e) => setUser(null))
        
        setUser(data.user)})
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
      value={{ setUser, setRefreshToken, user, isLoggedIn: !!user, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Clerk User
  const { user } = useUser();

  // Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // User Data
  const [userData, setUserData] = useState(null);

  // Axios Instance
  const axiosInstance = axios.create({
    baseURL: backendUrl,
  });

  // Register User
  const registerUser = async (user) => {
    try {
      console.log("Backend URL:", backendUrl);

      const response = await axiosInstance.post("/api/user/register", {
        clerkId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl,
      });

      console.log("Register Response:", response.data);
    } catch (error) {
      console.log("Register Error:", error);
    }
  };

  // Load User Data
  const loadUserData = async () => {
    try {
      const { data } = await axiosInstance.post("/api/user/data", {
        clerkId: user.id,
      });

      if (data.success) {
        setUserData(data.user);
        console.log("User Data:", data.user);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Load User Error:", error);
    }
  };

  // Run when user logs in
  useEffect(() => {
    console.log("Current User:", user);

    if (user) {
      registerUser(user);
      loadUserData();
    }
  }, [user]);

  const value = {
    backendUrl,
    axios: axiosInstance,
    registerUser,
    loadUserData,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
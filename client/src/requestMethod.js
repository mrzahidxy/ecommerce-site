import axios from "axios";
import { useSelector } from "react-redux";
import { useMemo } from "react";

// Define your API base URL
const baseURL = process.env.REACT_APP_BASE_URL;

const useAxiosInstances = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken; // Assuming the token is stored in user.currentUser.token

  console.log(user)

  // Create public axios instance
  const publicRequest = useMemo(() => {
    return axios.create({
      baseURL,
    });
  }, [baseURL]);

  // Create private axios instance
  const privateRequest = useMemo(() => {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [baseURL, token]);

  return { publicRequest, privateRequest };
};

export default useAxiosInstances;

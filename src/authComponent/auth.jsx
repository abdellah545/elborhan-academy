// auth.js

import axios from "axios";
import { getCookie } from "../Helper/CookieHelper";

const refreshTokenUrl = "/Authentication/FamilyRefreshToken";

export const refreshAccessToken = async () => {
  try {
    // Retrieve the refresh token from the cookie

    // Make a request to the server to refresh the access token
    const response = await axios.get(
      // Change to axios.get
      `https://el-burhanacademy.azurewebsites.net${refreshTokenUrl}`,
      {
        refreshToken : getCookie("refreshToken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // Extract the new access token from the response
    console.log(response);
    const newAccessToken = response.data.token;
    console.log("new access token", newAccessToken);

    // Update the session storage with the new access token

    sessionStorage.setItem("AccessToken", newAccessToken);
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error; // Propagate the error to the calling code if needed
  }
};

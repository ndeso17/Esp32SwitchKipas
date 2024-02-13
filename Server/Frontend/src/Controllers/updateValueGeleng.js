import axios from "axios";
import env from "react-dotenv";

const updateValueGeleng = async (tokenPemilik, namaDevice, valueGeleng) => {
  try {
    const API_URL = env.SERVER_BACKEND;
    const options = {
      method: "POST",
      url: `${API_URL}/updateValueGeleng`,
      headers: {
        "content-type": "application/json",
        //   authorization: `Bearer ${aksesToken}`,
      },
      // withCredentials: true,
      data: {
        tokenPemilik,
        namaDevice,
        valueGeleng,
      },
    };
    const requestApi = await axios.request(options);
    return requestApi.data;
  } catch (error) {
    console.error("Gagal Update Value RPM :", error);
    // Kirimkan Trigger Untuk Switch Alert Error
    const dataError = {
      statusCode: 500,
      message: "Gagal Update Value RPM",
      data: error,
    };
    return dataError;
  }
};

export default updateValueGeleng;

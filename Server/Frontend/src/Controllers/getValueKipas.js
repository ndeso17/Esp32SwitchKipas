import axios from "axios";
import env from "react-dotenv";

const getValueKipas = async (tokenPemilik, namaDevice) => {
  try {
    const API_URL = env.SERVER_BACKEND;
    // console.info("URL Backend", API_URL);
    const options = {
      method: "POST",
      url: `${API_URL}/getValueKipas`,
      headers: {
        "content-type": "application/json",
        //   authorization: `Bearer ${aksesToken}`,
      },
      // withCredentials: true,
      data: {
        tokenPemilik,
        namaDevice,
      },
    };
    const requestApi = await axios.request(options);
    return requestApi.data;
  } catch (error) {
    console.error("Gagal Get Value Kipas :", error);
    // Kirimkan Trigger Untuk Switch Alert Error
    const dataError = {
      statusCode: 500,
      message: "Gagal Get Value Kipas",
      data: error,
    };
    return dataError;
  }
};

export default getValueKipas;

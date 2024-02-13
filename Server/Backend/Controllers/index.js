require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../Models/index");

const index = async (req, res) => {
  res.json({
    statusCode: 200,
    message: "Selamat Datang....!!!",
    data: null,
  });
};

const getListKipas = async (req, res) => {
  try {
    const { tokenPemilik } = req.body;
    const data = await models.getListKipas(tokenPemilik);
    res.json({
      message: "GET All Kipas Success",
      data: data,
    });
  } catch (error) {
    console.error("Error in getListKipas:", error);
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

const updateValueRPM = async (req, res) => {
  try {
    const { tokenPemilik, namaDevice, valueRpm } = req.body;
    const dataReqBod = { tokenPemilik, namaDevice, valueRpm };
    const dataRequest = await models.updateValueRPM(dataReqBod);
    res.json({
      statusCode: 201,
      message: "Sukses, Update Value RPM.",
      data: dataRequest,
    });
  } catch (error) {
    console.error("Error in updateValueRPM:", error); // Tambahkan log error untuk memudahkan debugging
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

const updateValueGeleng = async (req, res) => {
  try {
    const { tokenPemilik, namaDevice, valueGeleng } = req.body;
    const dataReqBod = { tokenPemilik, namaDevice, valueGeleng };
    const dataRequest = await models.updateValueGeleng(dataReqBod);
    res.json({
      statusCode: 201,
      message: "Sukses, Update Value Geleng.",
      data: dataRequest,
    });
  } catch (error) {
    console.error("Error in updateValueGeleng:", error); // Tambahkan log error untuk memudahkan debugging
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

const getValueKipas = async (req, res) => {
  try {
    const { tokenPemilik, namaDevice } = req.body;
    const [dataRequest] = await models.getValueKipas(tokenPemilik, namaDevice);
    res.json({
      statusCode: 201,
      message: "Sukses, Get Value Kipas.",
      data: dataRequest,
    });
  } catch (error) {
    console.error("Error in getValueKipas:", error); // Tambahkan log error untuk memudahkan debugging
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const usernameValid = process.env.usernameLogin;
    const passwordValid = process.env.passwordLogin;
    const dataValid = {
      username: usernameValid,
      password: passwordValid,
    };

    const { username, password } = req.body;

    if (username === usernameValid) {
      bcrypt.compare(password, passwordValid, function (err, result) {
        if (err) {
          console.error(err);
          res.json({
            statusCode: 500,
            message: "Logic Error!",
            data: null,
          });
        } else {
          if (result) {
            console.log("Password is correct!");
            const token = jwt.sign({ username }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            console.log("Generated Token:", token);
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });

            res.json({
              statusCode: 201,
              message: "Sukses, Login.",
              data: null,
            });
          } else {
            console.log("Password is incorrect!");
            res.json({
              statusCode: 203,
              message: "Password Salah",
              data: null,
            });
          }
        }
      });
    } else {
      res.json({
        statusCode: 204,
        message: "Username Tidak Ditemukan!",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token"); // Menghapus cookie 'token'
    res.json({
      statusCode: 201,
      message: "Logout berhasil.",
      data: null,
    });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({
      message: "SERVER ERROR!",
      data: null,
    });
  }
};

// const convertPlainTextToBcrypt = async (req, res) => {
//   const passwordValid = process.env.password;
//   if (passwordValid !== null) {
//     bcrypt.hash(passwordValid, 10, function (err, hash) {
//       if (err) {
//         // Handle error
//         console.error(err);
//       } else {
//         // Store the hashed password in your database or use it as needed
//         console.log("Hashed Password:", hash);
//       }
//     });
//   } else {
//     console.error("Plain Text Null");
//   }
// };

module.exports = {
  index,
  getListKipas,
  updateValueRPM,
  updateValueGeleng,
  getValueKipas,
  loginUser,
  logoutUser,
  // convertPlainTextToBcrypt,
};

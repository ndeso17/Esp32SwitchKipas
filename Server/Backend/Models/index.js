const dbPool = require("../Config/Database");

const updateValueRPM = async (data) => {
  try {
    const SQLQuery =
      "UPDATE device SET valueRpm=? WHERE tokenPemilik=? AND namaDevice=?";
    const [rows, fields] = await dbPool.execute(SQLQuery, [
      data.valueRpm,
      data.tokenPemilik,
      data.namaDevice,
    ]);
    return rows;
  } catch (error) {
    console.error("Error saat melakukan update value RPM:", error);

    throw error;
  }
};
const updateValueGeleng = async (data) => {
  try {
    const SQLQuery =
      "UPDATE device SET valueGeleng=? WHERE tokenPemilik=? AND namaDevice=?";
    const [rows, fields] = await dbPool.execute(SQLQuery, [
      data.valueGeleng,
      data.tokenPemilik,
      data.namaDevice,
    ]);
    return rows;
  } catch (error) {
    console.error("Error saat melakukan update value geleng:", error);

    throw error;
  }
};

const getValueKipas = async (tokenPemilik, namaDevice) => {
  try {
    const SQLQuery =
      "SELECT * FROM device WHERE tokenPemilik=? AND namaDevice=?";
    const [rows, fields] = await dbPool.execute(SQLQuery, [
      tokenPemilik,
      namaDevice,
    ]);

    return rows;
  } catch (error) {
    console.error("Error saat melakukan query:", error);

    throw error;
  }
};

const getListKipas = async (tokenPemilik) => {
  try {
    const SQLQuery = "SELECT * FROM device WHERE tokenPemilik=?";
    const [rows, fields] = await dbPool.execute(SQLQuery, [tokenPemilik]);

    return rows;
  } catch (error) {
    console.error("Error saat melakukan query:", error);

    throw error;
  }
};

module.exports = {
  updateValueRPM,
  updateValueGeleng,
  getValueKipas,
  getListKipas,
};

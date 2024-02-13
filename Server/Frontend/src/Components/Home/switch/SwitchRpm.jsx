// SwitchRpm.js
import React, { useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import updateValueRpm from "../../../Controllers/updateValueRpm";
import getValueKipas from "../../../Controllers/getValueKipas";

const SwitchRpm = () => {
  const [value, setValue] = useState(0);
  const [tokenPemilik, setTokenPemilik] = useState("");
  const [namaDevice, setNamaDevice] = useState("");

  const getValueRpm = async (token, device) => {
    const getValue = await getValueKipas(token, device);
    const statusCode = getValue.statusCode;

    // eslint-disable-next-line eqeqeq
    if (statusCode != 201) {
      console.error("Gagal Mengambil Value Kipas  Tersimpan");
    } else {
      const dataKipas = getValue.data;

      if (dataKipas) {
        const valueRpm = dataKipas.valueRpm;
        setValue(valueRpm);
      } else {
        console.error("Data Kipas tidak tersedia atau tidak lengkap");
      }
    }
  };

  useEffect(() => {
    const storedTokenPemilik = localStorage.getItem("tokenPemilik");
    const storedNamaDevice = localStorage.getItem("namaDevice");
    setTokenPemilik(storedTokenPemilik !== null ? storedTokenPemilik : null);
    setNamaDevice(storedNamaDevice !== null ? storedNamaDevice : null);
  }, []);
  useEffect(() => {
    getValueRpm(tokenPemilik, namaDevice);
  }, [tokenPemilik, namaDevice]);

  const handleSwitchChange = async (val) => {
    setValue(val);
  };
  useEffect(() => {
    const updater = async () => {
      await updateValueRpm(tokenPemilik, namaDevice, value);
    };
    if (tokenPemilik !== null && namaDevice !== null) {
      updater();
      getValueKipas(tokenPemilik, namaDevice);
    } else {
      //   Tampilkan Sweet Alert Error
      console.error("Data tidak tercukupi!");
    }
  }, [value, tokenPemilik, namaDevice]);

  return (
    <ToggleButtonGroup
      type="radio"
      name="switch-value"
      value={value}
      defaultValue={value}
      onChange={handleSwitchChange}
    >
      <ToggleButton id="tbg-radio0" value={0}>
        0
      </ToggleButton>
      <ToggleButton id="tbg-radio1" value={1}>
        1
      </ToggleButton>
      <ToggleButton id="tbg-radio2" value={2}>
        2
      </ToggleButton>
      <ToggleButton id="tbg-radio3" value={3}>
        3
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SwitchRpm;

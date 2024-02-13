/* eslint-disable eqeqeq */
// SwitchGeleng.jsx
import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import getValueKipas from "../../../Controllers/getValueKipas";
import updateValueGeleng from "../../../Controllers/updateValueGeleng";

const SwitchGeleng = () => {
  const [isChecked, setIsChecked] = useState(null);
  const [valueRpm, setValueRpm] = useState(0);
  const [tokenPemilik, setTokenPemilik] = useState("");
  const [namaDevice, setNamaDevice] = useState("");
  const [geleng, setGeleng] = useState(null);

  const handleSwitchChange = (e) => {
    setIsChecked(!isChecked);
    // console.log("Value Switch Geleng :", e);
  };

  // Get Value RPM
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
        setValueRpm(valueRpm);
        const valueGeleng = dataKipas.valueGeleng;
        setGeleng(valueGeleng);
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
    const intervalId = setInterval(() => {
      getValueRpm(tokenPemilik, namaDevice);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [tokenPemilik, namaDevice]);
  useEffect(() => {
    if (geleng !== null) {
      console.log("Realtime Value Geleng:", geleng);
      if (geleng !== "LOW") {
        setIsChecked(false);
      } else {
        setIsChecked(true);
      }
    } else {
      console.error("Value Geleng Null");
    }
  }, [geleng]);
  useEffect(() => {
    const updateGeleng = async () => {
      const valueUpdate = isChecked ? "LOW" : "HIGH";
      await updateValueGeleng(tokenPemilik, namaDevice, valueUpdate);
    };

    updateGeleng();
  }, [tokenPemilik, namaDevice, isChecked]);

  return (
    <>
      {valueRpm != 0 && (
        <BootstrapSwitchButton
          checked={isChecked}
          width={100}
          onlabel="gelengOn"
          offlabel="gelengOff"
          onChange={handleSwitchChange}
        />
      )}
    </>
  );
};

export default SwitchGeleng;

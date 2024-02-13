/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./Home.css";
import baling from "../../Images/baling.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SwitchGeleng from "./switch/SwitchGeleng";
import SwitchRpm from "./switch/SwitchRpm";
import getValueKipas from "../../Controllers/getValueKipas";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [tokenPemilik, setTokenPemilik] = useState("");
  const [namaDevice, setNamaDevice] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [valueRpm, setValueRpm] = useState(0);

  const handleImgClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("tokenPemilik", tokenPemilik);
    localStorage.setItem("namaDevice", namaDevice);
    setShowModal(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const getValueRpm = async (token, device) => {
    const getValue = await getValueKipas(token, device);
    console.log("Home.jsx, Response Data Get Value:", getValue);
    const statusCode = getValue.statusCode;

    if (statusCode != 201) {
      console.error("Home.jsx, Gagal Mengambil Value Kipas  Tersimpan");
    } else {
      const dataKipas = getValue.data;

      if (dataKipas) {
        const valueRpm = dataKipas.valueRpm;
        setValueRpm(valueRpm);
      } else {
        console.error("Home.jsx, Data Kipas tidak tersedia atau tidak lengkap");
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
    }, 5000);
    return () => clearInterval(intervalId);
  }, [tokenPemilik, namaDevice]);

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <div className={`kipas rpm-${valueRpm}`} onClick={handleImgClick}>
            <div className="kipas-wrapper">
              <img src={baling} alt="Fan" />
              {showNotification && (
                <div className="notification">
                  <span>Tap Fan For Set Token & Device Name</span>
                </div>
              )}
            </div>
            <span>Status Kipas</span>
            <h3>
              {valueRpm == 0 ? "Kipas Dimatikan" : `Menyala Nomor ${valueRpm}`}
            </h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="switchGeleng">
            <span>Switch Geleng</span>
            <SwitchGeleng />
          </div>
        </Col>
        <Col>
          <div className="switchRpm">
            <span>Switch RPM</span>
            <SwitchRpm />
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Token Pemilik & Nama Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="tokenPemilik">
              <Form.Label>Token Pemilik</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Token Pemilik"
                value={tokenPemilik}
                onChange={(e) => setTokenPemilik(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="namaDevice">
              <Form.Label>Nama Device</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Nama Device"
                value={namaDevice}
                onChange={(e) => setNamaDevice(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;

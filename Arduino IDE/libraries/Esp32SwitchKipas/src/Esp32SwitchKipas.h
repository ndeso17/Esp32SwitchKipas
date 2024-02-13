#ifndef ESP32_SWITCH_KIPAS_H
#define ESP32_SWITCH_KIPAS_H

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

class Esp32SwitchKipas {
public:
  Esp32SwitchKipas(const char* ssid, const char* password, const char* serverUrl, const char* tokenPemilik, const char* namaDevice);
  void begin();
  void loop();

private:
  void koneksiWifi();
  void switchRpm(int valueRpmKipas);
  void switchGeleng(String valueGelengKipas);
  void sendDataToServer();

  const char* ssid;
  const char* password;
  const char* serverUrl;
  const char* tokenPemilik;
  const char* namaDevice;

  #define Nomor1 5
  #define Nomor2 4
  #define Nomor3 2
  #define Geleng 18
};

#endif


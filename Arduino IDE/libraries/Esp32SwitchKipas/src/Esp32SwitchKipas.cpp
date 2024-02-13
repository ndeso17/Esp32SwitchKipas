#include "Esp32SwitchKipas.h"

Esp32SwitchKipas::Esp32SwitchKipas(const char* ssid, const char* password, const char* serverUrl, const char* tokenPemilik, const char* namaDevice) {
  this->ssid = ssid;
  this->password = password;
  this->serverUrl = serverUrl;
  this->tokenPemilik = tokenPemilik;
  this->namaDevice = namaDevice;
}

void Esp32SwitchKipas::begin() {
  Serial.begin(115200);
  delay(1000);
  koneksiWifi();
  pinMode(Nomor1, OUTPUT);
  pinMode(Nomor2, OUTPUT);
  pinMode(Nomor3, OUTPUT);
  pinMode(Geleng, OUTPUT);

  digitalWrite(Nomor1, HIGH);
  digitalWrite(Nomor2, HIGH);
  digitalWrite(Nomor3, HIGH);
  digitalWrite(Geleng, HIGH);
}

void Esp32SwitchKipas::loop() {
  sendDataToServer();
  delay(3000);
}

void Esp32SwitchKipas::koneksiWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.println("\nConnecting");

  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(100);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void Esp32SwitchKipas::switchRpm(int valueRpmKipas) {
   if(valueRpmKipas == 1){
  digitalWrite(Nomor1, LOW);
  digitalWrite(Nomor2, HIGH);
  digitalWrite(Nomor3, HIGH);
 }else if(valueRpmKipas == 2){
  digitalWrite(Nomor1, HIGH);
  digitalWrite(Nomor2, LOW);
  digitalWrite(Nomor3, HIGH);
 }else if(valueRpmKipas == 3){
  digitalWrite(Nomor1, HIGH);
  digitalWrite(Nomor2, HIGH);
  digitalWrite(Nomor3, LOW);
 }else{
  digitalWrite(Nomor1, HIGH);
  digitalWrite(Nomor2, HIGH);
  digitalWrite(Nomor3, HIGH);
 }
}

void Esp32SwitchKipas::switchGeleng(String valueGelengKipas) {
  digitalWrite(Geleng, (valueGelengKipas == "HIGH") ? HIGH : LOW);
}

void Esp32SwitchKipas::sendDataToServer() {
  HTTPClient http;

  http.begin(serverUrl);

  DynamicJsonDocument jsonDoc(1024);
  jsonDoc["tokenPemilik"] = tokenPemilik;
  jsonDoc["namaDevice"] = namaDevice;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0) {
    String payload = http.getString();
    DynamicJsonDocument responseDoc(1024);
    deserializeJson(responseDoc, payload);
    int valueRpmKipas = responseDoc["data"]["valueRpm"].as<int>();
    String valueGelengKipas = responseDoc["data"]["valueGeleng"].as<String>();

    if(httpResponseCode == 200){
      switchRpm(valueRpmKipas);
      switchGeleng(valueGelengKipas);
    }
  } else {
    Serial.print("HTTP Request failed. Error code: ");
    Serial.println(httpResponseCode);

    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("WiFi disconnected. Reconnecting...");
      koneksiWifi();
    }
  }

  http.end();
}

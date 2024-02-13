# Esp32SwitchKipas
#### ID
Salin atau Pindahkan library Esp32SwitchKipas ke dalam library Arduino IDE, gunakan board ESP32 v2.0.10 pada Arduino IDE.

#### English
Copy or Move the Esp32SwitchKipas library into the Arduino IDE library, use the ESP32 v2.0.10 board on the Arduino IDE.

Board Manager Esp32
```bash
https://dl.espressif.com/dl/package_esp32_index.json
``` 

## Installation
#### ID
##### Arduino IDE
Salin atau Pindahkan library Esp32SwitchKipas ke dalam library Arduino IDE, gunakan board ESP32 v2.0.10 pada Arduino IDE. 

##### Server
Terdapat 2 program untuk server semuanya menggunakan JavaScript, install seperti umumnya program Nodejs. Atur .env sesuai dengan konfigurasi server yang hendak digunakan. Pastikan sudah menginstall modules global nodemon dan serve.

#### English
##### Arduino IDE
Copy or Move the Esp32SwitchKipas library into the Arduino IDE library, use the ESP32 v2.0.10 board on the Arduino IDE.

##### Servers
There are 2 programs for the server, all using JavaScript, install like most Nodejs programs. Set the .env according to the server configuration you want to use. Make sure you have installed the global nodemon and serve modules.

```bash
npm install -g nodemon serve
```

## Usage
#### ID
Jika server sudah dikonfigurasi dengan benar, maka semuanya akan baik-baik saja. Flash Esp32 dengan program yang sudah tersedia, edit beberapa variabel yang dibutuhkan seperti ssid WiFi, password WiFi, endpoint server, tokenDevice dan deviceName. Pada interface web, dia membutuhkan value dari tokenDevice dan deviceName. Kamu bisa mengaturnya dengan cara klik gambar kipas kemudian nanti akan muncul form input.

#### English
If the server is configured correctly, then everything will be fine. Flash Esp32 with the available program, edit several required variables such as WiFi SSID, WiFi password, server endpoint, tokenDevice and deviceName. In the web interface, it requires the values of tokenDevice and deviceName. You can set it by clicking on the fan image and then an input form will appear.

```cpp
const char* ssid = "YourSSID";
const char* password = "YourPassword";
const char* serverUrl = "http://your-server-url.com/getValueKipas";
const char* tokenDevice = "YourToken";
const char* deviceName = "YourDeviceName";
```

![Interface User](https://github.com/ndeso17/Esp32SwitchKipas/blob/master/fan.PNG)

![Set Token & Device Name](https://github.com/ndeso17/Esp32SwitchKipas/blob/master/settoken.PNG)

## Contributing
#### ID
Saran dan masukan anda sangat berarti bagi saya dan perkembangan repositori ini.
Silakan bergabung dengan saya dalam mengembangkan repositori ini bersama-sama.
#### English
Your suggestions and input mean a lot to me and the development of this repository.
Please join me in developing this repository together.

## GMC
#### ID
Untuk mendapatkan contoh .env dan sql database, sebagai gantinya adalah secangkir coffe untuk.
Sertakan username telegram kamu pada deskripsi pengiriman, saya akan mengirimkan contoh .env dan sql disana.

[Saweria](https://saweria.co/naxgrinting)

#### English
To get an example of .env and sql database, instead is a cup of coffee for.
Include your telegram username in the delivery description, I will send examples of .env and sql there.

[Paypal](https://paypal.me/khilmyfirdausromadon)

#include <Esp32SwitchKipas.h>

const char* ssid = "YourSSID";
const char* password = "YourPassword";
const char* serverUrl = "http://your-server-url.com/getValueKipas";
const char* tokenDevice = "YourToken";
const char* deviceName = "YourDeviceName";

Esp32SwitchKipas switchKipas(ssid, password, serverUrl, tokenDevice, deviceName);

void setup() {
    switchKipas.begin();
}

void loop() {
    switchKipas.loop();
}

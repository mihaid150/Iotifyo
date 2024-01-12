#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const int RELAY_PIN = 5;
bool isRelayOn = false;

unsigned long lastPrintTime = 0;  // Variable to store the last print time
const unsigned long printInterval = 10000; // Print interval in milliseconds

String token;

const char* ssidList[] = {"Mihaita_Net_RPi5"};  // The SSID (name) of the Wi-Fi network you want to connect to
const char* passwordList[] = {"KDT474wvr"};       // The password of the Wi-Fi network

void connectToWifi();

void setup() {
  Serial.begin(115200);
  connectToWifi();
  sendAuthenticateRequest();
  pinMode(RELAY_PIN, OUTPUT);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectToWifi();
    if (WiFi.status() == WL_CONNECTED) {
      sendAuthenticateRequest();
    }
  } else {
    // Check if data is available to read from the serial monitor
    if (Serial.available() > 0) {
      String input = Serial.readStringUntil('\n'); // Read the input until newline
      input.trim(); // Remove any leading/trailing whitespace

      // Check if the input is "relay"
      if (input.equalsIgnoreCase("relay")) {
        waitSignal(); // Call the function to perform the URL request
      }
    }
  }
  unsigned long currentMillis = millis();
  if (currentMillis - lastPrintTime >= printInterval) {
    // Update the lastPrintTime to the current time
    lastPrintTime = currentMillis;

    // Print the isRelayOn status to the Serial Monitor
    Serial.print("Relay is ");
    Serial.println(isRelayOn ? "ON" : "OFF");
  }
}

void connectToWifi() {
  delay(1000);
  Serial.println('\n');

  int ssidCount = sizeof(ssidList) / sizeof(ssidList[0]);
  for (int i = 0; i < ssidCount; i++) {
    const char* ssid = ssidList[i];
    const char* password = passwordList[i];

    WiFi.begin(ssid, password);
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.println(" ...");

    int connectionTimeout = 10;  // Timeout in seconds
    int connectionTimer = 0;
    while (WiFi.status() != WL_CONNECTED && connectionTimer < connectionTimeout) {
      delay(1000);
      connectionTimer++;
      Serial.print(connectionTimer);
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println('\n');
      Serial.println("Connection established!");
      Serial.print("Connected to: ");
      Serial.println(ssid);
      Serial.print("IP address:\t");
      Serial.println(WiFi.localIP());
      break;
    } else {
      Serial.println('\n');
      Serial.print("Failed to connect to ");
      Serial.println(ssid);
    }
  }
}

void sendAuthenticateRequest() {
  WiFiClient client;  // Create a WiFiClient object to use with HTTPClient

  HTTPClient http;
  String email = "mdaian150@yahoo.com";
  String password = "1234";

  // Create the JSON payload
  String payload = "{";
  payload += "\"email\": \"" + email + "\",";
  payload += "\"password\": \"" + password + "\"";
  payload += "}";

  http.begin(client, "http://192.168.4.1:8080/iotify/auth/authenticate");
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(payload);
  delay(2000);
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println(httpCode);
    Serial.println(response);
    if (response.indexOf("token") != -1) {
      int tokenStart = response.indexOf(":") + 2;
      int tokenEnd = response.indexOf("\"", tokenStart);
      token = response.substring(tokenStart, tokenEnd);
    }
    Serial.print("Token: ");
    Serial.println(token);
  } else {
    Serial.println("Error sending the request ");
    Serial.println(httpCode);
  }

  
  http.end();
}

void waitSignal() {
  WiFiClient client;
  HTTPClient http;
  String relay_url = "http://192.168.4.1:8080/iotify/controller/relay/get-state";

  http.begin(client, relay_url);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer " + token);
  int httpCode = http.GET();

  if(httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();

      bool serverRelayState = response.equals("true");
      if (serverRelayState != isRelayOn) {
        isRelayOn = serverRelayState;
        digitalWrite(RELAY_PIN, isRelayOn ? HIGH : LOW);
      }
    }
  } else {
    Serial.print("Error on HTTP request: ");
    Serial.println(http.errorToString(httpCode));
    Serial.println(httpCode);
  }

  http.end();
}
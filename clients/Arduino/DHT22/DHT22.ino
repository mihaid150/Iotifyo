#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define DHTTYPE DHT22

uint8_t DHTPin = 5;

#define ONE_WIRE_BUS 5

DHT dht(DHTPin, DHTTYPE);
OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

String token;

float temperature, humidity;

const char* ssidList[] = {"Mihăiță_Net", "Mihăiță_Net2"};         // The SSID (name) of the Wi-Fi network you want to connect to
const char* passwordList[] = {"mihai2001", "mihai2000"};        // The password of the Wi-Fi network

void connectToWifi();
void sendRegisterRequest();
void sendDHTSensorData();
void sendAuthenticateRequest();
void sendDallasTemperatureSensorData();

void setup() {
  Serial.begin(115200);
  pinMode(DHTPin, INPUT);
  dht.begin();
  sensors.begin();
  delay(2000);
  connectToWifi();
  // sendRegisterRequest();
  delay(2000);
  sendAuthenticateRequest();
}

void loop() {
  delay(5 * 60 * 1000);
  sendDHTSensorData();
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

    int connectionTimeout = 10; // Timeout in seconds
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

  http.begin(client, "http://mihaiddomain150.go.ro:8080/iotify/auth/authenticate");
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

void sendDHTSensorData() {

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(", Humidity: ");
  Serial.println(humidity);

  // Create the JSON payload for temperature
  String payload = "{";
  payload += "\"value\": " + String(temperature) + ",";
  payload += "}";

  WiFiClient client;
  HTTPClient http;

  // Set the target URL
  http.begin(client, "http://mihaiddomain150.go.ro:8080/iotify/Temperature/DHT22/save");

  // Add headers
  http.addHeader("Content-Type", "application/json");
  Serial.println("Bearer " + token);
  http.addHeader("Authorization", "Bearer " + token);

  // Make the POST request
  int httpCode = http.POST(payload);

  // Check the response
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpCode));
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error sending the request DHT");
  }

  // Create the JSON payload for humidity
  payload = "{";
  payload += "\"value\": " + String(humidity);
  payload += "}";

  // Set the target URL
  http.begin(client, "http://mihaiddomain150.go.ro:8080/iotify/Humidity/DHT22/save");

  // Add headers
  http.addHeader("Content-Type", "application/json");
  Serial.println("Bearer " + token);
  http.addHeader("Authorization", "Bearer " + token);

  // Make the POST request
  httpCode = http.POST(payload);

  // Check the response
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpCode));
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error sending the request DHT");
  }
  // End the request
  http.end();
}

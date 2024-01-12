
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 5

OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

float temperature;
void sendDallasTemperatureSensorData();

void setup() {
  Serial.begin(115200);
  sensors.begin();
}

void loop() {

  sendDallasTemperatureSensorData();
  delay(500);
}

void sendDallasTemperatureSensorData() {
  sensors.requestTemperatures();
  temperature = sensors.getTempCByIndex(0);
  Serial.print("Temperature: ");
  Serial.println(temperature);
  
}

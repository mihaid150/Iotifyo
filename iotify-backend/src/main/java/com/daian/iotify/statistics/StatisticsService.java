package com.daian.iotify.statistics;

import com.daian.iotify.controller_controller.ControllerDeviceService;
import com.daian.iotify.sensor_data_controller.SensorDataResponse;
import com.daian.iotify.sensor_data_controller.SensorDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StatisticsService {
    private final SensorDataService sensorDataService;
    private final ControllerDeviceService controllerDeviceService;

    public double computeHeatIndex(String token, String date) {
        String formattedDate = parseDate(date);
        System.out.println("Formatted date: " + formattedDate);

        List<SensorDataResponse> rawTemperaturesList1 = sensorDataService.getSensorDataList(formattedDate, "DS18B20", "Temperature", token);
        List<Float> temperatureList1 = rawTemperaturesList1.stream()
                .map(SensorDataResponse::getValue)
                .collect(Collectors.toCollection(ArrayList::new));
        System.out.println("Temperature list1 size: " + temperatureList1.size());

        List<SensorDataResponse> rawTemperaturesList2 = sensorDataService.getSensorDataList(formattedDate, "DHT22", "Temperature", token);
        List<Float> temperatureList2 = rawTemperaturesList2.stream()
                .map(SensorDataResponse::getValue)
                .collect(Collectors.toCollection(ArrayList::new));
        System.out.println("Temperature list2 size: " + temperatureList2.size());

        List<SensorDataResponse> rawHumidityList = sensorDataService.getSensorDataList(formattedDate, "DHT22", "Humidity", token);
        List<Float> humidityList = rawHumidityList.stream()
                .map(SensorDataResponse::getValue)
                .collect(Collectors.toCollection(ArrayList::new));
        System.out.println("humidity list size: " + humidityList.size());

        List<SensorDataResponse> rawTemperatureListHTU = sensorDataService.getSensorDataList(formattedDate, "HTU21DF", "Temperature", token);
        List<Float> temperatureListHTU = rawTemperatureListHTU.stream()
                .map(SensorDataResponse::getValue)
                .collect(Collectors.toCollection(ArrayList::new));

        List<SensorDataResponse> rawHumidityListHTU = sensorDataService.getSensorDataList(formattedDate, "HTU21DF", "Humidity", token);
        List<Float> humidityListHTU = rawHumidityListHTU.stream()
                .map(SensorDataResponse::getValue)
                .collect(Collectors.toCollection(ArrayList::new));

        // Equalize the lists by adding zeros
        int maxSize = Math.max(Math.max(temperatureList1.size(), temperatureList2.size()), Math.max(humidityList.size(), Math.max(temperatureListHTU.size(), humidityListHTU.size())));

        for (int i = temperatureList1.size(); i < maxSize; i++) {
            temperatureList1.add(0f);
        }

        for (int i = temperatureList2.size(); i < maxSize; i++) {
            temperatureList2.add(0f);
        }

        for (int i = humidityList.size(); i < maxSize; i++) {
            humidityList.add(0f);
        }

        for (int i = temperatureListHTU.size(); i < maxSize; i++) {
            temperatureListHTU.add(0f);
        }

        for (int i = humidityListHTU.size(); i < maxSize; i++) {
            humidityListHTU.add(0f);
        }

        System.out.println("TTH: " + temperatureList1.size() + " " + temperatureList2.size() + " " + humidityList.size());

        float totalIndex = 0;

        if(isZeroList(humidityListHTU)) {
            for (int i = 0; i < maxSize; i++) {
                float temperature = (temperatureList1.get(i) + temperatureList2.get(i)) / 2.0f;
                float humidity = humidityList.get(i);
                totalIndex += computeIndexForSingleMeasurement(temperature, humidity);
            }
        }

        if(isZeroList(temperatureList1)) {
            for(int i = 0; i < maxSize; i++) {
                float temperature = (temperatureList2.get(i) + temperatureListHTU.get(i)) / 2.0f;
                float humidity = (humidityList.get(i) + humidityListHTU.get(i)) / 2.0f;
                totalIndex += computeIndexForSingleMeasurement(temperature, humidity);
            }
        }
        float averageIndex = totalIndex / maxSize;
        checkAndUpdateRelayState(averageIndex);
        return averageIndex;
    }


    private static float computeIndexForSingleMeasurement(float temperature, float humidity) {
        double index = 100 - Math.abs(23.88 - temperature) - humidity / 2;
        return (float) Math.max(0, Math.min(index, 100));
    }

    private static String parseDate(String date) {
        String formattedDate;
        if (date.equals("Select an option")) {
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMMM-yyyy");
            formattedDate = currentDate.format(formatter);
        } else {
            String[] parts = date.split("-");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid date format");
            }

            String day = parts[0];
            String month = parts[1].toLowerCase();
            String year = parts[2];

            // Capitalize the first letter of the month
            month = month.substring(0, 1).toUpperCase() + month.substring(1);

            formattedDate = day + "-" + month + "-" + year;
        }
        return formattedDate;
    }

    private static boolean isZeroList(List<Float> list) {
        return list.stream().allMatch(x -> x == 0f);
    }

    public void checkAndUpdateRelayState(double heatIndex) {
        float heatIndexThreshold = 80.0f;
        String relayState = heatIndex < heatIndexThreshold ? "true" : "false";
        controllerDeviceService.changeRelayState(relayState);
    }

}

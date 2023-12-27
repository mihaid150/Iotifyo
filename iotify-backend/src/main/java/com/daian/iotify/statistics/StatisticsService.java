package com.daian.iotify.statistics;

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
    public double computeHeatIndex(String token) {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMMM-yyyy");
        String formattedDate = currentDate.format(formatter);
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

        // Equalize the lists by adding zeros
        int maxSize = Math.max(Math.max(temperatureList1.size(), temperatureList2.size()), humidityList.size());

        for (int i = temperatureList1.size(); i < maxSize; i++) {
            temperatureList1.add(0f);
        }

        for (int i = temperatureList2.size(); i < maxSize; i++) {
            temperatureList2.add(0f);
        }

        for (int i = humidityList.size(); i < maxSize; i++) {
            humidityList.add(0f);
        }
        System.out.println("TTH: " + temperatureList1.size() + " " + temperatureList2.size() + " " + humidityList.size());
        float totalIndex = 0;
        for (int i = 0; i < maxSize; i++) {
            float temperature = (temperatureList1.get(i) + temperatureList2.get(i)) / 2.0f;
            float humidity = humidityList.get(i);
            totalIndex += computeIndexForSingleMeasurement(temperature, humidity);
        }
        System.out.println("T: " + totalIndex);
        return totalIndex / maxSize;
    }


    private static float computeIndexForSingleMeasurement(float temperature, float humidity) {
        double index = 100 - Math.abs(23.88 - temperature) - humidity / 2;
        return (float) Math.max(0, Math.min(index, 100));
    }
}

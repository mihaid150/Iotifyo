package com.daian.iotify.sensor_controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SensorRequest {
    private String sensorType;
    private String sensorName;
    private Boolean isActive;
    private Float minimumRange;
    private Float maximumRange;
    private String unitOfMeasurement;
    private String otherDetails;
}

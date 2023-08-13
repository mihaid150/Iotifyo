package com.daian.iotify.sensor_data_controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SensorDataResponse {
    private LocalDateTime dateTime;
    private float value;
}

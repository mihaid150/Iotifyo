package com.daian.iotify.sensor_controller;

import com.daian.iotify.sensor_model.Sensor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SensorResponse {
    private Sensor sensor;
}

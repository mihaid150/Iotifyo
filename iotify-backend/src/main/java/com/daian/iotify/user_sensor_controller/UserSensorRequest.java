package com.daian.iotify.user_sensor_controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSensorRequest {
    private String sensorName;
    private String typeName;
}

package com.daian.iotify.sensor_type_controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SensorTypeResponse {
    private String typeName;
    private String typeDetails;
}

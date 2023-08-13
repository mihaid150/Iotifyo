package com.daian.iotify.sensor_data_controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DateResponse {
    private int day;
    private String month;
    private int year;
}

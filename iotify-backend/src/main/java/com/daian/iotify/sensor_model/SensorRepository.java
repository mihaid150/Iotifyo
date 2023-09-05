package com.daian.iotify.sensor_model;

import com.daian.iotify.sensor_type.SensorType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Integer> {
    Optional<List<Sensor>> findSensorBySensorName(String sensorName);
    Optional<Sensor> findSensorBySensorNameAndSensorType(String sensorName, SensorType sensorType);
}

package com.daian.iotify.sensor_type;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorTypeRepository extends JpaRepository<SensorType, Integer> {
    Optional<SensorType> findSensorTypeByTypeName(String typeName);
}

package com.daian.iotify.sensor_data_model;

import com.daian.iotify.sensor_model.Sensor;
import com.daian.iotify.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SensorDataRepository extends JpaRepository<SensorData, UUID> {
    Optional<List<SensorData>> findSensorDataByUserAndSensor(User user, Sensor sensor);
}

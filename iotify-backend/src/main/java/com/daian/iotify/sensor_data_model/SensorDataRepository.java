package com.daian.iotify.sensor_data_model;

import com.daian.iotify.sensor_model.Sensor;
import com.daian.iotify.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SensorDataRepository extends JpaRepository<SensorData, Integer> {
    List<Optional<SensorData>> findSensorDataByUserAndSensor(User user, Sensor sensor);
}

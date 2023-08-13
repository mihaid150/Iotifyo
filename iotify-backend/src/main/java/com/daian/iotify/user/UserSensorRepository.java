package com.daian.iotify.user;

import com.daian.iotify.sensor_model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSensorRepository extends JpaRepository<UserSensor, Integer> {
    List<Optional<UserSensor>> findByUserId(int userId);
}

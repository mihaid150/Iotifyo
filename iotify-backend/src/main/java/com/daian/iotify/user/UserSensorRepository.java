package com.daian.iotify.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserSensorRepository extends JpaRepository<UserSensor, Integer> {
    Optional<List<UserSensor>> findByUserId(UUID userId);
}

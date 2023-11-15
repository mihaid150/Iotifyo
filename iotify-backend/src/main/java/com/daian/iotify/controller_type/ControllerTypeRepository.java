package com.daian.iotify.controller_type;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ControllerTypeRepository extends JpaRepository<ControllerType, Integer> {
    Optional<ControllerType> findControllerTypeByTypeName(String typeName);
}

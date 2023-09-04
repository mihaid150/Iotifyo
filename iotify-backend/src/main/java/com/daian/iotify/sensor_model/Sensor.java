package com.daian.iotify.sensor_model;


import com.daian.iotify.sensor_type.SensorType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EntityScan
@Table(name = "sensor_model")
public class Sensor {

    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sensor_type_id")
    private SensorType sensorType;
    private String sensorName;
    private Boolean isActive;
    private Float minimumRange;
    private Float maximumRange;
    private String unitOfMeasurement;
    private String otherDetails;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Sensor sensor = (Sensor) o;
        return getId() != null && Objects.equals(getId(), sensor.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

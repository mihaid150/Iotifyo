package com.daian.iotify.controller_type;

import com.daian.iotify.controller_model.Controller;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "controller_type")
public class ControllerType {
    @Id
    @GeneratedValue
    private UUID id;
    private String typeName;
    private String typeDetails;
    @ManyToMany(mappedBy = "controllerTypes")
    @ToString.Exclude
    private Set<Controller> attachedControllers;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ControllerType that = (ControllerType) o;
        return Objects.equals(id, that.id) && Objects.equals(typeName, that.typeName) && Objects.equals(typeDetails, that.typeDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, typeName, typeDetails);
    }
}

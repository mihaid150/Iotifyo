package com.daian.iotify.controller_model;


import com.daian.iotify.controller_type.ControllerType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "controller_model")
public class Controller {
    @Id
    @GeneratedValue
    private UUID id;
    private String controllerName;
    private String controllerId;
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "controller_controller_type",
            joinColumns = @JoinColumn(name = "controller_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "controller_type_id", referencedColumnName = "id")
    )
    @ToString.Exclude
    private Set<ControllerType> controllerTypes;
    private Boolean controllerState;
}


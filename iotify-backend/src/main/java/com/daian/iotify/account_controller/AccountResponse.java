package com.daian.iotify.account_controller;

import com.daian.iotify.user.Role;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String profileImageName;
    private Boolean isAccountActivated;

}

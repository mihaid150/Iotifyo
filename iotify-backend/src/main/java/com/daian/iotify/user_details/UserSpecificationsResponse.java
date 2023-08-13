package com.daian.iotify.user_details;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSpecificationsResponse {
    private String email;
    private String firstname;
    private String lastname;
}

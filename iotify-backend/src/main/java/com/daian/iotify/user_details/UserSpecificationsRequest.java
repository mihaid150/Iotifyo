package com.daian.iotify.user_details;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSpecificationsRequest {
    private String firstname;
    private String lastname;
}

package com.daian.iotify.mail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MailRequest {
    private Boolean userEmails; // true when user sends an email form the app and false when receives
    private String recipientMail;
    private String subject;
    private String message;
}

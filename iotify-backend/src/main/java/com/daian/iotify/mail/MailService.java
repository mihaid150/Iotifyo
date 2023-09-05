package com.daian.iotify.mail;

import com.daian.iotify.config.JWTService;
import com.daian.iotify.user_details.UserSpecificationsResponse;
import com.daian.iotify.user_details.UserSpecificationsService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserDetailsService userDetailsService;
    private final UserSpecificationsService userSpecificationsService;
    private final JWTService jwtService;
    private static final Logger logger = Logger.getLogger(String.valueOf(MailService.class));
    public void send(MailRequest request, String topImagePath, String token) throws MessagingException, IOException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)){
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            if(logger.isLoggable(Level.INFO)) {
                logger.info(request.getUserEmails() + " " + jwtService.extractUsername(token));
            }
            messageHelper.setFrom("iotifyoapp@gmail.com");
            messageHelper.setTo(request.getRecipientMail());
            if(Boolean.TRUE.equals(request.getUserEmails())){ // enabled when user contacts us
                messageHelper.setSubject("Contact Us Service");
                messageHelper.setText(getContactUsService(request.getSubject(), request.getMessage(), token), true);
            } else {
                messageHelper.setSubject(request.getSubject());
                messageHelper.setText(request.getMessage(), true);
            }
            if(topImagePath != null) {
                ClassPathResource resource = new ClassPathResource(topImagePath);
                messageHelper.addInline("topImage", resource);
            }

            mailSender.send(message);
            logger.info(request.getMessage());
        }
    }

    private String getContactUsService(String subject, String msg, String token) throws IOException {
        ClassPathResource resource = new ClassPathResource("html/contact-us.html");
        try(InputStream inputStream = resource.getInputStream()) {
            String htmlContent = new String(inputStream.readAllBytes());
            UserSpecificationsResponse userSpecifications = userSpecificationsService.getUserSpecifications(token);
            htmlContent = htmlContent
                    .replace("{{firstname}}", userSpecifications.getFirstname())
                    .replace("{{lastname}}", userSpecifications.getLastname())
                    .replace("{{mail}}", userSpecifications.getEmail())
                    .replace("{{subject}}", subject)
                    .replace("{{message}}", msg);
            return htmlContent;
        }
    }

    public void sendWithAttach(MailRequest request, String attachName,
                               InputStreamSource inputStream, String token) throws MessagingException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUsername(token));
        if(jwtService.isTokenValid(token, userDetails)) {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("iotifyoapp@gmail.com");
            helper.setTo(request.getRecipientMail());
            helper.setSubject(request.getSubject());
            helper.setText(request.getMessage(), true);
            helper.addAttachment(attachName, inputStream);
            mailSender.send(message);
        }
    }

}

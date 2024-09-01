package com.example.ServiceLink.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.Properties;

@Service
public class EmailService {

    private static final String MAIL_NOT_SEND = "mail.not.send";

    private static final String MAIL_NOT_SEND_LOG = "mail not send";
    String greeting = "Hi " + "USER" + ",";
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.password}")
    private String passwordSender;
    @Value("${spring.mail.username}")
    private String sendEmail;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private static final String SIGNATURE = """
            <table style="color:rgb(0,0,0);font-family:&quot;Times New Roman&quot;;font-size:medium;width:483px;" cellspacing="0" cellpadding="0" border="0">
              <tbody>

                <tr>
                  <td style="font-size:10pt;font-family:Arial;width:183px;" valign="middle"><a href="http://innovature.ai/" target="_blank"><img src="https://innovature.ai/wp-content/uploads/2020/03/innovature-logo.png" alt="innovaturelabs" class="CToWUd" border="0" style="height:65px;"></a></td>
                  <td style="font-size:10pt;font-family:Arial;width:400px;padding-left:20px;border-left:1px solid rgb(20,95,177)" valign="top">
                    <strong>t:</strong><span style="padding-left:11px">+91-484-4038120</span><br><strong>w:</strong>&nbsp;<a href="https://innovature.ai/" style="color:rgb(22,141,203);text-decoration-line:none" target="_blank"><span style="padding-left:4px">https://innovature.ai</span></a>
                    <div style="padding-top:3px"><a href="https://www.facebook.com/innovature/" target="_blank"><img src="https://innovature.ai/wp-content/uploads/2020/06/facebook.png" class="CToWUd" border="0" style="height:16px;"></a>&nbsp;&nbsp;<a href="https://in.linkedin.com/company/innovature-labs" target="_blank"><img src="https://innovature.ai/wp-content/uploads/2020/06/linkdin.png" class="CToWUd" border="0" style="height:16px;"></a>&nbsp;&nbsp;<a href="https://twitter.com/Innovature_ai" target="_blank"><img src="https://innovature.ai/wp-content/uploads/2020/06/twitter-1.png" class="CToWUd" border="0" style="height:16px;"></a>&nbsp;&nbsp;<a href="https://www.google.com/maps/place/Innovature+Labs/@10.0039836,76.3748932,19.25z/data=!4m5!3m4!1s0x3b080c5cfabc4eb7:0xee6880f8c72caaf3!8m2!3d10.0040958!4d76.3756261" target="_blank"><img src="
            https://innovature.ai/wp-content/uploads/2017/07/map-pin.png" class="CToWUd" border="0" style="height:16px;"></a>&nbsp;</div>
                  </td>
                  <td></td>
                  <td style="font-size:10pt;font-family:Arial;width:400px; padding-left: 20px; padding-bottom:10px;" valign="middle">

                    <img src="https://drive.google.com/uc?export=view&id=1YnIUnu9hXulNHGa1jAZqRom62YV3Qsok" alt="innovaturelabs" class="CToWUd" border="0" style=" width:475px;">

                </td>

                </tr>
              </tbody>
            </table>
            <span style="color:#666666;font-size:x-small"><i>Disclaimer:- The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this email. Please notify the sender immediately and destroy all copies of this message and any attachments. The views expressed in this email message (including the enclosure/(s) or attachment/(s) if any) are those of the individual sender, except where the sender expressly, and with authority, states them to be the views of Innovature. Before opening any mail and attachments please check them for viruses. Innovature does not accept any liability for virus-infected emails.</i><br></span>
            """;







    public void sendEmail(String to, String subject, String content) {
        try {
            MimeMessage message4 = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message4);
            helper.setFrom(sendEmail);
            helper.setSubject(subject);
            InternetAddress[] toAddresses = InternetAddress.parse(to);
            helper.setTo(toAddresses);
            helper.setText("<br>"
                            + content
                            + "<br><br><b>Regards,</b>" + "<br><b>SERVICELINK Manager</b></form><br>",
//                            + SIGNATURE,
                    true);
            mailSender.send(message4);
        } catch (MessagingException e) {
            LOGGER.error("Error in mail sending:", e);
        }
    }
}

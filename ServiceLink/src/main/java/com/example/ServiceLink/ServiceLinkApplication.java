package com.example.ServiceLink;

import com.example.ServiceLink.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@EnableJpaRepositories
public class ServiceLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceLinkApplication.class, args);
	}

}

package com.example.ServiceLink.security;

import com.example.ServiceLink.entity.dto.responseDTO.ErrorResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private transient MessageSource messageSource;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String[] list = messageSource.getMessage("UNAUTHORISED_URL", null, Locale.ENGLISH).split("-");
        ErrorResponseDTO errorResponse = new ErrorResponseDTO(list[0], list[1]);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        new ObjectMapper().writeValue(out, errorResponse);
        out.flush();
    }
}

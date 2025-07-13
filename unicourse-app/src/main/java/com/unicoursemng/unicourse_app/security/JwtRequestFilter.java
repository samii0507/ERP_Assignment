package com.unicoursemng.unicourse_app.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.unicoursemng.unicourse_app.entity.Student;
import com.unicoursemng.unicourse_app.repository.StudentRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StudentRepository studentRepository;

    @Override
protected void doFilterInternal(
        @org.springframework.lang.NonNull HttpServletRequest request,
        @org.springframework.lang.NonNull HttpServletResponse response,
        @org.springframework.lang.NonNull FilterChain chain)
        throws ServletException, IOException {

    String path = request.getRequestURI();
    System.out.println("JWT FILTER PATH: " + path);

    if (path.endsWith("/students/login") || path.endsWith("/students/register")) {
        System.out.println("SKIPPING JWT FILTER for: " + path);
        chain.doFilter(request, response);
        return;
    }

    final String authorizationHeader = request.getHeader("Authorization");
    String email = null;
    String jwt = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        jwt = authorizationHeader.substring(7);
        try {
            email = jwtUtil.extractEmail(jwt);
        } catch (Exception e) {
            // Invalid token, ignore
        }
    }

    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        Student student = studentRepository.findByEmail(email);
        if (student != null && jwtUtil.isTokenValid(jwt, student.getEmail())) {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(student, null, null);
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    chain.doFilter(request, response);
}

}

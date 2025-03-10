// package com.flyhigh.backend.Security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernamePasswordAuthenticationToken;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
//     private final JwtUtil jwtUtil;
//     private final UserDetailsService userDetailsService;

//     public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
//         this.jwtUtil = jwtUtil;
//         this.userDetailsService = userDetailsService;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//             throws ServletException, IOException {
//         String token = request.getHeader("Authorization");

//         if (token != null && token.startsWith("Bearer ")) {
//             token = token.substring(7);
//             if (jwtUtil.validateToken(token)) {
//                 String email = jwtUtil.extractEmail(token);
//                 UserDetails userDetails = userDetailsService.loadUserByUsername(email);

//                 UsernamePasswordAuthenticationToken authToken =
//                         new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

//                 SecurityContextHolder.getContext().setAuthentication(authToken);
//             }
//         }
//         chain.doFilter(request, response);
//     }
// }

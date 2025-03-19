// package com.flyhigh.backend.config;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import jakarta.validation.constraints.NotNull;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// @Component
// public class JwtRequestFilter extends OncePerRequestFilter {
    
//     private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    
//     @Autowired
//     private UserDetailsServiceImpl userDetailsService;
    
//     @Autowired
//     private JwtUtil jwtUtil;
    
//     @Override
//     protected void doFilterInternal(@NotNull HttpServletRequest request,@NotNull HttpServletResponse response,@NotNull FilterChain chain)
//             throws ServletException, IOException {
        
//         final String authorizationHeader = request.getHeader("Authorization");
        
//         // Only process if Authorization header exists and starts with Bearer
//         if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//             String jwt = authorizationHeader.substring(7);
//             String username = null;
            
//             try {
//                 username = jwtUtil.extractUsername(jwt);
//             } catch (Exception e) {
//                 logger.error("JWT validation error", e);
//                 // Continue with the filter chain even if token is invalid
//                 // This will be handled by Spring Security's authentication mechanisms
//             }
            
//             // Only set authentication if username was extracted and no authentication exists yet
//             if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                 UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                
//                 if (jwtUtil.validateToken(jwt, userDetails)) {
//                     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                             userDetails, null, userDetails.getAuthorities());
//                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                     SecurityContextHolder.getContext().setAuthentication(authToken);
//                 }
//             }
//         }
        
//         chain.doFilter(request, response);
//     }
    
//     @Override
//     protected boolean shouldNotFilter(@NotNull HttpServletRequest request) {
//         String path = request.getServletPath();
//         // Skip JWT validation for authentication endpoints
//         return path.startsWith("/api/auth/");
//     }
// }
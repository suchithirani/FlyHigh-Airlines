// package com.flyhigh.backend.config;

// import lombok.RequiredArgsConstructor;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// import com.flyhigh.backend.users.User;
// import com.flyhigh.backend.users.UserRepository;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthenticationManager authenticationManager;
//     private final UserRepository userRepository;

//     @PostMapping("/login")
//     public String login(@RequestBody Map<String, String> request) {
//         String email = request.get("email");
//         String password = request.get("password");

//         authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//         return "Login successful!";
//     }

//     @PostMapping("/register")
//     public String register(@RequestBody User user) {
//         user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//         userRepository.save(user);
//         return "User registered successfully!";
//     }
// }

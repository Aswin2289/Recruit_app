package com.example.ServiceLink.security;

import com.example.ServiceLink.entity.User;
import com.example.ServiceLink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
    Optional<User> optUser;
    byte[] userStatus={User.Status.ACTIVE.value,User.Status.SUPER_ADMIN.value};
    if (isEmail(identifier)) {
      optUser = userRepository.findByEmailAndStatusIn(identifier, userStatus);
    } else {
      optUser = userRepository.findByPhoneAndStatusIn(identifier, userStatus);
    }

    if (optUser.isPresent()) {
      User user = optUser.get();
      return new org.springframework.security.core.userdetails.User(
              user.getEmail(), // You should use the email or phone number for UserDetails username
              "", // You need to handle password securely (e.g., through an encoder)
              List.of(new SimpleGrantedAuthority(user.getRole().getName()))
      );
    } else {
      throw new UsernameNotFoundException("Can't find user with identifier: " + identifier);
    }
  }

  public boolean isEmail(String identifier) {
    return identifier.contains("@"); // Basic check for email format
  }
}

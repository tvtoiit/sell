package com.nhom2.sell_BE.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.utils.JwtProviderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.nhom2.sell_BE.entities.Account;
import com.nhom2.sell_BE.entities.Role;
import com.nhom2.sell_BE.entities.User;
import com.nhom2.sell_BE.payload.request.thiennt.RequestUpdateUser;
import com.nhom2.sell_BE.payload.request.thiennt.UserAdminRequest;
import com.nhom2.sell_BE.payload.response.thiennt.UserAdminResponse;
import com.nhom2.sell_BE.repositories.AccountRepository;
import com.nhom2.sell_BE.repositories.RoleRepositories;
import com.nhom2.sell_BE.repositories.UserRepositories;
import com.nhom2.sell_BE.services.UserAdminService;

@Service
public class UserAdminServiceImpl implements UserAdminService {

  @Autowired
  private UserRepositories userRepositories;
  
  @Autowired
  private RoleRepositories roleRepositories;
  
  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private JwtProviderUtils jwtProviderUtils;

  @Override
  public ResponseEntity<Object> getAllUSerAdmin() {
    List<User> lst = userRepositories.findAll();
    if (lst.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    List<UserAdminResponse> response = new ArrayList<>();
   for (User user : lst) {
     UserAdminResponse respon = UserAdminResponse
         .builder()
         .userId(user.getUserId())
         .accountId(user.getAccount().getAccountId())
         .address(user.getAddress())
         .createdAt(user.getCreatedAt())
         .updatedAt(user.getUpdatedAt())
         .email(user.getEmail())
         .fullName(user.getFullName())
         .status(user.getStatus())
         .phoneNumber(user.getPhoneNumber())
         .build();
     response.add(respon);
  }
    return ResponseEntity.ok().body(response);
  }

  @Override
  public ResponseEntity<Object> getUSerAdminByToken(String token) {
    User user = getUserOfSocket(token);
    UserAdminResponse response = UserAdminResponse
            .builder()
            .userId(user.getUserId())
            .accountId(user.getAccount().getAccountId())
            .role(user.getAccount().getRole().getName())
            .address(user.getAddress())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .email(user.getEmail())
            .fullName(user.getFullName())
            .status(user.getStatus())
            .phoneNumber(user.getPhoneNumber())
            .build();
    return ResponseEntity.ok().body(response);
  }

  @Override
  public ResponseEntity<Object> createUSerAdmin(UserAdminRequest request) {
   Optional<User> user = userRepositories.findUserByUsernameEmail(request.getUsername(), request.getEmail());
    if(user.isPresent()) {
      return ResponseEntity.ok().body("Username or Email exits");
    }
    
    Role role = roleRepositories.findByName("USER");
    Account acc = Account
        .builder()
        .username(request.getUsername())
        .password(request.getPassword())
        .role(role)
        .build();
    accountRepository.save(acc);
    User userCreate = User.builder()
        .account(acc)
        .address(request.getAddress())
        .email(request.getEmail())
        .fullName(request.getFullName())
        .status(true)
        .phoneNumber(request.getPhoneNumber())
        .build();
    
    userRepositories.save(userCreate);
    return ResponseEntity.ok().body("Create Success");
  }

  @Override
  public ResponseEntity<Object> delete(String id) {
    Optional<User> user = userRepositories.findUserByStatus(id);
    if(user.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    user.get().setStatus(false);
    userRepositories.save(user.get());
    return ResponseEntity.ok().body("Delete Success");
  }

  @Override
  public ResponseEntity<Object> updateUser(String id, RequestUpdateUser request) {
    Optional<User> user = userRepositories.findById(id);
    if(user.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    if(!(request.getFullName() == null) || !(request.getFullName() == "")) {
      user.get().setFullName(request.getFullName());
    }
    if(!(request.getPhoneNumber() == null) || !(request.getPhoneNumber() == "")) {
      user.get().setPhoneNumber(request.getPhoneNumber());
    }
    if(!(request.getAddress() == null) || !(request.getAddress() == "")) {
      user.get().setAddress(request.getAddress());
    }
    if (!(request.getRoleName() == null) || !(request.getRoleName() == "")) {
      Role role = roleRepositories.findByName(request.getRoleName());
      user.get().getAccount().setRole(role);
    }
    userRepositories.save(user.get());
    return ResponseEntity.ok().body("Update Success");
  }

  public User getUserOfSocket(String token){
    String username = jwtProviderUtils.getUserNameFromJwtToken(token);
    Account account = accountRepository.findByusername(username);
    User user = userRepositories.findById(account.getUser().getUserId()).orElseThrow(()->new DataNotFoundException("User does not exist"));
    return user;
  }
}

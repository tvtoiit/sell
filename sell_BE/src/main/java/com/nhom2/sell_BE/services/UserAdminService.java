package com.nhom2.sell_BE.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.nhom2.sell_BE.payload.request.thiennt.RequestUpdateUser;
import com.nhom2.sell_BE.payload.request.thiennt.UserAdminRequest;

@Service
public interface UserAdminService {

  ResponseEntity<Object> getAllUSerAdmin();

  ResponseEntity<Object> getUSerAdminByToken(String token);

  ResponseEntity<Object> createUSerAdmin(UserAdminRequest request);

  ResponseEntity<Object> delete(String id);

  ResponseEntity<Object> updateUser(String id, RequestUpdateUser request);

}

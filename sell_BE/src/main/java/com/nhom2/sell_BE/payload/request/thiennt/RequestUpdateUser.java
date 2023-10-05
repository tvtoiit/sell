package com.nhom2.sell_BE.payload.request.thiennt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RequestUpdateUser {
  private String fullName;

  private  String phoneNumber;

  private String address;

  private String roleName;
  
}

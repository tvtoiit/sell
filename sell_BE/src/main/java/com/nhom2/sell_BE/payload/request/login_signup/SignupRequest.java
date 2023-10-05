package com.nhom2.sell_BE.payload.request.login_signup;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class SignupRequest {

    private String username;

    private String password;

    private String role;

    private UserRequest user;

}

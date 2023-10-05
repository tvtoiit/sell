package com.nhom2.sell_BE.services;

import com.nhom2.sell_BE.payload.request.login_signup.LoginRequest;
import com.nhom2.sell_BE.payload.request.login_signup.SignupRequest;
import com.nhom2.sell_BE.payload.response.ApiResponse;
import com.nhom2.sell_BE.payload.response.JwtResponse;

public interface AuthService {

    JwtResponse signin(LoginRequest loginRequest);
    ApiResponse signUpUser(SignupRequest signupRequest);
}

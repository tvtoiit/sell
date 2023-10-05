package com.nhom2.sell_BE.services.impl;

import com.nhom2.sell_BE.entities.Account;
import com.nhom2.sell_BE.entities.Role;
import com.nhom2.sell_BE.entities.Token;
import com.nhom2.sell_BE.entities.User;
import com.nhom2.sell_BE.enums.NameRoleEnum;
import com.nhom2.sell_BE.enums.TokenEnum;
import com.nhom2.sell_BE.exception.DataExistException;
import com.nhom2.sell_BE.payload.request.login_signup.LoginRequest;
import com.nhom2.sell_BE.payload.request.login_signup.SignupRequest;
import com.nhom2.sell_BE.payload.response.ApiResponse;
import com.nhom2.sell_BE.payload.response.JwtResponse;
import com.nhom2.sell_BE.repositories.AccountRepository;
import com.nhom2.sell_BE.repositories.RoleRepositories;
import com.nhom2.sell_BE.repositories.TokenRepository;
import com.nhom2.sell_BE.repositories.UserRepositories;
import com.nhom2.sell_BE.services.AuthService;
import com.nhom2.sell_BE.utils.JwtProviderUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProviderUtils tokenProvider;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private RoleRepositories roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepositories userRepository;

    @Override
    public JwtResponse signin(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateTokenUsingUserName(loginRequest.getUsername());

        var account = accountRepository.findByusername(loginRequest.getUsername());
        revokeAllUserTokens(account);
        saveUserToken(account, jwt);

        return new JwtResponse(jwt);
    }
    
    @Override
    @Transactional
    public ApiResponse signUpUser(SignupRequest signupRequest) {
        String username = signupRequest.getUsername();
        if (accountRepository.existsByusername(username)) {
            throw new DataExistException("This user with username: " + username + " already exist");
        } else {
            Account account = new Account();
            account.setUsername(signupRequest.getUsername());
            account.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            Role role = roleRepository.findByName(NameRoleEnum.ROLE_USER.toString());
            account.setRole(role);
            accountRepository.save(account);
            User user =new User();
            user.setAccount(accountRepository.findById(account.getAccountId()).get());
            user.setFullName(signupRequest.getUser().getFullName());
            user.setPhoneNumber(signupRequest.getUser().getPhoneNumber());
            user.setEmail(signupRequest.getUser().getEmail());
            user.setAddress(signupRequest.getUser().getAddress());
            user.setStatus(Boolean.TRUE);
            userRepository.save(user);
        }

        return new ApiResponse("Create successfully", HttpStatus.CREATED);
    }

    private void saveUserToken(Account account, String jwtToken) {
        Token token = new Token();
        token.setAccount(account);
        token.setToken(jwtToken);
        token.setExpired(false);
        token.setRevoked(false);
        token.setTokenType(TokenEnum.BEARER);
        tokenRepository.save(token);
    }



    private void revokeAllUserTokens(Account account) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(account.getAccountId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}

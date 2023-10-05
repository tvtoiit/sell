package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    boolean existsByusername(String username);
    Account findByusername(String username);
}

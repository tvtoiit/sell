package com.nhom2.sell_BE.repositories;

import com.nhom2.sell_BE.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepositories extends JpaRepository<Role, String> {

    Role findByName(String name);
}

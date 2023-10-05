package com.nhom2.sell_BE.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhom2.sell_BE.entities.Role;
import com.nhom2.sell_BE.payload.response.RoleResponse;
import com.nhom2.sell_BE.repositories.RoleRepositories;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServicesImp implements RoleServices {
    @Autowired
    private RoleRepositories roleRepositories;

    @Override
    public List<RoleResponse> getRoles() {
        List<Role> roles = roleRepositories.findAll();
        List<RoleResponse> listRoleResponses = new ArrayList<>(); 
        
        for (Role role : roles) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setRoleId(role.getRoleId());           
            roleResponse.setRoleName(role.getName());
            listRoleResponses.add(roleResponse);
        }
        return listRoleResponses;
    }

   
}

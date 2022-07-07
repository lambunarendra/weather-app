package com.trainingapps.userms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.trainingapps.userms.dto.User;
import com.trainingapps.userms.dto.UserDetails;
import com.trainingapps.userms.entity.AppUser;

public abstract class UserRepositoryImpl implements IUserRepository {
	
	 @Autowired
	 private IUserRepository userRepository;
	 
	public Optional<AppUser> findByUsername(String username) {
		Optional<AppUser> users= userRepository.findById((long) 1);
        return users;

	}
	

}

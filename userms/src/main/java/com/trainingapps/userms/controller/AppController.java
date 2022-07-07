package com.trainingapps.userms.controller;

import com.trainingapps.userms.dto.User;
import com.trainingapps.userms.dto.LoginUserRequest;
import com.trainingapps.userms.dto.RegisterRequestDto;
import com.trainingapps.userms.dto.UserDetails;
import com.trainingapps.userms.entity.AppUser;
import com.trainingapps.userms.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin("*")
@RestController
@RequestMapping("/user-api/user/")
public class AppController {

    @Autowired
    private IUserService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserDetails register(@RequestBody RegisterRequestDto requestData) {
        UserDetails response = service.register(requestData);
        return response;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginUserRequest request) throws Exception {
        String token = service.login(request);
        return token;
    }
    @PostMapping("/update")
	public AppUser updateDetails(@RequestBody User user) {
		return service.updateDetails(user);
	} 
	
	@GetMapping("test")
	public String test() {
		return "Working Fine";
	}
}

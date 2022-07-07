package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@CrossOrigin("http://localhost:4200")
@EnableEurekaClient
public class GatewayApplication { //implements WebFluxConfigurer

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}
//	 @Override
//	    public void addCorsMappings(CorsRegistry registry) {
//	        registry.addMapping("/**")
//	                .allowedOrigins("http://localhost:4200")
//	                .allowedHeaders("*")
//	                .allowedMethods("*")
//	                .exposedHeaders(HttpHeaders.SET_COOKIE);
//	    }


}

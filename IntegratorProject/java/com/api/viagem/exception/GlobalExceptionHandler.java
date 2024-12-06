package com.api.viagem.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<Map<String, String>> handleException(Exception e) {
	       
	        e.printStackTrace();
	        
	        
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of(
	                        "timestamp", java.time.LocalDateTime.now().toString(),
	                        "status", "500",
	                        "error", "Internal Server Error",
	                        "message", e.getMessage()
	                ));
	    }
	}



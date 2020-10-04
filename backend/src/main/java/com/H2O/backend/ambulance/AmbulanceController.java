package com.H2O.backend.ambulance;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3306)
@RestController
@RequestMapping("/ambulance")
public class AmbulanceController {

}
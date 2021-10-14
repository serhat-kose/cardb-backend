package com.serhat.web.Controller;

import com.serhat.web.Entity.Car;
import com.serhat.web.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @RequestMapping("/cars")
    @CrossOrigin
    public Iterable<Car> getCars(){

        return  carRepository.findAll();
    }
}

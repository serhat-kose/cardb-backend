package com.serhat.web.Controller;

import com.serhat.web.Entity.Car;
import com.serhat.web.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class CarController {

    @Autowired
    private CarRepository carRepository;

/*    @RequestMapping("/cars")
    @CrossOrigin
    public Iterable<Car> getCars(){

        System.out.print("merhaba serhat");

        return  carRepository.findAll();
    }*/

    @GetMapping("/cars")
    public Iterable<Car> getAllEmployees() {
        System.out.print("merhaba serhat");
        return  carRepository.findAll();
    }

    @GetMapping("/cars/{id}")
    public Car getEmployeeById(@PathVariable Long id) {
        return carRepository.findById(id).get();
    }

    @PostMapping("/cars")
    public Car saveEmployeeDetails(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @PutMapping("/cars")
    public Car updateEmployee(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @DeleteMapping("/cars/{id}")
    public ResponseEntity<HttpStatus> deleteEmployeeById(@PathVariable Long id) {
        carRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

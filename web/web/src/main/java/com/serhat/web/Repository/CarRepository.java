package com.serhat.web.Repository;

import com.serhat.web.Entity.Car;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource
public interface CarRepository extends PagingAndSortingRepository<Car,Long> {

    // Fetch cars by brand
    List<Car> findByBrand(@Param("brand") String brand);
    // Fetch cars by color
    List<Car> findByColor(@Param("color") String color);

}

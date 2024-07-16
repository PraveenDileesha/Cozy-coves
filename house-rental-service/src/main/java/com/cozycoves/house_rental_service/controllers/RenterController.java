package com.cozycoves.house_rental_service.controllers;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import com.cozycoves.house_rental_service.services.RenterService;
import com.cozycoves.house_rental_service.services.RequestRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RenterController {

    @Autowired
    RenterService renterService;

    @Autowired
    RequestRentService requestRentService;

    //Get houses related to the users location and available
    @GetMapping(value = "/renter-view-houses/{addressLine3}")
    public List<House> viewHouses(@PathVariable String addressLine3){
        return renterService.getHouseBasedOnLocation(addressLine3);
    }
    //view individual house information
    @GetMapping(value = "/individual-house-info/{houseId}")
    public House getHouseInfo(@PathVariable String houseId){
        return renterService.getIndividualHouseInfo(houseId);
    }

    @PostMapping(value = "request-house")
    public void requestHouse(@RequestBody Request request){
        requestRentService.requestHouseService(request);
    }
}

package com.cozycoves.house_rental_service.controllers;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import com.cozycoves.house_rental_service.services.HouseOwnerService;
import com.cozycoves.house_rental_service.services.RequestRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HouseOwnerController {

    @Autowired
    HouseOwnerService houseOwnerService;

    @Autowired
    RequestRentService requestRentService;

    //Request map to fetch the house through owner ID
    @GetMapping(value = "/houseowner-view-houses/{ownerID}")
    public List<House> returnHouses(@PathVariable String ownerID){
        return houseOwnerService.getListOfHousesOwned(ownerID);
    }

    //Adding houses
    @PostMapping(value = "/houseowner-add-house")
    public void addHouse(@RequestBody House house){
        houseOwnerService.addHouseToListOfHousesOwned(house);
    }

    //Updating house information of the house owner
    @PutMapping(value = "/houseowner-update-house")
    public void updateHouse(@RequestBody House house){
        houseOwnerService.updateHouse(house);
    }

    //Get all the requests for each house
    @GetMapping(value = "/get-requests/{houseId}")
    public List<Request> getAllRequestsForAHouse(@PathVariable String houseId){
        return requestRentService.getAllRequestsForAHouse(houseId);
    }
}

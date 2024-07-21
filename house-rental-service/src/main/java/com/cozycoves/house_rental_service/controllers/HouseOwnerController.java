package com.cozycoves.house_rental_service.controllers;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import com.cozycoves.house_rental_service.services.HouseOwnerService;
import com.cozycoves.house_rental_service.services.RequestRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class HouseOwnerController {

    @Autowired
    HouseOwnerService houseOwnerService;

    @Autowired
    RequestRentService requestRentService;

    //Request map to fetch the house through owner ID
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/houseowner-view-houses/{ownerID}")
    public List<House> returnHouses(@PathVariable String ownerID){
        return houseOwnerService.getListOfHousesOwned(ownerID);
    }

    //Adding houses
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/houseowner-add-house")
    public void addHouse(@RequestBody House house){
        houseOwnerService.addHouseToListOfHousesOwned(house);
    }

    //Updating house information of the house owner
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/houseowner-update-house")
    public void updateHouse(@RequestBody House house){
        houseOwnerService.updateHouse(house);
    }

    //Get all the requests for each house
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/get-requests/{houseId}")
    public List<Request> getAllRequestsForAHouse(@PathVariable String houseId){
        return requestRentService.getAllRequestsForAHouse(houseId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/houseowner-check-house-id/{houseId}")
    public ResponseEntity<Map<String, Boolean>> checkHouseIdExists(@PathVariable String houseId) {
        boolean exists = houseOwnerService.getHouseById(houseId) != null;
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }
}

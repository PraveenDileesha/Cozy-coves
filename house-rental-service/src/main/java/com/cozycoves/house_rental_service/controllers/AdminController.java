package com.cozycoves.house_rental_service.controllers;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    AdminService adminService;

    //Viewing all the houses
    @GetMapping(value = "/admin-view-all-houses")
    public List<House> viewAllHouses(){
        return adminService.viewAllHouses();
    }

    //Adding houses
    @PostMapping(value = "/admin-add-house")
    public void addHouse(@RequestBody House house){
        adminService.addHouseToDatabase(house);
    }

    //admin update houses
    @PutMapping(value = "/admin-update-house")
    public void updateHouse(@RequestBody House house){
        adminService.updateHouse(house);
    }

}

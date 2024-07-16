package com.cozycoves.house_rental_service.services;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.repositories.HouseRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private HouseRepo houseRepo;

    public AdminService(HouseRepo houseRepo){
        this.houseRepo = houseRepo;
    }

    public List<House> viewAllHouses() {
        return houseRepo.findAll();
    }

    public void addHouseToDatabase(House house) {
        houseRepo.save(house);
    }

    public void updateHouse(House house) {
        houseRepo.save(house);
    }
}

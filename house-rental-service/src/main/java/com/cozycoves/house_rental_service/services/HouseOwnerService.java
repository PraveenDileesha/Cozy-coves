package com.cozycoves.house_rental_service.services;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.repositories.HouseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class HouseOwnerService {

    private final HouseRepo houseRepository;

    @Autowired
    public HouseOwnerService(HouseRepo houseRepository) {
        this.houseRepository = houseRepository;
    }

    //Method to filter and fetch (house / houses) related the house owner
    public List<House> getListOfHousesOwned(String ownerID) {
        return houseRepository.findByOwnerID(ownerID);
    }

    //Method to add houses belonging to a house owner
    public void addHouseToListOfHousesOwned(House house){
        houseRepository.save(house);
    }

    // Method to update house details
    public void updateHouse(House house) {
        houseRepository.save(house);
    }

    public House getHouseById(String houseId){
        return houseRepository.findByHouseId(houseId);
    }

}

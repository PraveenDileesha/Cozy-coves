package com.cozycoves.house_rental_service.services;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import com.cozycoves.house_rental_service.repositories.HouseRepo;
import com.cozycoves.house_rental_service.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RenterService {

    private final HouseRepo houseRepository;

    @Autowired
    public RenterService(HouseRepo houseRepository, RequestRepo requestRepository){
        this.houseRepository = houseRepository;
    }

    //Method to retrieve all the houses
    public List<House> getAllTheHousesAvailable(){
        return houseRepository.findAll();
    }

    //Method to retrieve available houses at the location of the renter
    public List<House> getHouseBasedOnLocation(String addressLine3) {
        return houseRepository.findByAddressLine3(addressLine3);
    }

    //Method to fetch individual house info
    public House getIndividualHouseInfo(String houseId) {
        return houseRepository.findByHouseId(houseId);
    }
}

package com.cozycoves.house_rental_service.services;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import com.cozycoves.house_rental_service.repositories.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestRentService {

    @Autowired
    RequestRepo requestRepo;

    public List<Request> getAllRequestsForAHouse(String houseId){
        return requestRepo.findByHouseId(houseId);
    }

    public void requestHouseService(Request request) {
        requestRepo.save(request);
    }
}

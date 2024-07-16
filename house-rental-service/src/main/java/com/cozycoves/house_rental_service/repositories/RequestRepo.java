package com.cozycoves.house_rental_service.repositories;

import com.cozycoves.house_rental_service.models.House;
import com.cozycoves.house_rental_service.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepo extends JpaRepository<Request,String> {
    List<Request> findByHouseId(String houseId);
}

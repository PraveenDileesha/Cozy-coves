package com.cozycoves.house_rental_service.repositories;

import com.cozycoves.house_rental_service.models.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepo extends JpaRepository<House,String> {
    // Custom query method to find houses by owner ID
    List<House> findByOwnerID(String ownerID);
    // Custom query method to find houses by location
    @Query("SELECT h FROM House h WHERE h.addressLine3 = :addressLine3 AND h.status = 'AVAILABLE'")
    List<House> findByAddressLine3(String addressLine3);

    House findByHouseId(String houseId);
}

package com.cozycoves.house_rental_service.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "requests")

public class Request {

    @Id
    @Column (name = "requestId")
    private String requestId;

    @Column(name = "houseId")
    private String houseId;

    @Column (name = "renter")
    private String renter;

    @Column (name = "approvedStatus")
    private String approvedStatus;

    public Request() {
    }

    public Request(String requestId, String houseId, String renter, String approvedStatus) {
        this.requestId = requestId;
        this.houseId = houseId;
        this.renter = renter;
        this.approvedStatus = approvedStatus;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getHouseId() {
        return houseId;
    }

    public void setHouseId(String houseId) {
        this.houseId = houseId;
    }

    public String getRenter() {
        return renter;
    }

    public void setRenter(String renter) {
        this.renter = renter;
    }

    public String getApprovedStatus() {
        return approvedStatus;
    }

    public void setApprovedStatus(String approvedStatus) {
        this.approvedStatus = approvedStatus;
    }


}


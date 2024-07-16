package com.cozycoves.house_rental_service.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "houses")
@Component
public class House {
    @Id
    @Column(name = "houseId")
    private String houseId;

    @ElementCollection
    @Column(name = "photos")
    private List<String> photos = new ArrayList<>();

    @Column(name = "description")
    private String description;

    @Column(name = "owner")
    private String owner;

    @Column(name = "addressLine1")
    private String addressLine1;

    @Column(name = "addressLine2")
    private String addressLine2;

    @Column(name = "addressLine3")
    private String addressLine3;

    @Column(name = "numberOfRooms")
    private int numberOfRooms;

    @Column(name = "numberOfBathrooms")
    private int numberOfBathrooms;

    @Column(name = "currentRenter")
    private String currentRenter;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private HouseStatus status;

    @Column(name = "price")
    private double price;

    @Column(name = "ownerID")
    private String ownerID;

    // Constructors, getters, setters, toString methods

    public House() {
    }

    public House(String houseId, List<String> photos, String description, String owner, String ownerID, String addressLine1,
                 String addressLine2, String addressLine3, int numberOfRooms, int numberOfBathrooms,
                 String currentRenter, HouseStatus status, double price) {
        this.houseId = houseId;
        this.photos = photos;
        this.description = description;
        this.owner = owner;
        this.ownerID = ownerID;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.numberOfRooms = numberOfRooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.currentRenter = currentRenter;
        this.status = status;
        this.price = price;
    }

    public String getHouseId() {
        return houseId;
    }

    public void setHouseId(String houseId) {
        this.houseId = houseId;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getAddressLine3() {
        return addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public int getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(int numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public String getCurrentRenter() {
        return currentRenter;
    }

    public void setCurrentRenter(String currentRenter) {
        this.currentRenter = currentRenter;
    }

    public HouseStatus getStatus() {
        return status;
    }

    public void setStatus(HouseStatus status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(String ownerID) {
        this.ownerID = ownerID;
    }

    @Override
    public String toString() {
        return "House{" +
                "houseId=" + houseId +
                ", photos=" + photos +
                ", description='" + description + '\'' +
                ", owner='" + owner + '\'' +
                ", ownerID='" + ownerID + '\'' +
                ", addressLine1='" + addressLine1 + '\'' +
                ", addressLine2='" + addressLine2 + '\'' +
                ", addressLine3='" + addressLine3 + '\'' +
                ", numberOfRooms=" + numberOfRooms +
                ", numberOfBathrooms=" + numberOfBathrooms +
                ", currentRenter='" + currentRenter + '\'' +
                ", status='" + status + '\'' +
                ", price=" + price +
                '}';
    }
}

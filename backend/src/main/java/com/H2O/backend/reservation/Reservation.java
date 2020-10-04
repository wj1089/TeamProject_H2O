package com.H2O.backend.reservation;

import com.H2O.backend.ambulance.Ambulance;
import com.H2O.backend.doctor.Doctor;
import com.H2O.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity @Getter
@Setter
@ToString
@Component
@NoArgsConstructor
@Table(name = "reservation")

public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_no") private Long reservationNo;
    @Column(name = "reservation_type", nullable = false) private String reservationType;
    @Column(name = "date",nullable = false ) private String date;
    @Column(name = "price",nullable = false ) private String price;
    @Column(name = "prescription",nullable = false ) private String prescription;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="doctor_no")
    private Doctor doctor;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ambulance_no")
    private Ambulance ambulance;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_no")
    private User user;



    @Builder
    public Reservation(String reservationType, String date, String price, String prescription
                        ){
        this.reservationType = reservationType;
        this.date = date;
        this.price = price;
        this.prescription = prescription;
    }
}

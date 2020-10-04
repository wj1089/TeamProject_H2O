package com.H2O.backend.ambulance;

import com.H2O.backend.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "ambulance")
@Component
public class Ambulance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ambulance_no") private Long ambulanceNo;
    @Column(name = "ambulance_name", nullable = false) private String ambulanceName;
    @Column(name = "addr", nullable = false) private String addr;
    @Column(name = "tel", nullable = false) private String tel;
    @Column(name = "home_page", nullable = false) private String homePage;
    @Column(name = "count", nullable = false) private int count;

    @JsonIgnore
    @OneToMany(mappedBy = "ambulance")
    private List<Reservation> reservation;

    @Builder
    public Ambulance(String ambulanceName, String addr, String tel, String homePage, int count){
        this.ambulanceName = ambulanceName;
        this.addr = addr;
        this.tel = tel;
        this.homePage = homePage;
        this.count = count;
    }
}

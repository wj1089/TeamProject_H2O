package com.H2O.backend.reservation;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/reservation")
public class ReservationController {

    private final Reservation reservation;
    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;

    //예약등록
    @PostMapping("/register")
    public ResponseEntity<Reservation> register(@RequestBody Reservation reservation) {
        Optional<Reservation> register = reservationService.reservationAdd(reservation);

        if ((register.isPresent())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}

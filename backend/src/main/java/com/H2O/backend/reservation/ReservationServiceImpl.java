package com.H2O.backend.reservation;

import com.H2O.backend.user.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
interface ReservationService {

    Optional<Reservation> reservationAdd(Reservation reservation);

}

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ReservationServiceImpl(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Optional<Reservation> reservationAdd(Reservation reservation) {
        Reservation createReservation = new Reservation();
        createReservation.setReservationType(reservation.getReservationType());
        createReservation.setDate(reservation.getDate());
        createReservation.setPrice("5000원");
        createReservation.setPrescription("처방전");

        System.out.println(createReservation);
        Reservation reservationData = reservationRepository.save(createReservation);

        return Optional.of(reservationData);
    }
}

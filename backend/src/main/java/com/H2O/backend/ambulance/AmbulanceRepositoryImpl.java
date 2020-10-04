package com.H2O.backend.ambulance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
interface AmbulanceRepository extends JpaRepository<Ambulance, Long>, AmbulanceService {}

interface AmbulanceService {}

class AmbulanceRepositoryImpl extends QuerydslRepositorySupport implements AmbulanceService {
    public AmbulanceRepositoryImpl() {
        super(Ambulance.class);
    }
}

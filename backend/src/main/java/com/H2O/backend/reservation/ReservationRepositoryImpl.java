package com.H2O.backend.reservation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
interface IReservationRepository {

}


public class ReservationRepositoryImpl extends QuerydslRepositorySupport implements IReservationRepository {

    private final JPAQueryFactory queryFactory;
    private final DataSource dataSource;

    public ReservationRepositoryImpl(JPAQueryFactory queryFactory, DataSource dataSource) {
        super(Reservation.class);
        this.queryFactory = queryFactory;
        this.dataSource = dataSource;
    }
}

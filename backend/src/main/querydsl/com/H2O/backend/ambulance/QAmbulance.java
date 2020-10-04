package com.H2O.backend.ambulance;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAmbulance is a Querydsl query type for Ambulance
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAmbulance extends EntityPathBase<Ambulance> {

    private static final long serialVersionUID = 799476506L;

    public static final QAmbulance ambulance = new QAmbulance("ambulance");

    public final StringPath addr = createString("addr");

    public final StringPath ambulanceName = createString("ambulanceName");

    public final NumberPath<Long> ambulanceNo = createNumber("ambulanceNo", Long.class);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final StringPath homePage = createString("homePage");

    public final ListPath<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation> reservation = this.<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation>createList("reservation", com.H2O.backend.reservation.Reservation.class, com.H2O.backend.reservation.QReservation.class, PathInits.DIRECT2);

    public final StringPath tel = createString("tel");

    public QAmbulance(String variable) {
        super(Ambulance.class, forVariable(variable));
    }

    public QAmbulance(Path<? extends Ambulance> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAmbulance(PathMetadata metadata) {
        super(Ambulance.class, metadata);
    }

}


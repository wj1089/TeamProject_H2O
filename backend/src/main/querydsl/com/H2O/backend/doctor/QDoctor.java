package com.H2O.backend.doctor;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDoctor is a Querydsl query type for Doctor
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDoctor extends EntityPathBase<Doctor> {

    private static final long serialVersionUID = -1629219746L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDoctor doctor = new QDoctor("doctor");

    public final StringPath birthday = createString("birthday");

    public final StringPath detailData = createString("detailData");

    public final StringPath doctorName = createString("doctorName");

    public final NumberPath<Long> doctorNo = createNumber("doctorNo", Long.class);

    public final StringPath doctorsLicense = createString("doctorsLicense");

    public final com.H2O.backend.hospital.QHospital hospital;

    public final StringPath hospitalName = createString("hospitalName");

    public final StringPath medicalSubject = createString("medicalSubject");

    public final StringPath position = createString("position");

    public final ListPath<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation> reservations = this.<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation>createList("reservations", com.H2O.backend.reservation.Reservation.class, com.H2O.backend.reservation.QReservation.class, PathInits.DIRECT2);

    public final StringPath specialized = createString("specialized");

    public QDoctor(String variable) {
        this(Doctor.class, forVariable(variable), INITS);
    }

    public QDoctor(Path<? extends Doctor> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDoctor(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDoctor(PathMetadata metadata, PathInits inits) {
        this(Doctor.class, metadata, inits);
    }

    public QDoctor(Class<? extends Doctor> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospital = inits.isInitialized("hospital") ? new com.H2O.backend.hospital.QHospital(forProperty("hospital")) : null;
    }

}


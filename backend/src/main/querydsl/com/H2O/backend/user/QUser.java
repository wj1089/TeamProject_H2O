package com.H2O.backend.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1043284066L;

    public static final QUser user = new QUser("user");

    public final NumberPath<Integer> adminCheck = createNumber("adminCheck", Integer.class);

    public final StringPath birthday = createString("birthday");

    public final StringPath email = createString("email");

    public final StringPath history = createString("history");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phone = createString("phone");

    public final ListPath<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation> reservation = this.<com.H2O.backend.reservation.Reservation, com.H2O.backend.reservation.QReservation>createList("reservation", com.H2O.backend.reservation.Reservation.class, com.H2O.backend.reservation.QReservation.class, PathInits.DIRECT2);

    public final StringPath userId = createString("userId");

    public final NumberPath<Long> userNo = createNumber("userNo", Long.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}


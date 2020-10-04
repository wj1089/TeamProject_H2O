package com.H2O.backend.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = 1153688878L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final NumberPath<Long> boardNo = createNumber("boardNo", Long.class);

    public final StringPath category = createString("category");

    public final NumberPath<Integer> click = createNumber("click", Integer.class);

    public final StringPath content = createString("content");

    public final DatePath<java.time.LocalDate> creationDate = createDate("creationDate", java.time.LocalDate.class);

    public final StringPath customerCategory = createString("customerCategory");

    public final com.H2O.backend.hospital.QHospital hospital;

    public final StringPath medCategory = createString("medCategory");

    public final StringPath questionCategory = createString("questionCategory");

    public final StringPath title = createString("title");

    public final com.H2O.backend.user.QUser user;

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospital = inits.isInitialized("hospital") ? new com.H2O.backend.hospital.QHospital(forProperty("hospital")) : null;
        this.user = inits.isInitialized("user") ? new com.H2O.backend.user.QUser(forProperty("user")) : null;
    }

}


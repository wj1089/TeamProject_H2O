package com.H2O.backend.hospital;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Repository
interface IHospitalRepository{
    Optional<Hospital> findByBusinessLicenseNumber(String businessLicenseNumber);
}

public class HospitalRepositoryImpl extends QuerydslRepositorySupport implements IHospitalRepository {
    private final JPAQueryFactory queryFactory;
    private final DataSource dataSource;

    HospitalRepositoryImpl(JPAQueryFactory queryFactory, DataSource dataSource) {
        super(Hospital.class);
        this.queryFactory = queryFactory;
        this.dataSource = dataSource;
    }

    @Override
    public Optional<Hospital> findByBusinessLicenseNumber(String businessLicenseNumber) {
        QHospital qHospital = QHospital.hospital;
        Hospital findOne = queryFactory.selectFrom(qHospital).where(qHospital.businessLicenseNumber.eq(businessLicenseNumber)).fetchOne();
        return Optional.ofNullable(findOne);
    }

}
package com.H2O.backend.hospital;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Optional;

@Component
interface HospitalService {

    public void readCsv();
    Optional<Hospital> findHospitalByBusinessLicenseNumber(String businessLicenseNumber);
    Optional<Hospital> findByBusinessLicenseNumber(String businessLicenseNumber);

    Hospital update(Hospital selectHospital);
    void delete(Hospital selectHospital);
    Optional<Hospital> hospitalAdd(Hospital hospital);
    List<Hospital> hospitalList();

}

@Service
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;

    public HospitalServiceImpl(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }


    @Override
    public Optional<Hospital> findHospitalByBusinessLicenseNumber(String businessLicenseNumber) {
        Optional<Hospital> licenseCheck = hospitalRepository.findByBusinessLicenseNumber(businessLicenseNumber);
        return licenseCheck;
    }

    @Override
    public Optional<Hospital> findByBusinessLicenseNumber(String businessLicenseNumber) {
        return Optional.empty();
    }

    @Override
    public Hospital update(Hospital selectHospital) {
        return hospitalRepository.save(selectHospital);
    }

    @Override
    public void delete(Hospital selectHospital) {
        hospitalRepository.delete(selectHospital);
    }

    @Override
    public Optional<Hospital> hospitalAdd(Hospital hospital) {
        Hospital createHospital = new Hospital();
        createHospital.setHospitalName(hospital.getHospitalName());
        createHospital.setBusinessLicenseNumber(hospital.getBusinessLicenseNumber());
        createHospital.setBusinessStatus(hospital.getBusinessStatus());
        createHospital.setTel(hospital.getTel());
        createHospital.setAddr(hospital.getAddr());
        createHospital.setHospitalType(hospital.getHospitalType());
        createHospital.setMedicalPeople(hospital.getMedicalPeople());
        createHospital.setHospitalRoom(hospital.getHospitalRoom());
        createHospital.setHospitalBed(hospital.getHospitalBed());
        createHospital.setTypeDetail(hospital.getTypeDetail());
        createHospital.setHospitalArea(hospital.getHospitalArea());
        createHospital.setLatitude(hospital.getLatitude());
        createHospital.setLongitude(hospital.getLongitude());

        Hospital hospitalData = hospitalRepository.save(createHospital);
        return Optional.empty();
    }

    @Override
    public List<Hospital> hospitalList() {
        return hospitalRepository.findAll();
    }

    @Override
    public void readCsv() {
        InputStream is = getClass().getResourceAsStream("/static/csv/hospital.csv");

        try {
            BufferedReader fileReader = new BufferedReader(new InputStreamReader(is,"UTF-8"));
            CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT);
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for(CSVRecord csvRecord : csvRecords){
//                System.out.println(csvRecord.get(0));
//                System.out.println(csvRecord.get(1));
//                System.out.println(csvRecord.get(2));
//                System.out.println(csvRecord.get(3));
//                System.out.println(csvRecord.get(4));
//                System.out.println(csvRecord.get(5));
//                System.out.println(csvRecord.get(6));
//                System.out.println(csvRecord.get(7));
//                System.out.println(csvRecord.get(8));
//                System.out.println(csvRecord.get(9));
//                System.out.println(csvRecord.get(10));
//                System.out.println(csvRecord.get(11));
//                System.out.println(csvRecord.get(12));
                hospitalRepository.save(new Hospital(
                        csvRecord.get(0),
                        csvRecord.get(1),
                        csvRecord.get(2),
                        csvRecord.get(3),
                        Double.parseDouble(csvRecord.get(4)),
                        Double.parseDouble(csvRecord.get(5)),
                        csvRecord.get(6),
                        Integer.parseInt(csvRecord.get(7)),
                        Integer.parseInt(csvRecord.get(8)),
                        Integer.parseInt(csvRecord.get(9)),
                        csvRecord.get(10),
                        csvRecord.get(11),
                        csvRecord.get(12)));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
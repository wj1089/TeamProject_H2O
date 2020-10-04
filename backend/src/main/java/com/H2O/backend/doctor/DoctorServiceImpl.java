package com.H2O.backend.doctor;


import com.H2O.backend.hospital.Hospital;
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
interface DoctorService{

    public void readCsv();
    Optional<Doctor> findDoctorByDoctorsLicense(String doctorsLicense);
    Doctor update(Doctor selectDoctor);
    void delete(Doctor selectDoctor);
    Optional<Doctor> doctorAdd(Doctor doctor);
    List<Doctor> doctorList();

}

@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }


    @Override
    public Optional<Doctor> findDoctorByDoctorsLicense(String doctorsLicense) {
        Optional<Doctor> licenseCheck = doctorRepository.findByDoctorsLicense(doctorsLicense);
        return licenseCheck;
    }

    @Override
    public Doctor update(Doctor selectDoctor) {
        return doctorRepository.save(selectDoctor);
    }

    @Override
    public void delete(Doctor selectDoctor) {
        doctorRepository.delete(selectDoctor);
    }

    @Override
    public Optional<Doctor> doctorAdd(Doctor doctor) {
        Doctor createDoctor = new Doctor();
        createDoctor.setDoctorsLicense(doctor.getDoctorsLicense());
        createDoctor.setDoctorName(doctor.getDoctorName());
        createDoctor.setHospitalName(doctor.getHospitalName());
        createDoctor.setPosition(doctor.getPosition());
        createDoctor.setDetailData(doctor.getDetailData());
        createDoctor.setSpecialized(doctor.getSpecialized());
        createDoctor.setMedicalSubject(doctor.getMedicalSubject());
        createDoctor.setBirthday(doctor.getBirthday());

        System.out.println("------------------");
        System.out.println(createDoctor);

        Doctor doctorData = doctorRepository.save(createDoctor);

        System.out.println("22222222222222222222222222222");
        return Optional.of(doctorData);
    }

    @Override
    public List<Doctor> doctorList() {
        return doctorRepository.findAll();
    }


    @Override
    public void readCsv() {
        InputStream is = getClass().getResourceAsStream("/static/csv/doctor.csv");

        try {
            BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT);
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            for (CSVRecord csvRecord : csvRecords) {
                System.out.println(csvRecord.get(0));
                System.out.println(csvRecord.get(1));
                System.out.println(csvRecord.get(2));
                System.out.println(csvRecord.get(3));
                System.out.println(csvRecord.get(4));
                System.out.println(csvRecord.get(5));
                System.out.println(csvRecord.get(6));
                System.out.println(csvRecord.get(7));
//                System.out.println(csvRecord.get(9));
//                System.out.println(csvRecord.get(10));
                doctorRepository.save(new Doctor(
                        csvRecord.get(0),
                        csvRecord.get(1),
                        csvRecord.get(2),
                        csvRecord.get(3),
                        csvRecord.get(4),
                        csvRecord.get(5),
                        csvRecord.get(6),
                        csvRecord.get(7)
                ));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


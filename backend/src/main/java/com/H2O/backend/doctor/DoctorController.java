package com.H2O.backend.doctor;


import com.H2O.backend.util.etc.Box;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/doctor")
public class DoctorController {
    private final Doctor doctor;
    private final DoctorRepository doctorRepository;
    private final DoctorService doctorService;

    @Autowired
    Box box;

    //csv파일 데이터베이스에 저장
    @GetMapping("/csv")
    public void csvRead(){ doctorService.readCsv(); }

    //맵에 병원 띄우기
    @GetMapping("/data")
    public Map<?,?> hospitalData(){
        System.out.println("들어옴");
        Iterable<Doctor> data = doctorRepository.findAll();
        box.put("doctorList", data);
        System.out.println(box.get());
        return box.get();
        //Iterable for-each(반복문) 사용 가능한 클래스

    }

    // 의사 추가
    @PostMapping("/doctorAdd")
    public ResponseEntity<Doctor> doctorAdd(@RequestBody Doctor doctor){
        Optional<Doctor> doctorAdd = doctorService.doctorAdd(doctor);
        if((doctorAdd.isPresent())){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // 의사 정보 변경
    @PatchMapping("/modify/{doctorsLicense}")
    public ResponseEntity<Doctor> modify(@PathVariable String doctorsLicense, @RequestBody Doctor doctor){
        System.out.println("정보가 들어왔나?");
        Optional<Doctor> modifyDoctor = doctorService.findDoctorByDoctorsLicense(doctor.getDoctorsLicense());
        System.out.println(modifyDoctor);
        if(modifyDoctor.isPresent()){
            modifyDoctor.ifPresent(selectDoctor ->{
                selectDoctor.setDoctorName(doctor.getDoctorName());
                selectDoctor.setHospitalName(doctor.getHospitalName());
                selectDoctor.setPosition(doctor.getPosition());
                selectDoctor.setDetailData(doctor.getDetailData());
                selectDoctor.setSpecialized(doctor.getSpecialized());
                selectDoctor.setMedicalSubject(doctor.getMedicalSubject());
                selectDoctor.setBirthday(doctor.getBirthday());
                System.out.println(selectDoctor);
                doctorRepository.save(selectDoctor);
            });
            return ResponseEntity.ok(modifyDoctor.get());
        } else {
            System.out.println("의사 정보 업데이트 실패");
            return ResponseEntity.notFound().build();
        }
    }

    //의사 라이센스 중복 검사
    @GetMapping("/licenseCheck/{doctorsLicense}")
    public ResponseEntity<Doctor> licenseCheck(@PathVariable String doctorsLicense){
        Optional<Doctor> licenseCheckResult = doctorService.findDoctorByDoctorsLicense(doctorsLicense);
        if(licenseCheckResult.isPresent()){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    // 의사 테이블 리스트
    @GetMapping("/doctorList")
    public ResponseEntity<List<Doctor>> doctorList() {
        List<Doctor> doctorList = doctorService.doctorList();
        System.out.println(doctorList);
        return ResponseEntity.ok(doctorList);
    }

}
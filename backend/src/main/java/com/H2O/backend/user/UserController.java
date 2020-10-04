package com.H2O.backend.user;

import com.H2O.backend.hospital.Hospital;
import lombok.AllArgsConstructor;
import org.junit.Assert;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final User user;
    private final UserRepository userRepository;
    private final UserService userService;


    // csv 파일 데이터베이스에 저장
    @GetMapping("/csv")
    public void csvRead(){
        userService.readCsv();
    }

    //회원가입
    @PostMapping("/signUp")
    public ResponseEntity<User> signup(@RequestBody User user) {
        Optional<User> signUp = userService.signUp(user);

        if ((signUp.isPresent())) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }


    }

    //회원가입 아이디 중복확인
    @GetMapping("/idCheck/{userId}")
    public ResponseEntity<User> idCheck(@PathVariable String userId) {
        Optional<User> idCheckResult = userService.findUserByUserId(userId);
        if(idCheckResult.isPresent()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        System.out.println(">>>>"+user.toString());
        Optional<User> findUser = userService.findUserByUserId(user.getUserId());
        if(findUser.isPresent()) {
            User requestLoginUser = findUser.get();
            if(user.getPassword().equals(requestLoginUser.getPassword())) {
                return ResponseEntity.ok(requestLoginUser);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //아이디 찾기
    @GetMapping("/findId")
    public ResponseEntity<User> findId(@RequestParam String name, @RequestParam String phone) {
        System.out.println(name);
        System.out.println(phone);
        Optional<User> findId = userService.findId(name,phone);

        if(findId.isPresent()) {
            return ResponseEntity.ok(findId.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    //비밀번호 변경
    @GetMapping("/findPw")
    public ResponseEntity<User> findPw(@RequestParam String userId,
                                                          @RequestParam String name, @RequestParam String phone) {
        Optional<User> findPw = userService.findPw(userId, name, phone);
        if(findPw.isPresent()) {
            return ResponseEntity.ok(findPw.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //아이디찾기
    @PatchMapping(value = "/{userNo}")
    public ResponseEntity<User> updateUser(@PathVariable String userNo, @RequestBody User user) {
        System.out.println(userNo);
        Optional<User> findUser = userService.findUser(Long.valueOf(userNo));
        if(findUser.isPresent()) {
            User selectUser = findUser.get();
            Optional.ofNullable(user.getPassword()).ifPresent(password -> selectUser.setPassword(password));
            Optional.ofNullable(user.getPhone()).ifPresent(phone -> selectUser.setPhone(phone));
            Optional.ofNullable(user.getEmail()).ifPresent(email -> selectUser.setEmail(email));
            return ResponseEntity.ok(userService.update(selectUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //회원정보 변경
    @PatchMapping("/modify/{userId}")
    public ResponseEntity<User> modify(@PathVariable String userId, @RequestBody User user) {
        System.out.println("회원 정보 변경 진입");
        System.out.println(user);
        Optional<User> modifyUser = userService.findUserByUserId(user.getUserId());

        if(modifyUser.isPresent()){
            modifyUser.ifPresent(selectUser ->{
                selectUser.setName(user.getName());
                selectUser.setPhone(user.getPhone());
                selectUser.setEmail(user.getEmail());
                selectUser.setPassword(user.getPassword());
                selectUser.setBirthday(user.getBirthday());
                userRepository.save(selectUser);
                System.out.println(selectUser);
            });
            return ResponseEntity.ok(modifyUser.get());
        } else {
            System.out.println("업데이트 실패");

            return ResponseEntity.notFound().build();
        }

    }
    @PostMapping("/delete")
    public ResponseEntity<User> delete(@RequestBody User user) {
        Optional<User> DeleteUser = userService.findUserByUserId(user.getUserId());

        if (DeleteUser.isPresent()) {
            User selectUser = DeleteUser.get();
            userRepository.
                    delete(selectUser);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    // 유저 테이블 리스트
    @GetMapping("/userList")
    public ResponseEntity<List<User>> userList() {
        List<User> userList = userService.userList();
        System.out.println(userList);
        return ResponseEntity.ok(userList);
    }

    }

package com.H2O.backend.user;

import com.H2O.backend.doctor.Doctor;
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
interface UserService {

    Optional<User> findUserByUserId(String userId);

    User update(User selectUser);

    void delete(User selectUser);

    Optional<User> findUser(Long userNo);

    Optional<User> findId(String name, String phone);

    Optional<User> findPw(String userId, String name, String phone);

    Optional<User> signUp(User user);
    public void readCsv();
    List<User> userList();

}
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findUserByUserId(String userId) {
        Optional<User> idCheck = userRepository.findByUserId(userId);
        return idCheck;
    }

    @Override
    public User update(User selectUser) {
        return userRepository.save(selectUser);
    }

    @Override
    public void delete(User selectUser) {
        userRepository.delete(selectUser);
    }

    @Override
    public Optional<User> findUser(Long userNo) {
        return userRepository.findById(userNo);
    }

    @Override
    public Optional<User> findId(String name, String phone) {
        Optional<User> findId = userRepository.findUserId(name,phone);
        return findId;
    }

    @Override
    public Optional<User> findPw(String userId, String name, String phone) {
        Optional<User> findPw = userRepository.findUserPw(userId,name,phone);
        return findPw;
    }


    @Override
    public Optional<User> signUp(User user) {
        User createUser = new User();
        createUser.setUserId(user.getUserId());
        createUser.setPassword(user.getPassword());
        createUser.setName(user.getName());
        createUser.setPhone(user.getPhone());
        createUser.setEmail(user.getEmail());
        createUser.setAdminCheck(0);
        createUser.setBirthday(user.getBirthday());


        System.out.println(createUser);
        User userData = userRepository.save(createUser);
        return Optional.of(userData);

    }

    @Override
    public void readCsv() {
        InputStream is = getClass().getResourceAsStream("/static/csv/user.csv");

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
                userRepository.save(new User(
                        csvRecord.get(0),
                        csvRecord.get(1),
                        csvRecord.get(2),
                        csvRecord.get(3),
                        Integer.parseInt(csvRecord.get(4)),
                        csvRecord.get(5),
                        csvRecord.get(6),
                        csvRecord.get(7)
                ));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<User> userList() {
        return userRepository.findAll();
    }
}

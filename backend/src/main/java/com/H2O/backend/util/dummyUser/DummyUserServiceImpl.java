package com.H2O.backend.util.dummyUser;

import com.H2O.backend.user.User;
import com.H2O.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
interface DummyUserService {
    List<User> createDummyUser();
}

@Service
public class DummyUserServiceImpl implements DummyUserService{
    @Autowired
    UserRepository userRepository;


    @Override
    public List<User> createDummyUser() {
        List<User> userList = new ArrayList<>();
        for(int i = 0; i < 1000; i++) {
            User user = new User();
            user.setUserId(DummyUser.generateRandomId()+DummyUser.generateRandomNo2());
            user.setPassword(DummyUser.generateRandomPw()+DummyUser.generateRandomPwNum());
            user.setName(DummyUser.generateRandomName());
            user.setEmail(DummyUser.generateRandomEmailId()+"@"+DummyUser.generateRandomEmail()+
                    DummyUser.generateRandomEmailEnd());
            user.setPhone(DummyUser.generateRandomPhone()+DummyUser.generateRandomPhoneNo()+DummyUser.generateRandomPhoneNo());
            user.setAdminCheck(0);
            userList.add(user);
        }
        return userRepository.saveAll(userList);
    }
}

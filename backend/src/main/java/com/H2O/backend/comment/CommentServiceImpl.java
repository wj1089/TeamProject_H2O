package com.H2O.backend.comment;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
interface CommentService {

}


@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository){this.commentRepository=commentRepository;}

}

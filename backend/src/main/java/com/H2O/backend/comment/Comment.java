package com.H2O.backend.comment;

import com.H2O.backend.board.Board;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_no") private Long commentNo;
    @Column(name = "content", nullable = false) private String content;
    @Column(name = "creation_date")
    private LocalDate creationDate = LocalDate.now();
    @Column(name = "comment_reply", nullable = false) private String commentsReply;
    @Column(name = "sequence_no", nullable = false) private String sequenceNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "board_no") private Board board;

    @Builder
    public Comment(String content, LocalDate creationDate,
                   String commentsReply, String sequenceNo){
        this.content=content;
        this.creationDate=creationDate;
        this.commentsReply=commentsReply;
        this.sequenceNo=sequenceNo;
    }

}

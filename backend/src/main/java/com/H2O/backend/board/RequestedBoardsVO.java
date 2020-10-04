package com.H2O.backend.board;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
public class RequestedBoardsVO {
    private Long boardNo;
    private String title;
    private String content;
    private LocalDate creationDate;
    private String category;
    private String medCategory;
    private int click;
}

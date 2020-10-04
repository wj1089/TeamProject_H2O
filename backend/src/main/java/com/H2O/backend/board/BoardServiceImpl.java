package com.H2O.backend.board;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Component
interface BoardService {

    public void readCsv();
    List<Board> findAll();
    void delete(Board board);
    Board update(Board selectBoard);
    Board findTitle(String title);
    List<Board> findOneBoard(String medCategory);
    Optional<Board> findBoardNo(Long boardNo);
    void modify(Board boardNo);
    void click(Long boardNo);
//    List<Board> getBoardPage(int pageNumber);
    List<Board> getAllBoardList();
    List<Board> boardList();

    List<Board> findByCategory(String category);
}
    @Service
    public class BoardServiceImpl implements BoardService {
        private final BoardRepository boardRepository;

        public BoardServiceImpl(BoardRepository boardRepository) {
            this.boardRepository = boardRepository;
        }



        @Override
        public List<Board> findAll() {
            return boardRepository.findAll();
        }

        @Override
        public Board update(Board selectBoard) {
            return boardRepository.save(selectBoard);
        }

        @Override
        public void delete(Board board) {
            boardRepository.delete(board);
        }

        @Override
        public List<Board> findOneBoard(String medCategory) {
            return boardRepository.findAllByMedCategory(medCategory);
        }

        public Optional<Board> findBoardNo(Long boardNo) {
            return boardRepository.findById(boardNo);
        }


        @Override  @Modifying @Transactional
        public void modify(Board boardNo) { boardRepository.modify(boardNo); }

        @Override @Modifying @Transactional
        public void click(Long boardNo) {
            boardRepository.findOneByClick(boardNo);
        }

        @Override
        public List<Board> getAllBoardList() {
            return boardRepository.findAll(); //페이지네이션
            }

        @Override
        public List<Board> boardList() {
            return boardRepository.findAll();
        }

        @Override
        public List<Board> findByCategory(String category) {
            switch (category){
                case "boardUser": category="자유게시판"; break;
                case "customerServiceCenter": category="고객서비스센터"; break;
                case "questionAnswer": category="Q&A"; break;
                default :
                    System.out.println("test");
            }
            return boardRepository.findByCategory(category);
        }

        @Override
        public void readCsv() {
            InputStream is = getClass().getResourceAsStream("/static/csv/board.csv");

            try {
                BufferedReader fileReader = new BufferedReader(new InputStreamReader(is,"UTF-8"));
                CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT);
                Iterable<CSVRecord> csvRecords = csvParser.getRecords();
                for(CSVRecord csvRecord : csvRecords){

                    boardRepository.save(new Board(
                            csvRecord.get(0),
                            csvRecord.get(1),
                            LocalDate.parse(csvRecord.get(2)),
                            csvRecord.get(3),
                            csvRecord.get(4),
                            csvRecord.get(5),
                            csvRecord.get(6),
                            Integer.parseInt(csvRecord.get(7))));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        @Override
        public Board findTitle(String title) {
            return boardRepository.findAllByTitle(title);
        }
    }



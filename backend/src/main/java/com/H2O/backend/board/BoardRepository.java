package com.H2O.backend.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
interface BoardRepository extends JpaRepository<Board, Long>, IBoardRepository {//findAll , save 내장

public List<Board> findAllByMedCategory(String medCategory);

public Board findAllByTitle(String title);

public List<Board> findByCategory(String category);

}

package com.mightyjava.repository;

import com.mightyjava.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    @Query("FROM Book b WHERE b.title=:searchText OR b.author=:searchText OR b.language=:searchText OR b.genre=:searchText ORDER BY b.price DESC ")
    Page<Book> findAllBooks(Pageable pageable, @Param("searchText") String searchText);

}

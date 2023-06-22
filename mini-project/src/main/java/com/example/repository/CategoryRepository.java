package com.example.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameContaining(String name);

    boolean existsBySlug(String slug);

    Optional<Category> findBySlug(String slug);

    Category findByName(String name);

    Page<Category> findByNameContaining(String name, Pageable pageable);
}

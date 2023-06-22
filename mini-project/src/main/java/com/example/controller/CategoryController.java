package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Category;
import com.example.repository.CategoryRepository;
import com.example.util.StringUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getAllCategories(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("name"));

            Page<Category> pageCategory;
            if (name == null) {
                pageCategory = categoryRepository.findAll(pageable);
            } else {
                pageCategory = categoryRepository.findByNameContaining(name, pageable);
            }

            List<Category> categories = pageCategory.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("categories", categories);
            response.put("currentPage", pageCategory.getNumber());
            response.put("totalItems", pageCategory.getTotalElements());
            response.put("totalPages", pageCategory.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/categories/{id}")
    // public ResponseEntity<Category> getCategoryById(@PathVariable("id") long id)
    // {
    // try {
    // if (!categoryRepository.existsById(id)) {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // return new ResponseEntity<>(categoryRepository.findById(id).get(),
    // HttpStatus.OK);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @GetMapping("/categories/{slug}")
    public ResponseEntity<Category> getCategoryBySlug(@PathVariable("slug") String slug) {
        try {
            if (!categoryRepository.existsBySlug(slug)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(categoryRepository.findBySlug(slug).get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<Map<String, Object>> saveCategory(@RequestBody Category categoryRequest) {
        try {
            Map<String, Object> response = new HashMap<>();

            if (categoryRepository.existsByNameContaining(categoryRequest.getName())) {
                response.put("message", "Nama category sudah ada");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Category category = new Category();
            category.setName(categoryRequest.getName());

            category.setSlug(StringUtil.toSlugWithRandomString(category.getName()));
            categoryRepository.save(category);
            response.put("message", "Category berhasil disimpan");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> updateCategoryById(@PathVariable("id") long id,
            @RequestBody Category categoryRequest) {
        try {
            Map<String, Object> response = new HashMap<>();

            if (!categoryRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (categoryRepository.existsByNameContaining(categoryRequest.getName())) {
                response.put("message", "Nama category sudah ada");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Category category = new Category();
            category.setName(categoryRequest.getName());
            category.setSlug(StringUtil.toSlugWithRandomString(category.getName()));
            categoryRepository.save(category);

            response.put("message", "Category berhasil diedit");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategoryById(@PathVariable("id") long id) {
        try {
            if (!categoryRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Category berhasil dihapus");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

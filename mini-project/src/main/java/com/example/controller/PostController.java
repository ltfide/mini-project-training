package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.example.entity.Post;
import com.example.repository.CategoryRepository;
import com.example.repository.PostRepository;
import com.example.util.StringUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PostController {

    private final Logger Log = LoggerFactory.getLogger(getClass());

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getAllPosts(
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt"));

            Page<Post> pagePost;
            if (title == null) {
                pagePost = postRepository.findAll(pageable);
            } else {
                pagePost = postRepository.findByTitleContaining(title, pageable);
            }

            List<Post> posts = pagePost.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("posts", posts);
            response.put("currentPage", pagePost.getNumber());
            response.put("totalItems", pagePost.getTotalElements());
            response.put("totalPages", pagePost.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/posts/{id}")
    // public ResponseEntity<Post> getPostById(@PathVariable("id") long id) {
    // try {
    // if (!postRepository.existsById(id)) {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // return new ResponseEntity<>(postRepository.findById(id).get(),
    // HttpStatus.OK);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @GetMapping("/posts/{slug}")
    public ResponseEntity<Post> getPostBySlug(@PathVariable("slug") String slug) {
        try {
            if (!postRepository.existsBySlug(slug)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(postRepository.findBySlug(slug).get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/posts")
    public ResponseEntity<Map<String, Object>> savePost(@RequestBody Post postRequest) {
        try {
            Map<String, Object> response = new HashMap<>();

            Post post = new Post();
            post.setTitle(postRequest.getTitle());
            post.setContent(postRequest.getContent());

            if (Objects.nonNull(postRequest.getCategory()) &&
                    !categoryRepository.existsByNameContaining(postRequest.getCategory().getName())) {
                response.put("message", "Category tidak ada");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            post.setSlug(StringUtil.toSlugWithRandomString(post.getTitle()));
            post.setSummary(postRequest.getContent());
            post.setCategory(categoryRepository.findByName(postRequest.getCategory().getName()));
            postRepository.save(post);
            response.put("message", "Post berhasil disimpan");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Log.error("Error: {}", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Map<String, Object>> updatePostById(@PathVariable("id") long id,
            @RequestBody Post postRequest) {
        try {
            Map<String, Object> response = new HashMap<>();

            if (!postRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Post post = postRepository.findById(id).get();
            post.setTitle(postRequest.getTitle());
            post.setContent(postRequest.getContent());

            if (!categoryRepository.existsByNameContaining(postRequest.getCategory().getName())) {
                response.put("message", "Category tidak ada");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            post.setSlug(StringUtil.toSlugWithRandomString(post.getTitle()));
            post.setCategory(postRequest.getCategory());
            postRepository.save(post);
            response.put("message", "Post berhasil diedit");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Map<String, Object>> deletePostById(@PathVariable("id") long id) {
        try {
            if (!postRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            postRepository.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Post berhasil dihapus");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

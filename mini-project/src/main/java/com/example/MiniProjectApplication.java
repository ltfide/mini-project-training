package com.example;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.entity.Category;
import com.example.entity.Post;
import com.example.repository.CategoryRepository;
import com.example.repository.PostRepository;
import com.example.util.StringUtil;

@SpringBootApplication
public class MiniProjectApplication implements CommandLineRunner {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	public static void main(String[] args) {
		SpringApplication.run(MiniProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		categoryRepository.save(new Category("Java", "java"));
		categoryRepository.save(new Category("Golang", "golang"));

		Post post = new Post();
		post.setTitle("Belajar Java");
		post.setSlug("belajar-java-nmxad");
		post.setContent("Belajar Java");
		post.setSummary("Belajar java");
		post.setCreatedAt(LocalDateTime.now());
		post.setUpdatedAt(LocalDateTime.now());
		post.setCategory(categoryRepository.findByName("Java"));
		postRepository.save(post);
	}

}

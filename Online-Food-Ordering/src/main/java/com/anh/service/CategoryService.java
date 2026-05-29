package com.anh.service;

import com.anh.model.Category;
import java.util.List;

public interface CategoryService {
    public Category createCategory(String name, Long userId) throws Exception;
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;
    public Category findCategoryById(Long id) throws Exception;
    public Category updateCategory(Long categoryId, String name) throws Exception;
    public void deleteCategory(Long categoryId) throws Exception;
}
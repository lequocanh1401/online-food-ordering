package com.anh.service;

import com.anh.model.IngredientCategory;
import com.anh.model.IngredientsItem;
import com.anh.model.Restaurant;
import com.anh.repository.IngredientCategoryRepository;
import com.anh.repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> opt = ingredientCategoryRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Ingredient category not found with id: " + id);
        }
        return opt.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        // Kiểm tra xem nhà hàng có tồn tại không trước khi lấy danh mục
        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);

        IngredientsItem item = new IngredientsItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        IngredientsItem savedItem = ingredientItemRepository.save(item);
        category.getIngredients().add(savedItem);

        return savedItem;
    }

    @Override
    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> opt = ingredientItemRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Ingredient not found with id: " + id);
        }
        IngredientsItem item = opt.get();
        item.setInStock(!item.isInStock()); // Đảo trạng thái Còn hàng / Hết hàng
        return ingredientItemRepository.save(item);
    }

    @Autowired
    private com.anh.repository.FoodRepository foodRepository;

    @Override
    public IngredientsItem findIngredientItemById(Long id) throws Exception {
        Optional<IngredientsItem> opt = ingredientItemRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Ingredient not found with id: " + id);
        }
        return opt.get();
    }

    @Override
    public IngredientCategory updateIngredientCategory(Long categoryId, String name) throws Exception {
        IngredientCategory category = findIngredientCategoryById(categoryId);
        category.setName(name);
        return ingredientCategoryRepository.save(category);
    }

    @Override
    public void deleteIngredientCategory(Long categoryId) throws Exception {
        IngredientCategory category = findIngredientCategoryById(categoryId);
        if (!category.getIngredients().isEmpty()) {
            throw new Exception("Không thể xóa danh mục này vì vẫn còn nguyên liệu bên trong.");
        }
        ingredientCategoryRepository.delete(category);
    }

    @Override
    public IngredientsItem updateIngredientItem(Long ingredientId, String name, Long categoryId) throws Exception {
        IngredientsItem item = findIngredientItemById(ingredientId);
        IngredientCategory category = findIngredientCategoryById(categoryId);
        item.setName(name);
        item.setCategory(category);
        return ingredientItemRepository.save(item);
    }

    @Override
    public void deleteIngredientItem(Long ingredientId) throws Exception {
        if (foodRepository.existsByIngredientId(ingredientId)) {
            throw new Exception("Không thể xóa nguyên liệu này vì có món ăn đang sử dụng nó.");
        }
        IngredientsItem item = findIngredientItemById(ingredientId);
        ingredientItemRepository.delete(item);
    }
}
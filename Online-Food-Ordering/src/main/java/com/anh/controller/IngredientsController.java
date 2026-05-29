package com.anh.controller;

import com.anh.model.IngredientCategory;
import com.anh.model.IngredientsItem;
import com.anh.request.IngredientCategoryRequest;
import com.anh.request.IngredientRequest;
import com.anh.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody IngredientCategoryRequest req) throws Exception {
        IngredientCategory item = ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<IngredientsItem> createIngredientItem(
            @RequestBody IngredientRequest req) throws Exception {
        IngredientsItem item = ingredientsService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateIngredientStock(
            @PathVariable Long id) throws Exception {
        IngredientsItem item = ingredientsService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredients(
            @PathVariable Long id) throws Exception {
        List<IngredientsItem> items = ingredientsService.findRestaurantsIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long id) throws Exception {
        List<IngredientCategory> items = ingredientsService.findIngredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<IngredientCategory> updateIngredientCategory(
            @PathVariable Long id,
            @RequestBody com.anh.request.IngredientCategoryRequest req) throws Exception {
        IngredientCategory item = ingredientsService.updateIngredientCategory(id, req.getName());
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<com.anh.response.MessageResponse> deleteIngredientCategory(
            @PathVariable Long id) throws Exception {
        ingredientsService.deleteIngredientCategory(id);
        com.anh.response.MessageResponse res = new com.anh.response.MessageResponse();
        res.setMessage("Ingredient category deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredientsItem> updateIngredientItem(
            @PathVariable Long id,
            @RequestBody IngredientRequest req) throws Exception {
        IngredientsItem item = ingredientsService.updateIngredientItem(id, req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<com.anh.response.MessageResponse> deleteIngredientItem(
            @PathVariable Long id) throws Exception {
        ingredientsService.deleteIngredientItem(id);
        com.anh.response.MessageResponse res = new com.anh.response.MessageResponse();
        res.setMessage("Ingredient item deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
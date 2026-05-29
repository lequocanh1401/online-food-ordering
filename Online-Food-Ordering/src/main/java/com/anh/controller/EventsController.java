package com.anh.controller;

import com.anh.model.Events;
import com.anh.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Events>> getRestaurantsEvents(
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        List<Events> events = eventsService.getRestaurantsEvents(restaurantId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Events>> getAllEvents(
            @RequestHeader("Authorization") String jwt) throws Exception {
        List<Events> events = eventsService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
}

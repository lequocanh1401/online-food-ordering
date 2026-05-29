package com.anh.controller;

import com.anh.model.Events;
import com.anh.response.MessageResponse;
import com.anh.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventsController {

    @Autowired
    private EventsService eventsService;

    @PostMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Events> createEvent(
            @RequestBody Events event,
            @PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        Events createdEvent = eventsService.createEvent(event, restaurantId);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteEvent(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {
        eventsService.deleteEvent(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Event deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Events> updateEvent(
            @PathVariable Long id,
            @RequestBody Events event,
            @RequestHeader("Authorization") String jwt) throws Exception {
        Events updatedEvent = eventsService.updateEvent(id, event);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
}

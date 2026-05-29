package com.anh.service;

import com.anh.model.Events;
import java.util.List;

public interface EventsService {
    Events createEvent(Events event, Long restaurantId) throws Exception;
    List<Events> getRestaurantsEvents(Long restaurantId);
    void deleteEvent(Long eventId) throws Exception;
    public List<Events> getAllEvents();
    public Events findEventById(Long id) throws Exception;
    public Events updateEvent(Long eventId, Events event) throws Exception;
}

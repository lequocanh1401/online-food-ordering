package com.anh.service;

import com.anh.model.Events;
import com.anh.model.Restaurant;
import com.anh.repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EventsServiceImpl implements EventsService {

    @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Events createEvent(Events event, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        Events newEvent = new Events();
        newEvent.setName(event.getName());
        newEvent.setImage(event.getImage());
        newEvent.setLocation(event.getLocation());
        newEvent.setStartedAt(event.getStartedAt());
        newEvent.setEndsAt(event.getEndsAt());
        newEvent.setRestaurant(restaurant);
        return eventsRepository.save(newEvent);
    }

    @Override
    public List<Events> getRestaurantsEvents(Long restaurantId) {
        return eventsRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public void deleteEvent(Long eventId) throws Exception {
        Events event = findEventById(eventId);
        eventsRepository.delete(event);
    }

    @Override
    public List<Events> getAllEvents() {
        return eventsRepository.findAll();
    }

    @Override
    public Events findEventById(Long id) throws Exception {
        Optional<Events> opt = eventsRepository.findById(id);
        if (opt.isEmpty()) {
            throw new Exception("Event not found with id " + id);
        }
        return opt.get();
    }

    @Override
    public Events updateEvent(Long eventId, Events event) throws Exception {
        Events existingEvent = findEventById(eventId);
        existingEvent.setName(event.getName());
        existingEvent.setImage(event.getImage());
        existingEvent.setLocation(event.getLocation());
        existingEvent.setStartedAt(event.getStartedAt());
        existingEvent.setEndsAt(event.getEndsAt());
        return eventsRepository.save(existingEvent);
    }
}

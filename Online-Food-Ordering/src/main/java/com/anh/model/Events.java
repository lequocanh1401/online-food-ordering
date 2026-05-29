package com.anh.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String image;
    private String startedAt;
    private String endsAt;
    private String name;
    private String location;

    @ManyToOne
    @JsonIgnoreProperties({"owner", "orders", "foods", "images"})
    private Restaurant restaurant;
}

package com.example.listener;

import java.time.LocalDateTime;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class TimestampedEntityListener {

    @PrePersist
    public void prePersist(Object entity) {
        if (entity instanceof TimestampedEntity) {
            TimestampedEntity timestampedEntity = (TimestampedEntity) entity;
            LocalDateTime now = LocalDateTime.now();
            timestampedEntity.setCreatedAt(now);
            timestampedEntity.setUpdatedAt(now);
        }
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        if (entity instanceof TimestampedEntity) {
            TimestampedEntity timestampedEntity = (TimestampedEntity) entity;
            timestampedEntity.setUpdatedAt(LocalDateTime.now());
        }
    }
}

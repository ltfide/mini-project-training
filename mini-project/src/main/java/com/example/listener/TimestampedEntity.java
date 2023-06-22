package com.example.listener;

import java.time.LocalDateTime;

public interface TimestampedEntity {

    void setCreatedAt(LocalDateTime createdAt);

    void setUpdatedAt(LocalDateTime updatedAt);
}

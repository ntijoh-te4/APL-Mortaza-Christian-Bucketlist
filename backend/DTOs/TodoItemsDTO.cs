namespace Bucketlist.DTOs;

public record TodoItemsDTO(
    string Description,
    bool IsComplete = false
);
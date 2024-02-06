namespace Bucketlist.DTOs;

public record TodoItemResponse(
    long Id,
    string Title,
    string Description,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime Deadline,
    bool IsComplete
);

public record PostTodoItemRequest(
    string Title,
    DateTime? Deadline,
    string? Description
);

public record PatchTodoItemRequest(
    string? Title,
    string? Description,
    bool? IsComplete,
    DateTime? Deadline
);

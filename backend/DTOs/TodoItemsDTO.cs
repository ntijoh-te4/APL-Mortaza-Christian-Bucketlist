namespace Bucketlist.DTOs;
public record TodoItemResponse(
    long Id,
    string Title,
    string Description,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? Deadline,
    bool IsComplete = false
);
public record PostTodoItemRequest(
    string Title,
    DateTime? Deadline,
    string? Description = ""
);
public record PostTodoItemResponse(
    long Id,
    string Title,
    string Description,
    bool IsComplete,
    DateTime Deadline,
    long TodoListId
);
public record PatchTodoItemRequest(
    string? Title,
    string? Description,
    bool? IsComplete,
    DateTime? Deadline
);

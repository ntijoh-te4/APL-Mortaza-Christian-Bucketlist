namespace Bucketlist.DTOs;

public record TodoListPreviewResponse(
    long Id,
    string Name
);

public record PostTodoListRequest(
    string Name
);

public record PostTodoListResponse(
    long Id,
    string Name
);

public record PatchTodoListRequest(
    string? Name
);

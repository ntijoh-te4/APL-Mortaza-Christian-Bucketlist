namespace Bucketlist.DTOs;

public record TodoListPreviewResponse(
    long Id,
    string Name
);

public record PostTodoListRequest(
    string Name
);

public record CreatedTodoListResponse(
    long Id,
    string Name
);

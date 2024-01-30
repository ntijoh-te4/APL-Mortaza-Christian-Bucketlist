namespace Bucketlist.Models;

public class TodoItem
{
    public long Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsComplete { get; set; } = false;
    public DateTime? Deadline { get; set; } = null;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public TodoList TodoList { get; set; } = null!;
}

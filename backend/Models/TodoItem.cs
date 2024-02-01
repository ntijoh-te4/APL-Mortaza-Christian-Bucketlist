namespace Bucketlist.Models;

public class TodoItem : BaseEntity
{
    public long Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsComplete { get; set; } = false;
    public DateTime Deadline { get; set; } = DateTime.MinValue;
    public TodoList TodoList { get; set; } = null!;
}

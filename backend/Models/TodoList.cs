namespace Bucketlist.Models;

public class TodoList
{
    public long Id { get; set; }
    public string Name { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<TodoItem> TodoItems { get; set; } = [];
}
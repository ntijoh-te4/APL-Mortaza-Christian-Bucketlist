namespace Bucketlist.Models;

public class TodoList
{
    public string Name { get; set; } = "";
    public List<TodoItem> TodoItems {get; set;} = [];
}
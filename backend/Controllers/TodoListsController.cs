using Bucketlist.DTOs;
using Bucketlist.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bucketlist.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TodoListsController(BucketlistContext context) : ControllerBase
{
    private readonly BucketlistContext _context = context;

    [HttpGet("{id:long}/TodoItems")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(IEnumerable<TodoItemResponse>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTodoItems([FromRoute] long id)
    {
        IEnumerable<TodoItemResponse>? response = await _context.TodoLists
            .Where(e => e.Id == id)
            .Include(e => e.TodoItems)
            .Select(todoList => todoList.TodoItems
                .Select(todoItem => new TodoItemResponse(
                    todoItem.Id,
                    todoItem.Title,
                    todoItem.Description,
                    todoItem.CreatedAt,
                    todoItem.UpdatedAt,
                    todoItem.Deadline,
                    todoItem.IsComplete))
                ).FirstOrDefaultAsync();

        return response == null ? NotFound() : Ok(response);
    }

    [EnableCors]
    [HttpPost("{id:long}/TodoItems")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> PostTodoItem([FromRoute] long id, [FromBody] PostTodoItemRequest request)
    {
        TodoList? todoList = await _context.TodoLists.FindAsync(id);

        if (todoList == null)
        {
            return NotFound();
        }

        TodoItem todoItem = new()
        {
            Title = request.Title,
            Description = request.Description ?? "",
            Deadline = request.Deadline ?? DateTime.MinValue
        };

        todoList.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();

        PostTodoItemResponse createdResourceResponse = new(
            Id: todoItem.Id,
            Title: todoItem.Title,
            Description: todoItem.Description,
            IsComplete: todoItem.IsComplete,
            Deadline: todoItem.Deadline,
            TodoListId: todoList.Id
        );

        return CreatedAtAction(
            actionName: nameof(TodoItemsController.GetTodoItem),
            controllerName: "TodoItems",
            routeValues: new { id = todoItem.Id },
            value: createdResourceResponse);
    }
}

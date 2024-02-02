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

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TodoListPreviewResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<TodoListPreviewResponse>>> GetTodoListPreviews()
    {
        IEnumerable<TodoListPreviewResponse> response = await _context.TodoLists
            .Select(e => new TodoListPreviewResponse(
                e.Id,
                e.Name))
            .ToArrayAsync();
        return Ok(response);
    }

    [HttpGet("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(TodoListPreviewResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<TodoListPreviewResponse>> GetTodoListPreview([FromRoute] long id)
    {
        TodoList? todoList = await _context.TodoLists.FindAsync(id);

        if (todoList == null)
        {
            return NotFound();
        }

        TodoListPreviewResponse response = new(
            Id: todoList.Id,
            Name: todoList.Name
        );

        return Ok(response);
    }

    [EnableCors]
    [HttpPost]
    [ProducesResponseType(typeof(PostTodoListResponse), StatusCodes.Status201Created)]
    public async Task<ActionResult<PostTodoListResponse>> PostTodoList([FromBody] PostTodoListRequest request)
    {
        TodoList todoList = new()
        {
            Name = request.Name
        };

        _context.TodoLists.Add(todoList);
        await _context.SaveChangesAsync();

        PostTodoListResponse createdResourceResponse = new(
            Id: todoList.Id,
            Name: todoList.Name
        );

        return CreatedAtAction(
            actionName: nameof(GetTodoListPreviews),
            routeValues: new { id = todoList.Id },
            value: createdResourceResponse
        );
    }

    [HttpDelete("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteTodoList([FromRoute] long id)
    {
        TodoList? todoList = await _context.TodoLists.FindAsync(id);

        if (todoList == null)
        {
            return NotFound();
        }

        _context.TodoLists.Remove(todoList);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPatch("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> PatchTodoList([FromRoute] long id, [FromBody] PatchTodoListRequest request)
    {
        TodoList? todoList = await _context.TodoLists.FindAsync(id);

        if (todoList == null)
        {
            return NotFound();
        }

        todoList.Name = request.Name ?? todoList.Name;

        _context.Entry(todoList).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.TodoLists.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

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
    [ProducesResponseType(typeof(PostTodoItemResponse), StatusCodes.Status201Created)]
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

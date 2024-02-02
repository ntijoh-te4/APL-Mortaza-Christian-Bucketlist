using Bucketlist.DTOs;
using Bucketlist.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bucketlist.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TodoItemsController(BucketlistContext context) : ControllerBase
{
    private readonly BucketlistContext _context = context;

    [HttpGet("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(TodoItemResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTodoItem([FromRoute] long id)
    {
        TodoItem? todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        TodoItemResponse response = new(
            Id: todoItem.Id,
            Title: todoItem.Title,
            Description: todoItem.Description,
            CreatedAt: todoItem.CreatedAt,
            UpdatedAt: todoItem.UpdatedAt,
            Deadline: todoItem.Deadline,
            IsComplete: todoItem.IsComplete);

        return Ok(response);
    }

    [HttpPatch("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> PatchTodoItem([FromRoute] long id, [FromBody] PatchTodoItemRequest request)
    {
        TodoItem? todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Title = request.Title ?? todoItem.Title;
        todoItem.Description = request.Description ?? todoItem.Description;
        todoItem.IsComplete = request.IsComplete ?? todoItem.IsComplete;
        todoItem.Deadline = request.Deadline ?? todoItem.Deadline;

        _context.Entry(todoItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
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

    [HttpDelete("{id:long}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteTodoItem([FromRoute] long id)
    {
        TodoItem? todoItem = await _context.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(long id)
    {
        return _context.TodoItems.Any(e => e.Id == id);
    }
}

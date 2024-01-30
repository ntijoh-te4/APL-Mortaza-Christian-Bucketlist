using Microsoft.EntityFrameworkCore;

namespace Bucketlist.Models;

public class BucketlistContext(DbContextOptions<BucketlistContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; } = default!;
    public DbSet<TodoList> TodoLists { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }
}

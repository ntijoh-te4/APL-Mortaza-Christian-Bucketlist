using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Bucketlist.Models;

public class BucketlistContext(DbContextOptions<BucketlistContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; } = default!;
    public DbSet<TodoList> TodoLists { get; set; } = default!;
    public DbSet<User> Users { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSnakeCaseNamingConvention();

    public override int SaveChanges()
    {
        AddTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        AddTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void AddTimestamps()
    {
        IEnumerable<EntityEntry> entityEntries = ChangeTracker
          .Entries()
          .Where(e => e.Entity is BaseEntity && (
            e.State == EntityState.Added
            || e.State == EntityState.Modified));
        foreach (EntityEntry entityEntry in entityEntries)
        {
            DateTime now = DateTime.UtcNow;
            ((BaseEntity)entityEntry.Entity).UpdatedAt = now;
            if (entityEntry.State == EntityState.Added)
            {
                ((BaseEntity)entityEntry.Entity).CreatedAt = now;
            }
        }
    }
}

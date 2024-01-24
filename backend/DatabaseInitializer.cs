using Bucketlist.Models;
using Microsoft.EntityFrameworkCore;

namespace Bucketlist.DatabaseInitializer;

public class DatabaseInitializer
{
    public static void Migrate(IServiceProvider serviceProvider)
    {
        Initialize(GetContext(serviceProvider));
    }

    public static void Seed(IServiceProvider serviceProvider)
    {
        BucketlistContext context = GetContext(serviceProvider);

        Initialize(context);
        SeedData(context);
    }

    private static void Initialize(BucketlistContext context)
    {
        context.Database.EnsureCreated();
        DropAllTables(context);
        context.Database.Migrate();
    }

    private static BucketlistContext GetContext(IServiceProvider serviceProvider)
    {
        IServiceScope scope = serviceProvider.CreateScope();
        IServiceProvider services = scope.ServiceProvider;
        return services.GetRequiredService<BucketlistContext>();
    }

    private static void DropAllTables(BucketlistContext context)
    {
        context.Database.ExecuteSqlRaw("DROP SCHEMA public CASCADE;");
        context.Database.ExecuteSqlRaw("CREATE SCHEMA public;");
    }

    private static void SeedData(BucketlistContext context)
    {
        TodoItem[] todoItems = [
            new TodoItem { Description = "Become the president"},
            new TodoItem { Description = "Read Moby Dick"},
            new TodoItem { Description = "Create more todo items", IsComplete = true }
        ];

        context.TodoItems.AddRange(todoItems);

        context.SaveChanges();
    }
}
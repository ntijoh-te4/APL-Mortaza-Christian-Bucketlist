using Bucketlist.Models;
using Microsoft.EntityFrameworkCore;

namespace Bucketlist.DatabaseInitializer;

public static class DatabaseInitializer
{
    public static void Migrate(IServiceProvider serviceProvider)
    {
        Initialize(GetContext(serviceProvider));
    }

    public static async Task Seed(IServiceProvider serviceProvider)
    {
        BucketlistContext context = GetContext(serviceProvider);
        Initialize(context);
        await SeedData(context);
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

    private static async Task SeedData(BucketlistContext context)
    {
        TodoList[] todoLists = [
            new TodoList { Name = "todolist 1" },
            new TodoList { Name = "todolist 2" }
        ];
        context.TodoLists.AddRange(todoLists);
        TodoItem[] todoItems = [
            new TodoItem { Title = "Become the president", TodoList = todoLists[0], Deadline = DateTime.UtcNow.AddDays(7) },
            new TodoItem { Title = "Zlatan", TodoList = todoLists[0], Deadline = DateTime.UtcNow.AddDays(7) },
            new TodoItem { Title = "Ibrahimovic", TodoList = todoLists[0], Deadline = DateTime.UtcNow.AddDays(7) },
            new TodoItem { Description = "Read Moby Dick", TodoList = todoLists[1] },
            new TodoItem { Description = "Create more todo items", IsComplete = true, TodoList = todoLists[0] }
        ];
        context.TodoItems.AddRange(todoItems);
        User[] users = [
            new User { UserName = "WhoPaintedTheMonaLisa", Password = "DaVinky" },
            new User { UserName = "ZlatanIbrahimovic", Password = "HelenasMat" },
            new User { UserName = "Yalla", Password = "Habibi" },
        ];
        context.Users.AddRange(users);
        await context.SaveChangesAsync();
    }
}

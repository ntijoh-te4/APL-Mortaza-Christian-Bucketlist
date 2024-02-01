using Bucketlist.DatabaseInitializer;
using Bucketlist.Models;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string? conStrNoPassword = builder.Configuration.GetConnectionString("Bucketlist");
if (conStrNoPassword == null)
{
    Console.WriteLine("'ConnectionStrings.Bucketlist' is missing from 'appsettings.json'");
    return 1;
}
string? dbPassword = builder.Configuration["DbPassword"];
if (dbPassword == null)
{
    Console.WriteLine("run 'dotnet user-secrets set \"DbPassword\" \"[ YOUR_DATABASE_PASSWORD ]'\"");
    return 1;
}
string connectionString = $"{conStrNoPassword};password={dbPassword}";

builder.Services.AddCors(options => options.AddPolicy(name: "development",
    policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BucketlistContext>(opt => opt.UseNpgsql(connectionString));

var app = builder.Build();

if (args.Length == 1)
{
    if (args.Contains("migrate"))
    {
        DatabaseInitializer.Migrate(app.Services);
        return 0;
    }
    else if (args.Contains("seed"))
    {
        DatabaseInitializer.Seed(app.Services);
        return 0;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("development");
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

return 0;

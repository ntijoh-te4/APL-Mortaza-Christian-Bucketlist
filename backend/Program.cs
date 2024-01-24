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

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BucketlistContext>(opt =>
{
    opt.UseNpgsql(connectionString);
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

return 0;
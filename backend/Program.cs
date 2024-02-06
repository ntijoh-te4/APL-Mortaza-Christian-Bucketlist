using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Bucketlist.DatabaseInitializer;
using Bucketlist.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };

});
builder.Services.AddAuthorization();

var app = builder.Build();

app.MapGet("/security/getMessage", () => "Hello World!").RequireAuthorization();
app.MapPost("/security/createToken",
[AllowAnonymous] (User user) =>
{
    if (user.UserName == "joydip" && user.Password == "joydip123")
    {
        var issuer = builder.Configuration["Jwt:Issuer"];
        var audience = builder.Configuration["Jwt:Audience"];
        var key = Encoding.ASCII.GetBytes
        (builder.Configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        var stringToken = tokenHandler.WriteToken(token);
        return Results.Ok(stringToken);
    }
    return Results.Unauthorized();
});



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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

return 0;

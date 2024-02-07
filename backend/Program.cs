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

string conStrNoPassword = builder.Configuration.GetConnectionString("Bucketlist") ??
    throw new Exception("'ConnectionStrings.Bucketlist' is missing from 'appsettings.json'");
string dbPassword = builder.Configuration["DbPassword"] ??
    throw new Exception("run 'dotnet user-secrets set \"DbPassword\" \"[ YOUR_DATABASE_PASSWORD ]'\"");
string connectionString = $"{conStrNoPassword};password={dbPassword}";

builder.Services.AddCors(options => options.AddPolicy(name: "development",
    policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BucketlistContext>(opt => opt.UseNpgsql(connectionString));

string jwtIssuer = builder.Configuration["Jwt:Issuer"] ??
    throw new Exception("'Jwt.Issuer' is missing from appsettings.json");
string jwtAudience = builder.Configuration["Jwt:Audience"] ??
    throw new Exception("'Jwt.Audience' is missing from appsettings.json");
string jwtKey = builder.Configuration["Jwt:Key"] ??
    throw new Exception("'Jwt.Key' is missing from appsettings.json");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters
{
    ValidIssuer = jwtIssuer,
    ValidAudience = jwtAudience,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = false,
    ValidateIssuerSigningKey = true
});
builder.Services.AddAuthorization();

var app = builder.Build();

app.MapGet("/security/getMessage", () => "Hello World!").RequireAuthorization();
app.MapPost("/security/createToken",
[AllowAnonymous] (User user) =>
{
    if (user.UserName == "joydip" && user.Password == "joydip123")
    {
        SecurityTokenDescriptor tokenDescriptor = new()
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
            Issuer = jwtIssuer,
            Audience = jwtAudience,
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
            SecurityAlgorithms.HmacSha512Signature)
        };
        JwtSecurityTokenHandler tokenHandler = new();
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
        string jwtToken = tokenHandler.WriteToken(token);
        string stringToken = tokenHandler.WriteToken(token);
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
        await DatabaseInitializer.Seed(app.Services);
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

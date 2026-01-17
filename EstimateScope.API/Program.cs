using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. TAMBAHKAN SERVICES
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Supaya C# bisa baca 'hourlyRate' dari Angular meskipun di C# namanya 'HourlyRate'
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = null; 
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EstimateScope API", Version = "v1" });
});

// 2. KONFIGURASI CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200") // Pastikan port Angular lu beneran 4200
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// 3. MIDDLEWARE PIPELINE
// Swagger muncul di localhost:5062 langsung karena RoutePrefix kosong
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EstimateScope API V1");
    c.RoutePrefix = string.Empty; 
});

// URUTAN PENTING: CORS harus di atas Authorization & MapControllers
app.UseCors("AllowAngular");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
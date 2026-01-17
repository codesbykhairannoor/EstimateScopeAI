var builder = WebApplication.CreateBuilder(args);

// Tambahkan Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Tambahkan CORS agar Angular bisa akses
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// KONFIGURASI SWAGGER
// Kita buat agar Swagger muncul meski bukan di mode Development
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EstimateScope API V1");
    c.RoutePrefix = string.Empty; // Ini trik supaya Swagger muncul langsung di localhost:5062
});

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();
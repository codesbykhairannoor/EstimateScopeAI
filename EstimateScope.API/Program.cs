var builder = WebApplication.CreateBuilder(args);

// 1. SERVICES
builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = null; 
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. KONFIGURASI CORS (PASTIKAN SEPERTI INI)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.AllowAnyOrigin() // Izinkan semua origin sementara
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 3. MIDDLEWARE PIPELINE (URUTAN WAJIB!)
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    c.RoutePrefix = string.Empty;
});

// --- BAGIAN PALING PENTING ---
app.UseRouting(); // Harus ada sebelum UseCors

app.UseCors("AllowAngular"); // Harus ada sebelum UseAuthorization

// MATIKAN INI JIKA LU MAU MAIN DI HTTP (5062) SAJA
// app.UseHttpsRedirection(); 

app.UseAuthorization();

app.MapControllers();

app.Run();
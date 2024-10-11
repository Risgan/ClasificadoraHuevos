using BackendClasificadorHuevos.DataAccess;
using BackendClasificadorHuevos.Repositorios;
using BackendClasificadorHuevos.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DbCHContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DataBaseConnection"));
}, ServiceLifetime.Scoped);

builder.Services.AddScoped<IHuevosRepository, HuevosRepository>();
builder.Services.AddScoped<IHuevosServices, HuevosServices>();
builder.Services.AddScoped<ISerialPortService, SerialPortService>();

//builder.Services.AddScoped<IHuevosRepository, HuevosRepository>();
//builder.Services.AddScoped<IHuevosServices, HuevosServices>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("*") // Usar la URL de appsettings.json
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors("AllowSpecificOrigins");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

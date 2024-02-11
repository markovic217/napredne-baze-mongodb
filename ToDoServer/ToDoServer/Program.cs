using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using ToDoServer.Models;
using ToDoServer.Services;

namespace ToDoServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var con = builder.Configuration["MongoDbSettings:ConnectionString"];
            builder.Services.Configure<TodoDatabaseSettings>(
                builder.Configuration.GetSection("MongoDbSettings")
            );

            builder.Services.AddScoped<IMongoDatabase>(provider =>
            {
                var client = provider.GetRequiredService<IMongoClient>();
                return client.GetDatabase(builder.Configuration["MongoDbSettings:DatabaseName"]);
            });
            builder.Services.AddSingleton<TodoService>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    name: "TodoServer",
                    policy =>
                    {
                        policy.WithOrigins("*");
                        policy.WithHeaders("*");
                        policy.WithMethods("*");
                    }
                );
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("TodoServer");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

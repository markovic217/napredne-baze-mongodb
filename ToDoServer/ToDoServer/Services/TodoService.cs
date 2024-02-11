using Microsoft.Extensions.Options;
using ToDoServer.Models;

namespace ToDoServer.Services
{
    public class TodoService
    {
        private readonly IMongoCollection<TodoItem> _todoCollection;

        public TodoService(IOptions<TodoDatabaseSettings> todoDatabaseSettings)
        {
            var mongoClient = new MongoClient(todoDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(todoDatabaseSettings.Value.DatabaseName);

            _todoCollection = mongoDatabase.GetCollection<TodoItem>(
                todoDatabaseSettings.Value.TodosCollectionName
            );
        }

        public async Task<List<TodoItem>> GetAsync() =>
            await _todoCollection.Find(_ => true).ToListAsync();

        public async Task<TodoItem?> GetAsync(string id) =>
            await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TodoItem newTodo) =>
            await _todoCollection.InsertOneAsync(newTodo);

        public async Task UpdateAsync(string id, TodoItem updatedTodo) =>
            await _todoCollection.ReplaceOneAsync(x => x.Id == id, updatedTodo);

        public async Task RemoveAsync(string id) =>
            await _todoCollection.DeleteOneAsync(x => x.Id == id);

        public async Task RemoveAllAsync() => await _todoCollection.DeleteManyAsync(x => true);
    }
}

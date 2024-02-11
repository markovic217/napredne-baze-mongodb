using MongoDB.Bson.Serialization.Attributes;

namespace ToDoServer.Models
{
    [BsonIgnoreExtraElements]
    public class TodoItem
    {
        [BsonId]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Priority { get; set; }
        public bool IsCompleted { get; set; }
    }
}

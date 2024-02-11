using Microsoft.AspNetCore.Mvc;
using ToDoServer.Models;
using ToDoServer.Services;

namespace ToDoServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;

        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<TodoItem>> GetAll()
        {
            var list = await _todoService.GetAsync();
            return list;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<TodoItem>> Get(string id)
        {
            var item = await _todoService.GetAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Create(TodoItem newTodo)
        {
            await _todoService.CreateAsync(newTodo);

            return Ok("Created"); //CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> Update(string id, TodoItem updatedTodo)
        {
            var todo = await _todoService.GetAsync(id);

            if (todo is null)
            {
                return NotFound();
            }

            updatedTodo.Id = todo.Id;

            await _todoService.UpdateAsync(id, updatedTodo);

            return NoContent();
        }

        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateCompleted(string id)
        {
            var todo = await _todoService.GetAsync(id);

            if (todo is null)
            {
                return NotFound();
            }

            todo.IsCompleted = !todo.IsCompleted;

            await _todoService.UpdateAsync(id, todo);

            return NoContent();
        }

        [HttpDelete]
        [Route("[action]")]
        public async Task<IActionResult> Delete(string id)
        {
            var todo = await _todoService.GetAsync(id);

            if (todo is null)
            {
                return NotFound();
            }

            await _todoService.RemoveAsync(id);

            return NoContent();
        }

        [HttpDelete]
        [Route("[action]")]
        public async Task<IActionResult> DeleteAll()
        {
            await _todoService.RemoveAllAsync();

            return NoContent();
        }
    }
}

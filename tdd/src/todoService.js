class TodoService {
  constructor({ todoRepository }) {
    this.todoRepository = todoRepository;
  }

  list(query) {
    return this.todoRepository.list()
      .map(({ meta, $loki, ...result }) => result);
  }

  create(todoItem) {
    if (!todoItem.isValid()) {
      return {
        error: {
          message: 'invalid data',
          data: todoItem,
        }
      }
    }
  }
}

module.exports = TodoService;
const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const Todo = require('../src/todo');

describe('todo', () => {
  describe('#isValid', () => {
    it('should return "false" when creating an object without title/text', () => {
      const data = {
        text: '',
        when: new Date()
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it('should return "false" when creating an object using "when" property invalid', () => {
      const data = {
        text: 'Wash dishes',
        when: new Date("foo")
      };

      const todo = new Todo(data);
      const result = todo.isValid();
      expect(result).to.be.not.ok;
    });

    it('should have "id", "text", "when" and "status" properties after created the object', () => {
      const data = {
        text: 'Wash dishes',
        when: new Date()
      };

      const todo = new Todo(data);
      const result = todo.isValid();

      const expectedTodo = {
        text: data.text,
        when: data.when,
        status: '',
        id: todo.id
      };
      expect(result).to.be.ok;
      expect(todo).to.be.deep.equal(expectedTodo);
    });
  });
});
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const TodoService = require('../src/todoService');
const Todo = require('../src/todo');

describe('todoService', () => {
  let sandbox;

  before(() => {
    sandbox = createSandbox();
  });

  describe('#list', () => {
    const mockDatabase = [
      {
        name: 'Samuel da Silva',
        age: 21,
        meta: { revision: 0, created: 1675107560896, version: 0 },
        '$loki': 1
      },
    ]

    let todoService;
    beforeEach(() => {
      const dependencies = {
        todoRepository: {
          list: sandbox.stub().returns(mockDatabase),
        }
      };

      todoService = new TodoService(dependencies);
    });

    it('should return data in a specific format', () => {
      const result = todoService.list();
      const [{ meta, $loki, ...expected }] = mockDatabase;
      expect(result).to.be.deep.equal([expected]);
    });
  });

  describe('#create', () => {
    let todoService;
    beforeEach(() => {
      const dependencies = {
        todoRepository: {
          create: sandbox.stub().returns(true),
        }
      };

      todoService = new TodoService(dependencies);
    });

    it('should not save todo item with invalid data', () => {
      const data = new Todo({
        text: '',
        when: '',
      });

      Reflect.deleteProperty(data, 'id');
      const expected = {
        error: {
          message: 'invalid data',
          data
        },
      };

      const result = todoService.create(data);
      expect(result).to.be.deep.equal(expected);
    });

    it('should save todo item with late status when "date" property is before than today', () => {

    });

    it('should save todo item with pending status when "date" property is further than today', () => { });
  });
});
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const TodoService = require('../src/todoService');

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
  });
});
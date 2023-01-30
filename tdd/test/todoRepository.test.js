const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const TodoRepository = require('../src/todoRepository');

describe('todoRepository', () => {
  describe('methods signature', () => {
    let todoRepository;
    let sandbox;

    before(() => {
      todoRepository = new TodoRepository();
      sandbox = createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call "insertOne" from lokijs', () => {
      const functionName = 'insertOne';
      const expectedReturn = true;

      // Changing function behavior
      sandbox.stub(todoRepository.schedule, functionName).returns(expectedReturn);

      const data = { name: 'Erick' };

      const result = todoRepository.create(data);
      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    });

    it('should call "find" from lokijs', () => {
      // Assuming that "mockDatabse" is the content from database
      const mockDatabase = [
        {
          name: 'Samuel da Silva',
          age: 21,
          meta: { revision: 0, created: 1675107560896, version: 0 },
          '$loki': 1
        },
      ]

      const functionName = 'find';
      const expectedReturn = mockDatabase;

      // Changing function behavior
      sandbox.stub(todoRepository.schedule, functionName).returns(expectedReturn);

      const result = todoRepository.list();
      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok
    });
  });
});

const { error } = require('./constants');
const { rejects, deepStrictEqual } = require('assert');
const { join } = require('path');
const File = require('./file');

(async () => {
  {
    const filePath = '../mocks/empty-file.invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(join(__dirname, filePath));
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/four-items.invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(join(__dirname, filePath));
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/three-items.valid.csv';
    const result = await File.csvToJson(join(__dirname, filePath));
    const expected = [
      {
        "id": 123,
        "name": "Samuel",
        "profession": "Masterchef",
        "birthDay": 2002
      },
      {
        "id": 321,
        "name": "Maloy",
        "profession": "Developer",
        "birthDay": 2001
      },
      {
        "id": 231,
        "name": "Jailson",
        "profession": "Mendes",
        "birthDay": 2011
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
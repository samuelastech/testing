const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/invalid-emptyFile.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/invalid-fourItems.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/valid-threeItems.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "id": 0,
        "name": "Samuel",
        "birthDay": 1998
      },
      {
        "id": 1,
        "name": "Natan",
        "birthDay": 2002
      },
      {
        "id": 2,
        "name": "Mayara",
        "birthDay": 2001
      }
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})()


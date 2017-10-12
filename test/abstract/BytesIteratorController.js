const { myToAscii, bN } = require('../testHelpers');

const ExampleController = artifacts.require('./ExampleController.sol');
const ExampleStorage = artifacts.require('./ExampleStorage.sol');

contract('BytesIteratorController', function () {
  let exampleController;
  let exampleStorage;

  beforeEach(async function () {
    exampleStorage = await ExampleStorage.new();
    exampleController = await ExampleController.new(exampleStorage.address);
  });

  describe('get_first_from_bytesarray', function () {
    it('[collection is not empty] returns correct first item', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_first_in_bytes_collection.call()), 'test1');
    });
    it('[collection is empty] returns empty bytes_collection ""', async function () {
      await exampleStorage.remove_all_data_in_bytes_collection();
      assert.deepEqual(myToAscii(await exampleController.get_first_in_bytes_collection.call()), '');
    });
  });

  describe('get_last_from_bytesarray', function () {
    it('[collection is not empty] returns correct last item', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_last_in_bytes_collection.call()), 'test6');
    });
    it('[collection is empty] returns empty bytes_collection ""', async function () {
      await exampleStorage.remove_all_data_in_bytes_collection();
      assert.deepEqual(myToAscii(await exampleController.get_first_in_bytes_collection.call()), '');
    });
  });

  describe('get_next_from_bytesarray', function () {
    it('[item is not last] returns correct next item', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_next_in_bytes_collection.call('test4')), 'test5');
    });
    it('[item is last] returns empty bytes32 ""', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_next_in_bytes_collection.call('test6')), '');
    });
    it('[item does not exist] returns empty bytes32 ""', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_next_in_bytes_collection.call('test_new')), '');
    });
    it('[collection is empty] returns empty bytes32 ""', async function () {
      await exampleStorage.remove_all_data_in_bytes_collection();
      assert.deepEqual(myToAscii(await exampleController.get_next_in_bytes_collection.call('test_new')), '');
    });
  });

  describe('get_previous_from_bytesarray', function () {
    it('[item is not first] returns correct previous item', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_previous_in_bytes_collection.call('test4')), 'test3');
    });
    it('[item is last] returns empty bytes32 ""', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_previous_in_bytes_collection.call('test1')), '');
    });
    it('[item does not exist] returns empty bytes32 ""', async function () {
      assert.deepEqual(myToAscii(await exampleController.get_previous_in_bytes_collection.call('test_new')), '');
    });
    it('[collection is empty] returns empty bytes32 ""', async function () {
      await exampleStorage.remove_all_data_in_bytes_collection();
      assert.deepEqual(myToAscii(await exampleController.get_previous_in_bytes_collection.call('test_new')), '');
    });
  });

  describe('get_total_bytesarray', function () {
    it('[collection is not empty] returns correct number of items', async function () {
      assert.deepEqual(await exampleController.get_total_in_bytes_collection.call(), bN(6));
    });
    it('[collection is empty] returns 0', async function () {
      await exampleStorage.remove_all_data_in_bytes_collection();
      assert.deepEqual(await exampleController.get_total_in_bytes_collection.call(), bN(0));
    });
  });
});

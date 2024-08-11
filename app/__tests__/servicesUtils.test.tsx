import { removeEmptyParams } from '../services/utils';

describe('removeEmptyParams', () => {
  test('should remove keys with empty values', () => {
    const input = {
      key1: 'value1',
      key2: '',
      key3: null,
      key4: undefined,
      key5: 0,
      key6: false,
      key7: 'value2',
    };
    const expectedOutput = {
      key1: 'value1',
      key7: 'value2',
    };

    expect(removeEmptyParams(input)).toEqual(expectedOutput);
  });

  test('should return the same object if no keys have empty values', () => {
    const input = {
      key1: 'value1',
      key2: 'value2',
    };
    const expectedOutput = {
      key1: 'value1',
      key2: 'value2',
    };

    expect(removeEmptyParams(input)).toEqual(expectedOutput);
  });

  test('should return an empty object if all keys have empty values', () => {
    const input = {
      key1: '',
      key2: null,
      key3: undefined,
      key4: 0,
      key5: false,
    };
    const expectedOutput = {};

    expect(removeEmptyParams(input)).toEqual(expectedOutput);
  });

  test('should return an empty object if the input object is empty', () => {
    const input = {};
    const expectedOutput = {};

    expect(removeEmptyParams(input)).toEqual(expectedOutput);
  });
});

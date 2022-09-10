import {sum, sumAsync, throwError, throwErrorAsync} from '../src/sample';

describe('同期関数のテスト', () => {
  it('戻り値のチェック', () => {
    expect(sum(1, 2)).toEqual(3);
  })

  it('文字列のチェック', () => {
    expect('hello world').toEqual('hello world');
    expect('hello world').toContain('hello');
    expect('hello world').toMatch(/hello/);
  })

  it('配列のチェック', () => {
    expect([1, 2, 3]).toHaveLength(3);
    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect([1, 2, 3]).toContain(1);
  })

  it('オブジェクトのチェック', () => {
    expect({foo: 'foo', bar: 'bar'}).toEqual({foo: 'foo', bar: 'bar'});
    expect({foo: 'foo', bar: 'bar'}).toMatchObject({foo: 'foo'});
    expect({foo: 'foo', bar: 'bar'}).toMatchObject({foo: expect.any(String)});
  })

  it('例外のテスト', () => {
    // toThrowError is an alias for toThrow
    // You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
    expect(() => throwError()).toThrowError();  // throw されたか否かをチェックする
    expect(() => throwError()).toThrowError(/err/); // throw されたメッセージの部分一致をチェックする
    expect(() => throwError()).toThrowError('error'); // throw された事とそのメッセージの完全一致をチェックする
    expect(() => throwError()).toThrowError(Error); // throw された型をチェックする
    expect(() => throwError()).toThrowError(new Error('error')); // スローされた型とメッセージをチェックする
  })

})

describe('非同期関数のテスト', () => {
  it('戻り値のチェック', async() => {
    await expect(sumAsync(1, 2)).resolves.toEqual(3);
  })

  it('例外のテスト', async () => {
    // 同期関数との違いは await と rejects と無名関数を挟まないこと
    await expect(throwErrorAsync()).rejects.toThrowError(new Error('error'));
  })
})

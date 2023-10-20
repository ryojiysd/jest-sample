import { sum, toLower, SampleClass } from '../src/sample';
import * as sample from '../src/sample'; // ファイル直下でexportされている関数に spyOn を行うために必要
import os from 'os';

describe('ファイル直下で export されている関数に spyOn', () => {
  let toLowerMock: jest.Mock;

  beforeEach(() => {
    jest.spyOn(sample, 'sum');
    // jest.spyOn() はモックを返すので as jest.Mock を使うか let を使うかのトレードオフ
    toLowerMock = jest.spyOn(sample, 'toLower') as jest.Mock;
  })

  afterEach(() => {
    // テストが終わったら元の実装に戻す
    (sample.sum as jest.Mock).mockRestore();
    toLowerMock.mockRestore();
  })

  it('sum がモック化されていること', () => {
    (sample.sum as jest.Mock).mockImplementation(() => 0);
    const ret = sum(1, 2);
    expect(ret).toBe(0);
    expect(sample.sum).toHaveBeenCalledWith(1, 2);
  })

  it('toBeCalledWithのチェックに複数の条件を並べたい場合', () => {
    toLowerMock.mockReturnValue('');
    toLower('HELLO');
    expect(toLowerMock).toBeCalledWith(expect.stringContaining('HELLO') && expect.stringMatching('HELLO'));
  })
})

describe('クラスの static メソッドをモック化する', () => {
  beforeEach(() => {
    jest.spyOn(SampleClass, 'staticSum')
  })

  afterEach(() => {
    (SampleClass.staticSum as jest.Mock).mockRestore();
  })

  it('SampleClass.statisSum がモック化されていること', () => {
    (SampleClass.staticSum as jest.Mock).mockImplementation(() => 0);
    const ret = SampleClass.staticSum(1, 2);
    expect(ret).toBe(0);
    expect(SampleClass.staticSum).toHaveBeenLastCalledWith(1, 2);
  })
})

describe('クラスのメソッドをモック化する', () => {
  const sample = new SampleClass();

  beforeEach(() => {
    jest.spyOn(sample, 'sum');
  })

  afterEach(() => {
    (sample.sum as jest.Mock).mockRestore();
  })

  it('SampleClass#sum がモック化されていること', () => {
    (sample.sum as jest.Mock).mockImplementation(() => 0);
    const ret = sample.sum(1, 2);
    expect(ret).toBe(0);
    expect(sample.sum).toHaveBeenLastCalledWith(1, 2);
  })
})

describe('クラスのメソッドをインスタンスを指定せずにモック化する', () => {
  beforeEach(() => {
    jest.spyOn(SampleClass.prototype, 'sum');
  })

  afterEach(() => {
    (SampleClass.prototype.sum as jest.Mock).mockRestore();
  })

  it('SampleClass#sum がモック化されていること', () => {
    (SampleClass.prototype.sum as jest.Mock).mockImplementation(() => 0);
    const sample = new SampleClass();
    const ret = sample.sum(1, 2);
    expect(ret).toBe(0);
    expect(SampleClass.prototype.sum).toHaveBeenLastCalledWith(1, 2);
  })
})

describe('コンストラクタをモック化する', () => {
  beforeEach(() => {
    jest.spyOn(sample, 'SampleClass');
  })

  afterEach(() => {
    (SampleClass as unknown as jest.Mock).mockRestore();
  })

  it('SampleClass のコンストラクタがモック化されていること', () => {
    const mockSum = jest.fn((a: number, b: number): number => { return 0; });
    (SampleClass as unknown as jest.Mock).mockImplementation(() => {
      return {
        sum: mockSum
      }
    });
    const sample = new SampleClass();
    const ret = sample.sum(1, 2);
    expect(ret).toBe(0);
    // コンストラクタの呼び出し回数を検証
    expect(SampleClass).toBeCalledTimes(1);
    expect(mockSum).toHaveBeenLastCalledWith(1, 2);
  })
})

describe('os.hostname をモック化する', () => {
  beforeEach(() => {
    jest.spyOn(os, 'hostname');
  })

  afterEach(() => {
    (os.hostname as jest.Mock).mockRestore();
  })

  it('os.hostname がモック化されていること', () => {
    (os.hostname as jest.Mock).mockImplementation(() => 'foo');
    const ret = os.hostname();
    expect(ret).toBe('foo');
    expect(os.hostname).toBeCalledTimes(1);
  })
})

describe('Date をモック化する', () => {
  const mockDate = new Date('2022/01/01 12:00:00');

  beforeEach(() => {
    jest.spyOn<any, any>(global, 'Date').mockImplementation((...arg: any[]): Date => {
      return mockDate;
    })
  })

  afterEach(() => {
    (global.Date as unknown as jest.Mock).mockRestore();
  })

  it('Date がモック化されていること', () => {
    const ret = new Date();
    expect(ret).toBe(mockDate);
  })
})

describe('getter/setter をモック化する', () => {
  it('getter をモック化する', () => {
    const spy = jest.spyOn(SampleClass.prototype, 'prop', 'get');
    spy.mockImplementation(() => 256);
    const sample = new SampleClass();
    const ret = sample.prop;
    expect(ret).toBe(256);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  })

  it('setter をモック化する', () => {
    const spy = jest.spyOn(SampleClass.prototype, 'prop', 'set');
    spy.mockImplementation(() => 256);
    const sample = new SampleClass();
    sample.prop = 256;
    expect(sample.prop).toBe(0);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(256);
    spy.mockRestore();
  })
})
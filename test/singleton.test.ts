describe('ダイナミックimportを使用するテストのサンプル', () => {
  beforeEach(() => {
    // キャッシュされたモジュールのデータをクリアする
    jest.resetModules();
  })

  afterEach(() => {
    // テスト内で変更した環境変数を削除する
    delete process.env.FOO;
  })

  it('環境変数のFOOがonの場合、fooはtrueであること', async () => {
    process.env.FOO = 'on'
    const singleton = (await import('../src/singleton')).default;
    expect(singleton.foo).toBeTruthy();
  })

  it('環境変数のFOO未定義場合、fooはfalseであること', async () => {
    console.log(process.env.FOO);
    const singleton = (await import('../src/singleton')).default;
    expect(singleton.foo).toBeFalsy();
  })
})
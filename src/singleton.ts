class Singleton {
  private _foo: boolean;

  constructor() {
    if (process.env.FOO === 'on') {
      this._foo = true;
    } else {
      this._foo = false;
    }
  }

  get foo(): boolean {
    return this._foo;
  }
}

export default new Singleton();

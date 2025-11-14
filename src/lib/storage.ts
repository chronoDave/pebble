import type * as r from 'runtypes';

export default class Storage<T extends r.Runtype> {
  private readonly _id: string;
  private readonly _schema: T;

  constructor(id: string, schema: T) {
    this._id = id;
    this._schema = schema;
  }

  read(): r.Static<T> | null {
    const raw = localStorage.getItem(this._id);
    if (!raw) return null;

    return this._schema.check(JSON.parse(raw));
  }

  write(payload: r.Static<T>): void {
    localStorage.setItem(this._id, JSON.stringify(payload));
  }
}

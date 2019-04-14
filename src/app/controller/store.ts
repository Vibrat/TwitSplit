import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs";
import { pluck, distinctUntilChanged } from "rxjs/operators";

export interface State {
  [name: string]: any;
}

export const state: State = {};

/**
 * Singleton Store
 * Handle State Management
 */
export class Store {
  private subject = new BehaviorSubject<State>(state);
  protected store = this.subject.asObservable().pipe(distinctUntilChanged());

  /**
   * Return value of Subject
   */
  get value(): any {
    return this.subject.value;
  }

  /**
   * Pick a selector by name
   *
   * @example select('pizza')
   * @returns Observable<any>
   */
  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  /**
   * Set new value for Store
   *
   * @param {string} name identity for object
   * @param {any} data
   */
  set(name: string, data: any | any[]) {
    return this.subject.next({
      ...this.value,
      [name]: data
    });
  }

  /**
   * Update an existing object value
   *
   * @param {string} name identifier
   * @param {any} data
   */
  update(name: string, data: any | any[]) {
    return this.subject.next({
      ...this.value,
      [name]: {
        ...this.value[name],
        ...data
      }
    });
  }
}

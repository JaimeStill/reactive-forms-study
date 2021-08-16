import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private keyRoot = 'app';

  private name = (module: string, key: string) => `${this.keyRoot}-${module}-${key}`;

  private addLocalItem = (module: string, key: string, value: any) => localStorage.setItem(this.name(module, key), JSON.stringify(value));

  private getLocalItem = <T>(module: string, key: string): T | null => JSON.parse(localStorage.getItem(this.name(module, key))) as T;

  private removeLocalItem = (module: string, key: string) => localStorage.removeItem(this.name(module, key));

  private addSessionItem = (module: string, key: string, value: any) => sessionStorage.setItem(this.name(module, key), JSON.stringify(value));

  private getSessionItem = <T>(module: string, key: string): T | null => JSON.parse(sessionStorage.getItem(this.name(module, key))) as T;

  private removeSessionItem = (module: string, key: string) => sessionStorage.removeItem(this.name(module, key));

  addItem = (module: string, key: string, value: any, useSession = true) =>
    useSession
      ? this.addSessionItem(module, key, value)
      : this.addLocalItem(module, key, value);

  getItem = <T>(module: string, key: string, useSession = true): T | null =>
    useSession
      ? this.getSessionItem<T>(module, key)
      : this.getLocalItem<T>(module, key);

  removeItem = (module: string, key: string, useSession = true) =>
    useSession
      ? this.removeSessionItem(module, key)
      : this.removeLocalItem(module, key);
}

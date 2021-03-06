import { HttpHeaders } from '@angular/common/http';

import {
  Injectable,
  ElementRef
} from '@angular/core';

import {
  fromEvent,
  Observable
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  ssnPattern = /^(?!(000|666|9))\d{3}-(?!(00))\d{2}-(?!(0000))\d{4}$/i;

  getUploadOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.delete('Content-Type');
    return headers;
  }

  getTextOptions = (): HttpHeaders => {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'text/plain');
    headers.delete('Pragma');
    return headers;
  }

  urlEncode = (value: string): string => {
    const regex = /[^a-zA-Z0-9-.]/gi;
    let newValue = value.replace(/\s/g, '-').toLowerCase();
    newValue = newValue.replace(regex, '');
    return newValue;
  }

  generateInputObservable = (input: ElementRef): Observable<string> =>
    fromEvent(input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )
}

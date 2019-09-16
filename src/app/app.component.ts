import { Component } from '@angular/core';
import { Observable, merge, throwError, timer, interval, from, of, forkJoin,concat } from 'rxjs';
import { switchMap, tap, takeUntil, delay, mergeMap, concatMap, map, concatAll, combineAll, toArray,scan } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  contacts;
  rootSource$ = of([{ x: 100, y: 4 }, { x: 20, y: 4 }, { x: 100, y: 1 }]);
  ros$;
  p =  (x) => {
    const oneSecondSource = of(x['x']).pipe(delay(100 * x.x))
    const twoSecondSource = of(x.y).pipe(delay(200 * x.y))
    return forkJoin(oneSecondSource, twoSecondSource).pipe(
                                                    map(abs => {
                                                              const res =abs[0] / abs[1];
                                                              return { ...x, z: res}
                                                        }));
  }
  constructor() {
    const example1 = this.rootSource$.pipe(concatMap(q => concat(...q.map(this.p))),
                                  scan((rqr,crr) => [...rqr,  ...crr],[] ));
    example1.subscribe(console.log);
    this.contacts = example1   


  }
}

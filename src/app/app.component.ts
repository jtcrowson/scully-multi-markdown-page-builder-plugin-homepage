import { Component } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes$: Observable<{ title: string; url: string }[]> = this.scullyRoutesService.available$.pipe(
    map(routes => 
      routes.map(route => {
        const relativeRoute = route.route.charAt(0) === '/' ? route.route.substring(1) : route.route;
        const relativeScullyRoute = {
          title: route.title,
          url: relativeRoute
        };
        return relativeScullyRoute;
      })
    )
  );

  constructor(private scullyRoutesService: ScullyRoutesService) {
    console.error('TEST');
    this.routes$.subscribe(src => console.error(src));
  }
}

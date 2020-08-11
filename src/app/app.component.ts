import { Component } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes$ = this.scullyRoutesService.available$;

  constructor(private scullyRoutesService: ScullyRoutesService) {}
}

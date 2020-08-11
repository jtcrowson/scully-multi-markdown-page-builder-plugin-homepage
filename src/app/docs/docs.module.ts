import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ScullyHomepageContentComponent } from '../scully-homepage-content.component';


@NgModule({
  declarations: [DocsComponent, ScullyHomepageContentComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    ScullyLibModule
  ]
})
export class DocsModule { }

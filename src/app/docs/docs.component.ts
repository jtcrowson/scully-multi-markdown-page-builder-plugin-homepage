import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  template: `<scully-content></scully-content>`
})
export class DocsComponent implements OnInit {
  ngOnInit() {
    console.log('here');
  }
}

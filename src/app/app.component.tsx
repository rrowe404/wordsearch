import { Component, OnInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonComponent } from 'src/UI/Button/ReactButtonComponent';

@Component({
  selector: 'wordsearch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'wordsearch';

  ngOnInit() {
    let container = document.querySelector('#react_container');
    let element = <ButtonComponent color='primary' text='Hello World' />;
    ReactDOM.render(element, container);
  }
}

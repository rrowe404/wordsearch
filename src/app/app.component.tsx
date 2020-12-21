import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppComponent as RootComponent } from '../UI/App/AppComponent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wordsearch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'wordsearch';

  ngOnInit() {
    ReactDOM.render(<RootComponent />, document.getElementById('react_container'));
  }
}

import { Component, OnInit } from '@angular/core';

import * as M from 'materialize-css';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

}

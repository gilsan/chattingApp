import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  token: string;
  streamsTab = false;
  topStreamsTab = false;
  constructor(
    private tokenService: TokenService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.streamsTab = true;
    this.token = this.tokenService.GetToken();

    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  logout() {
     this.tokenService.DeleteToken();
     this.router.navigate(['']);
  }

  ChangeTabs(value) {

   if (value === 'streams') {
    this.streamsTab = true;
    this.topStreamsTab = false;
   } else if (value === 'top') {
    this.streamsTab = false;
    this.topStreamsTab = true;
   }
  }

}

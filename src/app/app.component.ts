import { Component, OnInit } from '@angular/core';
import { routesSlideinAnimation, sideNavAnimation } from './modules/app-animations.module';
import { LoadingEventService } from './services/loading-event.service';
import { LoggedEventService } from './services/logged-event.service';
import { MyAuthenticationService } from './services/my-authentication.service';

@Component({
  selector: 'app-root',
  animations: [
    routesSlideinAnimation,
    sideNavAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mguelpa-lab-iv-parcial-i';

  public enableSideNav = false;

  public loading = false;

  public logged = false;

  public isOpen = false;

  constructor(
    private _loading: LoadingEventService,
    private _login: LoggedEventService,
    private auth: MyAuthenticationService
  ) {
    _loading.changeEmitted$.subscribe(
      value => {
        this.loading = value;
      });

    _login.changeEmitted$.subscribe(
      value => {
        this.logged = value;
      });
  }

  ngOnInit() {

    this.logged = this.auth.isLogged();
    
  }

  onEnableSideNav(e: boolean) {
    this.enableSideNav = e;
    this.isOpen = e;
  }
}

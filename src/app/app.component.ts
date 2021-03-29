import { Component } from '@angular/core';
import { routesSlideinAnimation, sideNavAnimation } from './modules/app-animations.module';
import { LoadingEventService } from './services/loading-event.service';

@Component({
  selector: 'app-root',
  animations: [ 
    routesSlideinAnimation,
    sideNavAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mguelpa-lab-iv-parcial-i';

  public enableSideNav = false;

  public loading = false;

  public logged = false;
  
  public isOpen = false;

  constructor(
    private _loading: LoadingEventService
  ) {
    _loading.changeEmitted$.subscribe(
      value => {
        this.loading = value;
      });
  }

  onEnableSideNav(e: boolean) {
    this.enableSideNav = e;
    this.isOpen = e;
  }
}

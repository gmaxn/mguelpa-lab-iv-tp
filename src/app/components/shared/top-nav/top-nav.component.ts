import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedEventService } from 'src/app/services/logged-event.service';
import { MyAuthenticationService } from 'src/app/services/my-authentication.service';
import { UserChangedEventService } from 'src/app/services/user/user-changed-event.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() enableSideNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  logged = this.auth.isLogged();

  username: any = this.auth.getCurrentUser();

  @Input() isOpen = false;

  constructor(
    private router: Router,
    private auth: MyAuthenticationService,
    private _loggedEvent: LoggedEventService,
    private _userChangedEvent: UserChangedEventService
  ) { }

  ngOnInit(): void {

    this._loggedEvent.changeEmitted$.subscribe(
      value => {
        this.logged = value;
      });

    this._userChangedEvent.changeEmitted$.subscribe(
      value => {
        this.username = value;
      });
  }

  onShowSideNav() {
    this.enableSideNav.emit(!this.isOpen);
    this.isOpen = !this.isOpen;
  }

  onSign() {
    this.enableSideNav.emit(false);
    if (!this.auth.isLogged()) {
      this.router.navigate(['/signin']);

    }
    if (this.auth.isLogged()) {
      this.auth.signOut();
      this.isOpen = false;
    }
  }
}
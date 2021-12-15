import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitEnums } from 'src/enums';
import { environment } from 'src/environments/environment';
import localStorageService from 'src/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() deviceXs!: boolean;

  public isLoggedIn!:boolean;

  constructor(private router:Router) { 
    this.isLoggedIn = !!localStorageService.getItem(UnitEnums.ALL_UNITS);
  }

  ngOnInit(): void {
  }

  /**
   * This method logs a user out (clears local storage)
   */
  public logOut = ():void =>{
    localStorage.clear();
    // this.router.navigateByUrl('/');
    window.location.href = environment.clientUrl

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title:string = 'bcommerce';
  public mediaSub!: Subscription;
  public deviceXs!: boolean;
  public topVal:number = 0;

  constructor(public mediaObserver: MediaObserver) {

  }
  ngOnInit = () => {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })
  }

  ngOnDestroy = () => {
    this.mediaSub.unsubscribe();
  }

 
  public onScroll = (e:any) => {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  public sideBarScroll = () => {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

}
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy,OnInit {

  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerNav = [
    {name:"Login",route:"login",icon:"lock"},
    {name:"Home",route:"home",icon:"home"},
    {name:"Configuration",route:"configuration",icon:"settings_applications"}
    
  ]


  private _mobileQueryListener: () => void;

  constructor(
    private authService:AuthService, 
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher) 
    {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  

  isAuthenticated = false;


  ngOnInit(){
    this.authService.authEmiter.subscribe((x)=>{
      if(x){
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
      }
    })
  }
  shouldRun = true;
}

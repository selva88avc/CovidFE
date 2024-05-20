import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { CovidService } from '../service/covid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  private covidService = inject(CovidService);
  private router = inject(Router);
  user: String|null = "";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    if(this.covidService.currentUserValue != null){
      this.user = this.covidService.currentUserValue;
    } else {

    }
    
  }
  logout():void {
    this.covidService.logout();
    this.router.navigateByUrl("login");
  }
}

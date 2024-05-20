import { Component, OnInit } from '@angular/core';
import { CovidService } from '../service/covid.service';
import { Covid } from '../model/covid';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit{
  covidBookmarks:Covid[];
  constructor(private covidService:CovidService){

  }
  ngOnInit(): void {
    this.covidService.getBookmarks().subscribe(data => {
      this.covidBookmarks = data;
    });
  }

  removeBookmark(id:number){
    this.covidService.removeBookmark(id).subscribe();
    this.covidBookmarks.splice( this.covidBookmarks.findIndex( itm=>itm.id==id),1);
  }

}

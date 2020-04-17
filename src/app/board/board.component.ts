import {Component, OnInit} from '@angular/core';
import {CatGeneral} from '../model/CatGeneral';
import {HttpService} from '../_services/http.service';
import {CatMore} from '../model/CatMore';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [HttpService]
})
export class BoardComponent implements OnInit {

  basepath = 'https://mrsoft.by/tz20';

  catsGeneral: CatGeneral[] = [];
  CatGeneralSelected: CatGeneral;
  catMoreSelected: CatMore;
  picSelected: string;
  searchText;
  catsGeneralDeleted: CatGeneral[] = [];

  constructor(private dataService: HttpService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('catsGeneral')) {
      this.catsGeneral = JSON.parse(sessionStorage.getItem('catsGeneral'));
    } else {
      this.dataService.getData().subscribe(data => this.catsGeneral = data['data']);
    }
    if (sessionStorage.getItem('catsGeneralDeleted')) {
      this.catsGeneralDeleted = JSON.parse(sessionStorage.getItem('catsGeneralDeleted'));
    }
  }

  public selectPerson(catGeneralSelected: CatGeneral) {
    this.dataService.getMore(catGeneralSelected.more).subscribe((data: CatMore) => {
      this.catMoreSelected = data;
      this.picSelected = this.basepath + this.catMoreSelected.pic;
    });
    this.CatGeneralSelected = catGeneralSelected;
    for (let one of this.catsGeneral) {
      one.selected = false;
    }
    catGeneralSelected.selected = !catGeneralSelected.selected;
  }

  public deletePerson(personForDelete: CatGeneral) {
    if (!this.catsGeneralDeleted.includes(personForDelete)) {
      personForDelete.dateOfDeleted = new Date();
      this.catsGeneralDeleted.push(personForDelete);
      this.catsGeneral = this.catsGeneral.filter(item => item !== personForDelete);
      sessionStorage.removeItem('catsGeneralDeleted');
      sessionStorage.setItem('catsGeneralDeleted', JSON.stringify(this.catsGeneralDeleted));
      sessionStorage.removeItem('catsGeneral');
      sessionStorage.setItem('catsGeneral', JSON.stringify(this.catsGeneral));
    }
  }

  public returnPerson(personForReturn: CatGeneral) {
    this.catsGeneral.push(personForReturn);
    this.catsGeneralDeleted = this.catsGeneralDeleted.filter(item => item !== personForReturn);
    sessionStorage.removeItem('catsGeneralDeleted');
    sessionStorage.setItem('catsGeneralDeleted', JSON.stringify(this.catsGeneralDeleted));
    sessionStorage.removeItem('catsGeneral');
    sessionStorage.setItem('catsGeneral', JSON.stringify(this.catsGeneral));
  }
}

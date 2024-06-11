import { iPg } from './../../models/i-pg';
import { iClasse } from './../../models/i-classe';
import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iMossa } from '../../models/i-mossa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuilderService } from '../../services/builder.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent {
  classi: iClasse[] = [];
  pgCurrent: iPg = {
    id: 0,
    name: '',
    img: '',
    classeId: 0,
    forza: 0,
    dext: 0,
    int: 0,
    cos: 0,
  };
  mosse!: iMossa[];
  constructor(private pgSvc: PgService, private builderSvc: BuilderService) {
    // this.builderSvc.getAllClasses().subscribe(classes => {
    //   this.classi = classes
    // })
  }
  ngOnInit() {
    this.builderSvc.getAllClasses().subscribe((classes) => {
      this.classi = classes;
      this.builderSvc.getMosse().subscribe((mossa) => {
        this.mosse = mossa;
      });
    });
  }
  onSave() {
    throw new Error('Method not implemented.');
  }
  onCancel() {
    throw new Error('Method not implemented.');
  }

  getmossebyclasse(e: any) {
    // console.log('mossa', e.value);
    let mosseid:number[] = e.value;
    console.log('mosseid', mosseid);

    //  let mossa = this.mosse.filter(mossa => (mossa.id === mossaid))
    //  console.log(mossa);
    //  return mossa;
  }
}

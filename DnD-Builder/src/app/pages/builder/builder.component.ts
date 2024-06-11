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
  pg!: iPg;
  mosse!: iMossa[];

  constructor(private pgSvc: PgService, private builderSvc: BuilderService) {

    // this.builderSvc.getAllClasses().subscribe(classes => {
    //   this.classi = classes
    // })

  }
ngOnInit(){
  this.mosse
}

}

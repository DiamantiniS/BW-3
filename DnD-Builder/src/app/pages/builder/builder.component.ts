import { iPg } from './../../models/i-pg';
import { iClasse } from './../../models/i-classe';
import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iMossa } from '../../models/i-mossa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuilderService } from '../../services/builder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent {
  classi: iClasse[] = [];
  mosse!: iMossa[];
  pgCurrent: Partial<iPg> = {
    name: '',
    img: '',
    classeId: 0,
    forza: 0,
    dext: 0,
    int: 0,
    cos: 0,
  };

  classeSelect: iClasse = {
    id: 0,
    name: '',
    cA: 0,
    pf: 0,
    mosseId: [],
    mosse: [],
  };

  constructor(
    private pgSvc: PgService,
    private builderSvc: BuilderService,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.builderSvc.getAllClasses().subscribe((classes) => {
      this.builderSvc.getMosse().subscribe((mosse) => {
        this.mosse = mosse;
        this.classi = classes.map((classe) => {
          let attacchi = classe.mosseId.map(
            (mId) => mosse.find((m) => m.id === mId) as iMossa
          );

          classe.mosse = attacchi;
          return classe;
        });
      });
    });
  }
  create() {
    console.log(this.pgCurrent);

    this.pgSvc.create(this.pgCurrent).subscribe();
  }
  onSave() {
    throw new Error('Method not implemented.');
  }
  onCancel() {
    throw new Error('Method not implemented.');
  }

  getmossebyclasse(e: Event) {
    const target = <HTMLInputElement>e.target;
    let classeSelect = this.classi.find(
      (classe) => classe.id === Number(target.value)
    );
    if (classeSelect) this.classeSelect = classeSelect;
    console.log(this.classeSelect);

    this.pgCurrent.classeId = Number(target.value);
  }
}

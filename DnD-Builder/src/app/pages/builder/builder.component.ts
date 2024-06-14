import { iPg } from './../../models/i-pg';
import { iClasse } from './../../models/i-classe';
import { Component } from '@angular/core';
import { PgService } from '../../services/pg.service';
import { iMossa } from '../../models/i-mossa';
import { BuilderService } from '../../services/builder.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent {
  isMine: boolean = false;
  classi: iClasse[] = [];
  mosse!: iMossa[];
  currentUser!: number;
  isCreating: boolean = true;
  pgCurrent: Partial<iPg> = {
    userId: 0,
    name: '',
    img: '',
    forza: 10,
    dext: 10,
    int: 10,
    cos: 10,
  };
  classe!: iClasse;
  classeSelect: iClasse = {
    id: 0,
    name: '-- Seleziona classe --',
    cA: 0,
    pf: 0,
    mosseId: [],
    mosse: [],
  };
  AuthSvc: any;

  constructor(
    private pgSvc: PgService,
    private builderSvc: BuilderService,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.currentUser = this.pgSvc.getUserId();
    this.router.params.subscribe((params) => {
      if (params['id'] && params['id'] !== '0') {
        this.isCreating = false;
        this.pgSvc.getById(params['id']).subscribe((pg) => {
          this.pgCurrent = pg;
          if (this.pgCurrent.userId === this.currentUser) {
            this.isMine = true;
          }
          this.classeSelect =
            this.classi.find(
              (classe) => classe.id === this.pgCurrent.classeId
            ) || this.classeSelect;
          console.log(this.pgCurrent);
        });
      }
    });
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

  ngDoCheck() {
    this.getmosseOnload(this.pgCurrent.classeId!);
  }
  create() {
    console.log(this.pgCurrent);
    this.pgCurrent.userId = this.currentUser;

    this.pgSvc.create(this.pgCurrent).subscribe();
  }
  getmossebyclasse(e: Event) {
    console.log('classe id', this.pgCurrent.classeId);
    const target = <HTMLInputElement>e.target;
    console.log(target.value);
    let classeSelect = this.classi.find(
      (classe) => classe.id === Number(target.value)
    );
    if (classeSelect) this.classeSelect = classeSelect;
    console.log(this.classeSelect);

    this.pgCurrent.classeId = Number(target.value);
  }

  getmosseOnload(id: number) {
    let classeSelect = this.classi.find((classe) => classe.id === id);
    if (classeSelect) this.classeSelect = classeSelect;
  }

  modifica() {
    if (this.pgCurrent.userId === this.currentUser) {
      this.pgSvc.edit(this.pgCurrent).subscribe();
    } else {
      delete this.pgCurrent.id;
      this.create();
    }
  }
}

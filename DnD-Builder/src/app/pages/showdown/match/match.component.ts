import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PgService } from '../../../services/pg.service';
import { iPg } from '../../../models/i-pg';
import { iClasse } from '../../../models/i-classe';
import { iMossa } from '../../../models/i-mossa';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  pg!: iPg;
  classe!: iClasse;
  mosse: iMossa[] = [];
  botPg!: iPg
  botMosse: iMossa[] = [];
  botClasse!:iClasse
  pgArr: iPg[] = [];

  constructor(
    private pgSvc: PgService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.pgSvc.getAll().subscribe((pg) => {
        this.pgArr = pg;
        this.getRandomPg()
    })

    this.route.params.subscribe((params) => {
      const pgId = params['id'];
      if (pgId) {
        this.pgSvc.getById(pgId).subscribe((pg) => {
          this.pg = pg;
          this.pgSvc.getClassbyId(pg.classeId).subscribe((classe) => {
            this.classe = classe;
            this.pgSvc.getMosseByIds(classe.mosseId).subscribe((mosse) => {
              this.mosse = mosse;
              this.pgSvc.getMosseById(21).subscribe((mosse) => {
                this.mosse.push(mosse);
                });
                });
                });
                });
      }
    });
  }
  getRandomPg(){
    const randomIdPg=Math.floor(Math.random()*this.pgArr.length+1)
    if (randomIdPg) {
      this.pgSvc.getById(randomIdPg).subscribe((pg) => {
        this.botPg = pg;
        this.pgSvc.getClassbyId(pg.classeId).subscribe((classe) => {
          this.botClasse = classe;
          this.pgSvc.getMosseByIds(classe.mosseId).subscribe((mosse) => {
            this.botMosse = mosse;
            this.pgSvc.getMosseById(21).subscribe((mosse) => {
              this.botMosse.push(mosse);
            });
          });
        });
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PgService } from '../../../services/pg.service';
import { iPg } from '../../../models/i-pg';
import { iClasse } from '../../../models/i-classe';
import { iMossa } from '../../../models/i-mossa';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  pg!: iPg;
  classe!: iClasse;
  mosse: iMossa[] = [];
  botPg!: iPg;
  botMosse: iMossa[] = [];
  botClasse!: iClasse;
  pgArr: iPg[] = [];
  pfPg!: number;
  pfBot!: number;

  constructor(
    private pgSvc: PgService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pgSvc.getAll().subscribe((pg) => {
      this.pgArr = pg;
      this.getRandomPg();
    });

    this.route.params.subscribe((params) => {
      const pgId = params['id'];
      if (pgId) {
        this.pgSvc.getById(pgId).subscribe((pg) => {
          this.pg = pg;
          this.pgSvc.getClassbyId(pg.classeId).subscribe((classe) => {
            this.classe = classe;
            this.pfPg = this.classe.pf;
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
  getRandomPg() {
    const randomIdPg = Math.floor(Math.random() * this.pgArr.length + 1);
    if (randomIdPg) {
      this.pgSvc.getById(randomIdPg).subscribe((pg) => {
        this.botPg = pg;
        this.pgSvc.getClassbyId(pg.classeId).subscribe((classe) => {
          this.botClasse = classe;
          this.pfBot = this.botClasse.pf;
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

  startRound(idmossa: number): void {
    const mossa = this.mosse.find((mossa) => idmossa === mossa.id);
    if (mossa) {
      if (mossa.id === 21) {
        this.pfPg = this.pfPg - mossa.danno;
        if (this.pfPg > this.classe.pf) {
          this.pfPg = this.classe.pf;
        }
      } else this.pfBot = this.pfBot - mossa.danno;
    }
    if (this.pfBot <= 0) {
      alert('hai vinto');
      setTimeout(() => {
        this.router.navigate(['/showdown']);
      }, 1000);
    } else this.botMossa();
  }
  botMossa() {
    const mossa =
      this.botMosse[Math.floor(Math.random() * this.botMosse.length)];
    console.log(mossa.id);
    if (mossa) {
      if (mossa.id === 21) {
        this.pfBot = this.pfBot - mossa.danno;
        if (this.pfBot > this.botClasse.pf) {
          this.pfBot = this.botClasse.pf;
        }
      } else this.pfPg = this.pfPg - mossa.danno;
    }
    //placeholder
    if (this.pfPg <= 0) {
      alert('hai perso');
      setTimeout(() => {
        this.router.navigate(['/showdown']);
      }, 1000);
    }
  }
}

import { iMossa } from './../../../models/i-mossa';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PgService } from '../../../services/pg.service';
import { iPg } from '../../../models/i-pg';
import { iClasse } from '../../../models/i-classe';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../models/i-user';

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
  utente!: iUser | undefined;
  playerLog: string[] = ['qui avrai il tuo log battaglia!'];
  constructor(
    private pgSvc: PgService,
    private route: ActivatedRoute,
    private router: Router,
    private authsvc: AuthService
  ) {}

  ngOnInit(): void {
    this.utente = this.authsvc.getAccessData()?.user;
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
        this.mossaCura(mossa, true);
      } else {
        this.damageCalc(mossa, true);
      }
    }
    if (this.pfBot <= 0) {
      alert('hai vinto');
      setTimeout(() => {
        this.router.navigate(['/showdown']);
      }, 5000);
    } else this.botMossa();
  }
  botMossa() {
    const mossa =
      this.botMosse[Math.floor(Math.random() * this.botMosse.length)];
    console.log(mossa.id);
    if (mossa) {
      if (mossa.id === 21) {
        this.mossaCura(mossa, false);
      } else {
        this.damageCalc(mossa, false);
      }
    }

    if (this.pfPg <= 0) {
      alert('hai perso');
      setTimeout(() => {
        this.router.navigate(['/showdown']);
      }, 5000);
    }
  }

  mossaCura(m: iMossa, target: boolean) {
    if (target) {
      this.pfPg = this.pfPg + m.danno;

      let cura = Math.floor(Math.random() * (m.danno - 1) + 1);
      let calcolo = Math.floor(this.pg.cos - 10) / 2;
      let valorecura = cura + calcolo;
      if (this.pfPg >= this.classe.pf) {
        valorecura = this.pfPg - this.classe.pf;
        this.pfPg = this.classe.pf;
        console.log('pfmassimi', valorecura);
      }

      this.playerLog.push(
        `Hai usato ${m.nome} e ti sei curato di ${valorecura}PF(${cura} + ${calcolo} : d${m.danno} + Cos)`
      );
    } else {
      this.pfBot = this.pfBot + m.danno;

      let cura = Math.floor(Math.random() * (m.danno - 1) + 1);
      let calcolo = Math.floor(this.pg.cos - 10) / 2;
      let valorecura = cura + calcolo;
      if (this.pfBot >= this.botClasse.pf) {
        valorecura = this.pfBot - this.classe.pf;
        this.pfBot = this.botClasse.pf;
      }
      this.playerLog.push(
        `${this.botPg.name} usa ${m.nome} e si è curato di ${valorecura}PF(${cura} + ${calcolo} : d${m.danno} + Cos)`
      );
    }
  }

  damageCalc(mossa: iMossa, target: boolean) {
    let calcolo = 0;
    let tot = 0;
    let dmg = mossa.danno;
    let danno = Math.floor(Math.random() * (dmg - 1) + 1);
    console.log(danno, 'danno pre calcolo');
    let foc = '';
    foc = this.classe.focus;
    switch (this.classe.focus) {
      case 'forza': {
        calcolo = Math.floor((this.pg.dext - 10) / 2);
        break;
      }
      case 'dext': {
        calcolo = Math.floor((this.pg.dext - 10) / 2);
        break;
      }
      case 'int': {
        calcolo = Math.floor((this.pg.dext - 10) / 2);
        break;
      }
    }
    tot = Math.floor(danno + calcolo);
    if (target) {
      this.pfBot = this.pfBot - tot;
      this.playerLog.push(
        `usi ${mossa.nome} danneggiando ${this.botPg.name} per un ammontare di ${mossa.danno}PF(${danno} + ${calcolo} : d${mossa.danno} + ${this.classe.focus})`
      );
    } else {
      this.pfPg = this.pfPg - tot;
      this.playerLog.push(
        `${this.botPg.name} usa ${mossa.nome} danneggiandoti per un ammontare di ${mossa.danno}PF(${danno} + ${calcolo} : d${mossa.danno} + ${this.classe.focus})`
      );
    }
  }
}

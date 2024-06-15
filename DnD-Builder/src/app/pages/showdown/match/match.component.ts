import { iMossa } from './../../../models/i-mossa';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PgService } from '../../../services/pg.service';
import { iPg } from '../../../models/i-pg';
import { iClasse } from '../../../models/i-classe';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../models/i-user';
import swal from 'sweetalert';

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
  pgTotpf!: number;
  botTotpf!: number;
  utente!: iUser | undefined;
  firstRound: boolean = true;
  roundActive: boolean = false;
  pgInitiative: number = Math.floor(Math.random() * (20 - 1) + 1);
  botInitiative: number = Math.floor(Math.random() * (20 - 1) + 1);

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
            let modCos = Math.floor((this.pg.cos - 10) / 2);
            this.pfPg = this.classe.pf + modCos;
            this.pgTotpf = this.pfPg;
            this.iniziativa(true);
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
    const arrPgId: number[] = [];
    this.pgArr.forEach((pg) => {
      arrPgId.push(pg.id);
    });
    const randArr = Math.floor(Math.random() * arrPgId.length);
    const randomIdPg = arrPgId[randArr];
    if (randomIdPg) {
      this.pgSvc.getById(randomIdPg).subscribe((pg) => {
        this.botPg = pg;
        this.pgSvc.getClassbyId(pg.classeId).subscribe((classe) => {
          this.botClasse = classe;
          let modCos = Math.floor((this.botPg.cos - 10) / 2);
          this.pfBot = this.classe.pf + modCos;
          this.botTotpf = this.pfBot;
          this.botTotpf = this.pfBot;
          this.iniziativa(false);
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

  iniziativa(target: boolean) {
    if (target) {
      let dado = this.pgInitiative;
      let dexMod = Math.floor((this.pg.dext - 10) / 2);
      this.pgInitiative = this.pgInitiative + dexMod;
      this.playerLog.push(
        `Hai fatto un totale di ${this.pgInitiative} per la tua iniziativa(${dado} + ${dexMod} : d20 + Dext)`
      );
    } else {
      let dado = this.botInitiative;
      let dexMod = Math.floor((this.botPg.dext - 10) / 2);
      this.botInitiative = this.botInitiative + dexMod;
      this.playerLog.push(
        `${this.botPg.name} fa totale di ${this.botInitiative} per la sua iniziativa (${dado} + ${dexMod} : d20 + Dext)`
      );
    }
  }
  primoRound() {
    if (this.pgInitiative > this.botInitiative) {
      this.playerLog.push(
        `La tua prontezza nei confronti di ${this.botPg.name} è strabiliante, perciò attacchi sempre per primo`
      );
    } else if (this.pgInitiative < this.botInitiative) {
      this.playerLog.push(
        `${this.botPg.name} sembra molto piu determinato di te, di conseguenza attacchi sempre per ultimo`
      );
    }
    if (this.pgInitiative === this.botInitiative) {
      if (this.pg.dext === this.botPg.dext) {
        this.pgInitiative = this.pgInitiative + 1;
        this.playerLog.push(
          `inizi tu per aver colto di sorpresa il tuo nemico`
        );
      } else if (this.pg.dext > this.botPg.dext) {
        this.pgInitiative = this.pgInitiative + 1;
        this.playerLog.push(
          `Sei più preparato di ${this.botPg.name} percio attacchi sempre per primo`
        );
      } else {
        this.botInitiative = this.botInitiative + 1;
        this.playerLog.push(
          `non sei preparato come ${this.botPg.name} di conseguenza attacchi sempre per ultimo`
        );
      }
    }
    this.firstRound = false;
  }
  startRound(idmossa: number): void {
    this.roundActive = true;
    setTimeout(() => {
      if (this.firstRound) this.primoRound();
      if (this.pgInitiative > this.botInitiative) {
        this.miaMossa(idmossa);
        if (this.pfBot <= 0) {
          this.playerLog.push('hai vinto');
          swal("You won", "", "success");
          setTimeout(() => {
            this.router.navigate(['/showdown']);
          }, 3000);
        } else {
          this.botMossa();
          if (this.pfPg <= 0) {
            this.playerLog.push('hai perso');
            swal("You lost", "", "error");
            setTimeout(() => {
              this.router.navigate(['/showdown']);
            }, 3000);
          }
        }
      } else {
        this.botMossa();
        if (this.pfPg <= 0) {
          this.playerLog.push('hai perso');
          swal("You lost", "", "error");
          setTimeout(() => {
            this.router.navigate(['/showdown']);
          }, 3000);
        } else {
          this.miaMossa(idmossa);
          if (this.pfBot <= 0) {
            this.playerLog.push('hai vinto');
            swal("You won", "", "success");
            setTimeout(() => {
              this.router.navigate(['/showdown']);
            }, 3000);
          }
        }
      }
    this.roundActive = false;
    }, 2000);
  }

  miaMossa(idmossa: number) {
    const mossa = this.mosse.find((mossa) => idmossa === mossa.id);
    if (mossa) {
      if (mossa.id === 21) {
        this.mossaCura(mossa, true);
      } else {
        this.damageCalc(mossa, true);
      }
    }
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
  }

  mossaCura(m: iMossa, target: boolean) {
    if (target) {
      let cura = Math.floor(Math.random() * (m.danno - 1) + 1);
      let calcolo = Math.floor(this.pg.cos - 10) / 2;
      let valorecura = cura + calcolo;
      this.pfPg = this.pfPg + m.danno;
      if (this.pfPg >= this.pgTotpf) {
        valorecura = valorecura - (this.pfPg - this.classe.pf);
        this.pfPg = this.classe.pf;
        console.log('pfmassimi', valorecura);
      }
      this.playerLog.push(
        `Hai usato ${m.nome} e ti sei curato di ${valorecura}PF(${cura} + ${calcolo} : d${m.danno} + Cos)`
      );
    } else {
      let cura = Math.floor(Math.random() * (m.danno - 1) + 1);
      let calcolo = Math.floor(this.botPg.cos - 10) / 2;
      let valorecura = cura + calcolo;
      this.pfBot = this.pfBot + valorecura;
      console.log(valorecura, this.pfBot, this.botClasse.pf, 'primaif');
      if (this.pfBot >= this.botTotpf) {
        valorecura = valorecura - (this.pfBot - this.botClasse.pf);
        console.log(valorecura, this.pfBot, this.botClasse.pf, 'dopoif');

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
        calcolo = Math.floor((this.pg.forza - 10) / 2);
        break;
      }
      case 'dext': {
        calcolo = Math.floor((this.pg.dext - 10) / 2);
        break;
      }
      case 'int': {
        calcolo = Math.floor((this.pg.int - 10) / 2);
        break;
      }
    }
    tot = Math.floor(danno + calcolo);
    if (target) {
      this.pfBot = this.pfBot - tot;
      this.playerLog.push(
        `usi ${mossa.nome} danneggiando ${this.botPg.name} per un ammontare di ${tot}PF(${danno} + ${calcolo} : d${mossa.danno} + ${this.classe.focus})`
      );
    } else {
      this.pfPg = this.pfPg - tot;
      this.playerLog.push(
        `${this.botPg.name} usa ${mossa.nome} danneggiandoti per un ammontare di ${tot}PF(${danno} + ${calcolo} : d${mossa.danno} + ${this.botClasse.focus})`
      );
    }
  }
}

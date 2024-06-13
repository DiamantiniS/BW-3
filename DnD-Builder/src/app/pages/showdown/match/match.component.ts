import { iMossa } from './../../../models/i-mossa';
import { ActivatedRoute } from '@angular/router';
import { PgService } from './../../../services/pg.service';
import { Component } from '@angular/core';
import { iPg } from '../../../models/i-pg';
import { iClasse } from '../../../models/i-classe';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {

  pg!:iPg
  classe!:iClasse
  mosse!:iMossa[]

  constructor(
    private pgSvc:PgService,
    private router: ActivatedRoute)
  {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.pgSvc.getById(params['id']).subscribe((pg) => {
        this.pg=pg
        this.pgSvc.getClassbyId(pg.classeId).subscribe(
          classe => {
            this.classe=classe
            this.pgSvc.getMosseByIds(classe.mosseId).subscribe(
              mossa => {
                this.mosse=mossa
                console.log(this.mosse)
                console.log(this.classe)
                console.log(this.pg)
              }
            )
          }
        )



  })
})
  }
}

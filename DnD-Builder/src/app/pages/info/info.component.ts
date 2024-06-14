import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PgService } from '../../services/pg.service';
import { iPg } from '../../models/i-pg';
import { iClasse } from '../../models/i-classe';
import { iMossa } from '../../models/i-mossa';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  pgCurrent!: iPg;
  currentClass!: iClasse;
  mosse!: iMossa[];
  isEditing: boolean = false;
  constructor(private router: ActivatedRoute, private pgSvc: PgService) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.pgSvc.getById(params['id']).subscribe((pg) => {
        this.pgCurrent = pg;
        this.pgSvc.getClassbyId(this.pgCurrent.classeId).subscribe((classe) => {
          this.currentClass = classe;
          this.pgSvc
            .getMosseByIds(this.currentClass.mosseId)
            .subscribe((mosse) => {
              this.mosse = mosse;
            });
        });
      });
    });
  }
  onEdit() {
    this.isEditing = true;
  }
  onSave() {
    this.isEditing = false;
    this.pgSvc.edit(this.pgCurrent).subscribe();
  }
  onCancel() {
    this.isEditing = false;
  }
}

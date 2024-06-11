import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { PgService } from '../../services/pg.service';
import { iPg } from '../../models/i-pg';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  pgCurrent!: iPg;
  isEditing: boolean = false;
  constructor(private router: ActivatedRoute, private pgSvc: PgService) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.pgSvc.getById(params['id']).subscribe((pg) => {
        this.pgCurrent = pg;
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

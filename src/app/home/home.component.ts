import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../core/services/program.service';
import { CienciaesFeed } from '../core/api/models/cienciaes-feed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public feeds: CienciaesFeed[] = [];

  constructor(private programApi: ProgramService) {}

  public ngOnInit() {
    this.programApi.getAll({ order: 'pubDate' }).subscribe((data) => {
      this.feeds = data;
    });
  }
}

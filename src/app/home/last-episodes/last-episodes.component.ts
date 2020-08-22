import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CienciaesFeedItem } from 'src/app/core/api/models/cienciaes-feed';

@Component({
  selector: 'app-last-episodes',
  templateUrl: './last-episodes.component.html',
  styleUrls: ['./last-episodes.component.scss']
})
export class LastEpisodesComponent implements OnInit {
  public id = '';
  public episodes: CienciaesFeedItem[] = [];

  constructor(private route: ActivatedRoute) {}

  public ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }
}

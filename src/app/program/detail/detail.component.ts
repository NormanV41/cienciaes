import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CienciaesFeedItem } from 'src/app/core/api/models/cienciaes-feed';
import { ProgramService } from 'src/app/core/services/program.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public episode?: CienciaesFeedItem;
  constructor(private route: ActivatedRoute, private api: ProgramService) {}

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('not handled');
    }
    console.log(id);
    this.api.getEpisode(id).subscribe((episode) => (this.episode = episode));
  }
}

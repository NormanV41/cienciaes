import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CienciaesFeedItem } from 'src/app/core/api/models/cienciaes-feed';
import { ProgramService } from 'src/app/core/services/program.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-last-episodes',
  templateUrl: './last-episodes.component.html',
  styleUrls: ['./last-episodes.component.scss']
})
export class LastEpisodesComponent implements OnInit {
  public id = '';
  public episodes: CienciaesFeedItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private programApi: ProgramService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        throw new Error('null id not handled');
      }
      this.id = id;
      this.programApi
        .getEpisodes(this.id, { limit: 10 })
        .pipe(tap(console.log))
        .subscribe((data) => (this.episodes = data));
    });
  }

  public onClick(id: string) {
    this.router.navigate([`/program/detail/${id}`]);
  }
}

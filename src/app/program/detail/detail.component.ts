import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CienciaesFeedItem } from 'src/app/core/api/models/cienciaes-feed';
import { ProgramService } from 'src/app/core/services/program.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AudioService } from 'src/app/core/services/audio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public isPlaying = false;
  public episode?: CienciaesFeedItem;
  public paragraph: SafeHtml = '';
  @ViewChild('player', { read: ElementRef }) private play?: ElementRef;

  public constructor(
    private route: ActivatedRoute,
    private api: ProgramService,
    private sanitizer: DomSanitizer,
    private audioApi: AudioService
  ) {}

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('not handled');
    }
    this.api
      .getEpisode(id)
      .pipe(tap((data) => console.log(data)))
      .subscribe((episode) => {
        this.episode = episode;
        this.paragraph = this.sanitizer.bypassSecurityTrustHtml(episode.description.paragraph);
        this.audioApi.create(this.episode.url);
      });
  }

  public togglePlayer() {
    if (this.isPlaying) {
      this.audioApi.pause();
    } else {
      this.audioApi.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  public updateDuration() {}
}

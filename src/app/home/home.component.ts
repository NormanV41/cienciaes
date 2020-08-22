import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramService } from '../core/services/program.service';
import { CienciaesFeed } from '../core/api/models/cienciaes-feed';
import { ActivatedRoute } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('tabs') private tabsRef?: IonTabs;
  private selectedTab = '';
  public title = '';

  public feeds: CienciaesFeed[] = [];

  constructor(private programApi: ProgramService) {}

  public ngOnInit() {
    this.programApi.getAll({ order: 'pubDate' }).subscribe((data) => {
      this.feeds = data;
      this.setTitle();
    });
  }

  public onTabsChange() {
    if (!this.tabsRef) {
      throw new Error('not handled');
    }
    this.selectedTab = decodeURI(this.tabsRef.getSelected() || '');
    this.setTitle();
  }
  private setTitle() {
    if (this.feeds.length > 0) {
      this.title =
        this.feeds.find((el) => el.id === this.selectedTab)?.title || '';
    }
  }
}

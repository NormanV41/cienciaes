import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GetFeedsService } from './core/services/get-feeds.service';
import { Feed } from './core/api/url';
import { SaveFeedService } from './core/services/save-feed.service';
import { StorageService } from './core/services/storage.service';
import { CienciaesFeed } from './core/api/models/cienciaes-feed';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private saveFeed: SaveFeedService,
    private storage: StorageService
  ) {
    this.initializeApp();
    this.saveFeed.saveAllFeeds().subscribe(() => {
      console.log('all feeds added');
    });
    this.storage
      .get<CienciaesFeed>(Feed.main)
      .subscribe((data) => console.log(data));
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

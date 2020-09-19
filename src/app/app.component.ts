import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SaveFeedService } from './core/services/save-feed.service';
import { ProgramService } from './core/services/program.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private saveFeed: SaveFeedService,
    private programApi: ProgramService,
    private storage: StorageService
  ) {
    this.initializeApp();
    this.saveFeed.saveAllFeeds().subscribe(() => {
      console.log('all feeds added');
    });
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

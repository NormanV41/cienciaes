import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FeedParserService } from './core/services/feed-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private feedParser: FeedParserService
  ) {
    this.initializeApp();
  /*  this.feedParser.getFeed('https://cienciaes.com/feed/').subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        throw error;
      }
    );*/
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

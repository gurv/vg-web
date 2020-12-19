import { transition, trigger, useAnimation } from '@angular/animations';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Injector, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import {
  faBell,
  faFolder,
  faFolderOpen,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCloudSunRain,
  faExclamation,
  faInfo,
  faMap,
  faRubleSign,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import {
  EMPTY_TABS_CONFIG,
  TabsConfiguration,
} from 'projects/commons/src/lib//workspaces/entities/tabs-configuration';
import { AboutPageComponent } from 'projects/commons/src/lib/about/pages/about-page/about-page.component';
import { fadeInAnimation } from 'projects/commons/src/lib/animations';
import { OpenHelpEvent } from 'projects/commons/src/lib/help/entities/open-help-event';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { SideConfiguration } from 'projects/commons/src/lib/workspaces/entities/side-configuration';
import { YoutubeComponent } from 'projects/commons/src/lib/youtube/components/youtube/youtube.component';
import { CurrencyComponent } from 'projects/currency/src/lib/components/currency/currency.component';
import { FakeCentralComponent } from 'projects/ide/src/app/workspace/workspace/fake-central/fake-central.component';
import { MapComponent } from 'projects/map/src/lib/components/map.component';
import { OperationPageComponent } from 'projects/operation/src/lib/pages/operation-page/operation-page.component';
import { WeatherDashboardComponent } from 'projects/weather/src/lib/components/weather-dashboard/weather-dashboard.component';

library.add(faFolder, faFolderOpen, faQuestionCircle, faBell, faServer);

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  animations: [
    trigger('insertWorkspace', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } })),
    ]),
  ],
})
export class WorkspaceComponent implements OnInit {
  left: SideConfiguration;
  right: SideConfiguration;
  bottom: SideConfiguration;
  center: ComponentPortal<FakeCentralComponent>; // TODO tmp

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.center = new ComponentPortal<FakeCentralComponent>(FakeCentralComponent);

    this.left = new SideConfiguration(EMPTY_TABS_CONFIG, EMPTY_TABS_CONFIG, 25);

    this.right = new SideConfiguration(EMPTY_TABS_CONFIG, EMPTY_TABS_CONFIG, 25);

    this.bottom = new SideConfiguration(
      new TabsConfiguration(
        [
          new Tab(
            new ComponentPortal(CurrencyComponent),
            'Валюты',
            new IconFa(faRubleSign, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
          new Tab(
            new ComponentPortal(OperationPageComponent),
            'Операции',
            new IconFa(faExclamation, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
        ],
        0,
        60,
      ),
      new TabsConfiguration(
        [
          new Tab(
            new ComponentPortal(YoutubeComponent),
            'YouTube',
            new IconFa(faYoutube, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
          new Tab(
            new ComponentPortal(MapComponent),
            'Карта',
            new IconFa(faMap, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
          new Tab(
            new ComponentPortal(WeatherDashboardComponent),
            'Погода',
            new IconFa(faCloudSunRain, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
          new Tab(
            new ComponentPortal(CurrencyComponent),
            'Валюты',
            new IconFa(faRubleSign, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
          new Tab(
            new ComponentPortal(AboutPageComponent),
            'О программе',
            new IconFa(faInfo, 'accent'),
            null,
            true,
            [OpenHelpEvent.CHANNEL],
          ),
        ],
        1,
        40,
      ),
      30,
    );
  }
}

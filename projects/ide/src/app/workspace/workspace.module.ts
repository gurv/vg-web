import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutModule } from 'projects/commons/src/lib/about/about.module';
import { DialogModule } from 'projects/commons/src/lib/dialog/dialog.module';
import { GitModule } from 'projects/commons/src/lib/git/git.module';
import { HelpModule } from 'projects/commons/src/lib/help/help.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { SecurityModule } from 'projects/commons/src/lib/security/security.module';
import { SplitModule } from 'projects/commons/src/lib/split/split.module';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { FullPageModule } from 'projects/commons/src/lib/workspaces/components/full-page/full-page.module';
import { WorkspaceLayoutModule } from 'projects/commons/src/lib/workspaces/components/workspace-layout/workspace-layout.module';
import { YoutubeModule } from 'projects/commons/src/lib/youtube/components/youtube/youtube.module';
import { CurrencyModule } from 'projects/currency/src/lib/components/currency/currency.module';
import { MapModule } from 'projects/map/src/lib/components/map.module';
import { OperationModule } from 'projects/operation/src/lib/operation.module';
import { StorageModule } from 'projects/storage/src/lib/storage.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { WeatherModule } from 'projects/weather/src/lib/weather.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    VendorsModule,
    IconModule,
    HelpModule,
    SecurityModule,
    SplitModule,
    DialogModule,
    HelpModule,
    WorkspaceLayoutModule,
    WeatherModule,
    CurrencyModule,
    MapModule,
    OperationModule,
    YoutubeModule,
    StorageModule.forRoot('administration-storage', []),
    GitModule,
    AboutModule,
    MatDialogModule,
    FullPageModule,
  ],
  declarations: [WorkspaceComponent],
  providers: [TabsService],
})
export class WorkspaceModule {
  constructor(tabsService: TabsService) {}
}

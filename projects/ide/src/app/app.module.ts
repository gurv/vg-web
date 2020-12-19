import { NgModule } from '@angular/core';
import { CoreModule } from 'projects/commons/src/lib/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationModule } from 'projects/commons/src/lib/config/configuration.module';
import { environment } from 'projects/ide/src/environments/environment';
import { RouterProgressModule } from 'projects/commons/src/lib/router-progress/components/router-progress/router-progress.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
    ConfigurationModule.forRoot(environment),
    RouterProgressModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

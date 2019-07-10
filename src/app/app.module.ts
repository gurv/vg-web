import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { BarComponent } from './core/bar/bar.component';
import { OperationModule } from './operation/operation.module';
import { SharedModule } from './shared';
import { StaticModule } from './static';

@NgModule({
  declarations: [AppComponent, BarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    CoreModule,
    StaticModule,
    OperationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContextualMenuModule } from './components/contextual-menu/contextual-menu.module';
import { ToggleButtonModule } from './components/toggle-button/toggle-button.module';

@NgModule({
  imports: [CommonModule, ContextualMenuModule, ToggleButtonModule],
  exports: [ContextualMenuModule, ToggleButtonModule],
})
export class TreeModule {}

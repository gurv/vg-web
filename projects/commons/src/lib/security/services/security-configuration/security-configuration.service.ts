import { Injectable } from '@angular/core';
import { KeycloakConfig } from 'keycloak-js';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityConfigurationService {
  constructor(private configuration: ConfigurationService) { }

  get keycloakConfiguration(): KeycloakConfig {
    return this.configuration.value('keycloakConfiguration');
  }

  get expectedRole(): string[] {
    return this.configuration.value('expectedRoles');
  }
}

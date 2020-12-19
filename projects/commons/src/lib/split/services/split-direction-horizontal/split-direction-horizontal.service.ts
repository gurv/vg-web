import { Injectable } from '@angular/core';
import { SplitDirectionService } from 'projects/commons/src/lib/split/entities/split-direction-service';

@Injectable()
export class SplitDirectionHorizontalService implements SplitDirectionService {
  fxLayout = 'row';

  divToSize(nativeElement: any): number {
    return nativeElement.clientWidth;
  }

  eventToSize($event: MouseEvent): number {
    return $event.clientX;
  }
}

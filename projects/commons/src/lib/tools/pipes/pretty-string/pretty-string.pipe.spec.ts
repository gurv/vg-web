import { TestBed } from '@angular/core/testing';
import { StringToolsService } from 'projects/commons/src/lib/tools/services/string-tools/string-tools.service';
import { PrettyStringModule } from './pretty-string.module';
import { PrettyStringPipe } from './pretty-string.pipe';

describe('PrettyStringPipe', () => {
  let pipe: PrettyStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrettyStringModule],
      providers: [PrettyStringPipe, StringToolsService],
    });
    pipe = TestBed.inject(PrettyStringPipe);
  });

  it('create an instance', () => {
    expect(pipe.transform('MY_UGLY_STRING')).toBe('My ugly string');
  });
});

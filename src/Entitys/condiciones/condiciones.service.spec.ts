import { Test, TestingModule } from '@nestjs/testing';
import { CondicionService } from './condiciones.service';

describe('CondicionesService', () => {
  let service: CondicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondicionService],
    }).compile();

    service = module.get<CondicionService>(CondicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

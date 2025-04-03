import { Test, TestingModule } from '@nestjs/testing';
import { PlayResultService } from './play-result.service';

describe('PlayResultService', () => {
  let service: PlayResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayResultService],
    }).compile();

    service = module.get<PlayResultService>(PlayResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

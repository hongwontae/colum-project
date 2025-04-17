import { Test, TestingModule } from '@nestjs/testing';
import { PlayRatingService } from './play-rating.service';

describe('PlayRatingService', () => {
  let service: PlayRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayRatingService],
    }).compile();

    service = module.get<PlayRatingService>(PlayRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

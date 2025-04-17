import { Test, TestingModule } from '@nestjs/testing';
import { PlayRatingController } from './play-rating.controller';

describe('PlayRatingController', () => {
  let controller: PlayRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayRatingController],
    }).compile();

    controller = module.get<PlayRatingController>(PlayRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

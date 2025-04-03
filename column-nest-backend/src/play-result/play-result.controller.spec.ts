import { Test, TestingModule } from '@nestjs/testing';
import { PlayResultController } from './play-result.controller';

describe('PlayResultController', () => {
  let controller: PlayResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayResultController],
    }).compile();

    controller = module.get<PlayResultController>(PlayResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

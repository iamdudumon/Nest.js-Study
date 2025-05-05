import { Module } from '@nestjs/common';
import { TestLogger } from './logger.service';

@Module({
  providers: [TestLogger],
  exports: [TestLogger],
})
export class LoggerModule {}

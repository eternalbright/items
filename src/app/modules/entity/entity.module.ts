import { Module } from '@nestjs/common';

import { EntityService } from './services/entity.service';

@Module({
  controllers: [
    // ...
  ],
  imports: [
    // ...
  ],
  providers: [
    EntityService,
    // ...
  ],
})
export class EntityModule {}

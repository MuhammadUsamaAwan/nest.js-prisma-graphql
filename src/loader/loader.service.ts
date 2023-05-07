import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as DataLoader from 'dataloader';

@Injectable()
export class LoaderService {
  private loaders = new Map();

  constructor(private prisma: PrismaService) {}

  getLoader(model: string, key = '') {
    if (this.loaders.has(model)) return this.loaders.get(model);

    const loader = new DataLoader<string, any>(
      async ids => {
        const where = key ? { [key]: { in: ids } } : { id: { in: ids } };
        const data = await this.prisma[model].findMany({ where });
        const dataMap = new Map(data.map((item: any) => [item[key || 'id'], item]));
        return ids.map(id => dataMap.get(id) || null);
      },
      { batchScheduleFn: callback => setTimeout(callback, 100) }
    );

    this.loaders.set(model, loader);

    return loader;
  }
}

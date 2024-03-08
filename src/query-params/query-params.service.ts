import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  MatchPaths,
  QueryParamsExecuteOptions,
} from './query-params.interfaces';
import { DatabaseSearchService } from 'src/database/database-search.service';

@Injectable()
export class QueryParamsService<DbModel extends Model<any>> {
  constructor(
    private readonly databaseSearchService: DatabaseSearchService<DbModel>,
  ) {}

  queryIsNotEmpty(query: object) {
    return Object.keys(query).length;
  }

  async execute<QueryParams extends object>(
    model: DbModel,
    query: QueryParams,
    {
      paths,
      populatePaths,
      populate,
    }: QueryParamsExecuteOptions<QueryParams> = {},
  ) {
    this.databaseSearchService.model = model;

    if (this.databaseSearchService.stages.length) {
      this.databaseSearchService.stages = [];
    }

    model.schema.eachPath((path) => {
      const value: unknown = query[path] ?? null;

      if (value !== null) {
        const matchPath: MatchPaths<QueryParams>[keyof MatchPaths<QueryParams>] =
          paths && paths[path] ? paths[path] : path;
        const $path =
          typeof matchPath === 'string' ? matchPath : matchPath.path;
        let $value = value;

        if (typeof matchPath !== 'string' && matchPath.type === 'Array') {
          $value = Array.isArray(value) ? value : [value];
        }

        this.databaseSearchService.createPipelineStages({
          path,
          matchPath: $path,
          value: $value,
          collectionName: path,
          pathType: typeof matchPath !== 'string' ? matchPath.type : undefined,
        });
      }
    });

    if (populate) {
      return this.databaseSearchService.lookup({
        populate,
        paths: populatePaths,
      });
    }

    return this.databaseSearchService.lookup({
      populate: false,
    });
  }
}

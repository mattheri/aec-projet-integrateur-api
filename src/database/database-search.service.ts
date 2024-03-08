import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  Connection,
  Document,
  Model,
  PipelineStage,
  SchemaTypes,
} from 'mongoose';
import {
  CreatePipelineStagesArgs,
  InstanceMaps,
  LookupArgs,
  PipelineStageBuilderArgs,
  PipelineStageBuilderFn,
} from './database.interfaces';

@Injectable()
export class DatabaseSearchService<DbModel extends Model<any>> {
  private _model: DbModel;
  private _collections: string[] = [];
  private INSTANCE_MAPS: InstanceMaps = {
    ObjectId: this.lookupRefObject.bind(this),
    Array: this.matchArrayValue.bind(this),
    String: this.matchStaticValue.bind(this),
    Number: this.matchStaticValue.bind(this),
    BigInt: this.matchStaticValue.bind(this),
    Boolean: this.matchStaticValue.bind(this),
    Date: this.matchStaticValue.bind(this),
  };
  private _stages: PipelineStage[] = [];

  constructor(@InjectConnection() connection: Connection) {
    connection
      .listCollections()
      .then(
        (collections) => (this._collections = collections.map((c) => c.name)),
      );
  }

  get model(): DbModel {
    return this._model;
  }

  set model(model: DbModel) {
    this._model = model;
  }

  get collections(): string[] {
    return this._collections;
  }

  get stages(): PipelineStage[] {
    return this._stages;
  }

  set stages(stages: PipelineStage[]) {
    this._stages = stages;
  }

  async lookup({ paths, populate }: LookupArgs) {
    const foundDocuments = await this.model
      .aggregate<Document<DbModel, any, any>>(this.stages)
      .exec();

    if (populate) {
      await Promise.allSettled(
        paths.map((path) => this.model.populate(foundDocuments, path)),
      );
    }

    this.stages = [];

    return foundDocuments;
  }

  createPipelineStages({
    path,
    collectionName,
    matchPath,
    pathType,
    value,
  }: CreatePipelineStagesArgs) {
    const schemaType = pathType ?? this.getSchemaType(path);
    const collection = this.findCollection(collectionName);
    const instance: PipelineStageBuilderFn =
      this.INSTANCE_MAPS[schemaType] ?? this.pipelineStageNoop;

    const stages = instance({
      path,
      value,
      matchPath,
      collectionName: collection,
    });

    this.stages.push(...(Array.isArray(stages) ? stages : [stages]));
  }

  private getSchemaType(path: string) {
    return this.model.schema.path(path).instance as keyof typeof SchemaTypes;
  }

  private pipelineStageNoop(): PipelineStage[] {
    return [];
  }

  private findCollection(collectionName: string) {
    return (
      this.collections.find((c) =>
        c.toLowerCase().includes(collectionName.toLowerCase()),
      ) ?? null
    );
  }

  private matchStaticValue({ path, value }: Partial<PipelineStageBuilderArgs>) {
    return {
      $match: {
        [path]: value,
      },
    };
  }

  private matchArrayValue({ path, value }: Partial<PipelineStageBuilderArgs>) {
    return {
      $match: {
        [path]: {
          $in: value,
        },
      },
    };
  }

  private setValueAtIndexToPath(path: string, index: number = 0) {
    return {
      $set: {
        [path]: {
          $arrayElemAt: [`$${path}`, index],
        },
      },
    };
  }

  private lookupRefObject({
    collectionName,
    matchPath,
    path,
    value,
    matchType,
  }: PipelineStageBuilderArgs) {
    const instance: PipelineStageBuilderFn = matchType
      ? this.INSTANCE_MAPS[matchType]
      : this.matchStaticValue;
    const setFirstArrayValue = this.setValueAtIndexToPath(path);

    return [
      {
        $lookup: {
          from: collectionName,
          localField: path,
          foreignField: '_id',
          as: path,
          let: { path_id: `$${path}` },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$path_id', '$_id'],
                },
              },
            },
          ],
        },
      },
      {
        ...setFirstArrayValue,
      },
      {
        ...instance({
          path: matchPath,
          value,
          collectionName,
          matchPath,
        }),
      },
    ];
  }
}

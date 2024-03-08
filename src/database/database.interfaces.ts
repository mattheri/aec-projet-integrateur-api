import type { PipelineStage, SchemaTypes } from 'mongoose';
import { MatchPathType } from 'src/query-params/query-params.interfaces';

export type MatchPaths<T> = {
  [P in keyof T]:
    | string
    | {
        path: string;
        type?: MatchPathType;
      };
};

export type PipelineStageBuilderArgs = {
  path: string;
  value: any;
  matchPath: string;
  collectionName: string;
  matchType?: MatchPathType;
};

export type PipelineStageBuilderFn = (
  args: Partial<PipelineStageBuilderArgs>,
) => PipelineStage[] | PipelineStage;

export type InstanceMaps = {
  [key in keyof typeof SchemaTypes]?: PipelineStageBuilderFn;
};

export type CreatePipelineStagesArgs = {
  path: string;
  collectionName: string;
  matchPath?: string;
  pathType?: MatchPathType;
  value: any;
};

export type LookupArgs =
  | {
      populate?: false;
      paths?: never;
    }
  | {
      populate: true;
      paths: string[];
    };

import type { PipelineStage, SchemaTypes } from 'mongoose';

export type MatchPathType = keyof typeof SchemaTypes;

export type MatchPaths<T> = {
  [P in keyof T]:
    | string
    | {
        path: string;
        type?: MatchPathType;
      };
};

export type PopulateOptions =
  | {
      populate?: true;
      populatePaths: string[];
    }
  | {
      populate?: false;
      populatePaths?: never;
    };

export type QueryParamsExecuteOptions<T> = {
  paths?: MatchPaths<T>;
} & PopulateOptions;

import type { ParamsDictionary } from 'express-serve-static-core';

export type Params = ParamsDictionary;

export interface MessageResponse {
  message: string;
}

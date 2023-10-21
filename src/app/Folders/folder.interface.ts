import { Model, Schema } from "mongoose";

export type IfolderData = {
  [x: string]: any;
  name: string;
  isOpen: boolean;
  key: number;
  child: Array<IfolderData>;
};

export interface IfolderDataWithId extends IfolderData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
}

export type FolderModel = Model<IfolderData, Record<string, unknown>>;

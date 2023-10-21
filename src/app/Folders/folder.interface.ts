import { Model, Schema } from "mongoose";

export type IfolderData = {
  [x: string]: any;
  name: string;
  isOpen: boolean;
  key: number;
  child: Array<IfolderData>;
};

export type FolderModel = Model<IfolderData, Record<string, unknown>>;

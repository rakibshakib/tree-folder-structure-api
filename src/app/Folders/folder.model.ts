import mongoose, { Schema, model } from "mongoose";
import { FolderModel, IfolderData } from "./folder.interface";

const folderSchema = new Schema<IfolderData>(
  {
    name: {
      type: String,
      required: true,
    },
    isOpen: Boolean,
    key: {
      type: Number,
      required: true,
      unique: true,
    },
    child: { type: [Array<IfolderData>], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const FolderTree = model<IfolderData, FolderModel>(
  "FolderTree",
  folderSchema
);

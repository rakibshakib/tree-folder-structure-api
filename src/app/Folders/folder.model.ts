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
    child:  [],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

folderSchema.add({ child: [folderSchema] });

export const FolderTree = model<IfolderData, FolderModel>(
  "FolderTree",
  folderSchema
);

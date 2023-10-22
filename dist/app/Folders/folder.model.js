"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderTree = void 0;
const mongoose_1 = require("mongoose");
const folderSchema = new mongoose_1.Schema({
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
    child: [],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
folderSchema.add({ child: [folderSchema] });
exports.FolderTree = (0, mongoose_1.model)("FolderTree", folderSchema);

import mongoose from "mongoose";


export function toObjectId(id: string) {
    return new mongoose.Types.ObjectId(id);
}

export function toObjectIdArray(ids?: string[]) {
    return ids?.map((id) => new mongoose.Types.ObjectId(id));
}
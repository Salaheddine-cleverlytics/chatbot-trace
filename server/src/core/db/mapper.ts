import mongoose from "mongoose";


export function toObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
    }
    return new mongoose.Types.ObjectId(id);
}

export function toObjectIdArray(ids?: string[]) {
    return ids?.map((id) => new mongoose.Types.ObjectId(id));
}
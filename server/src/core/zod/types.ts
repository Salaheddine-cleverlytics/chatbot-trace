    // core/zod/types.ts
    import { z } from "zod";
    import mongoose from "mongoose";


    export const ObjectIdString = z
        .preprocess((val) => (val ? val.toString() : val), z.string())
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid MongoDB ObjectId",
        });

    export const ObjectIdTransformSchema = z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid ObjectId",
        })
        .transform((val) => new mongoose.Types.ObjectId(val));


    export const DateTransformSchema = z
        .preprocess((val) => (val ? new Date(val as string) : val), z.date())
        .refine((date) => !isNaN(date.getTime()), { message: "Invalid Date" });
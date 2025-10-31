import { z } from "zod";
import {DateTransformSchema, ObjectIdTransformSchema} from "../../core/zod/types";

// Message type enum
export const MessageTypeEnum = z.enum(["text", "audio"]);

// -------------------------
// Trace input schema
// -------------------------
export const TraceInputSchema = z.object({
    user: z.string(),
    message_type: MessageTypeEnum,
    question: z.string(),
    response: z.string(),
    received_at:DateTransformSchema,
    success: z.boolean(),
    total_processing_time_sec: z.number(),
    chatbot_id:ObjectIdTransformSchema,
    rating: z
        .number({
            invalid_type_error: "Rating must be a number",
        })
        .min(0, { message: "Rating cannot be less than 0" })
        .max(5, { message: "Rating cannot be greater than 5" })
        .optional(),

    asr: z
        .object({
            ogg_to_wav_conversion_sec: z.number().optional(),
            language_detection_sec: z.number().optional(),
            arabic_transcription_sec: z.number().optional(),
            french_transcription_sec: z.number().optional(),
            english_transcription_sec: z.number().optional(),
            detected_language: z.string().optional(),
        })
        .optional(),

    webhook_steps: z
        .object({
            download_sec: z.number().optional(),
            duration_check_sec: z.number().optional(),
            audio_upload_sec: z.number().optional(),
            send_reply_sec: z.number().optional(),
        })
        .optional(),

    rag: z
        .object({
            preprocessing: z
                .object({
                    reformulation_time_sec: z.number().optional(),
                    was_direct_response: z.boolean().optional(),
                })
                .optional(),
            csv_match: z
                .object({
                    attempted: z.boolean().optional(),
                    exact_match_found: z.boolean().optional(),
                    csv_elapsed_sec: z.number().optional(),
                    similarity_score: z.number().optional(),
                    selected_language: z.string().optional(),
                })
                .optional(),
            rag_pipeline: z
                .object({
                    llm_standalone_question_sec: z.number().optional(),
                    retrieval_similarity_search_sec: z.number().optional(),
                    llm_final_answer_sec: z.number().optional(),
                    rag_total_reported_sec: z.number().optional(),
                })
                .optional(),
        })
        .optional(),

    tts: z
        .object({
            openai_api_call_sec: z.number().optional(),
        })
        .optional(),
});

export const TraceUpdateInputSchema = z.object({
    user: z.string().optional(),
    message_type: MessageTypeEnum,
    question: z.string().optional(),
    response: z.string().optional(),
    received_at: z.date().optional(),
    success: z.boolean().optional(),
    total_processing_time_sec: z.number().optional(),
    chatbot_id:ObjectIdTransformSchema.optional(),
    rating: z.number().min(0).max(5).optional(),
    asr: z
        .object({
            ogg_to_wav_conversion_sec: z.number().optional(),
            language_detection_sec: z.number().optional(),
            arabic_transcription_sec: z.number().optional(),
            french_transcription_sec: z.number().optional(),
            english_transcription_sec: z.number().optional(),
            detected_language: z.string().optional(),
        })
        .optional(),

    webhook_steps: z
        .object({
            download_sec: z.number().optional(),
            duration_check_sec: z.number().optional(),
            audio_upload_sec: z.number().optional(),
            send_reply_sec: z.number().optional(),
        })
        .optional(),

    rag: z
        .object({
            preprocessing: z
                .object({
                    reformulation_time_sec: z.number().optional(),
                    was_direct_response: z.boolean().optional(),
                })
                .optional(),
            csv_match: z
                .object({
                    attempted: z.boolean().optional(),
                    exact_match_found: z.boolean().optional(),
                    csv_elapsed_sec: z.number().optional(),
                    similarity_score: z.number().optional(),
                    selected_language: z.string().optional(),
                })
                .optional(),
            rag_pipeline: z
                .object({
                    llm_standalone_question_sec: z.number().optional(),
                    retrieval_similarity_search_sec: z.number().optional(),
                    llm_final_answer_sec: z.number().optional(),
                    rag_total_reported_sec: z.number().optional(),
                })
                .optional(),
        })
        .optional(),

    tts: z
        .object({
            openai_api_call_sec: z.number().optional(),
        })
        .optional(),
});
export type TraceInput = z.infer<typeof TraceInputSchema>;
export type TraceUpdateInput = z.infer<typeof TraceUpdateInputSchema>;
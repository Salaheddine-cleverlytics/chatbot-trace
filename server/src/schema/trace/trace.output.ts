import { z } from "zod";
import { MessageTypeEnum } from "./trace.input";
import {ObjectIdString} from "../../core/zod/types";

// -------------------------
// Trace output schema
// -------------------------
export const TraceOutputSchema = z.object({
    _id: ObjectIdString,
    user: z.string(),
    message_type: MessageTypeEnum,
    question: z.string(),
    response: z.string(),
    received_at: z.date(),
    success: z.boolean(),
    total_processing_time_sec: z.number().optional(),
    chatbot_id:ObjectIdString,
    rating:z.number(),
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

    createdAt: z.date(),
    updatedAt: z.date(),
});



export const TraceManyOutputSchema = z.array(TraceOutputSchema);

export type TraceOutput = z.infer<typeof TraceOutputSchema>;
export type TraceManyOutput = z.infer<typeof TraceManyOutputSchema>;


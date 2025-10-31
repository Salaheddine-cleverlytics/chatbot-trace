import mongoose, {Schema, Document, Model, Types} from "mongoose";

export interface ITrace extends Document {
    user: string;
    message_type: "text" | "audio";
    received_at: Date;
    question:string;
    response: string;
    success: boolean;
    total_processing_time_sec: number;
    rating:number
    chatbot_id:Types.ObjectId;
    asr?: {
        ogg_to_wav_conversion_sec?: number;
        language_detection_sec?: number;
        arabic_transcription_sec?: number;
        french_transcription_sec?: number;
        english_transcription_sec?: number;
        detected_language?: string;
    };

    webhook_steps?: {
        download_sec?: number;
        duration_check_sec?: number;
        audio_upload_sec?: number;
        send_reply_sec?: number;
    };

    rag?: {
        preprocessing?: {
            reformulation_time_sec?: number;
            was_direct_response?: boolean;
        };
        csv_match?: {
            attempted?: boolean;
            exact_match_found?: boolean;
            csv_elapsed_sec?: number;
            similarity_score?: number;
            selected_language?: string;
        };
        rag_pipeline?: {
            llm_standalone_question_sec?: number;
            retrieval_similarity_search_sec?: number;
            llm_final_answer_sec?: number;
            rag_total_reported_sec?: number;
        };
    };

    tts?: {
        openai_api_call_sec?: number;
    };
}

const TraceSchema: Schema<ITrace> = new Schema(
    {
        user: { type: String, required: true },
        message_type: { type: String, enum: ["text", "audio"], required: true },
        question: { type: String, required: true },
        response: { type: String, required: true },
        received_at: { type: Date, default: Date.now },
        success: { type: Boolean, default: false },
        total_processing_time_sec: { type: Number },
        chatbot_id:{type:Schema.Types.ObjectId,ref:"Chatbot", required: true},
        rating: { type: Number, min: 0, max: 5 },
        asr: {
            type: Object,
            default: {},
        },

        webhook_steps: {
            type: Object,
            default: {},
        },

        rag: {
            type: Object,
            default: {},
        },

        tts: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Trace: Model<ITrace> = mongoose.model<ITrace>("ChatTrace", TraceSchema);

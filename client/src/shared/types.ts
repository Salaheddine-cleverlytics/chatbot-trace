


// types.ts
export interface ASRMetrics {
    ogg_to_wav_conversion_sec?: number;
    language_detection_sec?: number;
    arabic_transcription_sec?: number;
    french_transcription_sec?: number;
    english_transcription_sec?: number;
    detected_language?: string;
}

export interface WebhookSteps {
    download_sec?: number;
    duration_check_sec?: number;
    audio_upload_sec?: number;
    send_reply_sec?: number;
}

export interface RAGMetrics {
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
}

export interface TTSMetrics {
    openai_api_call_sec?: number;
}

export interface Trace {
    id:string
    user: string;
    question: string;
    response: string;
    message_type: "text" | "audio";
    received_at?: string | Date;
    success?: boolean;
    total_processing_time_sec: number;
    chatbot_id?: string;
    asr?: ASRMetrics;
    webhook_steps?: WebhookSteps;
    rag?: RAGMetrics;
    tts?: TTSMetrics;
}
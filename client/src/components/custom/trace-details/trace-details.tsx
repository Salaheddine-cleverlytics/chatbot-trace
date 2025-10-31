import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Zap, Mic, Database, Volume2, MessageSquare, MessageCircle, Download } from "lucide-react";
import {UserInfo} from "@/components/custom/trace-details/user-info.tsx";
import {MetadataCard} from "@/components/custom/trace-details/metadata-card.tsx";
import {MessageCard} from "@/components/custom/trace-details/message-card.tsx";
import {CollapsibleSection} from "@/components/custom/trace-details/collapsible-section.tsx";
import {MetricItem} from "@/components/custom/trace-details/metric-item.tsx";
import type {Trace} from "@/shared/types.ts";







export default function TraceDetails({ trace }: { trace: Trace }) {
    const hasASR = trace.asr && Object.keys(trace.asr).length > 0;
    const hasWebhook = trace.webhook_steps && Object.keys(trace.webhook_steps).length > 0;
    const hasRAG = trace.rag && (trace.rag.preprocessing || trace.rag.csv_match || trace.rag.rag_pipeline);
    const hasTTS = trace.tts && trace.tts.openai_api_call_sec;

    const getProcessingTimeColor = (time: number) => {
        if (time > 10) return "bg-red-50 text-red-700 border-red-300";
        if (time > 5) return "bg-yellow-50 text-yellow-700 border-yellow-300";
        return "bg-green-50 text-green-700 border-green-300";
    };

    return (
        <SheetContent className="!w-[900px]  bg-white overflow-y-auto">
            <SheetHeader className="space-y-4">
                <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                    Trace Details
                    {trace.success !== undefined && (
                        <Badge
                            variant="outline"
                            className={trace.success ? "bg-green-50 text-green-700 border-green-300" : "bg-red-50 text-red-700 border-red-300"}
                        >
                            {trace.success ? "Success" : "Failed"}
                        </Badge>
                    )}
                </SheetTitle>
                <SheetDescription>
                    View and analyze the complete conversation history of your chatbot in one place.
                </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
                <UserInfo user={trace.user} />


                <div className="grid grid-cols-2 gap-4">
                    <MetadataCard label="Message Type" value={trace.message_type.toUpperCase()} colorClasses={trace.message_type === "audio" ? "bg-purple-50 text-purple-700 border-purple-300" : "bg-orange-50 text-orange-700 border-orange-300"} />
                    <MetadataCard label="Total Time" value={`${trace.total_processing_time_sec.toFixed(2)}s`} colorClasses={`font-mono ${getProcessingTimeColor(trace.total_processing_time_sec)}`} />
                </div>

                {trace.received_at && (
                    <MetadataCard label="Received At" value={format(new Date(trace.received_at), "PPpp")} colorClasses="text-gray-700" />
                )}

                <MessageCard label="Question" message={trace.question} color="blue" icon={MessageSquare} />
                <MessageCard label="Response" message={trace.response} color="green" icon={MessageCircle} />

                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" /> Performance Metrics
                    </h2>

                    {hasASR && <CollapsibleSection title="ASR (Speech Recognition)" icon={Mic}>
                        {trace.asr!.detected_language && (
                            <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded">
                                    <span className="text-sm font-medium text-orange-700">
                                        Detected Language: <span className="uppercase">{trace.asr!.detected_language}</span>
                                    </span>
                            </div>
                        )}
                        {trace.asr!.ogg_to_wav_conversion_sec !== undefined && (
                            <MetricItem label="OGG to WAV Conversion" value={trace.asr!.ogg_to_wav_conversion_sec} />
                        )}
                        {trace.asr!.language_detection_sec !== undefined && (
                            <MetricItem label="Language Detection" value={trace.asr!.language_detection_sec} />
                        )}
                        {trace.asr!.arabic_transcription_sec !== undefined && (
                            <MetricItem label="Arabic Transcription" value={trace.asr!.arabic_transcription_sec} />
                        )}
                        {trace.asr!.french_transcription_sec !== undefined && (
                            <MetricItem label="French Transcription" value={trace.asr!.french_transcription_sec} />
                        )}
                        {trace.asr!.english_transcription_sec !== undefined && (
                            <MetricItem label="English Transcription" value={trace.asr!.english_transcription_sec} />
                        )}
                    </CollapsibleSection>}

                    {hasWebhook && <CollapsibleSection title="Webhook Processing" icon={Download}>
                        {trace.webhook_steps!.download_sec !== undefined && (
                            <MetricItem label="Download" value={trace.webhook_steps!.download_sec} />
                        )}
                        {trace.webhook_steps!.duration_check_sec !== undefined && (
                            <MetricItem label="Duration Check" value={trace.webhook_steps!.duration_check_sec} />
                        )}
                        {trace.webhook_steps!.audio_upload_sec !== undefined && (
                            <MetricItem label="Audio Upload" value={trace.webhook_steps!.audio_upload_sec} />
                        )}
                        {trace.webhook_steps!.send_reply_sec !== undefined && (
                            <MetricItem label="Send Reply" value={trace.webhook_steps!.send_reply_sec} />
                        )}
                    </CollapsibleSection>}
                    {hasRAG && <CollapsibleSection title="RAG Pipeline" icon={Database} >
                        {trace.rag!.preprocessing && (
                            <>
                                <div className="font-semibold text-sm text-gray-700 mt-2 mb-1">Preprocessing</div>
                                {trace.rag!.preprocessing.reformulation_time_sec !== undefined && (
                                    <MetricItem label="Question Reformulation" value={trace.rag!.preprocessing.reformulation_time_sec} />
                                )}
                                    {trace.rag!.preprocessing.was_direct_response !== undefined && (
                                    <div className="py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Direct Response: </span>
                                        <Badge variant="outline" className={trace.rag!.preprocessing.was_direct_response
                                            ? "bg-green-50 text-green-700"
                                            : "bg-gray-50 text-gray-700"
                                        }>
                                            {trace.rag!.preprocessing.was_direct_response ? "Yes" : "No"}
                                        </Badge>
                                    </div>
                                )}
                            </>
                        )}

                        {trace.rag!.csv_match && (
                            <>
                                <div className="font-semibold text-sm text-gray-700 mt-3 mb-1">CSV Match</div>
                                {trace.rag!.csv_match.attempted !== undefined && (
                                    <div className="py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Attempted: </span>
                                        <Badge variant="outline">
                                            {trace.rag!.csv_match.attempted ? "Yes" : "No"}
                                        </Badge>
                                    </div>
                                )}
                                {trace.rag!.csv_match.exact_match_found !== undefined && (
                                    <div className="py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Exact Match: </span>
                                        <Badge variant="outline" className={trace.rag!.csv_match.exact_match_found
                                            ? "bg-green-50 text-green-700"
                                            : "bg-yellow-50 text-yellow-700"
                                        }>
                                            {trace.rag!.csv_match.exact_match_found ? "Found" : "Not Found"}
                                        </Badge>
                                    </div>
                                )}
                                {trace.rag!.csv_match.csv_elapsed_sec !== undefined && (
                                    <MetricItem label="CSV Search Time" value={trace.rag!.csv_match.csv_elapsed_sec} />
                                )}
                                {trace.rag!.csv_match.similarity_score !== undefined && (
                                    <MetricItem label="Similarity Score" value={trace.rag!.csv_match.similarity_score} unit="" />
                                )}
                                {trace.rag!.csv_match.selected_language && (
                                    <div className="py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-600">Selected Language: </span>
                                        <span className="font-mono text-sm font-semibold text-gray-900 uppercase">
                                                {trace.rag!.csv_match.selected_language}
                                            </span>
                                    </div>
                                )}
                            </>
                        )}

                        {trace.rag!.rag_pipeline && (
                            <>
                                <div className="font-semibold text-sm text-gray-700 mt-3 mb-1">RAG Pipeline</div>
                                {trace.rag!.rag_pipeline.llm_standalone_question_sec !== undefined && (
                                    <MetricItem label="LLM Standalone Question" value={trace.rag!.rag_pipeline.llm_standalone_question_sec} />
                                )}
                                {trace.rag!.rag_pipeline.retrieval_similarity_search_sec !== undefined && (
                                    <MetricItem label="Similarity Search" value={trace.rag!.rag_pipeline.retrieval_similarity_search_sec} />
                                )}
                                {trace.rag!.rag_pipeline.llm_final_answer_sec !== undefined && (
                                    <MetricItem label="LLM Final Answer" value={trace.rag!.rag_pipeline.llm_final_answer_sec} />
                                )}
                                {trace.rag!.rag_pipeline.rag_total_reported_sec !== undefined && (
                                    <div className="mt-2 pt-2 border-t-2 border-gray-300">
                                        <MetricItem label="Total RAG Pipeline" value={trace.rag!.rag_pipeline.rag_total_reported_sec} />
                                    </div>
                                )}
                            </>
                        )}
                    </CollapsibleSection>}
                    {hasTTS && <CollapsibleSection title="TTS (Text-to-Speech)" icon={Volume2}><MetricItem label="OpenAI API Call" value={trace.tts!.openai_api_call_sec} /></CollapsibleSection>}
                </div>
            </div>
        </SheetContent>
    );
}

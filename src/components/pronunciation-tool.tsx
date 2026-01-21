'use client';

import { useState, useRef } from 'react';
import { Mic, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getPronunciationFeedbackAction } from '@/app/actions';
import type { Language, Word } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { PronunciationFeedbackOutput } from '@/ai/flows/pronunciation-feedback';

interface PronunciationToolProps {
  word: Word;
  language: Language;
}

type RecordingStatus = 'idle' | 'permission' | 'recording' | 'processing' | 'success' | 'error';

const mimeType = 'audio/webm';

export function PronunciationTool({ word, language }: PronunciationToolProps) {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [feedback, setFeedback] = useState<PronunciationFeedbackOutput | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    setStatus('permission');
    setFeedback(null);
    if (!window.MediaRecorder) {
      console.error("MediaRecorder API not available in this browser.");
      toast({
        variant: "destructive",
        title: "Browser Not Supported",
        description: "Recording audio is not supported in this browser. Please try a different browser.",
      });
      setStatus('error');
      return;
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      console.error(`MediaRecorder API does not support ${mimeType}.`);
      toast({
        variant: "destructive",
        title: "Browser Not Supported",
        description: "Recording audio in the required format is not supported in this browser. Please try a different browser.",
      });
      setStatus('error');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus('recording');
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error('Error getting audio stream:', err);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access the microphone. Please check your browser permissions.",
      });
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      // Get rid of the permission UI on the browser
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleStop = async () => {
    setStatus('processing');
    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
    audioChunksRef.current = [];

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      try {
        const base64Audio = reader.result as string;
        const response = await getPronunciationFeedbackAction({
          word: word.text[language],
          spokenWord: base64Audio,
          language,
        });

        if (response.success && response.data) {
          setFeedback(response.data);
          setStatus('success');
        } else {
          console.error('Error getting feedback:', response.error);
          toast({
            variant: "destructive",
            title: "AI Error",
            description: "Could not get feedback from the AI. Please try again.",
          });
          setStatus('error');
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        });
        setStatus('error');
      }
    };
  };

  const reset = () => {
    setStatus('idle');
    setFeedback(null);
  };

  const getButtonContent = () => {
    switch (status) {
      case 'recording':
        return 'Stop Recording';
      case 'processing':
        return (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        );
      case 'success':
      case 'error':
        return 'Try Again';
      default:
        return 'Speak the word';
    }
  };

  const handleButtonClick = () => {
    if (status === 'idle' || status === 'permission') {
      startRecording();
    } else if (status === 'recording') {
      stopRecording();
    } else if (status === 'success' || status === 'error') {
      reset();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button
        onClick={handleButtonClick}
        disabled={status === 'processing'}
        className={cn(
          "w-full max-w-xs text-lg py-6 rounded-full font-bold transition-all duration-300 transform hover:scale-105",
          status === 'recording' && "bg-accent hover:bg-accent/90 animate-pulse"
        )}
      >
        <Mic className="mr-2 h-5 w-5" />
        {getButtonContent()}
      </Button>

      {status === 'success' && feedback && (
        <Card className="w-full max-w-md bg-card shadow-lg animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Great Job! Here's your feedback:
            </CardTitle>
            <CardDescription>Your pronunciation score is {Math.round(feedback.score * 100)}%</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={feedback.score * 100} className="w-full h-4 mb-4" />
            <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
          </CardContent>
        </Card>
      )}
       {status === 'error' && (
        <Card className="w-full max-w-md bg-destructive/10 border-destructive shadow-lg animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
                <XCircle className="h-6 w-6" />
                Oops! Something went wrong.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive/80">We couldn't process your recording. Please check your microphone and try again.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

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
        title: t.browserSupport,
        description: t.readErr,
      });
      setStatus('error');
      return;
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      console.error(`MediaRecorder API does not support ${mimeType}.`);
      toast({
        variant: "destructive",
        title: t.browserSupport,
        description: t.recordingFormatErr,
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
        title: t.micErrTitle,
        description: t.micErrDesc,
      });
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      // Get rid of the permission UI on the browser
      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
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
        if (!base64Audio) {
          throw new Error('Failed to read audio data');
        }
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
            title: t.aiErrTitle,
            description: t.aiErrDesc,
          });
          setStatus('error');
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast({
          variant: "destructive",
          title: t.errTitle,
          description: t.errDesc,
        });
        setStatus('error');
      }
    };

    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: t.errTitle,
        description: t.readErr,
      });
      setStatus('error');
    };
  };

  const reset = () => {
    setStatus('idle');
    setFeedback(null);
  };

  const t = {
    en: {
      stop: 'Stop Recording',
      processing: 'Processing...',
      tryAgain: 'Try Again',
      speak: 'Speak the word',
      browserSupport: 'Browser Not Supported',
      recordingFormatErr: 'Recording audio in the required format is not supported in this browser. Please try a different browser.',
      micErrTitle: 'Microphone Error',
      micErrDesc: 'Could not access the microphone. Please check your browser permissions.',
      aiErrTitle: 'AI Error',
      aiErrDesc: 'Could not get feedback from the AI. Please try again.',
      errTitle: 'Error',
      errDesc: 'An unexpected error occurred. Please try again later.',
      readErr: 'Failed to read audio data. Please try again.',
      greatJob: "Great Job! Here's your feedback:",
      scoreIs: (s: number) => `Your pronunciation score is ${s}%`,
      oops: 'Oops! Something went wrong.',
      processErr: "We couldn't process your recording. Please check your microphone and try again."
    },
    de: {
      stop: 'Aufnahme beenden',
      processing: 'Wird verarbeitet...',
      tryAgain: 'Nochmal versuchen',
      speak: 'Sprich das Wort',
      browserSupport: 'Browser nicht unterstützt',
      recordingFormatErr: 'Die Aufnahme von Audio im erforderlichen Format wird von diesem Browser nicht unterstützt. Bitte versuchen Sie einen anderen Browser.',
      micErrTitle: 'Mikrofonfehler',
      micErrDesc: 'Zugriff auf das Mikrofon nicht möglich. Bitte überprüfen Sie Ihre Browserberechtigungen.',
      aiErrTitle: 'KI-Fehler',
      aiErrDesc: 'Die KI konnte kein Feedback geben. Bitte versuchen Sie es erneut.',
      errTitle: 'Fehler',
      errDesc: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.',
      readErr: 'Audiodaten konnten nicht gelesen werden. Bitte versuchen Sie es erneut.',
      greatJob: "Gute Arbeit! Hier ist dein Feedback:",
      scoreIs: (s: number) => `Deine Aussprachebewertung ist ${s}%`,
      oops: 'Hoppla! Etwas ist schief gelaufen.',
      processErr: "Wir konnten deine Aufnahme nicht verarbeiten. Bitte überprüfe dein Mikrofon und versuche es erneut."
    },
    fr: {
      stop: 'Arrêter l\'enregistrement',
      processing: 'Traitement...',
      tryAgain: 'Réessayer',
      speak: 'Prononcez le mot',
      browserSupport: 'Navigateur non supporté',
      recordingFormatErr: 'L\'enregistrement audio dans le format requis n\'est pas supporté par ce navigateur. Veuillez essayer un autre navigateur.',
      micErrTitle: 'Erreur de microphone',
      micErrDesc: 'Impossible d\'accéder au microphone. Veuillez vérifier les permissions de votre navigateur.',
      aiErrTitle: 'Erreur d\'IA',
      aiErrDesc: 'Impossible d\'obtenir un retour de l\'IA. Veuillez réessayer.',
      errTitle: 'Erreur',
      errDesc: 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.',
      readErr: 'Échec de la lecture des données audio. Veuillez réessayer.',
      greatJob: "Beau travail ! Voici votre feedback :",
      scoreIs: (s: number) => `Votre score de prononciation est de ${s}%`,
      oops: 'Oups ! Quelque chose s\'est mal passé.',
      processErr: "Nous n\'avons pas pu traiter votre enregistrement. Veuillez vérifier votre microphone et réessayer."
    },
    es: {
      stop: 'Detener grabación',
      processing: 'Procesando...',
      tryAgain: 'Intentar de nuevo',
      speak: 'Pronunciar la palabra',
      browserSupport: 'Navegador no compatible',
      recordingFormatErr: 'Este navegador no admite la grabación de audio en el formato requerido. Por favor, intente con otro navegador.',
      micErrTitle: 'Error del micrófono',
      micErrDesc: 'No se pudo acceder al micrófono. Por favor, compruebe los permisos de su navegador.',
      aiErrTitle: 'Error de IA',
      aiErrDesc: 'No se pudo obtener retroalimentación de la IA. Por favor, inténtelo de nuevo.',
      errTitle: 'Error',
      errDesc: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.',
      readErr: 'Error al leer los datos de audio. Por favor, inténtelo de nuevo.',
      greatJob: "¡Buen trabajo! Aquí tienes tu feedback:",
      scoreIs: (s: number) => `Tu puntuación de pronunciación es ${s}%`,
      oops: '¡Uy! Algo salió mal.',
      processErr: "No pudimos procesar tu grabación. Por favor, comprueba tu micrófono e inténtalo de nuevo."
    },
    hi: {
      stop: 'रिकॉर्डिंग बंद करें',
      processing: 'प्रक्रिया जारी है...',
      tryAgain: 'फिर से प्रयास करें',
      speak: 'शब्द बोलें',
      browserSupport: 'ब्राउज़र समर्थित नहीं है',
      recordingFormatErr: 'इस ब्राउज़र में आवश्यक प्रारूप में ऑडियो रिकॉर्ड करना समर्थित नहीं है। कृपया दूसरा ब्राउज़र आज़माएं।',
      micErrTitle: 'माइक्रोफोन त्रुटि',
      micErrDesc: 'माइक्रोफोन तक नहीं पहुँचा जा सका। कृपया अपने ब्राउज़र की अनुमतियों की जाँच करें।',
      aiErrTitle: 'एआई त्रुटि',
      aiErrDesc: 'एआई से फीडबैक नहीं मिल सका। कृपया फिर से प्रयास करें।',
      errTitle: 'त्रुटि',
      errDesc: 'एक अप्रत्याशित त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।',
      readErr: 'ऑडियो डेटा पढ़ने में विफल। कृपया फिर से प्रयास करें।',
      greatJob: "बहुत अच्छा! यहाँ आपका फीडबैक है:",
      scoreIs: (s: number) => `आपका उच्चारण स्कोर ${s}% है`,
      oops: 'ओह! कुछ गलत हो गया।',
      processErr: "हम आपकी रिकॉर्डिंग संसाधित नहीं कर सके। कृपया अपने माइक्रोफ़ोन की जाँच करें और फिर से प्रयास करें।"
    }
  }[language];

  const handleButtonClick = () => {
    if (status === 'idle' || status === 'permission') {
      startRecording();
    } else if (status === 'recording') {
      stopRecording();
    } else if (status === 'success' || status === 'error') {
      reset();
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'recording':
        return t.stop;
      case 'processing':
        return (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            {t.processing}
          </>
        );
      case 'success':
      case 'error':
        return t.tryAgain;
      default:
        return t.speak;
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
              {t.greatJob}
            </CardTitle>
            <CardDescription>{t.scoreIs(Math.round(feedback.score * 100))}</CardDescription>
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
              {t.oops}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive/80">{t.processErr}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

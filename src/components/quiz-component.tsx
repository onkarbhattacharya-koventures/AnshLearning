'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import type { Quiz, QuizQuestion } from '@/lib/expanded-modules';
import type { Language } from '@/lib/data';

interface QuizComponentProps {
    quiz: Quiz;
    language: Language;
    onComplete: (score: number, maxScore: number) => void;
}

export function QuizComponent({ quiz, language, onComplete }: QuizComponentProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion.id]: answer
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateScore();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        quiz.questions.forEach((question) => {
            const userAnswer = selectedAnswers[question.id];
            const correctAnswer = question.correctAnswer[language];
            if (userAnswer === correctAnswer) {
                correctAnswers++;
            }
        });

        const finalScore = (correctAnswers / totalQuestions) * 100;
        setScore(finalScore);
        setShowResults(true);
        onComplete(finalScore, 100);
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
    };

    if (showResults) {
        const passed = score >= quiz.passingScore;

        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {passed ? (
                            <Trophy className="h-16 w-16 text-yellow-500" />
                        ) : (
                            <RotateCcw className="h-16 w-16 text-blue-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {passed
                            ? language === 'en' ? 'Congratulations!' : 'Herzlichen Glückwunsch!'
                            : language === 'en' ? 'Keep Practicing!' : 'Weiter üben!'}
                    </CardTitle>
                    <CardDescription>
                        {language === 'en'
                            ? `You scored ${Math.round(score)}% on this quiz`
                            : `Du hast ${Math.round(score)}% in diesem Quiz erreicht`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>
                                {language === 'en' ? 'Your Score' : 'Deine Punktzahl'}
                            </span>
                            <span className="font-bold">{Math.round(score)}%</span>
                        </div>
                        <Progress value={score} className="h-3" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                                {language === 'en' ? 'Passing Score' : 'Bestehensgrenze'}
                            </span>
                            <span>{quiz.passingScore}%</span>
                        </div>
                    </div>

                    {/* Question Review */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">
                            {language === 'en' ? 'Review Answers' : 'Antworten überprüfen'}
                        </h3>
                        {quiz.questions.map((question, idx) => {
                            const userAnswer = selectedAnswers[question.id];
                            const correctAnswer = question.correctAnswer[language];
                            const isCorrect = userAnswer === correctAnswer;

                            return (
                                <div
                                    key={question.id}
                                    className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {isCorrect ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">
                                                {idx + 1}. {question.question[language]}
                                            </p>
                                            <p className="text-sm mt-1">
                                                <span className="text-muted-foreground">
                                                    {language === 'en' ? 'Your answer: ' : 'Deine Antwort: '}
                                                </span>
                                                <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                                    {userAnswer || (language === 'en' ? 'No answer' : 'Keine Antwort')}
                                                </span>
                                            </p>
                                            {!isCorrect && (
                                                <p className="text-sm mt-1">
                                                    <span className="text-muted-foreground">
                                                        {language === 'en' ? 'Correct answer: ' : 'Richtige Antwort: '}
                                                    </span>
                                                    <span className="text-green-700">{correctAnswer}</span>
                                                </p>
                                            )}
                                            {question.explanation && (
                                                <p className="text-sm mt-2 text-muted-foreground italic">
                                                    {question.explanation[language]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={handleRetry} variant="outline" className="flex-1">
                            {language === 'en' ? 'Try Again' : 'Nochmal versuchen'}
                        </Button>
                        <Button onClick={() => window.history.back()} className="flex-1">
                            {language === 'en' ? 'Continue Learning' : 'Weiter lernen'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg">
                        {language === 'en' ? 'Question' : 'Frage'} {currentQuestionIndex + 1} / {totalQuestions}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}%
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        {currentQuestion.question[language]}
                    </h3>

                    {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                        <RadioGroup
                            value={selectedAnswers[currentQuestion.id] || ''}
                            onValueChange={handleAnswerSelect}
                        >
                            <div className="space-y-3">
                                {currentQuestion.options[language].map((option, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                                    >
                                        <RadioGroupItem value={option} id={`option-${idx}`} />
                                        <Label
                                            htmlFor={`option-${idx}`}
                                            className="flex-1 cursor-pointer"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    )}

                    {currentQuestion.type === 'true-false' && (
                        <RadioGroup
                            value={selectedAnswers[currentQuestion.id] || ''}
                            onValueChange={handleAnswerSelect}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="true" id="true" />
                                    <Label htmlFor="true" className="flex-1 cursor-pointer">
                                        {language === 'en' ? 'True' : 'Wahr'}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="false" id="false" />
                                    <Label htmlFor="false" className="flex-1 cursor-pointer">
                                        {language === 'en' ? 'False' : 'Falsch'}
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={handlePrevious}
                        variant="outline"
                        disabled={currentQuestionIndex === 0}
                        className="flex-1"
                    >
                        {language === 'en' ? 'Previous' : 'Zurück'}
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!selectedAnswers[currentQuestion.id]}
                        className="flex-1"
                    >
                        {currentQuestionIndex === totalQuestions - 1
                            ? language === 'en' ? 'Finish' : 'Beenden'
                            : language === 'en' ? 'Next' : 'Weiter'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

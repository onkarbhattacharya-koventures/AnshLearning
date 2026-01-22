'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Trophy,
    Flame,
    Star,
    TrendingUp,
    BookOpen,
    Award,
    Calendar,
    Target
} from 'lucide-react';
import type { UserProgress } from '@/lib/progress-tracking';
import type { Language } from '@/lib/data';

interface StudentProgressDashboardProps {
    progress: UserProgress;
    language: Language;
    totalModules: number;
}

export function StudentProgressDashboard({
    progress,
    language,
    totalModules
}: StudentProgressDashboardProps) {
    const completionPercentage = Math.round((progress.completedModules.length / totalModules) * 100);
    const averageQuizScore = progress.quizScores.length > 0
        ? Math.round(
            progress.quizScores.reduce((sum, quiz) => sum + (quiz.score / quiz.maxScore) * 100, 0) /
            progress.quizScores.length
        )
        : 0;

    const daysActive = Math.floor(
        (new Date().getTime() - new Date(progress.startDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-primary-foreground">
                    {language === 'en' ? 'My Progress' : 'Mein Fortschritt'}
                </h1>
                <p className="text-muted-foreground">
                    {language === 'en'
                        ? 'Track your learning journey'
                        : 'Verfolge deine Lernreise'}
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {language === 'en' ? 'Total Points' : 'Gesamtpunkte'}
                        </CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.totalPoints}</div>
                        <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Keep learning to earn more!' : 'Lerne weiter, um mehr zu verdienen!'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {language === 'en' ? 'Current Streak' : 'Aktuelle Serie'}
                        </CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.currentStreak}</div>
                        <p className="text-xs text-muted-foreground">
                            {language === 'en'
                                ? `Longest: ${progress.longestStreak} days`
                                : `Längste: ${progress.longestStreak} Tage`}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {language === 'en' ? 'Modules Completed' : 'Module abgeschlossen'}
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.completedModules.length}</div>
                        <Progress value={completionPercentage} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            {completionPercentage}% {language === 'en' ? 'complete' : 'abgeschlossen'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {language === 'en' ? 'Badges Earned' : 'Abzeichen verdient'}
                        </CardTitle>
                        <Award className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.badges.length}</div>
                        <div className="flex gap-1 mt-2">
                            {progress.badges.slice(0, 5).map((badge) => (
                                <span key={badge.id} className="text-xl" title={badge.name[language]}>
                                    {badge.icon}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Progress */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview" className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {language === 'en' ? 'Overview' : 'Übersicht'}
                    </TabsTrigger>
                    <TabsTrigger value="badges" className="gap-2">
                        <Trophy className="h-4 w-4" />
                        {language === 'en' ? 'Badges' : 'Abzeichen'}
                    </TabsTrigger>
                    <TabsTrigger value="quizzes" className="gap-2">
                        <Target className="h-4 w-4" />
                        {language === 'en' ? 'Quizzes' : 'Quiz'}
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {language === 'en' ? 'Learning Stats' : 'Lernstatistiken'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {language === 'en' ? 'Days Active' : 'Aktive Tage'}
                                    </span>
                                    <span className="font-semibold">{daysActive}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {language === 'en' ? 'Average Quiz Score' : 'Durchschnittliche Quiz-Punktzahl'}
                                    </span>
                                    <span className="font-semibold">{averageQuizScore}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {language === 'en' ? 'Quizzes Taken' : 'Absolvierte Quiz'}
                                    </span>
                                    <span className="font-semibold">{progress.quizScores.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {language === 'en' ? 'Perfect Scores' : 'Perfekte Punktzahlen'}
                                    </span>
                                    <span className="font-semibold">
                                        {progress.quizScores.filter(q => q.score === q.maxScore).length}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {language === 'en' ? 'Recent Achievements' : 'Neueste Erfolge'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {progress.badges.length > 0 ? (
                                    <div className="space-y-3">
                                        {progress.badges.slice(-3).reverse().map((badge) => (
                                            <div
                                                key={badge.id}
                                                className="flex items-center gap-3 p-2 bg-accent rounded-lg"
                                            >
                                                <span className="text-2xl">{badge.icon}</span>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{badge.name[language]}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {badge.description[language]}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">
                                        {language === 'en'
                                            ? 'Complete modules to earn badges!'
                                            : 'Schließe Module ab, um Abzeichen zu verdienen!'}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Badges Tab */}
                <TabsContent value="badges" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {language === 'en' ? 'All Badges' : 'Alle Abzeichen'}
                            </CardTitle>
                            <CardDescription>
                                {language === 'en'
                                    ? `You've earned ${progress.badges.length} badges`
                                    : `Du hast ${progress.badges.length} Abzeichen verdient`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {progress.badges.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {progress.badges.map((badge) => (
                                        <div
                                            key={badge.id}
                                            className="flex flex-col items-center p-4 border rounded-lg bg-accent"
                                        >
                                            <span className="text-4xl mb-2">{badge.icon}</span>
                                            <h3 className="font-semibold text-center">{badge.name[language]}</h3>
                                            <p className="text-xs text-muted-foreground text-center mt-1">
                                                {badge.description[language]}
                                            </p>
                                            <Badge variant="secondary" className="mt-2">
                                                {new Date(badge.earnedAt).toLocaleDateString()}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    {language === 'en'
                                        ? 'No badges yet. Start learning to earn your first badge!'
                                        : 'Noch keine Abzeichen. Beginne zu lernen, um dein erstes Abzeichen zu verdienen!'}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Quizzes Tab */}
                <TabsContent value="quizzes" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {language === 'en' ? 'Quiz History' : 'Quiz-Verlauf'}
                            </CardTitle>
                            <CardDescription>
                                {language === 'en'
                                    ? 'Review your quiz performance'
                                    : 'Überprüfe deine Quiz-Leistung'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {progress.quizScores.length > 0 ? (
                                <div className="space-y-3">
                                    {progress.quizScores.slice().reverse().map((quiz) => {
                                        const percentage = Math.round((quiz.score / quiz.maxScore) * 100);
                                        return (
                                            <div
                                                key={quiz.quizId}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{quiz.moduleId}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(quiz.completedAt).toLocaleDateString()} •
                                                        {language === 'en' ? ' Attempts: ' : ' Versuche: '}{quiz.attempts}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold">{percentage}%</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {quiz.score}/{quiz.maxScore}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    {language === 'en'
                                        ? 'No quizzes completed yet. Take your first quiz!'
                                        : 'Noch keine Quiz abgeschlossen. Mache dein erstes Quiz!'}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

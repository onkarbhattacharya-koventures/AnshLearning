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

    const t = {
        en: {
            title: 'My Progress',
            subtitle: 'Track your learning journey',
            totalPoints: 'Total Points',
            pointsHint: 'Keep learning to earn more!',
            currentStreak: 'Current Streak',
            longestStreak: (days: number) => `Longest: ${days} days`,
            modulesCompleted: 'Modules Completed',
            complete: 'complete',
            badgesEarned: 'Badges Earned',
            overview: 'Overview',
            badges: 'Badges',
            quizzes: 'Quizzes',
            learningStats: 'Learning Stats',
            daysActive: 'Days Active',
            avgScore: 'Average Quiz Score',
            quizzesTaken: 'Quizzes Taken',
            perfectScores: 'Perfect Scores',
            recentAchievements: 'Recent Achievements',
            badgesHint: 'Complete modules to earn badges!',
            allBadges: 'All Badges',
            earnedBadges: (count: number) => `You've earned ${count} badges`,
            noBadges: 'No badges yet. Start learning to earn your first badge!',
            quizHistory: 'Quiz History',
            quizPerf: 'Review your quiz performance',
            attempts: ' Attempts: ',
            noQuizzes: 'No quizzes completed yet. Take your first quiz!',
        },
        de: {
            title: 'Mein Fortschritt',
            subtitle: 'Verfolge deine Lernreise',
            totalPoints: 'Gesamtpunkte',
            pointsHint: 'Lerne weiter, um mehr zu verdienen!',
            currentStreak: 'Aktuelle Serie',
            longestStreak: (days: number) => `Längste: ${days} Tage`,
            modulesCompleted: 'Module abgeschlossen',
            complete: 'abgeschlossen',
            badgesEarned: 'Abzeichen verdient',
            overview: 'Übersicht',
            badges: 'Abzeichen',
            quizzes: 'Quiz',
            learningStats: 'Lernstatistiken',
            daysActive: 'Aktive Tage',
            avgScore: 'Durchschnittliche Quiz-Punktzahl',
            quizzesTaken: 'Absolvierte Quiz',
            perfectScores: 'Perfekte Punktzahlen',
            recentAchievements: 'Neueste Erfolge',
            badgesHint: 'Schließe Module ab, um Abzeichen zu verdienen!',
            allBadges: 'Alle Abzeichen',
            earnedBadges: (count: number) => `Du hast ${count} Abzeichen verdient`,
            noBadges: 'Noch keine Abzeichen. Beginne zu lernen, um dein erstes Abzeichen zu verdienen!',
            quizHistory: 'Quiz-Verlauf',
            quizPerf: 'Überprüfe deine Quiz-Leistung',
            attempts: ' Versuche: ',
            noQuizzes: 'Noch keine Quiz abgeschlossen. Mache dein erstes Quiz!',
        },
        fr: {
            title: 'Mes progrès',
            subtitle: 'Suivez votre parcours d\'apprentissage',
            totalPoints: 'Points totaux',
            pointsHint: 'Continuez à apprendre pour en gagner plus !',
            currentStreak: 'Série actuelle',
            longestStreak: (days: number) => `Plus longue : ${days} jours`,
            modulesCompleted: 'Modules terminés',
            complete: 'terminé',
            badgesEarned: 'Badges gagnés',
            overview: 'Aperçu',
            badges: 'Badges',
            quizzes: 'Quiz',
            learningStats: 'Stats d\'apprentissage',
            daysActive: 'Jours actifs',
            avgScore: 'Score moyen aux quiz',
            quizzesTaken: 'Quiz effectués',
            perfectScores: 'Scores parfaits',
            recentAchievements: 'Réalisations récentes',
            badgesHint: 'Terminez des modules pour gagner des badges !',
            allBadges: 'Tous les badges',
            earnedBadges: (count: number) => `Vous avez gagné ${count} badges`,
            noBadges: 'Pas encore de badges. Commencez à apprendre pour gagner votre premier badge !',
            quizHistory: 'Historique des quiz',
            quizPerf: 'Consultez vos performances aux quiz',
            attempts: ' Tentatives : ',
            noQuizzes: 'Aucun quiz terminé pour le moment. Faites votre premier quiz !',
        },
        es: {
            title: 'Mis progresos',
            subtitle: 'Sigue tu viaje de aprendizaje',
            totalPoints: 'Puntos totales',
            pointsHint: '¡Sigue aprendiendo para ganar más!',
            currentStreak: 'Racha actual',
            longestStreak: (days: number) => `Más larga: ${days} días`,
            modulesCompleted: 'Módulos completados',
            complete: 'completado',
            badgesEarned: 'Insignias obtenidas',
            overview: 'Visión general',
            badges: 'Insignias',
            quizzes: 'Cuestionarios',
            learningStats: 'Estadísticas de aprendizaje',
            daysActive: 'Días activos',
            avgScore: 'Puntuación media en cuestionarios',
            quizzesTaken: 'Cuestionarios realizados',
            perfectScores: 'Puntuaciones perfectas',
            recentAchievements: 'Logros recientes',
            badgesHint: '¡Completa módulos para ganar insignias!',
            allBadges: 'Todas las insignias',
            earnedBadges: (count: number) => `Has ganado ${count} insignias`,
            noBadges: 'Aún no hay insignias. ¡Empieza a aprender para ganar tu primera insignia!',
            quizHistory: 'Historial de cuestionarios',
            quizPerf: 'Revisa tu rendimiento en los cuestionarios',
            attempts: ' Intentos: ',
            noQuizzes: 'Aún no has completado ningún cuestionario. ¡Haz tu primer cuestionario!',
        }
    }[language];

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-primary-foreground">
                    {t.title}
                </h1>
                <p className="text-muted-foreground">
                    {t.subtitle}
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.totalPoints}
                        </CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.totalPoints}</div>
                        <p className="text-xs text-muted-foreground">
                            {t.pointsHint}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.currentStreak}
                        </CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.currentStreak}</div>
                        <p className="text-xs text-muted-foreground">
                            {t.longestStreak(progress.longestStreak)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.modulesCompleted}
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{progress.completedModules.length}</div>
                        <Progress value={completionPercentage} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            {completionPercentage}% {t.complete}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t.badgesEarned}
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
                        {t.overview}
                    </TabsTrigger>
                    <TabsTrigger value="badges" className="gap-2">
                        <Trophy className="h-4 w-4" />
                        {t.badges}
                    </TabsTrigger>
                    <TabsTrigger value="quizzes" className="gap-2">
                        <Target className="h-4 w-4" />
                        {t.quizzes}
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {t.learningStats}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {t.daysActive}
                                    </span>
                                    <span className="font-semibold">{daysActive}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {t.avgScore}
                                    </span>
                                    <span className="font-semibold">{averageQuizScore}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {t.quizzesTaken}
                                    </span>
                                    <span className="font-semibold">{progress.quizScores.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {t.perfectScores}
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
                                    {t.recentAchievements}
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
                                        {t.badgesHint}
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
                                {t.allBadges}
                            </CardTitle>
                            <CardDescription>
                                {t.earnedBadges(progress.badges.length)}
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
                                    {t.noBadges}
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
                                {t.quizHistory}
                            </CardTitle>
                            <CardDescription>
                                {t.quizPerf}
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
                                                        {t.attempts}{quiz.attempts}
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
                                    {t.noQuizzes}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

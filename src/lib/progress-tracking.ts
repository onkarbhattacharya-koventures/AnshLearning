import type { Language } from './data';

export interface UserProgress {
    userId: string;
    completedModules: string[];
    quizScores: QuizScore[];
    badges: Badge[];
    currentStreak: number;
    longestStreak: number;
    totalPoints: number;
    lastActiveDate: Date;
    startDate: Date;
}

export interface QuizScore {
    quizId: string;
    moduleId: string;
    score: number;
    maxScore: number;
    completedAt: Date;
    attempts: number;
}

export interface Badge {
    id: string;
    name: Record<Language, string>;
    description: Record<Language, string>;
    icon: string;
    earnedAt: Date;
    category: string;
}

export interface Achievement {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    icon: string;
    requirement: {
        type: 'modules' | 'streak' | 'points' | 'quizzes' | 'perfect-scores';
        count: number;
    };
    reward: {
        points: number;
        badge?: Badge;
    };
}

// Predefined badges
export const badges: Badge[] = [
    {
        id: 'first-steps',
        name: { en: 'First Steps', de: 'Erste Schritte' },
        description: { en: 'Complete your first module', de: 'Schließe dein erstes Modul ab' },
        icon: '👣',
        earnedAt: new Date(),
        category: 'beginner'
    },
    {
        id: 'week-warrior',
        name: { en: 'Week Warrior', de: 'Wochen-Krieger' },
        description: { en: '7-day learning streak', de: '7-Tage-Lernsträhne' },
        icon: '🔥',
        earnedAt: new Date(),
        category: 'streak'
    },
    {
        id: 'perfect-score',
        name: { en: 'Perfect Score', de: 'Perfekte Punktzahl' },
        description: { en: 'Get 100% on a quiz', de: 'Erreiche 100% in einem Quiz' },
        icon: '💯',
        earnedAt: new Date(),
        category: 'achievement'
    },
    {
        id: 'module-master',
        name: { en: 'Module Master', de: 'Modul-Meister' },
        description: { en: 'Complete 10 modules', de: 'Schließe 10 Module ab' },
        icon: '🏆',
        earnedAt: new Date(),
        category: 'achievement'
    },
    {
        id: 'language-lover',
        name: { en: 'Language Lover', de: 'Sprach-Liebhaber' },
        description: { en: 'Complete 25 modules', de: 'Schließe 25 Module ab' },
        icon: '❤️',
        earnedAt: new Date(),
        category: 'achievement'
    },
    {
        id: 'polyglot',
        name: { en: 'Polyglot', de: 'Polyglott' },
        description: { en: 'Complete 50 modules', de: 'Schließe 50 Module ab' },
        icon: '🌟',
        earnedAt: new Date(),
        category: 'achievement'
    }
];

// Achievements system
export const achievements: Achievement[] = [
    {
        id: 'achievement-first-module',
        title: { en: 'Getting Started', de: 'Erste Schritte' },
        description: { en: 'Complete your first learning module', de: 'Schließe dein erstes Lernmodul ab' },
        icon: '🎯',
        requirement: { type: 'modules', count: 1 },
        reward: { points: 10, badge: badges[0] }
    },
    {
        id: 'achievement-week-streak',
        title: { en: 'Consistent Learner', de: 'Beständiger Lerner' },
        description: { en: 'Learn for 7 days in a row', de: 'Lerne 7 Tage hintereinander' },
        icon: '📅',
        requirement: { type: 'streak', count: 7 },
        reward: { points: 50, badge: badges[1] }
    },
    {
        id: 'achievement-perfect-quiz',
        title: { en: 'Quiz Champion', de: 'Quiz-Champion' },
        description: { en: 'Score 100% on any quiz', de: 'Erreiche 100% in einem Quiz' },
        icon: '🎓',
        requirement: { type: 'perfect-scores', count: 1 },
        reward: { points: 25, badge: badges[2] }
    },
    {
        id: 'achievement-10-modules',
        title: { en: 'Dedicated Student', de: 'Engagierter Schüler' },
        description: { en: 'Complete 10 learning modules', de: 'Schließe 10 Lernmodule ab' },
        icon: '📖',
        requirement: { type: 'modules', count: 10 },
        reward: { points: 100, badge: badges[3] }
    },
    {
        id: 'achievement-25-modules',
        title: { en: 'Language Enthusiast', de: 'Sprach-Enthusiast' },
        description: { en: 'Complete 25 learning modules', de: 'Schließe 25 Lernmodule ab' },
        icon: '🌈',
        requirement: { type: 'modules', count: 25 },
        reward: { points: 250, badge: badges[4] }
    },
    {
        id: 'achievement-50-modules',
        title: { en: 'Master Learner', de: 'Meister-Lerner' },
        description: { en: 'Complete 50 learning modules', de: 'Schließe 50 Lernmodule ab' },
        icon: '👑',
        requirement: { type: 'modules', count: 50 },
        reward: { points: 500, badge: badges[5] }
    }
];

// Progress tracking utilities
export class ProgressTracker {
    static calculateProgress(userProgress: UserProgress, totalModules: number): number {
        return Math.round((userProgress.completedModules.length / totalModules) * 100);
    }

    static updateStreak(userProgress: UserProgress): UserProgress {
        const today = new Date();
        const lastActive = new Date(userProgress.lastActiveDate);
        const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            // Continue streak
            userProgress.currentStreak += 1;
            userProgress.longestStreak = Math.max(userProgress.longestStreak, userProgress.currentStreak);
        } else if (daysDiff > 1) {
            // Streak broken
            userProgress.currentStreak = 1;
        }

        userProgress.lastActiveDate = today;
        return userProgress;
    }

    static checkAchievements(userProgress: UserProgress): Achievement[] {
        const earned: Achievement[] = [];

        achievements.forEach(achievement => {
            const alreadyEarned = userProgress.badges.some(b => b.id === achievement.reward.badge?.id);
            if (alreadyEarned) return;

            let qualifies = false;

            switch (achievement.requirement.type) {
                case 'modules':
                    qualifies = userProgress.completedModules.length >= achievement.requirement.count;
                    break;
                case 'streak':
                    qualifies = userProgress.currentStreak >= achievement.requirement.count;
                    break;
                case 'perfect-scores':
                    const perfectScores = userProgress.quizScores.filter(s => s.score === s.maxScore).length;
                    qualifies = perfectScores >= achievement.requirement.count;
                    break;
                case 'points':
                    qualifies = userProgress.totalPoints >= achievement.requirement.count;
                    break;
            }

            if (qualifies) {
                earned.push(achievement);
            }
        });

        return earned;
    }

    static awardPoints(userProgress: UserProgress, points: number): UserProgress {
        userProgress.totalPoints += points;
        return userProgress;
    }

    static completeModule(userProgress: UserProgress, moduleId: string): UserProgress {
        if (!userProgress.completedModules.includes(moduleId)) {
            userProgress.completedModules.push(moduleId);
            userProgress.totalPoints += 20; // Base points for completing a module
        }
        return userProgress;
    }

    static recordQuizScore(
        userProgress: UserProgress,
        quizId: string,
        moduleId: string,
        score: number,
        maxScore: number
    ): UserProgress {
        const existingScore = userProgress.quizScores.find(s => s.quizId === quizId);

        if (existingScore) {
            existingScore.score = Math.max(existingScore.score, score);
            existingScore.attempts += 1;
            existingScore.completedAt = new Date();
        } else {
            userProgress.quizScores.push({
                quizId,
                moduleId,
                score,
                maxScore,
                completedAt: new Date(),
                attempts: 1
            });
        }

        // Award points based on score
        const percentage = (score / maxScore) * 100;
        const points = Math.round(percentage / 10); // 10 points for 100%, 5 for 50%, etc.
        userProgress.totalPoints += points;

        return userProgress;
    }
}

// Teacher dashboard types
export interface ClassProgress {
    classId: string;
    className: string;
    students: StudentProgress[];
    averageProgress: number;
    totalModulesCompleted: number;
    averageQuizScore: number;
}

export interface StudentProgress {
    studentId: string;
    studentName: string;
    progress: UserProgress;
    recentActivity: ActivityLog[];
    strengths: string[];
    areasForImprovement: string[];
}

export interface ActivityLog {
    id: string;
    type: 'module-completed' | 'quiz-taken' | 'badge-earned' | 'streak-milestone';
    timestamp: Date;
    details: string;
    points: number;
}

// Generate sample progress data
export function createNewUserProgress(userId: string): UserProgress {
    return {
        userId,
        completedModules: [],
        quizScores: [],
        badges: [],
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0,
        lastActiveDate: new Date(),
        startDate: new Date()
    };
}

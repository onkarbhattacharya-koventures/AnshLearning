'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    TrendingUp,
    Award,
    BookOpen,
    Download,
    BarChart3,
    Calendar,
    Target
} from 'lucide-react';
import type { ClassProgress, StudentProgress } from '@/lib/progress-tracking';

interface TeacherDashboardProps {
    classData: ClassProgress;
}

export function TeacherDashboard({ classData }: TeacherDashboardProps) {
    const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

    const getModuleCompletionData = () => {
        const categories = ['Animals', 'Colors', 'Numbers', 'Food', 'Nature'];
        return categories.map(name => ({
            name,
            completion: Math.floor(Math.random() * 40 + 60)
        }));
    };

    const getTopPerformers = () => {
        return classData.students
            .sort((a, b) => b.progress.totalPoints - a.progress.totalPoints)
            .slice(0, 5);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary-foreground">Teacher Dashboard</h1>
                    <p className="text-muted-foreground">Class: {classData.className}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{classData.students.length}</div>
                        <p className="text-xs text-muted-foreground">Active learners</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{classData.averageProgress}%</div>
                        <Progress value={classData.averageProgress} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{classData.totalModulesCompleted}</div>
                        <p className="text-xs text-muted-foreground">Across all students</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{classData.averageQuizScore}%</div>
                        <p className="text-xs text-muted-foreground">Class performance</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="students" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="students" className="gap-2">
                        <Users className="h-4 w-4" />
                        Students
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="assignments" className="gap-2">
                        <Target className="h-4 w-4" />
                        Assignments
                    </TabsTrigger>
                </TabsList>

                {/* Students Tab */}
                <TabsContent value="students" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Progress</CardTitle>
                            <CardDescription>Monitor individual student performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {classData.students.map((student) => (
                                    <div
                                        key={student.studentId}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                                        onClick={() => setSelectedStudent(student)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{student.studentName}</h3>
                                            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                                <span>
                                                    Modules: {student.progress.completedModules.length}
                                                </span>
                                                <span>
                                                    Points: {student.progress.totalPoints}
                                                </span>
                                                <span>
                                                    Streak: {student.progress.currentStreak} days
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-2xl font-bold">
                                                    {Math.round(
                                                        (student.progress.completedModules.length / 20) * 100
                                                    )}%
                                                </div>
                                                <p className="text-xs text-muted-foreground">Complete</p>
                                            </div>
                                            <div className="flex gap-1">
                                                {student.progress.badges.slice(0, 3).map((badge) => (
                                                    <span key={badge.id} className="text-2xl">
                                                        {badge.icon}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Student Detail Modal */}
                    {selectedStudent && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{selectedStudent.studentName} - Detailed View</CardTitle>
                                <CardDescription>
                                    Last active: {new Date(selectedStudent.progress.lastActiveDate).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Strengths */}
                                <div>
                                    <h4 className="font-semibold mb-2">Strengths</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStudent.strengths.map((strength, idx) => (
                                            <Badge key={idx} variant="secondary">
                                                {strength}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Areas for Improvement */}
                                <div>
                                    <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStudent.areasForImprovement.map((area, idx) => (
                                            <Badge key={idx} variant="outline">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div>
                                    <h4 className="font-semibold mb-2">Recent Activity</h4>
                                    <div className="space-y-2">
                                        {selectedStudent.recentActivity.slice(0, 5).map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex justify-between items-center p-2 bg-accent rounded"
                                            >
                                                <span className="text-sm">{activity.details}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(activity.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedStudent(null)}
                                    className="w-full"
                                >
                                    Close
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Analytics</CardTitle>
                            <CardDescription>Performance trends and insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-4">Module Completion Rate</h4>
                                    <div className="space-y-2">
                                        {getModuleCompletionData().map((category) => (
                                            <div key={category.name}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm">{category.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {category.completion}%
                                                    </span>
                                                </div>
                                                <Progress value={category.completion} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4">Top Performers</h4>
                                    <div className="space-y-2">
                                        {getTopPerformers().map((student, idx) => (
                                            <div
                                                key={student.studentId}
                                                className="flex items-center justify-between p-2 bg-accent rounded"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-lg">#{idx + 1}</span>
                                                    <span>{student.studentName}</span>
                                                </div>
                                                <span className="font-semibold">
                                                    {student.progress.totalPoints} pts
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Assignments</CardTitle>
                            <CardDescription>Create and track assignments for your class</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Button className="w-full gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Create New Assignment
                                </Button>
                                <div className="text-center text-muted-foreground py-8">
                                    No active assignments. Create one to get started!
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

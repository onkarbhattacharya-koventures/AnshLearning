'use client';

import React, { useState } from 'react';
import { resources, Resource } from '@/lib/resources';
import { Language } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Video, FileText, Wrench, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ResourceLibraryProps {
    language: Language;
}

export function ResourceLibrary({ language }: ResourceLibraryProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | Resource['type']>('all');

    const filteredResources = resources.filter(resource => {
        const matchesLanguage = resource.languages.includes(language);
        const matchesType = filterType === 'all' || resource.type === filterType;
        const matchesSearch = resource.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesLanguage && matchesType && matchesSearch;
    });

    const getIcon = (type: Resource['type']) => {
        switch (type) {
            case 'ebook': return <Book className="h-5 w-5" />;
            case 'video': return <Video className="h-5 w-5" />;
            case 'worksheet': return <FileText className="h-5 w-5" />;
            case 'tool': return <Wrench className="h-5 w-5" />;
        }
    };

    const getTypeName = (type: Resource['type']) => {
        const names: Record<Resource['type'], Record<Language, string>> = {
            ebook: { en: 'E-Book', de: 'E-Book', fr: 'Livre numérique', es: 'Libro electrónico', hi: 'ई-बुक' },
            video: { en: 'Video/Channel', de: 'Video/Kanal', fr: 'Vidéo/Chaîne', es: 'Video/Canal', hi: 'वीडियो/चैनल' },
            worksheet: { en: 'Worksheet', de: 'Arbeitsblatt', fr: 'Feuille d\'exercices', es: 'Hoja de trabajo', hi: 'वर्कशीट' },
            tool: { en: 'Learning Tool', de: 'Lernwerkzeug', fr: 'Outil d\'apprentissage', es: 'Herramienta', hi: 'सीखने का टूल' },
        };
        return names[type][language];
    };

    const t = {
        title: { en: 'Resource Library', de: 'Ressourcenbibliothek', fr: 'Bibliothèque de ressources', es: 'Biblioteca de recursos', hi: 'संसाधन लाइब्रेरी' },
        description: { en: 'Explore free books, videos, and tools to boost your learning.', de: 'Entdecke kostenlose Bücher, Videos und Tools, um dein Lernen zu fördern.', fr: 'Explorez des livres, des vidéos et des outils gratuits pour booster votre apprentissage.', es: 'Explora libros, videos y herramientas gratuitas para impulsar tu aprendizaje.', hi: 'अपने सीखने को बढ़ावा देने के लिए मुफ़्त किताबों, वीडियो और टूल खोजें।' },
        search: { en: 'Search resources...', de: 'Ressourcen suchen...', fr: 'Rechercher des ressources...', es: 'Buscar recursos...', hi: 'संसाधन खोजें...' },
        all: { en: 'All', de: 'Alle', fr: 'Tout', es: 'Todo', hi: 'सभी' },
        open: { en: 'Open Resource', de: 'Ressource öffnen', fr: 'Ouvrir la ressource', es: 'Abrir recurso', hi: 'संसाधन खोलें' },
        noResults: { en: 'No resources found.', de: 'Keine Ressourcen gefunden.', fr: 'Aucune ressource trouvée.', es: 'No se encontraron recursos.', hi: 'कोई संसाधन नहीं मिला।' },
    };

    return (
        <div className="space-y-12 max-w-6xl mx-auto p-4 pb-20">
            <div className="relative overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-white shadow-2xl animate-in zoom-in-95 duration-700">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
                <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">
                        <Book className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="font-headline text-5xl font-bold tracking-tight md:text-6xl">{t.title[language]}</h2>
                    <p className="max-w-2xl text-lg font-medium text-white/80">{t.description[language]}</p>
                </div>
            </div>

            <div className="space-y-10">
                <div className="glass flex flex-col items-center justify-between gap-6 rounded-[2rem] p-6 shadow-xl ring-1 ring-black/5 md:flex-row">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                        <Input
                            placeholder={t.search[language]}
                            className="h-14 rounded-2xl border-none bg-white/50 pl-12 text-lg ring-1 ring-black/5 focus-visible:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="w-full md:w-auto">
                        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
                            <TabsList className="bg-white/50 p-1.5 h-14 rounded-2xl ring-1 ring-black/5 flex min-w-max">
                                <TabsTrigger value="all" className="h-full rounded-xl px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white shadow-none">{t.all[language]}</TabsTrigger>
                                <TabsTrigger value="ebook" className="h-full rounded-xl px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white shadow-none">
                                    <Book className="h-4 w-4 mr-2 hidden sm:inline" />
                                    {language === 'hi' ? 'किताबें' : language === 'en' ? 'Books' : language === 'de' ? 'Bücher' : language === 'fr' ? 'Livres' : 'Libros'}
                                </TabsTrigger>
                                <TabsTrigger value="video" className="h-full rounded-xl px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white shadow-none">
                                    <Video className="h-4 w-4 mr-2 hidden sm:inline" />
                                    {language === 'hi' ? 'वीडियो' : language === 'en' ? 'Videos' : 'Video'}
                                </TabsTrigger>
                                <TabsTrigger value="worksheet" className="h-full rounded-xl px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white shadow-none">
                                    <FileText className="h-4 w-4 mr-2 hidden sm:inline" />
                                    {language === 'hi' ? 'वर्कशीट' : language === 'en' ? 'Sheets' : language === 'de' ? 'Foli' : language === 'fr' ? 'Fiches' : 'Fichas'}
                                </TabsTrigger>
                                <TabsTrigger value="tool" className="h-full rounded-xl px-6 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white shadow-none">
                                    <Wrench className="h-4 w-4 mr-2 hidden sm:inline" />
                                    {language === 'hi' ? 'टूल' : language === 'en' ? 'Tools' : 'Outils'}
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </Tabs>
                </div>

                {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResources.map((resource, idx) => (
                            <div
                                key={resource.id}
                                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 transition-opacity group-hover:opacity-100" />

                                <div className="p-8 pb-4">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-1.5 text-[10px] font-bold text-primary uppercase tracking-widest">
                                            {getIcon(resource.type)}
                                            {getTypeName(resource.type)}
                                        </div>
                                        <div className="flex gap-1.5">
                                            {resource.languages.map(lang => (
                                                <span key={lang} className="rounded-lg bg-slate-100 px-2 py-1 text-[9px] font-black uppercase text-slate-400">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="font-headline text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                                        {resource.title[language]}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-muted-foreground">
                                        {resource.description[language]}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 px-8 py-4">
                                    {resource.tags.map(tag => (
                                        <div key={tag} className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            #{tag}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto p-8 pt-4">
                                    <Button asChild className="h-14 w-full rounded-2xl bg-slate-900 text-base font-bold text-white shadow-xl transition-all hover:bg-primary active:scale-95">
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                            {t.open[language]}
                                            <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 p-20 text-center animate-in fade-in duration-500">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                            <Search className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-xl font-bold text-slate-400">{t.noResults[language]}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

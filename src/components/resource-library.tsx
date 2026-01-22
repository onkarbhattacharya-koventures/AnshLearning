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
            ebook: { en: 'E-Book', de: 'E-Book', fr: 'Livre numérique', es: 'Libro electrónico' },
            video: { en: 'Video/Channel', de: 'Video/Kanal', fr: 'Vidéo/Chaîne', es: 'Video/Canal' },
            worksheet: { en: 'Worksheet', de: 'Arbeitsblatt', fr: 'Feuille d\'exercices', es: 'Hoja de trabajo' },
            tool: { en: 'Learning Tool', de: 'Lernwerkzeug', fr: 'Outil d\'apprentissage', es: 'Herramienta' },
        };
        return names[type][language];
    };

    const t = {
        title: { en: 'Resource Library', de: 'Ressourcenbibliothek', fr: 'Bibliothèque de ressources', es: 'Biblioteca de recursos' },
        description: { en: 'Explore free books, videos, and tools to boost your learning.', de: 'Entdecke kostenlose Bücher, Videos und Tools, um dein Lernen zu fördern.', fr: 'Explorez des livres, des vidéos et des outils gratuits pour booster votre apprentissage.', es: 'Explora libros, videos y herramientas gratuitas para impulsar tu aprendizaje.' },
        search: { en: 'Search resources...', de: 'Ressourcen suchen...', fr: 'Rechercher des ressources...', es: 'Buscar recursos...' },
        all: { en: 'All', de: 'Alle', fr: 'Tout', es: 'Todo' },
        open: { en: 'Open Resource', de: 'Ressource öffnen', fr: 'Ouvrir la ressource', es: 'Abrir recurso' },
        noResults: { en: 'No resources found.', de: 'Keine Ressourcen gefunden.', fr: 'Aucune ressource trouvée.', es: 'No se encontraron recursos.' },
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-primary">{t.title[language]}</h2>
                <p className="text-muted-foreground">{t.description[language]}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t.search[language]}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="w-full md:w-auto">
                    <TabsList className="grid grid-cols-5 w-full">
                        <TabsTrigger value="all">{t.all[language]}</TabsTrigger>
                        <TabsTrigger value="ebook"><Book className="h-4 w-4 mr-2 hidden sm:inline" /> {language === 'en' ? 'Books' : language === 'de' ? 'Bücher' : language === 'fr' ? 'Livres' : 'Libros'}</TabsTrigger>
                        <TabsTrigger value="video"><Video className="h-4 w-4 mr-2 hidden sm:inline" /> {language === 'en' ? 'Videos' : 'Video'}</TabsTrigger>
                        <TabsTrigger value="worksheet"><FileText className="h-4 w-4 mr-2 hidden sm:inline" /> {language === 'en' ? 'Worksheets' : language === 'de' ? 'Foli' : language === 'fr' ? 'Fiches' : 'Fichas'}</TabsTrigger>
                        <TabsTrigger value="tool"><Wrench className="h-4 w-4 mr-2 hidden sm:inline" /> {language === 'en' ? 'Tools' : language === 'de' ? 'Tools' : 'Outils'}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="flex flex-col border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5">
                                        {getIcon(resource.type)}
                                        {getTypeName(resource.type)}
                                    </Badge>
                                    <div className="flex gap-1">
                                        {resource.languages.map(lang => (
                                            <span key={lang} className="text-xs font-bold uppercase opacity-50">{lang}</span>
                                        ))}
                                    </div>
                                </div>
                                <CardTitle className="leading-tight text-xl">{resource.title[language]}</CardTitle>
                                <CardDescription className="line-clamp-3 mt-2">{resource.description[language]}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {resource.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 bg-accent/5 p-4 mt-auto">
                                <Button asChild className="w-full group rounded-xl py-6" variant="default">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        {t.open[language]}
                                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-accent/10 rounded-3xl border-2 border-dashed border-accent">
                    <p className="text-muted-foreground font-medium">{t.noResults[language]}</p>
                </div>
            )}
        </div>
    );
}

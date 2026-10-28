import React from 'react';
import { Book, StatusFilter, ReadingStatus } from '../types/book';
import { BookOpen, BookmarkCheck, Clock, CheckCircle2, Search, X } from 'lucide-react';

interface StatsSummaryProps {
  books: Book[];
  currentFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  books,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const total = books.length;
  const queroLerCount = books.filter((b) => b.status === 'quero_ler').length;
  const lendoCount = books.filter((b) => b.status === 'lendo').length;
  const lidoCount = books.filter((b) => b.status === 'lido').length;

  const totalPages = books.reduce((acc, b) => acc + (b.pages || 0), 0);
  const pagesRead = books
    .filter((b) => b.status === 'lido')
    .reduce((acc, b) => acc + (b.pages || 0), 0);

  const filters: { id: StatusFilter; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'todos', label: 'Todos', count: total, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'quero_ler', label: 'Quero ler', count: queroLerCount, icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'lendo', label: 'Lendo', count: lendoCount, icon: <BookmarkCheck className="w-3.5 h-3.5" /> },
    { id: 'lido', label: 'Lido', count: lidoCount, icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Cards de Métricas e Totais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total de Livros */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total na estante</span>
            <BookOpen className="w-4 h-4 text-stone-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {total}
            </span>
            <span className="text-xs text-stone-500 ml-1.5 font-normal">
              {total === 1 ? 'livro' : 'livros'}
            </span>
          </div>
        </div>

        {/* Quero Ler */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Quero ler</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {queroLerCount}
            </span>
            <span className="text-xs text-stone-500 ml-1.5 font-normal">
              planejados
            </span>
          </div>
        </div>

        {/* Lendo Agora */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-sky-700 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Lendo agora</span>
            <BookmarkCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {lendoCount}
            </span>
            <span className="text-xs text-stone-500 ml-1.5 font-normal">
              em progresso
            </span>
          </div>
        </div>

        {/* Já Lidos */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Lidos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                {lidoCount}
              </span>
              <span className="text-xs text-stone-500 ml-1.5 font-normal">
                concluídos
              </span>
            </div>
            {totalPages > 0 && (
              <span className="text-xs text-stone-500 tabular-nums hidden sm:inline">
                {pagesRead} pág. lidas
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-stone-200/80 shadow-xs">
        {/* Abas de Filtro Segmentado */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" role="tablist">
          {filters.map((f) => {
            const isActive = currentFilter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange(f.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                  isActive
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {f.icon}
                <span>{f.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-md tabular-nums font-mono ${
                    isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input de Busca Rápida */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título ou autor..."
            className="w-full h-10 pl-9 pr-8 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Plus, BookOpen, RotateCcw, SearchX } from 'lucide-react';
import { StatusFilter, STATUS_CONFIGS } from '../types/book';

interface EmptyStateProps {
  type: 'no_books_at_all' | 'no_filter_results';
  currentFilter?: StatusFilter;
  searchQuery?: string;
  onOpenAddModal: () => void;
  onResetFilters?: () => void;
  onRestoreSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  currentFilter,
  searchQuery,
  onOpenAddModal,
  onResetFilters,
  onRestoreSamples,
}) => {
  if (type === 'no_books_at_all') {
    return (
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden text-center p-8 sm:p-12 max-w-2xl mx-auto my-8">
        {/* Imagem Acolhedora Gerada */}
        <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm border border-stone-100 bg-stone-100">
          <img
            src="/src/assets/images/bookshelf_cozy_shelf_1793207623048.jpg"
            alt="Ilustração de uma estante de livros acolhedora"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Sua estante ainda está vazia
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
          Que tal dar o primeiro passo na sua rotina de leitura? Adicione o livro que você está lendo agora ou que planeja começar em breve.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-amber-800 text-stone-50 font-medium text-sm hover:bg-amber-900 active:scale-[0.98] transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar primeiro livro</span>
          </button>

          {onRestoreSamples && (
            <button
              type="button"
              onClick={onRestoreSamples}
              className="inline-flex items-center gap-2 h-11 px-4 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-sm font-medium transition-colors"
              title="Carregar livros clássicos de exemplo"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ver exemplos de livros</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Estado quando a busca ou filtro por status não encontrou resultados
  const statusLabel =
    currentFilter && currentFilter !== 'todos'
      ? STATUS_CONFIGS[currentFilter]?.label
      : null;

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-10 sm:p-14 text-center max-w-xl mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-7 h-7" />
      </div>

      <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
        Nenhum livro encontrado
      </h3>

      <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
        {searchQuery ? (
          <>
            Não encontramos resultados para a busca{' '}
            <strong className="text-stone-800 font-semibold">"{searchQuery}"</strong>
            {statusLabel ? ` no filtro "${statusLabel}".` : '.'}
          </>
        ) : (
          <>
            Você ainda não tem nenhum livro com o status{' '}
            <strong className="text-stone-800 font-semibold">"{statusLabel}"</strong>.
          </>
        )}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="h-10 px-5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-medium transition-colors"
          >
            Ver todos os livros
          </button>
        )}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-amber-800 text-stone-50 font-medium text-sm hover:bg-amber-900 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar novo livro</span>
        </button>
      </div>
    </div>
  );
};

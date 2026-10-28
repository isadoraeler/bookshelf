import React from 'react';
import { BookMarked, Plus, Library } from 'lucide-react';

interface HeaderProps {
  totalBooks: number;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ totalBooks, onOpenAddModal }) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Marca / Identidade */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-700 text-amber-50 flex items-center justify-center shadow-sm">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
                BookShelf
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Organizador pessoal de leituras
            </p>
          </div>
        </div>

        {/* Ação Primária de Cadastro */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center justify-center gap-2 h-11 px-4 sm:px-5 rounded-xl bg-amber-800 text-stone-50 font-medium text-sm shadow-sm hover:bg-amber-900 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            aria-label="Cadastrar novo livro"
          >
            <Plus className="w-4 h-4" />
            <span className="whitespace-nowrap">Cadastrar livro</span>
          </button>
        </div>
      </div>
    </header>
  );
};

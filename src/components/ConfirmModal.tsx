import React, { useEffect } from 'react';
import { Book } from '../types/book';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  book: Book | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  book,
  onCancel,
  onConfirm,
}) => {
  // Fecha com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
          aria-label="Fechar diálogo"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <Trash2 className="w-6 h-6" />
          </div>

          <div className="flex-1 pr-6">
            <h3 id="confirm-title" className="font-serif text-lg font-bold text-stone-900 leading-snug">
              Excluir livro da estante?
            </h3>
            <p id="confirm-desc" className="text-sm text-stone-600 mt-2">
              Você tem certeza de que deseja remover o livro{' '}
              <strong className="text-stone-900 font-semibold font-serif">
                "{book.title}"
              </strong>
              {book.author ? ` de ${book.author}` : ''}?
            </p>
            <p className="text-xs text-stone-500 mt-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              Esta ação excluirá o livro e não poderá ser desfeita.
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 px-4 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
            autoFocus
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 px-5 rounded-xl text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Sim, excluir livro</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Book, ReadingStatus, STATUS_CONFIGS } from '../types/book';
import { Pencil, Trash2, BookOpen, User, Check, Clock, BookmarkCheck } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDeleteRequest: (book: Book) => void;
  onQuickStatusChange: (id: string, newStatus: ReadingStatus) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDeleteRequest,
  onQuickStatusChange,
}) => {
  const currentStatusConfig = STATUS_CONFIGS[book.status];

  // Cores de capa/lombada elegantes baseadas no status
  const coverGradients: Record<ReadingStatus, string> = {
    quero_ler: 'from-amber-700/90 to-amber-900',
    lendo: 'from-sky-700/90 to-indigo-900',
    lido: 'from-emerald-700/90 to-teal-900',
  };

  const statusIcons: Record<ReadingStatus, React.ReactNode> = {
    quero_ler: <Clock className="w-3.5 h-3.5" />,
    lendo: <BookmarkCheck className="w-3.5 h-3.5" />,
    lido: <Check className="w-3.5 h-3.5" />,
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Faixa superior estética tipo cabeçalho de livro / marcador */}
        <div className={`h-2.5 w-full bg-gradient-to-r ${coverGradients[book.status]}`} />

        <div className="p-5">
          {/* Status e Ações Rápidas */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Status sem pílula genérica - formato limpo e com significado */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${currentStatusConfig.bgLight} ${currentStatusConfig.color} ${currentStatusConfig.borderLight}`}
              title={currentStatusConfig.description}
            >
              {statusIcons[book.status]}
              <span>{currentStatusConfig.label}</span>
            </div>

            {/* Ações de Edição e Exclusão */}
            <div className="flex items-center gap-1 text-stone-400">
              <button
                type="button"
                onClick={() => onEdit(book)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-amber-800"
                title="Editar este livro"
                aria-label={`Editar livro ${book.title}`}
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onDeleteRequest(book)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-rose-700 hover:bg-rose-50 transition-colors focus-visible:outline-2 focus-visible:outline-rose-600"
                title="Excluir este livro"
                aria-label={`Excluir livro ${book.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Título do Livro */}
          <h3
            className="font-serif text-lg font-bold text-stone-900 leading-snug line-clamp-2 mb-2 group-hover:text-amber-900 transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Autor */}
          <div className="flex items-center gap-1.5 text-sm text-stone-600 mb-4">
            <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{book.author}</span>
          </div>

          {/* Metadados: Páginas e formato */}
          <div className="flex items-center gap-2 text-xs text-stone-500 pt-3 border-t border-stone-100">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <strong className="font-semibold text-stone-700 tabular-nums font-mono">
                {book.pages}
              </strong>
              <span>páginas</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-400">
              {book.status === 'lido' ? 'Concluído' : book.status === 'lendo' ? 'Em leitura' : 'Na fila'}
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Mudança Rápida de Status */}
      <div className="px-5 py-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between text-xs">
        <label htmlFor={`quick-status-${book.id}`} className="text-stone-500 font-medium">
          Mover para:
        </label>
        <select
          id={`quick-status-${book.id}`}
          value={book.status}
          onChange={(e) => onQuickStatusChange(book.id, e.target.value as ReadingStatus)}
          className="text-xs bg-white text-stone-700 border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-700 cursor-pointer font-medium"
        >
          <option value="quero_ler">Quero ler</option>
          <option value="lendo">Lendo</option>
          <option value="lido">Lido</option>
        </select>
      </div>
    </article>
  );
};

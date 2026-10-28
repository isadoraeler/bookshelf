import React, { useState, useEffect } from 'react';
import { Book, BookFormData, ReadingStatus, STATUS_CONFIGS } from '../types/book';
import { X, BookOpen, User, Hash, BookmarkCheck, Clock, CheckCircle2 } from 'lucide-react';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; author: string; pages: number; status: ReadingStatus }) => void;
  initialData?: Book | null;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<string>('');
  const [status, setStatus] = useState<ReadingStatus>('quero_ler');

  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    pages?: string;
  }>({});

  // Atualiza os campos quando abrir em modo de edição ou criação
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setPages(String(initialData.pages));
      setStatus(initialData.status);
    } else {
      setTitle('');
      setAuthor('');
      setPages('');
      setStatus('quero_ler');
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Fecha no Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { title?: string; author?: string; pages?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Por favor, informe o título do livro.';
    }

    if (!author.trim()) {
      newErrors.author = 'Por favor, informe o nome do autor ou autora.';
    }

    const pagesNum = Number(pages);
    if (!pages || isNaN(pagesNum) || pagesNum <= 0 || !Number.isInteger(pagesNum)) {
      newErrors.pages = 'Informe um número de páginas válido (inteiro maior que 0).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      pages: parseInt(pages, 10),
      status,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="font-serif text-lg font-bold text-stone-900">
                {isEditing ? 'Editar Livro' : 'Cadastrar Novo Livro'}
              </h2>
              <p className="text-xs text-stone-500">
                {isEditing
                  ? 'Atualize os dados e o status da sua leitura'
                  : 'Preencha as informações para adicionar à sua estante'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
            aria-label="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Campo: Título */}
          <div>
            <label htmlFor="book-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Título do livro <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="book-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="Ex: Cem Anos de Solidão"
                className={`w-full h-11 px-3.5 text-sm bg-stone-50 border rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.title
                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-stone-200 focus:ring-amber-700/20 focus:border-amber-700'
                }`}
                autoFocus
              />
            </div>
            {errors.title && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Campo: Autor */}
          <div>
            <label htmlFor="book-author" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Autor ou Autora <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="book-author"
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
                }}
                placeholder="Ex: Gabriel García Márquez"
                className={`w-full h-11 px-3.5 text-sm bg-stone-50 border rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.author
                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-stone-200 focus:ring-amber-700/20 focus:border-amber-700'
                }`}
              />
            </div>
            {errors.author && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.author}</p>
            )}
          </div>

          {/* Campo: Número de Páginas */}
          <div>
            <label htmlFor="book-pages" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Número de páginas <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="book-pages"
                type="number"
                min="1"
                step="1"
                value={pages}
                onChange={(e) => {
                  setPages(e.target.value);
                  if (errors.pages) setErrors((prev) => ({ ...prev, pages: undefined }));
                }}
                placeholder="Ex: 448"
                className={`w-full h-11 px-3.5 text-sm bg-stone-50 border rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors tabular-nums ${
                  errors.pages
                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-stone-200 focus:ring-amber-700/20 focus:border-amber-700'
                }`}
              />
            </div>
            {errors.pages && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.pages}</p>
            )}
          </div>

          {/* Campo: Status de Leitura */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Status de leitura <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Opção Quero ler */}
              <button
                type="button"
                onClick={() => setStatus('quero_ler')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                  status === 'quero_ler'
                    ? 'border-amber-700 bg-amber-50/80 ring-2 ring-amber-700/20 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Clock className={`w-4 h-4 ${status === 'quero_ler' ? 'text-amber-700' : 'text-stone-400'}`} />
                  {status === 'quero_ler' && (
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold block">Quero ler</span>
                  <span className="text-[10px] text-stone-500 line-clamp-1">Planejado</span>
                </div>
              </button>

              {/* Opção Lendo */}
              <button
                type="button"
                onClick={() => setStatus('lendo')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                  status === 'lendo'
                    ? 'border-sky-700 bg-sky-50/80 ring-2 ring-sky-700/20 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <BookmarkCheck className={`w-4 h-4 ${status === 'lendo' ? 'text-sky-700' : 'text-stone-400'}`} />
                  {status === 'lendo' && (
                    <span className="w-2 h-2 rounded-full bg-sky-700" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold block">Lendo</span>
                  <span className="text-[10px] text-stone-500 line-clamp-1">Em andamento</span>
                </div>
              </button>

              {/* Opção Lido */}
              <button
                type="button"
                onClick={() => setStatus('lido')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                  status === 'lido'
                    ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-700/20 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${status === 'lido' ? 'text-emerald-700' : 'text-stone-400'}`} />
                  {status === 'lido' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-700" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-semibold block">Lido</span>
                  <span className="text-[10px] text-stone-500 line-clamp-1">Concluído</span>
                </div>
              </button>
            </div>
          </div>

          {/* Rodapé e Botões de Ação */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-4 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-11 px-6 rounded-xl text-sm font-medium bg-amber-800 text-stone-50 hover:bg-amber-900 shadow-sm active:scale-[0.98] transition-all"
            >
              {isEditing ? 'Salvar alterações' : 'Cadastrar livro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

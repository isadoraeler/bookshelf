import React, { useState, useEffect, useMemo } from 'react';
import { Book, ReadingStatus, StatusFilter } from './types/book';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { StatsSummary } from './components/StatsSummary';
import { BookCard } from './components/BookCard';
import { BookFormModal } from './components/BookFormModal';
import { ConfirmModal } from './components/ConfirmModal';
import { EmptyState } from './components/EmptyState';
import { Toast, ToastMessage } from './components/Toast';
import { Sparkles, Library } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentFilter, setCurrentFilter] = useState<StatusFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados de modais e interações
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Carrega livros do localStorage na montagem
  useEffect(() => {
    const loaded = storageService.getBooks();
    setBooks(loaded);
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: String(Date.now()),
      type,
      text,
    });
  };

  // Abre modal para cadastrar novo livro
  const handleOpenAddModal = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  // Abre modal para editar livro existente
  const handleOpenEditModal = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  // Salva inclusão ou edição
  const handleFormSubmit = (data: {
    title: string;
    author: string;
    pages: number;
    status: ReadingStatus;
  }) => {
    if (editingBook) {
      const updated = storageService.updateBook(editingBook.id, data);
      if (updated) {
        setBooks(storageService.getBooks());
        showToast(`"${updated.title}" foi atualizado com sucesso!`);
      }
    } else {
      const created = storageService.addBook(data);
      setBooks(storageService.getBooks());
      showToast(`"${created.title}" foi adicionado à sua estante!`);
    }
  };

  // Solicita exclusão com confirmação
  const handleRequestDelete = (book: Book) => {
    setBookToDelete(book);
  };

  // Confirmação final da exclusão
  const handleConfirmDelete = () => {
    if (!bookToDelete) return;
    const bookTitle = bookToDelete.title;
    const success = storageService.deleteBook(bookToDelete.id);
    if (success) {
      setBooks(storageService.getBooks());
      showToast(`"${bookTitle}" foi removido da estante.`, 'info');
    }
    setBookToDelete(null);
  };

  // Mudança rápida de status direto no cartão
  const handleQuickStatusChange = (id: string, newStatus: ReadingStatus) => {
    const updated = storageService.updateBook(id, { status: newStatus });
    if (updated) {
      setBooks(storageService.getBooks());
      const statusNames: Record<ReadingStatus, string> = {
        quero_ler: 'Quero ler',
        lendo: 'Lendo',
        lido: 'Lido',
      };
      showToast(`Status alterado para "${statusNames[newStatus]}".`);
    }
  };

  // Restaurar livros de exemplo
  const handleRestoreSamples = () => {
    const samples = storageService.resetToSamples();
    setBooks(samples);
    setCurrentFilter('todos');
    setSearchQuery('');
    showToast('Livros de exemplo restaurados com sucesso!');
  };

  // Filtragem e busca de livros
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Filtro por status
      if (currentFilter !== 'todos' && book.status !== currentFilter) {
        return false;
      }
      // Filtro por termo de busca
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        return matchTitle || matchAuthor;
      }
      return true;
    });
  }, [books, currentFilter, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Topo da Aplicação */}
      <Header
        totalBooks={books.length}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Painel de Estatísticas e Filtros */}
        <StatsSummary
          books={books}
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Seção da Estante de Livros */}
        <section aria-labelledby="shelf-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="shelf-heading" className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Minha Estante
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {filteredBooks.length === 1
                  ? '1 livro exibido'
                  : `${filteredBooks.length} livros exibidos`}
                {books.length > 0 && ` (de um total de ${books.length})`}
              </p>
            </div>
          </div>

          {/* Renderização Condicional: Vazia vs Lista de Livros */}
          {books.length === 0 ? (
            <EmptyState
              type="no_books_at_all"
              onOpenAddModal={handleOpenAddModal}
              onRestoreSamples={handleRestoreSamples}
            />
          ) : filteredBooks.length === 0 ? (
            <EmptyState
              type="no_filter_results"
              currentFilter={currentFilter}
              searchQuery={searchQuery}
              onOpenAddModal={handleOpenAddModal}
              onResetFilters={() => {
                setCurrentFilter('todos');
                setSearchQuery('');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleOpenEditModal}
                  onDeleteRequest={handleRequestDelete}
                  onQuickStatusChange={handleQuickStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="border-t border-stone-200 bg-white/60 py-8 px-4 text-center mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Library className="w-4 h-4 text-amber-700" />
            <span className="font-serif font-semibold text-stone-800">BookShelf</span>
            <span>·</span>
            <span>Organizador de leituras simples e descomplicado</span>
          </div>
          <p className="italic font-serif text-stone-600">
            "Um livro é um sonho que você segura em suas mãos."
          </p>
        </div>
      </footer>

      {/* Modal de Formulário (Cadastro / Edição) */}
      <BookFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingBook}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={Boolean(bookToDelete)}
        book={bookToDelete}
        onCancel={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Notificação Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

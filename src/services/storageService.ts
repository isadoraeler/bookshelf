import { Book, ReadingStatus } from '../types/book';

const STORAGE_KEY = 'bookshelf_livros_v1';

// Livros de exemplo acolhedores para a primeira visita do leitor
const DEFAULT_SAMPLE_BOOKS: Book[] = [
  {
    id: 'sample-1',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    pages: 96,
    status: 'lido',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    pages: 256,
    status: 'lendo',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'sample-3',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    pages: 144,
    status: 'quero_ler',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
];

export const storageService = {
  /**
   * Recupera a lista de livros do localStorage.
   * Se for o primeiro acesso da pessoa, inicializa com livros de exemplo.
   */
  getBooks(): Book[] {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (rawData === null) {
        // Primeira vez acessando: salva os exemplos iniciais
        this.saveBooks(DEFAULT_SAMPLE_BOOKS);
        return DEFAULT_SAMPLE_BOOKS;
      }
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao recuperar livros do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista completa de livros no localStorage.
   */
  saveBooks(books: Book[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Erro ao salvar livros no localStorage:', error);
    }
  },

  /**
   * Cadastra um novo livro na estante.
   */
  addBook(data: {
    title: string;
    author: string;
    pages: number;
    status: ReadingStatus;
  }): Book {
    const books = this.getBooks();
    const newBook: Book = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `book-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: data.title.trim(),
      author: data.author.trim(),
      pages: Number(data.pages),
      status: data.status,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBook, ...books];
    this.saveBooks(updated);
    return newBook;
  },

  /**
   * Atualiza as informações de um livro existente.
   */
  updateBook(
    id: string,
    updates: Partial<Omit<Book, 'id' | 'createdAt'>>
  ): Book | null {
    const books = this.getBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const existing = books[index];
    const updatedBook: Book = {
      ...existing,
      ...updates,
      title: updates.title !== undefined ? updates.title.trim() : existing.title,
      author: updates.author !== undefined ? updates.author.trim() : existing.author,
      pages: updates.pages !== undefined ? Number(updates.pages) : existing.pages,
      updatedAt: new Date().toISOString(),
    };

    books[index] = updatedBook;
    this.saveBooks(books);
    return updatedBook;
  },

  /**
   * Remove um livro da estante por ID.
   */
  deleteBook(id: string): boolean {
    const books = this.getBooks();
    const filtered = books.filter((b) => b.id !== id);
    if (filtered.length === books.length) {
      return false;
    }
    this.saveBooks(filtered);
    return true;
  },

  /**
   * Restaura os livros de exemplo (útil para testes).
   */
  resetToSamples(): Book[] {
    this.saveBooks(DEFAULT_SAMPLE_BOOKS);
    return DEFAULT_SAMPLE_BOOKS;
  },

  /**
   * Limpa todos os livros da estante.
   */
  clearAll(): void {
    this.saveBooks([]);
  },
};

export type ReadingStatus = 'quero_ler' | 'lendo' | 'lido';

export interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  status: ReadingStatus;
  createdAt: string;
  updatedAt?: string;
}

export type BookFormData = {
  title: string;
  author: string;
  pages: number | '';
  status: ReadingStatus;
};

export type StatusFilter = 'todos' | ReadingStatus;

export interface StatusConfig {
  label: string;
  color: string;
  bgLight: string;
  borderLight: string;
  description: string;
}

export const STATUS_CONFIGS: Record<ReadingStatus, StatusConfig> = {
  quero_ler: {
    label: 'Quero ler',
    color: 'text-amber-800 dark:text-amber-300',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-900/50',
    description: 'Na lista de desejos para iniciar em breve',
  },
  lendo: {
    label: 'Lendo',
    color: 'text-sky-800 dark:text-sky-300',
    bgLight: 'bg-sky-50 dark:bg-sky-950/40',
    borderLight: 'border-sky-200 dark:border-sky-900/50',
    description: 'Leitura em andamento neste momento',
  },
  lido: {
    label: 'Lido',
    color: 'text-emerald-800 dark:text-emerald-300',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200 dark:border-emerald-900/50',
    description: 'Leitura finalizada com sucesso',
  },
};

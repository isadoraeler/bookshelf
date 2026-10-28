# 📚 BookShelf

Aplicação web simples para quem está começando a organizar suas leituras. Cadastre livros, acompanhe o que quer ler, está lendo ou já leu, e mantenha tudo salvo no próprio navegador.

Projeto criado com o **Google AI Studio** durante a Imersão da Alura "Engenharia de Software: Dev na era da IA".

## ✨ Funcionalidades

- **Cadastro de livros** com título, autor, número de páginas e status de leitura (*Quero ler*, *Lendo*, *Lido*)
- **Listagem em cartões**, com identificação visual de cada status
- **Edição** de qualquer livro, incluindo troca rápida de status direto no cartão
- **Exclusão com confirmação**, para evitar remoções acidentais
- **Contadores** com o total de livros, a quantidade por status e o total de páginas
- **Busca por título ou autor** e **filtro por status**
- **Mensagens amigáveis** quando a estante está vazia ou quando a busca não encontra resultados
- **Notificações (toasts)** ao adicionar, editar ou excluir
- **Persistência no `localStorage`**: os dados continuam lá depois de atualizar ou fechar a página
- **Interface responsiva** e com textos em português do Brasil

## 🛠️ Tecnologias

- TypeScript
- React (componentes `.tsx`)
- `localStorage` para armazenamento (sem backend nesta primeira versão)
- Fontes Lora e Plus Jakarta Sans

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── Header.tsx           # Topo da aplicação e botão de novo livro
│   ├── StatsSummary.tsx     # Contadores, busca e filtros
│   ├── BookCard.tsx         # Cartão de cada livro
│   ├── BookFormModal.tsx    # Formulário de cadastro e edição
│   ├── ConfirmModal.tsx     # Confirmação de exclusão
│   ├── EmptyState.tsx       # Estados vazios
│   └── Toast.tsx            # Notificações
├── services/
│   └── storageService.ts    # Leitura e escrita no localStorage
├── types/
│   └── book.ts              # Tipos: Book, ReadingStatus, BookFormData
├── App.tsx
└── index.css
```

## 🚀 Como rodar localmente

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# clonar o repositório
git clone https://github.com/isadoraeler/bookshelf.git
cd bookshelf

# instalar as dependências
npm install

# iniciar o servidor de desenvolvimento
npm run dev
```

Depois, abra o endereço que aparecer no terminal (normalmente `http://localhost:3000` ou `http://localhost:5173`).

## 🧪 Como testar

- Cadastre um livro e confirme que ele aparece na lista
- Tente salvar sem título ou autor, ou com páginas inválidas (zero, negativo ou texto)
- Edite um livro e mude o status de *Quero ler* para *Lendo* e depois *Lido*
- Cancele uma edição e confirme que os dados originais foram mantidos
- Exclua um livro confirmando, e depois tente excluir cancelando na confirmação
- Atualize a página (F5) e confira se os livros continuam salvos

## 🗺️ Próximos passos

- [ ] Registrar o progresso de leitura (página atual)
- [ ] Adicionar nota ou avaliação em cada livro
- [ ] Exportar e importar a estante

## 👩‍💻 Autora

Feito por **Isadora Roosevelt Eler** — [@isadoraeler](https://github.com/isadoraeler)

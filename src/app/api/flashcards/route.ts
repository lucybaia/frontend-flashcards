import { NextResponse } from 'next/server';
import { Flashcard } from '@/types';

// Simulando um banco de dados local
const flashcards: Flashcard[] = [
  // --- HTML & CSS BÁSICO ---
  { id: '1', category: 'Frontend', difficulty: 'trainee', front: 'O que significa a sigla HTML?', back: 'HyperText Markup Language.', isFlipped: false },
  { id: '2', category: 'Frontend', difficulty: 'trainee', front: 'Para que serve a tag <head>?', back: 'Para conter metadados sobre o documento, como título e links para scripts/estilos.', isFlipped: false },
  { id: '3', category: 'Frontend', difficulty: 'trainee', front: 'Qual a diferença entre padding e margin?', back: 'Padding é o espaço interno; Margin é o espaço externo ao elemento.', isFlipped: false },
  { id: '4', category: 'Frontend', difficulty: 'trainee', front: 'O que é o Box Model no CSS?', back: 'É a estrutura de todo elemento: Content, Padding, Border e Margin.', isFlipped: false },
  { id: '5', category: 'Frontend', difficulty: 'trainee', front: 'Como centralizar um elemento com Flexbox?', back: 'display: flex; justify-content: center; align-items: center;', isFlipped: false },

  // --- JAVASCRIPT FUNDAMENTOS ---
  { id: '6', category: 'Frontend', difficulty: 'trainee', front: 'O que é uma Arrow Function?', back: 'Uma sintaxe curta para funções usando =>, que não possui seu próprio "this".', isFlipped: false },
  { id: '7', category: 'Frontend', difficulty: 'trainee', front: 'Qual a diferença entre let e const?', back: 'let permite reatribuição; const cria uma ligação que não pode ser reatribuída.', isFlipped: false },
  { id: '8', category: 'Frontend', difficulty: 'trainee', front: 'O que é o DOM?', back: 'Document Object Model: uma interface que representa o HTML como uma árvore de objetos.', isFlipped: false },
  { id: '9', category: 'Frontend', difficulty: 'trainee', front: 'Para que serve o método map()?', back: 'Para criar um novo array percorrendo e transformando cada item do original.', isFlipped: false },
  { id: '10', category: 'Frontend', difficulty: 'trainee', front: 'O que é uma Promise?', back: 'Um objeto que representa o sucesso ou falha eventual de uma operação assíncrona.', isFlipped: false },

  // --- REACT & NEXT.JS (Abaixo do Capô) ---
  { id: '11', category: 'Frontend', difficulty: 'trainee', front: 'O que é um Componente em React?', back: 'Uma função JavaScript que retorna JSX e representa uma parte da interface.', isFlipped: false },
  { id: '12', category: 'Frontend', difficulty: 'trainee', front: 'Para que serve o hook useState?', back: 'Para adicionar e gerenciar estados em componentes funcionais.', isFlipped: false },
  { id: '13', category: 'Frontend', difficulty: 'trainee', front: 'O que é JSX?', back: 'Uma extensão de sintaxe que permite escrever HTML dentro do JavaScript.', isFlipped: false },
  { id: '14', category: 'Frontend', difficulty: 'trainee', front: 'Para que serve o hook useEffect?', back: 'Para lidar com efeitos colaterais, como chamadas de API ou subscrições.', isFlipped: false },
  { id: '15', category: 'Frontend', difficulty: 'trainee', front: 'O que é o Virtual DOM?', back: 'Uma cópia leve do DOM real usada pelo React para otimizar atualizações.', isFlipped: false },
  { id: '16', category: 'Frontend', difficulty: 'trainee', front: 'O que são Props?', back: 'Propriedades passadas de um componente pai para um filho.', isFlipped: false },
  { id: '17', category: 'Frontend', difficulty: 'trainee', front: 'No Next.js, o que faz a pasta "app"?', back: 'Define as rotas e layouts da aplicação usando o App Router.', isFlipped: false },

  // --- TAILWIND & ESTILIZAÇÃO ---
  { id: '18', category: 'Frontend', difficulty: 'trainee', front: 'O que é o Tailwind CSS?', back: 'Um framework CSS utilitário que permite estilizar via classes no HTML.', isFlipped: false },
  { id: '19', category: 'Frontend', difficulty: 'trainee', front: 'Como aplicar um estado de hover no Tailwind?', back: 'Usando o prefixo hover: (ex: hover:bg-blue-500).', isFlipped: false },
  { id: '20', category: 'Frontend', difficulty: 'trainee', front: 'O que significa Mobile-First?', back: 'Estilizar primeiro para telas pequenas e depois adicionar media queries para telas maiores.', isFlipped: false },

  // --- AVANÇADO / RECENTE ---
  { id: '21', category: 'Frontend', difficulty: 'trainee', front: 'Para que serve o "use client" no Next.js?', back: 'Para marcar um componente como Client Component, permitindo o uso de hooks.', isFlipped: false },
  { id: '22', category: 'Frontend', difficulty: 'trainee', front: 'O que o React Compiler faz automaticamente?', back: 'Automatiza a memoização de componentes e valores, eliminando a necessidade de useMemo/useCallback manual.', isFlipped: false },
  { id: '23', category: 'Frontend', difficulty: 'trainee', front: 'Qual a vantagem da Fetch API sobre o XMLHttpRequest?', back: 'Sintaxe mais limpa baseada em Promises e melhor integração com a web moderna.', isFlipped: false },
  { id: '24', category: 'Frontend', difficulty: 'trainee', front: 'O que é um SPA (Single Page Application)?', back: 'Um app que carrega uma única página e atualiza o conteúdo dinamicamente sem recarregar.', isFlipped: false },
  { id: '25', category: 'Frontend', difficulty: 'trainee', front: 'Para que servem os arquivos .env?', back: 'Para armazenar variáveis de ambiente e chaves secretas com segurança.', isFlipped: false },

  // --- REACT AVANÇADO & HOOKS ---
  { id: '26', category: 'Frontend', difficulty: 'pleno', front: 'Qual a diferença entre useMemo e useCallback?', back: 'useMemo armazena o resultado de uma função; useCallback armazena a própria definição da função.', isFlipped: false },
  { id: '27', category: 'Frontend', difficulty: 'junior', front: 'O que é "Prop Drilling" e como evitá-lo?', back: 'É passar props por vários níveis de componentes; evita-se com Context API ou estados globais (Zustand/Redux).', isFlipped: false },
  { id: '28', category: 'Frontend', difficulty: 'junior', front: 'Para que serve o hook useRef?', back: 'Para acessar elementos do DOM diretamente ou persistir valores que não disparam renderização.', isFlipped: false },
  { id: '29', category: 'Frontend', difficulty: 'pleno', front: 'O que faz o hook useReducer?', back: 'Uma alternativa ao useState para estados complexos, usando uma lógica de "action" e "dispatch" semelhante ao Redux.', isFlipped: false },
  { id: '30', category: 'Frontend', difficulty: 'pleno', front: 'O que são Higher-Order Components (HOC)?', back: 'Funções que recebem um componente e retornam um novo componente com funcionalidades adicionais.', isFlipped: false },

  // --- NEXT.JS & PERFORMANCE ---
  { id: '31', category: 'Frontend', difficulty: 'junior', front: 'Qual a diferença entre SSR (Server-Side Rendering) e SSG (Static Site Generation)?', back: 'SSR renderiza a página a cada requisição; SSG gera o HTML no momento do build.', isFlipped: false },
  { id: '32', category: 'Frontend', difficulty: 'pleno', front: 'O que é ISR (Incremental Static Regeneration)?', back: 'Permite atualizar páginas estáticas após o build, sem precisar regerar todo o site.', isFlipped: false },
  { id: '33', category: 'Frontend', difficulty: 'junior', front: 'Como o Next.js otimiza imagens com o componente <Image>?', back: 'Redimensiona automaticamente, converte para WebP e usa lazy loading nativo.', isFlipped: false },
  { id: '34', category: 'Frontend', difficulty: 'pleno', front: 'O que é Hydration em frameworks como React/Next?', back: 'O processo onde o JavaScript do cliente "assume" o HTML estático enviado pelo servidor para torná-lo interativo.', isFlipped: false },
  { id: '35', category: 'Frontend', difficulty: 'pleno', front: 'Para que serve a técnica de Code Splitting?', back: 'Para quebrar o bundle do JS em pedaços menores, carregando apenas o que é necessário para a página atual.', isFlipped: false },

  // --- JAVASCRIPT & TYPESCRIPT ---
  { id: '36', category: 'Frontend', difficulty: 'junior', front: 'O que é Closures em JavaScript?', back: 'Quando uma função "lembra" do seu escopo léxico, mesmo quando executada fora dele.', isFlipped: false },
  { id: '37', category: 'Frontend', difficulty: 'junior', front: 'Qual a diferença entre Interfaces e Types no TypeScript?', back: 'Interfaces são extensíveis (declaration merging); Types são mais flexíveis para uniões e tipos complexos.', isFlipped: false },
  { id: '38', category: 'Frontend', difficulty: 'junior', front: 'O que faz o operador Optional Chaining (?.) ?', back: 'Permite ler valores de propriedades aninhadas sem erro se uma referência for null ou undefined.', isFlipped: false },
  { id: '39', category: 'Frontend', difficulty: 'junior', front: 'O que é Event Delegation?', back: 'Atribuir um único event listener a um pai para gerenciar eventos de múltiplos filhos (melhora performance).', isFlipped: false },
  { id: '40', category: 'Frontend', difficulty: 'pleno', front: 'Para que serve Generics no TypeScript?', back: 'Para criar componentes ou funções que aceitam diferentes tipos, mantendo a tipagem segura.', isFlipped: false },

  // --- CSS ARQUITETURA & FERRAMENTAS ---
  { id: '41', category: 'Frontend', difficulty: 'junior', front: 'O que são CSS Variables (Custom Properties)?', back: 'Valores definidos no CSS que podem ser reutilizados e alterados dinamicamente via JS.', isFlipped: false },
  { id: '42', category: 'Frontend', difficulty: 'junior', front: 'Qual a vantagem de usar Componentes de UI "Headless" (ex: Radix UI)?', back: 'Oferecem a lógica e acessibilidade prontas, deixando o estilo 100% por sua conta.', isFlipped: false },
  { id: '43', category: 'Frontend', difficulty: 'junior', front: 'O que é Specificity (Especificidade) no CSS?', back: 'O sistema de pesos que o navegador usa para decidir qual regra de estilo vence.', isFlipped: false },

  // --- WEB APIS & SEGURANÇA ---
  { id: '44', category: 'Frontend', difficulty: 'junior', front: 'O que é o LocalStorage e qual seu limite médio?', back: 'Armazenamento persistente no navegador, geralmente com limite de 5MB a 10MB.', isFlipped: false },
  { id: '45', category: 'Frontend', difficulty: 'junior', front: 'Qual a diferença entre Cookies e SessionStorage?', back: 'Cookies podem ser enviados ao servidor; SessionStorage é limpo quando a aba fecha.', isFlipped: false },
  { id: '46', category: 'Frontend', difficulty: 'junior', front: 'O que é CORS (Cross-Origin Resource Sharing)?', back: 'Um mecanismo de segurança que restringe quais domínios podem acessar recursos de um servidor.', isFlipped: false },
  { id: '47', category: 'Frontend', difficulty: 'junior', front: 'Para que serve o atributo "async" e "defer" em scripts?', back: 'Async executa assim que o arquivo é baixado; Defer executa apenas após o HTML ser processado.', isFlipped: false },

  // --- TESTES & QUALIDADE ---
  { id: '48', category: 'Frontend', difficulty: 'junior', front: 'Qual a diferença entre Teste Unitário e Teste de Integração?', back: 'Unitário testa uma função/componente isolado; Integração testa o fluxo entre várias partes.', isFlipped: false },
  { id: '49', category: 'Frontend', difficulty: 'junior', front: 'O que é Acessibilidade (a11y) no Frontend?', back: 'Garantir que pessoas com deficiência consigam navegar usando leitores de tela e teclado.', isFlipped: false },
  { id: '50', category: 'Frontend', difficulty: 'pleno', front: 'Para que servem os arquivos de definição de tipos (.d.ts)?', back: 'Para fornecer tipagem a bibliotecas JavaScript que não foram escritas em TypeScript.', isFlipped: false },

  // --- ARQUITETURA & PERFORMANCE CRÍTICA ---
  { id: '51', category: 'Frontend', difficulty: 'senior', front: 'O que é o padrão de design "Island Architecture"?', back: 'Uma técnica onde apenas os componentes interativos (ilhas) carregam JS, enquanto o resto é HTML estático.', isFlipped: false },
  { id: '52', category: 'Frontend', difficulty: 'pleno', front: 'O que é "Tree Shaking" no processo de build?', back: 'A remoção automática de código morto (não utilizado) para diminuir o tamanho final do bundle.', isFlipped: false },
  { id: '53', category: 'Frontend', difficulty: 'pleno', front: 'Explique o conceito de "Cumulative Layout Shift" (CLS) no Core Web Vitals.', back: 'Mede a estabilidade visual da página; ocorre quando elementos mudam de lugar inesperadamente durante o carregamento.', isFlipped: false },
  { id: '54', category: 'Frontend', difficulty: 'senior', front: 'O que são "Micro-frontends" e qual seu principal objetivo?', back: 'Arquitetura que divide o frontend em partes independentes desenvolvidas por times diferentes, visando escalabilidade.', isFlipped: false },
  { id: '55', category: 'Frontend', difficulty: 'pleno', front: 'Como funciona o algoritmo de "Reconciliation" do React?', back: 'É o processo de comparar o Virtual DOM antigo com o novo para aplicar apenas as mudanças necessárias no DOM real.', isFlipped: false },

  // --- SEGURANÇA WEB AVANÇADA ---
  { id: '56', category: 'Frontend', difficulty: 'junior', front: 'O que é um ataque XSS (Cross-Site Scripting)?', back: 'Quando um invasor injeta scripts maliciosos em páginas visualizadas por outros usuários.', isFlipped: false },
  { id: '57', category: 'Frontend', difficulty: 'pleno', front: 'Como funciona o CSRF (Cross-Site Request Forgery) e como o atributo "SameSite" em cookies ajuda?', back: 'Ataque que força o usuário a executar ações indesejadas; o SameSite restringe o envio de cookies em requisições de outros sites.', isFlipped: false },
  { id: '58', category: 'Frontend', difficulty: 'pleno', front: 'O que é a Política de Segurança de Conteúdo (CSP)?', back: 'Uma camada de segurança que restringe quais recursos (scripts, estilos) podem ser carregados no site.', isFlipped: false },

  // --- REACT & NEXT.JS (DEEP DIVE) ---
  { id: '59', category: 'Frontend', difficulty: 'senior', front: 'Qual a diferença técnica entre Server Components (RSC) e SSR tradicional?', back: 'SSR gera HTML no servidor mas requer hidratação no cliente; RSCs nunca enviam seu próprio JS ao cliente para renderização.', isFlipped: false },
  { id: '60', category: 'Frontend', difficulty: 'senior', front: 'Para que serve a "Concurrent Mode" no React?', back: 'Permite que o React interrompa uma renderização longa para processar uma interação urgente do usuário.', isFlipped: false },
  { id: '61', category: 'Frontend', difficulty: 'pleno', front: 'O que é "Streaming" no contexto do Next.js App Router?', back: 'A capacidade de quebrar o HTML da página em pedaços e enviá-los ao cliente conforme ficam prontos.', isFlipped: false },
  { id: '62', category: 'Frontend', difficulty: 'senior', front: 'Como o React Compiler lida com as "Rules of Hooks" internamente?', back: 'Ele analisa o grafo de controle de fluxo para garantir que os hooks sejam chamados sempre na mesma ordem.', isFlipped: false },

  // --- ESTADO & GERENCIAMENTO COMPLEXO ---
  { id: '63', category: 'Frontend', difficulty: 'pleno', front: 'O que é uma "Finite State Machine" (FSM) aplicada ao Frontend?', back: 'Modelo que garante que um componente esteja em apenas um estado por vez (ex: Idle, Loading, Error, Success).', isFlipped: false },
  { id: '64', category: 'Frontend', difficulty: 'pleno', front: 'Qual a diferença entre estados "Pushed" e "Pulled" em arquiteturas de dados?', back: 'Pushed: o servidor envia dados ativamente (WebSockets); Pulled: o cliente solicita dados (Polling/Fetch).', isFlipped: false },

  // --- BROWSER INTERNALS ---
  { id: '65', category: 'Frontend', difficulty: 'pleno', front: 'Explique o "Critical Rendering Path".', back: 'A sequência de passos que o browser segue para converter HTML/CSS/JS em pixels na tela.', isFlipped: false },
  { id: '66', category: 'Frontend', difficulty: 'pleno', front: 'O que é o Main Thread do navegador e por que devemos evitar bloqueá-lo?', back: 'É onde o browser processa JS e renderização; bloqueá-lo causa travamentos na interface (jank).', isFlipped: false },
  { id: '67', category: 'Frontend', difficulty: 'senior', front: 'Para que serve o "requestIdleCallback"?', back: 'Agenda funções para serem executadas em momentos de inatividade do navegador, sem afetar animações ou interações.', isFlipped: false },

  // --- TYPESCRIPT AVANÇADO ---
  { id: '68', category: 'Frontend', difficulty: 'pleno', front: 'O que são "Conditional Types" no TypeScript?', back: 'Tipos que selecionam outro tipo baseado em uma condição (T extends U ? X : Y).', isFlipped: false },
  { id: '69', category: 'Frontend', difficulty: 'senior', front: 'Para que serve o operador "infer" no TypeScript?', back: 'Usado dentro de tipos condicionais para extrair um tipo de dentro de outro (ex: pegar o tipo de retorno de uma função).', isFlipped: false },
  { id: '70', category: 'Frontend', difficulty: 'pleno', front: 'O que são "Discriminated Unions"?', back: 'Um padrão que usa uma propriedade comum (literal) para diferenciar tipos dentro de uma Union.', isFlipped: false },

  // --- WEB APIS & INFRA ---
  { id: '71', category: 'Frontend', difficulty: 'pleno', front: 'Como funciona um Service Worker?', back: 'Um script que roda em segundo plano, independente da página, permitindo offline-first e push notifications.', isFlipped: false },
  { id: '72', category: 'Frontend', difficulty: 'pleno', front: 'O que é o protocolo HTTP/3 e qual sua vantagem sobre o HTTP/2?', back: 'Usa o protocolo QUIC sobre UDP, eliminando o bloqueio de início de fila (head-of-line blocking) e melhorando conexões instáveis.', isFlipped: false },
  { id: '73', category: 'Frontend', difficulty: 'junior', front: 'Para que serve a API de "Intersection Observer"?', back: 'Detecta quando um elemento entra ou sai da área visível (viewport), ideal para lazy loading e animações por scroll.', isFlipped: false },
  { id: '74', category: 'Frontend', difficulty: 'senior', front: 'O que é WebAssembly (Wasm)?', back: 'Um formato de instrução binária que permite rodar código de alta performance (C++, Rust) no browser.', isFlipped: false },
  { id: '75', category: 'Frontend', difficulty: 'pleno', front: 'O que significa "Hydration Mismatch" no Next.js?', back: 'Erro que ocorre quando o HTML gerado no servidor é diferente do que o React espera renderizar no cliente.', isFlipped: false },

  // --- ESTRATÉGIA E TRADEOFFS ---
  { id: '76', category: 'Frontend', difficulty: 'senior', front: 'O que é o "Double Buffering" no contexto de renderização e como ele se aplica ao Virtual DOM?', back: 'É a técnica de preparar o próximo frame em memória separada antes de exibi-lo, evitando cintilação (flicker). O Virtual DOM faz algo análogo ao calcular mudanças antes de tocar no DOM real.', isFlipped: false },
  { id: '77', category: 'Frontend', difficulty: 'senior', front: 'Explique o conceito de "Inversion of Control" (IoC) em componentes React.', back: 'É delegar a renderização ou lógica para quem consome o componente (via Render Props ou Compound Components), aumentando a flexibilidade sem inflar o componente original.', isFlipped: false },
  { id: '78', category: 'Frontend', difficulty: 'senior', front: 'Qual o tradeoff de usar Micro-frontend via Module Federation vs. iframe?', back: 'Module Federation permite compartilhamento de dependências e performance nativa, mas exige acoplamento de build; iframe oferece isolamento total, mas com custo alto de memória e dificuldade de comunicação.', isFlipped: false },
  { id: '79', category: 'Frontend', difficulty: 'senior', front: 'Como você resolveria um problema de "Memory Leak" em uma aplicação SPA complexa?', back: 'Analisando o Heap Snapshot do Chrome DevTools; limpando event listeners no unmount, cancelando subscrições de sockets/observables e removendo referências a objetos globais.', isFlipped: false },

  // --- PERFORMANCE AVANÇADA ---
  { id: '80', category: 'Frontend', difficulty: 'senior', front: 'O que é o "Time to Interactive" (TTI) e como ele difere do "Total Blocking Time" (TBT)?', back: 'TTI mede quando a página está totalmente funcional para o usuário; TBT mede a soma dos períodos entre o FCP e o TTI em que a Main Thread foi bloqueada por tarefas longas.', isFlipped: false },
  { id: '81', category: 'Frontend', difficulty: 'senior', front: 'Como o HTTP/2 Server Push difere do <link rel="preload">?', back: 'Server Push permite que o servidor envie recursos proativamente sem o cliente solicitar; preload é uma instrução ao navegador para priorizar o download de um recurso que ele já sabe que vai precisar.', isFlipped: false },
  { id: '82', category: 'Frontend', difficulty: 'senior', front: 'Explique a técnica de "Partial Hydration".', back: 'É a capacidade de hidratar apenas componentes específicos na página, mantendo o restante como HTML estático, reduzindo o custo de execução do JS no cliente.', isFlipped: false },

  // --- ARQUITETURA DE DADOS ---
  { id: '83', category: 'Frontend', difficulty: 'pleno', front: 'O que é "Normalized State" em gerenciadores de estado e por que usá-lo?', back: 'É estruturar dados como um banco de dados relacional (indexados por IDs); evita inconsistências e facilita atualizações de itens que aparecem em múltiplos lugares da UI.', isFlipped: false },
  { id: '84', category: 'Frontend', difficulty: 'pleno', front: 'Qual a diferença entre "Optimistic UI" e "Pessimistic UI" em mutações de dados?', back: 'Optimistic assume o sucesso da API e atualiza a UI instantaneamente; Pessimistic espera a resposta do servidor antes de exibir a mudança ao usuário.', isFlipped: false },
  { id: '85', category: 'Frontend', difficulty: 'senior', front: 'Como os "React Server Components" alteram o modelo mental de fetching de dados?', back: 'Eles movem o fetch para o servidor, eliminando "waterfalls" de requisições no cliente e reduzindo o tamanho do bundle enviado ao browser.', isFlipped: false },

  // --- BROWSER & ENGINE DEEP DIVE ---
  { id: '86', category: 'Frontend', difficulty: 'senior', front: 'O que é "Layout Thrashing" e como evitá-lo?', back: 'Ocorre quando lemos e escrevemos no DOM repetidamente, forçando o browser a recalcular o layout várias vezes por frame. Evita-se agrupando todas as leituras antes das escritas.', isFlipped: false },
  { id: '87', category: 'Frontend', difficulty: 'senior', front: 'Explique a diferença entre Composição de Camadas (Compositing) e Pintura (Painting).', back: 'Painting é o processo de desenhar pixels nas camadas; Compositing é organizar e unir as camadas já desenhadas. Usar transform: translateZ(0) pode promover um elemento a sua própria camada, otimizando animações.', isFlipped: false },

  // --- SEGURANÇA & GOVERNANÇA ---
  { id: '88', category: 'Frontend', difficulty: 'senior', front: 'Como o atributo "Subresource Integrity" (SRI) protege sua aplicação?', back: 'Garante que arquivos carregados de uma CDN não foram alterados maliciosamente, comparando o hash do arquivo com um valor declarado no HTML.', isFlipped: false },
  { id: '89', category: 'Frontend', difficulty: 'pleno', front: 'O que é "BFF" (Backend for Frontend) e quando utilizá-lo?', back: 'Uma camada intermediária dedicada a formatar dados especificamente para as necessidades do frontend, reduzindo a complexidade de parse no cliente.', isFlipped: false },

  // --- PADRÕES DE DESIGN NO FRONT ---
  { id: '90', category: 'Frontend', difficulty: 'pleno', front: 'Explique o padrão "Compound Components".', back: 'Um padrão onde componentes trabalham juntos para gerenciar estado implicitamente via Context (ex: <Tabs> <TabList> <Tab /> </Tabs>).', isFlipped: false },
  { id: '91', category: 'Frontend', difficulty: 'pleno', front: 'O que é o padrão "Controlled vs. Uncontrolled Components" em larga escala?', back: 'Controlled usa o estado do React para cada input; Uncontrolled usa o DOM via ref. Em projetos maiores, Uncontrolled com bibliotecas como React Hook Form entrega melhor performance.', isFlipped: false },

  // --- ECOSSISTEMA & FERRAMENTAS ---
  { id: '92', category: 'Frontend', difficulty: 'senior', front: 'Qual a diferença técnica entre o Webpack e o Vite (esbuild/rollup)?', back: 'Webpack empacota todos os módulos no momento do build; Vite usa Native ESM para servir arquivos individuais durante o desenvolvimento e usa Rollup para o build final de produção.', isFlipped: false },
  { id: '93', category: 'Frontend', difficulty: 'pleno', front: 'Como funciona o "Shadow DOM" no contexto de Web Components?', back: 'Provê encapsulamento total de CSS e DOM, impedindo que estilos globais vazem para dentro do componente e vice-versa.', isFlipped: false },

  // --- QUALIDADE & CI/CD ---
  { id: '94', category: 'Frontend', difficulty: 'pleno', front: 'O que é "Visual Regression Testing"?', back: 'Testes que comparam screenshots da UI pixel a pixel para detectar mudanças visuais indesejadas após uma alteração no código.', isFlipped: false },
  { id: '95', category: 'Frontend', difficulty: 'pleno', front: 'Explique o conceito de "Flaky Tests" e como mitigá-los.', back: 'Testes que passam ou falham de forma intermitente. Mitiga-se com melhor isolamento de rede, esperas explícitas por elementos e limpeza de estado entre testes.', isFlipped: false },

  // --- TYPESCRIPT SÊNIOR ---
  { id: '96', category: 'Frontend', difficulty: 'senior', front: 'O que são "Template Literal Types" no TypeScript?', back: 'Permitem criar tipos baseados em strings literais combinadas (ex: type Direction = "top" | "bottom"; type Class = `mt-${Direction}`).', isFlipped: false },
  { id: '97', category: 'Frontend', difficulty: 'senior', front: 'Como um tipo "ReadonlyRecursive" customizado difere do "Readonly" padrão do TypeScript?', back: 'O Readonly padrão é raso (shallow) e só protege o primeiro nível; um ReadonlyRecursive garante que objetos aninhados em qualquer profundidade também não possam ser alterados.', isFlipped: false },

  // --- DESAFIOS MODERNOS ---
  { id: '98', category: 'Frontend', difficulty: 'pleno', front: 'Qual o impacto do React Compiler (React Forget) na necessidade de otimização manual?', back: 'Ele reduz drasticamente a necessidade de usar useMemo/useCallback manualmente, pois o compilador injeta a lógica de memoização automaticamente durante o build.', isFlipped: false },
  { id: '99', category: 'Frontend', difficulty: 'senior', front: 'O que é "Resumability" (popularizado pelo Qwik) e como difere da Hidratação?', back: 'Resumability permite que o app continue exatamente do ponto onde o servidor parou, sem re-executar todo o JS para reanexa event listeners — ao contrário da hidratação, que repete o trabalho no cliente.', isFlipped: false },
  { id: '100', category: 'Frontend', difficulty: 'pleno', front: 'Para que serve a técnica de "Brotli Compression" e como ela se compara ao Gzip?', back: 'Brotli é um algoritmo de compressão mais moderno que gera arquivos até 20% menores que o Gzip para recursos web como JS e CSS, ao custo de um tempo de compressão ligeiramente maior.', isFlipped: false },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get('difficulty');

  let filteredCards = flashcards;
  
  if (difficulty && difficulty !== 'all') {
    filteredCards = flashcards.filter(card => card.difficulty === difficulty);
  }

  return NextResponse.json(filteredCards);
}
# Planejamento de produto e arquitetura — portfólio pessoal

## Como usar este documento

Este material transforma os três anexos — `prompt.txt`, `unified-portfolio-prompt.md`, `a.txt` e `Referencias_Portfolio_Gabriel_Vinicius.docx` — em um **mapa de decisões para discutir antes da implementação**. Não é uma especificação fechada nem uma decisão de design: quando há alternativas, elas permanecem explícitas. As recomendações são hipóteses iniciais para reduzir risco e devem ser validadas com conteúdo real, protótipos e pessoas do público pretendido.

## 1. Diagnóstico inicial

### O que está alinhado

- **O portfólio deve ter personalidade visual**, com uma home gótica/editorial e um efeito de retrato ou mídia em ASCII.
- **O ASCII pertence à home**. A roda e as páginas dos projetos devem preservar suas próprias mídias; a estética da home não deve vazar nelas por filtros globais.
- **A roda é um mecanismo de descoberta e seleção**, não apenas decoração. Títulos legíveis, projeto selecionado identificável, acesso direto e alternativas à interação espacial são necessários.
- **As páginas dos projetos podem variar visualmente**, mas precisam comunicar informações técnicas reais e oferecer continuidade de navegação no portfólio.
- **CSS 3D é uma hipótese inicial mais proporcional que WebGL** para a roda. Three.js aparece como alternativa futura caso haja uma necessidade visual concreta que CSS não atenda.
- **Acessibilidade, desempenho e responsividade devem ser requisitos**, não etapas cosméticas finais. Canvas precisa de alternativa acessível; movimento reduzido não pode impedir o uso do site.
- **Conteúdo e efeitos têm prioridades diferentes**: a apresentação, os estudos de caso e os links precisam continuar disponíveis se animações ou Canvas não funcionarem.

### Tensões e ambiguidades a resolver

| Tema | O que os documentos deixam em aberto | Por que importa / opção segura para avaliar |
|---|---|---|
| Direção visual | `prompt.txt` informa que o design ainda não foi decidido. O prompt unificado descreve uma proposta gótica específica; `a.txt` avalia uma visão visual já articulada. | Tratar a estética gótica, a paleta e a tipografia como **direção candidata**, não como aprovação. Antes de detalhar efeitos, comparar poucas rotas visuais em protótipos estáticos. |
| Número de experiências | O prompt unificado fala em duas experiências (home e páginas dos projetos); `a.txt` organiza o conceito em três fases: home, roda e páginas individuais. | Separar **etapas de navegação** de **sistemas visuais**. A roda pode ser uma etapa funcional sem ser uma terceira identidade visual completa; decidir se ela herda elementos do portfólio ou recebe tratamento industrial próprio. |
| Público e hierarquia | O portfólio precisa servir a candidaturas profissionais e propostas comerciais, mas não foi definido qual público tem prioridade quando há conflito. | Recrutadores tendem a precisar de leitura rápida de papel, competências, problemas e repositórios; clientes podem precisar de escopo, resultado, confiabilidade e forma de contato. A home pode atender ambos, mas a ordem e a linguagem dos conteúdos dependem dessa decisão. |
| Geometria da roda | “Roda” e cartões a 90° admitem órbita vertical ou anel em perspectiva; a descrição não determina eixo, profundidade ou interação. | Fazer um protótipo de baixa fidelidade com as duas leituras. Não decidir pela aparência isolada: testar se cartões, nomes e ações continuam compreensíveis. 90° só corresponde a quatro posições igualmente espaçadas; se o catálogo mudar, o cálculo precisa acompanhar a quantidade de projetos. |
| Conteúdo dos projetos | Os nomes citados em `a.txt` não são descrições suficientes nem prova de tecnologias, funcionalidades ou disponibilidade. | Fazer um inventário verificável por projeto antes de publicar. Usar placeholders apenas no protótipo, rotulados como tais, e não expor dados fictícios como portfólio real. |
| Disponibilidade | Falta separar funcionamento local, código público e demonstração hospedada. | Representar esses estados separadamente. “Funciona localmente” não deve parecer “está disponível como serviço público”; links e rótulos devem dizer com clareza o que existe. |
| Estrutura React / roteamento | React, TypeScript, Tailwind e shadcn/ui não definem framework, bundler, roteador nem estratégia de páginas. O exemplo `[slug]` sugere uma convenção que pode depender do framework. | Escolher junto com a estratégia de publicação no GitHub Pages. Em hospedagem estática, rotas profundas precisam de uma solução deliberada (por exemplo, rotas com hash, fallback/rewrite compatível ou páginas estáticas geradas). Confirmar também o caminho-base do repositório. |
| Conteúdo do painel técnico | `a.txt` propõe informações em formato de terminal, mas questiona se seriam logs reais, metadados cadastrados ou simulação visual. | Preferir dados explícitos do catálogo e rotulagem editorial honesta. Se houver aparência de terminal, deixar claro que é apresentação visual e não um log ao vivo, a menos que realmente seja. |
| Nível de animação | Há ideias de onda, scanlines, glitch, ruído, transições e efeitos por interação, mas não uma ordem final de prioridade. | Começar com uma experiência útil sem efeitos; adicionar cada efeito apenas quando houver uma razão e uma forma de medir seu custo e valor. |

### Decisões anteriores a uma implementação de produção

1. Qual público deve ter prioridade se a apresentação visual competir com a leitura profissional/comercial?
2. Qual identidade visual será testada e qual elemento é essencial para reconhecer o portfólio?
3. Quais quatro projetos (ou outro conjunto) representam melhor o trabalho real e quais afirmações podem ser comprovadas?
4. Como cada projeto está disponível: localmente, em repositório, em demonstração pública ou apenas como trabalho em andamento?
5. Qual comportamento de navegação é necessário na roda e qual será a alternativa acessível e móvel?
6. Qual estratégia de rotas e build funciona com o destino GitHub Pages escolhido?
7. Que conteúdo mínimo e que critérios de qualidade precisam estar prontos para um estudo de caso ser publicado?

## 2. Arquitetura conceitual e organização de componentes

A separação mais importante é entre **navegação compartilhada**, **identidade da home**, **módulo interativo da roda**, **dados** e **experiências específicas dos projetos**. Esta é uma organização a avaliar, não uma árvore obrigatória:

```text
src/
  app/ ou pages/
    HomePage
    ProjectPage(slug)
    NotFoundPage
  components/
    shell/
      SiteHeader
      SiteNavigation
      ProjectBackLink
    home/
      HomeIntro
      HomeAsciiHero
      HomeProjectEntry
    works/
      WorksWheel
      ProjectCard
      ProjectIndexList
      WheelControls
    projects/
      ProjectCaseStudy
      ProjectGallery
      ProjectLinks
  data/
    projects
    homeMedia
  lib/
    ascii-renderer
    media
  styles/
    tokens globais e estilos escopados por experiência/projeto
public/
  home/
  projects/<slug>/
```

### Limites recomendados entre módulos

- **Shell global:** navegação, retorno, estados de link e comportamento responsivo comuns. É a cola que ajuda as páginas com estilos diferentes a ainda parecerem parte do mesmo portfólio.
- **Home:** identidade visual, apresentação pessoal e mídia exclusiva do destaque ASCII. Não apontar o `HomeAsciiHero` automaticamente para capas ou galerias de projeto.
- **Roda:** recebe um catálogo de projetos e o estado/seleção atual; não deve ser a fonte dos fatos do projeto. A mesma seleção deve atualizar cartão, índice e conteúdo associado sem duplicar dados.
- **Páginas de projeto:** compartilham a estrutura semântica do estudo de caso e a navegação global, mas podem variar em paleta, composição e componentes visuais. Evitar tanto um tema global gótico obrigatório quanto quatro páginas sem qualquer continuidade de navegação.
- **Dados:** catálogo TypeScript explícito é a opção simples e previsível para um portfólio pequeno. Um manifesto gerado por script pode ser considerado depois, se o volume tornar a manutenção manual incômoda. Não depender da leitura automática de arquivos no navegador.
- **Estilos:** usar tokens comuns para navegação, foco, espaçamento e estrutura; escopar cores e efeitos específicos da home e de cada projeto. Isso evita vazamento de filtros e facilita reduzir efeitos sem alterar o conteúdo.

### `ascii-renderer.ts` e estado do React

A lógica de conversão e desenho pode ficar em um módulo independente do ciclo de renderização da interface. Como contrato conceitual, esse módulo poderia receber fonte (imagem/vídeo), dimensões e parâmetros do efeito, e devolver controles de início, atualização e liberação. A interface React mantém referências a elementos e valores mutáveis; não precisa gravar cada quadro da animação no estado React.

Fluxo a explorar em protótipo:

1. Carregar uma mídia exclusiva da home e desenhar/amostrar em resolução de trabalho reduzida.
2. Converter amostras em caracteres ou formas por luminância/cor.
3. Redesenhar apenas quando for necessário: mídia avança, opção muda ou interação altera o efeito.
4. Encerrar `requestAnimationFrame`, listeners e recursos ao trocar a mídia ou desmontar o componente.
5. Se Canvas falhar ou estiver desativado, apresentar a imagem original e controles/descrição equivalentes.

Para vídeo, limitar resolução e frequência de atualização, evitar autoplay com áudio e oferecer visualização da mídia original. `OffscreenCanvas` ou Worker permanecem otimizações condicionais: primeiro medir o gargalo, depois aumentar a complexidade. O módulo deve ter modos simples iniciais; o catálogo extenso de parâmetros do prompt é uma possibilidade de evolução, não um requisito para a primeira versão.

## 3. Modelo de dados dos projetos

A proposta abaixo amplia `Project` e `ProjectMedia` sem afirmar que os dados já existem. Os campos podem ser opcionais durante o levantamento, mas **campos vazios não devem virar afirmações implícitas** na interface.

| Campo candidato | Para que serve | Informação a confirmar |
|---|---|---|
| `slug` | Identificador estável usado na rota e nos diretórios de mídia. | Nome curto, URL segura e estável. |
| `title` | Nome público do projeto. | Nome final e grafia. |
| `summary` | Resumo curto que permita entender o propósito rapidamente. | Público, problema e benefício sem jargão excessivo. |
| `problem` | Situação ou necessidade que motivou o trabalho. | Qual problema foi observado e para quem. |
| `solution` | O que o software realmente faz e como responde ao problema. | Funcionalidades implementadas versus planejadas. |
| `role` | Contribuição pessoal e contexto de autoria/colaboração. | Trabalho individual ou em equipe; responsabilidades próprias. |
| `technologies` | Tecnologias efetivamente utilizadas. | Confirmar no código e separar produção, desenvolvimento e protótipo, se relevante. |
| `architecture` | Componentes, fronteiras ou fluxo técnico que ajudam a explicar decisões. | Evidência em código/documentação; não inferir arquitetura por aparência. |
| `features` | Funcionalidades demonstráveis. | Estado real de cada funcionalidade. |
| `limitations` | Limitações conhecidas ou escopo não implementado. | Limitações atuais e melhorias futuras, sem mascará-las como funcionalidades. |
| `links.repositoryUrl` | Acesso ao código ou documentação pública. | URL, permissão de acesso e conteúdo que pode ser divulgado. |
| `links.demoUrl` | Demonstração pública, se existir. | URL funcional e escopo do que a demo demonstra. |
| `availability` | Estado do código/demo/execução. | Manter separado o estado local, repositório e serviço público. |
| `media` | Imagens e vídeos do próprio projeto. | Arquivos originais, contexto, consentimento/direitos, alt e poster. |
| `lastVerified` | Data em que os fatos técnicos foram conferidos. | Frequência de atualização e responsável pela revisão. |
| `visualTheme` | Preferências visuais específicas, se o projeto demandar composição própria. | Decidir quais variações justificam componentes próprios e quais são apenas tokens. |

Uma tipagem conceitual possível para discussão, sem pretensão de ser o esquema final:

```ts
type ProjectAvailability = {
  sourceCode: "public" | "private" | "not-published";
  localExecution: "verified" | "unverified" | "not-applicable";
  publicDemo: "available" | "unavailable";
};

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;       // descrição adequada ao conteúdo e contexto
  poster?: string;   // para vídeo, se houver imagem de pré-visualização
  caption?: string;
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  problem?: string;
  solution?: string;
  role?: string;
  technologies?: string[];
  architecture?: string;
  features?: string[];
  limitations?: string[];
  links?: { repository?: string; demo?: string; label?: string };
  availability: ProjectAvailability;
  cover: ProjectMedia;
  media: ProjectMedia[];
  lastVerified?: string;
};
```

`alt` deve refletir a informação da imagem, não repetir o título da página ou descrever efeitos decorativos. Para mídia puramente decorativa, definir uma estratégia acessível em vez de inventar uma descrição longa. Se o conteúdo não estiver disponível, omitir ou marcar como pendente no planejamento; não apresentar campos genéricos como fatos publicados.

### Levantamento recomendado para cada projeto

Antes de escrever o estudo de caso, reunir: repositório/README; funcionalidades executáveis; telas ou gravação atual; tecnologias confirmadas; arquitetura que realmente existe; seu papel; limitações; links testados; estado local e estado público. Uma revisão de código pode verificar fatos, mas não substitui a explicação do contexto e das decisões pelo autor. Números de usuários, desempenho, economia ou impacto só entram se houver medição e método verificáveis.

## 4. Navegação e interação da roda

### Hipótese inicial

Avaliar CSS 3D para uma roda de seleção visual, mantendo sempre uma maneira mais direta de percorrer os projetos. Com quatro itens, o espaçamento angular uniforme de 90° é uma convenção possível; não é uma exigência se houver outro número, e a legibilidade deve prevalecer sobre a geometria.

### Controles e equivalentes

- **Teclado:** controles explícitos anterior/próximo e seleção identificável. Definir teclas específicas somente após testar foco e interação com o restante da página; todos os projetos precisam ser alcançáveis sem arraste.
- **Toque:** alvos dimensionados para uso móvel. O arraste pode ser adicional, nunca o único modo.
- **Arraste:** oferecer alternativa por botões/lista, porque gesto de arraste não deve ser pré-requisito. Evitar que o gesto impeça scroll vertical normal em celular.
- **Índice clicável/lista:** oferecer acesso direto por nome; avaliar se a lista fica permanentemente visível, recolhível ou se substitui a roda em telas estreitas.
- **Projeto selecionado:** sinal visual e textual inequívoco; o foco/seleção deve atualizar os detalhes corretos e disponibilizar uma ação clara de abrir o estudo de caso.
- **Redução de movimento:** com `prefers-reduced-motion`, reduzir ou remover giro, aproximação, parallax e transições não essenciais. A seleção e o conteúdo continuam operáveis; uma apresentação estática ou linear é uma opção válida.

### Trade-offs a validar

| Opção | Vantagem | Custo/risco |
|---|---|---|
| Roda 3D como navegação principal | Experiência distintiva e narrativa; demonstra trabalho de interface. | Descoberta menos óbvia, cartões laterais menores, maior custo de teclado/toque e teste responsivo. |
| Lista ou grade como navegação principal | Leitura e comparação mais rápidas, padrão conhecido e simples de acessar. | Menos singular; pode diminuir o papel da roda como peça central. |
| Roda em desktop e lista em telas estreitas/redução de movimento | Preserva a intenção em contextos adequados sem forçar geometria pequena. | São dois modos de apresentação a manter e validar; conteúdo/seleção precisam permanecer consistentes. |
| Painel de detalhes sincronizado com a roda | Mostra metadados sem abrir cada página. | Pode competir com a leitura visual e virar informação técnica decorativa. Priorizar resumo e valor profissional; os detalhes completos ficam no estudo de caso. |

Pergunta visual ainda aberta: órbita vertical ou anel visto em perspectiva? Fazer protótipo com textos reais ou conteúdo representativo claramente provisório. A posição central deve dar destaque sem esconder que existem outros projetos ou tornar os cartões laterais ilegíveis.

## 5. Acessibilidade e desempenho como requisitos de primeira classe

### Acessibilidade a transformar em critérios

- Contraste de texto, controles, indicadores de foco e estados selecionados verificado em cada tema, inclusive em metadados pequenos e sobre mídia.
- Foco visível e ordem de navegação lógica; links e botões com nomes que expliquem o destino/ação.
- Nenhuma funcionalidade essencial depende de hover, mouse ou percepção de profundidade.
- Canvas com alternativa HTML compreensível: imagem original ou descrição apropriada, mais controles equivalentes. Não expor o mosaico como sequência de caracteres para leitores de tela.
- Imagens com texto alternativo contextual; galerias operáveis por teclado quando houver controles; vídeos com poster e controles nativos ou equivalentes, sem áudio automático.
- Tamanho e espaçamento de alvos, comportamento de toque e reflow testados em telas estreitas.
- `prefers-reduced-motion` cobre movimento da roda, ASCII e transições; reduzir movimento não deve remover conteúdo nem ações.
- Se houver sobreposição/painel modal em vez de página, definir foco, fechamento e retorno de foco. Essa escolha ainda não está feita.

As referências do documento DOCX e a avaliação em `a.txt` dão base para revisar WCAG 2.2; o valor de nota de acessibilidade na avaliação é um diagnóstico do conceito, não uma certificação do site futuro.

### Desempenho e mídia

- Fazer o conteúdo essencial renderizar sem esperar a animação. A imagem de fallback deve ser adequada e não aparecer como erro visual.
- Carregar sob demanda imagens e vídeos fora da área inicial; escolher dimensões e compressão para o uso real, não usar arquivos de origem enormes por conveniência.
- No vídeo ASCII, limitar resolução de processamento e taxa de quadros; oferecer desligar efeito/assistir à mídia original. Tratar os limites como decisão de protótipo, não como números definidos pelos anexos.
- Evitar redesenhar o Canvas em cada evento de ponteiro; pré-calcular o que fizer sentido e só otimizar depois de medir. Aceleração CSS/uso de GPU não é garantia de fluidez.
- Registrar desempenho percebido e, quando houver implantação e tráfego apropriados, métricas reais de experiência como LCP, INP e CLS. Complementar com testes em dispositivos e condições de rede representativas; FPS em máquina de desenvolvimento não é prova suficiente.
- Definir um orçamento de efeitos: a roda, o ASCII e as transições não precisam todos executar simultaneamente com a intensidade máxima.

A meta de 60 FPS citada em `a.txt` serve como aspiração para interações compatíveis, não como garantia universal. A aceitação deve priorizar ausência de bloqueio, navegação funcional e qualidade aceitável em hardware modesto, com evidência de teste.

## 6. Sequência de desenvolvimento sugerida — sujeita a discussão

Não é um cronograma. Cada etapa funciona como uma decisão de risco e pode ser reordenada conforme conteúdo, tempo e objetivo principal.

1. **Confirmar público e inventário de conteúdo.** Priorizar recrutadores, clientes ou atendimento equilibrado; auditar os projetos, links, mídias e estados reais. Gate: não há fatos publicados sem confirmação e cada projeto tem um resumo compreensível.
2. **Provar a estrutura funcional e o modelo de publicação.** Escolher framework/roteamento/build com GitHub Pages em mente; testar uma rota de projeto, retorno, links e refresh em URL profunda. Gate: os caminhos funcionam na URL real do site, inclusive sob o caminho-base do repositório.
3. **Explorar identidade visual com protótipos.** Comparar direções e testar legibilidade, hierarquia, unidade da navegação e individualidade dos projetos. Gate: decisão visual deliberada, não apenas repetição das inspirações dos anexos.
4. **Definir um estudo de caso representativo.** Montar primeiro um conteúdo real de ponta a ponta; avaliar a estrutura e a extensão antes de replicá-la nos demais. Gate: problema, solução, contribuição, evidências, limitações e links são honestos e claros.
5. **Prototipar `HomeAsciiHero` isoladamente.** Comparar imagem estática, ASCII e alternância; depois testar movimento, toque, modo reduzido e desempenho. Gate: a imagem continua compreensível, há fallback e o efeito não bloqueia o acesso ao conteúdo.
6. **Prototipar navegação de projetos.** Implementar primeiro seleção e acesso direto em uma forma simples; comparar roda CSS 3D com lista/grade, geometrias e adaptação móvel. Gate: teclado, toque, seleção e alternativa linear funcionam antes de adicionar ornamentos.
7. **Adicionar transições e efeitos graduais.** Somente depois que rotas e seleções estejam corretas. Gate: animação não causa perda de contexto; modo reduzido e falhas preservam o fluxo.
8. **Validar com pessoas e ambiente representativo.** Incluir ao menos alguém do público profissional/comercial pretendido, navegação por teclado, leitor de tela, tela estreita e dispositivo modesto. Revisar conteúdo e links. Gate: observações viram ajustes priorizados, não apenas uma auditoria visual.

### Critérios de aceitação candidatos

Os seguintes critérios adaptam os de `a.txt`; devem ser refinados com o público e o escopo escolhidos.

- Uma pessoa consegue identificar quem é o autor, o que faz e como contatá-lo sem precisar interagir com a roda.
- Cada projeto selecionado mostra título correto e resumo; a ação para abrir o caso não é ambígua.
- É possível acessar todos os projetos por teclado e por alternativa sem arraste; em tela estreita, o conteúdo não depende da geometria 3D.
- A página do estudo de caso distingue problema, solução, contribuição pessoal, tecnologias verificadas, limitações e links disponíveis, sem completar lacunas com suposições.
- O site continua navegável sem Canvas, com animação desativada ou com preferência de movimento reduzido.
- Imagens e vídeos têm alternativa e controles adequados; mídias fora de vista não são carregadas sem necessidade.
- A identidade individual de um projeto não aplica automaticamente filtros góticos/ASCII; a navegação compartilhada permanece reconhecível.
- O teste de implantação valida URLs diretas, atualização da página e retorno entre home/estudo de caso sob GitHub Pages.
- As decisões de desempenho têm evidência em dispositivos e nas métricas escolhidas; nenhuma animação é declarada “rápida” apenas por parecer fluida no computador de desenvolvimento.

## 7. Conteúdo dos estudos de caso e honestidade técnica

Uma estrutura editorial comum não exige um template visual único. Pode-se avaliar esta ordem, adaptando seções ao material realmente disponível:

1. **Identificação:** nome, resumo, imagem representativa e estado de disponibilidade.
2. **Contexto e problema:** para quem é o projeto e qual necessidade motivou o trabalho.
3. **Solução e escopo:** o que está implementado hoje; separar claramente ideias futuras.
4. **Papel e decisões:** contribuição individual, arquitetura, escolhas e alternativas consideradas.
5. **Demonstração:** capturas, vídeo ou demo, sempre identificados como evidência da versão correspondente.
6. **Limitações e aprendizados:** o que ainda não funciona, restrições conhecidas e próximos passos possíveis.
7. **Código e acesso:** repositório, documentação e demo pública, cada um com rótulo claro.

**Não inferir** tecnologias pelo nome ou pela estética; funcionalidades por uma captura; status público a partir de execução local; nem resultados mensuráveis sem dados. As denominações citadas na avaliação — como MAGI-System, Lumina, BetterThesia e ExpenseTracker — podem ajudar a localizar o material do autor, mas os anexos não fornecem detalhes suficientes para afirmar seu problema, arquitetura, tecnologias ou resultados.

Inspirações como editorial escuro, ASCII e interfaces industriais são referências de direção visual, não validação técnica, não estudos de caso e não confirmação do que os projetos fazem. O DOCX de referências explicita essa distinção e reúne documentação técnica para embasar protótipos; as fontes não comprovam que a direção artística será legível ou eficaz para este público. Essa parte precisa de avaliação visual e testes com usuários.

## Perguntas-chave antes de começar a implementar — em ordem de prioridade

1. **Qual público deve ser priorizado** — recrutadores, clientes potenciais, ou ambos em equilíbrio — e que ação principal você quer que cada grupo tome?
2. **Quais são os projetos reais que entrarão no portfólio?** Para cada um, qual problema resolve, o que você fez, o que está efetivamente funcionando e quais evidências existem?
3. **Qual é o estado exato de disponibilidade de cada projeto?** Código público/privado, execução local verificada e demonstração pública são condições diferentes; quais se aplicam a cada caso?
4. **Qual direção visual você quer testar primeiro?** A proposta gótica/editorial é uma preferência aprovada ou apenas uma candidata? Quanto da roda deve ser industrial, e quanta unidade visual você quer preservar nas páginas de projeto?
5. **Que conteúdo pessoal/profissional deve aparecer na home** (apresentação, competências, contato, localização/fuso, disponibilidade para trabalho) e o que não deve ser publicado?
6. **Qual interação da roda parece intuitiva para você?** Órbita vertical ou anel em perspectiva? A lista/grade alternativa fica visível, recolhível ou assume o lugar da roda em dispositivos móveis e com movimento reduzido?
7. **O ASCII deve ser principalmente uma imagem ambiente, uma interação progressiva ou um modo alternável com a foto original?** Que imagem/mídia pode ser usada e qual alternativa acessível deve ficar disponível?
8. **Você prefere páginas próprias para cada projeto ou um painel de detalhes?** Páginas próprias favorecem narrativa, compartilhamento e leitura; um painel reduz navegação, mas pode limitar os estudos de caso.
9. **Qual estrutura técnica e URL pretende usar no GitHub Pages?** Site em repositório de usuário ou de projeto, domínio próprio ou não? Isso afeta o caminho-base e a estratégia de rotas.
10. **Quais limites de escopo são aceitáveis para a primeira versão?** Por exemplo, ASCII de imagem antes de vídeo em tempo real, roda funcional antes de efeitos, ou outra priorização que preserve o objetivo do portfólio.
11. **Como você quer validar sucesso?** Quais tarefas alguém deve conseguir concluir, quais dispositivos/pessoas serão usados nos testes e quais sinais de desempenho/acessibilidade serão verificados?

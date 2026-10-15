# Prompt unificado — Portfólio pessoal com home ASCII e projetos independentes

Crie ou adapte um portfólio pessoal em **React, TypeScript, Tailwind CSS e shadcn/ui**. Antes de implementar, inspecione a estrutura existente e adapte a solução ao projeto. Se não houver um código-base, configure a estrutura necessária e explique brevemente as decisões.

## Conceito e separação visual

O site tem duas experiências visuais distintas:

1. **Página inicial:** tem uma identidade gótica/editorial e usa um efeito ASCII animado em uma área de destaque.
2. **Projetos:** cada projeto tem sua própria identidade visual, adequada ao seu tema e propósito. A estética gótica da home e o efeito ASCII **não devem ser aplicados automaticamente** às capas, galerias, vídeos ou páginas dos projetos.

Mantenha os estilos e componentes da home isolados dos estilos e componentes das páginas de projeto, para evitar que o tema global da home vaze para as demais experiências.

## Página inicial

Crie uma home autoral, escura e atmosférica, com referências góticas/editoriais. Use uma paleta baseada em preto e carvão, branco envelhecido, vinho escuro e detalhes discretos em dourado. Aplique textura, vinheta, granulação e elementos decorativos com moderação. Use tipografia gótica principalmente em títulos; mantenha textos, navegação e controles legíveis.

A home deve incluir uma área de destaque com **efeito ASCII animado**. Essa área usa uma coleção de mídias exclusiva da home — imagens ou vídeos escolhidos especificamente para criar essa composição — e não reutiliza automaticamente as mídias dos projetos.

Organize os arquivos da home separadamente, por exemplo:

```text
public/
  home/
    ascii-01.jpg
    ascii-loop.mp4
```

### Efeito ASCII da home

Implemente o efeito como um componente reutilizável, por exemplo `HomeAsciiHero`, independente da navegação e das páginas dos projetos. Ele deve aceitar uma imagem ou vídeo de entrada e configurações para controlar o efeito.

Para imagens, desenhe a fonte em uma resolução de trabalho menor, amostre a luminância e a cor por célula e converta os valores em caracteres ou formas. Inclua inicialmente um conjunto enxuto de modos, como `characters`, `dither` e `dots`, além de opções para:

- conjunto de caracteres;
- tamanho das células;
- densidade e cobertura;
- brilho, contraste, saturação e escala de cinza;
- cor de tinta e opacidade;
- inversão;
- animações sutis, como onda, pulsação, cintilação ou ripple;
- poucos efeitos opcionais, como vinheta, scanlines e granulação.

Para vídeos, ofereça processamento em tempo real com resolução e taxa de quadros limitadas para preservar o desempenho. Inclua uma opção para desativar o efeito e assistir à mídia original. Ao trocar de mídia ou desmontar o componente, interrompa animações e libere recursos. Considere `OffscreenCanvas` ou Web Worker apenas se forem necessários.

Não tente implementar todos os modos e parâmetros experimentais de uma vez. Priorize uma primeira versão pequena, fluida, confiável e fácil de ampliar.

## Navegação e índice de projetos

Crie uma seção de projetos baseada em uma roda/carrossel 3D. Em repouso, os projetos formam um anel em torno de um título; ao interagir, a roda transita para uma sequência de cartões em perspectiva, com um projeto em destaque.

A roda serve para **navegar e selecionar projetos**. Ela deve exibir as capas originais, sem conversão ASCII nem filtros góticos globais. Inclua navegação por rolagem, arraste, teclado e índice clicável. Ajuste a interação para telas pequenas e respeite a preferência `prefers-reduced-motion`.

Adapte ou extraia a implementação da roda fornecida no prompt de referência para um componente como `WorksWheel`. Preserve o comportamento essencial, mas ajuste o estilo à direção visual do site e corrija eventuais problemas de responsividade, acessibilidade ou dependências. Evite substituir o conteúdo real por imagens externas de demonstração na versão final.

## Páginas e detalhes dos projetos

Ao selecionar um projeto, navegue para uma página própria ou abra um painel de detalhes. Cada projeto pode ter seu próprio layout, paleta, tipografia, composição, animações e forma de apresentar as mídias. Não force todos os projetos a usar o mesmo template visual, além de uma estrutura comum de navegação quando isso for útil.

Cada projeto pode incluir título, descrição, contexto, papel desempenhado, tecnologias, links e uma galeria independente de imagens e vídeos. A galeria deve preservar os arquivos originais e oferecer navegação por setas, indicadores e teclado quando apropriado.

Exemplo de organização:

```text
public/
  projects/
    projeto-a/
      cover.jpg
      image-01.jpg
      demo.mp4
    projeto-b/
      cover.jpg
      image-01.jpg
```

Não dependa de o navegador descobrir automaticamente arquivos de uma pasta. Use um catálogo TypeScript explícito ou, se for adequado ao ambiente, crie um script simples que leia as pastas e gere um manifesto de projetos. Documente como adicionar um projeto, sua capa e suas mídias.

Use tipos claros para o catálogo, por exemplo:

```ts
export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  technologies?: string[];
  links?: { label: string; href: string }[];
  media: ProjectMedia[];
  // Cada projeto pode definir dados ou composição visual próprios.
};
```

## Organização sugerida

Mantenha os componentes e os dados separados. Uma estrutura possível:

```text
src/
  components/
    home/
      HomeAsciiHero.tsx
    works/
      WorksWheel.tsx
      ProjectGallery.tsx
  data/
    projects.ts
  pages/ ou app/
    page.tsx
    projects/[slug]/page.tsx
  lib/
    ascii-renderer.ts
```

Separe a lógica de amostragem e desenho do canvas da lógica de interface. Evite atualizar o estado do React a cada quadro da animação; use `requestAnimationFrame` e referências para valores mutáveis quando apropriado. Limpe corretamente listeners, timeouts, animações e outros recursos.

## Acessibilidade, responsividade e desempenho

- Inclua texto alternativo adequado para imagens e controles com nomes acessíveis.
- Garanta foco visível e navegação por teclado.
- Respeite `prefers-reduced-motion`.
- Não reproduza áudio automaticamente.
- Use carregamento preguiçoso para mídias fora da área visível.
- Mantenha controles utilizáveis em telas pequenas e com toque.
- Ofereça um fallback se o canvas não estiver disponível.
- Evite downloads desnecessários e processamento de mídia em resolução excessiva.

## Entrega

Comece com uma implementação funcional e pequena, usando projetos de exemplo claramente identificados como placeholders apenas se ainda não houver conteúdo real. Não invente projetos ou links como se fossem do usuário.

Ao final, explique:

1. como a home ASCII, a roda de navegação e as páginas de projeto estão separadas;
2. como adicionar ou substituir as mídias exclusivas da home;
3. como adicionar um projeto, escolher sua capa e incluir suas mídias;
4. como cada projeto pode receber uma identidade visual própria;
5. quais limitações de desempenho existem para vídeo ASCII em tempo real e como desativar esse efeito.

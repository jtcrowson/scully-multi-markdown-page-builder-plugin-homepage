import { ScullyConfig, setPluginConfig, prod } from '@scullyio/scully';
import { DisableAngular } from 'scully-plugin-disable-angular';
import { MultiMarkdownPageBuilderPlugin, createSingleMarkdownSection, createMultipleMarkdownSection, MarkdownSectionBuilder } from './dist/scully-multi-markdown-page-builder-plugin';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';

const highlightBuilderExample: MarkdownSectionBuilder = {
  sectionBuilder: (markdownHtmls: string[]) => {
    const markdownHtml = markdownHtmls[0];
    return markdownHtml.replace(/highlight/gi, hightlight => `<mark>${hightlight}</mark>`);
  },
  markdownFileSources: ['./homepage/highlightExample.md'],
  extras: {}
}

if (prod) {
  setPluginConfig(baseHrefRewrite, {
    href: '/scully-multi-markdown-page-builder-plugin-homepage/',
  });
} else {
  setPluginConfig(baseHrefRewrite, {
    href: '/',
  });
}

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-multi-markdown-page-builder-plugin-homepage",
  outDir: './dist/static',
  // defaultPostRenderers: [baseHrefRewrite],
  routes: {
    '/docs/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./docs"
      },
      postRenderers: [baseHrefRewrite, DisableAngular]
    },
    '': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createSingleMarkdownSection('./homepage/header.md', { containerDivId: 'headerContainer', elementDivId: 'headerItem' }),
        createMultipleMarkdownSection(['./homepage/markdownFile1.md', './homepage/markdownFile2.md', './homepage/markdownFile3.md'], { containerDivId: 'gridContainer', elementsDivClass: 'grid-item' }),
        createSingleMarkdownSection('./homepage/installation.md', { containerDivId: 'installationContainer', elementDivId: 'installationItem' }),
        createSingleMarkdownSection('./homepage/overview.md', { containerDivId: null, elementDivId: null }),
        highlightBuilderExample,
        createSingleMarkdownSection('./homepage/creatorFunctions.md', { containerDivId: null, elementDivId: null }),
        createSingleMarkdownSection('./homepage/usage.md', { containerDivId: null, elementDivId: null }),
      ],
      title: 'Demo Homepage',
      postRenderers: [baseHrefRewrite]
    }
  }
};



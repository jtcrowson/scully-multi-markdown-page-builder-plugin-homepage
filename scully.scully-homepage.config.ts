import { ScullyConfig } from '@scullyio/scully';
import { DisableAngular } from 'scully-plugin-disable-angular';
import { MultiMarkdownPageBuilderPlugin, createSingleMarkdownSection, createMultipleMarkdownSection, MarkdownSectionBuilder } from './dist/scully-multi-markdown-page-builder-plugin';

const highlightBuilderExample: MarkdownSectionBuilder = {
  pageBuilder: (markdownHtmls: string[]) => {
    const markdownHtml = markdownHtmls[0];
    return markdownHtml.replace(/highlight/gi, hightlight => `<mark>${hightlight}</mark>`);
  },
  markdownFileSources: ['./homepage/highlightExample.md'],
  extras: {}
}

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "scully-homepage",
  outDir: './dist/static',
  routes: {
    '/docs/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./docs"
      },
      postRenderers: [DisableAngular]
    },
    '': {
      type: MultiMarkdownPageBuilderPlugin,
      sectionBuilders: [
        createSingleMarkdownSection('./homepage/header.md', { containerDivId: 'headerContainer', elementDivId: 'headerItem' }),
        createMultipleMarkdownSection(['./homepage/markdownFile1.md', './homepage/markdownFile2.md', './homepage/markdownFile3.md'], { containerDivId: 'gridContainer', elementsDivClass: 'grid-item' }),
        createSingleMarkdownSection('./homepage/installation.md', { containerDivId: 'installationContainer', elementDivId: 'installationItem' }),
        createSingleMarkdownSection('./homepage/routePluginUsage.md', { containerDivId: null, elementDivId: null }),
        highlightBuilderExample,
        createSingleMarkdownSection('./homepage/renderPluginUsage.md', { containerDivId: null, elementDivId: null }),
      ],
      title: 'Demo Homepage'
    }
  }
};



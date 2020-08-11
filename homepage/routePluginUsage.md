## Usage

The `MultiMarkdownPageBuilderPlugin` consists of a route plugin and a render plugin.

### Route Plugin

The route plugin takes a configuration that conforms to the `MultiMarkdownPageBuilderPluginConfig` interface.  The configuration takes in an array of `MarkdownSectionBuilder`s, with each element responsible for creating a separate portion of the overall page.

```typescript
const multiMarkdownPageBuilderPluginConfig: MultiMarkdownPageBuilderPluginConfig = {
  sectionBuilders: [
    createSingleMarkdownSection(
        './homepage/header.md', 
        { 
            containerDivId: 'headerContainer', 
            elementDivId: 'headerItem' 
        }
    ),
    createMultipleMarkdownSection(
        [
            './homepage/markdownFile1.md', 
            './homepage/markdownFile2.md', 
            './homepage/markdownFile3.md'
        ], 
        { 
            containerDivId: 'gridContainer', 
            elementsDivClass: 'grid-item' 
        }
    )
  ]
}

export const config: ScullyConfig = {
  // ...
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
      multiMarkdownPageBuilderPluginConfig
    }
  }
};
```

#### Using a `MarkdownSectionBuilder`

The library ships with two `MarkdownSectionBuilder` creator functions that produce common `MarkdownSectionBuilder` configurations, `createSingleMarkdownSection` and `createMultipleMarkdownSection`.  The former is for creating a single section of the page using a single markdown file, and the latter is for creating a single section of the page using multiple markdown files.  The latter is useful for creating a grid appearance, with content from multiple markdown files side-by-side.  Both creator functions takes in some css property names for styling customization.  See more in the [API Documentation](docs/api).

Creating your own `MarkdownSectionBuilder` is easy.  Here is a custom one that highlights the word "hightlight" in a markdown file by wrapping the word in a `mark` tag.

```typescript
const highlightBuilderExample: MarkdownSectionBuilder = {
  pageBuilder: (markdownHtmls: string[]) => {
    const markdownHtml = markdownHtmls[0];
    return markdownHtml.replace(/highlight/gi, hightlight => `<mark>${hightlight}</mark>`);
  },
  markdownFileSources: ['./homepage/highlightExample.md'],
  extras: {}
}
```

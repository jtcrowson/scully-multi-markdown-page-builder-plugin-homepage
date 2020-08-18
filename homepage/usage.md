## Plugin Breakdown

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

### Render Plugin

This plugin takes the section builders from the `MultiMarkdownPageBuilderPluginConfig` and converts the markdown files provided in each `markdownFileSources` array to a pre-rendered HTML array. The HTML array is then passed to each section builder's `sectionBuilder` function, which is responsible for adding any custom HTML.

This plugin finds the `<scully-content>` tag, and it injects the HTML as its previous sibling(s).

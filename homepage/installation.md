## Installation

```bash
npm install --save-dev scully-multi-markdown-page-builder-plugin
```

```typescript
import {
    MultiMarkdownPageBuilderPlugin,
    MultiMarkdownPageBuilderPluginConfig
} from 'scully-multi-markdown-page-builder-plugin';

const pluginConfig: MultiMarkdownPageBuilderPluginConfig = {
    sectionBuilders: [
        // add section builders (MarkdownSectionBuilder[])...
    ]
}

export const config: ScullyConfig = {
  // ...
  routes: {
    '/homepage': {
      type: MultiMarkdownPageBuilderPlugin,
      pluginConfig
    }
  }
};
```
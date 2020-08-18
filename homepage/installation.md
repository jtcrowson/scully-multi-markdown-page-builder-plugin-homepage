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
        // add multiple markdown section builders (MarkdownSectionBuilder[])...
    ],
    title: 'Home' // Optional title to be made available through the ScullyRouteService
}

export const config: ScullyConfig = {
  // ...
  routes: {
    '/homepage': {
      type: MultiMarkdownPageBuilderPlugin,
      ...pluginConfig
    }
  }
};
```

```HTML
<!-- At route defined in ScullyConfig -->
<scully-content></scully-content>
```
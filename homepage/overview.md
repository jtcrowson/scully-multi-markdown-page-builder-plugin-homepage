## Overview

The plugin works by accepting multiple markdown section builders (`MarkdownSectionBuilder[]`) and displaying each section in order, stacked on a single page.

![Overview Diagram](assets/markdown-section-builder-diagram.png)  

A markdown section builder is defined as follows:

```typescript
interface MarkdownSectionBuilder {
  markdownFileSources: string[];
  sectionBuilder: (markdownHtmls: string[]) => string;
  extras: any;
}
```

Each `MarkdownSectionBuilder` accepts multiple markdown file paths (`markdownFileSources`), each of which are compiled into HTML by the plugin, and then passed as an array of HTML strings to the provided `sectionBuilder` function.

The `sectionBuilder` function is responsible for combining the HTML strings (`markdownHtmls`) into a single HTML string, performing any additional post processing on the HTML, then returning it.  The returned string is then combined with the results of any other `MarkdownSectionBuilder` to create the final page.  The final page HTML is inserted into the `scully-content` tag provided by the Scully Library.

The `extras` property is available for any additional properties that need to be made available to the `sectionBuilder` function.

![Markdown Section Builder Dataflow Diagram](assets/plugin-diagram.png) 

### Example

Here is an example `MarkdownSectionBuilder` that highlights the word "hightlight" in a converted markdown file by wrapping the word in a `mark` tag.

```typescript
const highlightBuilderExample: MarkdownSectionBuilder = {
  sectionBuilder: (markdownHtmls: string[]) => {
    const markdownHtml = markdownHtmls[0];
    return markdownHtml.replace(/highlight/gi, hightlight => `<mark>${hightlight}</mark>`);
  },
  markdownFileSources: ['./homepage/highlightExample.md'],
  extras: {}
}
```
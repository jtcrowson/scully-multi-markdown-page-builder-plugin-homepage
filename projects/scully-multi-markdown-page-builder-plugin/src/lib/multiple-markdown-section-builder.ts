import { MarkdownSectionBuilder } from './plugin-config';

export interface MultipleMarkdownSectionBuilderExtras {
    containerDivId: string | null;
    elementsDivClass: string | null;
}

/**
 * Creates a section of a page from multiple markdown files, and adds the passed css selectors for inserting layout customization.
 * 
 * Example markdown source files:
 * ```md
 * // ./sourceDir/file1.md
 * # First Markdown Title Content
 * ```
 * ```md
 * // ./sourceDir/file2.md
 * # Second Markdown Title Content
 * ```
 * Example usage: 
 * ```typescript
 * export const config: ScullyConfig = {
 *   // ...
 *   routes: {
 *     '/path': {
 *       type: MultiMarkdownPageBuilderPlugin,
 *       sectionBuilders: [
 *         createMultipleMarkdownSection(['./sourceDir/file1.md', './sourceDir/file2.md'], { containerDivId: 'gridContainer', elementsDivClass: 'grid-item' })
 *       ]
 *     }
 *   }
 * };
 * ```
 * Example output: 
 * ```html
 * <div id="gridContainer">
 *  <div id="element1" class="grid-item">
 *      <h1>First Markdown Title Content</h1>
 *  </div>
 *  <div id="element2" class="grid-item">
 *      <h1>Second Markdown Title Content</h1>
 *  </div>
 * </div>
 * ```
 * @param {string[]} markdownFileSources source of the markdown files to be converted into HTML, then passed into the sectionBuilder
 * @param {SingleMarkdownSectionBuilderExtras} extras The `containerIdAttribute` will be attached as the `id` attribute value for the container div.  The `elementsDivClass` will be attached as the `class` attribute value for the interior element div.  Passing `null` for either will omit the selector.
 * @returns A `MarkdownSectionBuilder` that will be used by the plugin to create the single markdown section.
 */
export function createMultipleMarkdownSection(markdownFileSources: string[], extras: MultipleMarkdownSectionBuilderExtras): MarkdownSectionBuilder {
    return {
        sectionBuilder: (markdownHtmls: string[]) => {
            let markdownFileIndex = 1;
            const combinedMarkdownHtml = markdownHtmls.reduce((combined, currentMarkdownHtml) =>  {
                const idAttribute = ` id="element${markdownFileIndex++}"`;
                const classAttribute = extras.elementsDivClass === null ? '' : ` class="${extras.elementsDivClass}"`;
                return combined + `<div${idAttribute}${classAttribute}>${currentMarkdownHtml}</div>`;
            },
            '');
            const idAttribute = extras.containerDivId === null ? '' : ` id="${extras.containerDivId}"`;
            return `<div${idAttribute}>${combinedMarkdownHtml}</div>`;
        },
        markdownFileSources: markdownFileSources,
        extras
    }
}

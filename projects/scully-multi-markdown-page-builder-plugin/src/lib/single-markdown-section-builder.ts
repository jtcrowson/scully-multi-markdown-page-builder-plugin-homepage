import { MarkdownSectionBuilder } from './plugin-config';

export interface SingleMarkdownSectionBuilderExtras {
    containerDivId: string | null;
    elementDivId: string | null;
}

/**
 * Creates a section of a page from a single markdown file, and adds the passed css selectors for inserting layout customization.
 * 
 * Example markdown source file:
 * ```md
 * # Markdown Title Content
 * ```
 * Example usage: 
 * ```typescript
 * export const config: ScullyConfig = {
 *   // ...
 *   routes: {
 *     '/path': {
 *       type: MultiMarkdownPageBuilderPlugin,
 *       sectionBuilders: [
 *         createSingleMarkdownSection('./homepage/installation.md', { containerDivId: 'installationContainer', elementDivId: 'installationItem' }),
 *       ]
 *     }
 *   }
 * };
 * ```
 * Example output: 
 * ```html
 * <div id="installationContainer">
 *  <div id="installationItem">
 *      <h1>Markdown Title Content</h1>
 *  </div>
 * </div>
 * ```
 * @param {string} markdownFileSource source of the markdown file to be converted into HTML, then passed into the pageBuilder
 * @param {SingleMarkdownSectionBuilderExtras} extras The `containerIdAttribute` will be attached as the `id` attribute value for the container div.  The `elementIdAttribute` will be attached as the `id` attribute value for the interior element div.  Passing `null` for either will omit the selector.
 * @returns A `MarkdownSectionBuilder` that will be used by the plugin to create the single markdown section.
 */
export function createSingleMarkdownSection(markdownFileSource: string, extras: SingleMarkdownSectionBuilderExtras): MarkdownSectionBuilder {
    return {
        pageBuilder: (markdownHtmls: string[]) => {
            const containerIdAttribute = extras.containerDivId === null ? '' : ` id="${extras.containerDivId}"`;
            const elementIdAttribute = extras.elementDivId === null ? '' : ` id="${extras.elementDivId}"`;
            return `<div${containerIdAttribute}><div${elementIdAttribute}>${markdownHtmls[0]}</div></div>`
        },
        markdownFileSources: [markdownFileSource],
        extras
    }
}
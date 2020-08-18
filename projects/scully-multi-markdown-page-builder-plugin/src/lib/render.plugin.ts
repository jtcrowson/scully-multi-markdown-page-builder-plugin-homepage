import { HandledRoute, logWarn, yellow } from '@scullyio/scully';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { parse } from 'marked';
import { MarkdownSectionBuilder } from './plugin-config';

const scullyBegin = '<!--scullyContent-begin-->';
const scullyEnd = '<!--scullyContent-end-->';

export async function renderPlugin(html: string, route: HandledRoute) {
  const sectionBuilders: MarkdownSectionBuilder[] = route.config.sectionBuilders;

  try {
    let attr = '';
    try {
      attr = getIdAttrName(html.split('<scully-content')[1].split('>')[0].trim());
    } catch (e) {
      logWarn(`
        ----------------
        Error, missing "${yellow('<scully-content>')}" in route "${yellow(route.route)}"
        without <scully-content> we can not render this route.
        Make sure it is in there, and not inside any conditionals (*ngIf)
        You can check this by opening "${yellow(`://localhost:4200/${route.route}`)}"
        when you serve your app with ${yellow('ng serve')} and then in the browsers console run:
        ${yellow(`document.querySelector('scully-content')`)}
        ----------------
        `);
    }
    let additionalHTML = ''
    for (const builder of sectionBuilders) {
      const markdownHtmls: string[] = [];
      for (const markdownFileSource of builder.markdownFileSources) {
        const originalFile = readFileSync(markdownFileSource, 'utf-8');
        const options: marked.MarkedOptions = {
          highlight: (code, language) => {
            const hljs = require('highlight.js');
            const validLanguage = hljs.getLanguage(language)
              ? language
              : 'plaintext';
            return hljs.highlight(validLanguage, code).value;
          },
          pedantic: false,
          gfm: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false
        };
        let markdownHtml = parse(originalFile, options);
        markdownHtmls.push(markdownHtml);
      }
      additionalHTML = additionalHTML + builder.sectionBuilder(markdownHtmls)
    }
    
    const htmlWithNgAttr = addNgIdAttribute(additionalHTML, attr);
    return insertContent(scullyBegin, scullyEnd, html, htmlWithNgAttr, getScript(attr));
  } catch (e) {

    logWarn(`Error, while rendering content for "${yellow(route.route)}" from files: "${yellow(sectionBuilders.map(builder => builder.markdownFileSources))}"`);
    console.error(e);
  }
}

function addNgIdAttribute(html: string, id: string): string {
  if (!id) {
    return html;
  }
  try {
    const dom = new JSDOM(html, { runScripts: 'outside-only' });
    const { window } = dom;
    const { document } = window;
    const walk = document.createTreeWalker(document.body as any);
    let cur = (walk.currentNode as any) as HTMLElement;
    while (cur) {
      if (cur.nodeType === 1) {
        cur.setAttribute(id, '');
      }
      cur = (walk.nextNode() as any) as HTMLElement;
    }
    return document.body.innerHTML;
  } catch (e) {
    console.error(e);
  }

  return '';
}

function getIdAttrName(attrs: string): string {
  try {
    return (
      attrs &&
      attrs
        .split(' ')
        .find((at: string) => at.trim().startsWith('_ngcontent'))
        .split('=')[0]
    );
  } catch {
    return '6';
  }
}

function getScript(attr): string {
  // tslint:disable-next-line:no-unused-expression
  return `<script>try {window['scullyContent'] = {cssId:"${attr}",html:document.body.innerHTML.split('<!--scullyContent-begin-->')[1].split('<!--scullyContent-end-->')[0]};} catch(e) {console.error('scully could not parse content');}</script>`;
}

function insertContent(
  startTag: string,
  endTag: string,
  html: string,
  insertText: string,
  ...extras
) {
  try {
    const [openingText, rest] = html.split(startTag);
    const [takeout, endText] = rest.split(endTag);
    return [openingText, startTag, insertText, endTag, ...extras, endText].join(
      ''
    );
  } catch (e) {}
  /** warning is already handled, only put in stub content. */
  // logWarn(`missing "${yellow('<scully-content>')}"`);
  return `<h1>Scully could not find the &lt.scully-content&gt. tag in this page.</h1>
  <p>This error can happen when you forgot to put the  mandatory "scully-content" in the component that is rendering this page?</p>
  <p>Or when the tag is not shown on page load. Did you put it inside an \`*ngIf\`?</p>
  `;
}
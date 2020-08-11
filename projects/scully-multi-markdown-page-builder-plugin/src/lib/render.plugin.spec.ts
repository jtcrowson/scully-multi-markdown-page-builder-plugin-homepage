import { renderPlugin } from './render.plugin';
import { HandledRoute } from '@scullyio/scully';
import { createSingleMarkdownSection } from './single-markdown-section-builder';
import { createMultipleMarkdownSection } from './multiple-markdown-section-builder';
import { MultiMarkdownPageBuilderPluginName } from './plugin-name';

const exampleHtml = `
    <!DOCTYPE html><html lang="en"><head><meta name="generator" content="Scully 1.0.0-beta.0">
    <meta charset="utf-8">
    <script>window['ScullyIO']='generated';</script></head>
    <body scully-version="1.0.0-beta.0">
    <app-root _nghost-van-c19="" ng-version="9.1.12"><router-outlet _ngcontent-van-c19=""></router-outlet><app-home _nghost-van-c20=""><!--scullyContent-begin--><h2 id="___scully-parsing-error___">Sorry, could not parse static page content</h2>
            <p>This might happen if you are not using the static generated pages.</p><!--scullyContent-end--><scully-content _ngcontent-van-c20=""></scully-content></app-home><!--container--></app-root>
    <script id="ScullyIO-transfer-state"></script><script src="runtime-es2015.js" type="module"></script><script src="runtime-es5.js" nomodule="" defer=""></script><script src="polyfills-es5.js" nomodule="" defer=""></script><script src="polyfills-es2015.js" type="module"></script><script src="styles-es2015.js" type="module"></script><script src="styles-es5.js" nomodule="" defer=""></script><script src="vendor-es2015.js" type="module"></script><script src="vendor-es5.js" nomodule="" defer=""></script><script src="main-es2015.js" type="module"></script><script src="main-es5.js" nomodule="" defer=""></script>
    </body></html>
`;

describe('MultiMarkdownPageBuilderPlugin Render', () => {
    describe('createSingleMarkdownSection', () => {
        it('should add a single markdown file html with containerDivId and elementDivId', (done) => {
            const exampleHandledRoute: HandledRoute = {
                route: '/test',
                type: MultiMarkdownPageBuilderPluginName,
                config: {
                    sectionBuilders: [
                        createSingleMarkdownSection(
                            './projects/scully-multi-markdown-page-builder-plugin/src/test/test1.md', 
                            { 
                                containerDivId: 'containerDiv', 
                                elementDivId: 'elementDiv'
                            }
                        )
                    ]
                }
            };
            renderPlugin(exampleHtml, exampleHandledRoute).then(result => {
                const expectedSubstrings = [
                    '<div id="containerDiv"',
                    '<div id="elementDiv"',
                    '<h1',
                    '>Title text 1</h1>',
                    '</div></div>'
                ]
                expect(containsAllSubstringsInOrder(result, expectedSubstrings)).toBe(true);
                done();
            });
        });

        it('should add a single markdown file html without containerDivId and elementDivId', (done) => {
            const exampleHandledRoute: HandledRoute = {
                route: '/test',
                type: MultiMarkdownPageBuilderPluginName,
                config: {
                    sectionBuilders: [
                        createSingleMarkdownSection(
                            './projects/scully-multi-markdown-page-builder-plugin/src/test/test1.md', 
                            { 
                                containerDivId: null, 
                                elementDivId: null
                            }
                        )
                    ]
                }
            };
            renderPlugin(exampleHtml, exampleHandledRoute).then(result => {
                const expectedSubstrings = [
                    '<div _ngcontent',
                    '<div _ngcontent',
                    '<h1',
                    '>Title text 1</h1>',
                    '</div></div>'
                ]
                expect(containsAllSubstringsInOrder(result, expectedSubstrings)).toBe(true);
                done();
            });
        });
    });

    describe('createSingleMarkdownSection', () => {
        it('should add multiple markdown file htmls with containerDivId and elementsDivClass', (done) => {
            const exampleHandledRoute: HandledRoute = {
                route: '/test',
                type: MultiMarkdownPageBuilderPluginName,
                config: {
                    sectionBuilders: [
                        createMultipleMarkdownSection(
                            [
                                './projects/scully-multi-markdown-page-builder-plugin/src/test/test1.md',
                                './projects/scully-multi-markdown-page-builder-plugin/src/test/test2.md'
                            ],
                            {
                                containerDivId: 'containerDiv',
                                elementsDivClass: 'item-div'
                            }
                        )
                    ]
                }
            };
            renderPlugin(exampleHtml, exampleHandledRoute).then(result => {
                const expectedSubstrings = [
                    '<div id="containerDiv"',
                    '<div id="element1" class="item-div"',
                    '<h1',
                    '>Title text 1</h1>',
                    '</div>',
                    '<div id="element2" class="item-div"',
                    '<h1',
                    '>Title text 2</h1>',
                    '</div></div>',
                ]
                expect(containsAllSubstringsInOrder(result, expectedSubstrings)).toBe(true);
                done();
            });
        });

        it('should add multiple markdown file htmls without containerDivId and elementsDivClass', (done) => {
            const exampleHandledRoute: HandledRoute = {
                route: '/test',
                type: MultiMarkdownPageBuilderPluginName,
                config: {
                    sectionBuilders: [
                        createMultipleMarkdownSection(
                            [
                                './projects/scully-multi-markdown-page-builder-plugin/src/test/test1.md',
                                './projects/scully-multi-markdown-page-builder-plugin/src/test/test2.md'
                            ],
                            {
                                containerDivId: null,
                                elementsDivClass: null
                            }
                        )
                    ]
                }
            };
            renderPlugin(exampleHtml, exampleHandledRoute).then(result => {
                const expectedSubstrings = [
                    '<div _ngcontent',
                    '<div id="element1" _ngcontent',
                    '<h1',
                    '>Title text 1</h1>',
                    '</div>',
                    '<div id="element2" _ngcontent',
                    '<h1',
                    '>Title text 2</h1>',
                    '</div></div>',
                ]
                expect(containsAllSubstringsInOrder(result, expectedSubstrings)).toBe(true);
                done();
            });
        });
    });
    
});

function containsAllSubstringsInOrder(source: string, substrings: string[]): boolean {
    let currentIndex = 0;
    for (const substring of substrings) {
        currentIndex = source.indexOf(substring, currentIndex);
        if (currentIndex < 0) {
            return false;
        }
    }
    return true;
}

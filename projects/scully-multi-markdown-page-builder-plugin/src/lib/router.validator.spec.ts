import { MultiMarkdownPageBuilderPluginConfig } from './plugin-config';
import { createSingleMarkdownSection } from './single-markdown-section-builder';
import { routerValidator } from './router.validator';
import { createMultipleMarkdownSection } from './multiple-markdown-section-builder';

describe('MultiMarkdownPageBuilderPlugin Router', () => {
    it('should not add errors for correct types', (done) => {
        const config: MultiMarkdownPageBuilderPluginConfig = {
            sectionBuilders: [
                createSingleMarkdownSection('./test.md', { containerDivId: '', elementDivId: '' }),
                createMultipleMarkdownSection(['./test.md', './test.md'], { containerDivId: '', elementsDivClass: '' })
            ],
            title: 'Homepage'
        };
        routerValidator(config).then(errors => {
            expect(errors.length).toBe(0);
            done();
        });
    });

    it('should add errors for missing sectionBuilder', (done) => {
        const config = {} as MultiMarkdownPageBuilderPluginConfig;
        routerValidator(config).then(errors => {
            expect(errors.length).toBe(1);
            done();
        });
    });
});
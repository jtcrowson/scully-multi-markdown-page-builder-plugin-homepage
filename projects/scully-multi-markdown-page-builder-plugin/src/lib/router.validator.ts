import { MultiMarkdownPageBuilderPluginConfig } from './plugin-config';
import { MultiMarkdownPageBuilderPluginName } from './plugin-name';

export const routerValidator = async (config: MultiMarkdownPageBuilderPluginConfig) => {
    if (config.sectionBuilders === undefined || !Array.isArray(config.sectionBuilders)) {
        return [`Missing a sectionBuilders array in the ${MultiMarkdownPageBuilderPluginName} config.`];
    } else {
        return config.sectionBuilders.reduce((errors, sectionBuilder) => {
            if (sectionBuilder.pageBuilder === undefined || !(sectionBuilder.pageBuilder instanceof Function)) {
                errors.push(`Missing pageBuilder function type in section builder: ${sectionBuilder}`);
            }
            if (sectionBuilder.markdownFileSources === undefined || !Array.isArray(sectionBuilder.markdownFileSources)) {
                errors.push(`Missing markdownFileSources array type in section builder: ${sectionBuilder}`);
            }
            return errors;
        }, [] as string[])
    }
};

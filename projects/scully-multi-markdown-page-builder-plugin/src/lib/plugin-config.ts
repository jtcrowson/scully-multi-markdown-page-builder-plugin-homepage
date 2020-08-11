export interface MultiMarkdownPageBuilderPluginConfig {
  sectionBuilders: MarkdownSectionBuilder[];
  title: string | undefined;
}

export type SectionBuilder = (markdownHtmls: string[]) => string

export interface MarkdownSectionBuilder {
  pageBuilder: SectionBuilder;
  markdownFileSources: string[];
  extras: any;
}
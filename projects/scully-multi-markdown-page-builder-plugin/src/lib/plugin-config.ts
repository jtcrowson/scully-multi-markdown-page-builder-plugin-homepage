import { RouteTypeUnknown } from '@scullyio/scully/lib/utils/interfacesandenums';

export interface MultiMarkdownPageBuilderPluginConfig {
  sectionBuilders: MarkdownSectionBuilder[];
  title: string | undefined;
  postRenderers: string[] | undefined;
}

export type SectionBuilder = (markdownHtmls: string[]) => string

export interface MarkdownSectionBuilder {
  sectionBuilder: SectionBuilder;
  markdownFileSources: string[];
  extras: any;
}
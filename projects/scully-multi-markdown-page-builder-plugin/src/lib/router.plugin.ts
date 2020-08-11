import { HandledRoute } from '@scullyio/scully';
import { MultiMarkdownPageBuilderPluginName } from './plugin-name';
import { MultiMarkdownPageBuilderPluginConfig } from './plugin-config';

export function routerPlugin(
    route: string,
    config: MultiMarkdownPageBuilderPluginConfig
  ): Promise<HandledRoute[]> {
    const routes: HandledRoute[] = [
      {
        type: MultiMarkdownPageBuilderPluginName,
        route: route === '' ? '/' : route,
        config,
        postRenderers: [MultiMarkdownPageBuilderPluginName],
        title: config.title
      }
    ]
    return Promise.resolve(routes);
  }
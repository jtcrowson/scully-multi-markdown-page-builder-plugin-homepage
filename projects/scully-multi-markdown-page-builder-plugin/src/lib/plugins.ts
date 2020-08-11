import { registerPlugin } from '@scullyio/scully';
import { renderPlugin } from './render.plugin';
import { routerPlugin } from './router.plugin';
import { renderValidator } from './render.validator';
import { routerValidator } from './router.validator';
import { MultiMarkdownPageBuilderPluginName } from './plugin-name';

export const MultiMarkdownPageBuilderPlugin = MultiMarkdownPageBuilderPluginName;

registerPlugin('render', MultiMarkdownPageBuilderPlugin, renderPlugin, renderValidator);
registerPlugin('router', MultiMarkdownPageBuilderPlugin, routerPlugin, routerValidator);

import { marked } from 'marked';
import { filterElementsHtmlSecurity } from './filter-elements-html-security';

export const useMarked = (textMarked): string =>
  filterElementsHtmlSecurity(marked.parse(textMarked));

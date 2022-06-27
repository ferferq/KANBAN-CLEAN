import DOMPurify from 'dompurify';

export const filterElementsHtmlSecurity = (text: string): string => {
  return DOMPurify.sanitize(text);
};

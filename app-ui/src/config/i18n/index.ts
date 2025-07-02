import { DevTools, Tolgee } from '@tolgee/react';
// @ts-ignore
import { FormatIcu } from '@tolgee/format-icu'; 

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .init({
    language: 'en',
    availableLanguages: ['en'],
    fallbackLanguage: 'en',
    defaultLanguage: 'en', 
    staticData: {
      en: async () => import('./data/en.json'), 
    }
  });

export default tolgee;

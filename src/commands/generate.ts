import { generatePageTemplate } from '../generators/page';

export async function generatePage(name: string, template: string, title: string) {
  await generatePageTemplate(name, template, title);
}

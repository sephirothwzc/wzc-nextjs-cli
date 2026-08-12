import path from 'node:path';

import { get } from 'es-toolkit/compat';
import fs from 'fs-extra';
import Handlebars from 'handlebars';

import { nameToProp, TemplateConst, TemplateProp } from '../utils/const-utils';
import { fail, logSuccess } from '../utils/exit-utils';

export type NameProp = {
  name: string;
  /**
   * name 直接转换成的 文件路径
   */
  filePath: string;
  /**
   * 文件名 中横线分词
   */
  fileName: string;
  /**
   * 对象名称 大驼峰命名
   */
  objectName: string;
  /**
   * 变量名 小驼峰命名
   */
  constName: string;
  /**
   * 标题
   */
  title: string;

  /** 目录层级 */
  pathParts: string[];
};

/**
 * 根据模版生成
 * @param name
 * @param template
 */
export async function generatePageTemplate(name: string, template: string, title: string) {
  const item: TemplateProp = get(TemplateConst, template);
  if (!item) {
    fail('template 变量不存在 请输入 table、form');
  }

  const templatePath = path.resolve(item.pagePath);
  if (!(await fs.exists(templatePath))) {
    throw new Error(`template ${template} not found`);
  }

  const targetPath = path.resolve(`${item.filePath}/${name}`);

  // name 处理参数
  const renderProp = nameToProp(name, title);

  await renderDirectory(templatePath, targetPath, renderProp);
}

/**
 * 生成
 * @param source 模版路径 hbs
 * @param target 输出路径
 * @param data 绑定参数
 */
async function renderDirectory(source: string, target: string, data: NameProp) {
  const files = await fs.readdir(source, {
    withFileTypes: true,
  });

  for (const file of files) {
    const sourceFile = path.join(source, file.name);

    const fileName = file.name.replace('[page]', data.fileName).replace(/\.hbs$/, '');

    const targetFile = path.join(target, fileName);

    if (file.isDirectory()) {
      await renderDirectory(sourceFile, targetFile, data);

      continue;
    }

    const content = await fs.readFile(sourceFile, 'utf8');

    const render = Handlebars.compile(content);

    await fs.ensureDir(path.dirname(targetFile));

    await fs.writeFile(targetFile, render(data));

    logSuccess(targetFile);
  }
}

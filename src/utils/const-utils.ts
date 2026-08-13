/**
 * @ Author: zhanchao.wu
 * @ Create Time: 2026-08-11 22:10:07
 * @ Modified by: zhanchao.wu
 * @ Modified time: 2026-08-13 13:59:01
 * @ Description:
 */

import { camelCase, kebabCase, last, upperFirst } from 'es-toolkit';

import { NameProp } from '../generators/page';

/**
 * 基础路径
 */
const basePath = 'src/app/(protected)';

export type TemplateProp = {
  pagePath: string;
  filePath: string;
};

export const TemplateConst = {
  table: {
    /**
     * 模版路径
     */
    pagePath: 'src/template/main-layout/page',
    /**
     * 输出路径
     */
    filePath: `${basePath}/(main-layout)/`,
  },
  form: {
    pagePath: 'src/template/form-layout/page',
    filePath: `${basePath}/(form-layout)/`,
  },
};

/**
 * 名称变变量
 * @param name
 * @returns
 */
export const nameToProp = (name: string, title: string): NameProp => {
  const pathParts = name.split('/').filter(Boolean);

  const fileName = kebabCase(last(pathParts) as string);

  const objectName = upperFirst(camelCase(fileName));

  return {
    name,
    filePath: name,
    fileName,
    objectName,
    constName: camelCase(fileName),
    title,
    pathParts,
    now: new Date().toISOString().replace('T', ' ').slice(0, 19),
  };
};

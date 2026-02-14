import { promises as fs } from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import { getSvgoConfig, type IconType } from './converter.js';
import { toPascalCase, toLabel } from './name-utils.js';
import { generateComponentCode, generateIndexCode } from './template.js';

export interface GenerateIconsOptions {
  input: string;
  output: string;
  monoDir?: string;
  fullcolorDir?: string;
}

interface IconSource {
  fileName: string;
  filePath: string;
  type: IconType;
}

type IconGeneratorError =
  | { type: 'INVALID_SVG'; path: string; reason: string }
  | { type: 'DUPLICATE_NAME'; name: string; files: string[] };

/**
 * ディレクトリからSVGファイル一覧を取得
 */
const getSvgFilesFromDir = async (
  dirPath: string,
  type: IconType
): Promise<IconSource[]> => {
  try {
    await fs.access(dirPath);
    const files = await fs.readdir(dirPath);
    return files
      .filter((f) => f.endsWith('.svg'))
      .map((fileName) => ({
        fileName,
        filePath: path.join(dirPath, fileName),
        type,
      }));
  } catch {
    return [];
  }
};

/**
 * SVGファイルをReactコンポーネントに変換
 */
export const generateIcons = async (
  options: GenerateIconsOptions
): Promise<{ success: boolean; count: number; errors: string[] }> => {
  const { input, output, monoDir = 'mono', fullcolorDir = 'fullcolor' } = options;

  const monoDirPath = path.join(input, monoDir);
  const fullcolorDirPath = path.join(input, fullcolorDir);

  // 両ディレクトリからSVGファイルを収集
  const monoIcons = await getSvgFilesFromDir(monoDirPath, 'mono');
  const fullcolorIcons = await getSvgFilesFromDir(fullcolorDirPath, 'fullcolor');

  // フラットなSVGファイルも収集（サブディレクトリがない場合）
  const flatIcons = await getSvgFilesFromDir(input, 'mono');

  // サブディレクトリがある場合はそちらを優先、なければフラットなSVGを使用
  const allIcons = monoIcons.length > 0 || fullcolorIcons.length > 0
    ? [...monoIcons, ...fullcolorIcons]
    : flatIcons;

  if (allIcons.length === 0) {
    return {
      success: false,
      count: 0,
      errors: [`No SVG files found in ${input}`],
    };
  }

  // 出力ディレクトリの作成
  await fs.mkdir(output, { recursive: true });

  // 重複チェック
  const componentNames: string[] = [];
  const errors: IconGeneratorError[] = [];
  const nameToFiles: Map<string, { file: string; type: IconType }[]> = new Map();

  for (const icon of allIcons) {
    const componentName = toPascalCase(icon.fileName);
    const existing = nameToFiles.get(componentName) || [];
    nameToFiles.set(componentName, [...existing, { file: icon.fileName, type: icon.type }]);
  }

  for (const [name, files] of nameToFiles) {
    if (files.length > 1) {
      const fileDescriptions = files.map((f) => `${f.file} (${f.type})`);
      errors.push({
        type: 'DUPLICATE_NAME',
        name,
        files: fileDescriptions,
      });
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      count: 0,
      errors: errors.map((e) =>
        e.type === 'DUPLICATE_NAME'
          ? `Duplicate name "${e.name}": ${e.files.join(', ')}`
          : `Invalid SVG ${e.path}: ${e.reason}`
      ),
    };
  }

  // 各SVGファイルを変換
  for (const icon of allIcons) {
    try {
      const componentName = toPascalCase(icon.fileName);
      const label = toLabel(componentName);

      const svgContent = await fs.readFile(icon.filePath, 'utf-8');
      const optimized = optimize(svgContent, getSvgoConfig(icon.type));
      const componentCode = generateComponentCode(componentName, label, optimized.data);

      await fs.writeFile(path.join(output, `${componentName}.tsx`), componentCode);
      componentNames.push(componentName);
    } catch (error) {
      errors.push({
        type: 'INVALID_SVG',
        path: icon.fileName,
        reason: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // index.tsの生成
  if (componentNames.length > 0) {
    const indexCode = generateIndexCode(componentNames);
    await fs.writeFile(path.join(output, 'index.ts'), indexCode);
  }

  return {
    success: errors.length === 0,
    count: componentNames.length,
    errors: errors.map((e) =>
      e.type === 'DUPLICATE_NAME'
        ? `Duplicate name "${e.name}": ${e.files.join(', ')}`
        : `Invalid SVG ${e.path}: ${e.reason}`
    ),
  };
};

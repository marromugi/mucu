export interface MucuConfig {
  $schema?: string;
  componentsDir: string;
  libDir: string;
  stylesDir: string;
  iconsDir: string;
  typescript: boolean;
  aliases: {
    components: string;
    lib: string;
    icons: string;
  };
}

export interface RegistryFile {
  path: string;
  type: 'component' | 'style' | 'lib';
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: 'component' | 'lib' | 'style';
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface Registry {
  name: string;
  version: string;
  items: RegistryItem[];
  utilities: RegistryItem[];
  styles: RegistryItem[];
}

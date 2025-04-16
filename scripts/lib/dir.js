import fsp from 'fs/promises';
import path from 'path';

export const assets = async root => {
  const files = await fsp.readdir(root, { recursive: true });

  return files
    .filter(file => /\..*$/ui.test(file))
    .map(file => {
      const x = path.normalize(file);

      return { in: path.join(root, x), out: x.replace(/\..*/ui, '') };
    });
};

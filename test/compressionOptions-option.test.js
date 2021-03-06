import CompressionPlugin from '../src/index';

import {
  compile,
  getAssetsNameAndSize,
  getCompiler,
  getErrors,
  getWarnings,
  removeCache,
} from './helpers/index';

describe('"compressionOptions" option', () => {
  let compiler;

  beforeEach(() => {
    compiler = getCompiler('./entry.js');

    return removeCache();
  });

  it('matches snapshot without values', async () => {
    new CompressionPlugin({
      minRatio: 1,
    }).apply(compiler);

    const stats = await compile(compiler);

    expect(getAssetsNameAndSize(stats)).toMatchSnapshot('assets');
    expect(getWarnings(stats)).toMatchSnapshot('errors');
    expect(getErrors(stats)).toMatchSnapshot('warnings');
  });

  it('matches snapshot for custom options ({Object})', async () => {
    new CompressionPlugin({
      compressionOptions: {
        level: 9,
      },
      minRatio: 1,
    }).apply(compiler);

    const stats = await compile(compiler);

    expect(getAssetsNameAndSize(stats)).toMatchSnapshot('assets');
    expect(getWarnings(stats)).toMatchSnapshot('errors');
    expect(getErrors(stats)).toMatchSnapshot('warnings');
  });
});

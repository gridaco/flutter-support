// This file is auto-generated by Grida.

/**
 * @type {import('grida').GridaConfig}
 */
const config = {
  name: 'example',
  type: 'project',
  $schema: 'node_modules/@grida/grida-config-schema/v1.json',
  designsource: {
    provider: 'figma',
    file: 'KxtkLFdRQOURmYn3Q4bYTV',
    client: 'api.figma.com',
  },
  fallbackDir: './grida',
  framework: {
    framework: 'react',
    language: 'tsx',
    styling: {
      type: 'styled-components',
      module: '@emotion/styled',
    },
    component_declaration_style: {
      exporting_style: {
        type: 'export-named-functional-component',
        declaration_syntax_choice: 'function',
        export_declaration_syntax_choice: 'export',
        exporting_position: 'with-declaration',
      },
    },
  },
};

module.exports = config;
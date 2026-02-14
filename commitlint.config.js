export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['cli', 'registry', 'deps', 'release'],
    ],
    'scope-empty': [2, 'never'],
  },
};

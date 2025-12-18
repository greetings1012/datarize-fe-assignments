module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    jsx: true,
    useJSXTextNode: true,
  },
  // 확장 규칙
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier', // Prettier와 충돌 방지
    'plugin:react/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'react',
    'react-hooks',
    'simple-import-sort',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    semi: 'off',
    // TypeScript 관련 규칙 완화
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    // 사용하지 않는 변수 체크 (rest siblings는 제외)
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    // 네이밍 컨벤션: 변수(camelCase/UPPER_CASE/PascalCase), 함수/인터페이스(PascalCase)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
        leadingUnderscore: 'allow',
      },
      { format: ['camelCase', 'PascalCase'], selector: 'function' },
      { format: ['PascalCase'], selector: 'interface' },
      { format: ['PascalCase'], selector: 'typeAlias' },
    ],
    // 클래스 멤버 순서 규칙
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'private-static-field',
          'public-instance-field',
          'private-instance-field',
          'public-constructor',
          'private-constructor',
          'public-instance-method',
          'private-instance-method',
        ],
      },
    ],
    // React 관련 규칙
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'error', // 보안: target="_blank" 시 rel="noopener" 필수
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // emotion css prop 허용
    'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 준수
    'react-hooks/exhaustive-deps': 'error', // useEffect 의존성 배열 체크
    // 함수 컴포넌트는 화살표 함수로 정의
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-pascal-case': 'error', // JSX 컴포넌트는 PascalCase
    // Import 정렬
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off', // simple-import-sort 사용
    'import/order': 'off', // simple-import-sort 사용
    'import/no-duplicates': 'error', // 중복 import 방지
    'import/no-default-export': 'error', // default export 금지
    '@typescript-eslint/no-var-requires': 'warn', // require() 사용 경고
    // 제한된 import: util.isArray 대신 Array.isArray 사용
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            importNames: ['isArray'],
            message: '`Array.isArray`를 대신 사용해주세요!',
          },
        ],
      },
    ],
    // 일반 JavaScript 규칙
    'no-implicit-coercion': 'error', // 암묵적 타입 변환 금지
    'prefer-const': 'error', // const 선호
    'no-var': 'error', // var 사용 금지
    curly: ['error', 'all'], // 중괄호 필수
    eqeqeq: ['error', 'always', { null: 'ignore' }], // === 사용 (null은 예외)
    // 경고 주석 체크
    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
        location: 'anywhere',
      },
    ],
    'no-undef': 'off', // TypeScript가 처리
    'no-extra-boolean-cast': 'off',
    'getter-return': 'warn',
    'no-async-promise-executor': 'warn',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'func-style': ['error', 'expression'], // 함수 표현식 사용
  },
  // 특정 파일에 대한 규칙 오버라이드
  overrides: [
    {
      files: ['**/*.config.{js,ts,cjs,mjs,cts,mts}', '**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off', // 설정 파일은 default export 허용
      },
    },
  ],
};

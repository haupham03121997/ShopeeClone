## Setup eslint prettier

Run command

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks -D
```

Cấu hình ESLint

Tạo file `.eslintrc.cjs` tại thư mục root

```js
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    extends: [
        // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        // Disable các rule mà eslint xung đột với prettier.
        // Để cái này ở dưới để nó override các rule phía trên!.
        'eslint-config-prettier',
        'prettier'
    ],
    plugins: ['prettier'],
    settings: {
        react: {
            // Nói eslint-plugin-react tự động biết version của React.
            version: 'detect'
        },
        // Nói ESLint cách xử lý các import
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname, '')],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    env: {
        node: true
    },
    rules: {
        // Tắt rule yêu cầu import React trong file jsx
        'react/react-in-jsx-scope': 'off',
        // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
        'react/jsx-no-target-blank': 'warn',
        // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                semi: false,
                trailingComma: 'none',
                tabWidth: 2,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true
            }
        ]
    }
}
```

Tạo file `.eslintignore`

```json
node_modules/
dist/
```

```json
{
    "arrowParens": "always",
    "semi": false,
    "trailingComma": "none",
    "tabWidth": 2,
    "endOfLine": "auto",
    "useTabs": false,
    "singleQuote": true,
    "printWidth": 120,
    "jsxSingleQuote": true
}
```

Tạo file `.prettierignore`

```json
node_modules/
dist/
```

Thêm script mới vào `package.json`

```json
  "scripts": {
    ...
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
  },
```

### Cài editorconfig

Tạo file `.editorconfig` ở thư mục root

```EditorConfig
[*]
indent_size = 2
indent_style = space
```

### Cấu hình tsconfig.json

Set `"target": "ES2015"` và `"baseUrl": "."` trong `compilerOptions`

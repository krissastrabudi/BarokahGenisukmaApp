module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        jest: true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "it": "writable",
        "process": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "react/prop-types": 0
    },
    "parser": "babel-eslint",
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};
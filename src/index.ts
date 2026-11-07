import { Rule, Linter } from 'eslint';

// Import the rule modules
const detectUnsafeRegex: Rule.RuleModule = require('./rules/detect-unsafe-regex');

import * as pkg from '../package.json';

// Define the plugin object
interface Plugin {
    meta: {
        name: string;
        version: string;
    };
    rules: Record<string, Rule.RuleModule>;
    rulesConfig: Record<string, number>;
    configs: {
        recommended?: Linter.Config;
    };
}

// Define the plugin object
const plugin: Plugin = {
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
    rules: {
        'detect-unsafe-regex': detectUnsafeRegex,
    },
    rulesConfig: {
        'detect-unsafe-regex': 0,
    },
    configs: {}, // Assigned later so we can reference `plugin`
};

// Recommended config
const recommended: Linter.Config = {
    plugins: ['privacy'],
    rules: {
        'privacy/detect-unsafe-regex': 'warn',
    },
};

// Assign configs to the plugin
Object.assign(plugin.configs, {
    recommended,
});

// Export the plugin as the default export
export = plugin;
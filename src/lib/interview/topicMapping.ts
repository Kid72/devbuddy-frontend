// Maps raw interview question tags to Learn topics for better grouping
// This allows ~200+ raw tags to be consolidated into ~30-50 meaningful topics

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface TopicInfo {
  name: string           // Display name for the topic
  category: string       // Parent category (e.g., "Go Basics", "Concurrency")
  difficulty: Difficulty // easy, medium, or hard
  order: number          // Display order within difficulty level
}

// Difficulty order for sorting (easy first, hard last)
export const difficultyOrder: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

// Comprehensive tag-to-topic mapping for Go language
// Based on actual tags from interview questions database
export const goTopicMapping: Record<string, TopicInfo> = {
  // === GO BASICS (Easy) ===
  // Variables & Types
  'variables': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'var': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'types': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'type-system': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'declaration': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'short-declaration': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'zero-value': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'zero-values': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'default-values': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'defaults': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'nil': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'null': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'nullable': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },
  'assignability': { name: 'Variables & Types', category: 'Go Basics', difficulty: 'easy', order: 1 },

  // Constants
  'constants': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'const': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'iota': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'enum': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'typed-constants': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'untyped-constants': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },
  'bit-flags': { name: 'Constants & Iota', category: 'Go Basics', difficulty: 'easy', order: 2 },

  // Primitive Types
  'int': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'uint': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'integer': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'integers': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'float': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'float32': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'float64': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'numeric': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'complex': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'complex64': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'complex128': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'bool': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'boolean': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },
  'sized-types': { name: 'Numeric Types', category: 'Go Basics', difficulty: 'easy', order: 3 },

  // Strings & Runes
  'string': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'strings': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'strings.builder': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'string-builder': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'rune': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'byte': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'utf-8': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'utf8': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'unicode': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'character': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'concatenation': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'strconv': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },
  'internationalization': { name: 'Strings & Runes', category: 'Go Basics', difficulty: 'easy', order: 4 },

  // Operators & Expressions
  'operators': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'expressions': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'comparison': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'comparable': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'equality': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'bitwise': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'binary': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'hex': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },
  'short-circuit': { name: 'Operators & Expressions', category: 'Go Basics', difficulty: 'easy', order: 5 },

  // Scope & Visibility
  'scope': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'block-scope': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'package-scope': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'local': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'global': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'visibility': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'exported': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'unexported': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'encapsulation': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },
  'shadowing': { name: 'Scope & Visibility', category: 'Go Basics', difficulty: 'easy', order: 6 },

  // Hello World & Basics
  'hello-world': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'first-program': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'main': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'entry-point': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'basics': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'introduction': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'overview': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'key-concepts': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'history': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'google': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'creators': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'philosophy': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'simplicity': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'features': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'adoption': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },
  'companies': { name: 'Getting Started', category: 'Go Basics', difficulty: 'easy', order: 7 },

  // === FUNCTIONS (Medium) ===
  'functions': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'function-types': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'signatures': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'arguments': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'return': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'multiple-returns': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'named-returns': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'naked-return': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'variadic': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'ellipsis': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'pass-by-value': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },
  'value-semantics': { name: 'Functions', category: 'Functions', difficulty: 'medium', order: 1 },

  // Closures & Anonymous Functions
  'closures': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'closure': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'anonymous-functions': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'lambda': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'first-class': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'higher-order': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'callback': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'capture': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'loop-variable': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },
  'functional': { name: 'Closures', category: 'Functions', difficulty: 'medium', order: 2 },

  // Defer
  'defer': { name: 'Defer', category: 'Functions', difficulty: 'medium', order: 3 },
  'execution-order': { name: 'Defer', category: 'Functions', difficulty: 'medium', order: 3 },
  'stack': { name: 'Defer', category: 'Functions', difficulty: 'medium', order: 3 },

  // Init & Lifecycle
  'init': { name: 'Init & Lifecycle', category: 'Functions', difficulty: 'medium', order: 4 },
  'initialization': { name: 'Init & Lifecycle', category: 'Functions', difficulty: 'medium', order: 4 },
  'startup': { name: 'Init & Lifecycle', category: 'Functions', difficulty: 'medium', order: 4 },
  'lifecycle': { name: 'Init & Lifecycle', category: 'Functions', difficulty: 'medium', order: 4 },
  'side-effects': { name: 'Init & Lifecycle', category: 'Functions', difficulty: 'medium', order: 4 },

  // === DATA STRUCTURES (Medium) ===
  // Structs
  'struct': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'named-types': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'custom-types': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'type-definition': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'type-alias': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'alias': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'domain-modeling': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'alignment': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'padding': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'sizeof': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },
  'literals': { name: 'Structs', category: 'Data Structures', difficulty: 'medium', order: 1 },

  // Slices & Arrays
  'slice': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'range': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'bounds': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'reference-types': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'make': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'new': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },
  'built-in': { name: 'Slices & Arrays', category: 'Data Structures', difficulty: 'medium', order: 2 },

  // Maps
  'map': { name: 'Maps', category: 'Data Structures', difficulty: 'medium', order: 3 },
  'comma-ok': { name: 'Maps', category: 'Data Structures', difficulty: 'medium', order: 3 },

  // Pointers
  'pointers': { name: 'Pointers', category: 'Data Structures', difficulty: 'medium', order: 4 },
  'pointer': { name: 'Pointers', category: 'Data Structures', difficulty: 'medium', order: 4 },
  'address': { name: 'Pointers', category: 'Data Structures', difficulty: 'medium', order: 4 },
  'dereference': { name: 'Pointers', category: 'Data Structures', difficulty: 'medium', order: 4 },
  'uintptr': { name: 'Pointers', category: 'Data Structures', difficulty: 'medium', order: 4 },

  // === METHODS & INTERFACES (Medium) ===
  'methods': { name: 'Methods', category: 'OOP', difficulty: 'medium', order: 1 },
  'method-chaining': { name: 'Methods', category: 'OOP', difficulty: 'medium', order: 1 },
  'fluent-api': { name: 'Methods', category: 'OOP', difficulty: 'medium', order: 1 },
  'oop': { name: 'Methods', category: 'OOP', difficulty: 'medium', order: 1 },
  'object-oriented': { name: 'Methods', category: 'OOP', difficulty: 'medium', order: 1 },

  // Interfaces
  'interface': { name: 'Interfaces', category: 'OOP', difficulty: 'medium', order: 2 },
  'interfaces': { name: 'Interfaces', category: 'OOP', difficulty: 'medium', order: 2 },
  'composition': { name: 'Interfaces', category: 'OOP', difficulty: 'medium', order: 2 },

  // Embedding
  'embedding': { name: 'Embedding', category: 'OOP', difficulty: 'medium', order: 3 },
  'promotion': { name: 'Embedding', category: 'OOP', difficulty: 'medium', order: 3 },

  // Type Assertions
  'type-assertion': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },
  'type-switch': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },
  'type-checking': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },
  'type-comparison': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },
  'type-identity': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },
  'underlying-type': { name: 'Type Assertions', category: 'OOP', difficulty: 'medium', order: 4 },

  // === ERROR HANDLING (Medium) ===
  'errors': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'error-handling': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'error-interface': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'sentinel': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'bugs': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'pitfall': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },
  'edge-cases': { name: 'Error Handling', category: 'Error Handling', difficulty: 'medium', order: 1 },

  // Panic & Recover
  'panic': { name: 'Panic & Recover', category: 'Error Handling', difficulty: 'medium', order: 2 },
  'recover': { name: 'Panic & Recover', category: 'Error Handling', difficulty: 'medium', order: 2 },

  // === PACKAGES & MODULES (Medium) ===
  'packages': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'package': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'imports': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'import': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'blank-import': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'organization': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },
  'internal': { name: 'Packages', category: 'Packages & Modules', difficulty: 'medium', order: 1 },

  // Go Modules
  'modules': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'go-mod': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'go-sum': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'mod-tidy': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'dependencies': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'checksums': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'workspaces': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'go-work': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },
  'multi-module': { name: 'Go Modules', category: 'Packages & Modules', difficulty: 'medium', order: 2 },

  // === STANDARD LIBRARY (Medium) ===
  'fmt': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'printf': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'println': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'print': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'formatting': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'format': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'verbs': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },
  'output': { name: 'fmt Package', category: 'Standard Library', difficulty: 'easy', order: 1 },

  // JSON
  'json': { name: 'JSON & Encoding', category: 'Standard Library', difficulty: 'medium', order: 2 },
  'encoding': { name: 'JSON & Encoding', category: 'Standard Library', difficulty: 'medium', order: 2 },
  'parsing': { name: 'JSON & Encoding', category: 'Standard Library', difficulty: 'medium', order: 2 },
  'validation': { name: 'JSON & Encoding', category: 'Standard Library', difficulty: 'medium', order: 2 },

  // Type Conversions
  'conversion': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'type-conversion': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'numeric-conversion': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'casting': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'transformation': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'precision': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'overflow': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'underflow': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'truncation': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },
  'ieee-754': { name: 'Type Conversions', category: 'Standard Library', difficulty: 'medium', order: 3 },

  // Math
  'math': { name: 'Math', category: 'Standard Library', difficulty: 'medium', order: 4 },
  'min': { name: 'Math', category: 'Standard Library', difficulty: 'medium', order: 4 },
  'max': { name: 'Math', category: 'Standard Library', difficulty: 'medium', order: 4 },
  'clamp': { name: 'Math', category: 'Standard Library', difficulty: 'medium', order: 4 },
  'division': { name: 'Math', category: 'Standard Library', difficulty: 'medium', order: 4 },

  // === TOOLING (Medium) ===
  'tooling': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'installation': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'setup': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'environment': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'gopath': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'goroot': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'cli': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'run': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },
  'get': { name: 'Go Tooling', category: 'Tooling', difficulty: 'medium', order: 1 },

  // Build & Compilation
  'build': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'compilation': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'compiler': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'compile-time': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'executable': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'cross-compilation': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'cross-platform': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'build-tags': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },
  'build-constraints': { name: 'Build & Compilation', category: 'Tooling', difficulty: 'medium', order: 2 },

  // Code Quality
  'vet': { name: 'Code Quality', category: 'Tooling', difficulty: 'medium', order: 3 },
  'static-analysis': { name: 'Code Quality', category: 'Tooling', difficulty: 'medium', order: 3 },
  'goimports': { name: 'Code Quality', category: 'Tooling', difficulty: 'medium', order: 3 },

  // Documentation
  'godoc': { name: 'Documentation', category: 'Tooling', difficulty: 'easy', order: 4 },
  'go-doc': { name: 'Documentation', category: 'Tooling', difficulty: 'easy', order: 4 },
  'documentation': { name: 'Documentation', category: 'Tooling', difficulty: 'easy', order: 4 },
  'comments': { name: 'Documentation', category: 'Tooling', difficulty: 'easy', order: 4 },

  // === TESTING (Medium) ===
  'testing': { name: 'Testing', category: 'Testing', difficulty: 'medium', order: 1 },
  'go-test': { name: 'Testing', category: 'Testing', difficulty: 'medium', order: 1 },
  'tdd': { name: 'Testing', category: 'Testing', difficulty: 'medium', order: 1 },
  'debugging': { name: 'Testing', category: 'Testing', difficulty: 'medium', order: 1 },

  // === CONCURRENCY (Hard) ===
  'concurrency': { name: 'Concurrency Basics', category: 'Concurrency', difficulty: 'hard', order: 1 },
  'goroutines': { name: 'Goroutines', category: 'Concurrency', difficulty: 'hard', order: 2 },
  'channels': { name: 'Channels', category: 'Concurrency', difficulty: 'hard', order: 3 },
  'select': { name: 'Select Statement', category: 'Concurrency', difficulty: 'hard', order: 4 },
  'sync': { name: 'Sync Package', category: 'Concurrency', difficulty: 'hard', order: 5 },
  'mutex': { name: 'Mutex', category: 'Concurrency', difficulty: 'hard', order: 6 },
  'atomic': { name: 'Atomic Operations', category: 'Concurrency', difficulty: 'hard', order: 7 },
  'thread-safe': { name: 'Thread Safety', category: 'Concurrency', difficulty: 'hard', order: 8 },

  // === GENERICS (Hard) ===
  'generics': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },
  'constraints': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },
  'type-parameters': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },
  'type-inference': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },
  'go-1.18': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },
  'go118': { name: 'Generics', category: 'Generics', difficulty: 'hard', order: 1 },

  // === ADVANCED (Hard) ===
  // Memory & Performance
  'memory': { name: 'Memory Management', category: 'Performance', difficulty: 'hard', order: 1 },
  'allocation': { name: 'Memory Management', category: 'Performance', difficulty: 'hard', order: 1 },
  'heap': { name: 'Memory Management', category: 'Performance', difficulty: 'hard', order: 1 },
  'escape-analysis': { name: 'Memory Management', category: 'Performance', difficulty: 'hard', order: 1 },
  'performance': { name: 'Performance', category: 'Performance', difficulty: 'hard', order: 2 },

  // Reflection & Unsafe
  'reflect': { name: 'Reflection', category: 'Advanced', difficulty: 'hard', order: 1 },
  'unsafe': { name: 'Unsafe Package', category: 'Advanced', difficulty: 'hard', order: 2 },
  'low-level': { name: 'Low-Level', category: 'Advanced', difficulty: 'hard', order: 3 },
  'internals': { name: 'Internals', category: 'Advanced', difficulty: 'hard', order: 4 },
  'deep-equal': { name: 'Deep Comparison', category: 'Advanced', difficulty: 'hard', order: 5 },
  'deep-copy': { name: 'Deep Copy', category: 'Advanced', difficulty: 'hard', order: 6 },

  // === BEST PRACTICES (Medium) ===
  'best-practices': { name: 'Best Practices', category: 'Best Practices', difficulty: 'medium', order: 1 },
  'idiom': { name: 'Go Idioms', category: 'Best Practices', difficulty: 'medium', order: 2 },
  'patterns': { name: 'Design Patterns', category: 'Best Practices', difficulty: 'medium', order: 3 },
  'design': { name: 'Design Patterns', category: 'Best Practices', difficulty: 'medium', order: 3 },
  'style': { name: 'Code Style', category: 'Best Practices', difficulty: 'medium', order: 4 },
  'rules': { name: 'Coding Rules', category: 'Best Practices', difficulty: 'medium', order: 5 },
  'principles': { name: 'Principles', category: 'Best Practices', difficulty: 'medium', order: 6 },
  'safety': { name: 'Safety', category: 'Best Practices', difficulty: 'medium', order: 7 },
  'type-safety': { name: 'Type Safety', category: 'Best Practices', difficulty: 'medium', order: 7 },
  'immutable': { name: 'Immutability', category: 'Best Practices', difficulty: 'medium', order: 8 },
  'immutability': { name: 'Immutability', category: 'Best Practices', difficulty: 'medium', order: 8 },
  'defensive-copy': { name: 'Defensive Copy', category: 'Best Practices', difficulty: 'medium', order: 9 },

  // === SPECIAL IDENTIFIERS (Easy) ===
  'underscore': { name: 'Blank Identifier', category: 'Special', difficulty: 'easy', order: 1 },
  'blank-identifier': { name: 'Blank Identifier', category: 'Special', difficulty: 'easy', order: 1 },
  'ignore': { name: 'Blank Identifier', category: 'Special', difficulty: 'easy', order: 1 },
  'ignore-values': { name: 'Blank Identifier', category: 'Special', difficulty: 'easy', order: 1 },
  'unused': { name: 'Blank Identifier', category: 'Special', difficulty: 'easy', order: 1 },
  'keywords': { name: 'Keywords', category: 'Special', difficulty: 'easy', order: 2 },
  'reserved-words': { name: 'Keywords', category: 'Special', difficulty: 'easy', order: 2 },
  'syntax': { name: 'Syntax', category: 'Special', difficulty: 'easy', order: 3 },
  'language': { name: 'Language', category: 'Special', difficulty: 'easy', order: 4 },

  // Assignment patterns
  'tuple-assignment': { name: 'Multiple Assignment', category: 'Special', difficulty: 'easy', order: 5 },
  'multiple-assignment': { name: 'Multiple Assignment', category: 'Special', difficulty: 'easy', order: 5 },
  'multiple-declaration': { name: 'Multiple Assignment', category: 'Special', difficulty: 'easy', order: 5 },
  'parallel-assignment': { name: 'Multiple Assignment', category: 'Special', difficulty: 'easy', order: 5 },
  'swap': { name: 'Multiple Assignment', category: 'Special', difficulty: 'easy', order: 5 },
  'redeclaration': { name: 'Redeclaration', category: 'Special', difficulty: 'easy', order: 6 },
  'expression-repetition': { name: 'Expression Patterns', category: 'Special', difficulty: 'easy', order: 7 },
}

// Java topic mapping (can be extended later)
export const javaTopicMapping: Record<string, TopicInfo> = {
  // Add Java mappings as needed
}

// Python topic mapping (can be extended later)
export const pythonTopicMapping: Record<string, TopicInfo> = {
  // Add Python mappings as needed
}

// Language-specific mapping selector
export function getTopicMappingForLanguage(language: string): Record<string, TopicInfo> {
  switch (language.toLowerCase()) {
    case 'go':
      return goTopicMapping
    case 'java':
      return javaTopicMapping
    case 'python':
      return pythonTopicMapping
    default:
      return goTopicMapping // Default to Go for now
  }
}

// Fallback topic for unmapped tags
export const defaultTopic: TopicInfo = {
  name: 'General',
  category: 'Other',
  difficulty: 'medium',
  order: 99,
}

// Get topic info for a tag (case-insensitive, handles variations)
export function getTopicForTag(tag: string, language: string = 'go'): TopicInfo {
  const mapping = getTopicMappingForLanguage(language)
  const normalizedTag = tag.toLowerCase().trim().replace(/\s+/g, '-')
  return mapping[normalizedTag] || defaultTopic
}

// Color mapping for categories
export const categoryColors: Record<string, { bg: string; icon: string; border: string }> = {
  'Go Basics': { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
  'Functions': { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-200' },
  'Data Structures': { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-200' },
  'OOP': { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200' },
  'Error Handling': { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-200' },
  'Packages & Modules': { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200' },
  'Standard Library': { bg: 'bg-sky-50', icon: 'text-sky-600', border: 'border-sky-200' },
  'Tooling': { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-200' },
  'Testing': { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
  'Concurrency': { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
  'Generics': { bg: 'bg-fuchsia-50', icon: 'text-fuchsia-600', border: 'border-fuchsia-200' },
  'Performance': { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
  'Advanced': { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-200' },
  'Best Practices': { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
  'Special': { bg: 'bg-gray-50', icon: 'text-gray-600', border: 'border-gray-200' },
  'Other': { bg: 'bg-stone-50', icon: 'text-stone-600', border: 'border-stone-200' },
}

// Difficulty badge colors
export const difficultyColors: Record<Difficulty, { bg: string; text: string; border: string }> = {
  easy: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  hard: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
}

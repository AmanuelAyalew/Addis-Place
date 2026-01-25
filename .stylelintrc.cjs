module.exports = {
  // Only configure the rule needed to avoid false positives for Tailwind at-rules
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'config'
        ]
      }
    ]
  }
}

module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  transformIgnorePatterns: ['node_modules/[^/]+?/(?!(es|node_modules)/)'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

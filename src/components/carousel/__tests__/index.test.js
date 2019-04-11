function sum(x, y) {
  return x + y;
}

test('sum(2 + 2) 等于 4', () => {
  expect(sum(2, 2)).toBe(4);
});

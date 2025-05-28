import { capitalize, getInitials } from '../src/utils/getinitials';


describe('getInitials', () => {
  it('should return first initial in uppercase', () => {
    expect(getInitials('John Doe')).toBe('J');
  });

  it('should handle extra whitespace', () => {
    expect(getInitials('   Alice   Bob  ')).toBe('A');
  });

  it('should work with single word name', () => {
    expect(getInitials('michael')).toBe('M');
  });

  it('should handle empty string gracefully', () => {
    expect(() => getInitials('')).toThrow();
  });
});

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should keep the rest of the string intact', () => {
    expect(capitalize('world')).toBe('World');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle already capitalized input', () => {
    expect(capitalize('React')).toBe('React');
  });
});

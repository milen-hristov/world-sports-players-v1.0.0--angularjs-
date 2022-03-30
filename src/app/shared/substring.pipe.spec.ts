import { SubstringPipe } from './substring.pipe';
describe('Pipe: SubstringPipe', () => {
  it("should not substring the inputs since it's equal to limit", () => {
    let substringPipe = new SubstringPipe();
    expect(substringPipe.transform('hello', 5)).toEqual('hello');
  });

  it('should substring the inputs to 2 characters', () => {
    let substringPipe = new SubstringPipe();
    expect(substringPipe.transform('hello', 2)).toEqual('he ..');
  });
});

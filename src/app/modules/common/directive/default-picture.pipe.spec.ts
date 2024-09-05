import { DefaultPicturePipe } from './default-picture.pipe';

describe('DefaultPicturePipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultPicturePipe();
    expect(pipe).toBeTruthy();
  });
});

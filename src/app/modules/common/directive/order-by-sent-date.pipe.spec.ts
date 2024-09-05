import { OrderBySentDatePipe } from './order-by-sent-date.pipe';

describe('OrderBySentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderBySentDatePipe();
    expect(pipe).toBeTruthy();
  });
});

const { Client } = require('@flasco/wda-driver');

const client = new Client('http://localhost:8100');

// ✓ wda/tap/0 (1547ms)
// ✓ chainTap (573ms)
describe('测试 2 种 tap 接口的性能差距', () => {
  test('wda/tap/0', async () => {
    const session = await client.getSession();
    await session.tap(500, 400);
  }, 10000);

  test('chainTap', async () => {
    const session = await client.getSession();
    await session.chainOperation([{
      action: 'tap',
      options: {
        x: 500,
        y: 400,
      }
    }]);
  })
});

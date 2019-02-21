const { Client } = require('@flasco/wda-driver');

describe('测试activeApp的获取', async () => {
  const client = new Client('http://localhost:8100');

  test('测试获取当前app的sessionId', async () => {
    const { bundleId } = await client.getActiveAppInfo();
    if (bundleId === 'com.tencent.mqq') {
      console.log('in qq!');
      const session = await client.getSession();
      await session.swipeUp();
    } else {
      console.log('not qq');
      const session = await client.startApp('com.tencent.mqq');
      await session.swipeUp();
    }
  }, 10000);
});

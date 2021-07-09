import emitter from '@/assets/util/emitter';

export default function (res, title = '更新') {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    // 訊息統一轉換為陣列，統一格式。
    const message = typeof res.data.message === 'string' ?
    [res.data.message] : res.data.message;
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}

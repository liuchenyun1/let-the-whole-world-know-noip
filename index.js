export default async function start(interval, { refresh, init, update }) {
  let lastCount = await refresh();
  let lastTime = performance.now();
  let initCount;
  let initTime;
  const recomputeAverage = () => {
    initCount = lastCount;
    initTime = lastTime;
  };
  recomputeAverage();
  if (init instanceof Function) init = init(recomputeAverage);
  return setInterval(async () => {
    const count = await refresh();
    const time = performance.now();
    if (count < lastCount || time < lastTime) return;
    if (update) update(count, (count - lastCount) / (time - lastTime), (count - initCount) / (time - initTime), init);
    lastCount = count;
    lastTime = time;
  }, interval);
}

export default async function start({ refresh, init, update }) {
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
  (async function reload() {
    const count = await refresh();
    const time = performance.now();
    if (update) update(count, (count - lastCount) / (time - lastTime), (count - initCount) / (time - initTime), init);
    lastCount = count;
    lastTime = time;
    reload();
  })();
}

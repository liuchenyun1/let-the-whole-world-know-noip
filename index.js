export default async function start({ refresh, init, update }, concurrent = 1) {
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

  async function reload() {
    let count = 0;
    let time = 0;
    while (count <= lastCount || time <= lastTime) {
      count = await refresh();
      time = performance.now();
    }
    if (update) update(count, (count - lastCount) / (time - lastTime), (count - initCount) / (time - initTime), init);
    lastCount = count;
    lastTime = time;
    reload();
  }

  while (concurrent--)
    reload();
}

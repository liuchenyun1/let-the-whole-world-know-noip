export default async function start(interval) {
  const refresh = async () => {
    const res = await fetch("http://www.noi.cn/GetNews.dt", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "cmd=read&newsid=932&hash=72F731",
      method: "POST"
    });
    const obj = await res.json();
    return Number(obj.click);
  };
  let lastCount = await refresh();
  let lastTime = performance.now();
  let initCount;
  let initTime;
  const newRow = () => {
    const elem = document.createElement("small");
    elem.classList.add("news-click");
    return elem;
  };
  const rowsElem = document.getElementsByClassName("maintitle")[0];
  rowsElem.appendChild(newRow());
  rowsElem.appendChild(newRow());
  rowsElem.appendChild(newRow());
  const [countElem, speedElem, avgElem, recomputeElem] = document.getElementsByClassName("news-click");
  const recomputeButton = document.createElement("button");
  recomputeButton.innerText = "重新计算平均速度";
  (recomputeButton.onclick = () => {
    initCount = lastCount;
    initTime = lastTime;
  })();
  recomputeElem.appendChild(recomputeButton);
  return setInterval(async () => {
    const count = await refresh();
    const time = performance.now();
    if (count < lastCount || time < lastTime) return;
    countElem.innerText = `阅读量：${count}`;
    speedElem.innerText = `当前速度：${((count - lastCount) / ((time - lastTime) * 0.001)).toFixed(3)} 次/s`;
    avgElem.innerText = `平均速度：${((count - initCount) / ((time - initTime) * 0.001)).toFixed(3)} 次/s`;
    lastCount = count;
    lastTime = time;
  }, interval);
}

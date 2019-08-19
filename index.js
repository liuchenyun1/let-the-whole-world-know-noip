await (async () => {
  const newRow = () => {
    const elem = document.createElement("small");
    elem.classList.add("news-click");
    return elem;
  };
  const rowsElem = document.getElementsByClassName("maintitle")[0];
  rowsElem.appendChild(newRow());
  rowsElem.appendChild(newRow());
  const [countElem, timeElem, avgElem] = document.getElementsByClassName("news-click");
  const refresh = async () => {
    const res = await fetch("http://www.noi.cn/GetNews.dt", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "cmd=read&newsid=932&hash=72F731",
      method: "POST"
    });
    const obj = await res.json();
    return [Number(obj.click), performance.now()];
  };
  let [lastCount, lastTime] = await refresh();
  let initCount;
  let initTime;
  const update = () => {
    initCount = lastCount;
    initTime = lastTime;
  };
  update();
  return [setInterval(async () => {
    const [count, time] = await refresh();
    if (count < lastCount || time < lastTime) return;
    countElem.innerText = `阅读量：${count}`;
    timeElem.innerText = `当前速度：${((count - lastCount) / ((time - lastTime) * 0.001)).toFixed(3)} 次/s`;
    avgElem.innerText = `平均速度：${((count - initCount) / ((time - initTime) * 0.001)).toFixed(3)} 次/s`;
    lastCount = count;
    lastTime = time;
  }, 100), update];
})();

export async function refresh() {
  return Number((await (await fetch("http://www.noi.cn/GetNews.dt", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "cmd=read&newsid=932&hash=72F731",
    method: "POST"
  })).json()).click);
}

export function init(recomputeAverage) {
  const newRow = () => {
    const elem = document.createElement("small");
    elem.classList.add("news-click");
    return elem;
  };
  const rowsElem = document.getElementsByClassName("maintitle")[0];
  rowsElem.appendChild(newRow());
  rowsElem.appendChild(newRow());
  rowsElem.appendChild(newRow());
  const [countElem, speedElem, averageElem, recomputeElem] = rowsElem.getElementsByClassName("news-click");
  const recomputeButton = document.createElement("button");
  recomputeButton.innerText = "重新计算平均速度";
  recomputeButton.onclick = recomputeAverage;
  recomputeElem.appendChild(recomputeButton);
  return [countElem, speedElem, averageElem];
}

export function update(count, speed, average, [countElem, speedElem, averageElem]) {
  countElem.innerText = `阅读量：${count}`;
  speedElem.innerText = `当前速度：${(speed * 1000).toFixed(3)} 次/s`;
  averageElem.innerText = `平均速度：${(average * 1000).toFixed(3)} 次/s`;
}

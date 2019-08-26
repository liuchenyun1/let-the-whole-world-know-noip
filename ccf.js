export async function refresh() {
  await fetch("https://www.ccf.org.cn/ccf/stat/dealer?SiteID=122&Type=Article&LeafID=668162&URL=https://www.ccf.org.cn/c/2019-08-16/668162.shtml");
  return Number((await (await fetch("https://www.ccf.org.cn/ccf/counter?Type=Article&ID=668162")).text()).match(/\d+/g)[0]);
}

export function init(recomputeAverage) {
  const rowsElem = document.getElementsByClassName("detailFun")[0].children[0];
  rowsElem.appendChild(document.createElement("br"));
  rowsElem.appendChild(document.createTextNode("当前速度："));
  rowsElem.appendChild(document.createElement("span"));
  rowsElem.appendChild(document.createTextNode(" 次/s"));
  rowsElem.appendChild(document.createElement("br"));
  rowsElem.appendChild(document.createTextNode("平均速度："));
  rowsElem.appendChild(document.createElement("span"));
  rowsElem.appendChild(document.createTextNode(" 次/s"));
  rowsElem.appendChild(document.createElement("br"));
  rowsElem.appendChild(document.createElement("span"));
  const [countElem, speedElem, averageElem, recomputeElem] = rowsElem.getElementsByTagName("span");
  const recomputeButton = document.createElement("button");
  recomputeButton.innerText = "重新计算平均速度";
  recomputeButton.style.color = "#282828";
  recomputeButton.onclick = recomputeAverage;
  recomputeElem.appendChild(recomputeButton);
  return [countElem, speedElem, averageElem];
}

export function update(count, speed, average, [countElem, speedElem, averageElem]) {
  countElem.innerText = count;
  speedElem.innerText = (speed * 1000).toFixed(3);
  averageElem.innerText = (average * 1000).toFixed(3);
}

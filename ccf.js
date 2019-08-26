export function refresh() {
  return fetch("https://www.ccf.org.cn/ccf/stat/dealer?SiteID=122&Type=Article&LeafID=668162&URL=https://www.ccf.org.cn/c/2019-08-16/668162.shtml")
    .then(() => new Promise((resolve, reject) => {
      const elem = document.createElement("script");
      elem.src = "https://www.ccf.org.cn/ccf/counter?Type=Article&ID=668162&DomID=hitcount668162";
      elem.onload = () => {
        elem.remove();
        resolve(Number(document.getElementById("hitcount668162").innerText));
      };
      elem.onerror = () => {
        elem.remove();
        reject();
      };
      document.body.appendChild(elem);
    }));
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

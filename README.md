# let-the-whole-world-know-noip

About NOIp: It's dead.

## Using

* [noi.cn](http://www.noi.cn/newsview.html?id=932&hash=72F731):

  ```js
  const root = "https://rawcdn.githack.com/sjx233/let-the-whole-world-know-noip/e435ce44b858cbf8ad6cd24470403a7618267fc1/";
  Promise.all(["index.js", "noi.js"].map(path => import(root + path)))
    .then(([module, noi]) => module.default(noi));
  ```

* [ccf.org.cn](https://www.ccf.org.cn/c/2019-08-16/668162.shtml):

  ```js
  const root = "https://rawcdn.githack.com/sjx233/let-the-whole-world-know-noip/e435ce44b858cbf8ad6cd24470403a7618267fc1/";
  Promise.all(["index.js", "ccf.js"].map(path => import(root + path)))
    .then(([module, ccf]) => module.default(ccf));
  ```

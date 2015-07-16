export default function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      if (req.status >= 400) {
        reject([Error(req.statusText), req]);
      }
      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

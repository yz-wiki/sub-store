function operator(proxies, targetPlatform, context) {
  var args = {};
  try {
    if (typeof $arguments !== "undefined") args = $arguments;
  } catch (e) {}

  var prefix = "";
  if (args.prefix) prefix = decodeURIComponent(args.prefix);

  var sep = " ";
  if (args.sep) sep = decodeURIComponent(args.sep);

  var sn = " ";
  if (args.sn) sn = decodeURIComponent(args.sn);

  if (!prefix) return proxies;

  var i;
  for (i = 0; i < proxies.length; i++) {
    proxies[i].name = prefix + sep + proxies[i].name;
  }

  var groups = {};
  for (i = 0; i < proxies.length; i++) {
    var name = proxies[i].name;
    if (!groups[name]) groups[name] = [];
    groups[name].push(proxies[i]);
  }

  var result = [];
  var keys = Object.keys(groups);
  for (var j = 0; j < keys.length; j++) {
    var items = groups[keys[j]];
    if (items.length === 1) {
      result.push(items[0]);
    } else {
      for (var k = 0; k < items.length; k++) {
        var num = k + 1;
        var numStr = num < 10 ? "0" + num : "" + num;
        items[k].name = items[k].name + sn + numStr;
        result.push(items[k]);
      }
    }
  }

  return result;
}

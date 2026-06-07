// 通用节点名前缀添加脚本
// Sub-Store 参数：
//   prefix: 要加的前缀（如：良心云）
//   sep:    分隔符（可选，默认空格）
//   sn:     序号分隔符（可选，默认空格）

function operator(proxies) {
  var args = (typeof $arguments !== "undefined") ? $arguments : {};
  var prefix = args.prefix ? decodeURIComponent(args.prefix) : "";
  var sep = args.sep ? decodeURIComponent(args.sep) : " ";
  var sn = args.sn ? decodeURIComponent(args.sn) : " ";

  if (!prefix) return proxies;

  for (var i = 0; i < proxies.length; i++) {
    proxies[i].name = prefix + sep + proxies[i].name;
  }

  // 处理重名节点
  var group = {};
  for (var i = 0; i < proxies.length; i++) {
    var name = proxies[i].name;
    if (!group[name]) group[name] = [];
    group[name].push(proxies[i]);
  }

  var result = [];
  var keys = Object.keys(group);
  for (var j = 0; j < keys.length; j++) {
    var items = group[keys[j]];
    if (items.length === 1) {
      result.push(items[0]);
    } else {
      for (var k = 0; k < items.length; k++) {
        var num = (k + 1).toString();
        items[k].name = items[k].name + sn + (num.length < 2 ? "0" + num : num);
        result.push(items[k]);
      }
    }
  }
  return result;
}

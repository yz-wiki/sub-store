
 * ├─ 参数 (Sub-Store 中按“添加参数”填入)
 *   key: prefix    value: 良心云
 *   key: sep       value:  |       (可选，默认空格)
 *   key: sn        value:  _       (可选，默认空格)
 * 
 * 效果：prefix=良心云 → 良心云 原节点名
 ******************************************/

function operator(proxies) {
  const args = typeof $arguments !== "undefined" ? $arguments : {};
  const prefix = args.prefix ? decodeURIComponent(args.prefix) : "";
  const sep    = args.sep    ? decodeURIComponent(args.sep)    : " ";
  const sn     = args.sn     ? decodeURIComponent(args.sn)     : " ";

  if (!prefix) return proxies;       // 没传 prefix 就不作处理

  // 为每个节点添加前缀
  for (const p of proxies) {
    p.name = `${prefix}${sep}${p.name}`;
  }

  // 处理重名节点 → 自动序号
  const group = {};
  for (const p of proxies) {
    if (!group[p.name]) group[p.name] = [];
    group[p.name].push(p);
  }

  const result = [];
  for (const items of Object.values(group)) {
    if (items.length === 1) {
      result.push(items[0]);
    } else {
      items.forEach((p, idx) => {
        p.name = `${p.name}${sn}${String(idx + 1).padStart(2, "0")}`;
        result.push(p);
      });
    }
  }
  return result;
}

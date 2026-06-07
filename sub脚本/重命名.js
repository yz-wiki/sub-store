/*
 * 硬编码前缀：良心云
 * 你可以直接修改下面 PREFIX 变量的值
 */

const PREFIX = "良心云";
const SEP = " ";        // 分隔符，默认一个空格
const NUM_SEP = " ";    // 序号分隔符，默认空格

function operator(proxies) {
  for (const p of proxies) {
    p.name = `${PREFIX}${SEP}${p.name}`;
  }

  // 处理重名（几乎不会有，但防一手）
  const groups = {};
  for (const p of proxies) {
    const base = p.name;
    if (!groups[base]) groups[base] = [];
    groups[base].push(p);
  }

  const result = [];
  for (const items of Object.values(groups)) {
    if (items.length === 1) {
      result.push(items[0]);
    } else {
      items.forEach((p, idx) => {
        p.name = `${p.name}${NUM_SEP}${String(idx + 1).padStart(2, "0")}`;
        result.push(p);
      });
    }
  }

  return result;
}

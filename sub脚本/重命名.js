/**
 * 节点名前缀添加脚本 (Sub-Store 脚本操作)
 * 可通过 URL 参数或 $arguments 设置前缀与分隔符。
 * 
 * 参数：
 *   prefix  - 要添加的前缀，例如：良心云
 *   sep     - 分隔符（可选，默认空格）
 *   sn      - 同名节点序号前的连接符（可选，默认空格）
 * 
 * 用法示例：
 *   https://raw.xxx.com/add-prefix.js#prefix=良心云
 *   https://raw.xxx.com/add-prefix.js#prefix=机场A&sep= | &sn=_
 */

function operator(proxies = [], targetPlatform, context) {
  // 支持从多个渠道获取参数：$arguments、$options 或链接内嵌参数
  const args = (typeof $arguments !== "undefined" && $arguments) || {};
  const prefix = decodeURIComponent(
    args.prefix || args.PREFIX || ""
  );
  const sep = decodeURIComponent(
    args.sep || args.SEP || " "
  );
  const sn = decodeURIComponent(
    args.sn || args.SN || " "
  );

  // 如果没有前缀，直接返回原数组
  if (!prefix) return proxies;

  // 添加前缀
  for (let p of proxies) {
    p.name = prefix + sep + p.name;
  }

  // 处理重名节点：在末尾附加序号（如 01, 02）
  const groups = {};
  proxies.forEach((p) => {
    const baseName = p.name;
    if (!groups[baseName]) groups[baseName] = [];
    groups[baseName].push(p);
  });

  const result = [];
  Object.values(groups).forEach((items) => {
    if (items.length === 1) {
      result.push(items[0]);
    } else {
      items.forEach((p, idx) => {
        const num = String(idx + 1).padStart(2, "0");
        p.name = p.name + sn + num;
        result.push(p);
      });
    }
  });

  // 可选：打印处理信息到日志
  // console.log(`[PREFIX] 已为 ${result.length} 个节点添加前缀: ${prefix}`);

  return result;
}

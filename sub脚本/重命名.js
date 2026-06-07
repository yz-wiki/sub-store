/**
 * Sub-Store 远程脚本 - 节点名称添加前缀
 * 
 * 参数编辑中配置:
 *   key:   prefix
 *   value: 🇯🇵  (或任意前缀)
 * 
 * 留空则不修改节点名
 */

function operator(proxies = [], targetPlatform, context) {
  try {
    let prefix = "";

    // 解析参数：$arguments 是字符串形式的 JSON 或直接字符串
    if (typeof $arguments !== "undefined" && $arguments) {
      try {
        const args = JSON.parse($arguments);
        prefix = args.prefix || "";
      } catch {
        prefix = String($arguments);
      }
    }

    // 如果 prefix 有效，遍历所有节点进行重命名
    if (prefix && proxies.length) {
      proxies.forEach(function (proxy) {
        proxy.name = prefix + proxy.name;
      });
    }
  } catch (e) {
    console.log("[重命名脚本] ERROR: " + e.message);
  }

  return proxies;
}

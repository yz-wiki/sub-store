async function operator(proxies, targetPlatform, context) {
  let prefix = "";
  try {
    if (typeof $arguments !== "undefined" && $arguments) {
      // 如果是对象，直接取 prefix 属性
      if (typeof $arguments === "object" && $arguments.prefix) {
        prefix = String($arguments.prefix);
      } else if (typeof $arguments === "string") {
        // 如果是字符串，尝试解析 JSON
        try {
          const args = JSON.parse($arguments);
          prefix = args.prefix || "";
        } catch {
          prefix = $arguments; // 直接作为前缀
        }
      }
    }
  } catch (e) {
    console.log("[Rename] WARN: " + e.message);
  }

  if (prefix && Array.isArray(proxies)) {
    proxies = proxies.map(function (proxy) {
      proxy.name = prefix + proxy.name;
      return proxy;
    });
  }

  return proxies;
} 

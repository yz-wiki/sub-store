// ================================
// Sub-Store 远程脚本 - 节点重命名
// 脚本地址：填你的 GitHub raw 链接
// ================================
// 在 Sub-Store 中“添加参数”：
//   key:   prefix
//   value: 🇯🇵日本（或任意你想要的字符）
// 留空或未配置时，节点名不变
// ================================

let customPrefix = "";

try {
    // 远程脚本的参数通过 $env 对象传入
    if (typeof $env !== "undefined" && $env.prefix && String($env.prefix).trim() !== "") {
        customPrefix = String($env.prefix).trim();
    }
} catch (e) {
    // 忽略错误
}

// 执行改名
if (customPrefix && typeof $server !== "undefined" && $server.name) {
    $server.name = customPrefix + $server.name;
}

// 其他可选操作
// $server['test-url'] = 'http://1.0.0.1/generate_204';
// $server.ecn = true;

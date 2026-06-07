let prefix = ""
try {
  if ($env && $env.prefix) {
    prefix = String($env.prefix)
  }
} catch (e) {}

if (prefix && $server && $server.name) {
  $server.name = prefix + $server.name
}

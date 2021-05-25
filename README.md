# App Paths

A [Deno](https://deno.land/) Typescript library for determining operating system appropriate paths for storing `data`, `cache`, `config`, `log` and `temp` files on macOS, Linux, and Windows.

Please note that this library does not create any paths that don't yet exist. You can make use of the [fs](https://deno.land/std@0.97.0/fs#ensuredir) `ensureDire` and [path](https://deno.land/std@0.97.0/path) `join` STDLIB functions to help you with that.

By convention the `appName` namespace you provide should be specified in [reverse domain name notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) to help eliminate conflicts and make it easier to find app specific files.

## API

```ts
appPaths(appName: string): Paths

interface Paths
  cache: string
  config: string
  data: string
  log: string
  temp: string
```

## Usage

```ts
import appPaths from "https://github.com/wesauis/deno-app-paths/raw/[CURRENT RELEASE VERSION]/mod.ts"

// Specifiy an app namespace
const paths = appPaths("com.yourorg.yourapp")

console.log(paths)
// paths: {
//   cache: "/Users/USERNAME/Library/Caches/com.yourorg.yourapp",
//   config: "/Users/USERNAME/Library/Preferences/com.yourorg.yourapp",
//   data: "/Users/USERNAME/Library/Application Support/com.yourorg.yourapp",
//   log: "/Users/USERNAME/Library/Logs/com.yourorg.yourapp",
//   temp: "/var/folders/cg/q568zb_17fv6qx4r2lpl3g0w0000gn/T/com.yourorg.yourapp"
// }

console.log(paths.config)
// "/Users/USERNAME/Library/Preferences/com.yourorg.yourapp"

console.log(paths.data)
// "/Users/USERNAME/Library/Application Support/com.yourorg.yourapp"
```

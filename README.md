# App Paths

Get paths for storing things like data, config, cache, etc

Does not create the directories!

# Usage

```ts
import appPaths from "https://github.com/wesauis/deno-app-paths/raw/0.1.1/mod.ts";

const paths = appPaths("super-cool-app");

console.log(paths.data);
//=> '/Users/user/Library/Application Support/super-cool-app'

console.log(paths.config);
//=> '/Users/user/Library/Preferences/super-cool-app'
```

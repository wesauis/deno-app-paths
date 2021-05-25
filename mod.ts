import * as path from "https://deno.land/std@0.97.0/path/mod.ts";

const homeDir = Deno.env.get("HOME") || Deno.env.get("HOMEPATH");

const tempDir = Deno.env.get("TEMP") || Deno.env.get("TMP") ||
  Deno.env.get("TMPDIR");

export interface Paths {
  data: string;
  config: string;
  cache: string;
  log: string;
  temp: string;
}

function linux(homeDir: string, tempDir: string, appName: string): Paths {
  return {
    data: path.join(
      Deno.env.get("XDG_DATA_HOME") || path.join(homeDir, ".local", "share"),
      appName,
    ),
    config: path.join(
      Deno.env.get("XDG_CONFIG_HOME") || path.join(homeDir, ".config"),
      appName,
    ),
    cache: path.join(
      Deno.env.get("XDG_CACHE_HOME") || path.join(homeDir, ".cache"),
      appName,
    ),
    log: path.join(
      Deno.env.get("XDG_STATE_HOME") || path.join(homeDir, ".local", "state"),
      appName,
    ),
    temp: path.join(tempDir, path.basename(homeDir), appName),
  };
}

function macos(homeDir: string, tempDir: string, appName: string): Paths {
  const libDir = path.join(homeDir, "Library");

  return {
    data: path.join(libDir, "Application Support", appName),
    config: path.join(libDir, "Preferences", appName),
    cache: path.join(libDir, "Caches", appName),
    log: path.join(libDir, "Logs", appName),
    temp: path.join(tempDir, appName),
  };
}

function windows(homeDir: string, tempDir: string, appName: string): Paths {
  const appData = Deno.env.get("APPDATA") ||
    path.join(homeDir, "AppData", "Roaming");
  const localAppData = Deno.env.get("LOCALAPPDATA") ||
    path.join(homeDir, "AppData", "Local");

  return {
    data: path.join(localAppData, appName, "Data"),
    config: path.join(appData, appName, "Config"),
    cache: path.join(localAppData, appName, "Cache"),
    log: path.join(localAppData, appName, "Log"),
    temp: path.join(tempDir, appName),
  };
}

/** Get paths for storing things like data, config, cache, etc
 *
 * Does not create the directories!
 *
 * @param appName name of your app
 */
export default function appPaths(appName: string): Paths {
  if (!homeDir) {
    throw new Error("cannot find user home");
  }

  if (!tempDir) {
    throw new Error("cannot find temp directory");
  }

  switch (Deno.build.os) {
    case "linux":
      return linux(homeDir, tempDir, appName);
    case "darwin":
      return macos(homeDir, tempDir, appName);
    case "windows":
      return windows(homeDir, tempDir, appName);
    default:
      throw new Error("unknown os");
  }
}

import { assertStringIncludes } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import appPaths from "./mod.ts";

Deno.test("make sure it didnt throw any error", () => {
  const random = Math.random().toString(36).substr(2);
  const appName = `super-cool-app-${random}`;

  const paths = appPaths(appName);

  console.log({ paths, appName });

  assertStringIncludes(paths.data, appName);
  assertStringIncludes(paths.config, appName);
  assertStringIncludes(paths.cache, appName);
  assertStringIncludes(paths.log, appName);
  assertStringIncludes(paths.temp, appName);
});

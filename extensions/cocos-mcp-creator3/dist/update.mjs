// packages/native-adapters/src/github-update.ts
import { createHash as createHash4, randomUUID as randomUUID4 } from "node:crypto";
import { readFile as readFile6, writeFile as writeFile4 } from "node:fs/promises";
import { join as join6 } from "node:path";

// packages/application/src/paths.ts
import { realpath, mkdir, lstat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep, dirname, join } from "node:path";

// packages/contracts/src/index.ts
var CocosError = class _CocosError extends Error {
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "CocosError";
  }
  code;
  details;
  toJSON() {
    return this.details === void 0 ? { code: this.code, message: this.message } : { code: this.code, message: this.message, details: this.details };
  }
  static from(error, fallback = "INTERNAL_ERROR") {
    if (error instanceof _CocosError) return error;
    if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      const codes = ["INVALID_ARGUMENT", "NOT_FOUND", "AMBIGUOUS_TARGET", "UNSUPPORTED_CAPABILITY", "UNSUPPORTED_VERSION", "CONTEXT_UNAVAILABLE", "STALE_REVISION", "STALE_HANDLE", "UNAUTHORIZED", "PATH_OUTSIDE_PROJECT", "OPERATION_CONFLICT", "OUTCOME_UNKNOWN", "CANCELLED", "TIMEOUT", "EDITOR_ERROR", "RUNTIME_ERROR", "VERIFICATION_FAILED", "RESOURCE_BUSY", "INTERNAL_ERROR"];
      const code = "code" in error && codes.includes(error.code) ? error.code : fallback;
      let details;
      if ("details" in error && error.details !== void 0) {
        try {
          details = Json.value(error.details);
        } catch {
        }
      }
      return new _CocosError(code, error.message, details);
    }
    return new _CocosError(fallback, error instanceof Error ? error.message : String(error));
  }
};
var Json = class _Json {
  static object(value, label = "value") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      throw new CocosError("INVALID_ARGUMENT", `${label} must be an object`);
    }
    return value;
  }
  static string(value, label) {
    if (typeof value !== "string" || !value.trim()) throw new CocosError("INVALID_ARGUMENT", `${label} must be a non-empty string`);
    return value;
  }
  static value(value) {
    if (value === void 0) return null;
    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      throw new CocosError("INVALID_ARGUMENT", "Value is not JSON serializable");
    }
  }
  static safePath(path) {
    const segments = path.split(".");
    if (!segments.length || segments.some((part) => !part || ["__proto__", "prototype", "constructor"].includes(part))) {
      throw new CocosError("INVALID_ARGUMENT", "Unsafe property path");
    }
    return segments;
  }
  static canonical(value) {
    if (Array.isArray(value)) return `[${value.map((v) => _Json.canonical(v)).join(",")}]`;
    if (value !== null && typeof value === "object") {
      return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${_Json.canonical(value[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
  }
  static diff(before, after, maxRows = 1e3) {
    const rows = [];
    const visit = (left, right, path) => {
      if (rows.length >= maxRows) return;
      if (left === void 0) {
        rows.push({ kind: "added", path, after: right ?? null });
        return;
      }
      if (right === void 0) {
        rows.push({ kind: "removed", path, before: left });
        return;
      }
      if (_Json.canonical(left) === _Json.canonical(right)) return;
      if (Array.isArray(left) && Array.isArray(right)) {
        const length = Math.max(left.length, right.length);
        for (let index = 0; index < length; index++) visit(left[index], right[index], `${path}/${index}`);
        return;
      }
      if (!Array.isArray(left) && !Array.isArray(right) && left !== null && right !== null && typeof left === "object" && typeof right === "object") {
        const keys = /* @__PURE__ */ new Set([...Object.keys(left), ...Object.keys(right)]);
        for (const key of [...keys].sort()) visit(left[key], right[key], path ? `${path}/${key}` : key);
        return;
      }
      rows.push({ kind: "changed", path, before: left, after: right });
    };
    visit(before, after, "");
    if (rows.length >= maxRows) rows.push({ kind: "truncated", path: "", maxRows });
    return rows;
  }
};

// packages/application/src/paths.ts
var ProjectPaths = class _ProjectPaths {
  constructor(root) {
    this.root = root;
  }
  root;
  static async open(root) {
    const actual = await realpath(root);
    if (!(await lstat(actual)).isDirectory()) throw new CocosError("INVALID_ARGUMENT", "Project path is not a directory");
    return new _ProjectPaths(actual);
  }
  contains(path) {
    const rel = relative(this.root, path);
    return rel === "" || !isAbsolute(rel) && rel !== ".." && !rel.startsWith(`..${sep}`);
  }
  async resolve(path) {
    const target = resolve(this.root, path);
    if (!this.contains(target)) throw new CocosError("PATH_OUTSIDE_PROJECT", "Path must remain inside the project");
    let ancestor = target;
    while (true) {
      try {
        const actual = await realpath(ancestor);
        if (!this.contains(actual)) throw new CocosError("PATH_OUTSIDE_PROJECT", "Symbolic link escapes project");
        return target;
      } catch (error) {
        if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error;
        const parent = dirname(ancestor);
        if (parent === ancestor) throw error;
        ancestor = parent;
      }
    }
  }
  async work(directory, child = "") {
    const target = await this.resolve(join(".codex-work", directory, child));
    await mkdir(target, { recursive: true });
    return target;
  }
  async asset(url) {
    if (!url.startsWith("db://assets/") || url.includes("\\") || url.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "Expected db://assets/ URL");
    const suffix = url.slice("db://assets/".length);
    if (suffix.split("/").some((part) => part === ".." || part === ".")) throw new CocosError("PATH_OUTSIDE_PROJECT", "Asset URL contains traversal");
    return this.resolve(join("assets", suffix));
  }
  environment() {
    const work = join(this.root, ".codex-work");
    return {
      ...process.env,
      TMPDIR: join(work, "tmp"),
      TMP: join(work, "tmp"),
      TEMP: join(work, "tmp"),
      XDG_CACHE_HOME: join(work, "cache"),
      XDG_CONFIG_HOME: join(work, "cache", "config"),
      XDG_DATA_HOME: join(work, "cache", "data"),
      XDG_STATE_HOME: join(work, "cache", "state"),
      NODE_COMPILE_CACHE: join(work, "cache", "node"),
      TZ: "UTC"
    };
  }
};

// packages/native-adapters/src/installer.ts
import { mkdir as mkdir4, readFile as readFile5, cp, rename as rename3, stat, lstat as lstat6, writeFile as writeFile3 } from "node:fs/promises";
import { join as join5, isAbsolute as isAbsolute6, dirname as dirname3, basename } from "node:path";
import { randomUUID as randomUUID3 } from "node:crypto";

// packages/native-adapters/src/extension-health.ts
import { readFileSync, lstatSync } from "fs";
import { join as join2 } from "path";
import { createHash } from "crypto";

// packages/native-adapters/src/extension-files.json
var extension_files_default = {
  "2": [
    "package.json",
    "LICENSE",
    "dist/main.js",
    "dist/scene.js",
    "dist/panel.js",
    "dist/service.mjs",
    "dist/stdio.mjs",
    "dist/update.mjs",
    "dist/runtime.js"
  ],
  "3": [
    "package.json",
    "LICENSE",
    "dist/main.cjs",
    "dist/scene.cjs",
    "dist/panel.cjs",
    "dist/service.mjs",
    "dist/stdio.mjs",
    "dist/update.mjs",
    "dist/runtime.js"
  ],
  presentation: [
    "README.md",
    "README.en.md",
    "README.zh.md",
    "README.zh-CN.md",
    "logo.png"
  ]
};

// packages/native-adapters/src/extension-health.ts
var ExtensionHealth = class {
  stamp(root, major2) {
    return [root, join2(root, "dist"), ...extension_files_default[major2].map((path) => join2(root, path))].map((path) => {
      try {
        const stat2 = lstatSync(path);
        return [path, stat2.ino, stat2.size, stat2.mtimeMs, stat2.ctimeMs, stat2.isSymbolicLink()];
      } catch {
        return [path, "unavailable"];
      }
    }).map((row) => JSON.stringify(row)).join("\n");
  }
  inspect(root, major2, presentation = false) {
    const rows = [];
    let manifest;
    try {
      manifest = JSON.parse(this.bytes(root, "package.json").toString());
    } catch {
    }
    for (const path of [...extension_files_default[major2], ...presentation ? extension_files_default.presentation : []]) {
      try {
        const bytes = this.bytes(root, path);
        if (!bytes.length) throw new Error("empty-file");
        if (path === "package.json") {
          if (!manifest || manifest.name !== `cocos-mcp-creator${major2}` || !manifest.version) throw new Error("invalid-extension-identity");
          rows.push({ path, status: "passed" });
          continue;
        }
        const sha256 = createHash("sha256").update(bytes).digest("hex"), expected = manifest?.fileHashes?.[path];
        rows.push({
          path,
          sha256,
          status: expected === void 0 ? "unknown" : expected === sha256 ? "passed" : "failed",
          ...expected === void 0 ? { reason: "legacy-manifest-without-file-digest" } : expected !== sha256 ? { reason: "digest-mismatch" } : {}
        });
      } catch (error) {
        rows.push({ path, status: "failed", reason: error.code ?? (error instanceof Error ? error.message : "unreadable-file") });
      }
    }
    return { health: rows.some((row) => row.status === "failed") ? "degraded" : rows.some((row) => row.status === "unknown") ? "unknown" : "healthy", rows };
  }
  require(root, major2) {
    const state = this.inspect(root, major2);
    if (state.health === "degraded") throw new CocosError("VERIFICATION_FAILED", "Extension required files are missing, empty or inconsistent", { rows: state.rows });
    return state;
  }
  bytes(root, path) {
    let current = root;
    if (!lstatSync(current).isDirectory() || lstatSync(current).isSymbolicLink()) throw new Error("symlink-or-invalid-root");
    for (const part of path.split("/")) {
      current = join2(current, part);
      if (lstatSync(current).isSymbolicLink()) throw new Error("symlink-file");
    }
    if (!lstatSync(current).isFile()) throw new Error("not-a-regular-file");
    return readFileSync(current);
  }
};

// packages/native-adapters/src/client-installation.ts
import { readFile as readFile2, writeFile, mkdir as mkdir2, lstat as lstat3, rename as rename2, rm, rmdir, unlink as unlink2 } from "node:fs/promises";
import { join as join3, isAbsolute as isAbsolute3 } from "node:path";
import { createHash as createHash2, randomUUID as randomUUID2 } from "node:crypto";

// packages/application/src/client-policy.ts
import { readFile, lstat as lstat2 } from "node:fs/promises";
import { isAbsolute as isAbsolute2 } from "node:path";
var ClientPolicies = class {
  parse(value) {
    const row = Json.object(Json.value(value));
    const known = /* @__PURE__ */ new Set(["schemaVersion", "allowedRoots", "autoStartBackend", "allowProjectCode", "clientHeartbeatSeconds", "clientLeaseTtlSeconds", "idleExitSeconds", "workspaceMappings"]);
    if (Object.keys(row).some((key) => !known.has(key)) || row.schemaVersion !== 1 || !Array.isArray(row.allowedRoots) || row.allowedRoots.length > 64 || row.allowedRoots.some((root) => typeof root !== "string" || !isAbsolute2(root) || root.length > 4096 || root.includes("\0"))) throw new CocosError("INVALID_ARGUMENT", "Invalid client policy / allowedRoots");
    for (const key of ["autoStartBackend", "allowProjectCode"]) if (typeof row[key] !== "boolean") throw new CocosError("INVALID_ARGUMENT", `Policy ${key} must be boolean`);
    const heartbeat = this.seconds(row, "clientHeartbeatSeconds", 1, 60), ttl = this.seconds(row, "clientLeaseTtlSeconds", 3, 600), idle = this.seconds(row, "idleExitSeconds", 1, 3600);
    if (ttl < heartbeat * 3) throw new CocosError("INVALID_ARGUMENT", "Client TTL must allow at least three heartbeats");
    const mappings = row.workspaceMappings;
    if (mappings !== void 0 && (!Array.isArray(mappings) || mappings.length > 64 || mappings.some((value2) => {
      const mapping = Json.object(value2);
      return Object.keys(mapping).sort().join("|") !== "projectPath|workspacePath" || ["workspacePath", "projectPath"].some((key) => typeof mapping[key] !== "string" || !isAbsolute2(mapping[key]) || mapping[key].length > 4096 || mapping[key].includes("\0"));
    }))) throw new CocosError("INVALID_ARGUMENT", "Invalid workspaceMappings");
    return {
      schemaVersion: 1,
      allowedRoots: row.allowedRoots,
      autoStartBackend: row.autoStartBackend,
      allowProjectCode: row.allowProjectCode,
      clientHeartbeatSeconds: heartbeat,
      clientLeaseTtlSeconds: ttl,
      idleExitSeconds: idle,
      ...mappings !== void 0 ? { workspaceMappings: mappings } : {}
    };
  }
  seconds(row, key, minimum, maximum) {
    const value = row[key];
    if (typeof value !== "number" || !Number.isInteger(value) || value < minimum || value > maximum) throw new CocosError("INVALID_ARGUMENT", `Invalid policy ${key}`);
    return value;
  }
  async load(installation) {
    const path = await installation.resolve("policy.json"), info = await lstat2(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid client policy file");
    return this.parse(JSON.parse(await readFile(path, "utf8")));
  }
};

// packages/application/src/atomic-json.ts
import { randomUUID } from "node:crypto";
import { open, link, rename, unlink } from "node:fs/promises";
var AtomicJson = class {
  async write(path, value, exclusive = false) {
    const temporary = `${path}.${randomUUID()}.tmp`;
    try {
      const file = await open(temporary, "wx", 384);
      try {
        await file.writeFile(JSON.stringify(value, null, 2));
        await file.sync();
      } finally {
        await file.close();
      }
      if (exclusive) await link(temporary, path);
      else await rename(temporary, path);
    } catch (error) {
      if (exclusive && error.code === "EEXIST") throw new CocosError("OPERATION_CONFLICT", "Workflow ID already exists; query its status before recovery");
      throw error;
    } finally {
      await unlink(temporary).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
  }
};

// packages/native-adapters/src/client-files.json
var client_files_default = [
  "launcher.mjs",
  "router.mjs",
  "router-daemon.mjs",
  "session.mjs",
  "connector.mjs",
  "worker.mjs",
  "install.mjs",
  "LICENSE"
];

// packages/native-adapters/src/client-installation.ts
var clientFiles = client_files_default;
var ClientPackage = class {
  async json(paths, name) {
    const path = await paths.resolve(name), info = await lstat3(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid client metadata");
    return Json.object(Json.value(JSON.parse(await readFile2(path, "utf8"))));
  }
  async verify(root) {
    const paths = await ProjectPaths.open(root), value = await this.json(paths, "manifest.json");
    if (value.schemaVersion !== 1 || value.kind !== "cocos-unified-client" || value.apiVersion !== 1 || typeof value.version !== "string" || typeof value.buildId !== "string" || !/^[a-f\d]{16}$/.test(value.buildId) || typeof value.builtAt !== "string" || !value.builtAt.endsWith("Z") || !Number.isFinite(Date.parse(value.builtAt)) || typeof value.sourceFingerprint !== "string" || !/^[a-f\d]{64}$/.test(value.sourceFingerprint) || value.verificationReportSha256 !== null && (typeof value.verificationReportSha256 !== "string" || !/^[a-f\d]{64}$/.test(value.verificationReportSha256))) throw new CocosError("VERIFICATION_FAILED", "Invalid unified client manifest");
    const hashes = Json.object(value.fileHashes);
    const names = Object.keys(hashes), legacy = ["launcher.mjs", "router.mjs", "worker.mjs", "install.mjs", "LICENSE"];
    if (![clientFiles, legacy].some((expected) => [...expected].sort().join("|") === names.slice().sort().join("|"))) throw new CocosError("VERIFICATION_FAILED", "Unexpected client package files");
    let size = 0;
    for (const name of names) {
      const path = await paths.resolve(name), info = await lstat3(path);
      size += info.size;
      if (!info.isFile() || info.isSymbolicLink() || !info.size || size > 40 * 1024 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid or oversized client file");
      if (createHash2("sha256").update(await readFile2(path)).digest("hex") !== hashes[name]) throw new CocosError("VERIFICATION_FAILED", "Client file checksum mismatch", { name });
    }
    return value;
  }
  async installed(root, verify = true) {
    const paths = await ProjectPaths.open(root), row = await this.json(paths, "current.json");
    if (row.schemaVersion !== 1 || typeof row.buildId !== "string" || !/^[a-f\d]{16}$/.test(row.buildId) || row.versionPath !== `versions/${row.buildId}` || typeof row.workspaceRoot !== "string" || !isAbsolute3(row.workspaceRoot)) throw new CocosError("VERIFICATION_FAILED", "Invalid client version pointer");
    const version2 = await paths.resolve(String(row.versionPath));
    const manifest = verify ? await this.verify(version2) : await this.json(await ProjectPaths.open(version2), "manifest.json");
    if (manifest.buildId !== row.buildId) throw new CocosError("VERIFICATION_FAILED", "Client version pointer does not match manifest");
    return { current: row, manifest };
  }
  async configuration(root, nodeExecutable) {
    if (!isAbsolute3(nodeExecutable)) throw new CocosError("INVALID_ARGUMENT", "Node executable must be absolute");
    const { current, manifest } = await this.installed(root), installation = await ProjectPaths.open(root), workspace = await ProjectPaths.open(current.workspaceRoot);
    if (await workspace.resolve(".codex-work/artifacts/cocos-client") !== installation.root) throw new CocosError("VERIFICATION_FAILED", "Client workspace does not match installation");
    const launcher = await installation.resolve("launcher.mjs"), info = await lstat3(launcher);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024 || createHash2("sha256").update(await readFile2(launcher)).digest("hex") !== manifest.fileHashes["launcher.mjs"]) throw new CocosError("VERIFICATION_FAILED", "Client launcher checksum mismatch");
    await new ClientPolicies().load(installation);
    const temporary = await workspace.work("tmp", "cocos-client"), cache = await workspace.work("cache", "cocos-client");
    const q = (value) => JSON.stringify(value);
    const server = "cocos_unified";
    return `[mcp_servers.${server}]
command = ${q(nodeExecutable)}
args = [${q(await installation.resolve("launcher.mjs"))}]
startup_timeout_sec = 20
tool_timeout_sec = 120

[mcp_servers.${server}.env]
TMPDIR = ${q(temporary)}
TMP = ${q(temporary)}
TEMP = ${q(temporary)}
XDG_CACHE_HOME = ${q(cache)}
NODE_COMPILE_CACHE = ${q(join3(cache, "node"))}
TZ = "UTC"
`;
  }
};
var ClientInstallation = class {
  packages = new ClientPackage();
  async install(workspaceRoot, bundleRoot, allowedRoots) {
    const workspace = await ProjectPaths.open(workspaceRoot), bundle = await ProjectPaths.open(bundleRoot), manifest = await this.packages.verify(bundle.root);
    const root = await workspace.work("artifacts", "cocos-client"), installation = await ProjectPaths.open(root);
    const release = await this.lock(installation);
    let staging;
    let successful = false;
    try {
      staging = await workspace.work("tmp", `cocos-client-install-${randomUUID2()}`);
      await mkdir2(await installation.resolve("versions"), { recursive: true });
      const target = await installation.resolve(`versions/${manifest.buildId}`);
      let exists = false;
      try {
        const info = await lstat3(target);
        if (!info.isDirectory() || info.isSymbolicLink()) throw new CocosError("VERIFICATION_FAILED", "Invalid installed client version directory");
        exists = true;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      if (exists) await this.packages.verify(target);
      else {
        for (const name of [...Object.keys(manifest.fileHashes), "manifest.json"]) await writeFile(join3(staging, name), await readFile2(await bundle.resolve(name)), { flag: "wx", mode: 384 });
        await this.packages.verify(staging);
        await rename2(staging, target);
      }
      const policy = await installation.resolve("policy.json");
      try {
        await new ClientPolicies().load(installation);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        const roots = await Promise.all(allowedRoots.map((root2) => ProjectPaths.open(root2)));
        const value = new ClientPolicies().parse({
          schemaVersion: 1,
          allowedRoots: roots.map((root2) => root2.root),
          autoStartBackend: true,
          allowProjectCode: false,
          clientHeartbeatSeconds: 10,
          clientLeaseTtlSeconds: 60,
          idleExitSeconds: 90
        });
        await new AtomicJson().write(policy, Json.value(value), true);
      }
      const current = { schemaVersion: 1, buildId: manifest.buildId, versionPath: `versions/${manifest.buildId}`, workspaceRoot: workspace.root };
      let previous;
      try {
        previous = await this.packages.json(installation, "current.json");
        await this.packages.installed(root);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      if (previous && previous.buildId !== manifest.buildId) await new AtomicJson().write(await installation.resolve("previous.json"), previous);
      await this.launcher(installation, target);
      await new AtomicJson().write(await installation.resolve("current.json"), Json.value(current));
      successful = true;
      return { installedPath: root, version: manifest.version, buildId: manifest.buildId, sourceFingerprint: manifest.sourceFingerprint, configuration: await this.packages.configuration(root, process.execPath) };
    } finally {
      await release();
      if (successful && staging) await rm(staging, { recursive: true, force: true });
    }
  }
  async launcher(installation, versionRoot) {
    const target = await installation.resolve("launcher.mjs");
    try {
      const info = await lstat3(target);
      if (!info.isFile() || info.isSymbolicLink()) throw new CocosError("VERIFICATION_FAILED", "Client launcher must be a regular file");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const temporary = await installation.resolve(`launcher-${randomUUID2()}.tmp`);
    try {
      await writeFile(temporary, await readFile2(join3(versionRoot, "launcher.mjs")), { flag: "wx", mode: 384 });
      await rename2(temporary, target);
    } finally {
      await unlink2(temporary).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
  }
  async lock(installation) {
    const path = await installation.resolve(".install-lock");
    try {
      await mkdir2(path, { mode: 448 });
    } catch (error) {
      if (error.code === "EEXIST") throw new CocosError("RESOURCE_BUSY", "Another client installation is in progress; inspect its lock before recovery");
      throw error;
    }
    const owner = join3(path, "owner.json");
    try {
      await writeFile(owner, JSON.stringify({ pid: process.pid, startedAt: (/* @__PURE__ */ new Date()).toISOString() }), { flag: "wx", mode: 384 });
    } catch (error) {
      await rmdir(path);
      throw error;
    }
    return async () => {
      await unlink2(owner);
      await rmdir(path);
    };
  }
  async rollback(workspaceRoot) {
    const workspace = await ProjectPaths.open(workspaceRoot), root = await workspace.resolve(".codex-work/artifacts/cocos-client"), installation = await ProjectPaths.open(root), release = await this.lock(installation);
    try {
      const previous = await this.packages.json(installation, "previous.json"), current = await this.packages.json(installation, "current.json");
      if (previous.schemaVersion !== 1 || typeof previous.buildId !== "string" || !/^[a-f\d]{16}$/.test(previous.buildId) || previous.versionPath !== `versions/${previous.buildId}` || previous.workspaceRoot !== workspace.root) throw new CocosError("VERIFICATION_FAILED", "Invalid client rollback pointer");
      const version2 = await installation.resolve(String(previous.versionPath));
      await this.packages.verify(version2);
      await this.launcher(installation, version2);
      await new AtomicJson().write(await installation.resolve("current.json"), previous);
      await new AtomicJson().write(await installation.resolve("previous.json"), current);
      return { installedPath: root, buildId: previous.buildId, configuration: await this.packages.configuration(root, process.execPath) };
    } finally {
      await release();
    }
  }
};

// packages/application/src/project-locator.ts
import { readFile as readFile3, lstat as lstat4 } from "node:fs/promises";
import { dirname as dirname2, isAbsolute as isAbsolute4, relative as relative2, sep as sep2 } from "node:path";
var ProjectLocator = class {
  constructor(allowedRoots) {
    this.allowedRoots = allowedRoots;
  }
  allowedRoots;
  contains(root, path) {
    const suffix = relative2(root, path);
    return suffix === "" || !isAbsolute4(suffix) && suffix !== ".." && !suffix.startsWith(`..${sep2}`);
  }
  async available(input) {
    try {
      return await ProjectPaths.open(input);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  /** 父工作区只检查调用方提供的授权根，不递归扫描磁盘；名称和 project.json id 不参与选择。 */
  async workspace(input, candidates, preferred) {
    if (!isAbsolute4(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "workspacePath must be an absolute directory path");
    const workspace = await ProjectPaths.open(input);
    if (candidates.some((root) => this.contains(root, workspace.root))) {
      try {
        return await this.locate(workspace.root);
      } catch (error) {
        if (CocosError.from(error).code !== "INVALID_ARGUMENT") throw error;
      }
    }
    const rows = [];
    for (const root of [...new Set(candidates)].sort()) {
      if (!this.contains(workspace.root, root)) continue;
      const paths = await this.available(root);
      if (!paths) continue;
      if (paths.root !== root) throw new CocosError("VERIFICATION_FAILED", "An authorized project path changed its realpath");
      if (await this.major(paths)) rows.push(paths);
    }
    if (preferred) {
      const target = (await ProjectPaths.open(preferred)).root, match = rows.find((row) => row.root === target);
      if (!match) throw new CocosError("PATH_OUTSIDE_PROJECT", "Workspace mapping must select an authorized project inside this workspace");
      return match;
    }
    if (!rows.length) throw new CocosError("PATH_OUTSIDE_PROJECT", "No authorized Creator project matches workspacePath; provide an authorized projectPath");
    if (rows.length > 1) throw new CocosError("AMBIGUOUS_TARGET", "Multiple authorized projects match workspacePath; select projectPath explicitly or configure a workspace mapping", {
      workspacePath: workspace.root,
      rows: rows.map((row) => ({ projectPath: row.root }))
    });
    return rows[0];
  }
  async locate(input) {
    if (!isAbsolute4(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "projectPath must be an absolute directory path");
    let paths = await ProjectPaths.open(input);
    const roots = (await Promise.all(this.allowedRoots.map((root) => this.available(root)))).filter((root) => root !== null);
    const permitted = roots.filter((root) => this.contains(root.root, paths.root)).sort((a, b) => b.root.length - a.root.length)[0];
    if (!permitted) throw new CocosError("PATH_OUTSIDE_PROJECT", "Project is outside the client allowedRoots");
    for (let depth = 0; depth < 64; depth++) {
      if (await this.major(paths)) return paths;
      const parent = dirname2(paths.root);
      if (parent === paths.root || !this.contains(permitted.root, parent)) break;
      paths = await ProjectPaths.open(parent);
    }
    throw new CocosError("INVALID_ARGUMENT", "No Creator 2/3 project metadata found within allowedRoots");
  }
  async metadata(paths, name) {
    try {
      const path = await paths.resolve(name), info = await lstat4(path);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 1024 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid Creator project metadata");
      return Json.object(Json.value(JSON.parse(await readFile3(path, "utf8"))));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async major(paths) {
    const modern = await this.metadata(paths, "package.json"), creator = modern?.creator;
    const version2 = creator && typeof creator === "object" && !Array.isArray(creator) ? creator.version : null;
    const legacy = await this.metadata(paths, "project.json");
    const major2 = typeof version2 === "string" && /^3\.\d+\.\d+(?:[-+].*)?$/.test(version2) ? 3 : legacy?.engine === "cocos-creator-js" && typeof legacy.version === "string" && /^2\.\d+\.\d+(?:[-+].*)?$/.test(legacy.version) ? 2 : null;
    if (!major2) return null;
    try {
      return (await lstat4(await paths.resolve("assets"))).isDirectory() ? major2 : null;
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
};

// packages/native-adapters/src/project-authorization.ts
import { readFile as readFile4, mkdir as mkdir3, rmdir as rmdir2, writeFile as writeFile2, unlink as unlink3, lstat as lstat5 } from "node:fs/promises";
import { createHash as createHash3 } from "node:crypto";
import { isAbsolute as isAbsolute5, relative as relative3, sep as sep3, join as join4 } from "node:path";
var ProjectAuthorizations = class {
  constructor(installationRoot) {
    this.installationRoot = installationRoot;
  }
  installationRoot;
  contains(root, path) {
    const suffix = relative3(root, path);
    return suffix === "" || !isAbsolute5(suffix) && suffix !== ".." && !suffix.startsWith(`..${sep3}`);
  }
  async rows() {
    const installation = await ProjectPaths.open(this.installationRoot), path = await installation.resolve("authorized-projects.json");
    try {
      const info = await lstat5(path);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 1024 * 1024 || info.mode & 18 || process.getuid && info.uid !== process.getuid()) throw new Error("Untrusted authorization file");
      const document = Json.object(Json.value(JSON.parse(await readFile4(path, "utf8"))));
      if (document.schemaVersion !== 1 || Object.keys(document).sort().join("|") !== "rows|schemaVersion" || !Array.isArray(document.rows) || document.rows.length > 1024) throw new Error("Invalid authorization document");
      const seen = /* @__PURE__ */ new Set();
      return document.rows.map((value) => {
        const row = Json.object(value);
        if (Object.keys(row).sort().join("|") !== "creatorMajor|manifestSha256|projectPath|state|updatedAt" || typeof row.projectPath !== "string" || !isAbsolute5(row.projectPath) || row.projectPath.length > 4096 || row.projectPath.includes("\0") || seen.has(row.projectPath) || row.creatorMajor !== 2 && row.creatorMajor !== 3 || typeof row.manifestSha256 !== "string" || !/^[a-f\d]{64}$/.test(row.manifestSha256) || row.state !== "authorized" && row.state !== "revoked" || typeof row.updatedAt !== "string" || !row.updatedAt.endsWith("Z") || !Number.isFinite(Date.parse(row.updatedAt))) throw new Error("Invalid project authorization");
        seen.add(row.projectPath);
        return row;
      });
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw new CocosError("VERIFICATION_FAILED", "Project authorization registry is invalid; inspect it before recovery");
    }
  }
  async identity(paths, major2) {
    if (await new ProjectLocator([paths.root]).major(paths) !== major2) throw new CocosError("INVALID_ARGUMENT", "Authorization requires a matching Creator project with assets");
    const extension = await paths.resolve(`${major2 === 2 ? "packages" : "extensions"}/cocos-mcp-creator${major2}`);
    if (new ExtensionHealth().inspect(extension, major2).health !== "healthy") throw new CocosError("VERIFICATION_FAILED", "Authorization requires a complete verified CocosMCP extension");
    return createHash3("sha256").update(await readFile4(join4(extension, "package.json"))).digest("hex");
  }
  async state(project2) {
    const paths = await ProjectPaths.open(project2), row = (await this.rows()).find((row2) => row2.projectPath === paths.root);
    if (!row) return "not-authorized";
    if (row.state === "authorized" && await this.identity(paths, row.creatorMajor) !== row.manifestSha256) throw new CocosError("VERIFICATION_FAILED", "Installed extension changed; authorize the verified installation again");
    return row.state;
  }
  async locate(input, allowedRoots) {
    if (!isAbsolute5(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "projectPath must be an absolute directory path");
    const paths = await ProjectPaths.open(input);
    const row = (await this.rows()).filter((row2) => this.contains(row2.projectPath, paths.root)).sort((a, b) => b.projectPath.length - a.projectPath.length)[0];
    if (row) {
      if (row.state === "revoked") throw new CocosError("PATH_OUTSIDE_PROJECT", "This project authorization was revoked");
      const project2 = await new ProjectLocator([row.projectPath]).locate(input);
      if (project2.root !== row.projectPath) throw new CocosError("PATH_OUTSIDE_PROJECT", "Nested Creator projects require their own installation authorization");
      if (await this.identity(project2, row.creatorMajor) !== row.manifestSha256) throw new CocosError("VERIFICATION_FAILED", "Installed extension changed; authorize the verified installation again");
      return project2;
    }
    if (allowedRoots.length) return new ProjectLocator(allowedRoots).locate(input);
    throw new CocosError("PATH_OUTSIDE_PROJECT", "Project is not authorized; install the CocosMCP extension or authorize this project in its control center");
  }
  async workspace(input, allowedRoots, mappings = []) {
    if (!isAbsolute5(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "workspacePath must be an absolute directory path");
    const workspace = await ProjectPaths.open(input), rows = await this.rows(), locator = new ProjectLocator(allowedRoots);
    if (rows.some((row) => locator.contains(row.projectPath, workspace.root))) return this.locate(workspace.root, allowedRoots);
    const roots = (await Promise.all(allowedRoots.map((root) => locator.available(root)))).filter((root) => root !== null);
    const defaults = [];
    for (const mapping of mappings) {
      const source = await locator.available(mapping.workspacePath);
      if (source?.root !== workspace.root) continue;
      const target = await locator.available(mapping.projectPath);
      if (!target) throw new CocosError("CONTEXT_UNAVAILABLE", "The selected workspace mapping target no longer exists; inspect this mapping before choosing another project", {
        workspacePath: workspace.root,
        projectPath: mapping.projectPath
      });
      defaults.push(target.root);
    }
    if (new Set(defaults).size > 1) throw new CocosError("AMBIGUOUS_TARGET", "Conflicting realpath workspace mappings", { rows: [...new Set(defaults)].sort().map((projectPath) => ({ projectPath })) });
    const candidates = [...rows.filter((row) => row.state === "authorized").map((row) => row.projectPath), ...roots.map((root) => root.root)];
    const selected = await new ProjectLocator(roots.map((root) => root.root)).workspace(workspace.root, candidates, defaults[0]);
    return this.locate(selected.root, allowedRoots);
  }
  async grant(project2, major2) {
    const paths = await ProjectPaths.open(project2), manifestSha256 = await this.identity(paths, major2);
    return this.update(paths.root, (previous) => previous?.state === "authorized" && previous.manifestSha256 === manifestSha256 && previous.creatorMajor === major2 ? previous : { projectPath: paths.root, creatorMajor: major2, manifestSha256, state: "authorized", updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  }
  async revoke(project2) {
    const paths = await ProjectPaths.open(project2);
    return this.update(paths.root, (previous) => {
      if (!previous) throw new CocosError("NOT_FOUND", "This project has no installation authorization");
      return previous.state === "revoked" ? previous : { ...previous, state: "revoked", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    });
  }
  async update(project2, change) {
    const installation = await ProjectPaths.open(this.installationRoot), lock = await installation.resolve(".project-authorization-lock");
    let locked = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      try {
        await mkdir3(lock, { mode: 448 });
        locked = true;
        break;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        await new Promise((resolve2) => setTimeout(resolve2, 10));
      }
    }
    if (!locked) throw new CocosError("RESOURCE_BUSY", "Project authorization is busy; inspect the authorization lock before recovery");
    const owner = join4(lock, "owner.json");
    try {
      await writeFile2(owner, JSON.stringify({ pid: process.pid, startedAt: (/* @__PURE__ */ new Date()).toISOString() }), { flag: "wx", mode: 384 });
      const rows = await this.rows(), previous = rows.find((row) => row.projectPath === project2), next = change(previous);
      if (next !== previous) {
        if (!previous && rows.length >= 1024) throw new CocosError("RESOURCE_BUSY", "Project authorization registry is full");
        const updated = [...rows.filter((row) => row.projectPath !== project2), next].sort((a, b) => a.projectPath.localeCompare(b.projectPath));
        await new AtomicJson().write(await installation.resolve("authorized-projects.json"), Json.value({ schemaVersion: 1, rows: updated }));
      }
      return next;
    } finally {
      await unlink3(owner).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
      await rmdir2(lock);
    }
  }
};

// packages/native-adapters/src/installer.ts
var ExtensionInstaller = class {
  async authorizeInstalled(project2, major2, clientInstallation) {
    const paths = await ProjectPaths.open(project2), actual = await new ProjectLocator([paths.root]).major(paths);
    if (!actual) return { state: "pending", message: "No Creator project metadata; unified authorization was not granted" };
    if (actual !== major2) throw new CocosError("INVALID_ARGUMENT", "Creator project and extension major version do not match");
    if (!clientInstallation) {
      try {
        const config = JSON.parse(await readFile5(await paths.resolve(`${major2 === 2 ? "packages" : "extensions"}/cocos-mcp-creator${major2}/service-config.json`), "utf8"));
        clientInstallation = config.clientInstallation;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    }
    if (!clientInstallation) throw new CocosError("VERIFICATION_FAILED", "\u7EDF\u4E00\u5BA2\u6237\u7AEF\u672A\u914D\u7F6E\uFF0C\u5DE5\u7A0B\u6388\u6743\u672A\u5B8C\u6210\uFF0C\u8BF7\u4F7F\u7528\u5B8C\u6574\u672C\u5730\u6784\u5EFA\u5B89\u88C5");
    if (!isAbsolute6(clientInstallation)) throw new CocosError("INVALID_ARGUMENT", "clientInstallation must be an absolute path");
    await new ClientPackage().installed(clientInstallation);
    await new ProjectAuthorizations(clientInstallation).grant(paths.root, major2);
    return { state: "authorized", message: null };
  }
  async install(project2, major2, buildRoot) {
    const paths = await ProjectPaths.open(project2);
    const source = join5(buildRoot, `extensions/creator${major2}`);
    new ExtensionHealth().require(source, major2);
    const manifest = JSON.parse(await readFile5(join5(source, "package.json"), "utf8"));
    const parent = await paths.resolve(major2 === 2 ? "packages" : "extensions");
    const target = await paths.resolve(join5(parent, manifest.name));
    await mkdir4(parent, { recursive: true });
    let config = {};
    for (const directory of [target, source]) {
      try {
        config = JSON.parse(await readFile5(directory === target ? await paths.resolve(join5(target, "service-config.json")) : join5(source, "service-config.json"), "utf8"));
        if (config.clientInstallation) break;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    }
    const actual = await new ProjectLocator([paths.root]).major(paths);
    if (actual && actual !== major2) throw new CocosError("INVALID_ARGUMENT", "Creator project and extension major version do not match");
    if (actual) config.clientInstallation = await this.prepareClient(paths, buildRoot, config.clientInstallation);
    const staging = join5(await paths.work("tmp", `extension-install-${randomUUID3()}`), manifest.name);
    await cp(source, staging, { recursive: true, force: false, errorOnExist: true });
    new ExtensionHealth().require(staging, major2);
    await writeFile3(join5(staging, "service-config.json"), JSON.stringify({ nodeExecutable: process.execPath, buildRoot, clientInstallation: config.clientInstallation }), { mode: 384 });
    const ignore = await paths.resolve(".gitignore");
    const content = await readFile5(ignore, "utf8").catch((error) => {
      if (error.code === "ENOENT") return "";
      throw error;
    });
    if (!content.split(/\r?\n/).some((line) => [".codex-work/", "/.codex-work/"].includes(line.trim()))) {
      await writeFile3(ignore, content + (content && !content.endsWith("\n") ? "\n" : "") + ".codex-work/\n");
    }
    let backupPath = null;
    if (await stat(target).then(() => true, () => false)) {
      const previous = JSON.parse(await readFile5(join5(target, "package.json"), "utf8"));
      if (previous.name !== manifest.name) throw new CocosError("OPERATION_CONFLICT", "Existing extension has a different identity");
      const directory = await paths.resolve(".codex-work/backups/extension-installations");
      await mkdir4(directory, { recursive: true });
      backupPath = join5(directory, `${manifest.name}-${randomUUID3()}`);
      await rename3(target, backupPath);
    }
    let published = false;
    try {
      await rename3(staging, target);
      published = true;
      const authorization = await this.authorizeInstalled(paths.root, major2, config.clientInstallation);
      return { installedPath: target, backupPath, authorization };
    } catch (error) {
      if (published) await rename3(target, staging);
      if (backupPath) await rename3(backupPath, target);
      throw error;
    }
  }
  async prepareClient(project2, buildRoot, configured) {
    const localBuild = basename(buildRoot) === "build" && basename(dirname3(buildRoot)) === ".codex-work";
    const workspace = localBuild ? dirname3(dirname3(buildRoot)) : project2.root;
    const root = configured ?? join5(workspace, ".codex-work/artifacts/cocos-client");
    if (!isAbsolute6(root)) throw new CocosError("INVALID_ARGUMENT", "clientInstallation must be an absolute path");
    try {
      await new ClientPackage().installed(root);
      return root;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    try {
      await lstat6(root);
      throw new CocosError("VERIFICATION_FAILED", "\u7EDF\u4E00\u5BA2\u6237\u7AEF\u5B89\u88C5\u4E0D\u5B8C\u6574\uFF0C\u8BF7\u5148\u4FEE\u590D\u5DF2\u6709\u5B89\u88C5");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (root !== join5(workspace, ".codex-work/artifacts/cocos-client")) throw new CocosError("VERIFICATION_FAILED", "\u914D\u7F6E\u7684\u7EDF\u4E00\u5BA2\u6237\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u4FEE\u590D clientInstallation");
    try {
      await new ClientPackage().verify(join5(buildRoot, "client"));
    } catch (error) {
      throw new CocosError("VERIFICATION_FAILED", "\u7EDF\u4E00\u5BA2\u6237\u7AEF\u4E0D\u53EF\u7528\uFF0C\u5B89\u88C5\u5305\u987B\u5305\u542B client \u6784\u5EFA\uFF1B\u63D2\u4EF6\u672A\u66FF\u6362", { reason: error instanceof Error ? error.message : String(error) });
    }
    await new ClientInstallation().install(workspace, join5(buildRoot, "client"), []);
    await new ClientPackage().installed(root);
    return root;
  }
};

// packages/native-adapters/src/github-update.ts
var RELEASE_API = "https://api.github.com/repos/iEfoam/CocosMcp/releases/latest";
var GithubUpdate = class {
  constructor(request = fetch) {
    this.request = request;
  }
  request;
  async download(url, limit) {
    const response = await this.request(url, { headers: { "User-Agent": "CocosMCP", Accept: "application/vnd.github+json" }, signal: AbortSignal.timeout(6e4) });
    if (!response.ok) throw new Error(response.status === 404 ? "GitHub \u5C1A\u672A\u53D1\u5E03\u53EF\u5B89\u88C5\u7248\u672C\uFF0C\u8BF7\u7B49\u5F85\u81EA\u52A8\u6784\u5EFA\u5B8C\u6210" : `GitHub \u8BF7\u6C42\u5931\u8D25 (${response.status})`);
    if (Number(response.headers.get("content-length") ?? 0) > limit) throw new Error("\u66F4\u65B0\u6587\u4EF6\u8D85\u8FC7\u5927\u5C0F\u9650\u5236");
    const chunks = [];
    let length = 0;
    for await (const chunk of response.body) {
      length += chunk.length;
      if (length > limit) throw new Error("\u66F4\u65B0\u6587\u4EF6\u8D85\u8FC7\u5927\u5C0F\u9650\u5236");
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
  async latest(major2) {
    const release = JSON.parse((await this.download(RELEASE_API, 1024 * 1024)).toString());
    if (release.prerelease || release.draft) throw new Error("Stable updater refuses development or draft releases");
    const asset = release.assets.find((row) => row.name === `cocos-mcp-creator${major2}.full.json`) ?? release.assets.find((row) => row.name === `cocos-mcp-creator${major2}.json`);
    if (!asset || !/^sha256:[a-f0-9]{64}$/.test(asset.digest ?? "")) throw new Error("GitHub \u53D1\u5E03\u7F3A\u5C11\u5BF9\u5E94\u6269\u5C55\u5305\u6216 SHA-256 \u6821\u9A8C\u503C");
    const url = new URL(asset.browser_download_url);
    if (url.origin !== "https://github.com" || !url.pathname.startsWith("/iEfoam/CocosMcp/releases/download/")) throw new Error("\u66F4\u65B0\u5305\u4E0D\u5C5E\u4E8E iEfoam/CocosMcp");
    return { version: release.tag_name.replace(/^v/, ""), buildId: release.tag_name, url: url.href, digest: asset.digest.slice(7) };
  }
  validate(data, release, major2) {
    if (createHash4("sha256").update(data).digest("hex") !== release.digest) throw new Error("\u66F4\u65B0\u5305 SHA-256 \u6821\u9A8C\u5931\u8D25");
    const bundle = JSON.parse(data.toString());
    const required = extension_files_default[major2], allowed = [...required, ...extension_files_default.presentation];
    if (bundle.major !== major2 || bundle.version !== release.version || bundle.buildId !== release.buildId || !Array.isArray(bundle.rows) || ![required.length, allowed.length].includes(bundle.rows.length) || release.url.endsWith(".full.json") && bundle.rows.length !== allowed.length) throw new Error("\u66F4\u65B0\u5305\u7248\u672C\u6216\u7ED3\u6784\u4E0D\u5339\u914D");
    const seen = /* @__PURE__ */ new Set();
    for (const row of bundle.rows) {
      if (!allowed.includes(row.path) || seen.has(row.path) || typeof row.content !== "string") throw new Error("\u66F4\u65B0\u5305\u5305\u542B\u975E\u6CD5\u6216\u91CD\u590D\u8DEF\u5F84");
      seen.add(row.path);
      if (!Buffer.from(row.content, "base64").length) throw new Error("\u66F4\u65B0\u5305\u5305\u542B\u7A7A\u8FD0\u884C\u6587\u4EF6");
    }
    if (required.some((path) => !seen.has(path)) || bundle.rows.length === allowed.length && allowed.some((path) => !seen.has(path))) throw new Error("\u66F4\u65B0\u5305\u7248\u672C\u6216\u7ED3\u6784\u4E0D\u5339\u914D");
    const manifest = JSON.parse(Buffer.from(bundle.rows.find((row) => row.path === "package.json").content, "base64").toString());
    if (manifest.name !== `cocos-mcp-creator${major2}` || manifest.version !== bundle.version || manifest.buildId !== bundle.buildId) throw new Error("\u6269\u5C55\u8EAB\u4EFD\u6821\u9A8C\u5931\u8D25");
    for (const row of bundle.rows) {
      const expected = manifest.fileHashes?.[row.path];
      if (row.path !== "package.json" && expected !== void 0 && createHash4("sha256").update(Buffer.from(row.content, "base64")).digest("hex") !== expected) throw new Error("\u66F4\u65B0\u5305\u8FD0\u884C\u6587\u4EF6\u6458\u8981\u4E0D\u5339\u914D");
    }
    return bundle;
  }
  async install(project2, major2) {
    const release = await this.latest(major2);
    const paths = await ProjectPaths.open(project2);
    const target = await paths.resolve(`${major2 === 2 ? "packages" : "extensions"}/cocos-mcp-creator${major2}`);
    const installed = JSON.parse(await readFile6(join6(target, "package.json"), "utf8"));
    if (installed.version === release.version && installed.buildId === release.buildId) {
      if (new ExtensionHealth().inspect(target, major2, release.url.endsWith(".full.json")).health === "healthy") {
        await new ExtensionInstaller().authorizeInstalled(project2, major2);
        return release;
      }
    }
    const data = await this.download(release.url, 40 * 1024 * 1024);
    const bundle = this.validate(data, release, major2);
    const stagingName = `github-${randomUUID4()}`;
    const buildRoot = await paths.work("downloads", stagingName);
    for (const row of bundle.rows) {
      const directory = row.path.startsWith("dist/") ? `extensions/creator${major2}/dist` : `extensions/creator${major2}`;
      const folder = await paths.work("downloads", `${stagingName}/${directory}`);
      await writeFile4(join6(folder, row.path.split("/").pop()), Buffer.from(row.content, "base64"));
    }
    await new ExtensionInstaller().install(project2, major2, buildRoot);
    return release;
  }
};

// apps/server/src/update-extension.ts
var [command, project, version] = process.argv.slice(2);
var major = Number(version);
if (!project || major !== 2 && major !== 3) throw new Error("Invalid extension update arguments");
try {
  const updater = new GithubUpdate();
  console.log(JSON.stringify(command === "check" ? await updater.latest(major) : command === "install" ? await updater.install(project, major) : (() => {
    throw new Error("Unknown update command");
  })()));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

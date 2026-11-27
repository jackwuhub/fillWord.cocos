"use strict";
var CocosMCPRuntime = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // <define:__COCOS_VERIFICATION_EVIDENCE__>
  var init_define_COCOS_VERIFICATION_EVIDENCE = __esm({
    "<define:__COCOS_VERIFICATION_EVIDENCE__>"() {
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js
  var require_code = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
      var _CodeOrName = class {
      };
      exports._CodeOrName = _CodeOrName;
      exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
      var Name = class extends _CodeOrName {
        constructor(s) {
          super();
          if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
          this.str = s;
        }
        toString() {
          return this.str;
        }
        emptyStr() {
          return false;
        }
        get names() {
          return { [this.str]: 1 };
        }
      };
      exports.Name = Name;
      var _Code = class extends _CodeOrName {
        constructor(code) {
          super();
          this._items = typeof code === "string" ? [code] : code;
        }
        toString() {
          return this.str;
        }
        emptyStr() {
          if (this._items.length > 1)
            return false;
          const item = this._items[0];
          return item === "" || item === '""';
        }
        get str() {
          var _a;
          return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
        }
        get names() {
          var _a;
          return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
              names[c.str] = (names[c.str] || 0) + 1;
            return names;
          }, {});
        }
      };
      exports._Code = _Code;
      exports.nil = new _Code("");
      function _(strs, ...args) {
        const code = [strs[0]];
        let i = 0;
        while (i < args.length) {
          addCodeArg(code, args[i]);
          code.push(strs[++i]);
        }
        return new _Code(code);
      }
      exports._ = _;
      var plus = new _Code("+");
      function str(strs, ...args) {
        const expr = [safeStringify(strs[0])];
        let i = 0;
        while (i < args.length) {
          expr.push(plus);
          addCodeArg(expr, args[i]);
          expr.push(plus, safeStringify(strs[++i]));
        }
        optimize(expr);
        return new _Code(expr);
      }
      exports.str = str;
      function addCodeArg(code, arg) {
        if (arg instanceof _Code)
          code.push(...arg._items);
        else if (arg instanceof Name)
          code.push(arg);
        else
          code.push(interpolate(arg));
      }
      exports.addCodeArg = addCodeArg;
      function optimize(expr) {
        let i = 1;
        while (i < expr.length - 1) {
          if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== void 0) {
              expr.splice(i - 1, 3, res);
              continue;
            }
            expr[i++] = "+";
          }
          i++;
        }
      }
      function mergeExprItems(a, b) {
        if (b === '""')
          return a;
        if (a === '""')
          return b;
        if (typeof a == "string") {
          if (b instanceof Name || a[a.length - 1] !== '"')
            return;
          if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
          if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
          return;
        }
        if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
          return `"${a}${b.slice(1)}`;
        return;
      }
      function strConcat(c1, c2) {
        return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
      }
      exports.strConcat = strConcat;
      function interpolate(x) {
        return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
      }
      function stringify(x) {
        return new _Code(safeStringify(x));
      }
      exports.stringify = stringify;
      function safeStringify(x) {
        return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      }
      exports.safeStringify = safeStringify;
      function getProperty(key) {
        return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
      }
      exports.getProperty = getProperty;
      function getEsmExportName(key) {
        if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
          return new _Code(`${key}`);
        }
        throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
      }
      exports.getEsmExportName = getEsmExportName;
      function regexpCode(rx) {
        return new _Code(rx.toString());
      }
      exports.regexpCode = regexpCode;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js
  var require_scope = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
      var code_1 = require_code();
      var ValueError = class extends Error {
        constructor(name) {
          super(`CodeGen: "code" for ${name} not defined`);
          this.value = name.value;
        }
      };
      var UsedValueState;
      (function(UsedValueState2) {
        UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
        UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
      })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
      exports.varKinds = {
        const: new code_1.Name("const"),
        let: new code_1.Name("let"),
        var: new code_1.Name("var")
      };
      var Scope = class {
        constructor({ prefixes, parent } = {}) {
          this._names = {};
          this._prefixes = prefixes;
          this._parent = parent;
        }
        toName(nameOrPrefix) {
          return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
        }
        name(prefix) {
          return new code_1.Name(this._newName(prefix));
        }
        _newName(prefix) {
          const ng = this._names[prefix] || this._nameGroup(prefix);
          return `${prefix}${ng.index++}`;
        }
        _nameGroup(prefix) {
          var _a, _b;
          if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
          }
          return this._names[prefix] = { prefix, index: 0 };
        }
      };
      exports.Scope = Scope;
      var ValueScopeName = class extends code_1.Name {
        constructor(prefix, nameStr) {
          super(nameStr);
          this.prefix = prefix;
        }
        setValue(value, { property, itemIndex }) {
          this.value = value;
          this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
        }
      };
      exports.ValueScopeName = ValueScopeName;
      var line = (0, code_1._)`\n`;
      var ValueScope = class extends Scope {
        constructor(opts) {
          super(opts);
          this._values = {};
          this._scope = opts.scope;
          this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
        }
        get() {
          return this._scope;
        }
        name(prefix) {
          return new ValueScopeName(prefix, this._newName(prefix));
        }
        value(nameOrPrefix, value) {
          var _a;
          if (value.ref === void 0)
            throw new Error("CodeGen: ref must be passed in value");
          const name = this.toName(nameOrPrefix);
          const { prefix } = name;
          const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
          let vs = this._values[prefix];
          if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
              return _name;
          } else {
            vs = this._values[prefix] = /* @__PURE__ */ new Map();
          }
          vs.set(valueKey, name);
          const s = this._scope[prefix] || (this._scope[prefix] = []);
          const itemIndex = s.length;
          s[itemIndex] = value.ref;
          name.setValue(value, { property: prefix, itemIndex });
          return name;
        }
        getValue(prefix, keyOrRef) {
          const vs = this._values[prefix];
          if (!vs)
            return;
          return vs.get(keyOrRef);
        }
        scopeRefs(scopeName, values = this._values) {
          return this._reduceValues(values, (name) => {
            if (name.scopePath === void 0)
              throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._)`${scopeName}${name.scopePath}`;
          });
        }
        scopeCode(values = this._values, usedValues, getCode) {
          return this._reduceValues(values, (name) => {
            if (name.value === void 0)
              throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
          }, usedValues, getCode);
        }
        _reduceValues(values, valueCode, usedValues = {}, getCode) {
          let code = code_1.nil;
          for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
              continue;
            const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
            vs.forEach((name) => {
              if (nameSet.has(name))
                return;
              nameSet.set(name, UsedValueState.Started);
              let c = valueCode(name);
              if (c) {
                const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
              } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
                code = (0, code_1._)`${code}${c}${this.opts._n}`;
              } else {
                throw new ValueError(name);
              }
              nameSet.set(name, UsedValueState.Completed);
            });
          }
          return code;
        }
      };
      exports.ValueScope = ValueScope;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js
  var require_codegen = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
      var code_1 = require_code();
      var scope_1 = require_scope();
      var code_2 = require_code();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return code_2._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return code_2.str;
      } });
      Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
        return code_2.strConcat;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return code_2.nil;
      } });
      Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
        return code_2.getProperty;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return code_2.stringify;
      } });
      Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
        return code_2.regexpCode;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return code_2.Name;
      } });
      var scope_2 = require_scope();
      Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
        return scope_2.Scope;
      } });
      Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
        return scope_2.ValueScope;
      } });
      Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
        return scope_2.ValueScopeName;
      } });
      Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
        return scope_2.varKinds;
      } });
      exports.operators = {
        GT: new code_1._Code(">"),
        GTE: new code_1._Code(">="),
        LT: new code_1._Code("<"),
        LTE: new code_1._Code("<="),
        EQ: new code_1._Code("==="),
        NEQ: new code_1._Code("!=="),
        NOT: new code_1._Code("!"),
        OR: new code_1._Code("||"),
        AND: new code_1._Code("&&"),
        ADD: new code_1._Code("+")
      };
      var Node = class {
        optimizeNodes() {
          return this;
        }
        optimizeNames(_names, _constants) {
          return this;
        }
      };
      var Def = class extends Node {
        constructor(varKind, name, rhs) {
          super();
          this.varKind = varKind;
          this.name = name;
          this.rhs = rhs;
        }
        render({ es5, _n }) {
          const varKind = es5 ? scope_1.varKinds.var : this.varKind;
          const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
          return `${varKind} ${this.name}${rhs};` + _n;
        }
        optimizeNames(names, constants) {
          if (!names[this.name.str])
            return;
          if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
          return this;
        }
        get names() {
          return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
        }
      };
      var Assign = class extends Node {
        constructor(lhs, rhs, sideEffects) {
          super();
          this.lhs = lhs;
          this.rhs = rhs;
          this.sideEffects = sideEffects;
        }
        render({ _n }) {
          return `${this.lhs} = ${this.rhs};` + _n;
        }
        optimizeNames(names, constants) {
          if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
          this.rhs = optimizeExpr(this.rhs, names, constants);
          return this;
        }
        get names() {
          const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
          return addExprNames(names, this.rhs);
        }
      };
      var AssignOp = class extends Assign {
        constructor(lhs, op, rhs, sideEffects) {
          super(lhs, rhs, sideEffects);
          this.op = op;
        }
        render({ _n }) {
          return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
        }
      };
      var Label = class extends Node {
        constructor(label) {
          super();
          this.label = label;
          this.names = {};
        }
        render({ _n }) {
          return `${this.label}:` + _n;
        }
      };
      var Break = class extends Node {
        constructor(label) {
          super();
          this.label = label;
          this.names = {};
        }
        render({ _n }) {
          const label = this.label ? ` ${this.label}` : "";
          return `break${label};` + _n;
        }
      };
      var Throw = class extends Node {
        constructor(error) {
          super();
          this.error = error;
        }
        render({ _n }) {
          return `throw ${this.error};` + _n;
        }
        get names() {
          return this.error.names;
        }
      };
      var AnyCode = class extends Node {
        constructor(code) {
          super();
          this.code = code;
        }
        render({ _n }) {
          return `${this.code};` + _n;
        }
        optimizeNodes() {
          return `${this.code}` ? this : void 0;
        }
        optimizeNames(names, constants) {
          this.code = optimizeExpr(this.code, names, constants);
          return this;
        }
        get names() {
          return this.code instanceof code_1._CodeOrName ? this.code.names : {};
        }
      };
      var ParentNode = class extends Node {
        constructor(nodes = []) {
          super();
          this.nodes = nodes;
        }
        render(opts) {
          return this.nodes.reduce((code, n) => code + n.render(opts), "");
        }
        optimizeNodes() {
          const { nodes } = this;
          let i = nodes.length;
          while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
              nodes.splice(i, 1, ...n);
            else if (n)
              nodes[i] = n;
            else
              nodes.splice(i, 1);
          }
          return nodes.length > 0 ? this : void 0;
        }
        optimizeNames(names, constants) {
          const { nodes } = this;
          let i = nodes.length;
          while (i--) {
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
              continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
          }
          return nodes.length > 0 ? this : void 0;
        }
        get names() {
          return this.nodes.reduce((names, n) => addNames(names, n.names), {});
        }
      };
      var BlockNode = class extends ParentNode {
        render(opts) {
          return "{" + opts._n + super.render(opts) + "}" + opts._n;
        }
      };
      var Root = class extends ParentNode {
      };
      var Else = class extends BlockNode {
      };
      Else.kind = "else";
      var If = class _If extends BlockNode {
        constructor(condition, nodes) {
          super(nodes);
          this.condition = condition;
        }
        render(opts) {
          let code = `if(${this.condition})` + super.render(opts);
          if (this.else)
            code += "else " + this.else.render(opts);
          return code;
        }
        optimizeNodes() {
          super.optimizeNodes();
          const cond = this.condition;
          if (cond === true)
            return this.nodes;
          let e = this.else;
          if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
          }
          if (e) {
            if (cond === false)
              return e instanceof _If ? e : e.nodes;
            if (this.nodes.length)
              return this;
            return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
          }
          if (cond === false || !this.nodes.length)
            return void 0;
          return this;
        }
        optimizeNames(names, constants) {
          var _a;
          this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
          if (!(super.optimizeNames(names, constants) || this.else))
            return;
          this.condition = optimizeExpr(this.condition, names, constants);
          return this;
        }
        get names() {
          const names = super.names;
          addExprNames(names, this.condition);
          if (this.else)
            addNames(names, this.else.names);
          return names;
        }
      };
      If.kind = "if";
      var For = class extends BlockNode {
      };
      For.kind = "for";
      var ForLoop = class extends For {
        constructor(iteration) {
          super();
          this.iteration = iteration;
        }
        render(opts) {
          return `for(${this.iteration})` + super.render(opts);
        }
        optimizeNames(names, constants) {
          if (!super.optimizeNames(names, constants))
            return;
          this.iteration = optimizeExpr(this.iteration, names, constants);
          return this;
        }
        get names() {
          return addNames(super.names, this.iteration.names);
        }
      };
      var ForRange = class extends For {
        constructor(varKind, name, from, to) {
          super();
          this.varKind = varKind;
          this.name = name;
          this.from = from;
          this.to = to;
        }
        render(opts) {
          const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
          const { name, from, to } = this;
          return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
        }
        get names() {
          const names = addExprNames(super.names, this.from);
          return addExprNames(names, this.to);
        }
      };
      var ForIter = class extends For {
        constructor(loop, varKind, name, iterable) {
          super();
          this.loop = loop;
          this.varKind = varKind;
          this.name = name;
          this.iterable = iterable;
        }
        render(opts) {
          return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
        }
        optimizeNames(names, constants) {
          if (!super.optimizeNames(names, constants))
            return;
          this.iterable = optimizeExpr(this.iterable, names, constants);
          return this;
        }
        get names() {
          return addNames(super.names, this.iterable.names);
        }
      };
      var Func = class extends BlockNode {
        constructor(name, args, async) {
          super();
          this.name = name;
          this.args = args;
          this.async = async;
        }
        render(opts) {
          const _async = this.async ? "async " : "";
          return `${_async}function ${this.name}(${this.args})` + super.render(opts);
        }
      };
      Func.kind = "func";
      var Return = class extends ParentNode {
        render(opts) {
          return "return " + super.render(opts);
        }
      };
      Return.kind = "return";
      var Try = class extends BlockNode {
        render(opts) {
          let code = "try" + super.render(opts);
          if (this.catch)
            code += this.catch.render(opts);
          if (this.finally)
            code += this.finally.render(opts);
          return code;
        }
        optimizeNodes() {
          var _a, _b;
          super.optimizeNodes();
          (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
          (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
          return this;
        }
        optimizeNames(names, constants) {
          var _a, _b;
          super.optimizeNames(names, constants);
          (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
          (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
          return this;
        }
        get names() {
          const names = super.names;
          if (this.catch)
            addNames(names, this.catch.names);
          if (this.finally)
            addNames(names, this.finally.names);
          return names;
        }
      };
      var Catch = class extends BlockNode {
        constructor(error) {
          super();
          this.error = error;
        }
        render(opts) {
          return `catch(${this.error})` + super.render(opts);
        }
      };
      Catch.kind = "catch";
      var Finally = class extends BlockNode {
        render(opts) {
          return "finally" + super.render(opts);
        }
      };
      Finally.kind = "finally";
      var CodeGen = class {
        constructor(extScope, opts = {}) {
          this._values = {};
          this._blockStarts = [];
          this._constants = {};
          this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
          this._extScope = extScope;
          this._scope = new scope_1.Scope({ parent: extScope });
          this._nodes = [new Root()];
        }
        toString() {
          return this._root.render(this.opts);
        }
        // returns unique name in the internal scope
        name(prefix) {
          return this._scope.name(prefix);
        }
        // reserves unique name in the external scope
        scopeName(prefix) {
          return this._extScope.name(prefix);
        }
        // reserves unique name in the external scope and assigns value to it
        scopeValue(prefixOrName, value) {
          const name = this._extScope.value(prefixOrName, value);
          const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
          vs.add(name);
          return name;
        }
        getScopeValue(prefix, keyOrRef) {
          return this._extScope.getValue(prefix, keyOrRef);
        }
        // return code that assigns values in the external scope to the names that are used internally
        // (same names that were returned by gen.scopeName or gen.scopeValue)
        scopeRefs(scopeName) {
          return this._extScope.scopeRefs(scopeName, this._values);
        }
        scopeCode() {
          return this._extScope.scopeCode(this._values);
        }
        _def(varKind, nameOrPrefix, rhs, constant) {
          const name = this._scope.toName(nameOrPrefix);
          if (rhs !== void 0 && constant)
            this._constants[name.str] = rhs;
          this._leafNode(new Def(varKind, name, rhs));
          return name;
        }
        // `const` declaration (`var` in es5 mode)
        const(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
        }
        // `let` declaration with optional assignment (`var` in es5 mode)
        let(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
        }
        // `var` declaration with optional assignment
        var(nameOrPrefix, rhs, _constant) {
          return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
        }
        // assignment code
        assign(lhs, rhs, sideEffects) {
          return this._leafNode(new Assign(lhs, rhs, sideEffects));
        }
        // `+=` code
        add(lhs, rhs) {
          return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
        }
        // appends passed SafeExpr to code or executes Block
        code(c) {
          if (typeof c == "function")
            c();
          else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
          return this;
        }
        // returns code for object literal for the passed argument list of key-value pairs
        object(...keyValues) {
          const code = ["{"];
          for (const [key, value] of keyValues) {
            if (code.length > 1)
              code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
              code.push(":");
              (0, code_1.addCodeArg)(code, value);
            }
          }
          code.push("}");
          return new code_1._Code(code);
        }
        // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
        if(condition, thenBody, elseBody) {
          this._blockNode(new If(condition));
          if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
          } else if (thenBody) {
            this.code(thenBody).endIf();
          } else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
          }
          return this;
        }
        // `else if` clause - invalid without `if` or after `else` clauses
        elseIf(condition) {
          return this._elseNode(new If(condition));
        }
        // `else` clause - only valid after `if` or `else if` clauses
        else() {
          return this._elseNode(new Else());
        }
        // end `if` statement (needed if gen.if was used only with condition)
        endIf() {
          return this._endBlockNode(If, Else);
        }
        _for(node, forBody) {
          this._blockNode(node);
          if (forBody)
            this.code(forBody).endFor();
          return this;
        }
        // a generic `for` clause (or statement if `forBody` is passed)
        for(iteration, forBody) {
          return this._for(new ForLoop(iteration), forBody);
        }
        // `for` statement for a range of values
        forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
          const name = this._scope.toName(nameOrPrefix);
          return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
        }
        // `for-of` statement (in es5 mode replace with a normal for loop)
        forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
          const name = this._scope.toName(nameOrPrefix);
          if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
              this.var(name, (0, code_1._)`${arr}[${i}]`);
              forBody(name);
            });
          }
          return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
        }
        // `for-in` statement.
        // With option `ownProperties` replaced with a `for-of` loop for object keys
        forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
          if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
          }
          const name = this._scope.toName(nameOrPrefix);
          return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
        }
        // end `for` loop
        endFor() {
          return this._endBlockNode(For);
        }
        // `label` statement
        label(label) {
          return this._leafNode(new Label(label));
        }
        // `break` statement
        break(label) {
          return this._leafNode(new Break(label));
        }
        // `return` statement
        return(value) {
          const node = new Return();
          this._blockNode(node);
          this.code(value);
          if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
          return this._endBlockNode(Return);
        }
        // `try` statement
        try(tryBody, catchCode, finallyCode) {
          if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
          const node = new Try();
          this._blockNode(node);
          this.code(tryBody);
          if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
          }
          if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
          }
          return this._endBlockNode(Catch, Finally);
        }
        // `throw` statement
        throw(error) {
          return this._leafNode(new Throw(error));
        }
        // start self-balancing block
        block(body, nodeCount) {
          this._blockStarts.push(this._nodes.length);
          if (body)
            this.code(body).endBlock(nodeCount);
          return this;
        }
        // end the current self-balancing block
        endBlock(nodeCount) {
          const len = this._blockStarts.pop();
          if (len === void 0)
            throw new Error("CodeGen: not in self-balancing block");
          const toClose = this._nodes.length - len;
          if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
          }
          this._nodes.length = len;
          return this;
        }
        // `function` heading (or definition if funcBody is passed)
        func(name, args = code_1.nil, async, funcBody) {
          this._blockNode(new Func(name, args, async));
          if (funcBody)
            this.code(funcBody).endFunc();
          return this;
        }
        // end function definition
        endFunc() {
          return this._endBlockNode(Func);
        }
        optimize(n = 1) {
          while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
          }
        }
        _leafNode(node) {
          this._currNode.nodes.push(node);
          return this;
        }
        _blockNode(node) {
          this._currNode.nodes.push(node);
          this._nodes.push(node);
        }
        _endBlockNode(N1, N2) {
          const n = this._currNode;
          if (n instanceof N1 || N2 && n instanceof N2) {
            this._nodes.pop();
            return this;
          }
          throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
        }
        _elseNode(node) {
          const n = this._currNode;
          if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
          }
          this._currNode = n.else = node;
          return this;
        }
        get _root() {
          return this._nodes[0];
        }
        get _currNode() {
          const ns = this._nodes;
          return ns[ns.length - 1];
        }
        set _currNode(node) {
          const ns = this._nodes;
          ns[ns.length - 1] = node;
        }
      };
      exports.CodeGen = CodeGen;
      function addNames(names, from) {
        for (const n in from)
          names[n] = (names[n] || 0) + (from[n] || 0);
        return names;
      }
      function addExprNames(names, from) {
        return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
      }
      function optimizeExpr(expr, names, constants) {
        if (expr instanceof code_1.Name)
          return replaceName(expr);
        if (!canOptimize(expr))
          return expr;
        return new code_1._Code(expr._items.reduce((items, c) => {
          if (c instanceof code_1.Name)
            c = replaceName(c);
          if (c instanceof code_1._Code)
            items.push(...c._items);
          else
            items.push(c);
          return items;
        }, []));
        function replaceName(n) {
          const c = constants[n.str];
          if (c === void 0 || names[n.str] !== 1)
            return n;
          delete names[n.str];
          return c;
        }
        function canOptimize(e) {
          return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
        }
      }
      function subtractNames(names, from) {
        for (const n in from)
          names[n] = (names[n] || 0) - (from[n] || 0);
      }
      function not(x) {
        return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
      }
      exports.not = not;
      var andCode = mappend(exports.operators.AND);
      function and(...args) {
        return args.reduce(andCode);
      }
      exports.and = and;
      var orCode = mappend(exports.operators.OR);
      function or(...args) {
        return args.reduce(orCode);
      }
      exports.or = or;
      function mappend(op) {
        return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
      }
      function par(x) {
        return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/util.js
  var require_util = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/util.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
      var codegen_1 = require_codegen();
      var code_1 = require_code();
      function toHash(arr) {
        const hash = {};
        for (const item of arr)
          hash[item] = true;
        return hash;
      }
      exports.toHash = toHash;
      function alwaysValidSchema(it, schema) {
        if (typeof schema == "boolean")
          return schema;
        if (Object.keys(schema).length === 0)
          return true;
        checkUnknownRules(it, schema);
        return !schemaHasRules(schema, it.self.RULES.all);
      }
      exports.alwaysValidSchema = alwaysValidSchema;
      function checkUnknownRules(it, schema = it.schema) {
        const { opts, self } = it;
        if (!opts.strictSchema)
          return;
        if (typeof schema === "boolean")
          return;
        const rules = self.RULES.keywords;
        for (const key in schema) {
          if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
        }
      }
      exports.checkUnknownRules = checkUnknownRules;
      function schemaHasRules(schema, rules) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (rules[key])
            return true;
        return false;
      }
      exports.schemaHasRules = schemaHasRules;
      function schemaHasRulesButRef(schema, RULES) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (key !== "$ref" && RULES.all[key])
            return true;
        return false;
      }
      exports.schemaHasRulesButRef = schemaHasRulesButRef;
      function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
        if (!$data) {
          if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
          if (typeof schema == "string")
            return (0, codegen_1._)`${schema}`;
        }
        return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
      }
      exports.schemaRefOrVal = schemaRefOrVal;
      function unescapeFragment(str) {
        return unescapeJsonPointer(decodeURIComponent(str));
      }
      exports.unescapeFragment = unescapeFragment;
      function escapeFragment(str) {
        return encodeURIComponent(escapeJsonPointer(str));
      }
      exports.escapeFragment = escapeFragment;
      function escapeJsonPointer(str) {
        if (typeof str == "number")
          return `${str}`;
        return str.replace(/~/g, "~0").replace(/\//g, "~1");
      }
      exports.escapeJsonPointer = escapeJsonPointer;
      function unescapeJsonPointer(str) {
        return str.replace(/~1/g, "/").replace(/~0/g, "~");
      }
      exports.unescapeJsonPointer = unescapeJsonPointer;
      function eachItem(xs, f) {
        if (Array.isArray(xs)) {
          for (const x of xs)
            f(x);
        } else {
          f(xs);
        }
      }
      exports.eachItem = eachItem;
      function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
        return (gen, from, to, toName) => {
          const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
          return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
        };
      }
      exports.mergeEvaluated = {
        props: makeMergeEvaluated({
          mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
          }),
          mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
            if (from === true) {
              gen.assign(to, true);
            } else {
              gen.assign(to, (0, codegen_1._)`${to} || {}`);
              setEvaluated(gen, to, from);
            }
          }),
          mergeValues: (from, to) => from === true ? true : { ...from, ...to },
          resultToName: evaluatedPropsToName
        }),
        items: makeMergeEvaluated({
          mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
          mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
          mergeValues: (from, to) => from === true ? true : Math.max(from, to),
          resultToName: (gen, items) => gen.var("items", items)
        })
      };
      function evaluatedPropsToName(gen, ps) {
        if (ps === true)
          return gen.var("props", true);
        const props = gen.var("props", (0, codegen_1._)`{}`);
        if (ps !== void 0)
          setEvaluated(gen, props, ps);
        return props;
      }
      exports.evaluatedPropsToName = evaluatedPropsToName;
      function setEvaluated(gen, props, ps) {
        Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
      }
      exports.setEvaluated = setEvaluated;
      var snippets = {};
      function useFunc(gen, f) {
        return gen.scopeValue("func", {
          ref: f,
          code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
        });
      }
      exports.useFunc = useFunc;
      var Type;
      (function(Type2) {
        Type2[Type2["Num"] = 0] = "Num";
        Type2[Type2["Str"] = 1] = "Str";
      })(Type || (exports.Type = Type = {}));
      function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
        if (dataProp instanceof codegen_1.Name) {
          const isNumber = dataPropType === Type.Num;
          return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
        }
        return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
      }
      exports.getErrorPath = getErrorPath;
      function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
        if (!mode)
          return;
        msg = `strict mode: ${msg}`;
        if (mode === true)
          throw new Error(msg);
        it.self.logger.warn(msg);
      }
      exports.checkStrictMode = checkStrictMode;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/names.js
  var require_names = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/names.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var names = {
        // validation function arguments
        data: new codegen_1.Name("data"),
        // data passed to validation function
        // args passed from referencing schema
        valCxt: new codegen_1.Name("valCxt"),
        // validation/data context - should not be used directly, it is destructured to the names below
        instancePath: new codegen_1.Name("instancePath"),
        parentData: new codegen_1.Name("parentData"),
        parentDataProperty: new codegen_1.Name("parentDataProperty"),
        rootData: new codegen_1.Name("rootData"),
        // root data - same as the data passed to the first/top validation function
        dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
        // used to support recursiveRef and dynamicRef
        // function scoped variables
        vErrors: new codegen_1.Name("vErrors"),
        // null or array of validation errors
        errors: new codegen_1.Name("errors"),
        // counter of validation errors
        this: new codegen_1.Name("this"),
        // "globals"
        self: new codegen_1.Name("self"),
        scope: new codegen_1.Name("scope"),
        // JTD serialize/parse name for JSON string and position
        json: new codegen_1.Name("json"),
        jsonPos: new codegen_1.Name("jsonPos"),
        jsonLen: new codegen_1.Name("jsonLen"),
        jsonPart: new codegen_1.Name("jsonPart")
      };
      exports.default = names;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js
  var require_errors = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var names_1 = require_names();
      exports.keywordError = {
        message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
      };
      exports.keyword$DataError = {
        message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
      };
      function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
          addError(gen, errObj);
        } else {
          returnErrors(it, (0, codegen_1._)`[${errObj}]`);
        }
      }
      exports.reportError = reportError;
      function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        addError(gen, errObj);
        if (!(compositeRule || allErrors)) {
          returnErrors(it, names_1.default.vErrors);
        }
      }
      exports.reportExtraError = reportExtraError;
      function resetErrorsCount(gen, errsCount) {
        gen.assign(names_1.default.errors, errsCount);
        gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
      }
      exports.resetErrorsCount = resetErrorsCount;
      function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
        if (errsCount === void 0)
          throw new Error("ajv implementation error");
        const err = gen.name("err");
        gen.forRange("i", errsCount, names_1.default.errors, (i) => {
          gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
          gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
          gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
          if (it.opts.verbose) {
            gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._)`${err}.data`, data);
          }
        });
      }
      exports.extendErrors = extendErrors;
      function addError(gen, errObj) {
        const err = gen.const("err", errObj);
        gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
        gen.code((0, codegen_1._)`${names_1.default.errors}++`);
      }
      function returnErrors(it, errs) {
        const { gen, validateName, schemaEnv } = it;
        if (schemaEnv.$async) {
          gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
          gen.return(false);
        }
      }
      var E = {
        keyword: new codegen_1.Name("keyword"),
        schemaPath: new codegen_1.Name("schemaPath"),
        // also used in JTD errors
        params: new codegen_1.Name("params"),
        propertyName: new codegen_1.Name("propertyName"),
        message: new codegen_1.Name("message"),
        schema: new codegen_1.Name("schema"),
        parentSchema: new codegen_1.Name("parentSchema")
      };
      function errorObjectCode(cxt, error, errorPaths) {
        const { createErrors } = cxt.it;
        if (createErrors === false)
          return (0, codegen_1._)`{}`;
        return errorObject(cxt, error, errorPaths);
      }
      function errorObject(cxt, error, errorPaths = {}) {
        const { gen, it } = cxt;
        const keyValues = [
          errorInstancePath(it, errorPaths),
          errorSchemaPath(cxt, errorPaths)
        ];
        extraErrorProps(cxt, error, keyValues);
        return gen.object(...keyValues);
      }
      function errorInstancePath({ errorPath }, { instancePath }) {
        const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
        return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
      }
      function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
        let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
        if (schemaPath) {
          schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
        }
        return [E.schemaPath, schPath];
      }
      function extraErrorProps(cxt, { params, message }, keyValues) {
        const { keyword, data, schemaValue, it } = cxt;
        const { opts, propertyName, topSchemaRef, schemaPath } = it;
        keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
        if (opts.messages) {
          keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
        }
        if (opts.verbose) {
          keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
        }
        if (propertyName)
          keyValues.push([E.propertyName, propertyName]);
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/boolSchema.js
  var require_boolSchema = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
      var errors_1 = require_errors();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var boolError = {
        message: "boolean schema is false"
      };
      function topBoolOrEmptySchema(it) {
        const { gen, schema, validateName } = it;
        if (schema === false) {
          falseSchemaError(it, false);
        } else if (typeof schema == "object" && schema.$async === true) {
          gen.return(names_1.default.data);
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, null);
          gen.return(true);
        }
      }
      exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
      function boolOrEmptySchema(it, valid) {
        const { gen, schema } = it;
        if (schema === false) {
          gen.var(valid, false);
          falseSchemaError(it);
        } else {
          gen.var(valid, true);
        }
      }
      exports.boolOrEmptySchema = boolOrEmptySchema;
      function falseSchemaError(it, overrideAllErrors) {
        const { gen, data } = it;
        const cxt = {
          gen,
          keyword: "false schema",
          data,
          schema: false,
          schemaCode: false,
          schemaValue: false,
          params: {},
          it
        };
        (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/rules.js
  var require_rules = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/rules.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRules = exports.isJSONType = void 0;
      var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
      var jsonTypes = new Set(_jsonTypes);
      function isJSONType(x) {
        return typeof x == "string" && jsonTypes.has(x);
      }
      exports.isJSONType = isJSONType;
      function getRules() {
        const groups = {
          number: { type: "number", rules: [] },
          string: { type: "string", rules: [] },
          array: { type: "array", rules: [] },
          object: { type: "object", rules: [] }
        };
        return {
          types: { ...groups, integer: true, boolean: true, null: true },
          rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
          post: { rules: [] },
          all: {},
          keywords: {}
        };
      }
      exports.getRules = getRules;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js
  var require_applicability = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
      function schemaHasRulesForType({ schema, self }, type) {
        const group = self.RULES.types[type];
        return group && group !== true && shouldUseGroup(schema, group);
      }
      exports.schemaHasRulesForType = schemaHasRulesForType;
      function shouldUseGroup(schema, group) {
        return group.rules.some((rule) => shouldUseRule(schema, rule));
      }
      exports.shouldUseGroup = shouldUseGroup;
      function shouldUseRule(schema, rule) {
        var _a;
        return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
      }
      exports.shouldUseRule = shouldUseRule;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js
  var require_dataType = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
      var rules_1 = require_rules();
      var applicability_1 = require_applicability();
      var errors_1 = require_errors();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var DataType;
      (function(DataType2) {
        DataType2[DataType2["Correct"] = 0] = "Correct";
        DataType2[DataType2["Wrong"] = 1] = "Wrong";
      })(DataType || (exports.DataType = DataType = {}));
      function getSchemaTypes(schema) {
        const types = getJSONTypes(schema.type);
        const hasNull = types.includes("null");
        if (hasNull) {
          if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
        } else {
          if (!types.length && schema.nullable !== void 0) {
            throw new Error('"nullable" cannot be used without "type"');
          }
          if (schema.nullable === true)
            types.push("null");
        }
        return types;
      }
      exports.getSchemaTypes = getSchemaTypes;
      function getJSONTypes(ts) {
        const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
        if (types.every(rules_1.isJSONType))
          return types;
        throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
      }
      exports.getJSONTypes = getJSONTypes;
      function coerceAndCheckDataType(it, types) {
        const { gen, data, opts } = it;
        const coerceTo = coerceToTypes(types, opts.coerceTypes);
        const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
        if (checkTypes) {
          const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
          gen.if(wrongType, () => {
            if (coerceTo.length)
              coerceData(it, types, coerceTo);
            else
              reportTypeError(it);
          });
        }
        return checkTypes;
      }
      exports.coerceAndCheckDataType = coerceAndCheckDataType;
      var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
      function coerceToTypes(types, coerceTypes) {
        return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
      }
      function coerceData(it, types, coerceTo) {
        const { gen, data, opts } = it;
        const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
        const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
        if (opts.coerceTypes === "array") {
          gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
        }
        gen.if((0, codegen_1._)`${coerced} !== undefined`);
        for (const t of coerceTo) {
          if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
            coerceSpecificType(t);
          }
        }
        gen.else();
        reportTypeError(it);
        gen.endIf();
        gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
          gen.assign(data, coerced);
          assignParentData(it, coerced);
        });
        function coerceSpecificType(t) {
          switch (t) {
            case "string":
              gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
              return;
            case "number":
              gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
              return;
            case "integer":
              gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
              return;
            case "boolean":
              gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
              return;
            case "null":
              gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
              gen.assign(coerced, null);
              return;
            case "array":
              gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
          }
        }
      }
      function assignParentData({ gen, parentData, parentDataProperty }, expr) {
        gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
      }
      function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
        const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
        let cond;
        switch (dataType) {
          case "null":
            return (0, codegen_1._)`${data} ${EQ} null`;
          case "array":
            cond = (0, codegen_1._)`Array.isArray(${data})`;
            break;
          case "object":
            cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
          case "integer":
            cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
            break;
          case "number":
            cond = numCond();
            break;
          default:
            return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
        }
        return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
        function numCond(_cond = codegen_1.nil) {
          return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
        }
      }
      exports.checkDataType = checkDataType;
      function checkDataTypes(dataTypes, data, strictNums, correct) {
        if (dataTypes.length === 1) {
          return checkDataType(dataTypes[0], data, strictNums, correct);
        }
        let cond;
        const types = (0, util_1.toHash)(dataTypes);
        if (types.array && types.object) {
          const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
          cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
          delete types.null;
          delete types.array;
          delete types.object;
        } else {
          cond = codegen_1.nil;
        }
        if (types.number)
          delete types.integer;
        for (const t in types)
          cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
        return cond;
      }
      exports.checkDataTypes = checkDataTypes;
      var typeError = {
        message: ({ schema }) => `must be ${schema}`,
        params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
      };
      function reportTypeError(it) {
        const cxt = getTypeErrorContext(it);
        (0, errors_1.reportError)(cxt, typeError);
      }
      exports.reportTypeError = reportTypeError;
      function getTypeErrorContext(it) {
        const { gen, data, schema } = it;
        const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
        return {
          gen,
          keyword: "type",
          data,
          schema: schema.type,
          schemaCode,
          schemaValue: schemaCode,
          parentSchema: schema,
          params: {},
          it
        };
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/defaults.js
  var require_defaults = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.assignDefaults = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      function assignDefaults(it, ty) {
        const { properties, items } = it.schema;
        if (ty === "object" && properties) {
          for (const key in properties) {
            assignDefault(it, key, properties[key].default);
          }
        } else if (ty === "array" && Array.isArray(items)) {
          items.forEach((sch, i) => assignDefault(it, i, sch.default));
        }
      }
      exports.assignDefaults = assignDefaults;
      function assignDefault(it, prop, defaultValue) {
        const { gen, compositeRule, data, opts } = it;
        if (defaultValue === void 0)
          return;
        const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
        if (compositeRule) {
          (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
          return;
        }
        let condition = (0, codegen_1._)`${childData} === undefined`;
        if (opts.useDefaults === "empty") {
          condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
        }
        gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/code.js
  var require_code2 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/code.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var names_1 = require_names();
      var util_2 = require_util();
      function checkReportMissingProp(cxt, prop) {
        const { gen, data, it } = cxt;
        gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
          cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
          cxt.error();
        });
      }
      exports.checkReportMissingProp = checkReportMissingProp;
      function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
        return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
      }
      exports.checkMissingProp = checkMissingProp;
      function reportMissingProp(cxt, missing) {
        cxt.setParams({ missingProperty: missing }, true);
        cxt.error();
      }
      exports.reportMissingProp = reportMissingProp;
      function hasPropFunc(gen) {
        return gen.scopeValue("func", {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          ref: Object.prototype.hasOwnProperty,
          code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
        });
      }
      exports.hasPropFunc = hasPropFunc;
      function isOwnProperty(gen, data, property) {
        return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
      }
      exports.isOwnProperty = isOwnProperty;
      function propertyInData(gen, data, property, ownProperties) {
        const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
        return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
      }
      exports.propertyInData = propertyInData;
      function noPropertyInData(gen, data, property, ownProperties) {
        const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
        return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
      }
      exports.noPropertyInData = noPropertyInData;
      function allSchemaProperties(schemaMap) {
        return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
      }
      exports.allSchemaProperties = allSchemaProperties;
      function schemaProperties(it, schemaMap) {
        return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
      }
      exports.schemaProperties = schemaProperties;
      function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
        const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
        const valCxt = [
          [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
          [names_1.default.parentData, it.parentData],
          [names_1.default.parentDataProperty, it.parentDataProperty],
          [names_1.default.rootData, names_1.default.rootData]
        ];
        if (it.opts.dynamicRef)
          valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
        const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
        return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
      }
      exports.callValidateCode = callValidateCode;
      var newRegExp = (0, codegen_1._)`new RegExp`;
      function usePattern({ gen, it: { opts } }, pattern) {
        const u = opts.unicodeRegExp ? "u" : "";
        const { regExp } = opts.code;
        const rx = regExp(pattern, u);
        return gen.scopeValue("pattern", {
          key: rx.toString(),
          ref: rx,
          code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
        });
      }
      exports.usePattern = usePattern;
      function validateArray(cxt) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        if (it.allErrors) {
          const validArr = gen.let("valid", true);
          validateItems(() => gen.assign(validArr, false));
          return validArr;
        }
        gen.var(valid, true);
        validateItems(() => gen.break());
        return valid;
        function validateItems(notValid) {
          const len = gen.const("len", (0, codegen_1._)`${data}.length`);
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword,
              dataProp: i,
              dataPropType: util_1.Type.Num
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
          });
        }
      }
      exports.validateArray = validateArray;
      function validateUnion(cxt) {
        const { gen, schema, keyword, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
        if (alwaysValid && !it.opts.unevaluated)
          return;
        const valid = gen.let("valid", false);
        const schValid = gen.name("_valid");
        gen.block(() => schema.forEach((_sch, i) => {
          const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true
          }, schValid);
          gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
          const merged = cxt.mergeValidEvaluated(schCxt, schValid);
          if (!merged)
            gen.if((0, codegen_1.not)(valid));
        }));
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
      }
      exports.validateUnion = validateUnion;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js
  var require_keyword = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var code_1 = require_code2();
      var errors_1 = require_errors();
      function macroKeywordCode(cxt, def) {
        const { gen, keyword, schema, parentSchema, it } = cxt;
        const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
        const schemaRef = useKeyword(gen, keyword, macroSchema);
        if (it.opts.validateSchema !== false)
          it.self.validateSchema(macroSchema, true);
        const valid = gen.name("valid");
        cxt.subschema({
          schema: macroSchema,
          schemaPath: codegen_1.nil,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`,
          topSchemaRef: schemaRef,
          compositeRule: true
        }, valid);
        cxt.pass(valid, () => cxt.error(true));
      }
      exports.macroKeywordCode = macroKeywordCode;
      function funcKeywordCode(cxt, def) {
        var _a;
        const { gen, keyword, schema, parentSchema, $data, it } = cxt;
        checkAsyncKeyword(it, def);
        const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
        const validateRef = useKeyword(gen, keyword, validate);
        const valid = gen.let("valid");
        cxt.block$data(valid, validateKeyword);
        cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
        function validateKeyword() {
          if (def.errors === false) {
            assignValid();
            if (def.modifying)
              modifyData(cxt);
            reportErrs(() => cxt.error());
          } else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
              modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
          }
        }
        function validateAsync() {
          const ruleErrs = gen.let("ruleErrs", null);
          gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
          return ruleErrs;
        }
        function validateSync() {
          const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
          gen.assign(validateErrs, null);
          assignValid(codegen_1.nil);
          return validateErrs;
        }
        function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
          const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
          const passSchema = !("compile" in def && !$data || def.schema === false);
          gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
        }
        function reportErrs(errors) {
          var _a2;
          gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
        }
      }
      exports.funcKeywordCode = funcKeywordCode;
      function modifyData(cxt) {
        const { gen, data, it } = cxt;
        gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
      }
      function addErrs(cxt, errs) {
        const { gen } = cxt;
        gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
          gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
          (0, errors_1.extendErrors)(cxt);
        }, () => cxt.error());
      }
      function checkAsyncKeyword({ schemaEnv }, def) {
        if (def.async && !schemaEnv.$async)
          throw new Error("async keyword in sync schema");
      }
      function useKeyword(gen, keyword, result) {
        if (result === void 0)
          throw new Error(`keyword "${keyword}" failed to compile`);
        return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
      }
      function validSchemaType(schema, schemaType, allowUndefined = false) {
        return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
      }
      exports.validSchemaType = validSchemaType;
      function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
        if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
          throw new Error("ajv implementation error");
        }
        const deps = def.dependencies;
        if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
          throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
        }
        if (def.validateSchema) {
          const valid = def.validateSchema(schema[keyword]);
          if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
              self.logger.error(msg);
            else
              throw new Error(msg);
          }
        }
      }
      exports.validateKeywordUsage = validateKeywordUsage;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js
  var require_subschema = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
        if (keyword !== void 0 && schema !== void 0) {
          throw new Error('both "keyword" and "schema" passed, only one allowed');
        }
        if (keyword !== void 0) {
          const sch = it.schema[keyword];
          return schemaProp === void 0 ? {
            schema: sch,
            schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
            errSchemaPath: `${it.errSchemaPath}/${keyword}`
          } : {
            schema: sch[schemaProp],
            schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
            errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
          };
        }
        if (schema !== void 0) {
          if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
          }
          return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath
          };
        }
        throw new Error('either "keyword" or "schema" must be passed');
      }
      exports.getSubschema = getSubschema;
      function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
        if (data !== void 0 && dataProp !== void 0) {
          throw new Error('both "data" and "dataProp" passed, only one allowed');
        }
        const { gen } = it;
        if (dataProp !== void 0) {
          const { errorPath, dataPathArr, opts } = it;
          const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
          dataContextProps(nextData);
          subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
          subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
          subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
        }
        if (data !== void 0) {
          const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
          dataContextProps(nextData);
          if (propertyName !== void 0)
            subschema.propertyName = propertyName;
        }
        if (dataTypes)
          subschema.dataTypes = dataTypes;
        function dataContextProps(_nextData) {
          subschema.data = _nextData;
          subschema.dataLevel = it.dataLevel + 1;
          subschema.dataTypes = [];
          it.definedProperties = /* @__PURE__ */ new Set();
          subschema.parentData = it.data;
          subschema.dataNames = [...it.dataNames, _nextData];
        }
      }
      exports.extendSubschemaData = extendSubschemaData;
      function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
        if (compositeRule !== void 0)
          subschema.compositeRule = compositeRule;
        if (createErrors !== void 0)
          subschema.createErrors = createErrors;
        if (allErrors !== void 0)
          subschema.allErrors = allErrors;
        subschema.jtdDiscriminator = jtdDiscriminator;
        subschema.jtdMetadata = jtdMetadata;
      }
      exports.extendSubschemaMode = extendSubschemaMode;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
  var require_fast_deep_equal = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      module.exports = function equal(a, b) {
        if (a === b) return true;
        if (a && b && typeof a == "object" && typeof b == "object") {
          if (a.constructor !== b.constructor) return false;
          var length, i, keys;
          if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0; )
              if (!equal(a[i], b[i])) return false;
            return true;
          }
          if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
          if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
          if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
          keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0; ) {
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
          }
          return true;
        }
        return a !== a && b !== b;
      };
    }
  });

  // .codex-work/cache/pnpm-virtual-store/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js
  var require_json_schema_traverse = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      var traverse = module.exports = function(schema, opts, cb) {
        if (typeof opts == "function") {
          cb = opts;
          opts = {};
        }
        cb = opts.cb || cb;
        var pre = typeof cb == "function" ? cb : cb.pre || function() {
        };
        var post = cb.post || function() {
        };
        _traverse(opts, pre, post, schema, "", schema);
      };
      traverse.keywords = {
        additionalItems: true,
        items: true,
        contains: true,
        additionalProperties: true,
        propertyNames: true,
        not: true,
        if: true,
        then: true,
        else: true
      };
      traverse.arrayKeywords = {
        items: true,
        allOf: true,
        anyOf: true,
        oneOf: true
      };
      traverse.propsKeywords = {
        $defs: true,
        definitions: true,
        properties: true,
        patternProperties: true,
        dependencies: true
      };
      traverse.skipKeywords = {
        default: true,
        enum: true,
        const: true,
        required: true,
        maximum: true,
        minimum: true,
        exclusiveMaximum: true,
        exclusiveMinimum: true,
        multipleOf: true,
        maxLength: true,
        minLength: true,
        pattern: true,
        format: true,
        maxItems: true,
        minItems: true,
        uniqueItems: true,
        maxProperties: true,
        minProperties: true
      };
      function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
        if (schema && typeof schema == "object" && !Array.isArray(schema)) {
          pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
          for (var key in schema) {
            var sch = schema[key];
            if (Array.isArray(sch)) {
              if (key in traverse.arrayKeywords) {
                for (var i = 0; i < sch.length; i++)
                  _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
              }
            } else if (key in traverse.propsKeywords) {
              if (sch && typeof sch == "object") {
                for (var prop in sch)
                  _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
              }
            } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
              _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
            }
          }
          post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        }
      }
      function escapeJsonPtr(str) {
        return str.replace(/~/g, "~0").replace(/\//g, "~1");
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/resolve.js
  var require_resolve = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/resolve.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
      var util_1 = require_util();
      var equal = require_fast_deep_equal();
      var traverse = require_json_schema_traverse();
      var SIMPLE_INLINED = /* @__PURE__ */ new Set([
        "type",
        "format",
        "pattern",
        "maxLength",
        "minLength",
        "maxProperties",
        "minProperties",
        "maxItems",
        "minItems",
        "maximum",
        "minimum",
        "uniqueItems",
        "multipleOf",
        "required",
        "enum",
        "const"
      ]);
      function inlineRef(schema, limit = true) {
        if (typeof schema == "boolean")
          return true;
        if (limit === true)
          return !hasRef(schema);
        if (!limit)
          return false;
        return countKeys(schema) <= limit;
      }
      exports.inlineRef = inlineRef;
      var REF_KEYWORDS = /* @__PURE__ */ new Set([
        "$ref",
        "$recursiveRef",
        "$recursiveAnchor",
        "$dynamicRef",
        "$dynamicAnchor"
      ]);
      function hasRef(schema) {
        for (const key in schema) {
          if (REF_KEYWORDS.has(key))
            return true;
          const sch = schema[key];
          if (Array.isArray(sch) && sch.some(hasRef))
            return true;
          if (typeof sch == "object" && hasRef(sch))
            return true;
        }
        return false;
      }
      function countKeys(schema) {
        let count = 0;
        for (const key in schema) {
          if (key === "$ref")
            return Infinity;
          count++;
          if (SIMPLE_INLINED.has(key))
            continue;
          if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
          }
          if (count === Infinity)
            return Infinity;
        }
        return count;
      }
      function getFullPath(resolver, id = "", normalize) {
        if (normalize !== false)
          id = normalizeId(id);
        const p = resolver.parse(id);
        return _getFullPath(resolver, p);
      }
      exports.getFullPath = getFullPath;
      function _getFullPath(resolver, p) {
        const serialized = resolver.serialize(p);
        return serialized.split("#")[0] + "#";
      }
      exports._getFullPath = _getFullPath;
      var TRAILING_SLASH_HASH = /#\/?$/;
      function normalizeId(id) {
        return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
      }
      exports.normalizeId = normalizeId;
      function resolveUrl(resolver, baseId, id) {
        id = normalizeId(id);
        return resolver.resolve(baseId, id);
      }
      exports.resolveUrl = resolveUrl;
      var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
      function getSchemaRefs(schema, baseId) {
        if (typeof schema == "boolean")
          return {};
        const { schemaId, uriResolver } = this.opts;
        const schId = normalizeId(schema[schemaId] || baseId);
        const baseIds = { "": schId };
        const pathPrefix = getFullPath(uriResolver, schId, false);
        const localRefs = {};
        const schemaRefs = /* @__PURE__ */ new Set();
        traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
          if (parentJsonPtr === void 0)
            return;
          const fullPath = pathPrefix + jsonPtr;
          let innerBaseId = baseIds[parentJsonPtr];
          if (typeof sch[schemaId] == "string")
            innerBaseId = addRef.call(this, sch[schemaId]);
          addAnchor.call(this, sch.$anchor);
          addAnchor.call(this, sch.$dynamicAnchor);
          baseIds[jsonPtr] = innerBaseId;
          function addRef(ref) {
            const _resolve = this.opts.uriResolver.resolve;
            ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
            if (schemaRefs.has(ref))
              throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
              schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
              checkAmbiguosRef(sch, schOrRef.schema, ref);
            } else if (ref !== normalizeId(fullPath)) {
              if (ref[0] === "#") {
                checkAmbiguosRef(sch, localRefs[ref], ref);
                localRefs[ref] = sch;
              } else {
                this.refs[ref] = fullPath;
              }
            }
            return ref;
          }
          function addAnchor(anchor) {
            if (typeof anchor == "string") {
              if (!ANCHOR.test(anchor))
                throw new Error(`invalid anchor "${anchor}"`);
              addRef.call(this, `#${anchor}`);
            }
          }
        });
        return localRefs;
        function checkAmbiguosRef(sch1, sch2, ref) {
          if (sch2 !== void 0 && !equal(sch1, sch2))
            throw ambiguos(ref);
        }
        function ambiguos(ref) {
          return new Error(`reference "${ref}" resolves to more than one schema`);
        }
      }
      exports.getSchemaRefs = getSchemaRefs;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js
  var require_validate = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
      var boolSchema_1 = require_boolSchema();
      var dataType_1 = require_dataType();
      var applicability_1 = require_applicability();
      var dataType_2 = require_dataType();
      var defaults_1 = require_defaults();
      var keyword_1 = require_keyword();
      var subschema_1 = require_subschema();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var resolve_1 = require_resolve();
      var util_1 = require_util();
      var errors_1 = require_errors();
      function validateFunctionCode(it) {
        if (isSchemaObj(it)) {
          checkKeywords(it);
          if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
          }
        }
        validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
      }
      exports.validateFunctionCode = validateFunctionCode;
      function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
        if (opts.code.es5) {
          gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
          });
        } else {
          gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
        }
      }
      function destructureValCxt(opts) {
        return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
      }
      function destructureValCxtES5(gen, opts) {
        gen.if(names_1.default.valCxt, () => {
          gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
          gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
          gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
          gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
          if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
        }, () => {
          gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
          gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
          gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
          gen.var(names_1.default.rootData, names_1.default.data);
          if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
        });
      }
      function topSchemaObjCode(it) {
        const { schema, opts, gen } = it;
        validateFunction(it, () => {
          if (opts.$comment && schema.$comment)
            commentKeyword(it);
          checkNoDefault(it);
          gen.let(names_1.default.vErrors, null);
          gen.let(names_1.default.errors, 0);
          if (opts.unevaluated)
            resetEvaluated(it);
          typeAndKeywords(it);
          returnResults(it);
        });
        return;
      }
      function resetEvaluated(it) {
        const { gen, validateName } = it;
        it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
        gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
        gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
      }
      function funcSourceUrl(schema, opts) {
        const schId = typeof schema == "object" && schema[opts.schemaId];
        return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
      }
      function subschemaCode(it, valid) {
        if (isSchemaObj(it)) {
          checkKeywords(it);
          if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
          }
        }
        (0, boolSchema_1.boolOrEmptySchema)(it, valid);
      }
      function schemaCxtHasRules({ schema, self }) {
        if (typeof schema == "boolean")
          return !schema;
        for (const key in schema)
          if (self.RULES.all[key])
            return true;
        return false;
      }
      function isSchemaObj(it) {
        return typeof it.schema != "boolean";
      }
      function subSchemaObjCode(it, valid) {
        const { schema, gen, opts } = it;
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        updateContext(it);
        checkAsyncSchema(it);
        const errsCount = gen.const("_errs", names_1.default.errors);
        typeAndKeywords(it, errsCount);
        gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
      }
      function checkKeywords(it) {
        (0, util_1.checkUnknownRules)(it);
        checkRefsAndKeywords(it);
      }
      function typeAndKeywords(it, errsCount) {
        if (it.opts.jtd)
          return schemaKeywords(it, [], false, errsCount);
        const types = (0, dataType_1.getSchemaTypes)(it.schema);
        const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
        schemaKeywords(it, types, !checkedTypes, errsCount);
      }
      function checkRefsAndKeywords(it) {
        const { schema, errSchemaPath, opts, self } = it;
        if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
          self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
        }
      }
      function checkNoDefault(it) {
        const { schema, opts } = it;
        if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
          (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
        }
      }
      function updateContext(it) {
        const schId = it.schema[it.opts.schemaId];
        if (schId)
          it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
      }
      function checkAsyncSchema(it) {
        if (it.schema.$async && !it.schemaEnv.$async)
          throw new Error("async schema in sync schema");
      }
      function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
        const msg = schema.$comment;
        if (opts.$comment === true) {
          gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
        } else if (typeof opts.$comment == "function") {
          const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
          const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
          gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
        }
      }
      function returnResults(it) {
        const { gen, schemaEnv, validateName, ValidationError, opts } = it;
        if (schemaEnv.$async) {
          gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
        } else {
          gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
          if (opts.unevaluated)
            assignEvaluated(it);
          gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
        }
      }
      function assignEvaluated({ gen, evaluated, props, items }) {
        if (props instanceof codegen_1.Name)
          gen.assign((0, codegen_1._)`${evaluated}.props`, props);
        if (items instanceof codegen_1.Name)
          gen.assign((0, codegen_1._)`${evaluated}.items`, items);
      }
      function schemaKeywords(it, types, typeErrors, errsCount) {
        const { gen, schema, data, allErrors, opts, self } = it;
        const { RULES } = self;
        if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
          gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
          return;
        }
        if (!opts.jtd)
          checkStrictTypes(it, types);
        gen.block(() => {
          for (const group of RULES.rules)
            groupKeywords(group);
          groupKeywords(RULES.post);
        });
        function groupKeywords(group) {
          if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
          if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
              gen.else();
              (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
          } else {
            iterateKeywords(it, group);
          }
          if (!allErrors)
            gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
        }
      }
      function iterateKeywords(it, group) {
        const { gen, schema, opts: { useDefaults } } = it;
        if (useDefaults)
          (0, defaults_1.assignDefaults)(it, group.type);
        gen.block(() => {
          for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
              keywordCode(it, rule.keyword, rule.definition, group.type);
            }
          }
        });
      }
      function checkStrictTypes(it, types) {
        if (it.schemaEnv.meta || !it.opts.strictTypes)
          return;
        checkContextTypes(it, types);
        if (!it.opts.allowUnionTypes)
          checkMultipleTypes(it, types);
        checkKeywordTypes(it, it.dataTypes);
      }
      function checkContextTypes(it, types) {
        if (!types.length)
          return;
        if (!it.dataTypes.length) {
          it.dataTypes = types;
          return;
        }
        types.forEach((t) => {
          if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
          }
        });
        narrowSchemaTypes(it, types);
      }
      function checkMultipleTypes(it, ts) {
        if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
          strictTypesError(it, "use allowUnionTypes to allow union type keyword");
        }
      }
      function checkKeywordTypes(it, ts) {
        const rules = it.self.RULES.all;
        for (const keyword in rules) {
          const rule = rules[keyword];
          if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
              strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
          }
        }
      }
      function hasApplicableType(schTs, kwdT) {
        return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
      }
      function includesType(ts, t) {
        return ts.includes(t) || t === "integer" && ts.includes("number");
      }
      function narrowSchemaTypes(it, withTypes) {
        const ts = [];
        for (const t of it.dataTypes) {
          if (includesType(withTypes, t))
            ts.push(t);
          else if (withTypes.includes("integer") && t === "number")
            ts.push("integer");
        }
        it.dataTypes = ts;
      }
      function strictTypesError(it, msg) {
        const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
        msg += ` at "${schemaPath}" (strictTypes)`;
        (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
      }
      var KeywordCxt = class {
        constructor(it, def, keyword) {
          (0, keyword_1.validateKeywordUsage)(it, def, keyword);
          this.gen = it.gen;
          this.allErrors = it.allErrors;
          this.keyword = keyword;
          this.data = it.data;
          this.schema = it.schema[keyword];
          this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
          this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
          this.schemaType = def.schemaType;
          this.parentSchema = it.schema;
          this.params = {};
          this.it = it;
          this.def = def;
          if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
          } else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
              throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
          }
          if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
          }
        }
        result(condition, successAction, failAction) {
          this.failResult((0, codegen_1.not)(condition), successAction, failAction);
        }
        failResult(condition, successAction, failAction) {
          this.gen.if(condition);
          if (failAction)
            failAction();
          else
            this.error();
          if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
              this.gen.endIf();
          } else {
            if (this.allErrors)
              this.gen.endIf();
            else
              this.gen.else();
          }
        }
        pass(condition, failAction) {
          this.failResult((0, codegen_1.not)(condition), void 0, failAction);
        }
        fail(condition) {
          if (condition === void 0) {
            this.error();
            if (!this.allErrors)
              this.gen.if(false);
            return;
          }
          this.gen.if(condition);
          this.error();
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
        fail$data(condition) {
          if (!this.$data)
            return this.fail(condition);
          const { schemaCode } = this;
          this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
        }
        error(append, errorParams, errorPaths) {
          if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
          }
          this._error(append, errorPaths);
        }
        _error(append, errorPaths) {
          ;
          (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
        }
        $dataError() {
          (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
        }
        reset() {
          if (this.errsCount === void 0)
            throw new Error('add "trackErrors" to keyword definition');
          (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
        }
        ok(cond) {
          if (!this.allErrors)
            this.gen.if(cond);
        }
        setParams(obj, assign) {
          if (assign)
            Object.assign(this.params, obj);
          else
            this.params = obj;
        }
        block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
          this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
          });
        }
        check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
          if (!this.$data)
            return;
          const { gen, schemaCode, schemaType, def } = this;
          gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
          if (valid !== codegen_1.nil)
            gen.assign(valid, true);
          if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
              gen.assign(valid, false);
          }
          gen.else();
        }
        invalid$data() {
          const { gen, schemaCode, schemaType, def, it } = this;
          return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
          function wrong$DataType() {
            if (schemaType.length) {
              if (!(schemaCode instanceof codegen_1.Name))
                throw new Error("ajv implementation error");
              const st = Array.isArray(schemaType) ? schemaType : [schemaType];
              return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
          }
          function invalid$DataSchema() {
            if (def.validateSchema) {
              const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
              return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
          }
        }
        subschema(appl, valid) {
          const subschema = (0, subschema_1.getSubschema)(this.it, appl);
          (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
          (0, subschema_1.extendSubschemaMode)(subschema, appl);
          const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
          subschemaCode(nextContext, valid);
          return nextContext;
        }
        mergeEvaluated(schemaCxt, toName) {
          const { it, gen } = this;
          if (!it.opts.unevaluated)
            return;
          if (it.props !== true && schemaCxt.props !== void 0) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
          }
          if (it.items !== true && schemaCxt.items !== void 0) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
          }
        }
        mergeValidEvaluated(schemaCxt, valid) {
          const { it, gen } = this;
          if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
          }
        }
      };
      exports.KeywordCxt = KeywordCxt;
      function keywordCode(it, keyword, def, ruleType) {
        const cxt = new KeywordCxt(it, def, keyword);
        if ("code" in def) {
          def.code(cxt, ruleType);
        } else if (cxt.$data && def.validate) {
          (0, keyword_1.funcKeywordCode)(cxt, def);
        } else if ("macro" in def) {
          (0, keyword_1.macroKeywordCode)(cxt, def);
        } else if (def.compile || def.validate) {
          (0, keyword_1.funcKeywordCode)(cxt, def);
        }
      }
      var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
      var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
      function getData($data, { dataLevel, dataNames, dataPathArr }) {
        let jsonPointer;
        let data;
        if ($data === "")
          return names_1.default.rootData;
        if ($data[0] === "/") {
          if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
          jsonPointer = $data;
          data = names_1.default.rootData;
        } else {
          const matches = RELATIVE_JSON_POINTER.exec($data);
          if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
          const up = +matches[1];
          jsonPointer = matches[2];
          if (jsonPointer === "#") {
            if (up >= dataLevel)
              throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
          }
          if (up > dataLevel)
            throw new Error(errorMsg("data", up));
          data = dataNames[dataLevel - up];
          if (!jsonPointer)
            return data;
        }
        let expr = data;
        const segments = jsonPointer.split("/");
        for (const segment of segments) {
          if (segment) {
            data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._)`${expr} && ${data}`;
          }
        }
        return expr;
        function errorMsg(pointerType, up) {
          return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
        }
      }
      exports.getData = getData;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js
  var require_validation_error = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var ValidationError = class extends Error {
        constructor(errors) {
          super("validation failed");
          this.errors = errors;
          this.ajv = this.validation = true;
        }
      };
      exports.default = ValidationError;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js
  var require_ref_error = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var resolve_1 = require_resolve();
      var MissingRefError = class extends Error {
        constructor(resolver, baseId, ref, msg) {
          super(msg || `can't resolve reference ${ref} from id ${baseId}`);
          this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
          this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
        }
      };
      exports.default = MissingRefError;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/index.js
  var require_compile = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
      var codegen_1 = require_codegen();
      var validation_error_1 = require_validation_error();
      var names_1 = require_names();
      var resolve_1 = require_resolve();
      var util_1 = require_util();
      var validate_1 = require_validate();
      var SchemaEnv = class {
        constructor(env) {
          var _a;
          this.refs = {};
          this.dynamicAnchors = {};
          let schema;
          if (typeof env.schema == "object")
            schema = env.schema;
          this.schema = env.schema;
          this.schemaId = env.schemaId;
          this.root = env.root || this;
          this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
          this.schemaPath = env.schemaPath;
          this.localRefs = env.localRefs;
          this.meta = env.meta;
          this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
          this.refs = {};
        }
      };
      exports.SchemaEnv = SchemaEnv;
      function compileSchema(sch) {
        const _sch = getCompilingSchema.call(this, sch);
        if (_sch)
          return _sch;
        const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
        const { es5, lines } = this.opts.code;
        const { ownProperties } = this.opts;
        const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
        let _ValidationError;
        if (sch.$async) {
          _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
          });
        }
        const validateName = gen.scopeName("validate");
        sch.validateName = validateName;
        const schemaCxt = {
          gen,
          allErrors: this.opts.allErrors,
          data: names_1.default.data,
          parentData: names_1.default.parentData,
          parentDataProperty: names_1.default.parentDataProperty,
          dataNames: [names_1.default.data],
          dataPathArr: [codegen_1.nil],
          // TODO can its length be used as dataLevel if nil is removed?
          dataLevel: 0,
          dataTypes: [],
          definedProperties: /* @__PURE__ */ new Set(),
          topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
          validateName,
          ValidationError: _ValidationError,
          schema: sch.schema,
          schemaEnv: sch,
          rootId,
          baseId: sch.baseId || rootId,
          schemaPath: codegen_1.nil,
          errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
          errorPath: (0, codegen_1._)`""`,
          opts: this.opts,
          self: this
        };
        let sourceCode;
        try {
          this._compilations.add(sch);
          (0, validate_1.validateFunctionCode)(schemaCxt);
          gen.optimize(this.opts.code.optimize);
          const validateCode = gen.toString();
          sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
          if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
          const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
          const validate = makeValidate(this, this.scope.get());
          this.scope.value(validateName, { ref: validate });
          validate.errors = null;
          validate.schema = sch.schema;
          validate.schemaEnv = sch;
          if (sch.$async)
            validate.$async = true;
          if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
          }
          if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
              props: props instanceof codegen_1.Name ? void 0 : props,
              items: items instanceof codegen_1.Name ? void 0 : items,
              dynamicProps: props instanceof codegen_1.Name,
              dynamicItems: items instanceof codegen_1.Name
            };
            if (validate.source)
              validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
          }
          sch.validate = validate;
          return sch;
        } catch (e) {
          delete sch.validate;
          delete sch.validateName;
          if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
          throw e;
        } finally {
          this._compilations.delete(sch);
        }
      }
      exports.compileSchema = compileSchema;
      function resolveRef(root, baseId, ref) {
        var _a;
        ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
        const schOrFunc = root.refs[ref];
        if (schOrFunc)
          return schOrFunc;
        let _sch = resolve.call(this, root, ref);
        if (_sch === void 0) {
          const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
          const { schemaId } = this.opts;
          if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
        }
        if (_sch === void 0)
          return;
        return root.refs[ref] = inlineOrCompile.call(this, _sch);
      }
      exports.resolveRef = resolveRef;
      function inlineOrCompile(sch) {
        if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
          return sch.schema;
        return sch.validate ? sch : compileSchema.call(this, sch);
      }
      function getCompilingSchema(schEnv) {
        for (const sch of this._compilations) {
          if (sameSchemaEnv(sch, schEnv))
            return sch;
        }
      }
      exports.getCompilingSchema = getCompilingSchema;
      function sameSchemaEnv(s1, s2) {
        return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
      }
      function resolve(root, ref) {
        let sch;
        while (typeof (sch = this.refs[ref]) == "string")
          ref = sch;
        return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
      }
      function resolveSchema(root, ref) {
        const p = this.opts.uriResolver.parse(ref);
        const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
        let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
        if (Object.keys(root.schema).length > 0 && refPath === baseId) {
          return getJsonPointer.call(this, p, root);
        }
        const id = (0, resolve_1.normalizeId)(refPath);
        const schOrRef = this.refs[id] || this.schemas[id];
        if (typeof schOrRef == "string") {
          const sch = resolveSchema.call(this, root, schOrRef);
          if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
          return getJsonPointer.call(this, p, sch);
        }
        if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
          return;
        if (!schOrRef.validate)
          compileSchema.call(this, schOrRef);
        if (id === (0, resolve_1.normalizeId)(ref)) {
          const { schema } = schOrRef;
          const { schemaId } = this.opts;
          const schId = schema[schemaId];
          if (schId)
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
          return new SchemaEnv({ schema, schemaId, root, baseId });
        }
        return getJsonPointer.call(this, p, schOrRef);
      }
      exports.resolveSchema = resolveSchema;
      var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
        "properties",
        "patternProperties",
        "enum",
        "dependencies",
        "definitions"
      ]);
      function getJsonPointer(parsedRef, { baseId, schema, root }) {
        var _a;
        if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
          return;
        for (const part of parsedRef.fragment.slice(1).split("/")) {
          if (typeof schema === "boolean")
            return;
          const partSchema = schema[(0, util_1.unescapeFragment)(part)];
          if (partSchema === void 0)
            return;
          schema = partSchema;
          const schId = typeof schema === "object" && schema[this.opts.schemaId];
          if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
          }
        }
        let env;
        if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
          const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
          env = resolveSchema.call(this, root, $ref);
        }
        const { schemaId } = this.opts;
        env = env || new SchemaEnv({ schema, schemaId, root, baseId });
        if (env.schema !== env.root.schema)
          return env;
        return void 0;
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/data.json
  var require_data = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/data.json"(exports, module) {
      module.exports = {
        $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
        description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
        type: "object",
        required: ["$data"],
        properties: {
          $data: {
            type: "string",
            anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
          }
        },
        additionalProperties: false
      };
    }
  });

  // .codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/utils.js
  var require_utils = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/utils.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
      var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
      var isPort = RegExp.prototype.test.bind(/^\d*$/u);
      var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
      var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
      var isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u);
      var isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u);
      var isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u);
      var BYTE_HEX = new Array(256);
      {
        const HEX_DIGITS = "0123456789ABCDEF";
        for (let i = 0; i < 256; i++) {
          BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
        }
      }
      function percentEncodeNonAscii(cp) {
        if (cp < 2048) {
          return BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63];
        }
        if (cp < 65536) {
          return BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
        }
        return BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
      }
      function stringArrayToHexStripped(input) {
        let acc = "";
        let code = 0;
        let i = 0;
        for (i = 0; i < input.length; i++) {
          code = input[i].charCodeAt(0);
          if (code === 48) {
            continue;
          }
          if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return "";
          }
          acc += input[i];
          break;
        }
        for (i += 1; i < input.length; i++) {
          code = input[i].charCodeAt(0);
          if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
            return "";
          }
          acc += input[i];
        }
        return acc;
      }
      var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/);
      var isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/);
      var isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/);
      var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
      function isZoneIdentifier(zone) {
        if (zone.length === 0) return false;
        for (let i = 0; i < zone.length; i++) {
          if (isZoneCharacter(zone[i])) continue;
          if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
            i += 2;
            continue;
          }
          return false;
        }
        return true;
      }
      function compressIPv6ZeroRun(hextets) {
        let bestStart = -1;
        let bestLength = 0;
        let runStart = -1;
        let runLength = 0;
        for (let i = 0; i < hextets.length; i++) {
          if (hextets[i] === "0") {
            if (runStart === -1) runStart = i;
            runLength++;
            if (runLength > bestLength) {
              bestLength = runLength;
              bestStart = runStart;
            }
          } else {
            runStart = -1;
            runLength = 0;
          }
        }
        if (bestLength < 2) return hextets.join(":");
        const head = hextets.slice(0, bestStart).join(":");
        const tail = hextets.slice(bestStart + bestLength).join(":");
        return head + "::" + tail;
      }
      function normalizeIPv6Address(input) {
        const compression = input.indexOf("::");
        if (compression !== -1 && input.indexOf("::", compression + 1) !== -1) return void 0;
        const left = compression === -1 ? input.split(":") : input.slice(0, compression).split(":");
        const right = compression === -1 ? [] : input.slice(compression + 2).split(":");
        if (compression !== -1) {
          if (left.length === 1 && left[0] === "") left.length = 0;
          if (right.length === 1 && right[0] === "") right.length = 0;
        }
        const parts = left.concat(right);
        let hextetCount = 0;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (part === "") return void 0;
          if (part.indexOf(".") !== -1) {
            if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return void 0;
            hextetCount += 2;
            continue;
          }
          if (!isHextet(part)) return void 0;
          parts[i] = parseInt(part, 16).toString(16);
          hextetCount++;
        }
        if (compression === -1) {
          if (hextetCount !== 8) return void 0;
          return compressIPv6ZeroRun(parts);
        }
        if (hextetCount >= 8) return void 0;
        const expanded = parts.slice(0, left.length);
        for (let i = hextetCount; i < 8; i++) expanded.push("0");
        for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
        return compressIPv6ZeroRun(expanded);
      }
      function normalizeIPv6(host) {
        const bracketed = host[0] === "[" && host[host.length - 1] === "]";
        const hasBracket = host[0] === "[" || host[host.length - 1] === "]";
        if (hasBracket && !bracketed) return { host, isIPV6: false, error: true };
        let input = bracketed ? host.slice(1, -1) : host;
        if (bracketed && isIPvFuture(input)) {
          input = input.toLowerCase();
          return { host: `[${input}]`, escapedHost: input, isIPV6: false, isIPVFuture: true };
        }
        if (findToken(input, ":") < 2) {
          return { host, isIPV6: false, error: bracketed };
        }
        let zoneIdentifier = "";
        const zoneSeparator = input.indexOf("%");
        if (zoneSeparator !== -1) {
          const separatorLength = input.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
          zoneIdentifier = input.slice(zoneSeparator + separatorLength);
          if (!isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: false, error: true };
          input = input.slice(0, zoneSeparator);
        }
        const address = normalizeIPv6Address(input);
        if (address === void 0) return { host, isIPV6: false, error: true };
        return {
          host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
          escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
          isIPV6: true
        };
      }
      function findToken(str, token) {
        let ind = 0;
        for (let i = 0; i < str.length; i++) {
          if (str[i] === token) ind++;
        }
        return ind;
      }
      function removeDotSegments(path) {
        let input = path;
        const output = [];
        let nextSlash = -1;
        let len = 0;
        while (len = input.length) {
          if (len === 1) {
            if (input === ".") {
              break;
            } else if (input === "/") {
              output.push("/");
              break;
            } else {
              output.push(input);
              break;
            }
          } else if (len === 2) {
            if (input[0] === ".") {
              if (input[1] === ".") {
                break;
              } else if (input[1] === "/") {
                input = input.slice(2);
                continue;
              }
            } else if (input[0] === "/") {
              if (input[1] === "." || input[1] === "/") {
                output.push("/");
                break;
              }
            }
          } else if (len === 3) {
            if (input === "/..") {
              if (output.length !== 0) {
                output.pop();
              }
              output.push("/");
              break;
            }
          }
          if (input[0] === ".") {
            if (input[1] === ".") {
              if (input[2] === "/") {
                input = input.slice(3);
                continue;
              }
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === ".") {
              if (input[2] === "/") {
                input = input.slice(2);
                continue;
              } else if (input[2] === ".") {
                if (input[3] === "/") {
                  input = input.slice(3);
                  if (output.length !== 0) {
                    output.pop();
                  }
                  continue;
                }
              }
            }
          }
          if ((nextSlash = input.indexOf("/", 1)) === -1) {
            output.push(input);
            break;
          } else {
            output.push(input.slice(0, nextSlash));
            input = input.slice(nextSlash);
          }
        }
        return output.join("");
      }
      var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
      var HOST_DELIM_RE = /[@/?#:]/g;
      var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
      function reescapeHostDelimiters(host, isIP) {
        const re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
        re.lastIndex = 0;
        return host.replace(re, (ch) => HOST_DELIMS[ch]);
      }
      function normalizePercentEncoding(input, decodeUnreserved = false) {
        if (input.indexOf("%") === -1) {
          return input;
        }
        let output = "";
        for (let i = 0; i < input.length; i++) {
          if (input[i] === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (decodeUnreserved && isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          output += input[i];
        }
        return output;
      }
      function normalizePathEncoding(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (decoded !== "." && isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          if (isPathCharacter(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function serializePathEncoding(input, pathNoScheme = false) {
        let output = "";
        let firstSegment = pathNoScheme && input[0] !== "/";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          if (ch === "/") {
            firstSegment = false;
          }
          if (isPathCharacter(ch) && (ch !== ":" || !firstSegment)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function encodeComponent(input, isAllowed) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          if (isAllowed(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function encodeUserinfo(input) {
        return encodeComponent(input, isUserinfoCharacter);
      }
      function encodeQuery(input) {
        return encodeComponent(input, isQueryFragmentCharacter);
      }
      function encodeFragment(input) {
        return encodeComponent(input, isQueryFragmentCharacter);
      }
      function isEscapeSafe(cp) {
        return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
      }
      function normalizeQueryFragmentEncoding(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          const ch = input[i];
          if (ch === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              const normalizedHex = hex.toUpperCase();
              const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
              if (isUnreserved(decoded)) {
                output += decoded;
              } else {
                output += "%" + normalizedHex;
              }
              i += 2;
              continue;
            }
          }
          if (isQueryFragmentCharacter(ch)) {
            output += ch;
          } else {
            const code = input.charCodeAt(i);
            if (code < 128) {
              output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
            } else if (code < 55296 || code > 57343) {
              output += percentEncodeNonAscii(code);
            } else if (code <= 56319 && i + 1 < input.length) {
              const low = input.charCodeAt(i + 1);
              if (low >= 56320 && low <= 57343) {
                output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
                i++;
              } else {
                output += percentEncodeNonAscii(65533);
              }
            } else {
              output += percentEncodeNonAscii(65533);
            }
          }
        }
        return output;
      }
      function escapePreservingEscapes(input) {
        let output = "";
        for (let i = 0; i < input.length; i++) {
          if (input[i] === "%" && i + 2 < input.length) {
            const hex = input.slice(i + 1, i + 3);
            if (isHexPair(hex)) {
              output += "%" + hex.toUpperCase();
              i += 2;
              continue;
            }
          }
          output += escape(input[i]);
        }
        return output;
      }
      function recomposeAuthority(component) {
        const uriTokens = [];
        if (component.userinfo !== void 0) {
          uriTokens.push(encodeUserinfo(component.userinfo));
          uriTokens.push("@");
        }
        if (component.host !== void 0) {
          let host = component.host;
          if (!isIPv4(host)) {
            let ipV6res = normalizeIPv6(host);
            if (ipV6res.isIPV6 !== true && ipV6res.isIPVFuture !== true) {
              host = normalizePercentEncoding(host, true);
              ipV6res = normalizeIPv6(host);
            }
            if (ipV6res.isIPV6 === true || ipV6res.isIPVFuture === true) {
              host = `[${ipV6res.escapedHost}]`;
            } else {
              host = reescapeHostDelimiters(host, false);
            }
          }
          uriTokens.push(host);
        }
        if (typeof component.port === "number" || typeof component.port === "string") {
          const port = String(component.port);
          if (!isPort(port)) {
            throw new TypeError("URI port is malformed.");
          }
          uriTokens.push(":");
          uriTokens.push(port);
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      module.exports = {
        nonSimpleDomain,
        recomposeAuthority,
        reescapeHostDelimiters,
        normalizePercentEncoding,
        normalizePathEncoding,
        serializePathEncoding,
        normalizeQueryFragmentEncoding,
        encodeUserinfo,
        encodeQuery,
        encodeFragment,
        escapePreservingEscapes,
        removeDotSegments,
        isIPv4,
        isUUID,
        normalizeIPv6,
        stringArrayToHexStripped
      };
    }
  });

  // .codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/schemes.js
  var require_schemes = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/schemes.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      var { isUUID } = require_utils();
      var URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu;
      var supportedSchemeNames = (
        /** @type {const} */
        [
          "http",
          "https",
          "ws",
          "wss",
          "urn",
          "urn:uuid"
        ]
      );
      function isValidSchemeName(name) {
        return supportedSchemeNames.indexOf(
          /** @type {*} */
          name
        ) !== -1;
      }
      function wsIsSecure(wsComponent) {
        if (wsComponent.secure === true) {
          return true;
        } else if (wsComponent.secure === false) {
          return false;
        } else if (wsComponent.scheme) {
          return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
        } else {
          return false;
        }
      }
      function httpParse(component) {
        if (!component.host) {
          component.error = component.error || "HTTP URIs must have a host.";
        }
        return component;
      }
      function httpSerialize(component) {
        const secure = String(component.scheme).toLowerCase() === "https";
        if (component.port === (secure ? 443 : 80) || component.port === "") {
          component.port = void 0;
        }
        if (!component.path) {
          component.path = "/";
        }
        return component;
      }
      function wsParse(wsComponent) {
        wsComponent.secure = wsIsSecure(wsComponent);
        wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
        wsComponent.path = void 0;
        wsComponent.query = void 0;
        return wsComponent;
      }
      function wsSerialize(wsComponent) {
        if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
          wsComponent.port = void 0;
        }
        if (typeof wsComponent.secure === "boolean") {
          wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
          wsComponent.secure = void 0;
        }
        if (wsComponent.resourceName) {
          const queryIndex = wsComponent.resourceName.indexOf("?");
          const path = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
          wsComponent.path = path && path !== "/" ? path : void 0;
          wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1);
          wsComponent.resourceName = void 0;
        }
        wsComponent.fragment = void 0;
        return wsComponent;
      }
      function urnParse(urnComponent, options) {
        if (!urnComponent.path) {
          urnComponent.error = "URN can not be parsed";
          return urnComponent;
        }
        const matches = urnComponent.path.match(URN_REG);
        if (matches && matches[0] === urnComponent.path) {
          const scheme = options.scheme || urnComponent.scheme || "urn";
          urnComponent.nid = matches[1].toLowerCase();
          urnComponent.nss = matches[2];
          const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
          const schemeHandler = getSchemeHandler(urnScheme);
          urnComponent.path = void 0;
          if (schemeHandler) {
            urnComponent = schemeHandler.parse(urnComponent, options);
          }
        } else {
          urnComponent.error = urnComponent.error || "URN can not be parsed.";
        }
        return urnComponent;
      }
      function urnSerialize(urnComponent, options) {
        if (urnComponent.nid === void 0) {
          throw new Error("URN without nid cannot be serialized");
        }
        const scheme = options.scheme || urnComponent.scheme || "urn";
        const nid = urnComponent.nid.toLowerCase();
        const urnScheme = `${scheme}:${options.nid || nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        if (schemeHandler) {
          urnComponent = schemeHandler.serialize(urnComponent, options);
        }
        const uriComponent = urnComponent;
        const nss = urnComponent.nss;
        uriComponent.path = `${nid || options.nid}:${nss}`;
        options.skipEscape = true;
        return uriComponent;
      }
      function urnuuidParse(urnComponent, options) {
        const uuidComponent = urnComponent;
        uuidComponent.uuid = uuidComponent.nss;
        uuidComponent.nss = void 0;
        if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
          uuidComponent.error = uuidComponent.error || "UUID is not valid.";
        }
        return uuidComponent;
      }
      function urnuuidSerialize(uuidComponent) {
        const urnComponent = uuidComponent;
        urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
        return urnComponent;
      }
      var http = (
        /** @type {SchemeHandler} */
        {
          scheme: "http",
          domainHost: true,
          parse: httpParse,
          serialize: httpSerialize
        }
      );
      var https = (
        /** @type {SchemeHandler} */
        {
          scheme: "https",
          domainHost: http.domainHost,
          parse: httpParse,
          serialize: httpSerialize
        }
      );
      var ws = (
        /** @type {SchemeHandler} */
        {
          scheme: "ws",
          domainHost: true,
          parse: wsParse,
          serialize: wsSerialize
        }
      );
      var wss = (
        /** @type {SchemeHandler} */
        {
          scheme: "wss",
          domainHost: ws.domainHost,
          parse: ws.parse,
          serialize: ws.serialize
        }
      );
      var urn = (
        /** @type {SchemeHandler} */
        {
          scheme: "urn",
          parse: urnParse,
          serialize: urnSerialize,
          skipNormalize: true
        }
      );
      var urnuuid = (
        /** @type {SchemeHandler} */
        {
          scheme: "urn:uuid",
          parse: urnuuidParse,
          serialize: urnuuidSerialize,
          skipNormalize: true
        }
      );
      var SCHEMES = (
        /** @type {Record<SchemeName, SchemeHandler>} */
        {
          http,
          https,
          ws,
          wss,
          urn,
          "urn:uuid": urnuuid
        }
      );
      Object.setPrototypeOf(SCHEMES, null);
      function getSchemeHandler(scheme) {
        return scheme && (SCHEMES[
          /** @type {SchemeName} */
          scheme
        ] || SCHEMES[
          /** @type {SchemeName} */
          scheme.toLowerCase()
        ]) || void 0;
      }
      module.exports = {
        wsIsSecure,
        SCHEMES,
        isValidSchemeName,
        getSchemeHandler
      };
    }
  });

  // .codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/index.js
  var require_fast_uri = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/index.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      var { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
      var { SCHEMES, getSchemeHandler } = require_schemes();
      var VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u;
      var MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
      function decodeValidScheme(scheme) {
        const decodedScheme = unescape(String(scheme));
        if (!VALID_SCHEME.test(decodedScheme)) {
          throw new TypeError(MALFORMED_SCHEME_ERROR);
        }
        return decodedScheme;
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = /** @type {T} */
          normalizeString(uri, options);
        } else if (typeof uri === "object") {
          uri = /** @type {T} */
          parse(serialize(uri, options), options);
        }
        return uri;
      }
      function resolve(baseURI, relativeURI, options) {
        const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
        const {
          parsed: baseParsed,
          malformedAuthorityOrPort: baseMalformed,
          malformedPercentEncoding: baseMalformedPercentEncoding,
          malformedSchemeSpecific: baseMalformedSchemeSpecific,
          malformedHost: baseMalformedHost,
          malformedScheme: baseMalformedScheme
        } = parseWithStatus(baseURI, schemelessOptions);
        const {
          parsed: relativeParsed,
          malformedAuthorityOrPort: relativeMalformed,
          malformedPercentEncoding: relativeMalformedPercentEncoding,
          malformedSchemeSpecific: relativeMalformedSchemeSpecific,
          malformedHost: relativeMalformedHost,
          malformedScheme: relativeMalformedScheme
        } = parseWithStatus(relativeURI, schemelessOptions);
        if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) {
          throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
        }
        const resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, true);
        const resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme);
        const resolvedHost = resolved.host;
        const resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
        canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
        const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !/\P{ASCII}/u.test(resolvedHost);
        if (resolved.error && !encodedASCIIHost) {
          throw new Error(resolved.error);
        }
        schemelessOptions.skipEscape = true;
        return serialize(resolved, schemelessOptions);
      }
      function resolveComponent(base, relative, options, skipNormalization) {
        const target = {};
        if (!skipNormalization) {
          base = parse(serialize(base, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base.query;
              }
            } else {
              if (relative.path[0] === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                  target.path = "/" + relative.path;
                } else if (!base.path) {
                  target.path = relative.path;
                } else {
                  target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
          }
          target.scheme = base.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function equal(uriA, uriB, options) {
        const normalizedA = normalizeComparableURI(uriA, options);
        const normalizedB = normalizeComparableURI(uriB, options);
        return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
      }
      function serialize(cmpts, opts) {
        const component = {
          host: cmpts.host,
          scheme: cmpts.scheme,
          userinfo: cmpts.userinfo,
          port: cmpts.port,
          path: cmpts.path,
          query: cmpts.query,
          nid: cmpts.nid,
          nss: cmpts.nss,
          uuid: cmpts.uuid,
          fragment: cmpts.fragment,
          reference: cmpts.reference,
          resourceName: cmpts.resourceName,
          secure: cmpts.secure,
          error: ""
        };
        const options = Object.assign({}, opts);
        const uriTokens = [];
        if (component.scheme) {
          component.scheme = decodeValidScheme(component.scheme);
        }
        const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
        const hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0;
        const pathNoScheme = !options.skipEscape && component.scheme === void 0 && !hasAuthority;
        if (component.path !== void 0) {
          if (!options.skipEscape) {
            component.path = serializePathEncoding(component.path, pathNoScheme);
          } else {
            component.path = normalizePercentEncoding(component.path);
          }
        }
        if (options.reference !== "suffix" && component.scheme) {
          component.scheme = decodeValidScheme(component.scheme);
          uriTokens.push(component.scheme, ":");
        }
        const authority = recomposeAuthority(component);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (component.path && component.path[0] !== "/") {
            uriTokens.push("/");
          }
        }
        if (component.path !== void 0) {
          let s = component.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (pathNoScheme) {
            s = serializePathEncoding(s, true);
          }
          if (authority === void 0 && s[0] === "/" && s[1] === "/") {
            s = "/%2F" + s.slice(2);
          }
          uriTokens.push(s);
        }
        if (component.query !== void 0) {
          uriTokens.push("?", encodeQuery(component.query));
        }
        if (component.fragment !== void 0) {
          uriTokens.push("#", encodeFragment(component.fragment));
        }
        return uriTokens.join("");
      }
      var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
      var AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/;
      var AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
      function getParseError(parsed, matches) {
        if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
          return 'URI path must start with "/" when authority is present.';
        }
        if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
          return "URI port is malformed.";
        }
        return void 0;
      }
      function hasMalformedPercentEncoding(component) {
        if (component === void 0) return false;
        let percent = component.indexOf("%");
        while (percent !== -1) {
          if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3))) {
            return true;
          }
          percent = component.indexOf("%", percent + 3);
        }
        return false;
      }
      function isIPLiteral(host) {
        return host[0] === "[" && host[host.length - 1] === "]";
      }
      function hasMalformedComponentPercentEncoding(matches) {
        const host = matches[4];
        return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
      }
      function canonicalizeHost(parsed, options, schemeHandler, isIP) {
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
          try {
            parsed.host = new URL("http://" + parsed.host).hostname;
          } catch (e) {
            parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
            return true;
          }
        }
        return false;
      }
      function parseWithStatus(uri, opts) {
        const options = Object.assign({}, opts);
        const parsed = {
          scheme: void 0,
          userinfo: void 0,
          host: "",
          port: void 0,
          path: "",
          query: void 0,
          fragment: void 0
        };
        let malformedAuthorityOrPort = false;
        let malformedPercentEncoding = false;
        let malformedSchemeSpecific = false;
        let malformedHost = false;
        let malformedIPLiteral = false;
        let malformedScheme = false;
        let isIP = false;
        if (options.reference === "suffix") {
          if (options.scheme) {
            uri = options.scheme + ":" + uri;
          } else {
            uri = "//" + uri;
          }
        }
        const authorityMatch = uri.match(AUTHORITY_PREFIX);
        if (authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1) {
          parsed.error = "URI authority must not contain a literal backslash.";
          malformedAuthorityOrPort = true;
        }
        const introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
        if (introducerMatch !== null) {
          const region = introducerMatch[1];
          const normalizedRegion = region.replace(/[\t\n\r]/g, "");
          if (normalizedRegion.length >= 2) {
            if (normalizedRegion.slice(0, 2) !== "//") {
              parsed.error = parsed.error || "URI authority must not contain a literal backslash.";
              malformedAuthorityOrPort = true;
            } else if (region.length !== normalizedRegion.length) {
              parsed.error = parsed.error || "URI authority introducer must not contain whitespace.";
              malformedAuthorityOrPort = true;
            }
          }
        }
        const matches = uri.match(URI_PARSE);
        if (matches) {
          parsed.scheme = matches[1];
          parsed.userinfo = matches[3];
          parsed.host = matches[4];
          parsed.port = parseInt(matches[5], 10);
          parsed.path = matches[6] || "";
          parsed.query = matches[7];
          parsed.fragment = matches[8];
          if (parsed.scheme !== void 0) {
            const decodedScheme = unescape(parsed.scheme);
            if (VALID_SCHEME.test(decodedScheme)) {
              parsed.scheme = decodedScheme.toLowerCase();
            } else {
              parsed.error = parsed.error || MALFORMED_SCHEME_ERROR;
              malformedScheme = true;
            }
          }
          malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches);
          if (malformedPercentEncoding) {
            parsed.error = parsed.error || "URI contains malformed percent-encoding.";
          }
          if (isNaN(parsed.port)) {
            parsed.port = matches[5];
          }
          const parseError = getParseError(parsed, matches);
          if (parseError !== void 0) {
            parsed.error = parsed.error || parseError;
            malformedAuthorityOrPort = true;
          }
          if (parsed.host) {
            const ipv4result = isIPv4(parsed.host);
            if (ipv4result === false) {
              const bracketedIPLiteral = isIPLiteral(parsed.host);
              const hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1;
              const ipv6result = normalizeIPv6(parsed.host);
              isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === true;
              malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === true);
              parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase();
              if (malformedIPLiteral) {
                parsed.error = parsed.error || "URI host is malformed.";
                malformedAuthorityOrPort = true;
              }
            } else {
              isIP = true;
            }
          }
          if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
            parsed.reference = "same-document";
          } else if (parsed.scheme === void 0) {
            parsed.reference = "relative";
          } else if (parsed.fragment === void 0) {
            parsed.reference = "absolute";
          } else {
            parsed.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
            parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
          }
          const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
          if (!malformedIPLiteral) {
            malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP);
          }
          if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
            if (uri.indexOf("%") !== -1) {
              if (parsed.host !== void 0 && !malformedIPLiteral) {
                const host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, true);
                parsed.host = reescapeHostDelimiters(host, isIP);
              }
            }
            if (parsed.path) {
              parsed.path = normalizePathEncoding(parsed.path);
            }
            if (parsed.query) {
              parsed.query = normalizeQueryFragmentEncoding(parsed.query);
            }
            if (parsed.fragment) {
              parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment);
            }
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(parsed, options);
            if (schemeHandler === SCHEMES.urn && parsed.nid === void 0) {
              malformedSchemeSpecific = true;
            }
          }
        } else {
          parsed.error = parsed.error || "URI can not be parsed.";
        }
        return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
      }
      function parse(uri, opts) {
        return parseWithStatus(uri, opts).parsed;
      }
      function normalizeString(uri, opts) {
        return normalizeStringWithStatus(uri, opts).normalized;
      }
      function normalizeStringWithStatus(uri, opts) {
        const { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
        return {
          normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
          malformedAuthorityOrPort,
          malformedPercentEncoding,
          malformedSchemeSpecific,
          malformedHost,
          malformedScheme
        };
      }
      function normalizeComparableURI(uri, opts) {
        if (typeof uri !== "string" && typeof uri !== "object") {
          return void 0;
        }
        let value;
        try {
          value = typeof uri === "string" ? uri : serialize(uri, opts);
        } catch (e) {
          return void 0;
        }
        const { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
        return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
      }
      var fastUri = {
        SCHEMES,
        normalize,
        resolve,
        resolveComponent,
        equal,
        serialize,
        parse
      };
      module.exports = fastUri;
      module.exports.default = fastUri;
      module.exports.fastUri = fastUri;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js
  var require_uri = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var uri = require_fast_uri();
      uri.code = 'require("ajv/dist/runtime/uri").default';
      exports.default = uri;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/core.js
  var require_core = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/core.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
      var validate_1 = require_validate();
      Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
        return validate_1.KeywordCxt;
      } });
      var codegen_1 = require_codegen();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return codegen_1._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return codegen_1.str;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return codegen_1.stringify;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return codegen_1.nil;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return codegen_1.Name;
      } });
      Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
        return codegen_1.CodeGen;
      } });
      var validation_error_1 = require_validation_error();
      var ref_error_1 = require_ref_error();
      var rules_1 = require_rules();
      var compile_1 = require_compile();
      var codegen_2 = require_codegen();
      var resolve_1 = require_resolve();
      var dataType_1 = require_dataType();
      var util_1 = require_util();
      var $dataRefSchema = require_data();
      var uri_1 = require_uri();
      var defaultRegExp = (str, flags) => new RegExp(str, flags);
      defaultRegExp.code = "new RegExp";
      var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
      var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
        "validate",
        "serialize",
        "parse",
        "wrapper",
        "root",
        "schema",
        "keyword",
        "pattern",
        "formats",
        "validate$data",
        "func",
        "obj",
        "Error"
      ]);
      var removedOptions = {
        errorDataPath: "",
        format: "`validateFormats: false` can be used instead.",
        nullable: '"nullable" keyword is supported by default.',
        jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
        extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
        missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
        processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
        sourceCode: "Use option `code: {source: true}`",
        strictDefaults: "It is default now, see option `strict`.",
        strictKeywords: "It is default now, see option `strict`.",
        uniqueItems: '"uniqueItems" keyword is always validated.',
        unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
        cache: "Map is used as cache, schema object as key.",
        serialize: "Map is used as cache, schema object as key.",
        ajvErrors: "It is default now."
      };
      var deprecatedOptions = {
        ignoreKeywordsWithRef: "",
        jsPropertySyntax: "",
        unicode: '"minLength"/"maxLength" account for unicode characters by default.'
      };
      var MAX_EXPRESSION = 200;
      function requiredOptions(o) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        const s = o.strict;
        const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
        const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
        const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
        const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
        return {
          strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
          strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
          strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
          strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
          strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
          code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
          loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
          loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
          meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
          messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
          inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
          schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
          addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
          validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
          validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
          unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
          int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
          uriResolver
        };
      }
      var Ajv2 = class {
        constructor(opts = {}) {
          this.schemas = {};
          this.refs = {};
          this.formats = /* @__PURE__ */ Object.create(null);
          this._compilations = /* @__PURE__ */ new Set();
          this._loading = {};
          this._cache = /* @__PURE__ */ new Map();
          opts = this.opts = { ...opts, ...requiredOptions(opts) };
          const { es5, lines } = this.opts.code;
          this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
          this.logger = getLogger(opts.logger);
          const formatOpt = opts.validateFormats;
          opts.validateFormats = false;
          this.RULES = (0, rules_1.getRules)();
          checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
          checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
          this._metaOpts = getMetaSchemaOptions.call(this);
          if (opts.formats)
            addInitialFormats.call(this);
          this._addVocabularies();
          this._addDefaultMetaSchema();
          if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
          if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
          addInitialSchemas.call(this);
          opts.validateFormats = formatOpt;
        }
        _addVocabularies() {
          this.addKeyword("$async");
        }
        _addDefaultMetaSchema() {
          const { $data, meta, schemaId } = this.opts;
          let _dataRefSchema = $dataRefSchema;
          if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
          }
          if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
        }
        defaultMeta() {
          const { meta, schemaId } = this.opts;
          return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
        }
        validate(schemaKeyRef, data) {
          let v;
          if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
              throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
          } else {
            v = this.compile(schemaKeyRef);
          }
          const valid = v(data);
          if (!("$async" in v))
            this.errors = v.errors;
          return valid;
        }
        compile(schema, _meta) {
          const sch = this._addSchema(schema, _meta);
          return sch.validate || this._compileSchemaEnv(sch);
        }
        compileAsync(schema, meta) {
          if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
          }
          const { loadSchema } = this.opts;
          return runCompileAsync.call(this, schema, meta);
          async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
          }
          async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
              await runCompileAsync.call(this, { $ref }, true);
            }
          }
          async function _compileAsync(sch) {
            try {
              return this._compileSchemaEnv(sch);
            } catch (e) {
              if (!(e instanceof ref_error_1.default))
                throw e;
              checkLoaded.call(this, e);
              await loadMissingSchema.call(this, e.missingSchema);
              return _compileAsync.call(this, sch);
            }
          }
          function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
              throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
          }
          async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
              await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
              this.addSchema(_schema, ref, meta);
          }
          async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
              return p;
            try {
              return await (this._loading[ref] = loadSchema(ref));
            } finally {
              delete this._loading[ref];
            }
          }
        }
        // Adds schema to the instance
        addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
          if (Array.isArray(schema)) {
            for (const sch of schema)
              this.addSchema(sch, void 0, _meta, _validateSchema);
            return this;
          }
          let id;
          if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== void 0 && typeof id != "string") {
              throw new Error(`schema ${schemaId} must be string`);
            }
          }
          key = (0, resolve_1.normalizeId)(key || id);
          this._checkUnique(key);
          this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
          return this;
        }
        // Add schema that will be used to validate other schemas
        // options in META_IGNORE_OPTIONS are alway set to false
        addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
          this.addSchema(schema, key, true, _validateSchema);
          return this;
        }
        //  Validate schema against its meta-schema
        validateSchema(schema, throwOrLogError) {
          if (typeof schema == "boolean")
            return true;
          let $schema;
          $schema = schema.$schema;
          if ($schema !== void 0 && typeof $schema != "string") {
            throw new Error("$schema must be a string");
          }
          $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
          if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
          }
          const valid = this.validate($schema, schema);
          if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
              this.logger.error(message);
            else
              throw new Error(message);
          }
          return valid;
        }
        // Get compiled schema by `key` or `ref`.
        // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
        getSchema(keyRef) {
          let sch;
          while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
          if (sch === void 0) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
              return;
            this.refs[keyRef] = sch;
          }
          return sch.validate || this._compileSchemaEnv(sch);
        }
        // Remove cached schema(s).
        // If no parameter is passed all schemas but meta-schemas are removed.
        // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
        // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
        removeSchema(schemaKeyRef) {
          if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
          }
          switch (typeof schemaKeyRef) {
            case "undefined":
              this._removeAllSchemas(this.schemas);
              this._removeAllSchemas(this.refs);
              this._cache.clear();
              return this;
            case "string": {
              const sch = getSchEnv.call(this, schemaKeyRef);
              if (typeof sch == "object")
                this._cache.delete(sch.schema);
              delete this.schemas[schemaKeyRef];
              delete this.refs[schemaKeyRef];
              return this;
            }
            case "object": {
              const cacheKey = schemaKeyRef;
              this._cache.delete(cacheKey);
              let id = schemaKeyRef[this.opts.schemaId];
              if (id) {
                id = (0, resolve_1.normalizeId)(id);
                delete this.schemas[id];
                delete this.refs[id];
              }
              return this;
            }
            default:
              throw new Error("ajv.removeSchema: invalid parameter");
          }
        }
        // add "vocabulary" - a collection of keywords
        addVocabulary(definitions) {
          for (const def of definitions)
            this.addKeyword(def);
          return this;
        }
        addKeyword(kwdOrDef, def) {
          let keyword;
          if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
              this.logger.warn("these parameters are deprecated, see docs for addKeyword");
              def.keyword = keyword;
            }
          } else if (typeof kwdOrDef == "object" && def === void 0) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
              throw new Error("addKeywords: keyword must be string or non-empty array");
            }
          } else {
            throw new Error("invalid addKeywords parameters");
          }
          checkKeyword.call(this, keyword, def);
          if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
          }
          keywordMetaschema.call(this, def);
          const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
          };
          (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
          return this;
        }
        getKeyword(keyword) {
          const rule = this.RULES.all[keyword];
          return typeof rule == "object" ? rule.definition : !!rule;
        }
        // Remove keyword
        removeKeyword(keyword) {
          const { RULES } = this;
          delete RULES.keywords[keyword];
          delete RULES.all[keyword];
          for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
              group.rules.splice(i, 1);
          }
          return this;
        }
        // Add format
        addFormat(name, format) {
          if (typeof format == "string")
            format = new RegExp(format);
          this.formats[name] = format;
          return this;
        }
        errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
          if (!errors || errors.length === 0)
            return "No errors";
          return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
        }
        $dataMetaSchema(metaSchema, keywordsJsonPointers) {
          const rules = this.RULES.all;
          metaSchema = JSON.parse(JSON.stringify(metaSchema));
          for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1);
            let keywords = metaSchema;
            for (const seg of segments)
              keywords = keywords[seg];
            for (const key in rules) {
              const rule = rules[key];
              if (typeof rule != "object")
                continue;
              const { $data } = rule.definition;
              const schema = keywords[key];
              if ($data && schema)
                keywords[key] = schemaOrData(schema);
            }
          }
          return metaSchema;
        }
        _removeAllSchemas(schemas, regex) {
          for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
              if (typeof sch == "string") {
                delete schemas[keyRef];
              } else if (sch && !sch.meta) {
                this._cache.delete(sch.schema);
                delete schemas[keyRef];
              }
            }
          }
        }
        _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
          let id;
          const { schemaId } = this.opts;
          if (typeof schema == "object") {
            id = schema[schemaId];
          } else {
            if (this.opts.jtd)
              throw new Error("schema must be object");
            else if (typeof schema != "boolean")
              throw new Error("schema must be object or boolean");
          }
          let sch = this._cache.get(schema);
          if (sch !== void 0)
            return sch;
          baseId = (0, resolve_1.normalizeId)(id || baseId);
          const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
          sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
          this._cache.set(sch.schema, sch);
          if (addSchema && !baseId.startsWith("#")) {
            if (baseId)
              this._checkUnique(baseId);
            this.refs[baseId] = sch;
          }
          if (validateSchema)
            this.validateSchema(schema, true);
          return sch;
        }
        _checkUnique(id) {
          if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
          }
        }
        _compileSchemaEnv(sch) {
          if (sch.meta)
            this._compileMetaSchema(sch);
          else
            compile_1.compileSchema.call(this, sch);
          if (!sch.validate)
            throw new Error("ajv implementation error");
          return sch.validate;
        }
        _compileMetaSchema(sch) {
          const currentOpts = this.opts;
          this.opts = this._metaOpts;
          try {
            compile_1.compileSchema.call(this, sch);
          } finally {
            this.opts = currentOpts;
          }
        }
      };
      Ajv2.ValidationError = validation_error_1.default;
      Ajv2.MissingRefError = ref_error_1.default;
      exports.default = Ajv2;
      function checkOptions(checkOpts, options, msg, log = "error") {
        for (const key in checkOpts) {
          const opt = key;
          if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
        }
      }
      function getSchEnv(keyRef) {
        keyRef = (0, resolve_1.normalizeId)(keyRef);
        return this.schemas[keyRef] || this.refs[keyRef];
      }
      function addInitialSchemas() {
        const optsSchemas = this.opts.schemas;
        if (!optsSchemas)
          return;
        if (Array.isArray(optsSchemas))
          this.addSchema(optsSchemas);
        else
          for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
      }
      function addInitialFormats() {
        for (const name in this.opts.formats) {
          const format = this.opts.formats[name];
          if (format)
            this.addFormat(name, format);
        }
      }
      function addInitialKeywords(defs) {
        if (Array.isArray(defs)) {
          this.addVocabulary(defs);
          return;
        }
        this.logger.warn("keywords option as map is deprecated, pass array");
        for (const keyword in defs) {
          const def = defs[keyword];
          if (!def.keyword)
            def.keyword = keyword;
          this.addKeyword(def);
        }
      }
      function getMetaSchemaOptions() {
        const metaOpts = { ...this.opts };
        for (const opt of META_IGNORE_OPTIONS)
          delete metaOpts[opt];
        return metaOpts;
      }
      var noLogs = { log() {
      }, warn() {
      }, error() {
      } };
      function getLogger(logger) {
        if (logger === false)
          return noLogs;
        if (logger === void 0)
          return console;
        if (logger.log && logger.warn && logger.error)
          return logger;
        throw new Error("logger must implement log, warn and error methods");
      }
      var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
      function checkKeyword(keyword, def) {
        const { RULES } = this;
        (0, util_1.eachItem)(keyword, (kwd) => {
          if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
          if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
        });
        if (!def)
          return;
        if (def.$data && !("code" in def || "validate" in def)) {
          throw new Error('$data keyword must have "code" or "validate" function');
        }
      }
      function addRule(keyword, definition, dataType) {
        var _a;
        const post = definition === null || definition === void 0 ? void 0 : definition.post;
        if (dataType && post)
          throw new Error('keyword with "post" flag cannot have "type"');
        const { RULES } = this;
        let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
        if (!ruleGroup) {
          ruleGroup = { type: dataType, rules: [] };
          RULES.rules.push(ruleGroup);
        }
        RULES.keywords[keyword] = true;
        if (!definition)
          return;
        const rule = {
          keyword,
          definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
          }
        };
        if (definition.before)
          addBeforeRule.call(this, ruleGroup, rule, definition.before);
        else
          ruleGroup.rules.push(rule);
        RULES.all[keyword] = rule;
        (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
      }
      function addBeforeRule(ruleGroup, rule, before) {
        const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
        if (i >= 0) {
          ruleGroup.rules.splice(i, 0, rule);
        } else {
          ruleGroup.rules.push(rule);
          this.logger.warn(`rule ${before} is not defined`);
        }
      }
      function keywordMetaschema(def) {
        let { metaSchema } = def;
        if (metaSchema === void 0)
          return;
        if (def.$data && this.opts.$data)
          metaSchema = schemaOrData(metaSchema);
        def.validateSchema = this.compile(metaSchema, true);
      }
      var $dataRef = {
        $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
      };
      function schemaOrData(schema) {
        return { anyOf: [schema, $dataRef] };
      }
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/id.js
  var require_id = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var def = {
        keyword: "id",
        code() {
          throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js
  var require_ref = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.callRef = exports.getValidate = void 0;
      var ref_error_1 = require_ref_error();
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var compile_1 = require_compile();
      var util_1 = require_util();
      var def = {
        keyword: "$ref",
        schemaType: "string",
        code(cxt) {
          const { gen, schema: $ref, it } = cxt;
          const { baseId, schemaEnv: env, validateName, opts, self } = it;
          const { root } = env;
          if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
          const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
          if (schOrEnv === void 0)
            throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
          if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
          return inlineRefSchema(schOrEnv);
          function callRootRef() {
            if (env === root)
              return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
          }
          function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
          }
          function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
              schema: sch,
              dataTypes: [],
              schemaPath: codegen_1.nil,
              topSchemaRef: schName,
              errSchemaPath: $ref
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
          }
        }
      };
      function getValidate(cxt, sch) {
        const { gen } = cxt;
        return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
      }
      exports.getValidate = getValidate;
      function callRef(cxt, v, sch, $async) {
        const { gen, it } = cxt;
        const { allErrors, schemaEnv: env, opts } = it;
        const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
        if ($async)
          callAsyncRef();
        else
          callSyncRef();
        function callAsyncRef() {
          if (!env.$async)
            throw new Error("async schema referenced by sync schema");
          const valid = gen.let("valid");
          gen.try(() => {
            gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v);
            if (!allErrors)
              gen.assign(valid, true);
          }, (e) => {
            gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
              gen.assign(valid, false);
          });
          cxt.ok(valid);
        }
        function callSyncRef() {
          cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
        }
        function addErrorsFrom(source) {
          const errs = (0, codegen_1._)`${source}.errors`;
          gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
          gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        }
        function addEvaluatedFrom(source) {
          var _a;
          if (!it.opts.unevaluated)
            return;
          const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
          if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
              if (schEvaluated.props !== void 0) {
                it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
              }
            } else {
              const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
              it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
          }
          if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
              if (schEvaluated.items !== void 0) {
                it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
              }
            } else {
              const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
              it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
          }
        }
      }
      exports.callRef = callRef;
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js
  var require_core2 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var id_1 = require_id();
      var ref_1 = require_ref();
      var core = [
        "$schema",
        "$id",
        "$defs",
        "$vocabulary",
        { keyword: "$comment" },
        "definitions",
        id_1.default,
        ref_1.default
      ];
      exports.default = core;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js
  var require_limitNumber = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var ops = codegen_1.operators;
      var KWDs = {
        maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
        minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
        exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
        exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
      };
      var error = {
        message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
        params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
      };
      var def = {
        keyword: Object.keys(KWDs),
        type: "number",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js
  var require_multipleOf = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
        params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
      };
      var def = {
        keyword: "multipleOf",
        type: "number",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, schemaCode, it } = cxt;
          const prec = it.opts.multipleOfPrecision;
          const res = gen.let("res");
          const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
          cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js
  var require_ucs2length = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      function ucs2length(str) {
        const len = str.length;
        let length = 0;
        let pos = 0;
        let value;
        while (pos < len) {
          length++;
          value = str.charCodeAt(pos++);
          if (value >= 55296 && value <= 56319 && pos < len) {
            value = str.charCodeAt(pos);
            if ((value & 64512) === 56320)
              pos++;
          }
        }
        return length;
      }
      exports.default = ucs2length;
      ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js
  var require_limitLength = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var ucs2length_1 = require_ucs2length();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxLength" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxLength", "minLength"],
        type: "string",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode, it } = cxt;
          const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
          const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
          cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js
  var require_pattern = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var util_1 = require_util();
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
        params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
      };
      var def = {
        keyword: "pattern",
        type: "string",
        schemaType: "string",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          const u = it.opts.unicodeRegExp ? "u" : "";
          if ($data) {
            const { regExp } = it.opts.code;
            const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
            const valid = gen.let("valid");
            gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
            cxt.fail$data((0, codegen_1._)`!${valid}`);
          } else {
            const regExp = (0, code_1.usePattern)(cxt, schema);
            cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js
  var require_limitProperties = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxProperties" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxProperties", "minProperties"],
        type: "object",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
          cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js
  var require_required = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
        params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
      };
      var def = {
        keyword: "required",
        type: "object",
        schemaType: "array",
        $data: true,
        error,
        code(cxt) {
          const { gen, schema, schemaCode, data, $data, it } = cxt;
          const { opts } = it;
          if (!$data && schema.length === 0)
            return;
          const useLoop = schema.length >= opts.loopRequired;
          if (it.allErrors)
            allErrorsMode();
          else
            exitOnErrorMode();
          if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
              if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
                const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
              }
            }
          }
          function allErrorsMode() {
            if (useLoop || $data) {
              cxt.block$data(codegen_1.nil, loopAllRequired);
            } else {
              for (const prop of schema) {
                (0, code_1.checkReportMissingProp)(cxt, prop);
              }
            }
          }
          function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
              const valid = gen.let("valid", true);
              cxt.block$data(valid, () => loopUntilMissing(missing, valid));
              cxt.ok(valid);
            } else {
              gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
              (0, code_1.reportMissingProp)(cxt, missing);
              gen.else();
            }
          }
          function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
              cxt.setParams({ missingProperty: prop });
              gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
          }
          function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
              gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.error();
                gen.break();
              });
            }, codegen_1.nil);
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js
  var require_limitItems = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message({ keyword, schemaCode }) {
          const comp = keyword === "maxItems" ? "more" : "fewer";
          return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
        },
        params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
      };
      var def = {
        keyword: ["maxItems", "minItems"],
        type: "array",
        schemaType: "number",
        $data: true,
        error,
        code(cxt) {
          const { keyword, data, schemaCode } = cxt;
          const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
          cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js
  var require_equal = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var equal = require_fast_deep_equal();
      equal.code = 'require("ajv/dist/runtime/equal").default';
      exports.default = equal;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
  var require_uniqueItems = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var dataType_1 = require_dataType();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
        params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
      };
      var def = {
        keyword: "uniqueItems",
        type: "array",
        schemaType: "boolean",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
          if (!$data && !schema)
            return;
          const valid = gen.let("valid");
          const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
          cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
          cxt.ok(valid);
          function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._)`${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
          }
          function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
          }
          function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._)`{}`);
            gen.for((0, codegen_1._)`;${i}--;`, () => {
              gen.let(item, (0, codegen_1._)`${data}[${i}]`);
              gen.if(wrongType, (0, codegen_1._)`continue`);
              if (itemTypes.length > 1)
                gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
              gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
                gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
                cxt.error();
                gen.assign(valid, false).break();
              }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
            });
          }
          function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
              cxt.error();
              gen.assign(valid, false).break(outer);
            })));
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js
  var require_const = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: "must be equal to constant",
        params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
      };
      var def = {
        keyword: "const",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schemaCode, schema } = cxt;
          if ($data || schema && typeof schema == "object") {
            cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
          } else {
            cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js
  var require_enum = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var equal_1 = require_equal();
      var error = {
        message: "must be equal to one of the allowed values",
        params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
      };
      var def = {
        keyword: "enum",
        schemaType: "array",
        $data: true,
        error,
        code(cxt) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
          const useLoop = schema.length >= it.opts.loopEnum;
          let eql;
          const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
          let valid;
          if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
          } else {
            if (!Array.isArray(schema))
              throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
          }
          cxt.pass(valid);
          function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
          }
          function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js
  var require_validation = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var limitNumber_1 = require_limitNumber();
      var multipleOf_1 = require_multipleOf();
      var limitLength_1 = require_limitLength();
      var pattern_1 = require_pattern();
      var limitProperties_1 = require_limitProperties();
      var required_1 = require_required();
      var limitItems_1 = require_limitItems();
      var uniqueItems_1 = require_uniqueItems();
      var const_1 = require_const();
      var enum_1 = require_enum();
      var validation = [
        // number
        limitNumber_1.default,
        multipleOf_1.default,
        // string
        limitLength_1.default,
        pattern_1.default,
        // object
        limitProperties_1.default,
        required_1.default,
        // array
        limitItems_1.default,
        uniqueItems_1.default,
        // any
        { keyword: "type", schemaType: ["string", "array"] },
        { keyword: "nullable", schemaType: "boolean" },
        const_1.default,
        enum_1.default
      ];
      exports.default = validation;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
  var require_additionalItems = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateAdditionalItems = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
        params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
      };
      var def = {
        keyword: "additionalItems",
        type: "array",
        schemaType: ["boolean", "object"],
        before: "uniqueItems",
        error,
        code(cxt) {
          const { parentSchema, it } = cxt;
          const { items } = parentSchema;
          if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
          }
          validateAdditionalItems(cxt, items);
        }
      };
      function validateAdditionalItems(cxt, items) {
        const { gen, schema, data, keyword, it } = cxt;
        it.items = true;
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        if (schema === false) {
          cxt.setParams({ len: items.length });
          cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
        } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
          const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
          gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
          cxt.ok(valid);
        }
        function validateItems(valid) {
          gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
              gen.if((0, codegen_1.not)(valid), () => gen.break());
          });
        }
      }
      exports.validateAdditionalItems = validateAdditionalItems;
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js
  var require_items = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateTuple = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      var def = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "array", "boolean"],
        before: "uniqueItems",
        code(cxt) {
          const { schema, it } = cxt;
          if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
          it.items = true;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          cxt.ok((0, code_1.validateArray)(cxt));
        }
      };
      function validateTuple(cxt, extraItems, schArr = cxt.schema) {
        const { gen, parentSchema, data, keyword, it } = cxt;
        checkStrictTuple(parentSchema);
        if (it.opts.unevaluated && schArr.length && it.items !== true) {
          it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
        }
        const valid = gen.name("valid");
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        schArr.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i
          }, valid));
          cxt.ok(valid);
        });
        function checkStrictTuple(sch) {
          const { opts, errSchemaPath } = it;
          const l = schArr.length;
          const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
          if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
          }
        }
      }
      exports.validateTuple = validateTuple;
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
  var require_prefixItems = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var items_1 = require_items();
      var def = {
        keyword: "prefixItems",
        type: "array",
        schemaType: ["array"],
        before: "uniqueItems",
        code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js
  var require_items2020 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      var additionalItems_1 = require_additionalItems();
      var error = {
        message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
        params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
      };
      var def = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        error,
        code(cxt) {
          const { schema, parentSchema, it } = cxt;
          const { prefixItems } = parentSchema;
          it.items = true;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
          else
            cxt.ok((0, code_1.validateArray)(cxt));
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js
  var require_contains = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
        params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
      };
      var def = {
        keyword: "contains",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, data, it } = cxt;
          let min;
          let max;
          const { minContains, maxContains } = parentSchema;
          if (it.opts.next) {
            min = minContains === void 0 ? 1 : minContains;
            max = maxContains;
          } else {
            min = 1;
          }
          const len = gen.const("len", (0, codegen_1._)`${data}.length`);
          cxt.setParams({ min, max });
          if (max === void 0 && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
          }
          if (max !== void 0 && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
          }
          if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._)`${len} >= ${min}`;
            if (max !== void 0)
              cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
          }
          it.items = true;
          const valid = gen.name("valid");
          if (max === void 0 && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
          } else if (min === 0) {
            gen.let(valid, true);
            if (max !== void 0)
              gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
          } else {
            gen.let(valid, false);
            validateItemsWithCount();
          }
          cxt.result(valid, () => cxt.reset());
          function validateItemsWithCount() {
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
          }
          function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
              cxt.subschema({
                keyword: "contains",
                dataProp: i,
                dataPropType: util_1.Type.Num,
                compositeRule: true
              }, _valid);
              block();
            });
          }
          function checkLimits(count) {
            gen.code((0, codegen_1._)`${count}++`);
            if (max === void 0) {
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
            } else {
              gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
              if (min === 1)
                gen.assign(valid, true);
              else
                gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js
  var require_dependencies = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var code_1 = require_code2();
      exports.error = {
        message: ({ params: { property, depsCount, deps } }) => {
          const property_ies = depsCount === 1 ? "property" : "properties";
          return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
        },
        params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
        // TODO change to reference
      };
      var def = {
        keyword: "dependencies",
        type: "object",
        schemaType: "object",
        error: exports.error,
        code(cxt) {
          const [propDeps, schDeps] = splitDependencies(cxt);
          validatePropertyDeps(cxt, propDeps);
          validateSchemaDeps(cxt, schDeps);
        }
      };
      function splitDependencies({ schema }) {
        const propertyDeps = {};
        const schemaDeps = {};
        for (const key in schema) {
          if (key === "__proto__")
            continue;
          const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
          deps[key] = schema[key];
        }
        return [propertyDeps, schemaDeps];
      }
      function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
        const { gen, data, it } = cxt;
        if (Object.keys(propertyDeps).length === 0)
          return;
        const missing = gen.let("missing");
        for (const prop in propertyDeps) {
          const deps = propertyDeps[prop];
          if (deps.length === 0)
            continue;
          const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
          cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", ")
          });
          if (it.allErrors) {
            gen.if(hasProperty, () => {
              for (const depProp of deps) {
                (0, code_1.checkReportMissingProp)(cxt, depProp);
              }
            });
          } else {
            gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
      }
      exports.validatePropertyDeps = validatePropertyDeps;
      function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        for (const prop in schemaDeps) {
          if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
          gen.if(
            (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
            () => {
              const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
              cxt.mergeValidEvaluated(schCxt, valid);
            },
            () => gen.var(valid, true)
            // TODO var
          );
          cxt.ok(valid);
        }
      }
      exports.validateSchemaDeps = validateSchemaDeps;
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
  var require_propertyNames = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: "property name must be valid",
        params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
      };
      var def = {
        keyword: "propertyNames",
        type: "object",
        schemaType: ["object", "boolean"],
        error,
        code(cxt) {
          const { gen, schema, data, it } = cxt;
          if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
          const valid = gen.name("valid");
          gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
              keyword: "propertyNames",
              data: key,
              dataTypes: ["string"],
              propertyName: key,
              compositeRule: true
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error(true);
              if (!it.allErrors)
                gen.break();
            });
          });
          cxt.ok(valid);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
  var require_additionalProperties = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var names_1 = require_names();
      var util_1 = require_util();
      var error = {
        message: "must NOT have additional properties",
        params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
      };
      var def = {
        keyword: "additionalProperties",
        type: ["object"],
        schemaType: ["boolean", "object"],
        allowUndefined: true,
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, data, errsCount, it } = cxt;
          if (!errsCount)
            throw new Error("ajv implementation error");
          const { allErrors, opts } = it;
          it.props = true;
          if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
          const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
          const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
          checkAdditionalProperties();
          cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
          function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
              if (!props.length && !patProps.length)
                additionalPropertyCode(key);
              else
                gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
          }
          function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
              const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
              definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            } else if (props.length) {
              definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
            } else {
              definedProp = codegen_1.nil;
            }
            if (patProps.length) {
              definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
          }
          function deleteAdditional(key) {
            gen.code((0, codegen_1._)`delete ${data}[${key}]`);
          }
          function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
              deleteAdditional(key);
              return;
            }
            if (schema === false) {
              cxt.setParams({ additionalProperty: key });
              cxt.error();
              if (!allErrors)
                gen.break();
              return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
              const valid = gen.name("valid");
              if (opts.removeAdditional === "failing") {
                applyAdditionalSchema(key, valid, false);
                gen.if((0, codegen_1.not)(valid), () => {
                  cxt.reset();
                  deleteAdditional(key);
                });
              } else {
                applyAdditionalSchema(key, valid);
                if (!allErrors)
                  gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            }
          }
          function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
              keyword: "additionalProperties",
              dataProp: key,
              dataPropType: util_1.Type.Str
            };
            if (errors === false) {
              Object.assign(subschema, {
                compositeRule: true,
                createErrors: false,
                allErrors: false
              });
            }
            cxt.subschema(subschema, valid);
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js
  var require_properties = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var validate_1 = require_validate();
      var code_1 = require_code2();
      var util_1 = require_util();
      var additionalProperties_1 = require_additionalProperties();
      var def = {
        keyword: "properties",
        type: "object",
        schemaType: "object",
        code(cxt) {
          const { gen, schema, parentSchema, data, it } = cxt;
          if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
          }
          const allProps = (0, code_1.allSchemaProperties)(schema);
          for (const prop of allProps) {
            it.definedProperties.add(prop);
          }
          if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
          }
          const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
          if (properties.length === 0)
            return;
          const valid = gen.name("valid");
          for (const prop of properties) {
            if (hasDefault(prop)) {
              applyPropertySchema(prop);
            } else {
              gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
              applyPropertySchema(prop);
              if (!it.allErrors)
                gen.else().var(valid, true);
              gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
          }
          function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
          }
          function applyPropertySchema(prop) {
            cxt.subschema({
              keyword: "properties",
              schemaProp: prop,
              dataProp: prop
            }, valid);
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
  var require_patternProperties = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var util_2 = require_util();
      var def = {
        keyword: "patternProperties",
        type: "object",
        schemaType: "object",
        code(cxt) {
          const { gen, schema, data, parentSchema, it } = cxt;
          const { opts } = it;
          const patterns = (0, code_1.allSchemaProperties)(schema);
          const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
          if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
            return;
          }
          const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
          const valid = gen.name("valid");
          if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
          }
          const { props } = it;
          validatePatternProperties();
          function validatePatternProperties() {
            for (const pat of patterns) {
              if (checkProperties)
                checkMatchingProperties(pat);
              if (it.allErrors) {
                validateProperties(pat);
              } else {
                gen.var(valid, true);
                validateProperties(pat);
                gen.if(valid);
              }
            }
          }
          function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
              if (new RegExp(pat).test(prop)) {
                (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
              }
            }
          }
          function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
              gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                const alwaysValid = alwaysValidPatterns.includes(pat);
                if (!alwaysValid) {
                  cxt.subschema({
                    keyword: "patternProperties",
                    schemaProp: pat,
                    dataProp: key,
                    dataPropType: util_2.Type.Str
                  }, valid);
                }
                if (it.opts.unevaluated && props !== true) {
                  gen.assign((0, codegen_1._)`${props}[${key}]`, true);
                } else if (!alwaysValid && !it.allErrors) {
                  gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
              });
            });
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js
  var require_not = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: "not",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        code(cxt) {
          const { gen, schema, it } = cxt;
          if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
          }
          const valid = gen.name("valid");
          cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, valid);
          cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
        },
        error: { message: "must NOT be valid" }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js
  var require_anyOf = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var code_1 = require_code2();
      var def = {
        keyword: "anyOf",
        schemaType: "array",
        trackErrors: true,
        code: code_1.validateUnion,
        error: { message: "must match a schema in anyOf" }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js
  var require_oneOf = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: "must match exactly one schema in oneOf",
        params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
      };
      var def = {
        keyword: "oneOf",
        schemaType: "array",
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, schema, parentSchema, it } = cxt;
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          if (it.opts.discriminator && parentSchema.discriminator)
            return;
          const schArr = schema;
          const valid = gen.let("valid", false);
          const passing = gen.let("passing", null);
          const schValid = gen.name("_valid");
          cxt.setParams({ passing });
          gen.block(validateOneOf);
          cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
          function validateOneOf() {
            schArr.forEach((sch, i) => {
              let schCxt;
              if ((0, util_1.alwaysValidSchema)(it, sch)) {
                gen.var(schValid, true);
              } else {
                schCxt = cxt.subschema({
                  keyword: "oneOf",
                  schemaProp: i,
                  compositeRule: true
                }, schValid);
              }
              if (i > 0) {
                gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
              }
              gen.if(schValid, () => {
                gen.assign(valid, true);
                gen.assign(passing, i);
                if (schCxt)
                  cxt.mergeEvaluated(schCxt, codegen_1.Name);
              });
            });
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js
  var require_allOf = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: "allOf",
        schemaType: "array",
        code(cxt) {
          const { gen, schema, it } = cxt;
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const valid = gen.name("valid");
          schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
              return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
          });
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js
  var require_if = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var util_1 = require_util();
      var error = {
        message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
        params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
      };
      var def = {
        keyword: "if",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        error,
        code(cxt) {
          const { gen, parentSchema, it } = cxt;
          if (parentSchema.then === void 0 && parentSchema.else === void 0) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
          }
          const hasThen = hasSchema(it, "then");
          const hasElse = hasSchema(it, "else");
          if (!hasThen && !hasElse)
            return;
          const valid = gen.let("valid", true);
          const schValid = gen.name("_valid");
          validateIf();
          cxt.reset();
          if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
          } else if (hasThen) {
            gen.if(schValid, validateClause("then"));
          } else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
          }
          cxt.pass(valid, () => cxt.error(true));
          function validateIf() {
            const schCxt = cxt.subschema({
              keyword: "if",
              compositeRule: true,
              createErrors: false,
              allErrors: false
            }, schValid);
            cxt.mergeEvaluated(schCxt);
          }
          function validateClause(keyword, ifClause) {
            return () => {
              const schCxt = cxt.subschema({ keyword }, schValid);
              gen.assign(valid, schValid);
              cxt.mergeValidEvaluated(schCxt, valid);
              if (ifClause)
                gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
              else
                cxt.setParams({ ifClause: keyword });
            };
          }
        }
      };
      function hasSchema(it, keyword) {
        const schema = it.schema[keyword];
        return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
      }
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js
  var require_thenElse = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var util_1 = require_util();
      var def = {
        keyword: ["then", "else"],
        schemaType: ["object", "boolean"],
        code({ keyword, parentSchema, it }) {
          if (parentSchema.if === void 0)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js
  var require_applicator = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var additionalItems_1 = require_additionalItems();
      var prefixItems_1 = require_prefixItems();
      var items_1 = require_items();
      var items2020_1 = require_items2020();
      var contains_1 = require_contains();
      var dependencies_1 = require_dependencies();
      var propertyNames_1 = require_propertyNames();
      var additionalProperties_1 = require_additionalProperties();
      var properties_1 = require_properties();
      var patternProperties_1 = require_patternProperties();
      var not_1 = require_not();
      var anyOf_1 = require_anyOf();
      var oneOf_1 = require_oneOf();
      var allOf_1 = require_allOf();
      var if_1 = require_if();
      var thenElse_1 = require_thenElse();
      function getApplicator(draft2020 = false) {
        const applicator = [
          // any
          not_1.default,
          anyOf_1.default,
          oneOf_1.default,
          allOf_1.default,
          if_1.default,
          thenElse_1.default,
          // object
          propertyNames_1.default,
          additionalProperties_1.default,
          dependencies_1.default,
          properties_1.default,
          patternProperties_1.default
        ];
        if (draft2020)
          applicator.push(prefixItems_1.default, items2020_1.default);
        else
          applicator.push(additionalItems_1.default, items_1.default);
        applicator.push(contains_1.default);
        return applicator;
      }
      exports.default = getApplicator;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js
  var require_format = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var error = {
        message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
        params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
      };
      var def = {
        keyword: "format",
        type: ["number", "string"],
        schemaType: "string",
        $data: true,
        error,
        code(cxt, ruleType) {
          const { gen, data, $data, schema, schemaCode, it } = cxt;
          const { opts, errSchemaPath, schemaEnv, self } = it;
          if (!opts.validateFormats)
            return;
          if ($data)
            validate$DataFormat();
          else
            validateFormat();
          function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
              ref: self.formats,
              code: opts.code.formats
            });
            const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
              if (opts.strictSchema === false)
                return codegen_1.nil;
              return (0, codegen_1._)`${schemaCode} && !${format}`;
            }
            function invalidFmt() {
              const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
              const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
              return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
          }
          function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
              unknownFormat();
              return;
            }
            if (formatDef === true)
              return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
              cxt.pass(validCondition());
            function unknownFormat() {
              if (opts.strictSchema === false) {
                self.logger.warn(unknownMsg());
                return;
              }
              throw new Error(unknownMsg());
              function unknownMsg() {
                return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
              }
            }
            function getFormat(fmtDef) {
              const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
              const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
              if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
              }
              return ["string", fmtDef, fmt];
            }
            function validCondition() {
              if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                if (!schemaEnv.$async)
                  throw new Error("async format in sync schema");
                return (0, codegen_1._)`await ${fmtRef}(${data})`;
              }
              return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js
  var require_format2 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var format_1 = require_format();
      var format = [format_1.default];
      exports.default = format;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js
  var require_metadata = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.contentVocabulary = exports.metadataVocabulary = void 0;
      exports.metadataVocabulary = [
        "title",
        "description",
        "default",
        "deprecated",
        "readOnly",
        "writeOnly",
        "examples"
      ];
      exports.contentVocabulary = [
        "contentMediaType",
        "contentEncoding",
        "contentSchema"
      ];
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js
  var require_draft7 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var core_1 = require_core2();
      var validation_1 = require_validation();
      var applicator_1 = require_applicator();
      var format_1 = require_format2();
      var metadata_1 = require_metadata();
      var draft7Vocabularies = [
        core_1.default,
        validation_1.default,
        (0, applicator_1.default)(),
        format_1.default,
        metadata_1.metadataVocabulary,
        metadata_1.contentVocabulary
      ];
      exports.default = draft7Vocabularies;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js
  var require_types = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiscrError = void 0;
      var DiscrError;
      (function(DiscrError2) {
        DiscrError2["Tag"] = "tag";
        DiscrError2["Mapping"] = "mapping";
      })(DiscrError || (exports.DiscrError = DiscrError = {}));
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js
  var require_discriminator = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      var codegen_1 = require_codegen();
      var types_1 = require_types();
      var compile_1 = require_compile();
      var ref_error_1 = require_ref_error();
      var util_1 = require_util();
      var error = {
        message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
        params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
      };
      var def = {
        keyword: "discriminator",
        type: "object",
        schemaType: "object",
        error,
        code(cxt) {
          const { gen, data, schema, parentSchema, it } = cxt;
          const { oneOf } = parentSchema;
          if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
          }
          const tagName = schema.propertyName;
          if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
          if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
          if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
          const valid = gen.let("valid", false);
          const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
          gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
          cxt.ok(valid);
          function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
              gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
              gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
          }
          function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
          }
          function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
              let sch = oneOf[i];
              if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
                const ref = sch.$ref;
                sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
                if (sch instanceof compile_1.SchemaEnv)
                  sch = sch.schema;
                if (sch === void 0)
                  throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
              }
              const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
              if (typeof propSch != "object") {
                throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
              }
              tagRequired = tagRequired && (topRequired || hasRequired(sch));
              addMappings(propSch, i);
            }
            if (!tagRequired)
              throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
              return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
              if (sch.const) {
                addMapping(sch.const, i);
              } else if (sch.enum) {
                for (const tagValue of sch.enum) {
                  addMapping(tagValue, i);
                }
              } else {
                throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
              }
            }
            function addMapping(tagValue, i) {
              if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                throw new Error(`discriminator: "${tagName}" values must be unique strings`);
              }
              oneOfMapping[tagValue] = i;
            }
          }
        }
      };
      exports.default = def;
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json
  var require_json_schema_draft_07 = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
      module.exports = {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://json-schema.org/draft-07/schema#",
        title: "Core schema meta-schema",
        definitions: {
          schemaArray: {
            type: "array",
            minItems: 1,
            items: { $ref: "#" }
          },
          nonNegativeInteger: {
            type: "integer",
            minimum: 0
          },
          nonNegativeIntegerDefault0: {
            allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
          },
          simpleTypes: {
            enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
          },
          stringArray: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            default: []
          }
        },
        type: ["object", "boolean"],
        properties: {
          $id: {
            type: "string",
            format: "uri-reference"
          },
          $schema: {
            type: "string",
            format: "uri"
          },
          $ref: {
            type: "string",
            format: "uri-reference"
          },
          $comment: {
            type: "string"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          default: true,
          readOnly: {
            type: "boolean",
            default: false
          },
          examples: {
            type: "array",
            items: true
          },
          multipleOf: {
            type: "number",
            exclusiveMinimum: 0
          },
          maximum: {
            type: "number"
          },
          exclusiveMaximum: {
            type: "number"
          },
          minimum: {
            type: "number"
          },
          exclusiveMinimum: {
            type: "number"
          },
          maxLength: { $ref: "#/definitions/nonNegativeInteger" },
          minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
          pattern: {
            type: "string",
            format: "regex"
          },
          additionalItems: { $ref: "#" },
          items: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
            default: true
          },
          maxItems: { $ref: "#/definitions/nonNegativeInteger" },
          minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
          uniqueItems: {
            type: "boolean",
            default: false
          },
          contains: { $ref: "#" },
          maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
          minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
          required: { $ref: "#/definitions/stringArray" },
          additionalProperties: { $ref: "#" },
          definitions: {
            type: "object",
            additionalProperties: { $ref: "#" },
            default: {}
          },
          properties: {
            type: "object",
            additionalProperties: { $ref: "#" },
            default: {}
          },
          patternProperties: {
            type: "object",
            additionalProperties: { $ref: "#" },
            propertyNames: { format: "regex" },
            default: {}
          },
          dependencies: {
            type: "object",
            additionalProperties: {
              anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
            }
          },
          propertyNames: { $ref: "#" },
          const: true,
          enum: {
            type: "array",
            items: true,
            minItems: 1,
            uniqueItems: true
          },
          type: {
            anyOf: [
              { $ref: "#/definitions/simpleTypes" },
              {
                type: "array",
                items: { $ref: "#/definitions/simpleTypes" },
                minItems: 1,
                uniqueItems: true
              }
            ]
          },
          format: { type: "string" },
          contentMediaType: { type: "string" },
          contentEncoding: { type: "string" },
          if: { $ref: "#" },
          then: { $ref: "#" },
          else: { $ref: "#" },
          allOf: { $ref: "#/definitions/schemaArray" },
          anyOf: { $ref: "#/definitions/schemaArray" },
          oneOf: { $ref: "#/definitions/schemaArray" },
          not: { $ref: "#" }
        },
        default: true
      };
    }
  });

  // .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/ajv.js
  var require_ajv = __commonJS({
    ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/ajv.js"(exports, module) {
      "use strict";
      init_define_COCOS_VERIFICATION_EVIDENCE();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
      var core_1 = require_core();
      var draft7_1 = require_draft7();
      var discriminator_1 = require_discriminator();
      var draft7MetaSchema = require_json_schema_draft_07();
      var META_SUPPORT_DATA = ["/properties"];
      var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
      var Ajv2 = class extends core_1.default {
        _addVocabularies() {
          super._addVocabularies();
          draft7_1.default.forEach((v) => this.addVocabulary(v));
          if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
        }
        _addDefaultMetaSchema() {
          super._addDefaultMetaSchema();
          if (!this.opts.meta)
            return;
          const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
          this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
          this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
        }
        defaultMeta() {
          return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
        }
      };
      exports.Ajv = Ajv2;
      module.exports = exports = Ajv2;
      module.exports.Ajv = Ajv2;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = Ajv2;
      var validate_1 = require_validate();
      Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
        return validate_1.KeywordCxt;
      } });
      var codegen_1 = require_codegen();
      Object.defineProperty(exports, "_", { enumerable: true, get: function() {
        return codegen_1._;
      } });
      Object.defineProperty(exports, "str", { enumerable: true, get: function() {
        return codegen_1.str;
      } });
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return codegen_1.stringify;
      } });
      Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
        return codegen_1.nil;
      } });
      Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
        return codegen_1.Name;
      } });
      Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
        return codegen_1.CodeGen;
      } });
      var validation_error_1 = require_validation_error();
      Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
        return validation_error_1.default;
      } });
      var ref_error_1 = require_ref_error();
      Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
        return ref_error_1.default;
      } });
    }
  });

  // packages/runtime3-bridge/src/bootstrap.ts
  var bootstrap_exports = {};
  __export(bootstrap_exports, {
    CocosMCP: () => CocosMCP,
    DevelopmentConnection: () => DevelopmentConnection
  });
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime3-bridge/src/index.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime3-bridge/src/feature-routes.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime3-bridge/src/graphics.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/contracts/src/index.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var CocosError = class _CocosError extends Error {
    constructor(code, message, details) {
      super(message);
      __publicField(this, "code", code);
      __publicField(this, "details", details);
      this.name = "CocosError";
    }
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
          } catch (e) {
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
      } catch (e) {
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
          rows.push({ kind: "added", path, after: right != null ? right : null });
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

  // packages/runtime3-bridge/src/access.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var RuntimePolicy = class {
    constructor(maxArguments = 32) {
      __publicField(this, "maxArguments", maxArguments);
      __publicField(this, "denied", /* @__PURE__ */ new Set([
        "eval",
        "Function",
        "constructor",
        "require",
        "import",
        "exec",
        "spawn",
        "fork",
        "kill",
        "exit",
        "destroyImmediate",
        "destroy",
        "destroyAllChildren",
        "removeFromParent",
        "removeAllChildren",
        "setParent"
      ]));
    }
    path(path) {
      let segments;
      try {
        segments = Json.safePath(path);
      } catch (error) {
        if (error instanceof CocosError && error.code === "INVALID_ARGUMENT") throw new CocosError("UNAUTHORIZED", "Runtime path is not exposed");
        throw error;
      }
      if (segments.some((segment) => segment.startsWith("_") || this.denied.has(segment))) throw new CocosError("UNAUTHORIZED", "Runtime path is not exposed");
      return segments;
    }
    method(method) {
      const segments = this.path(method);
      if (segments.length > 4 || segments.some((segment) => segment.includes(".."))) throw new CocosError("UNAUTHORIZED", "Runtime method path is not allowed");
      return segments;
    }
    arguments(args) {
      if (args.length > this.maxArguments) throw new CocosError("INVALID_ARGUMENT", `Runtime method accepts at most ${this.maxArguments} arguments`);
    }
  };
  var _RuntimeAccess = class _RuntimeAccess {
    /** System.import('cc') 使用公开 VERSION；ENGINE_VERSION 仅存在于旧版全局对象。 */
    static engineVersion(cc) {
      var _a, _b;
      return String((_b = (_a = cc.VERSION) != null ? _a : cc.ENGINE_VERSION) != null ? _b : "unknown");
    }
    /** 引擎延迟到帧末释放；isValid 属性在 destroy 已排队时仍可能为 true。 */
    static destroyOwned(cc, value) {
      const object = _RuntimeAccess.object(value);
      if (this.released.has(object) || object.isValid === false) return;
      if (typeof cc.isValid === "function" && _RuntimeAccess.call(cc, "isValid", object, true) === false) return;
      this.released.add(object);
      try {
        _RuntimeAccess.call(object, "destroy");
      } catch (error) {
        this.released.delete(object);
        throw error;
      }
    }
    static object(value, label = "object") {
      if (value === null || typeof value !== "object" && typeof value !== "function") throw new CocosError("NOT_FOUND", `${label} is unavailable`);
      return value;
    }
    static get(value, path) {
      let current = value;
      for (const key of Json.safePath(path)) current = _RuntimeAccess.object(current)[key];
      return current;
    }
    static call(value, method, ...args) {
      const owner = _RuntimeAccess.object(value);
      Json.safePath(method);
      const callable = owner[method];
      if (typeof callable !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", `Method is unavailable: ${method}`);
      return Reflect.apply(callable, owner, args);
    }
    static construct(value, args) {
      if (typeof value !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", "Type is not constructible");
      return _RuntimeAccess.object(Reflect.construct(value, args));
    }
    static propertyNames(value) {
      const names = /* @__PURE__ */ new Set();
      let current = _RuntimeAccess.object(value);
      while (current && current !== Object.prototype && current !== Function.prototype) {
        for (const name of Object.getOwnPropertyNames(current)) if (!name.startsWith("_") && !["constructor", "prototype", "caller", "callee", "arguments"].includes(name)) names.add(name);
        current = Object.getPrototypeOf(current);
      }
      return [...names].sort();
    }
    static descriptor(value, key) {
      let current = _RuntimeAccess.object(value);
      while (current && current !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(current, key);
        if (descriptor) return descriptor;
        current = Object.getPrototypeOf(current);
      }
      return void 0;
    }
    static uuid(value) {
      var _a, _b, _c;
      if (value === null || value === void 0) return "";
      const object = _RuntimeAccess.object(value);
      return String((_c = (_b = (_a = object.uuid) != null ? _a : object._uuid) != null ? _b : object._id) != null ? _c : "");
    }
    static safeData(value, depth = 0, seen = /* @__PURE__ */ new Set()) {
      if (value === null || value === void 0) return null;
      if (typeof value === "string" || typeof value === "boolean") return value;
      if (typeof value === "number") return Number.isFinite(value) ? value : String(value);
      if (typeof value !== "object") return String(value);
      const object = _RuntimeAccess.object(value);
      if (seen.has(value) || depth > 5) return { reference: _RuntimeAccess.uuid(value) || "[circular]" };
      seen.add(value);
      if (Array.isArray(value)) return value.map((entry) => _RuntimeAccess.safeData(entry, depth + 1, new Set(seen)));
      const result = {};
      for (const key of Object.keys(object)) {
        if (key.startsWith("_") || ["node", "parent", "children"].includes(key)) continue;
        const descriptor = Object.getOwnPropertyDescriptor(object, key);
        if (!descriptor || !("value" in descriptor) || typeof descriptor.value === "function") continue;
        result[key] = _RuntimeAccess.safeData(descriptor.value, depth + 1, new Set(seen));
      }
      return result;
    }
  };
  __publicField(_RuntimeAccess, "released", /* @__PURE__ */ new WeakSet());
  var RuntimeAccess = _RuntimeAccess;

  // packages/runtime3-bridge/src/graphics.ts
  var GraphicsInspector = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
    }
    number(value) {
      return typeof value === "number" && Number.isFinite(value) ? value : null;
    }
    execute(id, p) {
      if (!["runtime.graphics.inspect", "runtime.graphics.formats"].includes(id)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown graphics query");
      const root = RuntimeAccess.object(RuntimeAccess.object(this.cc.director).root, "render root"), device = RuntimeAccess.object(root.device, "graphics device"), gfx = RuntimeAccess.object(this.cc.gfx, "gfx module");
      if (id === "runtime.graphics.formats") {
        if (!Array.isArray(p.formats) || !p.formats.length || p.formats.length > 64 || new Set(p.formats).size !== p.formats.length) throw new CocosError("INVALID_ARGUMENT", "Provide 1\u201364 unique format names");
        const formats = RuntimeAccess.object(gfx.Format), bits = RuntimeAccess.object(gfx.FormatFeatureBit);
        const names = p.formats.map((name) => {
          if (typeof name !== "string" || !/^[A-Z][A-Z0-9_]*$/.test(name) || ["UNKNOWN", "COUNT"].includes(name) || !Object.hasOwn(formats, name) || !Number.isInteger(formats[name])) throw new CocosError("INVALID_ARGUMENT", `Unknown concrete gfx format: ${String(name)}`);
          return name;
        });
        return { rows: names.map((name) => {
          const flags = RuntimeAccess.call(device, "getFormatFeatures", formats[name]);
          if (typeof flags !== "number" || !Number.isInteger(flags) || flags < 0) throw new CocosError("CONTEXT_UNAVAILABLE", "Native format features unavailable");
          return { name, flags, supportedUsages: Object.entries(bits).filter(([key, bit]) => /^[A-Z]/.test(key) && typeof bit === "number" && bit > 0 && (flags & bit) === bit).map(([key]) => key) };
        }), scope: "engine-device-format-features", allocationVerified: false };
      }
      const caps = RuntimeAccess.object(device.capabilities), memory = RuntimeAccess.object(device.memoryStatus), features = RuntimeAccess.object(gfx.Feature), api = RuntimeAccess.object(gfx.API);
      const limits = {};
      for (const key of ["maxVertexAttributes", "maxVertexUniformVectors", "maxFragmentUniformVectors", "maxTextureUnits", "maxImageUnits", "maxVertexTextureUnits", "maxColorRenderTargets", "maxShaderStorageBufferBindings", "maxShaderStorageBlockSize", "maxUniformBufferBindings", "maxUniformBlockSize", "maxTextureSize", "maxCubeMapTextureSize", "maxArrayTextureLayers", "max3DTextureSize", "uboOffsetAlignment", "maxComputeSharedMemorySize", "maxComputeWorkGroupInvocations"]) limits[key] = this.number(caps[key]);
      return {
        backend: typeof api[String(device.gfxAPI)] === "string" ? String(api[String(device.gfxAPI)]) : "unknown",
        renderer: typeof device.renderer === "string" ? device.renderer : null,
        vendor: typeof device.vendor === "string" ? device.vendor : null,
        limits,
        features: Object.entries(features).filter(([name, value]) => name !== "COUNT" && /^[A-Z]/.test(name) && typeof value === "number").map(([name, value]) => {
          const supported = RuntimeAccess.call(device, "hasFeature", value);
          return { name, supported: typeof supported === "boolean" ? supported : null };
        }),
        memory: { bufferBytes: this.number(memory.bufferSize), textureBytes: this.number(memory.textureSize), scope: "engine-accounted-allocations", driverTotalBytes: null },
        counters: { drawCalls: this.number(device.numDrawCalls), instances: this.number(device.numInstances), triangles: this.number(device.numTris), scope: "currently-recorded-not-frame-synchronized" },
        backendVerified: false
      };
    }
  };

  // packages/runtime3-bridge/src/two-d-inspector.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime3-bridge/src/feature-support.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var FeatureSupport = class {
    static owns(id) {
      return /^(runtime\.)?(path|debug|animation_graph|sorting|postprocess|character|probe|ik|skinning)\./.test(id);
    }
    static unsupported(id, reason, details = {}) {
      return { supported: false, status: "unsupported", code: "UNSUPPORTED_CAPABILITY", capabilityId: id, reason, ...details };
    }
    static async run(id, version, action) {
      if (version !== "3.8.8") return this.unsupported(id, "\u5F53\u524D\u9002\u914D\u4EC5\u652F\u6301 Creator 3.8.8", { actualVersion: version, requiredVersion: "3.8.8" });
      try {
        return await action();
      } catch (error) {
        if (error instanceof CocosError && ["UNSUPPORTED_CAPABILITY", "UNSUPPORTED_VERSION"].includes(error.code)) return this.unsupported(id, error.message);
        throw error;
      }
    }
    static type(cc, path) {
      let current = cc;
      for (const key of path.split(".")) {
        if (!current || !["object", "function"].includes(typeof current)) return void 0;
        current = current[key];
      }
      return current;
    }
    static require(value, label) {
      if (!value || !["object", "function"].includes(typeof value)) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u7F3A\u5C11\u5F15\u64CE\u6A21\u5757\u6216\u63A5\u53E3\uFF1A${label}`);
      return RuntimeAccess.object(value);
    }
    static methods(value, names) {
      for (const name of names) if (typeof value[name] !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", `\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u63A5\u53E3\uFF1A${name}`);
    }
  };
  __publicField(FeatureSupport, "source", "https://github.com/cocos/cocos-engine/tree/411f98df047c25902f93440d4b22925c2fb65461");

  // packages/runtime3-bridge/src/ui.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/ui-core/src/index.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var import_ajv = __toESM(require_ajv(), 1);

  // packages/capability-catalog/src/schema.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Schema = class _Schema {
    static any() {
      return {};
    }
    static string(description) {
      return { type: "string", minLength: 1, ...description ? { description } : {} };
    }
    static number() {
      return { type: "number" };
    }
    static integer(minimum = 0) {
      return { type: "integer", minimum };
    }
    static boolean() {
      return { type: "boolean" };
    }
    static array(items = {}) {
      return { type: "array", items };
    }
    static enum(...values) {
      return { type: "string", enum: values };
    }
    static object(properties, required = []) {
      return { type: "object", properties, required, additionalProperties: false };
    }
    static record() {
      return { type: "object", additionalProperties: true };
    }
    static vector() {
      return _Schema.object({ x: _Schema.number(), y: _Schema.number(), z: _Schema.number() }, ["x", "y"]);
    }
  };

  // packages/ui-core/src/index.ts
  var _UiDocumentModel = class _UiDocumentModel {
    constructor() {
      __publicField(this, "validate", new import_ajv.Ajv({ strict: false, allErrors: true }).compile(_UiDocumentModel.schema));
    }
    /** Widget 切换对齐及像素/比例单位会换算偏移；依次设置对齐、单位、声明值，避免 JSON 字段顺序改变布局。 */
    static orderedProperties(properties) {
      const priority = (key) => key.startsWith("isAlign") ? 0 : key.startsWith("isAbsolute") ? 1 : 2;
      return Object.fromEntries(Object.entries(properties).sort(([a], [b]) => priority(a) - priority(b)));
    }
    parse(value) {
      var _a, _b, _c, _d;
      let bytes;
      try {
        bytes = JSON.stringify(value);
      } catch (e) {
        throw new CocosError("INVALID_ARGUMENT", "UI document must be JSON");
      }
      if (!bytes || bytes.length > 2e5) throw new CocosError("INVALID_ARGUMENT", "UI document exceeds 200000 characters");
      const pending = [{ value, depth: 0 }];
      while (pending.length) {
        const row = pending.pop();
        if (row.depth > 40) throw new CocosError("INVALID_ARGUMENT", "UI document nesting is too deep");
        if (row.value && typeof row.value === "object") for (const child of Object.values(row.value)) pending.push({ value: child, depth: row.depth + 1 });
      }
      if (!this.validate(value)) throw new CocosError("INVALID_ARGUMENT", "Invalid UI document", { errors: JSON.stringify(this.validate.errors) });
      const document = value, rows = [], keys = /* @__PURE__ */ new Set();
      const visit = (node, parentKey, depth) => {
        var _a2, _b2;
        if (depth > 16 || rows.length >= 200) throw new CocosError("INVALID_ARGUMENT", "UI tree is limited to 200 nodes and 16 levels");
        if (keys.has(node.key)) throw new CocosError("INVALID_ARGUMENT", `Duplicate UI key: ${node.key}`);
        keys.add(node.key);
        rows.push({ key: node.key, parentKey, node });
        const types = ((_a2 = node.components) != null ? _a2 : []).map((c) => c.type);
        if (new Set(types).size !== types.length) throw new CocosError("INVALID_ARGUMENT", `Duplicate component on ${node.key}`);
        if (types.filter((type) => ["cc.Sprite", "cc.Label", "cc.RichText"].includes(type)).length > 1) throw new CocosError("INVALID_ARGUMENT", "UI renderers require separate nodes");
        if (types.includes("cc.Button") && types.includes("cc.Toggle") || types.includes("cc.ScrollView") && types.includes("cc.PageView")) throw new CocosError("INVALID_ARGUMENT", "Do not combine a component with its subclass on the same node");
        if (types.includes("cc.Canvas") && parentKey !== null) throw new CocosError("INVALID_ARGUMENT", "Canvas must be the document root");
        for (const child of (_b2 = node.children) != null ? _b2 : []) visit(child, node.key, depth + 1);
      };
      visit(document.root, null, 1);
      for (const row of rows) for (const component of (_a = row.node.components) != null ? _a : []) for (const [property, value2] of Object.entries((_b = component.properties) != null ? _b : {})) {
        if (component.type === "cc.RichText" && property === "string" && /\bclick\s*=|<on\b/i.test(String(value2))) throw new CocosError("INVALID_ARGUMENT", "RichText inline callbacks are not supported; use explicit event bindings");
        if (value2 && typeof value2 === "object" && !Array.isArray(value2) && typeof value2.nodeKey === "string") {
          if (value2.componentType && !((_d = (_c = rows.find((r) => r.key === value2.nodeKey)) == null ? void 0 : _c.node.components) == null ? void 0 : _d.some((c) => c.type === value2.componentType))) throw new CocosError("INVALID_ARGUMENT", `Referenced UI component is absent: ${value2.nodeKey}.${value2.componentType}`);
          if (!keys.has(value2.nodeKey)) throw new CocosError("INVALID_ARGUMENT", `Unknown UI reference: ${value2.nodeKey}`);
          if (["cc.ScrollView", "cc.PageView"].includes(component.type) && property === "content") {
            let cursor = rows.find((r) => r.key === value2.nodeKey);
            while (cursor && cursor.parentKey !== row.key) cursor = rows.find((r) => r.key === cursor.parentKey);
            if (!cursor) throw new CocosError("INVALID_ARGUMENT", "ScrollView content must be a descendant");
          }
        }
      }
      return rows;
    }
  };
  __publicField(_UiDocumentModel, "ref", Schema.object({ nodeKey: Schema.string() }, ["nodeKey"]));
  __publicField(_UiDocumentModel, "componentRef", (type) => Schema.object({ nodeKey: Schema.string(), componentType: { const: type } }, ["nodeKey", "componentType"]));
  __publicField(_UiDocumentModel, "events", { type: "array", maxItems: 8, items: Schema.object({ componentId: Schema.string(), handler: { type: "string", pattern: "^[a-zA-Z][a-zA-Z0-9]{0,63}$" }, customEventData: { type: "string", maxLength: 1024 } }, ["componentId", "handler"]) });
  __publicField(_UiDocumentModel, "eventProperties", /* @__PURE__ */ new Set(["clickEvents", "checkEvents", "pageEvents", "editingDidBegan", "textChanged", "editingDidEnded", "editingReturn"]));
  __publicField(_UiDocumentModel, "asset", Schema.object({ assetUuid: Schema.string() }, ["assetUuid"]));
  __publicField(_UiDocumentModel, "number", { type: "number", minimum: -1e5, maximum: 1e5 });
  __publicField(_UiDocumentModel, "positive", { type: "number", minimum: 0, maximum: 1e5 });
  __publicField(_UiDocumentModel, "colorChannel", { type: "integer", minimum: 0, maximum: 255 });
  __publicField(_UiDocumentModel, "color", Schema.object({ r: _UiDocumentModel.colorChannel, g: _UiDocumentModel.colorChannel, b: _UiDocumentModel.colorChannel, a: _UiDocumentModel.colorChannel }, ["r", "g", "b", "a"]));
  __publicField(_UiDocumentModel, "alignment", { type: "integer", enum: [0, 1, 2] });
  __publicField(_UiDocumentModel, "direction", { type: "integer", enum: [0, 1] });
  __publicField(_UiDocumentModel, "widgetOffsets", {
    isAbsoluteTop: "top",
    isAbsoluteBottom: "bottom",
    isAbsoluteLeft: "left",
    isAbsoluteRight: "right",
    isAbsoluteHorizontalCenter: "horizontalCenter",
    isAbsoluteVerticalCenter: "verticalCenter",
    isAlignTop: "top",
    isAlignBottom: "bottom",
    isAlignLeft: "left",
    isAlignRight: "right",
    isAlignHorizontalCenter: "horizontalCenter",
    isAlignVerticalCenter: "verticalCenter"
  });
  __publicField(_UiDocumentModel, "size", Schema.object({ width: _UiDocumentModel.positive, height: _UiDocumentModel.positive }, ["width", "height"]));
  __publicField(_UiDocumentModel, "componentProperties", {
    "cc.SafeArea": {},
    "cc.BlockInputEvents": {},
    "cc.UIOpacity": { opacity: { type: "number", minimum: 0, maximum: 255 } },
    "cc.UITransform": { contentSize: _UiDocumentModel.size, anchorPoint: Schema.object({ x: { type: "number", minimum: 0, maximum: 1 }, y: { type: "number", minimum: 0, maximum: 1 } }, ["x", "y"]) },
    "cc.Canvas": { alignCanvasWithScreen: Schema.boolean() },
    "cc.Sprite": { color: _UiDocumentModel.color, spriteFrame: _UiDocumentModel.asset, sizeMode: { type: "integer", enum: [0, 1, 2] }, type: { type: "integer", enum: [0, 1, 2, 3] } },
    "cc.Label": {
      color: _UiDocumentModel.color,
      horizontalAlign: _UiDocumentModel.alignment,
      verticalAlign: _UiDocumentModel.alignment,
      spacingX: _UiDocumentModel.number,
      string: { type: "string", maxLength: 1e4 },
      fontSize: _UiDocumentModel.positive,
      lineHeight: _UiDocumentModel.positive,
      font: _UiDocumentModel.asset,
      useSystemFont: Schema.boolean(),
      overflow: { type: "integer", enum: [0, 1, 2, 3] },
      enableWrapText: Schema.boolean()
    },
    "cc.Button": {
      interactable: Schema.boolean(),
      transition: { type: "integer", enum: [0, 1, 2, 3] },
      target: _UiDocumentModel.ref,
      normalColor: _UiDocumentModel.color,
      pressedColor: _UiDocumentModel.color,
      hoverColor: _UiDocumentModel.color,
      disabledColor: _UiDocumentModel.color,
      duration: { type: "number", minimum: 0, maximum: 60 },
      zoomScale: _UiDocumentModel.positive,
      clickEvents: _UiDocumentModel.events
    },
    "cc.Layout": {
      startAxis: _UiDocumentModel.direction,
      horizontalDirection: _UiDocumentModel.direction,
      verticalDirection: _UiDocumentModel.direction,
      affectedByScale: Schema.boolean(),
      type: { type: "integer", enum: [0, 1, 2, 3] },
      resizeMode: { type: "integer", enum: [0, 1, 2] },
      spacingX: _UiDocumentModel.number,
      spacingY: _UiDocumentModel.number,
      paddingLeft: _UiDocumentModel.positive,
      paddingRight: _UiDocumentModel.positive,
      paddingTop: _UiDocumentModel.positive,
      paddingBottom: _UiDocumentModel.positive,
      cellSize: _UiDocumentModel.size
    },
    "cc.Widget": {
      isAbsoluteTop: Schema.boolean(),
      isAbsoluteBottom: Schema.boolean(),
      isAbsoluteLeft: Schema.boolean(),
      isAbsoluteRight: Schema.boolean(),
      isAbsoluteHorizontalCenter: Schema.boolean(),
      isAbsoluteVerticalCenter: Schema.boolean(),
      isAlignTop: Schema.boolean(),
      isAlignBottom: Schema.boolean(),
      isAlignLeft: Schema.boolean(),
      isAlignRight: Schema.boolean(),
      isAlignHorizontalCenter: Schema.boolean(),
      isAlignVerticalCenter: Schema.boolean(),
      top: _UiDocumentModel.number,
      bottom: _UiDocumentModel.number,
      left: _UiDocumentModel.number,
      right: _UiDocumentModel.number,
      horizontalCenter: _UiDocumentModel.number,
      verticalCenter: _UiDocumentModel.number,
      alignMode: { type: "integer", enum: [0, 1, 2] }
    },
    "cc.ScrollView": { content: _UiDocumentModel.ref, horizontal: Schema.boolean(), vertical: Schema.boolean(), elastic: Schema.boolean(), inertia: Schema.boolean(), brake: { type: "number", minimum: 0, maximum: 1 } },
    "cc.Toggle": { interactable: Schema.boolean(), checkMark: _UiDocumentModel.componentRef("cc.Sprite"), checkEvents: _UiDocumentModel.events },
    "cc.EditBox": { string: { type: "string", maxLength: 1e4 }, placeholder: { type: "string", maxLength: 1e3 }, textLabel: _UiDocumentModel.componentRef("cc.Label"), placeholderLabel: _UiDocumentModel.componentRef("cc.Label"), backgroundImage: _UiDocumentModel.asset, maxLength: { type: "integer", minimum: 0, maximum: 1e4 }, tabIndex: { type: "integer", minimum: 0, maximum: 1e3 }, editingDidBegan: _UiDocumentModel.events, textChanged: _UiDocumentModel.events, editingDidEnded: _UiDocumentModel.events, editingReturn: _UiDocumentModel.events },
    "cc.PageView": { content: _UiDocumentModel.ref, direction: { type: "integer", enum: [0, 1] }, sizeMode: { type: "integer", enum: [0, 1] }, scrollThreshold: { type: "number", minimum: 0, maximum: 1 }, pageTurningSpeed: { type: "number", minimum: 0, maximum: 60 }, pageEvents: _UiDocumentModel.events },
    "cc.RichText": { horizontalAlign: _UiDocumentModel.alignment, string: { type: "string", maxLength: 1e4 }, fontSize: _UiDocumentModel.positive, lineHeight: _UiDocumentModel.positive, maxWidth: _UiDocumentModel.positive, useSystemFont: Schema.boolean(), font: _UiDocumentModel.asset },
    "cc.Mask": { type: { type: "integer", enum: [0, 1, 2, 3] }, inverted: Schema.boolean() }
  });
  __publicField(_UiDocumentModel, "schema", {
    ...Schema.object({ version: { const: 1 }, root: { $ref: "#/$defs/node" } }, ["version", "root"]),
    $defs: { node: Schema.object({
      key: { type: "string", pattern: "^[a-zA-Z][a-zA-Z0-9_-]{0,63}$" },
      name: { type: "string", minLength: 1, maxLength: 128 },
      position: Schema.object({ x: _UiDocumentModel.number, y: _UiDocumentModel.number, z: _UiDocumentModel.number }, ["x", "y", "z"]),
      components: { type: "array", maxItems: 13, items: { oneOf: Object.entries(_UiDocumentModel.componentProperties).map(([type, properties]) => Schema.object({ type: { const: type }, properties: Schema.object(properties) }, ["type"])) } },
      children: { type: "array", maxItems: 200, items: { $ref: "#/$defs/node" } }
    }, ["key", "name"]) }
  });
  var UiDocumentModel = _UiDocumentModel;

  // packages/runtime3-bridge/src/ui.ts
  var UiInspector = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    get cc() {
      return this.inspector.environment.cc;
    }
    preflight(p, update = false) {
      var _a, _b, _c, _d;
      const rows = new UiDocumentModel().parse(p.document);
      const root = update ? this.inspector.node(Json.string(p.rootId, "rootId")) : null;
      const parent = root ? RuntimeAccess.object(root.parent) : this.inspector.node(Json.string(p.parentId, "parentId"));
      if (!update && parent.children.some((node) => node.name === rows[0].node.name)) throw new CocosError("RESOURCE_BUSY", "UI root name already exists under this parent");
      for (const row of rows) for (const spec of [{ type: "cc.UITransform", properties: {} }, ...(_a = row.node.components) != null ? _a : []]) {
        const type = this.cc[spec.type.slice(3)];
        if (typeof type !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", `Creator module unavailable: ${spec.type}`);
        const constructor = RuntimeAccess.object(type), prototype = RuntimeAccess.object(constructor.prototype), props = (_b = constructor.__props__) != null ? _b : [];
        for (const key of Object.keys((_c = spec.properties) != null ? _c : {})) if (!(key in prototype) && !props.includes(key)) throw new CocosError("UNSUPPORTED_CAPABILITY", `Native UI property unavailable: ${spec.type}.${key}`);
        for (const key of UiDocumentModel.eventProperties) if ((_d = spec.properties) == null ? void 0 : _d[key]) this.eventBindings({ events: spec.properties[key] });
      }
      if (update) for (const row of rows) {
        const mapping = p.mapping.find((value) => value.key === row.key);
        if (!mapping) throw new CocosError("INVALID_ARGUMENT", "Missing UI mapping");
        const node = this.inspector.node(String(mapping.nodeId));
        if (node.parent && RuntimeAccess.object(node.parent).children.some((sibling) => sibling !== node && sibling.name === row.node.name)) throw new CocosError("RESOURCE_BUSY", `UI name conflicts with a sibling: ${row.node.name}`);
      }
      return { valid: true, parentId: RuntimeAccess.uuid(parent), nodeCount: rows.length };
    }
    eventBindings(p) {
      if (!Array.isArray(p.events) || p.events.length > 8) throw new CocosError("INVALID_ARGUMENT", "At most eight UI event bindings are allowed");
      return p.events.map((value) => {
        var _a;
        const event = Json.object(value), component = this.inspector.component(Json.string(event.componentId, "componentId"));
        const siblings = this.inspector.components(RuntimeAccess.object(component.node)).filter((candidate) => this.inspector.type(candidate) === this.inspector.type(component));
        if (siblings.length !== 1) throw new CocosError("AMBIGUOUS_TARGET", "UI event target must have exactly one component of its type on the node");
        const handler = Json.string(event.handler, "handler");
        if (!/^[a-zA-Z][a-zA-Z0-9]{0,63}$/.test(handler) || ["constructor", "destroy", "destroyImmediate"].includes(handler) || typeof component[handler] !== "function") throw new CocosError("INVALID_ARGUMENT", "UI callback must name an existing public method");
        return { target: { uuid: RuntimeAccess.uuid(component.node) }, component: this.inspector.type(component), handler, customEventData: String((_a = event.customEventData) != null ? _a : "") };
      });
    }
    snapshot(p) {
      const root = this.inspector.node(Json.string(p.rootId, "rootId"));
      if (!this.inspector.environment.serialize) throw new CocosError("CONTEXT_UNAVAILABLE", "Editor serializer is required for guarded UI builds");
      return Json.value(this.inspector.environment.serialize(root));
    }
    transform(node) {
      const result = RuntimeAccess.call(node, "getComponent", this.cc.UITransform);
      return result ? RuntimeAccess.object(result) : null;
    }
    nodes(p) {
      const nodes = this.inspector.all(this.inspector.node(Json.string(p.rootId, "rootId")));
      if (nodes.length > 1e3) throw new CocosError("INVALID_ARGUMENT", "Inspect a subtree of at most 1000 nodes");
      return nodes;
    }
    layout(p) {
      const rows = [], diagnostics = [];
      for (const node of this.nodes(p)) {
        const transform = this.transform(node);
        if (!transform) continue;
        const size = RuntimeAccess.object(transform.contentSize), anchor = RuntimeAccess.object(transform.anchorPoint), width = Number(size.width), height = Number(size.height);
        const left = -Number(anchor.x) * width, bottom = -Number(anchor.y) * height;
        const corners = [[left, bottom], [left + width, bottom], [left + width, bottom + height], [left, bottom + height]].map(([x, y]) => RuntimeAccess.object(RuntimeAccess.call(transform, "convertToWorldSpaceAR", RuntimeAccess.construct(this.cc.Vec3, [x, y, 0]))));
        const nodeId = RuntimeAccess.uuid(node), xs = corners.map((v) => Number(v.x)), ys = corners.map((v) => Number(v.y));
        if (width <= 0 || height <= 0) diagnostics.push({ code: "ZERO_SIZE", nodeId });
        const parentTransform = node.parent ? this.transform(RuntimeAccess.object(node.parent)) : null;
        if (parentTransform) {
          const parentSize = RuntimeAccess.object(parentTransform.contentSize), parentAnchor = RuntimeAccess.object(parentTransform.anchorPoint);
          const x = -Number(parentAnchor.x) * Number(parentSize.width), y = -Number(parentAnchor.y) * Number(parentSize.height);
          const local = corners.map((corner) => RuntimeAccess.object(RuntimeAccess.call(parentTransform, "convertToNodeSpaceAR", corner)));
          if (local.some((point) => Number(point.x) < x - 0.01 || Number(point.y) < y - 0.01 || Number(point.x) > x + Number(parentSize.width) + 0.01 || Number(point.y) > y + Number(parentSize.height) + 0.01)) diagnostics.push({ code: "OUTSIDE_PARENT", nodeId, severity: "warning", message: "\u6EDA\u52A8\u5185\u5BB9\u6216\u88C5\u9970\u53EF\u6709\u610F\u8D85\u51FA\u7236\u8FB9\u754C\uFF0C\u9700\u7ED3\u5408\u7528\u9014\u5BA1\u67E5" });
        }
        rows.push({ nodeId, name: String(node.name), activeInHierarchy: Boolean(node.activeInHierarchy), size: { width, height }, corners: corners.map((c) => ({ x: Number(c.x), y: Number(c.y), z: Number(c.z) })), bounds: { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) } });
      }
      return { rows, diagnostics, scope: "current-scene-geometry", limitations: ["\u672A\u6A21\u62DF\u591A\u5206\u8FA8\u7387", "\u4E0D\u5224\u65AD\u76F8\u673A\u3001Mask\u3001\u906E\u6321\u6216\u50CF\u7D20\u53EF\u89C1\u6027\uFF1B\u5E03\u5C40\u5C1A\u672A\u5237\u65B0\u65F6\u8BFB\u5230\u7684\u662F\u5F53\u524D\u503C"] };
    }
    inspectEvents(component, property) {
      const value = component[property];
      if (!Array.isArray(value)) return [];
      if (value.length > 128) throw new CocosError("INVALID_ARGUMENT", "UI event list exceeds 128 bindings");
      return value.map((value2) => {
        var _a, _b;
        if (!value2 || typeof value2 !== "object") return { property, valid: false, reason: "malformed-event" };
        const event = RuntimeAccess.object(value2), target = event.target, handler = String((_a = event.handler) != null ? _a : "");
        let type = String((_b = event.component) != null ? _b : ""), valid = false;
        try {
          if (event._componentId) {
            const resolved = RuntimeAccess.call(this.cc.js, "getClassById", event._componentId);
            type = resolved ? this.inspector.type(resolved) : "";
          }
          if (target && type && handler && !handler.startsWith("_") && !["constructor", "destroy", "destroyImmediate", "prototype"].includes(handler)) {
            const script = RuntimeAccess.call(target, "getComponent", type);
            valid = Boolean(script && typeof RuntimeAccess.object(script)[handler] === "function" && RuntimeAccess.object(script).isValid !== false && RuntimeAccess.object(target).isValid !== false);
          }
        } catch (e) {
          valid = false;
        }
        return { property, targetNodeId: target ? RuntimeAccess.uuid(target) : null, component: type, handler, valid };
      });
    }
    interaction(p) {
      var _a;
      const rows = [], diagnostics = [];
      const eventFields = { "cc.Button": ["clickEvents"], "cc.Toggle": ["checkEvents"], "cc.PageView": ["pageEvents"], "cc.EditBox": ["editingDidBegan", "textChanged", "editingDidEnded", "editingReturn"] };
      for (const node of this.nodes(p)) for (const component of this.inspector.components(node)) {
        const type = this.inspector.type(component), nodeId = RuntimeAccess.uuid(node), componentId = RuntimeAccess.uuid(component);
        const fields = eventFields[type];
        if (fields) {
          const events = fields.flatMap((property) => this.inspectEvents(component, property));
          if (!events.length && type === "cc.Button") diagnostics.push({ code: "NO_PERSISTED_CLICK_HANDLER", nodeId, componentId, message: "\u8FD0\u884C\u65F6\u811A\u672C\u53EF\u80FD\u53E6\u884C\u6CE8\u518C\u76D1\u542C\uFF0C\u672C\u68C0\u67E5\u65E0\u6CD5\u8BC1\u660E\u6309\u94AE\u65E0\u884C\u4E3A" });
          for (const event of events) if (!event.valid) diagnostics.push({ code: type === "cc.Button" ? "INVALID_CLICK_HANDLER" : "INVALID_UI_EVENT_HANDLER", nodeId, componentId, property: event.property });
          rows.push({ nodeId, componentId, type, enabled: Boolean(component.enabledInHierarchy), interactable: typeof component.interactable === "boolean" ? component.interactable : null, events });
        }
        if (type === "cc.EditBox") {
          for (const property of ["textLabel", "placeholderLabel"]) {
            const label = component[property];
            if (label && (typeof this.cc.Label !== "function" || !(label instanceof this.cc.Label) || RuntimeAccess.object(label).isValid === false)) diagnostics.push({ code: "INVALID_EDITBOX_LABEL", nodeId, componentId, property });
          }
          if (!component.textLabel) diagnostics.push({ code: "MISSING_EDITBOX_TEXT_LABEL", nodeId, componentId });
        }
        if (type === "cc.ScrollView" || type === "cc.PageView") {
          const content = component.content;
          const valid = Boolean(content && this.inspector.all(node).includes(RuntimeAccess.object(content)) && content !== node && RuntimeAccess.object(content).isValid !== false);
          if (!valid) diagnostics.push({ code: "INVALID_SCROLL_CONTENT", nodeId, componentId });
          const row = { nodeId, componentId, type, contentNodeId: content ? RuntimeAccess.uuid(content) : null, contentValid: valid, horizontal: Boolean(component.horizontal), vertical: Boolean(component.vertical) };
          if (type === "cc.PageView") {
            const pages = RuntimeAccess.call(component, "getPages");
            if (!Array.isArray(pages) || pages.length > 1e3) throw new CocosError("INVALID_ARGUMENT", "PageView must have a bounded native page list");
            row.pageNodeIds = pages.map((page) => RuntimeAccess.uuid(page));
            if (!pages.length) diagnostics.push({ code: "EMPTY_PAGEVIEW", nodeId, componentId });
            const seen = /* @__PURE__ */ new Set();
            for (const page of pages) {
              if (!page || !content || RuntimeAccess.object(page).parent !== content || RuntimeAccess.object(page).isValid === false || seen.has(page)) diagnostics.push({ code: "INVALID_PAGEVIEW_PAGE", nodeId, componentId, pageNodeId: page ? RuntimeAccess.uuid(page) : null });
              seen.add(page);
            }
          }
          rows.push(row);
        }
        if (type === "cc.RichText") {
          const inline = /\bclick\s*=|<on\b/i.test(String((_a = component.string) != null ? _a : ""));
          if (inline) diagnostics.push({ code: "RICHTEXT_INLINE_EVENT_REQUIRES_REVIEW", nodeId, componentId, message: "\u5DF2\u6709\u5BCC\u6587\u672C\u56DE\u8C03\u9700\u8981\u4EBA\u5DE5\u5BA1\u67E5\uFF1B\u9759\u6001\u68C0\u67E5\u4E0D\u6267\u884C\u5B57\u7B26\u4E32\u4E2D\u7684\u4E8B\u4EF6" });
          rows.push({ nodeId, componentId, type, enabled: Boolean(component.enabledInHierarchy), hasInlineEvent: inline });
        }
      }
      return { rows, diagnostics, scope: "static-interaction-configuration", runtimeClickVerified: false, limitations: ["\u4E0D\u9A8C\u8BC1\u7126\u70B9\u3001\u8F93\u5165\u6CD5\u3001\u906E\u6321\u548C\u771F\u5B9E\u56DE\u8C03", "PageView \u53EA\u8BFB\u68C0\u67E5\u5DF2\u6709\u9875\u9762\u5217\u8868\uFF0C\u4E0D\u81EA\u52A8\u589E\u5220\u9875\u9762"] };
    }
  };

  // packages/runtime3-bridge/src/two-d-inspector.ts
  var TwoDInspector = class {
    constructor(scene) {
      __publicField(this, "scene", scene);
    }
    get cc() {
      return this.scene.environment.cc;
    }
    nodes(p) {
      const nodes = this.scene.all(this.scene.node(Json.string(p.rootId, "rootId")));
      if (nodes.length > 1e3) throw new CocosError("INVALID_ARGUMENT", "2D inspection is limited to 1000 nodes");
      return nodes;
    }
    sprite(frame) {
      var _a, _b, _c;
      const texture = frame.texture ? RuntimeAccess.object(frame.texture) : void 0;
      const sampler = texture && typeof texture.getSamplerInfo === "function" ? RuntimeAccess.object(RuntimeAccess.call(texture, "getSamplerInfo")) : void 0;
      const manager = this.cc.dynamicAtlasManager ? RuntimeAccess.object(this.cc.dynamicAtlasManager) : void 0;
      const rect = RuntimeAccess.object((_a = frame.rect) != null ? _a : {}), filter = RuntimeAccess.object((_c = RuntimeAccess.object((_b = this.cc.gfx) != null ? _b : {}).Filter) != null ? _c : {});
      const reasons = [];
      if (!(manager == null ? void 0 : manager.enabled)) reasons.push("DYNAMIC_ATLAS_DISABLED");
      if (!frame.packable) reasons.push("NOT_PACKABLE");
      if (frame.original) reasons.push("ALREADY_PACKED");
      if (!sampler || filter.LINEAR === void 0 || filter.NONE === void 0) reasons.push("SAMPLER_SUPPORT_UNKNOWN");
      else if (sampler.minFilter !== filter.LINEAR || sampler.magFilter !== filter.LINEAR || sampler.mipFilter !== filter.NONE) reasons.push("SAMPLER_INCOMPATIBLE");
      if (manager && (Number(rect.width) > Number(manager.maxFrameSize) || Number(rect.height) > Number(manager.maxFrameSize))) reasons.push("FRAME_TOO_LARGE");
      return {
        uuid: RuntimeAccess.uuid(frame),
        textureUuid: texture ? RuntimeAccess.uuid(texture) : null,
        rect: RuntimeAccess.safeData(frame.rect),
        originalSize: RuntimeAccess.safeData(frame.originalSize),
        offset: RuntimeAccess.safeData(frame.offset),
        rotated: Boolean(frame.rotated),
        packable: Boolean(frame.packable),
        borders: { left: Number(frame.insetLeft), right: Number(frame.insetRight), top: Number(frame.insetTop), bottom: Number(frame.insetBottom) },
        sampler: sampler ? RuntimeAccess.safeData(sampler) : null,
        atlasCandidate: reasons.length === 0,
        reasons,
        limitations: ["\u5019\u9009\u6761\u4EF6\u4E0D\u8BC1\u660E\u5DF2\u5165\u56FE\u96C6\u6216\u53EF\u5408\u6279\uFF1B\u4FDD\u7559\u50CF\u7D20\u98CE\u91C7\u6837\uFF0C\u4E0D\u81EA\u52A8\u6539\u4E3A\u7EBF\u6027"]
      };
    }
    execute(id, p) {
      var _a, _b;
      if (id === "runtime.ui.assert") {
        const nodes = new Map(this.nodes(p).map((node) => [RuntimeAccess.uuid(node), node]));
        if (!Array.isArray(p.rows) || !p.rows.length || p.rows.length > 100) throw new CocosError("INVALID_ARGUMENT", "Expected 1..100 UI assertions");
        const rows2 = p.rows.map((value) => {
          const expected = Json.object(value), nodeId = Json.string(expected.nodeId, "nodeId"), node = nodes.get(nodeId);
          if (!node) return { nodeId, passed: false, reason: "NODE_NOT_IN_SUBTREE" };
          const components = this.scene.components(node), label = components.find((c) => this.scene.type(c) === "cc.Label"), button = components.find((c) => this.scene.type(c) === "cc.Button");
          const actual = { active: Boolean(node.activeInHierarchy), text: label ? String(label.string) : null, interactable: button ? Boolean(button.interactable) : null };
          const checks = Object.keys(expected).filter((key) => key !== "nodeId");
          if (!checks.length || checks.some((key) => !["active", "text", "interactable"].includes(key))) throw new CocosError("INVALID_ARGUMENT", "Assertion must specify supported state fields");
          return { nodeId, passed: checks.every((key) => actual[key] === expected[key]), expected, actual };
        });
        return { passed: rows2.every((row) => row.passed), rows: rows2, scope: "current-runtime-state", pixelVisibilityVerified: false };
      }
      if (id === "runtime.ui.hit_test") {
        const x = Number(p.x), y = Number(p.y);
        if (![x, y].every(Number.isFinite)) throw new CocosError("INVALID_ARGUMENT", "Screen coordinates must be finite");
        const rows2 = [];
        for (const node of this.nodes(p)) {
          const transform = RuntimeAccess.call(node, "getComponent", FeatureSupport.require(this.cc.UITransform, "UITransform"));
          if (!transform) continue;
          const active = Boolean(node.activeInHierarchy), hit = active && Boolean(RuntimeAccess.call(transform, "hitTest", RuntimeAccess.construct(this.cc.Vec2, [x, y]), Number((_a = p.windowId) != null ? _a : 0)));
          const components = this.scene.components(node);
          rows2.push({
            nodeId: RuntimeAccess.uuid(node),
            name: String(node.name),
            active,
            hit,
            layer: Number(node.layer),
            interactable: components.filter((c) => typeof c.interactable === "boolean").map((c) => ({ componentId: RuntimeAccess.uuid(c), type: this.scene.type(c), enabled: Boolean(c.enabledInHierarchy), interactable: Boolean(c.interactable) })),
            blocksInput: components.some((c) => this.scene.type(c) === "cc.BlockInputEvents" && c.enabledInHierarchy)
          });
        }
        return { rows: rows2, coordinateSpace: "engine-screen", actualReceiverVerified: false, limitations: ["\u8C03\u7528\u539F\u751F hitTest\uFF0C\u5305\u542B\u76F8\u673A\u4E0E Mask\uFF1B\u7ED3\u679C\u4E0D\u662F\u4E8B\u4EF6\u5206\u53D1\u987A\u5E8F\uFF0C\u4E5F\u4E0D\u8BC1\u660E\u50CF\u7D20\u53EF\u89C1\u6216\u4E1A\u52A1\u56DE\u8C03\u6210\u529F"] };
      }
      if (id === "runtime.ui.inspect") return { layout: new UiInspector(this.scene).layout(p), interaction: new UiInspector(this.scene).interaction(p) };
      if (id === "runtime.atlas.inspect") {
        const manager = FeatureSupport.require(this.cc.dynamicAtlasManager, "dynamicAtlasManager");
        return {
          enabled: Boolean(manager.enabled),
          textureSize: Number(manager.textureSize),
          maxFrameSize: Number(manager.maxFrameSize),
          maxAtlasCount: Number(manager.maxAtlasCount),
          atlasCount: typeof manager.atlasCount === "number" ? manager.atlasCount : null,
          scope: "public-manager-state",
          mutatesPacking: false
        };
      }
      const rows = [], diagnostics = [];
      let previous;
      for (const node of this.nodes(p)) for (const component of this.scene.components(node)) {
        const type = this.scene.type(component), nodeId = RuntimeAccess.uuid(node), componentId = RuntimeAccess.uuid(component);
        if (type === "cc.Sprite" && component.spriteFrame && id !== "runtime.label.audit") {
          const frame = RuntimeAccess.object(component.spriteFrame), material = RuntimeAccess.call(component, "getRenderMaterial", 0);
          const reasons = [];
          if (previous) {
            if (previous.texture !== frame.texture) reasons.push("TEXTURE_CHANGED");
            if (previous.material !== material) reasons.push("MATERIAL_INSTANCE_CHANGED");
            if (previous.layer !== node.layer) reasons.push("LAYER_CHANGED");
          }
          rows.push({ nodeId, componentId, type, active: Boolean(component.enabledInHierarchy), spriteFrame: this.sprite(frame) });
          if (reasons.length) diagnostics.push({ nodeId, previousNodeId: previous.nodeId, reasons, evidence: "hierarchy-candidate" });
          previous = { nodeId, texture: frame.texture, material, layer: node.layer };
        } else if (type === "cc.Label") {
          rows.push({ nodeId, componentId, type, cacheMode: Number(component.cacheMode), overflow: Number(component.overflow), fontSize: Number(component.fontSize), textLength: String((_b = component.string) != null ? _b : "").length });
          diagnostics.push({ nodeId, code: "CACHE_POLICY_REVIEW", message: "\u9759\u6001\u6587\u672C\u4E0E\u9891\u7E41\u66F4\u65B0\u6587\u672C\u5206\u522B\u8BC4\u4F30 BITMAP/CHAR\uFF1B\u4E0D\u81EA\u52A8\u66F4\u6362\u7F13\u5B58\u7B56\u7565" });
          previous = void 0;
        } else if (type === "cc.Mask") {
          diagnostics.push({ nodeId, componentId, code: "STENCIL_BOUNDARY", evidence: "component-configuration" });
          previous = void 0;
        } else if (typeof component.getRenderMaterial === "function") previous = void 0;
      }
      return {
        rows,
        diagnostics,
        scope: "static-2d-render-candidates",
        drawCallReductionVerified: false,
        limitations: ["\u672A\u8BFB\u53D6\u79C1\u6709\u6279\u6B21\u6570\u636E\uFF1B\u672A\u628A\u904D\u5386\u987A\u5E8F\u5F53\u4F5C\u771F\u5B9E\u63D0\u4EA4\u987A\u5E8F\uFF1B\u7F13\u51B2\u533A\u3001Sorting2D\u3001\u591A\u76F8\u673A\u548C\u539F\u751F\u6E32\u67D3\u9700\u5355\u72EC\u5B9E\u6D4B"]
      };
    }
  };

  // packages/runtime3-bridge/src/path.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var PathSampler = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
    }
    sample(p) {
      var _a, _b;
      const geometry = FeatureSupport.require(this.cc.geometry, "geometry"), splineType = FeatureSupport.require(geometry.Spline, "Spline");
      FeatureSupport.methods(splineType, ["create"]);
      FeatureSupport.require(this.cc.Vec3, "Vec3");
      const modes = { linear: 0, bezier: 1, catmull_rom: 2 }, mode = String((_a = p.mode) != null ? _a : "catmull_rom");
      const points = p.points;
      if (!Object.hasOwn(modes, mode) || !Array.isArray(points) || points.length < 2 || points.length > 256 || mode === "bezier" && points.length % 4 !== 0) throw new CocosError("INVALID_ARGUMENT", "\u8DEF\u5F84\u9700 2..256 \u4E2A\u63A7\u5236\u70B9\uFF1B\u8D1D\u585E\u5C14\u70B9\u6570\u4E3A 4 \u7684\u500D\u6570");
      const knots = points.map((point) => {
        const v = Json.object(point);
        if (["x", "y", "z"].some((key) => typeof v[key] !== "number" || !Number.isFinite(v[key]) || Math.abs(v[key]) > 1e5)) throw new CocosError("INVALID_ARGUMENT", "\u63A7\u5236\u70B9\u5750\u6807\u65E0\u6548");
        return RuntimeAccess.construct(this.cc.Vec3, [v.x, v.y, v.z]);
      });
      const count = Number((_b = p.samples) != null ? _b : 60);
      if (!Number.isInteger(count) || count < 2 || count > 1e3) throw new CocosError("INVALID_ARGUMENT", "samples \u5FC5\u987B\u4E3A 2..1000");
      const spline = RuntimeAccess.call(splineType, "create", modes[mode], knots);
      const denseCount = p.uniformSpeed === true ? Math.min(8192, Math.max(1024, points.length * 32)) : count;
      const dense = [];
      for (let i = 0; i < denseCount; i++) {
        const t = i / (denseCount - 1), v = RuntimeAccess.object(RuntimeAccess.call(spline, "getPoint", t));
        const x = Number(v.x), y = Number(v.y), z = Number(v.z), previous = dense[dense.length - 1];
        if (![x, y, z].every(Number.isFinite)) throw new CocosError("CONTEXT_UNAVAILABLE", "\u5F15\u64CE\u8FD4\u56DE\u65E0\u6548\u8DEF\u5F84\u91C7\u6837");
        dense.push({ x, y, z, t, distance: previous ? previous.distance + Math.hypot(x - previous.x, y - previous.y, z - previous.z) : 0 });
      }
      const length = dense[dense.length - 1].distance;
      let cursor = 1;
      const rows = Array.from({ length: count }, (_, index) => {
        const fraction = index / (count - 1);
        if (p.uniformSpeed !== true || length === 0) {
          const v2 = RuntimeAccess.object(RuntimeAccess.call(spline, "getPoint", fraction));
          return { fraction, parameter: fraction, position: { x: Number(v2.x), y: Number(v2.y), z: Number(v2.z) } };
        }
        const distance = fraction * length;
        while (cursor < dense.length - 1 && dense[cursor].distance < distance) cursor++;
        const a = dense[cursor - 1], b = dense[cursor], ratio = b.distance === a.distance ? 0 : (distance - a.distance) / (b.distance - a.distance);
        const parameter = a.t + (b.t - a.t) * ratio, v = RuntimeAccess.object(RuntimeAccess.call(spline, "getPoint", parameter));
        return { fraction, parameter, position: { x: Number(v.x), y: Number(v.y), z: Number(v.z) } };
      });
      return { supported: true, rows, approximateLength: length, lengthSamples: denseCount, coordinateSpace: "local-to-animation-target-parent", uniformSpeed: p.uniformSpeed === true, speedAccuracy: "sampled-approximation" };
    }
    clip(p) {
      var _a;
      const sampled = this.sample(p), duration = Number(p.duration);
      if (!Number.isFinite(duration) || duration <= 0 || duration > 600) throw new CocosError("INVALID_ARGUMENT", "duration \u5FC5\u987B\u5927\u4E8E 0 \u4E14\u4E0D\u8D85\u8FC7 600");
      return { name: Json.string(p.name, "name"), duration, tracks: [{ path: String((_a = p.targetPath) != null ? _a : ""), property: "position", keys: sampled.rows.map((row) => ({ time: Number(row.fraction) * duration, value: row.position, interpolation: "linear" })) }] };
    }
    execute(id, p) {
      return id === "path.clip_document" ? this.clip(p) : this.sample(p);
    }
  };

  // packages/runtime3-bridge/src/skinning-compatibility.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var SkinningCompatibility = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    plan(p) {
      var _a;
      const cc = this.inspector.environment.cc;
      const type = RuntimeAccess.call(FeatureSupport.require(cc.js, "class registry"), "getClassByName", "cc.SkinnedMeshBatchRenderer");
      FeatureSupport.require(type, "SkinnedMeshBatchRenderer");
      if (typeof type !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5408\u6279\u7C7B\u578B\u4E0D\u53EF\u6784\u9020");
      for (const key of ["mesh", "skeleton"]) {
        const setter = (_a = Object.getOwnPropertyDescriptor(type.prototype, key)) == null ? void 0 : _a.set;
        if (!setter) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u7F3A\u5C11\u53EF\u9A8C\u8BC1\u7684\u5408\u6279 ${key} setter`);
        const source = Function.prototype.toString.call(setter);
        if (new RegExp(`\\bthis\\.${key}\\s*=`).test(source) || new RegExp(`\\bthis\\[['"]${key}['"]\\]\\s*=`).test(source)) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u5F53\u524D\u5F15\u64CE\u5408\u6279 ${key} setter \u5B58\u5728\u9012\u5F52\u7F16\u8BD1\u7F3A\u9677\uFF1B\u9700\u8981\u4FEE\u590D\u5F15\u64CE\u7F16\u8BD1\u4EA7\u7269\u540E\u518D\u89C4\u5212`);
      }
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (!(component instanceof type)) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u4E0D\u662F SkinnedMeshBatchRenderer");
      const units = component.units;
      if (!Array.isArray(units) || units.length < 2 || units.length > 6) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u5DF2\u9A8C\u8BC1\u7684\u5408\u6279\u6750\u8D28\u6A21\u677F\u8981\u6C42 2..6 \u4E2A\u5355\u5143");
      const root = FeatureSupport.require(component.skinningRoot, "skinningRoot");
      const skeleton = FeatureSupport.require(units[0].skeleton, "shared skeleton");
      const rows = units.map((unit, index) => {
        FeatureSupport.require(unit.mesh, `mesh ${index}`);
        FeatureSupport.require(unit.material, `material ${index}`);
        if (unit.skeleton !== skeleton) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5408\u6279\u5355\u5143\u5FC5\u987B\u5171\u4EAB\u540C\u4E00\u9AA8\u67B6");
        const mesh = RuntimeAccess.object(unit.mesh), structure = FeatureSupport.require(mesh.struct, "mesh struct");
        const primitives = structure.primitives;
        if (!Array.isArray(primitives) || primitives.length !== 1) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u89C4\u5212\u4EC5\u652F\u6301\u5355\u5B50\u7F51\u683C\u5355\u5143");
        return { index, meshUuid: RuntimeAccess.uuid(mesh), materialUuid: RuntimeAccess.uuid(unit.material) };
      });
      const material = FeatureSupport.require(RuntimeAccess.call(component, "getSharedMaterial", 0), "batch material");
      return { supported: true, componentId: RuntimeAccess.uuid(component), skinningRootId: RuntimeAccess.uuid(root), skeletonUuid: RuntimeAccess.uuid(skeleton), materialUuid: RuntimeAccess.uuid(material), rows, executionPerformed: false, visualVerified: false, performanceVerified: false };
    }
  };

  // packages/runtime3-bridge/src/animation-graph.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var AnimationGraphObserver = class {
    constructor(inspector, frames) {
      __publicField(this, "inspector", inspector);
      __publicField(this, "frames", frames);
    }
    state(value) {
      if (!value) return null;
      const state = RuntimeAccess.object(value);
      return { progress: RuntimeAccess.safeData(state.progress), stateId: typeof state.__DEBUG_ID__ === "string" ? state.__DEBUG_ID__ : null };
    }
    component(p) {
      const type = FeatureSupport.require(FeatureSupport.type(this.inspector.environment.cc, "animation.AnimationController"), "animation.AnimationController");
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (typeof type !== "function" || !(component instanceof type)) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u4E0D\u662F AnimationController");
      FeatureSupport.methods(component, ["getVariables", "getValue", "getCurrentStateStatus", "getCurrentTransition", "getCurrentClipStatuses", "getNextStateStatus", "getLayerWeight"]);
      if (!component.graph) throw new CocosError("UNSUPPORTED_CAPABILITY", "AnimationController \u672A\u914D\u7F6E\u52A8\u753B\u56FE");
      if (!component.enabledInHierarchy) throw new CocosError("CONTEXT_UNAVAILABLE", "\u52A8\u753B\u63A7\u5236\u5668\u672A\u6FC0\u6D3B");
      if ("_graphEval" in component && !component._graphEval) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u52A8\u753B\u56FE\u5C1A\u672A\u5EFA\u7ACB\u53EF\u7528\u7684\u8FD0\u884C\u65F6\u6C42\u503C\u5668");
      return component;
    }
    snapshot(component, layer) {
      if (component.isValid === false) throw new CocosError("STALE_HANDLE", "\u52A8\u753B\u63A7\u5236\u5668\u5DF2\u9500\u6BC1");
      const graph = RuntimeAccess.object(component.graph), layers = graph.layers;
      if (!Array.isArray(layers)) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u52A8\u753B\u56FE\u4E0D\u63D0\u4F9B\u53EF\u9A8C\u8BC1\u7684\u5C42\u5217\u8868");
      if (!Number.isInteger(layer) || layer < 0 || layer >= layers.length) throw new CocosError("INVALID_ARGUMENT", "\u52A8\u753B\u5C42\u7D22\u5F15\u8D8A\u754C");
      const variables = Array.from(RuntimeAccess.call(component, "getVariables"));
      if (variables.length > 256) throw new CocosError("RESOURCE_BUSY", "\u52A8\u753B\u53D8\u91CF\u8D85\u8FC7 256 \u9879");
      return {
        layer,
        variables: variables.map(([name, spec]) => ({ name, definition: RuntimeAccess.safeData(spec), value: RuntimeAccess.safeData(RuntimeAccess.call(component, typeof component.getValue_experimental === "function" ? "getValue_experimental" : "getValue", name)) })),
        current: this.state(RuntimeAccess.call(component, "getCurrentStateStatus", layer)),
        next: this.state(RuntimeAccess.call(component, "getNextStateStatus", layer)),
        transition: RuntimeAccess.safeData(RuntimeAccess.call(component, "getCurrentTransition", layer)),
        weight: RuntimeAccess.safeData(RuntimeAccess.call(component, "getLayerWeight", layer)),
        clips: Array.from(RuntimeAccess.call(component, "getCurrentClipStatuses", layer)).slice(0, 64).map((row) => ({ uuid: row.clip ? RuntimeAccess.uuid(row.clip) : null, weight: RuntimeAccess.safeData(row.weight) }))
      };
    }
    async execute(id, p) {
      var _a, _b;
      const component = this.component(p), layer = Number((_a = p.layer) != null ? _a : 0), before = this.snapshot(component, layer);
      if (id.endsWith(".inspect")) return { supported: true, ...before };
      if (id.endsWith(".set_parameter")) {
        FeatureSupport.methods(component, ["setValue"]);
        const name = Json.string(p.name, "name");
        const row = before.variables.find((row2) => row2.name === name);
        if (!row) throw new CocosError("INVALID_ARGUMENT", "\u52A8\u753B\u53D8\u91CF\u4E0D\u5B58\u5728");
        if (typeof p.value !== typeof row.value || !["number", "boolean"].includes(typeof p.value) || typeof p.value === "number" && !Number.isFinite(p.value)) throw new CocosError("INVALID_ARGUMENT", "\u52A8\u753B\u53C2\u6570\u7C7B\u578B\u4E0D\u5339\u914D");
        const integerType = FeatureSupport.type(this.inspector.environment.cc, "animation.VariableType.INTEGER");
        if (integerType !== void 0 && Json.object(row.definition).type === integerType && !Number.isInteger(p.value)) throw new CocosError("INVALID_ARGUMENT", "\u6574\u6570\u52A8\u753B\u53C2\u6570\u4E0D\u80FD\u63A5\u53D7\u5C0F\u6570");
        try {
          RuntimeAccess.call(component, "setValue", name, p.value);
          return { supported: true, before, after: this.snapshot(component, layer), eventsReversible: false };
        } catch (error) {
          throw new CocosError("OUTCOME_UNKNOWN", "\u52A8\u753B\u53C2\u6570\u53EF\u80FD\u5DF2\u4FEE\u6539\uFF0C\u8BF7\u67E5\u8BE2\u72B6\u6001\u540E\u518D\u64CD\u4F5C", { cause: CocosError.from(error).message });
        }
      }
      const count = Number((_b = p.frames) != null ? _b : 60), token = this.frames.token(), rows = [], started = performance.now();
      if (!Number.isInteger(count) || count < 1 || count > 300) throw new CocosError("INVALID_ARGUMENT", "frames \u5FC5\u987B\u4E3A 1..300");
      for (let frame = 0; frame < count; frame++) {
        if (performance.now() - started > 15e3) throw new CocosError("CONTEXT_UNAVAILABLE", "\u52A8\u753B\u91C7\u6837\u8D85\u8FC7 15 \u79D2");
        await this.frames.wait(token);
        const snapshot = this.snapshot(component, layer);
        rows.push({ frame, ...snapshot });
        if (id.endsWith(".assert") && snapshot.current) {
          if (Json.object(snapshot.current).stateId === null) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u6784\u5EFA\u672A\u63D0\u4F9B\u72B6\u6001\u8C03\u8BD5\u6807\u8BC6\uFF0C\u65E0\u6CD5\u6309\u540D\u79F0\u65AD\u8A00");
          if (Json.object(snapshot.current).stateId === p.stateId) return { supported: true, matched: true, rows };
        }
      }
      return { supported: true, rows, ...id.endsWith(".assert") ? { matched: false, reason: "\u76EE\u6807\u72B6\u6001\u672A\u5728\u9650\u5B9A\u5E27\u5185\u51FA\u73B0\uFF1B\u72B6\u6001\u6807\u8BC6\u4F9D\u8D56\u5F15\u64CE\u8C03\u8BD5\u4FE1\u606F" } : {} };
    }
  };

  // packages/runtime3-bridge/src/engine-inspector.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var EngineFeatureInspector = class {
    constructor(inspector, frames) {
      __publicField(this, "inspector", inspector);
      __publicField(this, "frames", frames);
    }
    get cc() {
      return this.inspector.environment.cc;
    }
    postprocess(p) {
      const state = this.inspect("postprocess", p), root = FeatureSupport.require(RuntimeAccess.object(this.cc.director).root, "render root");
      if (root.usesCustomPipeline !== true) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u8FD0\u884C\u65F6\u672A\u4F7F\u7528\u81EA\u5B9A\u4E49\u540E\u5904\u7406\u7BA1\u7EBF");
      const camera = this.inspector.component(Json.string(p.cameraComponentId, "cameraComponentId"));
      const cameraType = this.cc.Camera;
      if (typeof cameraType !== "function" || !(camera instanceof cameraType)) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u4E0D\u662F Camera");
      const native = FeatureSupport.require(camera.camera, "active camera");
      if (native.usePostProcess !== true) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u76EE\u6807\u76F8\u673A\u672A\u5F00\u542F\u540E\u5904\u7406");
      const setting = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (!setting.enabledInHierarchy) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u76EE\u6807\u540E\u5904\u7406\u7EC4\u4EF6\u672A\u6FC0\u6D3B");
      let selected = native.postProcess;
      if (!selected) {
        const postType = RuntimeAccess.call(this.cc.js, "getClassByName", "cc.PostProcess");
        const all = postType ? RuntimeAccess.object(postType).all : void 0;
        if (Array.isArray(all)) {
          for (const post2 of all) if (RuntimeAccess.object(post2).global) selected = post2;
        }
      }
      const post = FeatureSupport.require(selected, "camera post-process settings");
      FeatureSupport.methods(post, ["getSetting"]);
      if (RuntimeAccess.call(post, "getSetting", setting.constructor) !== setting) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u76F8\u673A\u5F53\u524D\u6CA1\u6709\u4F7F\u7528\u76EE\u6807\u540E\u5904\u7406\u7EC4\u4EF6");
      const rendering = FeatureSupport.require(this.cc.rendering, "rendering");
      FeatureSupport.methods(rendering, ["getCustomPipeline"]);
      const name = FeatureSupport.require(this.cc.macro, "macro").CUSTOM_PIPELINE_NAME;
      const builder = FeatureSupport.require(RuntimeAccess.call(rendering, "getCustomPipeline", name), "active pipeline builder");
      FeatureSupport.methods(builder, ["getCameraPasses"]);
      const passes = RuntimeAccess.call(builder, "getCameraPasses", native);
      if (!Array.isArray(passes) || passes.length > 64) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u7BA1\u7EBF Pass \u5217\u8868\u4E0D\u53EF\u9A8C\u8BC1");
      const expected = { "cc.Bloom": "BloomPass", "cc.FXAA": "FxaaPass", "cc.ColorGrading": "ColorGradingPass" };
      const pass = expected[String(state.type)];
      if (!passes.some((entry) => entry.name === pass)) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u76EE\u6807\u76F8\u673A\u7684\u7BA1\u7EBF\u672A\u5305\u542B ${pass}`);
      return { ...state, cameraComponentId: RuntimeAccess.uuid(camera), pipelineName: String(name), rows: passes.map((entry) => ({ name: String(entry.name) })), pipelineVerified: true, visualVerified: false };
    }
    inspect(family, p) {
      const names = { sorting: ["cc.Sorting2D"], postprocess: ["cc.Bloom", "cc.FXAA", "cc.ColorGrading"], probe: ["cc.LightProbeGroup"], character: ["cc.CapsuleCharacterController", "cc.BoxCharacterController"], skinning: ["cc.SkinnedMeshBatchRenderer"], ik: ["cc.animation.AnimationController", "cc.AnimationController"] };
      const expected = names[family];
      if (!expected) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u672A\u77E5\u5F15\u64CE\u529F\u80FD");
      const js = FeatureSupport.require(this.cc.js, "class registry");
      FeatureSupport.methods(js, ["getClassByName"]);
      const types = expected.map((name) => RuntimeAccess.call(js, "getClassByName", name)).filter((type) => typeof type === "function");
      if (!types.length) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u5F53\u524D\u5DE5\u7A0B\u672A\u542F\u7528 ${expected.join("/")}`);
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (!types.some((type) => component instanceof type)) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u7EC4\u4EF6\u7C7B\u578B\u4E0D\u5339\u914D");
      if (family === "character") {
        FeatureSupport.methods(component, ["move", "getMask", "getGroup"]);
        const physics = FeatureSupport.require(this.cc.PhysicsSystem, "PhysicsSystem"), instance = FeatureSupport.require(physics.instance, "active PhysicsSystem");
        if (instance.enable === false || !component._cct || component._isInitialized !== true) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u7269\u7406\u540E\u7AEF\u672A\u521D\u59CB\u5316\u89D2\u8272\u63A7\u5236\u5668");
      }
      const fields = { sorting: ["sortingLayer", "sortingOrder"], postprocess: ["enabled", "threshold", "iterations", "intensity", "contribute"], probe: ["probes", "minPos", "maxPos", "nProbesX", "nProbesY", "nProbesZ"], character: ["enabledInHierarchy", "stepOffset", "slopeLimit", "skinWidth", "isGrounded", "velocity", "centerWorldPosition"], skinning: ["atlasSize", "batchableTextureNames", "units"], ik: ["enabledInHierarchy"] };
      const properties = {};
      for (const key of fields[family]) if (key in component) {
        if (key === "units") {
          const units = component.units;
          if (!Array.isArray(units) || units.length > 128) throw new CocosError("RESOURCE_BUSY", "\u5408\u6279\u5355\u5143\u8D85\u8FC7\u68C0\u67E5\u9884\u7B97");
          properties.units = units.map((value) => {
            const unit = RuntimeAccess.object(value);
            return { meshUuid: unit.mesh ? RuntimeAccess.uuid(unit.mesh) : null, skeletonUuid: unit.skeleton ? RuntimeAccess.uuid(unit.skeleton) : null, materialUuid: unit.material ? RuntimeAccess.uuid(unit.material) : null, offset: RuntimeAccess.safeData(unit.offset), size: RuntimeAccess.safeData(unit.size) };
          });
        } else {
          if (Array.isArray(component[key]) && component[key].length > 4096) throw new CocosError("RESOURCE_BUSY", "\u7EC4\u4EF6\u6570\u7EC4\u8D85\u8FC7\u68C0\u67E5\u9884\u7B97");
          properties[key] = RuntimeAccess.safeData(component[key]);
        }
      }
      return {
        supported: true,
        componentId: RuntimeAccess.uuid(component),
        type: this.inspector.type(component),
        properties,
        visualVerified: false,
        ...family === "postprocess" ? { pipelineVerified: false, scope: "existing-setting-configuration" } : {},
        ...family === "ik" ? { scope: "controller-module-only", graphAuthoringSupported: false } : {},
        ...family === "skinning" ? { scope: "existing-batch-component", optimizationVerified: false } : {}
      };
    }
    probePoints(p) {
      var _a, _b;
      this.inspect("probe", p);
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      const probes = component.probes;
      if (!Array.isArray(probes) || !probes.length) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u63A2\u9488\u7EC4\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u70B9");
      const offset = Number((_a = p.offset) != null ? _a : 0), limit = Number((_b = p.limit) != null ? _b : 256);
      if (!Number.isInteger(offset) || offset < 0 || offset >= probes.length || !Number.isInteger(limit) || limit < 1 || limit > 256) throw new CocosError("INVALID_ARGUMENT", "\u63A2\u9488\u9884\u89C8\u5206\u9875\u8303\u56F4\u65E0\u6548");
      const vector = FeatureSupport.require(this.cc.Vec3, "Vec3");
      FeatureSupport.methods(vector, ["transformMat4"]);
      const node = FeatureSupport.require(component.node, "probe node"), matrix = FeatureSupport.require(node.worldMatrix, "probe world matrix");
      const rows = probes.slice(offset, offset + limit).map((value) => {
        const point = RuntimeAccess.object(value);
        if (["x", "y", "z"].some((axis) => typeof point[axis] !== "number" || !Number.isFinite(point[axis]))) throw new CocosError("INVALID_ARGUMENT", "\u63A2\u9488\u5750\u6807\u65E0\u6548");
        const v = RuntimeAccess.construct(vector, [point.x, point.y, point.z]);
        return RuntimeAccess.safeData(RuntimeAccess.call(vector, "transformMat4", v, v, matrix));
      });
      return { rows, total: probes.length, offset, nextOffset: offset + rows.length < probes.length ? offset + rows.length : null, coordinateSpace: "world", bakeVerified: false };
    }
    generate(p) {
      if (p.method === "adaptive") throw new CocosError("UNSUPPORTED_CAPABILITY", "3.8.8 \u81EA\u9002\u5E94\u5E03\u70B9\u4ECD\u4E3A\u5747\u5300\u7B97\u6CD5\u5360\u4F4D\u5B9E\u73B0");
      const min = Json.object(p.min), max = Json.object(p.max), counts = Json.object(p.counts), axes = ["x", "y", "z"];
      for (const axis of axes) if (typeof min[axis] !== "number" || typeof max[axis] !== "number" || !Number.isFinite(min[axis]) || !Number.isFinite(max[axis]) || Number(min[axis]) >= Number(max[axis]) || !Number.isInteger(counts[axis]) || Number(counts[axis]) < 2 || Number(counts[axis]) > 32) throw new CocosError("INVALID_ARGUMENT", "\u63A2\u9488\u8303\u56F4\u548C\u6570\u91CF\u65E0\u6548");
      const total = Number(counts.x) * Number(counts.y) * Number(counts.z);
      if (total > 4096) throw new CocosError("INVALID_ARGUMENT", "\u63A2\u9488\u6570\u91CF\u8D85\u8FC7 4096");
      const rows = [];
      for (let x = 0; x < Number(counts.x); x++) for (let y = 0; y < Number(counts.y); y++) for (let z = 0; z < Number(counts.z); z++) rows.push(Object.fromEntries(axes.map((axis, i) => [axis, Number(min[axis]) + (Number(max[axis]) - Number(min[axis])) * [x, y, z][i] / (Number(counts[axis]) - 1)])));
      return { supported: true, rows, method: "uniform", coordinateSpace: "probe-group-local", bakeVerified: false };
    }
    async route(p) {
      var _a;
      const before = this.inspect("character", p), component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (!component.enabledInHierarchy) throw new CocosError("CONTEXT_UNAVAILABLE", "\u89D2\u8272\u63A7\u5236\u5668\u672A\u6FC0\u6D3B");
      if (!this.frames) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u901A\u884C\u6D4B\u8BD5\u9700\u8981\u8FD0\u884C\u65F6\u5E27\u4F1A\u8BDD");
      FeatureSupport.require(this.cc.Vec3, "Vec3");
      if (!Array.isArray(p.movements) || !p.movements.length || p.movements.length > 120) throw new CocosError("INVALID_ARGUMENT", "\u4F4D\u79FB\u5E8F\u5217\u5FC5\u987B\u4E3A 1..120 \u9879");
      const movements = p.movements.map((value) => {
        const v = Json.object(value);
        if (["x", "y", "z"].some((key) => typeof v[key] !== "number" || !Number.isFinite(v[key]) || Math.abs(Number(v[key])) > 10)) throw new CocosError("INVALID_ARGUMENT", "\u5355\u5E27\u5404\u8F74\u4F4D\u79FB\u4E0D\u5F97\u8D85\u8FC7 10");
        return RuntimeAccess.construct(this.cc.Vec3, [v.x, v.y, v.z]);
      });
      const token = this.frames.token(), rows = [], started = performance.now();
      FeatureSupport.methods(component, ["on", "off"]);
      const events = [], listeners = [];
      let active = true, droppedEvents = 0, frame = -1;
      const cleanupErrors = [];
      const expected = p.expectedEnd ? Json.object(p.expectedEnd) : void 0, tolerance = Number((_a = p.tolerance) != null ? _a : 0.05);
      if (!Number.isFinite(tolerance) || tolerance <= 0 || tolerance > 10 || expected && ["x", "y", "z"].some((axis) => typeof expected[axis] !== "number" || !Number.isFinite(expected[axis]))) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u4F4D\u7F6E\u6216\u5BB9\u5DEE\u65E0\u6548");
      await this.frames.wait(token);
      try {
        for (const name of ["onControllerColliderHit", "onControllerTriggerEnter", "onControllerTriggerStay", "onControllerTriggerExit"]) {
          const callback = (value) => {
            if (!active) return;
            if (events.length >= 512) {
              droppedEvents++;
              return;
            }
            const event = value && typeof value === "object" ? value : {};
            events.push({
              type: name,
              frame,
              colliderId: event.collider ? RuntimeAccess.uuid(event.collider) : event.otherCollider ? RuntimeAccess.uuid(event.otherCollider) : null,
              position: RuntimeAccess.safeData(event.worldPosition),
              normal: RuntimeAccess.safeData(event.worldNormal),
              motionLength: RuntimeAccess.safeData(event.motionLength)
            });
          };
          listeners.push({ name, callback });
          RuntimeAccess.call(component, "on", name, callback);
        }
        for (const movement of movements) {
          frame++;
          this.frames.check(token);
          if (performance.now() - started > 15e3) throw new CocosError("CONTEXT_UNAVAILABLE", "\u901A\u884C\u6D4B\u8BD5\u8D85\u8FC7 15 \u79D2");
          if (component.isValid === false || !component.enabledInHierarchy) throw new CocosError("STALE_HANDLE", "\u89D2\u8272\u5DF2\u5931\u6548");
          RuntimeAccess.call(component, "move", movement);
          await this.frames.wait(token);
          rows.push({ requested: RuntimeAccess.safeData(movement), position: RuntimeAccess.safeData(component.centerWorldPosition), velocity: RuntimeAccess.safeData(component.velocity), grounded: Boolean(component.isGrounded) });
        }
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "\u901A\u884C\u6D4B\u8BD5\u90E8\u5206\u5B8C\u6210\uFF0C\u4E0D\u53EF\u81EA\u52A8\u91CD\u8BD5", { rows, events, droppedEvents, cause: CocosError.from(error).message });
      } finally {
        active = false;
        for (const { name, callback } of listeners) try {
          RuntimeAccess.call(component, "off", name, callback);
        } catch (error) {
          cleanupErrors.push(CocosError.from(error).message);
        }
      }
      if (cleanupErrors.length) throw new CocosError("OUTCOME_UNKNOWN", "\u4F4D\u79FB\u5DF2\u5B8C\u6210\uFF0C\u4F46\u4E8B\u4EF6\u76D1\u542C\u6E05\u7406\u5931\u8D25\uFF1B\u56DE\u8C03\u5DF2\u5931\u6548", { rows, events, cleanupErrors });
      const final = Json.object(rows[rows.length - 1].position), distance = expected ? Math.hypot(...["x", "y", "z"].map((axis) => Number(final[axis]) - Number(expected[axis]))) : void 0;
      return { supported: true, before, rows, events, droppedEvents, eventsReversible: false, scope: "observed-displacement-not-navigation-success", ...distance !== void 0 ? { distanceToTarget: distance, reached: distance <= tolerance, tolerance } : {} };
    }
  };

  // packages/runtime3-bridge/src/particle.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var ParticleController = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    snapshot(component, dimension) {
      if (dimension === "2") return { active: Boolean(component.active), particleCount: Number(component.particleCount), totalParticles: Number(component.totalParticles), autoRemoveOnFinish: Boolean(component.autoRemoveOnFinish) };
      return { isPlaying: Boolean(component.isPlaying), isPaused: Boolean(component.isPaused), isStopped: Boolean(component.isStopped), isEmitting: Boolean(component.isEmitting), time: Number(component.time), particleCount: Number(RuntimeAccess.call(component, "getParticleCount")), capacity: Number(component.capacity) };
    }
    execute(id, p) {
      const match = /^runtime\.particle([23])d\.(state|play|pause|stop|stop_emitting|restart)$/.exec(id);
      if (!match) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown particle operation");
      const dimension = match[1], action = match[2], methods = dimension === "2" ? { restart: "resetSystem", stop_emitting: "stopSystem" } : { play: "play", pause: "pause", stop: "stop", stop_emitting: "stopEmitting" };
      if (action !== "state" && !methods[action]) throw new CocosError("UNSUPPORTED_CAPABILITY", "Operation is not supported by this particle dimension");
      const componentId = Json.string(p.componentId, "componentId"), component = this.inspector.component(componentId), type = this.inspector.environment.cc[dimension === "2" ? "ParticleSystem2D" : "ParticleSystem"];
      if (typeof type !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", "Particle module unavailable");
      if (!(component instanceof type)) throw new CocosError("INVALID_ARGUMENT", "Target has a different particle component type");
      const before = this.snapshot(component, dimension);
      if (action === "state") return { componentId, ...before, frameVerified: false };
      if (dimension === "2" && component.autoRemoveOnFinish) throw new CocosError("OPERATION_CONFLICT", "autoRemoveOnFinish may destroy the node; particle control is refused");
      if (!component.enabledInHierarchy) throw new CocosError("OPERATION_CONFLICT", "Particle component must be active and enabled");
      try {
        RuntimeAccess.call(component, methods[action]);
        return { componentId, before, after: this.snapshot(component, dimension), frameVerified: false, restorePolicy: "\u501F\u7528\u5DF2\u6709\u7EC4\u4EF6\uFF1B\u4E0D\u5728\u65AD\u7EBF\u65F6\u9500\u6BC1\u6216\u91CD\u7F6E\u3002stop/restart \u6E05\u9664\u7684\u7C92\u5B50\u548C\u6A21\u62DF\u65F6\u95F4\u4E0D\u53EF\u6062\u590D\uFF0C\u4E0D\u81EA\u52A8\u91CD\u8BD5" };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Particle action may have executed; inspect before retrying", { componentId, before, cause: CocosError.from(error).message });
      }
    }
  };

  // packages/runtime3-bridge/src/physics.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var PhysicsQueries = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
    }
    emptyBox2dWorld(type, system) {
      if (type.PHYSICS_BOX2D !== true || RuntimeAccess.engineVersion(this.cc) !== "3.8.8") return false;
      const world = system.physicsWorld ? RuntimeAccess.object(system.physicsWorld) : void 0;
      const native = (world == null ? void 0 : world.impl) ? RuntimeAccess.object(world.impl) : void 0;
      return typeof (native == null ? void 0 : native.GetProxyCount) === "function" && RuntimeAccess.call(native, "GetProxyCount") === 0;
    }
    vector(value, dimensions) {
      const object = Json.object(value), axes = dimensions === 2 ? ["x", "y"] : ["x", "y", "z"];
      return axes.map((key) => {
        const n = object[key];
        if (typeof n !== "number" || !Number.isFinite(n) || Math.abs(n) > 1e6) throw new CocosError("INVALID_ARGUMENT", "Physics vector must have finite bounded coordinates");
        return n;
      });
    }
    execute(id, p) {
      var _a, _b, _c, _d;
      const dimension = id.startsWith("runtime.physics2d.") ? 2 : 3;
      const type = this.cc[dimension === 2 ? "PhysicsSystem2D" : "PhysicsSystem"];
      if (!type || !RuntimeAccess.object(type).instance) throw new CocosError("UNSUPPORTED_CAPABILITY", "Requested physics module is not available");
      const system = RuntimeAccess.object(RuntimeAccess.object(type).instance), physicsType = RuntimeAccess.object(type);
      const backend = dimension === 2 ? physicsType.PHYSICS_BOX2D ? "box2d" : physicsType.PHYSICS_BOX2D_WASM ? "box2d-wasm" : physicsType.PHYSICS_BUILTIN ? "builtin" : "not-detected" : "not-detected";
      if (id.endsWith(".inspect")) return { dimension, enabled: Boolean(system.enable), gravity: RuntimeAccess.safeData(system.gravity), backend, scope: "current-physics-world" };
      if (dimension === 2 && (id.endsWith(".test_point") || id.endsWith(".test_aabb"))) {
        let results2;
        if (id.endsWith(".test_point")) {
          const point = RuntimeAccess.construct(this.cc.Vec2, this.vector(p.point, 2));
          results2 = this.emptyBox2dWorld(physicsType, system) ? [] : RuntimeAccess.call(system, "testPoint", point);
        } else {
          const values = ["x", "y", "width", "height"].map((key) => Number(p[key]));
          if (!values.every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6) || values[2] <= 0 || values[3] <= 0) throw new CocosError("INVALID_ARGUMENT", "Invalid query rectangle");
          results2 = this.emptyBox2dWorld(physicsType, system) ? [] : RuntimeAccess.call(system, "testAABB", RuntimeAccess.construct(this.cc.Rect, values));
        }
        const rows2 = [...new Set(results2)].map((c) => ({ colliderId: RuntimeAccess.uuid(c), nodeId: RuntimeAccess.uuid(RuntimeAccess.object(c).node) }));
        return { rows: rows2.slice(0, 500), total: rows2.length, truncated: rows2.length > 500, coordinateSpace: "world", stepsSimulation: false };
      }
      if (!id.endsWith(".raycast")) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown physics query");
      const limit = Number((_a = p.limit) != null ? _a : 100), mask = Number((_b = p.mask) != null ? _b : 4294967295);
      if (!Number.isInteger(limit) || limit < 1 || limit > 500 || !Number.isInteger(mask) || mask < 0 || mask > 4294967295) throw new CocosError("INVALID_ARGUMENT", "Invalid raycast limit or layer mask");
      let results, length = 0;
      if (dimension === 2) {
        const start = this.vector(p.start, 2), end = this.vector(p.end, 2);
        length = Math.hypot(end[0] - start[0], end[1] - start[1]);
        if (!length) throw new CocosError("INVALID_ARGUMENT", "2D ray endpoints must differ");
        results = this.emptyBox2dWorld(physicsType, system) ? [] : RuntimeAccess.call(system, "raycast", RuntimeAccess.construct(this.cc.Vec2, start), RuntimeAccess.construct(this.cc.Vec2, end), 3, mask);
      } else {
        const origin = this.vector(p.origin, 3), direction = this.vector(p.direction, 3), magnitude = Math.hypot(...direction), maxDistance = Number((_c = p.maxDistance) != null ? _c : 1e3);
        if (!magnitude || !Number.isFinite(maxDistance) || maxDistance <= 0 || maxDistance > 1e5) throw new CocosError("INVALID_ARGUMENT", "Ray direction and maxDistance must be positive and bounded");
        const ray = RuntimeAccess.construct(RuntimeAccess.object(this.cc.geometry).Ray, [...origin, ...direction.map((n) => n / magnitude)]);
        const hit = RuntimeAccess.call(system, "raycast", ray, mask, maxDistance, (_d = p.queryTrigger) != null ? _d : true);
        results = hit ? system.raycastResults : [];
      }
      const rows = results.map((hit) => ({
        colliderId: RuntimeAccess.uuid(hit.collider),
        nodeId: RuntimeAccess.uuid(RuntimeAccess.object(hit.collider).node),
        distance: dimension === 2 ? Number(hit.fraction) * length : Number(hit.distance),
        point: RuntimeAccess.safeData(dimension === 2 ? hit.point : hit.hitPoint),
        normal: RuntimeAccess.safeData(dimension === 2 ? hit.normal : hit.hitNormal)
      })).sort((a, b) => a.distance - b.distance);
      return {
        rows: rows.slice(0, limit),
        total: rows.length,
        truncated: rows.length > limit,
        dimension,
        coordinateSpace: "world",
        units: dimension === 2 ? "Creator 2D scene units" : "Creator 3D world units",
        limitations: ["\u67E5\u8BE2\u5F53\u524D\u7269\u7406\u4E16\u754C\uFF0C\u4E0D\u4E3B\u52A8\u6B65\u8FDB\u6216\u540C\u6B65\u53D8\u6362\uFF1B\u540E\u7AEF\u517C\u5BB9\u6027\u9700\u5355\u72EC\u9A8C\u8BC1", ...dimension === 2 ? ["All \u6A21\u5F0F\u53EF\u80FD\u8FD4\u56DE\u540C\u4E00 Collider \u7684\u591A\u4E2A\u5939\u5177\u547D\u4E2D"] : []]
      };
    }
  };

  // packages/runtime3-bridge/src/media.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var MediaController = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    snapshot(component) {
      const duration = Number(component.duration), time = Number(component.currentTime);
      return { currentTime: Number.isFinite(time) ? time : null, duration: Number.isFinite(duration) ? duration : null, state: RuntimeAccess.safeData(component.state), enabled: Boolean(component.enabledInHierarchy), clipUuid: component.clip ? RuntimeAccess.uuid(component.clip) : null };
    }
    execute(id, p) {
      if (!/^runtime\.(audio|video)\.(state|play|pause|stop|seek)$/.test(id) && id !== "runtime.webview.inspect") throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown media capability");
      const componentId = Json.string(p.componentId, "componentId"), component = this.inspector.component(componentId), cc = this.inspector.environment.cc;
      const typeName = id.startsWith("runtime.audio.") ? "AudioSource" : id.startsWith("runtime.video.") ? "VideoPlayer" : "WebView", type = cc[typeName];
      if (typeof type !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", `${typeName} module is unavailable`);
      if (!(component instanceof type)) throw new CocosError("INVALID_ARGUMENT", `Target is not ${typeName}`);
      if (typeName === "WebView") return { componentId, enabled: Boolean(component.enabledInHierarchy), hasUrl: Boolean(component.url), scope: "component-configuration", pageLoaded: "unknown" };
      const before = this.snapshot(component), action = id.split(".").at(-1);
      if (action === "state") return { componentId, ...before, progressVerified: false };
      if (!["play", "pause", "stop", "seek"].includes(action)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown media action");
      if (action === "seek" && (!Number.isFinite(p.time) || Number(p.time) < 0 || !(Number(before.duration) > 0) || Number(p.time) > Number(before.duration))) throw new CocosError("INVALID_ARGUMENT", "Media must have a known duration; seek time must be within it");
      try {
        if (action === "seek") component.currentTime = p.time;
        else RuntimeAccess.call(component, action);
        return { componentId, before, after: this.snapshot(component), progressVerified: false, restorePolicy: "\u7531\u8C03\u7528\u8005\u6839\u636E before \u663E\u5F0F\u6062\u590D\uFF1B\u4E0D\u91CD\u653E\u7ED3\u675F\u4E8B\u4EF6\uFF0C\u4E0D\u5728\u65AD\u7EBF\u65F6\u505C\u6B62\u6E38\u620F\u539F\u6709\u5A92\u4F53" };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Media action may have executed; query state and platform errors before retrying", { componentId, before, cause: CocosError.from(error).message });
      }
    }
  };

  // packages/runtime3-bridge/src/animation-control.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var AnimationController = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    states(component) {
      const clips = component.clips;
      if (!Array.isArray(clips) || clips.length > 128) throw new CocosError("INVALID_ARGUMENT", "Animation clip list is unavailable or exceeds 128");
      const names = clips.filter((clip) => Boolean(clip)).map((clip) => String(clip.name));
      if (new Set(names).size !== names.length) throw new CocosError("INVALID_ARGUMENT", "Animation clip names are ambiguous");
      return names.map((name) => {
        const state = RuntimeAccess.call(component, "getState", name);
        if (!state) return { name, initialized: false };
        const value = RuntimeAccess.object(state);
        return { name, initialized: true, time: Number(value.time), duration: Number(value.duration), speed: Number(value.speed), playing: Boolean(value.isPlaying), paused: Boolean(value.isPaused), weight: Number(value.weight) };
      });
    }
    execute(id, p) {
      const componentId = Json.string(p.componentId, "componentId"), component = this.inspector.component(componentId), cc = this.inspector.environment.cc;
      if (typeof cc.Animation !== "function" || !(component instanceof cc.Animation)) throw new CocosError("INVALID_ARGUMENT", "Target must be an Animation component");
      const before = this.states(component);
      if (id === "runtime.animation.state") return { componentId, rows: before, scope: "native-animation-states", frameVerified: false };
      const name = Json.string(p.name, "name");
      if (!before.some((row) => row.name === name && row.initialized)) throw new CocosError("NOT_FOUND", `Animation state is unavailable: ${name}`);
      const state = RuntimeAccess.object(RuntimeAccess.call(component, "getState", name));
      if (id === "runtime.animation.seek" && (!Number.isFinite(p.time) || Number(p.time) < 0 || Number(p.time) > Number(state.duration))) throw new CocosError("INVALID_ARGUMENT", "Seek time must be within clip duration");
      if (id === "runtime.animation.blend" && (!Number.isFinite(p.duration) || Number(p.duration) < 0 || Number(p.duration) > 60)) throw new CocosError("INVALID_ARGUMENT", "Blend duration must be 0..60 seconds");
      try {
        switch (id) {
          case "runtime.animation.play":
            RuntimeAccess.call(component, "play", name);
            break;
          case "runtime.animation.blend":
            RuntimeAccess.call(component, "crossFade", name, p.duration);
            break;
          case "runtime.animation.pause":
            RuntimeAccess.call(state, "pause");
            break;
          case "runtime.animation.resume":
            RuntimeAccess.call(state, "resume");
            break;
          case "runtime.animation.stop":
            RuntimeAccess.call(state, "stop");
            break;
          // setTime 原生会重置事件采样基线；不主动 sample，避免重复派发用户动画事件。
          case "runtime.animation.seek":
            RuntimeAccess.call(state, "setTime", p.time);
            break;
          default:
            throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown animation control: ${id}`);
        }
        return { componentId, before, after: this.states(component), frameVerified: false, restorePolicy: "\u65E0\u81EA\u52A8\u56DE\u653E\u6216\u65AD\u7EBF\u91CD\u7F6E\uFF1B\u53C2\u8003 before \u663E\u5F0F pause/seek/resume/stop\u3002\u5386\u53F2\u4E8B\u4EF6\u548C\u8FDB\u884C\u4E2D\u7684\u6DF7\u5408\u4E0D\u80FD\u56DE\u6EDA\u3002" };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Animation control may have executed; query state before retrying", { componentId, before, cause: CocosError.from(error).message });
      }
    }
  };

  // packages/runtime3-bridge/src/two-d-control.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var TwoDControl = class {
    constructor(scene, frames) {
      __publicField(this, "scene", scene);
      __publicField(this, "frames", frames);
    }
    get cc() {
      return this.scene.environment.cc;
    }
    component(id, type) {
      var _a;
      const component = this.scene.component(id);
      const constructor = (_a = FeatureSupport.type(this.cc, type)) != null ? _a : RuntimeAccess.call(this.cc.js, "getClassByName", type === "sp.Skeleton" ? type : `cc.${type}`);
      FeatureSupport.require(constructor, type);
      if (typeof constructor !== "function" || !(component instanceof constructor)) throw new CocosError("INVALID_ARGUMENT", `Target is not ${type}`);
      return component;
    }
    spineState(c) {
      var _a, _b;
      const data = FeatureSupport.require(c.skeletonData, "Spine skeletonData");
      const native = FeatureSupport.require(RuntimeAccess.call(data, "getRuntimeData"), "Spine runtime data");
      const rows = Array.from({ length: 8 }, (_, trackIndex) => {
        var _a2;
        const value = RuntimeAccess.call(c, "getCurrent", trackIndex);
        const track = value ? RuntimeAccess.object(value) : void 0;
        return { trackIndex, animation: (track == null ? void 0 : track.animation) ? String(RuntimeAccess.object(track.animation).name) : null, trackTime: Number((_a2 = track == null ? void 0 : track.trackTime) != null ? _a2 : 0), loop: Boolean(track == null ? void 0 : track.loop) };
      });
      return {
        componentId: RuntimeAccess.uuid(c),
        cached: Boolean(RuntimeAccess.call(c, "isAnimationCached")),
        animationNames: ((_a = native.animations) != null ? _a : []).map((row) => String(row.name)),
        skinNames: ((_b = native.skins) != null ? _b : []).map((row) => String(row.name)),
        rows,
        eventDeliveryVerified: false
      };
    }
    async spine(id, p) {
      var _a, _b, _c;
      const c = this.component(Json.string(p.componentId, "componentId"), "sp.Skeleton"), before = this.spineState(c);
      if (id.endsWith(".inspect")) return before;
      if (id.endsWith(".trace")) {
        const count = this.count(p.frames), token = this.frames.token(), rows = [];
        for (let index = 0; index < count; index++) {
          await this.frames.wait(token);
          rows.push({ frame: index + 1, state: this.spineState(c) });
        }
        return { rows, listenerInstalled: false, limitations: ["\u53EA\u91C7\u96C6\u8F68\u9053\uFF0C\u4E0D\u8986\u76D6\u5DF2\u6709 Spine \u5355\u69FD\u4E8B\u4EF6\u76D1\u542C\uFF1B\u7F13\u5B58\u6A21\u5F0F\u53EF\u80FD\u4E0D\u63D0\u4F9B TrackEntry"] };
      }
      if (!c.enabledInHierarchy) throw new CocosError("OPERATION_CONFLICT", "Spine must be active");
      const name = Json.string(p.name, "name");
      if (id.endsWith(".play")) {
        if (!before.animationNames.includes(name)) throw new CocosError("NOT_FOUND", "Spine animation not found");
        if (before.cached && (Number((_a = p.trackIndex) != null ? _a : 0) !== 0 || p.queue)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Cached Spine multi-track/queue is not adapted");
      } else if (id.endsWith(".set_skin")) {
        if (!before.skinNames.includes(name)) throw new CocosError("NOT_FOUND", "Spine skin not found");
      } else if (id.endsWith(".set_attachment")) {
        if (before.cached) throw new CocosError("UNSUPPORTED_CAPABILITY", "Attachment edits require realtime Spine");
        if (!RuntimeAccess.call(c, "getAttachment", Json.string(p.slot, "slot"), name)) throw new CocosError("NOT_FOUND", "Spine attachment not found");
      } else throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown Spine action");
      try {
        if (id.endsWith(".play")) RuntimeAccess.call(c, p.queue ? "addAnimation" : "setAnimation", Number((_b = p.trackIndex) != null ? _b : 0), name, Boolean(p.loop), Number((_c = p.delay) != null ? _c : 0));
        else if (id.endsWith(".set_skin")) RuntimeAccess.call(c, "setSkin", name);
        else RuntimeAccess.call(c, "setAttachment", p.slot, name);
        return { before, after: this.spineState(c), frameVerified: false, restorePolicy: "\u64AD\u653E\u4E8B\u4EF6\u548C\u7F13\u5B58\u53D8\u66F4\u4E0D\u53EF\u81EA\u52A8\u56DE\u6EDA\uFF1B\u5931\u8D25\u5148\u67E5\u8BE2" };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Spine action may have executed", { before, cause: CocosError.from(error).message });
      }
    }
    count(value) {
      const count = Number(value);
      if (!Number.isInteger(count) || count < 1 || count > 300) throw new CocosError("INVALID_ARGUMENT", "Frames must be 1..300");
      return count;
    }
    async contacts(p) {
      if (!Array.isArray(p.componentIds) || !p.componentIds.length || p.componentIds.length > 32) throw new CocosError("INVALID_ARGUMENT", "Expected 1..32 colliders");
      const colliders = p.componentIds.map((id) => this.component(String(id), "Collider2D"));
      const count = this.count(p.frames), token = this.frames.token(), rows = [];
      const events = FeatureSupport.require(this.cc.Contact2DType, "Contact2DType"), bindings = [];
      let frame = 0, dropped = 0;
      try {
        for (const c of colliders) for (const key of ["BEGIN_CONTACT", "END_CONTACT", "PRE_SOLVE", "POST_SOLVE"]) {
          const event = events[key];
          if (typeof event !== "string") continue;
          const callback = (self, other, contact) => {
            if (rows.length >= 512) {
              dropped++;
              return;
            }
            const manifold = contact && typeof RuntimeAccess.object(contact).getWorldManifold === "function" ? RuntimeAccess.call(contact, "getWorldManifold") : null;
            rows.push({ frame, event, selfId: RuntimeAccess.uuid(self), otherId: RuntimeAccess.uuid(other), manifold: manifold ? RuntimeAccess.safeData(manifold) : null });
          };
          bindings.push({ c, event, callback });
          RuntimeAccess.call(c, "on", event, callback);
        }
        for (frame = 1; frame <= count; frame++) await this.frames.wait(token);
        return { rows, dropped, sampledFrames: count, stepsSimulation: false, limitations: ["\u4E8B\u4EF6\u4F9D\u8D56\u5B9E\u9645\u7269\u7406\u540E\u7AEF\u548C contact listener \u914D\u7F6E\uFF1B\u7A7A\u7ED3\u679C\u4E0D\u8BC1\u660E\u6CA1\u6709\u78B0\u649E"] };
      } finally {
        const cleanupErrors = [];
        for (const binding of bindings) try {
          RuntimeAccess.call(binding.c, "off", binding.event, binding.callback);
        } catch (error) {
          cleanupErrors.push(CocosError.from(error).message);
        }
        if (cleanupErrors.length) throw new CocosError("OUTCOME_UNKNOWN", "Contact listener cleanup incomplete", { cleanupErrors });
      }
    }
    tilemap(id, p) {
      const map = id.endsWith(".inspect"), c = this.component(Json.string(p.componentId, "componentId"), map ? "TiledMap" : "TiledLayer");
      if (map) return {
        componentId: RuntimeAccess.uuid(c),
        mapSize: RuntimeAccess.safeData(RuntimeAccess.call(c, "getMapSize")),
        tileSize: RuntimeAccess.safeData(RuntimeAccess.call(c, "getTileSize")),
        orientation: RuntimeAccess.safeData(RuntimeAccess.call(c, "getMapOrientation")),
        rows: RuntimeAccess.call(c, "getLayers").map((layer) => ({ componentId: RuntimeAccess.uuid(layer), name: String(RuntimeAccess.call(layer, "getLayerName")), size: RuntimeAccess.safeData(RuntimeAccess.call(layer, "getLayerSize")) })),
        objectGroups: RuntimeAccess.call(c, "getObjectGroups").map((group) => {
          const objects = RuntimeAccess.call(group, "getObjects");
          return { componentId: RuntimeAccess.uuid(group), name: String(RuntimeAccess.call(group, "getGroupName")), properties: RuntimeAccess.safeData(RuntimeAccess.call(group, "getProperties")), rows: objects.slice(0, 500).map((row) => RuntimeAccess.safeData(row)), total: objects.length, truncated: objects.length > 500 };
        })
      };
      const size = RuntimeAccess.object(RuntimeAccess.call(c, "getLayerSize"));
      const coordinates = (x, y) => this.scene.environment.major === 2 ? [RuntimeAccess.construct(this.cc.Vec2, [x, y])] : [x, y];
      const cell = (x, y) => {
        if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= Number(size.width) || y >= Number(size.height)) throw new CocosError("INVALID_ARGUMENT", "Tile coordinates outside layer");
        return { x, y, gid: Json.value(RuntimeAccess.call(c, "getTileGIDAt", ...coordinates(x, y))), flags: Json.value(RuntimeAccess.call(c, "getTileFlagsAt", ...coordinates(x, y))), position: RuntimeAccess.safeData(RuntimeAccess.call(c, "getPositionAt", ...coordinates(x, y))) };
      };
      if (id.endsWith(".query_region")) {
        const width = Number(p.width), height = Number(p.height), rows2 = [];
        if (![width, height].every((n) => Number.isInteger(n) && n > 0 && n <= 64) || width * height > 4096) throw new CocosError("INVALID_ARGUMENT", "Invalid region budget");
        for (let y = Number(p.y); y < Number(p.y) + height; y++) for (let x = Number(p.x); x < Number(p.x) + width; x++) rows2.push(cell(x, y));
        return { rows: rows2, coordinateSpace: "tile-layer-local", sourcePersisted: false };
      }
      if (!Array.isArray(p.rows) || !p.rows.length || p.rows.length > 512) throw new CocosError("INVALID_ARGUMENT", "Expected 1..512 tile edits");
      const seen = /* @__PURE__ */ new Set(), rows = p.rows.map((value) => {
        var _a;
        const row = Json.object(value), x = Number(row.x), y = Number(row.y), gid = Number(row.gid), flags = Number((_a = row.flags) != null ? _a : 0), key = `${x}:${y}`;
        if (seen.has(key) || !Number.isInteger(gid) || gid < 0 || gid > 536870911 || !Number.isInteger(flags) || flags < 0 || flags > 4294967295 || (flags & 536870911) !== 0) throw new CocosError("INVALID_ARGUMENT", "Duplicate cell or invalid GID/flags");
        seen.add(key);
        return { before: cell(x, y), after: { x, y, gid, flags } };
      });
      const planHash = Json.canonical({ generation: this.frames.token(), componentId: RuntimeAccess.uuid(c), size: RuntimeAccess.safeData(size), rows });
      if (id.endsWith(".plan")) return { planHash, rows, sourcePersisted: false };
      if (!id.endsWith(".apply")) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown tile operation");
      if (p.planHash !== planHash) throw new CocosError("STALE_REVISION", "Tile region changed; plan again");
      const completed = [];
      let pending = null;
      try {
        for (const row of rows) {
          pending = row;
          RuntimeAccess.call(c, "setTileGIDAt", row.after.gid, ...coordinates(row.after.x, row.after.y), row.after.flags);
          const actual = cell(row.after.x, row.after.y);
          if (actual.gid !== row.after.gid || actual.flags !== row.after.flags) throw new CocosError("VERIFICATION_FAILED", "Tile GID not available in tileset or readback mismatch");
          completed.push({ ...row, actual });
          pending = null;
        }
        return { rows: completed, sourcePersisted: false, visualVerified: false };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Partial runtime tile edit; inspect before re-planning", { completed, pending, cause: CocosError.from(error).message });
      }
    }
  };

  // packages/runtime3-bridge/src/feature-routes.ts
  var RuntimeFeatureRoutes = class {
    constructor(inspector, frames, debug) {
      __publicField(this, "inspector", inspector);
      __publicField(this, "frames", frames);
      __publicField(this, "debug", debug);
    }
    get environment() {
      return this.inspector.environment;
    }
    owns(id) {
      return /^runtime\.(ui|render2d|label|atlas|spine|tilemap|graphics|particle[23]d|physics[23]d|audio|video|webview|animation)\./.test(id) || FeatureSupport.owns(id);
    }
    async execute(id, p) {
      if (/^runtime\.(ui|render2d|label|atlas|spine|tilemap)\./.test(id) || id === "runtime.physics2d.trace_contacts") return FeatureSupport.run(id, RuntimeAccess.engineVersion(this.environment.cc), async () => {
        const control = new TwoDControl(this.inspector, this.frames);
        if (id.startsWith("runtime.spine.")) return control.spine(id, p);
        if (id.startsWith("runtime.tilemap.")) return control.tilemap(id, p);
        if (id === "runtime.physics2d.trace_contacts") return control.contacts(p);
        return new TwoDInspector(this.inspector).execute(id, p);
      });
      if (FeatureSupport.owns(id)) return FeatureSupport.run(id, RuntimeAccess.engineVersion(this.environment.cc), async () => {
        var _a;
        if (id.startsWith("runtime.debug.")) return this.debug.execute(id, p);
        if (id === "runtime.skinning.plan") return new SkinningCompatibility(this.inspector).plan(p);
        if (id.startsWith("runtime.animation_graph.")) return new AnimationGraphObserver(this.inspector, this.frames).execute(id, p);
        if (id === "runtime.path.preview") {
          const sampled = new PathSampler(this.environment.cc).sample(p), parent = this.inspector.node(Json.string(p.parentId, "parentId"));
          const vector = FeatureSupport.require(this.environment.cc.Vec3, "Vec3");
          FeatureSupport.methods(vector, ["transformMat4"]);
          const points = sampled.rows.map((row) => {
            const value = Json.object(row.position), v = RuntimeAccess.construct(vector, [value.x, value.y, value.z]);
            return RuntimeAccess.safeData(RuntimeAccess.call(vector, "transformMat4", v, v, parent.worldMatrix));
          });
          return this.debug.execute("runtime.debug.draw", { ...p, lines: points.slice(1).map((point, index) => ({ start: points[index], end: point })) });
        }
        const inspector = new EngineFeatureInspector(this.inspector, this.frames);
        if (id === "runtime.probe.preview") {
          const points = inspector.probePoints(p);
          const drawing = Json.object(this.debug.execute("runtime.debug.shape", { ...p, shape: { kind: "points", points: points.rows, radius: (_a = p.radius) != null ? _a : 0.05 } }));
          return { ...drawing, ...points };
        }
        if (id === "runtime.postprocess.inspect") return inspector.postprocess(p);
        if (id === "runtime.character.test_route") return inspector.route(p);
        return inspector.inspect(id.split(".")[1], p);
      });
      if (id.startsWith("runtime.graphics.") || /^runtime\.particle[23]d\./.test(id)) {
        if (this.environment.major !== 3 || RuntimeAccess.engineVersion(this.environment.cc) !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Graphics and particle tools require Creator 3.8.8");
        return id.startsWith("runtime.graphics.") ? new GraphicsInspector(this.environment.cc).execute(id, p) : new ParticleController(this.inspector).execute(id, p);
      }
      if (/^runtime\.(physics[23]d|audio|video|webview)\./.test(id)) {
        if (this.environment.major !== 3 || RuntimeAccess.engineVersion(this.environment.cc) !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Physics and media tools require Creator 3.8.8");
        return id.startsWith("runtime.physics") ? new PhysicsQueries(this.environment.cc).execute(id, p) : new MediaController(this.inspector).execute(id, p);
      }
      if (id.startsWith("runtime.animation.")) {
        if (this.environment.major !== 3 || RuntimeAccess.engineVersion(this.environment.cc) !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Animation controls require Creator 3.8.8");
        return new AnimationController(this.inspector).execute(id, p);
      }
      throw new CocosError("UNSUPPORTED_CAPABILITY", `No runtime feature route for ${id}`);
    }
  };

  // packages/runtime2-bridge/src/physics-contact.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2PhysicsContact = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    async trace(p, frames, progress) {
      var _a, _b;
      const cc = this.inspector.environment.cc, manager = RuntimeAccess.object(RuntimeAccess.call(cc.director, "getPhysicsManager"));
      if (!manager.enabled) throw new CocosError("CONTEXT_UNAVAILABLE", "Box2D physics is disabled");
      const count = Number((_a = p.frames) != null ? _a : 120), limit = Number((_b = p.limit) != null ? _b : 1e3), ratio = Number(RuntimeAccess.object(cc.PhysicsManager).PTM_RATIO);
      if (!Number.isInteger(count) || count < 1 || count > 300 || !Number.isInteger(limit) || limit < 1 || limit > 5e3) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded physics contact trace");
      if (!Number.isFinite(ratio) || ratio <= 0) throw new CocosError("VERIFICATION_FAILED", "Invalid native PTM ratio");
      const bodies = this.inspector.all(this.inspector.node(Json.string(p.rootId, "rootId"))).flatMap((node) => this.inspector.components(node).filter((component) => this.inspector.type(component) === "cc.RigidBody"));
      const eligible = bodies.filter((body) => body.enabled && RuntimeAccess.object(body.node).activeInHierarchy && body._b2Body && body.enabledContactListener);
      if (!eligible.length) throw new CocosError("CONTEXT_UNAVAILABLE", "No active initialized body with enabledContactListener in subtree");
      if (eligible.length > 128) throw new CocosError("RESOURCE_BUSY", "Contact trace is limited to 128 receiver bodies");
      const skipped = bodies.filter((body) => !eligible.includes(body)).map((body) => ({ componentId: RuntimeAccess.uuid(body), reason: !body.enabledContactListener ? "contact-listener-disabled" : "inactive-or-uninitialized" }));
      const rows = [], observers = [], token = frames.token();
      const metadata = {
        skipped,
        receiverBodies: eligible.length,
        coordinateSpace: "world-pixels",
        impulseUnits: "Box2D-native-impulse",
        ptmRatio: ratio,
        limitations: ["\u53EA\u89C2\u5BDF\u5DF2\u542F\u7528\u63A5\u89E6\u76D1\u542C\u7684\u521A\u4F53\uFF0C\u4E0D\u6539\u53D8\u4E1A\u52A1\u76D1\u542C\u5F00\u5173\u6216\u63A5\u89E6\u89C4\u5219", "\u51B2\u91CF\u4EC5\u5728 postSolve \u6709\u6548\uFF1Bsensor \u901A\u5E38\u4E0D\u4EA7\u751F\u6C42\u89E3\u56DE\u8C03", "\u6309\u63A5\u6536\u8005\u8BB0\u5F55\uFF0C\u53CC\u5411\u56DE\u8C03\u4E0D\u4F1A\u53BB\u91CD\uFF1B\u6CD5\u7EBF\u6CBF\u539F\u751F\u63A5\u6536\u8005\u65B9\u5411", "\u6CA1\u6709\u63A5\u89E6\u70B9\u65F6\u6CD5\u7EBF\u4E3A null\uFF0C\u4E0D\u8FD4\u56DE\u539F\u751F\u590D\u7528\u7F13\u5B58\u7684\u65E7\u6CD5\u7EBF"]
      };
      let active = true, frame = 0, dropped = 0, captureFailure = null;
      const record = (event, contact, self, other) => {
        if (!active) return;
        if (rows.length >= limit) {
          dropped++;
          return;
        }
        try {
          const manifold = this.manifold(contact);
          const rawImpulse = event === "postSolve" ? RuntimeAccess.call(contact, "getImpulse") : null;
          const impulse = rawImpulse ? RuntimeAccess.object(rawImpulse) : null;
          const nativeNormal = impulse == null ? void 0 : impulse.normalImpulses, nativeTangent = impulse == null ? void 0 : impulse.tangentImpulses;
          if (impulse && (!this.finiteArray(nativeNormal) || !this.finiteArray(nativeTangent) || nativeNormal.length !== nativeTangent.length)) throw new Error("Invalid contact impulse arrays");
          rows.push({
            event,
            frame,
            selfColliderId: RuntimeAccess.uuid(self),
            otherColliderId: RuntimeAccess.uuid(other),
            receiverNodeId: RuntimeAccess.uuid(RuntimeAccess.object(RuntimeAccess.object(self).body).node),
            sensor: Boolean(RuntimeAccess.object(self).sensor || RuntimeAccess.object(other).sensor),
            manifold,
            // 2.4.15 getImpulse 只给法向乘 PTM_RATIO，切向没有换算；统一回 Box2D 单位，避免混用量纲。
            impulse: impulse ? { normal: nativeNormal.map((value) => value / ratio), tangent: [...nativeTangent] } : null,
            disabled: Boolean(RuntimeAccess.object(contact).disabled),
            disabledOnce: Boolean(RuntimeAccess.object(contact).disabledOnce)
          });
        } catch (error) {
          captureFailure = CocosError.from(error).message;
          active = false;
        }
      };
      const Observer = RuntimeAccess.call(cc, "Class", {
        extends: cc.Component,
        onBeginContact: (contact, self, other) => record("begin", contact, self, other),
        onEndContact: (contact, self, other) => record("end", contact, self, other),
        onPreSolve: (contact, self, other) => record("preSolve", contact, self, other),
        onPostSolve: (contact, self, other) => record("postSolve", contact, self, other)
      });
      try {
        for (const body of eligible) observers.push(RuntimeAccess.object(RuntimeAccess.call(body.node, "addComponent", Observer)));
        progress({ ...metadata, rows, dropped, completedFrames: 0, totalFrames: count });
        for (frame = 0; frame < count; frame++) {
          await frames.wait(token);
          if (captureFailure) throw new CocosError("VERIFICATION_FAILED", "Native contact data capture failed", { cause: captureFailure });
          progress({ ...metadata, rows, dropped, completedFrames: frame + 1, totalFrames: count });
        }
        return { ...metadata, rows, dropped, frames: count };
      } finally {
        active = false;
        const failures = [];
        for (const observer of observers) if (observer.isValid !== false) {
          try {
            RuntimeAccess.call(observer, "destroy");
          } catch (error) {
            failures.push(CocosError.from(error).message);
          }
        }
        try {
          RuntimeAccess.call(cc.js, "unregisterClass", Observer);
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        if (failures.length) throw new CocosError("OUTCOME_UNKNOWN", "Contact trace stopped recording but observer cleanup failed", { failures });
      }
    }
    finiteArray(value) {
      return Array.isArray(value) && value.length <= 2 && value.every((number) => typeof number === "number" && Number.isFinite(number));
    }
    vector(value) {
      const vector = RuntimeAccess.object(value);
      if (typeof vector.x !== "number" || typeof vector.y !== "number" || !Number.isFinite(vector.x) || !Number.isFinite(vector.y)) throw new Error("Invalid contact vector");
      return { x: vector.x, y: vector.y };
    }
    manifold(contact) {
      const native = RuntimeAccess.object(RuntimeAccess.call(contact, "getWorldManifold")), points = native.points, separations = native.separations;
      if (!Array.isArray(points) || points.length > 2 || !this.finiteArray(separations) || points.length !== separations.length) throw new Error("Invalid contact manifold");
      return { points: points.map((point) => this.vector(point)), separations: [...separations], normal: points.length ? this.vector(native.normal) : null };
    }
  };

  // packages/runtime2-bridge/src/spine-events.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime2-bridge/src/spine-cached-events.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2SpineCachedEvents = class _Creator2SpineCachedEvents {
    async trace(component, events, count, limit, frames, progress) {
      if (events.some((event) => !_Creator2SpineCachedEvents.events.includes(event))) throw new CocosError("UNSUPPORTED_CAPABILITY", "Cached Spine only emits start/complete/end");
      if (_Creator2SpineCachedEvents.owned.has(component)) throw new CocosError("RESOURCE_BUSY", "Cached Spine already has an owned trace");
      RuntimeAccess.call(component, "_ensureListener");
      const owner = RuntimeAccess.object(component._listener), mode = component._cacheMode;
      for (const event of events) {
        const descriptor = Object.getOwnPropertyDescriptor(owner, event);
        if (!descriptor || !("value" in descriptor) || !descriptor.writable) throw new CocosError("UNSUPPORTED_CAPABILITY", "Cached Spine listener slot is not writable native data");
        if (descriptor.value !== null && descriptor.value !== void 0 && typeof descriptor.value !== "function") throw new CocosError("INVALID_ARGUMENT", "Cached Spine callback is not callable");
      }
      _Creator2SpineCachedEvents.owned.add(component);
      const rows = [], slots = [];
      let active = true, frame = 0, dropped = 0;
      const token = frames.token();
      try {
        for (const event of events) {
          const original = owner[event];
          const wrapper = function(...args) {
            try {
              return typeof original === "function" ? original.apply(this, args) : void 0;
            } finally {
              if (active && component._cacheMode === mode && component._listener === owner) {
                if (rows.length >= limit) dropped++;
                else {
                  const entry = args[0] ? RuntimeAccess.object(args[0]) : null;
                  rows.push({
                    event,
                    frame,
                    animation: (entry == null ? void 0 : entry.animation) ? RuntimeAccess.safeData(RuntimeAccess.object(entry.animation).name) : null,
                    trackIndex: entry ? RuntimeAccess.safeData(entry.trackIndex) : null,
                    trackTime: null,
                    loop: null,
                    payload: null,
                    syntheticEntry: true
                  });
                }
              }
            }
          };
          slots.push({ event, original, wrapper });
          owner[event] = wrapper;
        }
        for (frame = 0; frame < count; frame++) {
          await frames.wait(token);
          if (component.isValid === false) throw new CocosError("STALE_HANDLE", "Spine target destroyed");
          if (component._cacheMode !== mode || component._listener !== owner || slots.some((slot) => owner[slot.event] !== slot.wrapper)) throw new CocosError("OPERATION_CONFLICT", "Cached Spine mode or business callback changed during trace");
          progress({ rows, dropped, completedFrames: frame + 1, totalFrames: count });
        }
        return { rows, dropped, frames: count, cached: true, businessListenersPreserved: true, limitations: ["\u7F13\u5B58\u4E8B\u4EF6\u4EC5\u63D0\u4F9B\u5408\u6210\u7684\u52A8\u753B\u540D\u548C\u8F68\u9053\u7D22\u5F15\uFF1B\u4E0D\u63D0\u4F9B\u5B9E\u65F6\u8F68\u9053\u65F6\u95F4\u3001\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u6216\u4E2D\u65AD\u4E8B\u4EF6"] };
      } finally {
        active = false;
        const failures = [];
        for (const slot of slots) {
          try {
            if (owner[slot.event] === slot.wrapper) {
              owner[slot.event] = slot.original;
              if (owner[slot.event] !== slot.original) throw new Error("Callback restoration failed");
            }
          } catch (error) {
            failures.push(CocosError.from(error).message);
          }
        }
        if (failures.length) throw new CocosError("OUTCOME_UNKNOWN", "Cached Spine trace stopped recording but callback restoration failed", { failures });
        _Creator2SpineCachedEvents.owned.delete(component);
      }
    }
  };
  __publicField(_Creator2SpineCachedEvents, "owned", /* @__PURE__ */ new WeakSet());
  __publicField(_Creator2SpineCachedEvents, "events", ["start", "complete", "end"]);
  var Creator2SpineCachedEvents = _Creator2SpineCachedEvents;

  // packages/runtime2-bridge/src/spine-events.ts
  var _Creator2SpineEvents = class _Creator2SpineEvents {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    async trace(p, frames, progress) {
      var _a, _b, _c;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "sp.Skeleton") throw new CocosError("INVALID_ARGUMENT", "Expected sp.Skeleton");
      const count = Number((_a = p.frames) != null ? _a : 120), limit = Number((_b = p.limit) != null ? _b : 1e3);
      if (!Number.isInteger(count) || count < 1 || count > 300 || !Number.isInteger(limit) || limit < 1 || limit > 5e3) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded Spine trace");
      const cached = Boolean(RuntimeAccess.call(component, "isAnimationCached"));
      const events = (_c = p.events) != null ? _c : cached ? Creator2SpineCachedEvents.events : _Creator2SpineEvents.events;
      if (!Array.isArray(events) || events.length < 1 || events.length > 6 || new Set(events).size !== events.length || events.some((event) => typeof event !== "string" || !_Creator2SpineEvents.events.includes(event))) throw new CocosError("INVALID_ARGUMENT", "Invalid Spine events");
      if (cached) return new Creator2SpineCachedEvents().trace(component, events, count, limit, frames, progress);
      const rawState = RuntimeAccess.call(component, "getState");
      if (!rawState) throw new CocosError("CONTEXT_UNAVAILABLE", "Spine animation state is not initialized");
      const state = RuntimeAccess.object(rawState);
      if (typeof state.addListener !== "function" || typeof state.removeListener !== "function" || !Array.isArray(state.listeners)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Spine native listener API is unavailable");
      const rows = [], listener = {}, token = frames.token();
      let active = true, dropped = 0, frame = 0;
      for (const event of events) listener[event] = (rawEntry, rawEvent) => {
        if (!active || RuntimeAccess.call(component, "isAnimationCached") || RuntimeAccess.call(component, "getState") !== rawState) return;
        if (rows.length >= limit) {
          dropped++;
          return;
        }
        const entry = RuntimeAccess.object(rawEntry), data = rawEvent ? RuntimeAccess.object(rawEvent) : null;
        rows.push({
          event,
          frame,
          animation: entry.animation ? RuntimeAccess.safeData(RuntimeAccess.object(entry.animation).name) : null,
          trackIndex: RuntimeAccess.safeData(entry.trackIndex),
          trackTime: RuntimeAccess.safeData(entry.trackTime),
          loop: RuntimeAccess.safeData(entry.loop),
          payload: data ? { name: data.data ? RuntimeAccess.safeData(RuntimeAccess.object(data.data).name) : null, time: RuntimeAccess.safeData(data.time), intValue: RuntimeAccess.safeData(data.intValue), floatValue: RuntimeAccess.safeData(data.floatValue), stringValue: RuntimeAccess.safeData(data.stringValue) } : null
        });
      };
      try {
        RuntimeAccess.call(state, "addListener", listener);
        for (frame = 0; frame < count; frame++) {
          await frames.wait(token);
          if (component.isValid === false) throw new CocosError("STALE_HANDLE", "Spine target destroyed");
          if (RuntimeAccess.call(component, "isAnimationCached") || RuntimeAccess.call(component, "getState") !== rawState) throw new CocosError("OPERATION_CONFLICT", "Spine animation state changed during trace");
          progress({ rows, dropped, completedFrames: frame + 1, totalFrames: count });
        }
        return { rows, dropped, frames: count, cached: false, businessListenersPreserved: true };
      } finally {
        active = false;
        try {
          RuntimeAccess.call(state, "removeListener", listener);
          if (!Array.isArray(state.listeners) || state.listeners.includes(listener)) throw new Error("Native listener still registered");
        } catch (error) {
          throw new CocosError("OUTCOME_UNKNOWN", "Spine trace stopped recording but listener cleanup failed", { cause: CocosError.from(error).message });
        }
      }
    }
  };
  __publicField(_Creator2SpineEvents, "events", ["start", "interrupt", "end", "dispose", "complete", "event"]);
  var Creator2SpineEvents = _Creator2SpineEvents;

  // packages/runtime2-bridge/src/dragonbones-events.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2DragonBonesEvents = class _Creator2DragonBonesEvents {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    payload(value) {
      if (!value || typeof value !== "object") return null;
      const data = value;
      let truncated = false;
      const copy = (key) => {
        const values = data[key];
        if (!Array.isArray(values)) return [];
        if (values.length > 8) truncated = true;
        return values.slice(0, 8).map((value2) => {
          if (key === "strings" && typeof value2 === "string") {
            if (value2.length > 256) truncated = true;
            return value2.slice(0, 256);
          }
          return typeof value2 === "number" && Number.isFinite(value2) ? value2 : null;
        });
      };
      const ints = copy("ints"), floats = copy("floats"), strings = copy("strings");
      return { ints, floats, strings, truncated };
    }
    async trace(p, frames, progress) {
      var _a, _b, _c;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "dragonBones.ArmatureDisplay") throw new CocosError("INVALID_ARGUMENT", "Expected dragonBones.ArmatureDisplay");
      const count = Number((_a = p.frames) != null ? _a : 120), limit = Number((_b = p.limit) != null ? _b : 1e3);
      if (!Number.isInteger(count) || count < 1 || count > 300 || !Number.isInteger(limit) || limit < 1 || limit > 5e3) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded DragonBones trace");
      const events = (_c = p.events) != null ? _c : ["start", "loopComplete", "complete"];
      if (!Array.isArray(events) || events.length < 1 || events.length > 9 || new Set(events).size !== events.length || events.some((event) => typeof event !== "string" || !_Creator2DragonBonesEvents.events.includes(event))) throw new CocosError("INVALID_ARGUMENT", "Invalid DragonBones events");
      const cached = Boolean(RuntimeAccess.call(component, "isAnimationCached")), cacheMode = component._cacheMode;
      if (cached && events.some((event) => !["start", "loopComplete", "complete"].includes(String(event)))) throw new CocosError("UNSUPPORTED_CAPABILITY", "Cached DragonBones only emits start/loopComplete/complete");
      const rows = [], listeners = [];
      let active = true, dropped = 0, frame = 0;
      const token = frames.token();
      try {
        for (const event of events) {
          const callback = (value) => {
            if (!active || component._cacheMode !== cacheMode) return;
            if (rows.length >= limit) {
              dropped++;
              return;
            }
            const native = value && typeof value === "object" ? value : null;
            const state = (native == null ? void 0 : native.animationState) ? RuntimeAccess.object(native.animationState) : null;
            rows.push({
              event,
              frame,
              hasNativePayload: Boolean(native),
              name: native ? RuntimeAccess.safeData(native.name) : null,
              animation: state ? RuntimeAccess.safeData(state.name) : null,
              animationTime: state ? RuntimeAccess.safeData(state.currentTime) : null,
              bone: (native == null ? void 0 : native.bone) ? RuntimeAccess.safeData(RuntimeAccess.object(native.bone).name) : null,
              slot: (native == null ? void 0 : native.slot) ? RuntimeAccess.safeData(RuntimeAccess.object(native.slot).name) : null,
              payload: this.payload(native == null ? void 0 : native.data)
            });
          };
          listeners.push({ event, callback });
          RuntimeAccess.call(component, "addEventListener", event, callback);
        }
        for (frame = 0; frame < count; frame++) {
          await frames.wait(token);
          if (component.isValid === false) throw new CocosError("STALE_HANDLE", "DragonBones target destroyed");
          if (component._cacheMode !== cacheMode) throw new CocosError("OPERATION_CONFLICT", "DragonBones cache mode changed during trace");
          progress({ rows, dropped, completedFrames: frame + 1, totalFrames: count });
        }
        return {
          rows,
          dropped,
          frames: count,
          cached,
          businessListenersPreserved: true,
          limitations: cached ? ["\u7F13\u5B58\u4E8B\u4EF6\u6CA1\u6709\u539F\u751F\u8D1F\u8F7D\uFF1B\u52A8\u753B\u540D\u3001\u65F6\u95F4\u548C\u9AA8\u9ABC\u5B57\u6BB5\u8FD4\u56DE null"] : ["\u53EA\u8BB0\u5F55\u8FFD\u8E2A\u671F\u95F4\u539F\u751F\u5DF2\u5206\u53D1\u4E8B\u4EF6\uFF1B\u4E0D\u89E6\u53D1\u58F0\u97F3\u64AD\u653E\u3001\u4E0D\u63A8\u8FDB\u52A8\u753B"]
        };
      } finally {
        active = false;
        const failures = [];
        for (const listener of listeners) {
          try {
            RuntimeAccess.call(component, "removeEventListener", listener.event, listener.callback);
          } catch (error) {
            failures.push(CocosError.from(error).message);
          }
        }
        if (failures.length) throw new CocosError("OUTCOME_UNKNOWN", "DragonBones trace stopped recording but listener cleanup failed", { failures });
      }
    }
  };
  __publicField(_Creator2DragonBonesEvents, "events", ["start", "loopComplete", "complete", "fadeIn", "fadeInComplete", "fadeOut", "fadeOutComplete", "frameEvent", "soundEvent"]);
  var Creator2DragonBonesEvents = _Creator2DragonBonesEvents;

  // packages/runtime2-bridge/src/tween.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2Tween = class _Creator2Tween {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    prepare(p) {
      var _a;
      const node = this.inspector.node(Json.string(p.nodeId, "nodeId"));
      let count = 0;
      const parse = (raw, depth) => {
        var _a2;
        if (++count > 100 || depth > 4) throw new CocosError("INVALID_ARGUMENT", "Tween composition exceeds 100 steps or depth 4");
        const row = Json.object(raw), action = String(row.action);
        if (!["to", "by", "delay", "sequence", "parallel"].includes(action)) throw new CocosError("INVALID_ARGUMENT", "Unsupported tween action");
        if (action === "sequence" || action === "parallel") {
          if (!Array.isArray(row.steps) || !row.steps.length) throw new CocosError("INVALID_ARGUMENT", "Composition requires nonempty steps");
          const children = row.steps.map((child) => parse(child, depth + 1)), keys2 = children.flatMap((child) => child.keys);
          if (action === "parallel" && new Set(keys2).size !== keys2.length) throw new CocosError("OPERATION_CONFLICT", "Parallel tween branches write the same property");
          return { action, duration: action === "parallel" ? Math.max(...children.map((child) => child.duration)) : children.reduce((total, child) => total + child.duration, 0), properties: {}, easing: "linear", children, keys: [...new Set(keys2)] };
        }
        const duration = Number(row.duration);
        if (!Number.isFinite(duration) || duration < 1e-3 || duration > 25) throw new CocosError("INVALID_ARGUMENT", "Tween duration must be 0.001..25 seconds");
        const properties = action === "delay" ? {} : Json.object(row.properties), keys = Object.keys(properties);
        if (action !== "delay" && !keys.length) throw new CocosError("INVALID_ARGUMENT", "Tween requires properties");
        for (const key of keys) {
          const value = properties[key];
          const bound = key === "opacity" ? 255 : key === "scaleX" || key === "scaleY" ? 100 : 1e5;
          if (!["x", "y", "angle", "scaleX", "scaleY", "opacity"].includes(key) || typeof value !== "number" || !Number.isFinite(value) || Math.abs(value) > bound || key === "opacity" && action === "to" && value < 0) throw new CocosError("INVALID_ARGUMENT", `Invalid tween property: ${key}`);
        }
        const easing = String((_a2 = row.easing) != null ? _a2 : "linear");
        if (!["linear", "quadIn", "quadOut", "quadInOut", "sineIn", "sineOut", "sineInOut"].includes(easing)) throw new CocosError("INVALID_ARGUMENT", "Unsupported easing");
        return { action, duration, properties, easing, children: [], keys };
      };
      const root = parse({ action: "sequence", steps: p.steps }, 0), repeat = Number((_a = p.repeat) != null ? _a : 1);
      if (!Number.isInteger(repeat) || repeat < 1 || repeat > 20 || root.duration * repeat > 25) throw new CocosError("INVALID_ARGUMENT", "Tween repeat must be 1..20 and total duration at most 25 seconds");
      return { node, root, repeat, duration: root.duration * repeat };
    }
    plan(p) {
      const { node, root, repeat, duration } = this.prepare(p);
      return {
        nodeId: RuntimeAccess.uuid(node),
        properties: root.keys,
        repeat,
        duration,
        before: this.state(node, root.keys),
        executable: true,
        limitations: ["\u89C4\u5212\u4E0D\u9501\u5B9A\u4E1A\u52A1\u52A8\u753B\uFF1Bstart \u65F6\u91CD\u65B0\u6821\u9A8C\uFF0C\u4E0D\u80FD\u4FDD\u8BC1\u5176\u4ED6\u4E1A\u52A1\u52A8\u4F5C\u4E0D\u540C\u65F6\u4FEE\u6539\u76EE\u6807", "\u76F8\u5BF9\u5C5E\u6027\u53D7\u539F\u751F\u8282\u70B9 setter \u7EA6\u675F\uFF1B\u53D6\u6D88\u4FDD\u7559\u5F53\u524D\u503C\uFF0C\u4E0D\u81EA\u52A8\u56DE\u6EDA\u4E1A\u52A1\u72B6\u6001"]
      };
    }
    state(node, keys) {
      return Object.fromEntries(keys.map((key) => [key, RuntimeAccess.safeData(node[key])]));
    }
    async run(p, frames, progress) {
      const { node, root, repeat, duration } = this.prepare(p), cc = this.inspector.environment.cc;
      if (!node.activeInHierarchy || node.isValid === false) throw new CocosError("CONTEXT_UNAVAILABLE", "Tween requires an active valid node");
      if (_Creator2Tween.owned.has(node)) throw new CocosError("RESOURCE_BUSY", "Another MCP tween owns this node");
      const build = (step) => {
        const tween2 = RuntimeAccess.object(RuntimeAccess.call(cc, "tween", node));
        if (step.action === "sequence") for (const child of step.children) RuntimeAccess.call(tween2, "then", build(child));
        else if (step.action === "parallel") RuntimeAccess.call(tween2, "parallel", ...step.children.map(build));
        else if (step.action === "delay") RuntimeAccess.call(tween2, "delay", step.duration);
        else RuntimeAccess.call(tween2, step.action, step.duration, step.properties, { easing: step.easing });
        return tween2;
      };
      const tween = build(root), before = this.state(node, root.keys), rows = [], token = frames.token();
      let completed = false, frame = 0, dropped = 0;
      RuntimeAccess.call(tween, "union");
      if (repeat > 1) RuntimeAccess.call(tween, "repeat", repeat);
      RuntimeAccess.call(tween, "call", () => {
        completed = true;
      });
      _Creator2Tween.owned.add(node);
      try {
        RuntimeAccess.call(tween, "start");
        while (!completed) {
          await frames.wait(token);
          if (node.isValid === false) throw new CocosError("STALE_HANDLE", "Tween target was destroyed");
          frame++;
          if (rows.length < 600) rows.push({ frame, values: this.state(node, root.keys) });
          else dropped++;
          progress({ frame, rows, dropped, completed, values: this.state(node, root.keys) });
          if (frame > 1e4) throw new CocosError("RESOURCE_BUSY", "Tween exceeded frame budget");
        }
        return { nodeId: RuntimeAccess.uuid(node), before, after: this.state(node, root.keys), duration, rows, dropped, completed: true, ownership: "mcp-created-tween-only" };
      } finally {
        try {
          RuntimeAccess.call(tween, "stop");
          _Creator2Tween.owned.delete(node);
        } catch (error) {
          throw new CocosError("OUTCOME_UNKNOWN", "Owned tween cleanup failed", { cause: CocosError.from(error).message });
        }
      }
    }
  };
  __publicField(_Creator2Tween, "owned", /* @__PURE__ */ new WeakSet());
  var Creator2Tween = _Creator2Tween;

  // packages/runtime2-bridge/src/collision.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Collision = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    colliders(node) {
      return this.inspector.components(node).filter((c) => ["cc.BoxCollider", "cc.CircleCollider", "cc.PolygonCollider"].includes(this.inspector.type(c)));
    }
    inspect(p) {
      const cc = this.inspector.environment.cc, manager = RuntimeAccess.object(RuntimeAccess.call(cc.director, "getCollisionManager"));
      const nodes = this.inspector.all(this.inspector.node(Json.string(p.rootId, "rootId")));
      const rows = nodes.flatMap((node) => this.colliders(node).map((c) => ({
        nodeId: RuntimeAccess.uuid(node),
        componentId: RuntimeAccess.uuid(c),
        type: this.inspector.type(c),
        enabled: Boolean(c.enabled),
        active: Boolean(node.activeInHierarchy),
        groupIndex: Number(node.groupIndex),
        tag: RuntimeAccess.safeData(c.tag),
        world: c.world ? { aabb: RuntimeAccess.safeData(RuntimeAccess.object(c.world).aabb), points: RuntimeAccess.safeData(RuntimeAccess.object(c.world).points), radius: RuntimeAccess.safeData(RuntimeAccess.object(c.world).radius), position: RuntimeAccess.safeData(RuntimeAccess.object(c.world).position) } : null
      })));
      return {
        enabled: Boolean(manager.enabled),
        groups: RuntimeAccess.safeData(RuntimeAccess.object(cc.game).groupList),
        matrix: RuntimeAccess.safeData(RuntimeAccess.object(cc.game).collisionMatrix),
        rows,
        coordinateSpace: "world-pixels",
        cachedGeometry: true,
        stepped: false,
        limitations: ["\u4E16\u754C\u8FB9\u754C\u6765\u81EA\u4E0A\u6B21\u539F\u751F\u66F4\u65B0\uFF1B\u7981\u7528\u3001\u6682\u505C\u6216\u5C1A\u672A\u66F4\u65B0\u65F6\u53EF\u80FD\u8FC7\u671F", "\u666E\u901A\u78B0\u649E\u5668\u4E0D\u540C\u4E8E Box2D \u7269\u7406\u78B0\u649E\u5668"]
      };
    }
    async trace(p, frames, progress = () => {
    }) {
      var _a;
      const cc = this.inspector.environment.cc, manager = RuntimeAccess.object(RuntimeAccess.call(cc.director, "getCollisionManager"));
      if (!manager.enabled) throw new CocosError("CONTEXT_UNAVAILABLE", "Collision manager is disabled");
      const count = Number(p.frames), limit = Number((_a = p.limit) != null ? _a : 1e3);
      if (!Number.isInteger(count) || count < 1 || count > 300 || !Number.isInteger(limit) || limit < 1 || limit > 5e3) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded collision trace");
      const nodes = this.inspector.all(this.inspector.node(Json.string(p.rootId, "rootId"))).filter((node) => node.activeInHierarchy && this.colliders(node).some((c) => c.enabled));
      if (nodes.length > 128) throw new CocosError("RESOURCE_BUSY", "Collision trace is limited to 128 receiver nodes");
      const rows = [], observers = [], token = frames.token();
      let active = true, dropped = 0, frame = 0;
      const record = (event, other, self) => {
        if (!active) return;
        if (rows.length >= limit) {
          dropped++;
          return;
        }
        rows.push({ event, frame, selfColliderId: RuntimeAccess.uuid(self), otherColliderId: RuntimeAccess.uuid(other), receiverNodeId: RuntimeAccess.uuid(RuntimeAccess.object(self).node), otherNodeId: RuntimeAccess.uuid(RuntimeAccess.object(other).node) });
      };
      const Observer = RuntimeAccess.call(cc, "Class", {
        extends: cc.Component,
        onCollisionEnter: (other, self) => record("enter", other, self),
        onCollisionStay: (other, self) => record("stay", other, self),
        onCollisionExit: (other, self) => record("exit", other, self)
      });
      try {
        for (const node of nodes) observers.push(RuntimeAccess.object(RuntimeAccess.call(node, "addComponent", Observer)));
        for (frame = 0; frame < count; frame++) {
          await frames.wait(token);
          progress({ completedFrames: frame + 1, totalFrames: count, recordedEvents: rows.length, dropped, rows });
        }
        return { rows, dropped, frames: count, receiverNodes: nodes.length, scope: "native-callback-deliveries", businessCallbacksPreserved: true };
      } finally {
        active = false;
        const failures = [];
        for (const observer of observers) if (observer.isValid !== false) {
          try {
            RuntimeAccess.call(observer, "destroy");
          } catch (error) {
            failures.push(CocosError.from(error).message);
          }
        }
        try {
          RuntimeAccess.call(cc.js, "unregisterClass", Observer);
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        if (failures.length) throw new CocosError("OUTCOME_UNKNOWN", "Collision observers stopped recording but cleanup is incomplete", { failures });
      }
    }
  };

  // packages/runtime2-bridge/src/material.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Material = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
      __publicField(this, "owned", /* @__PURE__ */ new Map());
    }
    async load(uuid) {
      return RuntimeAccess.object(await new Promise((accept, reject) => RuntimeAccess.call(this.inspector.environment.cc.assetManager, "loadAny", uuid, (error, asset) => error ? reject(error) : accept(asset))));
    }
    describe(material) {
      const effect = RuntimeAccess.object(material.effect), passes = effect.passes;
      return { materialUuid: RuntimeAccess.uuid(material), effectUuid: RuntimeAccess.uuid(material.effectAsset), technique: Number(material.techniqueIndex), rows: passes.map((pass, index) => ({ passIndex: index, properties: RuntimeAccess.safeData(pass._properties), defines: RuntimeAccess.safeData(pass._defines), states: { cullMode: RuntimeAccess.safeData(pass._cullMode), depthTest: RuntimeAccess.safeData(pass._depthTest), depthWrite: RuntimeAccess.safeData(pass._depthWrite), blend: RuntimeAccess.safeData(pass._blend) } })) };
    }
    async value(value) {
      if (Array.isArray(value)) return Promise.all(value.map((value2) => this.value(value2)));
      if (value && typeof value === "object") {
        if (value.type === "texture") return this.load(Json.string(value.uuid, "texture uuid"));
        const types = { color: "Color", vec2: "Vec2", vec3: "Vec3", vec4: "Vec4" };
        if (!types[String(value.type)] || !Array.isArray(value.value)) throw new CocosError("INVALID_ARGUMENT", "Use an explicit color/vec2/vec3/vec4/texture material value");
        return RuntimeAccess.construct(this.inspector.environment.cc[types[String(value.type)]], value.value);
      }
      return value;
    }
    async patch(material, p) {
      var _a, _b, _c;
      if (p.states && Object.keys(Json.object(p.states)).length) throw new CocosError("UNSUPPORTED_CAPABILITY", "Creator 2 pipeline state authoring requires version-specific state schema");
      const index = Number((_a = p.passIndex) != null ? _a : 0), passes = RuntimeAccess.object(material.effect).passes;
      if (!Number.isInteger(index) || !passes[index]) throw new CocosError("INVALID_ARGUMENT", "Invalid pass index");
      const pass = passes[index];
      for (const [name, value] of Object.entries(Json.object((_b = p.properties) != null ? _b : {}))) {
        if (!(name in RuntimeAccess.object(pass._properties))) throw new CocosError("INVALID_ARGUMENT", `Unknown material property ${name}`);
        RuntimeAccess.call(material, "setProperty", name, await this.value(value), index);
      }
      for (const [name, value] of Object.entries(Json.object((_c = p.defines) != null ? _c : {}))) {
        if (!(name in RuntimeAccess.object(pass._defines))) throw new CocosError("INVALID_ARGUMENT", `Unknown material define ${name}`);
        if (typeof value !== typeof RuntimeAccess.object(pass._defines)[name]) throw new CocosError("INVALID_ARGUMENT", `Invalid define type ${name}`);
        RuntimeAccess.call(material, "define", name, value, index);
      }
    }
    async serialized(p, serialize) {
      var _a, _b;
      const source = p.sourceUuid ? await this.load(Json.string(p.sourceUuid, "sourceUuid")) : void 0;
      if (source && this.inspector.type(source) !== "cc.Material") throw new CocosError("INVALID_ARGUMENT", "Expected source Material");
      const effect = p.effectUuid ? await this.load(Json.string(p.effectUuid, "effectUuid")) : source ? RuntimeAccess.object(source.effectAsset) : null;
      if (!effect || this.inspector.type(effect) !== "cc.EffectAsset") throw new CocosError("INVALID_ARGUMENT", "Expected EffectAsset");
      const material = RuntimeAccess.object(RuntimeAccess.call(this.inspector.environment.cc.Material, "create", effect, Number((_b = (_a = p.technique) != null ? _a : source == null ? void 0 : source.techniqueIndex) != null ? _b : 0)));
      try {
        if (source) {
          const passes = RuntimeAccess.object(source.effect).passes, targets = RuntimeAccess.object(material.effect).passes;
          for (const [index, pass] of passes.entries()) {
            if (!targets[index]) throw new CocosError("UNSUPPORTED_CAPABILITY", "Effect migration would discard a pass");
            for (const [name, uniform] of Object.entries(RuntimeAccess.object(pass._properties))) {
              if (!(name in RuntimeAccess.object(targets[index]._properties))) throw new CocosError("UNSUPPORTED_CAPABILITY", `Effect migration would discard property ${name}`);
              RuntimeAccess.object(targets[index]._properties)[name] = { ...RuntimeAccess.object(uniform) };
            }
            for (const [name, value] of Object.entries(RuntimeAccess.object(pass._defines))) {
              if (!(name in RuntimeAccess.object(targets[index]._defines))) throw new CocosError("UNSUPPORTED_CAPABILITY", `Effect migration would discard define ${name}`);
              RuntimeAccess.call(material, "define", name, value, index);
            }
          }
        }
        await this.patch(material, p);
        const data = serialize(material);
        return typeof data === "string" ? JSON.parse(data) : Json.value(data);
      } finally {
        RuntimeAccess.call(material, "destroy");
      }
    }
    async execute(id, p) {
      var _a, _b, _c;
      if (RuntimeAccess.engineVersion(this.inspector.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Material adapter requires Creator 2.4.15");
      const component = this.inspector.component(Json.string(p.componentId, "componentId")), slot = Number((_a = p.slot) != null ? _a : 0);
      if (!Number.isInteger(slot) || slot < 0 || !Array.isArray(component.materials) || slot >= component.materials.length) throw new CocosError("INVALID_ARGUMENT", "Invalid renderer material slot");
      const material = RuntimeAccess.object(component.materials[slot]), key = `${RuntimeAccess.uuid(component)}:${slot}`;
      if (id === "runtime.material.inspect") return this.describe(material);
      const owned = this.owned.get(key);
      if (owned && owned.current !== material) throw new CocosError("STALE_REVISION", "Material binding changed outside this tool");
      if (id === "runtime.material.reset") {
        if (!owned) return { restored: false };
        RuntimeAccess.call(component, "setMaterial", slot, owned.original);
        this.owned.delete(key);
        RuntimeAccess.call(owned.current, "destroy");
        return { restored: true };
      }
      const before = this.describe(material);
      const copy = RuntimeAccess.construct(this.inspector.environment.cc.MaterialVariant, [(_b = owned == null ? void 0 : owned.original) != null ? _b : material]);
      try {
        const passes = RuntimeAccess.object(material.effect).passes;
        for (const [index, pass] of passes.entries()) {
          const targetPass = RuntimeAccess.object(copy.effect).passes[index];
          for (const [name, uniform] of Object.entries(RuntimeAccess.object(pass._properties))) {
            const record = RuntimeAccess.object(uniform), value = record.value;
            RuntimeAccess.object(targetPass._properties)[name] = { ...record, value: ArrayBuffer.isView(value) && "slice" in value ? value.slice() : Array.isArray(value) ? value.slice() : value };
          }
          for (const name of Object.keys(RuntimeAccess.object(pass._defines))) RuntimeAccess.call(copy, "define", name, RuntimeAccess.call(material, "getDefine", name, index), index);
        }
        await this.patch(copy, p);
        RuntimeAccess.call(component, "setMaterial", slot, copy);
        const current = RuntimeAccess.object(component.materials[slot]);
        if (current !== copy) throw new CocosError("VERIFICATION_FAILED", "Renderer replaced the owned variant");
        this.owned.set(key, { component, slot, original: (_c = owned == null ? void 0 : owned.original) != null ? _c : material, current: copy });
        if (owned) RuntimeAccess.call(owned.current, "destroy");
        return { before, after: this.describe(copy), gpuValidated: false };
      } catch (error) {
        if (component.materials[slot] === copy) RuntimeAccess.call(component, "setMaterial", slot, material);
        RuntimeAccess.call(copy, "destroy");
        throw error;
      }
    }
    dispose() {
      for (const [key, row] of this.owned) {
        if (row.component.isValid !== false && row.component.materials[row.slot] === row.current) RuntimeAccess.call(row.component, "setMaterial", row.slot, row.original);
        RuntimeAccess.call(row.current, "destroy");
        this.owned.delete(key);
      }
    }
  };

  // packages/capability-catalog/src/creator2-support.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2Support = class _Creator2Support {
  };
  __publicField(_Creator2Support, "base", [
    "editor.status",
    "editor.environment",
    "scene.query",
    "scene.snapshot",
    "scene.diff",
    "scene.hierarchy",
    "scene.validate",
    "scene.open",
    "scene.create",
    "scene.save",
    "scene.save_copy",
    "scene.close",
    "scene.undo",
    "scene.redo",
    "node.find",
    "node.query",
    "node.create",
    "node.delete",
    "node.duplicate",
    "node.reparent",
    "node.set",
    "node.reset",
    "component.types",
    "component.add",
    "component.query",
    "component.delete",
    "component.set",
    "component.reset",
    "component.invoke",
    "prefab.create",
    "prefab.instantiate",
    "prefab.apply",
    "prefab.revert",
    "prefab.unlink",
    "asset.query",
    "asset.info",
    "asset.meta",
    "asset.create",
    "asset.save",
    "asset.import",
    "asset.move",
    "asset.copy",
    "asset.delete",
    "asset.refresh",
    "asset.reimport",
    "asset.set_meta",
    "asset.resolve",
    "asset.location",
    "asset.organize.plan",
    "asset.organize.apply",
    "asset.organize.recovery",
    "asset.references.scan",
    "asset.dependencies",
    "asset.users",
    "selection.query",
    "selection.set",
    "logs.query"
  ]);
  __publicField(_Creator2Support, "scene", ["ui.owned_snapshot", "ui.owned_remove", "asset.references.audit", "scene.references", "ui.structure.plan", "ui.structure.apply", "shader.environment", "shader.read", "shader.create", "shader.update", "shader.restore", "shader.inspect", "material.update", "material.apply_runtime", "material.migrate", "material.bindings", "material.query", "material.create", "material.clone", "material.properties", "material.defines", "material.states", "material.assign", "animation.clip.patch", "animation.clip.restore", "animation.clip.read", "animation.clip.create", "animation.clip.inspect", "animation.clip.sample", "animation2d.plan", "animation2d.create", "texture.inspect", "texture.plan_import", "texture.apply_import", "texture.restore_import", "spriteframe.inspect", "spriteframe.plan", "spriteframe.apply", "spriteframe.restore", "view.query", "view.set", "ui.plan", "ui.build", "ui.diff", "ui.apply", "ui.inspect_layout", "ui.validate_interaction"]);
  __publicField(_Creator2Support, "preview", ["preview.presets", "preview.runtime.connect", "preview.wait", "preview.refresh", "preview.refresh.status", "preview.refresh.cancel", "preview.network", "preview.websocket", "preview.diagnose", "preview.start", "preview.stop", "preview.status", "preview.capture", "preview.logs", "preview.resize", "preview.input", "preview.validate_viewports", "shader.preview.connect"]);
  __publicField(_Creator2Support, "features", [
    "runtime.dragonbones.fade",
    "runtime.spine.mix.inspect",
    "runtime.spine.mix.update",
    "runtime.dragonbones.details",
    "runtime.spine.details",
    "runtime.camera.sample_pixels",
    "runtime.camera.inspect",
    "runtime.camera.convert",
    "runtime.camera.culling",
    "runtime.resources.trend",
    "runtime.resources.snapshot",
    "runtime.resources.diff",
    "runtime.collision2d.inspect",
    "runtime.joint2d.inspect",
    ...["inspect", "force", "impulse"].map((action) => `runtime.rigidbody2d.${action}`),
    ...["inspect", "scroll", "page", "slider", "toggle", "text"].map((action) => `runtime.control.${action}`),
    "runtime.graphics.inspect",
    ...["state", "play", "pause", "resume", "stop", "seek"].map((action) => `runtime.animation.${action}`),
    ...["audio", "video"].flatMap((type) => ["state", "play", "pause", "stop", "seek"].map((action) => `runtime.${type}.${action}`)),
    "runtime.webview.inspect",
    "runtime.physics2d.inspect",
    "runtime.physics2d.raycast",
    "runtime.physics2d.test_point",
    "runtime.physics2d.test_aabb",
    "runtime.physics3d.inspect",
    "runtime.particle2d.state",
    "runtime.particle2d.restart",
    "runtime.particle2d.stop_emitting",
    "runtime.spine.inspect",
    "runtime.spine.play",
    "runtime.spine.set_skin",
    "runtime.spine.set_attachment",
    "runtime.dragonbones.inspect",
    "runtime.dragonbones.play",
    "runtime.ui.inspect",
    "runtime.ui.assert",
    "runtime.ui.hit_test",
    "runtime.render2d.audit",
    "runtime.label.audit",
    "runtime.atlas.inspect"
  ]);
  __publicField(_Creator2Support, "runtime", [
    "runtime.view.inspect",
    "runtime.view.configure",
    "runtime.view.restore",
    "runtime.ui.select",
    "runtime.ui.check",
    "runtime.scene.load",
    "runtime.lifecycle.snapshot",
    "runtime.physics2d.contact_trace_start",
    "runtime.spine.trace_start",
    "runtime.dragonbones.trace_start",
    "runtime.tween.plan",
    "runtime.tween.start",
    "runtime.collision2d.trace_start",
    "runtime.task.poll",
    "runtime.task.stop",
    "runtime.collision2d.trace",
    ..._Creator2Support.features,
    "runtime.tilemap.inspect",
    "runtime.tilemap.query_region",
    "runtime.tilemap.plan",
    "runtime.tilemap.apply",
    "runtime.shader.profile",
    "runtime.asset.load",
    "runtime.asset.preload",
    "runtime.asset.inspect",
    "runtime.asset.release",
    "runtime.bundle.inspect",
    "runtime.material.inspect",
    "runtime.material.update",
    "runtime.material.reset",
    "runtime.query",
    "runtime.hierarchy",
    "runtime.types",
    "runtime.inspect",
    "runtime.get",
    "runtime.set",
    "runtime.invoke",
    "runtime.create",
    "runtime.release",
    "runtime.subscribe",
    "runtime.unsubscribe",
    "runtime.events",
    "runtime.pause",
    "runtime.resume",
    "runtime.capture",
    "runtime.statistics"
  ]);
  var Creator2Support = _Creator2Support;

  // packages/runtime2-bridge/src/features.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime2-bridge/src/dragonbones-fade.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2DragonBonesFade = class _Creator2DragonBonesFade {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    states(animation) {
      const states = RuntimeAccess.call(animation, "getStates");
      if (!Array.isArray(states)) throw new CocosError("VERIFICATION_FAILED", "Unexpected DragonBones animation states");
      return [...states];
    }
    summary(state) {
      return Object.fromEntries(["name", "layer", "group", "currentTime", "playTimes", "weight", "fadeTotalTime", "isFadeIn", "isFadeOut", "isFadeComplete"].map((key) => [key, RuntimeAccess.safeData(state[key])]));
    }
    fade(p) {
      var _a, _b, _c, _d;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "dragonBones.ArmatureDisplay") throw new CocosError("INVALID_ARGUMENT", "Expected dragonBones.ArmatureDisplay");
      if (RuntimeAccess.call(component, "isAnimationCached")) throw new CocosError("UNSUPPORTED_CAPABILITY", "DragonBones blending requires realtime mode");
      const raw = RuntimeAccess.call(component, "armature");
      if (!raw) throw new CocosError("CONTEXT_UNAVAILABLE", "DragonBones armature is not initialized");
      const animation = RuntimeAccess.object(RuntimeAccess.object(raw).animation), name = Json.string(p.name, "name");
      if (!Array.isArray(animation.animationNames) || !animation.animationNames.includes(name)) throw new CocosError("NOT_FOUND", "DragonBones animation not found");
      const duration = p.duration, layer = (_a = p.layer) != null ? _a : 0, playTimes = (_b = p.playTimes) != null ? _b : 1, group = (_c = p.group) != null ? _c : "", mode = (_d = p.fadeOutMode) != null ? _d : "sameLayerAndGroup";
      if (typeof duration !== "number" || !Number.isFinite(duration) || duration < 0 || duration > 30 || typeof layer !== "number" || !Number.isInteger(layer) || layer < 0 || layer > 31 || typeof playTimes !== "number" || !Number.isInteger(playTimes) || playTimes < 0 || playTimes > 100 || typeof group !== "string" || group.length > 64 || typeof mode !== "string" || !_Creator2DragonBonesFade.modes.includes(mode)) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded DragonBones fade parameters");
      const beforeStates = this.states(animation);
      if (beforeStates.length >= 32) throw new CocosError("RESOURCE_BUSY", "DragonBones fade is limited to fewer than 32 existing states");
      const before = beforeStates.map((state) => this.summary(state));
      try {
        const selected = RuntimeAccess.call(animation, "fadeIn", name, duration, playTimes, layer, group, _Creator2DragonBonesFade.modes.indexOf(mode));
        const afterStates = this.states(animation);
        if (!selected || !afterStates.includes(RuntimeAccess.object(selected))) throw new Error("Native fade did not return a registered state");
        return {
          before,
          after: afterStates.map((state) => this.summary(state)),
          selected: this.summary(RuntimeAccess.object(selected)),
          reused: beforeStates.includes(RuntimeAccess.object(selected)),
          requested: { name, duration, layer, group, playTimes, fadeOutMode: mode },
          persisted: false,
          limitations: ["\u6DE1\u51FA\u53EF\u5F71\u54CD\u5339\u914D\u89C4\u5219\u5185\u7684\u4E1A\u52A1\u52A8\u753B\uFF1B\u4E0D\u81EA\u52A8\u6062\u590D\u5DF2\u7ECF\u63A8\u8FDB\u7684\u65F6\u95F4\u7EBF\uFF0C\u4E5F\u4E0D\u4F2A\u9020\u7F13\u5B58\u6A21\u5F0F\u6DF7\u5408"]
        };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "DragonBones fade or readback failed", { before, cause: CocosError.from(error).message });
      }
    }
  };
  __publicField(_Creator2DragonBonesFade, "modes", ["none", "sameLayer", "sameGroup", "sameLayerAndGroup", "all", "single"]);
  var Creator2DragonBonesFade = _Creator2DragonBonesFade;

  // packages/runtime2-bridge/src/spine-mix.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2SpineMix = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    execute(p, update) {
      var _a;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "sp.Skeleton") throw new CocosError("INVALID_ARGUMENT", "Expected sp.Skeleton");
      if (RuntimeAccess.call(component, "isAnimationCached")) throw new CocosError("UNSUPPORTED_CAPABILITY", "Spine animation mixing requires realtime mode");
      const raw = RuntimeAccess.call(component, "getState");
      if (!raw) throw new CocosError("CONTEXT_UNAVAILABLE", "Spine animation state is not initialized");
      const data = RuntimeAccess.object(RuntimeAccess.object(raw).data), skeleton = RuntimeAccess.object(data.skeletonData), table = RuntimeAccess.object(data.animationToMixTime);
      const from = Json.string(p.from, "from"), to = Json.string(p.to, "to"), key = `${from}.${to}`;
      const fromAnimation = RuntimeAccess.call(skeleton, "findAnimation", from), toAnimation = RuntimeAccess.call(skeleton, "findAnimation", to);
      if (!fromAnimation || !toAnimation) throw new CocosError("NOT_FOUND", "Spine mix animation not found");
      if (!Array.isArray(skeleton.animations) || skeleton.animations.length > 1e4) throw new CocosError("VERIFICATION_FAILED", "Unexpected Spine animation list");
      const names = skeleton.animations.map((animation) => String(animation.name)), unique = new Set(names);
      if (unique.size !== names.length || names.filter((name) => key.startsWith(`${name}.`) && unique.has(key.slice(name.length + 1))).length !== 1) throw new CocosError("OPERATION_CONFLICT", "Spine native mix key is ambiguous");
      const read = () => {
        const duration = RuntimeAccess.call(data, "getMix", fromAnimation, toAnimation), defaultDuration = data.defaultMix;
        const overrideDuration = Object.prototype.hasOwnProperty.call(table, key) ? table[key] : null;
        if (![duration, defaultDuration, ...overrideDuration === null ? [] : [overrideDuration]].every((value) => typeof value === "number" && Number.isFinite(value) && value >= 0)) throw new CocosError("VERIFICATION_FAILED", "Spine mix contains invalid duration");
        return { duration: Number(duration), defaultDuration: Number(defaultDuration), overrideDuration: overrideDuration === null ? null : Number(overrideDuration) };
      };
      const before = read();
      if (!update) return { from, to, ...before, scope: "runtime-animation-state", affectsExistingTracks: false };
      if (p.duration !== null && (typeof p.duration !== "number" || !Number.isFinite(p.duration) || p.duration < 0 || p.duration > 30)) throw new CocosError("INVALID_ARGUMENT", "duration must be null or 0..30 seconds");
      if (Json.canonical(Json.object(p.expected)) !== Json.canonical(before)) throw new CocosError("OPERATION_CONFLICT", "Spine mix changed since inspection", { current: before });
      try {
        if (p.duration === null) {
          if (!Reflect.deleteProperty(table, key)) throw new Error("Mix override could not be removed");
        } else RuntimeAccess.call(component, "setMix", from, to, p.duration);
        const after = read();
        if (RuntimeAccess.call(component, "getState") !== raw || after.overrideDuration !== p.duration || after.duration !== ((_a = p.duration) != null ? _a : before.defaultDuration)) throw new Error("Native mix readback differs");
        return { from, to, before, after, scope: "runtime-animation-state", affectsExistingTracks: false, persisted: false };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Spine mix update or verification failed", { before, cause: CocosError.from(error).message });
      }
    }
  };

  // packages/runtime2-bridge/src/dragonbones.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2DragonBones = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    fields(value, keys) {
      return Object.fromEntries(keys.map((key) => [key, RuntimeAccess.safeData(value[key])]));
    }
    details(p) {
      var _a;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "dragonBones.ArmatureDisplay") throw new CocosError("INVALID_ARGUMENT", "Expected dragonBones.ArmatureDisplay");
      const limit = Number((_a = p.limit) != null ? _a : 200);
      if (!Number.isInteger(limit) || limit < 1 || limit > 1e3) throw new CocosError("INVALID_ARGUMENT", "limit must be 1..1000");
      const raw = RuntimeAccess.call(component, "armature");
      if (!raw) throw new CocosError("CONTEXT_UNAVAILABLE", "DragonBones armature is not initialized");
      const armature = RuntimeAccess.object(raw), data = RuntimeAccess.object(armature.armatureData);
      if (!Array.isArray(data.sortedBones) || !Array.isArray(data.sortedSlots)) throw new CocosError("VERIFICATION_FAILED", "Unexpected DragonBones armature data");
      const cached = Boolean(RuntimeAccess.call(component, "isAnimationCached"));
      const bones = data.sortedBones.slice(0, limit).map((bone) => {
        const live = cached ? null : RuntimeAccess.call(armature, "getBone", String(bone.name));
        return {
          name: String(bone.name),
          parent: bone.parent ? String(RuntimeAccess.object(bone.parent).name) : null,
          length: RuntimeAccess.safeData(bone.length),
          setup: bone.transform ? this.fields(RuntimeAccess.object(bone.transform), ["x", "y", "rotation", "skew", "scaleX", "scaleY"]) : null,
          pose: live ? this.fields(RuntimeAccess.object(RuntimeAccess.object(live).globalTransformMatrix), ["a", "b", "c", "d", "tx", "ty"]) : null
        };
      });
      const slots = data.sortedSlots.slice(0, limit).map((slot) => {
        const live = cached ? null : RuntimeAccess.call(armature, "getSlot", String(slot.name));
        return {
          name: String(slot.name),
          bone: slot.parent ? String(RuntimeAccess.object(slot.parent).name) : null,
          setupDisplayIndex: RuntimeAccess.safeData(slot.displayIndex),
          blendMode: RuntimeAccess.safeData(slot.blendMode),
          displayIndex: live ? RuntimeAccess.safeData(RuntimeAccess.object(live).displayIndex) : null,
          liveAvailable: Boolean(live)
        };
      });
      const nativeStates = cached ? null : RuntimeAccess.call(armature.animation, "getStates");
      if (nativeStates !== null && !Array.isArray(nativeStates)) throw new CocosError("VERIFICATION_FAILED", "Unexpected DragonBones animation states");
      const states = Array.isArray(nativeStates) ? nativeStates.slice(0, 32).map((state) => ({ ...this.fields(
        RuntimeAccess.object(state),
        ["name", "layer", "group", "currentTime", "totalTime", "currentPlayTimes", "playTimes", "timeScale", "weight", "isPlaying", "isCompleted", "isFadeIn", "isFadeOut", "isFadeComplete", "fadeTotalTime"]
      ), fadeProgress: RuntimeAccess.safeData(RuntimeAccess.object(state)._fadeProgress), effectiveWeight: RuntimeAccess.safeData(RuntimeAccess.object(state)._weightResult) })) : null;
      return {
        componentId: RuntimeAccess.uuid(component),
        armatureName: RuntimeAccess.safeData(component.armatureName),
        cached,
        bones,
        slots,
        states,
        totals: { bones: data.sortedBones.length, slots: data.sortedSlots.length, states: Array.isArray(nativeStates) ? nativeStates.length : null },
        truncated: data.sortedBones.length > limit || data.sortedSlots.length > limit || Array.isArray(nativeStates) && nativeStates.length > 32,
        poseSpace: "armature-local",
        rotationUnit: "radians",
        livePoseAvailable: !cached && bones.some((bone) => bone.pose !== null),
        stateAvailable: !cached,
        limitations: cached ? ["\u7F13\u5B58\u6A21\u5F0F\u4EC5\u8FD4\u56DE\u9759\u6001\u7ED3\u6784\uFF1B\u59FF\u6001\u4E0E\u52A8\u753B\u72B6\u6001\u4E0D\u4EE3\u8868\u7EC4\u4EF6\u663E\u793A\u5E27\uFF0C\u8FD4\u56DE null"] : ["\u77E9\u9635\u5C5E\u4E8E\u9AA8\u67B6\u5750\u6807\uFF0C\u4E0D\u662F\u573A\u666F\u4E16\u754C\u5750\u6807\uFF1B\u4EC5\u8BFB\u53D6\u5DF2\u6709\u6C42\u503C\u7ED3\u679C\uFF0C\u4E0D\u63A8\u8FDB\u52A8\u753B"]
      };
    }
  };

  // packages/runtime2-bridge/src/resource-snapshot.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var _Creator2ResourceSnapshot = class _Creator2ResourceSnapshot {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    session() {
      let session = _Creator2ResourceSnapshot.sessions.get(this.inspector);
      if (!session) {
        session = { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, sequence: 0, baselines: /* @__PURE__ */ new Map() };
        _Creator2ResourceSnapshot.sessions.set(this.inspector, session);
      }
      return session;
    }
    snapshot() {
      const cc = this.inspector.environment.cc, manager = RuntimeAccess.object(cc.assetManager), rows = [], bundles = [];
      let dependencies = 0;
      RuntimeAccess.call(manager.assets, "forEach", (raw, key) => {
        var _a;
        if (rows.length >= 1e4) throw new CocosError("RESOURCE_BUSY", "Resource snapshot exceeds 10000 cached assets");
        const asset = RuntimeAccess.object(raw), uuid = RuntimeAccess.uuid(asset) || String(key);
        const deps = RuntimeAccess.call(manager.dependUtil, "getDeps", uuid);
        if (!Array.isArray(deps) || !deps.every((value) => typeof value === "string")) throw new CocosError("VERIFICATION_FAILED", "Unexpected native asset dependency data");
        dependencies += deps.length;
        if (dependencies > 1e5) throw new CocosError("RESOURCE_BUSY", "Resource dependency snapshot exceeds limit");
        rows.push({
          key: String(key),
          uuid,
          type: this.inspector.type(asset),
          name: String((_a = asset.name) != null ? _a : ""),
          refCount: typeof asset.refCount === "number" && Number.isFinite(asset.refCount) ? asset.refCount : null,
          valid: asset.isValid !== false,
          dependencies: [...new Set(deps)].sort()
        });
      });
      RuntimeAccess.call(manager.bundles, "forEach", (raw) => {
        var _a, _b;
        const bundle = RuntimeAccess.object(raw);
        if (bundles.length >= 1e3) throw new CocosError("RESOURCE_BUSY", "Bundle snapshot exceeds limit");
        bundles.push({ name: String((_a = bundle.name) != null ? _a : ""), base: String((_b = bundle.base) != null ? _b : "") });
      });
      rows.sort((a, b) => String(a.key).localeCompare(String(b.key)));
      bundles.sort((a, b) => String(a.name).localeCompare(String(b.name)));
      const session = this.session();
      const snapshot = {
        format: "creator2-resource-snapshot-v1",
        runtimeId: session.id,
        snapshotId: `${session.id}:${++session.sequence}`,
        engineVersion: RuntimeAccess.engineVersion(cc),
        sceneId: RuntimeAccess.uuid(RuntimeAccess.call(cc.director, "getScene")),
        rows,
        bundles,
        complete: true,
        scope: "assetManager-cache",
        retainedCount: rows.length,
        memoryBytes: null,
        limitations: ["\u5F15\u7528\u8BA1\u6570\u4E0D\u7B49\u4E8E\u5168\u90E8 JavaScript \u5F15\u7528\uFF1B\u7F13\u5B58\u9A7B\u7559\u4E0D\u7B49\u4E8E\u6CC4\u6F0F", "\u76F4\u63A5\u4F9D\u8D56\u6765\u81EA\u539F\u751F dependUtil \u7F13\u5B58\uFF0C\u4E0D\u4EE3\u8868\u6240\u6709\u52A8\u6001\u52A0\u8F7D\u5173\u7CFB", "\u672A\u6D4B\u91CF JS \u5806\u6216 GPU \u663E\u5B58"]
      };
      session.baselines.set(String(snapshot.snapshotId), Json.canonical(snapshot));
      let characters = [...session.baselines.values()].reduce((total, value) => total + value.length, 0);
      while (session.baselines.size > 4 || characters > 4 * 1024 * 1024) {
        const key = session.baselines.keys().next().value;
        characters -= session.baselines.get(key).length;
        session.baselines.delete(key);
      }
      return snapshot;
    }
    diff(p) {
      var _a;
      const baseline = Json.object(p.baseline);
      if (baseline.format !== "creator2-resource-snapshot-v1" || baseline.engineVersion !== "2.4.15" || baseline.complete !== true || !Array.isArray(baseline.rows) || baseline.rows.length > 1e4) throw new CocosError("INVALID_ARGUMENT", "Expected complete Creator 2.4.15 resource snapshot");
      const old = /* @__PURE__ */ new Map();
      let dependencies = 0;
      for (const raw of baseline.rows) {
        const row = Json.object(raw), key = Json.string(row.key, "snapshot key");
        if (old.has(key) || typeof row.uuid !== "string" || !Array.isArray(row.dependencies) || !row.dependencies.every((v) => typeof v === "string") || !(row.refCount === null || typeof row.refCount === "number" && Number.isFinite(row.refCount))) throw new CocosError("INVALID_ARGUMENT", "Invalid or duplicate resource baseline");
        dependencies += row.dependencies.length;
        if (dependencies > 1e5 || typeof row.name !== "string" || typeof row.type !== "string" || typeof row.valid !== "boolean") throw new CocosError("INVALID_ARGUMENT", "Invalid or oversized resource baseline");
        old.set(key, { key, uuid: row.uuid, type: row.type, name: row.name, refCount: row.refCount, valid: row.valid, dependencies: [...new Set(row.dependencies)].sort() });
      }
      const session = this.session();
      const sameRuntimeVerified = baseline.runtimeId === session.id && session.baselines.get(String(baseline.snapshotId)) === Json.canonical(baseline);
      const baselineVerification = sameRuntimeVerified ? "retained-native-snapshot" : baseline.runtimeId !== session.id ? "different-or-unknown-runtime" : "modified-or-expired-baseline";
      const current = this.snapshot(), rows = [], currentRows = current.rows;
      let unchanged = 0;
      for (const after of currentRows) {
        const before = old.get(String(after.key));
        old.delete(String(after.key));
        if (!before) rows.push({ status: "added", key: after.key, after });
        else if (Json.canonical(before) !== Json.canonical(after)) rows.push({ status: "changed", key: after.key, before, after });
        else unchanged++;
      }
      for (const before of old.values()) rows.push({ status: "removed", key: before.key, before });
      return {
        rows,
        unchanged,
        beforeCount: baseline.rows.length,
        afterCount: currentRows.length,
        beforeSceneId: (_a = baseline.sceneId) != null ? _a : null,
        afterSceneId: current.sceneId,
        current,
        sameRuntimeVerified,
        baselineVerification,
        leakDetected: null,
        limitations: ["\u4EC5\u8FD1\u671F\u539F\u6837\u8FD4\u56DE\u7684\u672C\u5B9E\u4F8B\u5FEB\u7167\u53EF\u9A8C\u8BC1\u6765\u6E90\uFF1B\u8FC7\u671F\u3001\u4FEE\u6539\u6216\u8DE8\u5B9E\u4F8B\u57FA\u7EBF\u4EC5\u4F5C\u6570\u636E\u6BD4\u8F83", "\u5207\u573A\u666F\u540E\u7684\u9A7B\u7559\u9700\u7ED3\u5408\u4E1A\u52A1\u5E38\u9A7B\u8D44\u6E90\u3001\u4F9D\u8D56\u548C\u91CD\u590D\u91C7\u6837\u5206\u6790"]
      };
    }
    trend(p) {
      const ids = p.snapshotIds;
      if (!Array.isArray(ids) || ids.length < 2 || ids.length > 4 || !ids.every((id) => typeof id === "string") || new Set(ids).size !== ids.length) throw new CocosError("INVALID_ARGUMENT", "Provide 2..4 distinct retained snapshot IDs in capture order");
      const session = this.session(), order = [...session.baselines.keys()];
      let previous = -1;
      const snapshots = ids.map((id) => {
        const index = order.indexOf(String(id)), serialized = session.baselines.get(String(id));
        if (!serialized) throw new CocosError("STALE_HANDLE", "Resource snapshot expired or belongs to another runtime");
        if (index <= previous) throw new CocosError("INVALID_ARGUMENT", "Resource snapshots must follow capture order");
        previous = index;
        return JSON.parse(serialized);
      });
      const points = snapshots.map((snapshot) => ({ snapshotId: snapshot.snapshotId, sceneId: snapshot.sceneId, retainedCount: snapshot.retainedCount, bundleCount: snapshot.bundles.length }));
      const tables = snapshots.map((snapshot) => new Map(snapshot.rows.map((row) => [String(row.key), row])));
      const keys = [...new Set(tables.flatMap((table) => [...table.keys()]))].sort();
      const rows = keys.map((key) => {
        const observations = tables.map((table) => table.get(key));
        const first = observations[0], last = observations[observations.length - 1];
        const counts = observations.map((row) => {
          var _a;
          return (_a = row == null ? void 0 : row.refCount) != null ? _a : null;
        });
        return {
          key,
          uuid: observations.find(Boolean).uuid,
          present: observations.map(Boolean),
          refCounts: counts,
          persistent: observations.every(Boolean),
          appeared: !first && Boolean(last),
          disappeared: Boolean(first) && !last,
          referenceGrowth: typeof (first == null ? void 0 : first.refCount) === "number" && typeof (last == null ? void 0 : last.refCount) === "number" ? last.refCount - first.refCount : null
        };
      });
      return {
        runtimeId: session.id,
        sameRuntimeVerified: true,
        points,
        rows,
        leakDetected: null,
        limitations: ["\u6700\u591A\u6BD4\u8F83\u56DB\u4EFD\u4ECD\u4FDD\u7559\u7684\u539F\u59CB\u5FEB\u7167\uFF1B\u8D85\u5927\u5FEB\u7167\u53EF\u80FD\u4E0D\u8FDB\u5165\u6765\u6E90\u7F13\u5B58", "\u6301\u7EED\u9A7B\u7559\u6216\u5F15\u7528\u589E\u957F\u4EC5\u4E3A\u89C2\u6D4B\u4E8B\u5B9E\uFF1B\u9700\u7ED3\u5408\u4E1A\u52A1\u5E38\u9A7B\u7B56\u7565\u548C\u91CD\u590D\u5B8C\u6574\u751F\u547D\u5468\u671F\u5224\u65AD"]
      };
    }
  };
  // Features 每次调用重建；以 inspector 绑定预览实例，切场景仍保留同一运行实例身份。
  __publicField(_Creator2ResourceSnapshot, "sessions", /* @__PURE__ */ new WeakMap());
  var Creator2ResourceSnapshot = _Creator2ResourceSnapshot;

  // packages/runtime2-bridge/src/camera.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Camera = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    camera(p) {
      const camera = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(camera) !== "cc.Camera") throw new CocosError("INVALID_ARGUMENT", "Expected cc.Camera");
      return camera;
    }
    inspect(p) {
      const camera = this.camera(p), node = RuntimeAccess.object(camera.node), cc = this.inspector.environment.cc;
      const target = camera.targetTexture ? RuntimeAccess.object(camera.targetTexture) : null;
      return {
        componentId: RuntimeAccess.uuid(camera),
        nodeId: RuntimeAccess.uuid(node),
        enabled: Boolean(camera.enabled),
        active: Boolean(node.activeInHierarchy),
        is3D: Boolean(node.is3DNode),
        alignWithScreen: RuntimeAccess.safeData(camera.alignWithScreen),
        depth: RuntimeAccess.safeData(camera.depth),
        zoomRatio: RuntimeAccess.safeData(camera.zoomRatio),
        ortho: RuntimeAccess.safeData(camera.ortho),
        nearClip: RuntimeAccess.safeData(camera.nearClip),
        farClip: RuntimeAccess.safeData(camera.farClip),
        cullingMask: Number(camera.cullingMask) >>> 0,
        rect: RuntimeAccess.safeData(camera.rect),
        clearFlags: RuntimeAccess.safeData(camera.clearFlags),
        backgroundColor: RuntimeAccess.safeData(camera.backgroundColor),
        visibleRect: { width: RuntimeAccess.safeData(RuntimeAccess.object(cc.visibleRect).width), height: RuntimeAccess.safeData(RuntimeAccess.object(cc.visibleRect).height), center: RuntimeAccess.safeData(RuntimeAccess.object(cc.visibleRect).center) },
        targetTexture: target ? { uuid: RuntimeAccess.uuid(target), width: RuntimeAccess.safeData(target.width), height: RuntimeAccess.safeData(target.height), valid: target.isValid !== false } : null,
        limitations: ["\u5C4F\u5E55\u5750\u6807\u6CBF\u7528\u539F\u751F visibleRect \u5750\u6807\u7CFB\uFF0C\u4E0D\u7B49\u4E8E\u6D4F\u89C8\u5668 CSS \u50CF\u7D20\u6216\u622A\u56FE\u50CF\u7D20", "\u72B6\u6001\u67E5\u8BE2\u4E0D\u8BC1\u660E\u6700\u7EC8\u53EF\u89C1\u6027\u3001\u906E\u6321\u6216\u50CF\u7D20\u8F93\u51FA"]
      };
    }
    convert(p) {
      const camera = this.camera(p), cc = this.inspector.environment.cc;
      const is3D = Boolean(RuntimeAccess.object(camera.node).is3DNode);
      if (!is3D && camera.alignWithScreen !== true) throw new CocosError("UNSUPPORTED_CAPABILITY", "2D conversion requires alignWithScreen");
      if (is3D && camera.alignWithScreen !== false) throw new CocosError("UNSUPPORTED_CAPABILITY", "3D conversion requires an explicit non-screen-aligned projection");
      if (typeof camera.zoomRatio !== "number" || !Number.isFinite(camera.zoomRatio) || camera.zoomRatio <= 0) throw new CocosError("CONTEXT_UNAVAILABLE", "Camera zoom must be positive and finite");
      const point = Json.object(p.point);
      if (!["world-to-screen", "screen-to-world"].includes(String(p.direction)) || ![point.x, point.y].every((value2) => typeof value2 === "number" && Number.isFinite(value2) && Math.abs(value2) <= 1e7)) throw new CocosError("INVALID_ARGUMENT", "Expected a finite 2D point and explicit conversion direction");
      let depth = point.z;
      if (is3D) {
        if (typeof depth !== "number" || !Number.isFinite(depth) || Math.abs(depth) > 1e7) throw new CocosError("INVALID_ARGUMENT", "3D conversion requires finite z");
        const near = Number(camera.nearClip), far = Number(camera.farClip), rect = RuntimeAccess.object(camera.rect);
        if (!(near > 0 && far > near && Number.isFinite(far) && Number(rect.width) > 0 && Number(rect.height) > 0)) throw new CocosError("CONTEXT_UNAVAILABLE", "Invalid camera clipping planes or viewport");
        if (p.direction === "screen-to-world") {
          if (depth < 0 || depth > 1) throw new CocosError("INVALID_ARGUMENT", "Screen projection depth must be in 0..1");
          if (!camera.ortho) {
            const distance = near * far / (far - depth * (far - near));
            const referenceDistance = 2 * near * far / (far + near - 0.9999 * (far - near));
            depth = (distance / referenceDistance - near / far) / (1 - near / far);
          }
        }
      }
      const nativePoint = RuntimeAccess.construct(is3D ? cc.Vec3 : cc.Vec2, is3D ? [point.x, point.y, depth] : [point.x, point.y]);
      const value = RuntimeAccess.object(RuntimeAccess.call(camera, p.direction === "world-to-screen" ? "getWorldToScreenPoint" : "getScreenToWorldPoint", nativePoint));
      if (!(is3D ? [value.x, value.y, value.z] : [value.x, value.y]).every((coordinate) => typeof coordinate === "number" && Number.isFinite(coordinate))) throw new CocosError("VERIFICATION_FAILED", "Camera returned non-finite coordinates");
      return {
        componentId: RuntimeAccess.uuid(camera),
        direction: p.direction,
        point: { x: Number(value.x), y: Number(value.y), ...is3D ? { z: Number(value.z) } : {} },
        dimension: is3D ? 3 : 2,
        coordinateSpace: "native-visibleRect",
        pixelVerified: false,
        ...is3D ? { screenDepthEncoding: "projection-depth-0-to-1", projection: camera.ortho ? "orthographic" : "perspective" } : {}
      };
    }
    culling(p) {
      const camera = this.camera(p), node = this.inspector.node(Json.string(p.nodeId, "nodeId"));
      const groupIndex = Number(node.groupIndex);
      if (!Number.isInteger(groupIndex) || groupIndex < 0 || groupIndex > 31) throw new CocosError("VERIFICATION_FAILED", "Invalid native node group index");
      const cullingMask = Number(camera.cullingMask) >>> 0;
      const maskMatches = (cullingMask & 1 << groupIndex) !== 0;
      return {
        componentId: RuntimeAccess.uuid(camera),
        nodeId: RuntimeAccess.uuid(node),
        groupIndex,
        cullingMask,
        maskMatches,
        nativeContainsNode: Boolean(RuntimeAccess.call(camera, "containsNode", node)),
        visible: null,
        limitations: ["\u4EC5\u68C0\u67E5\u8282\u70B9\u5206\u7EC4\u4E0E\u76F8\u673A\u63A9\u7801\uFF1B\u4E0D\u4EE3\u8868\u5728\u89C6\u9525\u5185\u3001\u4E0D\u88AB Mask \u906E\u6321\u6216\u5B9E\u9645\u4EA7\u751F\u50CF\u7D20"]
      };
    }
    samplePixels(p) {
      const camera = this.camera(p), cc = this.inspector.environment.cc, node = RuntimeAccess.object(camera.node);
      const width = Number(p.width), height = Number(p.height), points = p.points;
      if (![width, height].every((value) => Number.isInteger(value) && value >= 1 && value <= 512) || !Array.isArray(points) || points.length < 1 || points.length > 64) throw new CocosError("INVALID_ARGUMENT", "Expected 1..512 texture dimensions and 1..64 pixel coordinates");
      const coordinates = points.map((raw) => {
        const point = Json.object(raw);
        if (!Number.isInteger(point.x) || !Number.isInteger(point.y) || Number(point.x) < 0 || Number(point.x) >= width || Number(point.y) < 0 || Number(point.y) >= height) throw new CocosError("INVALID_ARGUMENT", "Pixel coordinate is outside render texture");
        return { x: Number(point.x), y: Number(point.y) };
      });
      if (node.is3DNode || camera.alignWithScreen !== true) throw new CocosError("UNSUPPORTED_CAPABILITY", "Pixel sampling currently requires a screen-aligned 2D camera");
      const gl = RuntimeAccess.object(RuntimeAccess.object(cc.game)._renderContext);
      if (!["readPixels", "isTexture", "isFramebuffer", "isRenderbuffer", "isContextLost"].every((method) => typeof gl[method] === "function") || typeof gl.DEPTH_STENCIL !== "number") throw new CocosError("UNSUPPORTED_CAPABILITY", "Pixel sampling requires WebGL depth/stencil and object validation support");
      if (RuntimeAccess.call(gl, "isContextLost")) throw new CocosError("CONTEXT_UNAVAILABLE", "WebGL context is lost");
      const root = p.rootId === void 0 ? this.inspector.current() : this.inspector.node(Json.string(p.rootId, "rootId"));
      const originalTarget = camera.targetTexture, position = { x: node.x, y: node.y, z: node.z }, angle = node.angle;
      const texture = RuntimeAccess.object(RuntimeAccess.construct(cc.RenderTexture, []));
      const rows = [];
      const handles = [];
      try {
        RuntimeAccess.call(texture, "initWithSize", width, height, gl.DEPTH_STENCIL);
        for (const [property, method] of [["_texture", "isTexture"], ["_framebuffer", "isFramebuffer"], ["_depthStencilBuffer", "isRenderbuffer"]]) {
          const handle = RuntimeAccess.object(texture[property])._glID;
          if (!handle) throw new CocosError("VERIFICATION_FAILED", `Missing native ${property} handle`);
          handles.push({ method, handle });
        }
        camera.targetTexture = texture;
        RuntimeAccess.call(camera, "render", root);
        if (handles.some(({ method, handle }) => !RuntimeAccess.call(gl, method, handle))) throw new CocosError("VERIFICATION_FAILED", "Offscreen GPU objects are not live after rendering");
        for (const point of coordinates) {
          const pixels = new Uint8Array(4);
          const read = RuntimeAccess.call(texture, "readPixels", pixels, point.x, point.y, 1, 1);
          if (read !== pixels) throw new CocosError("VERIFICATION_FAILED", "Native pixel read did not return the supplied buffer");
          rows.push({ ...point, rgba: Array.from(pixels) });
        }
      } finally {
        const failures = [];
        try {
          camera.targetTexture = originalTarget;
          RuntimeAccess.call(camera, "beforeDraw");
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        try {
          RuntimeAccess.call(node, "setPosition", position.x, position.y, position.z);
          node.angle = angle;
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        try {
          RuntimeAccess.call(texture, "destroy");
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        try {
          if (texture._depthStencilBuffer) {
            RuntimeAccess.call(texture._depthStencilBuffer, "destroy");
            texture._depthStencilBuffer = null;
          }
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        try {
          if (RuntimeAccess.call(gl, "isContextLost")) failures.push("WebGL context lost during cleanup verification");
          else for (const { method, handle } of handles) if (RuntimeAccess.call(gl, method, handle)) failures.push(`${method} reports a surviving temporary GPU object`);
        } catch (error) {
          failures.push(CocosError.from(error).message);
        }
        if (failures.length) throw new CocosError("OUTCOME_UNKNOWN", "Offscreen sampling cleanup failed", { failures });
      }
      return {
        rows,
        width,
        height,
        format: "RGBA8",
        origin: "bottom-left",
        scope: "temporary-offscreen-render",
        targetRestored: camera.targetTexture === originalTarget,
        temporaryResourcesDestroyed: true,
        gpuObjectDeletionVerified: true,
        limitations: ["\u91C7\u6837\u6765\u81EA\u4E00\u6B21\u624B\u52A8\u79BB\u5C4F\u6E32\u67D3\uFF0C\u4E0D\u4EE3\u8868\u6D4F\u89C8\u5668\u5408\u6210\u622A\u56FE\u6216\u9A71\u52A8\u663E\u5B58\u6D4B\u91CF", "\u4EC5\u8FD4\u56DE\u6307\u5B9A\u50CF\u7D20\uFF1B\u672A\u91C7\u6837\u533A\u57DF\u4E0D\u80FD\u636E\u6B64\u5224\u5B9A"]
      };
    }
  };

  // packages/runtime2-bridge/src/spine.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Spine = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    fields(value, keys) {
      return Object.fromEntries(keys.map((key) => [key, RuntimeAccess.safeData(value[key])]));
    }
    details(p) {
      var _a;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(component) !== "sp.Skeleton") throw new CocosError("INVALID_ARGUMENT", "Expected sp.Skeleton");
      const limit = Number((_a = p.limit) != null ? _a : 200);
      if (!Number.isInteger(limit) || limit < 1 || limit > 1e3) throw new CocosError("INVALID_ARGUMENT", "limit must be 1..1000");
      if (!component.skeletonData) throw new CocosError("CONTEXT_UNAVAILABLE", "Spine skeleton data is absent");
      const data = RuntimeAccess.object(RuntimeAccess.call(component.skeletonData, "getRuntimeData", true));
      if (!Array.isArray(data.bones) || !Array.isArray(data.slots)) throw new CocosError("VERIFICATION_FAILED", "Unexpected Spine skeleton data");
      const cached = Boolean(RuntimeAccess.call(component, "isAnimationCached"));
      const bones = data.bones.slice(0, limit).map((bone) => {
        const live = cached ? null : RuntimeAccess.call(component, "findBone", String(bone.name));
        return {
          name: String(bone.name),
          parent: bone.parent ? String(RuntimeAccess.object(bone.parent).name) : null,
          setup: this.fields(bone, ["length", "x", "y", "rotation", "scaleX", "scaleY", "shearX", "shearY"]),
          pose: live ? this.fields(RuntimeAccess.object(live), ["x", "y", "rotation", "scaleX", "scaleY", "worldX", "worldY", "a", "b", "c", "d"]) : null
        };
      });
      const slots = data.slots.slice(0, limit).map((slot) => {
        const live = cached ? null : RuntimeAccess.call(component, "findSlot", String(slot.name));
        const attachment = live ? RuntimeAccess.object(live).attachment : null;
        return {
          name: String(slot.name),
          bone: slot.boneData ? String(RuntimeAccess.object(slot.boneData).name) : null,
          setupAttachment: RuntimeAccess.safeData(slot.attachmentName),
          blendMode: RuntimeAccess.safeData(slot.blendMode),
          attachment: attachment ? { name: String(RuntimeAccess.object(attachment).name), type: this.inspector.type(attachment) } : null,
          liveAvailable: Boolean(live)
        };
      });
      const state = cached ? null : RuntimeAccess.call(component, "getState");
      const nativeTracks = state ? RuntimeAccess.object(state).tracks : null;
      if (nativeTracks !== null && !Array.isArray(nativeTracks)) throw new CocosError("VERIFICATION_FAILED", "Unexpected Spine animation tracks");
      const tracks = Array.isArray(nativeTracks) ? nativeTracks.slice(0, 32).map((raw, index) => {
        if (!raw) return { index, active: false };
        const entry = RuntimeAccess.object(raw);
        return {
          index,
          active: true,
          animation: entry.animation ? String(RuntimeAccess.object(entry.animation).name) : null,
          ...this.fields(entry, ["trackTime", "trackEnd", "animationStart", "animationEnd", "loop", "timeScale", "alpha", "mixTime", "mixDuration"]),
          mixingFrom: entry.mixingFrom && RuntimeAccess.object(entry.mixingFrom).animation ? String(RuntimeAccess.object(RuntimeAccess.object(entry.mixingFrom).animation).name) : null,
          queuedAnimation: entry.next && RuntimeAccess.object(entry.next).animation ? String(RuntimeAccess.object(RuntimeAccess.object(entry.next).animation).name) : null
        };
      }) : null;
      return {
        componentId: RuntimeAccess.uuid(component),
        cached,
        cacheMode: RuntimeAccess.safeData(component._cacheMode),
        bones,
        slots,
        tracks,
        totals: { bones: data.bones.length, slots: data.slots.length, tracks: Array.isArray(nativeTracks) ? nativeTracks.length : null },
        truncated: data.bones.length > limit || data.slots.length > limit || Array.isArray(nativeTracks) && nativeTracks.length > 32,
        poseSpace: "skeleton-local",
        livePoseAvailable: !cached && bones.some((bone) => bone.pose !== null),
        trackStateAvailable: !cached && Boolean(state),
        limitations: cached ? ["\u7F13\u5B58\u6A21\u5F0F\u4EC5\u8FD4\u56DE\u9759\u6001\u9AA8\u67B6\u7ED3\u6784\uFF1B\u59FF\u6001\u548C\u8F68\u9053\u72B6\u6001\u4E0D\u53EF\u4F5C\u4E3A\u5F53\u524D\u663E\u793A\u5E27\u8BFB\u53D6"] : ["\u9AA8\u9ABC worldX/worldY \u5C5E\u4E8E\u9AA8\u67B6\u5750\u6807\uFF0C\u4E0D\u662F\u573A\u666F\u4E16\u754C\u5750\u6807", "\u53EA\u8BFB\u53D6\u5DF2\u6709\u6C42\u503C\u72B6\u6001\uFF0C\u4E0D\u4E3B\u52A8\u63A8\u8FDB\u52A8\u753B\uFF1B\u8F68\u9053\u6DF7\u5408\u94FE\u4EC5\u663E\u793A\u76F4\u63A5\u524D\u9A71"]
      };
    }
  };

  // packages/runtime2-bridge/src/joint.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Joint = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    inspect(p) {
      const joint = this.inspector.component(Json.string(p.componentId, "componentId")), type = this.inspector.type(joint);
      if (!["cc.DistanceJoint", "cc.RopeJoint", "cc.WeldJoint", "cc.WheelJoint", "cc.RevoluteJoint", "cc.PrismaticJoint", "cc.MotorJoint", "cc.MouseJoint"].includes(type)) throw new CocosError("INVALID_ARGUMENT", "Expected a Creator 2 joint component");
      const body = this.inspector.components(RuntimeAccess.object(joint.node)).find((c) => this.inspector.type(c) === "cc.RigidBody");
      const connected = joint.connectedBody ? RuntimeAccess.object(joint.connectedBody) : null, ready = Boolean(joint._joint), issues = [];
      if (!body) issues.push({ code: "BODY_MISSING" });
      if (!connected) issues.push({ code: "CONNECTED_BODY_MISSING" });
      if (connected && connected === body) issues.push({ code: "SELF_CONNECTION" });
      if (connected && (connected.isValid === false || !connected._b2Body)) issues.push({ code: "CONNECTED_BODY_UNAVAILABLE" });
      if (!ready) issues.push({ code: "NATIVE_JOINT_NOT_READY" });
      const properties = {};
      for (const key of ["distance", "maxLength", "frequency", "dampingRatio", "referenceAngle", "enableLimit", "lowerAngle", "upperAngle", "lowerLimit", "upperLimit", "enableMotor", "motorSpeed", "maxMotorTorque", "maxMotorForce", "maxForce", "maxTorque", "correctionFactor", "linearOffset", "angularOffset"]) if (key in joint) properties[key] = RuntimeAccess.safeData(joint[key]);
      const worldAnchor = (method) => {
        if (!ready) return null;
        const out = { x: 0, y: 0 }, ratio = Number(RuntimeAccess.object(this.inspector.environment.cc.PhysicsManager).PTM_RATIO);
        if (!Number.isFinite(ratio) || ratio <= 0) throw new CocosError("CONTEXT_UNAVAILABLE", "Invalid native physics pixel ratio");
        RuntimeAccess.call(joint._joint, method, out);
        return { x: out.x * ratio, y: out.y * ratio };
      };
      return {
        type,
        bodyId: body ? RuntimeAccess.uuid(body) : null,
        connectedBodyId: connected ? RuntimeAccess.uuid(connected) : null,
        enabled: Boolean(joint.enabled),
        nativeReady: ready,
        collideConnected: Boolean(joint.collideConnected),
        anchor: RuntimeAccess.safeData(joint.anchor),
        connectedAnchor: RuntimeAccess.safeData(joint.connectedAnchor),
        worldAnchor: worldAnchor("GetAnchorA"),
        worldConnectedAnchor: worldAnchor("GetAnchorB"),
        properties,
        issues,
        coordinateSpace: "world-pixels",
        anchorSpace: "body-local-pixels",
        mutated: false,
        limitations: ["Creator 2 Joint \u8981\u6C42\u8FDE\u63A5\u521A\u4F53\uFF1BMouseJoint \u5728\u62D6\u62FD\u65F6\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u672A\u62D6\u62FD\u65F6\u53EF\u672A\u5C31\u7EEA", "\u68C0\u67E5\u914D\u7F6E\u548C\u539F\u751F\u951A\u70B9\u4E0D\u4EE3\u8868\u5DF2\u9A8C\u8BC1\u7EA6\u675F\u8FD0\u52A8\u8F68\u8FF9"]
      };
    }
  };

  // packages/runtime2-bridge/src/rigid-body.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2RigidBody = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    state(body) {
      return {
        type: Number(body.type),
        enabled: Boolean(body.enabled),
        active: Boolean(RuntimeAccess.object(body.node).activeInHierarchy),
        nativeReady: Boolean(body._b2Body),
        awake: Boolean(body.awake),
        linearVelocity: RuntimeAccess.safeData(body.linearVelocity),
        angularVelocity: Number(body.angularVelocity),
        mass: body._b2Body ? RuntimeAccess.safeData(RuntimeAccess.call(body, "getMass")) : null,
        worldCenter: body._b2Body ? RuntimeAccess.safeData(RuntimeAccess.call(body, "getWorldCenter")) : null
      };
    }
    execute(id, p) {
      const cc = this.inspector.environment.cc;
      const body = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (this.inspector.type(body) !== "cc.RigidBody") throw new CocosError("INVALID_ARGUMENT", "Expected Creator 2 cc.RigidBody");
      const manager = RuntimeAccess.object(RuntimeAccess.call(cc.director, "getPhysicsManager")), before = this.state(body);
      const units = { coordinateSpace: "world-pixels", velocity: "pixels/second", force: "Creator2-native-force", impulse: "Creator2-native-impulse", ptmRatio: RuntimeAccess.safeData(RuntimeAccess.object(cc.PhysicsManager).PTM_RATIO), conversion: "Native RigidBody divides vector and world point by PTM_RATIO exactly once" };
      if (id === "runtime.rigidbody2d.inspect") return { ...before, physicsEnabled: Boolean(manager.enabled), units };
      if (!manager.enabled || !before.enabled || !before.active || !before.nativeReady) throw new CocosError("CONTEXT_UNAVAILABLE", "Physics and native body must be active and initialized");
      if (body.type !== RuntimeAccess.object(cc.RigidBodyType).Dynamic) throw new CocosError("INVALID_ARGUMENT", "Force and impulse require a dynamic body");
      const vector = (raw, label) => {
        const value2 = Json.object(Json.value(raw));
        if (![value2.x, value2.y].every((n) => typeof n === "number" && Number.isFinite(n) && Math.abs(n) <= 1e6)) throw new CocosError("INVALID_ARGUMENT", `${label} must have finite x/y within \xB11000000 native units`);
        return RuntimeAccess.construct(cc.Vec2, [value2.x, value2.y]);
      };
      const value = vector(p.vector, "vector"), point = vector(p.point, "point");
      if (typeof p.wake !== "boolean") throw new CocosError("INVALID_ARGUMENT", "wake must be explicit boolean");
      const method = id === "runtime.rigidbody2d.force" ? "applyForce" : id === "runtime.rigidbody2d.impulse" ? "applyLinearImpulse" : null;
      if (!method) throw new CocosError("UNSUPPORTED_CAPABILITY", id);
      RuntimeAccess.call(body, method, value, point, p.wake);
      return {
        before,
        after: this.state(body),
        units,
        stepped: false,
        trajectoryVerified: false,
        limitations: ["\u65BD\u529B\u7ED3\u679C\u9700\u540E\u7EED\u7269\u7406\u5E27\u89C2\u5BDF\uFF1B\u51B2\u91CF\u5373\u65F6\u8BFB\u56DE\u4E0D\u4EE3\u8868\u78B0\u649E\u6216\u8F68\u8FF9\u9A8C\u6536", "\u7269\u7406\u64CD\u4F5C\u4E0D\u53EF\u7528\u7F16\u8F91\u5668 Undo \u56DE\u6EDA\uFF0C\u52FF\u5BF9\u4E0D\u786E\u5B9A\u7ED3\u679C\u81EA\u52A8\u91CD\u8BD5"]
      };
    }
  };

  // packages/runtime2-bridge/src/controls.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var Creator2Controls = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    state(c, type) {
      const common = { type, enabled: Boolean(c.enabled), active: Boolean(RuntimeAccess.object(c.node).activeInHierarchy), interactable: c.interactable === void 0 ? null : Boolean(c.interactable) };
      switch (type) {
        case "cc.ScrollView":
          if (!c.content) throw new CocosError("CONTEXT_UNAVAILABLE", "ScrollView content is missing");
          return { ...common, offset: RuntimeAccess.safeData(RuntimeAccess.call(c, "getScrollOffset")), maxOffset: RuntimeAccess.safeData(RuntimeAccess.call(c, "getMaxScrollOffset")), horizontal: Boolean(c.horizontal), vertical: Boolean(c.vertical) };
        case "cc.PageView":
          return { ...common, index: Number(RuntimeAccess.call(c, "getCurrentPageIndex")), pages: RuntimeAccess.call(c, "getPages").length };
        case "cc.Slider":
          return { ...common, progress: Number(c.progress) };
        case "cc.Toggle":
          return { ...common, checked: Boolean(c.isChecked) };
        case "cc.EditBox":
          return { ...common, text: String(c.string), maxLength: Number(c.maxLength) };
        default:
          throw new CocosError("INVALID_ARGUMENT", "Expected ScrollView, PageView, Slider, Toggle or EditBox");
      }
    }
    number(value, name, max) {
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > max) throw new CocosError("INVALID_ARGUMENT", `${name} must be between 0 and ${max}`);
      return value;
    }
    execute(id, p) {
      const c = this.inspector.component(Json.string(p.componentId, "componentId")), type = this.inspector.type(c), before = this.state(c, type);
      const action = id.slice("runtime.control.".length);
      if (action === "inspect") return before;
      const expected = { scroll: "cc.ScrollView", page: "cc.PageView", slider: "cc.Slider", toggle: "cc.Toggle", text: "cc.EditBox" };
      if (expected[action] !== type) throw new CocosError("INVALID_ARGUMENT", `Control action ${action} does not match ${type}`);
      if (!before.enabled || !before.active || before.interactable === false) throw new CocosError("CONTEXT_UNAVAILABLE", "Control is disabled or inactive");
      switch (action) {
        case "scroll": {
          const max = Json.object(before.maxOffset), x = this.number(p.x, "x", Number(max.x)), y = this.number(p.y, "y", Number(max.y));
          if (!c.horizontal && x !== 0 || !c.vertical && y !== 0) throw new CocosError("INVALID_ARGUMENT", "Requested scrolling axis is disabled");
          RuntimeAccess.call(c, "stopAutoScroll");
          RuntimeAccess.call(c, "scrollToOffset", RuntimeAccess.construct(this.inspector.environment.cc.Vec2, [x, y]), 0);
          break;
        }
        case "page": {
          const index = this.number(p.index, "index", Number(before.pages) - 1);
          if (!Number.isInteger(index)) throw new CocosError("INVALID_ARGUMENT", "Page index must be an integer");
          RuntimeAccess.call(c, "scrollToPage", index, 0);
          break;
        }
        case "slider":
          c.progress = this.number(p.progress, "progress", 1);
          break;
        case "toggle":
          if (typeof p.checked !== "boolean") throw new CocosError("INVALID_ARGUMENT", "checked must be boolean");
          c.isChecked = p.checked;
          break;
        case "text":
          if (typeof p.text !== "string" || p.text.length > 1e4) throw new CocosError("INVALID_ARGUMENT", "text must contain at most 10000 UTF-16 code units");
          c.string = p.text;
          break;
      }
      const after = this.state(c, type);
      return {
        before,
        after,
        requested: p,
        inputMode: "programmatic",
        visualVerified: false,
        accepted: action === "toggle" ? after.checked === p.checked : action === "text" ? after.text === p.text : action === "page" ? after.index === p.index : action === "slider" ? after.progress === p.progress : null,
        limitations: ["\u539F\u751F\u5206\u7EC4\u7EA6\u675F\u53EF\u80FD\u62D2\u7EDD\u5207\u6362\uFF0CEditBox \u53EF\u80FD\u622A\u65AD\u6587\u672C\uFF1B\u4EE5 after \u4E3A\u51C6", "\u7A0B\u5E8F\u5316\u64CD\u4F5C\u4E0D\u80FD\u8BC1\u660E\u70B9\u51FB\u3001\u952E\u76D8\u8F93\u5165\u6216\u6700\u7EC8\u4E8B\u4EF6\u63A5\u6536\u8005"]
      };
    }
  };

  // packages/runtime2-bridge/src/features.ts
  var Creator2Features = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
    }
    component(p, types) {
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      if (!types.includes(this.inspector.type(component))) throw new CocosError("INVALID_ARGUMENT", `Expected ${types.join(" or ")}`);
      return component;
    }
    fields(object, keys) {
      return Object.fromEntries(keys.map((key) => [key, typeof object[key] === "function" ? null : RuntimeAccess.safeData(object[key])]));
    }
    animation(p, action) {
      const component = this.component(p, ["cc.Animation"]);
      const clips = RuntimeAccess.call(component, "getClips");
      const state = (name2) => {
        const value = RuntimeAccess.call(component, "getAnimationState", name2);
        return value ? { name: name2, ...this.fields(RuntimeAccess.object(value), ["time", "duration", "speed", "wrapMode", "repeatCount", "isPlaying", "isPaused", "weight"]) } : { name: name2, missing: true };
      };
      const rows = clips.filter(Boolean).map((clip) => state(String(clip.name)));
      if (action === "state") return { rows };
      const name = Json.string(p.name, "name");
      if (clips.filter((clip) => (clip == null ? void 0 : clip.name) === name).length > 1) throw new CocosError("INVALID_ARGUMENT", "Animation name is ambiguous");
      if (!clips.some((clip) => (clip == null ? void 0 : clip.name) === name)) throw new CocosError("NOT_FOUND", `Animation not found: ${name}`);
      const before = state(name);
      if (action === "blend") throw new CocosError("UNSUPPORTED_CAPABILITY", "Creator 2 Animation has no equivalent crossFade duration API");
      if (action === "seek" && (!Number.isFinite(Number(p.time)) || Number(p.time) < 0 || Number(p.time) > Number(before.duration))) throw new CocosError("INVALID_ARGUMENT", "Seek time is outside animation duration");
      if (action === "seek") {
        RuntimeAccess.call(component, "setCurrentTime", Number(p.time), name);
        RuntimeAccess.call(component, "sample", name);
      } else RuntimeAccess.call(component, action, name);
      return { before, after: state(name), frameVerified: false };
    }
    media(p, type, action) {
      const component = this.component(p, [type === "audio" ? "cc.AudioSource" : "cc.VideoPlayer"]);
      const state = () => ({
        ...this.fields(component, ["enabled", "isPlaying", "volume", "loop", "mute", "currentTime"]),
        duration: RuntimeAccess.safeData(RuntimeAccess.call(component, "getDuration")),
        ...type === "audio" ? { currentTime: RuntimeAccess.safeData(RuntimeAccess.call(component, "getCurrentTime")) } : { isPlaying: Boolean(RuntimeAccess.call(component, "isPlaying")) }
      });
      const before = state();
      if (action === "state") return before;
      if (action === "seek") {
        if (type === "audio") RuntimeAccess.call(component, "setCurrentTime", Number(p.time));
        else component.currentTime = Number(p.time);
      } else RuntimeAccess.call(component, action);
      return { before, after: state(), playbackVerified: false };
    }
    physics(p, action) {
      var _a, _b;
      const cc = this.inspector.environment.cc, physics = RuntimeAccess.object(RuntimeAccess.call(cc.director, "getPhysicsManager"));
      if (action === "inspect") return { enabled: Boolean(physics.enabled), gravity: RuntimeAccess.safeData(physics.gravity), debugDrawFlags: RuntimeAccess.safeData(physics.debugDrawFlags), backend: "Box2D", dimension: 2 };
      if (!physics.enabled) throw new CocosError("CONTEXT_UNAVAILABLE", "2D physics is disabled");
      const vector = (value) => {
        const p2 = Json.object(value);
        return RuntimeAccess.construct(cc.Vec2, [Number(p2.x), Number(p2.y)]);
      };
      if (action === "test_point" || action === "test_aabb") {
        const hit = action === "test_point" ? RuntimeAccess.call(physics, "testPoint", vector(p.point)) : RuntimeAccess.call(physics, "testAABB", RuntimeAccess.construct(cc.Rect, [p.x, p.y, p.width, p.height]));
        const colliders = Array.isArray(hit) ? hit : hit ? [hit] : [];
        return { rows: colliders.map((c) => ({ colliderId: RuntimeAccess.uuid(c), nodeId: RuntimeAccess.uuid(RuntimeAccess.object(c).node) })), stepped: false, bodyTypes: ["dynamic"], limitations: ["Creator 2 \u539F\u751F testPoint/testAABB \u53EA\u67E5\u8BE2\u52A8\u6001\u521A\u4F53\uFF1B\u9759\u6001\u4E0E\u8FD0\u52A8\u5B66\u521A\u4F53\u4F7F\u7528 raycast"] };
      }
      const hits = RuntimeAccess.call(physics, "rayCast", vector(p.start), vector(p.end), RuntimeAccess.object(cc.RayCastType).All);
      const mask = Number((_a = p.mask) != null ? _a : 4294967295) >>> 0;
      const rows = hits.filter((hit) => {
        var _a2;
        return (mask & 1 << Number((_a2 = RuntimeAccess.object(RuntimeAccess.object(hit.collider).node).groupIndex) != null ? _a2 : 0)) !== 0;
      }).sort((a, b) => Number(a.fraction) - Number(b.fraction)).map((hit) => ({ colliderId: RuntimeAccess.uuid(hit.collider), nodeId: RuntimeAccess.uuid(RuntimeAccess.object(hit.collider).node), point: RuntimeAccess.safeData(hit.point), normal: RuntimeAccess.safeData(hit.normal), fraction: Number(hit.fraction) }));
      return { rows: rows.slice(0, Number((_b = p.limit) != null ? _b : 100)), total: rows.length, coordinateSpace: "world-pixels", stepped: false };
    }
    particle(p, action) {
      const component = this.component(p, ["cc.ParticleSystem"]);
      const state = () => this.fields(component, ["active", "particleCount", "totalParticles", "emissionRate", "duration", "life", "autoRemoveOnFinish"]);
      const before = state();
      if (action === "restart") RuntimeAccess.call(component, "resetSystem");
      else if (action === "stop_emitting") RuntimeAccess.call(component, "stopSystem");
      return { before, after: state(), rendered: false };
    }
    skeleton(p, family, action) {
      var _a, _b, _c;
      const component = this.component(p, [family === "spine" ? "sp.Skeleton" : "dragonBones.ArmatureDisplay"]);
      const state = () => {
        var _a2, _b2;
        if (family === "dragonbones") return { ...this.fields(component, ["armatureName", "animationName", "playTimes", "timeScale"]), animations: RuntimeAccess.safeData(RuntimeAccess.call(component, "getAnimationNames", component.armatureName)) };
        const data = component.skeletonData ? RuntimeAccess.call(component.skeletonData, "getRuntimeData") : null;
        return {
          ...this.fields(component, ["animation", "loop", "paused", "timeScale", "defaultSkin"]),
          animations: data ? ((_a2 = RuntimeAccess.object(data).animations) != null ? _a2 : []).map((row) => String(row.name)) : [],
          skins: data ? ((_b2 = RuntimeAccess.object(data).skins) != null ? _b2 : []).map((row) => String(row.name)) : []
        };
      };
      const before = state();
      if (action === "inspect") return before;
      const name = Json.string(p.name, "name");
      if (action === "play") {
        if (!before.animations.includes(name)) throw new CocosError("NOT_FOUND", "Skeleton animation not found");
        if (family === "dragonbones") RuntimeAccess.call(component, "playAnimation", name, Number((_a = p.playTimes) != null ? _a : 1));
        else RuntimeAccess.call(component, p.queue ? "addAnimation" : "setAnimation", Number((_b = p.trackIndex) != null ? _b : 0), name, p.loop === true, ...p.queue ? [Number((_c = p.delay) != null ? _c : 0)] : []);
      } else if (action === "set_skin") {
        if (!before.skins.includes(name)) throw new CocosError("NOT_FOUND", "Skeleton skin not found");
        RuntimeAccess.call(component, "setSkin", name);
      } else RuntimeAccess.call(component, "setAttachment", Json.string(p.slot, "slot"), name);
      return { before, after: state(), rendered: false };
    }
    ui(p, action) {
      const root = this.inspector.node(Json.string(p.rootId, "rootId")), nodes = this.inspector.all(root);
      if (action === "assert") {
        const rows2 = p.rows.map((expected) => {
          const node = nodes.find((node2) => RuntimeAccess.uuid(node2) === expected.nodeId);
          if (!node) return { nodeId: expected.nodeId, passed: false, reason: "outside-subtree-or-missing" };
          const components = this.inspector.components(node), label = components.find((c) => ["cc.Label", "cc.RichText", "cc.EditBox"].includes(this.inspector.type(c))), button = components.find((c) => ["cc.Button", "cc.Toggle"].includes(this.inspector.type(c)));
          const actual = { nodeId: RuntimeAccess.uuid(node), active: Boolean(node.activeInHierarchy), text: label ? String(label.string) : null, interactable: button ? Boolean(button.interactable) : null };
          return { ...actual, passed: Object.entries(expected).every(([key, value]) => actual[key] === value), expected };
        });
        return { rows: rows2, passed: rows2.every((row) => row.passed), callbacksInvoked: false };
      }
      const rows = nodes.map((node) => {
        const width = Number(node.width), height = Number(node.height), left = -Number(node.anchorX) * width, bottom = -Number(node.anchorY) * height;
        const corners = [[left, bottom], [left + width, bottom], [left + width, bottom + height], [left, bottom + height]].map(([x, y]) => RuntimeAccess.object(RuntimeAccess.call(node, "convertToWorldSpaceAR", RuntimeAccess.construct(this.inspector.environment.cc.Vec2, [x, y]))));
        const xs = corners.map((p2) => Number(p2.x)), ys = corners.map((p2) => Number(p2.y));
        const bounds = { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
        return {
          nodeId: RuntimeAccess.uuid(node),
          name: String(node.name),
          active: Boolean(node.activeInHierarchy),
          width: Number(node.width),
          height: Number(node.height),
          anchorX: Number(node.anchorX),
          anchorY: Number(node.anchorY),
          opacity: Number(node.opacity),
          bounds: RuntimeAccess.safeData(bounds),
          corners: corners.map((corner) => ({ x: Number(corner.x), y: Number(corner.y) })),
          components: this.inspector.components(node).map((c) => ({ componentId: RuntimeAccess.uuid(c), type: this.inspector.type(c), enabled: Boolean(c.enabled), properties: this.inspector.properties(c) }))
        };
      });
      if (action === "hit_test") {
        const point = RuntimeAccess.construct(this.inspector.environment.cc.Vec2, [p.x, p.y]);
        return { rows: nodes.filter((node) => node.activeInHierarchy && RuntimeAccess.call(node, "_hitTest", point)).map((node) => ({ nodeId: RuntimeAccess.uuid(node) })), finalReceiverVerified: false, coordinateSpace: "screen-pixels", limitations: ["\u539F\u751F\u547D\u4E2D\u5019\u9009\u4E0D\u4EE3\u8868\u4E8B\u4EF6\u5192\u6CE1\u540E\u7684\u6700\u7EC8\u63A5\u6536\u8005"] };
      }
      return { rows, coordinateSpace: "world-pixels", issues: rows.filter((row) => row.width === 0 || row.height === 0).map((row) => ({ nodeId: row.nodeId, code: "ZERO_SIZE" })) };
    }
    async profile(p, frames) {
      var _a, _b;
      if (RuntimeAccess.engineVersion(this.inspector.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Native feature adapter requires Creator 2.4.15");
      const count = Number((_a = p.frames) != null ? _a : 60), warmup = Number((_b = p.warmupFrames) != null ? _b : 10), token = frames.token(), rows = [], started = performance.now();
      if (!Number.isInteger(count) || count < 2 || count > 300 || !Number.isInteger(warmup) || warmup < 1 || warmup > 120) throw new CocosError("INVALID_ARGUMENT", "Invalid frame sampling bounds");
      let previous = performance.now();
      for (let index = 0; index < count + warmup; index++) {
        if (performance.now() - started > 15e3) throw new CocosError("TIMEOUT", "Frame sampling exceeded 15 seconds");
        await frames.wait(token);
        const now = performance.now();
        if (index >= warmup) rows.push({ frameMs: now - previous, drawCalls: RuntimeAccess.safeData(RuntimeAccess.object(this.inspector.environment.cc.renderer).drawCalls) });
        previous = now;
      }
      const sorted = rows.map((row) => Number(row.frameMs)).sort((a, b) => a - b), meanMs = sorted.reduce((sum, n) => sum + n, 0) / count, p95Ms = sorted[Math.ceil(count * 0.95) - 1];
      return { rows, frames: count, meanMs, p95Ms, maxMs: sorted[sorted.length - 1], scope: "whole-frame-wall-time", gpuMs: null, budget: p.maxFrameMs === void 0 ? null : { passed: p95Ms <= Number(p.maxFrameMs), maxFrameMs: p.maxFrameMs }, limitations: ["DrawCall \u6765\u81EA\u539F\u751F renderer\uFF1B\u4E0D\u4EE3\u8868\u5355\u72EC Shader \u7684 GPU \u8017\u65F6"] };
    }
    execute(id, p) {
      if (RuntimeAccess.engineVersion(this.inspector.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Native feature adapter requires Creator 2.4.15");
      if (id === "runtime.graphics.inspect") {
        const cc = this.inspector.environment.cc;
        return { renderType: RuntimeAccess.safeData(RuntimeAccess.object(cc.game).renderType), drawCalls: RuntimeAccess.safeData(RuntimeAccess.object(cc.renderer).drawCalls), gpuMemory: null, api: "Creator2-renderer", limitations: ["\u4E0D\u679A\u4E3E Creator 3 gfx \u683C\u5F0F\uFF1B\u4E0D\u6D4B\u91CF\u9A71\u52A8\u603B\u663E\u5B58"] };
      }
      if (id === "runtime.resources.snapshot") return new Creator2ResourceSnapshot(this.inspector).snapshot();
      if (id === "runtime.resources.diff") return new Creator2ResourceSnapshot(this.inspector).diff(p);
      if (id === "runtime.resources.trend") return new Creator2ResourceSnapshot(this.inspector).trend(p);
      if (id === "runtime.camera.inspect") return new Creator2Camera(this.inspector).inspect(p);
      if (id === "runtime.camera.convert") return new Creator2Camera(this.inspector).convert(p);
      if (id === "runtime.camera.culling") return new Creator2Camera(this.inspector).culling(p);
      if (id === "runtime.camera.sample_pixels") return new Creator2Camera(this.inspector).samplePixels(p);
      if (id === "runtime.dragonbones.fade") return new Creator2DragonBonesFade(this.inspector).fade(p);
      if (id === "runtime.dragonbones.details") return new Creator2DragonBones(this.inspector).details(p);
      if (id === "runtime.spine.mix.inspect" || id === "runtime.spine.mix.update") return new Creator2SpineMix(this.inspector).execute(p, id.endsWith(".update"));
      if (id === "runtime.spine.details") return new Creator2Spine(this.inspector).details(p);
      if (id === "runtime.collision2d.inspect") return new Creator2Collision(this.inspector).inspect(p);
      if (id === "runtime.joint2d.inspect") return new Creator2Joint(this.inspector).inspect(p);
      if (id.startsWith("runtime.rigidbody2d.")) return new Creator2RigidBody(this.inspector).execute(id, p);
      if (id.startsWith("runtime.control.")) return new Creator2Controls(this.inspector).execute(id, p);
      const [, family, action] = id.split(".");
      if (family === "animation") return this.animation(p, action);
      if (family === "audio" || family === "video") return this.media(p, family, action);
      if (family === "webview") {
        const component = this.component(p, ["cc.WebView"]);
        return { componentId: RuntimeAccess.uuid(component), enabled: Boolean(component.enabled), configured: Boolean(component.url), navigationExecuted: false };
      }
      if (family === "physics3d") {
        const manager = RuntimeAccess.call(this.inspector.environment.cc.director, "getPhysics3DManager");
        if (!manager) throw new CocosError("UNSUPPORTED_CAPABILITY", "Physics 3D module is excluded");
        return { ...this.fields(RuntimeAccess.object(manager), ["enabled", "gravity", "allowSleep"]), raycastAvailable: typeof RuntimeAccess.object(manager).raycast === "function", limitations: ["Creator 2 raycast uses collision group semantics; Creator 3 mask query is not mapped"] };
      }
      if (family === "physics2d") return this.physics(p, action);
      if (family === "particle2d") return this.particle(p, action);
      if (family === "spine" || family === "dragonbones") return this.skeleton(p, family, action);
      if (family === "ui") return this.ui(p, action);
      if (family === "atlas") return this.fields(RuntimeAccess.object(this.inspector.environment.cc.dynamicAtlasManager), ["enabled", "maxAtlasCount", "textureSize", "maxFrameSize", "minFrameSize", "textureBleeding"]);
      if (family === "label" || family === "render2d") {
        const nodes = this.inspector.all(this.inspector.node(Json.string(p.rootId, "rootId")));
        const rows = nodes.flatMap((node) => this.inspector.components(node).filter((c) => family === "label" ? this.inspector.type(c) === "cc.Label" : ["cc.Sprite", "cc.Label", "cc.RichText", "cc.Mask", "cc.Graphics"].includes(this.inspector.type(c))).map((c) => ({ nodeId: RuntimeAccess.uuid(node), componentId: RuntimeAccess.uuid(c), type: this.inspector.type(c), ...this.fields(c, ["cacheMode", "fontSize", "useSystemFont", "string", "enabled"]), groupIndex: Number(node.groupIndex), opacity: Number(node.opacity) })));
        return { rows, actualDrawCallsVerified: false, limitations: ["\u4EC5\u7EC4\u4EF6\u548C\u5408\u6279\u6761\u4EF6\u8BCA\u65AD\uFF1B\u5B9E\u9645 DrawCall \u8BF7\u7ED3\u5408 profiler \u4E0E\u622A\u56FE"] };
      }
      throw new CocosError("UNSUPPORTED_CAPABILITY", id);
    }
  };
  __publicField(Creator2Features, "ids", Creator2Support.features);

  // packages/runtime3-bridge/src/frame-session.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var FrameSession = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
      __publicField(this, "pending", /* @__PURE__ */ new Set());
      __publicField(this, "generation", 0);
    }
    token() {
      return this.generation;
    }
    snapshot() {
      return { pendingFrameWaits: this.pending.size };
    }
    check(token) {
      if (token !== this.generation) throw new CocosError("STALE_HANDLE", "\u91C7\u6837\u4F1A\u8BDD\u5DF2\u7ED3\u675F");
    }
    wait(token, sample) {
      this.check(token);
      const director = FeatureSupport.require(this.cc.director, "Director");
      FeatureSupport.methods(director, ["on", "off", "getScene"]);
      const scene = RuntimeAccess.call(director, "getScene"), event = FeatureSupport.require(this.cc.Director, "Director events").EVENT_AFTER_DRAW;
      if (typeof event !== "string") throw new CocosError("UNSUPPORTED_CAPABILITY", "\u7F3A\u5C11\u5E27\u5B8C\u6210\u4E8B\u4EF6");
      return new Promise((resolve, reject) => {
        let settled = false;
        const finish = (error) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          this.pending.delete(cancel);
          try {
            RuntimeAccess.call(director, "off", event, callback);
          } catch (failure) {
            error != null ? error : error = CocosError.from(failure);
          }
          if (error) reject(error);
          else resolve();
        };
        const callback = () => {
          try {
            this.check(token);
            if (RuntimeAccess.call(director, "getScene") !== scene) throw new CocosError("STALE_HANDLE", "\u91C7\u6837\u671F\u95F4\u573A\u666F\u5DF2\u5207\u6362");
            sample == null ? void 0 : sample();
            finish();
          } catch (error) {
            finish(CocosError.from(error));
          }
        };
        const cancel = (error) => finish(error);
        const timer = setTimeout(() => finish(new CocosError("CONTEXT_UNAVAILABLE", "\u7B49\u5F85\u6E32\u67D3\u5E27\u8D85\u65F6", {
          timeoutMs: 2e3,
          gamePaused: this.paused(this.cc.game),
          directorPaused: this.paused(director)
        })), 2e3);
        this.pending.add(cancel);
        try {
          RuntimeAccess.call(director, "on", event, callback);
        } catch (error) {
          finish(CocosError.from(error));
        }
      });
    }
    paused(target) {
      try {
        if (typeof RuntimeAccess.object(target).isPaused !== "function") return null;
        const value = RuntimeAccess.call(target, "isPaused");
        return typeof value === "boolean" ? value : null;
      } catch (e) {
        return null;
      }
    }
    dispose() {
      this.generation++;
      for (const cancel of this.pending) cancel(new CocosError("STALE_HANDLE", "\u8FD0\u884C\u65F6\u65AD\u5F00"));
      this.pending.clear();
    }
  };

  // packages/runtime3-bridge/src/debug-overlay.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/runtime3-bridge/src/debug-shapes.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var DebugShapes = class {
    point(value) {
      const point = Json.object(value);
      if (["x", "y", "z"].some((axis) => typeof point[axis] !== "number" || !Number.isFinite(point[axis]) || Math.abs(Number(point[axis])) > 1e5)) throw new CocosError("INVALID_ARGUMENT", "\u8C03\u8BD5\u5750\u6807\u65E0\u6548");
      return { x: point.x, y: point.y, z: point.z };
    }
    lines(p) {
      var _a;
      const shape = Json.object(p.shape), kind = Json.string(shape.kind, "shape.kind");
      if (kind === "ray") {
        const start = this.point(shape.origin), direction = this.point(shape.direction), length = Number(shape.length);
        const norm = Math.hypot(Number(direction.x), Number(direction.y), Number(direction.z));
        if (!Number.isFinite(length) || length <= 0 || length > 1e4 || norm < 1e-8) throw new CocosError("INVALID_ARGUMENT", "\u5C04\u7EBF\u957F\u5EA6\u6216\u65B9\u5411\u65E0\u6548");
        const end = this.point(Object.fromEntries(["x", "y", "z"].map((axis) => [axis, Number(start[axis]) + Number(direction[axis]) * length / norm])));
        return [{ start, end }];
      }
      if (kind === "points") {
        if (!Array.isArray(shape.points) || !shape.points.length || shape.points.length > 256) throw new CocosError("INVALID_ARGUMENT", "\u70B9\u9884\u89C8\u9700 1..256 \u4E2A\u70B9");
        const radius = Number((_a = shape.radius) != null ? _a : 0.05);
        if (!Number.isFinite(radius) || radius <= 0 || radius > 10) throw new CocosError("INVALID_ARGUMENT", "\u70B9\u9884\u89C8\u534A\u5F84\u65E0\u6548");
        return shape.points.flatMap((value) => {
          const point = this.point(value);
          return ["x", "y", "z"].map((axis) => ({ start: this.point({ ...point, [axis]: Number(point[axis]) - radius }), end: this.point({ ...point, [axis]: Number(point[axis]) + radius }) }));
        });
      }
      let corners;
      if (kind === "box") {
        const min = this.point(shape.min), max = this.point(shape.max);
        if (["x", "y", "z"].some((axis) => Number(min[axis]) >= Number(max[axis]))) throw new CocosError("INVALID_ARGUMENT", "\u5305\u56F4\u76D2 min \u5FC5\u987B\u5C0F\u4E8E max");
        corners = Array.from({ length: 8 }, (_, index) => ({ x: index & 1 ? max.x : min.x, y: index & 2 ? max.y : min.y, z: index & 4 ? max.z : min.z }));
      } else if (kind === "frustum") {
        if (!Array.isArray(shape.corners) || shape.corners.length !== 8) throw new CocosError("INVALID_ARGUMENT", "\u89C6\u9525\u9700\u8FD1\u9762\u548C\u8FDC\u9762\u5404\u56DB\u4E2A\u540C\u5411\u6392\u5217\u7684\u89D2\u70B9");
        corners = shape.corners.map((value) => this.point(value));
        return [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].map(([a, b]) => ({ start: corners[a], end: corners[b] }));
      } else throw new CocosError("INVALID_ARGUMENT", `\u672A\u77E5\u8C03\u8BD5\u5F62\u72B6\uFF1A${kind}`);
      return corners.flatMap((start, index) => [1, 2, 4].filter((bit) => !(index & bit)).map((bit) => ({ start, end: corners[index | bit] })));
    }
  };

  // packages/runtime3-bridge/src/debug-overlay.ts
  var DebugOverlayController = class {
    constructor(inspector) {
      __publicField(this, "inspector", inspector);
      __publicField(this, "drawings", /* @__PURE__ */ new Map());
      __publicField(this, "sequence", 0);
      __publicField(this, "listening", false);
      __publicField(this, "scene");
      __publicField(this, "errors", []);
      __publicField(this, "draw", () => {
        try {
          if (RuntimeAccess.call(this.cc.director, "getScene") !== this.scene) {
            this.dispose();
            return;
          }
          for (const [id, drawing] of this.drawings) {
            if (performance.now() > drawing.expires || drawing.camera.isValid === false) {
              this.drawings.delete(id);
              continue;
            }
            try {
              for (const row of drawing.rows) RuntimeAccess.call(drawing.renderer, "addLine", row.start, row.end, drawing.color, drawing.depthTest);
            } catch (error) {
              this.drawings.delete(id);
              this.errors.push(CocosError.from(error).message);
              this.errors = this.errors.slice(-20);
            }
          }
          if (!this.drawings.size) this.unlisten();
        } catch (error) {
          this.errors.push(CocosError.from(error).message);
          this.errors = this.errors.slice(-20);
        }
      });
    }
    get cc() {
      return this.inspector.environment.cc;
    }
    unlisten() {
      if (!this.listening) return;
      RuntimeAccess.call(this.cc.director, "off", FeatureSupport.require(this.cc.Director, "Director").EVENT_BEFORE_DRAW, this.draw);
      this.listening = false;
    }
    execute(id, p) {
      var _a;
      if (id.endsWith(".shape")) return this.execute("runtime.debug.draw", { ...p, lines: new DebugShapes().lines(p) });
      if (id.endsWith(".inspect")) return { supported: true, rows: [...this.drawings.values()].map((row) => ({ drawingId: row.id, ownerId: row.ownerId, remainingMs: Math.max(0, row.expires - performance.now()), lines: row.rows.length })), errors: this.errors };
      if (id.endsWith(".clear")) {
        const ownerId = Json.string(p.ownerId, "ownerId");
        let removed = 0;
        for (const [key2, row] of this.drawings) if (row.ownerId === ownerId) {
          this.drawings.delete(key2);
          removed++;
        }
        if (!this.drawings.size) this.unlisten();
        return { supported: true, removed, pixelsClearedOnNextFrame: true };
      }
      const camera = this.inspector.component(Json.string(p.cameraComponentId, "cameraComponentId"));
      const type = FeatureSupport.require(this.cc.Camera, "Camera");
      if (typeof type !== "function" || !(camera instanceof type)) throw new CocosError("INVALID_ARGUMENT", "\u76EE\u6807\u4E0D\u662F Camera");
      const native = FeatureSupport.require(camera.camera, "active camera"), renderer = FeatureSupport.require(native.geometryRenderer, "\u5DF2\u6FC0\u6D3B\u7684\u76F8\u673A GeometryRenderer");
      FeatureSupport.methods(renderer, ["addLine"]);
      FeatureSupport.require(this.cc.Vec3, "Vec3");
      FeatureSupport.require(this.cc.Color, "Color");
      const director = FeatureSupport.require(this.cc.director, "Director");
      FeatureSupport.methods(director, ["on", "off"]);
      const event = FeatureSupport.require(this.cc.Director, "Director").EVENT_BEFORE_DRAW;
      if (typeof event !== "string") throw new CocosError("UNSUPPORTED_CAPABILITY", "\u7F3A\u5C11\u7ED8\u5236\u524D\u4E8B\u4EF6");
      if (!Array.isArray(p.lines) || !p.lines.length || p.lines.length > 1024 || this.drawings.size >= 32 || [...this.drawings.values()].reduce((sum, row) => sum + row.rows.length, 0) + p.lines.length > 4096) throw new CocosError("INVALID_ARGUMENT", "\u7ED8\u5236\u8D85\u8FC7\u6570\u91CF\u9884\u7B97");
      const vector = (v) => {
        const point = Json.object(v);
        if (["x", "y", "z"].some((key2) => typeof point[key2] !== "number" || !Number.isFinite(point[key2]) || Math.abs(Number(point[key2])) > 1e5)) throw new CocosError("INVALID_ARGUMENT", "\u8C03\u8BD5\u5750\u6807\u65E0\u6548");
        return RuntimeAccess.construct(this.cc.Vec3, [point.x, point.y, point.z]);
      };
      const rows = p.lines.map((row) => {
        const line = Json.object(row);
        return { start: vector(line.start), end: vector(line.end) };
      });
      const ttlMs = Number((_a = p.ttlMs) != null ? _a : 3e3);
      if (!Number.isInteger(ttlMs) || ttlMs < 16 || ttlMs > 3e4) throw new CocosError("INVALID_ARGUMENT", "ttlMs \u5FC5\u987B\u4E3A 16..30000");
      const color = Array.isArray(p.color) ? p.color : [0, 255, 0, 255];
      if (color.length !== 4 || color.some((c) => typeof c !== "number" || !Number.isInteger(c) || c < 0 || c > 255)) throw new CocosError("INVALID_ARGUMENT", "\u989C\u8272\u9700\u4E3A RGBA 0..255");
      const key = `debug-${++this.sequence}`;
      this.scene = RuntimeAccess.call(director, "getScene");
      this.drawings.set(key, { id: key, ownerId: Json.string(p.ownerId, "ownerId"), camera, renderer, rows, expires: performance.now() + ttlMs, color: RuntimeAccess.construct(this.cc.Color, color), depthTest: p.depthTest !== false });
      if (!this.listening) {
        try {
          this.listening = true;
          RuntimeAccess.call(director, "on", event, this.draw);
        } catch (error) {
          this.drawings.delete(key);
          this.unlisten();
          throw error;
        }
      }
      return { supported: true, drawingId: key, status: "queued", coordinateSpace: "world", frameVerified: false };
    }
    dispose() {
      this.drawings.clear();
      this.unlisten();
    }
  };

  // packages/runtime3-bridge/src/scene.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var SceneInspector = class {
    constructor(environment) {
      __publicField(this, "environment", environment);
    }
    current() {
      return RuntimeAccess.object(RuntimeAccess.call(this.environment.cc.director, "getScene"), "active scene");
    }
    all(root = this.current(), includeInternal = false) {
      var _a;
      const rows = [];
      const pending = [root];
      while (pending.length) {
        const node = pending.pop();
        if (!includeInternal && this.environment.editor && Number((_a = node._objFlags) != null ? _a : 0) & 8) continue;
        rows.push(node);
        const children = node.children;
        if (children) for (let index = children.length - 1; index >= 0; index--) pending.push(children[index]);
      }
      return rows;
    }
    node(id) {
      const node = this.all().find((row) => RuntimeAccess.uuid(row) === id);
      if (!node) throw new CocosError("NOT_FOUND", `Node not found: ${id}`);
      return node;
    }
    components(node) {
      return RuntimeAccess.call(node, "getComponents", this.environment.cc.Component);
    }
    component(id) {
      for (const node of this.all()) {
        const component = this.components(node).find((row) => RuntimeAccess.uuid(row) === id);
        if (component) return component;
      }
      throw new CocosError("NOT_FOUND", `Component not found: ${id}`);
    }
    type(value) {
      try {
        return String(RuntimeAccess.call(this.environment.cc.js, "getClassName", value));
      } catch (e) {
        return "Object";
      }
    }
    properties(component) {
      const constructor = RuntimeAccess.object(component.constructor);
      const props = Array.isArray(constructor.__props__) ? constructor.__props__ : [];
      const result = {};
      for (const key of props) {
        if (["node", "_name", "_objFlags"].includes(key)) continue;
        const descriptor = RuntimeAccess.descriptor(component, key);
        if (this.environment.major === 2 && (descriptor == null ? void 0 : descriptor.get)) {
          result[key] = { inspection: "accessor-not-evaluated" };
          continue;
        }
        const value = component[key];
        if (value && typeof value === "object" && RuntimeAccess.uuid(value)) result[key] = { uuid: RuntimeAccess.uuid(value) };
        else if (Array.isArray(value)) result[key] = value.map((entry) => entry && typeof entry === "object" && RuntimeAccess.uuid(entry) ? { uuid: RuntimeAccess.uuid(entry) } : RuntimeAccess.safeData(entry));
        else result[key] = RuntimeAccess.safeData(value);
      }
      return result;
    }
    summary(node, includeComponents = true, includeInternal = false) {
      var _a, _b, _c, _d;
      const result = {
        nodeId: RuntimeAccess.uuid(node),
        name: String((_a = node.name) != null ? _a : ""),
        active: Boolean(this.environment.major === 2 && this.type(node) === "cc.Scene" ? node === this.current() : node.active),
        parentId: node.parent ? RuntimeAccess.uuid(node.parent) : null,
        children: ((_b = node.children) != null ? _b : []).filter((child) => {
          var _a2;
          return includeInternal || !this.environment.editor || !(Number((_a2 = child._objFlags) != null ? _a2 : 0) & 8);
        }).map((child) => RuntimeAccess.uuid(child)),
        position: RuntimeAccess.safeData(node.position),
        rotation: RuntimeAccess.safeData((_c = node.eulerAngles) != null ? _c : node.angle),
        scale: this.environment.major === 2 ? { x: Number(node.scaleX), y: Number(node.scaleY), z: Number(node.scaleZ) } : RuntimeAccess.safeData(node.scale),
        layer: RuntimeAccess.safeData((_d = node.layer) != null ? _d : node.groupIndex)
      };
      if (this.environment.major === 2) Object.assign(result, { size: { width: Number(node.width), height: Number(node.height) }, anchor: { x: Number(node.anchorX), y: Number(node.anchorY) }, prefab: node._prefab ? { assetUuid: RuntimeAccess.uuid(RuntimeAccess.object(node._prefab).asset), rootId: RuntimeAccess.uuid(RuntimeAccess.object(node._prefab).root) } : null, opacity: Number(node.opacity), color: RuntimeAccess.safeData(node.color), groupIndex: Number(node.groupIndex), scale: { x: Number(node.scaleX), y: Number(node.scaleY), z: Number(node.scaleZ) } });
      if (includeComponents) result.components = this.components(node).map((component) => ({ componentId: RuntimeAccess.uuid(component), type: this.type(component), enabled: Boolean(component.enabled), properties: this.properties(component) }));
      return result;
    }
    sceneInfo() {
      const scene = this.current();
      return { sceneId: RuntimeAccess.uuid(scene), name: String(scene.name), nodeCount: this.all().length - 1 };
    }
    hierarchy(p) {
      var _a, _b;
      const root = p.rootId ? this.all(this.current(), p.includeInternal === true).find((row) => RuntimeAccess.uuid(row) === p.rootId) : this.current();
      if (!root) throw new CocosError("NOT_FOUND", "Hierarchy root is not in the active scene");
      const rows = this.all(root, p.includeInternal === true);
      const offset = Number((_a = p.offset) != null ? _a : 0);
      const limit = Number((_b = p.limit) != null ? _b : 100);
      return {
        rows: rows.slice(offset, offset + limit).map((row) => this.summary(row, p.includeComponents !== false, p.includeInternal === true)),
        total: rows.length,
        nextOffset: offset + limit < rows.length ? offset + limit : null
      };
    }
    fingerprint() {
      try {
        if (this.environment.serialize) {
          return Json.value(this.environment.serialize(this.current()));
        }
        return this.all().map((node) => this.summary(node));
      } catch (error) {
        if (error instanceof CocosError && error.code === "NOT_FOUND") return null;
        throw error;
      }
    }
    findNodes(p) {
      if (!p.name && !p.path) throw new CocosError("INVALID_ARGUMENT", "Specify name or path");
      const pathFor = (node) => {
        const segments = [];
        let current = node;
        while (current == null ? void 0 : current.parent) {
          segments.unshift(String(current.name));
          current = current.parent;
        }
        return segments.join("/");
      };
      const rows = this.all().filter((node) => (!p.name || node.name === p.name) && (!p.path || pathFor(node) === p.path));
      return { rows: rows.map((node) => this.summary(node)), total: rows.length };
    }
    createSceneAsset(p) {
      var _a;
      if (!this.environment.serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Editor serializer is not available");
      const scene = RuntimeAccess.construct(this.environment.cc.Scene, []);
      const asset = RuntimeAccess.construct(this.environment.cc.SceneAsset, []);
      const name = String((_a = p.url) != null ? _a : "Untitled").split("/").pop().replace(/\.(scene|fire)$/, "");
      scene.name = name;
      asset.name = name;
      asset.scene = scene;
      try {
        const data = this.environment.serialize(asset);
        return typeof data === "string" ? JSON.parse(data) : Json.value(data);
      } finally {
        RuntimeAccess.destroyOwned(this.environment.cc, asset);
        RuntimeAccess.destroyOwned(this.environment.cc, scene);
      }
    }
    subtreeIdentity(id) {
      const root = this.node(id);
      const rows = [];
      const visit = (node, path) => {
        var _a;
        rows.push({ path, nodeId: RuntimeAccess.uuid(node), name: String(node.name) });
        ((_a = node.children) != null ? _a : []).forEach((child, index) => visit(child, `${path}/${index}`));
      };
      visit(root, "");
      const parent = root.parent;
      return { rows, parentId: parent ? RuntimeAccess.uuid(parent) : null, index: parent ? parent.children.indexOf(root) : -1 };
    }
    serializeCurrentScene() {
      if (!this.environment.serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Editor serializer is not available");
      const asset = RuntimeAccess.construct(this.environment.cc.SceneAsset, []);
      const scene = this.current();
      asset.scene = scene;
      asset.name = scene.name;
      const data = this.environment.serialize(asset);
      return typeof data === "string" ? JSON.parse(data) : Json.value(data);
    }
    validateScene() {
      const rows = [];
      for (const node of this.all()) {
        const components = node._components;
        if (Array.isArray(components)) components.forEach((component, index) => {
          if (!component) rows.push({ code: "MISSING_COMPONENT", nodeId: RuntimeAccess.uuid(node), index });
        });
        for (const component of this.components(node)) {
          for (const [key, value] of Object.entries(component)) {
            if (key.startsWith("_") || !value || typeof value !== "object") continue;
            const object = RuntimeAccess.object(value);
            if ("isValid" in object && object.isValid === false) rows.push({ code: "INVALID_REFERENCE", nodeId: RuntimeAccess.uuid(node), componentId: RuntimeAccess.uuid(component), property: key });
          }
        }
      }
      return { rows, valid: rows.length === 0, scope: "missing-components-and-invalid-loaded-references" };
    }
    execute(method, args) {
      var _a, _b;
      if (method === "ui.owned_snapshot" || method === "ui.owned_verify" || method === "ui.owned_remove") {
        const p = Json.object(args[0]), rootId = Json.string(p.rootId, "rootId"), root = this.node(rootId);
        if (root === this.current()) throw new CocosError("INVALID_ARGUMENT", "Owned cleanup cannot remove the scene root");
        const snapshot = { serialized: new UiInspector(this).snapshot({ rootId }), identity: this.subtreeIdentity(rootId), sceneId: this.sceneInfo().sceneId };
        if (method === "ui.owned_snapshot") return { snapshot };
        if (Json.canonical(snapshot) !== Json.canonical(p.expectedSnapshot)) throw new CocosError("STALE_REVISION", "Owned subtree changed; cleanup preserved it");
        const owned = new Set(this.all(root).flatMap((node) => [RuntimeAccess.uuid(node), ...this.components(node).map((component) => RuntimeAccess.uuid(component))]));
        const blockers = [];
        let visited = 0;
        const references = (value, sourceId, path, seen = /* @__PURE__ */ new Set()) => {
          if (!value || typeof value !== "object" || seen.has(value)) return;
          if (++visited > 5e4) throw new CocosError("RESOURCE_BUSY", "Native reference audit exceeds limit; subtree was preserved");
          seen.add(value);
          const uuid = RuntimeAccess.uuid(value);
          if (uuid) {
            if (owned.has(uuid)) blockers.push({ sourceId, targetId: uuid, path });
            return;
          }
          const object = RuntimeAccess.object(value), constructor = object.constructor && typeof object.constructor === "function" ? RuntimeAccess.object(object.constructor) : void 0;
          const fields = Array.isArray(constructor == null ? void 0 : constructor.__props__) ? constructor.__props__ : Object.keys(object);
          for (const key of fields) references(object[key], sourceId, `${path}.${key}`, seen);
        };
        for (const node of this.all()) if (!owned.has(RuntimeAccess.uuid(node))) for (const component of this.components(node)) {
          const fields = RuntimeAccess.object(component.constructor).__props__;
          if (!Array.isArray(fields)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native serialization fields unavailable; cleanup preserved subtree");
          for (const key of fields) if (!["node", "_name", "_objFlags"].includes(key)) references(component[key], RuntimeAccess.uuid(component), key);
        }
        if (blockers.length) throw new CocosError("OPERATION_CONFLICT", "Surviving components refer to owned subtree; cleanup preserved it", { rows: blockers });
        if (method === "ui.owned_verify") return { verified: true, rootId };
        RuntimeAccess.call(root, "removeFromParent");
        RuntimeAccess.call(root, "destroy");
        return { removedRootId: rootId, needsSave: true, undoScope: "owned-subtree-only", verifiedAbsent: !this.all().includes(root) };
      }
      switch (method) {
        case "ui.preflight_update":
          return new UiInspector(this).preflight(Json.object(args[0]), true);
        case "ui.preflight":
          return new UiInspector(this).preflight(Json.object(args[0]));
        case "ui.eventBindings":
          return new UiInspector(this).eventBindings(Json.object(args[0]));
        case "ui.flush_label": {
          const p = Json.object(args[0]), component = this.component(Json.string(p.componentId, "componentId"));
          const Label = this.environment.cc.Label;
          if (typeof Label === "function" && component instanceof Label) RuntimeAccess.call(component, "updateRenderData", true);
          return { flushed: typeof Label === "function" && component instanceof Label };
        }
        case "ui.snapshot":
          return new UiInspector(this).snapshot(Json.object(args[0]));
        case "ui.inspect_layout":
          return new UiInspector(this).layout(Json.object(args[0]));
        case "ui.validate_interaction":
          return new UiInspector(this).interaction(Json.object(args[0]));
        case "fingerprint":
          return this.fingerprint();
        case "sceneInfo":
          return this.sceneInfo();
        case "hierarchy":
          return this.hierarchy(Json.object((_a = args[0]) != null ? _a : {}));
        case "findNodes":
          return this.findNodes(Json.object(args[0]));
        case "serializeCurrentScene":
          return this.serializeCurrentScene();
        case "subtreeIdentity":
          return this.subtreeIdentity(String(args[0]));
        case "prefabReference": {
          const node = this.node(String(args[0]));
          const info = RuntimeAccess.object((_b = node._prefab) != null ? _b : {});
          if (!info.asset || info.root !== node) throw new CocosError("INVALID_ARGUMENT", "Select the prefab instance root");
          return { assetUuid: RuntimeAccess.uuid(info.asset), rootId: RuntimeAccess.uuid(node) };
        }
        case "childAt":
          return RuntimeAccess.uuid(this.node(String(args[0])).children[Number(args[1])]);
        case "nodeExists":
          return this.all().some((node) => RuntimeAccess.uuid(node) === String(args[0]));
        case "componentLocation": {
          for (const node of this.all()) {
            const components = Array.isArray(node._components) ? node._components : this.components(node);
            const index = components.findIndex((component) => component && RuntimeAccess.uuid(component) === String(args[0]));
            if (index >= 0) return { nodeId: RuntimeAccess.uuid(node), index };
          }
          throw new CocosError("NOT_FOUND", `Component not found: ${String(args[0])}`);
        }
        case "componentIds":
          return this.components(this.node(String(args[0]))).map((component) => RuntimeAccess.uuid(component));
        case "createSceneAsset":
          return this.createSceneAsset(Json.object(args[0]));
        case "validateScene":
          return this.validateScene();
        default:
          throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown scene method: ${method}`);
      }
    }
  };

  // packages/runtime3-bridge/src/material.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();

  // packages/shader-core/src/index.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var ShaderVariants = class {
    plan(axes, limit = 64) {
      if (!Number.isInteger(limit) || limit < 1 || limit > 256) throw new CocosError("INVALID_ARGUMENT", "Variant limit must be 1..256");
      let rows = [{}];
      let total = 1;
      for (const [name, values] of Object.entries(axes)) {
        Json.safePath(name);
        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) throw new CocosError("INVALID_ARGUMENT", "Invalid macro name");
        if (!Array.isArray(values) || !values.length || values.some((value) => !["boolean", "number", "string"].includes(typeof value))) throw new CocosError("INVALID_ARGUMENT", "Each macro axis needs scalar values");
        const unique = [...new Map(values.map((value) => [Json.canonical(value), value])).values()];
        total *= unique.length;
        if (total > limit) throw new CocosError("INVALID_ARGUMENT", "Variant budget exceeded", { total, limit });
        rows = rows.flatMap((row) => unique.map((value) => ({ ...row, [name]: value })));
      }
      return { rows, total, limit };
    }
  };
  var MaterialValues = class {
    properties(properties) {
      const normalized = {};
      for (const [name, value] of Object.entries(properties)) {
        Json.safePath(name);
        try {
          normalized[name] = this.normalize(value);
          this.value(normalized[name]);
        } catch (error) {
          throw new CocosError("INVALID_ARGUMENT", `Material property "${name}": ${CocosError.from(error).message}`);
        }
      }
      return normalized;
    }
    normalize(value) {
      if (Array.isArray(value)) return value.map((entry) => this.normalize(entry));
      if (!value || typeof value !== "object" || value.type !== void 0) return value;
      for (const [type, nativeType, keys] of [
        ["color", "cc.Color", ["r", "g", "b", "a"]],
        ["vec4", "cc.Vec4", ["x", "y", "z", "w"]],
        ["vec3", "cc.Vec3", ["x", "y", "z"]],
        ["vec2", "cc.Vec2", ["x", "y"]]
      ]) {
        if (value.__type__ !== void 0 && value.__type__ !== nativeType) continue;
        if (keys.every((key) => typeof value[key] === "number") && Object.keys(value).every((key) => key === "__type__" || keys.includes(key))) {
          return { type, value: keys.map((key) => value[key]) };
        }
      }
      return value;
    }
    validate(properties, declared) {
      for (const [name, value] of Object.entries(properties)) {
        Json.safePath(name);
        if (!(name in declared)) throw new CocosError("INVALID_ARGUMENT", `Unknown material property: ${name}`);
        this.value(value);
      }
    }
    value(value) {
      if (typeof value === "number" && !Number.isFinite(value)) throw new CocosError("INVALID_ARGUMENT", "Material number must be finite");
      if (value === null || typeof value === "string") throw new CocosError("INVALID_ARGUMENT", "Use an explicit texture UUID or typed material value");
      if (Array.isArray(value)) {
        for (const entry of value) this.value(entry);
      } else if (typeof value === "object") {
        const type = value.type;
        if (!["color", "vec2", "vec3", "vec4", "mat3", "mat4", "texture"].includes(String(type))) throw new CocosError("INVALID_ARGUMENT", 'Expected a typed material value, e.g. {type:"color",value:[255,255,255,255]}, {type:"vec4",value:[1,1,1,1]} or {type:"texture",uuid:"..."}; property declarations are not writable values');
        if (type === "texture") {
          Json.string(value.uuid, "texture UUID");
          return;
        }
        const count = type === "vec2" ? 2 : type === "vec3" ? 3 : type === "mat3" ? 9 : type === "mat4" ? 16 : 4;
        if (!Array.isArray(value.value) || value.value.length !== count || value.value.some((x) => typeof x !== "number" || !Number.isFinite(x))) throw new CocosError("INVALID_ARGUMENT", "Invalid vector/color components");
      }
    }
  };

  // packages/runtime3-bridge/src/material.ts
  var MaterialController = class {
    constructor(environment) {
      __publicField(this, "environment", environment);
      __publicField(this, "inspector");
      __publicField(this, "owned", /* @__PURE__ */ new Map());
      this.inspector = new SceneInspector(environment);
    }
    async load(uuid, type) {
      const asset = await new Promise((accept, reject) => RuntimeAccess.call(
        this.environment.cc.assetManager,
        "loadAny",
        uuid,
        (error, result) => error ? reject(error) : accept(result)
      ));
      const types = type === "TextureBase" ? ["Texture2D", "TextureCube", "RenderTexture", "TextureBase"] : [type];
      if (!types.some((name) => {
        const expected = this.environment.cc[name];
        return typeof expected === "function" && asset instanceof expected;
      })) throw new CocosError("INVALID_ARGUMENT", `Expected ${type} asset`);
      return RuntimeAccess.object(asset);
    }
    slot(p) {
      var _a;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      const slot = Number((_a = p.slot) != null ? _a : 0);
      if (!Number.isInteger(slot) || slot < 0) throw new CocosError("INVALID_ARGUMENT", "Invalid material slot");
      if (typeof component.getRenderMaterial !== "function" || typeof component.setMaterialInstance !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", "Component does not expose material slots");
      const material = RuntimeAccess.call(component, "getRenderMaterial", slot);
      if (!material) throw new CocosError("NOT_FOUND", "Material slot is empty or out of range");
      return { component, slot, material: RuntimeAccess.object(material) };
    }
    binding(p) {
      var _a;
      const component = this.inspector.component(Json.string(p.componentId, "componentId"));
      const slot = Number((_a = p.slot) != null ? _a : 0);
      const node = RuntimeAccess.object(component.node);
      const index = (Array.isArray(node._components) ? node._components : this.inspector.components(node)).indexOf(component);
      const ui = "customMaterial" in component;
      if (ui && slot !== 0) throw new CocosError("INVALID_ARGUMENT", "UI renderer only supports custom material slot 0");
      const materials = component.sharedMaterials;
      if (!ui && (!Array.isArray(materials) || slot < 0 || slot >= materials.length)) throw new CocosError("INVALID_ARGUMENT", "Material slot out of range");
      const material = ui ? component.customMaterial : materials[slot];
      const componentPath = ui ? "customMaterial" : `sharedMaterials.${slot}`;
      return {
        nodeId: RuntimeAccess.uuid(node),
        componentId: RuntimeAccess.uuid(component),
        slot,
        materialUuid: material ? RuntimeAccess.uuid(material) : "",
        componentPath,
        path: `__comps__.${index}.${componentPath}`
      };
    }
    bindings(uuid) {
      const rows = [];
      for (const node of this.inspector.all()) for (const component of this.inspector.components(node)) {
        if ("customMaterial" in component) {
          if (component.customMaterial && RuntimeAccess.uuid(component.customMaterial) === uuid) rows.push(this.binding({ componentId: RuntimeAccess.uuid(component) }));
        } else if (Array.isArray(component.sharedMaterials)) component.sharedMaterials.forEach((material, slot) => {
          if (material && RuntimeAccess.uuid(material) === uuid) rows.push(this.binding({ componentId: RuntimeAccess.uuid(component), slot }));
        });
      }
      return rows;
    }
    passes(material) {
      var _a;
      return (_a = material.passes) != null ? _a : [];
    }
    stateData(value, depth = 0) {
      if (depth > 6) throw new CocosError("INVALID_ARGUMENT", "Pipeline state nesting exceeds inspection limit");
      if (value === null || value === void 0 || typeof value !== "object") return RuntimeAccess.safeData(value);
      if (Array.isArray(value)) return value.map((entry) => this.stateData(entry, depth + 1));
      const rows = {};
      for (const key of RuntimeAccess.propertyNames(value)) {
        if (key === "native") continue;
        const entry = RuntimeAccess.object(value)[key];
        if (typeof entry !== "function") rows[key] = this.stateData(entry, depth + 1);
      }
      return rows;
    }
    passStates(pass) {
      return { blendState: this.stateData(pass.blendState), depthStencilState: this.stateData(pass.depthStencilState), rasterizerState: this.stateData(pass.rasterizerState) };
    }
    describe(material) {
      var _a;
      return {
        materialUuid: RuntimeAccess.uuid(material),
        effectUuid: material.effectAsset ? RuntimeAccess.uuid(material.effectAsset) : null,
        technique: Number((_a = material.technique) != null ? _a : 0),
        rows: this.passes(material).map((pass, index) => {
          var _a2, _b, _c, _d;
          return {
            pass: index,
            effectPass: Number((_a2 = pass.passIndex) != null ? _a2 : index),
            propertyIndex: Number((_c = (_b = pass.propertyIndex) != null ? _b : pass.passIndex) != null ? _c : index),
            properties: RuntimeAccess.safeData(pass.properties),
            defines: RuntimeAccess.safeData(pass.defines),
            states: this.passStates(pass),
            overrides: Object.keys(RuntimeAccess.object((_d = pass.properties) != null ? _d : {})).map((name) => ({ name, value: this.encode(RuntimeAccess.call(material, "getProperty", name, index)) }))
          };
        })
      };
    }
    encode(value) {
      if (value && typeof value === "object") {
        const object = RuntimeAccess.object(value);
        if (object.uuid) return { type: "texture", uuid: String(object.uuid) };
        for (const [type, count] of [["mat4", 16], ["mat3", 9]]) {
          const keys = Array.from({ length: count }, (_, index) => `m${String(index).padStart(2, "0")}`);
          if (keys.every((key) => typeof object[key] === "number")) return { type, value: keys.map((key) => Number(object[key])) };
        }
        for (const [type, keys] of [["color", ["r", "g", "b", "a"]], ["vec4", ["x", "y", "z", "w"]], ["vec3", ["x", "y", "z"]], ["vec2", ["x", "y"]]]) {
          if (keys.every((key) => typeof object[key] === "number")) return { type, value: keys.map((key) => Number(object[key])) };
        }
        if (Array.isArray(value)) return value.map((entry) => this.encode(entry));
      }
      return RuntimeAccess.safeData(value);
    }
    async decode(value) {
      if (Array.isArray(value)) return Promise.all(value.map((entry) => this.decode(entry)));
      if (value && typeof value === "object") {
        if (value.type === "texture") return this.load(Json.string(value.uuid, "texture UUID"), "TextureBase");
        const names = { color: "Color", vec2: "Vec2", vec3: "Vec3", vec4: "Vec4", mat3: "Mat3", mat4: "Mat4" };
        return RuntimeAccess.construct(this.environment.cc[names[String(value.type)]], value.value);
      }
      return value;
    }
    validateDefines(material, defines) {
      var _a, _b, _c, _d;
      const allowed = /* @__PURE__ */ new Map();
      for (const shader of (_a = RuntimeAccess.object(material.effectAsset).shaders) != null ? _a : []) for (const macro of (_b = shader.defines) != null ? _b : []) allowed.set(String(macro.name), macro);
      for (const technique of (_c = RuntimeAccess.object(material.effectAsset).techniques) != null ? _c : []) for (const pass of (_d = technique.passes) != null ? _d : []) {
        if (typeof pass.switch === "string") allowed.set(pass.switch, { type: "boolean" });
      }
      for (const [name, value] of Object.entries(defines)) {
        const macro = allowed.get(name);
        if (!macro) throw new CocosError("INVALID_ARGUMENT", `Unknown shader macro: ${name}`);
        if (macro.type && typeof value !== macro.type) throw new CocosError("INVALID_ARGUMENT", `Invalid macro type: ${name}`);
        if (Array.isArray(macro.range) && (typeof value !== "number" || value < Number(macro.range[0]) || value > Number(macro.range[1]))) throw new CocosError("INVALID_ARGUMENT", `Macro out of range: ${name}`);
        if (Array.isArray(macro.options) && !macro.options.includes(value)) throw new CocosError("INVALID_ARGUMENT", `Invalid macro option: ${name}`);
      }
    }
    async properties(material, properties, passIndex) {
      var _a, _b, _c, _d;
      properties = new MaterialValues().properties(properties);
      if (passIndex !== void 0 && (!Number.isInteger(passIndex) || !this.passes(material)[passIndex])) throw new CocosError("INVALID_ARGUMENT", "Pass index out of range");
      const declared = {};
      for (const pass of this.passes(material)) Object.assign(declared, RuntimeAccess.safeData(pass.properties));
      new MaterialValues().validate(properties, declared);
      const decoded = await Promise.all(Object.entries(properties).map(async ([name, value]) => ({ name, value: await this.decode(value) })));
      for (const row of decoded) {
        const passes = this.passes(material).map((pass, index) => ({ pass, index })).filter(({ pass, index }) => {
          var _a2;
          return (passIndex === void 0 || passIndex === index) && row.name in RuntimeAccess.object((_a2 = pass.properties) != null ? _a2 : {});
        });
        if (!passes.length) throw new CocosError("INVALID_ARGUMENT", `Property not declared on selected Pass: ${row.name}`);
        for (const { pass, index } of passes) {
          const handle = RuntimeAccess.call(pass, "getHandle", row.name);
          if (!handle) throw new CocosError("INVALID_ARGUMENT", `Property is inactive for this variant: ${row.name}`);
          const shader = RuntimeAccess.object((_a = pass.shaderInfo) != null ? _a : {});
          const uniforms = ((_b = shader.blocks) != null ? _b : []).flatMap((block) => {
            var _a2;
            return (_a2 = block.members) != null ? _a2 : [];
          });
          const declaration = uniforms.find((uniform) => uniform.name === row.name);
          if (declaration) {
            const types = RuntimeAccess.object(RuntimeAccess.object(this.environment.cc.gfx).Type);
            const encoded = this.encode(row.value);
            const expected = {
              number: [types.FLOAT, types.INT, types.UINT],
              boolean: [types.BOOL],
              vec2: [types.FLOAT2, types.INT2, types.UINT2, types.BOOL2],
              vec3: [types.FLOAT3, types.INT3, types.UINT3, types.BOOL3],
              vec4: [types.FLOAT4, types.INT4, types.UINT4, types.BOOL4],
              color: [types.FLOAT4],
              mat3: [types.MAT3],
              mat4: [types.MAT4]
            };
            const values = Array.isArray(encoded) ? encoded : [encoded];
            for (const value of values) {
              const kind = value && typeof value === "object" && !Array.isArray(value) ? String(value.type) : typeof value;
              if (!((_c = expected[kind]) == null ? void 0 : _c.includes(declaration.type))) throw new CocosError("INVALID_ARGUMENT", `Property type does not match shader uniform: ${row.name}`);
            }
            if (Number((_d = declaration.count) != null ? _d : 1) > 1 && (!Array.isArray(encoded) || encoded.length !== Number(declaration.count))) throw new CocosError("INVALID_ARGUMENT", `Uniform array length mismatch: ${row.name}`);
          }
          RuntimeAccess.call(material, "setProperty", row.name, row.value, index);
          if (Json.canonical(this.encode(RuntimeAccess.call(material, "getProperty", row.name, index))) !== Json.canonical(this.encode(row.value))) throw new CocosError("VERIFICATION_FAILED", `Material property readback differs: ${row.name}`);
        }
      }
    }
    states(states, material) {
      const allowed = /* @__PURE__ */ new Set(["rasterizerState", "depthStencilState", "blendState", "dynamicStates", "priority", "stage", "phase"]);
      for (const key of Object.keys(states)) if (!allowed.has(key)) throw new CocosError("INVALID_ARGUMENT", `Unknown pipeline state: ${key}`);
      const pass = material ? this.passes(material)[0] : void 0;
      for (const key of ["blendState", "depthStencilState", "rasterizerState"]) if (states[key] !== void 0 && pass) this.stateFields(states[key], pass[key], key);
    }
    stateFields(value, shape, path) {
      if (Array.isArray(value)) {
        if (!Array.isArray(shape) || !shape.length || value.length > 8) throw new CocosError("INVALID_ARGUMENT", `Invalid state array: ${path}`);
        value.forEach((entry, index) => {
          var _a;
          return this.stateFields(entry, (_a = shape[index]) != null ? _a : shape[0], `${path}.${index}`);
        });
        return;
      }
      if (value && typeof value === "object") {
        if (!shape || typeof shape !== "object") throw new CocosError("INVALID_ARGUMENT", `Invalid state object: ${path}`);
        for (const [key, entry] of Object.entries(value)) {
          Json.safePath(key);
          if (!(key in shape)) throw new CocosError("INVALID_ARGUMENT", `Unknown pipeline state: ${path}.${key}`);
          this.stateFields(entry, RuntimeAccess.object(shape)[key], `${path}.${key}`);
        }
        return;
      }
      if (typeof value !== typeof shape || typeof value === "number" && !Number.isFinite(value)) throw new CocosError("INVALID_ARGUMENT", `Invalid pipeline state value: ${path}`);
    }
    async instance(parent, p) {
      var _a, _b, _c, _d, _e;
      const passIndex = p.passIndex === void 0 ? void 0 : Number(p.passIndex);
      if (passIndex !== void 0 && (!Number.isInteger(passIndex) || !this.passes(parent)[passIndex])) throw new CocosError("INVALID_ARGUMENT", "Pass index out of range");
      const defines = Json.object((_a = p.defines) != null ? _a : {});
      this.validateDefines(parent, defines);
      const states = Json.object((_b = p.states) != null ? _b : {});
      this.states(states, parent);
      let base = parent;
      while (base.parent) base = RuntimeAccess.object(base.parent);
      const instanceType = (_d = RuntimeAccess.object((_c = this.environment.cc.renderer) != null ? _c : {}).MaterialInstance) != null ? _d : this.environment.cc.MaterialInstance;
      const instance = RuntimeAccess.construct(instanceType, [{ parent: base }]);
      try {
        RuntimeAccess.call(instance, "copy", parent);
        for (const [index, pass] of this.passes(parent).entries()) {
          if (pass.defines) RuntimeAccess.call(instance, "recompileShaders", pass.defines, index);
          if (pass.blendState && pass.depthStencilState && pass.rasterizerState) RuntimeAccess.call(instance, "overridePipelineStates", this.passStates(pass), index);
        }
        if (Object.keys(defines).length) RuntimeAccess.call(instance, "recompileShaders", defines, passIndex);
        if (Object.keys(states).length) RuntimeAccess.call(instance, "overridePipelineStates", states, passIndex);
        await this.properties(instance, Json.object((_e = p.properties) != null ? _e : {}), passIndex);
        return instance;
      } catch (error) {
        RuntimeAccess.destroyOwned(this.environment.cc, instance);
        throw error;
      }
    }
    compile(material) {
      const rows = this.passes(material).map((pass, index) => ({ pass: index, status: RuntimeAccess.call(pass, "tryCompile") === true ? "passed" : "failed", defines: RuntimeAccess.safeData(pass.defines) }));
      return { rows, status: rows.length && rows.every((row) => row.status === "passed") ? "passed" : "failed", stage: "engine-program", gpuDriverDiagnostics: "unavailable", drawValidation: "not-run" };
    }
    async serialized(p) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      if (!this.environment.serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Editor serializer unavailable");
      let previous;
      const material = RuntimeAccess.construct(this.environment.cc.Material, []);
      try {
        if (p.serialized) {
          const deserialize = this.environment.cc.deserialize;
          const details = RuntimeAccess.construct(RuntimeAccess.object(deserialize).Details, []);
          previous = RuntimeAccess.object(Reflect.apply(deserialize, null, [p.serialized, details]));
          const uuids = (_a = details.uuidList) != null ? _a : [];
          const objects = details.uuidObjList;
          const properties = details.uuidPropList;
          for (let index = 0; index < uuids.length; index++) {
            const asset = await new Promise((accept, reject) => RuntimeAccess.call(this.environment.cc.assetManager, "loadAny", uuids[index], (error, value) => error ? reject(error) : accept(value)));
            objects[index][properties[index]] = asset;
          }
          RuntimeAccess.call(previous, "onLoaded");
          RuntimeAccess.call(material, "copy", previous);
        }
        if (p.action === "inspect") return this.describe(material);
        const effect = p.effectUuid ? await this.load(Json.string(p.effectUuid, "effect UUID"), "EffectAsset") : material.effectAsset;
        if (!effect) throw new CocosError("INVALID_ARGUMENT", "Material requires an Effect");
        const technique = Number((_c = (_b = p.technique) != null ? _b : material.technique) != null ? _c : 0);
        if (!Array.isArray(RuntimeAccess.object(effect).techniques) || !RuntimeAccess.object(effect).techniques[technique]) throw new CocosError("INVALID_ARGUMENT", "Technique index out of range");
        const before = this.describe(material);
        const migration = [];
        let propertyPassIndex = p.passIndex === void 0 ? void 0 : Number(p.passIndex);
        if (p.effectUuid && previous) {
          RuntimeAccess.call(material, "reset", { effectAsset: effect, technique });
          this.validateDefines(material, Json.object((_d = p.defines) != null ? _d : {}));
          this.states(Json.object((_e = p.states) != null ? _e : {}), material);
          RuntimeAccess.call(material, "reset", { effectAsset: effect, technique, defines: (_f = p.defines) != null ? _f : {}, states: (_g = p.states) != null ? _g : {} });
          const declared = Object.assign({}, ...this.passes(material).map((pass) => pass.properties));
          for (const row of before.rows) for (const property of row.overrides) {
            if (property.value === null) continue;
            const name = String(property.name);
            if (!(name in declared)) {
              migration.push({ name, status: "removed" });
              continue;
            }
            try {
              await this.properties(material, { [name]: property.value }, Number(row.pass));
              migration.push({ name, pass: row.pass, status: "retained" });
            } catch (error) {
              migration.push({ name, status: "incompatible", reason: CocosError.from(error).message });
            }
          }
        } else {
          if (!previous) RuntimeAccess.call(material, "initialize", { effectAsset: effect, technique });
          this.validateDefines(material, Json.object((_h = p.defines) != null ? _h : {}));
          this.states(Json.object((_i = p.states) != null ? _i : {}), material);
          const copy = RuntimeAccess.construct(this.environment.cc.Material, []);
          const passIndex = p.passIndex === void 0 ? void 0 : Number(p.passIndex);
          if (passIndex !== void 0 && (!Number.isInteger(passIndex) || !this.passes(material)[passIndex])) throw new CocosError("INVALID_ARGUMENT", "Pass index out of range");
          const effectPass = passIndex === void 0 ? void 0 : Number(this.passes(material)[passIndex].passIndex);
          const techniquePasses = RuntimeAccess.object(effect).techniques[technique].passes;
          if (effectPass !== void 0 && (!Number.isInteger(effectPass) || !techniquePasses[effectPass])) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native Effect pass mapping is unavailable");
          const patch = (value) => effectPass === void 0 ? value : techniquePasses.map((_pass, index) => index === effectPass ? value : {});
          try {
            RuntimeAccess.call(copy, "copy", material, { technique, defines: patch((_j = p.defines) != null ? _j : {}), states: patch((_k = p.states) != null ? _k : {}) });
            RuntimeAccess.call(material, "copy", copy);
          } finally {
            RuntimeAccess.destroyOwned(this.environment.cc, copy);
          }
          if (effectPass !== void 0) {
            propertyPassIndex = this.passes(material).findIndex((pass) => pass.passIndex === effectPass);
            if (propertyPassIndex < 0) throw new CocosError("INVALID_ARGUMENT", "Selected Pass was disabled by the requested macros");
          }
        }
        await this.properties(material, Json.object((_l = p.properties) != null ? _l : {}), propertyPassIndex);
        const serialized = this.environment.serialize(material);
        return { serialized: Json.value(typeof serialized === "string" ? JSON.parse(serialized) : serialized), migration, material: this.describe(material) };
      } finally {
        RuntimeAccess.destroyOwned(this.environment.cc, material);
        if (previous) RuntimeAccess.destroyOwned(this.environment.cc, previous);
      }
    }
    async asset(p) {
      const material = await this.load(Json.string(p.uuid, "material UUID"), "Material");
      if (p.action !== "serialize") return this.describe(material);
      if (!this.environment.serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Editor serializer unavailable");
      const serialized = this.environment.serialize(material);
      return { serialized: Json.value(typeof serialized === "string" ? JSON.parse(serialized) : serialized), material: this.describe(material) };
    }
    async execute(id, p) {
      var _a, _b;
      if (this.environment.major !== 3) throw new CocosError("UNSUPPORTED_VERSION", "Shader material operations require Creator 3");
      const { component, slot, material } = this.slot(p);
      const key = `${RuntimeAccess.uuid(component)}:${slot}`;
      if (id === "runtime.material.inspect") return { ...this.describe(material), componentId: RuntimeAccess.uuid(component), slot, toolOwned: this.owned.has(key) };
      if (id === "runtime.material.compile") return this.compile(material);
      if (id === "runtime.shader.variants.compile") {
        const plan = new ShaderVariants().plan(Json.object(p.axes), Number((_a = p.limit) != null ? _a : 64));
        const rows = [];
        for (const defines of plan.rows) {
          const instance2 = await this.instance(material, { defines });
          try {
            rows.push({ defines, compilation: this.compile(instance2) });
          } finally {
            RuntimeAccess.destroyOwned(this.environment.cc, instance2);
          }
        }
        return { rows, total: rows.length };
      }
      const owned = this.owned.get(key);
      if (owned && owned.current !== material) throw new CocosError("OPERATION_CONFLICT", "Material binding changed outside this tool");
      if (id === "runtime.material.reset") {
        if (!owned) throw new CocosError("NOT_FOUND", "No tool-owned override to reset");
        this.restore(owned);
        this.owned.delete(key);
        return { restored: true };
      }
      const instance = await this.instance(material, p);
      try {
        const compilation = this.compile(instance);
        if (compilation.status !== "passed") throw new CocosError("VERIFICATION_FAILED", "Candidate material did not compile", compilation);
        RuntimeAccess.call(component, "setMaterialInstance", instance, slot);
        if (RuntimeAccess.call(component, "getRenderMaterial", slot) !== instance) throw new CocosError("VERIFICATION_FAILED", "Material instance binding failed");
      } catch (error) {
        if (RuntimeAccess.call(component, "getRenderMaterial", slot) === instance) this.restore({ component, slot, original: material, current: instance });
        else RuntimeAccess.destroyOwned(this.environment.cc, instance);
        throw error;
      }
      this.owned.set(key, { component, slot, original: (_b = owned == null ? void 0 : owned.original) != null ? _b : material, current: instance });
      if (owned) RuntimeAccess.destroyOwned(this.environment.cc, owned.current);
      return this.describe(instance);
    }
    dispose() {
      for (const row of this.owned.values()) {
        if (row.component.isValid !== false && RuntimeAccess.call(row.component, "getRenderMaterial", row.slot) === row.current) this.restore(row);
        else if (row.current.isValid !== false) RuntimeAccess.destroyOwned(this.environment.cc, row.current);
      }
      this.owned.clear();
    }
    restore(row) {
      if (row.original.parent) {
        RuntimeAccess.call(row.component, "setMaterialInstance", row.original, row.slot);
        RuntimeAccess.destroyOwned(this.environment.cc, row.current);
      } else RuntimeAccess.call(row.component, "setSharedMaterial", row.original, row.slot, true);
      if (RuntimeAccess.call(row.component, "getRenderMaterial", row.slot) !== row.original) throw new CocosError("VERIFICATION_FAILED", "Original material was not restored");
    }
  };

  // packages/runtime3-bridge/src/shader-preview.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var ShaderPreview = class {
    constructor(environment, materials) {
      __publicField(this, "environment", environment);
      __publicField(this, "materials", materials);
      __publicField(this, "preview");
      __publicField(this, "baselines", /* @__PURE__ */ new Map());
      __publicField(this, "sequence", 0);
    }
    active() {
      if (!this.preview || this.preview.root.isValid === false) throw new CocosError("CONTEXT_UNAVAILABLE", "Open a shader preview first");
      return this.preview;
    }
    async frame() {
      const director = this.environment.cc.director;
      const event = RuntimeAccess.object(this.environment.cc.Director).EVENT_AFTER_DRAW;
      if (!event) throw new CocosError("UNSUPPORTED_CAPABILITY", "Frame completion event unavailable");
      await new Promise((accept, reject) => {
        const done = () => {
          clearTimeout(timeout);
          RuntimeAccess.call(director, "off", event, done);
          accept();
        };
        const timeout = setTimeout(() => {
          RuntimeAccess.call(director, "off", event, done);
          reject(new CocosError("CONTEXT_UNAVAILABLE", "No rendered frame within 5 seconds"));
        }, 5e3);
        RuntimeAccess.call(director, "once", event, done);
      });
    }
    async execute(id, p) {
      var _a;
      if (id === "runtime.shader.preview.close") {
        this.dispose();
        return { closed: true };
      }
      if (id === "runtime.shader.profile") return this.profile(p);
      if (id === "runtime.shader.preview.open") return this.open(p);
      const preview = this.active();
      if (id === "runtime.shader.preview.update") {
        const candidate = await this.materials.instance(preview.material, p);
        try {
          if (this.materials.compile(candidate).status !== "passed") throw new CocosError("VERIFICATION_FAILED", "Preview candidate failed compilation");
          RuntimeAccess.call(preview.renderer, "setMaterialInstance", candidate, 0);
        } catch (error) {
          RuntimeAccess.destroyOwned(this.environment.cc, candidate);
          throw error;
        }
        const previous = preview.material;
        preview.material = candidate;
        RuntimeAccess.destroyOwned(this.environment.cc, previous);
        await this.frame();
        return this.materials.describe(candidate);
      }
      await this.frame();
      const bytes = RuntimeAccess.call(preview.texture, "readPixels", 0, 0, preview.width, preview.height);
      if (!bytes || bytes.length !== preview.width * preview.height * 4) throw new CocosError("VERIFICATION_FAILED", "RenderTexture readback unavailable");
      if (id === "runtime.shader.preview.compare") {
        const baseline = this.baselines.get(Json.string(p.baselineId, "baselineId"));
        if (!baseline || baseline.length !== bytes.length) throw new CocosError("NOT_FOUND", "Baseline expired or dimensions changed");
        let sum = 0;
        let changed = 0;
        const difference = new Uint8Array(bytes.length);
        for (let offset = 0; offset < bytes.length; offset += 4) {
          let pixelChanged = false;
          for (let channel = 0; channel < 3; channel++) {
            const delta = Math.abs(bytes[offset + channel] - baseline[offset + channel]);
            sum += delta;
            difference[offset + channel] = delta;
            if (delta) pixelChanged = true;
          }
          difference[offset + 3] = 255;
          if (pixelChanged) changed++;
        }
        const meanError = sum / (preview.width * preview.height * 3 * 255);
        return {
          meanError,
          changedPixels: changed,
          passed: meanError <= Number((_a = p.tolerance) != null ? _a : 0.01),
          difference: this.image(difference, preview.width, preview.height),
          scope: "same-runtime-rendertexture",
          artisticAcceptance: "requires-review"
        };
      }
      const baselineId = `preview-${++this.sequence}`;
      this.baselines.set(baselineId, new Uint8Array(bytes));
      if (this.baselines.size > 8) this.baselines.delete(this.baselines.keys().next().value);
      let uniform = true;
      for (let offset = 4; offset < bytes.length; offset += 4) if (bytes[offset] !== bytes[0] || bytes[offset + 1] !== bytes[1] || bytes[offset + 2] !== bytes[2]) {
        uniform = false;
        break;
      }
      return {
        baselineId,
        width: preview.width,
        height: preview.height,
        ...Json.object(this.image(bytes, preview.width, preview.height)),
        uniformImage: uniform,
        compilation: this.materials.compile(preview.material),
        source: "dedicated-rendertexture",
        timeControl: "live-engine-time"
      };
    }
    image(bytes, width, height) {
      const document = globalThis.document;
      if (!document) throw new CocosError("UNSUPPORTED_CAPABILITY", "PNG capture requires a browser Canvas encoder on this platform");
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new CocosError("UNSUPPORTED_CAPABILITY", "PNG encoder unavailable");
      const pixels = context.createImageData(width, height);
      for (let y = 0; y < height; y++) pixels.data.set(bytes.subarray((height - y - 1) * width * 4, (height - y) * width * 4), y * width * 4);
      context.putImageData(pixels, 0, 0);
      return { dataUrl: canvas.toDataURL("image/png"), origin: "top-left" };
    }
    async open(p) {
      var _a, _b, _c;
      if (this.preview) throw new CocosError("RESOURCE_BUSY", "Close the previous preview first");
      const cc = this.environment.cc;
      const inspector = new SceneInspector(this.environment);
      const width = Number((_a = p.width) != null ? _a : 512);
      const height = Number((_b = p.height) != null ? _b : 512);
      if (![width, height].every((value) => Number.isInteger(value) && value >= 16 && value <= 2048)) throw new CocosError("INVALID_ARGUMENT", "Preview dimensions must be 16..2048");
      const parent = await this.materials.load(Json.string(p.materialUuid, "materialUuid"), "Material");
      const material = await this.materials.instance(parent, {});
      const root = RuntimeAccess.construct(cc.Node, ["Cocos MCP Shader Preview"]);
      const texture = RuntimeAccess.construct(cc.RenderTexture, []);
      let mesh;
      const masks = [];
      try {
        const used = inspector.all().reduce((value, node) => {
          var _a2;
          return value | Number((_a2 = node.layer) != null ? _a2 : 0);
        }, 0);
        let layer = 0;
        for (let bit = 0; bit < 20; bit++) if (!(used & 1 << bit)) {
          layer = 1 << bit;
          break;
        }
        if (!layer) throw new CocosError("RESOURCE_BUSY", "No unused preview layer");
        for (const node of inspector.all()) for (const component of inspector.components(node)) {
          if (typeof cc.Camera === "function" && component instanceof cc.Camera) {
            const before = Number(component.visibility);
            const after = before & ~layer;
            masks.push({ camera: component, before, after });
            component.visibility = after;
          }
        }
        RuntimeAccess.call(root, "setParent", inspector.current());
        root.layer = layer;
        const object = RuntimeAccess.construct(cc.Node, ["Shader Geometry"]);
        object.layer = layer;
        RuntimeAccess.call(object, "setParent", root);
        const primitive = RuntimeAccess.object(cc.primitives);
        const shape = String((_c = p.shape) != null ? _c : "sphere");
        if (!["sphere", "cube", "quad"].includes(shape)) throw new CocosError("INVALID_ARGUMENT", "Unknown preview shape");
        const geometry = shape === "sphere" ? RuntimeAccess.call(primitive, "sphere", 0.8) : shape === "cube" ? RuntimeAccess.call(primitive, "box") : RuntimeAccess.call(primitive, "quad");
        mesh = RuntimeAccess.object(RuntimeAccess.call(cc.utils, "createMesh", geometry));
        const renderer = RuntimeAccess.object(RuntimeAccess.call(object, "addComponent", cc.MeshRenderer));
        renderer.mesh = mesh;
        RuntimeAccess.call(renderer, "setSharedMaterial", parent, 0);
        RuntimeAccess.call(renderer, "setMaterialInstance", material, 0);
        const cameraNode = RuntimeAccess.construct(cc.Node, ["Shader Camera"]);
        cameraNode.layer = layer;
        RuntimeAccess.call(cameraNode, "setParent", root);
        RuntimeAccess.call(cameraNode, "setPosition", 0, 0, 3);
        const camera = RuntimeAccess.object(RuntimeAccess.call(cameraNode, "addComponent", cc.Camera));
        camera.visibility = layer;
        camera.priority = 1e3;
        camera.clearColor = RuntimeAccess.construct(cc.Color, [24, 24, 28, 255]);
        camera.clearFlags = 7;
        RuntimeAccess.call(texture, "reset", { width, height });
        camera.targetTexture = texture;
        this.preview = { root, renderer, texture, mesh, material, width, height, masks };
        await this.frame();
        return { opened: true, width, height, componentId: RuntimeAccess.uuid(renderer), compilation: this.materials.compile(material), timeControl: "live-engine-time", lighting: "current-scene" };
      } catch (error) {
        if (this.preview) this.dispose();
        else {
          for (const row of masks) if (row.camera.visibility === row.after) row.camera.visibility = row.before;
          RuntimeAccess.destroyOwned(this.environment.cc, root);
          RuntimeAccess.destroyOwned(this.environment.cc, texture);
          RuntimeAccess.destroyOwned(this.environment.cc, material);
          if (mesh) RuntimeAccess.destroyOwned(this.environment.cc, mesh);
        }
        throw error;
      }
    }
    async profile(p) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const frames = Number((_a = p.frames) != null ? _a : 60), warmupFrames = Number((_b = p.warmupFrames) != null ? _b : 10);
      const maxFrameMs = p.maxFrameMs === void 0 ? null : Number(p.maxFrameMs);
      if (!Number.isInteger(frames) || frames < 2 || frames > 300) throw new CocosError("INVALID_ARGUMENT", "Frame count must be 2..300");
      if (!Number.isInteger(warmupFrames) || warmupFrames < 1 || warmupFrames > 120 || maxFrameMs !== null && (!Number.isFinite(maxFrameMs) || maxFrameMs <= 0 || maxFrameMs > 1e3)) throw new CocosError("INVALID_ARGUMENT", "Invalid warmup or frame budget");
      const started = performance.now();
      const rows = [];
      for (let index = 0; index < warmupFrames; index++) {
        if (performance.now() - started > 15e3) throw new CocosError("CONTEXT_UNAVAILABLE", "Frame warmup exceeded 15 seconds");
        await this.frame();
      }
      let previous = performance.now();
      for (let index = 0; index < frames; index++) {
        if (performance.now() - started > 15e3) throw new CocosError("CONTEXT_UNAVAILABLE", "Frame sampling exceeded 15 seconds");
        await this.frame();
        const now = performance.now();
        rows.push(now - previous);
        previous = now;
      }
      const sorted = [...rows].sort((a, b) => a - b);
      const meanMs = rows.reduce((sum, value) => sum + value, 0) / frames;
      const p95Ms = sorted[Math.ceil(frames * 0.95) - 1];
      const canvas = RuntimeAccess.object((_c = this.environment.cc.game) != null ? _c : {}).canvas;
      const rect = (_d = canvas == null ? void 0 : canvas.getBoundingClientRect) == null ? void 0 : _d.call(canvas);
      const exceededFrames = maxFrameMs === null ? null : rows.filter((value) => value > maxFrameMs).length;
      return {
        frames,
        meanMs,
        estimatedFps: meanMs > 0 ? 1e3 / meanMs : null,
        p50Ms: sorted[Math.ceil(frames * 0.5) - 1],
        p95Ms,
        p99Ms: sorted[Math.ceil(frames * 0.99) - 1],
        maxMs: sorted.at(-1),
        viewport: { width: (_e = canvas == null ? void 0 : canvas.width) != null ? _e : null, height: (_f = canvas == null ? void 0 : canvas.height) != null ? _f : null, cssWidth: (_g = rect == null ? void 0 : rect.width) != null ? _g : null, cssHeight: (_h = rect == null ? void 0 : rect.height) != null ? _h : null, devicePixelRatio: (_i = globalThis.devicePixelRatio) != null ? _i : null },
        budget: maxFrameMs === null ? null : { maxFrameMs, metric: "p95Ms", passed: p95Ms <= maxFrameMs, exceededFrames },
        warnings: maxFrameMs !== null && p95Ms > maxFrameMs ? ["Frame-time budget exceeded; reduce effect complexity or render resolution and measure again"] : [],
        rows,
        scope: "whole-frame-wall-time",
        gpuMs: null,
        unavailableMetrics: ["isolated-shader-gpu-time", "gpu-memory"],
        warmupFrames
      };
    }
    dispose() {
      const preview = this.preview;
      this.preview = void 0;
      this.baselines.clear();
      if (!preview) return;
      for (const row of preview.masks) if (row.camera.isValid !== false && row.camera.visibility === row.after) row.camera.visibility = row.before;
      for (const object of [preview.root, preview.material, preview.mesh, preview.texture]) if (object.isValid !== false) RuntimeAccess.destroyOwned(this.environment.cc, object);
    }
  };

  // packages/runtime3-bridge/src/assets.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var RuntimeAssets = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
      __publicField(this, "generation", 0);
      __publicField(this, "sequence", 0);
      __publicField(this, "handles", /* @__PURE__ */ new Map());
      __publicField(this, "pending", /* @__PURE__ */ new Map());
      __publicField(this, "watching", false);
      __publicField(this, "sceneChanged", () => this.dispose());
    }
    snapshot() {
      return { ownedAssetRefs: this.handles.size, pendingAssetLoads: this.pending.size, assetSceneListeners: this.watching ? 1 : 0 };
    }
    scene() {
      return this.cc.director && typeof RuntimeAccess.object(this.cc.director).getScene === "function" ? RuntimeAccess.call(this.cc.director, "getScene") : null;
    }
    watch() {
      const director = this.cc.director;
      if (!this.watching && director && typeof RuntimeAccess.object(director).on === "function") {
        RuntimeAccess.call(director, "on", "director_after_scene_launch", this.sceneChanged);
        this.watching = true;
      }
    }
    async load(uuid, preload, timeoutMs) {
      if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(@[a-zA-Z0-9_-]{1,32})?$/.test(uuid)) throw new CocosError("INVALID_ARGUMENT", "Expected a full local AssetDB UUID, not a URL or path");
      if (this.pending.size + this.handles.size >= 128) throw new CocosError("RESOURCE_BUSY", "Runtime asset handle and request limit reached");
      const requestId = ++this.sequence, generation = this.generation;
      return new Promise((resolve, reject) => {
        let settled = false;
        const finish = (error, value) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          this.pending.delete(requestId);
          if (error) reject(error);
          else if (generation !== this.generation) reject(new CocosError("STALE_HANDLE", "Runtime changed during resource loading"));
          else resolve(value);
        };
        const timer = setTimeout(() => finish(new CocosError("CONTEXT_UNAVAILABLE", "Resource load timed out; engine request may still finish")), timeoutMs);
        this.pending.set(requestId, (error) => finish(error));
        try {
          RuntimeAccess.call(this.cc.assetManager, preload ? "preloadAny" : "loadAny", uuid, finish);
        } catch (error) {
          finish(CocosError.from(error));
        }
      });
    }
    async execute(id, p) {
      var _a;
      if (id === "runtime.bundle.inspect") {
        const rows = [];
        RuntimeAccess.call(RuntimeAccess.object(this.cc.assetManager).bundles, "forEach", (bundle) => {
          var _a2;
          return rows.push({ name: String(bundle.name), base: String((_a2 = bundle.base) != null ? _a2 : ""), ownedByTool: false });
        });
        return { rows, scope: "loaded-bundles", unloadSupported: false };
      }
      if (id === "runtime.asset.load" || id === "runtime.asset.preload") {
        this.watch();
        const generation = this.generation, scene = this.scene(), timeoutMs = Number((_a = p.timeoutMs) != null ? _a : 1e4);
        if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 3e4) throw new CocosError("INVALID_ARGUMENT", "timeoutMs must be 100..30000");
        const uuid = Json.string(p.uuid, "uuid"), value = await this.load(uuid, id.endsWith("preload"), timeoutMs);
        if (generation !== this.generation || scene !== this.scene()) throw new CocosError("STALE_HANDLE", "Runtime changed before resource acquisition");
        if (id.endsWith("preload")) return { uuid, phase: "downloaded-not-parsed", bound: false };
        const asset2 = RuntimeAccess.object(value, "loaded asset");
        if (typeof asset2.addRef !== "function" || typeof asset2.decRef !== "function") throw new CocosError("UNSUPPORTED_CAPABILITY", "Loaded object is not a reference-counted asset");
        RuntimeAccess.call(asset2, "addRef");
        const handle2 = `${generation}:asset:${++this.sequence}`;
        this.handles.set(handle2, asset2);
        return { handle: handle2, uuid: RuntimeAccess.uuid(asset2), phase: "loaded", bound: false, refCount: Number(asset2.refCount) };
      }
      const handle = Json.string(p.handle, "handle"), asset = this.handles.get(handle);
      if (!asset) throw new CocosError("STALE_HANDLE", "Resource handle is absent or expired");
      if (id === "runtime.asset.inspect") return { handle, uuid: RuntimeAccess.uuid(asset), valid: asset.isValid !== false, refCount: Number(asset.refCount), ownedReferences: 1 };
      if (id === "runtime.asset.release") {
        RuntimeAccess.call(asset, "decRef", false);
        this.handles.delete(handle);
        return { handle, releasedOwnedReference: true, engineCacheReleased: false };
      }
      throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown asset tool: ${id}`);
    }
    dispose() {
      this.generation++;
      if (this.watching) {
        try {
          RuntimeAccess.call(this.cc.director, "off", "director_after_scene_launch", this.sceneChanged);
        } catch (e) {
        }
        this.watching = false;
      }
      for (const cancel of this.pending.values()) cancel(new CocosError("STALE_HANDLE", "Runtime session or scene ended"));
      this.pending.clear();
      for (const asset of this.handles.values()) {
        try {
          RuntimeAccess.call(asset, "decRef", false);
        } catch (e) {
        }
      }
      this.handles.clear();
    }
  };

  // packages/runtime3-bridge/src/task-session.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var RuntimeTaskSessions = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
      __publicField(this, "tasks", /* @__PURE__ */ new Map());
      __publicField(this, "generation", 0);
      __publicField(this, "sequence", 0);
    }
    snapshot() {
      return { runningTasks: [...this.tasks.values()].filter((task) => task.status === "running").length, retainedTasks: this.tasks.size };
    }
    start(run) {
      if ([...this.tasks.values()].filter((task2) => task2.status === "running").length >= 4) throw new CocosError("RESOURCE_BUSY", "At most four runtime tasks may run concurrently");
      while (this.tasks.size >= 8) {
        const oldest = [...this.tasks.values()].find((task2) => task2.status !== "running");
        if (!oldest) break;
        this.tasks.delete(oldest.taskId);
      }
      const taskId = `${this.generation}:task:${++this.sequence}`;
      const task = { taskId, status: "running", progress: {}, frames: new FrameSession(this.cc), cancelled: false, completion: Promise.resolve() };
      this.tasks.set(taskId, task);
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        task.frames.dispose();
      }, 3e4);
      task.completion = Promise.resolve().then(() => {
        if (task.cancelled) throw new CocosError("STALE_HANDLE", "Task cancelled before starting");
        return run(task.frames, (value) => {
          task.progress = value;
        });
      }).then((result) => {
        task.result = result;
        task.status = "completed";
      }, (error) => {
        const failure = CocosError.from(error);
        task.status = task.cancelled && !timedOut && failure.code !== "OUTCOME_UNKNOWN" ? "cancelled" : "failed";
        task.error = (timedOut && failure.code !== "OUTCOME_UNKNOWN" ? new CocosError("CONTEXT_UNAVAILABLE", "Runtime task exceeded 30 seconds") : failure).toJSON();
      }).finally(() => {
        clearTimeout(timeout);
        task.frames.dispose();
      });
      return { taskId, status: "running", deadlineMs: 3e4 };
    }
    task(p) {
      const task = this.tasks.get(Json.string(p.taskId, "taskId"));
      if (!task) throw new CocosError("STALE_HANDLE", "Runtime task expired or belongs to an ended scene/session");
      return task;
    }
    poll(p) {
      const task = this.task(p);
      return { taskId: task.taskId, status: task.status, progress: task.progress, ...task.result ? { result: task.result } : {}, ...task.error ? { error: task.error } : {} };
    }
    async stop(p) {
      const task = this.task(p);
      if (task.status === "running") {
        task.cancelled = true;
        task.frames.dispose();
      }
      await task.completion;
      return this.poll(p);
    }
    dispose() {
      this.generation++;
      for (const task of this.tasks.values()) if (task.status === "running") {
        task.cancelled = true;
        task.frames.dispose();
      }
      this.tasks.clear();
    }
  };

  // packages/runtime3-bridge/src/view-session.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var RuntimeViewSession = class {
    constructor(cc) {
      __publicField(this, "cc", cc);
      __publicField(this, "restores", /* @__PURE__ */ new Map());
      __publicField(this, "sequence", 0);
      __publicField(this, "policySequence", 0);
      __publicField(this, "strategies", /* @__PURE__ */ new WeakMap());
      __publicField(this, "policyObservers", /* @__PURE__ */ new Map());
    }
    pruneObservers() {
      const retained = /* @__PURE__ */ new Set([RuntimeAccess.object(RuntimeAccess.call(this.cc.view, "getResolutionPolicy"))]);
      for (const record of this.restores.values()) {
        retained.add(RuntimeAccess.object(record.policy));
        retained.add(record.appliedPolicy);
      }
      for (const [policy, observer] of this.policyObservers) if (!retained.has(policy)) {
        observer.dispose();
        this.policyObservers.delete(policy);
      }
    }
    watch(policy) {
      if (this.policyObservers.has(policy)) return;
      const undo = [], observer = { revision: 0, dispose: () => {
        for (const restore of undo.reverse()) restore();
      } };
      try {
        for (const name of ["setContentStrategy", "setContainerStrategy"]) {
          const original = policy[name];
          if (typeof original !== "function") continue;
          const descriptor = Object.getOwnPropertyDescriptor(policy, name);
          const wrapper = function(...args) {
            observer.revision++;
            return Reflect.apply(original, this, args);
          };
          Object.defineProperty(policy, name, { configurable: true, writable: true, value: wrapper });
          undo.push(() => {
            if (policy[name] === wrapper) {
              if (descriptor) Object.defineProperty(policy, name, descriptor);
              else delete policy[name];
            }
          });
        }
        if (!undo.length && (typeof policy.getContentStrategy !== "function" || typeof policy.getContainerStrategy !== "function")) throw new CocosError("UNSUPPORTED_CAPABILITY", "Resolution policy cannot be observed safely");
        this.policyObservers.set(policy, observer);
      } catch (error) {
        observer.dispose();
        throw error;
      }
    }
    policy(view) {
      var _a, _b;
      if (typeof view.getResolutionPolicy !== "function") return { status: "unknown" };
      const policy = RuntimeAccess.object(RuntimeAccess.call(view, "getResolutionPolicy"));
      const identify = (value) => {
        const object = RuntimeAccess.object(value);
        if (!this.strategies.has(object)) this.strategies.set(object, ++this.policySequence);
        return this.strategies.get(object);
      };
      return {
        status: "observed",
        policyId: identify(policy),
        contentStrategyId: typeof policy.getContentStrategy === "function" ? identify(RuntimeAccess.call(policy, "getContentStrategy")) : null,
        containerStrategyId: typeof policy.getContainerStrategy === "function" ? identify(RuntimeAccess.call(policy, "getContainerStrategy")) : null,
        publicSetterRevision: (_b = (_a = this.policyObservers.get(policy)) == null ? void 0 : _a.revision) != null ? _b : 0,
        customStrategyMutationCoverage: this.policyObservers.has(policy) ? "public-setters-and-object-identity" : "partial-public-api"
      };
    }
    geometry() {
      var _a;
      const view = RuntimeAccess.object(this.cc.view, "public view"), canvas = RuntimeAccess.object(this.cc.game).canvas;
      const size = (method) => {
        if (typeof view[method] !== "function") return null;
        const value = RuntimeAccess.object(RuntimeAccess.call(view, method));
        return { width: Number(value.width), height: Number(value.height) };
      };
      const rect = (_a = canvas == null ? void 0 : canvas.getBoundingClientRect) == null ? void 0 : _a.call(canvas);
      const viewport = typeof view.getViewportRect === "function" ? RuntimeAccess.object(RuntimeAccess.call(view, "getViewportRect")) : void 0;
      const geometry = {
        designResolution: size("getDesignResolutionSize"),
        frameSize: size("getFrameSize"),
        canvasPixelSize: canvas ? { width: canvas.width, height: canvas.height } : null,
        canvasRect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
        engineScale: { x: typeof view.getScaleX === "function" ? Number(RuntimeAccess.call(view, "getScaleX")) : null, y: typeof view.getScaleY === "function" ? Number(RuntimeAccess.call(view, "getScaleY")) : null },
        engineViewportRect: viewport ? { x: Number(viewport.x), y: Number(viewport.y), width: Number(viewport.width), height: Number(viewport.height) } : null,
        devicePixelRatio: typeof devicePixelRatio === "number" ? devicePixelRatio : null,
        resolutionPolicy: this.policy(view)
      };
      return geometry;
    }
    unchanged(observed) {
      const { viewHash: _hash, scope: _scope, trueDeviceSimulation: _device, ...geometry } = observed;
      return Json.canonical(geometry) === Json.canonical(this.geometry());
    }
    async inspect() {
      var _a;
      const geometry = this.geometry();
      if (!((_a = globalThis.crypto) == null ? void 0 : _a.subtle)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Public cryptographic digest is unavailable");
      const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(Json.canonical(geometry)));
      return { ...geometry, viewHash: [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join(""), scope: "current-runtime-scene", trueDeviceSimulation: false };
    }
    async configure(p) {
      if (this.restores.size >= 16) throw new CocosError("RESOURCE_BUSY", "At most sixteen view restore handles may be retained");
      this.pruneObservers();
      const view = RuntimeAccess.object(this.cc.view), before = await this.inspect();
      if (before.viewHash !== p.expectedHash) throw new CocosError("STALE_REVISION", "View geometry changed before configuration", before);
      if (Json.object(before.resolutionPolicy).status !== "observed") throw new CocosError("UNSUPPORTED_CAPABILITY", "Public resolution strategy inspection is unavailable; settings were preserved");
      const width = Number(p.width), height = Number(p.height);
      if (![width, height].every((value) => Number.isInteger(value) && value >= 256 && value <= 4096)) throw new CocosError("INVALID_ARGUMENT", "Design resolution must be 256..4096");
      const previousPolicy = RuntimeAccess.call(view, "getResolutionPolicy");
      const policy = p.policy === void 0 ? previousPolicy : RuntimeAccess.object(this.cc.ResolutionPolicy)[String(p.policy)];
      if (policy === void 0) throw new CocosError("UNSUPPORTED_CAPABILITY", "Requested resolution policy is unavailable");
      const confirmed = await this.inspect();
      if (confirmed.viewHash !== before.viewHash || !this.unchanged(confirmed)) throw new CocosError("STALE_REVISION", "View changed during preflight");
      this.watch(RuntimeAccess.object(previousPolicy));
      const policyRevision = this.policyObservers.get(RuntimeAccess.object(previousPolicy)).revision;
      try {
        RuntimeAccess.call(view, "setDesignResolutionSize", width, height, policy);
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "View configuration may have changed; inspect before retrying", { before, cause: CocosError.from(error).message });
      }
      const appliedPolicy = RuntimeAccess.object(RuntimeAccess.call(view, "getResolutionPolicy"));
      this.watch(appliedPolicy);
      const after = await this.inspect(), restoreId = `view:${++this.sequence}`;
      this.restores.set(restoreId, { before, policy: previousPolicy, appliedPolicy, policyRevision, appliedHash: String(after.viewHash) });
      return { restoreId, before, after, restored: false };
    }
    async restore(p) {
      var _a;
      const id = Json.string(p.restoreId, "restoreId"), record = this.restores.get(id);
      if (!record) throw new CocosError("STALE_HANDLE", "View restore handle expired");
      const current = await this.inspect();
      if (current.viewHash !== record.appliedHash || !this.unchanged(current) || ((_a = this.policyObservers.get(RuntimeAccess.object(record.policy))) == null ? void 0 : _a.revision) !== record.policyRevision) throw new CocosError("STALE_REVISION", "View or saved policy changed; settings were preserved", current);
      const size = Json.object(record.before.designResolution);
      try {
        RuntimeAccess.call(this.cc.view, "setDesignResolutionSize", size.width, size.height, record.policy);
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "View restoration may have changed settings; inspect before retrying", { restoreId: id, cause: CocosError.from(error).message });
      }
      this.restores.delete(id);
      this.pruneObservers();
      return { restoreId: id, restored: true, after: await this.inspect() };
    }
    snapshot() {
      return { viewRestoreHandles: this.restores.size };
    }
    dispose() {
      this.restores.clear();
      for (const observer of this.policyObservers.values()) observer.dispose();
      this.policyObservers.clear();
    }
  };

  // packages/runtime3-bridge/src/ui-selector.ts
  init_define_COCOS_VERIFICATION_EVIDENCE();
  var RuntimeUiSelector = class {
    constructor(scene) {
      __publicField(this, "scene", scene);
    }
    nodes(p, selector) {
      const rows = this.scene.all(p.rootId ? this.scene.node(String(p.rootId)) : this.scene.current());
      if (rows.length > 5e3) throw new CocosError("RESOURCE_BUSY", "UI selector scope exceeds 5000 nodes");
      if (!["nodeId", "name", "path"].some((key) => typeof selector[key] === "string" && selector[key] !== "")) throw new CocosError("INVALID_ARGUMENT", "Specify a nodeId, name or path");
      return rows.filter((node) => {
        const names = [];
        let cursor = node;
        while (cursor == null ? void 0 : cursor.parent) {
          names.unshift(String(cursor.name));
          cursor = cursor.parent;
        }
        return (!selector.nodeId || RuntimeAccess.uuid(node) === selector.nodeId) && (!selector.name || node.name === selector.name) && (!selector.path || names.join("/") === selector.path);
      });
    }
    component(node, type) {
      return this.scene.components(node).find((row) => this.scene.type(row) === type);
    }
    geometry(node) {
      var _a, _b;
      const { cc, major } = this.scene.environment, canvas = RuntimeAccess.object(cc.game).canvas;
      const rect = (_a = canvas == null ? void 0 : canvas.getBoundingClientRect) == null ? void 0 : _a.call(canvas);
      if (!canvas || !rect || !rect.width || !rect.height) throw new CocosError("CONTEXT_UNAVAILABLE", "Canvas geometry is unavailable");
      let camera;
      if (major === 2) camera = RuntimeAccess.object(RuntimeAccess.call(cc.Camera, "findCamera", node), "node camera");
      else {
        let ancestor2 = node, canvasCamera;
        while (ancestor2) {
          const canvasComponent = this.component(ancestor2, "cc.Canvas");
          if (canvasComponent == null ? void 0 : canvasComponent.cameraComponent) {
            canvasCamera = RuntimeAccess.object(canvasComponent.cameraComponent);
            break;
          }
          ancestor2 = ancestor2.parent;
        }
        const cameras = canvasCamera ? [canvasCamera] : this.scene.all().flatMap((row) => this.scene.components(row)).filter((row) => this.scene.type(row) === "cc.Camera" && row.enabledInHierarchy !== false && !row.targetTexture && (Number(row.visibility) & Number(node.layer)) !== 0);
        if (cameras.length !== 1) throw new CocosError("AMBIGUOUS_TARGET", "A unique public UI camera is required", { cameraCount: cameras.length });
        camera = cameras[0];
      }
      const transform = major === 3 ? this.component(node, "cc.UITransform") : node;
      if (!transform) throw new CocosError("UNSUPPORTED_CAPABILITY", "UITransform is unavailable");
      const size = major === 3 ? RuntimeAccess.object(transform.contentSize) : node, anchor = major === 3 ? RuntimeAccess.object(transform.anchorPoint) : { x: node.anchorX, y: node.anchorY };
      const width = Number(size.width), height = Number(size.height), ax = Number(anchor.x), ay = Number(anchor.y);
      if (![width, height, ax, ay].every(Number.isFinite) || width <= 0 || height <= 0) throw new CocosError("CONTEXT_UNAVAILABLE", "Node has no positive UI bounds");
      const points = [[-width * ax, -height * ay], [width * (1 - ax), -height * ay], [-width * ax, height * (1 - ay)], [width * (1 - ax), height * (1 - ay)]].map(([x, y]) => {
        const local = RuntimeAccess.construct(major === 2 ? cc.Vec2 : cc.Vec3, major === 2 ? [x, y] : [x, y, 0]);
        const world = RuntimeAccess.call(transform, major === 2 ? "convertToWorldSpaceAR" : "convertToWorldSpaceAR", local);
        const screen = RuntimeAccess.object(RuntimeAccess.call(camera, major === 2 ? "getWorldToScreenPoint" : "worldToScreen", world));
        if (major === 3) return { x: rect.x + Number(screen.x) * rect.width / canvas.width, y: rect.y + rect.height - Number(screen.y) * rect.height / canvas.height };
        const view = RuntimeAccess.object(cc.view), viewport = RuntimeAccess.object(RuntimeAccess.call(view, "getViewportRect"));
        return {
          x: rect.x + (Number(viewport.x) + Number(screen.x) * Number(RuntimeAccess.call(view, "getScaleX"))) * rect.width / canvas.width,
          y: rect.y + rect.height - (Number(viewport.y) + Number(screen.y) * Number(RuntimeAccess.call(view, "getScaleY"))) * rect.height / canvas.height
        };
      });
      if (!points.every((point2) => Number.isFinite(point2.x) && Number.isFinite(point2.y))) throw new CocosError("CONTEXT_UNAVAILABLE", "Camera projection returned invalid coordinates");
      const left = Math.min(...points.map((point2) => point2.x)), right = Math.max(...points.map((point2) => point2.x)), top = Math.min(...points.map((point2) => point2.y)), bottom = Math.max(...points.map((point2) => point2.y));
      const point = { x: (left + right) / 2, y: (top + bottom) / 2 }, inside = right > rect.x && left < rect.right && bottom > rect.y && top < rect.bottom;
      const masks = [];
      let ancestor = node.parent;
      while (ancestor) {
        if (((_b = this.component(ancestor, "cc.Mask")) == null ? void 0 : _b.enabledInHierarchy) !== false && this.component(ancestor, "cc.Mask")) masks.push(RuntimeAccess.uuid(ancestor));
        ancestor = ancestor.parent;
      }
      const nativeHit = major === 3 && typeof transform.hitTest === "function" ? Boolean(RuntimeAccess.call(transform, "hitTest", RuntimeAccess.construct(cc.Vec2, [(point.x - rect.x) * canvas.width / rect.width, canvas.height - (point.y - rect.y) * canvas.height / rect.height]))) : null;
      return {
        point,
        coordinateSpace: "window-css",
        projectedBounds: { left, right, top, bottom },
        cameraId: RuntimeAccess.uuid(camera),
        canvasRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        visible: node.activeInHierarchy !== false && inside && nativeHit !== false,
        clipped: left < rect.x || right > rect.right || top < rect.y || bottom > rect.bottom,
        nativeHitAtCenter: nativeHit,
        maskAncestors: masks,
        maskVisibilityVerified: major === 3 || masks.length === 0
      };
    }
    state(node) {
      var _a;
      const button = this.component(node, "cc.Button"), label = (_a = this.component(node, "cc.Label")) != null ? _a : this.component(node, "cc.RichText");
      let geometry;
      try {
        geometry = this.geometry(node);
      } catch (error) {
        geometry = { visible: null, clipped: null, geometryError: CocosError.from(error).toJSON() };
      }
      return {
        nodeId: RuntimeAccess.uuid(node),
        name: String(node.name),
        active: Boolean(node.activeInHierarchy),
        text: typeof (label == null ? void 0 : label.string) === "string" ? label.string : null,
        interactable: button ? button.enabledInHierarchy !== false && button.interactable === true : null,
        ...geometry
      };
    }
    select(p) {
      const nodes = this.nodes(p, Json.object(p.selector));
      if (nodes.length !== 1) throw new CocosError(nodes.length ? "AMBIGUOUS_TARGET" : "NOT_FOUND", "UI selector must resolve exactly one node", { count: nodes.length, rows: nodes.map((node) => ({ nodeId: RuntimeAccess.uuid(node), name: String(node.name) })) });
      const target = this.state(nodes[0]), point = target.point ? Json.object(target.point) : void 0;
      const candidates = point ? this.scene.all().filter((node) => this.component(node, "cc.Button") || this.component(node, "cc.BlockInputEvents")).flatMap((node) => {
        try {
          const state = this.state(node), bounds = Json.object(state.projectedBounds);
          return state.active && state.visible && Number(point.x) >= Number(bounds.left) && Number(point.x) <= Number(bounds.right) && Number(point.y) >= Number(bounds.top) && Number(point.y) <= Number(bounds.bottom) ? [{ nodeId: RuntimeAccess.uuid(node), name: String(node.name) }] : [];
        } catch (e) {
          return [];
        }
      }) : [];
      return {
        target,
        hitCandidates: candidates,
        uniqueInputCandidate: candidates.length === 1 && candidates[0].nodeId === target.nodeId,
        actualReceiverVerified: false,
        evidence: "public-camera-projected-bounds-and-native-hit-where-available"
      };
    }
    check(p) {
      const rows = p.rows.map((check) => {
        const matches = this.nodes(p, Json.object(check.selector)), state = matches.length === 1 ? this.state(matches[0]) : null;
        const results = Object.entries(check).filter(([key]) => !["selector", "optional"].includes(key)).map(([key, expected]) => {
          var _a;
          const actual = key === "exists" ? matches.length > 0 : key === "count" ? matches.length : (_a = state == null ? void 0 : state[key]) != null ? _a : null;
          const status = check.optional === true && matches.length === 0 ? "skipped" : actual === null ? "unknown" : Json.canonical(actual) === Json.canonical(expected) ? "passed" : "failed";
          return { check: key, expected, actual, status };
        });
        return { selector: check.selector, count: matches.length, target: state, rows: results, passed: results.every((row) => ["passed", "skipped"].includes(row.status)) };
      });
      return { rows, passed: rows.every((row) => row.passed), actualReceiverVerified: false };
    }
  };

  // packages/runtime3-bridge/src/index.ts
  var RuntimeController = class {
    constructor(environment, eventCapacity = 1e3, policy = new RuntimePolicy()) {
      __publicField(this, "environment", environment);
      __publicField(this, "eventCapacity", eventCapacity);
      __publicField(this, "policy", policy);
      __publicField(this, "inspector");
      __publicField(this, "handles", /* @__PURE__ */ new Map());
      __publicField(this, "subscriptions", /* @__PURE__ */ new Map());
      __publicField(this, "events", []);
      __publicField(this, "generation", 0);
      __publicField(this, "nextHandle", 0);
      __publicField(this, "nextEvent", 0);
      __publicField(this, "scene");
      __publicField(this, "cleanupErrors", []);
      __publicField(this, "creator2Materials");
      __publicField(this, "materials");
      __publicField(this, "shaderPreview");
      __publicField(this, "assets");
      __publicField(this, "frames");
      __publicField(this, "debug");
      __publicField(this, "featureRoutes");
      __publicField(this, "tasks");
      __publicField(this, "view");
      __publicField(this, "lastCapture");
      __publicField(this, "sceneListenerActive", true);
      __publicField(this, "sceneChanged", () => {
        if (this.sceneListenerActive) this.synchronize();
      });
      __publicField(this, "sceneEvent");
      this.inspector = new SceneInspector(environment);
      this.tasks = new RuntimeTaskSessions(environment.cc);
      this.view = new RuntimeViewSession(environment.cc);
      this.creator2Materials = new Creator2Material(this.inspector);
      this.materials = new MaterialController(environment);
      this.shaderPreview = new ShaderPreview(environment, this.materials);
      this.assets = new RuntimeAssets(environment.cc);
      this.frames = new FrameSession(environment.cc);
      this.debug = new DebugOverlayController(this.inspector);
      this.featureRoutes = new RuntimeFeatureRoutes(this.inspector, this.frames, this.debug);
      const director = RuntimeAccess.object(environment.cc.director);
      const event = environment.cc.Director && RuntimeAccess.object(environment.cc.Director).EVENT_AFTER_SCENE_LAUNCH;
      if (typeof event === "string" && typeof director.on === "function" && typeof director.off === "function") {
        this.sceneEvent = event;
        RuntimeAccess.call(director, "on", event, this.sceneChanged);
      }
    }
    synchronize() {
      const current = RuntimeAccess.call(this.environment.cc.director, "getScene");
      if (current !== this.scene) {
        this.clearSession();
        this.scene = current;
      }
    }
    handle(value, owned = false) {
      for (const [id2, entry] of this.handles) if (entry.value === value) return { handle: id2, type: this.inspector.type(value) };
      const id = `${this.generation}:${++this.nextHandle}`;
      this.handles.set(id, { value, owned, generation: this.generation });
      return { handle: id, type: this.inspector.type(value) };
    }
    encode(value) {
      if (value === null || value === void 0) return null;
      if (typeof value === "string" || typeof value === "boolean") return value;
      if (typeof value === "number") return Number.isFinite(value) ? value : String(value);
      if (Array.isArray(value)) return value.map((entry) => this.encode(entry));
      if (typeof value === "object" || typeof value === "function") return this.handle(value);
      return String(value);
    }
    decode(value) {
      var _a;
      if (Array.isArray(value)) return value.map((entry) => this.decode(entry));
      if (value && typeof value === "object") {
        if (typeof value.$handle === "string") return this.target(value.$handle);
        if (typeof value.$node === "string") return this.inspector.node(value.$node);
        if (typeof value.$component === "string") return this.inspector.component(value.$component);
        if (typeof value.$type === "string") return RuntimeAccess.construct(this.type(value.$type), ((_a = value.args) != null ? _a : []).map((entry) => this.decode(entry)));
        const result = /* @__PURE__ */ Object.create(null);
        for (const [key, entry] of Object.entries(value)) {
          Json.safePath(key);
          result[key] = this.decode(entry);
        }
        return result;
      }
      return value;
    }
    type(name) {
      const path = name.startsWith("cc.") ? name.slice(3) : name;
      this.policy.path(path);
      try {
        const type = RuntimeAccess.get(this.environment.cc, path);
        if (type !== void 0) return type;
      } catch (error) {
        if (!(error instanceof CocosError) || error.code !== "NOT_FOUND") throw error;
      }
      return RuntimeAccess.call(this.environment.cc.js, "getClassByName", name);
    }
    target(id = "scene") {
      if (id === "scene") return this.inspector.current();
      if (id === "cc") return this.environment.cc;
      if (id.startsWith("node:")) return this.inspector.node(id.slice(5));
      if (id.startsWith("component:")) return this.inspector.component(id.slice(10));
      if (id.startsWith("cc.")) return this.type(id);
      const handle = this.handles.get(id);
      if (!handle || handle.generation !== this.generation) throw new CocosError("STALE_HANDLE", "Handle expired or belongs to another runtime");
      const value = handle.value;
      if (value && typeof value === "object" && RuntimeAccess.object(value).isValid === false) throw new CocosError("STALE_HANDLE", "Referenced engine object was destroyed");
      return value;
    }
    publicPath(path) {
      return this.policy.path(path);
    }
    async execute(id, p) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      if (this.environment.major === 2 && !Creator2Support.runtime.includes(id)) throw new CocosError("UNSUPPORTED_CAPABILITY", `Creator 2 runtime does not implement ${id}`);
      if (this.environment.major === 2 && ["runtime.physics2d.contact_trace_start", "runtime.spine.trace_start", "runtime.dragonbones.trace_start", "runtime.tween.plan", "runtime.tween.start", "runtime.collision2d.trace_start", "runtime.task.poll", "runtime.task.stop"].includes(id)) {
        if (RuntimeAccess.engineVersion(this.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Runtime task adapter requires Creator 2.4.15");
        this.synchronize();
        if (id === "runtime.physics2d.contact_trace_start") return this.tasks.start((frames, progress) => new Creator2PhysicsContact(this.inspector).trace(p, frames, progress));
        if (id === "runtime.spine.trace_start") return this.tasks.start((frames, progress) => new Creator2SpineEvents(this.inspector).trace(p, frames, progress));
        if (id === "runtime.dragonbones.trace_start") return this.tasks.start((frames, progress) => new Creator2DragonBonesEvents(this.inspector).trace(p, frames, progress));
        if (id === "runtime.tween.plan") return new Creator2Tween(this.inspector).plan(p);
        if (id === "runtime.tween.start") return this.tasks.start((frames, progress) => new Creator2Tween(this.inspector).run(p, frames, progress));
        if (id === "runtime.task.poll") return this.tasks.poll(p);
        if (id === "runtime.task.stop") return this.tasks.stop(p);
        return this.tasks.start((frames, progress) => new Creator2Collision(this.inspector).trace(p, frames, progress));
      }
      if (this.environment.major === 2 && id === "runtime.collision2d.trace") {
        if (RuntimeAccess.engineVersion(this.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Collision trace requires Creator 2.4.15");
        this.synchronize();
        return new Creator2Collision(this.inspector).trace(p, this.frames);
      }
      if (this.environment.major === 2 && id.startsWith("runtime.tilemap.")) {
        if (RuntimeAccess.engineVersion(this.environment.cc) !== "2.4.15") throw new CocosError("UNSUPPORTED_VERSION", "Tilemap adapter requires Creator 2.4.15");
        this.synchronize();
        return new TwoDControl(this.inspector, this.frames).tilemap(id, p);
      }
      if (this.environment.major === 2 && id === "runtime.shader.profile") {
        this.synchronize();
        return new Creator2Features(this.inspector).profile(p, this.frames);
      }
      if (this.environment.major === 2 && id.startsWith("runtime.material.")) {
        this.synchronize();
        return this.creator2Materials.execute(id, p);
      }
      if (this.environment.major === 2 && Creator2Features.ids.includes(id)) {
        this.synchronize();
        return new Creator2Features(this.inspector).execute(id, p);
      }
      if (FeatureSupport.owns(id) && RuntimeAccess.engineVersion(this.environment.cc) !== "3.8.8") return FeatureSupport.unsupported(id, "\u5F53\u524D\u9002\u914D\u4EC5\u652F\u6301 Creator 3.8.8", { actualVersion: RuntimeAccess.engineVersion(this.environment.cc) });
      this.synchronize();
      if (p.expectedGeneration !== void 0 && p.expectedGeneration !== this.generation) throw new CocosError("STALE_HANDLE", "Runtime scene generation changed", { generation: this.generation });
      if (p.expectedSceneId !== void 0 && p.expectedSceneId !== this.inspector.sceneInfo().sceneId) throw new CocosError("VERIFICATION_FAILED", "Runtime scene differs from expected scene");
      if (id === "runtime.ui.select" || id === "runtime.ui.check") {
        const selector = new RuntimeUiSelector(this.inspector);
        return { ...id.endsWith("select") ? selector.select(p) : selector.check(p), sceneId: this.inspector.sceneInfo().sceneId, sceneGeneration: this.generation };
      }
      if (id === "runtime.view.inspect") return this.view.inspect();
      if (id === "runtime.view.configure") return this.view.configure(p);
      if (id === "runtime.view.restore") return this.view.restore(p);
      if (id === "runtime.lifecycle.snapshot") {
        const nodes = this.inspector.all(), cache = this.environment.cc.assetManager && RuntimeAccess.object(this.environment.cc.assetManager).assets;
        let assetCount = null;
        if (cache && typeof RuntimeAccess.object(cache).forEach === "function") {
          assetCount = 0;
          RuntimeAccess.call(cache, "forEach", () => {
            assetCount++;
          });
        }
        const director = RuntimeAccess.object(this.environment.cc.director);
        return {
          sceneId: this.inspector.sceneInfo().sceneId,
          sceneGeneration: this.generation,
          handles: this.handles.size,
          subscriptions: this.subscriptions.size,
          sceneListeners: this.sceneEvent ? 1 : 0,
          eventRows: this.events.length,
          cleanupErrors: this.cleanupErrors,
          nodeCount: nodes.length,
          componentCount: nodes.reduce((sum, node) => sum + this.inspector.components(node).length, 0),
          assetCount,
          frameIndex: typeof director.getTotalFrames === "function" ? Number(RuntimeAccess.call(director, "getTotalFrames")) : null,
          ...this.frames.snapshot(),
          ...this.tasks.snapshot(),
          ...this.assets.snapshot(),
          ...this.view.snapshot()
        };
      }
      if (id === "runtime.scene.load") {
        const director = RuntimeAccess.object(this.environment.cc.director), uuid = Json.string(p.sceneUuid, "sceneUuid");
        await new Promise((resolve, reject) => {
          let settled = false;
          const timer = setTimeout(() => {
            settled = true;
            reject(new CocosError("OUTCOME_UNKNOWN", "Native scene load deadline exceeded; it may still finish"));
          }, 15e3);
          try {
            const manager = RuntimeAccess.object(this.environment.cc.assetManager);
            RuntimeAccess.call(manager, "loadAny", { uuid, type: this.environment.cc.SceneAsset }, (error, scene) => {
              if (settled) return;
              if (error) {
                settled = true;
                clearTimeout(timer);
                reject(CocosError.from(error));
                return;
              }
              try {
                RuntimeAccess.call(director, "runSceneImmediate", scene, void 0, (failure) => {
                  if (settled) return;
                  settled = true;
                  clearTimeout(timer);
                  if (failure) reject(CocosError.from(failure));
                  else resolve();
                });
              } catch (failure) {
                settled = true;
                clearTimeout(timer);
                reject(failure);
              }
            });
          } catch (error) {
            if (!settled) {
              settled = true;
              clearTimeout(timer);
              reject(error);
            }
          }
        });
        this.synchronize();
        return { loaded: true, scene: this.inspector.sceneInfo(), sceneGeneration: this.generation };
      }
      if (this.featureRoutes.owns(id)) return this.featureRoutes.execute(id, p);
      if (id.startsWith("runtime.asset.") || id === "runtime.bundle.inspect") {
        if (!(this.environment.major === 3 && RuntimeAccess.engineVersion(this.environment.cc) === "3.8.8" || this.environment.major === 2 && RuntimeAccess.engineVersion(this.environment.cc) === "2.4.15")) throw new CocosError("UNSUPPORTED_VERSION", "Runtime asset tools require Creator 2.4.15 or 3.8.8");
        return this.assets.execute(id, p);
      }
      if (id.startsWith("runtime.material.") || id === "runtime.shader.variants.compile") return this.materials.execute(id, p);
      if (id.startsWith("runtime.shader.")) return this.shaderPreview.execute(id, p);
      const str = (key) => Json.string(p[key], key);
      switch (id) {
        case "runtime.query":
          return { context: "runtime", scene: this.inspector.sceneInfo(), engineVersion: RuntimeAccess.engineVersion(this.environment.cc), generation: this.generation, sceneGeneration: this.generation, cleanupErrors: this.cleanupErrors, componentIdentity: this.environment.major === 2 ? "runtime-local-read-hierarchy-after-connect" : "scene-component-id" };
        case "runtime.hierarchy":
          return { ...Json.object(this.inspector.hierarchy(p)), context: "runtime", sceneGeneration: this.generation };
        case "runtime.types":
          return { rows: RuntimeAccess.propertyNames(this.environment.cc).map((name) => {
            const descriptor = RuntimeAccess.descriptor(this.environment.cc, name);
            return { name, kind: (descriptor == null ? void 0 : descriptor.get) ? "accessor" : typeof (descriptor == null ? void 0 : descriptor.value) };
          }) };
        case "runtime.inspect": {
          const target = this.target(String((_a = p.target) != null ? _a : "scene"));
          return { type: this.inspector.type(target), rows: RuntimeAccess.propertyNames(target).map((name) => {
            const descriptor = RuntimeAccess.descriptor(target, name);
            return { name, kind: (descriptor == null ? void 0 : descriptor.get) ? "accessor" : typeof (descriptor == null ? void 0 : descriptor.value), writable: Boolean((descriptor == null ? void 0 : descriptor.set) || (descriptor == null ? void 0 : descriptor.writable)) };
          }) };
        }
        case "runtime.get":
          this.publicPath(str("path"));
          return { value: this.encode(RuntimeAccess.get(this.target(String((_b = p.target) != null ? _b : "scene")), str("path"))) };
        case "runtime.set": {
          const path = this.publicPath(str("path"));
          const key = path.pop();
          const root = this.target(String((_c = p.target) != null ? _c : "scene"));
          const owner = RuntimeAccess.object(path.length ? RuntimeAccess.get(root, path.join(".")) : root);
          const descriptor = RuntimeAccess.descriptor(owner, key);
          if (!descriptor || !descriptor.set && !descriptor.writable) throw new CocosError("INVALID_ARGUMENT", "Property does not exist or is read-only");
          owner[key] = this.decode((_d = p.value) != null ? _d : null);
          return { value: this.encode(owner[key]) };
        }
        case "runtime.invoke": {
          const method = str("method");
          this.policy.method(method);
          const args = ((_e = p.args) != null ? _e : []).map((entry) => this.decode(entry));
          this.policy.arguments(args);
          const result = await RuntimeAccess.call(this.target(String((_f = p.target) != null ? _f : "scene")), method, ...args);
          return { value: this.encode(result) };
        }
        case "runtime.create": {
          const args = ((_g = p.args) != null ? _g : []).map((entry) => this.decode(entry));
          this.policy.arguments(args);
          return { object: this.handle(RuntimeAccess.construct(this.type(str("type")), args), true) };
        }
        case "runtime.release": {
          const id2 = str("target");
          const entry = this.handles.get(id2);
          if (!entry) throw new CocosError("STALE_HANDLE", "Handle is unavailable");
          if (p.destroy === true) {
            if (!entry.owned) throw new CocosError("UNAUTHORIZED", "Cannot destroy an engine-owned object via handle release");
            RuntimeAccess.call(entry.value, "destroy");
          }
          this.handles.delete(id2);
          return { released: id2 };
        }
        case "runtime.subscribe": {
          const owner = RuntimeAccess.object(this.target(String((_h = p.target) != null ? _h : "scene")));
          const event = str("event");
          if (this.subscriptions.size >= 128) throw new CocosError("RESOURCE_BUSY", "At most 128 active or pending-cleanup subscriptions are allowed");
          const subscriptionId = `${this.generation}:event:${++this.nextHandle}`, generation = this.generation;
          let listening = false;
          const callback = (...args) => {
            if (!listening || generation !== this.generation) return;
            this.events.push({ sequence: ++this.nextEvent, subscriptionId, event, occurredAt: (/* @__PURE__ */ new Date()).toISOString(), args: args.map((value) => RuntimeAccess.safeData(value)) });
            if (this.events.length > this.eventCapacity) this.events.splice(0, this.events.length - this.eventCapacity);
          };
          this.subscriptions.set(subscriptionId, { owner, event, callback });
          try {
            RuntimeAccess.call(owner, "on", event, callback);
            listening = true;
          } catch (error) {
            try {
              RuntimeAccess.call(owner, "off", event, callback);
              this.subscriptions.delete(subscriptionId);
            } catch (e) {
            }
            throw new CocosError("OUTCOME_UNKNOWN", "Subscription registration failed; inspect cleanup before retrying", { subscriptionId, cause: CocosError.from(error).message });
          }
          return { subscriptionId };
        }
        case "runtime.unsubscribe": {
          const id2 = str("subscriptionId");
          const subscription = this.subscriptions.get(id2);
          if (!subscription) throw new CocosError("NOT_FOUND", "Subscription does not exist");
          RuntimeAccess.call(subscription.owner, "off", subscription.event, subscription.callback);
          this.subscriptions.delete(id2);
          return { unsubscribed: id2 };
        }
        case "runtime.events": {
          const cursor = Number((_i = p.cursor) != null ? _i : 0);
          const rows = this.events.filter((event) => Number(event.sequence) > cursor).slice(0, Number((_j = p.limit) != null ? _j : 100));
          return {
            rows,
            nextCursor: rows.length ? rows[rows.length - 1].sequence : cursor,
            droppedBefore: this.events.length ? Number(this.events[0].sequence) - 1 : 0
          };
        }
        case "runtime.pause":
          RuntimeAccess.call(this.environment.cc.game, "pause");
          return { paused: true };
        case "runtime.resume":
          RuntimeAccess.call(this.environment.cc.game, "resume");
          return { paused: false };
        case "runtime.capture": {
          const game = RuntimeAccess.object(this.environment.cc.game);
          const canvas = game.canvas;
          if (!canvas) throw new CocosError("UNSUPPORTED_CAPABILITY", "Canvas capture is unavailable on this platform");
          if (p.frameMode === "lastFrame") {
            if (!this.lastCapture) throw new CocosError("CONTEXT_UNAVAILABLE", "No captured frame exists in this scene generation");
            return { ...this.lastCapture, stale: true, imageDelivery: (_k = p.imageDelivery) != null ? _k : "image" };
          }
          const generation = this.generation;
          let capture;
          await this.frames.wait(this.frames.token(), () => {
            var _a2;
            if (generation !== this.generation) throw new CocosError("STALE_HANDLE", "Runtime changed while capturing");
            const director = RuntimeAccess.object(this.environment.cc.director), dimensions = RuntimeAccess.object(canvas);
            capture = {
              dataUrl: String(RuntimeAccess.call(canvas, "toDataURL", "image/png")),
              source: "game-canvas-after-draw",
              imageDelivery: (_a2 = p.imageDelivery) != null ? _a2 : "image",
              sceneId: this.inspector.sceneInfo().sceneId,
              sceneGeneration: generation,
              capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
              stale: false,
              width: Number(dimensions.width) || null,
              height: Number(dimensions.height) || null,
              frameIndex: typeof director.getTotalFrames === "function" ? Number(RuntimeAccess.call(director, "getTotalFrames")) : null,
              layoutVerified: false,
              pixelDiagnostic: { status: "unknown", reason: "Canvas pixels not sampled; compositor capture is preferred for WebGL" }
            };
          });
          this.lastCapture = capture;
          return capture;
        }
        case "runtime.statistics": {
          const rows = this.inspector.all();
          const director = RuntimeAccess.object(this.environment.cc.director);
          return {
            nodeCount: rows.length,
            componentCount: rows.reduce((sum, node) => sum + this.inspector.components(node).length, 0),
            deltaTime: typeof director.getDeltaTime === "function" ? Number(RuntimeAccess.call(director, "getDeltaTime")) : null,
            totalFrames: typeof director.getTotalFrames === "function" ? Number(RuntimeAccess.call(director, "getTotalFrames")) : null,
            drawCalls: this.environment.major === 2 && this.environment.cc.renderer ? RuntimeAccess.safeData(RuntimeAccess.object(this.environment.cc.renderer).drawCalls) : null,
            unavailableMetrics: this.environment.major === 2 ? ["gpu-memory", "triangles"] : ["gpu-memory", "draw-calls", "triangles"]
          };
        }
        default:
          throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown runtime capability: ${id}`);
      }
    }
    clearSubscriptions() {
      const failed = [];
      for (const [id, subscription] of this.subscriptions) {
        try {
          RuntimeAccess.call(subscription.owner, "off", subscription.event, subscription.callback);
          this.subscriptions.delete(id);
        } catch (e) {
          failed.push(id);
        }
      }
      if (failed.length) throw new CocosError("OUTCOME_UNKNOWN", "Some native listeners could not be removed; callbacks are invalidated and cleanup can be retried", { subscriptionIds: failed });
    }
    clearSession() {
      this.view.dispose();
      this.generation++;
      this.tasks.dispose();
      const cleanup = [["creator2-materials", () => this.creator2Materials.dispose()], ["frames", () => this.frames.dispose()], ["debug", () => this.debug.dispose()], ["assets", () => this.assets.dispose()], ["shader-preview", () => this.shaderPreview.dispose()], ["materials", () => this.materials.dispose()], ["subscriptions", () => this.clearSubscriptions()]];
      const failures = [];
      for (const [scope, action] of cleanup) {
        try {
          action();
        } catch (error) {
          failures.push({ scope, message: CocosError.from(error).message });
        }
      }
      if (failures.length) this.cleanupErrors = [...this.cleanupErrors, ...failures].slice(-20);
      this.handles.clear();
      this.events.length = 0;
      this.lastCapture = void 0;
    }
    connectionLost() {
      this.clearSession();
    }
    dispose() {
      this.sceneListenerActive = false;
      if (this.sceneEvent) {
        try {
          RuntimeAccess.call(this.environment.cc.director, "off", this.sceneEvent, this.sceneChanged);
          this.sceneEvent = void 0;
        } catch (e) {
          this.cleanupErrors = [...this.cleanupErrors, { scope: "scene-listener", message: "Scene listener cleanup failed; callback is inactive and dispose may retry" }].slice(-20);
        }
      }
      this.clearSession();
    }
  };

  // packages/runtime3-bridge/src/bootstrap.ts
  var DevelopmentConnection = class {
    constructor(options) {
      __publicField(this, "options", options);
      __publicField(this, "active", false);
      __publicField(this, "runtimeInstanceId", "");
      __publicField(this, "controller");
      if (!options.development) throw new CocosError("UNAUTHORIZED", "Runtime bridge must only be enabled in a development build");
      if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/?$/.test(options.url)) throw new CocosError("INVALID_ARGUMENT", "Default runtime bridge requires a loopback URL");
      this.controller = new RuntimeController({ cc: options.cc, major: options.major });
    }
    get instanceId() {
      return this.runtimeInstanceId;
    }
    get sourceFingerprint() {
      return true ? "03a666a13dfd2d0772203fbc7426c9219ea9655079d5bfebfb021abcd29cbfda" : null;
    }
    request(path, body) {
      return new Promise((accept, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", `${this.options.url.replace(/\/$/, "")}${path}`, true);
        request.timeout = 15e3;
        request.setRequestHeader("content-type", "application/json");
        request.setRequestHeader("authorization", `Bearer ${this.options.token}`);
        request.onload = () => {
          try {
            const result = JSON.parse(request.responseText);
            if (request.status < 200 || request.status >= 300) reject(new Error(`Gateway ${request.status}: ${request.responseText}`));
            else accept(result);
          } catch (error) {
            reject(error);
          }
        };
        request.onerror = () => reject(new Error("Runtime gateway connection failed"));
        request.ontimeout = () => reject(new Error("Runtime gateway request timed out"));
        request.send(JSON.stringify({ ...body, projectId: this.options.projectId }));
      });
    }
    async start() {
      if (this.active) return;
      const registered = await this.request("/runtime/register", { version: RuntimeAccess.engineVersion(this.options.cc), platform: "development-runtime" });
      this.runtimeInstanceId = String(registered.runtimeInstanceId);
      this.active = true;
      void this.poll();
    }
    async poll() {
      while (this.active) {
        try {
          const response = await this.request("/runtime/poll", { runtimeInstanceId: this.runtimeInstanceId });
          if (!this.active) break;
          const command = response.command;
          if (!command) continue;
          let result = null;
          let error = null;
          try {
            result = await this.controller.execute(String(command.capabilityId), command.params);
          } catch (failure) {
            error = JSON.parse(JSON.stringify(CocosError.from(failure, "RUNTIME_ERROR").toJSON()));
          }
          await this.request("/runtime/reply", { runtimeInstanceId: this.runtimeInstanceId, commandId: command.id, result, error });
        } catch (error) {
          this.controller.connectionLost();
          if (this.active) {
            console.warn("[CocosMCP runtime]", error);
            await new Promise((accept) => setTimeout(accept, 2e3));
          }
        }
      }
    }
    async stop() {
      this.active = false;
      this.controller.dispose();
      if (this.runtimeInstanceId) await this.request("/runtime/disconnect", { runtimeInstanceId: this.runtimeInstanceId });
    }
  };
  var CocosMCP = class {
    static async connect(options) {
      const connection = new DevelopmentConnection(options);
      await connection.start();
      return connection;
    }
  };
  return __toCommonJS(bootstrap_exports);
})();

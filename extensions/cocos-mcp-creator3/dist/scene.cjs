"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// <define:__COCOS_VERIFICATION_EVIDENCE__>
var init_define_COCOS_VERIFICATION_EVIDENCE = __esm({
  "<define:__COCOS_VERIFICATION_EVIDENCE__>"() {
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.regexpCode = exports2.getEsmExportName = exports2.getProperty = exports2.safeStringify = exports2.stringify = exports2.strConcat = exports2.addCodeArg = exports2.str = exports2._ = exports2.nil = exports2._Code = exports2.Name = exports2.IDENTIFIER = exports2._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports2._CodeOrName = _CodeOrName;
    exports2.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports2.IDENTIFIER.test(s))
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
    exports2.Name = Name;
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
    exports2._Code = _Code;
    exports2.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports2._ = _;
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
    exports2.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports2.addCodeArg = addCodeArg;
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
    exports2.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports2.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports2.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports2.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports2.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports2.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports2.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports2.regexpCode = regexpCode;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueScope = exports2.ValueScopeName = exports2.Scope = exports2.varKinds = exports2.UsedValueState = void 0;
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
    })(UsedValueState || (exports2.UsedValueState = UsedValueState = {}));
    exports2.varKinds = {
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
    exports2.Scope = Scope;
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
    exports2.ValueScopeName = ValueScopeName;
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
              const def = this.opts.es5 ? exports2.varKinds.var : exports2.varKinds.const;
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
    exports2.ValueScope = ValueScope;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.or = exports2.and = exports2.not = exports2.CodeGen = exports2.operators = exports2.varKinds = exports2.ValueScopeName = exports2.ValueScope = exports2.Scope = exports2.Name = exports2.regexpCode = exports2.stringify = exports2.getProperty = exports2.nil = exports2.strConcat = exports2.str = exports2._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports2, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports2, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports2, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports2, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports2, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports2, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports2, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports2.operators = {
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
        return this._leafNode(new AssignOp(lhs, exports2.operators.ADD, rhs));
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
    exports2.CodeGen = CodeGen;
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
    exports2.not = not;
    var andCode = mappend(exports2.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports2.and = and;
    var orCode = mappend(exports2.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports2.or = or;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/util.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkStrictMode = exports2.getErrorPath = exports2.Type = exports2.useFunc = exports2.setEvaluated = exports2.evaluatedPropsToName = exports2.mergeEvaluated = exports2.eachItem = exports2.unescapeJsonPointer = exports2.escapeJsonPointer = exports2.escapeFragment = exports2.unescapeFragment = exports2.schemaRefOrVal = exports2.schemaHasRulesButRef = exports2.schemaHasRules = exports2.checkUnknownRules = exports2.alwaysValidSchema = exports2.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports2.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports2.alwaysValidSchema = alwaysValidSchema;
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
    exports2.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports2.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports2.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports2.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports2.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports2.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports2.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports2.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports2.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports2.mergeEvaluated = {
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
    exports2.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports2.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports2.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports2.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports2.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports2.checkStrictMode = checkStrictMode;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/names.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = names;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.extendErrors = exports2.resetErrorsCount = exports2.reportExtraError = exports2.reportError = exports2.keyword$DataError = exports2.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports2.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports2.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports2.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports2.reportError = reportError;
    function reportExtraError(cxt, error = exports2.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports2.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports2.resetErrorsCount = resetErrorsCount;
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
    exports2.extendErrors = extendErrors;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.boolOrEmptySchema = exports2.topBoolOrEmptySchema = void 0;
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
    exports2.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports2.boolOrEmptySchema = boolOrEmptySchema;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/rules.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRules = exports2.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports2.isJSONType = isJSONType;
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
    exports2.getRules = getRules;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shouldUseRule = exports2.shouldUseGroup = exports2.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports2.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports2.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports2.shouldUseRule = shouldUseRule;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reportTypeError = exports2.checkDataTypes = exports2.checkDataType = exports2.coerceAndCheckDataType = exports2.getJSONTypes = exports2.getSchemaTypes = exports2.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports2.DataType = DataType = {}));
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
    exports2.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports2.getJSONTypes = getJSONTypes;
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
    exports2.coerceAndCheckDataType = coerceAndCheckDataType;
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
    exports2.checkDataType = checkDataType;
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
    exports2.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports2.reportTypeError = reportTypeError;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/defaults.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assignDefaults = void 0;
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
    exports2.assignDefaults = assignDefaults;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/code.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateUnion = exports2.validateArray = exports2.usePattern = exports2.callValidateCode = exports2.schemaProperties = exports2.allSchemaProperties = exports2.noPropertyInData = exports2.propertyInData = exports2.isOwnProperty = exports2.hasPropFunc = exports2.reportMissingProp = exports2.checkMissingProp = exports2.checkReportMissingProp = void 0;
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
    exports2.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports2.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports2.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports2.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports2.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports2.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports2.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports2.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports2.schemaProperties = schemaProperties;
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
    exports2.callValidateCode = callValidateCode;
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
    exports2.usePattern = usePattern;
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
    exports2.validateArray = validateArray;
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
    exports2.validateUnion = validateUnion;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateKeywordUsage = exports2.validSchemaType = exports2.funcKeywordCode = exports2.macroKeywordCode = void 0;
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
    exports2.macroKeywordCode = macroKeywordCode;
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
    exports2.funcKeywordCode = funcKeywordCode;
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
    exports2.validSchemaType = validSchemaType;
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
    exports2.validateKeywordUsage = validateKeywordUsage;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.extendSubschemaMode = exports2.extendSubschemaData = exports2.getSubschema = void 0;
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
    exports2.getSubschema = getSubschema;
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
    exports2.extendSubschemaData = extendSubschemaData;
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
    exports2.extendSubschemaMode = extendSubschemaMode;
  }
});

// .codex-work/cache/pnpm-virtual-store/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    module2.exports = function equal(a, b) {
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
  ".codex-work/cache/pnpm-virtual-store/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js"(exports2, module2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    var traverse = module2.exports = function(schema, opts, cb) {
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/resolve.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSchemaRefs = exports2.resolveUrl = exports2.normalizeId = exports2._getFullPath = exports2.getFullPath = exports2.inlineRef = void 0;
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
    exports2.inlineRef = inlineRef;
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
    exports2.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports2._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports2.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports2.resolveUrl = resolveUrl;
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
    exports2.getSchemaRefs = getSchemaRefs;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getData = exports2.KeywordCxt = exports2.validateFunctionCode = void 0;
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
    exports2.validateFunctionCode = validateFunctionCode;
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
    exports2.KeywordCxt = KeywordCxt;
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
    exports2.getData = getData;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports2.default = ValidationError;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports2.default = MissingRefError;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/compile/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveSchema = exports2.getCompilingSchema = exports2.resolveRef = exports2.compileSchema = exports2.SchemaEnv = void 0;
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
    exports2.SchemaEnv = SchemaEnv;
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
    exports2.compileSchema = compileSchema;
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
    exports2.resolveRef = resolveRef;
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
    exports2.getCompilingSchema = getCompilingSchema;
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
    exports2.resolveSchema = resolveSchema;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/data.json"(exports2, module2) {
    module2.exports = {
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
  ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/utils.js"(exports2, module2) {
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
    module2.exports = {
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
  ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/lib/schemes.js"(exports2, module2) {
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
    module2.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// .codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/fast-uri@3.1.7/node_modules/fast-uri/index.js"(exports2, module2) {
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
      const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !new RegExp("\\P{ASCII}", "u").test(resolvedHost);
      if (resolved.error && !encodedASCIIHost) {
        throw new Error(resolved.error);
      }
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative2, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative2 = parse(serialize(relative2, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative2.scheme) {
        target.scheme = relative2.scheme;
        target.userinfo = relative2.userinfo;
        target.host = relative2.host;
        target.port = relative2.port;
        target.path = removeDotSegments(relative2.path || "");
        target.query = relative2.query;
      } else {
        if (relative2.userinfo !== void 0 || relative2.host !== void 0 || relative2.port !== void 0) {
          target.userinfo = relative2.userinfo;
          target.host = relative2.host;
          target.port = relative2.port;
          target.path = removeDotSegments(relative2.path || "");
          target.query = relative2.query;
        } else {
          if (!relative2.path) {
            target.path = base.path;
            if (relative2.query !== void 0) {
              target.query = relative2.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative2.path[0] === "/") {
              target.path = removeDotSegments(relative2.path);
            } else {
              if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                target.path = "/" + relative2.path;
              } else if (!base.path) {
                target.path = relative2.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative2.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative2.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative2.fragment;
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
      } catch {
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
    module2.exports = fastUri;
    module2.exports.default = fastUri;
    module2.exports.fastUri = fastUri;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports2.default = uri;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/core.js
var require_core = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/core.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports2, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
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
    var Ajv5 = class {
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
    Ajv5.ValidationError = validation_error_1.default;
    Ajv5.MissingRefError = ref_error_1.default;
    exports2.default = Ajv5;
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/id.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.callRef = exports2.getValidate = void 0;
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
    exports2.getValidate = getValidate;
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
    exports2.callRef = callRef;
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = core;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports2.default = equal;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = validation;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateAdditionalItems = void 0;
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
    exports2.validateAdditionalItems = validateAdditionalItems;
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateTuple = void 0;
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
    exports2.validateTuple = validateTuple;
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateSchemaDeps = exports2.validatePropertyDeps = exports2.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports2.error = {
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
      error: exports2.error,
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
    exports2.validatePropertyDeps = validatePropertyDeps;
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
    exports2.validateSchemaDeps = validateSchemaDeps;
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = getApplicator;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports2.default = format;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.contentVocabulary = exports2.metadataVocabulary = void 0;
    exports2.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports2.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = draft7Vocabularies;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports2.DiscrError = DiscrError = {}));
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
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
    exports2.default = def;
  }
});

// .codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports2, module2) {
    module2.exports = {
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
  ".codex-work/cache/pnpm-virtual-store/ajv@8.20.0/node_modules/ajv/dist/ajv.js"(exports2, module2) {
    "use strict";
    init_define_COCOS_VERIFICATION_EVIDENCE();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MissingRefError = exports2.ValidationError = exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = exports2.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv5 = class extends core_1.default {
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
    exports2.Ajv = Ajv5;
    module2.exports = exports2 = Ajv5;
    module2.exports.Ajv = Ajv5;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = Ajv5;
    var validate_1 = require_validate();
    Object.defineProperty(exports2, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports2, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports2, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// extensions/creator3/src/scene.ts
var scene_exports = {};
__export(scene_exports, {
  load: () => load,
  methods: () => methods,
  unload: () => unload
});
module.exports = __toCommonJS(scene_exports);
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_path2 = require("path");

// packages/runtime3-bridge/src/path.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/contracts/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
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
var RuntimeAccess = class _RuntimeAccess {
  /** System.import('cc') 使用公开 VERSION；ENGINE_VERSION 仅存在于旧版全局对象。 */
  static engineVersion(cc) {
    var _a, _b;
    return String((_b = (_a = cc.VERSION) != null ? _a : cc.ENGINE_VERSION) != null ? _b : "unknown");
  }
  static released = /* @__PURE__ */ new WeakSet();
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

// packages/runtime3-bridge/src/feature-support.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var FeatureSupport = class {
  static source = "https://github.com/cocos/cocos-engine/tree/411f98df047c25902f93440d4b22925c2fb65461";
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

// packages/runtime3-bridge/src/path.ts
var PathSampler = class {
  constructor(cc) {
    this.cc = cc;
  }
  cc;
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

// packages/runtime3-bridge/src/engine-inspector.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var EngineFeatureInspector = class {
  constructor(inspector, frames) {
    this.inspector = inspector;
    this.frames = frames;
  }
  inspector;
  frames;
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

// packages/runtime3-bridge/src/ik-authoring.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var IkAuthoring = class {
  constructor(inspector, editor) {
    this.inspector = inspector;
    this.editor = editor;
  }
  inspector;
  editor;
  get cc() {
    return this.inspector.environment.cc;
  }
  serializeAsset(asset) {
    if (!this.inspector.environment.serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u7F3A\u5C11\u7F16\u8F91\u5668\u539F\u751F\u5E8F\u5217\u5316");
    const value = this.inspector.environment.serialize(asset);
    return Json.value(typeof value === "string" ? JSON.parse(value) : value);
  }
  target(rootId, path) {
    let node = this.inspector.node(rootId);
    if (!path || path.split("/").some((part) => !part || part === "." || part === "..")) throw new CocosError("INVALID_ARGUMENT", "\u9AA8\u9ABC\u8DEF\u5F84\u5FC5\u987B\u4E3A\u660E\u786E\u7684\u76F8\u5BF9\u8282\u70B9\u8DEF\u5F84");
    for (const part of path.split("/")) {
      const matches = node.children.filter((child) => child.name === part);
      if (matches.length !== 1) throw new CocosError("INVALID_ARGUMENT", `\u9AA8\u9ABC\u8282\u70B9\u4E0D\u5B58\u5728\u6216\u91CD\u540D\uFF1A${path}`);
      node = matches[0];
    }
    return node;
  }
  inspect(p) {
    FeatureSupport.require(this.editor.AnimationGraph, "AnimationGraph editor API");
    const type = RuntimeAccess.call(FeatureSupport.require(this.cc.js, "class registry"), "getClassByName", "cc.animation.PoseNodeTwoBoneIKSolver");
    FeatureSupport.require(type, "PoseNodeTwoBoneIKSolver");
    const rootId = Json.string(p.rootId, "rootId"), end = this.target(rootId, Json.string(p.endEffectorPath, "endEffectorPath"));
    const middle = RuntimeAccess.object(end.parent), root = RuntimeAccess.object(middle.parent), scope = this.inspector.node(rootId);
    if (![middle, root].every((node) => this.inspector.all(scope).includes(node))) throw new CocosError("INVALID_ARGUMENT", "\u53CC\u9AA8\u9ABC\u94FE\u5FC5\u987B\u5B8C\u5168\u4F4D\u4E8E\u76EE\u6807\u6839\u8282\u70B9\u4E2D");
    for (const bone of [root, middle, end]) if (this.inspector.all(scope).filter((node) => node.name === bone.name).length !== 1) throw new CocosError("INVALID_ARGUMENT", "IK \u9AA8\u9ABC\u540D\u79F0\u5728\u63A7\u5236\u5668\u5B50\u6811\u4E2D\u5FC5\u987B\u552F\u4E00");
    const length = (node) => {
      const v = RuntimeAccess.object(node.position);
      return Math.hypot(Number(v.x), Number(v.y), Number(v.z));
    };
    if (length(end) < 1e-6 || length(middle) < 1e-6) throw new CocosError("INVALID_ARGUMENT", "\u4E0D\u80FD\u5BF9\u96F6\u957F\u5EA6\u9AA8\u9ABC\u94FE\u521B\u5EFA IK");
    return { supported: true, rootId, chain: [root, middle, end].map((node) => ({ nodeId: RuntimeAccess.uuid(node), name: String(node.name) })), coordinateSpace: "controller-local", graphCreationSupported: true };
  }
  serialize(p) {
    this.inspect(p);
    const graph = RuntimeAccess.construct(this.editor.AnimationGraph, []);
    try {
      graph.name = Json.string(p.name, "name");
      const layer = RuntimeAccess.object(RuntimeAccess.call(graph, "addLayer"));
      layer.name = "IK";
      const machine = RuntimeAccess.object(layer.stateMachine), state = RuntimeAccess.object(RuntimeAccess.call(machine, "addProceduralPoseState"));
      state.name = "IK";
      const pose = RuntimeAccess.object(state.graph), type = RuntimeAccess.call(this.cc.js, "getClassByName", "cc.animation.PoseNodeTwoBoneIKSolver"), solver = RuntimeAccess.construct(type, []);
      solver.endEffectorBoneName = String(this.target(Json.string(p.rootId, "rootId"), Json.string(p.endEffectorPath, "endEffectorPath")).name);
      const assign = (target, value) => {
        const spec = RuntimeAccess.object(target), position = Json.object(value);
        if (["x", "y", "z"].some((key) => typeof position[key] !== "number" || !Number.isFinite(position[key]) || Math.abs(Number(position[key])) > 1e5)) throw new CocosError("INVALID_ARGUMENT", "IK \u76EE\u6807\u5750\u6807\u65E0\u6548");
        spec.type = 1;
        spec.targetPositionSpace = 1;
        spec.targetPosition = RuntimeAccess.construct(this.cc.Vec3, [position.x, position.y, position.z]);
      };
      assign(solver.endEffectorTarget, p.target);
      if (p.pole) assign(solver.poleTarget, p.pole);
      RuntimeAccess.call(pose, "addNode", solver);
      const op = FeatureSupport.require(this.editor.poseGraphOp, "poseGraphOp");
      FeatureSupport.methods(op, ["connectOutputNode", "getInputBinding", "getInputKeys"]);
      RuntimeAccess.call(op, "connectOutputNode", pose, solver);
      const keys = RuntimeAccess.call(op, "getInputKeys", pose.outputNode);
      const binding = RuntimeAccess.call(op, "getInputBinding", pose, pose.outputNode, keys[0]);
      if (!binding || RuntimeAccess.object(binding).producer !== solver) throw new CocosError("UNSUPPORTED_CAPABILITY", "\u539F\u751F\u59FF\u52BF\u56FE\u8FDE\u7EBF\u672A\u751F\u6548");
      RuntimeAccess.call(machine, "connect", machine.entryState, state);
      if (p.enabledParameter !== void 0) {
        const name = Json.string(p.enabledParameter, "enabledParameter");
        if (!/^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(name)) throw new CocosError("INVALID_ARGUMENT", "IK \u5F00\u5173\u53C2\u6570\u9700\u4E3A 1..64 \u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u6216\u4E0B\u5212\u7EBF\uFF0C\u5E76\u4EE5\u5B57\u6BCD\u5F00\u5934");
        const booleanType = FeatureSupport.type(this.cc, "animation.VariableType.BOOLEAN");
        if (typeof booleanType !== "number") throw new CocosError("UNSUPPORTED_CAPABILITY", "\u7F3A\u5C11\u5E03\u5C14\u52A8\u753B\u53D8\u91CF\u7C7B\u578B");
        const conditionType = RuntimeAccess.call(this.cc.js, "getClassByName", "cc.animation.UnaryCondition");
        FeatureSupport.require(conditionType, "UnaryCondition");
        FeatureSupport.methods(graph, ["addVariable"]);
        FeatureSupport.methods(machine, ["addMotion"]);
        RuntimeAccess.call(graph, "addVariable", name, booleanType, true);
        const rest = RuntimeAccess.object(RuntimeAccess.call(machine, "addMotion"));
        rest.name = "Rest";
        for (const [from, to, operator] of [[state, rest, 1], [rest, state, 0]]) {
          const condition = RuntimeAccess.construct(conditionType, []);
          condition.operator = operator;
          RuntimeAccess.object(condition.operand).variable = name;
          const transition = RuntimeAccess.object(RuntimeAccess.call(machine, "connect", from, to, [condition]));
          transition.duration = 0;
          if ("exitConditionEnabled" in transition) transition.exitConditionEnabled = false;
        }
      }
      return this.serializeAsset(graph);
    } finally {
      RuntimeAccess.destroyOwned(this.cc, graph);
    }
  }
  mask(p) {
    const type = FeatureSupport.require(this.editor.AnimationMask, "AnimationMask"), rootId = Json.string(p.rootId, "rootId");
    if (!Array.isArray(p.joints) || !p.joints.length || p.joints.length > 256) throw new CocosError("INVALID_ARGUMENT", "\u906E\u7F69\u9700 1..256 \u9879");
    const seen = /* @__PURE__ */ new Set(), joints = p.joints.map((value) => {
      const row = Json.object(value), path = Json.string(row.path, "path");
      if (seen.has(path) || typeof row.enabled !== "boolean") throw new CocosError("INVALID_ARGUMENT", "\u906E\u7F69\u8DEF\u5F84\u91CD\u590D\u6216 enabled \u65E0\u6548");
      seen.add(path);
      this.target(rootId, path);
      return { path, enabled: row.enabled };
    });
    const asset = RuntimeAccess.construct(type, []);
    try {
      asset.name = Json.string(p.name, "name");
      for (const joint of joints) RuntimeAccess.call(asset, "addJoint", joint.path, joint.enabled);
      return this.serializeAsset(asset);
    } finally {
      RuntimeAccess.destroyOwned(this.cc, asset);
    }
  }
};

// extensions/creator3/src/scene-response.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var SceneResponse = class {
  static async capture(run) {
    try {
      return await run();
    } catch (error) {
      return { __cocosSceneError: Json.value(CocosError.from(error, "EDITOR_ERROR").toJSON()) };
    }
  }
  static unwrap(value) {
    if (value && typeof value === "object" && "__cocosSceneError" in value) throw CocosError.from(value.__cocosSceneError, "EDITOR_ERROR");
    return value;
  }
};

// packages/runtime3-bridge/src/scene.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

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
var UiDocumentModel = class _UiDocumentModel {
  static ref = Schema.object({ nodeKey: Schema.string() }, ["nodeKey"]);
  static componentRef = (type) => Schema.object({ nodeKey: Schema.string(), componentType: { const: type } }, ["nodeKey", "componentType"]);
  static events = { type: "array", maxItems: 8, items: Schema.object({ componentId: Schema.string(), handler: { type: "string", pattern: "^[a-zA-Z][a-zA-Z0-9]{0,63}$" }, customEventData: { type: "string", maxLength: 1024 } }, ["componentId", "handler"]) };
  static eventProperties = /* @__PURE__ */ new Set(["clickEvents", "checkEvents", "pageEvents", "editingDidBegan", "textChanged", "editingDidEnded", "editingReturn"]);
  static asset = Schema.object({ assetUuid: Schema.string() }, ["assetUuid"]);
  static number = { type: "number", minimum: -1e5, maximum: 1e5 };
  static positive = { type: "number", minimum: 0, maximum: 1e5 };
  static colorChannel = { type: "integer", minimum: 0, maximum: 255 };
  static color = Schema.object({ r: this.colorChannel, g: this.colorChannel, b: this.colorChannel, a: this.colorChannel }, ["r", "g", "b", "a"]);
  static alignment = { type: "integer", enum: [0, 1, 2] };
  static direction = { type: "integer", enum: [0, 1] };
  static widgetOffsets = {
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
  };
  /** Widget 切换对齐及像素/比例单位会换算偏移；依次设置对齐、单位、声明值，避免 JSON 字段顺序改变布局。 */
  static orderedProperties(properties) {
    const priority = (key) => key.startsWith("isAlign") ? 0 : key.startsWith("isAbsolute") ? 1 : 2;
    return Object.fromEntries(Object.entries(properties).sort(([a], [b]) => priority(a) - priority(b)));
  }
  static size = Schema.object({ width: this.positive, height: this.positive }, ["width", "height"]);
  static componentProperties = {
    "cc.SafeArea": {},
    "cc.BlockInputEvents": {},
    "cc.UIOpacity": { opacity: { type: "number", minimum: 0, maximum: 255 } },
    "cc.UITransform": { contentSize: this.size, anchorPoint: Schema.object({ x: { type: "number", minimum: 0, maximum: 1 }, y: { type: "number", minimum: 0, maximum: 1 } }, ["x", "y"]) },
    "cc.Canvas": { alignCanvasWithScreen: Schema.boolean() },
    "cc.Sprite": { color: this.color, spriteFrame: this.asset, sizeMode: { type: "integer", enum: [0, 1, 2] }, type: { type: "integer", enum: [0, 1, 2, 3] } },
    "cc.Label": {
      color: this.color,
      horizontalAlign: this.alignment,
      verticalAlign: this.alignment,
      spacingX: this.number,
      string: { type: "string", maxLength: 1e4 },
      fontSize: this.positive,
      lineHeight: this.positive,
      font: this.asset,
      useSystemFont: Schema.boolean(),
      overflow: { type: "integer", enum: [0, 1, 2, 3] },
      enableWrapText: Schema.boolean()
    },
    "cc.Button": {
      interactable: Schema.boolean(),
      transition: { type: "integer", enum: [0, 1, 2, 3] },
      target: this.ref,
      normalColor: this.color,
      pressedColor: this.color,
      hoverColor: this.color,
      disabledColor: this.color,
      duration: { type: "number", minimum: 0, maximum: 60 },
      zoomScale: this.positive,
      clickEvents: this.events
    },
    "cc.Layout": {
      startAxis: this.direction,
      horizontalDirection: this.direction,
      verticalDirection: this.direction,
      affectedByScale: Schema.boolean(),
      type: { type: "integer", enum: [0, 1, 2, 3] },
      resizeMode: { type: "integer", enum: [0, 1, 2] },
      spacingX: this.number,
      spacingY: this.number,
      paddingLeft: this.positive,
      paddingRight: this.positive,
      paddingTop: this.positive,
      paddingBottom: this.positive,
      cellSize: this.size
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
      top: this.number,
      bottom: this.number,
      left: this.number,
      right: this.number,
      horizontalCenter: this.number,
      verticalCenter: this.number,
      alignMode: { type: "integer", enum: [0, 1, 2] }
    },
    "cc.ScrollView": { content: this.ref, horizontal: Schema.boolean(), vertical: Schema.boolean(), elastic: Schema.boolean(), inertia: Schema.boolean(), brake: { type: "number", minimum: 0, maximum: 1 } },
    "cc.Toggle": { interactable: Schema.boolean(), checkMark: this.componentRef("cc.Sprite"), checkEvents: this.events },
    "cc.EditBox": { string: { type: "string", maxLength: 1e4 }, placeholder: { type: "string", maxLength: 1e3 }, textLabel: this.componentRef("cc.Label"), placeholderLabel: this.componentRef("cc.Label"), backgroundImage: this.asset, maxLength: { type: "integer", minimum: 0, maximum: 1e4 }, tabIndex: { type: "integer", minimum: 0, maximum: 1e3 }, editingDidBegan: this.events, textChanged: this.events, editingDidEnded: this.events, editingReturn: this.events },
    "cc.PageView": { content: this.ref, direction: { type: "integer", enum: [0, 1] }, sizeMode: { type: "integer", enum: [0, 1] }, scrollThreshold: { type: "number", minimum: 0, maximum: 1 }, pageTurningSpeed: { type: "number", minimum: 0, maximum: 60 }, pageEvents: this.events },
    "cc.RichText": { horizontalAlign: this.alignment, string: { type: "string", maxLength: 1e4 }, fontSize: this.positive, lineHeight: this.positive, maxWidth: this.positive, useSystemFont: Schema.boolean(), font: this.asset },
    "cc.Mask": { type: { type: "integer", enum: [0, 1, 2, 3] }, inverted: Schema.boolean() }
  };
  static schema = {
    ...Schema.object({ version: { const: 1 }, root: { $ref: "#/$defs/node" } }, ["version", "root"]),
    $defs: { node: Schema.object({
      key: { type: "string", pattern: "^[a-zA-Z][a-zA-Z0-9_-]{0,63}$" },
      name: { type: "string", minLength: 1, maxLength: 128 },
      position: Schema.object({ x: this.number, y: this.number, z: this.number }, ["x", "y", "z"]),
      components: { type: "array", maxItems: 13, items: { oneOf: Object.entries(this.componentProperties).map(([type, properties]) => Schema.object({ type: { const: type }, properties: Schema.object(properties) }, ["type"])) } },
      children: { type: "array", maxItems: 200, items: { $ref: "#/$defs/node" } }
    }, ["key", "name"]) }
  };
  validate = new import_ajv.Ajv({ strict: false, allErrors: true }).compile(_UiDocumentModel.schema);
  parse(value) {
    var _a, _b, _c, _d;
    let bytes;
    try {
      bytes = JSON.stringify(value);
    } catch {
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

// packages/runtime3-bridge/src/ui.ts
var UiInspector = class {
  constructor(inspector) {
    this.inspector = inspector;
  }
  inspector;
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
      } catch {
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

// packages/runtime3-bridge/src/scene.ts
var SceneInspector = class {
  constructor(environment) {
    this.environment = environment;
  }
  environment;
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
    } catch {
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
var ShaderDiagnostics = class {
  from(error, assetUrl) {
    var _a, _b;
    const message = error instanceof Error ? error.message : String(error);
    const code = (_b = (_a = /\bEFX\d{4}\b/.exec(message)) == null ? void 0 : _a[0]) != null ? _b : null;
    const line = /(?:ERROR:\s*\d+:|\bline\s+)(\d+)/i.exec(message);
    return {
      severity: "error",
      assetUrl,
      code,
      message: message.slice(0, 32768),
      line: line ? Number(line[1]) : null,
      column: null,
      locationAccuracy: line ? "generated" : "unavailable"
    };
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
    this.environment = environment;
    this.inspector = new SceneInspector(environment);
  }
  environment;
  inspector;
  owned = /* @__PURE__ */ new Map();
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

// extensions/creator3/src/shader-host.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto = require("crypto");
var import_fs = require("fs");
var import_path = require("path");
var import_module = require("module");
var import_vm = require("vm");
var CreatorShaderHost = class {
  constructor(appPath, projectPath, version) {
    this.appPath = appPath;
    this.projectPath = projectPath;
    this.version = version;
  }
  appPath;
  projectPath;
  version;
  hash(source) {
    return (0, import_crypto.createHash)("sha256").update(source).digest("hex");
  }
  files(root, extension) {
    const rows = [];
    for (const entry of (0, import_fs.readdirSync)(root, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;
      const path = (0, import_path.join)(root, entry.name);
      if (entry.isDirectory()) rows.push(...this.files(path, extension));
      else if (entry.isFile() && entry.name.endsWith(extension)) rows.push(path);
    }
    return rows;
  }
  engineAssets() {
    return (0, import_path.join)((0, import_path.dirname)(this.appPath), "resources/3d/engine/editor/assets");
  }
  async execute(method, p) {
    if (this.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Native compiler is pinned to Creator 3.8.8");
    if (method === "templates") {
      const root = (0, import_path.join)(this.engineAssets(), "effects");
      const files = this.files(root, ".effect");
      const rows = files.filter((path) => !p.name || (0, import_path.relative)(root, path) === p.name).map((path) => ({
        name: (0, import_path.relative)(root, path),
        editorVersion: this.version,
        sourceHash: this.hash((0, import_fs.readFileSync)(path, "utf8")),
        ...p.name ? { content: (0, import_fs.readFileSync)(path, "utf8") } : {},
        verification: "engine-builtin"
      }));
      if (p.name && !rows.length) throw new CocosError("NOT_FOUND", "Shader template not found");
      return { rows };
    }
    if (method !== "compile") throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown compiler host operation");
    const compilerPath = (0, import_path.join)(this.appPath, "modules/engine-extensions/extensions/engine-extends/static/effect-compiler/shdc-lib.js");
    const factory = (0, import_vm.runInThisContext)(`(function(require,module,exports,__filename,__dirname){${(0, import_fs.readFileSync)(compilerPath, "utf8")}
})`, { filename: compilerPath });
    const compilerModule = { exports: {} };
    factory((0, import_module.createRequire)(compilerPath), compilerModule, compilerModule.exports, compilerPath, (0, import_path.dirname)(compilerPath));
    const compiler = compilerModule.exports;
    const chunks = /* @__PURE__ */ new Map();
    const dependencies = [];
    for (const root of [(0, import_path.join)(this.engineAssets(), "chunks"), (0, import_path.join)(this.projectPath, "assets")]) {
      for (const path of this.files(root, ".chunk")) {
        const name = (0, import_path.relative)(root, path).split(import_path.sep).join("/").replace(/\.chunk$/, "");
        if (chunks.has(name)) throw new CocosError("INVALID_ARGUMENT", `Ambiguous Chunk: ${name}`);
        chunks.set(name, path);
      }
    }
    compiler.options.chunkSearchFn = (names) => {
      var _a;
      const normalized = (_a = names.map((name) => name.replace(/\.chunk$/, "")).find((name) => chunks.has(name))) != null ? _a : names[0];
      const path = chunks.get(normalized);
      if (!path) return { name: normalized };
      const actual = (0, import_fs.realpathSync)(path);
      const roots = [(0, import_fs.realpathSync)(this.engineAssets()), (0, import_fs.realpathSync)(this.projectPath)];
      if (!roots.some((root) => {
        const rel = (0, import_path.relative)(root, actual);
        return !(0, import_path.isAbsolute)(rel) && rel !== ".." && !rel.startsWith(`..${import_path.sep}`);
      })) throw new CocosError("PATH_OUTSIDE_PROJECT", "Chunk escaped allowed roots");
      const content = (0, import_fs.readFileSync)(actual, "utf8");
      dependencies.push({ name: normalized, path: actual, sourceHash: this.hash(content) });
      return { name: normalized, content };
    };
    compiler.options.throwOnWarning = true;
    compiler.options.noSource = false;
    try {
      const compiled = Json.object(Json.value(compiler.buildEffect((0, import_path.basename)(String(p.url), ".effect"), Json.string(p.content, "content"))));
      if (!Array.isArray(compiled.techniques) || !Array.isArray(compiled.shaders)) throw new Error("Compiler returned no techniques or shader programs");
      return {
        status: "passed",
        stage: "creator-compile",
        compiled,
        dependencies,
        rows: [],
        dependencyHash: this.hash(Json.canonical(dependencies)),
        warningPolicy: "warnings-as-errors"
      };
    } catch (error) {
      return { status: "failed", stage: "creator-compile", dependencies, rows: [new ShaderDiagnostics().from(error, String(p.url))], warningPolicy: "warnings-as-errors" };
    }
  }
};

// packages/ui-core/src/reference-audit.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var SerializedReferenceAudit = class {
  inspect(serialized, expectedIds = []) {
    const value = typeof serialized === "string" ? JSON.parse(serialized) : serialized;
    if (!Array.isArray(value)) throw new CocosError("VERIFICATION_FAILED", "Expected native serialized object table");
    const table = value, rows = [], issues = [], events = [];
    let visited = 0;
    if (table.length > 1e5) throw new CocosError("RESOURCE_BUSY", "Serialized reference table exceeds traversal limit");
    const identities = /* @__PURE__ */ new Set();
    for (let index = 0; index < table.length; index++) {
      const record = table[index];
      if (!record || typeof record !== "object" || Array.isArray(record)) {
        issues.push({ code: "INVALID_SERIALIZED_RECORD", index });
        continue;
      }
      const id = record._id;
      if (typeof id === "string" && id) {
        if (identities.has(id)) issues.push({ code: "DUPLICATE_OBJECT_IDENTITY", index, targetId: id });
        identities.add(id);
      } else if (["cc.Node", "cc.Scene"].includes(String(record.__type__)) || "node" in record || "_node" in record) issues.push({ code: "MISSING_OBJECT_IDENTITY", index });
    }
    for (const targetId of expectedIds) if (!targetId || !identities.has(targetId)) issues.push({ code: "SERIALIZED_OBJECT_MISSING", targetId });
    const structural = /* @__PURE__ */ new Set(["_parent", "_children", "_components", "_prefab", "node", "_node"]);
    const walk = (raw, path, owner, ancestors, depth) => {
      var _a;
      if (++visited > 1e5 || depth > 64) throw new CocosError("RESOURCE_BUSY", "Serialized reference audit exceeds traversal limit");
      if (!raw || typeof raw !== "object") return;
      if (Array.isArray(raw)) {
        raw.forEach((entry, index) => walk(entry, `${path}[${index}]`, owner, ancestors, depth + 1));
        return;
      }
      if ("__uuid__" in raw) {
        rows.push({ ...owner, path, kind: "asset", targetId: String(raw.__uuid__), resolved: null });
        return;
      }
      if ("__id__" in raw) {
        const index = raw.__id__;
        if (typeof index !== "number" || !Number.isInteger(index) || index < 0 || !table[index]) {
          issues.push({ ...owner, path, code: "INVALID_OBJECT_REFERENCE", reference: raw });
          return;
        }
        const target = table[index];
        if (typeof target._id === "string" && target._id) {
          rows.push({ ...owner, path, kind: target.__type__ === "cc.Node" || target.__type__ === "cc.Scene" ? "node" : "component", targetId: target._id, targetType: (_a = target.__type__) != null ? _a : null, resolved: true });
          return;
        }
        if (ancestors.has(index)) return;
        const next = new Set(ancestors);
        next.add(index);
        walk(target, path, owner, next, depth + 1);
        return;
      }
      if (raw.__type__ === "cc.ClickEvent") {
        const ref = raw.target && typeof raw.target === "object" && !Array.isArray(raw.target) ? raw.target.__id__ : null;
        const target = typeof ref === "number" ? table[ref] : null;
        events.push({
          ...owner,
          path,
          targetNodeId: typeof (target == null ? void 0 : target._id) === "string" ? target._id : null,
          componentClassId: typeof raw._componentId === "string" ? raw._componentId : "",
          componentName: typeof raw.component === "string" ? raw.component : "",
          handler: typeof raw.handler === "string" ? raw.handler : ""
        });
      }
      for (const [key, entry] of Object.entries(raw)) if (key !== "__type__") walk(entry, `${path}.${key}`, owner, ancestors, depth + 1);
    };
    table.forEach((record, index) => {
      var _a;
      if (typeof (record == null ? void 0 : record._id) !== "string" || !record._id) return;
      const owner = { sourceId: record._id, sourceType: (_a = record.__type__) != null ? _a : null };
      for (const [key, raw] of Object.entries(record)) if (!structural.has(key) && !["_id", "__type__"].includes(key)) walk(raw, key, owner, /* @__PURE__ */ new Set([index]), 0);
    });
    return { rows, issues, events, complete: issues.length === 0, scope: "current-scene-serialized-references", limitations: ["\u8D44\u6E90 UUID \u4EC5\u63D0\u53D6\uFF0C\u5C1A\u672A\u9A8C\u8BC1 AssetDB \u4E2D\u662F\u5426\u5B58\u5728", "\u4E0D\u63A8\u65AD null \u66FE\u7ECF\u6307\u5411\u7684\u5BF9\u8C61\uFF0C\u4E0D\u5206\u6790\u5B57\u7B26\u4E32\u8DEF\u5F84\u53CA\u811A\u672C\u95ED\u5305\u5F15\u7528"] };
  }
  scene(inspector) {
    var _a;
    const serialize = (_a = inspector.environment.serializeReferences) != null ? _a : inspector.environment.serialize;
    if (!serialize) throw new CocosError("CONTEXT_UNAVAILABLE", "Native scene serializer unavailable");
    const expectedIds = [];
    for (const node of inspector.all()) {
      const components = Array.isArray(node._components) ? node._components : inspector.components(node);
      if (expectedIds.length + 1 + components.length > 1e4) throw new CocosError("RESOURCE_BUSY", "Scene reference coverage exceeds object budget");
      expectedIds.push(RuntimeAccess.uuid(node));
      for (const component of components) expectedIds.push(RuntimeAccess.uuid(component));
    }
    const audit = this.inspect(serialize(inspector.current()), expectedIds);
    const rows = audit.rows, issues = audit.issues;
    for (const event of audit.events) {
      let target;
      try {
        if (event.targetNodeId) target = inspector.node(String(event.targetNodeId));
      } catch (error) {
        if (CocosError.from(error).code !== "NOT_FOUND") throw error;
      }
      const problem = (code) => {
        event.valid = false;
        issues.push({ ...event, code });
      };
      if (!target) {
        problem("EVENT_TARGET_MISSING");
        continue;
      }
      const js = inspector.environment.cc.js;
      const type = event.componentClassId ? RuntimeAccess.call(js, "_getClassById", event.componentClassId) : RuntimeAccess.call(js, "getClassByName", event.componentName);
      if (!type) {
        problem("EVENT_COMPONENT_TYPE_MISSING");
        continue;
      }
      const candidates = RuntimeAccess.call(target, "getComponents", type);
      for (const component of candidates) rows.push({ sourceId: event.sourceId, sourceType: event.sourceType, path: event.path, kind: "event-component", targetId: RuntimeAccess.uuid(component), targetType: inspector.type(component), handler: event.handler, resolved: true });
      if (!candidates.length) {
        problem("EVENT_COMPONENT_MISSING");
        continue;
      }
      if (candidates.length > 1) {
        problem("EVENT_COMPONENT_AMBIGUOUS");
        continue;
      }
      const descriptor = RuntimeAccess.descriptor(candidates[0], String(event.handler));
      if (descriptor == null ? void 0 : descriptor.get) {
        problem("EVENT_HANDLER_ACCESSOR_UNVERIFIED");
        continue;
      }
      if (typeof (descriptor == null ? void 0 : descriptor.value) !== "function") {
        problem("EVENT_HANDLER_MISSING");
        continue;
      }
      event.valid = true;
      event.targetComponentId = RuntimeAccess.uuid(candidates[0]);
    }
    return { ...audit, complete: issues.length === 0, callbacksInvoked: false };
  }
};

// extensions/creator3/src/ui-structure.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto = require("crypto");

// packages/ui-core/src/structure-plan.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var UiStructurePlan = class {
  create(rootId, source, operations, componentTypes, references, definitions = /* @__PURE__ */ new Map(), creationRules = []) {
    var _a;
    if (!source.length || source.length > 2e3 || !operations.length || operations.length > 100) throw new CocosError("INVALID_ARGUMENT", "Structure plan requires 1\u20132000 nodes and 1\u2013100 operations");
    const nodes = /* @__PURE__ */ new Map(), componentOwners = /* @__PURE__ */ new Map();
    const available = new Set(componentTypes), deleted = /* @__PURE__ */ new Set(), rows = [];
    for (const node of source) {
      if (!node.nodeId || nodes.has(node.nodeId)) throw new CocosError("VERIFICATION_FAILED", "Duplicate or missing native node UUID");
      nodes.set(node.nodeId, { ...node, children: [...node.children], components: node.components.map((component) => ({ ...component, created: false })), removed: false, created: false });
      for (const component of node.components) {
        if (!component.componentId || componentOwners.has(component.componentId)) throw new CocosError("VERIFICATION_FAILED", "Duplicate or missing native component UUID");
        componentOwners.set(component.componentId, node.nodeId);
      }
    }
    const root = nodes.get(rootId);
    if (!root) throw new CocosError("INVALID_ARGUMENT", "Root is absent from structure snapshot");
    for (const id of componentOwners.keys()) if (nodes.has(id)) throw new CocosError("VERIFICATION_FAILED", "Node and component identities overlap");
    const seen = /* @__PURE__ */ new Set();
    const visit = (id) => {
      var _a2;
      const node = nodes.get(id);
      if (!node || seen.has(id)) throw new CocosError("VERIFICATION_FAILED", "Invalid or cyclic native hierarchy");
      seen.add(id);
      for (const childId of node.children) {
        if (((_a2 = nodes.get(childId)) == null ? void 0 : _a2.parentId) !== id) throw new CocosError("VERIFICATION_FAILED", "Native parent/children disagree");
        visit(childId);
      }
    };
    visit(rootId);
    if (seen.size !== nodes.size) throw new CocosError("VERIFICATION_FAILED", "Snapshot contains nodes outside its scoped root");
    const get = (value) => {
      const id = Json.string(value, "node reference"), node = nodes.get(id);
      if (!node || node.removed) throw new CocosError("INVALID_ARGUMENT", "Node is outside scope, removed, or not created yet");
      return node;
    };
    const editable = (node) => {
      if (node.protectedReason) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native structure context requires its dedicated workflow", { nodeId: node.nodeId, reason: node.protectedReason });
    };
    const attach = (node, parent, index) => {
      const position = index === void 0 ? parent.children.length : Number(index);
      if (index !== void 0 && (typeof index !== "number" || !Number.isInteger(index)) || position < 0 || position > parent.children.length) throw new CocosError("INVALID_ARGUMENT", "Sibling index is outside the resulting parent");
      parent.children.splice(position, 0, node.nodeId);
      node.parentId = parent.nodeId;
    };
    const dependencies = (node) => {
      var _a2;
      for (const component of node.components) for (const required of (_a2 = component.requires) != null ? _a2 : []) {
        if (!node.components.some((candidate) => {
          var _a3;
          return candidate.type === required || ((_a3 = candidate.satisfies) == null ? void 0 : _a3.includes(required));
        })) {
          throw new CocosError("OPERATION_CONFLICT", "Structure operation breaks a native component dependency", { nodeId: node.nodeId, type: component.type, required, operationIndex: rows.length });
        }
      }
    };
    for (const operation of operations) {
      const row = { ...operation };
      if (row.action === "create") {
        const parent = get(row.parent), key = Json.string(row.key, "key");
        editable(parent);
        if (nodes.has(key) || componentOwners.has(key)) throw new CocosError("OPERATION_CONFLICT", "Create key overlaps an existing identity");
        const node = { nodeId: key, parentId: parent.nodeId, name: Json.string(row.name, "name"), children: [], components: [], removed: false, created: true };
        const implicitComponentTypes = [];
        for (const rule of creationRules) {
          let matches = rule.inheritedOutsideRoot;
          for (let ancestor = parent; ancestor; ancestor = ancestor.nodeId === rootId ? void 0 : nodes.get(ancestor.parentId)) {
            if (ancestor.components.some((component) => {
              var _a2;
              return component.type === rule.ancestorType || ((_a2 = component.satisfies) == null ? void 0 : _a2.includes(rule.ancestorType));
            })) matches = true;
          }
          if (matches && !node.components.some((component) => component.type === rule.componentType)) {
            if (!available.has(rule.componentType)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native default component is unavailable");
            node.components.push({ ...definitions.get(rule.componentType), componentId: `planned-default:${rows.length}:${rule.componentType}`, type: rule.componentType, created: true });
            implicitComponentTypes.push(rule.componentType);
          }
        }
        if (implicitComponentTypes.length) row.implicitComponentTypes = implicitComponentTypes;
        dependencies(node);
        nodes.set(key, node);
        attach(node, parent, row.index);
      } else if (row.action === "move") {
        const node = get(row.node), parent = get(row.parent);
        editable(node);
        editable(parent);
        if (node.nodeId === rootId) throw new CocosError("INVALID_ARGUMENT", "Cannot move scoped root");
        for (let ancestor = parent; ancestor; ancestor = ancestor.nodeId === rootId ? void 0 : nodes.get(ancestor.parentId)) if (ancestor === node) throw new CocosError("INVALID_ARGUMENT", "Move creates a cycle");
        const previous = get(node.parentId);
        editable(previous);
        previous.children.splice(previous.children.indexOf(node.nodeId), 1);
        attach(node, parent, row.index);
      } else if (row.action === "remove") {
        const node = get(row.node);
        if (node.nodeId === rootId) throw new CocosError("INVALID_ARGUMENT", "Cannot remove scoped root");
        const remove = (entry) => {
          editable(entry);
          entry.removed = true;
          if (!entry.created) deleted.add(entry.nodeId);
          for (const component of entry.components) if (!component.created) deleted.add(component.componentId);
          for (const child of entry.children) remove(nodes.get(child));
        };
        editable(get(node.parentId));
        remove(node);
        const parent = get(node.parentId);
        parent.children.splice(parent.children.indexOf(node.nodeId), 1);
      } else if (row.action === "add_component") {
        const node = get(row.node), type = Json.string(row.type, "type");
        editable(node);
        if (!available.has(type) || node.components.some((component) => component.type === type)) throw new CocosError("INVALID_ARGUMENT", "Component type is unavailable or already present");
        node.components.push({ ...definitions.get(type), componentId: `planned-component:${rows.length}`, type, created: true });
        dependencies(node);
      } else if (row.action === "remove_component") {
        const componentId = Json.string(row.componentId, "componentId"), owner = componentOwners.get(componentId);
        if (!owner) throw new CocosError("INVALID_ARGUMENT", "Component is outside scoped root");
        const node = get(owner);
        editable(node);
        const index = node.components.findIndex((component) => component.componentId === componentId);
        if (index < 0) throw new CocosError("INVALID_ARGUMENT", "Component already removed");
        deleted.add(componentId);
        node.components.splice(index, 1);
        dependencies(node);
      } else throw new CocosError("INVALID_ARGUMENT", "Unknown structure action");
      rows.push(row);
    }
    for (const node of nodes.values()) if (!node.removed) {
      const names = /* @__PURE__ */ new Map();
      for (const id of node.children) {
        const name = nodes.get(id).name;
        const group = (_a = names.get(name)) != null ? _a : [];
        group.push(id);
        names.set(name, group);
      }
      const original = source.find((entry) => entry.nodeId === node.nodeId);
      for (const [name, ids] of names) if (ids.length > 1 && ids.some((id) => !(original == null ? void 0 : original.children.includes(id)))) {
        throw new CocosError("OPERATION_CONFLICT", "Result introduces ambiguous sibling names", { parentId: node.nodeId, name });
      }
      dependencies(node);
    }
    const blockers = references.rows.filter((row) => deleted.has(row.targetId) && !deleted.has(row.sourceId));
    const deletionAllowed = deleted.size === 0 || references.complete && references.issues.length === 0 && blockers.length === 0;
    return {
      rootId,
      rows,
      applicable: deletionAllowed,
      transformPolicy: "preserve-local",
      resultingNodes: [...nodes.values()].filter((node) => !node.removed).map((node) => ({ key: node.nodeId, nodeId: node.created ? null : node.nodeId, parent: node.parentId, children: node.children, name: node.name, componentTypes: node.components.map((component) => component.type) })),
      deletedIds: [...deleted],
      references: Json.value({ complete: references.complete, blockers, issues: references.issues, deletionAllowed })
    };
  }
};

// extensions/creator3/src/ui-structure.ts
var Creator3UiStructure = class {
  constructor(inspector, facade) {
    this.inspector = inspector;
    this.facade = facade;
  }
  inspector;
  facade;
  plan(p) {
    var _a;
    const rootId = Json.string(p.rootId, "rootId");
    if (!Array.isArray(p.rows)) throw new CocosError("INVALID_ARGUMENT", "rows must be an array");
    const rows = p.rows.map((row) => Json.object(row));
    const mode = String(RuntimeAccess.call(this.facade, "queryMode"));
    if (mode !== "general" && mode !== "prefab") throw new CocosError("UNSUPPORTED_CAPABILITY", "Structure planning requires general scene mode or Prefab asset editing mode", { mode });
    let assetRoot;
    let instanceRoot;
    let context = { kind: "scene" };
    if (mode === "prefab") {
      const proxy = RuntimeAccess.object(RuntimeAccess.object(RuntimeAccess.call(this.facade, "getCurrentFacade"))._sceneProxy, "native Prefab scene proxy");
      assetRoot = RuntimeAccess.object(RuntimeAccess.call(proxy, "getRootNode"), "native Prefab asset root");
      if (RuntimeAccess.uuid(assetRoot) !== rootId || this.inspector.node(rootId) !== assetRoot) throw new CocosError("INVALID_ARGUMENT", "Prefab asset structure scope must be its native asset root");
      const assetUuid = RuntimeAccess.call(proxy, "queryCurrentSceneUuid");
      if (typeof assetUuid !== "string" || !assetUuid) throw new CocosError("VERIFICATION_FAILED", "Native Prefab asset identity is unavailable");
      context = { kind: "prefab-asset", assetUuid, rootId };
    } else {
      const root = this.inspector.node(rootId);
      if (root._prefab && this.inspector.type(root) !== "cc.Scene") {
        const info = RuntimeAccess.object(root._prefab);
        if (info.root === root && info.asset && RuntimeAccess.uuid(info.asset)) {
          instanceRoot = root;
          context = { kind: "prefab-instance", assetUuid: RuntimeAccess.uuid(info.asset), rootId };
          for (const row of rows) if (row.action === "move" || row.action === "remove") {
            const node = this.inspector.all(root).find((candidate) => RuntimeAccess.uuid(candidate) === row.node);
            if ((node == null ? void 0 : node._prefab) && RuntimeAccess.object(node._prefab).fileId) throw new CocosError("UNSUPPORTED_CAPABILITY", "Source-linked Prefab nodes require editing the Prefab asset", { nodeId: RuntimeAccess.uuid(node) });
          }
        }
      }
    }
    const cc = this.inspector.environment.cc, definitions = /* @__PURE__ */ new Map();
    const typeName = (value) => {
      const name = RuntimeAccess.call(cc.js, "getClassName", value);
      if (typeof name !== "string" || !name) throw new CocosError("VERIFICATION_FAILED", "Native component type identity is unavailable");
      return name;
    };
    const definition = (constructor) => {
      const type = typeName(constructor), cached = definitions.get(type);
      if (cached) return cached;
      const dependencyProperty = RuntimeAccess.descriptor(constructor, "_requireComponent");
      if (dependencyProperty == null ? void 0 : dependencyProperty.get) throw new CocosError("VERIFICATION_FAILED", "Component dependency accessor cannot be inspected without running project code");
      const required = dependencyProperty == null ? void 0 : dependencyProperty.value;
      const requires = required ? (Array.isArray(required) ? required : [required]).map(typeName) : [];
      const satisfies = [];
      let current = constructor;
      for (let depth = 0; current && current !== Function.prototype; depth++) {
        if (depth > 64) throw new CocosError("VERIFICATION_FAILED", "Component inheritance exceeds inspection limit");
        const name = RuntimeAccess.call(cc.js, "getClassName", current);
        if (typeof name === "string" && name) satisfies.push(name);
        current = Object.getPrototypeOf(current);
      }
      const result2 = { requires, satisfies };
      definitions.set(type, result2);
      return result2;
    };
    const nativeNodes = this.inspector.all(this.inspector.node(rootId));
    const visibleIds = new Set(nativeNodes.map(RuntimeAccess.uuid));
    if (nativeNodes.length > 2e3) throw new CocosError("INVALID_ARGUMENT", "Structure snapshot exceeds 2000 nodes");
    const source = nativeNodes.map((node) => {
      var _a2;
      let protectedReason;
      for (let ancestor = node, depth = 0; ancestor; ancestor = ancestor.parent ? RuntimeAccess.object(ancestor.parent) : null, depth++) {
        if (depth > 2e3) throw new CocosError("VERIFICATION_FAILED", "Native parent chain exceeds inspection limit");
        if (ancestor._prefab && this.inspector.type(ancestor) !== "cc.Scene") {
          const info = RuntimeAccess.object(ancestor._prefab);
          if ((!assetRoot || info.root !== assetRoot) && (!instanceRoot || info.root !== instanceRoot)) protectedReason = "prefab-instance";
        }
        if (Number((_a2 = ancestor._objFlags) != null ? _a2 : 0) & 8) protectedReason = "editor-internal-node";
        if (ancestor === assetRoot || ancestor === instanceRoot) break;
      }
      return {
        nodeId: RuntimeAccess.uuid(node),
        parentId: node.parent ? RuntimeAccess.uuid(RuntimeAccess.object(node.parent)) : null,
        name: String(node.name),
        children: node.children.map(RuntimeAccess.uuid).filter((id) => visibleIds.has(id)),
        ...protectedReason ? { protectedReason } : {},
        components: node._components.map((component) => ({ componentId: RuntimeAccess.uuid(component), type: typeName(component), ...definition(component.constructor) }))
      };
    });
    for (const row of rows) if (row.action === "add_component") {
      const type = Json.string(row.type, "type"), constructor = RuntimeAccess.call(cc.js, "getClassByName", type);
      if (typeof constructor !== "function" || !RuntimeAccess.call(cc.js, "isChildClassOf", constructor, cc.Component)) throw new CocosError("INVALID_ARGUMENT", "Registered component class is unavailable", { type });
      definition(constructor);
    }
    const creationRules = [];
    if (rows.some((row) => row.action === "create")) {
      const transform = RuntimeAccess.call(cc.js, "getClassByName", "cc.UITransform");
      if (typeof transform === "function") {
        definition(transform);
        let inheritedOutsideRoot = false;
        for (let parent = this.inspector.node(rootId).parent, depth = 0; parent; parent = RuntimeAccess.object(parent).parent, depth++) {
          if (depth > 2e3) throw new CocosError("VERIFICATION_FAILED", "Native ancestor chain exceeds inspection limit");
          for (const component of RuntimeAccess.object(parent)._components) if ((_a = definition(component.constructor).satisfies) == null ? void 0 : _a.includes("cc.Canvas")) inheritedOutsideRoot = true;
        }
        creationRules.push({ ancestorType: "cc.Canvas", componentType: "cc.UITransform", inheritedOutsideRoot });
      }
    }
    const audit = new SerializedReferenceAudit().scene(this.inspector);
    const references = {
      complete: audit.complete === true,
      rows: audit.rows.filter((row) => row.kind !== "asset").map((row) => ({ sourceId: String(row.sourceId), targetId: String(row.targetId), path: String(row.path) })),
      issues: audit.issues
    };
    const result = new UiStructurePlan().create(rootId, source, rows, [...definitions.keys()], references, definitions, creationRules);
    const sourceRevision = (0, import_node_crypto.createHash)("sha256").update(JSON.stringify(this.inspector.fingerprint())).digest("hex");
    const planHash = (0, import_node_crypto.createHash)("sha256").update(JSON.stringify({ sourceRevision, mode, context, result })).digest("hex");
    return { ...result, mode, context, sourceRevision, planHash, applySupported: true };
  }
};

// extensions/creator3/src/ui-structure-execution.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/creator3/src/structure-undo.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator3StructureUndo = class {
  constructor(inspector, facade, rootId) {
    this.inspector = inspector;
    this.facade = facade;
    this.rootId = rootId;
    this.manager = RuntimeAccess.object(RuntimeAccess.object(RuntimeAccess.call(facade, "getCurrentFacade"))._undoMgr, "native undo manager");
    const { _manualCommands: manual, _autoCommands: automatic, _commandArray: history, _index: index } = this.manager;
    if (!Array.isArray(manual) || !Array.isArray(automatic) || !Array.isArray(history) || !Number.isInteger(index)) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native undo manager does not match the 3.8.8 adapter");
    if (manual.length || automatic.length) throw new CocosError("RESOURCE_BUSY", "Another native undo recording is in progress");
    this.index = Number(index);
    this.previous = history.slice(0, this.index + 1);
    this.initialIds = new Set(this.identities());
    this.commandId = String(RuntimeAccess.call(facade, "beginRecording", [...this.initialIds], { auto: false, tag: "CocosMCP structure" }));
    const command = manual.find((row) => RuntimeAccess.object(row).id === this.commandId);
    if (!command || !(RuntimeAccess.object(command).undoData instanceof Map) || !Array.isArray(RuntimeAccess.object(command).uuids) || RuntimeAccess.object(command).auto !== false) {
      RuntimeAccess.call(facade, "cancelRecording", this.commandId);
      throw new CocosError("UNSUPPORTED_CAPABILITY", "Native manual undo command is unavailable");
    }
    this.command = RuntimeAccess.object(command);
  }
  inspector;
  facade;
  rootId;
  manager;
  command;
  initialIds;
  previous;
  index;
  commandId;
  ended = false;
  finish() {
    if (this.ended) throw new CocosError("OPERATION_CONFLICT", "Native undo checkpoint was already submitted");
    this.ended = true;
    for (const uuid of this.identities()) if (!this.initialIds.has(uuid)) {
      this.command.uuids.push(uuid);
      this.command.undoData.set(uuid, null);
    }
    if (RuntimeAccess.call(this.facade, "endRecording", this.commandId) !== true) throw new CocosError("VERIFICATION_FAILED", "Native manual undo recording did not finish");
    const history = this.manager._commandArray;
    if (this.manager._index !== this.index + 1 || history[this.index + 1] !== this.command || this.previous.some((entry, index) => history[index] !== entry)) {
      throw new CocosError("VERIFICATION_FAILED", "Other native undo commands interleaved with the structure batch");
    }
  }
  identities() {
    return this.inspector.all(this.inspector.node(this.rootId)).flatMap((node) => [RuntimeAccess.uuid(node), ...node._components.map(RuntimeAccess.uuid)]);
  }
};

// extensions/creator3/src/ui-structure-execution.ts
var Creator3UiStructureExecution = class {
  constructor(inspector, facade, nodes) {
    this.inspector = inspector;
    this.facade = facade;
    this.nodes = nodes;
  }
  inspector;
  facade;
  nodes;
  async apply(p) {
    const plan = new Creator3UiStructure(this.inspector, this.facade).plan(p);
    if (Json.string(p.planHash, "planHash") !== plan.planHash) throw new CocosError("OPERATION_CONFLICT", "Structure plan is stale; query a new plan before applying");
    if (!plan.applicable) throw new CocosError("OPERATION_CONFLICT", "Structure deletion is blocked by scene references", { references: plan.references });
    const rows = plan.rows, expected = plan.resultingNodes;
    const componentClassIds = /* @__PURE__ */ new Map();
    for (const row of rows) if (row.action === "add_component") {
      const type = Json.string(row.type, "type"), js = this.inspector.environment.cc.js;
      const classId = RuntimeAccess.call(js, "_getClassId", RuntimeAccess.call(js, "getClassByName", type));
      if (typeof classId !== "string" || !classId) throw new CocosError("VERIFICATION_FAILED", "Native component class ID is unavailable", { type });
      componentClassIds.set(type, classId);
    }
    const mapping = /* @__PURE__ */ new Map(), completed = [];
    const componentOwners = /* @__PURE__ */ new Map();
    for (const node of this.inspector.all(this.inspector.node(String(p.rootId)))) {
      mapping.set(RuntimeAccess.uuid(node), RuntimeAccess.uuid(node));
      for (const component of node._components) componentOwners.set(RuntimeAccess.uuid(component), RuntimeAccess.uuid(node));
    }
    const id = (value) => {
      const key = Json.string(value, "node reference"), uuid = mapping.get(key);
      if (!uuid) throw new CocosError("VERIFICATION_FAILED", "Native operation cannot resolve a planned node", { key });
      return uuid;
    };
    const query = (uuid) => RuntimeAccess.object(RuntimeAccess.call(this.nodes, "query", uuid), "native node");
    const undo = new Creator3StructureUndo(this.inspector, this.facade, String(p.rootId));
    let started = false, checkpointAttempted = false;
    const checkpoint = () => {
      checkpointAttempted = true;
      undo.finish();
    };
    try {
      for (const row of rows) {
        started = true;
        let componentId;
        if (row.action === "create") {
          const uuid = RuntimeAccess.call(this.nodes, "createNode", id(row.parent), Json.string(row.name, "name"), null, false);
          if (typeof uuid !== "string" || !uuid || [...mapping.values()].includes(uuid)) throw new CocosError("VERIFICATION_FAILED", "Native create did not return a new node UUID");
          mapping.set(String(row.key), uuid);
          if (row.index !== void 0) this.order(query(uuid), Number(row.index));
        } else if (row.action === "move") {
          const uuid = id(row.node);
          RuntimeAccess.call(this.nodes, "setParent", id(row.parent), uuid, false);
          const parent = query(id(row.parent));
          this.order(query(uuid), row.index === void 0 ? parent.children.filter((node) => {
            var _a;
            return !(Number((_a = node._objFlags) != null ? _a : 0) & 8);
          }).length - 1 : Number(row.index));
        } else if (row.action === "remove") {
          RuntimeAccess.call(this.nodes, "removeNode", id(row.node), false);
        } else if (row.action === "add_component") {
          const owner = query(id(row.node)), previousIds = new Set(owner._components.map(RuntimeAccess.uuid));
          if (RuntimeAccess.call(this.nodes, "createComponent", id(row.node), componentClassIds.get(String(row.type))) !== true) throw new CocosError("VERIFICATION_FAILED", "Native component creation was rejected");
          const added = owner._components.filter((component) => !previousIds.has(RuntimeAccess.uuid(component)) && RuntimeAccess.call(this.inspector.environment.cc.js, "getClassName", component) === row.type);
          if (added.length !== 1) throw new CocosError("VERIFICATION_FAILED", "Native component creation did not produce the requested instance");
          componentId = RuntimeAccess.uuid(added[0]);
        } else if (row.action === "remove_component") {
          if (RuntimeAccess.call(this.nodes, "removeComponent", Json.string(row.componentId, "componentId")) !== true) throw new CocosError("VERIFICATION_FAILED", "Native component removal was rejected");
          if (this.inspector.all(this.inspector.node(String(p.rootId))).some((node) => node._components.some((component) => RuntimeAccess.uuid(component) === row.componentId))) throw new CocosError("VERIFICATION_FAILED", "Native component remains after removal");
        } else throw new CocosError("INVALID_ARGUMENT", "Unknown structure action");
        completed.push({ ...row, ...row.action === "create" ? { nodeId: mapping.get(String(row.key)) } : {}, ...componentId ? { componentId } : {} });
      }
      checkpoint();
      this.verify(String(p.rootId), expected, mapping, plan.deletedIds, componentOwners);
      return {
        rootId: p.rootId,
        completed,
        pending: [],
        mapping: [...mapping].map(([key, nodeId]) => ({ key, nodeId })),
        needsSave: true,
        verifiedStructure: true,
        undoScope: "native-manual-recording"
      };
    } catch (error) {
      if (!started) throw error;
      let checkpointError = null;
      if (!checkpointAttempted) try {
        checkpoint();
      } catch (failure2) {
        checkpointError = CocosError.from(failure2).message;
      }
      const failure = CocosError.from(error);
      throw new CocosError("OUTCOME_UNKNOWN", "Native structure batch requires readback before continuing", {
        completed,
        pending: rows.slice(completed.length),
        mapping: [...mapping].map(([key, nodeId]) => ({ key, nodeId })),
        needsSave: true,
        cause: { code: failure.code, message: failure.message },
        checkpointError
      });
    }
  }
  order(node, index) {
    const parent = RuntimeAccess.object(node.parent);
    const siblings = parent.children, visible = siblings.filter((sibling) => {
      var _a;
      return sibling !== node && !(Number((_a = sibling._objFlags) != null ? _a : 0) & 8);
    });
    const anchor = visible[index], withoutNode = siblings.filter((sibling) => sibling !== node);
    const nativeIndex = anchor ? withoutNode.indexOf(anchor) : withoutNode.length;
    RuntimeAccess.call(this.facade, "onNodeBeforeChanged", parent);
    RuntimeAccess.call(node, "setSiblingIndex", nativeIndex);
    RuntimeAccess.call(this.facade, "onNodeChanged", parent, {});
  }
  verify(rootId, expected, mapping, deleted, componentOwners) {
    var _a, _b, _c, _d;
    const actual = this.inspector.all(this.inspector.node(rootId)), byId = new Map(actual.map((node) => [RuntimeAccess.uuid(node), node]));
    if (actual.length !== expected.length) throw new CocosError("VERIFICATION_FAILED", "Native batch created or removed unplanned nodes");
    for (const row of expected) {
      const uuid = mapping.get(String(row.key)), node = byId.get(uuid);
      if (!node || String(node.name) !== row.name || RuntimeAccess.uuid(node.parent) !== ((_b = (_a = mapping.get(String(row.parent))) != null ? _a : row.parent) != null ? _b : "")) throw new CocosError("VERIFICATION_FAILED", "Native node identity, name or parent differs from the plan", { uuid });
      const children = node.children.map(RuntimeAccess.uuid).filter((id) => byId.has(id)), expectedChildren = row.children.map((key) => mapping.get(key));
      const types = node._components.map((component) => String(RuntimeAccess.call(this.inspector.environment.cc.js, "getClassName", component))).sort();
      if (JSON.stringify(children) !== JSON.stringify(expectedChildren) || JSON.stringify(types) !== JSON.stringify([...row.componentTypes].sort())) throw new CocosError("VERIFICATION_FAILED", "Native child order or component set differs from the plan", { uuid });
    }
    const identities = new Set(actual.flatMap((node) => [RuntimeAccess.uuid(node), ...node._components.map(RuntimeAccess.uuid)]));
    if (deleted.some((uuid) => identities.has(uuid))) throw new CocosError("VERIFICATION_FAILED", "Removed native objects are still present");
    for (const [componentId, nodeId] of componentOwners) if (!deleted.includes(componentId) && !((_d = (_c = byId.get(nodeId)) == null ? void 0 : _c._components) == null ? void 0 : _d.some((component) => RuntimeAccess.uuid(component) === componentId))) {
      throw new CocosError("VERIFICATION_FAILED", "Native batch changed an undeleted component UUID or owner", { componentId, nodeId });
    }
  }
};

// extensions/creator3/src/prefab-snapshot.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator3PrefabSnapshot = class {
  constructor(inspector, nativeSerialize) {
    this.inspector = inspector;
    this.nativeSerialize = nativeSerialize;
  }
  inspector;
  nativeSerialize;
  capture(nodeId) {
    var _a, _b, _c;
    const root = this.inspector.node(nodeId), info = RuntimeAccess.object((_a = root._prefab) != null ? _a : {});
    if (!info.asset || info.root !== root) throw new CocosError("INVALID_ARGUMENT", "Select the linked Prefab instance root");
    const serialize = (_b = this.nativeSerialize) != null ? _b : this.inspector.environment.serialize;
    if (!serialize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Native editor serialization unavailable");
    const pending = [root], visited = /* @__PURE__ */ new Set(), componentIssues = [];
    let components = 0;
    while (pending.length) {
      const node = pending.pop();
      if (visited.has(node)) throw new CocosError("VERIFICATION_FAILED", "Cyclic Prefab instance hierarchy");
      visited.add(node);
      const attached = this.inspector.components(node);
      components += attached.length;
      if (visited.size + components > 1e4) throw new CocosError("RESOURCE_BUSY", "Prefab snapshot exceeds object budget");
      for (const component of attached) {
        const type = this.inspector.type(component);
        if (type === "cc.MissingScript" || type === "Object" || !type) {
          if (componentIssues.length >= 1e3) throw new CocosError("RESOURCE_BUSY", "Prefab component issue budget exceeded");
          componentIssues.push({
            side: "instance",
            nodeId: RuntimeAccess.uuid(node),
            componentId: RuntimeAccess.uuid(component),
            type,
            code: type === "cc.MissingScript" ? "MISSING_COMPONENT_SCRIPT" : "COMPONENT_TYPE_UNVERIFIED"
          });
        }
      }
      const children = (_c = node.children) != null ? _c : [];
      if (children.length + pending.length + visited.size + components > 1e4) throw new CocosError("RESOURCE_BUSY", "Prefab snapshot exceeds object budget");
      for (const child of children) pending.push(child);
    }
    const serialized = Json.value(serialize(root));
    const serializedBytes = new TextEncoder().encode(typeof serialized === "string" ? serialized : JSON.stringify(serialized)).byteLength;
    if (serializedBytes > 16 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Native Prefab serialization exceeds snapshot byte budget");
    return {
      rootId: RuntimeAccess.uuid(root),
      assetUuid: RuntimeAccess.uuid(info.asset),
      observedNodeCount: visited.size,
      observedComponentCount: components,
      serialized,
      serializedBytes,
      componentIssues,
      serializationScope: "native-context-with-external-references",
      source: "native-editor-serialization",
      sceneModifiedByTool: false
    };
  }
};

// packages/runtime3-bridge/src/font.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var FontInspector = class {
  constructor(inspector, assets) {
    this.inspector = inspector;
    this.assets = assets;
  }
  inspector;
  assets;
  async inspect(p) {
    var _a, _b;
    const font = await this.assets.load(Json.string(p.uuid, "uuid"), "Font");
    const config = font.fntConfig ? RuntimeAccess.object(font.fntConfig) : null, dictionary = config == null ? void 0 : config.fontDefDictionary;
    const characters = [...new Set(Array.from(String((_a = p.sampleText) != null ? _a : "")).filter((character) => !/\s/u.test(character)))];
    const rows = characters.map((character) => ({ character, codePoint: character.codePointAt(0), present: dictionary ? Object.hasOwn(RuntimeAccess.object(dictionary), String(character.codePointAt(0))) : null }));
    const users = [];
    for (const node of this.inspector.all()) for (const component of this.inspector.components(node)) if (this.inspector.type(component) === "cc.Label" && component.font === font) users.push({ nodeId: RuntimeAccess.uuid(node), componentId: RuntimeAccess.uuid(component), text: String((_b = component.string) != null ? _b : ""), useSystemFont: Boolean(component.useSystemFont) });
    return {
      uuid: RuntimeAccess.uuid(font),
      type: this.inspector.type(font),
      rows,
      users,
      glyphCoverage: dictionary ? "bitmap-font-table" : "unknown",
      missing: rows.filter((row) => row.present === false).map((row) => row.character),
      spriteFrameUuid: font.spriteFrame ? RuntimeAccess.uuid(font.spriteFrame) : null,
      limitations: ["\u52A8\u6001\u5B57\u4F53\u4E0E\u7CFB\u7EDF\u5B57\u4F53\u7684\u5B57\u5F62\u8986\u76D6\u5C1A\u672A\u89E3\u6790", "\u8BFB\u53D6\u5F53\u524D\u5DF2\u52A0\u8F7D\u573A\u666F\u5F15\u7528\uFF0C\u4E0D\u5305\u542B\u672A\u6253\u5F00\u573A\u666F\u6216\u811A\u672C\u52A0\u8F7D\u8DEF\u5F84"]
    };
  }
};

// packages/runtime3-bridge/src/animation.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv3 = __toESM(require_ajv(), 1);

// packages/animation-core/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv2 = __toESM(require_ajv(), 1);
var ClipDocumentModel = class _ClipDocumentModel {
  static schema = Schema.object({
    name: { type: "string", minLength: 1, maxLength: 128 },
    duration: { type: "number", exclusiveMinimum: 0, maximum: 600 },
    tracks: { type: "array", minItems: 1, maxItems: 64, items: Schema.object({ path: { type: "string", maxLength: 512 }, property: Schema.enum("position", "scale", "eulerAngles"), keys: {
      type: "array",
      minItems: 1,
      maxItems: 1e3,
      items: Schema.object({ time: { type: "number", minimum: 0, maximum: 600 }, value: Schema.object({ x: { type: "number", minimum: -1e5, maximum: 1e5 }, y: { type: "number", minimum: -1e5, maximum: 1e5 }, z: { type: "number", minimum: -1e5, maximum: 1e5 } }, ["x", "y", "z"]), interpolation: Schema.enum("linear", "constant") }, ["time", "value"])
    } }, ["path", "property", "keys"]) }
  }, ["name", "duration", "tracks"]);
  static keysSchema = this.schema.properties.tracks.items.properties.keys;
  static patchesSchema = { type: "array", minItems: 1, maxItems: 64, items: Schema.object({ trackIndex: { type: "integer", minimum: 0, maximum: 127 }, keys: this.keysSchema }, ["trackIndex", "keys"]) };
  parse(value) {
    const validate = new import_ajv2.Ajv({ strict: true }).compile(_ClipDocumentModel.schema);
    if (!validate(value)) throw new CocosError("INVALID_ARGUMENT", "Invalid clip document");
    const document = value, targets = /* @__PURE__ */ new Set();
    let count = 0;
    for (const track of document.tracks) {
      if (track.path && track.path.split("/").some((segment) => !segment || segment === "." || segment === ".." || segment.includes("\\"))) throw new CocosError("INVALID_ARGUMENT", "Clip paths must be relative child paths");
      const key = `${track.path}:${track.property}`;
      if (targets.has(key)) throw new CocosError("INVALID_ARGUMENT", "Duplicate animation track target");
      targets.add(key);
      let previous = -1;
      for (const frame of track.keys) {
        if (frame.time <= previous || frame.time > document.duration) throw new CocosError("INVALID_ARGUMENT", "Keyframe times must be strictly increasing within clip duration");
        previous = frame.time;
        if (++count > 4e3) throw new CocosError("INVALID_ARGUMENT", "Clip exceeds 4000 keyframes");
      }
    }
    return document;
  }
};

// packages/runtime3-bridge/src/animation.ts
var AnimationTools = class {
  constructor(inspector, assets) {
    this.inspector = inspector;
    this.assets = assets;
  }
  inspector;
  assets;
  serialize(p) {
    const document = new ClipDocumentModel().parse(p.document), root = this.inspector.node(Json.string(p.rootId, "rootId"));
    for (const spec of document.tracks) {
      let node = root;
      for (const part of spec.path ? spec.path.split("/") : []) {
        const matches = node.children.filter((child) => child.name === part);
        if (matches.length !== 1) throw new CocosError("INVALID_ARGUMENT", `Animation target is missing or ambiguous: ${spec.path}`);
        node = matches[0];
      }
    }
    const cc = this.inspector.environment.cc, animation = RuntimeAccess.object(cc.animation);
    const clip = RuntimeAccess.object(RuntimeAccess.construct(cc.AnimationClip, []));
    try {
      clip.name = document.name;
      clip.duration = document.duration;
      for (const spec of document.tracks) {
        const track = RuntimeAccess.object(RuntimeAccess.construct(animation.VectorTrack, [])), path = RuntimeAccess.object(RuntimeAccess.construct(animation.TrackPath, []));
        if (spec.path) RuntimeAccess.call(path, "toHierarchy", spec.path);
        RuntimeAccess.call(path, "toProperty", spec.property);
        track.path = path;
        track.componentsCount = 3;
        const channels = RuntimeAccess.call(track, "channels");
        for (const [index, axis] of ["x", "y", "z"].entries()) RuntimeAccess.call(channels[index].curve, "assignSorted", spec.keys.map((frame) => [frame.time, { value: frame.value[axis], interpolationMode: frame.interpolation === "constant" ? 1 : 0 }]));
        RuntimeAccess.call(clip, "addTrack", track);
      }
      if (!this.inspector.environment.serialize) throw new CocosError("CONTEXT_UNAVAILABLE", "Native editor serialization is required");
      return Json.value(this.inspector.environment.serialize(clip));
    } finally {
      RuntimeAccess.destroyOwned(cc, clip);
    }
  }
  patchSource(p) {
    var _a;
    const validate = new import_ajv3.Ajv({ strict: true }).compile(ClipDocumentModel.patchesSchema);
    if (!validate(p.patches)) throw new CocosError("INVALID_ARGUMENT", "Invalid animation patches");
    const patches = p.patches, indices = patches.map((row) => Number(row.trackIndex));
    if (new Set(indices).size !== indices.length) throw new CocosError("INVALID_ARGUMENT", "Duplicate animation patch index");
    const cc = this.inspector.environment.cc, details = RuntimeAccess.construct(RuntimeAccess.object(cc.deserialize).Details, []);
    const clone = RuntimeAccess.object(RuntimeAccess.call(cc, "deserialize", Json.string(p.content, "content"), details));
    try {
      if (typeof cc.AnimationClip !== "function" || !(clone instanceof cc.AnimationClip)) throw new CocosError("INVALID_ARGUMENT", "Source is not an AnimationClip");
      if (((_a = details.uuidList) != null ? _a : []).length) throw new CocosError("UNSUPPORTED_CAPABILITY", "Clip patching does not support external resource references");
      const tracks = Array.from(clone.tracks);
      const document = new ClipDocumentModel().parse({ name: String(clone.name), duration: Number(clone.duration), tracks: patches.map((row) => ({ path: String(row.trackIndex), property: "position", keys: row.keys })) });
      for (const [index, patch] of patches.entries()) {
        const track = tracks[Number(patch.trackIndex)], type = RuntimeAccess.object(cc.animation).VectorTrack;
        if (!track || typeof type !== "function" || !(track instanceof type) || track.componentsCount !== 3) throw new CocosError("UNSUPPORTED_CAPABILITY", "Only existing 3D VectorTrack channels can be patched");
        const channels = RuntimeAccess.call(track, "channels");
        for (const [axisIndex, axis] of ["x", "y", "z"].entries()) RuntimeAccess.call(channels[axisIndex].curve, "assignSorted", document.tracks[index].keys.map((frame) => [frame.time, { value: frame.value[axis], interpolationMode: frame.interpolation === "constant" ? 1 : 0 }]));
      }
      if (!this.inspector.environment.serialize) throw new CocosError("CONTEXT_UNAVAILABLE", "Editor serializer unavailable");
      return Json.value(this.inspector.environment.serialize(clone));
    } finally {
      if (typeof clone.destroy === "function") RuntimeAccess.destroyOwned(cc, clone);
    }
  }
  async inspect(p) {
    var _a;
    const clip = await this.assets.load(Json.string(p.uuid, "uuid"), "AnimationClip"), rows = [];
    let count = 0;
    for (const track of clip.tracks) {
      if (rows.length >= 128) throw new CocosError("INVALID_ARGUMENT", "Clip has more than 128 tracks");
      const channels = [];
      for (const channel of RuntimeAccess.call(track, "channels")) {
        const curve = RuntimeAccess.object(channel.curve), keyFramesCount = Number(curve.keyFramesCount);
        count += keyFramesCount;
        if (count > 12e3 || !Number.isFinite(count)) throw new CocosError("INVALID_ARGUMENT", "Clip inspection exceeds 12000 channel keys");
        channels.push({
          name: String((_a = channel.name) != null ? _a : ""),
          keyFramesCount,
          times: Array.from(RuntimeAccess.call(curve, "times")),
          ...p.time === void 0 ? {} : { sampledValue: keyFramesCount ? RuntimeAccess.safeData(RuntimeAccess.call(curve, "evaluate", p.time)) : null }
        });
      }
      rows.push({ type: this.inspector.type(track), channels });
    }
    return {
      uuid: RuntimeAccess.uuid(clip),
      name: String(clip.name),
      duration: Number(clip.duration),
      sample: Number(clip.sample),
      wrapMode: Number(clip.wrapMode),
      rows,
      scope: p.time === void 0 ? "native-track-channels" : "native-curve-evaluation",
      limitations: ["\u66F2\u7EBF\u91C7\u6837\u4E0D\u4F1A\u5E94\u7528\u5230\u573A\u666F\uFF0C\u4E5F\u4E0D\u89E6\u53D1\u52A8\u753B\u4E8B\u4EF6\uFF1B\u4E0D\u7B49\u4E8E\u5B9E\u9645\u59FF\u6001\u6216\u64AD\u653E\u9A8C\u6536"]
    };
  }
};

// packages/runtime3-bridge/src/animation-two-d.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/animation-core/src/two-d.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv4 = __toESM(require_ajv(), 1);
var TwoDClipModel = class _TwoDClipModel {
  static schema = Schema.object({
    name: { type: "string", minLength: 1, maxLength: 128 },
    duration: { type: "number", exclusiveMinimum: 0, maximum: 600 },
    loop: Schema.boolean(),
    events: { type: "array", maxItems: 128, items: Schema.object({ time: { type: "number", minimum: 0, maximum: 600 }, method: { type: "string", pattern: "^[a-zA-Z][a-zA-Z0-9]{0,63}$" }, params: { type: "array", maxItems: 8, items: { type: "string", maxLength: 256 } } }, ["time", "method"]) },
    tracks: { type: "array", minItems: 1, maxItems: 64, items: { oneOf: ["spriteFrame", "opacity", "color"].map((kind) => Schema.object({
      path: { type: "string", maxLength: 512 },
      kind: { const: kind },
      keys: { type: "array", minItems: 1, maxItems: 1e3, items: Schema.object({
        time: { type: "number", minimum: 0, maximum: 600 },
        value: kind === "spriteFrame" ? Schema.string() : kind === "opacity" ? { type: "number", minimum: 0, maximum: 255 } : Schema.object(Object.fromEntries(["r", "g", "b", "a"].map((key) => [key, { type: "number", minimum: 0, maximum: 255 }])), ["r", "g", "b", "a"]),
        interpolation: Schema.enum("linear", "constant")
      }, ["time", "value"]) }
    }, ["path", "kind", "keys"])) } }
  }, ["name", "duration", "tracks"]);
  parse(value) {
    var _a;
    if (!new import_ajv4.Ajv({ strict: true }).compile(_TwoDClipModel.schema)(value)) throw new CocosError("INVALID_ARGUMENT", "Invalid 2D clip document");
    const doc = value, seen = /* @__PURE__ */ new Set();
    let count = 0;
    for (const track of doc.tracks) {
      if (track.path && track.path.split("/").some((part) => !part || part === "." || part === ".." || part.includes("\\"))) throw new CocosError("INVALID_ARGUMENT", "Relative unambiguous node paths required");
      const key = `${track.path}:${track.kind}`;
      if (seen.has(key)) throw new CocosError("INVALID_ARGUMENT", "Duplicate track target");
      seen.add(key);
      let previous = -1;
      for (const frame of track.keys) {
        if (frame.time <= previous || frame.time > doc.duration || ++count > 4e3) throw new CocosError("INVALID_ARGUMENT", "Invalid keyframe order, duration or budget");
        if (track.kind === "spriteFrame" && frame.interpolation === "linear") throw new CocosError("INVALID_ARGUMENT", "SpriteFrame keys are discrete");
        previous = frame.time;
      }
    }
    for (const event of (_a = doc.events) != null ? _a : []) if (event.time > doc.duration || ["constructor", "destroy", "destroyImmediate", "onDestroy", "onLoad", "onEnable", "onDisable"].includes(event.method)) throw new CocosError("INVALID_ARGUMENT", "Unsafe event method or event beyond duration");
    return doc;
  }
};

// packages/runtime3-bridge/src/animation-two-d.ts
var TwoDAnimationAuthoring = class {
  constructor(scene, assets) {
    this.scene = scene;
    this.assets = assets;
  }
  scene;
  assets;
  async serialize(p) {
    var _a, _b;
    const doc = new TwoDClipModel().parse(p.document), root = this.scene.node(Json.string(p.rootId, "rootId")), cc = this.scene.environment.cc;
    const animation = FeatureSupport.require(cc.animation, "animation"), loaded = /* @__PURE__ */ new Map();
    for (const event of (_a = doc.events) != null ? _a : []) {
      const matches = this.scene.components(root).filter((c) => typeof c[event.method] === "function");
      if (matches.length !== 1) throw new CocosError("INVALID_ARGUMENT", `Animation event requires exactly one root receiver: ${event.method}`);
    }
    for (const spec of doc.tracks) {
      let node = root;
      for (const part of spec.path ? spec.path.split("/") : []) {
        const matches2 = node.children.filter((child) => child.name === part);
        if (matches2.length !== 1) throw new CocosError("INVALID_ARGUMENT", `Missing or ambiguous animation node ${spec.path}`);
        node = matches2[0];
      }
      const type = spec.kind === "opacity" ? "cc.UIOpacity" : "cc.Sprite";
      const matches = this.scene.components(node).filter((c) => this.scene.type(c) === type);
      if (matches.length !== 1) throw new CocosError("INVALID_ARGUMENT", `Exactly one ${type} required at ${spec.path}`);
      if (spec.kind === "spriteFrame") for (const frame of spec.keys) {
        const uuid = String(frame.value);
        if (!loaded.has(uuid)) loaded.set(uuid, await this.assets.load(uuid, "SpriteFrame"));
      }
    }
    const clip = RuntimeAccess.object(RuntimeAccess.construct(cc.AnimationClip, []));
    try {
      clip.name = doc.name;
      clip.duration = doc.duration;
      clip.wrapMode = doc.loop ? 2 : 1;
      clip.events = ((_b = doc.events) != null ? _b : []).map((event) => {
        var _a2;
        return { frame: event.time, func: event.method, params: (_a2 = event.params) != null ? _a2 : [] };
      });
      for (const spec of doc.tracks) {
        const type = spec.kind === "spriteFrame" ? "ObjectTrack" : spec.kind === "opacity" ? "RealTrack" : "ColorTrack";
        const track = RuntimeAccess.object(RuntimeAccess.construct(FeatureSupport.require(animation[type], type), [])), path = RuntimeAccess.object(RuntimeAccess.construct(animation.TrackPath, []));
        if (spec.path) RuntimeAccess.call(path, "toHierarchy", spec.path);
        RuntimeAccess.call(path, "toComponent", spec.kind === "opacity" ? "cc.UIOpacity" : "cc.Sprite");
        RuntimeAccess.call(path, "toProperty", spec.kind);
        track.path = path;
        const channels = RuntimeAccess.call(track, "channels");
        for (const [index, channel] of channels.entries()) RuntimeAccess.call(channel.curve, "assignSorted", spec.keys.map((frame) => {
          if (spec.kind === "spriteFrame") return [frame.time, loaded.get(String(frame.value))];
          const value = spec.kind === "opacity" ? frame.value : frame.value[["r", "g", "b", "a"][index]];
          return [frame.time, { value, interpolationMode: frame.interpolation === "constant" ? 1 : 0 }];
        }));
        RuntimeAccess.call(clip, "addTrack", track);
      }
      if (!this.scene.environment.serialize) throw new CocosError("CONTEXT_UNAVAILABLE", "Editor serializer required");
      return Json.value(this.scene.environment.serialize(clip));
    } finally {
      RuntimeAccess.destroyOwned(cc, clip);
    }
  }
};

// extensions/creator3/src/scene.ts
var SceneLifecycle = class {
  inspector;
  materials;
  async dispatch(method, args) {
    var _a, _b, _c, _d, _e, _f;
    if (!this.inspector) {
      const engineModules = (0, import_path2.join)(Editor.App.path, "node_modules");
      if (!module.paths.includes(engineModules)) module.paths.push(engineModules);
      const cc = require("cc");
      this.inspector = new SceneInspector({
        cc,
        major: 3,
        serialize: (value) => EditorExtends.serialize(value),
        // 删除前的引用扫描必须展开 Prefab 默认内容，不能把压缩省略的组件当作没有引用。
        serializeReferences: (value) => EditorExtends.serialize(value, {
          reserveContentsForSyncablePrefab: true,
          dontStripDefault: true,
          compressUuid: false,
          keepNodeUuid: true
        }),
        editor: true
      });
      this.materials = new MaterialController(this.inspector.environment);
    }
    if (method === "scene.references") return new SerializedReferenceAudit().scene(this.inspector);
    if (method === "prefab.snapshot") return new Creator3PrefabSnapshot(this.inspector, (value) => EditorExtends.serialize(value, {
      // 默认序列化会将可同步 Prefab 的组件压缩为 null，差异检查必须保留实例实际内容。
      reserveContentsForSyncablePrefab: true,
      dontStripDefault: true,
      compressUuid: false,
      keepNodeUuid: true
    })).capture(Json.string(Json.value(args[0]), "nodeId"));
    if (method === "ui.structure.plan") {
      if (typeof cce === "undefined") throw new CocosError("UNSUPPORTED_CAPABILITY", "Native scene facade is unavailable");
      return new Creator3UiStructure(this.inspector, cce.SceneFacadeManager).plan(Json.object(args[0]));
    }
    if (method === "ui.structure.apply") {
      if (typeof cce === "undefined") throw new CocosError("UNSUPPORTED_CAPABILITY", "Native scene facade is unavailable");
      return new Creator3UiStructureExecution(this.inspector, cce.SceneFacadeManager, cce.Node).apply(Json.object(args[0]));
    }
    if (method.startsWith("ik.")) {
      const cc = this.inspector.environment.cc;
      return FeatureSupport.run(method, String((_b = (_a = cc.VERSION) != null ? _a : cc.ENGINE_VERSION) != null ? _b : "unknown"), () => {
        let editor;
        try {
          editor = require("cc/editor/new-gen-anim");
        } catch (error) {
          if (error.code === "MODULE_NOT_FOUND") throw new CocosError("UNSUPPORTED_CAPABILITY", "\u5F53\u524D\u7F16\u8F91\u5668\u6CA1\u6709\u52A8\u753B\u56FE\u7F16\u8F91\u6A21\u5757");
          throw error;
        }
        const authoring = new IkAuthoring(this.inspector, editor), p = Json.object(args[0]);
        if (method === "ik.inspect") return authoring.inspect(p);
        return method === "ik.mask_serialize" ? authoring.mask(p) : authoring.serialize(p);
      });
    }
    if (method.startsWith("path.") || method === "probe.generate" || method === "engine.feature.inspect") {
      const cc = this.inspector.environment.cc, p = Json.object(args[0]);
      return FeatureSupport.run(method, String((_d = (_c = cc.VERSION) != null ? _c : cc.ENGINE_VERSION) != null ? _d : "unknown"), () => {
        if (method.startsWith("path.")) return new PathSampler(cc).execute(method, p);
        const inspector = new EngineFeatureInspector(this.inspector);
        return method === "probe.generate" ? inspector.generate(p) : inspector.inspect(String(p.family), p);
      });
    }
    if (method === "shader.material") return this.materials.serialized(Json.object(args[0]));
    if (method === "shader.materialAsset") return this.materials.asset(Json.object(args[0]));
    if (method === "shader.compileNative") {
      const p = Json.object(args[0]);
      return new CreatorShaderHost(Editor.App.path, Json.string(p.projectPath, "projectPath"), Json.string(p.editorVersion, "editorVersion")).execute("compile", p);
    }
    if (method === "shader.binding") return this.materials.binding(Json.object(args[0]));
    if (method === "shader.bindings") return this.materials.bindings(String(args[0]));
    if (method === "shader.checkMaterial") {
      await this.materials.load(String(args[0]), "Material");
      return { valid: true };
    }
    if (method === "font.inspect") return new FontInspector(this.inspector, this.materials).inspect(Json.object(args[0]));
    if (method === "animation.clip.patchSource") return new AnimationTools(this.inspector, this.materials).patchSource(Json.object(args[0]));
    if (method === "animation2d.serialize") return new TwoDAnimationAuthoring(this.inspector, this.materials).serialize(Json.object(args[0]));
    if (method === "gameplay2d.class_available") {
      const p = Json.object(args[0]), name = Json.string(p.className, "className");
      if (!/^[A-Z][A-Za-z0-9]{2,63}$/.test(name)) throw new CocosError("INVALID_ARGUMENT", "Invalid generated class name");
      return { registered: typeof RuntimeAccess.call(this.inspector.environment.cc.js, "getClassByName", name) === "function" };
    }
    if (method === "animation.clip.serialize") return new AnimationTools(this.inspector, this.materials).serialize(Json.object(args[0]));
    if (method === "animation.clip.inspect" || method === "animation.clip.sample") return new AnimationTools(this.inspector, this.materials).inspect(Json.object(args[0]));
    if (method === "ui.preflight" || method === "ui.preflight_update") {
      const rows = new UiDocumentModel().parse(Json.object(args[0]).document);
      for (const row of rows) for (const spec of (_e = row.node.components) != null ? _e : []) for (const [property, value] of Object.entries((_f = spec.properties) != null ? _f : {})) {
        if (value && typeof value === "object" && !Array.isArray(value) && typeof value.assetUuid === "string") {
          await this.materials.load(value.assetUuid, ["spriteFrame", "backgroundImage"].includes(property) ? "SpriteFrame" : spec.type === "cc.RichText" ? "TTFFont" : "Font");
        }
      }
    }
    return this.inspector.execute(method, args);
  }
  clear() {
    var _a;
    (_a = this.materials) == null ? void 0 : _a.dispose();
    this.materials = void 0;
    this.inspector = void 0;
  }
};
var lifecycle = new SceneLifecycle();
var methods = { dispatch: (method, args = []) => SceneResponse.capture(() => lifecycle.dispatch(method, args)) };
var load = () => lifecycle.clear();
var unload = () => lifecycle.clear();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  load,
  methods,
  unload
});
//# sourceMappingURL=scene.cjs.map

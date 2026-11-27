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
      optimizeNames(names, constants2) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants2);
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
      optimizeNames(names, constants2) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants2);
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
      optimizeNames(names, constants2) {
        this.code = optimizeExpr(this.code, names, constants2);
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
      optimizeNames(names, constants2) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants2))
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
      optimizeNames(names, constants2) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants2);
        if (!(super.optimizeNames(names, constants2) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants2);
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
      optimizeNames(names, constants2) {
        if (!super.optimizeNames(names, constants2))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants2);
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
      optimizeNames(names, constants2) {
        if (!super.optimizeNames(names, constants2))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants2);
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
      optimizeNames(names, constants2) {
        var _a, _b;
        super.optimizeNames(names, constants2);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants2);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants2);
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
    function optimizeExpr(expr, names, constants2) {
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
        const c = constants2[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants2[c.str] !== void 0);
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
      let _sch = resolve3.call(this, root, ref);
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
    function resolve3(root, ref) {
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
    function resolve3(baseURI, relativeURI, options) {
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
    function resolveComponent(base, relative7, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative7 = parse(serialize(relative7, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative7.scheme) {
        target.scheme = relative7.scheme;
        target.userinfo = relative7.userinfo;
        target.host = relative7.host;
        target.port = relative7.port;
        target.path = removeDotSegments(relative7.path || "");
        target.query = relative7.query;
      } else {
        if (relative7.userinfo !== void 0 || relative7.host !== void 0 || relative7.port !== void 0) {
          target.userinfo = relative7.userinfo;
          target.host = relative7.host;
          target.port = relative7.port;
          target.path = removeDotSegments(relative7.path || "");
          target.query = relative7.query;
        } else {
          if (!relative7.path) {
            target.path = base.path;
            if (relative7.query !== void 0) {
              target.query = relative7.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative7.path[0] === "/") {
              target.path = removeDotSegments(relative7.path);
            } else {
              if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                target.path = "/" + relative7.path;
              } else if (!base.path) {
                target.path = relative7.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative7.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative7.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative7.fragment;
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
      resolve: resolve3,
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
    var Ajv7 = class {
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
    Ajv7.ValidationError = validation_error_1.default;
    Ajv7.MissingRefError = ref_error_1.default;
    exports2.default = Ajv7;
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
    var Ajv7 = class extends core_1.default {
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
    exports2.Ajv = Ajv7;
    module2.exports = exports2 = Ajv7;
    module2.exports.Ajv = Ajv7;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = Ajv7;
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

// extensions/creator3/src/main.ts
var main_exports = {};
__export(main_exports, {
  load: () => load,
  methods: () => methods,
  unload: () => unload
});
module.exports = __toCommonJS(main_exports);
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/shared/panel-preferences.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_fs = require("fs");
var import_path = require("path");
var menuLabels = [
  { zh: "\u5173\u4E8E CocosMCP", en: "About CocosMCP", message: "about" },
  { zh: "\u6253\u5F00\u63A7\u5236\u4E2D\u5FC3", en: "Open Control Center", message: "open" },
  { zh: "\u68C0\u67E5\u66F4\u65B0", en: "Check for Updates", message: "check-updates" }
];
var PanelPreferences = class {
  constructor(project, major, editor, clipboard = () => require("electron").clipboard) {
    this.project = project;
    this.major = major;
    this.editor = editor;
    this.clipboard = clipboard;
  }
  project;
  major;
  editor;
  clipboard;
  locale;
  menuLocale = "zh";
  read() {
    if (this.locale) return this.locale;
    const file = (0, import_path.join)(this.project(), ".codex-work/cache/cocos-mcp/panel-preferences.json");
    const value = (0, import_fs.existsSync)(file) ? JSON.parse((0, import_fs.readFileSync)(file, "utf8")) : {};
    this.locale = value && typeof value === "object" && "locale" in value && value.locale === "en" ? "en" : "zh";
    return this.locale;
  }
  set(locale) {
    if (locale !== "zh" && locale !== "en") throw new Error("Unsupported panel language");
    const directory = (0, import_path.join)(this.project(), ".codex-work/cache/cocos-mcp");
    (0, import_fs.mkdirSync)(directory, { recursive: true });
    const file = (0, import_path.join)(directory, "panel-preferences.json");
    (0, import_fs.writeFileSync)(`${file}.pending`, JSON.stringify({ locale }), { mode: 384 });
    (0, import_fs.renameSync)(`${file}.pending`, file);
    this.locale = locale;
    this.applyMenu();
    return locale;
  }
  applyMenu(locale = this.read()) {
    if (locale === this.menuLocale) return;
    const menu = this.major === 3 ? this.editor.Menu : this.editor.MainMenu;
    if (!menu) throw new Error("Creator menu API is unavailable");
    for (const row of menuLabels) {
      if (this.major === 3) {
        const entry = { label: row[this.menuLocale], message: row.message, target: "cocos-mcp-creator3" };
        this.editor.Menu.remove("CocosMCP", entry);
        this.editor.Menu.add("CocosMCP", { ...entry, label: row[locale] });
      } else {
        this.editor.MainMenu.remove(`CocosMCP/${row[this.menuLocale]}`);
        this.editor.MainMenu.add("CocosMCP", { label: row[locale], message: `cocos-mcp-creator2:${row.message}` });
      }
    }
    menu.apply();
    this.menuLocale = locale;
  }
  restoreMenu() {
    this.applyMenu("zh");
  }
  copy(text) {
    if (typeof text !== "string" || !text.length || text.length > 1e7) throw new Error("Invalid clipboard text");
    this.clipboard().writeText(text);
  }
};

// extensions/shared/extension-update.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_fs3 = require("fs");
var import_path3 = require("path");
var import_child_process = require("child_process");

// packages/native-adapters/src/extension-health.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_fs2 = require("fs");
var import_path2 = require("path");
var import_crypto = require("crypto");

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

// packages/native-adapters/src/extension-health.ts
var ExtensionHealth = class {
  stamp(root, major) {
    return [root, (0, import_path2.join)(root, "dist"), ...extension_files_default[major].map((path) => (0, import_path2.join)(root, path))].map((path) => {
      try {
        const stat7 = (0, import_fs2.lstatSync)(path);
        return [path, stat7.ino, stat7.size, stat7.mtimeMs, stat7.ctimeMs, stat7.isSymbolicLink()];
      } catch {
        return [path, "unavailable"];
      }
    }).map((row) => JSON.stringify(row)).join("\n");
  }
  inspect(root, major, presentation = false) {
    var _a, _b;
    const rows = [];
    let manifest;
    try {
      manifest = JSON.parse(this.bytes(root, "package.json").toString());
    } catch {
    }
    for (const path of [...extension_files_default[major], ...presentation ? extension_files_default.presentation : []]) {
      try {
        const bytes = this.bytes(root, path);
        if (!bytes.length) throw new Error("empty-file");
        if (path === "package.json") {
          if (!manifest || manifest.name !== `cocos-mcp-creator${major}` || !manifest.version) throw new Error("invalid-extension-identity");
          rows.push({ path, status: "passed" });
          continue;
        }
        const sha256 = (0, import_crypto.createHash)("sha256").update(bytes).digest("hex"), expected = (_a = manifest == null ? void 0 : manifest.fileHashes) == null ? void 0 : _a[path];
        rows.push({
          path,
          sha256,
          status: expected === void 0 ? "unknown" : expected === sha256 ? "passed" : "failed",
          ...expected === void 0 ? { reason: "legacy-manifest-without-file-digest" } : expected !== sha256 ? { reason: "digest-mismatch" } : {}
        });
      } catch (error) {
        rows.push({ path, status: "failed", reason: (_b = error.code) != null ? _b : error instanceof Error ? error.message : "unreadable-file" });
      }
    }
    return { health: rows.some((row) => row.status === "failed") ? "degraded" : rows.some((row) => row.status === "unknown") ? "unknown" : "healthy", rows };
  }
  require(root, major) {
    const state = this.inspect(root, major);
    if (state.health === "degraded") throw new CocosError("VERIFICATION_FAILED", "Extension required files are missing, empty or inconsistent", { rows: state.rows });
    return state;
  }
  bytes(root, path) {
    let current = root;
    if (!(0, import_fs2.lstatSync)(current).isDirectory() || (0, import_fs2.lstatSync)(current).isSymbolicLink()) throw new Error("symlink-or-invalid-root");
    for (const part of path.split("/")) {
      current = (0, import_path2.join)(current, part);
      if ((0, import_fs2.lstatSync)(current).isSymbolicLink()) throw new Error("symlink-file");
    }
    if (!(0, import_fs2.lstatSync)(current).isFile()) throw new Error("not-a-regular-file");
    return (0, import_fs2.readFileSync)(current);
  }
};

// extensions/shared/extension-update.ts
var ExtensionUpdate = class {
  constructor(project, root, major) {
    this.project = project;
    this.root = root;
    this.major = major;
    this.running = this.manifest(root);
    this.installedSignature = JSON.stringify(this.currentHealth().rows);
  }
  project;
  root;
  major;
  running;
  pending;
  message = null;
  latestVersion;
  checking;
  nextCheck = 0;
  installedSignature = "";
  health = new ExtensionHealth();
  diskStamp = "";
  integrity;
  currentHealth() {
    const stamp = this.health.stamp(this.root, this.major);
    if (stamp !== this.diskStamp || !this.integrity) {
      this.integrity = this.health.inspect(this.root, this.major);
      this.diskStamp = stamp;
    }
    return this.integrity;
  }
  invoke(command) {
    const config = JSON.parse((0, import_fs3.readFileSync)((0, import_path3.join)(this.root, "service-config.json"), "utf8"));
    if (!config.nodeExecutable) throw new Error("\u5C1A\u672A\u914D\u7F6E Node.js\uFF0C\u8BF7\u91CD\u65B0\u5B89\u88C5\u6269\u5C55");
    const work = (0, import_path3.join)(this.project, ".codex-work");
    return new Promise((accept, reject) => (0, import_child_process.execFile)(config.nodeExecutable, [(0, import_path3.join)(this.root, "dist/update.mjs"), command, this.project, String(this.major)], {
      env: { ...process.env, TMPDIR: (0, import_path3.join)(work, "tmp"), TMP: (0, import_path3.join)(work, "tmp"), TEMP: (0, import_path3.join)(work, "tmp"), NODE_COMPILE_CACHE: (0, import_path3.join)(work, "cache/node"), XDG_CACHE_HOME: (0, import_path3.join)(work, "cache") },
      timeout: 12e4,
      maxBuffer: 1024 * 1024
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr.trim() || error.message));
        return;
      }
      try {
        accept(JSON.parse(stdout));
      } catch {
        reject(new Error("\u66F4\u65B0\u5668\u8FD4\u56DE\u65E0\u6548\u7248\u672C\u4FE1\u606F"));
      }
    }));
  }
  check(force = false) {
    if (this.checking || this.pending || !force && Date.now() < this.nextCheck) return;
    this.message = null;
    this.latestVersion = void 0;
    this.nextCheck = Date.now() + 5 * 60 * 1e3;
    this.checking = Promise.resolve().then(() => this.invoke("check")).then((result) => {
      this.latestVersion = result.version;
    }).catch((error) => {
      this.message = `\u68C0\u67E5\u66F4\u65B0\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`;
    }).finally(() => {
      this.checking = void 0;
    });
  }
  manifest(root) {
    return JSON.parse((0, import_fs3.readFileSync)((0, import_path3.join)(root, "package.json"), "utf8"));
  }
  snapshot() {
    var _a, _b, _c;
    let installed;
    try {
      installed = this.manifest(this.root);
    } catch {
      installed = { name: this.running.name, version: "", buildId: "" };
    }
    const integrity = this.currentHealth();
    return {
      version: this.running.version,
      buildId: (_a = this.running.buildId) != null ? _a : "",
      runningBuildId: (_b = this.running.buildId) != null ? _b : "",
      installedVersion: installed.version,
      installedBuildId: (_c = installed.buildId) != null ? _c : "",
      integrity,
      runtimeHandshake: "unknown",
      reloadRequired: installed.version !== this.running.version || installed.buildId !== this.running.buildId || JSON.stringify(integrity.rows) !== this.installedSignature,
      ...this.latestVersion ? { latestVersion: this.latestVersion } : {},
      checking: Boolean(this.checking),
      updating: Boolean(this.pending),
      message: this.message
    };
  }
  update() {
    if (this.pending) return this.pending;
    this.pending = this.install().catch((error) => {
      this.message = error instanceof Error ? error.message : String(error);
      throw error;
    }).finally(() => {
      this.pending = void 0;
    });
    return this.pending;
  }
  async install() {
    await this.checking;
    this.message = "\u6B63\u5728\u4ECE GitHub \u4E0B\u8F7D\u5E76\u5B89\u88C5\u6700\u65B0\u7248\u672C\u2026";
    const result = await this.invoke("install");
    this.latestVersion = result.version;
    this.message = this.snapshot().reloadRequired ? "\u65B0\u7248\u5DF2\u5B89\u88C5\uFF0C\u65E7\u7248\u672C\u5DF2\u5907\u4EFD\uFF1B\u8BF7\u91CD\u8F7D\u6269\u5C55\u540E\u91CD\u65B0\u542F\u52A8 MCP \u670D\u52A1" : "\u5DF2\u662F GitHub \u6700\u65B0\u7248\u672C";
  }
};

// extensions/shared/mcp-service.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_child_process2 = require("child_process");
var import_fs4 = require("fs");
var import_path4 = require("path");

// packages/application/src/paths.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises = require("fs/promises");
var import_node_path = require("path");
var ProjectPaths = class _ProjectPaths {
  constructor(root) {
    this.root = root;
  }
  root;
  static async open(root) {
    const actual = await (0, import_promises.realpath)(root);
    if (!(await (0, import_promises.lstat)(actual)).isDirectory()) throw new CocosError("INVALID_ARGUMENT", "Project path is not a directory");
    return new _ProjectPaths(actual);
  }
  contains(path) {
    const rel = (0, import_node_path.relative)(this.root, path);
    return rel === "" || !(0, import_node_path.isAbsolute)(rel) && rel !== ".." && !rel.startsWith(`..${import_node_path.sep}`);
  }
  async resolve(path) {
    const target = (0, import_node_path.resolve)(this.root, path);
    if (!this.contains(target)) throw new CocosError("PATH_OUTSIDE_PROJECT", "Path must remain inside the project");
    let ancestor = target;
    while (true) {
      try {
        const actual = await (0, import_promises.realpath)(ancestor);
        if (!this.contains(actual)) throw new CocosError("PATH_OUTSIDE_PROJECT", "Symbolic link escapes project");
        return target;
      } catch (error) {
        if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error;
        const parent = (0, import_node_path.dirname)(ancestor);
        if (parent === ancestor) throw error;
        ancestor = parent;
      }
    }
  }
  async work(directory, child = "") {
    const target = await this.resolve((0, import_node_path.join)(".codex-work", directory, child));
    await (0, import_promises.mkdir)(target, { recursive: true });
    return target;
  }
  async asset(url) {
    if (!url.startsWith("db://assets/") || url.includes("\\") || url.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "Expected db://assets/ URL");
    const suffix = url.slice("db://assets/".length);
    if (suffix.split("/").some((part) => part === ".." || part === ".")) throw new CocosError("PATH_OUTSIDE_PROJECT", "Asset URL contains traversal");
    return this.resolve((0, import_node_path.join)("assets", suffix));
  }
  environment() {
    const work = (0, import_node_path.join)(this.root, ".codex-work");
    return {
      ...process.env,
      TMPDIR: (0, import_node_path.join)(work, "tmp"),
      TMP: (0, import_node_path.join)(work, "tmp"),
      TEMP: (0, import_node_path.join)(work, "tmp"),
      XDG_CACHE_HOME: (0, import_node_path.join)(work, "cache"),
      XDG_CONFIG_HOME: (0, import_node_path.join)(work, "cache", "config"),
      XDG_DATA_HOME: (0, import_node_path.join)(work, "cache", "data"),
      XDG_STATE_HOME: (0, import_node_path.join)(work, "cache", "state"),
      NODE_COMPILE_CACHE: (0, import_node_path.join)(work, "cache", "node"),
      TZ: "UTC"
    };
  }
};

// packages/application/src/service-connections.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_http = require("http");
var import_node_crypto = require("crypto");
var import_promises2 = require("fs/promises");
var import_node_path2 = require("path");
var import_node_url = require("url");
var ServiceConnections = class {
  constructor(paths) {
    this.paths = paths;
    this.projectId = (0, import_node_crypto.createHash)("sha256").update(paths.root).digest("hex").slice(0, 24);
  }
  paths;
  projectId;
  async path(name) {
    return this.paths.resolve((0, import_node_path2.join)(".codex-work/cache/cocos-mcp", name));
  }
  async json(name) {
    const path = await this.path(name);
    try {
      const info = await (0, import_promises2.lstat)(path);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid MCP connection file", { name });
      return JSON.parse(await (0, import_promises2.readFile)(path, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async atomic(name, value) {
    const target = await this.path(name);
    try {
      const info = await (0, import_promises2.lstat)(target);
      if (info.isSymbolicLink() || !info.isFile()) throw new CocosError("VERIFICATION_FAILED", "Connection target must be a regular file", { name });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const directory = await this.paths.work("tmp", `mcp-connection-${(0, import_node_crypto.randomUUID)()}`), temporary = (0, import_node_path2.join)(directory, "connection.json");
    try {
      await (0, import_promises2.writeFile)(temporary, JSON.stringify(value, null, 2) + "\n", { flag: "wx", mode: 384 });
      await (0, import_promises2.rename)(temporary, target);
    } finally {
      await (0, import_promises2.unlink)(temporary).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
      await (0, import_promises2.rmdir)(directory);
    }
  }
  async port() {
    var _a, _b, _c;
    const value = await this.json("connection.json");
    if (!value) return 0;
    if (value.schemaVersion !== 1 || !Number.isInteger((_a = value.http) == null ? void 0 : _a.port) || Number((_b = value.http) == null ? void 0 : _b.port) < 0 || Number((_c = value.http) == null ? void 0 : _c.port) > 65535) throw new CocosError("VERIFICATION_FAILED", "Invalid saved MCP port");
    return Number(value.http.port);
  }
  async savePort(port) {
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new CocosError("INVALID_ARGUMENT", "MCP port must be an integer from 0 to 65535");
    await this.paths.work("cache", "cocos-mcp");
    await this.atomic("connection.json", { schemaVersion: 1, http: { port } });
  }
  async configurePort(port) {
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new CocosError("INVALID_ARGUMENT", "MCP port must be an integer from 0 to 65535");
    const lease = await this.claim("http", "extension");
    try {
      await this.savePort(port);
    } finally {
      await lease.close();
    }
  }
  async token(tokenFile = ".codex-work/cache/cocos-mcp/mcp-http-token", create = true) {
    const path = await this.paths.resolve(tokenFile);
    try {
      const info2 = await (0, import_promises2.lstat)(path);
      if (!info2.isFile() || info2.isSymbolicLink() || info2.size > 4096) throw new CocosError("VERIFICATION_FAILED", "Invalid MCP token file");
    } catch (error) {
      if (!create || error.code !== "ENOENT") throw error;
      try {
        await (0, import_promises2.writeFile)(path, (0, import_node_crypto.randomBytes)(32).toString("hex"), { flag: "wx", mode: 384 });
      } catch (failure) {
        if (failure.code !== "EEXIST") throw failure;
      }
    }
    const info = await (0, import_promises2.lstat)(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 4096) throw new CocosError("VERIFICATION_FAILED", "Invalid MCP token file");
    const token = (await (0, import_promises2.readFile)(path, "utf8")).trim();
    if (token.length < 32 || token.length > 4096 || /[\r\n]/.test(token)) throw new CocosError("VERIFICATION_FAILED", "Invalid MCP authentication token");
    return token;
  }
  alive(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch (error) {
      return error.code !== "ESRCH";
    }
  }
  descriptor(value) {
    var _a;
    const row = value;
    if (!row || row.schemaVersion !== 1 || row.projectPath !== this.paths.root || row.projectId !== this.projectId || !/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/.test((_a = row.serviceId) != null ? _a : "") || !Number.isInteger(row.pid) || row.pid < 1 || !["http", "stdio"].includes(row.transport) || !["client", "extension"].includes(row.owner) || !["starting", "running"].includes(row.status) || typeof row.tokenFile !== "string" || typeof row.startedAt !== "string" || !row.startedAt.endsWith("Z") || !Number.isFinite(Date.parse(row.startedAt)) || !this.local(row.identityEndpoint, "/identity") || (row.transport === "http" && row.status === "running" ? !this.local(row.endpoint, "/mcp") : row.endpoint !== null)) throw new CocosError("VERIFICATION_FAILED", "MCP service descriptor does not match this project");
    if (row.apiVersion !== void 0 && (!Number.isInteger(row.apiVersion) || row.apiVersion < 1) || row.mode !== void 0 && row.mode !== "shared" || row.mode === "shared" && (row.transport !== "http" || row.owner !== "client" || !this.local(row.clientControlEndpoint, "/clients") || new import_node_url.URL(row.clientControlEndpoint).origin !== new import_node_url.URL(row.identityEndpoint).origin) || row.mode === void 0 && row.clientControlEndpoint !== void 0) throw new CocosError("VERIFICATION_FAILED", "Invalid shared service descriptor");
    return row;
  }
  local(value, path) {
    try {
      const url = new import_node_url.URL(String(value));
      return url.protocol === "http:" && url.hostname === "127.0.0.1" && Boolean(url.port) && !url.username && !url.password && !url.search && !url.hash && url.pathname === path;
    } catch {
      return false;
    }
  }
  async active() {
    const value = await this.json("service.json");
    if (!value) return null;
    const row = this.descriptor(value);
    if (!this.alive(row.pid)) return null;
    try {
      const token = await this.token(row.tokenFile, false);
      const value2 = await new Promise((accept, reject) => {
        const call = (0, import_node_http.request)(row.identityEndpoint, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` } }, (response) => {
          const chunks = [];
          let size = 0;
          response.on("data", (chunk) => {
            size += chunk.length;
            if (size > 64 * 1024) call.destroy(new Error("Identity response too large"));
            else chunks.push(chunk);
          });
          response.on("error", reject);
          response.on("end", () => {
            try {
              if (response.statusCode !== 200) throw new Error("Identity denied");
              accept(JSON.parse(Buffer.concat(chunks).toString("utf8")));
            } catch (error) {
              reject(error);
            }
          });
        });
        const timeout = setTimeout(() => call.destroy(new Error("Identity timed out")), 1500);
        call.once("close", () => clearTimeout(timeout));
        call.once("error", reject);
        call.end("{}");
      });
      const actual = this.descriptor(value2);
      if (actual.serviceId === row.serviceId && actual.pid === row.pid && actual.identityEndpoint === row.identityEndpoint && actual.transport === row.transport && actual.owner === row.owner && actual.endpoint === row.endpoint && actual.status === row.status && actual.startedAt === row.startedAt && actual.tokenFile === row.tokenFile && actual.apiVersion === row.apiVersion && actual.mode === row.mode && actual.clientControlEndpoint === row.clientControlEndpoint) return actual;
    } catch {
    }
    throw new CocosError("RESOURCE_BUSY", "MCP service PID is alive but its authenticated identity is unavailable; retry after the owner recovers");
  }
  async clientStatus(descriptor) {
    var _a;
    if (descriptor.mode !== "shared" || ((_a = await this.active()) == null ? void 0 : _a.serviceId) !== descriptor.serviceId) throw new CocosError("CONTEXT_UNAVAILABLE", "Authenticated shared backend required");
    const token = await this.token(descriptor.tokenFile, false);
    return new Promise((accept, reject) => {
      const call = (0, import_node_http.request)(descriptor.clientControlEndpoint + "/status", { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` } }, (response) => {
        const chunks = [];
        let size = 0;
        response.on("data", (chunk) => {
          size += chunk.length;
          if (size > 16384) call.destroy(new Error("Client status response too large"));
          else chunks.push(chunk);
        });
        response.on("error", reject);
        response.on("end", () => {
          try {
            if (response.statusCode !== 200) throw new Error("Client status denied");
            accept(Json.object(JSON.parse(Buffer.concat(chunks).toString("utf8"))));
          } catch (error) {
            reject(error);
          }
        });
      });
      const timeout = setTimeout(() => call.destroy(new Error("Client status timed out")), 1500);
      call.once("close", () => clearTimeout(timeout));
      call.once("error", reject);
      call.end("{}");
    });
  }
  async claim(transport, owner, tokenFile, control) {
    await this.paths.work("cache", "cocos-mcp");
    const lease = new ServiceLease(this, transport, owner, tokenFile, control);
    const lock = await this.path("service.lock");
    try {
      await lease.startIdentity();
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          await (0, import_promises2.mkdir)(lock, { mode: 448 });
        } catch (error) {
          if (error.code !== "EEXIST") throw error;
          if ((await (0, import_promises2.lstat)(lock)).isSymbolicLink()) throw new CocosError("VERIFICATION_FAILED", "Service lock must not be a symbolic link");
          await this.recover(lock);
          continue;
        }
        lease.ownsLock = true;
        await this.atomic("service.lock/owner.json", lease.snapshot());
        await this.legacyGateway();
        await lease.publish(null, "starting");
        return lease;
      }
      throw new CocosError("RESOURCE_BUSY", "MCP service startup is already in progress");
    } catch (error) {
      await lease.close();
      throw error;
    }
  }
  async recover(lock) {
    var _a;
    const recovery = await this.path("service.lock/recovery");
    try {
      await (0, import_promises2.mkdir)(recovery);
    } catch (error) {
      if (["ENOENT", "EEXIST"].includes((_a = error.code) != null ? _a : "")) throw new CocosError("RESOURCE_BUSY", "MCP service startup/recovery is in progress");
      throw error;
    }
    let stale = false;
    try {
      const value = await this.json("service.lock/owner.json");
      if (!value) throw new CocosError("RESOURCE_BUSY", "MCP service startup lock is not ready");
      const owner = this.descriptor(value);
      if (this.alive(owner.pid)) {
        const active = await this.active();
        throw new CocosError("RESOURCE_BUSY", (active == null ? void 0 : active.owner) === "client" ? "\u6B64\u5DE5\u7A0B\u7684 MCP \u670D\u52A1\u7531 AI \u5BA2\u6237\u7AEF\u7BA1\u7406\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u8FDE\u63A5" : "\u6B64\u5DE5\u7A0B\u5DF2\u6709 MCP \u670D\u52A1\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u8FDE\u63A5");
      }
      await this.removeOwned("service.json", owner.serviceId);
      await this.removeOwned("service.lock/owner.json", owner.serviceId);
      stale = true;
    } finally {
      await (0, import_promises2.rmdir)(recovery);
    }
    if (stale) await (0, import_promises2.rmdir)(lock);
  }
  async legacyGateway() {
    for (const name of await (0, import_promises2.readdir)(await this.path(""))) {
      const match = /^runtime-(\d+)\.json$/.exec(name);
      if (match && Number(match[1]) > 0 && this.alive(Number(match[1]))) throw new CocosError("RESOURCE_BUSY", "\u6B64\u5DE5\u7A0B\u5DF2\u6709\u8FD0\u884C\u65F6\u7F51\u5173\uFF0C\u8BF7\u5148\u505C\u6B62\u5916\u90E8 MCP \u670D\u52A1\uFF0C\u907F\u514D\u91CD\u590D\u542F\u52A8");
    }
  }
  async removeOwned(name, serviceId) {
    const row = await this.json(name);
    if ((row == null ? void 0 : row.serviceId) === serviceId) await (0, import_promises2.unlink)(await this.path(name));
  }
  async release(serviceId) {
    await this.removeOwned("service.json", serviceId);
    const value = await this.json("service.lock/owner.json");
    if (!value || value.serviceId === serviceId) {
      if (value) await this.removeOwned("service.lock/owner.json", serviceId);
      await (0, import_promises2.rmdir)(await this.path("service.lock"));
    }
  }
};
var ServiceLease = class {
  constructor(connections, transport, owner, tokenFile = ".codex-work/cache/cocos-mcp/mcp-http-token", control) {
    this.connections = connections;
    this.control = control;
    this.tokenFile = tokenFile;
    this.descriptor = {
      schemaVersion: 1,
      projectId: connections.projectId,
      projectPath: connections.paths.root,
      serviceId: (0, import_node_crypto.randomUUID)(),
      pid: process.pid,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      transport,
      owner,
      status: "starting",
      endpoint: null,
      identityEndpoint: "",
      tokenFile,
      apiVersion: 1,
      ...control ? { mode: "shared" } : {}
    };
  }
  connections;
  control;
  ownsLock = false;
  tokenFile;
  server;
  descriptor;
  tokenValue = "";
  closed = false;
  snapshot() {
    return { ...this.descriptor };
  }
  token() {
    return this.tokenValue;
  }
  async startIdentity() {
    this.tokenValue = await this.connections.token(this.tokenFile);
    this.server = (0, import_node_http.createServer)((request3, response) => {
      var _a, _b, _c;
      const reply = (status, body) => {
        response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
        response.end(JSON.stringify(body));
      };
      try {
        const host = new import_node_url.URL(`http://${(_a = request3.headers.host) != null ? _a : ""}`).hostname;
        const origin = request3.headers.origin ? new import_node_url.URL(request3.headers.origin) : null;
        if (!["127.0.0.1", "localhost", "[::1]"].includes(host) || origin && (!["http:", "https:"].includes(origin.protocol) || !["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname))) {
          reply(403, { error: "Local connection required" });
          return;
        }
        if (request3.method !== "POST") {
          reply(405, { error: "Use POST" });
          return;
        }
        const actual = Buffer.from((_b = request3.headers.authorization) != null ? _b : ""), expected = Buffer.from(`Bearer ${this.tokenValue}`);
        if (actual.length !== expected.length || !(0, import_node_crypto.timingSafeEqual)(actual, expected)) {
          reply(401, { error: "Bearer token required" });
          return;
        }
        if (request3.url === "/identity") {
          reply(200, this.snapshot());
          request3.resume();
          return;
        }
        if (this.control && ["/clients/register", "/clients/heartbeat", "/clients/release", "/clients/status"].includes((_c = request3.url) != null ? _c : "")) {
          request3.setTimeout(3e3, () => request3.destroy());
          const type = request3.headers["content-type"];
          if (!(type == null ? void 0 : type.toLowerCase().startsWith("application/json"))) {
            reply(415, { error: "Use application/json" });
            request3.resume();
            return;
          }
          void (async () => {
            const chunks = [];
            let size = 0;
            for await (const chunk of request3) {
              const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
              size += bytes.length;
              if (size > 16 * 1024) throw new CocosError("INVALID_ARGUMENT", "Client control body exceeds 16 KB");
              chunks.push(bytes);
            }
            const body = Json.object(Json.value(JSON.parse(Buffer.concat(chunks).toString("utf8"))));
            reply(200, this.control.handle(request3.url, body));
          })().catch((error) => {
            const failure = CocosError.from(error);
            if (!response.destroyed) reply(failure.code === "UNAUTHORIZED" ? 401 : failure.code === "RESOURCE_BUSY" ? 409 : 400, { error: failure.toJSON() });
          });
          return;
        }
        reply(404, { error: "Unknown service control route" });
      } catch {
        reply(400, { error: "Invalid identity request" });
      }
      request3.resume();
    });
    const server = this.server;
    await new Promise((accept, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        server.off("error", reject);
        accept();
      });
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Service identity listener unavailable");
    this.descriptor.identityEndpoint = `http://127.0.0.1:${address.port}/identity`;
    if (this.control) this.descriptor.clientControlEndpoint = `http://127.0.0.1:${address.port}/clients`;
  }
  async publish(endpoint, status = "running") {
    this.descriptor.endpoint = endpoint;
    this.descriptor.status = status;
    await this.connections.atomic("service.json", this.snapshot());
  }
  async close() {
    var _a;
    if (this.closed) return;
    this.closed = true;
    try {
      if ((_a = this.server) == null ? void 0 : _a.listening) {
        this.server.closeAllConnections();
        await new Promise((accept, reject) => this.server.close((error) => error ? reject(error) : accept()));
      }
    } finally {
      if (this.ownsLock) await this.connections.release(this.descriptor.serviceId);
    }
  }
};

// packages/native-adapters/src/client-installation.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises5 = require("fs/promises");
var import_node_path4 = require("path");
var import_node_crypto3 = require("crypto");

// packages/application/src/client-policy.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises3 = require("fs/promises");
var import_node_path3 = require("path");
var ClientPolicies = class {
  parse(value) {
    const row = Json.object(Json.value(value));
    const known = /* @__PURE__ */ new Set(["schemaVersion", "allowedRoots", "autoStartBackend", "allowProjectCode", "clientHeartbeatSeconds", "clientLeaseTtlSeconds", "idleExitSeconds", "workspaceMappings"]);
    if (Object.keys(row).some((key) => !known.has(key)) || row.schemaVersion !== 1 || !Array.isArray(row.allowedRoots) || row.allowedRoots.length > 64 || row.allowedRoots.some((root) => typeof root !== "string" || !(0, import_node_path3.isAbsolute)(root) || root.length > 4096 || root.includes("\0"))) throw new CocosError("INVALID_ARGUMENT", "Invalid client policy / allowedRoots");
    for (const key of ["autoStartBackend", "allowProjectCode"]) if (typeof row[key] !== "boolean") throw new CocosError("INVALID_ARGUMENT", `Policy ${key} must be boolean`);
    const heartbeat = this.seconds(row, "clientHeartbeatSeconds", 1, 60), ttl = this.seconds(row, "clientLeaseTtlSeconds", 3, 600), idle = this.seconds(row, "idleExitSeconds", 1, 3600);
    if (ttl < heartbeat * 3) throw new CocosError("INVALID_ARGUMENT", "Client TTL must allow at least three heartbeats");
    const mappings = row.workspaceMappings;
    if (mappings !== void 0 && (!Array.isArray(mappings) || mappings.length > 64 || mappings.some((value2) => {
      const mapping = Json.object(value2);
      return Object.keys(mapping).sort().join("|") !== "projectPath|workspacePath" || ["workspacePath", "projectPath"].some((key) => typeof mapping[key] !== "string" || !(0, import_node_path3.isAbsolute)(mapping[key]) || mapping[key].length > 4096 || mapping[key].includes("\0"));
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
    const path = await installation.resolve("policy.json"), info = await (0, import_promises3.lstat)(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid client policy file");
    return this.parse(JSON.parse(await (0, import_promises3.readFile)(path, "utf8")));
  }
};

// packages/application/src/atomic-json.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto2 = require("crypto");
var import_promises4 = require("fs/promises");
var AtomicJson = class {
  async write(path, value, exclusive = false) {
    const temporary = `${path}.${(0, import_node_crypto2.randomUUID)()}.tmp`;
    try {
      const file = await (0, import_promises4.open)(temporary, "wx", 384);
      try {
        await file.writeFile(JSON.stringify(value, null, 2));
        await file.sync();
      } finally {
        await file.close();
      }
      if (exclusive) await (0, import_promises4.link)(temporary, path);
      else await (0, import_promises4.rename)(temporary, path);
    } catch (error) {
      if (exclusive && error.code === "EEXIST") throw new CocosError("OPERATION_CONFLICT", "Workflow ID already exists; query its status before recovery");
      throw error;
    } finally {
      await (0, import_promises4.unlink)(temporary).catch((error) => {
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
    const path = await paths.resolve(name), info = await (0, import_promises5.lstat)(path);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid client metadata");
    return Json.object(Json.value(JSON.parse(await (0, import_promises5.readFile)(path, "utf8"))));
  }
  async verify(root) {
    const paths = await ProjectPaths.open(root), value = await this.json(paths, "manifest.json");
    if (value.schemaVersion !== 1 || value.kind !== "cocos-unified-client" || value.apiVersion !== 1 || typeof value.version !== "string" || typeof value.buildId !== "string" || !/^[a-f\d]{16}$/.test(value.buildId) || typeof value.builtAt !== "string" || !value.builtAt.endsWith("Z") || !Number.isFinite(Date.parse(value.builtAt)) || typeof value.sourceFingerprint !== "string" || !/^[a-f\d]{64}$/.test(value.sourceFingerprint) || value.verificationReportSha256 !== null && (typeof value.verificationReportSha256 !== "string" || !/^[a-f\d]{64}$/.test(value.verificationReportSha256))) throw new CocosError("VERIFICATION_FAILED", "Invalid unified client manifest");
    const hashes = Json.object(value.fileHashes);
    const names = Object.keys(hashes), legacy = ["launcher.mjs", "router.mjs", "worker.mjs", "install.mjs", "LICENSE"];
    if (![clientFiles, legacy].some((expected) => [...expected].sort().join("|") === names.slice().sort().join("|"))) throw new CocosError("VERIFICATION_FAILED", "Unexpected client package files");
    let size = 0;
    for (const name of names) {
      const path = await paths.resolve(name), info = await (0, import_promises5.lstat)(path);
      size += info.size;
      if (!info.isFile() || info.isSymbolicLink() || !info.size || size > 40 * 1024 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid or oversized client file");
      if ((0, import_node_crypto3.createHash)("sha256").update(await (0, import_promises5.readFile)(path)).digest("hex") !== hashes[name]) throw new CocosError("VERIFICATION_FAILED", "Client file checksum mismatch", { name });
    }
    return value;
  }
  async installed(root, verify = true) {
    const paths = await ProjectPaths.open(root), row = await this.json(paths, "current.json");
    if (row.schemaVersion !== 1 || typeof row.buildId !== "string" || !/^[a-f\d]{16}$/.test(row.buildId) || row.versionPath !== `versions/${row.buildId}` || typeof row.workspaceRoot !== "string" || !(0, import_node_path4.isAbsolute)(row.workspaceRoot)) throw new CocosError("VERIFICATION_FAILED", "Invalid client version pointer");
    const version = await paths.resolve(String(row.versionPath));
    const manifest = verify ? await this.verify(version) : await this.json(await ProjectPaths.open(version), "manifest.json");
    if (manifest.buildId !== row.buildId) throw new CocosError("VERIFICATION_FAILED", "Client version pointer does not match manifest");
    return { current: row, manifest };
  }
  async configuration(root, nodeExecutable) {
    if (!(0, import_node_path4.isAbsolute)(nodeExecutable)) throw new CocosError("INVALID_ARGUMENT", "Node executable must be absolute");
    const { current, manifest } = await this.installed(root), installation = await ProjectPaths.open(root), workspace = await ProjectPaths.open(current.workspaceRoot);
    if (await workspace.resolve(".codex-work/artifacts/cocos-client") !== installation.root) throw new CocosError("VERIFICATION_FAILED", "Client workspace does not match installation");
    const launcher = await installation.resolve("launcher.mjs"), info = await (0, import_promises5.lstat)(launcher);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024 || (0, import_node_crypto3.createHash)("sha256").update(await (0, import_promises5.readFile)(launcher)).digest("hex") !== manifest.fileHashes["launcher.mjs"]) throw new CocosError("VERIFICATION_FAILED", "Client launcher checksum mismatch");
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
NODE_COMPILE_CACHE = ${q((0, import_node_path4.join)(cache, "node"))}
TZ = "UTC"
`;
  }
};

// packages/native-adapters/src/project-authorization.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises7 = require("fs/promises");
var import_node_crypto4 = require("crypto");
var import_node_path6 = require("path");

// packages/application/src/project-locator.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises6 = require("fs/promises");
var import_node_path5 = require("path");
var ProjectLocator = class {
  constructor(allowedRoots) {
    this.allowedRoots = allowedRoots;
  }
  allowedRoots;
  contains(root, path) {
    const suffix = (0, import_node_path5.relative)(root, path);
    return suffix === "" || !(0, import_node_path5.isAbsolute)(suffix) && suffix !== ".." && !suffix.startsWith(`..${import_node_path5.sep}`);
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
    if (!(0, import_node_path5.isAbsolute)(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "workspacePath must be an absolute directory path");
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
    if (!(0, import_node_path5.isAbsolute)(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "projectPath must be an absolute directory path");
    let paths = await ProjectPaths.open(input);
    const roots = (await Promise.all(this.allowedRoots.map((root) => this.available(root)))).filter((root) => root !== null);
    const permitted = roots.filter((root) => this.contains(root.root, paths.root)).sort((a, b) => b.root.length - a.root.length)[0];
    if (!permitted) throw new CocosError("PATH_OUTSIDE_PROJECT", "Project is outside the client allowedRoots");
    for (let depth = 0; depth < 64; depth++) {
      if (await this.major(paths)) return paths;
      const parent = (0, import_node_path5.dirname)(paths.root);
      if (parent === paths.root || !this.contains(permitted.root, parent)) break;
      paths = await ProjectPaths.open(parent);
    }
    throw new CocosError("INVALID_ARGUMENT", "No Creator 2/3 project metadata found within allowedRoots");
  }
  async metadata(paths, name) {
    try {
      const path = await paths.resolve(name), info = await (0, import_promises6.lstat)(path);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 1024 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid Creator project metadata");
      return Json.object(Json.value(JSON.parse(await (0, import_promises6.readFile)(path, "utf8"))));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async major(paths) {
    const modern = await this.metadata(paths, "package.json"), creator = modern == null ? void 0 : modern.creator;
    const version = creator && typeof creator === "object" && !Array.isArray(creator) ? creator.version : null;
    const legacy = await this.metadata(paths, "project.json");
    const major = typeof version === "string" && /^3\.\d+\.\d+(?:[-+].*)?$/.test(version) ? 3 : (legacy == null ? void 0 : legacy.engine) === "cocos-creator-js" && typeof legacy.version === "string" && /^2\.\d+\.\d+(?:[-+].*)?$/.test(legacy.version) ? 2 : null;
    if (!major) return null;
    try {
      return (await (0, import_promises6.lstat)(await paths.resolve("assets"))).isDirectory() ? major : null;
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
};

// packages/native-adapters/src/project-authorization.ts
var ProjectAuthorizations = class {
  constructor(installationRoot) {
    this.installationRoot = installationRoot;
  }
  installationRoot;
  contains(root, path) {
    const suffix = (0, import_node_path6.relative)(root, path);
    return suffix === "" || !(0, import_node_path6.isAbsolute)(suffix) && suffix !== ".." && !suffix.startsWith(`..${import_node_path6.sep}`);
  }
  async rows() {
    const installation = await ProjectPaths.open(this.installationRoot), path = await installation.resolve("authorized-projects.json");
    try {
      const info = await (0, import_promises7.lstat)(path);
      if (!info.isFile() || info.isSymbolicLink() || info.size > 1024 * 1024 || info.mode & 18 || process.getuid && info.uid !== process.getuid()) throw new Error("Untrusted authorization file");
      const document = Json.object(Json.value(JSON.parse(await (0, import_promises7.readFile)(path, "utf8"))));
      if (document.schemaVersion !== 1 || Object.keys(document).sort().join("|") !== "rows|schemaVersion" || !Array.isArray(document.rows) || document.rows.length > 1024) throw new Error("Invalid authorization document");
      const seen = /* @__PURE__ */ new Set();
      return document.rows.map((value) => {
        const row = Json.object(value);
        if (Object.keys(row).sort().join("|") !== "creatorMajor|manifestSha256|projectPath|state|updatedAt" || typeof row.projectPath !== "string" || !(0, import_node_path6.isAbsolute)(row.projectPath) || row.projectPath.length > 4096 || row.projectPath.includes("\0") || seen.has(row.projectPath) || row.creatorMajor !== 2 && row.creatorMajor !== 3 || typeof row.manifestSha256 !== "string" || !/^[a-f\d]{64}$/.test(row.manifestSha256) || row.state !== "authorized" && row.state !== "revoked" || typeof row.updatedAt !== "string" || !row.updatedAt.endsWith("Z") || !Number.isFinite(Date.parse(row.updatedAt))) throw new Error("Invalid project authorization");
        seen.add(row.projectPath);
        return row;
      });
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw new CocosError("VERIFICATION_FAILED", "Project authorization registry is invalid; inspect it before recovery");
    }
  }
  async identity(paths, major) {
    if (await new ProjectLocator([paths.root]).major(paths) !== major) throw new CocosError("INVALID_ARGUMENT", "Authorization requires a matching Creator project with assets");
    const extension = await paths.resolve(`${major === 2 ? "packages" : "extensions"}/cocos-mcp-creator${major}`);
    if (new ExtensionHealth().inspect(extension, major).health !== "healthy") throw new CocosError("VERIFICATION_FAILED", "Authorization requires a complete verified CocosMCP extension");
    return (0, import_node_crypto4.createHash)("sha256").update(await (0, import_promises7.readFile)((0, import_node_path6.join)(extension, "package.json"))).digest("hex");
  }
  async state(project) {
    const paths = await ProjectPaths.open(project), row = (await this.rows()).find((row2) => row2.projectPath === paths.root);
    if (!row) return "not-authorized";
    if (row.state === "authorized" && await this.identity(paths, row.creatorMajor) !== row.manifestSha256) throw new CocosError("VERIFICATION_FAILED", "Installed extension changed; authorize the verified installation again");
    return row.state;
  }
  async locate(input, allowedRoots) {
    if (!(0, import_node_path6.isAbsolute)(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "projectPath must be an absolute directory path");
    const paths = await ProjectPaths.open(input);
    const row = (await this.rows()).filter((row2) => this.contains(row2.projectPath, paths.root)).sort((a, b) => b.projectPath.length - a.projectPath.length)[0];
    if (row) {
      if (row.state === "revoked") throw new CocosError("PATH_OUTSIDE_PROJECT", "This project authorization was revoked");
      const project = await new ProjectLocator([row.projectPath]).locate(input);
      if (project.root !== row.projectPath) throw new CocosError("PATH_OUTSIDE_PROJECT", "Nested Creator projects require their own installation authorization");
      if (await this.identity(project, row.creatorMajor) !== row.manifestSha256) throw new CocosError("VERIFICATION_FAILED", "Installed extension changed; authorize the verified installation again");
      return project;
    }
    if (allowedRoots.length) return new ProjectLocator(allowedRoots).locate(input);
    throw new CocosError("PATH_OUTSIDE_PROJECT", "Project is not authorized; install the CocosMCP extension or authorize this project in its control center");
  }
  async workspace(input, allowedRoots, mappings = []) {
    if (!(0, import_node_path6.isAbsolute)(input) || input.length > 4096 || input.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "workspacePath must be an absolute directory path");
    const workspace = await ProjectPaths.open(input), rows = await this.rows(), locator = new ProjectLocator(allowedRoots);
    if (rows.some((row) => locator.contains(row.projectPath, workspace.root))) return this.locate(workspace.root, allowedRoots);
    const roots = (await Promise.all(allowedRoots.map((root) => locator.available(root)))).filter((root) => root !== null);
    const defaults = [];
    for (const mapping of mappings) {
      const source = await locator.available(mapping.workspacePath);
      if ((source == null ? void 0 : source.root) !== workspace.root) continue;
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
  async grant(project, major) {
    const paths = await ProjectPaths.open(project), manifestSha256 = await this.identity(paths, major);
    return this.update(paths.root, (previous) => (previous == null ? void 0 : previous.state) === "authorized" && previous.manifestSha256 === manifestSha256 && previous.creatorMajor === major ? previous : { projectPath: paths.root, creatorMajor: major, manifestSha256, state: "authorized", updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  }
  async revoke(project) {
    const paths = await ProjectPaths.open(project);
    return this.update(paths.root, (previous) => {
      if (!previous) throw new CocosError("NOT_FOUND", "This project has no installation authorization");
      return previous.state === "revoked" ? previous : { ...previous, state: "revoked", updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    });
  }
  async update(project, change) {
    const installation = await ProjectPaths.open(this.installationRoot), lock = await installation.resolve(".project-authorization-lock");
    let locked = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      try {
        await (0, import_promises7.mkdir)(lock, { mode: 448 });
        locked = true;
        break;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        await new Promise((resolve3) => setTimeout(resolve3, 10));
      }
    }
    if (!locked) throw new CocosError("RESOURCE_BUSY", "Project authorization is busy; inspect the authorization lock before recovery");
    const owner = (0, import_node_path6.join)(lock, "owner.json");
    try {
      await (0, import_promises7.writeFile)(owner, JSON.stringify({ pid: process.pid, startedAt: (/* @__PURE__ */ new Date()).toISOString() }), { flag: "wx", mode: 384 });
      const rows = await this.rows(), previous = rows.find((row) => row.projectPath === project), next = change(previous);
      if (next !== previous) {
        if (!previous && rows.length >= 1024) throw new CocosError("RESOURCE_BUSY", "Project authorization registry is full");
        const updated = [...rows.filter((row) => row.projectPath !== project), next].sort((a, b) => a.projectPath.localeCompare(b.projectPath));
        await new AtomicJson().write(await installation.resolve("authorized-projects.json"), Json.value({ schemaVersion: 1, rows: updated }));
      }
      return next;
    } finally {
      await (0, import_promises7.unlink)(owner).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
      await (0, import_promises7.rmdir)(lock);
    }
  }
};

// extensions/shared/mcp-service.ts
var McpService = class {
  constructor(project, extension) {
    this.project = project;
    this.extension = extension;
  }
  project;
  extension;
  child;
  pending;
  state = { status: "stopped", endpoint: null, error: null };
  snapshot() {
    return { ...this.state };
  }
  async connections() {
    return new ServiceConnections(await ProjectPaths.open(this.project));
  }
  async inspect() {
    try {
      const connections = await this.connections(), configuredPort = await connections.port(), active = await connections.active();
      if (active) this.state = {
        status: active.status,
        endpoint: active.endpoint,
        error: null,
        owner: active.owner,
        transport: active.transport,
        managed: Boolean(this.child && this.child.pid === active.pid),
        configuredPort,
        shared: active.mode === "shared"
      };
      else this.state = { ...this.child || this.state.status === "error" ? this.state : { status: "stopped", endpoint: null, error: null }, configuredPort };
      if ((active == null ? void 0 : active.mode) === "shared") {
        try {
          const status = await connections.clientStatus(active);
          if (typeof status.clients !== "number" || !Number.isInteger(status.clients) || status.clients < 0) throw new Error("\u5171\u4EAB\u8FDE\u63A5\u72B6\u6001\u65E0\u6548");
          this.state.clientCount = status.clients;
        } catch (error) {
          this.state.clientStatusError = error instanceof Error ? error.message : String(error);
        }
      }
    } catch (error) {
      this.state = { status: "error", endpoint: null, error: error instanceof Error ? error.message : String(error) };
    }
    try {
      const root = this.clientRoot(), { manifest } = await new ClientPackage().installed(root, false);
      this.state.unifiedClient = { installed: true, version: manifest.version, buildId: manifest.buildId };
      try {
        this.state.unifiedClient.authorization = await new ProjectAuthorizations(root).state(this.project);
      } catch (error) {
        this.state.unifiedClient.authorizationError = error instanceof Error ? error.message : String(error);
      }
    } catch (error) {
      this.state.unifiedClient = { installed: false, error: error instanceof Error ? error.message : String(error) };
    }
    return this.snapshot();
  }
  clientRoot() {
    const config = JSON.parse((0, import_fs4.readFileSync)((0, import_path4.join)(this.extension, "service-config.json"), "utf8"));
    if (!config.clientInstallation || !(0, import_path4.isAbsolute)(config.clientInstallation)) throw new Error("\u7EDF\u4E00\u5BA2\u6237\u7AEF\u672A\u5B89\u88C5\uFF0C\u8BF7\u8FD0\u884C pnpm client:install \u5E76\u66F4\u65B0\u6269\u5C55");
    return config.clientInstallation;
  }
  executable() {
    const config = JSON.parse((0, import_fs4.readFileSync)((0, import_path4.join)(this.extension, "service-config.json"), "utf8"));
    if (!config.nodeExecutable || !(0, import_path4.isAbsolute)(config.nodeExecutable) || !(0, import_fs4.existsSync)(config.nodeExecutable)) throw new Error("\u672A\u627E\u5230 Node.js\uFF0C\u8BF7\u4F7F\u7528 Node.js 24 \u6216\u66F4\u9AD8\u7248\u672C\u91CD\u65B0\u5B89\u88C5\u6269\u5C55");
    return config.nodeExecutable;
  }
  async authorizeProject() {
    const root = this.clientRoot();
    await new ClientPackage().installed(root);
    const paths = await ProjectPaths.open(this.project), major = await new ProjectLocator([paths.root]).major(paths);
    if (!major) throw new Error("\u6388\u6743\u9700\u8981\u6709\u6548\u7684 Creator \u5DE5\u7A0B");
    await new ProjectAuthorizations(root).grant(paths.root, major);
  }
  async revokeProject() {
    const root = this.clientRoot();
    await new ClientPackage().installed(root);
    await new ProjectAuthorizations(root).revoke(this.project);
  }
  async environment() {
    const paths = await ProjectPaths.open(this.project), temporary = await paths.work("tmp", `mcp-service-${process.pid}`);
    for (const directory of ["cache", "logs"]) await paths.work(directory);
    return { ...paths.environment(), TMPDIR: temporary, TMP: temporary, TEMP: temporary };
  }
  async configurePort(value) {
    if (typeof value !== "string" || !/^\d{1,5}$/.test(value) || Number(value) > 65535) throw new Error("\u7AEF\u53E3\u5FC5\u987B\u4E3A 0\uFF5E65535 \u7684\u6574\u6570");
    const environment = await this.environment();
    await new Promise((accept, reject) => {
      var _a;
      const child = (0, import_child_process2.spawn)(
        this.executable(),
        [(0, import_path4.join)(this.extension, "dist/service.mjs"), "--project", this.project, "--configure-port", value],
        { cwd: this.project, shell: false, stdio: ["ignore", "ignore", "pipe"], env: environment }
      );
      let details = "";
      (_a = child.stderr) == null ? void 0 : _a.on("data", (chunk) => {
        details = (details + String(chunk)).slice(-4e3);
      });
      const timeout = setTimeout(() => {
        child.kill();
        reject(new Error("\u7AEF\u53E3\u8BBE\u7F6E\u8D85\u65F6"));
      }, 15e3);
      child.once("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      child.once("exit", (code) => {
        clearTimeout(timeout);
        if (code === 0) accept();
        else reject(new Error(details || "\u7AEF\u53E3\u8BBE\u7F6E\u5931\u8D25"));
      });
    });
  }
  async configuration(mode) {
    if (mode === "unified") return new ClientPackage().configuration(this.clientRoot(), this.executable());
    if (mode === "stdio") {
      const entry = (0, import_path4.join)(this.extension, "dist/stdio.mjs");
      if (!(0, import_fs4.existsSync)(entry)) throw new Error("\u79BB\u7EBF stdio \u5165\u53E3\u672A\u5B89\u88C5\uFF0C\u8BF7\u66F4\u65B0\u6269\u5C55");
      const environment = await this.environment(), env = {};
      for (const key of ["TMPDIR", "TMP", "TEMP", "XDG_CACHE_HOME", "XDG_CONFIG_HOME", "XDG_DATA_HOME", "XDG_STATE_HOME", "NODE_COMPILE_CACHE", "TZ"]) env[key] = environment[key];
      return JSON.stringify({ mcpServers: { cocos: { command: this.executable(), args: [entry, "--project", this.project], env } } }, null, 2);
    }
    if (mode !== "http") throw new Error("\u4E0D\u652F\u6301\u7684\u63A5\u5165\u65B9\u5F0F");
    const connections = await this.connections(), service = await connections.active();
    if (!service || service.status !== "running" || service.transport !== "http" || !service.endpoint) throw new Error("\u8BF7\u5148\u542F\u52A8 HTTP MCP \u670D\u52A1");
    if (service.mode === "shared") throw new Error("\u5171\u4EAB\u540E\u7AEF\u7531\u7EDF\u4E00\u5BA2\u6237\u7AEF\u81EA\u52A8\u53D1\u73B0\uFF0C\u8BF7\u590D\u5236\u7EDF\u4E00 stdio \u914D\u7F6E");
    return JSON.stringify({ mcpServers: { cocos: { url: service.endpoint, headers: { Authorization: `Bearer ${await connections.token(service.tokenFile, false)}` } } } }, null, 2);
  }
  start() {
    if (this.pending) return this.pending;
    if (this.child) return Promise.resolve();
    this.pending = this.launch().catch((error) => {
      this.state = { status: "error", endpoint: null, error: error instanceof Error ? error.message : String(error) };
      throw error;
    }).finally(() => {
      this.pending = void 0;
    });
    return this.pending;
  }
  async launch() {
    var _a;
    const active = await (await this.connections()).active();
    if (active) {
      if (active.transport === "stdio") throw new Error("\u6B64\u5DE5\u7A0B\u7684 MCP \u670D\u52A1\u7531 AI \u5BA2\u6237\u7AEF\u7BA1\u7406\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u8FDE\u63A5");
      await this.inspect();
      return;
    }
    this.state = { status: "starting", endpoint: null, error: null, managed: true };
    const child = (0, import_child_process2.spawn)(this.executable(), [(0, import_path4.join)(this.extension, "dist/service.mjs"), "--project", this.project], {
      cwd: this.project,
      shell: false,
      stdio: ["ignore", "ignore", "pipe", "ipc"],
      env: await this.environment()
    });
    this.child = child;
    let details = "";
    (_a = child.stderr) == null ? void 0 : _a.on("data", (chunk) => {
      details = (details + String(chunk)).slice(-4e3);
    });
    await new Promise((accept, reject) => {
      const timeout = setTimeout(() => {
        child.kill();
        reject(new Error("MCP \u670D\u52A1\u542F\u52A8\u8D85\u65F6"));
      }, 15e3);
      child.once("error", (error) => {
        clearTimeout(timeout);
        this.child = void 0;
        reject(error);
      });
      child.once("exit", (code) => {
        clearTimeout(timeout);
        this.child = void 0;
        const error = `MCP \u670D\u52A1\u5DF2\u9000\u51FA (${code != null ? code : "signal"})${details ? ": " + details : ""}`;
        if (this.state.status !== "stopped") this.state = { status: "error", endpoint: null, error };
        reject(new Error(error));
      });
      child.on("message", (message) => {
        var _a2;
        const ready = message;
        if (ready.type !== "ready" || !/^http:\/\/127\.0\.0\.1:\d+\/mcp$/.test((_a2 = ready.endpoint) != null ? _a2 : "")) return;
        clearTimeout(timeout);
        this.state = { status: "running", endpoint: ready.endpoint, error: null, owner: "extension", transport: "http", managed: true };
        accept();
      });
    });
  }
  async stop() {
    var _a;
    await ((_a = this.pending) == null ? void 0 : _a.catch(() => {
    }));
    const child = this.child;
    if (!child) return;
    this.state = { status: "stopped", endpoint: null, error: null };
    await new Promise((accept) => {
      const timer = setTimeout(() => child.kill("SIGKILL"), 5e3);
      child.once("exit", () => {
        clearTimeout(timer);
        accept();
      });
      child.kill("SIGTERM");
    });
  }
};

// extensions/creator3/src/shader-host.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto2 = require("crypto");
var import_fs5 = require("fs");
var import_path5 = require("path");
var import_module = require("module");
var import_vm = require("vm");

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

// extensions/creator3/src/shader-host.ts
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
    return (0, import_crypto2.createHash)("sha256").update(source).digest("hex");
  }
  files(root, extension) {
    const rows = [];
    for (const entry of (0, import_fs5.readdirSync)(root, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;
      const path = (0, import_path5.join)(root, entry.name);
      if (entry.isDirectory()) rows.push(...this.files(path, extension));
      else if (entry.isFile() && entry.name.endsWith(extension)) rows.push(path);
    }
    return rows;
  }
  engineAssets() {
    return (0, import_path5.join)((0, import_path5.dirname)(this.appPath), "resources/3d/engine/editor/assets");
  }
  async execute(method, p) {
    if (this.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Native compiler is pinned to Creator 3.8.8");
    if (method === "templates") {
      const root = (0, import_path5.join)(this.engineAssets(), "effects");
      const files = this.files(root, ".effect");
      const rows = files.filter((path) => !p.name || (0, import_path5.relative)(root, path) === p.name).map((path) => ({
        name: (0, import_path5.relative)(root, path),
        editorVersion: this.version,
        sourceHash: this.hash((0, import_fs5.readFileSync)(path, "utf8")),
        ...p.name ? { content: (0, import_fs5.readFileSync)(path, "utf8") } : {},
        verification: "engine-builtin"
      }));
      if (p.name && !rows.length) throw new CocosError("NOT_FOUND", "Shader template not found");
      return { rows };
    }
    if (method !== "compile") throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown compiler host operation");
    const compilerPath = (0, import_path5.join)(this.appPath, "modules/engine-extensions/extensions/engine-extends/static/effect-compiler/shdc-lib.js");
    const factory = (0, import_vm.runInThisContext)(`(function(require,module,exports,__filename,__dirname){${(0, import_fs5.readFileSync)(compilerPath, "utf8")}
})`, { filename: compilerPath });
    const compilerModule = { exports: {} };
    factory((0, import_module.createRequire)(compilerPath), compilerModule, compilerModule.exports, compilerPath, (0, import_path5.dirname)(compilerPath));
    const compiler = compilerModule.exports;
    const chunks = /* @__PURE__ */ new Map();
    const dependencies = [];
    for (const root of [(0, import_path5.join)(this.engineAssets(), "chunks"), (0, import_path5.join)(this.projectPath, "assets")]) {
      for (const path of this.files(root, ".chunk")) {
        const name = (0, import_path5.relative)(root, path).split(import_path5.sep).join("/").replace(/\.chunk$/, "");
        if (chunks.has(name)) throw new CocosError("INVALID_ARGUMENT", `Ambiguous Chunk: ${name}`);
        chunks.set(name, path);
      }
    }
    compiler.options.chunkSearchFn = (names) => {
      var _a;
      const normalized = (_a = names.map((name) => name.replace(/\.chunk$/, "")).find((name) => chunks.has(name))) != null ? _a : names[0];
      const path = chunks.get(normalized);
      if (!path) return { name: normalized };
      const actual = (0, import_fs5.realpathSync)(path);
      const roots = [(0, import_fs5.realpathSync)(this.engineAssets()), (0, import_fs5.realpathSync)(this.projectPath)];
      if (!roots.some((root) => {
        const rel = (0, import_path5.relative)(root, actual);
        return !(0, import_path5.isAbsolute)(rel) && rel !== ".." && !rel.startsWith(`..${import_path5.sep}`);
      })) throw new CocosError("PATH_OUTSIDE_PROJECT", "Chunk escaped allowed roots");
      const content = (0, import_fs5.readFileSync)(actual, "utf8");
      dependencies.push({ name: normalized, path: actual, sourceHash: this.hash(content) });
      return { name: normalized, content };
    };
    compiler.options.throwOnWarning = true;
    compiler.options.noSource = false;
    try {
      const compiled = Json.object(Json.value(compiler.buildEffect((0, import_path5.basename)(String(p.url), ".effect"), Json.string(p.content, "content"))));
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

// extensions/creator3/src/main.ts
var import_crypto9 = require("crypto");

// extensions/creator3/src/preview.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/creator3/src/preview-capture.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/creator3/src/preview-observer.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PreviewObserver = class {
  source() {
    return `const key='__cocosMcpPreviewObservation';
      let state=globalThis[key];
      if(!state || state.director!==cc.director){
        state?.dispose();
        state={director:cc.director,scene:null,generation:0,frameIndex:0,sceneFrameIndex:0,lastFrameAt:null};
        state.sync=()=>{const scene=cc.director.getScene();if(scene!==state.scene){state.scene=scene;state.generation++;state.sceneFrameIndex=0;}};
        state.draw=()=>{state.sync();state.frameIndex++;state.sceneFrameIndex++;state.lastFrameAt=new Date().toISOString();};
        state.sync();
        cc.director.on(cc.Director.EVENT_AFTER_DRAW,state.draw);
        const launch=cc.Director.EVENT_AFTER_SCENE_LAUNCH;
        if(launch)cc.director.on(launch,state.sync);
        state.dispose=()=>{cc.director.off(cc.Director.EVENT_AFTER_DRAW,state.draw);if(launch)cc.director.off(launch,state.sync);delete globalThis[key];};
        globalThis[key]=state;
      }
      state.sync();
      const paused=target=>{try{return typeof target?.isPaused==='function'?target.isPaused():null;}catch{return null;}};
      const size=method=>{try{const value=cc.view?.[method]?.();return value?{width:value.width,height:value.height}:null;}catch{return null;}};
      const viewport=()=>{try{const r=cc.view?.getViewportRect?.();return r?{x:r.x,y:r.y,width:r.width,height:r.height}:null;}catch{return null;}};
      const scale=()=>{try{const x=cc.view?.getScaleX?.(),y=cc.view?.getScaleY?.();return x>0&&y>0?{x,y}:null;}catch{return null;}};
      const read=()=>{state.sync();const canvas=cc.game?.canvas;const rect=canvas?.getBoundingClientRect?.();return {
        ready:!!state.scene,sceneId:state.scene?.uuid??null,sceneGeneration:state.generation,runtimeInstanceId:globalThis.__cocosMcpDevelopmentConnection?.instanceId??null,
        frameIndex:state.frameIndex,sceneFrameIndex:state.sceneFrameIndex,lastFrameAt:state.lastFrameAt,gamePaused:paused(cc.game),directorPaused:paused(cc.director),
        visibility:typeof document==='undefined'?null:document.visibilityState,focused:typeof document==='undefined'?null:document.hasFocus(),
        canvasRect:rect?{x:rect.x,y:rect.y,width:rect.width,height:rect.height}:null,
        canvasPixelSize:canvas?{width:canvas.width,height:canvas.height}:null,
        designResolution:size('getDesignResolutionSize'),frameSize:size('getFrameSize'),
        engineViewportRect:viewport(),engineScale:scale(),
        devicePixelRatio:typeof devicePixelRatio==='number'?devicePixelRatio:null,
        resolutionPolicy:null
      };};`;
  }
};

// extensions/creator3/src/capture-evidence.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto3 = require("crypto");
var CaptureEvidence = class {
  summarize(image) {
    var _a;
    const dataUrl = image.toDataURL(), bytes = Buffer.from((_a = dataUrl.split(",")[1]) != null ? _a : "", "base64");
    const logicalSize = image.getSize();
    const png = bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const size = png ? { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) } : logicalSize;
    let pixelDiagnostic = { status: "unknown", reason: "bitmap-sampling-unavailable" };
    try {
      if (image.toBitmap) {
        const bitmap = image.toBitmap(), stride = Math.max(1, Math.floor(bitmap.length / 4 / 4096));
        let samples = 0, transparent = 0;
        const colors = /* @__PURE__ */ new Set();
        for (let i = 0; i + 3 < bitmap.length; i += stride * 4) {
          samples++;
          if (bitmap[i + 3] === 0) transparent++;
          colors.add(bitmap.subarray(i, i + 4).toString("hex"));
        }
        pixelDiagnostic = {
          status: samples ? "sampled" : "unknown",
          samples,
          uniqueColors: colors.size,
          allTransparent: samples > 0 && transparent === samples,
          monochrome: samples > 0 && colors.size === 1,
          interpretation: "Color sampling is diagnostic evidence; black or monochrome scenes may be valid"
        };
      }
    } catch {
      pixelDiagnostic = { status: "unknown", reason: "bitmap-sampling-failed" };
    }
    return {
      captureId: (0, import_crypto3.randomBytes)(16).toString("hex"),
      dataUrl,
      ...size,
      capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
      image: { mimeType: "image/png", ...size, dimensionsSource: png ? "png-header" : "native-image", logicalSize, byteLength: bytes.length, sha256: (0, import_crypto3.createHash)("sha256").update(bytes).digest("hex") },
      pixelDiagnostic
    };
  }
};

// extensions/creator3/src/preview-capture.ts
var ManagedPreviewCapture = class {
  constructor(host) {
    this.host = host;
  }
  host;
  latest;
  get last() {
    return this.latest;
  }
  reset() {
    this.latest = void 0;
  }
  async execute(window, params) {
    var _a, _b, _c, _d, _e;
    if (params.frameMode === "lastFrame") {
      const current2 = await this.host.inspect(window, params);
      if (!this.latest || this.latest.sceneGeneration !== current2.sceneGeneration) throw new CocosError("CONTEXT_UNAVAILABLE", "No captured frame exists in the current scene generation");
      return { ...this.latest, stale: true, freshness: "explicit-last-frame", imageDelivery: (_a = params.imageDelivery) != null ? _a : "image" };
    }
    const frame = await this.host.bounded(window.webContents.executeJavaScript(`(async () => {
      ${this.host.engineReadySource()}
      ${new PreviewObserver().source()}
      return new Promise(resolve => {
        const timer=setTimeout(() => {cc.director.off(cc.Director.EVENT_AFTER_DRAW, done);resolve({...read(),ready:false, reason:'frame-timeout'});},5000);
        function done(){clearTimeout(timer);resolve(read());}
        cc.director.once(cc.Director.EVENT_AFTER_DRAW,done);
      });
    })()`), 18e3);
    if (!frame || typeof frame !== "object" || frame.ready !== true) throw new CocosError("CONTEXT_UNAVAILABLE", "Preview has not rendered a game frame", frame);
    if (!this.host.current(window) || window.isDestroyed()) throw new CocosError("STALE_HANDLE", "Managed preview session changed during capture");
    const observed = this.host.observe(Json.object(frame), params);
    this.host.rendered();
    const image = await window.webContents.capturePage();
    const current = await this.host.inspect(window);
    if (current.sceneGeneration !== observed.sceneGeneration) throw new CocosError("STALE_HANDLE", "Scene changed during window capture; image discarded", { before: observed.sceneGeneration, after: current.sceneGeneration });
    if (image.isEmpty()) throw new CocosError("VERIFICATION_FAILED", "Preview capture returned an empty image");
    const capture = {
      ...new CaptureEvidence().summarize(image),
      ...observed,
      windowContentSize: (_c = (_b = window.getContentSize) == null ? void 0 : _b.call(window)) != null ? _c : null,
      stale: false,
      source: "managed-preview-window",
      imageDelivery: (_d = params.imageDelivery) != null ? _d : "image",
      frameBinding: "draw-observed-before-composite",
      frameIndexAfterCapture: (_e = current.frameIndex) != null ? _e : null,
      exactPixelFrameIndex: null,
      verification: "rendered-frame-captured",
      businessOutcomeVerified: false,
      layoutVerified: false,
      checks: [{ check: "image-nonempty", status: "passed" }, { check: "frame-drawn", status: "passed" }, { check: "expected-layout", status: "unknown" }],
      rows: this.host.diagnostics().slice(-50)
    };
    this.latest = capture;
    return capture;
  }
};

// extensions/shared/external-preview.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/shared/preview-diagnose.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PreviewDiagnosis = class {
  summarize(result, roles = []) {
    const assignments = /* @__PURE__ */ new Map();
    for (const role of roles) {
      const url = new URL(String(role.origin));
      if (url.origin !== role.origin || url.username || url.password || !["http:", "https:", "ws:", "wss:"].includes(url.protocol) || assignments.has(url.origin)) throw new CocosError("INVALID_ARGUMENT", "Connection roles require unique exact origins");
      assignments.set(url.origin, String(role.layer));
    }
    const rows = (Array.isArray(result.rows) ? result.rows : []).map((row) => {
      var _a;
      let connectionLayer = "unknown";
      try {
        connectionLayer = (_a = assignments.get(new URL(String(row.url)).origin)) != null ? _a : "unknown";
      } catch {
      }
      return { ...row, connectionLayer };
    });
    const findings = [];
    const evidence = (code, message, matching) => {
      if (matching.length) findings.push({ code, message, sequences: matching.map((row) => {
        var _a;
        return (_a = row.sequence) != null ? _a : null;
      }) });
    };
    evidence("HTTP_ERROR_STATUS", "\u89C2\u5BDF\u5230 HTTP \u9519\u8BEF\u72B6\u6001\u7801\uFF1B\u662F\u5426\u4E3A\u8EAB\u4EFD\u9A8C\u8BC1\u5931\u8D25\u987B\u7ED3\u5408\u4E1A\u52A1\u54CD\u5E94", rows.filter((row) => row.kind === "http-error"));
    evidence("CORS_BLOCKED", "\u6D4F\u89C8\u5668\u62A5\u544A CORS \u963B\u6B62\u54CD\u5E94\u8BFB\u53D6", rows.filter((row) => row.corsError));
    evidence("NETWORK_FAILURE", "\u6D4F\u89C8\u5668\u62A5\u544A\u8BF7\u6C42\u5931\u8D25\uFF1B\u4E0D\u80FD\u4EC5\u51ED ERR_FAILED \u5224\u65AD\u4E3A CORS", rows.filter((row) => row.kind === "network-failure" && !row.corsError));
    evidence("CONNECTION_REFUSED", "\u6D4F\u89C8\u5668\u62A5\u544A\u8FDE\u63A5\u88AB\u62D2\u7EDD\uFF1B\u68C0\u67E5\u5BF9\u5E94 URL \u7684\u76D1\u542C\u670D\u52A1\uFF0C\u4E0D\u63A8\u65AD\u4E1A\u52A1\u534F\u8BAE\u6210\u529F", rows.filter((row) => ["network-failure", "websocket-error"].includes(String(row.kind)) && String(row.message).includes("ERR_CONNECTION_REFUSED")));
    evidence("CLIENT_ERROR", "\u89C2\u5BDF\u5230\u5BA2\u6237\u7AEF\u9519\u8BEF\uFF1B\u662F\u5426\u6D89\u53CA\u54CD\u5E94\u89E3\u6790\u6216\u573A\u666F\u5207\u6362\u987B\u7ED3\u5408\u5806\u6808\u548C\u8FD0\u884C\u65F6\u72B6\u6001", rows.filter((row) => ["error", "unhandledrejection"].includes(String(row.kind)) || row.kind === "console" && row.level === "error"));
    evidence("WEBSOCKET_FAILURE", "\u89C2\u5BDF\u5230 WebSocket \u63E1\u624B\u6216\u5E27\u9519\u8BEF", rows.filter((row) => row.kind === "websocket-error" || row.kind === "websocket-handshake" && row.status !== 101));
    const connected = rows.filter((row) => row.kind === "websocket-handshake" && row.status === 101);
    for (const connection of connected) {
      const frames = rows.filter((row) => row.kind === "websocket-frame" && row.requestId === connection.requestId && row.frameType !== "control");
      const sent = frames.filter((row) => row.direction === "sent");
      if (sent.length && !frames.some((row) => row.direction === "received")) evidence("WEBSOCKET_NO_RESPONSE_OBSERVED", "\u8FDE\u63A5\u6210\u529F\u5E76\u53D1\u9001\u6570\u636E\u5E27\uFF0C\u4F46\u672C\u89C2\u5BDF\u533A\u95F4\u672A\u6536\u5230\u6570\u636E\u5E27\uFF1B\u4E0D\u80FD\u636E\u6B64\u65AD\u8A00\u534F\u8BAE\u4E0D\u517C\u5BB9", [connection, ...sent]);
    }
    if (!rows.some((row) => ["http-request", "http-response", "http-error", "websocket-frame"].includes(String(row.kind)))) findings.push({ code: "NO_REQUEST_OBSERVED", message: "\u672C\u89C2\u5BDF\u533A\u95F4\u672A\u6355\u6349\u5230\u8BF7\u6C42\uFF1B\u4E0D\u80FD\u8BC1\u660E\u70B9\u51FB\u672A\u53D1\u751F\u6216\u672A\u89E6\u53D1\u4E1A\u52A1\u884C\u4E3A" });
    const incomplete = result.hasMore === true || rows.some((row) => row.kind === "capture-gap") || Number(result.droppedBefore) > 0 || result.connection !== "connected";
    const layerEvidence = ["previewHttp", "runtimeGateway", "businessHttp", "businessWebsocket"].map((layer) => {
      const selected = rows.filter((row) => row.connectionLayer === layer);
      const failed = selected.some((row) => ["http-error", "network-failure", "websocket-error"].includes(String(row.kind)) || row.kind === "websocket-handshake" && row.status !== 101);
      const observed = selected.some((row) => row.kind === "http-response" || row.kind === "websocket-handshake" && row.status === 101);
      return { layer, status: failed ? "failed" : observed ? "passed" : "unknown", sequences: selected.map((row) => {
        var _a;
        return (_a = row.sequence) != null ? _a : null;
      }), proof: "browser-transport-events-only" };
    });
    return {
      ...result,
      rows,
      findings,
      layerEvidence,
      evidenceComplete: !incomplete,
      diagnosis: "evidence-only",
      applicationProtocol: "unknown",
      layers: { mcpService: "unknown", editorRpc: "unknown", businessOutcome: "unknown", ...Object.fromEntries(layerEvidence.map((row) => [row.layer, row.status])) },
      observedConnections: { httpResponse: rows.some((row) => ["http-response", "http-error"].includes(String(row.kind))), websocketHandshake: connected.length > 0 },
      limitations: ["\u65F6\u95F4\u5173\u8054\u4E0D\u8BC1\u660E\u4E1A\u52A1\u56E0\u679C\u5173\u7CFB", "\u5B8C\u6574\u65F6\u95F4\u7EBF\u9700\u8BFB\u53D6\u6240\u6709\u6E38\u6807\u5206\u9875\uFF1B\u672A\u6536\u5230\u5E27\u4E0D\u540C\u4E8E\u5E94\u7528\u5C42\u63E1\u624B\u8D85\u65F6", "URL \u672A\u58F0\u660E\u4E1A\u52A1\u7528\u9014\u65F6\u4E0D\u80FD\u533A\u5206\u9884\u89C8\u3001\u7F51\u5173\u4E0E\u4E1A\u52A1 HTTP\uFF1B\u672A\u6838\u67E5\u7684\u8FDE\u63A5\u5C42\u4FDD\u6301 unknown"]
    };
  }
};

// extensions/shared/external-preview.ts
var import_node_http2 = require("http");
var import_promises8 = require("fs/promises");
var import_node_crypto5 = require("crypto");

// extensions/shared/preview-redaction.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PreviewRedaction = class {
  sensitive = /pass(?:word|wd)?|pwd|token|authorization|cookie|secret|signature|api[-_]?key|session[-_]?id|credential|private[-_]?key/i;
  sensitiveKey(key, value) {
    return !(key === "passed" && typeof value === "boolean") && this.sensitive.test(key);
  }
  text(value, limit = 16384) {
    let text = String(value != null ? value : "").slice(0, limit + 1024);
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object") return JSON.stringify(this.value(parsed)).slice(0, limit);
    } catch {
    }
    text = text.replace(/\b(?:https?|wss?):\/\/[^\s<>"']+/gi, (raw) => this.url(raw));
    text = text.replace(/\b(Bearer|Basic)\s+[^\s,;"']+/gi, "$1 [REDACTED]");
    text = text.replace(/((?:["']?\b[\w.-]{0,64}(?:password|passwd|pwd|token|authorization|cookie|secret|signature|api[-_]?key|session[-_]?id|credential|private[-_]?key)[\w.-]{0,64}["']?)\s*[:=]\s*)(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[^\r\n,;&}]+)/gi, "$1[REDACTED]");
    text = text.replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "[REDACTED]");
    return text.slice(0, limit);
  }
  url(value) {
    try {
      const url = new URL(String(value));
      if (!["http:", "https:", "ws:", "wss:", "file:"].includes(url.protocol)) return `[${url.protocol}]`;
      url.username = "";
      url.password = "";
      url.search = "";
      url.hash = "";
      return url.href.slice(0, 2048);
    } catch {
      return "[invalid-url]";
    }
  }
  value(value, depth = 0) {
    if (depth > 12) return "[DEPTH-LIMIT]";
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value === "string") return this.text(value);
    if (Array.isArray(value)) return value.slice(0, 500).map((row) => this.value(row, depth + 1));
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).slice(0, 200).map(([key, content]) => [key, this.sensitiveKey(key, content) ? "[REDACTED]" : this.value(content, depth + 1)]));
    return null;
  }
};

// extensions/shared/external-preview.ts
var PreviewHttp = class {
  static local(raw) {
    const url = new URL(raw);
    if (url.protocol !== "http:" || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || url.username || url.password) throw new CocosError("UNAUTHORIZED", "Preview connection requires an unauthenticated loopback HTTP URL");
    return url;
  }
  static async send(url, body, token) {
    return new Promise((resolve3, reject) => {
      const bytes = body ? JSON.stringify(body) : void 0;
      const req = (0, import_node_http2.request)(url, { method: body ? "POST" : "GET", headers: { "User-Agent": "CocosMCP-preview-probe/1.0", ...bytes ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(bytes) } : {}, ...token ? { Authorization: `Bearer ${token}` } : {} } }, (response) => {
        const chunks = [];
        let length = 0;
        response.on("data", (chunk) => {
          length += chunk.length;
          if (length > 8 * 1024 * 1024) req.destroy(new Error("Response exceeds limit"));
          else chunks.push(chunk);
        });
        response.on("end", () => {
          var _a;
          return resolve3({ status: (_a = response.statusCode) != null ? _a : 0, content: Buffer.concat(chunks).toString("utf8") });
        });
        response.on("error", reject);
      });
      const timer = setTimeout(() => req.destroy(new CocosError("TIMEOUT", "Preview connection timed out")), 15e3);
      req.on("close", () => clearTimeout(timer));
      req.on("error", reject);
      req.end(bytes);
    });
  }
};
var ProjectBrowserConnector = class {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }
  projectPath;
  async call(method, params) {
    const paths = await ProjectPaths.open(this.projectPath);
    let config;
    try {
      config = Json.object(JSON.parse(await (0, import_promises8.readFile)(await paths.resolve(".codex-work/cache/cocos-mcp/browser-connector.json"), "utf8")));
    } catch (error) {
      if (error.code === "ENOENT") throw new CocosError("CONTEXT_UNAVAILABLE", "External browser connector is not configured");
      throw new CocosError("UNAUTHORIZED", "Invalid browser connector configuration");
    }
    if (config.protocolVersion !== 1 || config.projectPath !== paths.root || typeof config.token !== "string" || config.token.length < 32) throw new CocosError("UNAUTHORIZED", "Browser connector project identity or credential is invalid");
    const url = PreviewHttp.local(Json.string(config.endpoint, "endpoint"));
    if (url.search || url.hash) throw new CocosError("UNAUTHORIZED", "Connector endpoint must not contain query credentials");
    try {
      const result = await PreviewHttp.send(url, { protocolVersion: 1, projectPath: paths.root, method, params }, config.token);
      if (result.status !== 200) throw new Error("Connector rejected request");
      const response = Json.object(JSON.parse(result.content));
      if (response.protocolVersion !== 1 || response.projectPath !== paths.root) throw new Error("Connector identity mismatch");
      const data = Json.object(response.result);
      if (["capture", "resize", "input"].includes(method) && data.path !== void 0) {
        const path = Json.string(data.path, "screenshot path");
        if (!path.startsWith(".codex-work/")) throw new Error("Screenshot must remain in project work directory");
        const absolute = await paths.resolve(path), info = await (0, import_promises8.stat)(absolute);
        if (!info.isFile() || info.size < 24 || info.size > 32 * 1024 * 1024) throw new Error("Screenshot must be a bounded regular PNG");
        const bytes = await (0, import_promises8.readFile)(absolute);
        if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error("Screenshot must be PNG");
        data.dataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
        data.image = { mimeType: "image/png", byteLength: bytes.length, sha256: (0, import_node_crypto5.createHash)("sha256").update(bytes).digest("hex") };
        data.width = bytes.readUInt32BE(16);
        data.height = bytes.readUInt32BE(20);
        data.source = "scoped-browser-connector";
        data.captureId = (0, import_node_crypto5.randomBytes)(16).toString("hex");
        data.capturedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      return data;
    } catch {
      if (method === "input") throw new CocosError("OUTCOME_UNKNOWN", "External input response was lost; inspect page state before any retry", { inputSent: null });
      throw new CocosError("CONTEXT_UNAVAILABLE", "External browser connector disconnected or rejected the scoped request");
    }
  }
};
var ExternalPreview = class {
  constructor(browser, major = 3) {
    this.browser = browser;
    this.major = major;
  }
  browser;
  major;
  session;
  redact = new PreviewRedaction();
  async observe(method, params = {}) {
    var _a;
    const session = this.session;
    if (!session || !this.browser) throw new CocosError("CONTEXT_UNAVAILABLE", "External preview browser is not connected");
    const result = await this.browser.call(method, { ...params, sessionId: session.sessionId, url: session.url, sceneId: session.sceneId, tabId: session.tabId });
    if (result.sessionId !== session.sessionId || result.url !== session.url || typeof result.tabId !== "string" || session.tabId !== null && result.tabId !== session.tabId) throw new CocosError("STALE_HANDLE", "Browser session or preview page changed");
    if (result.connection !== "connected") throw new CocosError("CONTEXT_UNAVAILABLE", "External preview browser disconnected");
    if (params.expectedSceneId !== void 0 && params.expectedSceneId !== result.currentSceneId) throw new CocosError("VERIFICATION_FAILED", "External current scene differs from strict expectation", { actualSceneId: (_a = result.currentSceneId) != null ? _a : null, inputSent: false });
    if (params.expectedGeneration !== void 0 && params.expectedGeneration !== result.sceneGeneration) throw new CocosError("STALE_HANDLE", "External scene generation changed", { inputSent: false });
    if (params.expectedRuntimeInstanceId !== void 0 && params.expectedRuntimeInstanceId !== result.runtimeInstanceId) throw new CocosError("STALE_HANDLE", "External runtime identity changed", { inputSent: false });
    session.tabId = result.tabId;
    return result;
  }
  async execute(method, params) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (method === "start") {
      if (params.browser !== void 0 && params.browser !== "chrome") throw new CocosError("INVALID_ARGUMENT", "Only the Chrome connector contract is supported");
      const url = PreviewHttp.local(Json.string(params.url, "url"));
      url.searchParams.set("scene", Json.string(params.sceneId, "sceneId"));
      if (this.major === 3) url.searchParams.set("autoReload", "false");
      if (this.session && this.session.url !== url.href) throw new CocosError("RESOURCE_BUSY", "Stop the current external session before changing scenes");
      if ((_a = this.session) == null ? void 0 : _a.tabId) return this.execute("status", {});
      const probe = await PreviewHttp.send(url);
      if (probe.status < 200 || probe.status >= 300) throw new CocosError("CONTEXT_UNAVAILABLE", "Creator preview service is not ready", { status: probe.status });
      (_b = this.session) != null ? _b : this.session = { sessionId: (0, import_node_crypto5.randomBytes)(16).toString("hex"), url: url.href, sceneId: String(params.sceneId), tabId: null, owned: false };
      try {
        const observed2 = await this.observe("start", { browser: "chrome", reuseExisting: params.reuseExisting !== false, ownership: "close-only-created-tab" });
        this.session.owned = observed2.owned === true;
        return this.state(observed2);
      } catch (error) {
        if (CocosError.from(error).code !== "CONTEXT_UNAVAILABLE") throw error;
        return { ...this.state(), service: "ready", status: "service-ready", reason: CocosError.from(error).message };
      }
    }
    if (method === "status") {
      if (!this.session) return this.state();
      try {
        return this.state(await this.observe("status"));
      } catch (error) {
        return { ...this.state(), reason: CocosError.from(error).message };
      }
    }
    if (method === "stop") {
      const session = this.session;
      if (!session) return { stopped: true, target: "external-browser", closedTab: false };
      if (session.tabId) {
        await this.observe("status");
        await this.observe("stop", { closeTab: session.owned });
      }
      this.session = void 0;
      return { stopped: true, target: "external-browser", closedTab: session.owned, scope: "owned-tab-only" };
    }
    await this.observe("status", params);
    let observed;
    try {
      observed = await this.observe(method === "diagnose" ? "logs" : method, params);
    } catch (error) {
      if (method === "input") throw new CocosError("OUTCOME_UNKNOWN", "External input may have executed; inspect page before retrying", { inputSent: null, cause: CocosError.from(error).message });
      throw error;
    }
    if (["logs", "network", "websocket", "diagnose"].includes(method)) {
      const columns = /* @__PURE__ */ new Set(["sequence", "occurredAt", "kind", "level", "message", "stack", "url", "line", "column", "status", "method", "requestId", "direction", "frameType", "size", "closeCode", "durationMs", "corsError", "blockedReason", "connectionState", "truncated"]);
      const rows = Array.isArray(observed.rows) ? observed.rows.slice(0, Number((_c = params.limit) != null ? _c : 100)).map((row) => Object.fromEntries(Object.entries(Json.object(row)).filter(([key]) => columns.has(key)))) : [];
      const result2 = { sessionId: this.session.sessionId, connection: "connected", rows: this.redact.value(rows), nextCursor: (_d = observed.nextCursor) != null ? _d : 0, hasMore: (_e = observed.hasMore) != null ? _e : false, droppedBefore: (_f = observed.droppedBefore) != null ? _f : 0 };
      return method === "diagnose" ? new PreviewDiagnosis().summarize(result2, (_g = params.connectionRoles) != null ? _g : []) : result2;
    }
    const result = Json.object(this.redact.value(observed));
    for (const key of ["sessionId", "previewSessionId", "diagnosticSessionId", "runtimeInstanceId"]) if (typeof observed[key] === "string") result[key] = observed[key];
    if (typeof observed.dataUrl === "string" && /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(observed.dataUrl) && observed.dataUrl.length <= 48 * 1024 * 1024) result.dataUrl = observed.dataUrl;
    result.imageDelivery = (_h = params.imageDelivery) != null ? _h : "image";
    return result;
  }
  state(observed) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const sceneId = (_a = observed == null ? void 0 : observed.currentSceneId) != null ? _a : null;
    return {
      target: "external-browser",
      browser: "chrome",
      sessionId: (_c = (_b = this.session) == null ? void 0 : _b.sessionId) != null ? _c : null,
      previewSessionId: (_e = (_d = this.session) == null ? void 0 : _d.sessionId) != null ? _e : null,
      url: (_g = (_f = this.session) == null ? void 0 : _f.url) != null ? _g : null,
      launchSceneId: (_i = (_h = this.session) == null ? void 0 : _h.sceneId) != null ? _i : null,
      sceneId,
      currentSceneId: sceneId,
      sceneGeneration: (_j = observed == null ? void 0 : observed.sceneGeneration) != null ? _j : null,
      frameIndex: (_k = observed == null ? void 0 : observed.frameIndex) != null ? _k : null,
      runtimeInstanceId: (_l = observed == null ? void 0 : observed.runtimeInstanceId) != null ? _l : null,
      observation: (observed == null ? void 0 : observed.observation) ? this.redact.value(observed.observation) : {},
      tabId: (_n = (_m = this.session) == null ? void 0 : _m.tabId) != null ? _n : null,
      owned: (_p = (_o = this.session) == null ? void 0 : _o.owned) != null ? _p : false,
      connection: observed ? "connected" : "disconnected",
      status: (observed == null ? void 0 : observed.gameReady) === true ? "game-ready" : (observed == null ? void 0 : observed.pageOpened) === true ? "page-opened" : "unknown",
      service: observed ? "ready" : "unknown",
      running: (observed == null ? void 0 : observed.pageOpened) === true,
      pageReady: (observed == null ? void 0 : observed.pageOpened) === true,
      gameReady: (observed == null ? void 0 : observed.gameReady) === true
    };
  }
};

// extensions/shared/preview-refresh.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto6 = require("crypto");
var import_promises9 = require("fs/promises");
var PreviewRefresh = class {
  constructor(host) {
    this.host = host;
  }
  host;
  operations = /* @__PURE__ */ new Map();
  active;
  redact = new PreviewRedaction();
  async execute(method, params) {
    var _a, _b, _c;
    if (method !== "refresh") {
      const operation2 = this.operations.get(Json.string(params.operationId, "operationId"));
      if (!operation2) throw new CocosError("NOT_FOUND", "Refresh operation not found in this editor instance");
      if (method === "refresh.cancel" && operation2.pending) {
        operation2.cancelled = true;
        operation2.state.status = "cancelled";
        operation2.state.reason = "Cancellation requested; an in-flight native import may still finish";
      }
      return Json.value(operation2.state);
    }
    if ((_a = this.active) == null ? void 0 : _a.pending) throw new CocosError("RESOURCE_BUSY", "A native refresh is still in flight; inspect its operation before retrying");
    if (!Array.isArray(params.urls) || !params.urls.length || params.urls.length > 100 || params.urls.some((url) => typeof url !== "string")) throw new CocosError("INVALID_ARGUMENT", "Expected 1..100 asset URLs");
    const timeout = Number((_b = params.timeoutMs) != null ? _b : 3e4);
    if (!Number.isInteger(timeout) || timeout < 100 || timeout > 12e4) throw new CocosError("INVALID_ARGUMENT", "Refresh timeout must be 100..120000 ms");
    const paths = await ProjectPaths.open(this.host.projectPath);
    for (const url of params.urls) await paths.asset(String(url));
    const operationId = (0, import_node_crypto6.randomBytes)(16).toString("hex");
    const state = { operationId, binding: (_c = params.binding) != null ? _c : null, status: "pending", nativePending: true, phase: "import", import: { status: "pending" }, compile: { status: "pending", errors: [] }, preview: { status: "unknown", expectedRevision: null, loadedRevision: null, revisionMatched: null }, startedAt: (/* @__PURE__ */ new Date()).toISOString() };
    const operation = { state, cancelled: false, pending: true, done: Promise.resolve() };
    if (this.operations.size >= 100) this.operations.delete(this.operations.keys().next().value);
    this.operations.set(operationId, operation);
    this.active = operation;
    const timer = setTimeout(() => {
      if (operation.cancelled) return;
      operation.cancelled = true;
      state.status = "timeout";
      state.reason = `Timed out during ${String(state.phase)}; in-flight native work may still finish`;
    }, timeout);
    operation.done = this.run(operation, [...new Set(params.urls)], params.reload !== false, paths).catch((error) => {
      if (!operation.cancelled) {
        state.status = "failed";
        state.error = this.redact.value(CocosError.from(error).toJSON());
        const phase = String(state.phase);
        state[phase] = { ...Json.object(state[phase]), status: "failed", error: state.error };
      }
    }).finally(() => {
      clearTimeout(timer);
      operation.pending = false;
      state.nativePending = false;
      state.finishedAt = (/* @__PURE__ */ new Date()).toISOString();
    });
    return Json.value(state);
  }
  async fingerprint(paths, urls) {
    const rows = [];
    for (const url of [...urls].sort()) {
      const path = await paths.asset(url), info = await (0, import_promises9.stat)(path);
      if (!info.isFile() || info.size > 16 * 1024 * 1024) throw new CocosError("INVALID_ARGUMENT", "Revision tracking requires regular assets no larger than 16 MiB", { url });
      rows.push({ url, sha256: (0, import_node_crypto6.createHash)("sha256").update(await (0, import_promises9.readFile)(path)).digest("hex") });
    }
    return rows;
  }
  async run(operation, urls, reload, paths) {
    var _a, _b;
    const state = operation.state, check = () => !operation.cancelled;
    const before = await this.fingerprint(paths, urls), imported = [];
    for (const url of urls) {
      if (!check()) return;
      try {
        await this.host.importResource(url);
      } catch (error) {
        state.import = { status: "failed", rows: imported, url, error: this.redact.value(CocosError.from(error).toJSON()) };
        throw error;
      }
      if (!check()) return;
      imported.push({ url, status: "completed", signal: "asset-db-callback" });
      state.import = { status: "running", rows: [...imported] };
    }
    const after = await this.fingerprint(paths, urls);
    if (!check()) return;
    if (Json.canonical(before) !== Json.canonical(after)) throw new CocosError("STALE_REVISION", "Assets changed while importing; no browser reload was issued");
    const revision = (0, import_node_crypto6.createHash)("sha256").update(Json.canonical(after)).digest("hex");
    state.import = { status: "completed", rows: imported, revision, sources: after };
    state.phase = "compile";
    if (!this.host.compile) {
      state.compile = { status: "unknown", errors: [], reason: "Native compiler completion adapter unavailable; import completion is not compilation proof" };
      state.status = "unknown";
      return;
    }
    const compile = await this.host.compile({ operationId: state.operationId, sourceRevision: revision, rows: after }, () => operation.cancelled);
    if (!check()) return;
    if (Json.canonical(after) !== Json.canonical(await this.fingerprint(paths, urls))) throw new CocosError("STALE_REVISION", "Assets changed while compiling; no preview reload was issued");
    state.compile = this.redact.value(compile);
    if (compile.status === "failed" || Array.isArray(compile.errors) && compile.errors.length) {
      state.status = "failed";
      return;
    }
    if (compile.status !== "completed" || compile.sourceRevision !== revision || !Array.isArray(compile.artifacts) || !compile.artifacts.length) {
      state.status = "unknown";
      return;
    }
    const artifacts = compile.artifacts.map((row) => Json.object(row));
    if (artifacts.some((row) => typeof row.url !== "string" || typeof row.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(row.sha256)) || new Set(artifacts.map((row) => row.url)).size !== artifacts.length) throw new CocosError("VERIFICATION_FAILED", "Compiler returned an invalid artifact manifest");
    const expectedRevision = (0, import_node_crypto6.createHash)("sha256").update(Json.canonical([...artifacts].sort((a, b) => String(a.url).localeCompare(String(b.url))))).digest("hex");
    state.preview = { status: "unknown", expectedRevision, loadedRevision: null, revisionMatched: null };
    if (!reload || !this.host.reload) {
      state.status = "unknown";
      return;
    }
    state.phase = "preview";
    let loaded;
    try {
      loaded = await this.host.reload({ artifacts, binding: state.binding, expectedRevision, sourceRevision: revision, operationId: state.operationId });
    } catch (error) {
      if (!check()) return;
      const failure = CocosError.from(error);
      if (!["CONTEXT_UNAVAILABLE", "OUTCOME_UNKNOWN", "TIMEOUT"].includes(failure.code)) throw error;
      state.preview = { ...Json.object(state.preview), reason: this.redact.text(failure.message), connection: "disconnected" };
      state.status = "unknown";
      return;
    }
    if (!check()) return;
    if (Json.canonical(after) !== Json.canonical(await this.fingerprint(paths, urls))) throw new CocosError("STALE_REVISION", "Assets changed during preview reload");
    if (!["loaded-script-bytes", "loaded-artifact-bytes"].includes(String(loaded.evidence)) || !loaded.navigationId || !Array.isArray(loaded.artifacts)) {
      state.status = "unknown";
      return;
    }
    const actual = loaded.artifacts.map((row) => Json.object(row));
    const selected = artifacts.map((expected) => actual.find((row) => row.url === expected.url || loaded.url && row.url === new URL(String(expected.url), String(loaded.url)).href));
    if (selected.some((row) => !row)) {
      state.preview = {
        ...Json.object(state.preview),
        reason: "Actual loaded bytes were not observed for every artifact",
        expectedArtifacts: artifacts,
        observedArtifacts: actual,
        navigationId: loaded.navigationId,
        gameReady: (_a = loaded.gameReady) != null ? _a : null
      };
      state.status = "unknown";
      return;
    }
    const matched = selected.every((row, index) => (row == null ? void 0 : row.sha256) === artifacts[index].sha256 && (artifacts[index].kind !== "resource" || (row == null ? void 0 : row.kind) === "resource"));
    state.preview = { status: matched && loaded.gameReady === true ? "ready" : "unknown", expectedRevision, loadedRevision: matched ? expectedRevision : null, revisionMatched: matched, navigationId: loaded.navigationId, url: (_b = loaded.url) != null ? _b : null };
    state.status = matched && loaded.gameReady === true ? "completed" : "failed";
  }
  dispose() {
    var _a;
    if ((_a = this.active) == null ? void 0 : _a.pending) {
      this.active.cancelled = true;
      this.active.state.status = "cancelled";
    }
  }
};

// extensions/creator3/src/preview-diagnostics.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto8 = require("crypto");
var import_promises11 = require("fs/promises");

// packages/native-adapters/src/atomic-json.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises10 = require("fs/promises");
var import_node_crypto7 = require("crypto");
var AtomicJsonFile = class {
  pending = /* @__PURE__ */ new Map();
  async write(path, value) {
    var _a;
    const content = JSON.stringify(value, null, 2);
    const previous = (_a = this.pending.get(path)) != null ? _a : Promise.resolve();
    const next = previous.catch(() => {
    }).then(async () => {
      const temporary = `${path}.${(0, import_node_crypto7.randomBytes)(16).toString("hex")}.writing`;
      try {
        const file = await (0, import_promises10.open)(temporary, "wx", 384);
        try {
          await file.writeFile(content);
          await file.sync();
        } finally {
          await file.close();
        }
        await (0, import_promises10.rename)(temporary, path);
      } finally {
        await (0, import_promises10.unlink)(temporary).catch((error) => {
          if (error.code !== "ENOENT") throw error;
        });
      }
    });
    this.pending.set(path, next);
    try {
      await next;
    } finally {
      if (this.pending.get(path) === next) this.pending.delete(path);
    }
  }
};

// extensions/creator3/src/preview-diagnostics.ts
var PreviewDiagnostics = class {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }
  projectPath;
  sessionId = (0, import_node_crypto8.randomBytes)(16).toString("hex");
  rows = [];
  sequence = 0;
  bytes = 0;
  timer;
  pending = Promise.resolve();
  persistenceError = null;
  writer = new AtomicJsonFile();
  debugger;
  owned = false;
  sourceId;
  binding = `__cocos_diag_${this.sessionId}`;
  requests = /* @__PURE__ */ new Map();
  sockets = /* @__PURE__ */ new Map();
  contexts = /* @__PURE__ */ new Map();
  redaction = new PreviewRedaction();
  revisionSession;
  async beginRevision(artifacts, origin) {
    var _a;
    const navigationId = (0, import_node_crypto8.randomBytes)(16).toString("hex");
    const urls = new Set(artifacts.map((row) => {
      const url = new URL(String(row.url), origin);
      if (url.origin !== origin || url.username || url.password || url.hash) throw new CocosError("UNAUTHORIZED", "Compiled script must belong to the managed preview origin");
      return url.href;
    }));
    const resources = new Set(artifacts.filter((row) => row.kind === "resource").map((row) => new URL(String(row.url), origin).href));
    const nativeFiles = new Map(artifacts.filter((row) => row.kind === "resource" && typeof row.nativeFile === "string" && /^[a-f0-9-]{32,36}(?:@[a-zA-Z0-9_-]+)?\.[a-zA-Z0-9]+$/.test(row.nativeFile)).map((row) => [String(row.nativeFile), new URL(String(row.url), origin).href]));
    const sourceMaps = new Map(artifacts.filter((row) => typeof row.sourceMapSha256 === "string" && /^[a-f0-9]{64}$/.test(row.sourceMapSha256)).map((row) => [String(row.sourceMapSha256), new URL(String(row.url), origin).href]));
    this.revisionSession = { navigationId, origin, loaderId: null, frameId: null, urls, resources, nativeFiles, sourceMaps, artifacts: /* @__PURE__ */ new Map(), pending: /* @__PURE__ */ new Set() };
    if (this.owned && ((_a = this.debugger) == null ? void 0 : _a.isAttached())) {
      await this.debugger.sendCommand("Network.setCacheDisabled", { cacheDisabled: true });
      await this.debugger.sendCommand("Debugger.enable");
    }
    return navigationId;
  }
  async revision(navigationId) {
    const state = this.revisionSession;
    if (!state || state.navigationId !== navigationId) throw new CocosError("STALE_HANDLE", "Script observation navigation changed");
    await Promise.all(state.pending);
    return { evidence: state.resources.size ? "loaded-artifact-bytes" : "loaded-script-bytes", navigationId: state.loaderId, artifacts: [...state.artifacts.values()] };
  }
  endRevision() {
    var _a;
    this.revisionSession = void 0;
    if (this.owned && ((_a = this.debugger) == null ? void 0 : _a.isAttached())) void this.debugger.sendCommand("Network.setCacheDisabled", { cacheDisabled: false }).catch(() => {
    });
  }
  sceneOverride;
  async prepareScene(snapshot, origin) {
    var _a;
    if (!this.owned || !((_a = this.debugger) == null ? void 0 : _a.isAttached())) throw new CocosError("UNSUPPORTED_CAPABILITY", "Owned native scene interception is unavailable");
    if (Buffer.byteLength(snapshot.data) > 16 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Native scene snapshot exceeds limit");
    JSON.parse(snapshot.data);
    this.sceneOverride = { url: new URL("/preview-scene.json", origin).href, bytes: Buffer.from(snapshot.data).toString("base64") };
    await this.debugger.sendCommand("Fetch.enable", { patterns: [{ urlPattern: `${this.sceneOverride.url}*`, requestStage: "Request" }] });
  }
  async scriptSource(debuggerApi, scriptId) {
    let timer;
    try {
      return await Promise.race([debuggerApi.sendCommand("Debugger.getScriptSource", { scriptId }), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new CocosError("TIMEOUT", "Loaded script byte observation timed out")), 5e3);
      })]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  async responseBytes(debuggerApi, requestId) {
    let timer;
    try {
      const response = await Promise.race([debuggerApi.sendCommand("Network.getResponseBody", { requestId }), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new CocosError("TIMEOUT", "Artifact byte observation timed out")), 5e3);
      })]);
      if (typeof response.body !== "string" || response.body.length > 24 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Artifact response exceeds limit");
      const bytes = Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8");
      if (bytes.length > 16 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Artifact response exceeds limit");
      return bytes;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  text(value, size) {
    return this.redaction.text(value, size);
  }
  url(value) {
    return value ? this.redaction.url(value) : "";
  }
  record(value) {
    var _a, _b, _c, _d, _e;
    const message = this.text(value.message, 16384), stack = this.text(value.stack, 65536);
    const row = {
      sequence: ++this.sequence,
      occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
      kind: this.text(value.kind, 64),
      level: ["debug", "info", "warning", "error"].includes(String(value.level)) ? value.level : "error",
      message,
      stack,
      url: this.url((_a = value.url) != null ? _a : ""),
      line: typeof value.line === "number" ? value.line : null,
      column: typeof value.column === "number" ? value.column : null,
      status: typeof value.status === "number" ? value.status : null,
      method: this.text(value.method, 16),
      truncated: String((_b = value.message) != null ? _b : "").length > message.length || String((_c = value.stack) != null ? _c : "").length > stack.length
    };
    row.diagnosticSessionId = this.sessionId;
    for (const key of ["requestId", "requestStartedAt", "direction", "frameType", "size", "closeCode", "durationMs", "corsError", "blockedReason", "connectionState"]) {
      if (value[key] !== void 0) row[key] = this.redaction.value(value[key]);
    }
    this.rows.push(row);
    this.bytes += JSON.stringify(row).length;
    while (this.rows.length > 2e3 || this.bytes > 8 * 1024 * 1024) this.bytes -= JSON.stringify(this.rows.shift()).length;
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = void 0;
        void this.flush();
      }, 100);
      (_e = (_d = this.timer).unref) == null ? void 0 : _e.call(_d);
    }
  }
  async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
    if (!this.projectPath) return;
    const snapshot = { sessionId: this.sessionId, sequence: this.sequence, rows: [...this.rows] };
    this.pending = this.pending.then(async () => {
      const paths = await ProjectPaths.open(this.projectPath);
      const dir = await paths.work("logs", "web-preview");
      await this.writer.write(await paths.resolve(`${dir}/${this.sessionId}.json`), snapshot);
      this.persistenceError = null;
    }).catch((error) => {
      this.persistenceError = CocosError.from(error).message;
    });
    await this.pending;
  }
  async query(p) {
    var _a, _b, _c, _d;
    await this.flush();
    const sessionId = (_a = p.sessionId) != null ? _a : this.sessionId;
    if (typeof sessionId !== "string" || !/^[a-f0-9]{32}$/.test(sessionId)) throw new CocosError("INVALID_ARGUMENT", "Invalid diagnostic session ID");
    let rows = this.rows, sequence = this.sequence;
    if (sessionId !== this.sessionId) {
      if (!this.projectPath) throw new CocosError("NOT_FOUND", "Persistent diagnostics unavailable");
      const paths = await ProjectPaths.open(this.projectPath), bytes = await (0, import_promises11.readFile)(await paths.resolve(`.codex-work/logs/web-preview/${sessionId}.json`));
      if (bytes.length > 24 * 1024 * 1024) throw new CocosError("INVALID_ARGUMENT", "Diagnostic file exceeds limit");
      const saved = JSON.parse(bytes.toString());
      rows = saved.rows;
      sequence = saved.sequence;
      if (saved.sessionId !== sessionId || !Array.isArray(rows) || rows.length > 2e3) throw new CocosError("INVALID_ARGUMENT", "Invalid diagnostic file");
    }
    const cursor = Number((_b = p.cursor) != null ? _b : 0), limit = Number((_c = p.limit) != null ? _c : 100);
    if (!Number.isInteger(cursor) || cursor < 0 || !Number.isInteger(limit) || limit < 1 || limit > 500) throw new CocosError("INVALID_ARGUMENT", "Invalid diagnostic pagination");
    const instant = (key, fallback) => {
      if (p[key] === void 0) return fallback;
      const value = String(p[key]);
      if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) throw new CocosError("INVALID_ARGUMENT", "Time bounds require an explicit timezone");
      return Date.parse(value);
    };
    const from = instant("from", -Infinity), to = instant("to", Infinity);
    if (from >= to) throw new CocosError("INVALID_ARGUMENT", "Expected from < to");
    const matching = rows.filter((r) => Number(r.sequence) > cursor && Date.parse(String(r.occurredAt)) >= from && Date.parse(String(r.occurredAt)) < to && (!p.category || (p.category === "network" ? ["http-response", "http-error", "network-failure", "http-request"].includes(String(r.kind)) : String(r.kind).startsWith("websocket-"))) && (!p.level || p.level === r.level) && (!p.kind || p.kind === r.kind) && (!p.contains || `${r.message}
${r.stack}
${r.url}`.toLowerCase().includes(String(p.contains).toLowerCase())));
    const page = matching.slice(0, limit).map((row) => ({ ...this.redaction.value(row), diagnosticSessionId: sessionId }));
    return {
      sessionId,
      connection: ((_d = this.debugger) == null ? void 0 : _d.isAttached()) && this.owned ? "connected" : "disconnected",
      rows: page,
      nextCursor: page.length ? page[page.length - 1].sequence : Math.max(cursor, sequence),
      hasMore: matching.length > limit,
      droppedBefore: rows.length ? Number(rows[0].sequence) - 1 : sequence,
      retained: rows.length,
      persistenceError: this.persistenceError,
      persistence: this.projectPath ? "project-log" : "memory-only",
      limitations: ["\u4EC5\u672C MCP \u9884\u89C8\uFF1B\u4E0D\u542B\u72EC\u7ACB\u6D4F\u89C8\u5668\u6216\u672A\u9644\u52A0\u7684 Worker", "\u6700\u591A\u4FDD\u7559 2000 \u6761\u53CA\u7EA6 8 MiB \u5B57\u7B26\u5185\u5BB9\uFF1B\u5355\u6761\u8D85\u9650\u6807\u8BB0 truncated", "\u4E0D\u8BB0\u5F55\u8BF7\u6C42\u5934\u3001\u6B63\u6587\u548C\u5E27\u5185\u5BB9\uFF1B\u65E5\u5FD7\u6309\u654F\u611F\u952E\u503C\u3001\u51ED\u8BC1\u683C\u5F0F\u8131\u654F\uFF0C\u65E0\u6CD5\u8BC6\u522B\u65E0\u4E0A\u4E0B\u6587\u7684\u4EFB\u610F\u79D8\u5BC6", "\u8C03\u8BD5\u5668\u88AB DevTools \u65AD\u5F00\u671F\u95F4\u6709\u6355\u6349\u7F3A\u53E3"]
    };
  }
  detached = (_event, reason) => {
    this.owned = false;
    this.record({ kind: "capture-gap", message: `Debugger detached: ${String(reason)}` });
  };
  message = (_event, method, p) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I;
    try {
      if (method === "Runtime.executionContextsCleared") this.contexts.clear();
      if (method === "Runtime.executionContextDestroyed") this.contexts.delete(Number(p.executionContextId));
      if (method === "Runtime.executionContextCreated" && Number.isInteger((_a = p.context) == null ? void 0 : _a.id) && typeof ((_c = (_b = p.context) == null ? void 0 : _b.auxData) == null ? void 0 : _c.frameId) === "string") {
        if (this.contexts.size >= 1e3) this.contexts.delete(this.contexts.keys().next().value);
        this.contexts.set(p.context.id, p.context.auxData.frameId);
      }
      if (method === "Fetch.requestPaused" && this.debugger) {
        const snapshot = this.sceneOverride;
        if (snapshot && ((_d = p.request) == null ? void 0 : _d.method) === "GET" && new URL(String(p.request.url)).origin === new URL(snapshot.url).origin && new URL(String(p.request.url)).pathname === "/preview-scene.json") {
          void this.debugger.sendCommand("Fetch.fulfillRequest", { requestId: p.requestId, responseCode: 200, responseHeaders: [{ name: "Content-Type", value: "application/json" }, { name: "Cache-Control", value: "no-store" }], body: snapshot.bytes }).catch(() => this.record({ kind: "capture-gap", message: "Native scene snapshot delivery failed" }));
        } else void this.debugger.sendCommand("Fetch.continueRequest", { requestId: p.requestId }).catch(() => {
        });
      }
      if (method === "Page.frameNavigated" && this.revisionSession && !((_e = p.frame) == null ? void 0 : _e.parentId)) {
        const state = this.revisionSession;
        if (new URL(String((_f = p.frame) == null ? void 0 : _f.url)).origin === state.origin && typeof ((_g = p.frame) == null ? void 0 : _g.loaderId) === "string" && typeof ((_h = p.frame) == null ? void 0 : _h.id) === "string") {
          state.loaderId = p.frame.loaderId;
          state.frameId = p.frame.id;
          state.artifacts.clear();
        }
      }
      if (method === "Runtime.bindingCalled" && p.name === this.binding && typeof p.payload === "string" && p.payload.length <= 2e5) {
        const data = JSON.parse(p.payload);
        if (["error", "unhandledrejection", "resource-error"].includes(data.kind)) this.record(data);
      }
      if (method === "Debugger.scriptParsed") {
        const state = this.revisionSession, debuggerApi = this.debugger;
        const frameId = (_j = (_i = p.executionContextAuxData) == null ? void 0 : _i.frameId) != null ? _j : this.contexts.get(Number(p.executionContextId));
        const nativeMap = typeof p.sourceMapURL === "string" && p.sourceMapURL.length <= 32 * 1024 * 1024 ? state == null ? void 0 : state.sourceMaps.get((0, import_node_crypto8.createHash)("sha256").update(p.sourceMapURL).digest("hex")) : void 0;
        const manifestUrl = (state == null ? void 0 : state.urls.has(p.url)) && !state.resources.has(p.url) ? String(p.url) : nativeMap;
        if ((state == null ? void 0 : state.loaderId) && manifestUrl && frameId === state.frameId && debuggerApi && typeof p.scriptId === "string" && (p.length === void 0 || Number(p.length) <= 16 * 1024 * 1024)) {
          const loaderId = state.loaderId;
          const pending = this.scriptSource(debuggerApi, p.scriptId).then((response) => {
            const source = response.scriptSource;
            if (state.loaderId === loaderId && typeof source === "string" && Buffer.byteLength(source) <= 16 * 1024 * 1024) state.artifacts.set(manifestUrl, {
              url: manifestUrl,
              ...nativeMap ? { mapping: "native-inline-source-map-digest", observedUrl: p.url ? this.url(p.url) : null } : {},
              sha256: (0, import_node_crypto8.createHash)("sha256").update(source).digest("hex")
            });
          }).catch(() => {
          }).finally(() => state.pending.delete(pending));
          state.pending.add(pending);
        }
      }
      if (method === "Runtime.consoleAPICalled") this.record({ kind: "console", level: p.type === "error" ? "error" : p.type === "warning" ? "warning" : p.type === "debug" ? "debug" : "info", message: ((_k = p.args) != null ? _k : []).map((v) => {
        var _a2;
        return typeof v.value === "object" ? JSON.stringify(this.redaction.value(v.value)) : this.text((_a2 = v.value) != null ? _a2 : v.description, 4096);
      }).join(" ") });
      if (method === "Runtime.exceptionThrown") this.record({ kind: "error", message: (_p = (_o = (_m = (_l = p.exceptionDetails) == null ? void 0 : _l.exception) == null ? void 0 : _m.description) != null ? _o : (_n = p.exceptionDetails) == null ? void 0 : _n.text) != null ? _p : "Unhandled exception", url: (_r = (_q = p.exceptionDetails) == null ? void 0 : _q.url) != null ? _r : "", line: Number((_t = (_s = p.exceptionDetails) == null ? void 0 : _s.lineNumber) != null ? _t : -1) + 1 });
      if (method === "Network.requestWillBeSent") {
        if (this.requests.size >= 2e3) this.requests.delete(this.requests.keys().next().value);
        const state = this.revisionSession;
        const address = new URL(String(p.request.url));
        const nativeRoute = /^\/assets\/[a-zA-Z0-9_-]+\/(?:import|native)\/([a-f0-9]{2})\/([^/]+)$/.exec(address.pathname);
        const manifestUrl = (state == null ? void 0 : state.resources.has(p.request.url)) ? String(p.request.url) : state && address.origin === state.origin && nativeRoute && nativeRoute[1] === nativeRoute[2].slice(0, 2) ? state.nativeFiles.get(nativeRoute[2]) : void 0;
        const request3 = {
          url: this.url(p.request.url),
          method: this.text(p.request.method, 16),
          timestamp: Number(p.timestamp),
          startedAt: Number.isFinite(p.wallTime) ? new Date(p.wallTime * 1e3).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          ...(state == null ? void 0 : state.loaderId) && manifestUrl && p.request.method === "GET" && p.loaderId === state.loaderId && p.frameId === state.frameId ? { proofUrl: String(p.request.url), manifestUrl, loaderId: String(p.loaderId), frameId: String(p.frameId) } : {}
        };
        this.requests.set(p.requestId, request3);
      }
      if (method === "Network.responseReceived") {
        const request3 = this.requests.get(p.requestId);
        if (request3 == null ? void 0 : request3.proofUrl) request3.responseEligible = p.response.url === request3.proofUrl && p.response.status >= 200 && p.response.status < 300 && p.loaderId === request3.loaderId && p.frameId === request3.frameId;
        if (request3) this.record({ kind: "http-request", level: "info", requestId: p.requestId, requestStartedAt: request3.startedAt, url: request3.url, method: request3.method, message: "Request metadata; body and headers excluded" });
        this.record({ kind: p.response.status >= 400 ? "http-error" : "http-response", level: p.response.status >= 400 ? "error" : "info", message: `HTTP ${p.response.status}`, requestId: p.requestId, status: p.response.status, url: p.response.url, method: (_u = request3 == null ? void 0 : request3.method) != null ? _u : "", durationMs: request3 && Number.isFinite(p.timestamp - request3.timestamp) ? Math.max(0, (p.timestamp - request3.timestamp) * 1e3) : null });
      }
      if (method === "Network.loadingFailed") {
        this.record({ kind: "network-failure", requestId: p.requestId, message: (_v = p.errorText) != null ? _v : "Request failed", corsError: (_x = (_w = p.corsErrorStatus) == null ? void 0 : _w.corsError) != null ? _x : null, blockedReason: (_y = p.blockedReason) != null ? _y : null, url: (_A = (_z = this.requests.get(p.requestId)) == null ? void 0 : _z.url) != null ? _A : "", method: (_C = (_B = this.requests.get(p.requestId)) == null ? void 0 : _B.method) != null ? _C : "" });
        this.requests.delete(p.requestId);
      }
      if (method === "Network.loadingFinished") {
        const request3 = this.requests.get(p.requestId), state = this.revisionSession, debuggerApi = this.debugger;
        if ((request3 == null ? void 0 : request3.proofUrl) && request3.responseEligible && state && state.loaderId === request3.loaderId && state.frameId === request3.frameId && debuggerApi && Number(p.encodedDataLength) <= 16 * 1024 * 1024) {
          const loaderId = state.loaderId, url = request3.manifestUrl;
          const pending = this.responseBytes(debuggerApi, String(p.requestId)).then((bytes) => {
            if (this.revisionSession === state && state.loaderId === loaderId) state.artifacts.set(url, { url, kind: "resource", ...request3.proofUrl !== url ? { observedUrl: this.url(request3.proofUrl), mapping: "native-uuid-file-in-same-preview-origin" } : {}, sha256: (0, import_node_crypto8.createHash)("sha256").update(bytes).digest("hex") });
          }).catch(() => {
          }).finally(() => state.pending.delete(pending));
          state.pending.add(pending);
        }
        this.requests.delete(p.requestId);
      }
      if (method === "Network.webSocketCreated") {
        if (this.sockets.size >= 2e3) this.sockets.delete(this.sockets.keys().next().value);
        this.sockets.set(p.requestId, this.url(p.url));
        this.record({ kind: "websocket-created", level: "info", requestId: p.requestId, url: p.url, connectionState: "connecting" });
      }
      if (method === "Network.webSocketHandshakeResponseReceived") this.record({ kind: "websocket-handshake", level: p.response.status === 101 ? "info" : "error", requestId: p.requestId, url: (_D = this.sockets.get(p.requestId)) != null ? _D : "", status: p.response.status, connectionState: p.response.status === 101 ? "connected" : "failed" });
      if (method === "Network.webSocketFrameSent" || method === "Network.webSocketFrameReceived") {
        const opcode = Number(p.response.opcode), payload = String((_E = p.response.payloadData) != null ? _E : "");
        const size = opcode === 1 ? Buffer.byteLength(payload, "utf8") : Buffer.byteLength(payload, "base64");
        const closeCode = opcode === 8 && size >= 2 ? Buffer.from(payload, "base64").readUInt16BE(0) : null;
        this.record({ kind: "websocket-frame", level: "info", requestId: p.requestId, url: (_F = this.sockets.get(p.requestId)) != null ? _F : "", direction: method.endsWith("Sent") ? "sent" : "received", frameType: opcode === 1 ? "text" : opcode === 2 ? "binary" : "control", size, closeCode });
      }
      if (method === "Network.webSocketFrameError") this.record({ kind: "websocket-error", requestId: p.requestId, url: (_G = this.sockets.get(p.requestId)) != null ? _G : "", message: (_H = p.errorMessage) != null ? _H : "WebSocket frame failed" });
      if (method === "Network.webSocketClosed") {
        this.record({ kind: "websocket-closed", level: "info", requestId: p.requestId, url: (_I = this.sockets.get(p.requestId)) != null ? _I : "", connectionState: "closed" });
        this.sockets.delete(p.requestId);
      }
    } catch {
      this.record({ kind: "capture-gap", message: "Malformed browser diagnostic was rejected" });
    }
  };
  async attach(debuggerApi) {
    if (!debuggerApi || debuggerApi.isAttached()) {
      this.record({ kind: "capture-gap", message: "Debugger unavailable or already owned by another client; console fallback only" });
      return;
    }
    this.debugger = debuggerApi;
    try {
      debuggerApi.attach("1.3");
      this.owned = true;
      debuggerApi.on("message", this.message);
      debuggerApi.on("detach", this.detached);
      await debuggerApi.sendCommand("Runtime.enable");
      await debuggerApi.sendCommand("Network.enable");
      await debuggerApi.sendCommand("Page.enable");
      await debuggerApi.sendCommand("Runtime.addBinding", { name: this.binding });
      const source = `(()=>{const send=v=>{try{globalThis[${JSON.stringify(this.binding)}](JSON.stringify(v))}catch{}};const text=v=>{try{return String(v??'').slice(0,65537)}catch{return '[unprintable]'}};addEventListener('error',e=>{const resource=e.target&&e.target!==globalThis;send({kind:resource?'resource-error':'error',message:resource?'Resource load failed':text(e.message),stack:text(e.error&&e.error.stack),url:resource?text(e.target.src||e.target.href):text(e.filename),line:e.lineno,column:e.colno})},true);addEventListener('unhandledrejection',e=>send({kind:'unhandledrejection',message:text(e.reason&&e.reason.message||e.reason),stack:text(e.reason&&e.reason.stack),url:location.href}));})()`;
      const result = await debuggerApi.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source });
      this.sourceId = result.identifier;
    } catch (error) {
      this.record({ kind: "capture-gap", message: CocosError.from(error).message });
      this.dispose();
    }
  }
  dispose() {
    const d = this.debugger;
    this.debugger = void 0;
    this.requests.clear();
    this.sockets.clear();
    this.contexts.clear();
    this.revisionSession = void 0;
    this.sceneOverride = void 0;
    if (d) {
      d.removeListener("message", this.message);
      d.removeListener("detach", this.detached);
      if (this.owned && d.isAttached()) {
        if (this.sourceId) void d.sendCommand("Page.removeScriptToEvaluateOnNewDocument", { identifier: this.sourceId }).catch(() => {
        });
        d.detach();
      }
    }
    this.owned = false;
    void this.flush();
  }
};

// extensions/creator3/src/preview.ts
var import_crypto4 = require("crypto");

// extensions/creator3/src/preview-coordinates.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PreviewCoordinates = class {
  imageObservation(capture, captureId, observation, windowSize) {
    var _a, _b, _c;
    if (!capture || captureId !== capture.captureId || capture.sceneGeneration !== observation.sceneGeneration || Json.canonical((_a = capture.windowContentSize) != null ? _a : null) !== Json.canonical(windowSize)) throw new CocosError("STALE_HANDLE", "Image coordinates require the current captureId, scene generation and window geometry");
    for (const key of ["canvasRect", "canvasPixelSize", "designResolution", "engineViewportRect", "engineScale"]) {
      if (Json.canonical((_b = capture[key]) != null ? _b : null) !== Json.canonical((_c = observation[key]) != null ? _c : null)) throw new CocosError("STALE_HANDLE", "Canvas geometry changed after the reference capture");
    }
    return { ...observation, imageSize: { width: capture.width, height: capture.height } };
  }
  point(x, y, space, observation, windowSize) {
    if (![x, y].every((value) => Number.isFinite(value) && value >= 0)) throw new CocosError("INVALID_ARGUMENT", "Input coordinates must be nonnegative finite numbers");
    if (windowSize.length !== 2 || !windowSize.every((value) => Number.isFinite(value) && value > 0)) throw new CocosError("CONTEXT_UNAVAILABLE", "Window content dimensions unavailable");
    let result = { x, y };
    let canvasRect;
    if (space !== "window-css") {
      const rect = Json.object(observation.canvasRect, "Canvas geometry");
      canvasRect = rect;
      if (![rect.x, rect.y, rect.width, rect.height].every((value) => typeof value === "number" && Number.isFinite(value)) || !(Number(rect.width) > 0 && Number(rect.height) > 0)) throw new CocosError("CONTEXT_UNAVAILABLE", "Canvas geometry unavailable");
      if (space === "canvas-css") result = { x: Number(rect.x) + x, y: Number(rect.y) + y };
      else if (space === "design-top-left") {
        const design = Json.object(observation.designResolution, "Design resolution");
        if (![Number(design.width), Number(design.height)].every((value) => Number.isFinite(value) && value > 0)) throw new CocosError("CONTEXT_UNAVAILABLE", "Design resolution unavailable");
        if (x >= Number(design.width) || y >= Number(design.height)) throw new CocosError("INVALID_ARGUMENT", "Input coordinates must be inside the design resolution");
        const pixels = Json.object(observation.canvasPixelSize, "Canvas pixel size"), viewport = Json.object(observation.engineViewportRect, "Engine viewport"), scale = Json.object(observation.engineScale, "Engine scale");
        if (![Number(pixels.width), Number(pixels.height), Number(scale.x), Number(scale.y)].every((value) => Number.isFinite(value) && value > 0) || ![viewport.x, viewport.y].every((value) => typeof value === "number" && Number.isFinite(value))) throw new CocosError("CONTEXT_UNAVAILABLE", "Actual engine coordinate transform unavailable");
        result = {
          x: Number(rect.x) + (Number(viewport.x) + x * Number(scale.x)) * Number(rect.width) / Number(pixels.width),
          y: Number(rect.y) + (Number(pixels.height) - Number(viewport.y) - Number(design.height) * Number(scale.y) + y * Number(scale.y)) * Number(rect.height) / Number(pixels.height)
        };
      } else if (space === "image-pixels") {
        const image = Json.object(observation.imageSize, "Captured image dimensions");
        if (![Number(image.width), Number(image.height)].every((value) => Number.isFinite(value) && value > 0)) throw new CocosError("CONTEXT_UNAVAILABLE", "Captured image dimensions unavailable");
        result = { x: x * windowSize[0] / Number(image.width), y: y * windowSize[1] / Number(image.height) };
      } else throw new CocosError("INVALID_ARGUMENT", "Unknown input coordinate space");
      if (result.x < Number(rect.x) || result.y < Number(rect.y) || result.x >= Number(rect.x) + Number(rect.width) || result.y >= Number(rect.y) + Number(rect.height)) throw new CocosError("INVALID_ARGUMENT", "Input coordinates must be inside the Canvas area");
    }
    result = { x: Math.round(result.x), y: Math.round(result.y) };
    if (![result.x, result.y].every((value) => Number.isFinite(value) && value >= 0) || result.x >= windowSize[0] || result.y >= windowSize[1]) throw new CocosError("INVALID_ARGUMENT", "Input coordinates must be inside the preview content area");
    if (canvasRect && (result.x < Number(canvasRect.x) || result.y < Number(canvasRect.y) || result.x >= Number(canvasRect.x) + Number(canvasRect.width) || result.y >= Number(canvasRect.y) + Number(canvasRect.height))) throw new CocosError("INVALID_ARGUMENT", "Rounded input coordinates must be inside the Canvas area");
    return result;
  }
  orientation(width, height, expected) {
    const actual = width === height ? "square" : width > height ? "landscape" : "portrait";
    if (expected !== void 0 && expected !== actual) throw new CocosError("INVALID_ARGUMENT", "Requested viewport orientation does not match dimensions");
    return actual;
  }
};

// extensions/creator3/src/preview.ts
var import_promises12 = require("fs/promises");
var ManagedPreview = class {
  constructor(factory, projectPath, major = 3, refreshHost, externalBrowser, sceneSnapshot) {
    this.factory = factory;
    this.projectPath = projectPath;
    this.major = major;
    this.sceneSnapshot = sceneSnapshot;
    this.diagnosticLog = new PreviewDiagnostics(projectPath);
    this.external = new ExternalPreview(externalBrowser != null ? externalBrowser : projectPath ? new ProjectBrowserConnector(projectPath) : void 0, major);
    this.refresh = refreshHost ? new PreviewRefresh({ ...refreshHost, reload: (manifest) => this.reload(manifest) }) : void 0;
  }
  factory;
  projectPath;
  major;
  sceneSnapshot;
  window;
  sceneId;
  currentSceneId = null;
  sceneGeneration = 0;
  observedGeneration = null;
  observation = {};
  capture = new ManagedPreviewCapture({
    current: (window) => this.window === window,
    inspect: (window, params) => this.inspect(window, params),
    observe: (frame, params) => this.observe(frame, params),
    bounded: (task, milliseconds) => this.bounded(task, milliseconds),
    engineReadySource: () => this.engineReadySource(),
    rendered: () => {
      this.gameReady = true;
    },
    diagnostics: () => this.diagnostics
  });
  ready = false;
  gameReady = false;
  runtimeRegistered = false;
  diagnostics = [];
  diagnosticLog;
  target = "embedded";
  previewAddress = null;
  fixtureNetwork;
  external;
  refresh;
  redact = new PreviewRedaction();
  async bounded(task, milliseconds) {
    let timer;
    try {
      return await Promise.race([task, new Promise((_, reject) => {
        timer = setTimeout(() => reject(new CocosError("TIMEOUT", "Preview operation timed out")), milliseconds);
      })]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  previewUrl(raw, sceneId) {
    const url = new URL(raw);
    if (url.protocol !== "http:" || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || url.username || url.password) {
      throw new CocosError("UNAUTHORIZED", "Preview must use an unauthenticated loopback HTTP URL");
    }
    url.searchParams.set("scene", sceneId);
    if (this.major === 3) url.searchParams.set("autoReload", "false");
    return url.href;
  }
  status() {
    var _a, _b, _c, _d;
    const running = Boolean(this.window && !this.window.isDestroyed() && !this.window.webContents.isDestroyed());
    return {
      target: "embedded",
      url: this.previewAddress,
      previewSessionId: this.diagnosticLog.sessionId,
      gameReady: running && this.gameReady,
      status: running && this.gameReady ? "game-ready" : running && this.ready ? "page-opened" : "stopped",
      diagnosticSessionId: this.diagnosticLog.sessionId,
      running,
      pageReady: running && this.ready,
      sceneId: this.currentSceneId,
      launchSceneId: (_a = this.sceneId) != null ? _a : null,
      currentSceneId: this.currentSceneId,
      sceneGeneration: this.sceneGeneration,
      viewport: ((_b = this.window) == null ? void 0 : _b.getContentSize) ? this.window.getContentSize() : null,
      source: "managed-preview-window",
      runtimeBridgeRegistration: this.runtimeRegistered ? "succeeded" : "not-requested",
      readiness: {
        page: running && this.ready ? "passed" : "unknown",
        engine: running && this.ready && this.observation.ready === true ? "passed" : "unknown",
        launchScene: running && this.ready && this.currentSceneId === this.sceneId ? "passed" : "unknown",
        frame: running && this.ready && Number(this.observation.sceneFrameIndex) > 0 ? "passed" : "unknown",
        runtime: running && this.runtimeRegistered ? "passed" : "unknown",
        business: "unknown"
      },
      runtimeInstanceId: (_c = this.observation.runtimeInstanceId) != null ? _c : null,
      frameIndex: (_d = this.observation.frameIndex) != null ? _d : null,
      fixture: this.fixtureNetwork ? { fixtureId: this.fixtureNetwork.fixtureId, defaultNetwork: "deny", allowedOrigins: [...this.fixtureNetwork.origins], expiresAt: new Date(this.fixtureNetwork.expiresAt).toISOString(), enforced: true } : null,
      observation: this.observation,
      rows: this.diagnostics.slice(-50)
    };
  }
  invalidateObservation() {
    this.currentSceneId = null;
    this.observedGeneration = null;
    this.observation = {};
    this.capture.reset();
    this.gameReady = false;
    this.runtimeRegistered = false;
  }
  observe(frame, params = {}) {
    var _a, _b;
    const id = typeof frame.sceneId === "string" ? frame.sceneId : null;
    const generation = typeof frame.sceneGeneration === "number" ? frame.sceneGeneration : null;
    if (id !== this.currentSceneId || generation !== this.observedGeneration) this.sceneGeneration++;
    this.currentSceneId = id;
    this.observedGeneration = generation;
    this.observation = frame;
    if (params.expectedRuntimeInstanceId !== void 0 && params.expectedRuntimeInstanceId !== frame.runtimeInstanceId) throw new CocosError("STALE_HANDLE", "Preview runtime identity differs from selected runtime", { inputSent: false, actualRuntimeInstanceId: (_a = frame.runtimeInstanceId) != null ? _a : null });
    if (params.expectedSceneId !== void 0 && params.expectedSceneId !== id) throw new CocosError("VERIFICATION_FAILED", "Preview current scene differs from expected scene", { expectedSceneId: params.expectedSceneId, actualSceneId: id });
    if (params.expectedGeneration !== void 0 && params.expectedGeneration !== this.sceneGeneration) throw new CocosError("STALE_HANDLE", "Preview scene generation changed", { actualGeneration: this.sceneGeneration });
    return { ...frame, sceneGeneration: this.sceneGeneration, launchSceneId: (_b = this.sceneId) != null ? _b : null, currentSceneId: id, previewSessionId: this.diagnosticLog.sessionId };
  }
  async inspect(window, params = {}) {
    const observed = await this.bounded(window.webContents.executeJavaScript(`(async()=>{${this.engineReadySource()}${new PreviewObserver().source()}return read();})()`), 12e3);
    if (this.window !== window || window.isDestroyed()) throw new CocosError("STALE_HANDLE", "Managed preview session changed");
    return this.observe(Json.object(observed), params);
  }
  async reload(manifest) {
    var _a;
    const binding = Json.object(manifest.binding);
    const current = Json.object(await this.execute("status", { target: binding.target }));
    if (((_a = current.previewSessionId) != null ? _a : current.sessionId) !== binding.previewSessionId || current.url !== binding.url || this.target !== binding.target) throw new CocosError("STALE_HANDLE", "Refresh preview target or session changed");
    if (binding.target === "external-browser") return Json.object(await this.external.execute("reload", manifest));
    const window = this.window;
    if (!window || window.isDestroyed() || !this.previewAddress) throw new CocosError("CONTEXT_UNAVAILABLE", "Embedded preview unavailable");
    const revision = await this.bounded(this.diagnosticLog.beginRevision(manifest.artifacts, new URL(this.previewAddress).origin), 5e3);
    try {
      await this.prepareScene();
      this.ready = false;
      this.invalidateObservation();
      await this.bounded(window.loadURL(this.previewAddress), 15e3);
      this.ready = true;
      await this.execute("capture", {});
      return { ...await this.diagnosticLog.revision(revision), url: this.previewAddress, gameReady: this.gameReady };
    } finally {
      this.diagnosticLog.endRevision();
    }
  }
  async prepareScene() {
    if (!this.sceneSnapshot) return;
    const snapshot = await this.bounded(this.sceneSnapshot(), 15e3);
    if (snapshot.sceneId !== this.sceneId) throw new CocosError("STALE_HANDLE", "Editor scene changed before preview snapshot delivery");
    await this.bounded(this.diagnosticLog.prepareScene(snapshot, new URL(this.previewAddress).origin), 5e3);
  }
  engineReadySource() {
    return `let cc;
      for(let attempt=0;attempt<100;attempt++) {
        try { cc=${this.major === 2 ? "globalThis.cc" : "globalThis.System?.get(await globalThis.System.resolve('cc'))"}; } catch {}
        if(cc?.director?.getScene()) break;
        await new Promise(resolve=>setTimeout(resolve,100));
      }
      if(!cc?.director?.getScene()) throw new Error('Target preview engine or scene has not launched');`;
  }
  async execute(method, params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
    if (method.startsWith("refresh")) {
      if (!this.refresh) throw new CocosError("UNSUPPORTED_CAPABILITY", "Resource refresh host unavailable");
      if (method === "refresh") {
        const target = (_a = params.target) != null ? _a : this.target;
        const status = Json.object(await this.execute("status", { target }));
        params = { ...params, binding: { target, previewSessionId: (_c = (_b = status.previewSessionId) != null ? _b : status.sessionId) != null ? _c : null, url: (_d = status.url) != null ? _d : null } };
      }
      return this.refresh.execute(method, params);
    }
    const requestedTarget = (_e = params.target) != null ? _e : this.target;
    if (!["embedded", "external-browser"].includes(String(requestedTarget))) throw new CocosError("INVALID_ARGUMENT", "Unknown preview target");
    if (requestedTarget === "external-browser") {
      if (params.fixtureId !== void 0) throw new CocosError("UNSUPPORTED_CAPABILITY", "External connector has not supplied enforceable fixture network isolation");
      const result = await this.external.execute(method, params);
      if (method === "start") this.target = "external-browser";
      return result;
    }
    if (method === "start") this.target = "embedded";
    if (method === "logs") return this.diagnosticLog.query(params);
    if (method === "network" || method === "websocket") return this.diagnosticLog.query({ ...params, category: method });
    if (method === "diagnose") return new PreviewDiagnosis().summarize(await this.diagnosticLog.query(params), (_f = params.connectionRoles) != null ? _f : []);
    if (method === "status") {
      const window = this.window;
      this.gameReady = false;
      if (window && !window.isDestroyed() && !window.webContents.isDestroyed() && this.ready) {
        try {
          const observed = await this.inspect(window);
          this.gameReady = observed.ready === true && Number(observed.sceneFrameIndex) > 0;
        } catch {
          this.observation = {};
        }
      }
      return this.status();
    }
    if (method === "wait") {
      const deadline = Date.now() + Number((_g = params.timeoutMs) != null ? _g : 1e4);
      if (!Number.isInteger(Number((_h = params.timeoutMs) != null ? _h : 1e4)) || Number((_i = params.timeoutMs) != null ? _i : 1e4) < 100 || Number((_j = params.timeoutMs) != null ? _j : 1e4) > 3e4) throw new CocosError("INVALID_ARGUMENT", "Wait timeout must be 100..30000 ms");
      const window = this.window;
      if (!window || window.isDestroyed() || !this.ready) throw new CocosError("CONTEXT_UNAVAILABLE", "Managed preview unavailable");
      const initial = this.diagnosticLog.sessionId;
      let observed = {};
      while (Date.now() < deadline) {
        observed = await this.bounded(this.inspect(window, params), Math.max(1, deadline - Date.now()));
        if (initial !== this.diagnosticLog.sessionId) throw new CocosError("STALE_HANDLE", "Preview changed during wait");
        if (observed.ready && (params.sceneId === void 0 || observed.sceneId === params.sceneId) && (params.afterFrameIndex === void 0 || Number(observed.frameIndex) > Number(params.afterFrameIndex))) return { status: "completed", ...observed, businessOutcomeVerified: false };
        await new Promise((resolve3) => setTimeout(resolve3, Math.min(100, Math.max(0, deadline - Date.now()))));
      }
      throw new CocosError("TIMEOUT", "Preview readiness condition was not observed", observed);
    }
    if (method === "connect-runtime") {
      if (this.fixtureNetwork) {
        const url = new URL(String(Json.object(params.config).url));
        if (!["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) || url.protocol !== "http:") throw new CocosError("UNAUTHORIZED", "Fixture gateway must be local");
        this.fixtureNetwork.origins.add(url.origin);
      }
      const window = this.window;
      if (!window || window.isDestroyed() || !this.ready) throw new CocosError("CONTEXT_UNAVAILABLE", "Start an MCP preview before connecting its runtime");
      await this.inspect(window, params);
      await this.bounded(window.webContents.executeJavaScript(String(params.source)), 5e3);
      const result = await this.bounded(window.webContents.executeJavaScript(`(async () => {
        ${this.engineReadySource()}
        if (globalThis.__cocosMcpDevelopmentConnection) await Promise.race([
          globalThis.__cocosMcpDevelopmentConnection.stop().catch(() => {}), new Promise(resolve=>setTimeout(resolve,1000))
        ]);
        globalThis.__cocosMcpDevelopmentConnection = await CocosMCPRuntime.CocosMCP.connect({
          ...${JSON.stringify(params.config)}, cc, major: ${this.major}, development: true
        });
        return {connected:true, runtimeInstanceId:globalThis.__cocosMcpDevelopmentConnection.instanceId, sceneId:cc.director.getScene()?.uuid ?? null, runtimeSourceFingerprint:globalThis.__cocosMcpDevelopmentConnection.sourceFingerprint};
      })()`), 28e3);
      this.runtimeRegistered = Boolean(result && typeof result === "object" && result.connected === true);
      const handshake = Json.object(result);
      return {
        ...handshake,
        ...await this.inspect(window, params),
        connected: this.runtimeRegistered,
        runtimeSourceConsistency: typeof params.expectedSourceFingerprint === "string" && typeof handshake.runtimeSourceFingerprint === "string" ? handshake.runtimeSourceFingerprint === params.expectedSourceFingerprint ? "matched" : "mismatched" : "unknown"
      };
    }
    if (method === "stop") {
      if (this.window && !this.window.isDestroyed()) await this.bounded(this.window.webContents.executeJavaScript("globalThis.__cocosMcpDevelopmentConnection?.stop()"), 1e3).catch(() => {
      });
      this.dispose();
      return { stopped: true, scope: "mcp-owned-preview-window" };
    }
    if (method === "start") {
      const sceneId = String((_k = params.sceneId) != null ? _k : "");
      if (!sceneId) throw new CocosError("INVALID_ARGUMENT", "Preview requires a saved scene UUID");
      if (this.window && !this.window.isDestroyed()) {
        if (this.sceneId !== sceneId) throw new CocosError("RESOURCE_BUSY", "Stop the existing MCP preview before changing its scene");
        return this.status();
      }
      const width = Number((_l = params.width) != null ? _l : 1280), height = Number((_m = params.height) != null ? _m : 800);
      if (![width, height].every((n) => Number.isInteger(n) && n >= 256 && n <= 2048)) throw new CocosError("INVALID_ARGUMENT", "Preview dimensions must be 256..2048");
      new PreviewCoordinates().orientation(width, height, params.orientation);
      const url = this.previewUrl(String(params.url), sceneId), origin = new URL(url).origin;
      let fixture;
      if (params.fixtureId !== void 0) {
        const fixtureId = Json.string(params.fixtureId, "fixtureId");
        if (!this.projectPath || !/^[a-zA-Z0-9_-]{1,128}$/.test(fixtureId)) throw new CocosError("INVALID_ARGUMENT", "Invalid fixture identity");
        const paths = await ProjectPaths.open(this.projectPath), state = Json.object(JSON.parse(await (0, import_promises12.readFile)(await paths.resolve(`.codex-work/cache/cocos-mcp/fixtures/${fixtureId}.json`), "utf8")));
        if (state.status !== "active" || Date.parse(String(state.expiresAt)) <= Date.now() || Json.object(state.snapshot).sceneId !== sceneId) throw new CocosError("STALE_HANDLE", "Fixture is expired, inactive or belongs to another scene");
        const nativeSocket = new URL(origin);
        nativeSocket.protocol = nativeSocket.protocol === "https:" ? "wss:" : "ws:";
        fixture = { fixtureId, expiresAt: Date.parse(String(state.expiresAt)), origins: /* @__PURE__ */ new Set([origin, nativeSocket.origin, ...Json.object(state.network).allowedOrigins]) };
      }
      this.previewAddress = url;
      const window = this.factory.create({
        width,
        height,
        useContentSize: true,
        enableLargerThanScreen: true,
        show: params.visible !== false,
        title: "CocosMCP Preview",
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          sandbox: true,
          backgroundThrottling: false,
          partition: `cocos-mcp-preview-${(0, import_crypto4.randomBytes)(8).toString("hex")}`
        }
      });
      this.diagnosticLog.dispose();
      this.diagnosticLog = new PreviewDiagnostics(this.projectPath);
      const diagnosticLog = this.diagnosticLog;
      this.window = window;
      this.sceneId = sceneId;
      this.sceneGeneration = 0;
      this.invalidateObservation();
      this.ready = false;
      this.diagnostics.length = 0;
      this.fixtureNetwork = fixture;
      if (fixture) {
        if (!((_n = window.webContents.session.webRequest) == null ? void 0 : _n.onBeforeRequest)) {
          this.dispose();
          throw new CocosError("UNSUPPORTED_CAPABILITY", "Native fixture request blocking is unavailable");
        }
        window.webContents.session.webRequest.onBeforeRequest({ urls: ["<all_urls>"] }, (details, callback) => {
          let allowed = false;
          try {
            const address = new URL(details.url);
            allowed = Date.now() < fixture.expiresAt && (["data:", "about:"].includes(address.protocol) || fixture.origins.has(address.origin));
          } catch {
          }
          if (!allowed) diagnosticLog.record({ kind: "network-blocked", url: details.url, message: "Fixture origin or expiry policy blocked this request" });
          callback({ cancel: !allowed });
        });
      }
      window.webContents.on("did-navigate", () => {
        if (this.window === window) {
          this.ready = false;
          this.invalidateObservation();
        }
      });
      window.webContents.on("did-finish-load", () => {
        if (this.window === window) this.ready = true;
      });
      if (window.webContents.setWindowOpenHandler) window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
      else window.webContents.on("new-window", (event) => event.preventDefault());
      window.webContents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
      const navigation = (...args) => {
        const event = args[0], target = String(args[1]);
        try {
          if (new URL(target).origin !== origin) event.preventDefault();
        } catch {
          event.preventDefault();
        }
      };
      window.webContents.on("will-navigate", (...args) => {
        navigation(...args);
        if (this.major === 2) {
          args[0].preventDefault();
          diagnosticLog.record({ kind: "navigation-blocked", message: "Use preview.refresh for this owned Creator 2 window" });
        }
      });
      window.webContents.on("will-redirect", navigation);
      window.webContents.on("console-message", (...args) => {
        var _a2;
        const level = Number(args[1]), message = String(args[2]);
        diagnosticLog.record({ kind: "console", level: level >= 3 ? "error" : level === 2 ? "warning" : level === 1 ? "info" : "debug", message, line: Number(args[3]) || null, url: String((_a2 = args[4]) != null ? _a2 : "") });
        this.diagnostics.push({ level: level >= 3 ? "error" : "warning", message: this.redact.text(message, 2e3) });
        if (this.diagnostics.length > 50) this.diagnostics.shift();
      });
      window.webContents.on("did-fail-load", (...args) => {
        var _a2, _b2;
        return diagnosticLog.record({ kind: "navigation-failure", message: String((_a2 = args[2]) != null ? _a2 : ""), url: String((_b2 = args[3]) != null ? _b2 : "") });
      });
      window.webContents.on("render-process-gone", () => {
        if (this.window === window) {
          this.ready = false;
          this.invalidateObservation();
        }
        diagnosticLog.record({ kind: "renderer-crash", message: "Preview renderer exited" });
      });
      try {
        await this.bounded(window.loadURL("about:blank"), 5e3);
      } catch (error) {
        this.dispose();
        throw new CocosError("EDITOR_ERROR", "Preview page failed to load", { cause: String(error) });
      }
      try {
        await this.bounded(diagnosticLog.attach(window.webContents.debugger), 8e3);
      } catch (error) {
        diagnosticLog.record({ kind: "capture-gap", message: CocosError.from(error).message });
        diagnosticLog.dispose();
      }
      window.once("closed", () => {
        if (this.window === window) this.dispose();
      });
      try {
        await this.prepareScene();
        await this.bounded(window.loadURL(url), 15e3);
        if (window.isDestroyed()) throw new Error("Preview closed while loading");
        this.ready = true;
      } catch (error) {
        this.dispose();
        throw new CocosError("EDITOR_ERROR", "Preview page failed to load", { cause: String(error) });
      }
      return this.status();
    }
    if (method === "resize" || method === "input") {
      if (method === "input" && this.fixtureNetwork && Date.now() >= this.fixtureNetwork.expiresAt) throw new CocosError("STALE_HANDLE", "Fixture expired; no input sent", { inputSent: false });
      const window = this.window;
      if (!window || window.isDestroyed() || !this.ready || !window.getContentSize) throw new CocosError("CONTEXT_UNAVAILABLE", "Managed preview window is unavailable");
      if (method === "resize") {
        const width = Number(params.width), height = Number(params.height);
        if (![width, height].every((n) => Number.isInteger(n) && n >= 256 && n <= 2048)) throw new CocosError("INVALID_ARGUMENT", "Preview dimensions must be 256..2048");
        const orientation = new PreviewCoordinates().orientation(width, height, params.orientation);
        if (!window.setContentSize) throw new CocosError("UNSUPPORTED_CAPABILITY", "Preview resize API unavailable");
        const previousSize = window.getContentSize();
        window.setContentSize(width, height);
        try {
          const frame = await this.execute("capture", {}), actual = window.getContentSize();
          if (actual[0] !== width || actual[1] !== height) throw new CocosError("VERIFICATION_FAILED", "Window manager did not apply requested viewport");
          return {
            ...frame,
            requestedViewport: { width, height },
            actualWindowContent: { width: actual[0], height: actual[1] },
            orientation,
            viewport: { width: actual[0], height: actual[1] },
            previousSize,
            layoutVerified: false,
            imageDelivery: (_o = params.imageDelivery) != null ? _o : "image"
          };
        } catch (error) {
          throw new CocosError("OUTCOME_UNKNOWN", "Preview resize or capture incomplete; query current viewport before retrying", { previousSize, actualSize: window.getContentSize(), cause: CocosError.from(error).message });
        }
      }
      if (!window.webContents.sendInputEvent || !window.focus || !window.show || !window.isFocused) throw new CocosError("UNSUPPORTED_CAPABILITY", "Preview input APIs unavailable");
      window.show();
      window.focus();
      if (!window.isFocused()) {
        (_q = (_p = this.factory).activate) == null ? void 0 : _q.call(_p);
        window.focus();
      }
      for (let attempt = 0; attempt < 10 && !window.isFocused(); attempt++) await new Promise((resolve3) => setTimeout(resolve3, 50));
      if (!window.isFocused()) throw new CocosError("CONTEXT_UNAVAILABLE", "Preview window did not acquire input focus", { inputSent: false, stage: "focus", focused: false });
      const size = window.getContentSize();
      let observation;
      try {
        observation = await this.inspect(window, params);
      } catch (error) {
        throw new CocosError(CocosError.from(error).code, "Preview input was not sent: " + CocosError.from(error).message, { inputSent: false, stage: "engine", focused: true });
      }
      const coordinateSpace = String((_r = params.coordinateSpace) != null ? _r : "window-css"), coordinates = new PreviewCoordinates();
      const referenceCapture = this.capture.last;
      if (coordinateSpace === "image-pixels") observation = coordinates.imageObservation(referenceCapture, params.captureId, observation, size);
      let { x, y } = coordinates.point(Number(params.x), Number(params.y), coordinateSpace, observation, size);
      if (!["click", "wheel", "drag", "long_press", "key", "touch_drag", "touch_cancel"].includes(String(params.action))) throw new CocosError("INVALID_ARGUMENT", "Unsupported preview input action");
      const duration = Number((_s = params.durationMs) != null ? _s : 300), steps = Number((_t = params.steps) != null ? _t : 10);
      if (!Number.isInteger(duration) || duration < 0 || duration > 2e3 || !Number.isInteger(steps) || steps < 1 || steps > 60) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded gesture");
      let { x: endX, y: endY } = coordinates.point(Number((_u = params.endX) != null ? _u : params.x), Number((_v = params.endY) != null ? _v : params.y), coordinateSpace, observation, size);
      if (params.action === "key" && !/^(?:[A-Za-z0-9]|Space|Enter|Escape|Tab|Backspace|Left|Right|Up|Down)$/.test(String((_w = params.key) != null ? _w : ""))) throw new CocosError("INVALID_ARGUMENT", "Unsupported key");
      if (String(params.action).startsWith("touch_") && !((_x = window.webContents.debugger) == null ? void 0 : _x.isAttached())) throw new CocosError("UNSUPPORTED_CAPABILITY", "Touch input requires the managed preview debugger");
      if (params.action === "wheel" && ![Number((_y = params.deltaX) != null ? _y : 0), Number((_z = params.deltaY) != null ? _z : 0)].every((n) => Number.isInteger(n) && Math.abs(n) <= 2e3)) throw new CocosError("INVALID_ARGUMENT", "Wheel delta exceeds bounds");
      if (params.allowResume === true) await this.bounded(window.webContents.executeJavaScript(`(async()=>{${this.engineReadySource()}cc.game.resume();})()`), 12e3);
      try {
        observation = Json.object(await this.execute("capture", { expectedSceneId: (_B = (_A = params.expectedSceneId) != null ? _A : observation.sceneId) != null ? _B : null, expectedGeneration: observation.sceneGeneration }));
        const actualSize = window.getContentSize();
        if (coordinateSpace === "image-pixels") observation = coordinates.imageObservation(referenceCapture, params.captureId, observation, actualSize);
        ({ x, y } = coordinates.point(Number(params.x), Number(params.y), coordinateSpace, observation, actualSize));
        ({ x: endX, y: endY } = coordinates.point(Number((_C = params.endX) != null ? _C : params.x), Number((_D = params.endY) != null ? _D : params.y), coordinateSpace, observation, actualSize));
      } catch (error) {
        throw new CocosError(CocosError.from(error).code, "Preview input was not sent: " + CocosError.from(error).message, { inputSent: false, stage: "frame", focused: window.isFocused(), observation: this.observation });
      }
      const focusTarget = String((_E = params.focusTarget) != null ? _E : params.action === "key" ? "game-canvas" : "window");
      if (!["game-canvas", "window"].includes(focusTarget)) throw new CocosError("INVALID_ARGUMENT", "Invalid focus target");
      let focus = { target: "window" };
      if (focusTarget === "game-canvas") {
        focus = await this.bounded(window.webContents.executeJavaScript(`(async () => {
          ${this.engineReadySource()}
          const canvas = cc.game.canvas;
          if (!canvas || !canvas.isConnected) throw new Error('Game canvas unavailable');
          if (canvas.tabIndex < 0) canvas.tabIndex = 0;
          canvas.focus({preventScroll:true});
          const rect = canvas.getBoundingClientRect();
          return {target:'game-canvas', focused:document.activeElement === canvas, devicePixelRatio:devicePixelRatio,
            rect:{x:rect.x,y:rect.y,width:rect.width,height:rect.height}};
        })()`), 5e3);
        if (!focus || typeof focus !== "object" || Array.isArray(focus) || focus.focused !== true) throw new CocosError("CONTEXT_UNAVAILABLE", "Game canvas did not acquire focus");
      }
      if (params.action === "key") await this.bounded(window.webContents.executeJavaScript(`(() => {
        globalThis.__cocosMcpInputAck?.dispose();
        const rows=[]; const listener=e=>rows.push({type:e.type,key:e.key,code:e.code,isTrusted:e.isTrusted});
        window.addEventListener('keydown',listener,true); window.addEventListener('keyup',listener,true);
        globalThis.__cocosMcpInputAck={rows,dispose:()=>{window.removeEventListener('keydown',listener,true);window.removeEventListener('keyup',listener,true);delete globalThis.__cocosMcpInputAck;}};
      })()`), 5e3);
      const sent = [];
      const attempted = [];
      const send = (event) => {
        attempted.push(event);
        window.webContents.sendInputEvent(event);
        sent.push(event);
      };
      const wait = async (milliseconds) => {
        await new Promise((resolve3) => setTimeout(resolve3, milliseconds));
        if (this.window !== window || window.isDestroyed()) throw new CocosError("STALE_HANDLE", "Preview changed during input");
      };
      try {
        send({ type: "mouseMove", x, y });
        if (String(params.action).startsWith("touch_")) {
          const touch = async (type, points) => {
            const event = { type, touchPoints: points };
            attempted.push(event);
            await window.webContents.debugger.sendCommand("Input.dispatchTouchEvent", event);
            sent.push(event);
          };
          try {
            await touch("touchStart", [{ x, y, id: 0 }]);
            for (let i = 1; i <= steps; i++) {
              await wait(duration / steps);
              await touch("touchMove", [{ x: x + (endX - x) * i / steps, y: y + (endY - y) * i / steps, id: 0 }]);
            }
          } finally {
            await touch(params.action === "touch_cancel" ? "touchCancel" : "touchEnd", []);
          }
        } else if (params.action === "key") {
          try {
            send({ type: "keyDown", keyCode: params.key });
            const character = params.key === "Space" ? " " : /^[A-Za-z0-9]$/.test(String(params.key)) ? String(params.key).toLowerCase() : null;
            if (character !== null) send({ type: "char", keyCode: character });
            await wait(duration);
          } finally {
            send({ type: "keyUp", keyCode: params.key });
          }
        } else if (params.action === "drag" || params.action === "long_press") {
          try {
            send({ type: "mouseDown", x, y, button: "left", clickCount: 1 });
            if (params.action === "long_press") await wait(duration);
            else for (let i = 1; i <= steps; i++) {
              await wait(duration / steps);
              send({ type: "mouseMove", x: Math.round(x + (endX - x) * i / steps), y: Math.round(y + (endY - y) * i / steps), button: "left" });
            }
          } finally {
            send({ type: "mouseUp", x: params.action === "drag" ? endX : x, y: params.action === "drag" ? endY : y, button: "left", clickCount: 1 });
          }
        } else if (params.action === "click") {
          try {
            send({ type: "mouseDown", x, y, button: "left", clickCount: 1 });
          } finally {
            send({ type: "mouseUp", x, y, button: "left", clickCount: 1 });
          }
        } else send({ type: "mouseWheel", x, y, deltaX: (_F = params.deltaX) != null ? _F : 0, deltaY: (_G = params.deltaY) != null ? _G : 0, canScroll: true });
        const frame = await this.execute("capture", {});
        const inputEvents = params.action === "key" ? await this.bounded(window.webContents.executeJavaScript("globalThis.__cocosMcpInputAck?.rows ?? []"), 5e3) : null;
        return { ...frame, inputSent: true, sentEvents: sent.length, sent, focus, inputEvents, outcomeUnknown: false, businessOutcomeVerified: false, coordinateSpace: "preview-content-dip-top-left", requestedCoordinateSpace: coordinateSpace, imageDelivery: (_H = params.imageDelivery) != null ? _H : "image" };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Preview input may have executed; inspect game state before retrying", { inputSent: sent.length > 0 ? true : attempted.length > 0 ? null : false, sentEvents: sent.length, sent, attempted, focus, outcomeUnknown: true, cause: CocosError.from(error).message });
      } finally {
        if (params.action === "key" && !window.isDestroyed()) await this.bounded(window.webContents.executeJavaScript("globalThis.__cocosMcpInputAck?.dispose()"), 1e3).catch(() => {
        });
      }
    }
    if (method === "capture") {
      const window = this.window;
      if (!window || window.isDestroyed() || !this.ready) throw new CocosError("CONTEXT_UNAVAILABLE", "Start an MCP preview before capturing it");
      return this.capture.execute(window, params);
    }
    throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown managed preview operation: ${method}`);
  }
  dispose() {
    var _a;
    (_a = this.refresh) == null ? void 0 : _a.dispose();
    this.diagnosticLog.dispose();
    const window = this.window;
    this.window = void 0;
    this.sceneId = void 0;
    this.invalidateObservation();
    this.ready = false;
    this.previewAddress = null;
    this.fixtureNetwork = void 0;
    if (window && !window.isDestroyed()) window.destroy();
  }
};

// extensions/creator3/src/console.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var CreatorConsole = class {
  constructor(logger) {
    this.logger = logger;
  }
  logger;
  sequence = 0;
  identities = /* @__PURE__ */ new WeakMap();
  text(value, limit) {
    if (typeof value === "string") return value.slice(0, limit);
    if (Array.isArray(value)) return value.map((row) => this.text(row, limit)).join("\n").slice(0, limit);
    return value === void 0 || value === null ? "" : String(value).slice(0, limit);
  }
  instant(value) {
    if (typeof value !== "number" && !(typeof value === "string" && /(?:Z|[+-]\d{2}:\d{2})$/.test(value))) return null;
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date.toISOString() : null;
  }
  async query(params) {
    var _a, _b;
    const cursor = Number((_a = params.cursor) != null ? _a : 0), limit = Number((_b = params.limit) != null ? _b : 100);
    if (!Number.isSafeInteger(cursor) || cursor < 0 || !Number.isInteger(limit) || limit < 1 || limit > 500) throw new CocosError("INVALID_ARGUMENT", "Console cursor must be non-negative and limit must be 1..500");
    if (params.level !== void 0 && !["debug", "info", "warn", "error"].includes(String(params.level))) throw new CocosError("INVALID_ARGUMENT", "Unknown console level");
    const raw = await this.logger.query();
    if (!Array.isArray(raw) || raw.some((row) => !row || typeof row !== "object" || Array.isArray(row))) throw new CocosError("UNSUPPORTED_VERSION", "Creator Logger returned an unsupported log format");
    const rows = raw.slice(-5e3).map((entry) => {
      var _a2;
      let sequence = this.identities.get(entry);
      if (sequence === void 0) {
        sequence = ++this.sequence;
        this.identities.set(entry, sequence);
      }
      const log = entry;
      const rawLevel = this.text(log.type, 32);
      return {
        sequence,
        level: rawLevel === "log" ? "info" : rawLevel,
        rawLevel,
        message: this.text(log.message, 16384),
        stack: this.text(log.stack, 32768),
        process: this.text(log.process, 128),
        occurredAt: this.instant((_a2 = log.time) != null ? _a2 : log.date),
        source: "creator-console"
      };
    });
    const contains = params.contains === void 0 ? "" : Json.string(params.contains, "contains").toLowerCase();
    const matching = rows.filter((row) => Number(row.sequence) > cursor && (!params.level || row.level === params.level) && (!params.process || row.process === params.process) && (!contains || `${row.message}
${row.stack}`.toLowerCase().includes(contains)));
    const page = matching.slice(0, limit);
    return {
      rows: page,
      nextCursor: page.length ? page[page.length - 1].sequence : Math.max(cursor, this.sequence),
      hasMore: matching.length > limit,
      retained: rows.length,
      droppedBefore: rows.length ? Number(rows[0].sequence) - 1 : this.sequence,
      source: "creator-console",
      reader: "Editor.Logger.query",
      order: "oldest-first",
      scope: "Creator editor processes; excludes standalone browser previews",
      truncated: raw.length > 5e3
    };
  }
};

// extensions/creator3/src/selection.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var CreatorSelection = class {
  constructor(api) {
    this.api = api;
  }
  api;
  update(type, ids) {
    const previous = this.api.getSelected(type);
    if (!ids) return previous;
    const target = [...new Set(ids)];
    if (previous.length === target.length && previous.every((id, index) => id === target[index])) return previous;
    if (previous.length) this.api.clear(type);
    if (target.length) this.api.select(type, target);
    return this.api.getSelected(type);
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

// extensions/creator3/src/main.ts
var import_path10 = require("path");
var import_fs8 = require("fs");
var import_path11 = require("path");

// packages/creator3-adapter/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto7 = require("crypto");
var import_path8 = require("path");

// packages/creator3-adapter/src/engine-features.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto9 = require("crypto");

// packages/runtime3-bridge/src/feature-support.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

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

// packages/creator3-adapter/src/dump.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PropertyDump = class _PropertyDump {
  static isDump(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value) && "value" in value && ("type" in value || "default" in value || "isArray" in value);
  }
  static unwrap(value) {
    var _a;
    if (_PropertyDump.isDump(value)) return _PropertyDump.unwrap((_a = value.value) != null ? _a : null);
    if (Array.isArray(value)) return value.map((entry) => _PropertyDump.unwrap(entry));
    if (value && typeof value === "object") {
      const result = {};
      for (const key of Object.keys(value)) result[key] = _PropertyDump.unwrap(value[key]);
      return result;
    }
    return value;
  }
  static locate(root, path) {
    var _a, _b, _c;
    let current = root;
    for (const segment of Json.safePath(path)) {
      if (_PropertyDump.isDump(current)) current = (_a = current.value) != null ? _a : null;
      if (!current || typeof current !== "object") throw new CocosError("NOT_FOUND", `Property not found: ${path}`);
      current = Array.isArray(current) ? (_b = current[Number(segment)]) != null ? _b : null : (_c = current[segment]) != null ? _c : null;
    }
    if (!_PropertyDump.isDump(current)) throw new CocosError("NOT_FOUND", `No editable property description: ${path}`);
    return current;
  }
  static assign(dump, value) {
    if (dump.readonly === true) throw new CocosError("INVALID_ARGUMENT", "Property is read-only");
    const result = Json.object(Json.value(dump));
    const old = result.value;
    if (Array.isArray(old) && Array.isArray(value)) {
      const template = result.elementTypeData;
      result.value = value.map((entry, index) => {
        var _a;
        const previous = (_a = old[index]) != null ? _a : template;
        return _PropertyDump.isDump(previous) ? _PropertyDump.assign(previous, entry) : entry;
      });
    } else if (old && typeof old === "object" && !Array.isArray(old) && value && typeof value === "object" && !Array.isArray(value) && Object.values(old).some((entry) => _PropertyDump.isDump(entry))) {
      const merged = { ...old };
      for (const [key, entry] of Object.entries(value)) {
        Json.safePath(key);
        if (!(key in old)) throw new CocosError("INVALID_ARGUMENT", `Unknown nested property: ${key}`);
        merged[key] = _PropertyDump.isDump(old[key]) ? _PropertyDump.assign(old[key], entry) : entry;
      }
      result.value = merged;
    } else result.value = value;
    return result;
  }
  static matches(actual, expected) {
    if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length && expected.every((value, index) => _PropertyDump.matches(actual[index], value));
    if (expected && typeof expected === "object" && !Array.isArray(expected) && actual && typeof actual === "object" && !Array.isArray(actual)) {
      return Object.entries(expected).every(([key, value]) => key in actual && _PropertyDump.matches(actual[key], value));
    }
    if (typeof actual === "number" && typeof expected === "number") return Math.abs(actual - expected) <= Math.max(1, Math.abs(expected)) * 1e-6;
    return Json.canonical(actual) === Json.canonical(expected);
  }
};

// packages/creator3-adapter/src/engine-features.ts
var EngineFeatureService = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  async requireModule(id) {
    const feature = id.startsWith("ik.") ? id === "ik.mask_create" ? "marionette" : "procedural-animation" : id.startsWith("sorting.") ? "sorting-2d" : id.startsWith("postprocess.") ? "custom-pipeline-post-process" : void 0;
    if (!feature) return;
    const settings = Json.object(Json.object(await this.run("project.settings.get", { name: "engine" })).settings);
    const modules = settings.modules ? Json.object(settings.modules) : void 0;
    const configs = (modules == null ? void 0 : modules.configs) ? Json.object(modules.configs) : void 0;
    const config = configs == null ? void 0 : configs[String(modules == null ? void 0 : modules.globalConfigKey)];
    const included = config && Json.object(config).includeModules;
    if (!Array.isArray(included) || !included.includes(feature)) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u9879\u76EE\u672A\u542F\u7528\u6216\u65E0\u6CD5\u786E\u8BA4\u5F15\u64CE\u6A21\u5757\uFF1A${feature}`);
  }
  async execute(id, p) {
    return FeatureSupport.run(id, this.port.version, async () => {
      var _a;
      await this.requireModule(id);
      if (id.startsWith("ik.")) {
        if (id === "ik.inspect") return Json.value(await this.port.scene(id, p));
        const mask = id === "ik.mask_create", url = Json.string(p.url, "url");
        if (!url.endsWith(mask ? ".animask" : ".animgraph")) throw new CocosError("INVALID_ARGUMENT", "\u52A8\u753B\u56FE\u6216\u906E\u7F69\u8D44\u6E90\u6269\u5C55\u540D\u4E0D\u6B63\u786E");
        const params = { ...p };
        delete params.planHash;
        const snapshot2 = Json.value(await this.port.scene("fingerprint"));
        const planHash2 = (0, import_node_crypto9.createHash)("sha256").update(Json.canonical({ params, snapshot: snapshot2, version: this.port.version })).digest("hex");
        if (id === "ik.apply" && p.planHash !== planHash2) throw new CocosError("OPERATION_CONFLICT", "IK \u573A\u666F\u6216\u8BA1\u5212\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u89C4\u5212");
        const content = Json.value(await this.port.scene(mask ? "ik.mask_serialize" : "ik.serialize", params));
        if (content && !Array.isArray(content) && typeof content === "object" && content.supported === false) return content;
        if (id === "ik.plan") return { supported: true, planHash: planHash2, rootId: p.rootId, url, coordinateSpace: "controller-local", createsNewAsset: true, bindsExistingController: false };
        if (Json.canonical(Json.value(await this.port.scene("fingerprint"))) !== Json.canonical(snapshot2)) throw new CocosError("OPERATION_CONFLICT", "\u5E8F\u5217\u5316\u671F\u95F4\u573A\u666F\u5DF2\u53D8\u5316");
        const created = Json.object(await this.run("asset.create", { url, content: JSON.stringify(content) }));
        return { supported: true, ...created, bound: false, poseVerified: false };
      }
      if (id === "path.bake_clip") {
        const document = Json.object(await this.port.scene("path.clip_document", p));
        if (document.supported === false) return document;
        return this.run("animation.clip.create", { url: p.url, rootId: p.rootId, document });
      }
      if (id.startsWith("path.") || id === "probe.generate") return Json.value(await this.port.scene(id, p));
      const family = id.split(".")[0];
      const inspected = Json.object(await this.port.scene("engine.feature.inspect", { family, componentId: p.componentId }));
      if (inspected.supported === false || id.endsWith(".inspect")) return inspected;
      const properties = Json.object(p.properties), current = Json.object(inspected.properties);
      if (!Object.keys(properties).length) throw new CocosError("INVALID_ARGUMENT", "\u4FEE\u6539\u5C5E\u6027\u4E0D\u80FD\u4E3A\u7A7A");
      for (const key of Object.keys(properties)) if (!Object.hasOwn(current, key)) throw new CocosError("UNSUPPORTED_CAPABILITY", `\u5F53\u524D\u7EC4\u4EF6\u4E0D\u652F\u6301\u5C5E\u6027 ${key}`);
      const dump = Json.object(Json.object(await this.run("component.query", { componentId: p.componentId })).component);
      for (const [key, value] of Object.entries(properties)) PropertyDump.assign(PropertyDump.locate(dump, key), value);
      const snapshot = Json.value(await this.port.scene("fingerprint"));
      const planHash = (0, import_node_crypto9.createHash)("sha256").update(Json.canonical({ family, componentId: p.componentId, properties, snapshot, version: this.port.version })).digest("hex");
      const rows = Object.entries(properties).filter(([key, value]) => Json.canonical(value) !== Json.canonical(current[key])).map(([property, after]) => ({ property, before: current[property], after }));
      if (id.endsWith(".plan")) return { supported: true, planHash, rows, sceneSaveRequired: rows.length > 0 };
      if (p.planHash !== planHash) throw new CocosError("OPERATION_CONFLICT", "\u573A\u666F\u6216\u8BA1\u5212\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u89C4\u5212");
      if (rows.length === 0) return { supported: true, rows, sceneSaveRequired: false };
      const completed = [];
      try {
        for (const row of rows) {
          await this.run("component.set", { componentId: p.componentId, properties: { [row.property]: row.after } });
          completed.push(row);
        }
        const after = Json.object(await this.port.scene("engine.feature.inspect", { family, componentId: p.componentId }));
        if (after.supported === false) throw new CocosError("OUTCOME_UNKNOWN", "\u4FEE\u6539\u540E\u6A21\u5757\u4E0D\u53EF\u67E5\u8BE2");
        const values = Json.object(after.properties);
        for (const row of rows) if (Json.canonical((_a = values[row.property]) != null ? _a : null) !== Json.canonical(row.after)) throw new CocosError("OUTCOME_UNKNOWN", `\u5C5E\u6027\u8BFB\u56DE\u4E0D\u4E00\u81F4\uFF1A${row.property}`);
        return { supported: true, rows, after, sceneSaveRequired: true, visualVerified: false };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "\u4FEE\u6539\u53EF\u80FD\u90E8\u5206\u5B8C\u6210\uFF0C\u4FDD\u7559\u73B0\u573A\u5E76\u91CD\u65B0\u67E5\u8BE2\uFF1B\u4E0D\u6267\u884C\u5168\u5C40\u64A4\u9500", { completed, cause: CocosError.from(error).message });
      }
    });
  }
};

// packages/creator3-adapter/src/two-d-production.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto10 = require("crypto");
var import_promises13 = require("timers/promises");

// packages/gameplay2d-core/src/templates.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var GameplayTemplates = class {
  rows = {
    camera: { title: "\u6B63\u4EA4\u76F8\u673A\u8DDF\u968F\u3001\u8FB9\u754C\u4E0E\u9707\u5C4F", imports: ["Node", "Camera", "Vec3"], bindings: ["target\uFF1A\u8DDF\u968F\u8282\u70B9", "camera\uFF1A\u540C\u8282\u70B9\u6B63\u4EA4 Camera", "\u8FB9\u754C\u4E3A\u76F8\u673A\u4E2D\u5FC3\u4E16\u754C\u5750\u6807\uFF1B\u9700\u6309\u89C6\u53E3\u534A\u9AD8\u5411\u5185\u6536\u7F29"], body: `
  @property(Node) target: Node | null = null;
  @property smooth = 8;
  @property deadZone = 20;
  @property minX = -100000; @property maxX = 100000;
  @property minY = -100000; @property maxY = 100000;
  private remaining = 0; private amplitude = 0;
  private base = new Vec3();
  onEnable() { this.base.set(this.node.worldPosition); }
  shake(amplitude = 8, duration = 0.2) { this.amplitude = Math.max(0, amplitude); this.remaining = Math.max(0, duration); }
  zoom(height: number) { const camera = this.getComponent(Camera); if (!camera || !Number.isFinite(height) || height <= 0) throw new Error('Invalid orthographic height'); camera.orthoHeight = height; }
  lateUpdate(dt: number) {
    if (!this.target?.isValid || !this.node.getComponent(Camera) || this.minX > this.maxX || this.minY > this.maxY) return;
    const target = this.target.worldPosition; const k = 1 - Math.exp(-Math.max(0, this.smooth) * dt);
    for (const axis of ['x', 'y'] as const) { const delta = target[axis] - this.base[axis]; if (Math.abs(delta) > this.deadZone) this.base[axis] += (delta - Math.sign(delta) * this.deadZone) * k; }
    this.base.x = Math.min(this.maxX, Math.max(this.minX, this.base.x)); this.base.y = Math.min(this.maxY, Math.max(this.minY, this.base.y));
    this.remaining = Math.max(0, this.remaining - dt);
    const offset = this.remaining > 0 ? Math.sin(this.remaining * 137) * this.amplitude : 0;
    this.node.setWorldPosition(this.base.x + offset, this.base.y + offset * 0.6, this.base.z);
  }
  onDisable() { this.remaining = 0; this.node.setWorldPosition(this.base); }
` },
    controller: { title: "\u6A2A\u7248/\u4FEF\u89C6\u521A\u4F53\u79FB\u52A8\u4E0E\u8DF3\u8DC3\u7F13\u51B2", imports: ["RigidBody2D", "PhysicsSystem2D", "ERaycast2DType", "Vec2", "input", "Input", "EventKeyboard", "KeyCode"], bindings: ["\u540C\u8282\u70B9 Dynamic RigidBody2D \u4E0E Collider2D", "groundMask\uFF1A\u4EC5\u5730\u5F62\u78B0\u649E\u7EC4\uFF0C\u4E0D\u80FD\u5305\u62EC\u89D2\u8272\u81EA\u8EAB", "topDown\uFF1A\u4FEF\u89C6\u65F6\u987B\u5C06\u521A\u4F53\u91CD\u529B\u914D\u7F6E\u4E3A 0", "\u4E1A\u52A1\u901A\u8FC7 attack/movement-state \u8282\u70B9\u4E8B\u4EF6\u7ED1\u5B9A\u52A8\u753B\u4E0E\u653B\u51FB"], body: `
  @property topDown = false; @property speed = 5; @property jumpSpeed = 9;
  @property groundDistance = 36; @property groundMask = 1;
  @property coyoteTime = 0.1; @property jumpBuffer = 0.12;
  private keys = new Set<number>(); private grace = 0; private queued = 0;
  private down(event: EventKeyboard) { const fresh = !this.keys.has(event.keyCode); this.keys.add(event.keyCode); if (fresh && event.keyCode === KeyCode.SPACE) this.queued = this.jumpBuffer; if (fresh && event.keyCode === KeyCode.KEY_J) this.node.emit('attack'); }
  private up(event: EventKeyboard) { this.keys.delete(event.keyCode); }
  onEnable() { input.on(Input.EventType.KEY_DOWN, this.down, this); input.on(Input.EventType.KEY_UP, this.up, this); }
  onDisable() { input.off(Input.EventType.KEY_DOWN, this.down, this); input.off(Input.EventType.KEY_UP, this.up, this); this.keys.clear(); this.queued = 0; this.grace = 0; }
  update(dt: number) {
    const body = this.getComponent(RigidBody2D); if (!body) return;
    const x = Number(this.keys.has(KeyCode.KEY_D) || this.keys.has(KeyCode.ARROW_RIGHT)) - Number(this.keys.has(KeyCode.KEY_A) || this.keys.has(KeyCode.ARROW_LEFT));
    let y = body.linearVelocity.y;
    if (this.topDown) y = (Number(this.keys.has(KeyCode.KEY_W) || this.keys.has(KeyCode.ARROW_UP)) - Number(this.keys.has(KeyCode.KEY_S) || this.keys.has(KeyCode.ARROW_DOWN))) * this.speed;
    else {
      const p = this.node.worldPosition;
      const grounded = PhysicsSystem2D.instance.raycast(new Vec2(p.x, p.y), new Vec2(p.x, p.y - this.groundDistance), ERaycast2DType.All, this.groundMask).some(hit => hit.collider.node !== this.node && hit.normal.y > 0.5);
      this.grace = grounded ? this.coyoteTime : Math.max(0, this.grace - dt); this.queued = Math.max(0, this.queued - dt);
      if (this.grace > 0 && this.queued > 0) { y = this.jumpSpeed; this.grace = 0; this.queued = 0; }
    }
    const velocity = new Vec2(x * this.speed, y); if (this.topDown && velocity.length() > this.speed) velocity.normalize().multiplyScalar(this.speed);
    body.linearVelocity = velocity; this.node.emit('movement-state', { x, y, grounded: this.grace > 0 });
  }
` },
    pool: { title: "\u6709\u5BB9\u91CF\u9650\u5236\u7684\u9884\u5236\u4F53\u5BF9\u8C61\u6C60", imports: ["Prefab", "Node", "instantiate"], bindings: ["prefab\uFF1A\u6C60\u5316\u9884\u5236\u4F53", "\u4E1A\u52A1\u76D1\u542C pool-acquire/pool-release \u91CD\u7F6E\u72B6\u6001\uFF1B\u4E0D\u4F1A\u590D\u7528\u5916\u90E8\u8282\u70B9"], body: `
  @property(Prefab) prefab: Prefab | null = null; @property capacity = 64;
  private available: Node[] = []; private owned = new Set<Node>(); private borrowed = new Set<Node>();
  acquire(): Node | null {
    // \u4E1A\u52A1\u53EF\u80FD\u5728\u501F\u51FA\u671F\u95F4\u9500\u6BC1\u8282\u70B9\uFF1B\u6E05\u9664\u5931\u6548\u8282\u70B9\uFF0C\u907F\u514D\u6C38\u4E45\u5360\u7528\u5BB9\u91CF\u3002
    for (const node of this.owned) if (!node.isValid) { this.owned.delete(node); this.borrowed.delete(node); }
    let node = this.available.pop(); while (node && !node.isValid) { this.owned.delete(node); node = this.available.pop(); }
    if (!node) { if (!this.prefab || this.owned.size >= this.capacity) return null; node = instantiate(this.prefab); this.owned.add(node); }
    this.borrowed.add(node); node.setParent(this.node); node.active = true; node.emit('pool-acquire'); return node;
  }
  release(node: Node): boolean { if (!this.owned.has(node) || !this.borrowed.delete(node)) return false; if (!node.isValid) { this.owned.delete(node); return true; } node.emit('pool-release'); node.active = false; node.setParent(this.node); this.available.push(node); return true; }
  get statistics() { return { total: this.owned.size, active: this.borrowed.size, available: this.available.length }; }
  onDestroy() { for (const node of this.owned) if (node.isValid) node.destroy(); this.owned.clear(); this.available = []; this.borrowed.clear(); }
` },
    effects: { title: "\u98D8\u5B57/\u62FE\u53D6\u98DE\u5165\u7684\u53EF\u590D\u7528\u8FD0\u52A8\u4E0E\u6DE1\u51FA", imports: ["Node", "Vec3", "UIOpacity", "Label"], bindings: ["\u540C\u8282\u70B9 UIOpacity\uFF1B\u98D8\u5B57\u53EF\u9644\u52A0 Label", "target \u53EF\u9009\uFF1B\u4E0D\u914D\u7F6E\u65F6\u6309 rise \u5411\u4E0A\u79FB\u52A8", "\u76D1\u542C effect-complete \u56DE\u6536\uFF0C\u4E0D\u4E3B\u52A8\u9500\u6BC1\u7528\u6237\u8282\u70B9"], body: `
  @property(Node) target: Node | null = null; @property duration = 0.5; @property rise = 80;
  private elapsed = 0; private playing = false; private origin = new Vec3();
  play(text = '') { const label = this.getComponent(Label); if (label) label.string = text; this.origin.set(this.node.worldPosition); this.elapsed = 0; this.playing = true; const opacity = this.getComponent(UIOpacity); if (opacity) opacity.opacity = 255; }
  update(dt: number) { if (!this.playing) return; this.elapsed += dt; const t = Math.min(1, this.elapsed / Math.max(0.001, this.duration)); const end = this.target?.isValid ? this.target.worldPosition : new Vec3(this.origin.x, this.origin.y + this.rise, this.origin.z); this.node.setWorldPosition(Vec3.lerp(new Vec3(), this.origin, end, t)); const opacity = this.getComponent(UIOpacity); if (opacity) opacity.opacity = 255 * (1 - t); if (t === 1) { this.playing = false; this.node.emit('effect-complete'); } }
  onDisable() { this.playing = false; }
` },
    joystick: { title: "\u5355\u6307\u865A\u62DF\u6447\u6746\u4E0E\u53D6\u6D88\u5F52\u96F6", imports: ["Node", "UITransform", "EventTouch", "Vec2", "Vec3"], bindings: ["\u540C\u8282\u70B9 UITransform\uFF1Bknob \u53EF\u9009", "\u76D1\u542C joystick-change\uFF1B\u5750\u6807\u4E3A\u5F53\u524D UI \u5C40\u90E8\u5750\u6807"], body: `
  @property(Node) knob: Node | null = null; @property radius = 64;
  private finger: number | null = null;
  onEnable() { this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this); this.node.on(Node.EventType.TOUCH_MOVE, this.move, this); this.node.on(Node.EventType.TOUCH_END, this.end, this); this.node.on(Node.EventType.TOUCH_CANCEL, this.end, this); }
  private onTouchStart(event: EventTouch) { if (this.finger !== null) return; this.finger = event.getID(); this.move(event); }
  private move(event: EventTouch) { if (event.getID() !== this.finger) return; const transform = this.getComponent(UITransform); if (!transform) return; const p = event.getUILocation(); const local = transform.convertToNodeSpaceAR(new Vec3(p.x, p.y, 0)); const axis = new Vec2(local.x, local.y).multiplyScalar(1 / Math.max(1, this.radius)); if (axis.length() > 1) axis.normalize(); this.knob?.setPosition(axis.x * this.radius, axis.y * this.radius, 0); this.node.emit('joystick-change', axis); }
  private end(event: EventTouch) { if (event.getID() === this.finger) this.reset(); }
  private reset() { this.finger = null; this.knob?.setPosition(0, 0, 0); this.node.emit('joystick-change', new Vec2()); }
  onDisable() { this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this); this.node.off(Node.EventType.TOUCH_MOVE, this.move, this); this.node.off(Node.EventType.TOUCH_END, this.end, this); this.node.off(Node.EventType.TOUCH_CANCEL, this.end, this); this.reset(); }
` },
    hitbox: { title: "\u5B9A\u65F6\u653B\u51FB/\u53D7\u51FB\u4F20\u611F\u5668\u533A\u57DF", imports: ["Collider2D", "Contact2DType"], bindings: ["\u540C\u8282\u70B9 Collider2D \u4E14 sensor=true", "\u6309\u9879\u76EE\u914D\u7F6E\u78B0\u649E\u7EC4\u53CA\u521A\u4F53 contact listener\uFF1B\u901A\u8FC7 activate \u5F00\u542F\u653B\u51FB\u7A97\u53E3"], body: `
  @property windowSeconds = 0.15; private remaining = 0; private hit = new Set<string>();
  private overlapping = new Map<string, Collider2D>();
  private collider: Collider2D | null = null;
  onEnable() { this.collider = this.getComponent(Collider2D); this.collider?.on(Contact2DType.BEGIN_CONTACT, this.contact, this); this.collider?.on(Contact2DType.END_CONTACT, this.leave, this); }
  // \u653B\u51FB\u5F00\u59CB\u65F6\u4E5F\u68C0\u67E5\u5DF2\u6709\u91CD\u53E0\uFF1B\u4EC5\u4F9D\u8D56 BEGIN_CONTACT \u4F1A\u6F0F\u6389\u8FDB\u5165\u7A97\u53E3\u524D\u5DF2\u63A5\u89E6\u7684\u76EE\u6807\u3002
  activate() { this.remaining = Math.max(0, this.windowSeconds); this.hit.clear(); for (const other of this.overlapping.values()) this.report(other); }
  private contact(self: Collider2D, other: Collider2D) { this.overlapping.set(other.uuid, other); this.report(other); }
  private leave(self: Collider2D, other: Collider2D) { this.overlapping.delete(other.uuid); }
  private report(other: Collider2D) { if (this.remaining <= 0 || !this.collider?.sensor || !other.isValid || this.hit.has(other.uuid)) return; this.hit.add(other.uuid); this.node.emit('hitbox-hit', other.node); }
  update(dt: number) { this.remaining = Math.max(0, this.remaining - dt); }
  onDisable() { this.collider?.off(Contact2DType.BEGIN_CONTACT, this.contact, this); this.collider?.off(Contact2DType.END_CONTACT, this.leave, this); this.remaining = 0; this.hit.clear(); this.overlapping.clear(); }
` },
    dialogue: { title: "\u6570\u636E\u9A71\u52A8\u5206\u652F\u5BF9\u767D", imports: ["JsonAsset", "Label"], bindings: ["data.json\uFF1A{start,rows:[{id,text,choices:[{label,next}]}]}", "label\uFF1A\u663E\u793A\u6587\u672C\uFF1B\u76D1\u542C dialogue-choices \u7ED8\u5236\u9009\u9879\uFF1B\u6761\u4EF6\u4E0E\u5956\u52B1\u4EA4\u7ED9\u4E1A\u52A1"], body: `
  @property(JsonAsset) data: JsonAsset | null = null; @property(Label) label: Label | null = null;
  private current = ''; private rows: Array<{ id: string; text: string; choices: Array<{ label: string; next: string | null }> }> = [];
  begin() { const data = this.data?.json as { start?: string; rows?: Array<{ id: string; text: string; choices: Array<{ label: string; next: string | null }> }> } | undefined; if (!data || !Array.isArray(data.rows) || data.rows.length > 1000) throw new Error('Invalid dialogue rows'); const ids = new Set(data.rows.map(row => row.id)); if (ids.size !== data.rows.length) throw new Error('Duplicate dialogue id'); for (const row of data.rows) if (typeof row.id !== 'string' || typeof row.text !== 'string' || !Array.isArray(row.choices) || row.choices.length > 16 || row.choices.some(choice => typeof choice.label !== 'string' || choice.next !== null && !ids.has(choice.next))) throw new Error('Invalid dialogue reference'); this.rows = data.rows; this.show(String(data.start)); }
  choose(index: number) { const row = this.rows.find(row => row.id === this.current); if (!Number.isInteger(index) || !row?.choices[index]) throw new Error('Invalid dialogue choice'); const next = row.choices[index]!.next; if (next === null) { this.current = ''; this.node.emit('dialogue-complete'); } else this.show(next); }
  private show(id: string) { const row = this.rows.find(row => row.id === id); if (!row) throw new Error('Dialogue node missing'); this.current = id; if (this.label) this.label.string = row.text; this.node.emit('dialogue-choices', row.choices.map(choice => ({ ...choice }))); }
` },
    patrol: { title: "\u4E16\u754C\u5750\u6807\u8DEF\u7EBF\u5DE1\u903B", imports: ["Node", "Vec3"], bindings: ["waypoints\uFF1A\u4E16\u754C\u5750\u6807\u5DE1\u903B\u70B9", "\u9002\u7528\u4E8E\u65E0\u521A\u4F53\u6216 kinematic \u9879\u76EE\u9002\u914D\uFF1B\u4E0D\u4F1A\u81EA\u52A8\u7ED5\u5F00\u78B0\u649E\u4F53"], body: `
  @property([Node]) waypoints: Node[] = []; @property speed = 100; @property loop = true;
  private index = 0; private complete = false;
  restart() { this.index = 0; this.complete = false; }
  update(dt: number) { if (this.complete || !this.waypoints.length) return; const target = this.waypoints[this.index]; if (!target?.isValid) return; const p = this.node.worldPosition; const delta = Vec3.subtract(new Vec3(), target.worldPosition, p); const distance = delta.length(); const step = Math.max(0, this.speed) * dt; if (distance <= step) { this.node.setWorldPosition(target.worldPosition); this.index++; if (this.index >= this.waypoints.length) { if (this.loop) this.index = 0; else { this.complete = true; this.node.emit('patrol-complete'); } } } else this.node.setWorldPosition(Vec3.scaleAndAdd(new Vec3(), p, delta, step / distance)); }
` },
    parallax: { title: "\u76F8\u673A\u9A71\u52A8\u89C6\u5DEE\u80CC\u666F", imports: ["Node", "Vec3"], bindings: ["camera\uFF1A\u76F8\u673A\u8282\u70B9\uFF1Bfactor=0 \u56FA\u5B9A\uFF0Cfactor=1 \u540C\u6B65\u79FB\u52A8"], body: `
  @property(Node) camera: Node | null = null; @property factor = 0.5;
  private origin = new Vec3(); private cameraOrigin = new Vec3();
  onEnable() { this.origin.set(this.node.worldPosition); if (this.camera) this.cameraOrigin.set(this.camera.worldPosition); }
  lateUpdate() { if (!this.camera?.isValid) return; const p = this.camera.worldPosition; this.node.setWorldPosition(this.origin.x + (p.x - this.cameraOrigin.x) * this.factor, this.origin.y + (p.y - this.cameraOrigin.y) * this.factor, this.origin.z); }
` },
    ui: { title: "UI \u83DC\u5355/\u80CC\u5305\u9009\u62E9\u4E0E\u6570\u636E\u63A5\u53E3", imports: ["Node", "Button", "Label"], bindings: ["\u5B50\u6811 Button \u4EE5\u8282\u70B9\u540D\u53D1\u9001 ui-action\uFF1B\u4E0D\u81EA\u52A8\u6267\u884C\u8D2D\u4E70/\u5956\u52B1/\u5168\u5C40\u6682\u505C", "setText(path,value)\u3001show/hide \u4E3A\u516C\u5F00\u4E1A\u52A1\u63A5\u53E3"], body: `
  private bindings: Array<{ node: Node; callback: () => void }> = [];
  onEnable() { const pending = [...this.node.children]; while (pending.length) { const node = pending.pop()!; pending.push(...node.children); if (node.getComponent(Button)) { const callback = () => this.node.emit('ui-action', node.name); node.on(Button.EventType.CLICK, callback, this); this.bindings.push({ node, callback }); } } }
  onDisable() { for (const binding of this.bindings) if (binding.node.isValid) binding.node.off(Button.EventType.CLICK, binding.callback, this); this.bindings = []; }
  show() { this.node.active = true; } hide() { this.node.active = false; }
  setText(path: string, value: string) { const node = this.node.getChildByPath(path); const label = node?.getComponent(Label); if (!label) throw new Error('UI text target missing'); label.string = value; }
` },
    virtual_list: { title: "\u56FA\u5B9A\u884C\u9AD8\u7684\u6EDA\u52A8\u5217\u8868\u8282\u70B9\u590D\u7528", imports: ["ScrollView", "Prefab", "Node", "UITransform", "JsonAsset", "instantiate"], bindings: ["scroll.content\uFF1A\u9876\u90E8\u951A\u70B9\u4E14\u672A\u6302 Layout \u7684\u4E13\u7528\u5217\u8868\u5BB9\u5668", "rowPrefab\uFF1A\u884C\u9884\u5236\u4F53\uFF1Bdata.json.rows\uFF1A\u771F\u5B9E\u6570\u636E", "\u76D1\u542C\u6BCF\u4E2A\u884C\u8282\u70B9 virtual-row \u7ED1\u5B9A\u4E1A\u52A1\u663E\u793A\uFF1B\u6700\u591A\u521B\u5EFA 200 \u884C\u8282\u70B9"], body: `
  @property(ScrollView) scroll: ScrollView | null = null; @property(Prefab) rowPrefab: Prefab | null = null;
  @property(JsonAsset) data: JsonAsset | null = null; @property rowHeight = 64;
  private cells: Node[] = []; private bound: ScrollView | null = null;
  onEnable() { this.bound = this.scroll; this.bound?.node.on(ScrollView.EventType.SCROLLING, this.refresh, this); this.refresh(); }
  refresh() {
    const scroll = this.scroll, content = scroll?.content, prefab = this.rowPrefab; const rows = (this.data?.json as { rows?: unknown[] } | undefined)?.rows;
    if (!scroll || !content || !prefab || !Array.isArray(rows)) return;
    const transform = content.getComponent(UITransform), viewport = content.parent?.getComponent(UITransform);
    if (!transform || !viewport || transform.anchorY !== 1 || !Number.isFinite(this.rowHeight) || this.rowHeight <= 0 || rows.length > 100000) throw new Error('Invalid virtual list geometry/data');
    const capacity = Math.min(rows.length, Math.ceil(viewport.height / this.rowHeight) + 2); if (capacity > 200) throw new Error('Virtual list exceeds cell budget');
    transform.setContentSize(transform.width, Math.max(viewport.height, rows.length * this.rowHeight));
    while (this.cells.length < capacity) { const node = instantiate(prefab); node.setParent(content); this.cells.push(node); }
    const first = Math.min(Math.max(0, rows.length - capacity), Math.max(0, Math.floor(scroll.getScrollOffset().y / this.rowHeight)));
    for (let i = 0; i < this.cells.length; i++) { const node = this.cells[i]!; const index = first + i; node.active = i < capacity && index < rows.length; if (node.active) { node.setPosition(0, -(index + 0.5) * this.rowHeight, 0); node.emit('virtual-row', { index, data: rows[index] }); } }
  }
  onDisable() { this.bound?.node.off(ScrollView.EventType.SCROLLING, this.refresh, this); this.bound = null; }
  onDestroy() { for (const node of this.cells) if (node.isValid) node.destroy(); this.cells = []; }
` },
    spine_socket: { title: "Spine \u9AA8\u9ABC\u6302\u70B9\u540C\u6B65", imports: ["sp", "Node", "Vec3"], bindings: ["skeleton\uFF1ASpine \u7EC4\u4EF6\uFF1BboneName\uFF1A\u9AA8\u9ABC\u540D\u79F0\uFF1Btarget\uFF1A\u6302\u70B9\u8282\u70B9", "\u4EC5\u5B9E\u65F6\u6A21\u5F0F\uFF1B\u4F4D\u7F6E\u4E0E\u89D2\u5EA6\u540C\u6B65\uFF0C\u4E0D\u81EA\u52A8\u6539\u6B66\u5668\u8D44\u6E90\u6216\u7236\u5B50\u5173\u7CFB"], body: `
  @property(sp.Skeleton) skeleton: sp.Skeleton | null = null; @property(Node) target: Node | null = null;
  @property boneName = ''; @property offsetX = 0; @property offsetY = 0;
  lateUpdate() {
    const skeleton = this.skeleton, target = this.target;
    if (!skeleton?.isValid || !target?.isValid || skeleton.isAnimationCached()) return;
    const bone = skeleton.findBone(this.boneName); if (!bone) return;
    const local = new Vec3(bone.worldX + this.offsetX * bone.a + this.offsetY * bone.b, bone.worldY + this.offsetX * bone.c + this.offsetY * bone.d, 0);
    const matrix = skeleton.node.worldMatrix;
    const origin = Vec3.transformMat4(new Vec3(), local, matrix);
    // \u7528\u4E16\u754C\u7A7A\u95F4\u9AA8\u8F74\u6C42\u89D2\u5EA6\uFF0C\u4FDD\u7559\u7956\u5148\u8282\u70B9\u65CB\u8F6C\u548C\u7F29\u653E\u5BF9\u6302\u70B9\u65B9\u5411\u7684\u5F71\u54CD\u3002
    const axis = Vec3.transformMat4(new Vec3(), new Vec3(local.x + bone.a, local.y + bone.c, 0), matrix);
    target.setWorldPosition(origin);
    target.setWorldRotationFromEuler(0, 0, Math.atan2(axis.y - origin.y, axis.x - origin.x) * 180 / Math.PI);
  }
` },
    burst: { title: "2D \u7C92\u5B50\u4E0E\u97F3\u6548\u7EC4\u5408\u64AD\u653E", imports: ["ParticleSystem2D", "AudioSource"], bindings: ["particles\uFF1A\u5DF2\u6709 ParticleSystem2D\uFF0CautoRemoveOnFinish \u5FC5\u987B\u5173\u95ED", "audio \u53EF\u9009\uFF1B\u4E0D\u81EA\u52A8\u9500\u6BC1\u6216\u56DE\u6536\u8282\u70B9"], body: `
  @property(ParticleSystem2D) particles: ParticleSystem2D | null = null; @property(AudioSource) audio: AudioSource | null = null;
  play() { if (this.particles?.autoRemoveOnFinish) throw new Error('Particle auto-removal must be disabled'); this.particles?.resetSystem(); this.audio?.play(); }
  stop() { this.particles?.stopSystem(); this.audio?.stop(); }
` }
  };
  source(template, className) {
    const spec = Object.hasOwn(this.rows, template) ? this.rows[template] : void 0;
    if (!spec || !/^[A-Z][A-Za-z0-9]{2,63}$/.test(className)) throw new CocosError("INVALID_ARGUMENT", "Unknown template or invalid class name");
    return { template: spec, source: `// Generated by Cocos MCP. \u9879\u76EE\u7EC4\u4EF6\uFF1B\u5FC5\u987B\u7ED1\u5B9A\u4E0B\u8FF0\u4F9D\u8D56\u540E\u8FDB\u884C\u9884\u89C8\u9A8C\u6536\u3002
// ${spec.bindings.join("\n// ")}
import { _decorator, Component, ${spec.imports.join(", ")} } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('${className}')
export class ${className} extends Component {${spec.body}
}
` };
  }
};

// packages/gameplay2d-core/src/planning.ts
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

// packages/gameplay2d-core/src/planning.ts
var TwoDPlanning = class {
  layout(p) {
    var _a, _b;
    const count = Number(p.count), columns = Number(p.columns), spacing = Number(p.spacing), seed = Number((_a = p.seed) != null ? _a : 1), jitter = Number((_b = p.jitter) != null ? _b : 0);
    if (!Number.isInteger(count) || count < 1 || count > 200 || !Number.isInteger(columns) || columns < 1 || columns > 200 || !Number.isFinite(spacing) || spacing <= 0 || spacing > 1e4 || !Number.isInteger(seed) || seed < 0 || seed > 4294967295 || !Number.isFinite(jitter) || jitter < 0 || jitter > spacing / 2) throw new CocosError("INVALID_ARGUMENT", "Invalid bounded level layout");
    let state = seed >>> 0;
    const random = () => {
      state = Math.imul(state, 1664525) + 1013904223 >>> 0;
      return state / 4294967296;
    };
    return Array.from({ length: count }, (_, index) => ({ name: `${Json.string(p.name, "name")}_${String(index + 1).padStart(3, "0")}`, position: { x: index % columns * spacing + (random() * 2 - 1) * jitter, y: -Math.floor(index / columns) * spacing + (random() * 2 - 1) * jitter, z: 0 } }));
  }
  path(p) {
    const width = Number(p.width), height = Number(p.height);
    if (![width, height].every((n) => Number.isInteger(n) && n >= 1 && n <= 128)) throw new CocosError("INVALID_ARGUMENT", "Grid dimensions must be 1..128");
    const index = (value) => {
      const point = Json.object(value), x = Number(point.x), y = Number(point.y);
      if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= width || y >= height) throw new CocosError("INVALID_ARGUMENT", "Grid coordinate outside bounds");
      return y * width + x;
    };
    if (!Array.isArray(p.blocked) || p.blocked.length > width * height) throw new CocosError("INVALID_ARGUMENT", "Invalid blocked cells");
    const blocked = new Set(p.blocked.map(index)), start = index(p.start), end = index(p.end);
    if (blocked.has(start) || blocked.has(end)) throw new CocosError("INVALID_ARGUMENT", "Start/end is blocked");
    const queue = [start], previous = /* @__PURE__ */ new Map([[start, -1]]);
    for (let cursor = 0; cursor < queue.length && !previous.has(end); cursor++) {
      const current = queue[cursor], x = current % width, y = Math.floor(current / width);
      for (const [nx, ny] of [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const next = ny * width + nx;
        if (!blocked.has(next) && !previous.has(next)) {
          previous.set(next, current);
          queue.push(next);
        }
      }
    }
    const route = [];
    if (previous.has(end)) for (let node = end; node !== -1; node = previous.get(node)) route.push(node);
    return { reached: previous.has(end), rows: route.reverse().map((node) => ({ x: node % width, y: Math.floor(node / width) })), visited: previous.size, algorithm: "breadth-first-four-neighbor", physicsVerified: false };
  }
  ui(p) {
    var _a, _b, _c;
    const kind = Json.string(p.kind, "kind"), name = Json.string(p.name, "name");
    const width = Number((_a = p.width) != null ? _a : 600), height = Number((_b = p.height) != null ? _b : 400), count = Number((_c = p.slots) != null ? _c : 12);
    if (![width, height].every((n) => Number.isFinite(n) && n >= 64 && n <= 2048) || !Number.isInteger(count) || count < 1 || count > 64) throw new CocosError("INVALID_ARGUMENT", "Invalid UI template dimensions");
    const label = (key, text, x, y, w, h, button = false) => ({ key, name: key, position: { x, y, z: 0 }, components: [
      { type: "cc.UITransform", properties: { contentSize: { width: w, height: h } } },
      { type: "cc.Label", properties: { string: text, fontSize: 24, lineHeight: 30, overflow: 1, enableWrapText: true } },
      ...button ? [{ type: "cc.Button", properties: { transition: 0, interactable: true } }] : []
    ] });
    let children;
    if (kind === "menu") children = ["Resume", "Settings", "Close"].map((text, i) => label(`Action${i}`, text, 0, 70 - i * 70, width - 40, 56, true));
    else if (kind === "inventory") {
      const columns = Math.max(1, Math.floor(width / 90));
      children = Array.from({ length: count }, (_, i) => label(`Slot${i}`, `Slot ${i + 1}`, -width / 2 + 45 + i % columns * 90, height / 2 - 45 - Math.floor(i / columns) * 90, 80, 80, true));
    } else if (kind === "hud") children = [label("Health", "HP \u2014", -width / 4, 0, width / 2 - 20, 50), label("Score", "Score \u2014", width / 4, 0, width / 2 - 20, 50)];
    else if (kind === "dialogue") children = [label("Text", "Bind dialogue data", 0, 50, width - 40, height - 150), label("Choice0", "Continue", 0, -height / 2 + 50, width - 40, 60, true)];
    else throw new CocosError("INVALID_ARGUMENT", "Unknown UI template");
    const document = { version: 1, root: { key: "Root", name, components: [{ type: "cc.UITransform", properties: { contentSize: { width, height } } }], children } };
    new UiDocumentModel().parse(document);
    return document;
  }
};

// packages/animation-core/src/two-d.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv2 = __toESM(require_ajv(), 1);
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
    if (!new import_ajv2.Ajv({ strict: true }).compile(_TwoDClipModel.schema)(value)) throw new CocosError("INVALID_ARGUMENT", "Invalid 2D clip document");
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

// packages/creator3-adapter/src/two-d-production.ts
var TwoDProduction = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  hash(value) {
    return (0, import_node_crypto10.createHash)("sha256").update(Json.canonical(value)).digest("hex");
  }
  async execute(id, p) {
    if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "2D production requires Creator 3.8.8");
    if (id === "gameplay2d.templates") return { rows: Object.entries(new GameplayTemplates().rows).map(([template, spec]) => ({ template, title: spec.title, bindings: spec.bindings })) };
    if (id === "navigation2d.find_path") return new TwoDPlanning().path(p);
    if (id.startsWith("ui.template.")) {
      const document = Json.value(new TwoDPlanning().ui(p)), params = { parentId: p.parentId, document };
      const plan = Json.object(await this.run("ui.plan", params));
      if (id.endsWith(".plan")) return { ...plan, document, behaviorTemplate: "ui", behaviorAttached: false };
      return { ...Json.object(await this.run("ui.build", { ...params, planHash: p.planHash })), behaviorAttached: false, nextStep: "\u4F7F\u7528 gameplay2d.plan/apply \u7684 ui \u6A21\u677F\u6302\u8F7D\u5230\u8FD4\u56DE rootId\uFF1B\u6309\u94AE\u53D1\u9001 ui-action\uFF0C\u4E0D\u6267\u884C\u9879\u76EE\u4E1A\u52A1" };
    }
    if (id.startsWith("animation2d.")) {
      const document = Json.value(new TwoDClipModel().parse(p.document));
      const location2 = Json.object(await this.run("asset.location", { url: p.url })), url2 = Json.string(location2.url, "asset location");
      if (!url2.endsWith(".anim")) throw new CocosError("INVALID_ARGUMENT", "Expected .anim URL");
      const snapshot2 = Json.value(await this.port.scene("fingerprint"));
      const content = Json.value(await this.port.scene("animation2d.serialize", { ...p, document }));
      if (Json.canonical(snapshot2) !== Json.canonical(Json.value(await this.port.scene("fingerprint")))) throw new CocosError("STALE_REVISION", "Scene changed during animation planning");
      const planHash2 = this.hash({ snapshot: snapshot2, content, url: url2, document, rootId: p.rootId, version: this.port.version });
      if (id.endsWith(".plan")) return { planHash: planHash2, url: url2, document, assetLocation: location2, bindsAnimation: false };
      if (p.planHash !== planHash2) throw new CocosError("STALE_REVISION", "Animation plan changed");
      const created2 = Json.object(await this.run("asset.create", { url: url2, content: JSON.stringify(content) }));
      try {
        return { ...created2, clip: Json.value(await this.port.scene("animation.clip.inspect", { uuid: Json.object(created2.asset).uuid })), bindsAnimation: false };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Animation created; inspect asset before retrying", { created: created2, cause: CocosError.from(error).message });
      }
    }
    if (id.startsWith("level2d.")) return this.level(id, p);
    if (!id.startsWith("gameplay2d.")) throw new CocosError("UNSUPPORTED_CAPABILITY", "Unknown production operation");
    const className = Json.string(p.className, "className"), generated = new GameplayTemplates().source(Json.string(p.template, "template"), className);
    const location = Json.object(await this.run("asset.location", { url: p.url })), url = Json.string(location.url, "location");
    if (!url.endsWith(`/${className}.ts`)) throw new CocosError("INVALID_ARGUMENT", "Script filename must match className");
    if (location.targetExists) throw new CocosError("OPERATION_CONFLICT", "Script asset already exists; inspect or attach it instead of regenerating");
    if (Json.object(await this.port.scene("gameplay2d.class_available", { className })).registered) throw new CocosError("OPERATION_CONFLICT", "Generated class name is already registered");
    const snapshot = Json.value(await this.port.scene("fingerprint"));
    if (!await this.port.scene("nodeExists", p.nodeId)) throw new CocosError("NOT_FOUND", "Script target node is absent");
    const planHash = this.hash({ source: generated.source, snapshot, nodeId: p.nodeId, url, version: this.port.version });
    if (id.endsWith(".plan")) return { planHash, url, source: generated.source, bindings: generated.template.bindings, createsScript: true, attachesTo: p.nodeId, existingLogicPreserved: true };
    if (p.planHash !== planHash) throw new CocosError("STALE_REVISION", "Script plan changed");
    const created = Json.object(await this.run("asset.create", { url, content: generated.source }));
    try {
      let ready = false;
      for (let attempt = 0; attempt < 24; attempt++) {
        if (Json.object(await this.port.scene("gameplay2d.class_available", { className })).registered) {
          ready = true;
          break;
        }
        await (0, import_promises13.setTimeout)(250);
      }
      if (!ready) throw new CocosError("CONTEXT_UNAVAILABLE", "Creator has not registered the generated class within 6 seconds");
      if (Json.canonical(Json.value(await this.port.scene("fingerprint"))) !== Json.canonical(snapshot)) throw new CocosError("STALE_REVISION", "Scene changed during script compilation");
      const attached = Json.object(await this.run("component.add", { nodeId: p.nodeId, type: className }));
      return { ...created, attached, bindings: generated.template.bindings, configured: false, runtimeVerified: false, needsSave: true };
    } catch (error) {
      throw new CocosError("OUTCOME_UNKNOWN", "Script exists but component attachment is incomplete; wait for Creator compilation and inspect before attaching, do not recreate", { created, nodeId: p.nodeId, className, cause: CocosError.from(error).message });
    }
  }
  async level(id, p) {
    const rows = new TwoDPlanning().layout(p), snapshot = Json.value(await this.port.scene("fingerprint"));
    const asset = Json.object(await this.port.request("asset-db", "query-asset-info", p.prefabUuid));
    if (!asset.uuid || !String(asset.url).endsWith(".prefab")) throw new CocosError("INVALID_ARGUMENT", "Imported prefab required");
    if (!await this.port.scene("nodeExists", p.parentId)) throw new CocosError("NOT_FOUND", "Level parent missing");
    const hierarchy = Json.object(await this.port.scene("hierarchy", { rootId: p.parentId, limit: 1e3 }));
    const names = new Set(hierarchy.rows.filter((row) => row.parentId === p.parentId).map((row) => row.name));
    if (rows.some((row) => names.has(row.name))) throw new CocosError("OPERATION_CONFLICT", "Generated node name already exists");
    const planHash = this.hash({ rows, snapshot, asset, parentId: p.parentId });
    if (id.endsWith(".plan")) return { planHash, rows, prefab: asset, coordinateSpace: "parent-local", collisionVerified: false };
    if (p.planHash !== planHash) throw new CocosError("STALE_REVISION", "Level plan changed");
    const completed = [];
    let pending = null;
    try {
      for (const row of rows) {
        pending = row;
        const node = Json.object(await this.run("node.create", { parentId: p.parentId, assetUuid: p.prefabUuid, name: row.name }));
        pending = { ...row, nodeId: node.nodeId };
        await this.run("node.set", { nodeId: node.nodeId, properties: { position: row.position } });
        completed.push({ ...row, nodeId: node.nodeId });
        pending = null;
      }
      return { rows: completed, needsSave: true, collisionVerified: false };
    } catch (error) {
      throw new CocosError("OUTCOME_UNKNOWN", "Partial level creation; preserve scene and inspect pending", { completed, pending, cause: CocosError.from(error).message });
    }
  }
};

// packages/capability-catalog/src/operations.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/capability-catalog/src/creator2-expansion.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/capability-catalog/src/creator2-skeleton-mix.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2SkeletonMixCapabilities = class {
  list() {
    const spine = ["inspect", "update"].map((action) => ({
      id: `runtime.spine.mix.${action}`,
      title: `Creator 2 Spine \u52A8\u753B\u6DF7\u5408\uFF1A${action}`,
      description: "\u67E5\u8BE2\u6216\u914D\u7F6E\u52A8\u753B\u5BF9\u8FC7\u6E21\u79D2\u6570\uFF1Bupdate \u5FC5\u987B\u643A\u5E26\u67E5\u8BE2\u5F97\u5230\u7684 duration/defaultDuration/overrideDuration \u4F5C\u4E3A expected\uFF0Cduration=null \u79FB\u9664\u663E\u5F0F\u8986\u76D6\u5E76\u6062\u590D\u9ED8\u8BA4\u7EE7\u627F\u3002\u4EC5\u5F71\u54CD\u4E4B\u540E\u65B0\u5EFA\u7684\u5B9E\u65F6\u52A8\u753B\u8F68\u9053\u3002",
      module: "F20",
      context: "runtime",
      effect: action === "inspect" ? "read" : "runtime",
      inputSchema: Schema.object({ componentId: Schema.string(), from: Schema.string(), to: Schema.string(), ...action === "update" ? { duration: { anyOf: [{ type: "number", minimum: 0, maximum: 30 }, { type: "null" }] }, expected: Schema.record() } : {} }, ["componentId", "from", "to", ...action === "update" ? ["duration", "expected"] : []]),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1BSpine realtime mode"],
      rollback: "\u4F7F\u7528\u672C\u6B21 after \u4F5C expected\uFF0Cbefore.overrideDuration \u4F5C duration \u663E\u5F0F\u6062\u590D\uFF1B\u4E0D\u6539\u5DF2\u64AD\u653E\u8F68\u9053\u6216\u9879\u76EE\u8D44\u6E90"
    }));
    return [...spine, { id: "runtime.dragonbones.fade", title: "Creator 2 DragonBones \u5206\u5C42\u6DF7\u5408\u64AD\u653E", description: "\u6309\u539F\u751F\u56FE\u5C42\u548C\u5206\u7EC4\u6DE1\u5165\u52A8\u753B\uFF0C\u663E\u5F0F\u9009\u62E9\u6DE1\u51FA\u89C4\u5219\uFF1Bsingle \u53EF\u80FD\u590D\u7528\u73B0\u6709\u72B6\u6001\u3002\u4EC5\u5B9E\u65F6\u6A21\u5F0F\uFF0C\u8FD4\u56DE\u8C03\u7528\u524D\u540E\u72B6\u6001\u3002", module: "F20", context: "runtime", effect: "runtime", inputSchema: Schema.object({ componentId: Schema.string(), name: Schema.string(), duration: { type: "number", minimum: 0, maximum: 30 }, layer: { type: "integer", minimum: 0, maximum: 31 }, group: { type: "string", maxLength: 64 }, playTimes: { type: "integer", minimum: 0, maximum: 100 }, fadeOutMode: { type: "string", enum: ["none", "sameLayer", "sameGroup", "sameLayerAndGroup", "all", "single"] } }, ["componentId", "name", "duration"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15\uFF1BDragonBones realtime mode"], rollback: "\u4E0D\u80FD\u6062\u590D\u5DF2\u63A8\u8FDB\u7684\u4E1A\u52A1\u52A8\u753B\u65F6\u95F4\u7EBF\uFF1B\u6839\u636E\u539F\u751F\u72B6\u6001\u663E\u5F0F\u91CD\u65B0\u64AD\u653E" }];
  }
};

// packages/capability-catalog/src/creator2-resources.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2ResourceCapabilities = class {
  list() {
    return ["snapshot", "diff", "trend"].map((action) => ({ id: `runtime.resources.${action}`, title: `Creator 2 \u8D44\u6E90\u9A7B\u7559\u8BCA\u65AD\uFF1A${action}`, description: "\u8BFB\u53D6\u8D44\u6E90\u7F13\u5B58\u3001\u5F15\u7528\u8BA1\u6570\u3001\u76F4\u63A5\u4F9D\u8D56\u53CA Bundle\uFF1B\u5BF9\u6BD4\u663E\u5F0F\u57FA\u7EBF\uFF0C\u4E0D\u81EA\u52A8\u91CA\u653E\u8D44\u6E90\u6216\u5BA3\u79F0\u6CC4\u6F0F\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object(action === "diff" ? { baseline: Schema.record() } : action === "trend" ? { snapshotIds: { ...Schema.array(Schema.string()), minItems: 2, maxItems: 4 } } : {}, action === "diff" ? ["baseline"] : action === "trend" ? ["snapshotIds"] : []), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u5FEB\u7167\u4E0E\u6BD4\u8F83\uFF0C\u4E0D\u6539\u53D8\u5F15\u7528\u8BA1\u6570" }));
  }
};

// packages/capability-catalog/src/creator2-tween.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2TweenCapabilities = class {
  list() {
    return ["plan", "start"].map((action) => ({
      id: `runtime.tween.${action}`,
      title: `Creator 2 Tween \u7F16\u6392\uFF1A${action}`,
      description: "to/by/delay/sequence/parallel \u4E0E\u6709\u9650\u91CD\u590D\uFF1B\u5C5E\u6027\u9650 x/y/angle/scaleX/scaleY/opacity\uFF0C\u7F13\u52A8\u9650 linear/quadIn/quadOut/quadInOut/sineIn/sineOut/sineInOut\u3002start \u8FD4\u56DE\u53EF\u67E5\u8BE2\u3001\u505C\u6B62\u7684\u4EFB\u52A1 ID\u3002",
      module: "F20",
      context: "runtime",
      effect: action === "plan" ? "read" : "runtime",
      inputSchema: Schema.object({ nodeId: Schema.string(), steps: { ...Schema.array(Schema.record()), minItems: 1, maxItems: 100 }, repeat: { type: "integer", minimum: 1, maximum: 20 } }, ["nodeId", "steps"]),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1B\u603B\u65F6\u957F\u6700\u591A 25 \u79D2\uFF1B\u5E76\u884C\u5206\u652F\u4E0D\u5F97\u5199\u540C\u4E00\u5C5E\u6027"],
      rollback: "\u4EC5\u505C\u6B62\u672C\u5DE5\u5177 Tween\uFF0C\u53D6\u6D88\u4FDD\u7559\u5F53\u524D\u503C\uFF1B\u4E0D\u8C03\u7528 stopAllActions \u6216\u6062\u590D\u53EF\u80FD\u88AB\u4E1A\u52A1\u4FEE\u6539\u7684\u5C5E\u6027"
    }));
  }
};

// packages/capability-catalog/src/creator2-camera.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2CameraCapabilities = class {
  list() {
    const coordinate = { type: "number", minimum: -1e7, maximum: 1e7 };
    const capabilities = ["inspect", "convert", "culling"].map((action) => ({
      id: `runtime.camera.${action}`,
      title: `Creator 2 \u76F8\u673A\u8BCA\u65AD\uFF1A${action}`,
      description: "\u8BFB\u53D6\u76F8\u673A\u72B6\u6001\u30012D/3D \u5C4F\u5E55/\u4E16\u754C\u5750\u6807\u8F6C\u6362\uFF0C3D \u5C4F\u5E55 z \u7EDF\u4E00\u4E3A 0..1 \u6295\u5F71\u6DF1\u5EA6\u6216\u5206\u7EC4\u63A9\u7801\uFF0C\u4E0D\u628A\u63A9\u7801\u5339\u914D\u5F53\u4F5C\u6700\u7EC8\u53EF\u89C1\u3002",
      module: "F20",
      context: "runtime",
      effect: "read",
      inputSchema: Schema.object(
        { componentId: Schema.string(), ...action === "convert" ? { direction: Schema.enum("world-to-screen", "screen-to-world"), point: Schema.object({ x: coordinate, y: coordinate, z: coordinate }, ["x", "y"]) } : action === "culling" ? { nodeId: Schema.string() } : {} },
        ["componentId", ...action === "convert" ? ["direction", "point"] : action === "culling" ? ["nodeId"] : []]
      ),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1Bconvert\uFF1A2D \u8981\u6C42\u5C4F\u5E55\u5BF9\u9F50\uFF0C3D \u8981\u6C42\u663E\u5F0F\u975E\u5C4F\u5E55\u5BF9\u9F50\u6295\u5F71\u548C z"],
      rollback: "\u53EA\u8BFB\uFF0C\u4E0D\u6539\u53D8\u76F8\u673A\u6216\u6E32\u67D3\u76EE\u6807"
    }));
    capabilities.push({ ...capabilities[0], id: "runtime.camera.sample_pixels", title: "\u91C7\u6837 Creator 2 \u76F8\u673A\u79BB\u5C4F\u50CF\u7D20", description: "\u4E34\u65F6\u7EB9\u7406\u6E32\u67D3\u5E76\u8BFB\u53D6\u81F3\u591A 64 \u4E2A RGBA \u50CF\u7D20\uFF0C\u6062\u590D\u76EE\u6807\u5E76\u91CA\u653E\u4E34\u65F6 GPU \u5BF9\u8C61\u3002", effect: "runtime", inputSchema: Schema.object({ componentId: Schema.string(), rootId: Schema.string(), width: { type: "integer", minimum: 1, maximum: 512 }, height: { type: "integer", minimum: 1, maximum: 512 }, points: { ...Schema.array(Schema.object({ x: Schema.integer(), y: Schema.integer() }, ["x", "y"])), minItems: 1, maxItems: 64 } }, ["componentId", "width", "height", "points"]), rollback: "finally \u6062\u590D\u76F8\u673A\u76EE\u6807\u548C\u8282\u70B9\u53D8\u6362\uFF0C\u9500\u6BC1\u4E34\u65F6\u7EB9\u7406\u3001FBO\u3001\u6DF1\u5EA6\u6A21\u677F\u7F13\u51B2\uFF1B\u6E05\u7406\u5931\u8D25\u8FD4\u56DE OUTCOME_UNKNOWN" });
    return capabilities;
  }
};

// packages/capability-catalog/src/creator2-physics.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2PhysicsCapabilities = class {
  list() {
    const coordinate = { type: "number", minimum: -1e6, maximum: 1e6 }, vector = Schema.object({ x: coordinate, y: coordinate }, ["x", "y"]);
    const bodies = ["inspect", "force", "impulse"].map((action) => ({
      id: `runtime.rigidbody2d.${action}`,
      title: `Creator 2 \u521A\u4F53\u72B6\u6001\u4E0E\u65BD\u529B\uFF1A${action}`,
      description: "2.4.15 \u539F\u751F\u50CF\u7D20\u5750\u6807\u4E0E\u529B/\u51B2\u91CF\u5355\u4F4D\uFF1B\u4E0D\u91CD\u590D\u505A PTM \u6362\u7B97\uFF0C\u4E0D\u9690\u5F0F\u63A8\u8FDB\u7269\u7406\u5E27\u3002",
      module: "F20",
      context: "runtime",
      effect: action === "inspect" ? "read" : "runtime",
      inputSchema: Schema.object({ componentId: Schema.string(), ...action === "inspect" ? {} : { vector, point: vector, wake: Schema.boolean() } }, action === "inspect" ? ["componentId"] : ["componentId", "vector", "point", "wake"]),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1B\u65BD\u529B\u8981\u6C42\u7269\u7406\u542F\u7528\u4E14\u52A8\u6001\u521A\u4F53\u521D\u59CB\u5316\u5B8C\u6210"],
      rollback: "\u7269\u7406\u526F\u4F5C\u7528\u4E0D\u53EF\u7528\u7F16\u8F91\u5668 Undo \u56DE\u6EDA\uFF1B\u4E0D\u786E\u5B9A\u7ED3\u679C\u4E0D\u5F97\u81EA\u52A8\u91CD\u8BD5"
    }));
    const collisions = ["inspect", "trace"].map((action) => ({ id: `runtime.collision2d.${action}`, title: `Creator 2 \u666E\u901A\u78B0\u649E\u68C0\u67E5\uFF1A${action}`, description: "\u68C0\u67E5\u539F\u751F\u78B0\u649E\u77E9\u9635\u53CA\u7F13\u5B58\u4E16\u754C\u8FB9\u754C\uFF0C\u6216\u5728\u6709\u9650\u5E27\u5185\u901A\u8FC7\u81EA\u6709\u7EC4\u4EF6\u89C2\u5BDF\u56DE\u8C03\u3002", module: "F20", context: "runtime", effect: action === "inspect" ? "read" : "runtime", inputSchema: Schema.object({ rootId: Schema.string(), ...action === "trace" ? { frames: { type: "integer", minimum: 1, maximum: 300 }, limit: { type: "integer", minimum: 1, maximum: 5e3 } } : {} }, action === "trace" ? ["rootId", "frames"] : ["rootId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15\uFF1Btrace \u8981\u6C42\u666E\u901A\u78B0\u649E\u7CFB\u7EDF\u5DF2\u542F\u7528"], rollback: "finally \u505C\u6B62\u8BB0\u5F55\u5E76\u9500\u6BC1\u81EA\u6709\u89C2\u5BDF\u7EC4\u4EF6\uFF1B\u4E0D\u66FF\u6362\u4E1A\u52A1\u56DE\u8C03" }));
    const trace = collisions.find((capability) => capability.id === "runtime.collision2d.trace");
    const tasks = [
      { ...trace, id: "runtime.collision2d.trace_start", title: "\u542F\u52A8 Creator 2 \u78B0\u649E\u91C7\u6837\u4EFB\u52A1", description: "\u7ACB\u5373\u8FD4\u56DE\u4EFB\u52A1 ID\uFF1B\u91C7\u6837\u671F\u95F4\u53EF\u6267\u884C\u5176\u4ED6\u547D\u4EE4\uFF0C30 \u79D2\u603B\u65F6\u9650\uFF0C\u53EF\u67E5\u8BE2\u4E0E\u505C\u6B62\u3002" },
      ...["poll", "stop"].map((action) => ({ ...trace, id: `runtime.task.${action}`, title: `Creator 2 \u91C7\u6837\u4EFB\u52A1\uFF1A${action}`, description: "\u67E5\u8BE2\u8FDB\u5EA6\u4E0E\u7ED3\u679C\uFF0C\u6216\u505C\u6B62\u5E76\u7B49\u5F85\u81EA\u6709\u89C2\u5BDF\u5668\u6E05\u7406\uFF1B\u5207\u573A\u666F\u4E0E\u65AD\u7EBF\u540E\u4EFB\u52A1 ID \u5931\u6548\u3002", effect: action === "poll" ? "read" : "runtime", inputSchema: Schema.object({ taskId: Schema.string() }, ["taskId"]) }))
    ];
    return [...bodies, ...collisions, ...tasks, { ...trace, id: "runtime.physics2d.contact_trace_start", title: "\u8FFD\u8E2A Creator 2 Box2D \u63A5\u89E6\u4E0E\u51B2\u91CF", description: "\u5F02\u6B65\u4EFB\u52A1\u89C2\u5BDF begin/end/preSolve/postSolve\uFF1B\u590D\u5236\u63A5\u89E6\u70B9\u3001\u6CD5\u7EBF\u548C postSolve \u51B2\u91CF\uFF0C\u51B2\u91CF\u7EDF\u4E00\u4E3A Box2D \u539F\u751F\u5355\u4F4D\u3002\u4F7F\u7528 task.poll/stop\u3002", prerequisites: ["Creator 2.4.15\uFF1B\u7269\u7406\u5DF2\u542F\u7528\uFF0C\u76EE\u6807\u521A\u4F53\u542F\u7528 enabledContactListener"], rollback: "\u4EC5\u6E05\u7406\u81EA\u6709\u89C2\u5BDF\u7EC4\u4EF6\uFF0C\u4E0D\u66F4\u6539\u63A5\u89E6\u76D1\u542C\u5F00\u5173\u6216\u4E1A\u52A1\u65B9\u6CD5" }, { id: "runtime.joint2d.inspect", title: "\u68C0\u67E5 Creator 2 \u5173\u8282\u8FDE\u63A5\u3001\u951A\u70B9\u4E0E\u914D\u7F6E", description: "\u8BFB\u53D6\u539F\u751F\u5173\u8282\u5C31\u7EEA\u72B6\u6001\u4E0E\u4E16\u754C\u951A\u70B9\uFF0C\u4E0D\u8C03\u7528\u91CD\u5EFA API\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object({ componentId: Schema.string() }, ["componentId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u67E5\u8BE2" }];
  }
};

// packages/capability-catalog/src/creator2-expansion.ts
var Creator2ExpansionCapabilities = class {
  list() {
    const str = Schema.string(), index = { type: "integer", minimum: 0, maximum: 1e4 };
    const operations = { type: "array", minItems: 1, maxItems: 100, items: { oneOf: [
      Schema.object({ action: { const: "create" }, key: str, parent: str, name: str, index }, ["action", "key", "parent", "name"]),
      Schema.object({ action: { const: "move" }, node: str, parent: str, index }, ["action", "node", "parent"]),
      Schema.object({ action: { const: "remove" }, node: str }, ["action", "node"]),
      Schema.object({ action: { const: "add_component" }, node: str, type: str }, ["action", "node", "type"]),
      Schema.object({ action: { const: "remove_component" }, componentId: str }, ["action", "componentId"])
    ] } };
    const structural = ["plan", "apply"].map((action) => ({
      id: `ui.structure.${action}`,
      title: action === "plan" ? "\u89C4\u5212 UI \u8282\u70B9\u3001\u5C42\u7EA7\u987A\u5E8F\u4E0E\u7EC4\u4EF6\u7ED3\u6784\u53D8\u66F4" : "\u6309\u8BA1\u5212\u6267\u884C UI \u7ED3\u6784\u53D8\u66F4\uFF0C\u4FDD\u7559\u5DF2\u6709\u8282\u70B9 UUID",
      description: "node/parent \u4F7F\u7528\u5DF2\u6709 UUID \u6216\u672C\u6279 create \u7684 key\uFF1Bmove \u4FDD\u7559\u5C40\u90E8\u53D8\u6362\u3002\u6240\u6709\u5BF9\u8C61\u9650\u5B9A\u5728 rootId \u5B50\u6811\u5185\u3002",
      module: "F20",
      context: "editor",
      effect: action === "plan" ? "read" : "scene",
      inputSchema: Schema.object({ rootId: str, rows: operations, ...action === "apply" ? { planHash: str } : {} }, ["rootId", "rows", ...action === "apply" ? ["planHash"] : []]),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1Bapply \u5FC5\u987B\u4F7F\u7528\u76F8\u540C\u53C2\u6570\u4E0E\u6700\u65B0 planHash"],
      rollback: "\u6210\u529F\u64CD\u4F5C\u5F52\u5165\u4E00\u7EC4\u539F\u751F Undo\uFF1B\u5F02\u5E38\u8FD4\u56DE completed/pending\uFF0C\u4FDD\u7559\u73B0\u573A\u4E0E Undo\uFF0C\u4E0D\u76F2\u76EE\u91CD\u8BD5\u3002"
    }));
    const commands = [
      ["inspect", {}],
      ["scroll", { x: { type: "number", minimum: 0 }, y: { type: "number", minimum: 0 } }],
      ["page", { index: Schema.integer() }],
      ["slider", { progress: { type: "number", minimum: 0, maximum: 1 } }],
      ["toggle", { checked: Schema.boolean() }],
      ["text", { text: { type: "string", maxLength: 1e4 } }]
    ];
    return [...new Creator2SkeletonMixCapabilities().list(), { id: "runtime.spine.trace_start", title: "\u8FFD\u8E2A Creator 2 Spine \u52A8\u753B\u4E8B\u4EF6", description: "\u5B9E\u65F6\u6A21\u5F0F\u72EC\u7ACB\u76D1\u542C\uFF1B\u7F13\u5B58\u6A21\u5F0F\u8F6C\u53D1\u5E76\u6062\u590D\u4E1A\u52A1\u56DE\u8C03\uFF0C\u53EA\u652F\u6301\u5F00\u59CB/\u5B8C\u6210/\u7ED3\u675F\uFF0C\u5916\u90E8\u6539\u5199\u56DE\u8C03\u5219\u62A5\u544A\u51B2\u7A81\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object({ componentId: Schema.string(), frames: { type: "integer", minimum: 1, maximum: 300 }, limit: { type: "integer", minimum: 1, maximum: 5e3 }, events: { type: "array", minItems: 1, maxItems: 6, uniqueItems: true, items: { type: "string", enum: ["start", "interrupt", "end", "dispose", "complete", "event"] } } }, ["componentId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u79FB\u9664\u81EA\u6709\u76D1\u542C\u5E76\u9A8C\u8BC1\u539F\u751F\u76D1\u542C\u5217\u8868" }, { id: "runtime.dragonbones.trace_start", title: "\u8FFD\u8E2A Creator 2 DragonBones \u52A8\u753B\u4E8B\u4EF6", description: "\u72EC\u7ACB\u76D1\u542C\u539F\u751F\u4E8B\u4EF6\uFF0C\u4F7F\u7528 task.poll/stop \u67E5\u8BE2\u53D6\u6D88\uFF1B\u7F13\u5B58\u6A21\u5F0F\u53EA\u652F\u6301\u5F00\u59CB\u3001\u5FAA\u73AF\u548C\u5B8C\u6210\uFF0C\u65E0\u4E8B\u4EF6\u8D1F\u8F7D\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object({ componentId: Schema.string(), frames: { type: "integer", minimum: 1, maximum: 300 }, limit: { type: "integer", minimum: 1, maximum: 5e3 }, events: { type: "array", minItems: 1, maxItems: 9, uniqueItems: true, items: { type: "string", enum: ["start", "loopComplete", "complete", "fadeIn", "fadeInComplete", "fadeOut", "fadeOutComplete", "frameEvent", "soundEvent"] } } }, ["componentId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u79FB\u9664\u672C\u4EFB\u52A1\u76D1\u542C\uFF0C\u4E0D\u6539\u4E1A\u52A1\u76D1\u542C" }, { id: "runtime.dragonbones.details", title: "\u68C0\u67E5 Creator 2 DragonBones \u9AA8\u9ABC\u63D2\u69FD\u4E0E\u52A8\u753B\u72B6\u6001", description: "\u5B9E\u65F6\u6A21\u5F0F\u8FD4\u56DE\u59FF\u6001\u4E0E\u52A8\u753B\u72B6\u6001\uFF0C\u7F13\u5B58\u6A21\u5F0F\u4EC5\u8FD4\u56DE\u7ED3\u6784\u5E76\u660E\u786E\u72B6\u6001\u4E0D\u53EF\u7528\uFF1B\u5206\u9875\u9650\u5236\u663E\u5F0F\u62A5\u544A\u622A\u65AD\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object({ componentId: Schema.string(), limit: { type: "integer", minimum: 1, maximum: 1e3 } }, ["componentId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u5DF2\u6709\u9AA8\u67B6\u72B6\u6001\uFF0C\u4E0D\u63A8\u8FDB\u52A8\u753B" }, { id: "runtime.spine.details", title: "\u68C0\u67E5 Creator 2 Spine \u9AA8\u9ABC\u63D2\u69FD\u4E0E\u8F68\u9053", description: "\u5B9E\u65F6\u6A21\u5F0F\u8FD4\u56DE\u59FF\u6001\u4E0E\u8F68\u9053\uFF0C\u7F13\u5B58\u6A21\u5F0F\u4EC5\u8FD4\u56DE\u7ED3\u6784\u5E76\u660E\u786E\u72B6\u6001\u4E0D\u53EF\u7528\uFF1B\u5206\u9875\u9650\u5236\u663E\u5F0F\u62A5\u544A\u622A\u65AD\u3002", module: "F20", context: "runtime", effect: "read", inputSchema: Schema.object({ componentId: Schema.string(), limit: { type: "integer", minimum: 1, maximum: 1e3 } }, ["componentId"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u5DF2\u6709\u9AA8\u67B6\u72B6\u6001\uFF0C\u4E0D\u63A8\u8FDB\u52A8\u753B" }, ...new Creator2TweenCapabilities().list(), ...new Creator2PhysicsCapabilities().list(), ...new Creator2CameraCapabilities().list(), ...new Creator2ResourceCapabilities().list(), { id: "asset.references.audit", description: "\u68C0\u67E5\u5DF2\u4FDD\u5B58\u573A\u666F\u3001Prefab\u3001\u52A8\u753B\u6216\u6750\u8D28\u6E90\u6587\u4EF6\u4E2D\u7684\u8D44\u6E90 UUID\uFF0C\u533A\u5206 AssetDB \u7F3A\u5931\u4E0E\u67E5\u8BE2\u5931\u8D25\u3002", title: "\u5BA1\u8BA1\u5DF2\u4FDD\u5B58\u8D44\u6E90\u6587\u4EF6\u7684 UUID \u5F15\u7528", module: "F20", context: "editor", effect: "read", inputSchema: Schema.object({ url: str }, ["url"]), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u626B\u63CF" }, { id: "scene.references", description: "\u57FA\u4E8E\u539F\u751F\u5E8F\u5217\u5316\u5BF9\u8C61\u8868\uFF0C\u5B9A\u4F4D\u663E\u5F0F\u5F15\u7528\uFF1B\u4E0D\u63A8\u65AD\u7A7A\u5F15\u7528\u548C\u5B57\u7B26\u4E32\u52A0\u8F7D\u8DEF\u5F84\u3002", title: "\u5BA1\u8BA1\u5F53\u524D\u573A\u666F\u5E8F\u5217\u5316\u8282\u70B9\u3001\u7EC4\u4EF6\u4E0E\u8D44\u6E90\u5F15\u7528", module: "F20", context: "editor", effect: "read", inputSchema: Schema.object({}), outputSchema: {}, versions: [2], supportedMajors: [2], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 2.4.15"], rollback: "\u53EA\u8BFB\u626B\u63CF" }, ...structural, ...commands.map(([action, properties]) => ({
      id: `runtime.control.${action}`,
      title: `Creator 2 \u63A7\u4EF6\u72B6\u6001\u4E0E\u539F\u751F\u64CD\u4F5C\uFF1A${action}`,
      description: "\u7A0B\u5E8F\u5316\u64CD\u4F5C\u5E76\u8BFB\u56DE\u539F\u751F\u72B6\u6001\uFF1B\u4E0D\u6A21\u62DF\u7528\u6237\u8F93\u5165\uFF0C\u4E0D\u989D\u5916\u6D3E\u53D1\u4E8B\u4EF6\u3002Toggle \u4FDD\u7559\u5F15\u64CE\u5168\u5C40\u4E8B\u4EF6\u7B56\u7565\u548C\u5206\u7EC4\u7EA6\u675F\u3002",
      module: "F20",
      context: "runtime",
      effect: action === "inspect" ? "read" : "runtime",
      inputSchema: Schema.object({ componentId: str, ...properties }, ["componentId", ...Object.keys(properties)]),
      outputSchema: {},
      versions: [2],
      supportedMajors: [2],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 2.4.15\uFF1B\u5199\u64CD\u4F5C\u8981\u6C42\u8282\u70B9\u548C\u7EC4\u4EF6\u5DF2\u542F\u7528"],
      rollback: "\u8FD4\u56DE\u524D\u540E\u72B6\u6001\uFF1B\u53EF\u663E\u5F0F\u6062\u590D\u6570\u503C\uFF0C\u4E1A\u52A1\u56DE\u8C03\u7684\u526F\u4F5C\u7528\u4E0D\u53EF\u81EA\u52A8\u64A4\u9500\u3002"
    }))];
  }
};

// packages/capability-catalog/src/render-runtime.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RenderRuntimeCapabilities = class {
  list() {
    const rows = [];
    const add = (id, module2, title, effect, inputSchema) => {
      rows.push({ id, module: module2, title, description: title, context: "runtime", effect, inputSchema, outputSchema: {}, versions: [3], supportedMajors: [3], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 3.8.8 \u8FD0\u884C\u65F6\u6865\u63A5\u4E0E\u5BF9\u5E94\u5F15\u64CE\u6A21\u5757"], rollback: effect === "read" ? "\u53EA\u8BFB\u67E5\u8BE2" : "\u5148\u67E5\u8BE2\u72B6\u6001\uFF1B\u6E05\u9664\u7684\u7C92\u5B50\u4E0D\u53EF\u6062\u590D\uFF0C\u4E0D\u81EA\u52A8\u91CD\u8BD5\uFF0C\u4E0D\u5728\u65AD\u7EBF\u65F6\u6539\u53D8\u6E38\u620F\u7EC4\u4EF6" });
    };
    add("runtime.graphics.inspect", "F32", "\u67E5\u8BE2\u5F53\u524D\u56FE\u5F62\u8BBE\u5907\u3001\u80FD\u529B\u3001\u5F15\u64CE\u5185\u5B58\u8BA1\u6570\uFF1B\u4E0D\u7B49\u540C\u4E8E\u9A71\u52A8\u603B\u663E\u5B58", "read", Schema.object({}));
    add("runtime.graphics.formats", "F32", "\u67E5\u8BE2\u6307\u5B9A gfx \u683C\u5F0F\u652F\u6301\u7684\u7528\u9014\uFF1B\u4E0D\u5206\u914D GPU \u8D44\u6E90", "read", Schema.object({ formats: { type: "array", minItems: 1, maxItems: 64, uniqueItems: true, items: { type: "string", pattern: "^[A-Z][A-Z0-9_]*$", maxLength: 64 } } }, ["formats"]));
    for (const dimension of [2, 3]) for (const action of dimension === 2 ? ["state", "restart", "stop_emitting"] : ["state", "play", "pause", "stop", "stop_emitting"]) {
      add(`runtime.particle${dimension}d.${action}`, "F27", `${dimension}D \u7C92\u5B50\u539F\u751F\u64CD\u4F5C ${action}\uFF1B\u771F\u5B9E\u7ED8\u5236\u53E6\u884C\u9A8C\u6536`, action === "state" ? "read" : "runtime", Schema.object({ componentId: Schema.string() }, ["componentId"]));
    }
    return rows;
  }
};

// packages/capability-catalog/src/two-d.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var TwoDCapabilities = class {
  list() {
    const rows = [], str = Schema.string(), root = { rootId: str }, component = { componentId: str };
    const number = { type: "number", minimum: -1e6, maximum: 1e6 }, point = Schema.object({ x: number, y: number }, ["x", "y"]);
    const add = (id, title, props, required, effect = "read", module2 = "F20") => {
      rows.push({
        id,
        title,
        description: title,
        module: module2,
        context: id.startsWith("runtime.") ? "runtime" : "editor",
        effect,
        inputSchema: Schema.object(props, required),
        outputSchema: {},
        versions: [3],
        supportedMajors: [3],
        implementation: "implemented",
        verification: "unverified",
        prerequisites: ["Creator 3.8.8 \u4E0E\u76F8\u5E94\u5F15\u64CE\u6A21\u5757\uFF1B\u9884\u89C8\u548C\u771F\u5B9E\u8BBE\u5907\u5206\u522B\u9A8C\u6536"],
        rollback: "\u4FEE\u6539\u5931\u8D25\u4FDD\u7559 completed/pending\uFF1B\u8FD0\u884C\u65F6\u4E1A\u52A1\u526F\u4F5C\u7528\u4E0D\u53EF\u81EA\u52A8\u56DE\u6EDA\uFF0C\u4E0D\u76F2\u76EE\u91CD\u8BD5"
      });
    };
    add("runtime.ui.inspect", "\u8BFB\u53D6\u8FD0\u884C\u65F6\u5E03\u5C40\u548C\u4EA4\u4E92\u914D\u7F6E", root, ["rootId"]);
    add("runtime.ui.assert", "\u65AD\u8A00\u5B50\u6811\u8282\u70B9\u6FC0\u6D3B\u3001\u6587\u672C\u548C\u6309\u94AE\u72B6\u6001\uFF0C\u4E0D\u89E6\u53D1\u9879\u76EE\u56DE\u8C03", { ...root, rows: { type: "array", minItems: 1, maxItems: 100, items: { ...Schema.object({ nodeId: str, active: Schema.boolean(), text: { type: "string", maxLength: 1e4 }, interactable: Schema.boolean() }, ["nodeId"]), minProperties: 2 } } }, ["rootId", "rows"]);
    add("runtime.ui.hit_test", "\u539F\u751F\u5C4F\u5E55\u547D\u4E2D\u5019\u9009\uFF1B\u4E0D\u89E6\u53D1\u56DE\u8C03\u6216\u4F2A\u79F0\u6700\u7EC8\u63A5\u6536\u8005", { ...root, x: number, y: number, windowId: { type: "integer", minimum: 0 } }, ["rootId", "x", "y"]);
    add("runtime.render2d.audit", "2D \u5408\u6279\u5019\u9009\u8BCA\u65AD\uFF1B\u4E0D\u662F\u5B9E\u9645\u63D0\u4EA4\u6279\u6B21", root, ["rootId"], "read", "F45");
    add("runtime.label.audit", "\u8BFB\u53D6\u6587\u5B57\u7F13\u5B58\u914D\u7F6E\u5E76\u63D0\u793A\u7B56\u7565\u5BA1\u67E5", root, ["rootId"], "read", "F17");
    add("runtime.atlas.inspect", "\u8BFB\u53D6\u52A8\u6001\u56FE\u96C6\u516C\u5F00\u914D\u7F6E\uFF0C\u4E0D\u6539\u53D8\u6253\u5305\u72B6\u6001", {}, [], "read", "F16");
    const border = { type: "number", minimum: 0, maximum: 16384 };
    const sprite = { url: str, spriteFrameUuid: str, settings: { ...Schema.object({ borderLeft: border, borderRight: border, borderTop: border, borderBottom: border, packable: Schema.boolean() }), minProperties: 1 } };
    add("spriteframe.inspect", "\u8BFB\u53D6\u56FE\u7247\u548C SpriteFrame \u5BFC\u5165\u5143\u6570\u636E\u3001\u5F15\u7528\u8005", { url: str }, ["url"], "read", "F16");
    add("spriteframe.plan", "\u9884\u89C8\u4E5D\u5BAB\u683C\u8FB9\u8DDD\u548C\u52A8\u6001\u56FE\u96C6\u8D44\u683C\u4FEE\u6539", sprite, ["url", "settings"], "read", "F16");
    add("spriteframe.apply", "\u6309\u6307\u7EB9\u4FEE\u6539 SpriteFrame \u5143\u6570\u636E\u5E76\u5907\u4EFD\u3001\u91CD\u5BFC\u5165\u3001\u8BFB\u56DE", { ...sprite, planHash: str }, ["url", "settings", "planHash"], "asset", "F16");
    add("spriteframe.restore", "\u6309\u5F53\u524D\u6307\u7EB9\u6062\u590D\u540C\u4E00\u56FE\u7247\u7684\u5BFC\u5165\u5907\u4EFD", { url: str, expectedHash: str, backupId: { type: "string", pattern: "^[a-f0-9-]{36}$" } }, ["url", "expectedHash", "backupId"], "asset", "F16");
    const clip = { url: str, rootId: str, document: TwoDClipModel.schema };
    add("animation2d.plan", "\u89C4\u5212\u539F\u751F\u5E8F\u5217\u5E27\u3001\u900F\u660E\u5EA6\u4E0E\u989C\u8272\u8F68\u9053\uFF1B\u4E0D\u64AD\u653E", clip, ["url", "rootId", "document"], "read", "F23");
    add("animation2d.create", "\u6309\u8BA1\u5212\u521B\u5EFA\u539F\u751F 2D \u52A8\u753B\u8D44\u6E90\u5E76\u8BFB\u56DE\uFF1B\u4E0D\u8986\u76D6\u6216\u81EA\u52A8\u7ED1\u5B9A", { ...clip, planHash: str }, ["url", "rootId", "document", "planHash"], "asset", "F23");
    add("gameplay2d.templates", "\u5217\u51FA\u53EF\u751F\u6210\u7684\u53EF\u7F16\u8F91\u6E38\u620F\u7EC4\u4EF6\u548C\u4F9D\u8D56", {}, [], "read", "F08");
    const recipe = { template: Schema.enum(...Object.keys(new GameplayTemplates().rows)), className: { type: "string", pattern: "^[A-Z][A-Za-z0-9]{2,63}$" }, url: str, nodeId: str };
    add("gameplay2d.plan", "\u751F\u6210\u56FA\u5B9A\u6A21\u677F\u6E90\u7801\u4E0E\u7ED1\u5B9A\u8981\u6C42\u4F9B\u5BA1\u67E5\uFF1B\u4E0D\u6267\u884C\u9879\u76EE\u903B\u8F91", recipe, ["template", "className", "url", "nodeId"], "read", "F08");
    add("gameplay2d.apply", "\u521B\u5EFA\u6E38\u620F\u7EC4\u4EF6\u811A\u672C\u5E76\u6302\u8F7D\uFF0C\u4FDD\u7559\u5DF2\u6709\u903B\u8F91\uFF1B\u5C5E\u6027\u7ED1\u5B9A\u53E6\u884C\u914D\u7F6E", { ...recipe, planHash: str }, ["template", "className", "url", "nodeId", "planHash"], "scene", "F08");
    const ui = { parentId: str, kind: Schema.enum("menu", "inventory", "hud", "dialogue"), name: str, width: { type: "number", minimum: 64, maximum: 2048 }, height: { type: "number", minimum: 64, maximum: 2048 }, slots: { type: "integer", minimum: 1, maximum: 64 } };
    add("ui.template.plan", "\u89C4\u5212\u83DC\u5355/\u80CC\u5305/HUD/\u5BF9\u767D UI \u6811\uFF1B\u4E1A\u52A1\u884C\u4E3A\u5355\u72EC\u7ED1\u5B9A", ui, ["parentId", "kind", "name"], "read", "F20");
    add("ui.template.build", "\u6309\u5DF2\u6709 UI \u5B88\u536B\u521B\u5EFA\u6A21\u677F\u6811\u5E76\u8FD4\u56DE\u7A33\u5B9A\u8282\u70B9\u6620\u5C04", { ...ui, planHash: str }, ["parentId", "kind", "name", "planHash"], "scene", "F20");
    const layout = { parentId: str, prefabUuid: str, name: str, count: { type: "integer", minimum: 1, maximum: 200 }, columns: { type: "integer", minimum: 1, maximum: 200 }, spacing: { type: "number", exclusiveMinimum: 0, maximum: 1e4 }, seed: { type: "integer", minimum: 0, maximum: 4294967295 }, jitter: { type: "number", minimum: 0, maximum: 5e3 } };
    add("level2d.plan", "\u6309\u56FA\u5B9A\u79CD\u5B50\u89C4\u5212\u9884\u5236\u4F53\u7F51\u683C\u548C\u6296\u52A8\u5206\u5E03", layout, ["parentId", "prefabUuid", "name", "count", "columns", "spacing"], "read", "F05");
    add("level2d.apply", "\u6267\u884C\u53D7\u5B88\u536B\u7684\u5173\u5361\u5B9E\u4F8B\u5316\u5E76\u62A5\u544A\u90E8\u5206\u5931\u8D25", { ...layout, planHash: str }, ["parentId", "prefabUuid", "name", "count", "columns", "spacing", "planHash"], "scene", "F05");
    add("navigation2d.find_path", "\u56DB\u90BB\u63A5\u7B49\u6743\u7F51\u683C\u6700\u77ED\u8DEF\u7EBF\uFF1B\u4E0D\u4EE3\u8868\u7269\u7406\u5BFB\u8DEF", { width: { type: "integer", minimum: 1, maximum: 128 }, height: { type: "integer", minimum: 1, maximum: 128 }, start: point, end: point, blocked: { type: "array", maxItems: 16384, items: point } }, ["width", "height", "start", "end", "blocked"], "read", "F08");
    add("preview.validate_viewports", "\u9010\u5C3A\u5BF8\u6355\u83B7\u771F\u5B9E\u7ED8\u5236\u5E27\u5E76\u6062\u590D\u7A97\u53E3\uFF1B\u5E03\u5C40\u6B63\u786E\u6027\u53E6\u884C\u5BA1\u67E5", { rows: { type: "array", minItems: 1, maxItems: 8, items: Schema.object({ width: { type: "integer", minimum: 256, maximum: 2048 }, height: { type: "integer", minimum: 256, maximum: 2048 }, orientation: Schema.enum("landscape", "portrait", "square") }, ["width", "height"]) } }, ["rows"], "runtime", "F43");
    add("runtime.physics2d.test_point", "\u67E5\u8BE2\u5305\u542B\u4E16\u754C\u5750\u6807\u70B9\u7684\u78B0\u649E\u4F53", { point }, ["point"], "read", "F33");
    add("runtime.physics2d.test_aabb", "\u67E5\u8BE2\u4E16\u754C\u5750\u6807\u77E9\u5F62\u91CD\u53E0\u78B0\u649E\u4F53", { x: number, y: number, width: { type: "number", exclusiveMinimum: 0, maximum: 1e5 }, height: { type: "number", exclusiveMinimum: 0, maximum: 1e5 } }, ["x", "y", "width", "height"], "read", "F33");
    add("runtime.physics2d.trace_contacts", "\u6709\u754C\u91C7\u96C6\u5DF2\u6709 Collider2D \u7684\u78B0\u649E\u4E8B\u4EF6\uFF0C\u7ED3\u675F\u6E05\u7406\u76D1\u542C", { componentIds: { type: "array", minItems: 1, maxItems: 32, uniqueItems: true, items: str }, frames: { type: "integer", minimum: 1, maximum: 300 } }, ["componentIds", "frames"], "read", "F33");
    add("runtime.spine.inspect", "\u8BFB\u53D6 Spine \u5F53\u524D\u8F68\u9053\u548C\u52A8\u753B/\u76AE\u80A4\u5217\u8868", component, ["componentId"], "read", "F26");
    add("runtime.spine.play", "Spine \u547D\u540D\u52A8\u753B\u64AD\u653E\u6216\u6392\u961F\uFF1B\u4E0D\u8986\u76D6\u4E8B\u4EF6\u76D1\u542C", { ...component, name: str, trackIndex: { type: "integer", minimum: 0, maximum: 7 }, loop: Schema.boolean(), queue: Schema.boolean(), delay: { type: "number", minimum: 0, maximum: 600 } }, ["componentId", "name"], "runtime", "F26");
    add("runtime.spine.set_skin", "\u8BBE\u7F6E\u5DF2\u6709 Spine \u76AE\u80A4\u5E76\u8BFB\u53D6\u5F53\u524D\u9AA8\u67B6", { ...component, name: str }, ["componentId", "name"], "runtime", "F26");
    add("runtime.spine.set_attachment", "\u8BBE\u7F6E\u6307\u5B9A\u63D2\u69FD\u7684\u5DF2\u6709\u9644\u4EF6", { ...component, slot: str, name: str }, ["componentId", "slot", "name"], "runtime", "F26");
    add("runtime.spine.trace", "\u6309\u771F\u5B9E\u5E27\u8BB0\u5F55 Spine \u8F68\u9053\uFF1B\u4E0D\u5B89\u88C5\u8986\u76D6\u5F0F\u4E8B\u4EF6\u56DE\u8C03", { ...component, frames: { type: "integer", minimum: 1, maximum: 300 } }, ["componentId", "frames"], "read", "F26");
    add("runtime.tilemap.inspect", "\u8BFB\u53D6\u5730\u56FE\u56FE\u5C42\u548C\u5BF9\u8C61\u7EC4", component, ["componentId"], "read", "F28");
    const region = { ...component, x: { type: "integer", minimum: 0 }, y: { type: "integer", minimum: 0 }, width: { type: "integer", minimum: 1, maximum: 64 }, height: { type: "integer", minimum: 1, maximum: 64 } };
    add("runtime.tilemap.query_region", "\u8BFB\u53D6\u5DF2\u6709 TiledLayer \u533A\u57DF GID \u548C\u7FFB\u8F6C\u4F4D", region, ["componentId", "x", "y", "width", "height"], "read", "F28");
    const edits = { ...component, rows: { type: "array", minItems: 1, maxItems: 512, items: Schema.object({ x: { type: "integer", minimum: 0 }, y: { type: "integer", minimum: 0 }, gid: { type: "integer", minimum: 0, maximum: 536870911 }, flags: { type: "integer", minimum: 0, maximum: 4294967295 } }, ["x", "y", "gid"]) } };
    add("runtime.tilemap.plan", "\u9884\u89C8\u8FD0\u884C\u65F6\u74E6\u7247\u4FEE\u6539\uFF1B\u4E0D\u6539 TMX \u6E90\u6587\u4EF6", edits, ["componentId", "rows"], "read", "F28");
    add("runtime.tilemap.apply", "\u6309\u5FEB\u7167\u5B88\u536B\u4FEE\u6539\u8FD0\u884C\u65F6\u74E6\u7247\u5E76\u8BFB\u56DE", { ...edits, planHash: str }, ["componentId", "rows", "planHash"], "runtime", "F28");
    return rows;
  }
};

// packages/capability-catalog/src/engine-features.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var EngineFeatureCapabilities = class _EngineFeatureCapabilities {
  static vector = Schema.object({ x: { type: "number", minimum: -1e5, maximum: 1e5 }, y: { type: "number", minimum: -1e5, maximum: 1e5 }, z: { type: "number", minimum: -1e5, maximum: 1e5 } }, ["x", "y", "z"]);
  static path = { mode: Schema.enum("linear", "bezier", "catmull_rom"), points: { type: "array", minItems: 2, maxItems: 256, items: this.vector }, samples: { type: "integer", minimum: 2, maximum: 1e3 }, uniformSpeed: Schema.boolean() };
  list() {
    const rows = [];
    const add = (id, module2, title, effect, properties, required = []) => {
      rows.push({ id, module: module2, title, description: title, effect, context: id.startsWith("runtime.") ? "runtime" : "editor", inputSchema: Schema.object(properties, required), outputSchema: {}, versions: [3], supportedMajors: [3], implementation: "implemented", verification: "unverified", prerequisites: ["Creator 3.8.8\uFF1B\u4F9D\u8D56\u7F3A\u5931\u8FD4\u56DE supported=false"], source: "cocos/cocos-engine@411f98df047c25902f93440d4b22925c2fb65461", rollback: "\u4E34\u65F6\u5BF9\u8C61\u6309\u6240\u6709\u6743\u6E05\u7406\uFF1B\u6301\u4E45\u5316\u53D8\u66F4\u4F7F\u7528\u8BA1\u5212\u5B88\u536B\uFF1B\u6E38\u620F\u4E8B\u4EF6\u4E0D\u53EF\u56DE\u6EDA" });
    };
    for (const action of ["plan", "sample"]) add(`path.${action}`, "F23", "\u5F15\u64CE\u6837\u6761\u91C7\u6837\u4E0E\u8FD1\u4F3C\u7B49\u901F\u89C4\u5212", "read", _EngineFeatureCapabilities.path, ["points"]);
    add("path.bake_clip", "F23", "\u5C06\u5C40\u90E8\u8DEF\u5F84\u91C7\u6837\u4FDD\u5B58\u4E3A\u4F4D\u7F6E\u52A8\u753B\uFF0C\u4E0D\u81EA\u52A8\u7ED1\u5B9A\u6216\u64AD\u653E", "asset", { ..._EngineFeatureCapabilities.path, url: Schema.string(), rootId: Schema.string(), name: Schema.string(), targetPath: { type: "string", maxLength: 512 }, duration: { type: "number", exclusiveMinimum: 0, maximum: 600 } }, ["points", "url", "rootId", "name", "duration"]);
    const component = { componentId: Schema.string() }, graph = { ...component, layer: { type: "integer", minimum: 0, maximum: 63 } };
    add("runtime.animation_graph.inspect", "F24", "\u67E5\u8BE2\u52A8\u753B\u56FE\u53D8\u91CF\u3001\u5C42\u72B6\u6001\u3001\u8FC7\u6E21\u4E0E\u526A\u8F91\u6743\u91CD", "read", graph, ["componentId"]);
    add("runtime.animation_graph.set_parameter", "F24", "\u4FEE\u6539\u5DF2\u6709\u52A8\u753B\u56FE\u6807\u91CF\u53C2\u6570\u5E76\u8BFB\u56DE", "runtime", { ...graph, name: Schema.string(), value: { anyOf: [{ type: "number" }, { type: "boolean" }] } }, ["componentId", "name", "value"]);
    for (const action of ["trace", "assert"]) add(`runtime.animation_graph.${action}`, "F24", "\u6309\u5B9E\u9645\u6E32\u67D3\u5E27\u89C2\u6D4B\u52A8\u753B\u56FE\u72B6\u6001", "read", { ...graph, frames: { type: "integer", minimum: 1, maximum: 300 }, ...action === "assert" ? { stateId: Schema.string() } : {} }, ["componentId", ...action === "assert" ? ["stateId"] : []]);
    const debug = { cameraComponentId: Schema.string(), ownerId: Schema.string(), ttlMs: { type: "integer", minimum: 16, maximum: 3e4 }, depthTest: Schema.boolean(), color: { type: "array", minItems: 4, maxItems: 4, items: { type: "integer", minimum: 0, maximum: 255 } }, lines: { type: "array", minItems: 1, maxItems: 1024, items: Schema.object({ start: _EngineFeatureCapabilities.vector, end: _EngineFeatureCapabilities.vector }, ["start", "end"]) } };
    add("runtime.debug.draw", "F11", "\u5411\u5DF2\u6FC0\u6D3B\u7684\u76F8\u673A\u8C03\u8BD5\u7ED8\u5236\u5668\u63D0\u4EA4\u6709\u754C\u4E16\u754C\u5750\u6807\u7EBF\u6BB5", "runtime", debug, ["cameraComponentId", "ownerId", "lines"]);
    const { lines: _lines, ...drawing } = debug, vector = _EngineFeatureCapabilities.vector;
    add("runtime.debug.shape", "F11", "\u7ED8\u5236\u4E16\u754C\u5750\u6807\u5C04\u7EBF\u3001\u5305\u56F4\u76D2\u3001\u89C6\u9525\u6216\u63A2\u9488\u70B9", "runtime", { ...drawing, shape: { anyOf: [
      Schema.object({ kind: { const: "ray" }, origin: vector, direction: vector, length: { type: "number", exclusiveMinimum: 0, maximum: 1e4 } }, ["kind", "origin", "direction", "length"]),
      Schema.object({ kind: { const: "box" }, min: vector, max: vector }, ["kind", "min", "max"]),
      Schema.object({ kind: { const: "frustum" }, corners: { type: "array", minItems: 8, maxItems: 8, items: vector } }, ["kind", "corners"]),
      Schema.object({ kind: { const: "points" }, points: { type: "array", minItems: 1, maxItems: 256, items: vector }, radius: { type: "number", exclusiveMinimum: 0, maximum: 10 } }, ["kind", "points"])
    ] } }, ["cameraComponentId", "ownerId", "shape"]);
    add("runtime.debug.inspect", "F11", "\u67E5\u8BE2\u5DE5\u5177\u7ED8\u5236\u7EC4\u548C\u7ED8\u5236\u5931\u8D25\u8BB0\u5F55", "read", {});
    add("runtime.debug.clear", "F11", "\u53EA\u6E05\u7406\u6307\u5B9A ownerId \u7684\u5DE5\u5177\u7ED8\u5236\u7EC4", "runtime", { ownerId: Schema.string() }, ["ownerId"]);
    add("runtime.path.preview", "F23", "\u5C06\u5C40\u90E8\u8DEF\u5F84\u8F6C\u6362\u5230\u4E16\u754C\u5750\u6807\u5E76\u663E\u793A", "runtime", { ..._EngineFeatureCapabilities.path, cameraComponentId: Schema.string(), parentId: Schema.string(), ownerId: Schema.string(), ttlMs: { type: "integer", minimum: 16, maximum: 3e4 } }, ["points", "cameraComponentId", "parentId", "ownerId"]);
    for (const family of ["sorting", "postprocess", "probe"]) {
      add(`${family}.inspect`, family === "sorting" ? "F18" : family === "probe" ? "F30" : "F31", "\u67E5\u8BE2\u539F\u751F\u7EC4\u4EF6\u80FD\u529B\u4E0E\u914D\u7F6E", "read", component, ["componentId"]);
      const properties = family === "sorting" ? { sortingLayer: { type: "integer", minimum: 0 }, sortingOrder: { type: "integer", minimum: -32768, maximum: 32767 } } : family === "probe" ? { probes: { type: "array", minItems: 8, maxItems: 4096, items: _EngineFeatureCapabilities.vector } } : { enabled: Schema.boolean(), threshold: { type: "number", minimum: 0, maximum: 100 }, iterations: { type: "integer", minimum: 1, maximum: 6 }, intensity: { type: "number", minimum: 0, maximum: 100 }, contribute: { type: "number", minimum: 0, maximum: 1 } };
      for (const action of ["plan", "apply"]) add(`${family}.${action}`, family === "sorting" ? "F18" : family === "probe" ? "F30" : "F31", "\u751F\u6210\u6216\u6267\u884C\u6709\u573A\u666F\u6307\u7EB9\u5B88\u536B\u7684\u7EC4\u4EF6\u4FEE\u6539", action === "plan" ? "read" : "scene", { ...component, properties: Schema.object(properties), ...action === "apply" ? { planHash: Schema.string() } : {} }, ["componentId", "properties", ...action === "apply" ? ["planHash"] : []]);
    }
    add("runtime.probe.preview", "F30", "\u5206\u9875\u9884\u89C8\u5DF2\u6709\u63A2\u9488\u7EC4\uFF0C\u8F6C\u6362\u5230\u4E16\u754C\u5750\u6807\uFF0C\u4E0D\u70D8\u7119", "runtime", { ...drawing, ...component, offset: { type: "integer", minimum: 0, maximum: 4095 }, limit: { type: "integer", minimum: 1, maximum: 256 }, radius: { type: "number", exclusiveMinimum: 0, maximum: 10 } }, ["componentId", "cameraComponentId", "ownerId"]);
    add("probe.generate", "F30", "\u751F\u6210\u5747\u5300\u63A2\u9488\u5C40\u90E8\u70B9\u9635\uFF1B\u81EA\u9002\u5E94\u6A21\u5F0F\u660E\u786E\u4E0D\u652F\u6301", "read", { min: _EngineFeatureCapabilities.vector, max: _EngineFeatureCapabilities.vector, counts: Schema.object({ x: { type: "integer", minimum: 2, maximum: 32 }, y: { type: "integer", minimum: 2, maximum: 32 }, z: { type: "integer", minimum: 2, maximum: 32 } }, ["x", "y", "z"]), method: Schema.enum("uniform", "adaptive") }, ["min", "max", "counts"]);
    add("runtime.character.inspect", "F33", "\u67E5\u8BE2\u89D2\u8272\u63A7\u5236\u5668\u72B6\u6001\u548C\u540E\u7AEF\u652F\u6301", "read", component, ["componentId"]);
    add("runtime.character.test_route", "F33", "\u6267\u884C\u6709\u754C\u89D2\u8272\u4F4D\u79FB\u5E76\u8BB0\u5F55\u78B0\u649E\u4E8B\u4EF6\u53CA\u76EE\u6807\u8BEF\u5DEE", "runtime", { ...component, movements: { type: "array", minItems: 1, maxItems: 120, items: _EngineFeatureCapabilities.vector }, expectedEnd: _EngineFeatureCapabilities.vector, tolerance: { type: "number", exclusiveMinimum: 0, maximum: 10 } }, ["componentId", "movements"]);
    add("runtime.skinning.inspect", "F21", "\u67E5\u8BE2\u5DF2\u6709\u8499\u76AE\u5408\u6279\u7EC4\u4EF6\u3001\u6750\u8D28\u4E0E\u56FE\u96C6\u914D\u7F6E", "read", component, ["componentId"]);
    add("runtime.skinning.plan", "F21", "\u68C0\u67E5\u5408\u6279\u7F16\u8BD1\u7F3A\u9677\u3001\u5171\u4EAB\u9AA8\u67B6\u4E0E\u5355\u5143\u9884\u7B97\uFF0C\u4E0D\u6FC0\u6D3B\u7EC4\u4EF6", "read", component, ["componentId"]);
    add("runtime.postprocess.inspect", "F31", "\u6838\u67E5\u76F8\u673A\u5F00\u5173\u3001\u5B9E\u9645\u7BA1\u7EBF\u53CA\u540E\u5904\u7406 Pass\uFF1B\u4E0D\u4EE3\u8868\u50CF\u7D20\u6548\u679C\u901A\u8FC7", "read", { ...component, cameraComponentId: Schema.string() }, ["componentId", "cameraComponentId"]);
    add("runtime.ik.inspect", "F24", "\u67E5\u8BE2\u52A8\u753B\u63A7\u5236\u5668\u7684\u7A0B\u5E8F\u5316\u52A8\u753B\u6A21\u5757\u53EF\u7528\u6027", "read", component, ["componentId"]);
    const ik = { rootId: Schema.string(), endEffectorPath: Schema.string(), target: _EngineFeatureCapabilities.vector, pole: _EngineFeatureCapabilities.vector, name: { type: "string", minLength: 1, maxLength: 128 }, url: Schema.string(), enabledParameter: { type: "string", pattern: "^[A-Za-z][A-Za-z0-9_]{0,63}$" } };
    add("ik.inspect", "F24", "\u68C0\u67E5\u53CC\u9AA8\u9ABC\u94FE\u4E0E\u539F\u751F\u52A8\u753B\u56FE\u7F16\u8F91 API", "read", { rootId: Schema.string(), endEffectorPath: Schema.string() }, ["rootId", "endEffectorPath"]);
    for (const action of ["plan", "apply"]) add(`ik.${action}`, "F24", "\u521B\u5EFA\u72EC\u7ACB\u53CC\u9AA8\u9ABC IK \u56FE\uFF1B\u4E0D\u8986\u76D6\u6216\u81EA\u52A8\u7ED1\u5B9A\u5DF2\u6709\u56FE", action === "plan" ? "read" : "asset", { ...ik, ...action === "apply" ? { planHash: Schema.string() } : {} }, ["rootId", "endEffectorPath", "target", "name", "url", ...action === "apply" ? ["planHash"] : []]);
    add("ik.mask_create", "F24", "\u521B\u5EFA\u7ECF\u8FC7\u9AA8\u9ABC\u8DEF\u5F84\u6821\u9A8C\u7684\u72EC\u7ACB\u52A8\u753B\u906E\u7F69", "asset", { rootId: Schema.string(), url: Schema.string(), name: { type: "string", minLength: 1, maxLength: 128 }, joints: { type: "array", minItems: 1, maxItems: 256, items: Schema.object({ path: Schema.string(), enabled: Schema.boolean() }, ["path", "enabled"]) } }, ["rootId", "url", "name", "joints"]);
    return rows;
  }
};

// packages/capability-catalog/src/shader.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var ShaderCapabilities = class {
  list() {
    const rows = [];
    const str = Schema.string();
    const obj = Schema.record();
    const integer = Schema.integer();
    const materialProperties = { ...Schema.record(), description: '\u6750\u8D28\u5C5E\u6027\u503C\u6620\u5C04\uFF0C\u4E0D\u662F Pass property \u58F0\u660E\u3002\u6807\u91CF\u7528 number/boolean\uFF1B\u989C\u8272 {type:"color",value:[255,255,255,255]}\uFF080..255\uFF09\uFF1B\u5411\u91CF {type:"vec4",value:[1,1,1,1]}\uFF1B\u7EB9\u7406 {type:"texture",uuid:"\u8D44\u6E90 UUID"}\u3002\u4E5F\u63A5\u53D7\u5B8C\u6574 r/g/b/a \u6216 x/y/z/w \u5206\u91CF\u5BF9\u8C61\u3002\u6570\u7EC4\u8868\u793A uniform \u6570\u7EC4\uFF0C\u4E0D\u81EA\u52A8\u731C\u6D4B\u5411\u91CF\u3002' };
    const url = { url: str };
    const guard = { ...url, expectedHash: str };
    const material = { ...guard, properties: materialProperties, defines: obj, states: obj, technique: integer, passIndex: { ...integer, description: "\u5F53\u524D\u542F\u7528\u7684\u6E32\u67D3 Pass \u7D22\u5F15\uFF0C\u4E0E material.properties \u7684 rows[].pass \u4E00\u81F4\uFF1B\u5DE5\u5177\u6620\u5C04\u5230 Effect \u539F\u59CB\u7F16\u53F7\u3002" } };
    const target = { componentId: str, slot: integer };
    const add = (id, title, effect, properties, required = []) => {
      rows.push({
        id,
        title,
        description: title,
        module: "F22",
        context: id.startsWith("runtime.") ? "runtime" : "editor",
        effect,
        inputSchema: Schema.object(properties, required),
        outputSchema: { type: "object" },
        versions: [3],
        supportedMajors: [3],
        implementation: "implemented",
        verification: "unverified",
        platforms: [id.startsWith("runtime.") ? "development-runtime" : "editor"],
        prerequisites: ["Creator 3.8.8\uFF1B\u5176\u4ED6\u7248\u672C\u5148\u67E5\u8BE2 shader.environment"],
        ...effect !== "read" ? { rollback: "\u4F7F\u7528\u672C\u6B21\u8D44\u6E90\u5907\u4EFD\u6216 runtime.material.reset\uFF1B\u6062\u590D\u524D\u6821\u9A8C\u5F53\u524D\u7248\u672C\uFF0C\u7981\u6B62\u5168\u5C40\u64A4\u9500" } : {}
      });
    };
    add("shader.environment", "\u67E5\u8BE2 Shader \u5DE5\u5177\u94FE\u3001\u7CBE\u786E\u7248\u672C\u4E0E\u9A8C\u8BC1\u8FB9\u754C", "read", {});
    add("shader.templates", "\u67E5\u8BE2\u5F53\u524D\u5F15\u64CE\u7684 Effect \u6A21\u677F\u4E0E\u6E90\u7801", "read", { name: str });
    add("shader.read", "\u8BFB\u53D6 Effect/Chunk \u6E90\u7801\u53CA\u5185\u5BB9\u54C8\u5E0C", "read", url, ["url"]);
    add("shader.create", "\u521B\u5EFA Effect/Chunk \u5E76\u901A\u8FC7 AssetDB \u5BFC\u5165", "asset", { ...url, content: str }, ["url", "content"]);
    add("shader.update", "\u5E26\u6E90\u7801\u54C8\u5E0C\u5B88\u536B\u66F4\u65B0 Effect/Chunk \u5E76\u5907\u4EFD", "asset", { ...guard, content: str }, ["url", "expectedHash", "content"]);
    for (const id of ["inspect", "validate", "dependencies"]) add(`shader.${id}`, `\u8BFB\u53D6 Shader ${id} \u7ED3\u679C\u53CA\u539F\u751F\u8BCA\u65AD`, "read", url, ["url"]);
    add("shader.compile", "\u539F\u751F Effect \u7F16\u8BD1\uFF1B\u8FD4\u56DE\u4EFB\u52A1\u53CA\u6E90\u7801\u4F9D\u8D56\u6307\u7EB9", "read", { ...url, includeSource: Schema.boolean() }, ["url"]);
    add("shader.diagnostics", "\u67E5\u8BE2\u7F16\u8BD1\u4EFB\u52A1\u5E76\u68C0\u67E5\u6E90\u7801\u662F\u5426\u5DF2\u8FC7\u671F", "read", { taskId: str }, ["taskId"]);
    add("shader.variants.plan", "\u751F\u6210\u6709\u6570\u91CF\u4E0A\u9650\u7684\u5B8F\u7EC4\u5408\u8BA1\u5212", "read", { axes: Schema.record(), limit: { type: "integer", minimum: 1, maximum: 256 } }, ["axes"]);
    add("shader.restore", "\u4EC5\u5F53\u5F53\u524D\u6E90\u7801\u5339\u914D\u65F6\u6062\u590D\u672C\u6B21\u8D44\u6E90\u5907\u4EFD", "asset", { backupId: str, expectedHash: str }, ["backupId", "expectedHash"]);
    add("shader.preview.connect", "\u5C06\u5DF2\u6253\u5F00\u7684 MCP \u9884\u89C8\u8FDE\u63A5\u5230\u672C\u5DE5\u7A0B\u5F00\u53D1\u8FD0\u884C\u65F6\u7F51\u5173", "runtime", { gatewayPort: { type: "integer", minimum: 1, maximum: 65535 } });
    add("material.query", "\u8BFB\u53D6\u6301\u4E45\u5316\u6750\u8D28\u548C\u6E90\u7801\u54C8\u5E0C", "read", url, ["url"]);
    add("material.create", "\u901A\u8FC7\u5F15\u64CE\u521D\u59CB\u5316\u548C\u5E8F\u5217\u5316\u521B\u5EFA\u6750\u8D28", "asset", { ...material, effectUrl: str }, ["url", "effectUrl"]);
    add("material.clone", "\u590D\u5236\u6750\u8D28\u8D44\u6E90\u5230\u65B0\u8DEF\u5F84", "asset", { sourceUrl: str, targetUrl: str }, ["sourceUrl", "targetUrl"]);
    add("material.update", "\u5728\u526F\u672C\u4E0A\u9A8C\u8BC1\u6750\u8D28\u53C2\u6570\u540E\u4FDD\u5B58\u5E76\u5907\u4EFD", "asset", material, ["url", "expectedHash"]);
    add("material.migrate", "\u9884\u89C8\u6216\u5E94\u7528 Effect \u5207\u6362\u53CA\u53C2\u6570\u8FC1\u79FB", "asset", { ...material, effectUrl: str, apply: Schema.boolean() }, ["url", "effectUrl", "expectedHash"]);
    for (const id of ["properties", "defines", "states"]) add(`material.${id}`, `\u67E5\u8BE2\u6750\u8D28 ${id} \u4E0E Pass \u6570\u636E`, "read", url, ["url"]);
    add("material.bindings", "\u67E5\u8BE2\u5F53\u524D\u573A\u666F\u6750\u8D28\u5F15\u7528\u548C\u8D44\u6E90\u4F7F\u7528\u8005", "read", url, ["url"]);
    add("material.assign", "\u5E26\u65E7\u5F15\u7528\u5B88\u536B\u7ED1\u5B9A\u7EC4\u4EF6\u6750\u8D28\u69FD\u5E76\u8BFB\u56DE", "scene", { ...target, materialUuid: str, expectedMaterialUuid: { type: "string" } }, ["componentId", "materialUuid", "expectedMaterialUuid"]);
    add("material.apply_runtime", "\u4FDD\u5B58\u7528\u6237\u9009\u5B9A\u7684\u8FD0\u884C\u65F6\u53C2\u6570\u5FEB\u7167", "asset", { ...guard, properties: materialProperties, defines: obj, states: obj, passIndex: integer }, ["url", "expectedHash", "properties"]);
    add("runtime.material.inspect", "\u67E5\u8BE2\u7EC4\u4EF6\u6750\u8D28\u5B9E\u9645\u53C2\u6570\u4E0E\u8986\u76D6", "read", target, ["componentId"]);
    add("runtime.material.update", "\u521B\u5EFA\u72EC\u7ACB\u6750\u8D28\u5B9E\u4F8B\u5E76\u539F\u5B50\u66FF\u6362\uFF0C\u5931\u8D25\u4FDD\u7559\u539F\u5BF9\u8C61", "runtime", { ...target, properties: materialProperties, defines: obj, states: obj, passIndex: integer }, ["componentId"]);
    add("runtime.material.reset", "\u6062\u590D\u672C\u5DE5\u5177\u4FEE\u6539\u7684\u6750\u8D28\u7ED1\u5B9A\u5E76\u9500\u6BC1\u81EA\u6709\u5B9E\u4F8B", "runtime", target, ["componentId"]);
    add("runtime.material.compile", "\u7F16\u8BD1\u5F53\u524D\u6750\u8D28 Pass \u5E76\u62A5\u544A\u771F\u5B9E\u5F15\u64CE\u8FD4\u56DE\u503C", "runtime", target, ["componentId"]);
    add("runtime.shader.variants.compile", "\u4EE5\u4E34\u65F6\u5B9E\u4F8B\u9A8C\u8BC1\u6709\u4E0A\u9650\u7684\u5B8F\u7EC4\u5408", "runtime", { ...target, axes: obj, limit: { type: "integer", minimum: 1, maximum: 256 } }, ["componentId", "axes"]);
    add("runtime.shader.preview.open", "\u521B\u5EFA\u72EC\u7ACB\u76F8\u673A\u548C\u6D4B\u8BD5\u51E0\u4F55\u4F53\u7684 Shader \u9884\u89C8", "runtime", { materialUuid: str, shape: Schema.enum("sphere", "quad", "cube"), width: { type: "integer", minimum: 16, maximum: 2048 }, height: { type: "integer", minimum: 16, maximum: 2048 } }, ["materialUuid"]);
    add("runtime.shader.preview.update", "\u66F4\u65B0\u9884\u89C8\u5B9E\u4F8B\u53C2\u6570", "runtime", { properties: materialProperties, defines: obj, states: obj, passIndex: integer });
    add("runtime.shader.preview.capture", "\u8BFB\u53D6\u9884\u89C8 RenderTexture \u50CF\u7D20\u5E76\u751F\u6210\u56FE\u50CF", "read", {});
    add("runtime.shader.preview.compare", "\u6BD4\u8F83\u672C\u6B21\u9884\u89C8\u4E0E\u5DF2\u4FDD\u5B58\u7684\u8FD0\u884C\u65F6\u57FA\u7EBF", "read", { baselineId: str, tolerance: { type: "number", minimum: 0, maximum: 1 } }, ["baselineId"]);
    add("runtime.shader.preview.close", "\u91CA\u653E\u9884\u89C8\u81EA\u6709\u8282\u70B9\u3001\u6750\u8D28\u548C\u7EB9\u7406", "runtime", {});
    add("runtime.shader.profile", "\u6309\u771F\u5B9E\u5E27\u4E8B\u4EF6\u91C7\u6837\u6574\u5E27\u6027\u80FD\u53CA\u9884\u7B97\uFF1B\u4E0D\u4F2A\u79F0 GPU \u8017\u65F6", "read", { frames: { type: "integer", minimum: 2, maximum: 300 }, warmupFrames: { type: "integer", minimum: 1, maximum: 120 }, maxFrameMs: { type: "number", exclusiveMinimum: 0, maximum: 1e3 } });
    return rows;
  }
};

// packages/capability-catalog/src/scene-production.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var SceneProductionCapabilities = class {
  list() {
    const rows = [], str = Schema.string();
    const vector = Schema.object({ x: Schema.number(), y: Schema.number(), z: Schema.number() }, ["x", "y", "z"]);
    const bounded = (minimum, maximum) => ({ type: "number", minimum, maximum });
    const add = (id, title, effect, properties, required = []) => {
      rows.push({
        id,
        title,
        description: title,
        module: id.startsWith("geometry.") ? "F21" : "F31",
        context: "editor",
        effect,
        inputSchema: Schema.object(properties, required),
        outputSchema: {},
        versions: [3],
        supportedMajors: [3],
        implementation: "implemented",
        verification: "unverified",
        prerequisites: ["Creator 3.8.8\uFF1B\u4FEE\u6539\u540E\u9700\u663E\u5F0F scene.save"],
        rollback: "\u5931\u8D25\u65F6\u8FD4\u56DE\u672C\u6B21\u521B\u5EFA\u76EE\u6807\u548C\u5DF2\u5B8C\u6210\u6B65\u9AA4\uFF1B\u4E0D\u64A4\u9500\u7528\u6237\u4FEE\u6539\u6216\u81EA\u52A8\u5220\u9664\u5DF2\u5BFC\u5165\u8D44\u6E90"
      });
    };
    add("geometry.create", "\u751F\u6210\u5E26\u53C2\u6570\u53CA\u771F\u5B9E\u5012\u89D2\u7684 Cube/Cylinder/Sphere/Torus \u8D44\u6E90\u5E76\u521B\u5EFA\u573A\u666F\u8282\u70B9", "asset", {
      name: str,
      url: str,
      shape: Schema.enum("cube", "cylinder", "sphere", "torus"),
      parentId: str,
      materialUuid: str,
      position: vector,
      rotation: vector,
      options: Schema.object({
        size: vector,
        bevel: bounded(0, 5e3),
        radius: bounded(1e-3, 1e4),
        height: bounded(1e-3, 1e4),
        tubeRadius: bounded(1e-4, 1e4),
        tubeHeight: bounded(1e-4, 1e4),
        segments: { type: "integer", minimum: 8, maximum: 128 }
      })
    }, ["name", "url", "shape", "materialUuid"]);
    add("geometry.array", "\u590D\u5236\u8282\u70B9\u5B50\u6811\u751F\u6210\u6709\u9650\u91CD\u590D\u9635\u5217\uFF0C\u4FDD\u7559\u539F\u8282\u70B9\u5E76\u8BFB\u56DE\u6BCF\u4EFD\u53D8\u6362", "scene", {
      nodeId: str,
      count: { type: "integer", minimum: 1, maximum: 100 },
      offset: vector,
      rotationStep: vector,
      namePrefix: str
    }, ["nodeId", "count", "offset"]);
    add("rendering.query", "\u8BFB\u53D6\u5F53\u524D\u573A\u666F\u5168\u5C40\u6E32\u67D3\u8BBE\u7F6E\u4E0E\u6307\u5B9A\u76F8\u673A\u540E\u5904\u7406\uFF1B\u660E\u786E AO \u548C\u900F\u5C04\u8FB9\u754C", "read", { cameraNodeId: str });
    add("rendering.configure", "\u8BBE\u7F6E Builtin \u76F8\u673A Bloom/FXAA \u4E0E\u771F\u5B9E\u9634\u5F71\u56FE\uFF0C\u9010\u9879\u8BFB\u56DE", "scene", {
      cameraNodeId: str,
      lightComponentId: str,
      bloom: Schema.object({ enabled: Schema.boolean(), threshold: bounded(0, 100), intensity: bounded(0, 10), iterations: { type: "integer", minimum: 1, maximum: 6 } }, ["enabled"]),
      fxaa: Schema.boolean(),
      editorPreview: Schema.boolean(),
      shadows: Schema.object({ enabled: Schema.boolean(), resolution: { type: "integer", enum: [512, 1024, 2048, 4096] }, pcf: { type: "integer", minimum: 0, maximum: 3 }, bias: bounded(0, 1), normalBias: bounded(0, 1) }, ["enabled"]),
      ambientOcclusion: Schema.enum("unchanged", "hbao"),
      transmission: Schema.enum("unchanged", "physical")
    });
    add("rendering.planar_reflection", "\u521B\u5EFA\u5E73\u9762\u53CD\u5C04\u63A2\u9488\uFF0C\u7ED1\u5B9A\u771F\u5B9E\u76F8\u673A\u548C MeshRenderer\uFF0C\u9A8C\u8BC1\u5F15\u7528", "scene", {
      name: str,
      cameraComponentId: str,
      rendererComponentIds: { type: "array", items: str, minItems: 1, maxItems: 200, uniqueItems: true },
      position: vector,
      size: vector,
      resolution: { type: "integer", enum: [128, 256, 512, 1024] }
    }, ["name", "cameraComponentId", "rendererComponentIds", "position", "size"]);
    return rows;
  }
};

// packages/capability-catalog/src/ui.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var UiCapabilities = class {
  list() {
    const document = { ...UiDocumentModel.schema };
    delete document.$defs;
    const creation = { ...Schema.object({ parentId: Schema.string(), document }, ["parentId", "document"]), $defs: UiDocumentModel.schema.$defs };
    const build = { ...creation, properties: { ...creation.properties, planHash: Schema.string() }, required: ["parentId", "document", "planHash"] };
    const update = { ...Schema.object({ rootId: Schema.string(), document, mapping: { type: "array", minItems: 1, maxItems: 200, items: Schema.object({ key: Schema.string(), nodeId: Schema.string() }, ["key", "nodeId"]) } }, ["rootId", "document", "mapping"]), $defs: UiDocumentModel.schema.$defs };
    const apply = { ...update, properties: { ...update.properties, planHash: Schema.string() }, required: ["rootId", "document", "mapping", "planHash"] };
    return [
      ["ui.diff", "\u6BD4\u8F83\u5DF2\u6709 UI \u7684\u58F0\u660E\u5C5E\u6027\uFF1B\u4FDD\u6301 UUID\uFF0C\u62A5\u544A\u9700\u8981\u5355\u72EC\u5904\u7406\u7684\u7ED3\u6784\u53D8\u66F4", "read", update],
      ["ui.apply", "\u6309 planHash \u539F\u4F4D\u66F4\u65B0\u5DF2\u6709 UI \u5C5E\u6027\uFF1B\u51B2\u7A81\u65F6\u4FDD\u7559\u73B0\u573A\uFF0C\u7981\u6B62\u5220\u9664\u91CD\u5EFA", "scene", apply],
      ["ui.plan", "\u9759\u6001 UI \u9ED8\u8BA4\u5165\u53E3\uFF1A\u89C4\u5212\u53EF\u7F16\u8F91\u573A\u666F\u8282\u70B9\uFF0C\u68C0\u67E5\u7248\u672C\u3001\u5F15\u7528\u548C\u540D\u79F0\u51B2\u7A81\uFF0C\u8FD4\u56DE planHash", "read", creation],
      ["ui.build", "\u9759\u6001 UI \u9ED8\u8BA4\u901A\u8FC7\u5DF2\u89C4\u5212\u6587\u6863\u521B\u5EFA\u7F16\u8F91\u5668\u8282\u70B9\uFF0C\u8FD4\u56DE UUID \u6620\u5C04\uFF1B\u968F\u540E scene.save \u6216 prefab.create \u5E76\u8BFB\u56DE\u9A8C\u8BC1\u3002\u811A\u672C\u53EA\u8D1F\u8D23\u4EA4\u4E92\u4E0E\u52A8\u6001\u5185\u5BB9\uFF1B\u90E8\u5206\u5931\u8D25\u4F7F\u7528\u5C40\u90E8\u8865\u507F", "scene", build],
      ["ui.inspect_layout", "\u8BFB\u53D6\u5B9E\u9645 UI \u56DB\u89D2\u4E0E\u4E16\u754C\u5305\u56F4\u76D2\uFF0C\u8BCA\u65AD\u96F6\u5C3A\u5BF8\u548C\u7236\u8FB9\u754C\u6EA2\u51FA", "read", Schema.object({ rootId: Schema.string() }, ["rootId"])],
      ["ui.validate_interaction", "\u9759\u6001\u68C0\u67E5\u6309\u94AE\u3001Toggle\u3001EditBox \u4E8B\u4EF6\u4E0E\u6807\u7B7E\u3001PageView \u9875\u9762\u53CA\u5BCC\u6587\u672C\u56DE\u8C03\uFF1B\u4E0D\u89E6\u53D1\u56DE\u8C03", "read", Schema.object({ rootId: Schema.string() }, ["rootId"])]
    ].map(([id, title, effect, inputSchema]) => ({
      id,
      title,
      description: title,
      effect,
      inputSchema,
      module: "F20",
      context: "editor",
      outputSchema: {},
      versions: [3],
      supportedMajors: [3],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 3.8.8\uFF1Bui.build \u5FC5\u987B\u4F20 ui.plan \u8FD4\u56DE\u7684 planHash"],
      rollback: "\u53EA\u5220\u9664\u4E0E\u6700\u540E\u786E\u8BA4\u5FEB\u7167\u4E00\u81F4\u7684\u672C\u6279\u5B50\u6811\uFF1B\u4E0D\u786E\u5B9A\u7ED3\u679C\u4FDD\u7559\u5E76\u62A5\u544A pending"
    }));
  }
};

// packages/capability-catalog/src/texture.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var TextureCapabilities = class {
  list() {
    const asset = { url: Schema.string() }, patch = { ...asset, textureUuid: Schema.string(), settings: { ...Schema.object({
      minfilter: Schema.enum("nearest", "linear"),
      magfilter: Schema.enum("nearest", "linear"),
      mipfilter: Schema.enum("none", "nearest", "linear"),
      wrapModeS: Schema.enum("repeat", "clamp-to-edge", "mirrored-repeat"),
      wrapModeT: Schema.enum("repeat", "clamp-to-edge", "mirrored-repeat"),
      anisotropy: { type: "integer", minimum: 1, maximum: 16 }
    }), minProperties: 1 } };
    return [
      ["texture.inspect", "\u8BFB\u53D6\u7EB9\u7406\u6E90\u3001\u5BFC\u5165\u5143\u6570\u636E\u3001\u5B50\u8D44\u6E90\u4E0E\u5F15\u7528\u8005", "read", Schema.object(asset, ["url"])],
      ["texture.plan_import", "\u9884\u89C8\u7EB9\u7406\u91C7\u6837\u3001Mipmap \u4E0E\u5BFB\u5740\u8BBE\u7F6E\u4FEE\u6539", "read", Schema.object(patch, ["url", "settings"])],
      ["texture.apply_import", "\u6309 planHash \u4FEE\u6539\u7EB9\u7406\u5BFC\u5165\u8BBE\u7F6E\uFF0C\u5907\u4EFD\u5E76\u91CD\u5BFC\u5165\u9A8C\u8BC1 UUID", "asset", Schema.object({ ...patch, planHash: Schema.string() }, ["url", "settings", "planHash"])],
      ["texture.restore_import", "\u6309\u5F53\u524D expectedHash \u6062\u590D\u540C\u8D44\u6E90\u7684\u5BFC\u5165\u5907\u4EFD", "asset", Schema.object({ ...asset, expectedHash: Schema.string(), backupId: { type: "string", pattern: "^[a-f0-9-]{36}$" } }, ["url", "expectedHash", "backupId"])]
    ].map(([id, title, effect, inputSchema]) => ({
      id,
      title,
      description: title,
      effect,
      inputSchema,
      module: "F16",
      context: "editor",
      outputSchema: {},
      versions: [3],
      supportedMajors: [3],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 3.8.8\uFF1B\u4EC5\u672C\u5730\u5DE5\u7A0B\u5DF2\u6709 image/texture \u8D44\u6E90"],
      rollback: "texture.restore_import \u5E26 backupId \u4E0E\u5F53\u524D expectedHash\uFF1B\u4E0D\u81EA\u52A8\u8986\u76D6\u4E0D\u786E\u5B9A\u5BFC\u5165\u7ED3\u679C"
    }));
  }
};

// packages/capability-catalog/src/runtime-interaction.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RuntimeInteractionCapabilities = class {
  list() {
    const rows = [];
    const add = (id, module2, title, effect, inputSchema) => {
      rows.push({
        id,
        module: module2,
        title,
        description: title,
        context: "runtime",
        effect,
        inputSchema,
        outputSchema: {},
        versions: [3],
        supportedMajors: [3],
        implementation: "implemented",
        verification: "unverified",
        prerequisites: ["Creator 3.8.8 \u5F00\u53D1\u8FD0\u884C\u65F6\u6865\u63A5\u4E0E\u5BF9\u5E94\u5F15\u64CE\u6A21\u5757"],
        rollback: "\u7269\u7406\u67E5\u8BE2\u4E0D\u6B65\u8FDB\uFF1B\u5A92\u4F53\u64CD\u4F5C\u5148\u67E5 before/after\uFF0C\u4E1A\u52A1\u4E8B\u4EF6\u4E0D\u53EF\u56DE\u6EDA\uFF0C\u4E0D\u76F2\u76EE\u91CD\u8BD5"
      });
    };
    const n = { type: "number", minimum: -1e6, maximum: 1e6 }, v2 = Schema.object({ x: n, y: n }, ["x", "y"]), v3 = Schema.object({ x: n, y: n, z: n }, ["x", "y", "z"]);
    const limits = { mask: { type: "integer", minimum: 0, maximum: 4294967295 }, limit: { type: "integer", minimum: 1, maximum: 500 } };
    for (const dimension of [2, 3]) add(`runtime.physics${dimension}d.inspect`, dimension === 2 ? "F33" : "F34", `\u8BFB\u53D6 ${dimension}D \u7269\u7406\u4E16\u754C\u5F00\u5173\u548C\u91CD\u529B\uFF1B\u4E0D\u4FEE\u6539\u6A21\u62DF`, "read", Schema.object({}));
    add("runtime.physics2d.raycast", "F33", "\u6309\u4E16\u754C\u5750\u6807\u7EBF\u6BB5\u67E5\u8BE2 2D \u5168\u90E8\u5939\u5177\u547D\u4E2D\uFF1B\u590D\u5236\u5E76\u6392\u5E8F\u6709\u9650\u7ED3\u679C", "read", Schema.object({ start: v2, end: v2, ...limits }, ["start", "end"]));
    add("runtime.physics3d.raycast", "F34", "\u6309\u5F52\u4E00\u5316\u65B9\u5411\u548C\u6700\u5927\u8DDD\u79BB\u67E5\u8BE2 3D \u5C04\u7EBF\u547D\u4E2D", "read", Schema.object({ origin: v3, direction: v3, maxDistance: { type: "number", exclusiveMinimum: 0, maximum: 1e5 }, queryTrigger: Schema.boolean(), ...limits }, ["origin", "direction"]));
    for (const media of ["audio", "video"]) for (const action of ["state", "play", "pause", "stop", "seek"]) {
      const properties = { componentId: Schema.string() }, required = ["componentId"];
      if (action === "seek") {
        properties.time = { type: "number", minimum: 0, maximum: 86400 };
        required.push("time");
      }
      add(`runtime.${media}.${action}`, "F35", `${media} \u539F\u751F\u7EC4\u4EF6\u64CD\u4F5C ${action}\uFF1B\u8FD4\u56DE\u5F53\u524D\u72B6\u6001\uFF0C\u771F\u5B9E\u64AD\u653E\u8FDB\u5EA6\u53E6\u884C\u9A8C\u8BC1`, action === "state" ? "read" : "runtime", Schema.object(properties, required));
    }
    add("runtime.webview.inspect", "F35", "\u53EA\u8BFB\u68C0\u67E5 WebView \u914D\u7F6E\u5B58\u5728\u6027\uFF1B\u4E0D\u5BFC\u822A\u6216\u6267\u884C\u7F51\u9875\u4EE3\u7801", "read", Schema.object({ componentId: Schema.string() }, ["componentId"]));
    return rows;
  }
};

// packages/capability-catalog/src/animation-runtime.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RuntimeAnimationCapabilities = class {
  list() {
    return ["state", "play", "pause", "resume", "stop", "seek", "blend"].map((action) => {
      const properties = { componentId: Schema.string() }, required = ["componentId"];
      if (action !== "state") {
        properties.name = Schema.string();
        required.push("name");
      }
      if (action === "seek") {
        properties.time = { type: "number", minimum: 0, maximum: 600 };
        required.push("time");
      }
      if (action === "blend") {
        properties.duration = { type: "number", minimum: 0, maximum: 60 };
        required.push("duration");
      }
      return {
        id: `runtime.animation.${action}`,
        module: "F24",
        title: `\u52A8\u753B\u539F\u751F\u72B6\u6001\u4E0E\u64AD\u653E\u63A7\u5236\uFF1A${action}`,
        description: "\u67E5\u8BE2\u547D\u540D\u52A8\u753B\u72B6\u6001\u6216\u6267\u884C\u660E\u786E\u64AD\u653E\u64CD\u4F5C\uFF1B\u8FD4\u56DE\u524D\u540E\u72B6\u6001\uFF0C\u4E0D\u628A\u547D\u4EE4\u8FD4\u56DE\u5F53\u4F5C\u5B9E\u9645\u5E27\u9A8C\u8BC1",
        context: "runtime",
        effect: action === "state" ? "read" : "runtime",
        inputSchema: Schema.object(properties, required),
        outputSchema: {},
        versions: [3],
        supportedMajors: [3],
        implementation: "implemented",
        verification: "unverified",
        prerequisites: ["Creator 3.8.8 \u5F00\u53D1\u8FD0\u884C\u65F6\u6865\u63A5"],
        rollback: "\u6309 before \u663E\u5F0F pause/seek/resume/stop\uFF1B\u5DF2\u89E6\u53D1\u4E1A\u52A1\u4E8B\u4EF6\u4E0E\u6DF7\u5408\u8FC7\u6E21\u4E0D\u53EF\u81EA\u52A8\u56DE\u6EDA\uFF0C\u5931\u8D25\u5148\u67E5\u72B6\u6001"
      };
    });
  }
};

// packages/capability-catalog/src/animation.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/animation-core/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv3 = __toESM(require_ajv(), 1);
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
    const validate = new import_ajv3.Ajv({ strict: true }).compile(_ClipDocumentModel.schema);
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

// packages/capability-catalog/src/animation.ts
var AnimationCapabilities = class {
  list() {
    return [
      ["animation.clip.read", "\u8BFB\u53D6\u52A8\u753B\u6E90\u548C sourceHash\uFF0C\u4F9B\u5B88\u536B\u7F16\u8F91\u4F7F\u7528", "read", Schema.object({ url: Schema.string() }, ["url"])],
      ["animation.clip.patch", "\u6309\u7D22\u5F15\u66FF\u6362\u9009\u5B9A\u4E09\u7EF4\u5411\u91CF\u8F68\u9053\u5173\u952E\u5E27\uFF1B\u4FDD\u7559\u5176\u4ED6\u8F68\u9053\u5E76\u5907\u4EFD", "asset", Schema.object({ url: Schema.string(), expectedHash: Schema.string(), patches: ClipDocumentModel.patchesSchema }, ["url", "expectedHash", "patches"])],
      ["animation.clip.restore", "\u6309\u5F53\u524D sourceHash \u6062\u590D\u540C UUID \u52A8\u753B\u6E90\u5907\u4EFD", "asset", Schema.object({ url: Schema.string(), expectedHash: Schema.string(), backupId: Schema.string() }, ["url", "expectedHash", "backupId"])],
      ["animation.clip.create", "\u539F\u751F\u5E8F\u5217\u5316\u53D8\u6362\u52A8\u753B\u526A\u8F91\uFF1B\u5199\u5165\u524D\u68C0\u67E5\u65F6\u95F4\u3001\u8F68\u9053\u548C\u76EE\u6807\u8DEF\u5F84", "asset", Schema.object({ url: Schema.string(), rootId: Schema.string(), document: ClipDocumentModel.schema }, ["url", "rootId", "document"])],
      ["animation.clip.inspect", "\u67E5\u8BE2\u539F\u751F\u52A8\u753B\u526A\u8F91\u8F68\u9053\u4E0E\u901A\u9053\u5173\u952E\u5E27\u65F6\u95F4", "read", Schema.object({ uuid: Schema.string() }, ["uuid"])],
      ["animation.clip.sample", "\u53EA\u8BFB\u6C42\u503C\u539F\u751F\u52A8\u753B\u66F2\u7EBF\uFF1B\u4E0D\u5E94\u7528\u5230\u8282\u70B9\u6216\u89E6\u53D1\u4E8B\u4EF6", "read", Schema.object({ uuid: Schema.string(), time: { type: "number", minimum: 0, maximum: 600 } }, ["uuid", "time"])]
    ].map(([id, title, effect, inputSchema]) => ({
      id,
      title,
      description: title,
      effect,
      inputSchema,
      module: "F23",
      context: "editor",
      outputSchema: {},
      versions: [3],
      supportedMajors: [3],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 3.8.8\uFF1B\u9996\u7248\u521B\u5EFA\u4EC5 position/scale/eulerAngles\uFF0C\u7EBF\u6027\u6216\u5E38\u91CF\u63D2\u503C"],
      rollback: "\u521B\u5EFA\u4E0D\u8986\u76D6\u5DF2\u6709\u8D44\u6E90\uFF1B\u5BFC\u5165\u9A8C\u8BC1\u5931\u8D25\u4FDD\u7559\u5B9E\u9645 URL/UUID \u4F9B\u68C0\u67E5\uFF0C\u4E0D\u76F2\u76EE\u5220\u9664"
    }));
  }
};

// packages/capability-catalog/src/runtime-assets.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RuntimeAssetCapabilities = class {
  list() {
    const handle = Schema.object({ handle: Schema.string() }, ["handle"]);
    const source = Schema.object({ uuid: Schema.string(), timeoutMs: { type: "integer", minimum: 100, maximum: 3e4 } }, ["uuid"]);
    return [
      ["runtime.asset.load", "\u52A0\u8F7D\u672C\u5730 UUID \u8D44\u6E90\u5E76\u53D6\u5F97\u5DE5\u5177\u72EC\u6709\u5F15\u7528\u53E5\u67C4\uFF1B\u4E0D\u81EA\u52A8\u7ED1\u5B9A", "runtime", source],
      ["runtime.asset.preload", "\u4E0B\u8F7D\u672C\u5730 UUID \u8D44\u6E90\uFF1B\u660E\u786E\u5C1A\u672A\u89E3\u6790\u6216\u53C2\u4E0E\u7ED8\u5236", "runtime", source],
      ["runtime.asset.inspect", "\u8BFB\u53D6\u8D44\u6E90\u53E5\u67C4\u3001\u5F15\u7528\u8BA1\u6570\u53CA\u6709\u6548\u6027", "read", handle],
      ["runtime.asset.release", "\u53EA\u5F52\u8FD8\u5DE5\u5177\u53D6\u5F97\u7684\u4E00\u4EFD\u5F15\u7528\uFF0C\u4E0D\u5F3A\u5236\u91CA\u653E\u5171\u4EAB\u5F15\u64CE\u7F13\u5B58", "runtime", handle],
      ["runtime.bundle.inspect", "\u67E5\u8BE2\u5F53\u524D\u5DF2\u52A0\u8F7D Bundle\uFF1B\u4E0D\u5378\u8F7D\u6E38\u620F\u8D44\u6E90", "read", Schema.object({})]
    ].map(([id, title, effect, inputSchema]) => ({
      id,
      title,
      description: title,
      effect,
      inputSchema,
      module: "F38",
      context: "runtime",
      outputSchema: {},
      versions: [3],
      supportedMajors: [3],
      implementation: "implemented",
      verification: "unverified",
      prerequisites: ["Creator 3.8.8 \u5F00\u53D1\u8FD0\u884C\u65F6\u6865\u63A5"],
      rollback: "\u65AD\u7EBF\u6216\u5207\u573A\u666F\u5F52\u8FD8\u5DE5\u5177\u5F15\u7528\uFF0C\u6302\u8D77\u8BF7\u6C42\u5931\u6548\uFF1B\u5F15\u64CE\u4E0B\u8F7D\u4E0D\u80FD\u4FDD\u8BC1\u53D6\u6D88\uFF0C\u4E0D\u5F3A\u5236\u6E05\u7A7A\u6E38\u620F\u7F13\u5B58"
    }));
  }
};

// packages/capability-catalog/src/creator2-support.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var Creator2Support = class {
  static base = [
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
  ];
  static scene = ["ui.owned_snapshot", "ui.owned_remove", "asset.references.audit", "scene.references", "ui.structure.plan", "ui.structure.apply", "shader.environment", "shader.read", "shader.create", "shader.update", "shader.restore", "shader.inspect", "material.update", "material.apply_runtime", "material.migrate", "material.bindings", "material.query", "material.create", "material.clone", "material.properties", "material.defines", "material.states", "material.assign", "animation.clip.patch", "animation.clip.restore", "animation.clip.read", "animation.clip.create", "animation.clip.inspect", "animation.clip.sample", "animation2d.plan", "animation2d.create", "texture.inspect", "texture.plan_import", "texture.apply_import", "texture.restore_import", "spriteframe.inspect", "spriteframe.plan", "spriteframe.apply", "spriteframe.restore", "view.query", "view.set", "ui.plan", "ui.build", "ui.diff", "ui.apply", "ui.inspect_layout", "ui.validate_interaction"];
  static preview = ["preview.presets", "preview.runtime.connect", "preview.wait", "preview.refresh", "preview.refresh.status", "preview.refresh.cancel", "preview.network", "preview.websocket", "preview.diagnose", "preview.start", "preview.stop", "preview.status", "preview.capture", "preview.logs", "preview.resize", "preview.input", "preview.validate_viewports", "shader.preview.connect"];
  static features = [
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
  ];
  static runtime = [
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
    ...this.features,
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
  ];
};

// packages/capability-catalog/src/roadmap.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RoadmapCapabilities = class _RoadmapCapabilities {
  static presets = [
    { id: "landscape-568", width: 568, height: 320, orientation: "landscape" },
    { id: "landscape-844", width: 844, height: 390, orientation: "landscape" },
    { id: "landscape-1280", width: 1280, height: 720, orientation: "landscape" },
    { id: "landscape-1920", width: 1920, height: 1080, orientation: "landscape" }
  ];
  static selector = { ...Schema.object({ nodeId: Schema.string(), name: Schema.string(), path: Schema.string() }), minProperties: 1 };
  static checks = { type: "array", minItems: 1, maxItems: 100, items: { ...Schema.object({
    selector: _RoadmapCapabilities.selector,
    exists: Schema.boolean(),
    count: { type: "integer", minimum: 0, maximum: 1e3 },
    active: Schema.boolean(),
    text: { type: "string", maxLength: 1e4 },
    interactable: Schema.boolean(),
    visible: Schema.boolean(),
    clipped: Schema.boolean(),
    optional: Schema.boolean()
  }, ["selector"]), minProperties: 2 } };
  list() {
    const rows = [], str = Schema.string(), hash = { type: "string", pattern: "^[a-f0-9]{64}$" };
    const add = (id, title, effect, properties, required = [], module2 = "F52") => {
      rows.push({
        id,
        title,
        description: title,
        module: module2,
        context: id.startsWith("runtime.") ? "runtime" : /^(acceptance|fixture)\./.test(id) || ["preview.regression", "operation.audit.query"].includes(id) ? "service" : "editor",
        effect,
        inputSchema: Schema.object(properties, required),
        outputSchema: {},
        versions: [2, 3],
        supportedMajors: [2, 3],
        implementation: "implemented",
        verification: "unverified",
        prerequisites: ["Creator 2.4.15 \u6216 3.8.8\uFF1B\u771F\u5B9E\u4E1A\u52A1\u548C\u8BBE\u5907\u53E6\u884C\u9A8C\u6536"],
        rollback: "\u53EA\u6062\u590D\u8EAB\u4EFD\u4E0E\u6307\u7EB9\u4ECD\u5339\u914D\u7684\u5DE5\u5177\u81EA\u6709\u8BBE\u7F6E\u548C\u8D44\u6E90\uFF1B\u8F93\u5165\u4E0D\u81EA\u52A8\u91CD\u653E"
      });
    };
    add("preview.presets", "\u5217\u51FA\u6A2A\u5C4F\u7A97\u53E3\u53C2\u8003\u9884\u8BBE\uFF0C\u4E0D\u6A21\u62DF\u771F\u673A", "read", {}, [], "F43");
    add("runtime.view.inspect", "\u8BFB\u53D6\u516C\u5F00\u5F15\u64CE\u89C6\u56FE\u53CA\u51E0\u4F55\u6307\u7EB9", "read", {}, [], "F43");
    add("runtime.view.configure", "\u6309\u6307\u7EB9\u6709\u9650\u4FEE\u6539\u8BBE\u8BA1\u5C3A\u5BF8\u4E0E\u9002\u914D\u7B56\u7565\uFF0C\u8FD4\u56DE\u6062\u590D\u53E5\u67C4", "runtime", {
      width: { type: "integer", minimum: 256, maximum: 4096 },
      height: { type: "integer", minimum: 256, maximum: 4096 },
      policy: Schema.enum("EXACT_FIT", "NO_BORDER", "SHOW_ALL", "FIXED_HEIGHT", "FIXED_WIDTH"),
      expectedHash: hash
    }, ["width", "height", "expectedHash"], "F43");
    add("runtime.view.restore", "\u51B2\u7A81\u68C0\u6D4B\u540E\u6062\u590D\u672C\u4F1A\u8BDD\u89C6\u56FE\u8BBE\u7F6E", "runtime", { restoreId: str }, ["restoreId"], "F43");
    add("runtime.ui.select", "\u89E3\u6790\u552F\u4E00\u8282\u70B9\u3001\u76F8\u673A\u6295\u5F71\u4E0E\u539F\u751F\u547D\u4E2D\u5019\u9009\uFF0C\u4E0D\u89E6\u53D1\u56DE\u8C03", "read", { rootId: str, selector: _RoadmapCapabilities.selector }, ["selector"], "F20");
    add("runtime.ui.check", "\u58F0\u660E\u5F0F\u68C0\u67E5\u5B58\u5728\u3001\u552F\u4E00\u6027\u3001\u53EF\u9009\u8282\u70B9\u3001\u6587\u672C\u53CA\u76F8\u673A\u88C1\u5207", "read", { rootId: str, rows: _RoadmapCapabilities.checks }, ["rows"], "F20");
    add("runtime.ui.click", "\u5411\u7ED1\u5B9A\u7684\u81EA\u6709\u9884\u89C8\u53D1\u9001\u771F\u5B9E\u8F93\u5165\u5E76\u72EC\u7ACB\u68C0\u67E5\u540E\u6001", "runtime", {
      rootId: str,
      selector: _RoadmapCapabilities.selector,
      after: _RoadmapCapabilities.checks,
      allowResume: Schema.boolean(),
      timeoutMs: { type: "integer", minimum: 100, maximum: 3e4 }
    }, ["selector"], "F20");
    add("runtime.scene.load", "\u901A\u8FC7\u516C\u5F00 AssetManager \u548C Director \u52A0\u8F7D\u573A\u666F UUID\uFF0C\u4E0D\u4FEE\u6539\u542F\u52A8\u914D\u7F6E", "runtime", { sceneUuid: str }, ["sceneUuid"], "F03");
    add("runtime.lifecycle.snapshot", "\u8BFB\u53D6\u672C\u4F1A\u8BDD\u53E5\u67C4\u3001\u4EFB\u52A1\u3001\u8BA2\u9605\u3001\u8D44\u4EA7\u548C\u5E27\u7EDF\u8BA1", "read", {}, [], "F46");
    const operation = Schema.object({ capabilityId: str, params: Schema.record() }, ["capabilityId", "params"]);
    add("preview.regression", "\u91CD\u590D\u6709\u9650\u573A\u666F/\u5237\u65B0/\u7A97\u53E3\u64CD\u4F5C\u5E76\u8BB0\u5F55\u751F\u547D\u5468\u671F\u548C\u5EF6\u8FDF\u8BC1\u636E", "runtime", {
      cycles: { type: "integer", minimum: 1, maximum: 10 },
      rows: { type: "array", minItems: 1, maxItems: 8, items: operation },
      maxResourceGrowth: { type: "integer", minimum: 0, maximum: 1e4 }
    }, ["cycles", "rows"], "F46");
    const step = Schema.object({
      capabilityId: str,
      params: Schema.record(),
      paramRefs: { type: "object", additionalProperties: Schema.object({ step: { type: "integer", minimum: 0 }, path: str }, ["step", "path"]) },
      runtimeRef: Schema.object({ step: { type: "integer", minimum: 0 }, path: str }, ["step", "path"]),
      waitFor: Schema.object({ path: str, equals: {}, timeoutMs: { type: "integer", minimum: 1, maximum: 3e4 }, intervalMs: { type: "integer", minimum: 10, maximum: 5e3 } }, ["path", "equals"])
    }, ["capabilityId", "params"]);
    const recipe = {
      mode: Schema.enum("fixture", "live"),
      fixtureId: str,
      allowInputs: Schema.boolean(),
      steps: { type: "array", minItems: 1, maxItems: 50, items: step },
      timeoutMs: { type: "integer", minimum: 100, maximum: 12e4 }
    };
    add("acceptance.plan", "\u6821\u9A8C\u9A8C\u6536\u914D\u65B9\u7684\u526F\u4F5C\u7528\u3001\u9009\u62E9\u5668\u548C\u5939\u5177\u7EA6\u675F", "read", recipe, ["mode", "steps"]);
    add("acceptance.run", "\u6267\u884C\u5DF2\u5BA1\u67E5\u914D\u65B9\uFF0C\u4FDD\u5B58\u539F\u56FE\u3001\u6458\u8981\u3001\u7248\u672C\u4E0E\u6E05\u7406\u7ED3\u679C", "runtime", { ...recipe, planHash: hash }, ["mode", "steps", "planHash"]);
    add("acceptance.status", "\u67E5\u8BE2\u6301\u4E45\u5316\u9A8C\u6536\u8BC1\u636E\u5305\u4E0E\u672A\u5B8C\u6210\u6B65\u9AA4", "read", { runId: str }, ["runId"]);
    add("acceptance.cancel", "\u53D6\u6D88\u914D\u65B9\u540E\u7EED\u6B65\u9AA4\uFF0C\u4FDD\u7559\u672A\u77E5\u539F\u751F\u7ED3\u679C\u548C\u8BC1\u636E", "runtime", { runId: str }, ["runId"]);
    const fixture = {
      parentId: str,
      document: UiDocumentModel.schema,
      label: { type: "string", minLength: 1, maxLength: 128 },
      ttlMs: { type: "integer", minimum: 1e3, maximum: 864e5 },
      allowedOrigins: { type: "array", maxItems: 8, uniqueItems: true, items: str }
    };
    add("fixture.plan", "\u89C4\u5212\u9694\u79BB UI \u5939\u5177\uFF0C\u9ED8\u8BA4\u963B\u6B62\u4E1A\u52A1\u7F51\u7EDC", "read", fixture, ["parentId", "document", "label"]);
    add("fixture.create", "\u6309 UI \u8BA1\u5212\u521B\u5EFA\u5939\u5177\u5E76\u4FDD\u5B58\u6240\u6709\u6743\u548C\u6E05\u7406\u6307\u7EB9", "scene", { ...fixture, planHash: hash }, ["parentId", "document", "label", "planHash"]);
    add("fixture.status", "\u67E5\u8BE2\u5939\u5177\u8303\u56F4\u3001\u671F\u9650\u3001\u7F51\u7EDC\u7B56\u7565\u548C\u6E05\u7406\u72B6\u6001", "read", { fixtureId: str }, ["fixtureId"]);
    add("ui.owned_snapshot", "\u8BFB\u53D6\u539F\u751F\u5B50\u6811\u5FEB\u7167\u548C\u7236\u8282\u70B9\u4F4D\u7F6E\uFF0C\u7528\u4E8E\u81EA\u6709\u8D44\u6E90\u6E05\u7406\u5B88\u536B", "read", { rootId: str }, ["rootId"], "F20");
    add("ui.owned_remove", "\u4EC5\u5F53\u539F\u751F\u5B50\u6811\u3001\u7236\u8282\u70B9\u548C\u5F15\u7528\u5747\u5339\u914D\u65F6\u79FB\u9664\u6307\u5B9A\u6811", "scene", { rootId: str, expectedSnapshot: {} }, ["rootId", "expectedSnapshot"], "F20");
    add("fixture.cleanup", "\u6309\u539F\u751F\u5FEB\u7167\u6307\u7EB9\u6E05\u7406\u81EA\u6709\u5939\u5177\uFF0C\u51B2\u7A81\u65F6\u4FDD\u7559\u73B0\u573A", "scene", { fixtureId: str }, ["fixtureId"]);
    for (const row of rows.filter((row2) => ["fixture.plan", "fixture.create"].includes(row2.id))) {
      const schema = row.inputSchema;
      const document = { ...UiDocumentModel.schema };
      delete document.$defs;
      schema.properties.document = document;
      schema.$defs = UiDocumentModel.schema.$defs;
    }
    add("operation.audit.query", "\u6309 UTC \u534A\u5F00\u65F6\u95F4\u8303\u56F4\u5206\u9875\u8BFB\u53D6\u8131\u654F\u64CD\u4F5C\u5BA1\u8BA1", "read", {
      from: str,
      to: str,
      cursor: { type: "integer", minimum: 0 },
      pageCursor: str,
      limit: { type: "integer", minimum: 1, maximum: 500 },
      operationId: str
    }, [], "F10");
    return rows;
  }
};

// packages/capability-catalog/src/output-contracts.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv4 = __toESM(require_ajv(), 1);
var OutputContracts = class {
  ajv;
  validators = /* @__PURE__ */ new Map();
  object(properties, required = Object.keys(properties)) {
    return { type: "object", properties, required, additionalProperties: true };
  }
  schema(id) {
    const text = { type: "string", minLength: 1 }, bool = { type: "boolean" }, object = { type: "object" };
    const rows = { type: "array", items: object }, hash = { type: "string", pattern: "^[a-f0-9]{64}$" };
    const mapping = { type: "array", items: this.object({ key: text, nodeId: text }) };
    const preservedRows = { type: "array", maxItems: 1, items: this.object({
      key: text,
      kind: { const: "node" },
      status: { const: "property-override" },
      change: this.object({ kind: { const: "changed" }, path: { const: "properties/_name" }, before: { type: "string" }, after: { type: "string" } })
    }) };
    const prefabChange = {
      nodeId: text,
      action: { enum: ["apply", "restore"] },
      assetUuid: text,
      url: text,
      sourceHash: hash,
      sourceGraphHash: hash,
      instanceHash: hash,
      expectedHash: hash,
      planHash: hash,
      preservedRows,
      sceneSavedByTool: { const: false }
    };
    switch (id) {
      case "scene.query":
        return this.object({ context: { const: "editor" }, scene: object, dirty: { type: ["boolean", "null"] } });
      case "node.query":
        return this.object({ node: object });
      case "preview.capture":
        return {
          ...this.object(
            {
              captureId: text,
              capturedAt: text,
              source: text,
              width: { type: "integer", minimum: 1 },
              height: { type: "integer", minimum: 1 },
              dataUrl: { type: "string", pattern: "^data:image/png;base64,[A-Za-z0-9+/]+={0,2}$" },
              image: this.object({ mimeType: { const: "image/png" }, byteLength: { type: "integer", minimum: 1 }, sha256: hash }),
              imageDelivery: { enum: ["image", "legacy-json"] },
              stale: bool,
              businessOutcomeVerified: { const: false },
              layoutVerified: { const: false }
            },
            ["captureId", "capturedAt", "source", "width", "height", "dataUrl", "image", "imageDelivery"]
          ),
          // 外部浏览器没有原生 AFTER_DRAW 绑定，不强迫它伪造同一帧证据。
          allOf: [{
            if: { type: "object", properties: { source: { const: "managed-preview-window" } }, required: ["source"] },
            then: this.object({
              stale: bool,
              frameBinding: { const: "draw-observed-before-composite" },
              exactPixelFrameIndex: { type: "null" },
              verification: { const: "rendered-frame-captured" },
              businessOutcomeVerified: { const: false },
              layoutVerified: { const: false }
            })
          }]
        };
      case "prefab.diff":
        return this.object({
          nodeId: text,
          assetUuid: text,
          url: text,
          sourceHash: hash,
          instanceHash: hash,
          comparisonComplete: bool,
          automaticRepairAllowed: { const: false },
          rows: { type: "array", maxItems: 1e4, items: this.object({ key: text, kind: { enum: ["node", "component"] }, status: { enum: ["added", "removed", "unverified-added", "unverified-missing", "property-override", "unverified-property-difference"] } }) },
          tree: rows,
          issues: rows,
          excludedFields: { type: "array", items: text },
          limitations: { type: "array", items: text }
        });
      case "prefab.change.plan":
        return {
          ...this.object({
            ...prefabChange,
            format: { const: 1 },
            version: { const: "3.8.8" },
            projectPath: text,
            rows,
            sourceDependencies: { type: "array", minItems: 1, maxItems: 100, items: this.object({ assetUuid: text, url: text, sha256: hash, bytes: { type: "integer", minimum: 0, maximum: 16777216 } }) }
          }),
          allOf: [{ if: this.object({ action: { const: "apply" } }), then: this.object({ preservedRows: { type: "array", maxItems: 0 } }) }]
        };
      case "prefab.change.apply":
        return {
          ...this.object({
            ...prefabChange,
            nativeResult: object,
            verification: { enum: ["source-instance-converged", "source-instance-converged-with-preserved-properties"] }
          }),
          allOf: [{
            if: this.object({ verification: { const: "source-instance-converged-with-preserved-properties" } }),
            then: this.object({ action: { const: "restore" }, preservedRows: { type: "array", minItems: 1 } }),
            else: this.object({ preservedRows: { type: "array", maxItems: 0 } })
          }]
        };
      case "asset.location":
        return this.object({ requestedUrl: text, url: text, folderUrl: text, type: text, reuseExistingFolder: bool, targetExists: bool });
      case "asset.references.scan":
        return this.object({
          scopeUrl: text,
          scanComplete: bool,
          referenceCoverageComplete: { const: false },
          automaticRewriteAllowed: { const: false },
          rows: { type: "array", maxItems: 1e4, items: this.object({ sourceUrl: text, kind: { enum: ["uuid", "literal-path", "dynamic-unknown"] }, confidence: text, automaticRewriteAllowed: { const: false } }) },
          issues: rows,
          skipped: rows,
          sources: rows,
          targets: rows,
          limitations: { type: "array", items: text }
        });
      case "asset.organize.plan":
        return this.object({ planHash: hash, rows, skipped: rows, count: { type: "integer", minimum: 0 }, scopeUrl: text, referenceNotice: text });
      case "asset.organize.recovery":
        return this.object({
          journalId: { type: "string", pattern: "^[a-f0-9]{24}$" },
          recordedStatus: text,
          inspectedAt: text,
          rows: { type: "array", items: this.object({ sourceUrl: text, targetUrl: text, uuid: text, state: { enum: ["moved", "not-moved", "conflict", "unknown"] } }) },
          automaticReplayAllowed: { const: false },
          limitations: { type: "array", items: text }
        });
      case "ui.plan":
        return this.object({ planHash: hash, rows, revision: text, parentId: text }, ["planHash", "rows"]);
      case "ui.build":
        return this.object({ rootId: text, rows: mapping, needsSave: { const: true } });
      case "ui.diff":
        return this.object({ planHash: hash, rows, applicable: bool, blocked: rows, structuralChanges: bool }, ["planHash", "rows"]);
      case "ui.apply":
        return this.object({ rootId: text, rows, needsSave: bool, mapping, changed: bool }, ["rootId", "rows", "needsSave"]);
      default:
        return void 0;
    }
  }
  validate(id, value) {
    var _a;
    const schema = this.schema(id);
    if (!schema) return;
    const ajv = (_a = this.ajv) != null ? _a : this.ajv = new import_ajv4.Ajv({ strict: true, allErrors: true });
    let validate = this.validators.get(id);
    if (!validate) {
      validate = ajv.compile(schema);
      this.validators.set(id, validate);
    }
    if (!validate(value)) throw new CocosError("VERIFICATION_FAILED", "Capability output violates its contract", {
      capabilityId: id,
      validation: ajv.errorsText(validate.errors)
    });
  }
};

// packages/capability-catalog/src/operations.ts
var Operations = class {
  rows = [];
  add(id, module2, title, effect, properties = {}, required = [], versions = [2, 3], options = {}) {
    var _a, _b, _c, _d;
    this.rows.push({
      id,
      module: module2,
      title,
      description: title,
      context: id.startsWith("runtime.") ? "runtime" : "editor",
      effect,
      inputSchema: Schema.object(properties, required),
      outputSchema: {},
      versions,
      supportedMajors: (_a = options.supportedMajors) != null ? _a : versions,
      implementation: (_b = options.implementation) != null ? _b : "implemented",
      verification: (_c = options.verification) != null ? _c : "unverified",
      platforms: (_d = options.platforms) != null ? _d : id.startsWith("runtime.") ? ["runtime"] : ["editor"],
      ...options.prerequisites ? { prerequisites: options.prerequisites } : {},
      ...options.sideEffects ? { sideEffects: options.sideEffects } : {},
      ...options.risks ? { risks: options.risks } : {},
      ...options.rollback ? { rollback: options.rollback } : {},
      ...options.source ? { source: options.source } : {}
    });
  }
  list() {
    var _a, _b, _c;
    if (this.rows.length) return this.rows;
    this.rows.push(...new EngineFeatureCapabilities().list());
    this.rows.push(...new TwoDCapabilities().list());
    this.rows.push(...new RoadmapCapabilities().list());
    const str = Schema.string();
    const bool = Schema.boolean();
    const obj = Schema.record();
    const strings = Schema.array(str);
    const expectation = { expectedSceneId: str, expectedGeneration: Schema.integer() };
    const node = { nodeId: str };
    const component = { componentId: str };
    const asset = { url: str };
    this.add("editor.status", "F01", "\u8BFB\u53D6\u7F16\u8F91\u5668\u5B9E\u4F8B\u3001\u7248\u672C\u548C\u573A\u666F\u72B6\u6001", "read");
    for (const action of ["inspect", "play"]) this.add(`runtime.dragonbones.${action}`, "F26", "Creator 2 DragonBones \u539F\u751F\u52A8\u753B\u63A7\u5236", action === "inspect" ? "read" : "runtime", { componentId: str, name: str, playTimes: { type: "integer", minimum: 0, maximum: 1e3 } }, action === "inspect" ? ["componentId"] : ["componentId", "name"], [2]);
    this.add("editor.environment", "F01", "\u8BFB\u53D6 Creator 2 \u539F\u751F\u63A5\u53E3\u540D\u79F0\u4E0E\u5F15\u64CE\u7248\u672C\uFF1B\u4E0D\u8BFB\u53D6\u914D\u7F6E\u6216\u51ED\u636E", "read", {}, [], [2]);
    this.add("scene.query", "F04", "\u8BFB\u53D6\u5F53\u524D\u573A\u666F\u4FE1\u606F\u548C\u4FEE\u6539\u72B6\u6001", "read");
    this.add("scene.snapshot", "F04", "\u751F\u6210\u53EF\u91CD\u653E\u7684\u5F53\u524D\u573A\u666F\u5E8F\u5217\u5316\u5FEB\u7167", "read");
    this.add("scene.diff", "F04", "\u5C06\u5F53\u524D\u573A\u666F\u4E0E\u57FA\u7EBF\u5FEB\u7167\u8FDB\u884C\u7ED3\u6784\u5316\u5DEE\u5F02\u6BD4\u8F83", "read", { baseline: Schema.any() }, ["baseline"]);
    this.add("scene.hierarchy", "F04", "\u5206\u9875\u8BFB\u53D6\u573A\u666F\u5C42\u7EA7", "read", { rootId: str, offset: Schema.integer(), limit: Schema.integer(1), includeComponents: bool, includeInternal: bool });
    this.add("scene.open", "F04", "\u6253\u5F00\u5DF2\u6709\u573A\u666F\uFF1B\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\u65F6\u62D2\u7EDD\u5207\u6362", "scene", { uuid: str }, ["uuid"]);
    this.add("scene.save", "F04", "\u4FDD\u5B58\u5F53\u524D\u573A\u666F\u5E76\u67E5\u8BE2\u4FEE\u6539\u72B6\u6001", "scene");
    this.add("scene.save_copy", "F04", "\u4FDD\u5B58\u573A\u666F\u526F\u672C\u5230\u65B0\u8D44\u6E90\uFF1B\u4FDD\u7559\u5F53\u524D\u573A\u666F\u53CA\u4FEE\u6539\u72B6\u6001", "asset", { url: str }, ["url"], [3]);
    this.add("scene.create", "F04", "\u901A\u8FC7\u7F16\u8F91\u5668\u521B\u5EFA\u7A7A\u573A\u666F", "scene", { url: str }, ["url"]);
    this.add("scene.close", "F04", "\u5173\u95ED\u5DF2\u4FDD\u5B58\u7684\u573A\u666F", "scene");
    this.add("scene.undo", "F10", "\u64A4\u9500\u6700\u8FD1\u4E00\u6B21\u7F16\u8F91\u64CD\u4F5C", "scene");
    this.add("scene.redo", "F10", "\u91CD\u505A\u6700\u8FD1\u4E00\u6B21\u7F16\u8F91\u64CD\u4F5C", "scene");
    this.add("node.query", "F05", "\u8BFB\u53D6\u8282\u70B9\u53CA\u7EC4\u4EF6\u5C5E\u6027", "read", node, ["nodeId"]);
    this.add("node.find", "F05", "\u6309\u540D\u79F0\u6216\u573A\u666F\u8DEF\u5F84\u67E5\u8BE2\u8282\u70B9\uFF0C\u4FDD\u7559\u5168\u90E8\u5339\u914D", "read", { name: str, path: str });
    this.add("node.create", "F05", "\u521B\u5EFA\u8282\u70B9\u5E76\u8FD4\u56DE\u5B9E\u9645\u8282\u70B9\u4FE1\u606F", "scene", { name: str, parentId: str, assetUuid: str }, ["name"]);
    this.add("node.delete", "F05", "\u5220\u9664\u6307\u5B9A\u8282\u70B9", "scene", node, ["nodeId"]);
    this.add("node.duplicate", "F05", "\u590D\u5236\u6307\u5B9A\u8282\u70B9", "scene", node, ["nodeId"]);
    this.add("node.reparent", "F05", "\u4FEE\u6539\u7236\u8282\u70B9\u5E76\u53EF\u4FDD\u6301\u4E16\u754C\u53D8\u6362", "scene", { ...node, parentId: str, keepWorldTransform: bool }, ["nodeId", "parentId"]);
    this.add("node.set", "F06", "\u7F16\u8F91\u8282\u70B9\u5C5E\u6027\u5E76\u8BFB\u56DE\u9A8C\u8BC1", "scene", { ...node, properties: obj }, ["nodeId", "properties"]);
    this.add("node.reset", "F06", "\u91CD\u7F6E\u8282\u70B9\u53D8\u6362", "scene", node, ["nodeId"]);
    this.add("component.types", "F07", "\u679A\u4E3E\u5F53\u524D\u5DE5\u7A0B\u5168\u90E8\u5DF2\u6CE8\u518C\u7EC4\u4EF6", "read");
    this.add("component.add", "F07", "\u6DFB\u52A0\u5185\u7F6E\u6216\u9879\u76EE\u811A\u672C\u7EC4\u4EF6", "scene", { ...node, type: str }, ["nodeId", "type"]);
    this.add("component.query", "F07", "\u8BFB\u53D6\u6307\u5B9A\u7EC4\u4EF6\u5B9E\u4F8B\u7684\u5C5E\u6027\u63CF\u8FF0", "read", component, ["componentId"]);
    this.add("component.delete", "F07", "\u6309\u5B9E\u4F8B ID \u5220\u9664\u7EC4\u4EF6", "scene", component, ["componentId"]);
    this.add("component.set", "F07", "\u4FEE\u6539\u7EC4\u4EF6\u5C5E\u6027\u548C\u5F15\u7528\u5E76\u8BFB\u56DE\u9A8C\u8BC1", "scene", { ...component, properties: obj }, ["componentId", "properties"]);
    this.add("component.reset", "F07", "\u91CD\u7F6E\u6307\u5B9A\u7EC4\u4EF6\u5B9E\u4F8B", "scene", component, ["componentId"]);
    this.add("component.invoke", "F08", "\u6267\u884C\u7EC4\u4EF6\u65B9\u6CD5\uFF1B\u53EF\u80FD\u4EA7\u751F\u4EFB\u610F\u9879\u76EE\u811A\u672C\u526F\u4F5C\u7528", "external", { ...component, method: str, args: Schema.array() }, ["componentId", "method"], [2, 3], {
      risks: ["\u9879\u76EE\u811A\u672C\u53EF\u6267\u884C\u4EFB\u610F\u4E1A\u52A1\u526F\u4F5C\u7528"],
      prerequisites: ["--allow-project-code"],
      rollback: "\u7531\u9879\u76EE\u811A\u672C\u81EA\u884C\u63D0\u4F9B\u8865\u507F\u903B\u8F91"
    });
    this.add("asset.query", "F13", "\u67E5\u8BE2\u8D44\u6E90\uFF1B\u652F\u6301\u7C7B\u578B\u548C\u8DEF\u5F84\u8FC7\u6EE4", "read", { pattern: str, type: str, offset: Schema.integer(), limit: Schema.integer(1) });
    for (const [id, title] of [["info", "\u8BFB\u53D6\u8D44\u6E90\u4FE1\u606F"], ["meta", "\u8BFB\u53D6\u5BFC\u5165\u8BBE\u7F6E"], ["dependencies", "\u67E5\u8BE2\u76F4\u63A5\u8D44\u6E90\u4F9D\u8D56"], ["users", "\u67E5\u8BE2\u8D44\u6E90\u53CD\u5411\u5F15\u7528"]]) {
      this.add(`asset.${id}`, id === "dependencies" || id === "users" ? "F15" : "F14", title, "read", asset, ["url"], [2, 3], id === "dependencies" || id === "users" ? { supportedMajors: [3] } : {});
    }
    this.add("asset.location", "F13", "\u89C4\u5212\u65B0\u8D44\u6E90\u8DEF\u5F84\uFF1A\u4F18\u5148\u590D\u7528\u5DF2\u6709\u7C7B\u578B\u76EE\u5F55\uFF0C\u6CA1\u6709\u5219\u5EFA\u8BAE\u521B\u5EFA\uFF1B\u4E0D\u5199\u5165\u8D44\u6E90", "read", { url: str }, ["url"], [3]);
    this.add("asset.references.scan", "F15", "\u53EA\u8BFB\u5BA1\u67E5\u76EE\u6807\u8D44\u6E90\u7684\u5E8F\u5217\u5316 UUID\u3001\u6587\u672C\u8DEF\u5F84\u5019\u9009\u53CA\u52A8\u6001\u672A\u77E5\u52A0\u8F7D\uFF1B\u626B\u63CF\u4E0D\u6388\u6743\u81EA\u52A8\u6539\u5199", "read", { urls: { type: "array", items: str, minItems: 1, maxItems: 2e3 }, scopeUrl: str, recursive: bool }, ["urls"], [2, 3]);
    const organize = { scopeUrl: str, recursive: bool, urls: { type: "array", items: str, maxItems: 2e3 } };
    this.add("asset.organize.plan", "F13", "\u6309\u7C7B\u578B\u9884\u89C8\u9879\u76EE\u8D44\u6E90\u6574\u7406\uFF1B\u9ED8\u8BA4\u4EC5\u6839\u76EE\u5F55\uFF0C\u4FDD\u7559\u5DF2\u5F52\u7C7B\u76EE\u5F55\uFF0C\u8DF3\u8FC7\u8DEF\u5F84\u654F\u611F\u8D44\u6E90\uFF1Bagent \u5FC5\u987B\u5BA1\u67E5\u5B57\u7B26\u4E32\u52A0\u8F7D\u8DEF\u5F84", "read", organize, [], [3]);
    this.add("asset.organize.apply", "F13", "\u6267\u884C\u5DF2\u5BA1\u67E5\u7684\u8D44\u6E90\u6574\u7406\u8BA1\u5212\uFF1B\u4F20\u76F8\u540C\u8303\u56F4\u53CA planHash\uFF0C\u901A\u8FC7 AssetDB \u79FB\u52A8\u5E76\u9A8C\u8BC1 UUID\uFF0C\u8FD4\u56DE\u9010\u9879\u8BB0\u5F55\u4E0E\u56DE\u6EDA\u8DEF\u5F84", "asset", { ...organize, planHash: str }, ["planHash"], [3]);
    this.add("asset.organize.recovery", "F13", "\u53EA\u8BFB\u6838\u5BF9\u6574\u7406\u65E5\u5FD7\u7684\u6E90\u76EE\u6807 UUID \u548C\u6458\u8981\uFF1B\u8FD4\u56DE moved/not-moved/conflict/unknown\uFF0C\u4E0D\u81EA\u52A8\u91CD\u653E", "read", { journalId: { type: "string", pattern: "^[a-f0-9]{24}$" } }, ["journalId"], [2, 3]);
    this.add("asset.create", "F13", "\u901A\u8FC7 AssetDB \u521B\u5EFA\u6587\u672C\u8D44\u6E90", "asset", { ...asset, content: { type: "string" } }, ["url", "content"]);
    this.add("asset.save", "F13", "\u901A\u8FC7 AssetDB \u4FDD\u5B58\u6587\u672C\u8D44\u6E90", "asset", { ...asset, content: { type: "string" } }, ["url", "content"]);
    this.add("asset.import", "F13", "\u5BFC\u5165\u5DE5\u7A0B\u76EE\u5F55\u5185\u7684\u6587\u4EF6", "asset", { sourcePath: str, targetUrl: str }, ["sourcePath", "targetUrl"]);
    this.add("asset.copy", "F13", "\u590D\u5236\u8D44\u6E90\u53CA\u5143\u6570\u636E", "asset", { sourceUrl: str, targetUrl: str }, ["sourceUrl", "targetUrl"]);
    this.add("asset.move", "F13", "\u79FB\u52A8\u8D44\u6E90\u5E76\u4FDD\u7559 UUID", "asset", { sourceUrl: str, targetUrl: str }, ["sourceUrl", "targetUrl"]);
    for (const [id, title] of [["delete", "\u5220\u9664\u8D44\u6E90"], ["refresh", "\u5237\u65B0\u8D44\u6E90\u5E76\u7B49\u5F85\u5BFC\u5165"], ["reimport", "\u91CD\u65B0\u5BFC\u5165\u8D44\u6E90"]]) this.add(`asset.${id}`, "F13", title, "asset", asset, ["url"]);
    this.add("asset.set_meta", "F14", "\u5408\u5E76\u6307\u5B9A\u8D44\u6E90\u7684\u5BFC\u5165\u8BBE\u7F6E\u5E76\u91CD\u65B0\u5BFC\u5165", "asset", { ...asset, userData: obj }, ["url", "userData"]);
    this.add("asset.resolve", "F13", "\u8F6C\u6362\u8D44\u6E90 URL\u3001UUID \u548C\u6587\u4EF6\u8DEF\u5F84", "read", { reference: str }, ["reference"]);
    this.add("prefab.instantiate", "F09", "\u5B9E\u4F8B\u5316\u9884\u5236\u4F53\u5230\u573A\u666F", "scene", { uuid: str, parentId: str, name: str }, ["uuid"]);
    this.add("prefab.open", "F09", "\u5728\u539F\u751F\u9884\u5236\u4F53\u7F16\u8F91\u6A21\u5F0F\u6253\u5F00\u8D44\u6E90\uFF1B\u5F53\u524D\u573A\u666F\u5FC5\u987B\u5DF2\u4FDD\u5B58", "scene", { uuid: str }, ["uuid"], [3]);
    this.add("prefab.create", "F09", "\u5C06\u8282\u70B9\u4FDD\u5B58\u6210\u9884\u5236\u4F53\u8D44\u6E90", "asset", { ...node, url: str }, ["nodeId", "url"]);
    this.add("prefab.apply", "F09", "\u5C06\u9884\u5236\u4F53\u5B9E\u4F8B\u4FEE\u6539\u5E94\u7528\u5230\u8D44\u6E90", "asset", node, ["nodeId"]);
    this.add("prefab.diff", "F09", "\u6309 fileId \u548C\u5D4C\u5957\u5B9E\u4F8B\u8EAB\u4EFD\u6BD4\u8F83\u6E90 Prefab \u4E0E\u5F53\u524D\u5B9E\u4F8B\uFF1B\u8FD4\u56DE\u5C5E\u6027\u8986\u76D6\u3001\u5C42\u7EA7\u5DEE\u5F02\u548C\u672A\u9A8C\u8BC1\u8FB9\u754C\uFF0C\u4E0D\u81EA\u52A8\u4FEE\u590D", "read", node, ["nodeId"], [3], { prerequisites: ["Creator 3.8.8\uFF1B\u9009\u62E9\u5DF2\u5173\u8054\u7684 Prefab \u5B9E\u4F8B\u6839\u8282\u70B9"] });
    this.add("prefab.revert", "F09", "\u8FD8\u539F\u9884\u5236\u4F53\u5B9E\u4F8B\u4FEE\u6539", "scene", node, ["nodeId"]);
    const prefabChange = { ...node, action: Schema.enum("apply", "restore") };
    this.add("prefab.change.plan", "F09", "\u751F\u6210\u6574\u5B9E\u4F8B\u5E94\u7528/\u6062\u590D\u8BA1\u5212\uFF0C\u7ED1\u5B9A\u5B8C\u6574\u5DEE\u5F02\u3001\u6E90\u4F9D\u8D56\u548C\u5B9E\u4F8B\u6458\u8981\uFF1B\u4E0D\u5B8C\u6574\u6BD4\u8F83\u62D2\u7EDD\u751F\u6210", "read", prefabChange, ["nodeId", "action"], [3]);
    this.add("prefab.change.apply", "F09", "\u91CD\u65B0\u9A8C\u8BC1 expectedHash \u4E0E planHash \u540E\u6267\u884C\u539F\u751F\u5E94\u7528/\u6062\u590D\uFF0C\u5E76\u6838\u5BF9\u6E90\u5B9E\u4F8B\u6536\u655B\uFF1B\u4E0D\u81EA\u52A8\u4FDD\u5B58\u573A\u666F", "asset", { ...prefabChange, expectedHash: { type: "string", pattern: "^[a-f0-9]{64}$" }, planHash: { type: "string", pattern: "^[a-f0-9]{64}$" } }, ["nodeId", "action", "expectedHash", "planHash"], [3]);
    this.add("prefab.unlink", "F09", "\u89E3\u9664\u9884\u5236\u4F53\u5B9E\u4F8B\u5173\u8054", "scene", node, ["nodeId"]);
    this.add("view.query", "F11", "\u8BFB\u53D6\u573A\u666F\u89C6\u56FE\u3001Gizmo \u4E0E\u7F51\u683C\u72B6\u6001", "read", {}, [], [2, 3], { supportedMajors: [3] });
    this.add("view.set", "F11", "\u4FEE\u6539\u573A\u666F\u89C6\u56FE\u3001Gizmo \u4E0E\u7F51\u683C", "configuration", { is2D: bool, grid: bool, tool: str, coordinate: str, pivot: str }, [], [2, 3], { supportedMajors: [3] });
    this.add("view.focus", "F11", "\u805A\u7126\u6307\u5B9A\u8282\u70B9", "configuration", { nodeIds: strings }, ["nodeIds"], [2, 3], { supportedMajors: [3] });
    this.add("selection.query", "F03", "\u8BFB\u53D6\u7F16\u8F91\u5668\u9009\u4E2D\u5BF9\u8C61", "read", { type: Schema.enum("node", "asset") });
    this.add("selection.set", "F03", "\u8BBE\u7F6E\u7F16\u8F91\u5668\u9009\u4E2D\u5BF9\u8C61", "configuration", { type: Schema.enum("node", "asset"), ids: strings }, ["type", "ids"]);
    this.add("project.settings.get", "F02", "\u67E5\u8BE2\u9879\u76EE\u914D\u7F6E\uFF1B\u4E0D\u8BFB\u53D6\u5168\u5C40\u7528\u6237\u51ED\u636E", "read", { name: str, key: str }, ["name"], [2, 3], { supportedMajors: [3] });
    this.add("project.settings.set", "F02", "\u4FEE\u6539\u9879\u76EE\u914D\u7F6E", "configuration", { name: str, key: str, value: {} }, ["name", "key", "value"], [2, 3], { supportedMajors: [3] });
    this.add("editor.messages", "F12", "\u5217\u51FA\u672C\u5730\u7248\u672C\u5DF2\u53D1\u73B0\u7684\u7F16\u8F91\u5668\u6D88\u606F", "read", { package: str, publicOnly: bool }, [], [2, 3], { supportedMajors: [3] });
    this.add("editor.message", "F12", "\u8C03\u7528\u5DF2\u53D1\u73B0\u7684\u7F16\u8F91\u5668\u6D88\u606F\uFF1B\u5185\u90E8\u63A5\u53E3\u9700\u8981\u7CBE\u786E\u7248\u672C\u5339\u914D", "external", { package: str, message: str, args: Schema.array(), editorVersion: str }, ["package", "message", "editorVersion"], [2, 3], {
      supportedMajors: [3],
      risks: ["\u5185\u90E8\u7F16\u8F91\u5668\u63A5\u53E3\u968F\u8865\u4E01\u7248\u672C\u53D8\u5316"],
      prerequisites: ["\u7CBE\u786E editorVersion", "--allow-project-code"],
      rollback: "\u91CD\u65B0\u52A0\u8F7D\u5DE5\u7A0B\u6216\u4F7F\u7528\u7F16\u8F91\u5668\u64A4\u9500"
    });
    this.add("scene.script", "F08", "\u8C03\u7528\u5DF2\u5B89\u88C5\u6269\u5C55\u7684\u573A\u666F\u811A\u672C\u65B9\u6CD5", "external", { extension: str, method: str, args: Schema.array() }, ["extension", "method"], [2, 3], {
      risks: ["\u6269\u5C55\u811A\u672C\u53EF\u80FD\u4FEE\u6539\u5DE5\u7A0B\u5916\u90E8\u72B6\u6001"],
      prerequisites: ["--allow-project-code"],
      rollback: "\u7531\u6269\u5C55\u63D0\u4F9B\u8865\u507F\u64CD\u4F5C"
    });
    this.add("preview.start", "F43", "\u542F\u52A8\u9884\u89C8\uFF1B\u9ED8\u8BA4 embedded\uFF0C\u53EF\u9009 external-browser Chrome \u8FDE\u63A5\u5668\uFF1B\u5206\u522B\u62A5\u544A\u670D\u52A1\u3001\u9875\u9762\u548C\u6E38\u620F\u72B6\u6001", "runtime", { target: Schema.enum("embedded", "external-browser"), browser: Schema.enum("chrome"), scene: str, reuseExisting: bool, width: { type: "integer", minimum: 256, maximum: 2048 }, height: { type: "integer", minimum: 256, maximum: 2048 }, visible: bool });
    this.add("preview.resize", "F43", "\u8C03\u6574 MCP \u9884\u89C8\u5185\u5BB9\u5C3A\u5BF8\u5E76\u7B49\u5F85\u5B9E\u9645\u7ED8\u5236\uFF1B\u8FD4\u56DE\u622A\u56FE\uFF0C\u4E0D\u81EA\u52A8\u5224\u5B9A\u5E03\u5C40\u6B63\u786E", "runtime", { width: { type: "integer", minimum: 256, maximum: 2048 }, height: { type: "integer", minimum: 256, maximum: 2048 } }, ["width", "height"], [3]);
    this.add("preview.input", "F36", "\u5411 MCP \u81EA\u6709\u9884\u89C8\u7A97\u53E3\u53D1\u9001\u70B9\u51FB\u3001\u62D6\u62FD\u3001\u957F\u6309\u3001\u952E\u76D8\u6216\u5355\u6307\u89E6\u6478\u5E76\u622A\u53D6\u4E0B\u4E00\u5E27\uFF1B\u4F1A\u805A\u7126\u7A97\u53E3\uFF0C\u987B\u53E6\u884C\u9A8C\u8BC1\u4E1A\u52A1\u7ED3\u679C", "runtime", { focusTarget: Schema.enum("game-canvas", "window"), action: Schema.enum("click", "wheel", "drag", "long_press", "key", "touch_drag", "touch_cancel"), endX: { type: "integer", minimum: 0, maximum: 2047 }, endY: { type: "integer", minimum: 0, maximum: 2047 }, durationMs: { type: "integer", minimum: 0, maximum: 2e3 }, steps: { type: "integer", minimum: 1, maximum: 60 }, key: { type: "string", pattern: "^(?:[A-Za-z0-9]|Space|Enter|Escape|Tab|Backspace|Left|Right|Up|Down)$" }, x: { type: "integer", minimum: 0, maximum: 2047 }, y: { type: "integer", minimum: 0, maximum: 2047 }, deltaX: { type: "integer", minimum: -2e3, maximum: 2e3 }, deltaY: { type: "integer", minimum: -2e3, maximum: 2e3 } }, ["action", "x", "y"], [3], { rollback: "\u70B9\u51FB\u53EF\u80FD\u5DF2\u4EA7\u751F\u4E1A\u52A1\u526F\u4F5C\u7528\uFF0C\u5931\u8D25\u5148\u67E5\u8BE2\u6E38\u620F\u72B6\u6001\uFF1B\u4E0D\u81EA\u52A8\u91CD\u590D\u70B9\u51FB" });
    this.add("preview.stop", "F43", "\u505C\u6B62\u62E5\u6709\u7684\u9884\u89C8\uFF1B\u5916\u90E8\u590D\u7528\u6807\u7B7E\u9875\u4EC5\u89E3\u9664\u8FDE\u63A5", "runtime", { target: Schema.enum("embedded", "external-browser") }, [], [2, 3], { supportedMajors: [3] });
    this.add("preview.logs", "F44", "\u5206\u9875\u67E5\u8BE2 Web \u9884\u89C8\u5F02\u5E38\u4E0E\u7F51\u7EDC\u5931\u8D25\uFF1B\u6309\u4F1A\u8BDD\u6301\u4E45\u5316\uFF0C\u8FD4\u56DE\u622A\u65AD\u548C\u6355\u6349\u7F3A\u53E3", "read", { target: Schema.enum("embedded", "external-browser"), from: str, to: str, sessionId: { type: "string", pattern: "^[a-f0-9]{32}$" }, cursor: Schema.integer(), limit: { type: "integer", minimum: 1, maximum: 500 }, level: Schema.enum("debug", "info", "warning", "error"), kind: str, contains: str }, [], [3]);
    this.add("preview.status", "F43", "\u5B9E\u65F6\u67E5\u8BE2\u6307\u5B9A\u76EE\u6807\uFF1B\u6D4F\u89C8\u5668\u65AD\u8FDE\u4E0D\u590D\u7528\u4E0A\u6B21\u6210\u529F\u72B6\u6001", "read", { target: Schema.enum("embedded", "external-browser") }, [], [3]);
    this.add("preview.capture", "F46", "\u5728\u771F\u5B9E\u7ED8\u5236\u5E27\u4E4B\u540E\u622A\u53D6 MCP \u9884\u89C8\u7A97\u53E3\uFF1B\u4E0D\u8981\u6C42\u5F00\u53D1\u8FD0\u884C\u65F6\u7F51\u5173", "read", { target: Schema.enum("embedded", "external-browser") }, [], [3], { prerequisites: ["Creator 2.4.15/3.8.8\uFF1Bpreview.start \u5DF2\u5B8C\u6210"], rollback: "\u53EA\u8BFB\u622A\u56FE\uFF0C\u4E0D\u4FEE\u6539\u9879\u76EE\u8D44\u6E90" });
    this.add("preview.refresh", "F43", "\u5F02\u6B65\u5237\u65B0\u6307\u5B9A\u8D44\u6E90\u5E76\u8DDF\u8E2A\u5BFC\u5165\u3001\u7F16\u8BD1\u548C\u6D4F\u89C8\u5668\u7248\u672C\u8BC1\u636E\uFF1B\u7F3A\u5C11\u5B8C\u6210\u4FE1\u53F7\u8FD4\u56DE unknown\uFF1B\u7528 refresh.status \u7B49\u5F85", "asset", { urls: { type: "array", items: str, minItems: 1, maxItems: 100, uniqueItems: true }, timeoutMs: { type: "integer", minimum: 100, maximum: 12e4 }, reload: bool }, ["urls"]);
    this.add("preview.refresh.status", "F43", "\u67E5\u8BE2\u5237\u65B0\u9636\u6BB5\uFF1B\u7F16\u8F91\u5668\u91CD\u542F\u540E\u7684\u53E5\u67C4\u8FD4\u56DE NOT_FOUND", "read", { operationId: str }, ["operationId"]);
    this.add("preview.refresh.cancel", "F43", "\u53D6\u6D88\u540E\u7EED\u5237\u65B0\u9636\u6BB5\uFF1B\u6B63\u5728\u6267\u884C\u7684\u539F\u751F\u5BFC\u5165\u4ECD\u53EF\u80FD\u5B8C\u6210\uFF0C\u4E0D\u81EA\u52A8\u56DE\u6EDA", "runtime", { operationId: str }, ["operationId"]);
    for (const kind of ["network", "websocket", "diagnose"]) this.add(`preview.${kind}`, "F44", kind === "diagnose" ? "\u6309\u65F6\u95F4\u7EBF\u6C47\u603B\u53EF\u89C2\u5BDF\u8BC1\u636E\uFF0C\u4E0D\u63A8\u65AD\u4E1A\u52A1\u534F\u8BAE\u517C\u5BB9\u6027" : `\u5206\u9875\u8BFB\u53D6 ${kind} \u5143\u6570\u636E\uFF1B\u8BF7\u6C42\u6B63\u6587\u3001\u5934\u548C\u5E27\u5185\u5BB9\u9ED8\u8BA4\u4E0D\u91C7\u96C6`, "read", { target: Schema.enum("embedded", "external-browser"), sessionId: str, cursor: Schema.integer(), limit: { type: "integer", minimum: 1, maximum: 500 }, from: str, to: str });
    for (const capability of this.rows.filter((row) => row.id.startsWith("preview."))) {
      const properties = capability.inputSchema.properties;
      if (["preview.capture", "preview.resize", "preview.input", "preview.validate_viewports"].includes(capability.id)) properties.imageDelivery = Schema.enum("image", "legacy-json");
      if (["preview.capture", "preview.input"].includes(capability.id)) Object.assign(properties, expectation);
      if (capability.id === "preview.capture") properties.frameMode = Schema.enum("nextFrame", "lastFrame");
      if (["preview.resize", "preview.start"].includes(capability.id)) properties.orientation = Schema.enum("landscape", "portrait", "square");
      if (["preview.resize", "preview.start"].includes(capability.id)) properties.preset = Schema.enum(...RoadmapCapabilities.presets.map((row) => row.id));
      if (capability.id === "preview.resize") {
        delete capability.inputSchema.required;
        capability.inputSchema.anyOf = [
          { properties: { preset: properties.preset }, required: ["preset"] },
          { properties: { width: properties.width, height: properties.height }, required: ["width", "height"] }
        ];
      }
      if (capability.id === "preview.start") properties.fixtureId = str;
      if (capability.id === "preview.diagnose") properties.connectionRoles = { type: "array", maxItems: 16, items: Schema.object({ layer: Schema.enum("previewHttp", "runtimeGateway", "businessHttp", "businessWebsocket"), origin: str }, ["layer", "origin"]) };
      if (capability.id === "preview.refresh") properties.target = Schema.enum("embedded", "external-browser");
      if (capability.id === "preview.input") {
        properties.coordinateSpace = Schema.enum("window-css", "canvas-css", "design-top-left", "image-pixels");
        properties.captureId = str;
        properties.allowResume = bool;
        properties.expectedRuntimeInstanceId = str;
        for (const key of ["x", "y", "endX", "endY"]) properties[key] = { type: "number", minimum: 0, maximum: 32768 };
      }
      if (capability.id.startsWith("preview.refresh")) capability.outputSchema = { type: "object", required: ["operationId", "status", "import", "compile", "preview"], properties: { operationId: str, status: Schema.enum("pending", "completed", "failed", "unknown", "cancelled", "timeout"), phase: Schema.enum("import", "compile", "preview"), import: obj, compile: obj, preview: obj }, additionalProperties: true };
      else if (["preview.logs", "preview.network", "preview.websocket", "preview.diagnose"].includes(capability.id)) capability.outputSchema = { type: "object", required: ["rows", "nextCursor", "hasMore"], properties: { rows: Schema.array(obj), nextCursor: Schema.integer(), hasMore: bool, connection: Schema.enum("connected", "disconnected") }, additionalProperties: true };
      else if (["preview.start", "preview.status"].includes(capability.id)) capability.outputSchema = { type: "object", required: ["target", "url", "running", "pageReady", "gameReady", "status"], properties: { target: Schema.enum("embedded", "external-browser"), url: { type: ["string", "null"] }, running: bool, pageReady: bool, gameReady: bool, status: Schema.enum("service-ready", "page-opened", "game-ready", "stopped", "unknown") }, additionalProperties: true };
    }
    this.add("preview.runtime.connect", "F43", "\u8FDE\u63A5\u672C\u5DE5\u7A0B\u81EA\u6709\u9884\u89C8\u7684\u5F00\u53D1\u8FD0\u884C\u65F6\uFF1Bshader.preview.connect \u7684\u517C\u5BB9\u522B\u540D", "runtime", { gatewayPort: { type: "integer", minimum: 1, maximum: 65535 }, ...expectation });
    this.add("preview.wait", "F43", "\u6709\u754C\u7B49\u5F85\u5F53\u524D\u573A\u666F\u3001\u7ED8\u5236\u5E27\u6216\u58F0\u660E\u5F0F UI \u6761\u4EF6\uFF0C\u4E0D\u81EA\u52A8\u6062\u590D\u6682\u505C", "read", { sceneId: str, afterFrameIndex: Schema.integer(), uiChecks: RoadmapCapabilities.checks, timeoutMs: { type: "integer", minimum: 100, maximum: 3e4 }, ...expectation });
    this.add("logs.query", "F44", "\u5206\u9875\u67E5\u8BE2\u6865\u63A5\u4E8B\u4EF6\uFF0C\u6309\u7EA7\u522B\u8FC7\u6EE4\uFF1BCreator \u63A7\u5236\u53F0\u8BF7\u7528 console.query", "read", { cursor: Schema.integer(), level: Schema.enum("debug", "info", "warn", "error"), limit: Schema.integer(1) });
    this.add("console.query", "F44", "\u8BFB\u53D6 Creator \u63A7\u5236\u53F0\uFF08\u542B Scene \u62A5\u9519\u548C\u5806\u6808\uFF09\uFF0C\u652F\u6301\u7EA7\u522B\u3001\u8FDB\u7A0B\u3001\u5173\u952E\u8BCD\u548C\u6E38\u6807\u5206\u9875", "read", {
      cursor: Schema.integer(),
      limit: { type: "integer", minimum: 1, maximum: 500 },
      level: Schema.enum("debug", "info", "warn", "error"),
      process: str,
      contains: str
    }, [], [3], { prerequisites: ["Creator 3.8.8 Editor.Logger.query\uFF1B\u5176\u4ED6\u7248\u672C\u4E0D\u5BA3\u79F0\u5DF2\u9A8C\u8BC1"] });
    this.rows.push(...new UiCapabilities().list());
    this.rows.push(...new TextureCapabilities().list());
    this.rows.push(...new AnimationCapabilities().list());
    this.rows.push(...new RuntimeAnimationCapabilities().list());
    this.rows.push(...new RuntimeInteractionCapabilities().list());
    this.rows.push(...new RenderRuntimeCapabilities().list());
    this.rows.push(...new RuntimeAssetCapabilities().list());
    this.add("font.inspect", "F17", "\u8BFB\u53D6\u5B57\u4F53\u7C7B\u578B\u3001\u4F4D\u56FE\u5B57\u4F53\u5B57\u5F62\u8986\u76D6\u548C\u5F53\u524D\u573A\u666F Label \u5F15\u7528\uFF1B\u52A8\u6001\u5B57\u4F53\u7F3A\u5B57\u68C0\u67E5\u8FD4\u56DE unknown", "read", { uuid: str, sampleText: { type: "string", maxLength: 1e4 } }, ["uuid"], [3], { prerequisites: ["Creator 3.8.8"] });
    this.add("scene.validate", "F51", "\u68C0\u67E5\u7F3A\u5931\u7EC4\u4EF6\u4E0E\u65E0\u6548\u5BF9\u8C61\u5F15\u7528", "read");
    for (const [id, title, effect] of [
      ["query", "\u67E5\u8BE2\u5F53\u524D\u8FD0\u884C\u573A\u666F\u548C\u5F15\u64CE\u72B6\u6001", "read"],
      ["hierarchy", "\u5206\u9875\u8BFB\u53D6\u8FD0\u884C\u65F6\u8282\u70B9\u6811", "read"],
      ["types", "\u5217\u51FA\u5F53\u524D\u8FD0\u884C\u65F6\u53EF\u8BBF\u95EE\u7684\u5F15\u64CE\u7C7B\u578B", "read"],
      ["inspect", "\u68C0\u67E5\u5BF9\u8C61\u5C5E\u6027\u63CF\u8FF0\u53CA\u65B9\u6CD5", "read"],
      ["get", "\u8BFB\u53D6\u5BF9\u8C61\u5C5E\u6027", "read"],
      ["set", "\u8BBE\u7F6E\u8FD0\u884C\u65F6\u5BF9\u8C61\u5C5E\u6027", "runtime"],
      ["invoke", "\u8C03\u7528\u516C\u5F00\u5F15\u64CE\u65B9\u6CD5", "external"],
      ["create", "\u6784\u9020\u5F15\u64CE\u5BF9\u8C61\u5E76\u8FD4\u56DE\u53D7\u63A7\u53E5\u67C4", "runtime"],
      ["release", "\u91CA\u653E\u5BF9\u8C61\u53E5\u67C4\uFF1B\u53EF\u660E\u786E\u9500\u6BC1\u6240\u62E5\u6709\u7684\u5BF9\u8C61", "runtime"],
      ["subscribe", "\u8BA2\u9605\u5BF9\u8C61\u4E8B\u4EF6", "runtime"],
      ["unsubscribe", "\u53D6\u6D88\u4E8B\u4EF6\u8BA2\u9605", "runtime"],
      ["events", "\u8BFB\u53D6\u8BA2\u9605\u4E8B\u4EF6", "read"],
      ["pause", "\u6682\u505C\u6E38\u620F\u5FAA\u73AF", "runtime"],
      ["resume", "\u6062\u590D\u6E38\u620F\u5FAA\u73AF", "runtime"],
      ["capture", "\u6355\u83B7\u5F53\u524D\u6E38\u620F Canvas \u56FE\u50CF", "read"],
      ["statistics", "\u8BFB\u53D6\u53EF\u7528\u7684\u771F\u5B9E\u8FD0\u884C\u65F6\u6307\u6807", "read"]
    ]) {
      const props = {
        target: str,
        path: str,
        method: str,
        args: Schema.array(),
        value: {},
        type: str,
        event: str,
        subscriptionId: str,
        cursor: Schema.integer(),
        offset: Schema.integer(),
        limit: Schema.integer(1),
        destroy: bool,
        ...expectation,
        ...id === "capture" ? { frameMode: Schema.enum("nextFrame", "lastFrame"), imageDelivery: Schema.enum("image", "legacy-json") } : {}
      };
      this.add(`runtime.${id}`, id === "capture" ? "F46" : id === "statistics" ? "F45" : id === "subscribe" || id === "events" ? "F36" : "F39", title, effect, props, [], [2, 3], {
        platforms: ["development-runtime"],
        prerequisites: ["\u5F00\u53D1\u6784\u5EFA\u8FD0\u884C\u65F6\u6865\u63A5"],
        ...id === "invoke" ? { risks: ["\u4EC5\u5141\u8BB8\u516C\u5F00\u5F15\u64CE API\uFF0C\u7981\u6B62\u79C1\u6709\u6210\u5458\u548C\u5371\u9669\u6784\u9020"], rollback: "\u8FD0\u884C\u65F6\u91CD\u542F\u540E\u53E5\u67C4\u81EA\u52A8\u5931\u6548" } : {}
      });
    }
    this.rows.push(...new Creator2ExpansionCapabilities().list());
    this.rows.push(...new ShaderCapabilities().list());
    this.rows.push(...new SceneProductionCapabilities().list());
    const creator2 = /* @__PURE__ */ new Set(["project.settings.get", "project.settings.set", ...Creator2Support.base, ...Creator2Support.scene, ...Creator2Support.runtime, ...Creator2Support.preview]);
    for (const row of this.rows) if (creator2.has(row.id)) {
      if (!row.versions.includes(2)) row.versions.unshift(2);
      if (row.prerequisites) row.prerequisites = row.prerequisites.map((text) => text.replace(/Creator 3\.8\.8/g, "Creator 2.4.15 \u6216 3.8.8\uFF08\u6309\u7248\u672C\u5206\u522B\u9002\u914D\uFF09"));
      if (!((_a = row.supportedMajors) == null ? void 0 : _a.includes(2))) (_b = row.supportedMajors) == null ? void 0 : _b.unshift(2);
    }
    const outputs = new OutputContracts();
    const references = this.rows.find((row) => row.id === "scene.references");
    references.versions = [2, 3];
    references.supportedMajors = [2, 3];
    references.prerequisites = ["Creator 2.4.15 \u6216 3.8.8\uFF1B\u539F\u751F\u5E8F\u5217\u5316\u7ED3\u679C\u53EA\u8BFB\u68C0\u67E5\uFF0C\u4E0D\u8C03\u7528\u4E8B\u4EF6\u56DE\u8C03"];
    for (const row of this.rows.filter((row2) => row2.id === "ui.structure.plan" || row2.id === "ui.structure.apply")) {
      row.versions = [2, 3];
      row.supportedMajors = [2, 3];
      row.prerequisites = ["Creator 2.4.15 \u6216 3.8.8\uFF1B3.8.8 \u4EC5\u666E\u901A\u573A\u666F\uFF0C\u4E0D\u4FEE\u6539 Prefab \u5B9E\u4F8B/\u8D44\u6E90\uFF1Bapply \u4F7F\u7528\u76F8\u540C\u53C2\u6570\u4E0E\u6700\u65B0 planHash"];
      row.rollback = row.id.endsWith(".plan") ? "\u53EA\u8BFB\u89C4\u5212\uFF0C\u4E0D\u4FEE\u6539\u539F\u751F\u573A\u666F" : "\u539F\u751F\u6574\u7EC4 Undo/Redo\uFF1B\u90E8\u5206\u5931\u8D25\u8FD4\u56DE completed/pending/mapping\uFF0C\u5FC5\u987B\u8BFB\u56DE\uFF0C\u7981\u6B62\u76F2\u76EE\u91CD\u8BD5\uFF1B\u4FDD\u5B58\u9700\u5355\u72EC scene.save";
    }
    for (const row of this.rows) row.outputSchema = (_c = outputs.schema(row.id)) != null ? _c : row.outputSchema;
    return this.rows;
  }
};

// packages/creator3-adapter/src/shader.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto5 = require("crypto");
var import_promises14 = require("fs/promises");
var import_path6 = require("path");
var ShaderService = class {
  constructor(port) {
    this.port = port;
  }
  port;
  projectPaths;
  paths() {
    var _a;
    return (_a = this.projectPaths) != null ? _a : this.projectPaths = ProjectPaths.open(this.port.projectPath);
  }
  hash(source) {
    return (0, import_crypto5.createHash)("sha256").update(source).digest("hex");
  }
  async native(method, p) {
    if (!this.port.shader) throw new CocosError("UNSUPPORTED_CAPABILITY", "Shader host is not available");
    if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Native shader adapter requires Creator 3.8.8");
    return Json.object(await this.port.shader(method, p));
  }
  async read(url) {
    if (url.endsWith(".material")) {
      const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", url)));
      if (info.type !== "cc.Material" || info.invalid === true) throw new CocosError("INVALID_ARGUMENT", "Expected a valid Material asset");
      const native = Json.object(await this.port.scene("shader.materialAsset", { uuid: Json.string(info.uuid, "material UUID"), action: "serialize" }));
      const content2 = JSON.stringify(native.serialized, null, 2);
      return { url, uuid: info.uuid, content: content2, sourceHash: this.hash(content2), readonly: true, material: native.material };
    }
    if (!/\.(effect|chunk|mtl)$/.test(url)) throw new CocosError("INVALID_ARGUMENT", "Expected Effect, Chunk or Material resource");
    const path = await (await this.paths()).asset(url);
    const content = await (0, import_promises14.readFile)(path, "utf8");
    return { url, content, sourceHash: this.hash(content) };
  }
  async save(url, content, expectedHash) {
    await (await this.paths()).asset(url);
    if (!/\.(effect|chunk|mtl)$/.test(url)) throw new CocosError("INVALID_ARGUMENT", "Invalid resource extension");
    let backupId = null;
    if (expectedHash !== void 0) {
      const before = await this.read(url);
      if (before.sourceHash !== expectedHash) throw new CocosError("OPERATION_CONFLICT", "Resource changed since it was read");
      backupId = (0, import_crypto5.randomBytes)(16).toString("hex");
      const directory = await (await this.paths()).work("cache", "shader/backups");
      await (0, import_promises14.writeFile)((0, import_path6.join)(directory, `${backupId}.json`), JSON.stringify(before), { flag: "wx", mode: 384 });
      if ((await this.read(url)).sourceHash !== expectedHash) throw new CocosError("OPERATION_CONFLICT", "Resource changed while preparing backup");
    } else if (await this.port.request("asset-db", "query-asset-info", url)) throw new CocosError("RESOURCE_BUSY", "Target resource already exists");
    const asset = Json.value(await this.port.request("asset-db", expectedHash === void 0 ? "create-asset" : "save-asset", url, content));
    const after = await this.read(url);
    if (after.sourceHash !== this.hash(content)) throw new CocosError("VERIFICATION_FAILED", "AssetDB write does not match requested source", { backupId });
    return { ...after, backupId, saved: true, asset, importStatus: asset && typeof asset === "object" && !Array.isArray(asset) && typeof asset.invalid === "boolean" ? asset.invalid ? "failed" : "passed" : "unverified", gpuValidation: "not-run" };
  }
  async compile(url, includeSource) {
    const before = await this.read(url);
    const taskId = (0, import_crypto5.randomBytes)(16).toString("hex");
    let result;
    try {
      result = await this.native("compile", { url, content: before.content });
    } catch (error) {
      if (error instanceof CocosError && ["UNSUPPORTED_CAPABILITY", "UNSUPPORTED_VERSION"].includes(error.code)) throw error;
      result = { status: "failed", rows: [new ShaderDiagnostics().from(error, url)] };
    }
    const after = await this.read(url);
    const task = {
      ...result,
      taskId,
      url,
      sourceHash: before.sourceHash,
      editorVersion: this.port.version,
      stale: before.sourceHash !== after.sourceHash,
      gpuValidation: "not-run",
      execution: "synchronous"
    };
    const directory = await (await this.paths()).work("cache", "shader/tasks");
    await (0, import_promises14.writeFile)((0, import_path6.join)(directory, `${taskId}.json`), JSON.stringify(task), { flag: "wx", mode: 384 });
    if (!includeSource) delete task.compiled;
    return task;
  }
  async execute(id, p) {
    var _a, _b, _c, _d, _e, _f;
    if (id !== "shader.environment" && this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Shader tools require Creator 3.8.8");
    const str = (key) => Json.string(p[key], key);
    switch (id) {
      case "shader.environment":
        return {
          editorVersion: this.port.version,
          nativeCompiler: this.port.version === "3.8.8" && Boolean(this.port.shader),
          runtimeRequired: ["GPU compilation", "preview", "profiling"],
          supportedMajors: [3],
          verifiedPlatforms: [],
          compilerExecution: "synchronous",
          cancellation: "not-supported-during-native-call"
        };
      case "shader.templates":
        return this.native("templates", p);
      case "shader.preview.connect": {
        if (!this.port.preview) throw new CocosError("UNSUPPORTED_CAPABILITY", "Managed preview host unavailable");
        return Json.value(await this.port.preview("connect-runtime", p));
      }
      case "shader.read":
      case "material.query":
        return this.read(str("url"));
      case "shader.create":
        return this.save(str("url"), str("content"));
      case "shader.update":
        return this.save(str("url"), str("content"), str("expectedHash"));
      case "shader.compile":
        return this.compile(str("url"), p.includeSource === true);
      case "shader.validate":
      case "shader.inspect":
        return this.compile(str("url"), id === "shader.inspect");
      case "shader.dependencies": {
        const compiled = await this.compile(str("url"), false);
        return { rows: (_a = compiled.dependencies) != null ? _a : [], status: compiled.status, sourceHash: compiled.sourceHash, diagnostics: (_b = compiled.rows) != null ? _b : [] };
      }
      case "shader.diagnostics": {
        const taskId = str("taskId");
        if (!/^[a-f0-9]{32}$/.test(taskId)) throw new CocosError("INVALID_ARGUMENT", "Invalid task ID");
        const directory = await (await this.paths()).work("cache", "shader/tasks");
        const task = Json.object(JSON.parse(await (0, import_promises14.readFile)((0, import_path6.join)(directory, `${taskId}.json`), "utf8")));
        task.stale = (await this.read(Json.string(task.url, "url"))).sourceHash !== task.sourceHash;
        for (const dependency of (_c = task.dependencies) != null ? _c : []) {
          if (typeof dependency.path !== "string" || typeof dependency.sourceHash !== "string") continue;
          try {
            if (this.hash(await (0, import_promises14.readFile)(dependency.path, "utf8")) !== dependency.sourceHash) task.stale = true;
          } catch {
            task.stale = true;
          }
        }
        delete task.compiled;
        return task;
      }
      case "shader.variants.plan":
        return new ShaderVariants().plan(Json.object(p.axes), Number((_d = p.limit) != null ? _d : 64));
      case "shader.restore": {
        const backupId = str("backupId");
        if (!/^[a-f0-9]{32}$/.test(backupId)) throw new CocosError("INVALID_ARGUMENT", "Invalid backup ID");
        const directory = await (await this.paths()).work("cache", "shader/backups");
        const backup = Json.object(JSON.parse(await (0, import_promises14.readFile)((0, import_path6.join)(directory, `${backupId}.json`), "utf8")));
        return this.save(Json.string(backup.url, "url"), Json.string(backup.content, "content"), str("expectedHash"));
      }
      case "material.clone": {
        const source = await this.read(str("sourceUrl"));
        return this.save(str("targetUrl"), Json.string(source.content, "content"));
      }
      case "material.create":
      case "material.update":
      case "material.apply_runtime":
      case "material.migrate": {
        p = { ...p, properties: new MaterialValues().properties(Json.object((_e = p.properties) != null ? _e : {})) };
        const url = str("url");
        if (!url.endsWith(".mtl")) throw new CocosError("INVALID_ARGUMENT", "Material URL must end in .mtl");
        const before = id === "material.create" ? null : await this.read(url);
        if (before && before.sourceHash !== str("expectedHash")) throw new CocosError("OPERATION_CONFLICT", "Material changed since it was read");
        const effectUuid = p.effectUrl ? await this.port.request("asset-db", "query-uuid", str("effectUrl")) : void 0;
        if (p.effectUrl && !effectUuid) throw new CocosError("NOT_FOUND", "Effect resource not found");
        const result = Json.object(await this.port.scene("shader.material", {
          ...p,
          action: id,
          ...effectUuid ? { effectUuid } : {},
          ...before ? { serialized: JSON.parse(String(before.content)) } : {}
        }));
        if (id === "material.migrate" && p.apply !== true) return { ...result, applied: false };
        const content = JSON.stringify(result.serialized, null, 2);
        return { ...await this.save(url, content, before ? str("expectedHash") : void 0), migration: (_f = result.migration) != null ? _f : null };
      }
      case "material.properties":
      case "material.defines":
      case "material.states": {
        const material = await this.read(str("url"));
        if (material.readonly) return material.material;
        return Json.value(await this.port.scene("shader.material", { action: "inspect", serialized: JSON.parse(String(material.content)) }));
      }
      case "material.bindings": {
        const uuid = await this.port.request("asset-db", "query-uuid", str("url"));
        if (!uuid) throw new CocosError("NOT_FOUND", "Material resource not found");
        return { rows: Json.value(await this.port.scene("shader.bindings", uuid)), resourceUsers: Json.value(await this.port.request("asset-db", "query-asset-users", str("url"))) };
      }
      case "material.assign":
        return this.assign(p);
      default:
        throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown shader operation: ${id}`);
    }
  }
  async assign(p) {
    const binding = Json.object(await this.port.scene("shader.binding", p));
    if (binding.materialUuid !== p.expectedMaterialUuid) throw new CocosError("OPERATION_CONFLICT", "Material slot changed since inspection");
    await this.port.scene("shader.checkMaterial", p.materialUuid);
    const nodeId = Json.string(binding.nodeId, "owner");
    const path = Json.string(binding.path, "path");
    const before = Json.object(Json.value(await this.port.request("scene", "query-component", p.componentId)));
    const dump = PropertyDump.assign(PropertyDump.locate(before, Json.string(binding.componentPath, "componentPath")), { uuid: p.materialUuid });
    const record = await this.port.request("scene", "begin-recording", nodeId);
    try {
      await this.port.request("scene", "set-property", { uuid: nodeId, path, dump });
      const after = Json.object(await this.port.scene("shader.binding", p));
      if (after.materialUuid !== p.materialUuid) throw new CocosError("VERIFICATION_FAILED", "Material binding was not applied");
      await this.port.request("scene", "end-recording", record);
      return after;
    } catch (error) {
      try {
        await this.port.request("scene", "cancel-recording", record);
      } catch {
        throw new CocosError("OUTCOME_UNKNOWN", "Material assignment and recording cancellation failed");
      }
      throw error;
    }
  }
};

// packages/creator3-adapter/src/asset-organization.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/asset-policy/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto11 = require("crypto");
var import_promises16 = require("fs/promises");
var import_node_path7 = require("path");

// packages/native-adapters/src/file-snapshot.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_crypto6 = require("crypto");
var import_fs6 = require("fs");
var import_promises15 = require("fs/promises");
var FileSnapshots = class {
  async *chunks(_path, file, limit) {
    let position = 0;
    while (position <= limit) {
      const buffer = Buffer.allocUnsafe(Math.min(64 * 1024, limit - position + 1));
      const { bytesRead } = await file.read(buffer, 0, buffer.length, position);
      if (!bytesRead) break;
      position += bytesRead;
      yield buffer.subarray(0, bytesRead);
    }
  }
  same(before, after) {
    return after.isFile() && !after.isSymbolicLink() && before.dev === after.dev && before.ino === after.ino && before.size === after.size && before.mtimeMs === after.mtimeMs && before.ctimeMs === after.ctimeMs;
  }
  async verify(path, identity) {
    if (!this.same(identity, await (0, import_promises15.lstat)(path))) throw new CocosError("STALE_REVISION", "Asset changed during snapshot inspection");
  }
  async read(path, limit, collectText = false) {
    var _a;
    if (!Number.isSafeInteger(limit) || limit < 0) throw new CocosError("INVALID_ARGUMENT", "Invalid asset byte budget");
    const initial = await (0, import_promises15.lstat)(path);
    if (!initial.isFile() || initial.isSymbolicLink()) throw new CocosError("INVALID_ARGUMENT", "Asset snapshot requires a regular non-symlink file");
    if (initial.size > limit) throw new CocosError("RESOURCE_BUSY", "Asset snapshot byte budget exceeded");
    const file = await (0, import_promises15.open)(path, import_fs6.constants.O_RDONLY | ((_a = import_fs6.constants.O_NOFOLLOW) != null ? _a : 0));
    try {
      const identity = await file.stat();
      if (!this.same(initial, identity)) throw new CocosError("STALE_REVISION", "Asset was replaced before snapshot read");
      const hash = (0, import_crypto6.createHash)("sha256"), chunks = [];
      let bytes = 0;
      for await (const chunk of this.chunks(path, file, limit)) {
        bytes += chunk.length;
        if (bytes > limit || bytes > identity.size) throw new CocosError("RESOURCE_BUSY", "Asset grew beyond snapshot budget");
        hash.update(chunk);
        if (collectText) chunks.push(chunk);
      }
      if (bytes !== identity.size || !this.same(identity, await file.stat())) throw new CocosError("STALE_REVISION", "Asset changed while reading snapshot");
      await this.verify(path, identity);
      return { bytes, sha256: hash.digest("hex"), identity, ...collectText ? { text: Buffer.concat(chunks).toString("utf8") } : {} };
    } finally {
      await file.close();
    }
  }
};

// packages/asset-policy/src/index.ts
var ROOT = "db://assets/";
var TYPES = {
  shader: { folder: "Shaders", aliases: ["shaders", "shader", "effects", "effect", "\u7740\u8272\u5668"], extensions: [".effect", ".chunk"] },
  material: { folder: "Materials", aliases: ["materials", "material", "\u6750\u8D28"], extensions: [".mtl"] },
  scene: { folder: "Scenes", aliases: ["scenes", "scene", "\u573A\u666F"], extensions: [".scene", ".fire"] },
  prefab: { folder: "Prefabs", aliases: ["prefabs", "prefab", "\u9884\u5236\u4F53"], extensions: [".prefab"] },
  texture: { folder: "Textures", aliases: ["textures", "texture", "images", "sprites", "\u56FE\u7247", "\u8D34\u56FE"], extensions: [".png", ".jpg", ".jpeg", ".webp", ".tga", ".bmp", ".hdr"] },
  model: { folder: "Models", aliases: ["models", "model", "meshes", "mesh", "\u6A21\u578B"], extensions: [".gltf", ".glb", ".fbx", ".obj"] },
  audio: { folder: "Audio", aliases: ["audio", "sounds", "sound", "music", "\u97F3\u9891"], extensions: [".mp3", ".wav", ".ogg", ".m4a"] },
  animation: { folder: "Animations", aliases: ["animations", "animation", "clips", "\u52A8\u753B"], extensions: [".anim", ".animgraph", ".animask"] },
  font: { folder: "Fonts", aliases: ["fonts", "font", "\u5B57\u4F53"], extensions: [".ttf", ".otf", ".fnt"] },
  script: { folder: "Scripts", aliases: ["scripts", "script", "\u811A\u672C"], extensions: [".ts", ".js"] },
  data: { folder: "Data", aliases: ["data", "configs", "config", "\u6570\u636E"], extensions: [".json", ".txt", ".csv"] }
};
var AssetOrganization = class {
  constructor(port, checkpoints = new AtomicJsonFile(), snapshots = new FileSnapshots()) {
    this.port = port;
    this.checkpoints = checkpoints;
    this.snapshots = snapshots;
  }
  port;
  checkpoints;
  snapshots;
  projectPaths;
  paths() {
    var _a;
    return (_a = this.projectPaths) != null ? _a : this.projectPaths = ProjectPaths.open(this.port.projectPath);
  }
  type(url) {
    var _a;
    return (_a = Object.keys(TYPES).find((key) => TYPES[key].extensions.includes((0, import_node_path7.extname)(url).toLowerCase()))) != null ? _a : "other";
  }
  hash(value) {
    return (0, import_node_crypto11.createHash)("sha256").update(value).digest("hex");
  }
  async exists(path) {
    try {
      await (0, import_promises16.lstat)(path);
      return true;
    } catch (error) {
      if (error.code === "ENOENT") return false;
      throw error;
    }
  }
  async path(url) {
    const paths = await this.paths();
    const target = await paths.asset(url);
    let current = paths.root;
    for (const part of ["assets", ...url.slice(ROOT.length).split("/").filter(Boolean)]) {
      current = (0, import_node_path7.join)(current, part);
      if (await this.exists(current) && (await (0, import_promises16.lstat)(current)).isSymbolicLink()) throw new CocosError("PATH_OUTSIDE_PROJECT", "Asset organization does not follow symlinks");
    }
    return target;
  }
  async metaPath(url) {
    const path = await (await this.paths()).resolve(await this.path(url) + ".meta");
    if (await this.exists(path) && (await (0, import_promises16.lstat)(path)).isSymbolicLink()) throw new CocosError("PATH_OUTSIDE_PROJECT", "Asset metadata must not be a symlink");
    return path;
  }
  async protected(url) {
    var _a;
    const parts = url.slice(ROOT.length).split("/");
    if (parts.some((part) => ["resources", "editor", "plugins", "native", "third-party", "thirdparty"].includes(part.toLowerCase()))) return true;
    for (let i = 1; i < parts.length; i++) {
      const meta = await this.metaPath(ROOT + parts.slice(0, i).join("/"));
      if (await this.exists(meta)) {
        const data = JSON.parse((await this.snapshots.read(meta, 1024 * 1024, true)).text);
        if (((_a = data.userData) == null ? void 0 : _a.isBundle) || data.isBundle) return true;
      }
    }
    return false;
  }
  async folders(type) {
    var _a;
    const aliases = (_a = TYPES[type]) == null ? void 0 : _a.aliases;
    if (!aliases) return [];
    let level = [ROOT], count = 0;
    while (level.length) {
      const next = [], candidates = [];
      for (const url of level) {
        for (const entry of await (0, import_promises16.readdir)(await this.path(url), { withFileTypes: true })) {
          if (!entry.isDirectory() || entry.isSymbolicLink() || entry.name.startsWith(".")) continue;
          if (++count > 1e4) throw new CocosError("RESOURCE_BUSY", "Type directory discovery exceeds 10000 folders; specify an explicit asset directory");
          const child = url.replace(/\/$/, "") + "/" + entry.name;
          if (await this.protected(child + "/_")) continue;
          next.push(child);
          if (aliases.includes(entry.name.toLowerCase())) candidates.push(child);
        }
      }
      if (candidates.length) return candidates.sort((a, b) => a.localeCompare(b, "en"));
      level = next;
    }
    return [];
  }
  async files(scope, recursive, skipped) {
    const files = [];
    let count = 0;
    const visit = async (url) => {
      if (await this.protected(url.replace(/\/$/, "") + "/_")) {
        skipped.push({ url, reason: "protected-loading-path", scope: "directory", descendantsScanned: false });
        return;
      }
      for (const entry of (await (0, import_promises16.readdir)(await this.path(url), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
        if (++count > 5e4) throw new CocosError("RESOURCE_BUSY", "Requested asset scope exceeds 50000 entries; narrow scopeUrl");
        if (entry.name.startsWith(".") || entry.name.endsWith(".meta")) continue;
        const child = url.replace(/\/$/, "") + "/" + entry.name;
        if (entry.isSymbolicLink()) {
          skipped.push({ url: child, reason: "symbolic-link" });
          continue;
        }
        if (entry.isDirectory()) {
          if (recursive) await visit(child);
        } else if (entry.isFile()) {
          files.push(child);
          if (files.length > 2e3) throw new CocosError("INVALID_ARGUMENT", "Organize at most 2000 files per plan");
        }
      }
    };
    await visit(scope);
    return files;
  }
  async location(url, folders) {
    var _a, _b;
    await this.path(url);
    if (!(0, import_node_path7.basename)(url) || url.endsWith("/") || (0, import_node_path7.basename)(url).endsWith(".meta")) throw new CocosError("INVALID_ARGUMENT", "Expected an asset file name, not a folder or .meta");
    const type = this.type(url);
    const config = TYPES[type];
    const parent = url.slice(0, url.lastIndexOf("/"));
    let folderUrl = parent;
    if (parent === ROOT.slice(0, -1)) {
      const candidates = (folders != null ? folders : await this.folders(type)).filter((folder) => config == null ? void 0 : config.aliases.includes((0, import_node_path7.basename)(folder).toLowerCase()));
      candidates.sort((a, b) => a.split("/").length - b.split("/").length || a.localeCompare(b, "en"));
      folderUrl = (_b = candidates[0]) != null ? _b : `${ROOT}${(_a = config == null ? void 0 : config.folder) != null ? _a : "Other"}`;
    }
    const targetUrl = `${folderUrl}/${(0, import_node_path7.basename)(url)}`;
    return { requestedUrl: url, url: targetUrl, folderUrl, type, reuseExistingFolder: await this.exists(await this.path(folderUrl)), targetExists: await this.exists(await this.path(targetUrl)) };
  }
  async ensure(folderUrl) {
    const parts = folderUrl.slice(ROOT.length).split("/").filter(Boolean);
    for (let i = 1; i <= parts.length; i++) {
      const url = ROOT + parts.slice(0, i).join("/"), path = await this.path(url);
      if (!await this.exists(path)) await this.port.request("asset-db", "create-asset", url, null, { overwrite: false });
      if (!(await (0, import_promises16.lstat)(path)).isDirectory()) throw new CocosError("RESOURCE_BUSY", `Asset folder is occupied by a file: ${url}`);
      const info = await this.port.request("asset-db", "query-asset-info", url);
      if (!info) throw new CocosError("VERIFICATION_FAILED", `Folder is not imported: ${url}`);
    }
  }
  async prepare(id, params) {
    const fields = { "asset.create": "url", "asset.copy": "targetUrl", "shader.create": "url", "material.create": "url", "material.clone": "targetUrl", "scene.create": "url", "scene.save_copy": "url", "prefab.create": "url", "geometry.create": "url", "animation.clip.create": "url", "animation2d.create": "url" };
    let key = fields[id];
    let requested = key ? Json.string(params[key], key) : "";
    if (id === "asset.import") {
      key = "targetUrl";
      requested = Json.string(params.targetUrl, "targetUrl");
      const target = await this.path(requested);
      if (requested.endsWith("/") || await this.exists(target) && (await (0, import_promises16.lstat)(target)).isDirectory()) requested = `${requested.replace(/\/$/, "")}/${(0, import_node_path7.basename)(Json.string(params.sourcePath, "sourcePath"))}`;
      const source = await (await this.paths()).resolve(Json.string(params.sourcePath, "sourcePath"));
      if (!(await (0, import_promises16.lstat)(source)).isFile()) throw new CocosError("INVALID_ARGUMENT", "Import one file at a time so its resource type can be organized");
    }
    if (!key) return { params };
    const location = await this.location(requested);
    if (location.targetExists) throw new CocosError("RESOURCE_BUSY", `Creation target already exists: ${location.url}`);
    await this.ensure(String(location.folderUrl));
    return { params: { ...params, [key]: location.url }, location };
  }
  async fingerprint(url, budget = { remaining: 1024 * 1024 * 1024 }) {
    const path = await this.path(url);
    const metadataPath = await this.metaPath(url);
    const meta = await this.snapshots.read(metadataPath, 1024 * 1024, true);
    const uuid = Json.string(JSON.parse(meta.text).uuid, "asset UUID");
    const source = await this.snapshots.read(path, budget.remaining);
    budget.remaining -= source.bytes;
    await this.snapshots.verify(metadataPath, meta.identity);
    return { uuid, sourceHash: source.sha256, metaHash: meta.sha256 };
  }
  async plan(params) {
    var _a, _b, _c;
    const scope = String((_a = params.scopeUrl) != null ? _a : ROOT).replace(/\/$/, "") + "/";
    await this.path(scope);
    const skipped = [], directories = /* @__PURE__ */ new Map();
    const urls = params.urls ? params.urls.map((value) => Json.string(value, "urls")) : await this.files(scope, params.recursive === true, skipped);
    if (urls.length > 2e3) throw new CocosError("INVALID_ARGUMENT", "Organize at most 2000 files per plan");
    const rows = [];
    const targets = /* @__PURE__ */ new Set();
    const fingerprintBudget = { remaining: 1024 * 1024 * 1024 };
    for (const url of [...new Set(urls)].sort()) {
      await this.path(url);
      if (!url.startsWith(scope)) throw new CocosError("INVALID_ARGUMENT", "Source outside organization scope");
      const type = this.type(url), config = TYPES[type];
      let reason = "", reviewedSourceHash;
      if (await this.protected(url)) reason = "protected-loading-path";
      else if (!config || ["script", "data"].includes(type) || [".obj", ".fbx", ".fnt", ".chunk"].includes((0, import_node_path7.extname)(url).toLowerCase())) reason = "requires-reference-review";
      else if (url.slice(ROOT.length).split("/").slice(0, -1).some((part) => config.aliases.includes(part.toLowerCase()))) reason = "already-organized";
      else if ((0, import_node_path7.extname)(url).toLowerCase() === ".gltf") {
        if ((await (0, import_promises16.lstat)(await this.path(url))).size > 16 * 1024 * 1024) {
          skipped.push({ url, reason: "model-reference-review-size-limit" });
          continue;
        }
        const inspected = await this.snapshots.read(await this.path(url), 16 * 1024 * 1024, true);
        reviewedSourceHash = inspected.sha256;
        const data = JSON.parse(inspected.text);
        if ([...(_b = data.buffers) != null ? _b : [], ...(_c = data.images) != null ? _c : []].some((row) => row.uri && !row.uri.startsWith("data:"))) reason = "external-model-dependencies";
      }
      if (reason) {
        skipped.push({ url, type, reason });
        continue;
      }
      if (!directories.has(type)) directories.set(type, await this.folders(type));
      const location = await this.location(ROOT + (0, import_node_path7.basename)(url), directories.get(type));
      if (location.targetExists || targets.has(String(location.url).toLowerCase())) {
        skipped.push({ url, type, reason: "target-conflict", targetUrl: location.url });
        continue;
      }
      targets.add(String(location.url).toLowerCase());
      const fingerprint = await this.fingerprint(url, fingerprintBudget);
      if (reviewedSourceHash && fingerprint.sourceHash !== reviewedSourceHash) throw new CocosError("STALE_REVISION", "Model changed after dependency inspection");
      rows.push({ sourceUrl: url, targetUrl: location.url, type, ...fingerprint });
    }
    const planHash = this.hash(Json.canonical({ scopeUrl: scope, recursive: params.recursive === true, urls: [...new Set(urls)].sort(), rows, skipped }));
    return {
      planHash,
      rows,
      skipped,
      count: rows.length,
      scopeUrl: scope,
      referenceNotice: "UUID references are preserved; agent must review string-based load paths before apply.",
      referenceReview: { capabilityId: "asset.references.scan", urls: rows.map((row) => row.sourceUrl), automaticRewriteAllowed: false }
    };
  }
  async recovery(journalId) {
    var _a;
    if (!/^[a-f0-9]{24}$/.test(journalId)) throw new CocosError("INVALID_ARGUMENT", "Expected a 24-character organization journalId");
    const paths = await this.paths(), file = await paths.resolve((0, import_node_path7.join)(".codex-work/logs/asset-organization", journalId + ".json"));
    const info = await (0, import_promises16.lstat)(file);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 4 * 1024 * 1024) throw new CocosError("VERIFICATION_FAILED", "Invalid organization journal file");
    let report;
    try {
      report = Json.object(JSON.parse(await (0, import_promises16.readFile)(file, "utf8")));
    } catch {
      throw new CocosError("VERIFICATION_FAILED", "Organization journal is damaged; preserve it for manual recovery");
    }
    if (report.journalVersion !== void 0 && report.journalVersion !== 1 || !Array.isArray(report.plannedRows) || report.plannedRows.length > 2e3) throw new CocosError("VERIFICATION_FAILED", "Unsupported organization journal");
    const planned = report.plannedRows.map((value) => Json.object(value));
    for (const row of planned) {
      await this.path(Json.string(row.sourceUrl, "sourceUrl"));
      await this.path(Json.string(row.targetUrl, "targetUrl"));
      Json.string(row.uuid, "uuid");
      for (const field of ["sourceHash", "metaHash"]) if (!/^[a-f0-9]{64}$/.test(String(row[field]))) throw new CocosError("VERIFICATION_FAILED", "Invalid journal fingerprint");
    }
    const rows = [], budget = { remaining: 1024 * 1024 * 1024 };
    for (const row of planned) {
      const sourceUrl = String(row.sourceUrl), targetUrl = String(row.targetUrl);
      const inspect = async (url) => {
        var _a2;
        if (!await this.exists(await this.path(url))) return null;
        const fingerprint = await this.fingerprint(url, budget);
        const asset = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", url)));
        return { ...fingerprint, importedUuid: (_a2 = asset.uuid) != null ? _a2 : null };
      };
      const matches = (value) => value !== null && value.uuid === row.uuid && value.importedUuid === row.uuid && value.sourceHash === row.sourceHash && value.metaHash === row.metaHash;
      try {
        const source = await inspect(sourceUrl), target = await inspect(targetUrl);
        const state = source === null && matches(target) ? "moved" : target === null && matches(source) ? "not-moved" : source === null && target === null ? "unknown" : "conflict";
        rows.push({ sourceUrl, targetUrl, uuid: row.uuid, state, source, target });
      } catch (error) {
        rows.push({ sourceUrl, targetUrl, uuid: row.uuid, state: "unknown", errorCode: CocosError.from(error).code });
      }
    }
    return {
      journalId,
      recordedStatus: (_a = report.status) != null ? _a : "unknown",
      inspectedAt: (/* @__PURE__ */ new Date()).toISOString(),
      rows,
      automaticReplayAllowed: false,
      limitations: ["\u9010\u9879\u53EA\u8BFB\u5FEB\u7167\uFF0C\u4E0D\u662F\u8DE8\u6587\u4EF6\u4E8B\u52A1\uFF1B\u6267\u884C\u4EFB\u4F55\u540E\u7EED\u79FB\u52A8\u524D\u5FC5\u987B\u91CD\u65B0\u89C4\u5212\u548C\u68C0\u67E5\u5F15\u7528"]
    };
  }
  async apply(params) {
    const plan = await this.plan(params);
    if (plan.planHash !== params.planHash) throw new CocosError("STALE_REVISION", "Resource plan changed; run asset.organize.plan again");
    const rows = plan.rows, completed = [];
    const journal = (0, import_node_path7.join)(await (await this.paths()).work("logs", "asset-organization"), `${(0, import_node_crypto11.randomBytes)(12).toString("hex")}.json`);
    const report = { journalId: (0, import_node_path7.basename)(journal, ".json"), journalVersion: 1, sequence: 0, status: "running", planHash: plan.planHash, rows: completed, plannedRows: rows, skipped: plan.skipped, journal };
    let nativeWritesStarted = false;
    const persist = async () => {
      var _a, _b;
      report.sequence = Number(report.sequence) + 1;
      report.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      try {
        await this.checkpoints.write(journal, report);
      } catch (error) {
        const failure = CocosError.from(error);
        throw new CocosError(nativeWritesStarted ? "OUTCOME_UNKNOWN" : "EDITOR_ERROR", "Organization checkpoint could not be persisted; inspect the preserved journal and asset identities", {
          journalId: report.journalId,
          journal,
          checkpointSequence: report.sequence,
          requestedStatus: report.status,
          completed: [...completed],
          pending: (_a = report.pending) != null ? _a : null,
          nativeWritesStarted,
          originalError: (_b = report.error) != null ? _b : null,
          checkpointError: Json.value(failure.toJSON())
        });
      }
    };
    await persist();
    for (const row of rows) {
      try {
        const source = String(row.sourceUrl), target = String(row.targetUrl);
        const actual = await this.fingerprint(source);
        if (actual.uuid !== row.uuid || actual.sourceHash !== row.sourceHash || actual.metaHash !== row.metaHash || await this.exists(await this.path(target))) throw new CocosError("STALE_REVISION", "Asset changed during organization");
        nativeWritesStarted = true;
        await this.ensure(target.slice(0, target.lastIndexOf("/")));
        report.pending = row;
        await persist();
        await this.port.request("asset-db", "move-asset", source, target, { overwrite: false });
        const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", target)));
        const after = await this.fingerprint(target);
        if (info.uuid !== row.uuid || after.uuid !== row.uuid || after.sourceHash !== row.sourceHash || after.metaHash !== row.metaHash || await this.exists(await this.path(source))) throw new CocosError("VERIFICATION_FAILED", "Moved asset UUID/content verification failed");
        completed.push({ ...row, verified: true, rollback: { sourceUrl: target, targetUrl: source } });
        delete report.pending;
        await persist();
      } catch (error) {
        report.status = "partial";
        report.failed = row;
        report.error = CocosError.from(error).toJSON();
        await persist();
        return report;
      }
    }
    report.status = "completed";
    await persist();
    return report;
  }
};

// packages/creator3-adapter/src/asset-query.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var AssetQuery = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async execute(params) {
    var _a, _b, _c;
    const offset = Number((_a = params.offset) != null ? _a : 0);
    const limit = Number((_b = params.limit) != null ? _b : 100);
    if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(limit) || limit < 1) {
      throw new CocosError("INVALID_ARGUMENT", "Asset pagination requires a nonnegative offset and positive limit");
    }
    const result = await this.port.request("asset-db", "query-assets", { pattern: (_c = params.pattern) != null ? _c : "db://assets/**" });
    if (!Array.isArray(result)) throw new CocosError("EDITOR_ERROR", "AssetDB returned a non-array resource list");
    const rows = result.map((row) => Json.object(Json.value(row))).filter((row) => !params.type || row.type === params.type);
    return { rows: rows.slice(offset, offset + limit), total: rows.length, nextOffset: offset + limit < rows.length ? offset + limit : null };
  }
};

// packages/creator3-adapter/src/preview.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_os = require("os");
var PreviewService = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async execute(id, params) {
    var _a, _b;
    if (id === "preview.presets") return { rows: RoadmapCapabilities.presets, trueDeviceSimulation: false };
    if (params.preset !== void 0) {
      const preset = RoadmapCapabilities.presets.find((row) => row.id === params.preset);
      if (!preset) throw new CocosError("INVALID_ARGUMENT", "Unknown preview preset");
      if (params.width !== void 0 && params.width !== preset.width || params.height !== void 0 && params.height !== preset.height) throw new CocosError("INVALID_ARGUMENT", "Explicit size conflicts with preset");
      params = { ...params, width: preset.width, height: preset.height, orientation: preset.orientation };
    }
    if (!this.port.preview) throw new CocosError("UNSUPPORTED_CAPABILITY", "Managed preview host is unavailable");
    if (!["3.8.8", "2.4.15"].includes(this.port.version)) throw new CocosError("UNSUPPORTED_VERSION", "Managed preview requires Creator 2.4.15 or 3.8.8");
    if (id === "preview.runtime.connect") return this.port.preview("connect-runtime", params);
    if (id === "preview.validate_viewports") {
      if (!Array.isArray(params.rows) || !params.rows.length || params.rows.length > 8) throw new CocosError("INVALID_ARGUMENT", "Expected 1..8 viewports");
      const initial = Json.object(await this.port.preview("status", {}));
      if (!initial.running || !Array.isArray(initial.viewport)) throw new CocosError("CONTEXT_UNAVAILABLE", "Start a dedicated preview first");
      const rows = [];
      let failure;
      let changedSize;
      try {
        for (const row of params.rows) {
          const current = Json.object(await this.port.preview("status", {}));
          if (!current.running || current.sceneId !== initial.sceneId || current.sceneGeneration !== initial.sceneGeneration || current.diagnosticSessionId !== initial.diagnosticSessionId) throw new CocosError("STALE_HANDLE", "Preview session changed during viewport capture");
          const viewport = Json.object(row);
          changedSize = [viewport.width, viewport.height];
          rows.push(Json.object(await this.port.preview("resize", viewport)));
        }
      } catch (error) {
        failure = error;
      } finally {
        try {
          const current = Json.object(await this.port.preview("status", {}));
          if (changedSize === void 0) {
          } else if (current.running && current.sceneId === initial.sceneId && current.sceneGeneration === initial.sceneGeneration && current.diagnosticSessionId === initial.diagnosticSessionId && Json.canonical(current.viewport) === Json.canonical(changedSize)) await this.port.preview("resize", { width: initial.viewport[0], height: initial.viewport[1] });
          else failure != null ? failure : failure = new CocosError("STALE_HANDLE", "Preview changed; viewport not restored");
        } catch (error) {
          failure != null ? failure : failure = error;
        }
      }
      if (failure) throw new CocosError("OUTCOME_UNKNOWN", "Viewport capture incomplete", { rows, cause: CocosError.from(failure).message });
      return { rows, restored: true, imageDelivery: (_a = params.imageDelivery) != null ? _a : "image", layoutVerified: false, limitations: ["\u5B9E\u9645\u591A\u5C3A\u5BF8\u7ED8\u5236\u622A\u56FE\uFF0C\u9700\u89C6\u89C9\u5BA1\u67E5\uFF1B\u4E0D\u6A21\u62DF\u771F\u673A\u5B89\u5168\u533A\u6216\u8F93\u5165\u6CD5"] };
    }
    if (id === "preview.start") {
      if (await this.port.request("scene", "query-dirty")) throw new CocosError("RESOURCE_BUSY", "Save the scene before starting its preview");
      const info = Json.object(await this.port.scene("sceneInfo"));
      const url = await this.port.request("preview", "query-preview-url");
      if (typeof url !== "string") throw new CocosError("EDITOR_ERROR", "Creator did not return a preview URL");
      const localUrl = new URL(url);
      const localAddresses = Object.values((0, import_node_os.networkInterfaces)()).flatMap((rows) => rows != null ? rows : []).map((row) => row.address);
      if (localAddresses.includes(localUrl.hostname)) localUrl.hostname = "127.0.0.1";
      if (params.scene !== void 0 && params.scene !== "current" && params.scene !== info.sceneId) throw new CocosError("INVALID_ARGUMENT", "Preview scene must be current or the current saved scene UUID");
      return this.port.preview("start", { ...params, target: (_b = params.target) != null ? _b : "embedded", url: localUrl.href, sceneId: info.sceneId });
    }
    return this.port.preview(id.slice("preview.".length), params);
  }
};

// packages/asset-policy/src/reference-audit.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_promises17 = require("fs/promises");
var import_path7 = require("path");

// packages/asset-policy/src/uuid.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var AssetUuid = class {
  normalize(value) {
    const separator = value.indexOf("@");
    const base = separator < 0 ? value : value.slice(0, separator), suffix = separator < 0 ? "" : value.slice(separator);
    if (/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(base)) return base.toLowerCase() + suffix;
    if (!/^[a-f0-9]{2}[A-Za-z0-9+/]{20}$/i.test(base)) return value;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let hex = base.slice(0, 2).toLowerCase(), buffer = 0, bits = 0;
    for (const char of base.slice(2)) {
      buffer = buffer << 6 | alphabet.indexOf(char);
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        hex += (buffer >>> bits & 255).toString(16).padStart(2, "0");
        buffer &= (1 << bits) - 1;
      }
    }
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}${suffix}`;
  }
};

// packages/asset-policy/src/reference-audit.ts
var AssetReferenceAudit = class {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }
  projectPath;
  snapshots = new FileSnapshots();
  resourceIds = new AssetUuid();
  async safe(paths, url) {
    const path = await paths.asset(url);
    let current = paths.root;
    for (const segment of (0, import_path7.relative)(paths.root, path).split(import_path7.sep)) {
      current = (0, import_path7.join)(current, segment);
      if ((await (0, import_promises17.lstat)(current)).isSymbolicLink()) throw new CocosError("PATH_OUTSIDE_PROJECT", "Reference audit does not follow symbolic links");
    }
    return path;
  }
  aliases(url) {
    const path = url.slice("db://assets/".length), parts = path.split("/"), rows = /* @__PURE__ */ new Set([url, "assets/" + path]);
    for (let index = 0; index < parts.length; index++) {
      const suffix = parts.slice(index).join("/");
      rows.add(suffix);
      rows.add(suffix.slice(0, suffix.length - (0, import_path7.extname)(suffix).length));
    }
    return rows;
  }
  inspect(sourceUrl, text, targets) {
    var _a, _b, _c;
    const candidates = targets.map((row) => ({ ...row, aliases: this.aliases(row.url) }));
    const literals = /* @__PURE__ */ new Map(), uuids = /* @__PURE__ */ new Map();
    for (const target of candidates) {
      const uuid = this.resourceIds.normalize(target.uuid);
      uuids.set(uuid, [...(_a = uuids.get(uuid)) != null ? _a : [], target.url]);
      for (const alias of target.aliases) literals.set(alias, [...(_b = literals.get(alias)) != null ? _b : [], target.url]);
    }
    const rows = [], issues = [], lineStarts = [0];
    let outputWeight = 0;
    for (let i = 0; i < text.length; i++) if (text[i] === "\n") lineStarts.push(i + 1);
    const location = (offset) => {
      let low = 0, high = lineStarts.length;
      while (low + 1 < high) {
        const middle = low + high >> 1;
        if (lineStarts[middle] <= offset) low = middle;
        else high = middle;
      }
      return { line: low + 1, column: offset - lineStarts[low] + 1, offset };
    };
    const add = (row) => {
      outputWeight += 1 + (Array.isArray(row.targetUrls) ? row.targetUrls.length : 0);
      if (rows.length >= 1e4 || outputWeight > 2e4) throw new CocosError("RESOURCE_BUSY", "Reference audit output limit exceeded");
      rows.push({ sourceUrl, ...row, automaticRewriteAllowed: false });
    };
    const issue = (row) => {
      if (issues.length >= 1e3) throw new CocosError("RESOURCE_BUSY", "Reference audit issue budget exceeded");
      issues.push(row);
    };
    const structured = [".json", ".scene", ".fire", ".prefab", ".mtl", ".anim", ".gltf"].includes((0, import_path7.extname)(sourceUrl).toLowerCase());
    if (structured) {
      try {
        const value = JSON.parse(text);
        let visited = 0;
        const walk = (value2, path, depth) => {
          var _a2;
          if (++visited > 1e5 || depth > 64) throw new CocosError("RESOURCE_BUSY", "Serialized reference scan limit exceeded");
          if (!value2 || typeof value2 !== "object") return;
          if (Array.isArray(value2)) {
            value2.forEach((row, index) => walk(row, `${path}[${index}]`, depth + 1));
            return;
          }
          const record = value2;
          if (typeof record.__uuid__ === "string") {
            const canonicalTargetUuid = this.resourceIds.normalize(record.__uuid__), matching = (_a2 = uuids.get(canonicalTargetUuid)) != null ? _a2 : [];
            add({
              kind: "uuid",
              jsonPath: path + ".__uuid__",
              targetUuid: record.__uuid__,
              canonicalTargetUuid,
              targetUrls: matching,
              confidence: "serialized-uuid-field",
              resolved: matching.length ? "requested-target-meta-match" : "unresolved",
              advice: matching.length ? "\u901A\u8FC7 AssetDB \u4FDD\u7559 UUID\uFF0C\u5E76\u5728\u79FB\u52A8\u540E\u590D\u67E5\u5F15\u7528" : "\u672A\u5339\u914D\u672C\u6B21\u76EE\u6807 meta\uFF1B\u9700 AssetDB \u6838\u5BF9\uFF0C\u4E0D\u7B49\u4E8E\u8BC1\u660E\u5F15\u7528\u5931\u6548"
            });
          }
          for (const [key, child] of Object.entries(record)) walk(child, `${path}[${JSON.stringify(key)}]`, depth + 1);
        };
        walk(value, "$", 0);
      } catch (error) {
        if (error instanceof CocosError) throw error;
        issue({ sourceUrl, code: "STRUCTURED_PARSE_UNAVAILABLE", advice: "\u4FDD\u7559\u6587\u672C\u5019\u9009\uFF0C\u4F46\u4E0D\u80FD\u8BC1\u660E\u7ED3\u6784\u5316\u5F15\u7528\u8986\u76D6\u5B8C\u6574" });
      }
    }
    const script = /\.(?:[cm]?js|tsx?)$/i.test(sourceUrl);
    for (let i = 0; i < text.length; ) {
      if (text.startsWith("//", i)) {
        const end = text.indexOf("\n", i + 2);
        i = end < 0 ? text.length : end + 1;
        continue;
      }
      if (text.startsWith("/*", i)) {
        const end = text.indexOf("*/", i + 2);
        i = end < 0 ? text.length : end + 2;
        continue;
      }
      const quote = text[i];
      if (quote === '"' || quote === "'" || quote === "`") {
        const start = i++;
        let raw = "";
        while (i < text.length && text[i] !== quote) {
          if (text[i] === "\\" && i + 1 < text.length) {
            raw += text.slice(i, i + 2);
            i += 2;
          } else raw += text[i++];
        }
        const closed = i < text.length;
        i++;
        if (quote === "`") {
          if (script) add({ ...location(start), kind: "dynamic-unknown", confidence: "template-syntax-only", advice: "\u6A21\u677F\u5B57\u7B26\u4E32\u53CA\u5176\u63D2\u503C\u9700\u4EBA\u5DE5\u68C0\u67E5\uFF1B\u4E0D\u63A8\u65AD\u6700\u7EC8\u52A0\u8F7D\u8DEF\u5F84" });
          continue;
        }
        if (!closed) {
          issue({ sourceUrl, ...location(start), code: "UNTERMINATED_STRING" });
          continue;
        }
        let literal = raw;
        if (quote === '"') {
          try {
            literal = JSON.parse('"' + raw + '"');
          } catch {
            issue({ sourceUrl, ...location(start), code: "STRING_ESCAPE_UNRESOLVED" });
          }
        } else if (raw.includes("\\")) {
          issue({ sourceUrl, ...location(start), code: "STRING_ESCAPE_UNRESOLVED" });
          continue;
        }
        const matching = (_c = literals.get(literal)) != null ? _c : [];
        if (matching.length) add({
          ...location(start),
          kind: "literal-path",
          value: literal,
          targetUrls: matching,
          confidence: "text-candidate-only",
          advice: "\u6838\u5BF9 resources/Bundle/\u81EA\u5B9A\u4E49\u89E3\u6790\u4E0A\u4E0B\u6587\uFF1B\u540C\u540D\u5B57\u9762\u91CF\u53EF\u80FD\u4E0D\u662F\u8D44\u6E90\u5F15\u7528\uFF0C\u4E0D\u80FD\u81EA\u52A8\u66FF\u6362"
        });
        continue;
      }
      if (script && /[A-Za-z_$]/.test(text[i])) {
        const start = i++;
        while (i < text.length && /[\w$]/.test(text[i])) i++;
        const name = text.slice(start, i), rest = text.slice(i).match(/^\s*\(\s*/);
        if (["load", "loadDir", "loadRes", "loadResDir", "loadBundle"].includes(name) && rest) {
          add({ ...location(start), kind: "dynamic-unknown", callName: name, confidence: "unresolved-call-context", advice: "\u68C0\u67E5\u8C03\u7528\u53C2\u6570\u3001\u522B\u540D\u548C Bundle \u5F52\u5C5E\uFF1B\u672A\u6267\u884C\u811A\u672C\u6216\u89E3\u6790\u81EA\u5B9A\u4E49\u52A0\u8F7D\u5668" });
        }
        continue;
      }
      i++;
    }
    return { rows, issues };
  }
  async audit(params) {
    var _a;
    const urls = params.urls;
    if (!Array.isArray(urls) || !urls.length || urls.length > 2e3) throw new CocosError("INVALID_ARGUMENT", "Expected 1..2000 target URLs");
    const paths = await ProjectPaths.open(this.projectPath), targets = [];
    let remaining = 64 * 1024 * 1024, entries = 0, files = 0, outputWeight = 0;
    const rows = [], skipped = [], issues = [], sources = [];
    const read = async (path, max) => {
      const value = await this.snapshots.read(path, Math.min(max, remaining), true);
      remaining -= value.bytes;
      return value;
    };
    const metadata = [];
    for (const raw of [...new Set(urls)]) {
      const url = Json.string(raw, "url"), path = await this.safe(paths, url);
      if (!(await (0, import_promises17.lstat)(path)).isFile()) throw new CocosError("INVALID_ARGUMENT", "Reference target must be a file");
      const meta = await read(path + ".meta", 1024 * 1024);
      targets.push({ url, uuid: Json.string(JSON.parse(meta.text).uuid, "asset UUID") });
      metadata.push({ path: path + ".meta", identity: meta.identity });
    }
    const scopeUrl = String((_a = params.scopeUrl) != null ? _a : "db://assets/"), scope = await this.safe(paths, scopeUrl);
    if (!(await (0, import_promises17.lstat)(scope)).isDirectory()) throw new CocosError("INVALID_ARGUMENT", "Reference scope must be a directory");
    const visit = async (path, url) => {
      await this.safe(paths, url);
      for (const entry of (await (0, import_promises17.readdir)(path, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
        if (++entries > 5e4) throw new CocosError("RESOURCE_BUSY", "Reference scan entry budget exceeded; narrow scope");
        const child = (0, import_path7.join)(path, entry.name), childUrl = url.replace(/\/$/, "") + "/" + entry.name;
        if (entry.isSymbolicLink()) {
          skipped.push({ sourceUrl: childUrl, reason: "symbolic-link" });
          continue;
        }
        if (entry.isDirectory()) {
          if (params.recursive !== false) await visit(child, childUrl);
          else skipped.push({ sourceUrl: childUrl, reason: "outside-nonrecursive-scope" });
          continue;
        }
        if (!entry.isFile() || !/\.(?:[cm]?js|tsx?|json|scene|fire|prefab|mtl|anim|gltf|effect)$/i.test(entry.name)) continue;
        if (++files > 2e3) throw new CocosError("RESOURCE_BUSY", "Reference scan source-file budget exceeded");
        await this.safe(paths, childUrl);
        const snapshot = await read(child, 8 * 1024 * 1024), result = this.inspect(childUrl, snapshot.text, targets);
        rows.push(...result.rows);
        issues.push(...result.issues);
        for (const row of result.rows) outputWeight += 1 + (Array.isArray(row.targetUrls) ? row.targetUrls.length : 0);
        if (rows.length > 1e4 || outputWeight > 5e4 || issues.length > 1e3) throw new CocosError("RESOURCE_BUSY", "Reference audit output limit exceeded");
        sources.push({ sourceUrl: childUrl, sha256: snapshot.sha256, bytes: snapshot.bytes });
      }
    };
    await visit(scope, scopeUrl);
    for (const meta of metadata) await this.snapshots.verify(meta.path, meta.identity);
    return {
      rows,
      skipped,
      issues,
      sources,
      targets,
      scopeUrl,
      scanComplete: skipped.length === 0 && issues.length === 0,
      referenceCoverageComplete: false,
      automaticRewriteAllowed: false,
      limitations: ["\u626B\u63CF\u662F\u9010\u6587\u4EF6\u5FEB\u7167\uFF0C\u4E0D\u662F\u8DE8\u6587\u4EF6\u4E8B\u52A1\uFF1B\u79FB\u52A8\u524D\u5FC5\u987B\u91CD\u65B0\u89C4\u5212\u4E0E\u590D\u6838", "\u4EC5\u8986\u76D6\u5217\u51FA\u7684\u6587\u672C\u6269\u5C55\u540D\uFF1B\u4E8C\u8FDB\u5236\u3001\u672A\u77E5 UUID \u683C\u5F0F\u3001\u81EA\u5B9A\u4E49\u52A0\u8F7D\u5C01\u88C5\u548C\u8FD0\u884C\u65F6\u751F\u6210\u8DEF\u5F84\u672A\u89E3\u6790", "UUID \u5339\u914D\u4FDD\u7559\u5B50\u8D44\u6E90\u540E\u7F00\uFF0C\u4E0D\u63A8\u65AD\u4EFB\u610F\u5B50\u8D44\u6E90\u4E0E\u4E3B\u8D44\u6E90\u7684\u6620\u5C04", "\u6587\u672C\u8BCD\u6CD5\u5019\u9009\u4E0D\u662F\u5B8C\u6574 JS/TS AST\uFF1B\u6B63\u5219\u5B57\u9762\u91CF\u7B49\u8BED\u6CD5\u53EF\u80FD\u4EA7\u751F\u989D\u5916\u5019\u9009", "Bundle/resources \u4E2D\u7684\u811A\u672C\u7167\u5E38\u8BFB\u53D6\uFF0C\u4F46\u4E0D\u63A8\u65AD Bundle \u540D\u79F0\u5230\u7269\u7406\u76EE\u5F55\u7684\u6620\u5C04"]
    };
  }
};

// packages/creator3-adapter/src/geometry.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PrimitiveGeometry = class {
  positions = [];
  normals = [];
  uvs = [];
  indices = [];
  number(p, key, fallback, min, max) {
    const value = p[key] === void 0 ? fallback : Number(p[key]);
    if (!Number.isFinite(value) || value < min || value > max) throw new CocosError("INVALID_ARGUMENT", `Invalid geometry parameter: ${key}`);
    return value;
  }
  vertex(position, normal, uv = [0, 0]) {
    const length = Math.hypot(...normal);
    if (!length) throw new CocosError("INVALID_ARGUMENT", "Geometry generated a zero normal");
    this.positions.push(...position);
    this.normals.push(...normal.map((n) => n / length));
    this.uvs.push(...uv);
  }
  grid(columns, rows, base = 0, reversed = false) {
    for (let j = 0; j < rows; j++) for (let i = 0; i < columns; i++) {
      const a = base + j * (columns + 1) + i, b = a + columns + 1;
      this.indices.push(...reversed ? [a, b, a + 1, a + 1, b, b + 1] : [a, a + 1, b, a + 1, b + 1, b]);
    }
  }
  build(shape, p) {
    var _a;
    this.positions = [];
    this.normals = [];
    this.indices = [];
    this.uvs = [];
    const fields = { cube: ["size", "bevel"], sphere: ["radius", "segments"], cylinder: ["radius", "height", "segments"], torus: ["radius", "tubeRadius", "tubeHeight", "segments"] };
    if (!fields[shape] || Object.keys(p).some((key) => !fields[shape].includes(key))) throw new CocosError("INVALID_ARGUMENT", "Unsupported primitive shape or shape-specific parameter");
    const segments = this.number(p, "segments", 48, 8, 128);
    if (!Number.isInteger(segments)) throw new CocosError("INVALID_ARGUMENT", "Segments must be an integer");
    if (shape === "cube") {
      const size = Json.object((_a = p.size) != null ? _a : { x: 1, y: 1, z: 1 });
      const half = ["x", "y", "z"].map((key) => this.number(size, key, 1, 1e-3, 1e4) / 2);
      const bevel = this.number(p, "bevel", 0, 0, Math.min(...half) * 0.99);
      for (let axis = 0; axis < 3; axis++) for (const sign of [-1, 1]) {
        const a = (axis + 1) % 3, b = (axis + 2) % 3;
        const points = (h) => bevel ? [-h, -h + bevel * 0.15, -h + bevel * 0.5, -h + bevel, h - bevel, h - bevel * 0.5, h - bevel * 0.15, h] : [-h, h];
        const us = points(half[a]), vs = points(half[b]), base = this.positions.length / 3;
        for (const v of vs) for (const u of us) {
          const source = [0, 0, 0];
          source[axis] = sign * half[axis];
          source[a] = u;
          source[b] = v;
          const inner = source.map((v2, i) => Math.max(-half[i] + bevel, Math.min(half[i] - bevel, v2)));
          const normal = source.map((v2, i) => v2 - inner[i]);
          const uv = [u / (half[a] * 2) + 0.5, v / (half[b] * 2) + 0.5];
          if (bevel) {
            const length = Math.hypot(...normal);
            this.vertex(inner.map((v2, i) => v2 + normal[i] / length * bevel), normal, uv);
          } else {
            normal[axis] = sign;
            this.vertex(source, normal, uv);
          }
        }
        this.grid(us.length - 1, vs.length - 1, base, sign < 0);
      }
    } else if (shape === "torus") {
      const radius = this.number(p, "radius", 1, 1e-3, 1e4), tube = this.number(p, "tubeRadius", 0.05, 1e-4, radius * 0.99);
      const thickness = this.number(p, "tubeHeight", tube, 1e-4, radius), minor = 16;
      for (let j = 0; j <= segments; j++) for (let i = 0; i <= minor; i++) {
        const u = j / segments * Math.PI * 2, w = i / minor * Math.PI * 2, r = radius + tube * Math.cos(w);
        this.vertex([r * Math.cos(u), thickness * Math.sin(w), r * Math.sin(u)], [Math.cos(w) * Math.cos(u) / tube, Math.sin(w) / thickness, Math.cos(w) * Math.sin(u) / tube], [j / segments, i / minor]);
      }
      this.grid(minor, segments);
    } else if (shape === "sphere") {
      const radius = this.number(p, "radius", 0.5, 1e-3, 1e4), latitudes = Math.ceil(segments / 2);
      for (let j = 0; j <= latitudes; j++) for (let i = 0; i <= segments; i++) {
        const u = i / segments * Math.PI * 2, w = j / latitudes * Math.PI;
        const normal = [Math.sin(w) * Math.cos(u), Math.cos(w), Math.sin(w) * Math.sin(u)];
        this.vertex(normal.map((n) => n * radius), normal, [i / segments, j / latitudes]);
      }
      this.grid(segments, latitudes);
    } else if (shape === "cylinder") {
      const radius = this.number(p, "radius", 0.5, 1e-3, 1e4), height = this.number(p, "height", 1, 1e-3, 1e4);
      for (let j = 0; j <= 1; j++) for (let i = 0; i <= segments; i++) {
        const u = i / segments * Math.PI * 2;
        this.vertex([radius * Math.cos(u), (0.5 - j) * height, radius * Math.sin(u)], [Math.cos(u), 0, Math.sin(u)], [i / segments, j]);
      }
      this.grid(segments, 1);
      for (const sign of [-1, 1]) {
        const center = this.positions.length / 3;
        this.vertex([0, sign * height / 2, 0], [0, sign, 0], [0.5, 0.5]);
        for (let i = 0; i <= segments; i++) {
          const u = i / segments * Math.PI * 2;
          this.vertex([radius * Math.cos(u), sign * height / 2, radius * Math.sin(u)], [0, sign, 0], [Math.cos(u) / 2 + 0.5, Math.sin(u) / 2 + 0.5]);
        }
        for (let i = 0; i < segments; i++) this.indices.push(...sign > 0 ? [center, center + i + 2, center + i + 1] : [center, center + i + 1, center + i + 2]);
      }
    } else throw new CocosError("INVALID_ARGUMENT", `Unknown primitive shape: ${shape}`);
    return { content: this.gltf(shape), vertices: this.positions.length / 3, triangles: this.indices.length / 3 };
  }
  gltf(name) {
    const positions = Buffer.from(new Float32Array(this.positions).buffer), normals = Buffer.from(new Float32Array(this.normals).buffer), indices = Buffer.from(new Uint16Array(this.indices).buffer);
    const uvs = Buffer.from(new Float32Array(this.uvs).buffer);
    const buffer = Buffer.concat([positions, normals, uvs, indices]);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    this.positions.forEach((value, i) => {
      min[i % 3] = Math.min(min[i % 3], value);
      max[i % 3] = Math.max(max[i % 3], value);
    });
    return JSON.stringify({
      asset: { version: "2.0", generator: "CocosMCP PrimitiveGeometry" },
      scene: 0,
      scenes: [{ nodes: [0] }],
      nodes: [{ name, mesh: 0 }],
      meshes: [{ name, primitives: [{ attributes: { POSITION: 0, NORMAL: 1, TEXCOORD_0: 2 }, indices: 3, mode: 4 }] }],
      buffers: [{ byteLength: buffer.length, uri: `data:application/octet-stream;base64,${buffer.toString("base64")}` }],
      bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: positions.length }, { buffer: 0, byteOffset: positions.length, byteLength: normals.length }, { buffer: 0, byteOffset: positions.length + normals.length, byteLength: uvs.length }, { buffer: 0, byteOffset: positions.length + normals.length + uvs.length, byteLength: indices.length }],
      accessors: [
        { bufferView: 0, componentType: 5126, count: this.positions.length / 3, type: "VEC3", min, max },
        { bufferView: 1, componentType: 5126, count: this.normals.length / 3, type: "VEC3" },
        { bufferView: 2, componentType: 5126, count: this.uvs.length / 2, type: "VEC2" },
        { bufferView: 3, componentType: 5123, count: this.indices.length, type: "SCALAR" }
      ]
    });
  }
};
var GeometryService = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  async create(p) {
    var _a, _b;
    const url = Json.string(p.url, "url");
    await (await ProjectPaths.open(this.port.projectPath)).asset(url);
    if (!url.endsWith(".gltf")) throw new CocosError("INVALID_ARGUMENT", "Geometry resource must end in .gltf");
    if (await this.port.request("asset-db", "query-asset-info", url)) throw new CocosError("RESOURCE_BUSY", "Geometry resource already exists");
    if (p.parentId && !await this.port.scene("nodeExists", p.parentId)) throw new CocosError("NOT_FOUND", "Geometry parent is not in the scene");
    const material = await this.port.request("asset-db", "query-asset-info", Json.string(p.materialUuid, "materialUuid"));
    if (!material || Json.object(Json.value(material)).type !== "cc.Material") throw new CocosError("INVALID_ARGUMENT", "materialUuid must resolve to a material");
    const geometry = new PrimitiveGeometry().build(Json.string(p.shape, "shape"), Json.object((_a = p.options) != null ? _a : {}));
    const result = Json.object(Json.value(await this.port.request("asset-db", "create-asset", url, geometry.content)));
    let nodeId = null;
    try {
      if (result.invalid === true || !result.uuid) throw new CocosError("VERIFICATION_FAILED", "Geometry import failed");
      const mesh = Object.values(Json.object((_b = result.subAssets) != null ? _b : {})).map((row) => Json.object(row)).find((row) => row.type === "cc.Mesh" && row.invalid !== true);
      if (!mesh) throw new CocosError("VERIFICATION_FAILED", "Geometry import did not produce a mesh");
      const created = Json.object(await this.run("node.create", { name: p.name, ...p.parentId ? { parentId: p.parentId } : {} }));
      nodeId = Json.string(created.nodeId, "nodeId");
      const component = Json.object(await this.run("component.add", { nodeId, type: "cc.MeshRenderer" }));
      const componentId = component.componentIds[0];
      await this.run("component.set", { componentId, properties: { mesh: { uuid: mesh.uuid }, sharedMaterials: [{ uuid: p.materialUuid }], shadowCastingMode: 1 } });
      const properties = {};
      if (p.position) properties.position = p.position;
      if (p.rotation) properties.rotation = p.rotation;
      if (Object.keys(properties).length) await this.run("node.set", { nodeId, properties });
      return { nodeId, componentId, assetUuid: result.uuid, meshUuid: mesh.uuid, url, vertices: geometry.vertices, triangles: geometry.triangles, savedMesh: true, sceneSaveRequired: true };
    } catch (error) {
      throw new CocosError("EDITOR_ERROR", "Geometry creation incomplete", { cause: CocosError.from(error).toJSON(), assetUrl: url, nodeId, recovery: "Inspect these exact resources before retrying; no unrelated content was removed" });
    }
  }
  async array(p) {
    var _a;
    const nodeId = Json.string(p.nodeId, "nodeId"), count = Number(p.count);
    if (!Number.isInteger(count) || count < 1 || count > 100) throw new CocosError("INVALID_ARGUMENT", "Array count must be 1..100 additional copies");
    const source = Json.object(await this.run("node.query", { nodeId }));
    const node = Json.object(PropertyDump.unwrap(source.node));
    const base = Json.object(node.position), delta = Json.object(p.offset), rotation = Json.object(node.rotation), rotationStep = Json.object((_a = p.rotationStep) != null ? _a : { x: 0, y: 0, z: 0 });
    const patches = Array.from({ length: count }, (_, i) => {
      var _a2;
      const position = {}, angles = {};
      for (const axis of ["x", "y", "z"]) {
        position[axis] = Number(base[axis]) + Number(delta[axis]) * (i + 1);
        angles[axis] = Number(rotation[axis]) + Number(rotationStep[axis]) * (i + 1);
      }
      if (![...Object.values(position), ...Object.values(angles)].every((value) => typeof value === "number" && Number.isFinite(value))) throw new CocosError("INVALID_ARGUMENT", "Array transforms must be finite 3D vectors");
      return { name: `${String((_a2 = p.namePrefix) != null ? _a2 : node.name)}_${i + 1}`, position, rotation: angles };
    });
    const rows = [];
    for (const properties of patches) {
      let duplicateId = null;
      try {
        const duplicate = Json.object(await this.run("node.duplicate", { nodeId }));
        if (!Array.isArray(duplicate.nodeIds) || duplicate.nodeIds.length !== 1) throw new CocosError("VERIFICATION_FAILED", "Expected exactly one duplicated root");
        duplicateId = Json.string(duplicate.nodeIds[0], "duplicate node ID");
        await this.run("node.set", { nodeId: duplicateId, properties });
        rows.push({ nodeId: duplicateId, name: properties.name });
      } catch (error) {
        throw new CocosError("EDITOR_ERROR", "Array creation incomplete", { rows, incompleteNodeId: duplicateId, cause: CocosError.from(error).message });
      }
    }
    return { sourceNodeId: nodeId, rows, sceneSaveRequired: true };
  }
};

// packages/creator3-adapter/src/rendering.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var RenderingService = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  async node(nodeId) {
    return Json.object(Json.object(await this.run("node.query", { nodeId })).node);
  }
  async component(componentId, type) {
    const dump = Json.object(Json.object(await this.run("component.query", { componentId })).component);
    if (dump.type !== type) throw new CocosError("INVALID_ARGUMENT", `Expected ${type} component`);
    return dump;
  }
  preflight(dump, properties) {
    for (const [path, value] of Object.entries(properties)) PropertyDump.assign(PropertyDump.locate(dump, path), value);
  }
  async query(p) {
    var _a;
    const scene = Json.object(await this.port.scene("sceneInfo"));
    const dump = await this.node(Json.string(scene.sceneId, "sceneId"));
    return {
      sceneId: scene.sceneId,
      globals: PropertyDump.unwrap((_a = dump._globals) != null ? _a : {}),
      camera: p.cameraNodeId ? PropertyDump.unwrap(await this.node(Json.string(p.cameraNodeId, "cameraNodeId"))) : null,
      supportedConfiguration: ["shadow-map", "builtin-bloom", "builtin-fxaa", "planar-reflection"],
      limitations: [
        { feature: "hbao", status: "requires-compatible-custom-pipeline", alternative: "No darkening proxy is created" },
        { feature: "physical-transmission", status: "requires-transmission-effect-and-pipeline", alternative: "Standard transparent material is alpha blending only" }
      ],
      visualVerification: "use preview.capture after saving; configuration is not a GPU image test"
    };
  }
  async configure(p) {
    if (p.ambientOcclusion === "hbao" || p.transmission === "physical") throw new CocosError("UNSUPPORTED_CAPABILITY", "This Builtin configuration adapter cannot enable HBAO or physical transmission; provide a compatible custom pipeline/effect first");
    const steps = [];
    let missingPipelineNode = null;
    const cameraProperties = {};
    if (p.bloom || p.fxaa !== void 0 || p.editorPreview !== void 0) {
      const nodeId = Json.string(p.cameraNodeId, "cameraNodeId"), node = await this.node(nodeId);
      const components = Array.isArray(node.__comps__) ? node.__comps__.map((row) => Json.object(row)) : [];
      if (!(components == null ? void 0 : components.some((c) => c.type === "cc.Camera"))) throw new CocosError("INVALID_ARGUMENT", "cameraNodeId has no Camera");
      const pipeline = components.find((c) => c.type === "BuiltinPipelineSettings");
      if (p.bloom) {
        const bloom = Json.object(p.bloom);
        for (const key of ["enabled", "threshold", "intensity", "iterations"]) if (bloom[key] !== void 0) cameraProperties[key === "enabled" ? "bloomEnable" : `bloom${key[0].toUpperCase()}${key.slice(1)}`] = bloom[key];
      }
      if (p.fxaa !== void 0) cameraProperties.fxaaEnable = p.fxaa;
      if (p.editorPreview !== void 0) cameraProperties.editorPreview = p.editorPreview;
      if (pipeline) {
        this.preflight(pipeline, cameraProperties);
        const componentId = Json.string(PropertyDump.unwrap(Json.object(pipeline.value).uuid), "pipeline UUID");
        steps.push({ label: "camera-post-processing", id: "component.set", params: { componentId, properties: cameraProperties } });
      } else missingPipelineNode = nodeId;
    }
    if (p.shadows) {
      const shadows = Json.object(p.shadows), scene = Json.object(await this.port.scene("sceneInfo")), sceneId = Json.string(scene.sceneId, "sceneId");
      const properties = { "_globals.shadows.enabled": shadows.enabled, "_globals.shadows.type": 1 };
      if (shadows.resolution !== void 0) properties["_globals.shadows.shadowMapSize"] = shadows.resolution;
      this.preflight(await this.node(sceneId), properties);
      steps.push({ label: "scene-shadow-map", id: "node.set", params: { nodeId: sceneId, properties } });
      if (shadows.enabled === true || p.lightComponentId) {
        const componentId = Json.string(p.lightComponentId, "lightComponentId"), light = await this.component(componentId, "cc.DirectionalLight");
        const lightProperties = { shadowEnabled: shadows.enabled };
        for (const [key, field] of [["pcf", "shadowPcf"], ["bias", "shadowBias"], ["normalBias", "shadowNormalBias"]]) if (shadows[key] !== void 0) lightProperties[field] = shadows[key];
        this.preflight(light, lightProperties);
        steps.push({ label: "directional-light-shadow", id: "component.set", params: { componentId, properties: lightProperties } });
      }
    }
    const completed = [];
    try {
      if (missingPipelineNode) {
        const types = Json.object(await this.run("component.types", {}));
        const type = types.rows.find((row) => row.name === "BuiltinPipelineSettings");
        if (!type) throw new CocosError("UNSUPPORTED_CAPABILITY", "BuiltinPipelineSettings is not registered in this project");
        const added = Json.object(await this.run("component.add", { nodeId: missingPipelineNode, type: type.cid }));
        const componentId = added.componentIds[0];
        completed.push({ addedComponentId: componentId });
        steps.unshift({ label: "camera-post-processing", id: "component.set", params: { componentId, properties: cameraProperties } });
      }
      for (const step of steps) {
        await this.run(step.id, step.params);
        completed.push(step.label);
      }
      return { completed, sceneSaveRequired: completed.length > 0, visualVerification: "not-run" };
    } catch (error) {
      throw new CocosError("EDITOR_ERROR", "Rendering configuration incomplete", { completed, cause: CocosError.from(error).message });
    }
  }
  async planarReflection(p) {
    var _a;
    const cameraComponentId = Json.string(p.cameraComponentId, "cameraComponentId");
    await this.component(cameraComponentId, "cc.Camera");
    const ids = p.rendererComponentIds;
    if (!Array.isArray(ids) || !ids.length || ids.length > 200 || new Set(ids).size !== ids.length) throw new CocosError("INVALID_ARGUMENT", "Expected 1..200 unique renderer IDs");
    for (const id of ids) this.preflight(await this.component(id, "cc.MeshRenderer"), { "bakeSettings.reflectionProbe": 2 });
    const size = Json.object(p.size);
    if (!["x", "y", "z"].every((axis) => Number.isFinite(size[axis]) && Number(size[axis]) > 0)) throw new CocosError("INVALID_ARGUMENT", "Reflection volume dimensions must be positive");
    const completed = [];
    let nodeId = null;
    try {
      nodeId = Json.string(Json.object(await this.run("node.create", { name: p.name })).nodeId, "nodeId");
      await this.run("node.set", { nodeId, properties: { position: p.position } });
      const componentId = Json.object(await this.run("component.add", { nodeId, type: "cc.ReflectionProbe" })).componentIds[0];
      await this.run("component.set", { componentId, properties: { probeType: 1, sourceCamera: { uuid: cameraComponentId }, size, resolution: (_a = p.resolution) != null ? _a : 512 } });
      for (const id of ids) {
        await this.run("component.set", { componentId: id, properties: { "bakeSettings.reflectionProbe": 2 } });
        completed.push(id);
      }
      return { nodeId, componentId, rendererComponentIds: completed, sceneSaveRequired: true, visualVerification: "not-run" };
    } catch (error) {
      throw new CocosError("EDITOR_ERROR", "Planar reflection configuration incomplete", { nodeId, completedRendererIds: completed, cause: CocosError.from(error).message });
    }
  }
};

// packages/creator3-adapter/src/animation-edit.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv5 = __toESM(require_ajv(), 1);
var import_node_crypto12 = require("crypto");
var import_promises18 = require("fs/promises");
var import_node_path8 = require("path");
var AnimationEditService = class {
  constructor(port) {
    this.port = port;
  }
  port;
  hash(content) {
    return (0, import_node_crypto12.createHash)("sha256").update(content).digest("hex");
  }
  async read(url) {
    if (!url.endsWith(".anim")) throw new CocosError("INVALID_ARGUMENT", "Expected .anim asset URL");
    const file = await (await ProjectPaths.open(this.port.projectPath)).asset(url);
    if ((await (0, import_promises18.stat)(file)).size > 16 * 1024 * 1024) throw new CocosError("INVALID_ARGUMENT", "Animation source exceeds 16 MiB");
    const content = await (0, import_promises18.readFile)(file, "utf8"), asset = Json.object(await this.port.request("asset-db", "query-asset-info", url));
    if (!asset.uuid) throw new CocosError("NOT_FOUND", "Animation asset is not imported");
    return { url, content, sourceHash: this.hash(content), uuid: asset.uuid };
  }
  async execute(id, p) {
    if (!["3.8.8", "2.4.15"].includes(this.port.version)) throw new CocosError("UNSUPPORTED_VERSION", "Animation editing requires Creator 3.8.8");
    const capability = new AnimationCapabilities().list().find((row) => row.id === id);
    if (!capability || !new import_ajv5.Ajv({ strict: true }).compile(capability.inputSchema)(p)) throw new CocosError("INVALID_ARGUMENT", "Invalid animation edit parameters");
    const url = Json.string(p.url, "url"), before = await this.read(url);
    if (id === "animation.clip.read") return before;
    if (before.sourceHash !== p.expectedHash) throw new CocosError("STALE_REVISION", "Animation source changed; read again");
    const paths = await ProjectPaths.open(this.port.projectPath);
    let content, backupId;
    if (id === "animation.clip.patch") {
      const serialized = await this.port.scene("animation.clip.patchSource", { content: before.content, patches: p.patches });
      content = JSON.stringify(serialized);
      backupId = `${(0, import_node_crypto12.randomBytes)(4).toString("hex")}-${(0, import_node_crypto12.randomBytes)(2).toString("hex")}-${(0, import_node_crypto12.randomBytes)(2).toString("hex")}-${(0, import_node_crypto12.randomBytes)(2).toString("hex")}-${(0, import_node_crypto12.randomBytes)(6).toString("hex")}`;
      const directory = await paths.work("cache", "animation-backups");
      await (0, import_promises18.writeFile)((0, import_node_path8.join)(directory, `${backupId}.json`), JSON.stringify(before), { flag: "wx", mode: 384 });
    } else if (id === "animation.clip.restore") {
      backupId = Json.string(p.backupId, "backupId");
      if (!/^[a-f0-9-]{36}$/.test(backupId)) throw new CocosError("INVALID_ARGUMENT", "Invalid animation backup ID");
      const backup = Json.object(JSON.parse(await (0, import_promises18.readFile)(await paths.resolve(`.codex-work/cache/animation-backups/${backupId}.json`), "utf8")));
      if (backup.url !== url || backup.uuid !== before.uuid) throw new CocosError("INVALID_ARGUMENT", "Animation backup targets a different asset");
      content = Json.string(backup.content, "backup content");
      if (this.hash(content) !== backup.sourceHash) throw new CocosError("VERIFICATION_FAILED", "Animation backup content is corrupt");
    } else throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown animation edit operation: ${id}`);
    const latest = await this.read(url);
    if (latest.sourceHash !== before.sourceHash || latest.uuid !== before.uuid) throw new CocosError("STALE_REVISION", "Animation changed before write");
    try {
      const saved = await this.port.request("asset-db", "save-asset", url, content);
      if (saved === false) throw new CocosError("EDITOR_ERROR", "AssetDB rejected animation source");
      const after = await this.read(url);
      if (after.sourceHash !== this.hash(content) || after.uuid !== before.uuid) throw new CocosError("VERIFICATION_FAILED", "Animation source or UUID failed readback");
      const clip = Json.value(await this.port.scene("animation.clip.inspect", { uuid: after.uuid }));
      return { ...after, backupId, clip, saved: true, restored: id.endsWith("restore") };
    } catch (error) {
      throw new CocosError("OUTCOME_UNKNOWN", "Animation write incomplete; inspect before retrying or restoring", { url, uuid: before.uuid, backupId, cause: CocosError.from(error).message });
    }
  }
};

// packages/creator3-adapter/src/ui.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto14 = require("crypto");

// packages/creator3-adapter/src/ui-properties.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var UiProperties = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async resolve(properties, mapping) {
    const result = {};
    for (const [key, value] of Object.entries(UiDocumentModel.orderedProperties(properties))) {
      if (UiDocumentModel.eventProperties.has(key)) result[key] = Json.value(await this.port.scene("ui.eventBindings", { events: value }));
      else if (value && typeof value === "object" && !Array.isArray(value) && typeof value.nodeKey === "string") {
        const nodeId = mapping.get(value.nodeKey);
        if (!nodeId) throw new CocosError("INVALID_ARGUMENT", `UI reference is not mapped: ${value.nodeKey}`);
        if (typeof value.componentType === "string") {
          const tree = Json.object(await this.port.scene("hierarchy", { rootId: nodeId, limit: 1 }));
          const components = Json.object(tree.rows[0]).components;
          const matches = components.filter((c) => c.type === value.componentType);
          if (matches.length !== 1) throw new CocosError("INVALID_ARGUMENT", "UI component reference is missing or ambiguous");
          result[key] = { uuid: matches[0].componentId };
        } else result[key] = { uuid: nodeId };
      } else if (value && typeof value === "object" && !Array.isArray(value) && typeof value.assetUuid === "string") result[key] = { uuid: value.assetUuid };
      else result[key] = value;
    }
    return result;
  }
};

// packages/creator3-adapter/src/ui-update.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto13 = require("crypto");
var UiUpdateService = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  hash(value) {
    return (0, import_node_crypto13.createHash)("sha256").update(Json.canonical(Json.value(value))).digest("hex");
  }
  async snapshot(rootId) {
    return this.hash(await this.port.scene("ui.snapshot", { rootId }));
  }
  async diff(p) {
    var _a, _b;
    const document = new UiDocumentModel().parse(p.document), rootId = Json.string(p.rootId, "rootId");
    const rows = p.mapping;
    if (!Array.isArray(rows) || rows.length !== document.length) throw new CocosError("INVALID_ARGUMENT", "Map every document key to exactly one existing node");
    const mapping = /* @__PURE__ */ new Map();
    for (const value of rows) {
      const row = Json.object(value);
      const key = Json.string(row.key, "key"), id = Json.string(row.nodeId, "nodeId");
      if (mapping.has(key) || [...mapping.values()].includes(id)) throw new CocosError("INVALID_ARGUMENT", "Duplicate UI key or node mapping");
      mapping.set(key, id);
    }
    if (mapping.get(document[0].key) !== rootId || document.some((row) => !mapping.has(row.key))) throw new CocosError("INVALID_ARGUMENT", "UI mapping does not match document root and keys");
    const startRevision = this.hash(await this.port.scene("fingerprint"));
    await this.port.scene("ui.preflight_update", p);
    const hierarchy = Json.object(await this.port.scene("hierarchy", { rootId, limit: 1e3 }));
    if (Number(hierarchy.total) > 1e3) throw new CocosError("INVALID_ARGUMENT", "UI update subtree exceeds 1000 nodes");
    const actual = hierarchy.rows, changes = [], blocked = [];
    const add = async (kind, id, properties, key, type) => {
      var _a2;
      const dump = Json.object(await this.port.request("scene", kind === "node" ? "query-node" : "query-component", id));
      const coupled = /* @__PURE__ */ new Set();
      for (const [property, after] of Object.entries(properties)) {
        if (coupled.has(property)) continue;
        const field = PropertyDump.locate(dump, property);
        PropertyDump.assign(field, after);
        const before = PropertyDump.unwrap(field);
        if (!PropertyDump.matches(before, after)) {
          const change = { key, kind, id, property, before, after };
          const offset = type === "cc.Widget" ? UiDocumentModel.widgetOffsets[property] : void 0;
          if (offset) {
            const offsetField = PropertyDump.locate(dump, offset), offsetBefore = PropertyDump.unwrap(offsetField);
            const offsetAfter = (_a2 = properties[offset]) != null ? _a2 : offsetBefore;
            PropertyDump.assign(offsetField, offsetAfter);
            change.companion = { property: offset, before: offsetBefore, after: offsetAfter };
            coupled.add(offset);
          }
          changes.push(change);
        }
      }
    };
    for (const row of document) {
      const id = mapping.get(row.key), node = actual.find((node2) => node2.nodeId === id);
      if (!node) throw new CocosError("INVALID_ARGUMENT", `Mapped UI node is outside root: ${row.key}`);
      if (row.parentKey && node.parentId !== mapping.get(row.parentKey)) blocked.push({ key: row.key, reason: "REPARENT_REQUIRED" });
      await add("node", id, { name: row.node.name, ...row.node.position ? { position: row.node.position } : {} }, row.key);
      for (const component of (_a = row.node.components) != null ? _a : []) {
        const matches = node.components.filter((c) => c.type === component.type);
        if (matches.length !== 1) {
          blocked.push({ key: row.key, type: component.type, reason: "COMPONENT_STRUCTURE_CHANGE_REQUIRED" });
          continue;
        }
        const properties = await new UiProperties(this.port).resolve((_b = component.properties) != null ? _b : {}, mapping);
        await add("component", Json.string(matches[0].componentId, "componentId"), properties, row.key, component.type);
      }
    }
    const snapshotHash = await this.snapshot(rootId), revision = this.hash(await this.port.scene("fingerprint"));
    if (revision !== startRevision) throw new CocosError("STALE_REVISION", "Scene changed while calculating UI diff");
    return {
      rootId,
      rows: changes,
      blocked,
      applicable: blocked.length === 0,
      snapshotHash,
      revision,
      planHash: this.hash({ rootId, mapping: p.mapping, document: p.document, changes, blocked, snapshotHash, revision, version: this.port.version }),
      scope: "existing-node-properties; undeclared fields, nodes and components preserved"
    };
  }
  async apply(p) {
    const plan = await this.diff(p);
    if (p.planHash !== plan.planHash) throw new CocosError("STALE_REVISION", "UI diff changed; run ui.diff again");
    if (!plan.applicable) throw new CocosError("UNSUPPORTED_CAPABILITY", "UI structural changes require a separate workflow", { blocked: plan.blocked });
    const rootId = String(plan.rootId), completed = [], rollback = [];
    let checkpoint = String(plan.snapshotHash), pending = null;
    const update = async (change, restore) => {
      if (await this.snapshot(rootId) !== checkpoint) throw new CocosError("STALE_REVISION", "UI subtree changed during update");
      const properties = { [String(change.property)]: restore ? change.before : change.after };
      if (change.companion) {
        const companion = Json.object(change.companion);
        properties[String(companion.property)] = restore ? companion.before : companion.after;
      }
      await this.run(`${change.kind}.set`, { [change.kind === "node" ? "nodeId" : "componentId"]: change.id, properties });
      if (change.kind === "component") await this.port.scene("ui.flush_label", { componentId: change.id });
      checkpoint = await this.snapshot(rootId);
    };
    try {
      for (const change of plan.rows) {
        pending = change;
        await update(change, false);
        completed.push(change);
        pending = null;
      }
      return { rootId, rows: completed, changed: completed.length > 0, needsSave: completed.length > 0, snapshotHash: checkpoint, mapping: p.mapping };
    } catch (error) {
      try {
        if (await this.snapshot(rootId) !== checkpoint) rollback.push({ status: "blocked", reason: "SUBTREE_CHANGED" });
        else for (const change of [...completed].reverse()) {
          await update(change, true);
          rollback.push({ status: "restored", id: change.id, property: change.property });
        }
      } catch (failure) {
        rollback.push({ status: "unknown", reason: CocosError.from(failure).message });
      }
      throw new CocosError("OUTCOME_UNKNOWN", "UI update failed; inspect completed, pending and rollback", { rootId, completed, pending, rollback, cause: CocosError.from(error).message });
    }
  }
};

// packages/creator3-adapter/src/ui.ts
var UiService = class {
  constructor(port, run) {
    this.port = port;
    this.run = run;
  }
  port;
  run;
  hash(value) {
    return (0, import_node_crypto14.createHash)("sha256").update(Json.canonical(Json.value(value))).digest("hex");
  }
  async snapshot(rootId) {
    return Json.value(await this.port.scene("ui.snapshot", { rootId }));
  }
  async plan(p) {
    var _a, _b;
    const rows = new UiDocumentModel().parse(p.document);
    const parentId = Json.string(p.parentId, "parentId");
    const environment = Json.value(await this.port.scene("ui.preflight", { parentId, document: p.document }));
    const assets = [];
    for (const row of rows) for (const component of (_a = row.node.components) != null ? _a : []) for (const [property, value] of Object.entries((_b = component.properties) != null ? _b : {})) {
      if (value && typeof value === "object" && !Array.isArray(value) && typeof value.assetUuid === "string") {
        const info = Json.object(await this.port.request("asset-db", "query-asset-info", value.assetUuid));
        if (!info.uuid) throw new CocosError("NOT_FOUND", `UI asset not found: ${value.assetUuid}`);
        assets.push({ key: row.key, type: component.type, property, asset: info });
      }
    }
    const revision = this.hash(await this.port.scene("fingerprint"));
    const planHash = this.hash({ document: p.document, parentId, revision, assets, environment, version: this.port.version });
    return {
      planHash,
      revision,
      parentId,
      rows: rows.map((row) => {
        var _a2;
        return { key: row.key, parentKey: row.parentKey, name: row.node.name, components: ["cc.UITransform", ...((_a2 = row.node.components) != null ? _a2 : []).filter((c) => c.type !== "cc.UITransform").map((c) => c.type)] };
      }),
      assets,
      limitations: ["\u53EA\u521B\u5EFA\u65B0\u6811\uFF0C\u4E0D\u4FEE\u6539\u6216\u66FF\u6362\u5DF2\u6709\u540C\u540D\u8282\u70B9", "\u4E0D\u81EA\u52A8\u521B\u5EFA Camera\uFF1BCanvas \u9700\u8981\u5DE5\u7A0B\u5DF2\u6709\u53EF\u89C1 UI_2D \u7684\u76F8\u673A", "\u4EA4\u4E92\u68C0\u67E5\u4E3A\u9759\u6001\u8BCA\u65AD\uFF0C\u4E0D\u80FD\u66FF\u4EE3\u771F\u5B9E\u70B9\u51FB\u548C\u4FDD\u5B58\u91CD\u5F00\u9A8C\u6536"]
    };
  }
  async build(p) {
    var _a, _b, _c;
    const plan = await this.plan(p);
    if (p.planHash !== plan.planHash) throw new CocosError("STALE_REVISION", "UI plan changed; run ui.plan again");
    const rows = new UiDocumentModel().parse(p.document), mapping = /* @__PURE__ */ new Map(), completed = [];
    let rootId, checkpoint, pending = null;
    const step = async (id, params) => {
      var _a2;
      if (rootId && checkpoint !== this.hash(await this.snapshot(rootId))) throw new CocosError("STALE_REVISION", "UI subtree changed during build");
      pending = { capabilityId: id, params };
      const result = Json.object(await this.run(id, params));
      if (id === "component.add") for (const componentId of (_a2 = result.componentIds) != null ? _a2 : []) await this.port.scene("ui.flush_label", { componentId });
      if (id === "component.set") await this.port.scene("ui.flush_label", { componentId: params.componentId });
      if (id === "node.create" && !rootId) rootId = Json.string(result.nodeId, "rootId");
      completed.push({ capabilityId: id, result });
      pending = null;
      if (rootId) checkpoint = this.hash(await this.snapshot(rootId));
      return result;
    };
    try {
      for (const row of rows) {
        const result = await step("node.create", { name: row.node.name, parentId: row.parentKey ? mapping.get(row.parentKey) : p.parentId });
        const nodeId = Json.string(result.nodeId, "nodeId");
        mapping.set(row.key, nodeId);
        await step("node.set", { nodeId, properties: { layer: 1 << 25, ...row.node.position ? { position: row.node.position } : {} } });
        const wanted = [{ type: "cc.UITransform", properties: {} }, ...(_a = row.node.components) != null ? _a : []];
        for (const component of wanted) {
          const tree = Json.object(await this.port.scene("hierarchy", { rootId: nodeId, limit: 1 }));
          const existing = Json.object(tree.rows[0]).components.find((c) => c.type === component.type);
          if (!existing) await step("component.add", { nodeId, type: component.type });
        }
      }
      for (const widgetPass of [false, true]) for (const row of rows) {
        const nodeId = mapping.get(row.key);
        for (const component of [...(_b = row.node.components) != null ? _b : []].filter((component2) => component2.type === "cc.Widget" === widgetPass).sort((a, b) => Number(a.type === "cc.UITransform") - Number(b.type === "cc.UITransform"))) {
          const tree = Json.object(await this.port.scene("hierarchy", { rootId: nodeId, limit: 1 }));
          const actual = Json.object(tree.rows[0]).components.find((c) => c.type === component.type);
          if (!actual) throw new CocosError("VERIFICATION_FAILED", `Missing UI component: ${component.type}`);
          const properties = await new UiProperties(this.port).resolve((_c = component.properties) != null ? _c : {}, mapping);
          if (Object.keys(properties).length) await step("component.set", { componentId: actual.componentId, properties });
        }
      }
      return {
        rootId,
        rows: rows.map((row) => ({ key: row.key, nodeId: mapping.get(row.key) })),
        completed,
        needsSave: true,
        snapshotHash: checkpoint,
        diagnostics: Json.value(await this.port.scene("ui.inspect_layout", { rootId }))
      };
    } catch (error) {
      let rollback = { status: "not-attempted" };
      if (rootId && checkpoint) {
        try {
          if (this.hash(await this.snapshot(rootId)) !== checkpoint) rollback = { status: "blocked", reason: "\u5B50\u6811\u4E0E\u6700\u540E\u5DF2\u786E\u8BA4\u72B6\u6001\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u68C0\u67E5 pending \u548C\u5F53\u524D\u8282\u70B9\uFF1B\u672A\u5220\u9664\u4EFB\u4F55\u5BF9\u8C61" };
          else {
            await this.run("node.delete", { nodeId: rootId });
            rollback = { status: "removed-owned-tree", nodeId: rootId };
          }
        } catch (rollbackError) {
          rollback = { status: "unknown", reason: CocosError.from(rollbackError).message };
        }
      }
      throw new CocosError("OUTCOME_UNKNOWN", "UI build failed; inspect completed, pending and rollback before retrying", { cause: CocosError.from(error).message, rootId: rootId != null ? rootId : null, completed, pending, rollback });
    }
  }
  async execute(id, p) {
    if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "UI tools require Creator 3.8.8");
    if (id === "ui.diff") return new UiUpdateService(this.port, this.run).diff(p);
    if (id === "ui.apply") return new UiUpdateService(this.port, this.run).apply(p);
    if (id === "ui.plan") return this.plan(p);
    if (id === "ui.build") return this.build(p);
    if (id === "ui.inspect_layout" || id === "ui.validate_interaction") return Json.value(await this.port.scene(id, p));
    throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown UI capability: ${id}`);
  }
};

// packages/creator3-adapter/src/texture.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto15 = require("crypto");
var import_promises19 = require("fs/promises");
var import_node_path9 = require("path");
var import_ajv6 = __toESM(require_ajv(), 1);
var TextureService = class {
  constructor(port, family = "texture") {
    this.port = port;
    this.family = family;
  }
  port;
  family;
  backupId() {
    const bytes = (0, import_node_crypto15.randomBytes)(16);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = bytes.toString("hex");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  hash(value) {
    return (0, import_node_crypto15.createHash)("sha256").update(Json.canonical(value)).digest("hex");
  }
  async read(url) {
    const paths = await ProjectPaths.open(this.port.projectPath), path = await paths.asset(url);
    if ((await (0, import_promises19.stat)(path)).size > 64 * 1024 * 1024) throw new CocosError("INVALID_ARGUMENT", "Texture source exceeds 64 MiB inspection limit");
    const asset = Json.object(await this.port.request("asset-db", "query-asset-info", url));
    const meta = Json.object(await this.port.request("asset-db", "query-asset-meta", url));
    if (!asset.uuid || asset.uuid !== meta.uuid || !["image", "texture"].includes(String(meta.importer))) throw new CocosError("INVALID_ARGUMENT", "Expected a source image/texture with matching AssetDB UUID");
    const sourceHash = (0, import_node_crypto15.createHash)("sha256").update(await (0, import_promises19.readFile)(path)).digest("hex");
    return { url, asset, meta, sourceHash, expectedHash: this.hash({ meta, sourceHash }) };
  }
  target(meta, uuid) {
    var _a;
    const rows = [meta, ...Object.values(Json.object((_a = meta.subMetas) != null ? _a : {})).map((value) => Json.object(value))].filter((row) => row.importer === (this.family === "texture" ? "texture" : "sprite-frame"));
    const candidates = uuid ? rows.filter((row) => row.uuid === uuid) : rows;
    if (candidates.length !== 1) throw new CocosError("INVALID_ARGUMENT", "Specify textureUuid identifying exactly one texture subresource");
    return candidates[0];
  }
  async plan(p) {
    var _a, _b, _c, _d, _e, _f;
    const before = await this.read(Json.string(p.url, "url")), meta = Json.object(Json.value(before.meta));
    const target = this.target(meta, (_a = p.textureUuid) != null ? _a : p.spriteFrameUuid), settings = Json.object(p.settings), original = Json.object((_b = target.userData) != null ? _b : {});
    target.userData = { ...original, ...settings };
    if (this.family === "spriteframe") {
      const data = Json.object(target.userData), width = Number(data.width), height = Number(data.height);
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) throw new CocosError("UNSUPPORTED_CAPABILITY", "SpriteFrame importer dimensions are unavailable");
      if (Number((_c = data.borderLeft) != null ? _c : 0) + Number((_d = data.borderRight) != null ? _d : 0) > width || Number((_e = data.borderTop) != null ? _e : 0) + Number((_f = data.borderBottom) != null ? _f : 0) > height) throw new CocosError("INVALID_ARGUMENT", "Nine-slice borders exceed frame dimensions");
    }
    const rows = Object.entries(settings).map(([property, value]) => {
      var _a2;
      return { property, before: (_a2 = original[property]) != null ? _a2 : null, after: value };
    });
    return { ...before, textureUuid: target.uuid, plannedMeta: meta, rows, planHash: this.hash({ before, meta, textureUuid: target.uuid }), requiresReimport: rows.some((row) => Json.canonical(row.before) !== Json.canonical(row.after)) };
  }
  async write(url, meta) {
    var _a;
    const saved = await this.port.request("asset-db", "save-asset-meta", url, JSON.stringify(meta));
    if (saved === false) throw new CocosError("EDITOR_ERROR", "AssetDB rejected texture metadata");
    const imported = await this.port.request("asset-db", "reimport-asset", url);
    if (imported === false) throw new CocosError("EDITOR_ERROR", "AssetDB texture reimport failed");
    let previous;
    for (let attempt = 0; attempt < 30; attempt++) {
      const state = await this.read(url), pending = [Json.object(state.meta)];
      let ready = true;
      while (pending.length) {
        const entry = pending.pop();
        if (entry.imported === false) ready = false;
        for (const child of Object.values(Json.object((_a = entry.subMetas) != null ? _a : {}))) pending.push(Json.object(child));
      }
      if (ready && state.expectedHash === previous) return;
      previous = ready ? state.expectedHash : void 0;
      await new Promise((resolve3) => setTimeout(resolve3, 100));
    }
    throw new CocosError("CONTEXT_UNAVAILABLE", "Texture subresource import did not settle within 3 seconds");
  }
  async execute(id, p) {
    if (!["3.8.8", "2.4.15"].includes(this.port.version)) throw new CocosError("UNSUPPORTED_VERSION", "Texture import tools require Creator 3.8.8");
    const capability = [...new TextureCapabilities().list(), ...new TwoDCapabilities().list()].find((row) => row.id === id);
    if (!capability) throw new CocosError("UNSUPPORTED_CAPABILITY", `Unknown texture tool: ${id}`);
    const valid = new import_ajv6.Ajv({ strict: true }).compile(capability.inputSchema);
    if (!valid(p)) throw new CocosError("INVALID_ARGUMENT", "Invalid texture parameters", { errors: JSON.stringify(valid.errors) });
    if (id === `${this.family}.inspect`) {
      const result = await this.read(Json.string(p.url, "url"));
      return { ...result, users: Json.value(await this.port.request("asset-db", "query-asset-users", p.url)), limitations: ["\u672A\u9A8C\u8BC1\u76EE\u6807\u5E73\u53F0\u538B\u7F29\u7ED3\u679C\u6216 GPU \u91C7\u6837\u753B\u9762"] };
    }
    if (id === "texture.plan_import" || id === "spriteframe.plan") return this.plan(p);
    if (id === "texture.apply_import" || id === "spriteframe.apply") {
      const plan = await this.plan(p);
      if (p.planHash !== plan.planHash) throw new CocosError("STALE_REVISION", "Texture import plan changed; plan again");
      if (!plan.requiresReimport) return { changed: false, expectedHash: plan.expectedHash };
      const paths2 = await ProjectPaths.open(this.port.projectPath), backupId2 = this.backupId(), directory = await paths2.work("cache", "texture-backups");
      await (0, import_promises19.writeFile)((0, import_node_path9.join)(directory, `${backupId2}.json`), JSON.stringify({ url: p.url, meta: plan.meta, sourceHash: plan.sourceHash }), { flag: "wx" });
      if ((await this.read(String(p.url))).expectedHash !== plan.expectedHash) throw new CocosError("STALE_REVISION", "Texture changed while backing up");
      try {
        await this.write(String(p.url), Json.object(plan.plannedMeta));
        const after = await this.read(String(p.url)), target = this.target(Json.object(after.meta), plan.textureUuid);
        if (after.sourceHash !== plan.sourceHash || Json.object(after.asset).uuid !== Json.object(plan.asset).uuid || Object.entries(Json.object(p.settings)).some(([key, value]) => {
          var _a;
          return Json.canonical((_a = Json.object(target.userData)[key]) != null ? _a : null) !== Json.canonical(value);
        })) throw new CocosError("VERIFICATION_FAILED", "Texture import readback differs from plan");
        return { changed: true, backupId: backupId2, ...after, rows: plan.rows };
      } catch (error) {
        throw new CocosError("OUTCOME_UNKNOWN", "Texture import incomplete; inspect before guarded restore", { url: p.url, backupId: backupId2, cause: CocosError.from(error).message });
      }
    }
    const paths = await ProjectPaths.open(this.port.projectPath), backupId = Json.string(p.backupId, "backupId");
    const backupPath = await paths.resolve(`.codex-work/cache/texture-backups/${backupId}.json`);
    const backup = Json.object(JSON.parse(await (0, import_promises19.readFile)(backupPath, "utf8")));
    if (backup.url !== p.url) throw new CocosError("INVALID_ARGUMENT", "Texture backup belongs to a different asset");
    const before = await this.read(String(p.url));
    if (before.expectedHash !== p.expectedHash || before.sourceHash !== backup.sourceHash || Json.object(before.meta).uuid !== Json.object(backup.meta).uuid) throw new CocosError("STALE_REVISION", "Texture or source changed before restore");
    try {
      await this.write(String(p.url), Json.object(backup.meta));
      const after = await this.read(String(p.url));
      if (after.expectedHash !== this.hash({ meta: backup.meta, sourceHash: backup.sourceHash })) throw new CocosError("VERIFICATION_FAILED", "Texture restore readback differs from backup");
      return { restored: true, backupId, ...after };
    } catch (error) {
      throw new CocosError("OUTCOME_UNKNOWN", "Texture restore incomplete; inspect current metadata before retrying", { backupId, url: p.url, cause: CocosError.from(error).message });
    }
  }
};

// packages/creator3-adapter/src/prefab.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto17 = require("crypto");
var import_promises20 = require("fs/promises");

// packages/creator3-adapter/src/prefab-sources.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto16 = require("crypto");
var PrefabSources = class {
  constructor(port) {
    this.port = port;
  }
  port;
  sources = /* @__PURE__ */ new Map();
  reader = new FileSnapshots();
  bytes = 0;
  started = false;
  uuids = new AssetUuid();
  async capture(uuid) {
    if (this.started) throw new CocosError("OPERATION_CONFLICT", "Prefab source capture is single-use; create a fresh inspection");
    this.started = true;
    uuid = this.uuids.normalize(uuid);
    const paths = await ProjectPaths.open(this.port.projectPath);
    const read = async (id, ancestors) => {
      var _a;
      id = this.uuids.normalize(id);
      if (ancestors.has(id)) throw new CocosError("VERIFICATION_FAILED", "Cyclic nested Prefab dependency", { assetUuid: id });
      if (this.sources.has(id)) return;
      if (ancestors.size >= 16 || this.sources.size >= 100) throw new CocosError("RESOURCE_BUSY", "Prefab dependency graph budget exceeded");
      const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", id)));
      const url = Json.string(info.url, "Prefab URL");
      if (typeof info.uuid !== "string" || this.uuids.normalize(info.uuid) !== id || info.type !== "cc.Prefab" || !url.endsWith(".prefab")) throw new CocosError("VERIFICATION_FAILED", "Prefab source identity does not match AssetDB", { assetUuid: id });
      const path = await paths.asset(url), snapshot = await this.reader.read(path, Math.min(16 * 1024 * 1024, 64 * 1024 * 1024 - this.bytes), true);
      this.bytes += snapshot.bytes;
      let table;
      try {
        table = JSON.parse(snapshot.text);
      } catch {
        throw new CocosError("VERIFICATION_FAILED", "Invalid Prefab source JSON", { url });
      }
      if (!Array.isArray(table) || table.length > 1e5) throw new CocosError("VERIFICATION_FAILED", "Invalid Prefab source table", { url });
      this.sources.set(id, { uuid: id, url, path, snapshot });
      const next = /* @__PURE__ */ new Set([...ancestors, id]);
      for (const value of table) {
        if (!value || typeof value !== "object" || value.__type__ !== "cc.PrefabInfo") continue;
        const dependency = typeof ((_a = value.asset) == null ? void 0 : _a.__uuid__) === "string" ? this.uuids.normalize(value.asset.__uuid__) : void 0;
        if (typeof dependency !== "string" || dependency === id && !value.instance) continue;
        await read(dependency, next);
      }
    };
    await read(uuid, /* @__PURE__ */ new Set());
    const source = this.sources.get(uuid);
    const dependencies = [...this.sources.values()].map((row) => ({ assetUuid: row.uuid, url: row.url, sha256: row.snapshot.sha256, bytes: row.snapshot.bytes })).sort((a, b) => a.assetUuid.localeCompare(b.assetUuid));
    return {
      url: source.url,
      text: source.snapshot.text,
      sha256: source.snapshot.sha256,
      dependencies,
      graphHash: (0, import_node_crypto16.createHash)("sha256").update(Json.canonical(dependencies)).digest("hex")
    };
  }
  async verify() {
    const paths = await ProjectPaths.open(this.port.projectPath);
    for (const source of this.sources.values()) {
      const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", source.uuid)));
      if (typeof info.uuid !== "string" || this.uuids.normalize(info.uuid) !== source.uuid || info.url !== source.url || info.type !== "cc.Prefab" || await paths.asset(source.url) !== source.path) {
        throw new CocosError("STALE_REVISION", "Prefab dependency identity changed during inspection", { assetUuid: source.uuid });
      }
      await this.reader.verify(source.path, source.snapshot.identity);
    }
  }
};

// packages/ui-core/src/prefab-diff.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PrefabDiff = class {
  uuids = new AssetUuid();
  problem(issues, value) {
    if (issues.length >= 1e3) throw new CocosError("RESOURCE_BUSY", "Prefab comparison issue budget exceeded");
    issues.push(value);
  }
  graph(input, side) {
    var _a;
    const value = typeof input === "string" ? JSON.parse(input) : input;
    if (!Array.isArray(value) || !value.length || value.length > 1e5) throw new CocosError("VERIFICATION_FAILED", "Expected a bounded native Prefab object table");
    const table = value.map((row) => Json.object(row)), entities = /* @__PURE__ */ new Map(), byIndex = /* @__PURE__ */ new Map(), issues = [];
    const reference = (value2) => {
      if (!value2 || typeof value2 !== "object" || Array.isArray(value2) || !Number.isInteger(value2.__id__)) return void 0;
      const index = Number(value2.__id__);
      return index >= 0 && index < table.length ? index : void 0;
    };
    const object = (value2) => {
      const index = reference(value2);
      return index !== void 0 ? table[index] : value2 && typeof value2 === "object" && !Array.isArray(value2) ? value2 : {};
    };
    const rootIndex = table[0].__type__ === "cc.Prefab" ? reference(table[0].data) : 0;
    if (rootIndex === void 0 || ((_a = table[rootIndex]) == null ? void 0 : _a.__type__) !== "cc.Node") throw new CocosError("VERIFICATION_FAILED", "Prefab root is unavailable in serialized snapshot");
    const visited = /* @__PURE__ */ new Set();
    const visit = (index, parent, scope, kind, order, depth) => {
      var _a2, _b, _c, _d;
      if (depth > 128 || entities.size >= 1e4) throw new CocosError("RESOURCE_BUSY", "Prefab hierarchy comparison budget exceeded");
      if (visited.has(index)) {
        this.problem(issues, { side, code: "DUPLICATE_OR_CYCLIC_HIERARCHY", index });
        return (_a2 = byIndex.get(index)) != null ? _a2 : "unresolved";
      }
      visited.add(index);
      const record = table[index], info = object(kind === "node" ? record._prefab : record.__prefab);
      if (parent !== null) {
        const owner = reference(kind === "node" ? record._parent : (_b = record.node) != null ? _b : record._node);
        if (owner === void 0 || byIndex.get(owner) !== parent) this.problem(issues, { side, code: "HIERARCHY_OWNER_MISMATCH", index, kind });
      }
      const nested = object(info.instance), fileId = typeof info.fileId === "string" ? info.fileId : "";
      if ((kind === "node" ? record._prefab : record.__prefab) && !fileId) this.problem(issues, { side, code: "BROKEN_PREFAB_ASSOCIATION", index });
      if (info.instance && !nested.fileId) this.problem(issues, { side, code: "NESTED_INSTANCE_ID_MISSING", index });
      if (kind === "node" && parent && info.instance && record._children === void 0) this.problem(issues, { side, code: "NESTED_SNAPSHOT_NOT_EXPANDED", index });
      const currentScope = kind === "node" && parent !== null && typeof nested.fileId === "string" && nested.fileId ? [...scope, nested.fileId] : scope;
      let key = JSON.stringify([...currentScope, kind, fileId]);
      if (!fileId) {
        key = `${side}:unlinked:${index}`;
        if (side === "source") this.problem(issues, { side, code: "SOURCE_FILE_ID_MISSING", index });
      }
      if (entities.has(key)) {
        this.problem(issues, { side, code: "AMBIGUOUS_FILE_ID", key, index });
        key = `${side}:ambiguous:${index}`;
      }
      entities.set(key, { key, index, kind, parent, order, fileId, scope: currentScope, asset: (_c = info.asset) != null ? _c : null, record });
      byIndex.set(index, key);
      if (kind === "node") for (const [field, childKind] of [["_children", "node"], ["_components", "component"]]) {
        if (!(field in record)) this.problem(issues, { side, code: "HIERARCHY_LIST_MISSING", index, field });
        const children = (_d = record[field]) != null ? _d : [];
        if (!Array.isArray(children)) {
          this.problem(issues, { side, code: "INVALID_HIERARCHY_LIST", index, field });
          continue;
        }
        if (children.length > 1e4) throw new CocosError("RESOURCE_BUSY", "Prefab hierarchy list budget exceeded");
        children.forEach((value2, order2) => {
          var _a3, _b2, _c2;
          const child = reference(value2);
          if (child === void 0 || childKind === "node" && ((_a3 = table[child]) == null ? void 0 : _a3.__type__) !== "cc.Node" || childKind === "component" && (typeof ((_b2 = table[child]) == null ? void 0 : _b2.__type__) !== "string" || ((_c2 = table[child]) == null ? void 0 : _c2.__type__) === "cc.Node")) {
            this.problem(issues, { side, code: "BROKEN_HIERARCHY_REFERENCE", index, field, order: order2 });
            return;
          }
          visit(child, key, currentScope, childKind, order2, depth + 1);
        });
      }
      return key;
    };
    const root = visit(rootIndex, null, [], "node", 0, 0);
    return { table, entities, byIndex, issues, root, propertyVisits: 0, assetReferences: [] };
  }
  properties(graph, entity, side) {
    var _a;
    let visited = 0;
    const normalize = (value, path, ancestors = /* @__PURE__ */ new Set(), depth = 0) => {
      var _a2, _b;
      if (++visited > 1e5 || ++graph.propertyVisits > 2e5 || depth > 64) throw new CocosError("RESOURCE_BUSY", "Prefab property comparison budget exceeded");
      if (!value || typeof value !== "object") return value;
      if (Array.isArray(value)) return value.map((row, index) => normalize(row, `${path}[${index}]`, ancestors, depth + 1));
      if (typeof value.__uuid__ === "string") {
        if (graph.assetReferences.length >= 1e3) throw new CocosError("RESOURCE_BUSY", "Prefab asset reference occurrence budget exceeded");
        graph.assetReferences.push({ assetUuid: this.uuids.normalize(value.__uuid__), side, key: entity.key, path });
      }
      if ("__id__" in value) {
        const index = Number(value.__id__);
        if (!Number.isInteger(value.__id__) || index < 0 || !graph.table[index]) {
          this.problem(graph.issues, { side, key: entity.key, path, code: "BROKEN_PROPERTY_REFERENCE" });
          return { unresolvedReference: true };
        }
        const key = graph.byIndex.get(index);
        if (key) return { prefabObject: key };
        if (ancestors.has(index)) {
          this.problem(graph.issues, { side, key: entity.key, path, code: "CYCLIC_VALUE_REFERENCE" });
          return { unresolvedReference: true };
        }
        const target = graph.table[index];
        if (target.__type__ === "cc.Node" || "node" in target || "_node" in target) {
          this.problem(graph.issues, { side, key: entity.key, path, code: "EXTERNAL_OBJECT_REFERENCE" });
          return { externalObject: (_a2 = target._id) != null ? _a2 : null, type: (_b = target.__type__) != null ? _b : null };
        }
        return normalize(target, path, /* @__PURE__ */ new Set([...ancestors, index]), depth + 1);
      }
      const result2 = {};
      for (const [key, row] of Object.entries(value)) Object.defineProperty(result2, key, { value: key === "__uuid__" && typeof row === "string" ? this.uuids.normalize(row) : normalize(row, `${path}.${key}`, ancestors, depth + 1), enumerable: true });
      return result2;
    };
    const result = {};
    const excluded = /* @__PURE__ */ new Set(["_id", "_prefab", "__prefab", "_parent", "_children", "_components", "node", "_node", "_objFlags", "_editorExtras", "__editorExtras__"]);
    for (const [key, value] of Object.entries(entity.record)) if (!excluded.has(key)) Object.defineProperty(result, key, { value: normalize(value, key), enumerable: true });
    let asset = entity.asset;
    if (asset && typeof asset === "object" && !Array.isArray(asset) && "__id__" in asset) {
      const index = Number(asset.__id__);
      if (Number.isInteger(asset.__id__) && ((_a = graph.table[index]) == null ? void 0 : _a.__type__) === "cc.Prefab" && index === 0 && graph.assetUuid) asset = { __uuid__: graph.assetUuid };
      else this.problem(graph.issues, { side, key: entity.key, code: "UNRESOLVED_PREFAB_ASSET_REFERENCE" });
    }
    return { hierarchy: { parent: entity.parent, order: entity.order }, properties: result, ...entity.parent && entity.kind === "node" ? { assetAssociation: normalize(asset, "assetAssociation") } : {} };
  }
  compare(source, instance, observedNodeCount, observedComponentCount, assetUuid, assetIssues = []) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const left = this.graph(source, "source"), right = this.graph(instance, "instance");
    if (assetUuid) {
      left.assetUuid = assetUuid;
      right.assetUuid = assetUuid;
    }
    if (left.root !== right.root) right.issues.push({ side: "instance", code: "ROOT_FILE_ID_MISMATCH" });
    if (observedNodeCount !== void 0 && [...right.entities.values()].filter((row) => row.kind === "node").length !== observedNodeCount) right.issues.push({ side: "instance", code: "SERIALIZED_HIERARCHY_INCOMPLETE", observedNodeCount });
    if (observedComponentCount !== void 0 && [...right.entities.values()].filter((row) => row.kind === "component").length !== observedComponentCount) right.issues.push({ side: "instance", code: "SERIALIZED_COMPONENTS_INCOMPLETE", observedComponentCount });
    const before = /* @__PURE__ */ new Map(), after = /* @__PURE__ */ new Map();
    for (const entity of left.entities.values()) before.set(entity.key, this.properties(left, entity, "source"));
    for (const entity of right.entities.values()) after.set(entity.key, this.properties(right, entity, "instance"));
    if (assetIssues.length > 2e3) throw new CocosError("RESOURCE_BUSY", "Prefab asset issue budget exceeded");
    const issues = [...left.issues, ...right.issues, ...assetIssues], complete = issues.length === 0, rows = [], entries = /* @__PURE__ */ new Map();
    for (const key of /* @__PURE__ */ new Set([...left.entities.keys(), ...right.entities.keys()])) {
      const old = left.entities.get(key), current = right.entities.get(key), entity = current != null ? current : old;
      const changes = old && current ? Json.diff(before.get(key), after.get(key), 10001) : [];
      if (changes.some((row) => row.kind === "truncated") || rows.length + changes.length + (!old || !current ? 1 : 0) > 1e4) throw new CocosError("RESOURCE_BUSY", "Prefab diff output budget exceeded");
      const status = !old ? complete ? "added" : "unverified-added" : !current ? complete ? "removed" : "unverified-missing" : changes.length ? complete ? "modified" : "unverified-modified" : "unchanged";
      if (!old || !current) rows.push({ key, kind: entity.kind, status, fileId: entity.fileId, scope: entity.scope, sourceIndex: (_a = old == null ? void 0 : old.index) != null ? _a : null, instanceIndex: (_b = current == null ? void 0 : current.index) != null ? _b : null });
      for (const change of changes) rows.push({ key, kind: entity.kind, status: complete ? "property-override" : "unverified-property-difference", change });
      entries.set(key, {
        key,
        kind: entity.kind,
        name: String((_d = (_c = entity.record._name) != null ? _c : entity.record.__type__) != null ? _d : ""),
        status,
        fileId: entity.fileId,
        scope: entity.scope,
        sourceId: (_e = old == null ? void 0 : old.record._id) != null ? _e : null,
        instanceId: (_f = current == null ? void 0 : current.record._id) != null ? _f : null,
        sourceAsset: (_g = old == null ? void 0 : old.asset) != null ? _g : null,
        instanceAsset: (_h = current == null ? void 0 : current.asset) != null ? _h : null,
        changes,
        children: [],
        components: []
      });
    }
    const tree = [];
    for (const [key, entry] of entries) {
      const entity = (_i = right.entities.get(key)) != null ? _i : left.entities.get(key);
      const parent = entity.parent ? entries.get(entity.parent) : void 0;
      if (parent) parent[entity.kind === "node" ? "children" : "components"].push(entry);
      else tree.push(entry);
    }
    return {
      rows,
      tree,
      issues,
      assetReferences: [...left.assetReferences, ...right.assetReferences],
      comparisonComplete: complete,
      automaticRepairAllowed: false,
      excludedFields: ["_id", "_objFlags", "_editorExtras", "__editorExtras__", "_prefab", "__prefab"],
      limitations: ["fileId \u548C\u5D4C\u5957\u5B9E\u4F8B fileId \u4E3A\u5173\u8054\u4F9D\u636E\uFF0C\u540D\u79F0\u548C\u8FD0\u884C\u65F6 UUID \u4E0D\u7528\u4E8E\u5339\u914D", "Prefab \u5143\u6570\u636E\u7528\u6765\u5B9A\u4F4D\u8EAB\u4EFD\uFF0C\u4E0D\u6BD4\u8F83\u79C1\u6709\u8986\u76D6\u8D26\u672C\u548C\u7F16\u8F91\u5668\u7F13\u5B58\u5B57\u6BB5", "\u81EA\u5B9A\u4E49\u5B57\u6BB5\u4EC5\u6BD4\u8F83\u539F\u751F\u5DF2\u5E8F\u5217\u5316\u503C\uFF0C\u4E0D\u53E6\u884C\u8C03\u7528\u9879\u76EE getter \u6216\u56DE\u8C03", "\u8D44\u6E90 UUID \u7EDF\u4E00\u6807\u51C6\u4E0E 22 \u5B57\u7B26\u538B\u7F29\u8868\u793A\uFF1BAssetDB \u5F15\u7528\u8EAB\u4EFD\u67E5\u8BE2\u4E0D\u8BC1\u660E\u5BFC\u5165\u7F13\u5B58\u6216\u8FD0\u884C\u65F6\u52A0\u8F7D\u53EF\u7528", "\u5FEB\u7167\u7F3A\u5931\u6216\u5916\u90E8\u5F15\u7528\u5BFC\u81F4 incomplete\uFF0C\u4E0D\u80FD\u636E\u6B64\u81EA\u52A8\u65B0\u589E\u3001\u5220\u9664\u3001apply \u6216 restore"]
    };
  }
};

// packages/creator3-adapter/src/prefab-reference-validation.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PrefabReferenceValidation = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async inspect(references) {
    const uuids = new AssetUuid(), ids = [...new Set(references.map((row) => uuids.normalize(Json.string(row.assetUuid, "Asset reference UUID"))))].sort();
    if (ids.length > 500 || references.length > 2e3) throw new CocosError("RESOURCE_BUSY", "Prefab asset lookup budget exceeded");
    const results = /* @__PURE__ */ new Map();
    let next = 0;
    const worker = async () => {
      while (next < ids.length) {
        const assetUuid = ids[next++];
        try {
          const value = await this.port.request("asset-db", "query-asset-info", assetUuid);
          if (!value) {
            results.set(assetUuid, { assetUuid, status: "not-found" });
            continue;
          }
          const info = Json.object(Json.value(value));
          if (info.invalid === true || info.imported === false || info.isDirectory === true) {
            results.set(assetUuid, { assetUuid, status: "unavailable" });
            continue;
          }
          results.set(assetUuid, typeof info.uuid === "string" && uuids.normalize(info.uuid) === assetUuid ? { assetUuid, status: "resolved", url: typeof info.url === "string" ? info.url : null, type: typeof info.type === "string" ? info.type : null } : { assetUuid, status: "identity-mismatch" });
        } catch {
          results.set(assetUuid, { assetUuid, status: "lookup-failed" });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(4, ids.length) }, worker));
    const rows = ids.map((id) => results.get(id));
    const issues = references.filter((row) => results.get(uuids.normalize(String(row.assetUuid))).status !== "resolved").map((row) => ({ ...row, code: "ASSET_REFERENCE_UNVERIFIED", reason: results.get(uuids.normalize(String(row.assetUuid))).status }));
    return { rows, issues };
  }
};

// packages/creator3-adapter/src/prefab.ts
var PrefabService = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async diff(nodeId) {
    var _a;
    if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Prefab diff requires Creator 3.8.8");
    const reference = Json.object(await this.port.scene("prefabReference", nodeId)), uuids = new AssetUuid(), assetUuid = uuids.normalize(Json.string(reference.assetUuid, "Prefab asset UUID"));
    const sources = new PrefabSources(this.port), source = await sources.capture(assetUuid), url = source.url;
    const snapshot = Json.object(await this.port.scene("prefab.snapshot", nodeId));
    if (snapshot.rootId !== nodeId || typeof snapshot.assetUuid !== "string" || uuids.normalize(snapshot.assetUuid) !== assetUuid) throw new CocosError("STALE_REVISION", "Prefab association changed during inspection");
    for (const field of ["observedNodeCount", "observedComponentCount"]) {
      const count = snapshot[field];
      if (typeof count !== "number" || !Number.isInteger(count) || count < (field === "observedNodeCount" ? 1 : 0) || count > 1e4) {
        throw new CocosError("VERIFICATION_FAILED", "Native Prefab snapshot count is invalid", { field });
      }
    }
    if (snapshot.serialized === void 0 || snapshot.serialized === null) throw new CocosError("VERIFICATION_FAILED", "Native Prefab serialized snapshot is missing");
    let componentIssues;
    if (snapshot.componentIssues === void 0) componentIssues = [{ side: "instance", code: "COMPONENT_AVAILABILITY_UNVERIFIED" }];
    else {
      if (!Array.isArray(snapshot.componentIssues) || snapshot.componentIssues.length > 1e3) throw new CocosError("VERIFICATION_FAILED", "Native component inspection is invalid");
      componentIssues = snapshot.componentIssues.map((value) => {
        if (!value || typeof value !== "object" || Array.isArray(value) || typeof value.code !== "string" || !value.code) throw new CocosError("VERIFICATION_FAILED", "Native component issue is invalid");
        return value;
      });
    }
    const comparer = new PrefabDiff();
    let comparison = comparer.compare(source.text, snapshot.serialized, Number(snapshot.observedNodeCount), Number(snapshot.observedComponentCount), assetUuid, componentIssues);
    const referenceValidation = await new PrefabReferenceValidation(this.port).inspect(comparison.assetReferences);
    if (referenceValidation.issues.length) comparison = comparer.compare(source.text, snapshot.serialized, Number(snapshot.observedNodeCount), Number(snapshot.observedComponentCount), assetUuid, [...componentIssues, ...referenceValidation.issues]);
    await sources.verify();
    return {
      ...comparison,
      assetReferenceValidation: referenceValidation.rows,
      nodeId,
      assetUuid,
      url,
      sourceHash: source.sha256,
      sourceDependencies: source.dependencies,
      sourceGraphHash: source.graphHash,
      instanceHash: (0, import_node_crypto17.createHash)("sha256").update(Json.canonical(snapshot.serialized)).digest("hex"),
      nativeSource: (_a = snapshot.source) != null ? _a : null
    };
  }
  async apply(nodeId) {
    const reference = Json.object(await this.port.scene("prefabReference", nodeId));
    const assetUuid = Json.string(reference.assetUuid, "prefab asset UUID");
    const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", assetUuid)));
    const url = Json.string(info.url, "prefab URL");
    if (info.type !== "cc.Prefab" || info.readonly === true || !url.endsWith(".prefab")) throw new CocosError("INVALID_ARGUMENT", "Expected an editable prefab asset");
    const path = await (await ProjectPaths.open(this.port.projectPath)).asset(url);
    const before = (0, import_node_crypto17.createHash)("sha256").update(await (0, import_promises20.readFile)(path)).digest("hex");
    const nativeResult = Json.value(await this.port.request("scene", "apply-prefab", nodeId));
    const after = (0, import_node_crypto17.createHash)("sha256").update(await (0, import_promises20.readFile)(path)).digest("hex");
    const resourceChanged = before !== after;
    if (nativeResult !== true && !resourceChanged) throw new CocosError("OUTCOME_UNKNOWN", "Prefab apply produced no observable asset write; inspect overrides before retrying", { assetUuid, url, nativeResult, sourceHash: after });
    return {
      assetUuid,
      url,
      nativeResult,
      resourceChanged,
      sourceHashBefore: before,
      sourceHash: after,
      verification: resourceChanged ? "asset-write-observed" : "native-acknowledged-no-content-change"
    };
  }
};

// packages/creator3-adapter/src/prefab-changes.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto18 = require("crypto");
var PrefabChanges = class {
  constructor(port) {
    this.port = port;
  }
  port;
  async plan(nodeId, action) {
    var _a;
    if (action !== "apply" && action !== "restore") throw new CocosError("INVALID_ARGUMENT", "Invalid Prefab change action");
    const diff = await new PrefabService(this.port).diff(nodeId);
    if (diff.comparisonComplete !== true) throw new CocosError("VERIFICATION_FAILED", "Incomplete Prefab comparison cannot authorize changes", { issues: (_a = diff.issues) != null ? _a : [] });
    if (action === "apply") {
      const info = Json.object(Json.value(await this.port.request("asset-db", "query-asset-info", diff.assetUuid)));
      if (typeof info.uuid !== "string" || new AssetUuid().normalize(info.uuid) !== diff.assetUuid || info.url !== diff.url || info.type !== "cc.Prefab" || info.readonly === true) throw new CocosError("INVALID_ARGUMENT", "Expected an editable Prefab asset");
    }
    const root = diff.tree[0];
    const preservedRows = action === "restore" ? diff.rows.filter((row) => row.key === (root == null ? void 0 : root.key) && row.kind === "node" && row.status === "property-override" && Json.object(row.change).path === "properties/_name") : [];
    const binding = {
      format: 1,
      projectPath: this.port.projectPath,
      version: this.port.version,
      nodeId,
      action,
      assetUuid: diff.assetUuid,
      url: diff.url,
      sourceHash: diff.sourceHash,
      sourceGraphHash: diff.sourceGraphHash,
      instanceHash: diff.instanceHash,
      preservedRows
    };
    const planHash = (0, import_node_crypto18.createHash)("sha256").update(Json.canonical(binding)).digest("hex");
    return { ...binding, planHash, expectedHash: diff.sourceGraphHash, sourceDependencies: diff.sourceDependencies, rows: diff.rows, sceneSavedByTool: false };
  }
  async execute(nodeId, action, expectedHash, planHash) {
    if (!/^[a-f0-9]{64}$/.test(expectedHash) || !/^[a-f0-9]{64}$/.test(planHash)) throw new CocosError("INVALID_ARGUMENT", "Prefab change requires SHA-256 guards");
    const current = await this.plan(nodeId, action);
    if (current.expectedHash !== expectedHash || current.planHash !== planHash) throw new CocosError("STALE_REVISION", "Prefab change plan is stale; inspect a fresh plan");
    let nativeResult;
    try {
      nativeResult = action === "apply" ? { result: Json.value(await this.port.request("scene", "apply-prefab", nodeId)) } : { result: Json.value(await this.port.request("scene", "restore-prefab", nodeId)) };
      const after = await new PrefabService(this.port).diff(nodeId);
      const dependencies = (value) => value.sourceDependencies.filter((row) => row.assetUuid !== value.assetUuid);
      if (after.assetUuid !== current.assetUuid || after.comparisonComplete !== true || !Array.isArray(after.rows) || Json.canonical(after.rows) !== Json.canonical(current.preservedRows) || action === "restore" && after.sourceGraphHash !== current.sourceGraphHash || Json.canonical(dependencies(after)) !== Json.canonical(dependencies(current))) {
        throw new CocosError("VERIFICATION_FAILED", "Prefab change did not converge to the source", { after });
      }
      return {
        nodeId,
        action,
        assetUuid: after.assetUuid,
        url: after.url,
        planHash,
        expectedHash,
        sourceHash: after.sourceHash,
        sourceGraphHash: after.sourceGraphHash,
        instanceHash: after.instanceHash,
        nativeResult,
        preservedRows: after.rows,
        verification: after.rows.length ? "source-instance-converged-with-preserved-properties" : "source-instance-converged",
        sceneSavedByTool: false
      };
    } catch (error) {
      throw new CocosError("OUTCOME_UNKNOWN", "Prefab change was dispatched but verification is incomplete; inspect before retrying", {
        nodeId,
        action,
        planHash,
        nativeResult: nativeResult != null ? nativeResult : null,
        cause: error instanceof Error ? error.message : String(error)
      });
    }
  }
};

// packages/creator3-adapter/src/index.ts
var Creator3Adapter = class {
  constructor(port) {
    this.port = port;
    this.shaders = new ShaderService(port);
  }
  port;
  async loginState() {
    return this.port.loginState ? this.port.loginState() : "unknown";
  }
  major = 3;
  shaders;
  supportedCapabilities() {
    const excluded = /* @__PURE__ */ new Set();
    if (this.port.version !== "3.8.8") for (const id of ["scene.references", "ui.structure.plan", "ui.structure.apply", "prefab.diff", "prefab.change.plan", "prefab.change.apply"]) excluded.add(id);
    if (!this.port.consoleAvailable || !this.port.consoleQuery || this.port.version !== "3.8.8") excluded.add("console.query");
    if (!this.port.preview || this.port.version !== "3.8.8") {
      for (const row of new Operations().list()) if (row.id.startsWith("preview.")) excluded.add(row.id);
    }
    return new Operations().list().filter((row) => {
      var _a;
      return row.context === "editor" && ((_a = row.supportedMajors) == null ? void 0 : _a.includes(3)) && !excluded.has(row.id) && (row.module !== "F22" || row.id === "shader.environment" || this.port.version === "3.8.8") && (!row.id.startsWith("rendering.") || this.port.version === "3.8.8") && (!row.id.startsWith("ui.") && !row.id.startsWith("texture.") && !row.id.startsWith("animation.") && row.id !== "font.inspect" || this.port.version === "3.8.8");
    }).map((row) => row.id);
  }
  async revision() {
    const snapshot = Json.value(await this.port.scene("fingerprint"));
    return (0, import_crypto7.createHash)("sha256").update(Json.canonical(snapshot)).digest("hex");
  }
  async scene(message, ...args) {
    return Json.value(await this.port.request("scene", message, ...args));
  }
  async asset(message, ...args) {
    return Json.value(await this.port.request("asset-db", message, ...args));
  }
  async ensureSaved() {
    if (await this.scene("query-dirty")) throw new CocosError("RESOURCE_BUSY", "Save the current scene before switching or closing it");
  }
  async setProperties(uuid, properties, component) {
    const query = component ? "query-component" : "query-node";
    const before = Json.object(await this.scene(query, uuid));
    const prepared = Object.entries(properties).map(([path, value]) => ({ path, value, dump: PropertyDump.assign(PropertyDump.locate(before, path), value) }));
    const location = component ? Json.object(await this.port.scene("componentLocation", uuid)) : null;
    const ownerId = location ? Json.string(location.nodeId, "component owner") : uuid;
    const undoId = await this.scene("begin-recording", ownerId);
    try {
      for (const patch of prepared) {
        const result = await this.scene("set-property", { uuid: ownerId, path: location ? `__comps__.${Number(location.index)}.${patch.path}` : patch.path, dump: patch.dump });
        if (result === false) throw new CocosError("EDITOR_ERROR", `Editor rejected property: ${patch.path}`);
      }
      if (component && before.type === "cc.Label") await this.port.scene("ui.flush_label", { componentId: uuid });
      const after = Json.object(await this.scene(query, uuid));
      for (const patch of prepared) {
        if (!PropertyDump.matches(PropertyDump.unwrap(PropertyDump.locate(after, patch.path)), patch.value)) {
          throw new CocosError("VERIFICATION_FAILED", `Property did not match after writing: ${patch.path}`);
        }
      }
      await this.scene("end-recording", undoId);
      return { [component ? "component" : "node"]: after };
    } catch (error) {
      try {
        await this.scene("cancel-recording", undoId);
      } catch (rollbackError) {
        throw new CocosError("OUTCOME_UNKNOWN", "Property update failed and its recording could not be cancelled", { cause: CocosError.from(error).message, rollback: CocosError.from(rollbackError).message });
      }
      throw error;
    }
  }
  async createNode(params) {
    var _a, _b, _c, _d;
    const info = Json.object(await this.port.scene("sceneInfo"));
    const parent = Json.string((_a = params.parentId) != null ? _a : info.sceneId, "parentId");
    if (!await this.port.scene("nodeExists", parent)) throw new CocosError("NOT_FOUND", "Parent is not in the active scene");
    const options = { name: (_b = params.name) != null ? _b : "Node", parent };
    if (params.assetUuid) {
      options.assetUuid = params.assetUuid;
      options.type = "cc.Prefab";
      options.unlinkPrefab = false;
    }
    const uuid = Json.string(await this.scene("create-node", options), "created node UUID");
    if (!await this.port.scene("nodeExists", uuid)) throw new CocosError("OUTCOME_UNKNOWN", "Created node was not attached to the active scene", { nodeId: uuid });
    await this.setProperties(uuid, { name: options.name }, false);
    const node = await this.scene("query-node", uuid);
    const tree = Json.object(await this.port.scene("hierarchy", { rootId: uuid, limit: 1, includeComponents: false }));
    const root = Json.object(tree.rows[0]);
    if (root.parentId !== parent || root.name !== options.name) throw new CocosError("OUTCOME_UNKNOWN", "Created node parent or name differs from request", { nodeId: uuid, requestedParentId: parent, actualParentId: (_c = root.parentId) != null ? _c : null, actualName: (_d = root.name) != null ? _d : null });
    if (params.assetUuid) {
      try {
        const reference = Json.object(await this.port.scene("prefabReference", uuid));
        if (reference.assetUuid !== params.assetUuid) throw new Error("Prefab association differs");
      } catch {
        throw new CocosError("OUTCOME_UNKNOWN", "Created node lost the requested prefab association", { nodeId: uuid });
      }
    }
    return { node, nodeId: uuid };
  }
  async execute(id, p) {
    if (/^(animation2d|gameplay2d|level2d|navigation2d|ui\.template)\./.test(id)) return new TwoDProduction(this.port, (id2, params) => this.execute(id2, params)).execute(id, p);
    if (FeatureSupport.owns(id)) return new EngineFeatureService(this.port, (id2, params) => this.execute(id2, params)).execute(id, p);
    const organization = new AssetOrganization(this.port);
    if (id === "asset.location") return organization.location(Json.string(p.url, "url"));
    if (id === "asset.references.scan") return new AssetReferenceAudit(this.port.projectPath).audit(p);
    if (id === "asset.organize.plan") return organization.plan(p);
    if (id === "asset.organize.apply") return organization.apply(p);
    if (id === "asset.organize.recovery") return organization.recovery(Json.string(p.journalId, "journalId"));
    const prepared = await organization.prepare(id, p);
    const result = await this.executePrepared(id, prepared.params);
    return prepared.location ? { ...Json.object(result), assetLocation: prepared.location } : result;
  }
  async executePrepared(id, p) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (["animation.clip.read", "animation.clip.patch", "animation.clip.restore"].includes(id)) return new AnimationEditService(this.port).execute(id, p);
    if (id.startsWith("animation.clip.")) {
      if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Animation tools require Creator 3.8.8");
      if (id === "animation.clip.create") {
        const url = Json.string(p.url, "url");
        if (!url.endsWith(".anim")) throw new CocosError("INVALID_ARGUMENT", "Animation URL must end in .anim");
        const content = await this.port.scene("animation.clip.serialize", p);
        const result = Json.object(await this.execute("asset.create", { url, content: JSON.stringify(content) }));
        const asset = Json.object(result.asset);
        try {
          return { ...result, clip: Json.value(await this.port.scene("animation.clip.inspect", { uuid: asset.uuid })) };
        } catch (error) {
          throw new CocosError("OUTCOME_UNKNOWN", "Animation created but native readback failed", { ...result, cause: CocosError.from(error).message });
        }
      }
      return Json.value(await this.port.scene(id, p));
    }
    if (id === "font.inspect") {
      if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Font inspection requires Creator 3.8.8");
      return Json.value(await this.port.scene(id, p));
    }
    if (id.startsWith("texture.")) return new TextureService(this.port).execute(id, p);
    if (id.startsWith("spriteframe.")) return new TextureService(this.port, "spriteframe").execute(id, p);
    if (id === "ui.owned_snapshot") return Json.value(await this.port.scene(id, p));
    if (id === "ui.owned_remove") {
      await this.port.scene("ui.owned_verify", p);
      const result = await this.execute("node.delete", { nodeId: p.rootId });
      return { ...Json.object(result), removedRootId: p.rootId, needsSave: true, verifiedAbsent: true, undoScope: "native-remove-node" };
    }
    if (id === "scene.references" || id === "ui.structure.plan" || id === "ui.structure.apply") {
      if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Native scene inspection requires Creator 3.8.8");
      return Json.value(await this.port.scene(id, p));
    }
    if (id.startsWith("ui.")) return new UiService(this.port, (id2, params) => this.execute(id2, params)).execute(id, p);
    if (id === "console.query") {
      if (!this.port.consoleAvailable || !this.port.consoleQuery || this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_CAPABILITY", "Creator console reader unavailable");
      return this.port.consoleQuery(p);
    }
    if (id === "geometry.create") return new GeometryService(this.port, (id2, params) => this.execute(id2, params)).create(p);
    if (id === "geometry.array") return new GeometryService(this.port, (id2, params) => this.execute(id2, params)).array(p);
    if (id.startsWith("rendering.")) {
      if (this.port.version !== "3.8.8") throw new CocosError("UNSUPPORTED_VERSION", "Rendering settings require Creator 3.8.8");
      const rendering = new RenderingService(this.port, (id2, params) => this.execute(id2, params));
      if (id === "rendering.query") return rendering.query(p);
      if (id === "rendering.configure") return rendering.configure(p);
      if (id === "rendering.planar_reflection") return rendering.planarReflection(p);
    }
    if (id.startsWith("preview.")) return new PreviewService(this.port).execute(id, p);
    if (id.startsWith("shader.") || id.startsWith("material.")) return this.shaders.execute(id, p);
    const str = (key) => Json.string(p[key], key);
    switch (id) {
      case "editor.status":
        return { editorVersion: this.port.version, creatorMajor: 3, projectPath: this.port.projectPath, ready: await this.scene("query-is-ready"), ...this.port.extensionState ? { extension: this.port.extensionState() } : {} };
      case "scene.query":
        return { context: "editor", scene: Json.value(await this.port.scene("sceneInfo")), dirty: await this.scene("query-dirty") };
      case "scene.snapshot":
        return { snapshot: Json.value(await this.port.scene("fingerprint")) };
      case "scene.diff": {
        const current = Json.value(await this.port.scene("fingerprint"));
        const baseline = Json.value(p.baseline);
        return { equal: Json.canonical(current) === Json.canonical(baseline), rows: Json.diff(baseline, current), current, baseline };
      }
      case "scene.hierarchy":
        return { ...Json.object(Json.value(await this.port.scene("hierarchy", p))), context: "editor" };
      case "scene.open": {
        const info = await this.asset("query-asset-info", str("uuid"));
        if (!info || typeof info !== "object" || Array.isArray(info)) throw new CocosError("NOT_FOUND", "Scene resource not found");
        if (info.type !== "cc.SceneAsset" || typeof info.uuid !== "string" || info.invalid === true) throw new CocosError("INVALID_ARGUMENT", "Expected a valid SceneAsset");
        await this.ensureSaved();
        await this.scene("open-scene", info.uuid);
        const result = Json.object(await this.execute("scene.query", {}));
        if (Json.object(result.scene).sceneId !== info.uuid) throw new CocosError("VERIFICATION_FAILED", "Editor did not open the requested scene", { expectedSceneUuid: info.uuid, actual: result });
        return result;
      }
      case "scene.close":
        await this.ensureSaved();
        return { closed: await this.scene("close-scene") };
      case "scene.save": {
        const uuid = await this.scene("save-scene");
        if (!uuid) throw new CocosError("VERIFICATION_FAILED", "Scene save was cancelled or did not return an asset UUID");
        if (await this.scene("query-dirty")) throw new CocosError("VERIFICATION_FAILED", "Scene remains dirty after save");
        const assetUuid = typeof uuid === "string" ? uuid : await this.scene("query-current-scene");
        if (typeof assetUuid !== "string" || !assetUuid) throw new CocosError("OUTCOME_UNKNOWN", "Native save completed without a confirmed asset UUID");
        return { sceneUuid: assetUuid, saved: true };
      }
      case "scene.save_copy": {
        const url = str("url");
        if (!url.endsWith(".scene")) throw new CocosError("INVALID_ARGUMENT", "Scene copy URL must end in .scene");
        if (await this.asset("query-asset-info", url)) throw new CocosError("RESOURCE_BUSY", "Scene copy target already exists");
        const data = await this.port.scene("serializeCurrentScene");
        const asset = Json.object(await this.asset("create-asset", url, JSON.stringify(data)));
        if (!asset.uuid) throw new CocosError("VERIFICATION_FAILED", "Scene copy did not return an asset UUID");
        return { asset, currentSceneUnchanged: true, dirty: await this.scene("query-dirty") };
      }
      case "scene.create": {
        await this.ensureSaved();
        const data = await this.port.scene("createSceneAsset", p);
        const asset = Json.object(await this.asset("create-asset", str("url"), JSON.stringify(data)));
        await this.scene("open-scene", Json.string(asset.uuid, "scene UUID"));
        return { scene: asset };
      }
      case "scene.undo":
        await this.scene("undo");
        return this.execute("scene.query", {});
      case "scene.redo":
        await this.scene("redo");
        return this.execute("scene.query", {});
      case "node.query":
        return { node: await this.scene("query-node", str("nodeId")) };
      case "node.find":
        return Json.value(await this.port.scene("findNodes", p));
      case "node.create":
        return this.createNode(p);
      case "node.delete": {
        const uuid = str("nodeId");
        await this.scene("remove-node", { uuid });
        const remaining = await this.port.scene("nodeExists", uuid);
        if (remaining) throw new CocosError("VERIFICATION_FAILED", "Deleted node still exists");
        return { deletedNodeId: uuid };
      }
      case "node.duplicate":
        return { nodeIds: await this.scene("duplicate-node", str("nodeId")) };
      case "node.reparent":
        await this.scene("set-parent", { uuids: [str("nodeId")], parent: str("parentId"), keepWorldTransform: (_a = p.keepWorldTransform) != null ? _a : true });
        return this.execute("node.query", p);
      case "node.set":
        return this.setProperties(str("nodeId"), Json.object(p.properties), false);
      case "node.reset":
        await this.scene("reset-node", { uuid: str("nodeId") });
        return this.execute("node.query", p);
      case "component.types":
        return { rows: await this.scene("query-components") };
      case "component.add": {
        const before = Json.value(await this.port.scene("componentIds", str("nodeId")));
        await this.scene("create-component", { uuid: str("nodeId"), component: str("type") });
        const after = await this.port.scene("componentIds", str("nodeId"));
        const added = after.filter((uuid) => !Array.isArray(before) || !before.includes(uuid));
        if (!added.length) throw new CocosError("VERIFICATION_FAILED", "No new component appeared");
        if (p.type === "cc.Label") {
          try {
            for (const componentId of added) await this.port.scene("ui.flush_label", { componentId });
          } catch (error) {
            throw new CocosError("OUTCOME_UNKNOWN", "Label was added but its layout could not be settled", { componentIds: added, cause: CocosError.from(error).message });
          }
        }
        return { componentIds: added, node: await this.scene("query-node", str("nodeId")) };
      }
      case "component.query":
        return { component: await this.scene("query-component", str("componentId")) };
      case "component.delete":
        await this.scene("remove-component", { uuid: str("componentId") });
        return { deletedComponentId: str("componentId") };
      case "component.set":
        return this.setProperties(str("componentId"), Json.object(p.properties), true);
      case "component.reset":
        await this.scene("reset-component", { uuid: str("componentId") });
        return this.execute("component.query", p);
      case "component.invoke":
        Json.safePath(str("method"));
        return this.scene("execute-component-method", { uuid: str("componentId"), name: str("method"), args: (_b = p.args) != null ? _b : [] });
      case "asset.query": {
        return new AssetQuery(this.port).execute(p);
      }
      case "asset.info":
        return { asset: await this.asset("query-asset-info", str("url")) };
      case "asset.meta":
        return { meta: await this.asset("query-asset-meta", str("url")) };
      case "asset.dependencies":
        return { rows: await this.asset("query-asset-dependencies", str("url")) };
      case "asset.users":
        return { rows: await this.asset("query-asset-users", str("url")) };
      case "asset.create":
        return { asset: await this.asset("create-asset", str("url"), p.content) };
      case "asset.save":
        return { asset: await this.asset("save-asset", str("url"), p.content) };
      case "asset.import":
        return { asset: await this.asset("import-asset", str("sourcePath"), str("targetUrl")) };
      case "asset.copy":
        return { asset: await this.asset("copy-asset", str("sourceUrl"), str("targetUrl")) };
      case "asset.move":
        return { asset: await this.asset("move-asset", str("sourceUrl"), str("targetUrl")) };
      case "asset.delete":
        await this.asset("delete-asset", str("url"));
        return { deletedUrl: str("url") };
      case "asset.refresh":
        await this.asset("refresh-asset", str("url"));
        return this.execute("asset.info", p);
      case "asset.reimport":
        await this.asset("reimport-asset", str("url"));
        return this.execute("asset.info", p);
      case "asset.set_meta": {
        const meta = Json.object(await this.asset("query-asset-meta", str("url")));
        meta.userData = { ...meta.userData && typeof meta.userData === "object" && !Array.isArray(meta.userData) ? meta.userData : {}, ...Json.object(p.userData) };
        await this.asset("save-asset-meta", str("url"), JSON.stringify(meta));
        await this.asset("reimport-asset", str("url"));
        return this.execute("asset.meta", p);
      }
      case "asset.resolve":
        return { uuid: await this.asset("query-uuid", str("reference")), url: await this.asset("query-url", str("reference")), path: await this.asset("query-path", str("reference")) };
      case "prefab.instantiate":
        return this.createNode({ assetUuid: str("uuid"), ...p.parentId ? { parentId: p.parentId } : {}, name: (_c = p.name) != null ? _c : "Prefab" });
      case "prefab.open": {
        const info = Json.object(await this.asset("query-asset-info", str("uuid")));
        if (info.type !== "cc.Prefab" || typeof info.uuid !== "string" || info.invalid === true || info.readonly === true) throw new CocosError("INVALID_ARGUMENT", "Expected an editable Prefab asset");
        await this.ensureSaved();
        await this.scene("open-scene", info.uuid);
        const result = Json.object(await this.execute("scene.query", {}));
        const current = await this.scene("query-current-scene"), mode = await this.scene("query-scene-mode");
        if (current !== info.uuid || mode !== "prefab") throw new CocosError("OUTCOME_UNKNOWN", "Editor did not confirm the requested prefab context", { assetUuid: info.uuid, currentAssetUuid: current, mode, actual: result });
        return { ...result, assetUuid: info.uuid, editing: "native-prefab", mode };
      }
      case "prefab.create": {
        const before = Json.object(await this.port.scene("subtreeIdentity", str("nodeId")));
        if (!before.parentId) throw new CocosError("INVALID_ARGUMENT", "The scene root cannot become a prefab");
        const assetUuid = await this.scene("create-prefab", str("nodeId"), str("url"));
        const rootId = Json.string(Json.value(await this.port.scene("childAt", before.parentId, before.index)), "prefab root");
        const after = Json.object(await this.port.scene("subtreeIdentity", rootId));
        const oldRows = before.rows;
        const newRows = after.rows;
        const expectedRootName = (0, import_path8.basename)(str("url"), ".prefab");
        if (!assetUuid || oldRows.length !== newRows.length || oldRows.some((row, index) => row.path !== newRows[index].path || row.name !== newRows[index].name && !(index === 0 && row.path === "" && newRows[index].name === expectedRootName))) {
          throw new CocosError("OUTCOME_UNKNOWN", "Prefab conversion changed subtree structure; query the scene before continuing", { assetUuid, rootId });
        }
        return { assetUuid, rootId, ...((_d = oldRows[0]) == null ? void 0 : _d.name) !== ((_e = newRows[0]) == null ? void 0 : _e.name) ? { previousRootName: oldRows[0].name, rootName: newRows[0].name } : {}, rows: oldRows.map((row, index) => ({ path: row.path, previousNodeId: row.nodeId, nodeId: newRows[index].nodeId })) };
      }
      case "prefab.apply":
        return new PrefabService(this.port).apply(str("nodeId"));
      case "prefab.change.plan":
        return new PrefabChanges(this.port).plan(str("nodeId"), str("action"));
      case "prefab.change.apply":
        return new PrefabChanges(this.port).execute(str("nodeId"), str("action"), str("expectedHash"), str("planHash"));
      case "prefab.diff":
        return new PrefabService(this.port).diff(str("nodeId"));
      case "prefab.revert":
        return this.scene("restore-prefab", str("nodeId"));
      case "prefab.unlink":
        return this.scene("unlink-prefab", str("nodeId"));
      case "view.query":
        return { is2D: await this.scene("query-is2D"), grid: await this.scene("query-is-grid-visible"), tool: await this.scene("query-gizmo-tool-name"), coordinate: await this.scene("query-gizmo-coordinate"), pivot: await this.scene("query-gizmo-pivot") };
      case "view.set": {
        const messages = { is2D: "change-is2D", grid: "set-grid-visible", tool: "change-gizmo-tool", coordinate: "change-gizmo-coordinate", pivot: "change-gizmo-pivot" };
        for (const [key, value] of Object.entries(p)) await this.scene(messages[key], value);
        return this.execute("view.query", {});
      }
      case "view.focus":
        await this.scene("focus-camera", p.nodeIds);
        return { focusedNodeIds: p.nodeIds };
      case "selection.query":
        return { rows: this.port.selection(String((_f = p.type) != null ? _f : "node")) };
      case "selection.set":
        return { rows: this.port.selection(str("type"), p.ids) };
      case "project.settings.get":
        return { settings: Json.value(await this.port.getSetting(str("name"), p.key)) };
      case "project.settings.set":
        await this.port.setSetting(str("name"), str("key"), p.value);
        return this.execute("project.settings.get", p);
      case "editor.messages":
        return { rows: Json.value(this.port.messages(p.package).filter((row) => !p.publicOnly || row.public)) };
      case "editor.message": {
        if (str("editorVersion") !== this.port.version) throw new CocosError("UNSUPPORTED_VERSION", "Message calls require the exact running editor version");
        const entry = this.port.messages(str("package")).find((row) => row.message === str("message"));
        if (!entry) throw new CocosError("UNSUPPORTED_CAPABILITY", "Message was not discovered in the running editor");
        return Json.value(await this.port.request(entry.package, entry.message, ...(_g = p.args) != null ? _g : []));
      }
      case "scene.script":
        return this.scene("execute-scene-script", { name: str("extension"), method: str("method"), args: (_h = p.args) != null ? _h : [] });
      case "scene.validate":
        return Json.value(await this.port.scene("validateScene"));
      default:
        throw new CocosError("UNSUPPORTED_CAPABILITY", `No Creator 3 adapter for ${id}`);
    }
  }
  async dispose() {
    var _a, _b;
    (_b = (_a = this.port).disposePreview) == null ? void 0 : _b.call(_a);
  }
};

// packages/editor-bridge/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_http = require("http");
var import_crypto8 = require("crypto");
var import_fs7 = require("fs");
var import_path9 = require("path");

// packages/native-adapters/src/stage-timings.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_perf_hooks = require("perf_hooks");
var StageTimings = class {
  constructor(now = () => import_perf_hooks.performance.now()) {
    this.now = now;
  }
  now;
  stages = /* @__PURE__ */ new Map();
  start(stage) {
    const start = this.now();
    let stopped = false;
    return () => {
      var _a;
      if (stopped) return;
      stopped = true;
      if (!this.stages.has(stage) && this.stages.size >= 32) return;
      const previous = (_a = this.stages.get(stage)) != null ? _a : { durationMs: 0, calls: 0 };
      this.stages.set(stage, { durationMs: previous.durationMs + Math.max(0, this.now() - start), calls: previous.calls + 1 });
    };
  }
  async measure(stage, task) {
    const stop = this.start(stage);
    try {
      return await task();
    } finally {
      stop();
    }
  }
  sync(stage, task) {
    const stop = this.start(stage);
    try {
      return task();
    } finally {
      stop();
    }
  }
  rows() {
    return [...this.stages].map(([stage, value]) => ({ stage, ...value }));
  }
};

// packages/capability-catalog/src/editor-control.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var EditorControlPolicy = class {
  static allows(id) {
    return ["bridge.identity", "bridge.operation", "console.query", "preview.refresh.status", "preview.refresh.cancel"].includes(id);
  }
};

// packages/editor-bridge/src/index.ts
var EditorBridge = class {
  constructor(adapter, projectPath, editorVersion) {
    this.adapter = adapter;
    this.projectPath = projectPath;
    this.editorVersion = editorVersion;
  }
  adapter;
  projectPath;
  editorVersion;
  server;
  descriptor;
  tail = Promise.resolve();
  events = [];
  sequence = 0;
  logEpoch = (0, import_crypto8.randomBytes)(16).toString("hex");
  catalog = new Map(new Operations().list().map((row) => [row.id, row]));
  outputs = new OutputContracts();
  safePath(path) {
    const root = (0, import_fs7.realpathSync)(this.projectPath);
    const target = (0, import_path9.resolve)(root, path);
    const contains = (value) => {
      const rel = (0, import_path9.relative)(root, value);
      return rel === "" || !(0, import_path9.isAbsolute)(rel) && rel !== ".." && !rel.startsWith(`..${import_path9.sep}`);
    };
    if (!contains(target)) throw new CocosError("PATH_OUTSIDE_PROJECT", "Path escapes project");
    let ancestor = target;
    while (!(0, import_fs7.existsSync)(ancestor)) ancestor = (0, import_path9.dirname)(ancestor);
    if (!contains((0, import_fs7.realpathSync)(ancestor))) throw new CocosError("PATH_OUTSIDE_PROJECT", "Symlink escapes project");
    return target;
  }
  assetUrl(url) {
    if (!url.startsWith("db://assets/") || url.includes("\\") || url.includes("\0")) throw new CocosError("INVALID_ARGUMENT", "Expected db://assets/ URL");
    const suffix = url.slice("db://assets/".length);
    if (suffix.split("/").some((part) => part === ".." || part === ".")) throw new CocosError("PATH_OUTSIDE_PROJECT", "Invalid asset path");
    this.safePath((0, import_path9.join)("assets", suffix));
  }
  validatePaths(request3) {
    const capability = this.catalog.get(request3.capabilityId);
    if (!capability) return;
    if (capability.effect === "asset" || request3.capabilityId === "scene.create") {
      for (const key of ["url", "sourceUrl", "targetUrl"]) {
        const value = request3.params[key];
        if (typeof value === "string") this.assetUrl(value);
      }
    }
    if (request3.params.sourcePath) this.safePath(Json.string(request3.params.sourcePath, "sourcePath"));
  }
  log(level, message, source = "editor-bridge") {
    this.events.push({ sequence: ++this.sequence, level, message, source, occurredAt: (/* @__PURE__ */ new Date()).toISOString() });
    if (this.events.length > 5e3) this.events.splice(0, this.events.length - 5e3);
  }
  panelState(cursor) {
    const descriptor = this.descriptor;
    let after = 0, reset = true;
    try {
      const parsed = JSON.parse(cursor != null ? cursor : "");
      if (parsed.epoch === this.logEpoch && Number.isInteger(parsed.sequence) && parsed.sequence >= 0 && parsed.sequence <= this.sequence) {
        after = parsed.sequence;
        reset = false;
      }
    } catch {
    }
    return {
      projectPath: (0, import_fs7.realpathSync)(this.projectPath),
      editorVersion: this.editorVersion,
      creatorMajor: this.adapter.major,
      instance: descriptor ? {
        protocolVersion: descriptor.protocolVersion,
        projectId: descriptor.projectId,
        projectPath: descriptor.projectPath,
        instanceId: descriptor.instanceId,
        editorVersion: descriptor.editorVersion,
        creatorMajor: descriptor.creatorMajor,
        endpoint: descriptor.endpoint,
        pid: descriptor.pid,
        startedAt: descriptor.startedAt
      } : null,
      supportedCapabilities: this.adapter.supportedCapabilities(),
      // 面板在有界日志快照上筛选和分页，不能提前截断而隐藏历史错误。
      logs: this.events.filter((row) => Number(row.sequence) > after).map((row) => ({ ...row })),
      logWindow: { epoch: this.logEpoch, cursor: this.sequence, droppedBefore: this.events.length ? Number(this.events[0].sequence) - 1 : 0, reset },
      runtimeConfigured: this.hasRuntimeConfiguration()
    };
  }
  async panelStateWithRuntime(cursor) {
    const state = this.panelState(cursor);
    const directory = this.safePath(".codex-work/cache/cocos-mcp");
    const rows = (0, import_fs7.existsSync)(directory) ? (0, import_fs7.readdirSync)(directory).filter((name) => /^runtime-\d+\.json$/.test(name)) : [];
    let connected = 0;
    const errors = [];
    for (const name of rows) {
      if (!this.runtimeProcessExists(name)) continue;
      try {
        const config = JSON.parse((0, import_fs7.readFileSync)(this.safePath((0, import_path9.join)(directory, name)), "utf8"));
        const projectId = (0, import_crypto8.createHash)("sha256").update((0, import_fs7.realpathSync)(this.projectPath)).digest("hex").slice(0, 24);
        if (config.projectId !== projectId || !/^http:\/\/127\.0\.0\.1:\d+$/.test(config.url) || typeof config.token !== "string") continue;
        const count = await new Promise((accept, reject) => {
          const request3 = (0, import_http.request)(`${config.url}/runtime/sessions`, { method: "POST", headers: { authorization: `Bearer ${config.token}`, "content-type": "application/json" } }, (response) => {
            let body = "";
            response.on("data", (chunk) => {
              body += chunk;
              if (body.length > 1024 * 1024) request3.destroy(new Error("Runtime response too large"));
            });
            response.on("error", reject);
            response.on("end", () => {
              try {
                const result = JSON.parse(body);
                if (response.statusCode !== 200 || !Array.isArray(result.rows)) throw new Error("Runtime session query failed");
                accept(result.rows.length);
              } catch (error) {
                reject(error);
              }
            });
          });
          request3.setTimeout(1500, () => request3.destroy(new Error("Runtime gateway timeout")));
          request3.on("error", reject);
          request3.end(JSON.stringify({ projectId }));
        });
        connected += count;
      } catch {
        if (this.runtimeProcessExists(name)) errors.push("\u8FD0\u884C\u65F6\u7F51\u5173\u67E5\u8BE2\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 MCP \u670D\u52A1\u7248\u672C\u53CA\u8FD0\u884C\u72B6\u6001");
      }
    }
    state.runtimeConfigured = this.hasRuntimeConfiguration();
    state.runtimeStatus = { connected, error: errors.length ? errors[0] : null };
    return state;
  }
  runtimeProcessExists(name) {
    const match = /^runtime-(\d+)\.json$/.exec(name);
    const pid = Number(match == null ? void 0 : match[1]);
    if (!Number.isSafeInteger(pid) || pid <= 0) return false;
    try {
      process.kill(pid, 0);
      return true;
    } catch (error) {
      return error.code !== "ESRCH";
    }
  }
  hasRuntimeConfiguration() {
    const directory = this.safePath(".codex-work/cache/cocos-mcp");
    if (!(0, import_fs7.existsSync)(directory)) return false;
    return (0, import_fs7.readdirSync)(directory).some((name) => {
      var _a;
      if (!this.runtimeProcessExists(name)) return false;
      try {
        const config = JSON.parse((0, import_fs7.readFileSync)(this.safePath((0, import_path9.join)(directory, name)), "utf8"));
        const projectId = (0, import_crypto8.createHash)("sha256").update((0, import_fs7.realpathSync)(this.projectPath)).digest("hex").slice(0, 24);
        return config.projectId === projectId && /^http:\/\/127\.0\.0\.1:\d+$/.test((_a = config.url) != null ? _a : "");
      } catch {
        return false;
      }
    });
  }
  ledgerPath(operationId) {
    const descriptor = this.descriptor;
    return this.safePath((0, import_path9.join)(
      ".codex-work",
      "cache",
      "cocos-mcp",
      "operations",
      descriptor.instanceId,
      `${(0, import_crypto8.createHash)("sha256").update(operationId).digest("hex")}.json`
    ));
  }
  writeLedger(path, entry) {
    (0, import_fs7.mkdirSync)((0, import_path9.dirname)(path), { recursive: true });
    const temporary = `${path}.writing`;
    (0, import_fs7.writeFileSync)(temporary, JSON.stringify(entry), { mode: 384 });
    (0, import_fs7.renameSync)(temporary, path);
  }
  async perform(request3) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const descriptor = this.descriptor;
    if (request3.protocolVersion !== 1 || request3.projectId !== descriptor.projectId || request3.instanceId !== descriptor.instanceId) throw new CocosError("UNAUTHORIZED", "Bridge instance does not match");
    if (request3.capabilityId === "bridge.identity") {
      let loginState = "unknown";
      if (request3.params.includeLoginState !== false) {
        try {
          loginState = (_c = await ((_b = (_a = this.adapter).loginState) == null ? void 0 : _b.call(_a))) != null ? _c : "unknown";
        } catch {
        }
      }
      return { result: {
        instanceId: descriptor.instanceId,
        projectId: descriptor.projectId,
        projectPath: descriptor.projectPath,
        creatorMajor: descriptor.creatorMajor,
        editorVersion: this.editorVersion,
        pid: descriptor.pid,
        loginState
      }, revision: "" };
    }
    if (request3.capabilityId === "bridge.describe") return { result: { supportedCapabilities: this.adapter.supportedCapabilities(), editorVersion: this.editorVersion }, revision: await this.adapter.revision() };
    if (request3.capabilityId === "bridge.operation") {
      const path = this.ledgerPath(Json.string(request3.params.operationId, "operationId"));
      if (!(0, import_fs7.existsSync)(path)) throw new CocosError("NOT_FOUND", "Operation record not found");
      return { result: JSON.parse((0, import_fs7.readFileSync)(path, "utf8")), revision: "" };
    }
    const capability = this.catalog.get(request3.capabilityId);
    if (!capability || !this.adapter.supportedCapabilities().includes(request3.capabilityId)) throw new CocosError("UNSUPPORTED_CAPABILITY", `Not supported by this editor: ${request3.capabilityId}`);
    this.validatePaths(request3);
    if (request3.capabilityId === "console.query" || ["preview.refresh.status", "preview.refresh.cancel", "preview.logs", "preview.network", "preview.websocket", "preview.diagnose", "preview.status"].includes(request3.capabilityId)) {
      if (request3.expectedRevision !== void 0) throw new CocosError("INVALID_ARGUMENT", "Preview diagnostics and refresh operations do not accept a scene revision");
      return { result: await this.adapter.execute(request3.capabilityId, request3.params), revision: "" };
    }
    const fingerprint = (0, import_crypto8.createHash)("sha256").update(Json.canonical({ capabilityId: request3.capabilityId, params: request3.params, expectedRevision: (_d = request3.expectedRevision) != null ? _d : null })).digest("hex");
    const ledger = this.ledgerPath(Json.string(request3.operationId, "operationId"));
    if ((0, import_fs7.existsSync)(ledger)) {
      const previous = JSON.parse((0, import_fs7.readFileSync)(ledger, "utf8"));
      if (previous.fingerprint !== fingerprint) throw new CocosError("OPERATION_CONFLICT", "operationId was used with different arguments");
      const reread = capability.effect === "read" && previous.status === "completed" && previous.resultRetention === "not-retained-read";
      if (!reread) {
        if (previous.status === "completed") return { result: (_e = previous.result) != null ? _e : null, revision: (_f = previous.revision) != null ? _f : "" };
        if (previous.status === "failed" || previous.status === "unknown") {
          const error = Json.object(previous.error);
          throw new CocosError(error.code, String(error.message), error.details);
        }
        throw new CocosError("OUTCOME_UNKNOWN", "This operation was interrupted; verify editor state before submitting a new operation");
      }
    }
    const previewIndependent = request3.capabilityId.startsWith("preview.");
    if (previewIndependent && request3.expectedRevision !== void 0) throw new CocosError("INVALID_ARGUMENT", "Preview operations use explicit content evidence, not scene revision");
    const timings = new StageTimings();
    const revision = previewIndependent ? "" : await timings.measure("revision-before", () => this.adapter.revision());
    if (request3.expectedRevision !== void 0 && request3.expectedRevision !== revision) throw new CocosError("STALE_REVISION", "Scene changed after it was read", { actualRevision: revision });
    timings.sync("ledger-intent", () => this.writeLedger(ledger, { fingerprint, status: "pending" }));
    let confirmedResult;
    try {
      let result;
      if (request3.capabilityId === "logs.query") {
        const cursor = Number((_g = request3.params.cursor) != null ? _g : 0);
        const rows = this.events.filter((event) => Number(event.sequence) > cursor && (!request3.params.level || request3.params.level === event.level)).slice(0, Number((_h = request3.params.limit) != null ? _h : 100));
        result = { rows, nextCursor: rows.length ? rows[rows.length - 1].sequence : cursor, droppedBefore: this.events.length ? Number(this.events[0].sequence) - 1 : 0 };
      } else result = await timings.measure("native-execution", () => this.adapter.execute(request3.capabilityId, request3.params));
      confirmedResult = result;
      timings.sync("output-validation", () => this.outputs.validate(request3.capabilityId, result));
      if (request3.capabilityId !== "logs.query") this.log("info", `${request3.capabilityId} completed`);
      const nextRevision = previewIndependent ? "" : await timings.measure("revision-after", () => this.adapter.revision());
      timings.sync("ledger-complete", () => this.writeLedger(ledger, capability.effect === "read" ? { fingerprint, status: "completed", resultRetention: "not-retained-read" } : { fingerprint, status: "completed", result, revision: nextRevision }));
      return { result, revision: nextRevision, timings: timings.rows() };
    } catch (error) {
      const original = CocosError.from(error, "EDITOR_ERROR");
      const failure = confirmedResult !== void 0 && capability.effect !== "read" ? new CocosError("OUTCOME_UNKNOWN", "Editor mutation completed but its verification or ledger failed; inspect the original operation", {
        operationId: request3.operationId,
        stage: "post-execution",
        sideEffectState: "acknowledged",
        confirmedResult,
        cause: Json.value(original.toJSON())
      }) : original;
      this.log("error", `${request3.capabilityId} failed (${failure.code})`);
      try {
        this.writeLedger(ledger, {
          fingerprint,
          status: failure.code === "OUTCOME_UNKNOWN" ? "unknown" : "failed",
          error: Json.value(failure.toJSON()),
          ...confirmedResult !== void 0 ? { result: confirmedResult } : {}
        });
      } catch {
        throw new CocosError(failure.code, failure.message, { ...Json.object((_i = failure.details) != null ? _i : {}), auditWarnings: ["AUDIT_WRITE_FAILED"] });
      }
      throw failure;
    }
  }
  authorized(request3) {
    var _a;
    if (request3.headers.origin) return false;
    const actual = Buffer.from((_a = request3.headers.authorization) != null ? _a : "");
    const expected = Buffer.from(`Bearer ${this.descriptor.token}`);
    return actual.length === expected.length && (0, import_crypto8.timingSafeEqual)(actual, expected);
  }
  async handle(request3, response) {
    const reply = (status, value) => {
      const timings = new StageTimings();
      const serialized = timings.sync("response-serialization", () => JSON.stringify(value));
      response.writeHead(status, {
        "content-type": "application/json",
        "cache-control": "no-store",
        "server-timing": `cocos-json;dur=${Number(timings.rows()[0].durationMs).toFixed(3)}`
      });
      response.end(serialized);
    };
    if (!this.authorized(request3)) {
      reply(403, { error: { code: "UNAUTHORIZED", message: "Bridge authentication failed" } });
      return;
    }
    if (request3.method !== "POST" || request3.url !== "/rpc") {
      reply(404, { error: { code: "NOT_FOUND", message: "Use POST /rpc" } });
      return;
    }
    const chunks = [];
    let size = 0;
    try {
      const body = await new Promise((accept, reject) => {
        request3.on("data", (chunk) => {
          size += chunk.length;
          if (size > 8 * 1024 * 1024) {
            reject(new CocosError("INVALID_ARGUMENT", "Request exceeds bridge body limit"));
            request3.destroy();
            return;
          }
          chunks.push(chunk);
        });
        request3.on("error", reject);
        request3.on("end", () => {
          try {
            accept(Json.object(JSON.parse(Buffer.concat(chunks).toString("utf8"))));
          } catch (error) {
            reject(error);
          }
        });
      });
      Json.object(body.params, "params");
      const control = EditorControlPolicy.allows(body.capabilityId);
      const task = control ? this.perform(body) : this.tail.then(() => this.perform(body));
      if (!control) this.tail = task.then(() => void 0, () => void 0);
      reply(200, await task);
    } catch (error) {
      if (!response.destroyed) reply(400, { error: CocosError.from(error, "EDITOR_ERROR").toJSON() });
    }
  }
  async start() {
    if (this.descriptor) return this.descriptor;
    const root = (0, import_fs7.realpathSync)(this.projectPath);
    const instanceId = (0, import_crypto8.randomBytes)(12).toString("hex");
    this.server = (0, import_http.createServer)((request3, response) => {
      void this.handle(request3, response);
    });
    const server = this.server;
    await new Promise((accept, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", () => {
        server.removeListener("error", reject);
        accept();
      });
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new CocosError("INTERNAL_ERROR", "Bridge did not bind a TCP port");
    this.descriptor = {
      protocolVersion: 1,
      projectId: (0, import_crypto8.createHash)("sha256").update(root).digest("hex").slice(0, 24),
      projectPath: root,
      instanceId,
      editorVersion: this.editorVersion,
      creatorMajor: this.adapter.major,
      endpoint: `http://127.0.0.1:${address.port}/rpc`,
      token: (0, import_crypto8.randomBytes)(32).toString("hex"),
      pid: process.pid,
      startedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const path = this.safePath((0, import_path9.join)(".codex-work/cache/cocos-mcp/instances", `${instanceId}.json`));
    (0, import_fs7.mkdirSync)((0, import_path9.dirname)(path), { recursive: true });
    (0, import_fs7.writeFileSync)(path, JSON.stringify(this.descriptor, null, 2), { mode: 384 });
    this.log("info", "Editor bridge started");
    return this.descriptor;
  }
  async stop() {
    if (this.server) await new Promise((accept, reject) => this.server.close((error) => error ? reject(error) : accept()));
    if (this.descriptor) {
      const path = this.safePath((0, import_path9.join)(".codex-work/cache/cocos-mcp/instances", `${this.descriptor.instanceId}.json`));
      if ((0, import_fs7.existsSync)(path)) (0, import_fs7.unlinkSync)(path);
    }
    await this.adapter.dispose();
    this.server = void 0;
    this.descriptor = void 0;
  }
};

// extensions/creator3/src/preview-compiler.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto20 = require("crypto");
var import_promises22 = require("fs/promises");
var import_node_url2 = require("url");

// extensions/shared/importer-artifacts.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_node_crypto19 = require("crypto");
var import_promises21 = require("fs/promises");
var import_node_path10 = require("path");
var ImporterArtifacts = class {
  constructor(project, major, info) {
    this.project = project;
    this.major = major;
    this.info = info;
  }
  project;
  major;
  info;
  async compile(batch, cancelled) {
    var _a, _b, _c, _d, _e;
    const paths = await ProjectPaths.open(this.project), artifacts = [], rows = [];
    for (const source of batch.rows) {
      if (cancelled()) return { status: "unknown", errors: [], reason: "Cancelled after native import" };
      const asset = Json.object(await this.info(String(source.url))), library = Json.object((_a = asset.library) != null ? _a : {});
      const descendants = Object.values(Json.object((_b = asset.subAssets) != null ? _b : {})).filter((value) => value && typeof value === "object" && !Array.isArray(value)).map((value) => Json.object(value));
      if (descendants.length > 100) throw new CocosError("RESOURCE_BUSY", "Importer subresource manifest exceeds limit");
      const outputs = [asset, ...descendants].flatMap((row) => {
        var _a2;
        return Object.values(Json.object((_a2 = row.library) != null ? _a2 : {})).filter((value) => typeof value === "string");
      });
      if (!Object.keys(library).length || asset.imported === false || asset.invalid === true || !outputs.length) return { status: "unknown", errors: [], rows, reason: "Native importer did not expose a completed output manifest", url: source.url };
      const imported = [];
      for (const output of [...new Set(outputs)].sort()) {
        if (cancelled()) return { status: "unknown", errors: [], reason: "Cancelled during native artifact inspection" };
        if (artifacts.length >= 512) throw new CocosError("RESOURCE_BUSY", "Importer artifact manifest exceeds 512 outputs");
        const path = await paths.resolve(output), metadata = await (0, import_promises21.stat)(path);
        if (!metadata.isFile() || metadata.size > 16 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Importer artifact is not a bounded regular file");
        const name = (0, import_node_path10.basename)(path), uuid = name.slice(0, name.lastIndexOf("."));
        if (!/^[a-f0-9-]{32,36}(?:@[a-zA-Z0-9_-]+)?$/.test(uuid)) return { status: "unknown", errors: [], reason: "Unsupported native importer output name" };
        const base = this.major === 3 ? "/assets/general" : "/assets/others";
        const scene = asset.importer === "scene" || asset.type === "scene";
        const url = scene && uuid === asset.uuid ? this.major === 3 ? `/scene/${name}` : "/preview-scene.json" : `${base}/${name.endsWith(".json") ? "import" : "native"}/${uuid.slice(0, 2)}/${name}`;
        const artifact = { url, kind: "resource", nativeFile: name, uuid, sha256: (0, import_node_crypto19.createHash)("sha256").update(await (0, import_promises21.readFile)(path)).digest("hex") };
        imported.push(artifact);
        artifacts.push(artifact);
      }
      rows.push({ url: source.url, uuid: (_c = asset.uuid) != null ? _c : null, importer: (_e = (_d = asset.importer) != null ? _d : asset.type) != null ? _e : null, sourceSha256: source.sha256, artifacts: imported, dependencyCoverage: "native-subresources", transitiveDependencies: "unknown" });
    }
    return { status: "completed", sourceRevision: batch.sourceRevision, errors: [], artifacts: [...new Map(artifacts.map((row) => [String(row.url), row])).values()], rows, signal: "asset-db-import-callback-and-native-library-manifest", evidence: "native-importer-output-bytes" };
  }
};

// extensions/creator3/src/preview-compiler.ts
var Creator3PreviewCompiler = class {
  constructor(project, version, ready, info) {
    this.project = project;
    this.version = version;
    this.ready = ready;
    this.info = info;
  }
  project;
  version;
  ready;
  info;
  async compile(batch, cancelled) {
    var _a;
    if (this.version !== "3.8.8") return { status: "unknown", errors: [], reason: "Programming completion adapter requires native Creator 3.8.8" };
    const paths = await ProjectPaths.open(this.project), sources = batch.rows, scripts = sources.filter((row) => /\.(js|ts)$/i.test(String(row.url))), resources = sources.filter((row) => !scripts.includes(row));
    const artifacts = [];
    if (scripts.length) {
      await this.ready();
      if (cancelled()) return { status: "unknown", errors: [], reason: "Cancelled after native programming completion" };
      const directory = "temp/programming/packer-driver/targets/preview", mapPath = await paths.resolve(`${directory}/import-map.json`);
      if ((await (0, import_promises22.stat)(mapPath)).size > 32 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Programming import map exceeds limit");
      const imports = Json.object(Json.object(JSON.parse(await (0, import_promises22.readFile)(mapPath, "utf8"))).imports);
      for (const row of scripts) {
        const sourcePath = await paths.asset(String(row.url)), chunk = imports[(0, import_node_url2.pathToFileURL)(sourcePath).href];
        if (typeof chunk !== "string" || !/^\.\/chunks\/[a-f0-9]+\/[a-f0-9]+\.js$/.test(chunk)) return { status: "unknown", errors: [], reason: "Native import map does not expose this script chunk", url: row.url };
        const chunkPath = await paths.resolve(`${directory}/${chunk}`), sourceMapPath = await paths.resolve(`${chunkPath}.map`);
        if ((await (0, import_promises22.stat)(sourceMapPath)).size > 32 * 1024 * 1024 || (await (0, import_promises22.stat)(chunkPath)).size > 16 * 1024 * 1024) throw new CocosError("RESOURCE_BUSY", "Programming artifact exceeds verification limit");
        const content = Json.object(JSON.parse(await (0, import_promises22.readFile)(sourceMapPath, "utf8"))).sourcesContent;
        if (!Array.isArray(content) || !content.some((source) => typeof source === "string" && (0, import_node_crypto20.createHash)("sha256").update(source).digest("hex") === row.sha256)) return { status: "unknown", errors: [], reason: "Programming source map does not match the requested revision", url: row.url };
        artifacts.push({ url: `/scripting/x/${chunk.slice(2)}`, sha256: (0, import_node_crypto20.createHash)("sha256").update(await (0, import_promises22.readFile)(chunkPath)).digest("hex"), kind: "script" });
      }
    }
    let imported;
    if (resources.length) {
      imported = await new ImporterArtifacts(this.project, 3, this.info).compile({ ...batch, rows: resources }, cancelled);
      if (imported.status !== "completed") return imported;
      artifacts.push(...imported.artifacts);
    }
    return { status: "completed", sourceRevision: batch.sourceRevision, errors: [], artifacts, rows: (_a = imported == null ? void 0 : imported.rows) != null ? _a : [], signal: "packer-driver-ready-and-native-importer", evidence: "source-map-and-native-output-bytes" };
  }
};

// extensions/creator3/src/main.ts
var CreatorHost = class {
  async loginState() {
    var _a;
    if (Editor.App.version !== "3.8.8" || typeof ((_a = Editor.User) == null ? void 0 : _a.isLoggedIn) !== "function") return "unknown";
    let timeout;
    try {
      const loggedIn = await Promise.race([Editor.User.isLoggedIn(), new Promise((resolve3) => {
        timeout = setTimeout(() => resolve3(void 0), 1e3);
      })]);
      return loggedIn === true ? "logged-in" : loggedIn === false ? "logged-out" : "unknown";
    } catch {
      return "unknown";
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }
  extensionState() {
    return Json.value(lifecycle.extensionState());
  }
  consoleReader;
  get consoleAvailable() {
    var _a;
    return Editor.App.version === "3.8.8" && typeof ((_a = Editor.Logger) == null ? void 0 : _a.query) === "function";
  }
  consoleQuery(params) {
    var _a;
    if (!this.consoleAvailable) throw new CocosError("UNSUPPORTED_CAPABILITY", "Creator console reading requires the verified 3.8.8 Logger API");
    (_a = this.consoleReader) != null ? _a : this.consoleReader = new CreatorConsole(Editor.Logger);
    return this.consoleReader.query(params);
  }
  managedPreview;
  preview(method, params) {
    var _a;
    (_a = this.managedPreview) != null ? _a : this.managedPreview = new ManagedPreview({ activate: () => {
      require("electron").app.focus({ steal: true });
    }, create: (options) => {
      const electron = require("electron");
      return new electron.BrowserWindow(options);
    } }, Editor.Project.path, 3, { projectPath: Editor.Project.path, importResource: (url) => this.request("asset-db", "refresh-asset", url), compile: (batch, cancelled) => new Creator3PreviewCompiler(Editor.Project.path, Editor.App.version, () => this.request("programming", "packer-driver/ready"), (url) => this.request("asset-db", "query-asset-info", url)).compile(batch, cancelled) });
    if (method === "connect-runtime") {
      const root = (0, import_path11.join)(Editor.Project.path, ".codex-work/cache/cocos-mcp");
      const projectId = (0, import_crypto9.createHash)("sha256").update((0, import_fs8.realpathSync)(Editor.Project.path)).digest("hex").slice(0, 24);
      const gateways = (0, import_fs8.readdirSync)(root).filter((name) => /^runtime-\d+\.json$/.test(name)).flatMap((name) => {
        try {
          process.kill(Number(name.slice(8, -5)), 0);
          const config = Json.object(JSON.parse((0, import_fs8.readFileSync)((0, import_path11.join)(root, name), "utf8")));
          if (config.projectId !== projectId || !/^http:\/\/127\.0\.0\.1:\d+$/.test(String(config.url)) || typeof config.token !== "string") return [];
          if (params.gatewayPort && new URL(String(config.url)).port !== String(params.gatewayPort)) return [];
          return [config];
        } catch {
          return [];
        }
      });
      if (gateways.length !== 1) throw new CocosError("CONTEXT_UNAVAILABLE", "Start one project runtime gateway, or select gatewayPort explicitly");
      return this.managedPreview.execute(method, { ...params, expectedSourceFingerprint: true ? "03a666a13dfd2d0772203fbc7426c9219ea9655079d5bfebfb021abcd29cbfda" : null, config: gateways[0], source: (0, import_fs8.readFileSync)((0, import_path11.join)(__dirname, "runtime.js"), "utf8") });
    }
    return this.managedPreview.execute(method, params);
  }
  disposePreview() {
    var _a;
    (_a = this.managedPreview) == null ? void 0 : _a.dispose();
  }
  shaderHost;
  shader(method, params) {
    var _a;
    if (method === "compile") return this.scene("shader.compileNative", { ...params, projectPath: Editor.Project.path, editorVersion: Editor.App.version });
    (_a = this.shaderHost) != null ? _a : this.shaderHost = new CreatorShaderHost(Editor.App.path, Editor.Project.path, Editor.App.version);
    return this.shaderHost.execute(method, params);
  }
  extensionName = "cocos-mcp-creator3";
  get version() {
    return Editor.App.version;
  }
  get projectPath() {
    return Editor.Project.path;
  }
  request(channel, message, ...args) {
    return Editor.Message.request(channel, message, ...args);
  }
  async scene(method, ...args) {
    return SceneResponse.unwrap(await this.request("scene", "execute-scene-script", { name: this.extensionName, method: "dispatch", args: [method, args] }));
  }
  selection(type, ids) {
    return new CreatorSelection(Editor.Selection).update(type, ids);
  }
  getSetting(name, key) {
    return Editor.Profile.getProject(name, key);
  }
  setSetting(name, key, value) {
    return Editor.Profile.setProject(name, key, value);
  }
  messages(packageName) {
    var _a, _b;
    const rows = [];
    for (const root of [(0, import_path11.join)(Editor.App.path, "builtin"), (0, import_path11.join)(Editor.Project.path, "extensions")]) {
      if (!(0, import_fs8.existsSync)(root)) continue;
      for (const entry of (0, import_fs8.readdirSync)(root)) {
        const path = (0, import_path11.join)(root, entry, "package.json");
        if (!(0, import_fs8.existsSync)(path)) continue;
        try {
          const manifest = JSON.parse((0, import_fs8.readFileSync)(path, "utf8"));
          if (!manifest.name || packageName && packageName !== manifest.name) continue;
          for (const [message, config] of Object.entries((_b = (_a = manifest.contributions) == null ? void 0 : _a.messages) != null ? _b : {})) rows.push({ package: manifest.name, message, public: config.public === true });
        } catch (error) {
          console.warn("[CocosMCP] Cannot inspect extension manifest", path, error);
        }
      }
    }
    return rows;
  }
};
var ExtensionLifecycle = class {
  navigation = { page: "overview", revision: 0 };
  openPage(page) {
    this.navigation = { page, revision: this.navigation.revision + 1 };
    if (page === "updates") this.checkExtension();
    void Editor.Panel.open("cocos-mcp-creator3");
  }
  checkExtension() {
    this.getUpdater().check(true);
  }
  updater;
  getUpdater() {
    var _a;
    return (_a = this.updater) != null ? _a : this.updater = new ExtensionUpdate(Editor.Project.path, (0, import_path10.dirname)(__dirname), 3);
  }
  extensionState() {
    return this.getUpdater().snapshot();
  }
  async updateExtension() {
    await this.getUpdater().update();
  }
  service;
  getService() {
    var _a;
    return (_a = this.service) != null ? _a : this.service = new McpService(Editor.Project.path, (0, import_path10.dirname)(__dirname));
  }
  async startService() {
    await this.start();
    await this.getService().start();
  }
  async stopService() {
    var _a;
    await ((_a = this.service) == null ? void 0 : _a.stop());
  }
  async configurePort(value) {
    await this.getService().configurePort(value);
  }
  async copyConnection(mode) {
    preferences.copy(await this.getService().configuration(mode));
  }
  async authorizeProject() {
    await this.getService().authorizeProject();
  }
  async revokeProject() {
    await this.getService().revokeProject();
  }
  async unload() {
    try {
      await this.stopService();
      await this.stop();
    } finally {
      preferences.restoreMenu();
    }
  }
  bridge;
  starting;
  getBridge() {
    if (!this.bridge) {
      const host = new CreatorHost();
      this.bridge = new EditorBridge(new Creator3Adapter(host), host.projectPath, host.version);
    }
    return this.bridge;
  }
  async panelState(cursor) {
    const state = await this.getBridge().panelStateWithRuntime(cursor);
    state.service = await this.getService().inspect();
    state.navigation = this.navigation;
    state.extension = this.getUpdater().snapshot();
    state.locale = preferences.read();
    preferences.applyMenu();
    return state;
  }
  async start() {
    this.getUpdater();
    if (this.starting) return this.starting;
    this.starting = this.initialize().finally(() => {
      this.starting = void 0;
    });
    return this.starting;
  }
  async initialize() {
    const descriptor = await this.getBridge().start();
    console.info(`[CocosMCP] Bridge ready: ${descriptor.instanceId}; project ${descriptor.projectId}`);
  }
  async stop() {
    var _a;
    await this.starting;
    await ((_a = this.bridge) == null ? void 0 : _a.stop());
    this.bridge = void 0;
  }
  async status() {
    await this.start();
    console.info("[CocosMCP] Connect the MCP server with --project", Editor.Project.path);
  }
};
var preferences = new PanelPreferences(() => Editor.Project.path, 3, Editor);
var lifecycle = new ExtensionLifecycle();
var methods = {
  setLanguage: (locale) => preferences.set(locale),
  copyLog: (text) => preferences.copy(text),
  updateExtension: () => lifecycle.updateExtension(),
  startService: () => lifecycle.startService(),
  stopService: () => lifecycle.stopService(),
  configurePort: (value) => lifecycle.configurePort(value),
  copyConnection: (mode) => lifecycle.copyConnection(mode),
  authorizeProject: () => lifecycle.authorizeProject(),
  revokeProject: () => lifecycle.revokeProject(),
  start: () => lifecycle.start(),
  stop: () => lifecycle.stop(),
  status: () => lifecycle.status(),
  panelState: (cursor) => lifecycle.panelState(cursor),
  // default 面板的 ID 为扩展包名，与模板中的 HTML 根元素 ID 无关。
  open: () => lifecycle.openPage("overview"),
  about: () => lifecycle.openPage("about"),
  checkUpdates: () => lifecycle.openPage("updates"),
  checkExtension: () => lifecycle.checkExtension()
};
var load = async () => {
  await lifecycle.start();
  preferences.applyMenu();
};
var unload = () => lifecycle.unload();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  load,
  methods,
  unload
});
//# sourceMappingURL=main.cjs.map

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
    function usePattern({ gen, it: { opts } }, pattern2) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern2, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern2}, ${u})`
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
        var length, i, keys2;
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
        keys2 = Object.keys(a);
        length = keys2.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys2[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys2[i];
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
        const definition2 = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition2.type.length === 0 ? (k) => addRule.call(this, k, definition2) : (k) => definition2.type.forEach((t) => addRule.call(this, k, definition2, t)));
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
    function addRule(keyword, definition2, dataType) {
      var _a;
      const post = definition2 === null || definition2 === void 0 ? void 0 : definition2.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition2)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition2,
          type: (0, dataType_1.getJSONTypes)(definition2.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition2.schemaType)
        }
      };
      if (definition2.before)
        addBeforeRule.call(this, ruleGroup, rule, definition2.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition2.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
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

// extensions/creator3/src/panel.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/shared/panel.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/shared/panel-view.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/capability-catalog/src/operations.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/capability-catalog/src/creator2-expansion.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// packages/capability-catalog/src/creator2-skeleton-mix.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

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

// packages/capability-catalog/src/creator2-skeleton-mix.ts
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
    const operations2 = { type: "array", minItems: 1, maxItems: 100, items: { oneOf: [
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
      inputSchema: Schema.object({ rootId: str, rows: operations2, ...action === "apply" ? { planHash: str } : {} }, ["rootId", "rows", ...action === "apply" ? ["planHash"] : []]),
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

// packages/animation-core/src/two-d.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv = __toESM(require_ajv(), 1);

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
        const keys2 = /* @__PURE__ */ new Set([...Object.keys(left), ...Object.keys(right)]);
        for (const key of [...keys2].sort()) visit(left[key], right[key], path ? `${path}/${key}` : key);
        return;
      }
      rows.push({ kind: "changed", path, before: left, after: right });
    };
    visit(before, after, "");
    if (rows.length >= maxRows) rows.push({ kind: "truncated", path: "", maxRows });
    return rows;
  }
};

// packages/animation-core/src/two-d.ts
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
    if (!new import_ajv.Ajv({ strict: true }).compile(_TwoDClipModel.schema)(value)) throw new CocosError("INVALID_ARGUMENT", "Invalid 2D clip document");
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

// packages/capability-catalog/src/two-d.ts
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

// packages/ui-core/src/index.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var import_ajv2 = __toESM(require_ajv(), 1);
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
  validate = new import_ajv2.Ajv({ strict: false, allErrors: true }).compile(_UiDocumentModel.schema);
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
    const document = value, rows = [], keys2 = /* @__PURE__ */ new Set();
    const visit = (node, parentKey, depth) => {
      var _a2, _b2;
      if (depth > 16 || rows.length >= 200) throw new CocosError("INVALID_ARGUMENT", "UI tree is limited to 200 nodes and 16 levels");
      if (keys2.has(node.key)) throw new CocosError("INVALID_ARGUMENT", `Duplicate UI key: ${node.key}`);
      keys2.add(node.key);
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
        if (!keys2.has(value2.nodeKey)) throw new CocosError("INVALID_ARGUMENT", `Unknown UI reference: ${value2.nodeKey}`);
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

// packages/capability-catalog/src/ui.ts
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

// extensions/shared/panel-capabilities-en.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var capabilityEnglish = {
  "preview.presets": "List landscape viewport presets without device simulation",
  "runtime.view.inspect": "Inspect public runtime view geometry and fingerprint",
  "runtime.view.configure": "Configure finite design resolution with conflict guard",
  "runtime.view.restore": "Restore owned view settings when their fingerprint still matches",
  "runtime.ui.select": "Resolve a unique node and native input candidates",
  "runtime.ui.check": "Check node existence, text, state, visibility and clipping",
  "runtime.ui.click": "Send real input to the bound preview and verify independent postconditions",
  "runtime.scene.load": "Load a scene UUID through the public director API",
  "runtime.lifecycle.snapshot": "Read owned handles, tasks, listeners, assets and frames",
  "preview.regression": "Repeat bounded preview operations and compare lifecycle and latency",
  "acceptance.plan": "Review a finite fixture or live acceptance recipe",
  "acceptance.run": "Run a reviewed recipe and save sanitized evidence and cleanup results",
  "acceptance.status": "Read the durable acceptance evidence package",
  "acceptance.cancel": "Cancel future recipe steps without replaying unknown writes",
  "fixture.plan": "Plan a synthetic UI subtree with denied business network access",
  "fixture.create": "Create a reviewed fixture and record native ownership",
  "fixture.status": "Inspect fixture scope, expiry, permissions and cleanup status",
  "fixture.cleanup": "Remove only unchanged owned fixture resources",
  "ui.owned_snapshot": "Record native subtree identity, parent position and properties",
  "ui.owned_remove": "Guard native subtree removal against changes and surviving references",
  "operation.audit.query": "Read sanitized operation metadata by a UTC half-open range",
  "ui.structure.plan": "Plan Creator 2 UI nodes, hierarchy, order and component changes",
  "ui.structure.apply": "Apply a guarded Creator 2 UI structure plan while preserving existing UUIDs",
  "editor.environment": "Inspect Creator 2 native interface names and engine version",
  "runtime.dragonbones.inspect": "Inspect Creator 2 DragonBones armature and animations",
  "runtime.dragonbones.play": "Play a named Creator 2 DragonBones animation",
  "path.plan": "Plan native spline samples and approximate constant speed",
  "path.sample": "Sample native splines in parent-local coordinates",
  "path.bake_clip": "Create a position animation clip from a sampled path",
  "runtime.probe.preview": "Preview a bounded page of existing probes in world coordinates without baking",
  "runtime.path.preview": "Transform a local path to world coordinates and draw a temporary overlay",
  "runtime.debug.draw": "Queue bounded world-space lines on an active debug renderer",
  "runtime.debug.shape": "Draw bounded rays, boxes, frustums and probe points",
  "runtime.skinning.plan": "Check batch engine compatibility and shared skeletons without activation",
  "runtime.postprocess.inspect": "Inspect the active camera pipeline and required post-process passes",
  "runtime.debug.inspect": "Inspect owned debug drawings and rendering errors",
  "runtime.debug.clear": "Remove only drawings belonging to the requested owner",
  "runtime.animation_graph.inspect": "Inspect graph variables, states, transitions and weights",
  "runtime.animation_graph.trace": "Observe graph state on actual rendered frames",
  "runtime.animation_graph.assert": "Observe whether a debug state identifier is reached within a frame budget",
  "runtime.animation_graph.set_parameter": "Set a typed graph parameter and read back its state",
  "probe.generate": "Generate bounded uniform probe positions; adaptive placement is unsupported",
  "runtime.character.inspect": "Inspect an active character controller and backend availability",
  "runtime.character.test_route": "Execute bounded character movements and observe resulting positions",
  "runtime.skinning.inspect": "Inspect existing skinned mesh batch configuration",
  "runtime.ik.inspect": "Inspect animation controller availability; graph authoring is not included",
  "ik.inspect": "Inspect a two-bone chain and native animation graph authoring availability",
  "ik.plan": "Plan a new independent two-bone IK graph with scene fingerprint protection",
  "ik.apply": "Create a new native IK graph asset without replacing or binding existing graphs",
  "ik.mask_create": "Create a new animation mask after checking bone paths",
  "editor.status": "Read editor instance, version and scene status",
  "scene.query": "Read current scene information and dirty state",
  "scene.snapshot": "Serialize a replayable snapshot of the current scene",
  "scene.diff": "Compare the current scene with a baseline snapshot",
  "scene.hierarchy": "Read scene hierarchy with pagination",
  "scene.open": "Open a scene; reject switching with unsaved changes",
  "scene.save": "Save the current scene and check its dirty state",
  "scene.save_copy": "Save a new scene asset while preserving the current scene and dirty state",
  "scene.create": "Create an empty scene through the editor",
  "scene.close": "Close a saved scene",
  "scene.undo": "Undo the last edit",
  "scene.redo": "Redo the last edit",
  "node.query": "Read node and component properties",
  "node.find": "Find all nodes matching a name or scene path",
  "node.create": "Create a node and return its actual information",
  "node.delete": "Delete a node",
  "node.duplicate": "Duplicate a node",
  "node.reparent": "Change the parent, optionally preserving world transforms",
  "node.set": "Edit node properties and verify by reading back",
  "node.reset": "Reset node transforms",
  "component.types": "List all registered project components",
  "component.add": "Add a built-in or project script component",
  "component.query": "Read property descriptors for a component instance",
  "component.delete": "Delete a component by instance ID",
  "component.set": "Edit component properties and references, then verify",
  "component.reset": "Reset a component instance",
  "component.invoke": "Invoke a component method; project scripts may have arbitrary side effects",
  "asset.query": "Query assets by type and path",
  "asset.info": "Read asset information",
  "asset.meta": "Read import settings",
  "asset.dependencies": "Query direct asset dependencies",
  "asset.users": "Query asset references",
  "asset.location": "Plan a resource path by reusing an existing type folder; does not write assets",
  "asset.organize.plan": "Preview asset organization; root only by default, skipping path-sensitive assets. Review string-based loading paths.",
  "asset.organize.apply": "Apply a reviewed plan with matching scope and planHash; move via AssetDB, verify UUIDs and return rollback paths",
  "asset.organize.recovery": "Read an organization journal and reconcile source/target UUIDs and hashes without replaying moves",
  "asset.create": "Create a text asset through AssetDB",
  "asset.save": "Save a text asset through AssetDB",
  "asset.import": "Import a file within the project",
  "asset.copy": "Copy an asset and its metadata",
  "asset.move": "Move an asset while preserving its UUID",
  "asset.delete": "Delete an asset",
  "asset.refresh": "Refresh an asset and wait for import",
  "asset.reimport": "Reimport an asset",
  "asset.set_meta": "Merge import settings and reimport",
  "asset.resolve": "Convert between asset URL, UUID and file path",
  "prefab.instantiate": "Instantiate a prefab in the scene",
  "prefab.create": "Save a node as a prefab asset",
  "prefab.open": "Open an editable prefab in native prefab mode after saving the current scene",
  "prefab.diff": "Compare Prefab source and instance by fileId and nested-instance identity without applying or restoring changes",
  "prefab.change.plan": "Plan a whole-instance Prefab apply or restore with source dependency and instance guards",
  "prefab.change.apply": "Execute a reviewed Prefab change with expectedHash and planHash guards and verify convergence",
  "prefab.apply": "Apply instance changes to the prefab asset",
  "prefab.revert": "Revert prefab instance changes",
  "prefab.unlink": "Unlink a prefab instance",
  "view.query": "Read scene view, gizmo and grid state",
  "view.set": "Change scene view, gizmo and grid settings",
  "view.focus": "Focus a node",
  "selection.query": "Read editor selection",
  "selection.set": "Set editor selection",
  "project.settings.get": "Read project settings without global user credentials",
  "project.settings.set": "Edit project settings",
  "editor.messages": "List editor messages discovered in this version",
  "editor.message": "Invoke a discovered editor message; internal APIs require an exact version match",
  "scene.script": "Call a scene script method of an installed extension",
  "preview.start": "Start embedded preview or a scoped external Chrome connector; report service, page and game readiness separately",
  "preview.refresh": "Import specified assets asynchronously; track compile and loaded-version evidence without inferring success",
  "preview.runtime.connect": "Connect the development runtime in the owned preview; compatible with shader.preview.connect",
  "preview.wait": "Wait for an observed scene or rendered frame within a bounded deadline; never resume implicitly",
  "preview.refresh.status": "Read refresh phases and evidence by operation ID",
  "preview.refresh.cancel": "Cancel remaining refresh stages; an in-flight native import may still finish",
  "preview.network": "Read bounded HTTP metadata and explicit CORS failures; request bodies and headers are omitted",
  "preview.websocket": "Read connection and frame metadata without capturing payloads",
  "preview.diagnose": "Correlate observed evidence without inferring application protocol compatibility",
  "preview.resize": "Resize MCP preview and capture a rendered frame; layout correctness needs review",
  "preview.input": "Send click or wheel input to the MCP preview and capture a frame; focuses the window, business results need verification",
  "preview.stop": "Stop project preview",
  "preview.logs": "Query session preview errors and network failures with pagination and capture-gap reporting",
  "preview.status": "Read MCP preview window status and recent rendering diagnostics",
  "preview.capture": "Capture a rendered preview frame without requiring a runtime gateway",
  "logs.query": "Query bridge events by level and page; use console.query for Creator console logs",
  "console.query": "Read Creator console errors and stacks, filtered by level, process, keyword and cursor",
  "ui.diff": "Compare existing UI properties while preserving UUIDs; report structural changes separately",
  "ui.apply": "Update UI properties in place using planHash; preserve conflicts without deleting and rebuilding",
  "ui.plan": "Plan declarative UI, checking version, references and name conflicts; return planHash",
  "ui.build": "Build the planned UI tree and return UUID mappings; compensate partial failures locally",
  "ui.inspect_layout": "Read actual UI corners and world bounds; detect zero size and parent overflow",
  "ui.validate_interaction": "Check UI event bindings and callbacks without invoking them",
  "texture.inspect": "Read texture source, import metadata, subassets and references",
  "texture.plan_import": "Preview texture sampling, mipmap and wrap-setting changes",
  "texture.apply_import": "Apply guarded texture import settings, back up and verify UUID after reimport",
  "texture.restore_import": "Restore import settings for the same asset using the current expectedHash",
  "animation.clip.read": "Read animation source and sourceHash for guarded editing",
  "animation.clip.patch": "Replace selected 3D vector keyframes by index, preserving other tracks and backing up",
  "animation.clip.restore": "Restore source for the same animation UUID using its current sourceHash",
  "animation.clip.create": "Serialize a native transform animation after validating times, tracks and target path",
  "animation.clip.inspect": "Read native animation tracks and channel keyframe times",
  "animation.clip.sample": "Evaluate native animation curves without applying to nodes or firing events",
  "runtime.physics2d.inspect": "Read 2D physics enablement and gravity without changing simulation",
  "runtime.physics3d.inspect": "Read 3D physics enablement and gravity without changing simulation",
  "runtime.physics2d.raycast": "Query 2D fixture hits along a world-space segment, with bounded sorted results",
  "runtime.physics3d.raycast": "Query 3D ray hits using a normalized direction and maximum distance",
  "runtime.webview.inspect": "Inspect WebView configuration without navigation or script execution",
  "runtime.graphics.inspect": "Read device capabilities and engine memory counters, not total driver VRAM",
  "runtime.graphics.formats": "Query supported gfx format usages without allocating GPU resources",
  "runtime.asset.load": "Load a local UUID asset and acquire a tool-owned reference without binding it",
  "runtime.asset.preload": "Download a local UUID asset without parsing or rendering it",
  "runtime.asset.inspect": "Read asset handles, reference counts and validity",
  "runtime.asset.release": "Return only the tool-owned reference without forcing shared cache eviction",
  "runtime.bundle.inspect": "Query loaded bundles without unloading game assets",
  "font.inspect": "Read font type, bitmap glyph coverage and scene Label references; dynamic font coverage may be unknown",
  "scene.validate": "Check missing components and invalid object references",
  "runtime.query": "Read running scene and engine state",
  "runtime.hierarchy": "Read runtime node tree with pagination",
  "runtime.types": "List accessible runtime engine types",
  "runtime.inspect": "Inspect object property descriptors and methods",
  "runtime.get": "Read object properties",
  "runtime.set": "Set runtime object properties",
  "runtime.invoke": "Call a public engine method",
  "runtime.create": "Construct an engine object and return a controlled handle",
  "runtime.release": "Release an object handle, optionally destroying an owned object",
  "runtime.subscribe": "Subscribe to object events",
  "runtime.unsubscribe": "Cancel an event subscription",
  "runtime.events": "Read subscribed events",
  "runtime.pause": "Pause the game loop",
  "runtime.resume": "Resume the game loop",
  "runtime.capture": "Capture the current game canvas",
  "runtime.statistics": "Read available runtime measurements",
  "shader.environment": "Query shader toolchain, exact version and verification boundaries",
  "shader.templates": "Read engine Effect templates and source",
  "shader.read": "Read Effect/Chunk source and content hash",
  "shader.create": "Create and import an Effect/Chunk through AssetDB",
  "shader.update": "Update and back up Effect/Chunk source using a hash guard",
  "shader.compile": "Compile a native Effect and return task and dependency fingerprints",
  "shader.diagnostics": "Query compile tasks and detect stale source",
  "shader.variants.plan": "Generate a bounded macro combination plan",
  "shader.restore": "Restore a resource backup only when current source matches",
  "shader.preview.connect": "Connect an open MCP preview to the project development gateway",
  "material.query": "Read persisted material and source hash",
  "material.create": "Create a material using engine initialization and serialization",
  "material.clone": "Copy a material asset to a new path",
  "material.update": "Validate material parameters on a copy before saving and backing up",
  "material.migrate": "Preview or apply an Effect change and parameter migration",
  "material.bindings": "Query scene material references and asset users",
  "material.assign": "Bind a component material slot with an old-reference guard and verify",
  "material.apply_runtime": "Save a user-selected runtime parameter snapshot",
  "runtime.material.inspect": "Read actual component material parameters and overrides",
  "runtime.material.update": "Create and atomically replace an independent material instance, preserving the original on failure",
  "runtime.material.reset": "Restore tool-modified material bindings and destroy owned instances",
  "runtime.material.compile": "Compile material passes and report actual engine results",
  "runtime.shader.variants.compile": "Validate bounded macro combinations using temporary instances",
  "runtime.shader.preview.open": "Create an isolated shader preview with its own camera and test geometry",
  "runtime.shader.preview.update": "Update preview instance parameters",
  "runtime.shader.preview.capture": "Read preview RenderTexture pixels and generate an image",
  "runtime.shader.preview.compare": "Compare this preview with a saved runtime baseline",
  "runtime.shader.preview.close": "Release preview-owned nodes, materials and textures",
  "runtime.shader.profile": "Sample whole-frame performance from real frame events; not GPU timing",
  "geometry.create": "Create parameterized beveled Cube/Cylinder/Sphere/Torus assets and scene nodes",
  "geometry.array": "Create bounded node-subtree arrays, preserving the source and verifying transforms",
  "rendering.query": "Read global rendering and camera postprocessing settings with AO and transmission boundaries",
  "rendering.configure": "Set Builtin camera Bloom/FXAA and shadow maps, then verify each setting",
  "rendering.planar_reflection": "Create a planar reflection probe bound to a camera and MeshRenderer; verify references"
};
for (const family of ["sorting", "postprocess", "probe"]) for (const action of ["inspect", "plan", "apply"]) capabilityEnglish[`${family}.${action}`] = `${family} ${action}: version-checked native settings with scene fingerprint protection`;
for (const action of ["state", "play", "pause", "resume", "stop", "seek", "blend"]) capabilityEnglish[`runtime.animation.${action}`] = `Native animation state and playback control: ${action}`;
for (const kind of ["audio", "video"]) for (const action of ["state", "play", "pause", "stop", "seek"]) capabilityEnglish[`runtime.${kind}.${action}`] = `Native ${kind} ${action}; returns current state, actual playback requires verification`;
for (const [kind, actions] of [["particle2d", ["state", "restart", "stop_emitting"]], ["particle3d", ["state", "play", "pause", "stop", "stop_emitting"]]]) for (const action of actions) capabilityEnglish[`runtime.${kind}.${action}`] = `Native ${kind} ${action}; rendered results require visual verification`;
for (const action of ["inspect", "validate", "dependencies"]) capabilityEnglish[`shader.${action}`] = `Read shader ${action} results and native diagnostics`;
for (const field of ["properties", "defines", "states"]) capabilityEnglish[`material.${field}`] = `Read material ${field} and pass data`;
Object.assign(capabilityEnglish, {
  "runtime.ui.inspect": "Inspect runtime UI geometry and persisted interaction configuration",
  "runtime.ui.assert": "Assert subtree active, text and button state without firing callbacks",
  "runtime.ui.hit_test": "Query native screen hit candidates without firing business callbacks",
  "runtime.render2d.audit": "Explain static 2D batching candidates; not actual submission batches",
  "runtime.label.audit": "Inspect label cache configuration and review policy",
  "runtime.atlas.inspect": "Read public dynamic-atlas state without changing packing",
  "runtime.physics2d.test_point": "Query colliders containing a world point",
  "runtime.physics2d.test_aabb": "Query colliders overlapping a world rectangle",
  "runtime.physics2d.trace_contacts": "Sample bounded contact events and remove owned listeners",
  "runtime.spine.inspect": "Read Spine tracks, animations and skins",
  "runtime.spine.play": "Play or queue an existing Spine animation",
  "runtime.spine.set_skin": "Set an existing Spine skin without replacing listeners",
  "runtime.spine.set_attachment": "Set an existing realtime Spine slot attachment",
  "runtime.spine.trace": "Sample native Spine tracks over actual frames",
  "runtime.tilemap.inspect": "Read tilemap layers and object groups",
  "runtime.tilemap.query_region": "Read bounded tile GIDs, flags and local positions",
  "runtime.tilemap.plan": "Plan guarded runtime tile edits; source TMX is unchanged",
  "runtime.tilemap.apply": "Apply guarded runtime tile edits with partial outcome evidence",
  "spriteframe.inspect": "Read SpriteFrame import metadata and asset users",
  "spriteframe.plan": "Plan nine-slice borders and atlas eligibility changes",
  "spriteframe.apply": "Back up, import and verify guarded SpriteFrame changes",
  "spriteframe.restore": "Restore import metadata with a current-content guard",
  "animation2d.plan": "Plan native SpriteFrame, opacity and color tracks",
  "animation2d.create": "Create and read back a guarded native 2D animation asset",
  "gameplay2d.templates": "List editable gameplay component templates and required bindings",
  "gameplay2d.plan": "Review generated component source before creating or attaching it",
  "gameplay2d.apply": "Create and attach a guarded gameplay component; configure bindings separately",
  "ui.template.plan": "Plan menu, inventory, HUD or dialogue UI",
  "ui.template.build": "Build the planned UI tree and return stable node mappings",
  "level2d.plan": "Plan seeded prefab grid placement",
  "level2d.apply": "Apply guarded prefab placement with partial failure evidence",
  "navigation2d.find_path": "Find a shortest four-neighbor grid route without physics claims",
  "preview.validate_viewports": "Capture actual frames at bounded viewports and restore window size",
  "runtime.control.inspect": "Inspect native Creator 2 control state",
  "runtime.control.scroll": "Scroll a Creator 2 ScrollView to an offset",
  "runtime.control.page": "Select a Creator 2 PageView page",
  "runtime.control.slider": "Set and read back Creator 2 slider progress",
  "runtime.control.toggle": "Set a Creator 2 toggle respecting group constraints",
  "runtime.control.text": "Set and read back Creator 2 EditBox text",
  "scene.references": "Audit serialized node, component and asset references in the current scene",
  "asset.references.audit": "Audit saved serialized asset references against Creator 2 AssetDB",
  "asset.references.scan": "Scan UUID fields, literal path candidates and unresolved dynamic loading without rewriting references",
  "runtime.rigidbody2d.inspect": "Inspect Creator 2 native rigid body state and units",
  "runtime.rigidbody2d.force": "Apply native Creator 2 force at a world point",
  "runtime.rigidbody2d.impulse": "Apply native Creator 2 impulse at a world point",
  "runtime.joint2d.inspect": "Inspect Creator 2 joint connections, native anchors and configuration",
  "runtime.collision2d.inspect": "Inspect Creator 2 collision matrix and cached world geometry",
  "runtime.collision2d.trace": "Trace bounded Creator 2 native collision callbacks without replacing business handlers",
  "runtime.resources.snapshot": "Snapshot Creator 2 cached assets, reference counts and bundle state",
  "runtime.resources.diff": "Compare Creator 2 resource residency against an explicit snapshot",
  "runtime.resources.trend": "Compare retained Creator 2 snapshots across scene transitions",
  "runtime.collision2d.trace_start": "Start a non-blocking Creator 2 collision trace",
  "runtime.task.poll": "Read Creator 2 runtime task progress and result",
  "runtime.task.stop": "Cancel a Creator 2 runtime task and await observer cleanup",
  "runtime.tween.plan": "Validate bounded Creator 2 tween composition and affected node properties",
  "runtime.tween.start": "Start an owned Creator 2 tween with cancellable frame sampling",
  "runtime.dragonbones.trace_start": "Trace native Creator 2 DragonBones animation events without replacing business listeners",
  "runtime.dragonbones.fade": "Blend Creator 2 DragonBones animations by native layer, group and fade-out rules",
  "runtime.physics2d.contact_trace_start": "Trace Creator 2 Box2D contact phases, world manifolds and normalized impulses",
  "runtime.dragonbones.details": "Inspect Creator 2 DragonBones bones, slots and animation states with cached-mode limits",
  "runtime.spine.trace_start": "Trace Creator 2 Spine animation events with explicit cache-mode boundaries",
  "runtime.spine.mix.inspect": "Inspect Creator 2 Spine animation pair mixing duration",
  "runtime.spine.mix.update": "Update Creator 2 Spine mixing with expected-state guard and native readback",
  "runtime.spine.details": "Inspect Creator 2 Spine bones, slots and tracks with explicit cached-mode limits",
  "runtime.camera.inspect": "Inspect Creator 2 camera projection and render target state",
  "runtime.camera.convert": "Convert Creator 2 camera coordinates with normalized 3D projection depth",
  "runtime.camera.culling": "Inspect Creator 2 camera group-mask matching without claiming visibility",
  "runtime.camera.sample_pixels": "Sample RGBA pixels with a temporary Creator 2 render texture and restore camera state"
});

// extensions/shared/panel-logs.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var logLevels = [
  { value: "all", label: "\u5168\u90E8\u7EA7\u522B" },
  { value: "error", label: "\u9519\u8BEF \xB7 Error" },
  { value: "warn", label: "\u8B66\u544A \xB7 Warning" },
  { value: "info", label: "\u4FE1\u606F \xB7 Info" }
];
var PanelLogs = class {
  level = "all";
  page = 1;
  pageSize = 20;
  history = null;
  filter(level) {
    if (!logLevels.some((row) => row.value === level)) return;
    this.level = level;
    this.latest();
  }
  resize(size) {
    if (![20, 50, 100].includes(size)) return;
    this.pageSize = size;
    this.latest();
  }
  latest() {
    this.page = 1;
    this.history = null;
  }
  go(page, logs) {
    if (!Number.isInteger(page)) return;
    const view = this.view(logs);
    this.page = Math.max(1, Math.min(page, view.pages));
    if (this.page === 1) this.history = null;
    else if (!this.history) this.history = logs.slice();
  }
  view(logs) {
    var _a;
    const source = (_a = this.history) != null ? _a : logs;
    const filtered = source.filter((row) => this.level === "all" || row.level === this.level).slice().reverse();
    const pages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    this.page = Math.max(1, Math.min(this.page, pages));
    const offset = (this.page - 1) * this.pageSize;
    return {
      rows: filtered.slice(offset, offset + this.pageSize),
      total: filtered.length,
      pages,
      start: filtered.length ? offset + 1 : 0,
      end: Math.min(offset + this.pageSize, filtered.length),
      history: this.history !== null
    };
  }
};

// extensions/shared/panel-view.ts
var operations = new Operations().list();
var copyIcon = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
var refreshIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 7a7 7 0 0 1 11.5-1L20 9M4 15l2.4 3A7 7 0 0 0 17.9 17"/></svg>';
function esc(value) {
  return String(value != null ? value : "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
var PanelView = class {
  static render(context) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
    const { major, state, i18n, logBrowser, dropdowns, copyFeedback, copying } = context;
    const descriptor = state.selected;
    const status = state.error ? i18n.text("\u8FDE\u63A5\u5F02\u5E38") : descriptor ? i18n.text("\u6865\u63A5\u5DF2\u542F\u52A8") : state.snapshot ? i18n.text("\u5DF2\u505C\u6B62") : i18n.text("\u6B63\u5728\u8FDE\u63A5");
    const statusClass = !state.error && descriptor ? "online" : "offline";
    const service = (_a = state.snapshot) == null ? void 0 : _a.service;
    const serviceLabel = (service == null ? void 0 : service.status) === "running" ? i18n.text("\u5DF2\u542F\u52A8") : (service == null ? void 0 : service.status) === "starting" ? i18n.text("\u542F\u52A8\u4E2D") : (service == null ? void 0 : service.status) === "error" ? i18n.text("\u542F\u52A8\u5931\u8D25") : i18n.text("\u672A\u542F\u52A8");
    const externallyManaged = (service == null ? void 0 : service.managed) === false && ["running", "starting"].includes(service.status);
    const serviceCard = i18n.html`<section class="panel-card service-card"><h2>MCP 服务 · ${serviceLabel}</h2>
      <p>${(service == null ? void 0 : service.shared) ? i18n.text("\u5171\u4EAB\u540E\u7AEF\u7531\u7EDF\u4E00\u5BA2\u6237\u7AEF\u81EA\u52A8\u53D1\u73B0\uFF0C\u591A\u4E2A\u4F1A\u8BDD\u53EF\u540C\u65F6\u8FDE\u63A5\u3002") : externallyManaged ? i18n.text((service == null ? void 0 : service.owner) === "client" ? "\u7531 AI \u5BA2\u6237\u7AEF\u7BA1\u7406\uFF0C\u8BF7\u5728\u5BA2\u6237\u7AEF\u542F\u505C\u670D\u52A1\u3002" : "\u7531\u5176\u4ED6\u7F16\u8F91\u5668\u5B9E\u4F8B\u7BA1\u7406\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u8FDE\u63A5\u3002") : i18n.text("\u542F\u52A8\u672C\u5DE5\u7A0B\u7684 MCP \u670D\u52A1\u53CA\u8FD0\u884C\u65F6\u7F51\u5173\u3002\u6E38\u620F\u9884\u89C8\u4ECD\u9700\u63A5\u5165\u8FD0\u884C\u65F6\u6865\u63A5\u3002")}</p>
      ${(service == null ? void 0 : service.endpoint) && !service.shared ? i18n.html`<p>连接地址：<code>${esc(service.endpoint)}</code></p><p>客户端使用 Bearer token，凭证文件：<code>.codex-work/cache/cocos-mcp/mcp-http-token</code></p>` : ""}
      ${(service == null ? void 0 : service.transport) === "stdio" ? i18n.html`<p>stdio 已连接，无需配置 MCP 端口。</p>` : ""}
      ${(service == null ? void 0 : service.shared) ? i18n.html`<p>已连接会话：${(_b = service.clientCount) != null ? _b : "\u2014"}${service.clientStatusError ? ` \xB7 ${esc(service.clientStatusError)}` : ""}</p>` : ""}
      <div class="connection-fields"><div class="connection-field"><span class="connection-label">接入方式</span>${dropdowns.markup("connection-mode", i18n.text("\u63A5\u5165\u65B9\u5F0F"), state.connectionMode, [{ value: "unified", label: i18n.text("\u7EDF\u4E00 stdio\uFF08\u591A\u5DE5\u7A0B\uFF09") }, { value: "stdio", label: i18n.text("\u672C\u673A stdio\uFF08\u5355\u5DE5\u7A0B\uFF09") }, { value: "http", label: "Streamable HTTP" }], state.busy || !state.snapshot)}</div><button class="secondary connection-action" data-action="copy-connection">${copyIcon}<span>${i18n.text(state.connectionMode === "unified" ? "\u590D\u5236 Codex \u914D\u7F6E" : state.connectionMode === "stdio" ? "\u590D\u5236 stdio \u914D\u7F6E" : "\u590D\u5236 HTTP \u914D\u7F6E")}</span></button></div>
      <p class="connection-help">${i18n.text(state.connectionMode === "unified" ? "\u5168\u5C40\u914D\u7F6E\u4E00\u6B21\uFF0CAI \u6309\u5F53\u524D\u4EFB\u52A1\u8FDE\u63A5\u5DE5\u7A0B\uFF0C\u65E0\u9700\u586B\u5199\u7AEF\u53E3\u3002" : "\u901A\u7528 JSON \u6A21\u677F\uFF0C\u8BF7\u6309\u5BA2\u6237\u7AEF\u914D\u7F6E\u683C\u5F0F\u8C03\u6574\u3002HTTP \u914D\u7F6E\u542B\u8BA4\u8BC1\u51ED\u8BC1\uFF0C\u8BF7\u59A5\u5584\u4FDD\u7BA1\u3002")}</p><p class="copy-feedback connection-feedback" role="status" aria-live="polite">${esc(copyFeedback)}</p>
      ${state.connectionMode === "unified" ? i18n.html`<p class="connection-help">${((_c = service == null ? void 0 : service.unifiedClient) == null ? void 0 : _c.installed) ? i18n.html`统一客户端版本：${esc(service.unifiedClient.version)} · ${esc(service.unifiedClient.buildId)}` : i18n.text("\u7EDF\u4E00\u5BA2\u6237\u7AEF\u672A\u5B89\u88C5\uFF0C\u8BF7\u8FD0\u884C pnpm client:install \u5E76\u66F4\u65B0\u6269\u5C55")}</p>` : state.connectionMode === "stdio" ? i18n.html`<p class="connection-help">由客户端启动离线 stdio 入口。切换前请停止已有 HTTP 服务，多个客户端可共享 HTTP 服务。</p>` : i18n.html`<div class="connection-fields"><label class="connection-field"><span class="connection-label">HTTP 端口</span><input data-key="service-port" data-service-port type="number" min="0" max="65535" step="1" value="${esc((_d = service == null ? void 0 : service.configuredPort) != null ? _d : 0)}" aria-label="HTTP 端口"></label><button class="secondary connection-action" data-action="service-port">保存端口</button></div><p class="connection-help">0 表示下次首次分配；启动成功后保存并复用端口。修改端口前需停止服务并更新客户端配置。</p>`}
      ${state.connectionMode === "unified" && ((_e = service == null ? void 0 : service.unifiedClient) == null ? void 0 : _e.installed) ? i18n.html`<div class="connection-fields"><p class="connection-help" role="status">${esc((_f = service.unifiedClient.authorizationError) != null ? _f : i18n.text(service.unifiedClient.authorization === "authorized" ? "\u5F53\u524D\u5DE5\u7A0B\u5DF2\u6388\u6743" : service.unifiedClient.authorization === "revoked" ? "\u5F53\u524D\u5DE5\u7A0B\u6388\u6743\u5DF2\u64A4\u9500" : "\u5F53\u524D\u5DE5\u7A0B\u672A\u6388\u6743"))}</p><button class="secondary connection-action" data-action="${service.unifiedClient.authorization === "authorized" ? "revoke-project" : "authorize-project"}">${i18n.text(service.unifiedClient.authorization === "authorized" ? "\u53D6\u6D88\u5DE5\u7A0B\u6388\u6743" : "\u6388\u6743\u5F53\u524D\u5DE5\u7A0B")}</button></div><p class="connection-help">安装插件时自动授权当前工程；手动安装 ZIP 可在此授权。</p>` : ""}
      ${(service == null ? void 0 : service.error) ? `<div class="notice error">${esc(service.error)}</div>` : ""}
      <div class="card-footer"><button class="primary" data-action="${(service == null ? void 0 : service.status) === "running" ? "service-restart" : "service-start"}">${(service == null ? void 0 : service.status) === "running" ? i18n.text("\u91CD\u542F") : i18n.text("\u542F\u52A8")} MCP 服务（HTTP）</button><button class="secondary" data-action="service-stop">停止 MCP 服务</button></div><p>由此处启动的服务随扩展卸载或编辑器退出而停止；关闭面板不停止服务。</p></section>`;
    const runtimeStatus = (_g = state.snapshot) == null ? void 0 : _g.runtimeStatus;
    const runtimeLabel = (runtimeStatus == null ? void 0 : runtimeStatus.error) ? i18n.text("\u67E5\u8BE2\u5F02\u5E38") : (runtimeStatus == null ? void 0 : runtimeStatus.connected) ? i18n.html`已连接 ${runtimeStatus.connected}` : state.runtime ? i18n.text("\u7B49\u5F85\u6E38\u620F\u8FDE\u63A5") : i18n.text("\u7F51\u5173\u672A\u542F\u52A8");
    const supportedCount = operations.filter((row) => state.supported.includes(row.id)).length;
    const filtered = operations.filter((row) => {
      var _a2;
      return !state.query || `${row.id} ${row.title} ${(_a2 = capabilityEnglish[row.id]) != null ? _a2 : ""} ${row.module}`.toLowerCase().includes(state.query.toLowerCase());
    });
    const capabilities = filtered.slice(0, 120).map((row) => {
      var _a2, _b2;
      const active = state.supported.includes(row.id);
      const stateText = row.implementation === "planned" ? i18n.text("\u89C4\u5212\u4E2D") : !((_a2 = row.supportedMajors) != null ? _a2 : row.versions).includes(major) ? i18n.text("\u7248\u672C\u4E0D\u652F\u6301") : row.context === "runtime" ? i18n.text("\u9700\u8FD0\u884C\u65F6") : active ? descriptor ? i18n.text("\u53EF\u7528") : i18n.text("\u9700\u542F\u52A8\u6865\u63A5") : i18n.text("\u672A\u66B4\u9732");
      const stateKind = row.implementation === "planned" ? "planned" : active ? "active" : "muted";
      return `<article class="capability-row"><div class="capability-mark ${stateKind}"></div><div class="capability-main"><strong>${esc(row.id)}</strong><span>${esc(i18n.locale === "en" ? (_b2 = capabilityEnglish[row.id]) != null ? _b2 : row.id : row.title)}</span></div><div class="capability-meta"><span class="tag">${esc(row.module)}</span><span class="tag">${esc(row.effect)}</span><span class="state ${stateKind}">${stateText}</span></div></article>`;
    }).join("");
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const clock = new Intl.DateTimeFormat(void 0, { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const logView = logBrowser.view(state.logs);
    const logs = logView.rows.map((log) => {
      const date = typeof log.occurredAt === "string" && /(?:Z|[+-]\d{2}:\d{2})$/.test(log.occurredAt) ? new Date(log.occurredAt) : null;
      const time = date && Number.isFinite(date.getTime()) ? clock.format(date) : "\u2014";
      return `<div class="log-row" data-key="log-${esc(log.sequence)}"><span class="log-sequence">#${esc(log.sequence)}</span><span class="log-level ${esc(log.level)}">${esc(log.level)}</span><span class="log-message" title="${esc(log.message)}">${esc(log.message)}</span>${log.level === "error" ? i18n.html`<button class="log-icon-button log-copy" data-copy-log="${esc(log.sequence)}" aria-label="复制错误日志" title="复制错误日志">${copyIcon}</button>` : ""}<time title="${esc(timeZone)}">${esc(time)}</time></div>`;
    }).join("");
    const instances = descriptor ? i18n.html`<div class="instance-row"><div class="instance-icon">C${descriptor.creatorMajor}</div><div class="instance-main"><strong>Creator ${esc(descriptor.editorVersion)}</strong><span>${esc(descriptor.instanceId.slice(0, 12))} · PID ${esc(descriptor.pid)}</span></div><span class="state online">桥接已启动</span></div>` : "";
    const extension = (_h = state.snapshot) == null ? void 0 : _h.extension;
    return i18n.html`<div class="shell">
      <header class="hero"><div class="brand"><div class="brand-icon">✦</div><div><div class="eyebrow">COCOSMCP CONTROL CENTER</div><h1>控制中心</h1><p>让编辑器状态、能力和运行时保持可见</p></div></div><div class="hero-actions"><div class="language-switch" role="group" aria-label="语言"><button data-locale="zh" class="language-option" aria-pressed="${i18n.locale === "zh"}" title="简体中文">中文</button><button data-locale="en" class="language-option" aria-pressed="${i18n.locale === "en"}" title="English">EN</button></div><span class="status-pill ${statusClass}"><i></i>${status}</span><button class="icon-button" data-action="refresh" aria-label="刷新">↻</button></div></header>
      <nav class="tabs" role="tablist"><button class="tab ${state.tab === "overview" ? "selected" : ""}" data-tab="overview">总览</button><button class="tab ${state.tab === "capabilities" ? "selected" : ""}" data-tab="capabilities">能力 <em>${supportedCount} / ${operations.length}</em></button><button class="tab ${state.tab === "logs" ? "selected" : ""}" data-tab="logs">桥接日志 ${state.logs.length ? `<em>${state.logs.length}</em>` : ""}</button><button class="tab ${state.tab === "runtime" ? "selected" : ""}" data-tab="runtime">运行时</button><button class="tab ${state.tab === "about" ? "selected" : ""}" data-tab="about">关于 CocosMCP</button><button class="tab ${state.tab === "updates" ? "selected" : ""}" data-tab="updates">检查更新</button></nav>
      <main class="content">${state.error ? `<div class="notice error"><span>!</span>${esc(state.error)}</div>` : ""}
        ${state.tab === "about" ? i18n.html`<section class="tab-page"><div class="page-heading"><h2>关于 CocosMCP</h2></div><section class="panel-card info-card"><h3>CocosMCP</h3><p>免费开源的 Cocos Creator MCP 插件</p><p>连接 AI 客户端、编辑器场景、资源和开发运行时。</p><dl><dt>当前版本</dt><dd>${esc((_i = extension == null ? void 0 : extension.version) != null ? _i : "\u2014")}</dd><dt>构建标识</dt><dd><code>${esc((extension == null ? void 0 : extension.buildId) || "\u2014")}</code></dd><dt>编辑器</dt><dd>Creator ${esc((_k = (_j = state.snapshot) == null ? void 0 : _j.editorVersion) != null ? _k : "\u2014")}</dd><dt>许可证</dt><dd>MIT</dd><dt>作者</dt><dd>iefoam@foxmail.com</dd><dt>项目主页</dt><dd>https://github.com/iEfoam/CocosMcp</dd><dt>问题反馈</dt><dd>https://github.com/iEfoam/CocosMcp/issues</dd></dl><button class="primary" data-tab="updates">检查更新</button></section></section>` : ""}
        ${state.tab === "updates" ? i18n.html`<section class="tab-page"><div class="page-heading"><h2>检查更新</h2></div><section class="panel-card info-card"><p>更新源：GitHub · iEfoam/CocosMcp</p><dl><dt>当前版本</dt><dd>${esc((_l = extension == null ? void 0 : extension.version) != null ? _l : "\u2014")}</dd><dt>已安装版本</dt><dd>${esc((_m = extension == null ? void 0 : extension.installedVersion) != null ? _m : "\u2014")}</dd><dt>最新版本</dt><dd>${esc((_n = extension == null ? void 0 : extension.latestVersion) != null ? _n : "\u2014")}</dd></dl><p role="status" aria-live="polite">${(extension == null ? void 0 : extension.checking) ? i18n.text("\u6B63\u5728\u68C0\u67E5 GitHub \u7248\u672C\u2026") : esc((_o = extension == null ? void 0 : extension.message) != null ? _o : (extension == null ? void 0 : extension.latestVersion) ? i18n.text("\u7248\u672C\u4FE1\u606F\u5DF2\u83B7\u53D6\uFF0C\u53EF\u6309\u9700\u5B89\u88C5\u6700\u65B0\u7248\u672C\u3002") : i18n.text("\u70B9\u51FB\u68C0\u67E5\u66F4\u65B0\u83B7\u53D6\u6700\u65B0\u7248\u672C\u3002"))}</p>${(extension == null ? void 0 : extension.reloadRequired) ? i18n.html`<p>新版已安装，请重载扩展后重新启动 MCP 服务。</p>` : ""}<div class="info-actions"><button class="primary" data-action="extension-check">${(extension == null ? void 0 : extension.checking) ? i18n.text("\u68C0\u67E5\u4E2D\u2026") : i18n.text("\u68C0\u67E5\u66F4\u65B0")}</button><button class="secondary" data-action="extension-update">${(extension == null ? void 0 : extension.updating) ? i18n.text("\u66F4\u65B0\u4E2D\u2026") : i18n.text("\u5B89\u88C5\u6700\u65B0\u7248\u672C")}</button></div><p>检查不会安装；安装前会备份当前扩展。</p></section></section>` : ""}
        ${state.tab === "overview" ? i18n.html`<section class="overview">${serviceCard}<div class="metric-grid"><div class="metric-card accent"><span>编辑器</span><strong>${state.snapshot ? `Creator ${esc(state.snapshot.editorVersion)}` : i18n.text("\u7B49\u5F85\u8FDE\u63A5")}</strong><small>${state.snapshot ? i18n.html`大版本 ${major}.x` : i18n.text("\u6B63\u5728\u8BFB\u53D6\u7F16\u8F91\u5668\u72B6\u6001")}</small></div><div class="metric-card"><span>工程</span><strong>${state.snapshot ? i18n.text("\u5DF2\u8BC6\u522B") : i18n.text("\u8BFB\u53D6\u4E2D")}</strong><small class="truncate" title="${esc((_p = state.snapshot) == null ? void 0 : _p.projectPath)}">${esc((_q = state.snapshot) == null ? void 0 : _q.projectPath)}</small></div><div class="metric-card"><span>实例</span><strong>${descriptor ? 1 : 0}</strong><small>当前窗口的桥接实例</small></div><div class="metric-card"><span>运行时</span><strong>${runtimeLabel}</strong><small>${(runtimeStatus == null ? void 0 : runtimeStatus.error) ? esc(runtimeStatus.error) : i18n.text("\u5F00\u53D1\u6E38\u620F\u4F1A\u8BDD\u72B6\u6001")}</small></div></div><div class="split-grid"><section class="panel-card"><div class="card-heading"><div><span class="section-kicker">EDITOR INSTANCES</span><h2>当前窗口实例</h2></div><button class="text-button" data-tab="capabilities">查看能力 →</button></div><div class="instance-list">${instances || i18n.text('<div class="empty"><span>\u25CC</span><strong>\u5C1A\u672A\u8FDE\u63A5 Creator</strong><small>\u5728\u6B64\u63A7\u5236\u4E2D\u5FC3\u542F\u52A8 CocosMCP \u6865\u63A5</small></div>')}</div><div class="card-footer"><button class="primary" data-action="${descriptor ? "restart" : "start"}">${descriptor ? i18n.text("\u91CD\u542F") : i18n.text("\u542F\u52A8")}桥接</button><button class="secondary" data-action="stop">停止桥接</button></div></section><section class="panel-card insight"><div class="section-kicker">QUICK INSIGHT</div><h2>连接范围</h2><p>桥接已启动仅表示当前编辑器监听就绪。此面板尚未监测 MCP 客户端连接；游戏连接请查看运行时状态。</p><div class="check-list"><span><i>✓</i>路径限制在工程内</span><span><i>✓</i>操作支持幂等重试</span><span><i>✓</i>运行时默认开发模式</span></div></section></div></section>` : ""}
        ${state.tab === "capabilities" ? i18n.html`<section class="tab-page"><div class="page-heading"><div><span class="section-kicker">CAPABILITY CATALOG</span><h2>能力目录</h2><p>当前适配器支持 ${supportedCount} 项 / 注册目录 ${operations.length} 项；支持不代表已通过实机验证</p></div><div class="search"><span>⌕</span><input data-search placeholder="搜索能力、模块或描述" value="${esc(state.query)}" aria-label="搜索能力" /></div></div><div class="capability-list">${capabilities || i18n.text('<div class="empty"><span>\u2315</span><strong>\u6CA1\u6709\u5339\u914D\u7684\u80FD\u529B</strong><small>\u5C1D\u8BD5\u641C\u7D22 scene\u3001asset \u6216 runtime</small></div>')}</div>${filtered.length > 120 ? i18n.html`<div class="list-hint">仅显示前 120 项，请缩小搜索范围</div>` : ""}</section>` : ""}
        ${state.tab === "logs" ? i18n.html`<section class="tab-page logs-page"><div class="page-heading log-header"><div class="log-heading-main"><h2>桥接日志</h2><div class="log-heading-actions"><div class="log-filter">${dropdowns.markup("log-level", i18n.text("\u65E5\u5FD7\u7EA7\u522B"), logBrowser.level, logLevels.map((row) => ({ value: row.value, label: i18n.text(row.label), tone: row.value })), state.busy)}</div><span class="log-action-divider" aria-hidden="true"></span><button class="log-icon-button" data-copy-log="all" title="复制全部错误" aria-label="复制全部错误" ${copying || !state.logs.some((log) => log.level === "error") ? "disabled" : ""}>${copyIcon}</button><button class="log-icon-button" data-action="refresh" title="刷新日志" aria-label="刷新日志">${refreshIcon}</button></div></div><div class="log-heading-foot"><p>保留最近 5,000 条桥接事件；不包含 Creator 控制台日志</p><span class="log-update-state"><i class="${logView.history ? "paused" : ""}" aria-hidden="true"></i>${logView.history ? i18n.text("\u5386\u53F2\u5FEB\u7167 \xB7 \u7FFB\u9875\u65F6\u4FDD\u6301\u7A33\u5B9A") : i18n.text("\u5B9E\u65F6\u66F4\u65B0 \xB7 \u6BCF 5 \u79D2")}${logView.history ? i18n.text('<button class="text-button" data-log-page="1">\u8FD4\u56DE\u6700\u65B0</button>') : ""}</span></div><div class="copy-feedback" role="status">${esc(copyFeedback)}</div></div>
          <div class="log-list" aria-label="桥接日志列表">${logs || `<div class="empty"><span>\u25CC</span><strong>${logBrowser.level === "all" ? i18n.text("\u6682\u65E0\u65E5\u5FD7") : i18n.text("\u6682\u65E0\u8BE5\u7EA7\u522B\u65E5\u5FD7")}</strong><small>${logBrowser.level === "all" ? i18n.text("\u542F\u52A8\u6865\u63A5\u540E\u4F1A\u663E\u793A\u8FDE\u63A5\u548C\u64CD\u4F5C\u4E8B\u4EF6") : i18n.text("\u53EF\u4EE5\u5207\u6362\u7EA7\u522B\u67E5\u770B\u5176\u4ED6\u6865\u63A5\u4E8B\u4EF6")}</small></div>`}</div>
          <div class="log-pagination"><span class="log-range" role="status">${logView.start}–${logView.end} / 共 ${logView.total} 条</span><div class="log-page-controls"><div class="page-size"><span>每页</span>${dropdowns.markup("log-size", i18n.text("\u6BCF\u9875\u65E5\u5FD7\u6761\u6570"), String(logBrowser.pageSize), [20, 50, 100].map((size) => ({ value: String(size), label: i18n.html`${size} 条` })), state.busy)}</div><nav class="page-navigation" aria-label="日志分页"><button class="page-button" data-log-page="${logBrowser.page - 1}" aria-label="上一页" ${logBrowser.page === 1 ? "disabled" : ""}>‹</button><span class="page-position" aria-label="第 ${logBrowser.page} 页，共 ${logView.pages} 页"><strong>${logBrowser.page}</strong><span>/ ${logView.pages}</span></span><button class="page-button" data-log-page="${logBrowser.page + 1}" aria-label="下一页" ${logBrowser.page === logView.pages ? "disabled" : ""}>›</button></nav></div></div></section>` : ""}
        ${state.tab === "runtime" ? i18n.html`<section class="tab-page runtime-page">${serviceCard}<div class="page-heading"><div><span class="section-kicker">DEVELOPMENT RUNTIME</span><h2>运行时状态</h2><p>开发预览连接和调试能力</p></div><span class="status-pill ${state.runtime ? "online" : "offline"}"><i></i>${runtimeLabel}</span></div><div class="runtime-card"><div class="runtime-orb ${state.runtime ? "active" : ""}"><span>◎</span></div><div><h3>${runtimeLabel}</h3><p>${(runtimeStatus == null ? void 0 : runtimeStatus.error) ? esc(runtimeStatus.error) : (runtimeStatus == null ? void 0 : runtimeStatus.connected) ? i18n.text("\u5DF2\u4ECE\u5F00\u53D1\u7F51\u5173\u8BFB\u53D6\u6E38\u620F\u4F1A\u8BDD\uFF0C\u8D85\u8FC7 30 \u79D2\u6CA1\u6709\u5FC3\u8DF3\u7684\u4F1A\u8BDD\u4E0D\u8BA1\u5165\u8FDE\u63A5\u6570\u3002") : i18n.text("\u542F\u52A8 MCP \u670D\u52A1\u5E76\u5728\u5F00\u53D1\u9884\u89C8\u4E2D\u63A5\u5165\u8FD0\u884C\u65F6\u6865\u63A5\u3002")}</p></div></div><div class="runtime-features"><span>对象检查</span><span>属性读写</span><span>事件订阅</span><span>截图</span><span>性能指标</span></div></section>` : ""}
      </main><footer class="footer"><span>CocosMCP ${esc((_t = (_s = (_r = state.snapshot) == null ? void 0 : _r.extension) == null ? void 0 : _s.version) != null ? _t : i18n.text("\u8BFB\u53D6\u4E2D"))} <code>${esc((_v = (_u = state.snapshot) == null ? void 0 : _u.extension) == null ? void 0 : _v.buildId)}</code> <button class="text-button" data-action="extension-update">${((_x = (_w = state.snapshot) == null ? void 0 : _w.extension) == null ? void 0 : _x.updating) ? i18n.text("\u66F4\u65B0\u4E2D\u2026") : i18n.text("\u66F4\u65B0\u7248\u672C")}</button><small style="display:block">${((_z = (_y = state.snapshot) == null ? void 0 : _y.extension) == null ? void 0 : _z.reloadRequired) ? i18n.html`已安装 ${esc(state.snapshot.extension.installedVersion)} · ${esc(state.snapshot.extension.installedBuildId)}，待重载。` : ""}${esc((_G = (_B = (_A = state.snapshot) == null ? void 0 : _A.extension) == null ? void 0 : _B.message) != null ? _G : ((_D = (_C = state.snapshot) == null ? void 0 : _C.extension) == null ? void 0 : _D.latestVersion) ? i18n.html`GitHub 最新：${state.snapshot.extension.latestVersion}` : ((_F = (_E = state.snapshot) == null ? void 0 : _E.extension) == null ? void 0 : _F.checking) ? i18n.text("\u6B63\u5728\u68C0\u67E5 GitHub \u7248\u672C\u2026") : i18n.text("\u66F4\u65B0\u6E90\uFF1AGitHub \xB7 iEfoam/CocosMcp"))}</small></span><span>日志时区：${esc(timeZone)}</span></footer>
    </div>`;
  }
};

// extensions/shared/panel-style.ts
init_define_COCOS_VERIFICATION_EVIDENCE();

// extensions/shared/panel-dropdown.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PanelDropdown = class _PanelDropdown {
  constructor(root, dom, changed, closed) {
    this.root = root;
    this.dom = dom;
    this.changed = changed;
    this.closed = closed;
    var _a, _b;
    root.ownerDocument.addEventListener("mousedown", this.outside, true);
    root.ownerDocument.addEventListener("click", this.outside, true);
    root.addEventListener("scroll", this.reposition, true);
    (_a = root.ownerDocument.defaultView) == null ? void 0 : _a.addEventListener("resize", this.reposition);
    (_b = root.ownerDocument.defaultView) == null ? void 0 : _b.addEventListener("blur", this.lostFocus);
  }
  root;
  dom;
  changed;
  closed;
  static sequence = 0;
  prefix = `cocos-dropdown-${++_PanelDropdown.sequence}`;
  current;
  search = "";
  searchedAt = 0;
  disposed = false;
  outside = (event) => {
    const current = this.current;
    if (!current) return;
    const path = event.composedPath();
    if (!path.includes(current.trigger) && !path.includes(current.menu)) this.close(false);
  };
  reposition = () => {
    if (this.current) this.position(this.current);
  };
  lostFocus = () => {
    this.close(false);
  };
  get expanded() {
    return Boolean(this.current);
  }
  escape(value) {
    return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }
  markup(id, label, value, rows, disabled = false) {
    var _a, _b;
    const identity = this.escape(`${this.prefix}-${id}`), selected = (_a = rows.find((row) => row.value === value)) != null ? _a : rows[0];
    return `<div class="dropdown" data-key="dropdown-${this.escape(id)}" data-dropdown="${this.escape(id)}"><button type="button" class="dropdown-trigger" data-dropdown-trigger="${this.escape(id)}" data-value="${this.escape(value)}" role="combobox" aria-label="${this.escape(label)}" aria-haspopup="listbox" aria-expanded="false" aria-controls="${identity}" ${disabled ? "disabled" : ""}>
      ${(selected == null ? void 0 : selected.tone) ? `<i class="dropdown-dot ${this.escape(selected.tone)}" aria-hidden="true"></i>` : ""}<span class="dropdown-label">${this.escape((_b = selected == null ? void 0 : selected.label) != null ? _b : "")}</span><svg class="dropdown-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>
      <div id="${identity}" class="dropdown-popup" data-dropdown-popup="${this.escape(id)}" role="listbox" aria-label="${this.escape(label)}" hidden>${rows.map((row, index) => `<button type="button" class="dropdown-option" id="${identity}-${index}" role="option" tabindex="-1" aria-selected="${row.value === value}" data-dropdown-value="${this.escape(row.value)}">${row.tone ? `<i class="dropdown-dot ${this.escape(row.tone)}" aria-hidden="true"></i>` : ""}<span class="dropdown-label">${this.escape(row.label)}</span><span class="dropdown-check" aria-hidden="true">${row.value === value ? "\u2713" : ""}</span></button>`).join("")}</div></div>`;
  }
  bind() {
    this.root.querySelectorAll("[data-dropdown-trigger]").forEach((trigger) => {
      this.dom.on(trigger, "click", () => {
        var _a;
        if (((_a = this.current) == null ? void 0 : _a.trigger) === trigger) this.close(true);
        else this.open(trigger);
      });
      this.dom.on(trigger, "keydown", (event) => this.key(event, trigger));
    });
  }
  open(trigger) {
    if (trigger.disabled || this.disposed) return;
    if (this.current) this.close(false);
    const home = trigger.parentElement, menu = home.querySelector("[data-dropdown-popup]");
    if (!menu) return;
    const rows = Array.from(menu.querySelectorAll("[data-dropdown-value]"));
    if (!rows.length) return;
    const index = Math.max(0, rows.findIndex((row) => row.dataset.dropdownValue === trigger.dataset.value));
    const current = { trigger, menu, home, rows, index };
    this.current = current;
    this.search = "";
    this.root.appendChild(menu);
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    trigger.focus();
    rows.forEach((row, index2) => {
      this.dom.on(row, "mousedown", (event) => event.preventDefault());
      this.dom.on(row, "click", () => this.choose(index2));
    });
    this.position(current);
    this.highlight();
  }
  position(current) {
    const bounds = this.root.getBoundingClientRect(), anchor = current.trigger.getBoundingClientRect(), view = this.root.ownerDocument.defaultView;
    const leftEdge = Math.max(0, bounds.left) + 8, rightEdge = Math.min((view == null ? void 0 : view.innerWidth) || bounds.right, bounds.right) - 8;
    const topEdge = Math.max(0, bounds.top) + 8, bottomEdge = Math.min((view == null ? void 0 : view.innerHeight) || bounds.bottom, bounds.bottom) - 8;
    if (anchor.bottom <= topEdge || anchor.top >= bottomEdge) {
      this.close(false);
      return;
    }
    const below = Math.max(0, bottomEdge - anchor.bottom - 6), above = Math.max(0, anchor.top - topEdge - 6);
    const desired = Math.min(240, current.rows.length * 34 + 10), upward = below < desired && above > below;
    const height = Math.min(desired, upward ? above : below), width = Math.max(0, Math.min(Math.max(anchor.width, 180), rightEdge - leftEdge));
    current.menu.style.width = `${width}px`;
    current.menu.style.maxHeight = `${height}px`;
    current.menu.style.left = `${Math.max(leftEdge, Math.min(anchor.left, rightEdge - width))}px`;
    current.menu.style.top = `${upward ? anchor.top - height - 6 : anchor.bottom + 6}px`;
  }
  highlight() {
    const current = this.current;
    if (!current) return;
    current.rows.forEach((row2, index) => row2.classList.toggle("highlighted", index === current.index));
    const row = current.rows[current.index];
    if (!row) return;
    current.trigger.setAttribute("aria-activedescendant", row.id);
    if (row.offsetTop < current.menu.scrollTop) current.menu.scrollTop = row.offsetTop;
    else if (row.offsetTop + row.offsetHeight > current.menu.scrollTop + current.menu.clientHeight) current.menu.scrollTop = row.offsetTop + row.offsetHeight - current.menu.clientHeight;
  }
  choose(index) {
    const current = this.current, row = current == null ? void 0 : current.rows[index];
    if (!current || !row || current.trigger.disabled) return;
    const id = current.trigger.dataset.dropdownTrigger, value = row.dataset.dropdownValue;
    this.close(true, false);
    this.changed(id, value);
  }
  key(event, trigger) {
    var _a, _b;
    if (trigger.disabled) return;
    const key = event.key;
    if (key === "Tab") {
      this.close(false);
      return;
    }
    if (key === "Escape") {
      if (this.current) {
        event.preventDefault();
        event.stopPropagation();
        this.close(true);
      }
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      if (((_a = this.current) == null ? void 0 : _a.trigger) !== trigger) {
        this.open(trigger);
        if (key === "Home" || key === "End") this.key(event, trigger);
        return;
      }
      const current = this.current;
      if (key === "Enter" || key === " ") {
        this.choose(current.index);
        return;
      }
      current.index = key === "Home" ? 0 : key === "End" ? current.rows.length - 1 : (current.index + (key === "ArrowUp" ? -1 : 1) + current.rows.length) % current.rows.length;
      this.highlight();
    } else if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      if (((_b = this.current) == null ? void 0 : _b.trigger) !== trigger) this.open(trigger);
      const current = this.current;
      if (!current) return;
      const now = Date.now();
      this.search = (now - this.searchedAt < 700 ? this.search : "") + key.toLowerCase();
      this.searchedAt = now;
      const index = current.rows.findIndex((row) => {
        var _a2, _b2;
        return (_b2 = (_a2 = row.querySelector(".dropdown-label")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b2.trim().toLowerCase().startsWith(this.search);
      });
      if (index >= 0) {
        current.index = index;
        this.highlight();
      }
    }
  }
  close(focus = false, notify = true) {
    const current = this.current;
    if (!current) return;
    this.current = void 0;
    current.menu.hidden = true;
    current.home.appendChild(current.menu);
    current.trigger.setAttribute("aria-expanded", "false");
    current.trigger.removeAttribute("aria-activedescendant");
    if (focus) current.trigger.focus();
    if (notify && !this.disposed) this.closed();
  }
  dispose() {
    var _a, _b;
    this.disposed = true;
    this.close(false, false);
    this.root.ownerDocument.removeEventListener("mousedown", this.outside, true);
    this.root.ownerDocument.removeEventListener("click", this.outside, true);
    this.root.removeEventListener("scroll", this.reposition, true);
    (_a = this.root.ownerDocument.defaultView) == null ? void 0 : _a.removeEventListener("resize", this.reposition);
    (_b = this.root.ownerDocument.defaultView) == null ? void 0 : _b.removeEventListener("blur", this.lostFocus);
  }
  static style = `
    .dropdown { min-width:0; }
    .dropdown-trigger { display:flex; align-items:center; width:100%; height:36px; padding:0 12px; border:1px solid #3b4252; border-radius:8px; background:#1b1e26; color:#e4e9f6; font:inherit; text-align:left; cursor:pointer; }
    .dropdown-trigger:hover:not(:disabled) { border-color:#7387ba; background:#252b38; }
    .dropdown-trigger:focus { outline:2px solid rgba(146,166,255,.65); outline-offset:2px; }
    .dropdown-trigger:disabled { opacity:.45; cursor:default; }
    .dropdown-label { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .dropdown-chevron { flex-shrink:0; margin-left:10px; color:#a9b6d1; }
    .dropdown-trigger[aria-expanded="true"] .dropdown-chevron { transform:rotate(180deg); }
    .dropdown-popup { position:fixed; z-index:1000; padding:4px; overflow-y:auto; border:1px solid #4b5770; border-radius:9px; background:#242b39; box-shadow:0 8px 24px rgba(0,0,0,.38); color:#e4e9f6; font:inherit; }
    .dropdown-popup[hidden] { display:none; }
    .dropdown-option { display:flex; align-items:center; width:100%; min-height:34px; padding:6px 8px; border:0; border-radius:5px; background:transparent; color:inherit; font:inherit; text-align:left; cursor:pointer; }
    .dropdown-option:hover,.dropdown-option.highlighted { background:rgba(135,157,226,.18); }
    .dropdown-option[aria-selected="true"] { color:#cbd7ff; }
    .dropdown-check { flex-shrink:0; width:16px; margin-left:10px; color:#9aafff; text-align:center; }
    .dropdown-dot { flex-shrink:0; width:6px; height:6px; margin-right:8px; border-radius:50%; background:#a5b4d6; }
    .dropdown-dot.error { background:#ff95a2; } .dropdown-dot.warn { background:#efc77c; } .dropdown-dot.info { background:#8eb6ff; }
  `;
};

// extensions/shared/panel-style.ts
var panelStyle = `
      ${PanelDropdown.style}
      :host { color: var(--color-normal-contrast, #e6e9f0); background: var(--color-normal-fill, #171a21); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif; font-size: 12px; }
      * { box-sizing: border-box; } #cocos-mcp-control-center { height: 100%; } .shell { height: 100%; display:flex; flex-direction:column; background: radial-gradient(circle at 0% 0%, rgba(79,125,255,.16), transparent 34%), var(--color-normal-fill, #171a21); }
      .hero { padding: 16px 18px 14px; display:flex; align-items:flex-start; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,.07); } .brand { display:flex; gap:14px; align-items:center; } .brand-icon { width:42px; height:42px; border-radius:13px; display:grid; place-items:center; font-size:22px; color:#fff; background:linear-gradient(145deg,#6c8cff,#8366e8); box-shadow:0 8px 24px rgba(89,105,255,.32); } .eyebrow,.section-kicker { letter-spacing:.14em; font-size:9px; color:#8c9ac5; font-weight:700; } h1,h2,h3,p { margin:0; } h1 { margin-top:4px; font-size:20px; letter-spacing:-.03em; } .brand p { margin-top:5px; color:#8790a5; } .hero-actions { display:flex; gap:9px; align-items:center; } .status-pill { display:inline-flex; align-items:center; gap:7px; border-radius:999px; padding:6px 10px; color:#aeb6c8; background:rgba(255,255,255,.06); font-size:11px; } .status-pill i { width:7px; height:7px; border-radius:50%; background:#798297; } .status-pill.online { color:#79ddb4; background:rgba(70,194,139,.11); } .status-pill.online i { background:#52d99c; box-shadow:0 0 0 3px rgba(82,217,156,.13); } .icon-button,.secondary,.primary,.text-button { border:0; cursor:pointer; font:inherit; } .icon-button { width:29px; height:29px; border-radius:9px; color:#b3bdd4; background:rgba(255,255,255,.07); font-size:18px; } .icon-button:hover,.secondary:hover { background:rgba(255,255,255,.12); color:#fff; }
      .tabs { display:flex; flex-wrap:wrap; gap:5px; padding:6px 18px 0; border-bottom:1px solid rgba(255,255,255,.07); } .tab { border:0; background:none; color:#7e879b; cursor:pointer; padding:10px 13px 12px; font:600 12px inherit; border-bottom:2px solid transparent; } .tab.selected { color:#fff; border-color:#7188ff; } .tab em { font-style:normal; margin-left:4px; color:#8894b5; font-size:10px; }
      .content { flex:1; min-height:0; overflow:auto; padding:14px 18px; } .metric-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; } .metric-card,.panel-card,.runtime-card { border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.035); border-radius:14px; } .metric-card { padding:15px; min-height:94px; } .metric-card.accent { background:linear-gradient(135deg,rgba(99,118,255,.2),rgba(99,118,255,.04)); border-color:rgba(112,134,255,.3); } .metric-card span { display:block; color:#8a94aa; font-size:11px; } .metric-card strong { display:block; margin-top:10px; color:#f1f3fa; font-size:17px; letter-spacing:-.02em; } .metric-card small { display:block; margin-top:6px; color:#7d879e; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; } .split-grid { display:grid; grid-template-columns:1.35fr 1fr; gap:12px; margin-top:12px; } .panel-card { padding:18px; min-height:245px; } .card-heading,.page-heading { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; } h2 { margin-top:4px; font-size:17px; letter-spacing:-.02em; } .card-heading h2,.page-heading h2 { margin-bottom:4px; } .text-button { color:#8fa4ff; background:none; padding:3px 0; } .instance-list { margin-top:17px; } .instance-row { display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,.055); } .instance-icon { width:29px; height:29px; display:grid; place-items:center; border-radius:9px; color:#b5c0ff; background:rgba(108,131,255,.15); font-weight:700; font-size:10px; } .instance-main { flex:1; min-width:0; } .instance-main strong,.instance-main span { display:block; } .instance-main strong { color:#dce1ef; font-size:12px; } .instance-main span { margin-top:3px; color:#788399; font-size:10px; } .state { font-size:10px; white-space:nowrap; color:#aab3c7; } .state.online { color:#71d4a8; } .state.active { color:#7de1b7; } .state.planned { color:#e5bd74; } .state.muted { color:#7e8798; } .card-footer { display:flex; gap:8px; margin-top:15px; } .primary,.secondary { border-radius:8px; padding:8px 12px; } .primary { color:#fff; background:#5c73eb; box-shadow:0 5px 14px rgba(92,115,235,.25); } .primary:hover { background:#7188ff; } .secondary { color:#bbc3d4; background:rgba(255,255,255,.065); } .insight { background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018)); } .insight h2 { margin-top:9px; } .insight p { margin-top:10px; line-height:1.65; color:#8992a8; } .check-list { display:grid; gap:9px; margin-top:18px; color:#aeb7ca; } .check-list i { display:inline-grid; place-items:center; width:17px; height:17px; margin-right:8px; border-radius:50%; color:#6ee0af; background:rgba(73,206,147,.12); font-style:normal; font-size:10px; }
      .tab-page { min-height:300px; } .page-heading p { margin-top:5px; color:#80899e; } .search { display:flex; align-items:center; gap:7px; width:220px; height:31px; padding:0 10px; border:1px solid rgba(255,255,255,.1); border-radius:9px; background:rgba(0,0,0,.14); color:#8995b3; } .search input { width:100%; border:0; outline:0; color:#e7eaf3; background:transparent; font:inherit; } .search input::placeholder { color:#727b90; } .capability-list { margin-top:17px; border-top:1px solid rgba(255,255,255,.07); } .capability-row { display:flex; align-items:center; gap:10px; min-height:54px; border-bottom:1px solid rgba(255,255,255,.055); } .capability-mark { width:7px; height:7px; margin-left:3px; border-radius:50%; background:#6f7a8e; } .capability-mark.active { background:#56d79e; box-shadow:0 0 0 3px rgba(86,215,158,.12); } .capability-mark.planned { background:#d6a75b; } .capability-main { display:flex; flex-direction:column; gap:4px; flex:1; min-width:0; } .capability-main strong { color:#dfe4f1; font:600 11px ui-monospace,SFMono-Regular,Menlo,monospace; } .capability-main span { color:#818ba0; font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; } .capability-meta { display:flex; align-items:center; gap:6px; } .tag { border-radius:5px; padding:3px 5px; color:#909bb5; background:rgba(255,255,255,.06); font-size:9px; } .list-hint { padding:13px; text-align:center; color:#7d879c; } .log-list { margin-top:17px; border-top:1px solid rgba(255,255,255,.07); } .log-row { display:flex; align-items:center; gap:9px; min-height:38px; border-bottom:1px solid rgba(255,255,255,.05); font-size:10px; } .log-sequence { width:28px; color:#606b80; text-align:right; } .log-level { width:36px; text-transform:uppercase; font-size:9px; font-weight:700; } .log-level.info { color:#76a5ff; } .log-level.warn { color:#e3b86e; } .log-level.error { color:#f17f8b; } .log-message { flex:1; color:#b5bdce; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; } .log-row time { color:#697489; } .runtime-card { display:flex; align-items:center; gap:18px; margin-top:18px; padding:24px; } .runtime-orb { width:58px; height:58px; display:grid; place-items:center; border-radius:50%; color:#788398; background:rgba(255,255,255,.06); font-size:27px; } .runtime-orb.active { color:#6be0ad; background:rgba(74,207,148,.11); box-shadow:0 0 0 8px rgba(74,207,148,.05); } .runtime-card h3 { font-size:14px; } .runtime-card p { margin-top:6px; color:#828da3; } .runtime-features { display:flex; flex-wrap:wrap; gap:7px; margin-top:13px; } .runtime-features span { padding:7px 10px; border-radius:7px; color:#a9b2c6; background:rgba(255,255,255,.05); } .notice { margin-bottom:14px; padding:10px 12px; border-radius:9px; font-size:11px; } .notice.error { color:#ffabb4; background:rgba(231,91,111,.12); border:1px solid rgba(231,91,111,.2); } .notice span { display:inline-grid; place-items:center; width:16px; height:16px; margin-right:7px; border-radius:50%; background:#d85f73; color:#fff; } .empty { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:145px; text-align:center; color:#818ba1; } .empty > span { margin-bottom:8px; color:#68758f; font-size:26px; } .empty strong { color:#bdc5d5; font-size:12px; } .empty small { margin-top:5px; color:#727e96; } .footer { display:flex; justify-content:space-between; padding:11px 28px 14px; color:#626d83; font-size:10px; } @media (max-width: 620px) { .hero,.content { padding-left:18px; padding-right:18px; } .tabs { padding-left:18px; } .metric-grid { grid-template-columns:repeat(2,1fr); } .split-grid { grid-template-columns:1fr; } .capability-meta .tag { display:none; } }
      /* \u56FA\u5B9A\u533A\u57DF\u4E0D\u53C2\u4E0E\u7EB5\u5411\u538B\u7F29\uFF0C\u53EA\u6709\u5185\u5BB9\u533A\u6EDA\u52A8\uFF0C\u907F\u514D\u5361\u7247\u6ED1\u5230\u6807\u7B7E\u680F\u4E0B\u65B9\u3002 */
      .info-card { margin-top:18px; padding:24px; } .info-card p { margin:14px 0; line-height:1.65; color:#a9b2c6; } .info-card dl { display:grid; grid-template-columns:100px minmax(0,1fr); gap:12px; margin:20px 0; } .info-card dt { color:#8995ad; } .info-card dd { margin:0; overflow-wrap:anywhere; user-select:text; } .info-actions { display:flex; gap:10px; flex-wrap:wrap; }
      :host { display:block; height:100%; min-height:0; overflow:hidden; }
      .shell { min-height:0; overflow:hidden; }
      .hero,.tabs,.footer { flex-shrink:0; }
      .content { scroll-padding-top:22px; }
      .service-card { min-height:0; margin-bottom:18px; } .service-card p { margin-top:10px; line-height:1.6; overflow-wrap:anywhere; } .service-card code { user-select:text; }
      .connection-fields { display:flex; align-items:flex-end; margin:16px 0 10px; }
      .connection-field { display:flex; flex-direction:column; flex:1; min-width:0; }
      .connection-label { margin-bottom:7px; color:#aeb8ce; font-size:11px; font-weight:500; line-height:16px; }
      .connection-field input { display:block; width:100%; height:36px; padding:0 12px; border:1px solid #3b4252; border-radius:8px; background:#1b1e26; color:#e4e9f6; font:inherit; }
      .connection-field input:focus { outline:2px solid rgba(146,166,255,.65); outline-offset:2px; }
      .connection-action { display:flex; align-items:center; justify-content:center; flex:0 0 148px; height:36px; margin-left:12px; padding:0 12px; line-height:1.3; }
      .connection-action svg { flex-shrink:0; margin-right:7px; }
      .service-card .connection-help { color:#a3aec5; font-size:11px; }
      .service-card .connection-feedback { margin-top:8px; }
      .log-filter .dropdown-trigger { width:132px; height:28px; padding:0 10px; font-size:11px; border-radius:7px; }
      .page-size .dropdown-trigger { min-width:82px; height:28px; padding:0 10px; font-size:11px; }
      @media (max-width:480px) { .connection-fields { flex-direction:column; align-items:stretch; } .connection-field,.connection-action { flex:none; width:100%; } .connection-action { margin:8px 0 0; } .service-card .card-footer { flex-wrap:wrap; } }
      .metric-grid,.split-grid { align-items:stretch; }
      .log-filter,.page-size { display:flex; align-items:center; gap:10px; } .control-label { color:#b4bed3; font-size:11px; }
      .log-update-state { display:flex; align-items:center; flex-wrap:wrap; gap:7px; color:#a3aec5; font-size:10px; } .log-update-state > i { width:5px; height:5px; border-radius:50%; background:#71d4a8; } .log-update-state > i.paused { background:#e3b86e; } .log-update-state button { margin-left:4px; }
      .logs-page .log-list { margin-top:0; border-top:0; } .logs-page .log-row { min-height:32px; } .logs-page .log-sequence { width:42px; flex-shrink:0; font-variant-numeric:tabular-nums; }
      .log-pagination { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding:10px 0; } .log-range { color:#a3aec5; font-size:11px; font-variant-numeric:tabular-nums; }
      .log-page-controls { display:flex; align-items:center; flex-wrap:wrap; gap:16px; } .page-size { color:#a3aec5; font-size:11px; gap:8px; }
      .page-navigation { display:flex; align-items:center; gap:5px; } .page-button { width:30px; height:30px; border:1px solid rgba(156,173,219,.18); border-radius:9px; background:rgba(255,255,255,.045); color:#d7dff2; font:22px -apple-system,sans-serif; cursor:pointer; }
      .page-button:hover:not(:disabled) { background:rgba(113,136,255,.16); border-color:#7387ba; } .page-button:active:not(:disabled) { background:rgba(113,136,255,.28); } .page-button:disabled { opacity:.32; cursor:default; } .page-button:focus-visible,.logs-page button:focus-visible { outline:2px solid #92a6ff; outline-offset:3px; }
      .page-position { display:flex; gap:6px; justify-content:center; min-width:64px; font-size:11px; font-variant-numeric:tabular-nums; } .page-position strong { color:#e3e9ff; } .page-position > span { color:#a3aec5; }
      @media (max-width:480px) { .log-page-controls { width:100%; justify-content:space-between; gap:8px; } }
      .hero-actions { flex-wrap:wrap; justify-content:flex-end; }
      .language-switch { display:inline-flex; align-items:center; padding:3px; gap:2px; border:1px solid rgba(160,174,203,.13); border-radius:9px; background:rgba(0,0,0,.14); }
      .language-option { border:0; border-radius:6px; min-width:35px; min-height:24px; padding:3px 8px; background:transparent; color:#8e99af; font:500 10px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; cursor:pointer; transition:background .15s,color .15s; }
      .language-option[aria-pressed="true"] { color:#e3eaff; background:rgba(135,157,226,.2); box-shadow:0 1px 3px rgba(0,0,0,.16); }
      .language-option:hover:not([aria-pressed="true"]) { color:#e3eaff; background:rgba(255,255,255,.05); }
      .language-option:focus-visible,.log-icon-button:focus-visible { outline:2px solid #92a6ff; outline-offset:2px; }
      .logs-page .log-header { display:flex; flex-direction:column; gap:7px; padding:0 0 12px; border-bottom:1px solid rgba(156,173,219,.14); }
      .log-heading-main { display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; flex-wrap:wrap; }
      .log-heading-main h2 { margin:0; font-size:15px; }
      .log-heading-actions { display:flex; align-items:center; gap:4px; }
      .log-action-divider { height:16px; width:1px; margin:0 4px; background:rgba(156,173,219,.16); }
      .log-icon-button { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; padding:0; flex-shrink:0; border:1px solid transparent; border-radius:6px; background:transparent; color:#9daecb; cursor:pointer; }
      .log-icon-button:hover:not(:disabled) { color:#e2eaff; background:rgba(135,157,226,.13); border-color:rgba(156,173,219,.15); }
      .log-icon-button:disabled { opacity:.3; cursor:default; }
      .log-copy { width:24px; height:24px; color:#8998b3; }
      .log-heading-foot { display:flex; align-items:center; justify-content:space-between; gap:6px 14px; flex-wrap:wrap; width:100%; }
      .log-heading-foot p { margin:0; font-size:10px; line-height:1.5; }
      .log-heading-foot .log-update-state { font-size:9px; }
      .log-message { min-width:0; } .log-row time { flex-shrink:0; }
      .copy-feedback { color:#a8b9ed; font-size:10px; overflow-wrap:anywhere; } .copy-feedback:empty { display:none; }
      @media (max-width:620px) { .hero { gap:10px; flex-wrap:wrap; } .brand p { display:none; } .log-update-state { margin-left:0; } }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration:.01ms !important; animation-duration:.01ms !important; } }
    `;

// extensions/shared/panel-dom.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PanelDom = class {
  listeners = /* @__PURE__ */ new WeakMap();
  html = /* @__PURE__ */ new WeakMap();
  update(root, html) {
    if (this.html.get(root) === html) return;
    const template = root.ownerDocument.createElement("template");
    template.innerHTML = html;
    this.children(root, template.content);
    this.html.set(root, html);
  }
  on(target, event, handler) {
    if (!target) return;
    let listeners = this.listeners.get(target);
    if (!listeners) {
      listeners = /* @__PURE__ */ new Map();
      this.listeners.set(target, listeners);
    }
    const previous = listeners.get(event);
    if (previous) target.removeEventListener(event, previous);
    target.addEventListener(event, handler);
    listeners.set(event, handler);
  }
  key(node) {
    if (node.nodeType !== 1) return "";
    const element = node;
    for (const name of ["data-key", "data-action", "data-tab", "data-search", "data-log-select", "data-locale", "data-copy-log"]) {
      if (element.hasAttribute(name)) return `${element.tagName}:${name}:${element.getAttribute(name)}`;
    }
    return "";
  }
  children(current, desired) {
    var _a;
    let cursor = current.firstChild;
    for (const next of Array.from(desired.childNodes)) {
      const key = this.key(next);
      let match = cursor;
      if (key && (!match || this.key(match) !== key)) match = (_a = Array.from(current.childNodes).find((child) => this.key(child) === key)) != null ? _a : null;
      if (!match || match.nodeType !== next.nodeType || match.nodeName !== next.nodeName || this.key(match) !== key) {
        current.insertBefore(next.cloneNode(true), cursor);
        continue;
      }
      if (match !== cursor) current.insertBefore(match, cursor);
      if (match.nodeType === 1) this.element(match, next);
      else if (match.nodeValue !== next.nodeValue) match.nodeValue = next.nodeValue;
      cursor = match.nextSibling;
    }
    while (cursor) {
      const next = cursor.nextSibling;
      current.removeChild(cursor);
      cursor = next;
    }
  }
  element(current, desired) {
    const active = current.getRootNode().activeElement;
    if (current === active && ["INPUT", "TEXTAREA", "SELECT"].includes(current.tagName)) return;
    for (const attribute of Array.from(current.attributes)) if (!desired.hasAttribute(attribute.name)) current.removeAttribute(attribute.name);
    for (const attribute of Array.from(desired.attributes)) if (current.getAttribute(attribute.name) !== attribute.value) current.setAttribute(attribute.name, attribute.value);
    this.children(current, desired);
    if (current !== active && ["INPUT", "TEXTAREA", "SELECT"].includes(current.tagName)) {
      const field = current, target = desired;
      if (field.value !== target.value) field.value = target.value;
    }
  }
};

// extensions/shared/panel-log-cache.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var PanelLogCache = class {
  rows = [];
  cursor = "";
  request() {
    return this.cursor;
  }
  accept(snapshot) {
    const window = snapshot.logWindow;
    if (!window || window.reset) this.rows = snapshot.logs.slice();
    else this.rows = this.rows.filter((row) => Number(row.sequence) > window.droppedBefore).concat(snapshot.logs);
    this.rows = this.rows.slice(-5e3);
    this.cursor = window ? JSON.stringify({ epoch: window.epoch, sequence: window.cursor }) : "";
    return this.rows;
  }
};

// extensions/shared/panel-i18n.ts
init_define_COCOS_VERIFICATION_EVIDENCE();
var english = {
  "\u5F53\u524D\u5DE5\u7A0B\u5DF2\u6388\u6743": "This project is authorized",
  "\u5F53\u524D\u5DE5\u7A0B\u672A\u6388\u6743": "This project is not authorized",
  "\u5F53\u524D\u5DE5\u7A0B\u6388\u6743\u5DF2\u64A4\u9500": "This project authorization was revoked",
  "\u6388\u6743\u5F53\u524D\u5DE5\u7A0B": "Authorize this project",
  "\u53D6\u6D88\u5DE5\u7A0B\u6388\u6743": "Revoke project authorization",
  "\u5B89\u88C5\u63D2\u4EF6\u65F6\u81EA\u52A8\u6388\u6743\u5F53\u524D\u5DE5\u7A0B\uFF1B\u624B\u52A8\u5B89\u88C5 ZIP \u53EF\u5728\u6B64\u6388\u6743\u3002": "Installing the extension authorizes this project. Authorize manual ZIP installations here.",
  "\u7EDF\u4E00 stdio\uFF08\u591A\u5DE5\u7A0B\uFF09": "Unified stdio (multiple projects)",
  "\u672C\u673A stdio\uFF08\u5355\u5DE5\u7A0B\uFF09": "Local stdio (one project)",
  "\u590D\u5236 Codex \u914D\u7F6E": "Copy Codex configuration",
  "\u5168\u5C40\u914D\u7F6E\u4E00\u6B21\uFF0CAI \u6309\u5F53\u524D\u4EFB\u52A1\u8FDE\u63A5\u5DE5\u7A0B\uFF0C\u65E0\u9700\u586B\u5199\u7AEF\u53E3\u3002": "Configure once globally. AI connects the project for the task; no port is needed.",
  "\u7EDF\u4E00\u5BA2\u6237\u7AEF\u672A\u5B89\u88C5\uFF0C\u8BF7\u8FD0\u884C pnpm client:install \u5E76\u66F4\u65B0\u6269\u5C55": "Unified client is not installed. Run pnpm client:install and update the extension.",
  "\u5171\u4EAB\u540E\u7AEF\u7531\u7EDF\u4E00\u5BA2\u6237\u7AEF\u81EA\u52A8\u53D1\u73B0\uFF0C\u591A\u4E2A\u4F1A\u8BDD\u53EF\u540C\u65F6\u8FDE\u63A5\u3002": "The unified client discovers the shared backend automatically. Multiple sessions can connect.",
  "\u7EDF\u4E00\u5BA2\u6237\u7AEF\u7248\u672C\uFF1A": "Unified client version: ",
  "\u5DF2\u8FDE\u63A5\u4F1A\u8BDD\uFF1A": "Connected sessions: ",
  "\u5173\u4E8E CocosMCP": "About CocosMCP",
  "\u68C0\u67E5\u66F4\u65B0": "Check for Updates",
  "\u5F53\u524D\u7248\u672C": "Running Version",
  "\u5DF2\u5B89\u88C5\u7248\u672C": "Installed Version",
  "\u6700\u65B0\u7248\u672C": "Latest Version",
  "\u6784\u5EFA\u6807\u8BC6": "Build ID",
  "\u8BB8\u53EF\u8BC1": "License",
  "\u4F5C\u8005": "Author",
  "\u9879\u76EE\u4E3B\u9875": "Project Homepage",
  "\u95EE\u9898\u53CD\u9988": "Report an Issue",
  "\u5B89\u88C5\u6700\u65B0\u7248\u672C": "Install Latest Version",
  "\u68C0\u67E5\u4E2D\u2026": "Checking\u2026",
  "\u514D\u8D39\u5F00\u6E90\u7684 Cocos Creator MCP \u63D2\u4EF6": "Free and open-source MCP extension for Cocos Creator",
  "\u8FDE\u63A5 AI \u5BA2\u6237\u7AEF\u3001\u7F16\u8F91\u5668\u573A\u666F\u3001\u8D44\u6E90\u548C\u5F00\u53D1\u8FD0\u884C\u65F6\u3002": "Connect AI clients to editor scenes, assets and development runtimes.",
  "\u7248\u672C\u4FE1\u606F\u5DF2\u83B7\u53D6\uFF0C\u53EF\u6309\u9700\u5B89\u88C5\u6700\u65B0\u7248\u672C\u3002": "Version information retrieved. Install the latest version when needed.",
  "\u70B9\u51FB\u68C0\u67E5\u66F4\u65B0\u83B7\u53D6\u6700\u65B0\u7248\u672C\u3002": "Check for updates to retrieve the latest version.",
  "\u65B0\u7248\u5DF2\u5B89\u88C5\uFF0C\u8BF7\u91CD\u8F7D\u6269\u5C55\u540E\u91CD\u65B0\u542F\u52A8 MCP \u670D\u52A1\u3002": "Update installed. Reload the extension, then restart the MCP service.",
  "\u68C0\u67E5\u4E0D\u4F1A\u5B89\u88C5\uFF1B\u5B89\u88C5\u524D\u4F1A\u5907\u4EFD\u5F53\u524D\u6269\u5C55\u3002": "Checking does not install. Installation backs up the current extension.",
  "\u5728\u6B64\u63A7\u5236\u4E2D\u5FC3\u542F\u52A8 CocosMCP \u6865\u63A5": "Start the CocosMCP bridge in this control center",
  "\u7F16\u8F91\u5668\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u662F\u5426\u542F\u7528\u540E\u5237\u65B0": "Editor timed out. Check that the extension is enabled, then refresh.",
  "\u5F53\u524D\u7F16\u8F91\u5668\u672A\u63D0\u4F9B\u9762\u677F\u6D88\u606F\u63A5\u53E3": "The editor panel messaging API is unavailable.",
  "\u8BA9\u7F16\u8F91\u5668\u72B6\u6001\u3001\u80FD\u529B\u548C\u8FD0\u884C\u65F6\u4FDD\u6301\u53EF\u89C1": "Editor, capabilities and runtime at a glance",
  "\u542F\u52A8\u672C\u5DE5\u7A0B\u7684 MCP \u670D\u52A1\u53CA\u8FD0\u884C\u65F6\u7F51\u5173\u3002\u6E38\u620F\u9884\u89C8\u4ECD\u9700\u63A5\u5165\u8FD0\u884C\u65F6\u6865\u63A5\u3002": "Start the MCP service and runtime gateway for this project. Connect the runtime bridge in game previews.",
  "\u5BA2\u6237\u7AEF\u4F7F\u7528 Bearer token\uFF0C\u51ED\u8BC1\u6587\u4EF6\uFF1A": "Clients use a Bearer token. Credential file: ",
  "\u7531\u6B64\u5904\u542F\u52A8\u7684\u670D\u52A1\u968F\u6269\u5C55\u5378\u8F7D\u6216\u7F16\u8F91\u5668\u9000\u51FA\u800C\u505C\u6B62\uFF1B\u5173\u95ED\u9762\u677F\u4E0D\u505C\u6B62\u670D\u52A1\u3002": "The service stops when the extension unloads or the editor exits. Closing this panel keeps it running.",
  "\u6865\u63A5\u5DF2\u542F\u52A8\u4EC5\u8868\u793A\u5F53\u524D\u7F16\u8F91\u5668\u76D1\u542C\u5C31\u7EEA\u3002\u6B64\u9762\u677F\u5C1A\u672A\u76D1\u6D4B MCP \u5BA2\u6237\u7AEF\u8FDE\u63A5\uFF1B\u6E38\u620F\u8FDE\u63A5\u8BF7\u67E5\u770B\u8FD0\u884C\u65F6\u72B6\u6001\u3002": "Bridge ready means the editor listener is available. MCP client connections are not monitored here. See Runtime for game connections.",
  "\u4FDD\u7559\u6700\u8FD1 5,000 \u6761\u6865\u63A5\u4E8B\u4EF6\uFF1B\u4E0D\u5305\u542B Creator \u63A7\u5236\u53F0\u65E5\u5FD7": "Latest 5,000 bridge events; excludes Creator console logs",
  "\u5DF2\u4ECE\u5F00\u53D1\u7F51\u5173\u8BFB\u53D6\u6E38\u620F\u4F1A\u8BDD\uFF0C\u8D85\u8FC7 30 \u79D2\u6CA1\u6709\u5FC3\u8DF3\u7684\u4F1A\u8BDD\u4E0D\u8BA1\u5165\u8FDE\u63A5\u6570\u3002": "Game sessions are read from the development gateway. Sessions without a heartbeat for 30 seconds are excluded.",
  "\u542F\u52A8 MCP \u670D\u52A1\u5E76\u5728\u5F00\u53D1\u9884\u89C8\u4E2D\u63A5\u5165\u8FD0\u884C\u65F6\u6865\u63A5\u3002": "Start the MCP service and connect the runtime bridge in a development preview.",
  " \u9879\uFF1B\u652F\u6301\u4E0D\u4EE3\u8868\u5DF2\u901A\u8FC7\u5B9E\u673A\u9A8C\u8BC1": " registered; support does not imply native verification",
  " \u9879 / \u6CE8\u518C\u76EE\u5F55 ": " supported / ",
  "\u5F53\u524D\u9002\u914D\u5668\u652F\u6301 ": "Current adapter: ",
  "\u6B63\u5728\u68C0\u67E5 GitHub \u7248\u672C\u2026": "Checking GitHub releases\u2026",
  "\u66F4\u65B0\u6E90\uFF1AGitHub \xB7 iEfoam/CocosMcp": "Updates: GitHub \xB7 iEfoam/CocosMcp",
  "\u5386\u53F2\u5FEB\u7167 \xB7 \u7FFB\u9875\u65F6\u4FDD\u6301\u7A33\u5B9A": "History snapshot \xB7 stable while paging",
  "\u5B9E\u65F6\u66F4\u65B0 \xB7 \u6BCF 5 \u79D2": "Live \xB7 every 5 s",
  "\u542F\u52A8\u6865\u63A5\u540E\u4F1A\u663E\u793A\u8FDE\u63A5\u548C\u64CD\u4F5C\u4E8B\u4EF6": "Start the bridge to see connection and operation events",
  "\u53EF\u4EE5\u5207\u6362\u7EA7\u522B\u67E5\u770B\u5176\u4ED6\u6865\u63A5\u4E8B\u4EF6": "Choose another level to see more bridge events",
  "\u5728 Creator \u83DC\u5355\u4E2D\u542F\u52A8 CocosMCP \u6865\u63A5": "Start the CocosMCP bridge from the Creator menu",
  "\u4EC5\u663E\u793A\u524D 120 \u9879\uFF0C\u8BF7\u7F29\u5C0F\u641C\u7D22\u8303\u56F4": "Showing the first 120 results. Refine your search.",
  "\u5C1D\u8BD5\u641C\u7D22 scene\u3001asset \u6216 runtime": "Try scene, asset or runtime",
  "\u641C\u7D22\u80FD\u529B\u3001\u6A21\u5757\u6216\u63CF\u8FF0": "Search capabilities, modules or descriptions",
  "\u5F53\u524D\u7A97\u53E3\u7684\u6865\u63A5\u5B9E\u4F8B": "Bridge instance in this window",
  "\u6B63\u5728\u8BFB\u53D6\u7F16\u8F91\u5668\u72B6\u6001": "Reading editor state",
  "\u5F00\u53D1\u6E38\u620F\u4F1A\u8BDD\u72B6\u6001": "Development game sessions",
  "\u8DEF\u5F84\u9650\u5236\u5728\u5DE5\u7A0B\u5185": "Paths stay within the project",
  "\u64CD\u4F5C\u652F\u6301\u5E42\u7B49\u91CD\u8BD5": "Operations support idempotent retries",
  "\u8FD0\u884C\u65F6\u9ED8\u8BA4\u5F00\u53D1\u6A21\u5F0F": "Runtime defaults to development mode",
  "\u5F00\u53D1\u9884\u89C8\u8FDE\u63A5\u548C\u8C03\u8BD5\u80FD\u529B": "Development preview connections and debugging",
  "\u590D\u5236\u5168\u90E8\u9519\u8BEF": "Copy all errors",
  "\u590D\u5236\u9519\u8BEF\u65E5\u5FD7": "Copy error log",
  "\u590D\u5236\u6210\u529F": "Copied",
  "\u590D\u5236\u5931\u8D25": "Copy failed",
  "\u6CA1\u6709\u53EF\u590D\u5236\u7684\u9519\u8BEF\u65E5\u5FD7": "No error logs to copy",
  "\u8BED\u8A00\u8BBE\u7F6E\u5931\u8D25": "Could not save language",
  "\u8BED\u8A00": "Language",
  "\u590D\u5236": "Copy",
  "\u63A7\u5236\u4E2D\u5FC3": "Control Center",
  "\u603B\u89C8": "Overview",
  "\u8FDE\u63A5\u5F02\u5E38": "Connection error",
  "\u6865\u63A5\u5DF2\u542F\u52A8": "Bridge ready",
  "\u5DF2\u505C\u6B62": "Stopped",
  "\u6B63\u5728\u8FDE\u63A5": "Connecting",
  "\u5DF2\u542F\u52A8": "Running",
  "\u542F\u52A8\u4E2D": "Starting",
  "\u542F\u52A8\u5931\u8D25": "Start failed",
  "\u672A\u542F\u52A8": "Stopped",
  "\u67E5\u8BE2\u5F02\u5E38": "Query error",
  "\u5DF2\u8FDE\u63A5 ": "Connected: ",
  "\u7B49\u5F85\u6E38\u620F\u8FDE\u63A5": "Waiting for game",
  "\u7F51\u5173\u672A\u542F\u52A8": "Gateway stopped",
  "\u89C4\u5212\u4E2D": "Planned",
  "\u7248\u672C\u4E0D\u652F\u6301": "Unsupported version",
  "\u9700\u8FD0\u884C\u65F6": "Needs runtime",
  "\u53EF\u7528": "Available",
  "\u9700\u542F\u52A8\u6865\u63A5": "Start bridge first",
  "\u672A\u66B4\u9732": "Not exposed",
  "\u8FDE\u63A5\u5730\u5740\uFF1A": "Endpoint: ",
  "MCP \u670D\u52A1": "MCP service",
  "\u91CD\u542F": "Restart",
  "\u542F\u52A8": "Start",
  "\u505C\u6B62": "Stop",
  "\u6865\u63A5": " bridge",
  "\u5237\u65B0\u65E5\u5FD7": "Refresh",
  "\u5237\u65B0": "Refresh",
  "\u80FD\u529B\u76EE\u5F55": "Capability catalog",
  "\u67E5\u770B\u80FD\u529B \u2192": "View capabilities \u2192",
  "\u80FD\u529B": "Capabilities",
  "\u6865\u63A5\u65E5\u5FD7\u5217\u8868": "Bridge log entries",
  "\u6865\u63A5\u65E5\u5FD7": "Bridge logs",
  "\u8FD0\u884C\u65F6\u72B6\u6001": "Runtime status",
  "\u8FD0\u884C\u65F6": "Runtime",
  "\u7F16\u8F91\u5668": "Editor",
  "\u5DE5\u7A0B": "Project",
  "\u7B49\u5F85\u8FDE\u63A5": "Waiting",
  "\u5927\u7248\u672C ": "Major ",
  "\u5DF2\u8BC6\u522B": "Identified",
  "\u8BFB\u53D6\u4E2D": "Loading",
  "\u5B9E\u4F8B": "Instances",
  "\u5F53\u524D\u7A97\u53E3\u5B9E\u4F8B": "Current window instance",
  "\u5C1A\u672A\u8FDE\u63A5 Creator": "Creator is not connected",
  "\u8FDE\u63A5\u8303\u56F4": "Connection scope",
  "\u6CA1\u6709\u5339\u914D\u7684\u80FD\u529B": "No matching capabilities",
  "\u641C\u7D22\u80FD\u529B": "Search capabilities",
  "\u65E5\u5FD7\u7EA7\u522B": "Log level",
  "\u5168\u90E8\u7EA7\u522B": "All levels",
  "\u9519\u8BEF \xB7 Error": "Error",
  "\u8B66\u544A \xB7 Warning": "Warning",
  "\u4FE1\u606F \xB7 Info": "Info",
  "\u8FD4\u56DE\u6700\u65B0": "Latest",
  "\u6682\u65E0\u8BE5\u7EA7\u522B\u65E5\u5FD7": "No logs at this level",
  "\u6682\u65E0\u65E5\u5FD7": "No logs yet",
  "\u6BCF\u9875\u65E5\u5FD7\u6761\u6570": "Logs per page",
  "\u6BCF\u9875": "Per page",
  "\u65E5\u5FD7\u5206\u9875": "Log pagination",
  "\u4E0A\u4E00\u9875": "Previous page",
  "\u4E0B\u4E00\u9875": "Next page",
  " / \u5171 ": " / ",
  "\u7B2C ": "Page ",
  " \u9875\uFF0C\u5171 ": " of ",
  " \u9875": "",
  " \u6761": " entries",
  "\u5BF9\u8C61\u68C0\u67E5": "Inspect objects",
  "\u5C5E\u6027\u8BFB\u5199": "Read / write properties",
  "\u4E8B\u4EF6\u8BA2\u9605": "Subscribe to events",
  "\u622A\u56FE": "Screenshots",
  "\u6027\u80FD\u6307\u6807": "Performance",
  "\u66F4\u65B0\u4E2D\u2026": "Updating\u2026",
  "\u66F4\u65B0\u7248\u672C": "Update",
  "\u5DF2\u5B89\u88C5 ": "Installed ",
  "\uFF0C\u5F85\u91CD\u8F7D\u3002": "; reload required. ",
  "GitHub \u6700\u65B0\uFF1A": "Latest on GitHub: ",
  "\u65E5\u5FD7\u65F6\u533A\uFF1A": "Log timezone: ",
  "\u7531 AI \u5BA2\u6237\u7AEF\u7BA1\u7406\uFF0C\u8BF7\u5728\u5BA2\u6237\u7AEF\u542F\u505C\u670D\u52A1\u3002": "Managed by the AI client. Start or stop it in the client.",
  "\u7531\u5176\u4ED6\u7F16\u8F91\u5668\u5B9E\u4F8B\u7BA1\u7406\uFF0C\u8BF7\u4F7F\u7528\u5DF2\u6709\u8FDE\u63A5\u3002": "Managed by another editor instance. Use the existing connection.",
  "stdio \u5DF2\u8FDE\u63A5\uFF0C\u65E0\u9700\u914D\u7F6E MCP \u7AEF\u53E3\u3002": "stdio is connected; no MCP port is required.",
  "\u63A5\u5165\u65B9\u5F0F": "Connection mode",
  "\u672C\u673A stdio\uFF08\u63A8\u8350\uFF09": "Local stdio (recommended)",
  "\u590D\u5236 stdio \u914D\u7F6E": "Copy stdio configuration",
  "\u590D\u5236 HTTP \u914D\u7F6E": "Copy HTTP configuration",
  "HTTP \u7AEF\u53E3": "HTTP port",
  "\u4FDD\u5B58\u7AEF\u53E3": "Save port",
  "\u901A\u7528 JSON \u6A21\u677F\uFF0C\u8BF7\u6309\u5BA2\u6237\u7AEF\u914D\u7F6E\u683C\u5F0F\u8C03\u6574\u3002HTTP \u914D\u7F6E\u542B\u8BA4\u8BC1\u51ED\u8BC1\uFF0C\u8BF7\u59A5\u5584\u4FDD\u7BA1\u3002": "Generic JSON template; adapt it to your client. HTTP configuration contains credentials; keep it private.",
  "\u7531\u5BA2\u6237\u7AEF\u542F\u52A8\u79BB\u7EBF stdio \u5165\u53E3\u3002\u5207\u6362\u524D\u8BF7\u505C\u6B62\u5DF2\u6709 HTTP \u670D\u52A1\uFF0C\u591A\u4E2A\u5BA2\u6237\u7AEF\u53EF\u5171\u4EAB HTTP \u670D\u52A1\u3002": "The client launches the bundled stdio entry. Stop the existing HTTP service before switching. Multiple clients can share HTTP.",
  "0 \u8868\u793A\u4E0B\u6B21\u9996\u6B21\u5206\u914D\uFF1B\u542F\u52A8\u6210\u529F\u540E\u4FDD\u5B58\u5E76\u590D\u7528\u7AEF\u53E3\u3002\u4FEE\u6539\u7AEF\u53E3\u524D\u9700\u505C\u6B62\u670D\u52A1\u5E76\u66F4\u65B0\u5BA2\u6237\u7AEF\u914D\u7F6E\u3002": "0 allocates a port on the next start, then saves and reuses it. Stop the service before changing the port and update your client configuration."
};
var keys = Object.keys(english).sort((a, b) => b.length - a.length);
var pattern = new RegExp(keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
var PanelI18n = class {
  locale = "zh";
  text = (source) => this.locale === "en" ? source.replace(pattern, (key) => english[key]) : source;
  html = (strings, ...values) => strings.reduce((result, part, index) => {
    var _a;
    return result + this.text(part) + (index < values.length ? String((_a = values[index]) != null ? _a : "") : "");
  }, "");
};

// extensions/shared/panel.ts
function request(major, message, ...args) {
  return new Promise((accept, reject) => {
    const timeout = setTimeout(() => reject(new Error("\u7F16\u8F91\u5668\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u662F\u5426\u542F\u7528\u540E\u5237\u65B0")), message === "extension-update" ? 125e3 : message.startsWith("service-") ? 25e3 : 1e4);
    const finish = (error, result) => {
      clearTimeout(timeout);
      if (error) reject(error);
      else accept(result);
    };
    try {
      if (major === 3 && Editor.Message) void Editor.Message.request("cocos-mcp-creator3", message, ...args).then((result) => finish(null, result), finish);
      else if (major === 2 && Editor.Ipc) Editor.Ipc.sendToMain(`cocos-mcp-creator2:${message}`, ...args, finish);
      else finish(new Error("\u5F53\u524D\u7F16\u8F91\u5668\u672A\u63D0\u4F9B\u9762\u677F\u6D88\u606F\u63A5\u53E3"));
    } catch (error) {
      finish(error);
    }
  });
}
function errorMessage(error) {
  if (error && typeof error === "object" && "message" in error) return String(error.message);
  return String(error);
}
function createPanelDefinition(major) {
  const i18n = new PanelI18n();
  const dom = new PanelDom(), logCache = new PanelLogCache();
  const state = { tab: "overview", query: "", snapshot: null, selected: null, supported: [], logs: [], runtime: false, error: "", busy: false, connectionMode: "stdio" };
  let connectionChosen = false;
  let navigationRevision = -1;
  let root;
  let timer;
  let pending;
  let disposed = false;
  let composing = false;
  const logBrowser = new PanelLogs();
  let dropdowns;
  let copyFeedback = "";
  let copying = false;
  const render = () => {
    var _a, _b, _c, _d, _e;
    if (disposed || composing || (dropdowns == null ? void 0 : dropdowns.expanded)) return;
    const previousSearch = root.querySelector("[data-search]");
    const focused = previousSearch && root.getRootNode().activeElement === previousSearch;
    const selection = focused ? [previousSearch.selectionStart, previousSearch.selectionEnd] : null;
    const activeElement = root.getRootNode().activeElement;
    const activePageLabel = (activeElement == null ? void 0 : activeElement.hasAttribute("data-log-page")) ? activeElement.getAttribute("aria-label") : null;
    const scrollTop = (_b = (_a = root.querySelector(".content")) == null ? void 0 : _a.scrollTop) != null ? _b : 0;
    dom.update(root, PanelView.render({ major, state, i18n, logBrowser, dropdowns, copyFeedback, copying }));
    bind();
    if (activePageLabel) (_c = root.querySelector(`[data-log-page][aria-label="${activePageLabel}"]:not(:disabled)`)) == null ? void 0 : _c.focus();
    const content = root.querySelector(".content");
    if (content) content.scrollTop = scrollTop;
    if (selection) {
      const input = root.querySelector("[data-search]");
      input == null ? void 0 : input.focus();
      input == null ? void 0 : input.setSelectionRange((_d = selection[0]) != null ? _d : 0, (_e = selection[1]) != null ? _e : 0);
    }
  };
  const refresh = () => {
    if (disposed) return Promise.resolve();
    if (pending) return pending;
    pending = request(major, "panel-state", logCache.request()).then((snapshot) => {
      var _a, _b;
      if (disposed) return;
      if (snapshot.navigation && snapshot.navigation.revision !== navigationRevision) {
        state.tab = snapshot.navigation.page;
        navigationRevision = snapshot.navigation.revision;
      }
      state.snapshot = snapshot;
      i18n.locale = snapshot.locale === "en" ? "en" : "zh";
      state.selected = snapshot.instance;
      if (!connectionChosen && ((_b = (_a = snapshot.service) == null ? void 0 : _a.unifiedClient) == null ? void 0 : _b.installed)) {
        state.connectionMode = "unified";
        connectionChosen = true;
      }
      state.supported = snapshot.supportedCapabilities;
      state.logs = logCache.accept(snapshot);
      state.runtime = snapshot.runtimeConfigured;
      state.error = "";
    }).catch((error) => {
      if (disposed) return;
      state.selected = null;
      state.supported = [];
      state.runtime = false;
      state.error = errorMessage(error);
    }).finally(() => {
      pending = void 0;
      render();
    });
    return pending;
  };
  const command = async (action) => {
    var _a, _b;
    if (state.busy || disposed) return;
    const parameter = action === "copy-connection" ? state.connectionMode : (_b = (_a = root.querySelector("[data-service-port]")) == null ? void 0 : _a.value) != null ? _b : "";
    state.busy = true;
    render();
    try {
      await pending;
      if (disposed) return;
      if (action === "restart" || action === "service-restart") {
        await request(major, action === "restart" ? "stop" : "service-stop");
        await request(major, action === "restart" ? "start" : "service-start");
      } else if (action === "copy-connection" || action === "service-port") {
        await request(major, action, parameter);
        if (action === "copy-connection") copyFeedback = i18n.text("\u590D\u5236\u6210\u529F");
      } else await request(major, action);
      await refresh();
    } catch (error) {
      await refresh();
      state.error = errorMessage(error);
    } finally {
      state.busy = false;
      render();
    }
  };
  const logViewRows = () => logBrowser.view(state.logs).rows;
  const serviceRunning = () => {
    var _a, _b, _c;
    return ["running", "starting"].includes((_c = (_b = (_a = state.snapshot) == null ? void 0 : _a.service) == null ? void 0 : _b.status) != null ? _c : "");
  };
  const bind = () => {
    dropdowns == null ? void 0 : dropdowns.bind();
    root.querySelectorAll("[data-locale]").forEach((button) => {
      button.disabled = state.busy;
      dom.on(button, "click", () => {
        const locale = button.dataset.locale;
        if (state.busy || locale !== "zh" && locale !== "en" || locale === i18n.locale) return;
        state.busy = true;
        render();
        void (async () => {
          try {
            await pending;
            if (disposed) return;
            await request(major, "set-language", locale);
            i18n.locale = locale;
            if (state.snapshot) state.snapshot.locale = locale;
            copyFeedback = "";
          } catch (error) {
            state.error = i18n.text("\u8BED\u8A00\u8BBE\u7F6E\u5931\u8D25") + ": " + errorMessage(error);
          } finally {
            state.busy = false;
            render();
          }
        })();
      });
    });
    root.querySelectorAll("[data-copy-log]").forEach((button) => {
      button.disabled = copying || button.dataset.copyLog === "all" && !state.logs.some((log) => log.level === "error");
      dom.on(button, "click", () => {
        if (copying) return;
        const rows = button.dataset.copyLog === "all" ? state.logs.filter((log) => log.level === "error") : logViewRows().filter((log) => log.level === "error" && String(log.sequence) === button.dataset.copyLog);
        if (!rows.length) {
          copyFeedback = i18n.text("\u6CA1\u6709\u53EF\u590D\u5236\u7684\u9519\u8BEF\u65E5\u5FD7");
          render();
          return;
        }
        copying = true;
        const text = rows.map((log) => JSON.stringify(log, null, 2)).join("\n");
        void request(major, "copy-log", text).then(() => {
          copyFeedback = i18n.text("\u590D\u5236\u6210\u529F");
        }, (error) => {
          copyFeedback = i18n.text("\u590D\u5236\u5931\u8D25") + ": " + errorMessage(error);
        }).finally(() => {
          copying = false;
          render();
        });
      });
    });
    root.querySelectorAll("[data-tab]").forEach((element) => dom.on(element, "click", () => {
      var _a;
      state.tab = (_a = element.dataset.tab) != null ? _a : "overview";
      render();
    }));
    root.querySelectorAll("[data-action]").forEach((button) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const action = button.dataset.action;
      const serviceStarting = ((_b = (_a = state.snapshot) == null ? void 0 : _a.service) == null ? void 0 : _b.status) === "starting" && (action == null ? void 0 : action.startsWith("service-")) === true;
      const connectionUnavailable = action === "service-port" && serviceRunning() || action === "copy-connection" && (state.connectionMode === "unified" && !((_e = (_d = (_c = state.snapshot) == null ? void 0 : _c.service) == null ? void 0 : _d.unifiedClient) == null ? void 0 : _e.installed) || state.connectionMode === "http" && (!((_g = (_f = state.snapshot) == null ? void 0 : _f.service) == null ? void 0 : _g.endpoint) || state.snapshot.service.status !== "running" || state.snapshot.service.shared === true)) || (action == null ? void 0 : action.startsWith("service-")) === true && ((_i = (_h = state.snapshot) == null ? void 0 : _h.service) == null ? void 0 : _i.managed) === false && serviceRunning();
      const stopUnavailable = action === "service-stop" && !serviceRunning() || action === "stop" && !state.selected;
      button.disabled = state.busy || (action === "extension-check" || action === "extension-update") && ((_k = (_j = state.snapshot) == null ? void 0 : _j.extension) == null ? void 0 : _k.checking) === true || action === "extension-update" && ((_m = (_l = state.snapshot) == null ? void 0 : _l.extension) == null ? void 0 : _m.updating) === true || serviceStarting || connectionUnavailable || stopUnavailable || !state.snapshot && action !== "refresh";
      dom.on(button, "click", () => {
        const action2 = button.dataset.action;
        if (action2 === "refresh") {
          if (state.tab === "logs") logBrowser.latest();
          void refresh();
        } else if (action2 === "extension-check" || action2 === "extension-update" || action2 === "start" || action2 === "stop" || action2 === "service-start" || action2 === "service-stop" || action2 === "restart" || action2 === "service-restart" || action2 === "copy-connection" || action2 === "service-port" || action2 === "authorize-project" || action2 === "revoke-project") void command(action2);
      });
    });
    root.querySelectorAll("[data-log-page]").forEach((button) => {
      dom.on(button, "click", () => {
        var _a;
        if (button.disabled) return;
        logBrowser.go(Number(button.dataset.logPage), state.logs);
        render();
        const nextButton = root.querySelector(`[data-log-page][aria-label="${button.getAttribute("aria-label")}"]:not(:disabled)`);
        if (nextButton) nextButton.focus();
        else (_a = root.querySelector("[data-log-page][aria-label]:not(:disabled)")) == null ? void 0 : _a.focus();
      });
    });
    const search = root.querySelector("[data-search]");
    dom.on(search, "compositionstart", () => {
      composing = true;
    });
    dom.on(search, "compositionend", () => {
      var _a;
      composing = false;
      state.query = (_a = search == null ? void 0 : search.value) != null ? _a : "";
      render();
    });
    dom.on(search, "input", () => {
      var _a;
      state.query = (_a = search == null ? void 0 : search.value) != null ? _a : "";
      render();
    });
  };
  const definition2 = {
    template: '<div id="cocos-mcp-control-center"></div>',
    $: { root: "#cocos-mcp-control-center" },
    style: panelStyle,
    async ready() {
      var _a;
      const element = major === 2 ? this.$root : (_a = this.$) == null ? void 0 : _a.root;
      if (!element) throw new Error(`Creator ${major} control center root element is unavailable`);
      root = element;
      dropdowns = new PanelDropdown(root, dom, (id, value) => {
        if (id === "connection-mode" && (value === "unified" || value === "stdio" || value === "http")) {
          state.connectionMode = value;
          connectionChosen = true;
          copyFeedback = "";
        } else if (id === "log-level") logBrowser.filter(value);
        else if (id === "log-size") logBrowser.resize(Number(value));
        render();
      }, render);
      render();
      await refresh();
      if (!disposed) timer = setInterval(() => {
        if (!state.busy && !root.ownerDocument.hidden && root.getClientRects().length > 0) void refresh();
      }, 5e3);
    },
    // Creator 2 的 close 返回 true 才允许关闭；Creator 3 忽略该返回值。
    close() {
      disposed = true;
      dropdowns == null ? void 0 : dropdowns.dispose();
      if (timer) clearInterval(timer);
      timer = void 0;
      return true;
    }
  };
  return definition2;
}

// extensions/creator3/src/panel.ts
var definition = createPanelDefinition(3);
module.exports = Editor.Panel.define ? Editor.Panel.define(definition) : definition;
//# sourceMappingURL=panel.cjs.map

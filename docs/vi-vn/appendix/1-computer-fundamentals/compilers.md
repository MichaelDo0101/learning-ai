# Nhập môn nguyên lý compiler

::: tip Mở đầu
**Khi bạn bấm "Run", code biến thành kết quả trên màn hình thế nào?** Mỗi dòng code bạn viết, máy "không hiểu" — chỉ hiểu 0 và 1. Compiler là "translator" biến ngôn ngữ người thành ngôn ngữ máy. Hiểu compiler giúp bạn hiểu error message từ đâu, sao có ngôn ngữ nhanh-chậm, và logic underlying của code optimization.
:::

**Bạn sẽ học**:
- **Global view**: pipeline compile từ source code tới executable
- **Lexical analysis**: compiler cắt code thành Token thế nào
- **Syntax analysis**: hiểu cách build AST
- **AST visualization**: thấy trực quan structure cây của code
- **Semantic analysis + optimization**: nguyên lý type check + optimize
- **Optimization techniques**: constant folding, dead code elimination, function inlining
- **Execution models**: Compiled vs Interpreted vs JIT

---

## 0. Toàn cảnh: "hành trình dịch" của code

Tưởng tượng bạn dịch 1 cuốn tiểu thuyết Trung sang Anh. Không dịch từng chữ, mà:

1. **Nhận diện từ** — tách câu thành từng từ (lexical analysis)
2. **Hiểu cú pháp** — judge câu structure đúng không (syntax analysis)
3. **Hiểu nghĩa** — đảm bảo nghĩa thông, không mâu thuẫn (semantic analysis)
4. **Mài giũa** — bản dịch idiomatic hơn (code optimization)
5. **Output bản dịch** — bản English cuối (code generation)

Compiler làm cùng thứ, chỉ dịch programming language.

<CompilerAnalogyDemo />

---

## 1. 6-step pipeline của compiler

<CompilerDemo />

::: tip Pipeline
1. **Lexical Analysis**: cắt source code thành Token
2. **Syntax Analysis**: organize Token thành AST
3. **Semantic Analysis**: check type đúng không, variable declared chưa
4. **IR Generation**: sinh intermediate representation (platform-independent)
5. **Optimization**: làm IR hiệu quả hơn
6. **Code Generation**: sinh machine code platform cụ thể
:::

| Stage | Input | Output | Ẩn dụ |
|------|------|------|------|
| Lexical | Char stream source | Token stream | Tách câu thành từ |
| Syntax | Token stream | AST | Phân tích structure câu |
| Semantic | AST | Typed AST | Check nghĩa thông không |
| IR | Typed AST | IR | Viết bản nháp |
| Optimize | IR | Optimized IR | Mài giũa, xoá |
| CodeGen | Optimized IR | Machine code | Output bản cuối |

---

## 2. Lexical analysis: cắt code thành "từ"

Bước đầu compile. Compiler scan source code từ trái sang phải, kết hợp char thành **Token** có nghĩa.

<LexerTokenDemo />

```python
# Source: x = 5 + 3
# Tokens:
# [IDENTIFIER 'x', ASSIGN '=', NUMBER '5', PLUS '+', NUMBER '3']
```

**Loại Token phổ biến**:
- **Keyword**: `if`, `else`, `for`, `function`
- **Identifier**: tên variable, function
- **Literal**: số, string
- **Operator**: `+`, `-`, `*`, `=`, `==`
- **Delimiter**: `(`, `)`, `{`, `}`, `;`

---

## 3. Syntax analysis: build AST

AST = **Abstract Syntax Tree** — biểu diễn cấu trúc cây của code.

```javascript
// x = 5 + 3 * 2
// AST:
//        Assign
//       /      \
//      x       Add
//             /   \
//            5    Mul
//                /   \
//               3     2
```

Multiplication có priority cao hơn add → trong tree, Mul nằm sâu hơn → được tính trước.

<AstDemo />

**Cách parse**:
- **Recursive descent**: viết tay, dễ hiểu
- **LL/LR parser**: auto-generated từ grammar (yacc, ANTLR)

---

## 4. Semantic analysis

Check ý nghĩa code, không chỉ syntax:
- Variable đã declare chưa?
- Type match không? (`int + string` = lỗi)
- Function tồn tại không?
- Scope đúng không?

```c
int x = "hello";  // ❌ Semantic error: type mismatch
```

Syntax OK, nhưng nghĩa sai. Compiler catch ở stage này.

---

## 5. Code optimization

Compiler thông minh không gen code naive. Optimize trước khi xuất.

### 5.1 Constant folding
```c
int x = 2 + 3;        // Biến thành
int x = 5;            // Không tính lúc runtime
```

### 5.2 Dead code elimination
```c
if (false) {
    do_something();   // Bị xoá — không bao giờ chạy
}
```

### 5.3 Loop invariant code motion
```c
for (int i = 0; i < n; i++) {
    int y = a * b;    // a, b không đổi trong loop
    arr[i] = y + i;
}

// Optimized:
int y = a * b;        // Move out of loop
for (int i = 0; i < n; i++) {
    arr[i] = y + i;
}
```

### 5.4 Function inlining
```c
int add(int a, int b) { return a + b; }
int x = add(2, 3);    // Inline → int x = 2 + 3;
```

### 5.5 Common subexpression elimination
```c
int a = x * y + 1;
int b = x * y + 2;    // x * y tính 2 lần

// Optimize:
int temp = x * y;
int a = temp + 1;
int b = temp + 2;
```

---

## 6. Compiled vs Interpreted vs JIT

| Model | Cách | Đại diện | Speed | Dev experience |
|---|---|---|---|---|
| **Compiled** | Translate hết → executable, chạy executable | C, C++, Go, Rust | Fastest | Phải re-compile khi sửa |
| **Interpreted** | Đọc + chạy từng dòng runtime | Python, Ruby, Bash | Slowest | Sửa là chạy ngay |
| **JIT (Just-In-Time)** | Interpret đầu, hotspot mới compile | Java, JavaScript (V8), C# | Trung-Nhanh | Cân bằng cả 2 |

### 6.1 JIT chi tiết

V8 (Chrome JavaScript engine):
1. Source code → AST
2. **Ignition** interpreter chạy AST
3. Track function nào "hot" (call nhiều lần)
4. **TurboFan** JIT compile hot function thành optimized machine code
5. Nếu assumption sai (type thay đổi), **deoptimize** quay về interpret

→ JS gốc rất chậm, nhưng V8 JIT làm nó nhanh gần native C trong nhiều case.

---

## 7. Compiler famous

| Compiler | Ngôn ngữ | Output |
|---|---|---|
| **GCC** | C, C++, Fortran | Native machine code |
| **Clang** | C, C++, Objective-C | LLVM IR → native |
| **LLVM** | Backend cho nhiều ngôn ngữ | Optimized IR + codegen |
| **MSVC** | C, C++ | Windows native |
| **Rustc** | Rust | LLVM-based |
| **Go compiler** | Go | Native, fast compile |
| **TypeScript** | TS → JS | Transpiler |
| **Babel** | Modern JS → older JS | Transpiler |
| **V8** | JavaScript | JIT to native |
| **HotSpot** | Java bytecode | JIT to native |

---

## 8. Tools liên quan

- **AST Explorer** (https://astexplorer.net): visualize AST của nhiều ngôn ngữ
- **Compiler Explorer / Godbolt** (https://godbolt.org): xem assembly compiler sinh ra
- **TreeSitter**: incremental parser, dùng trong nhiều editor (Neovim, Atom)

---

## 9. Compiler và bạn

Hiểu compiler giúp:
- **Đọc error message tốt hơn**: "Unexpected token", "Type mismatch" — biết stage nào báo
- **Write efficient code**: hiểu compiler optimize gì → đừng micro-optimize việc compiler đã làm
- **Choose language**: hiểu trade-off speed (compiled) vs convenience (interpreted) vs balance (JIT)
- **Build tooling**: linter, formatter, transpiler đều xài compiler tech

---

## 10. Tổng kết

Compiler = **translator** ngôn ngữ người sang ngôn ngữ máy. 6-stage pipeline:
1. Lex → Token
2. Parse → AST
3. Semantic check
4. IR generation
5. Optimization
6. Code generation

Modern compiler (LLVM-based) modular, reusable. JIT làm dynamic language fast.

::: tip 2026 Update
- **WebAssembly (WASM)**: portable binary format, near-native speed
- **MLIR** (Multi-Level IR): infrastructure compiler mới của LLVM project
- **Rust borrow checker**: compiler-time memory safety
- **AI-assisted compiler**: optimization decision learn từ codebase
- **eBPF**: compile/run sandboxed code trong Linux kernel
- **VN dev**: hiểu V8/Node compilation = optimize được JS performance, hiểu Babel = setup transpile đúng cho project
:::

## Tài liệu

- [Crafting Interpreters (Robert Nystrom)](https://craftinginterpreters.com/) - best free book
- [LLVM Tutorial](https://llvm.org/docs/tutorial/) - build compiler với LLVM
- [Compiler Explorer](https://godbolt.org/) - try compilers online
- [AST Explorer](https://astexplorer.net/) - visualize AST
- [Dragon Book (Aho)](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools) - kinh điển

# Nhập môn tư duy giải thuật

::: tip Mở đầu
**Cách giải vấn đề hiệu quả?** Bạn có thể bối rối: cùng 1 vấn đề, có code chạy vài giây xong, có code chạy vài phút vẫn quay. Khác biệt thường ở algorithm.
:::

**Bạn sẽ học**:
- Năng lực decompose vấn đề: gặp vấn đề phức tạp, nghĩ ngay tới divide & conquer, recursion
- Năng lực phán đoán efficiency: dùng Big O so 2 solution, không đoán mò
- Tư duy complexity: trước code estimate data scale + time requirement, chọn algorithm level phù hợp
- Nền học tiếp: advanced data structure, distributed system, ML

| Chương | Nội dung |
|-----|------|
| **1** | Binary Search |
| **2** | Sort algorithm |
| **3** | Complexity analysis |
| **4** | Recursion + Divide & Conquer |
| **5** | Greedy + DP |

---

## 0. Toàn cảnh: algorithm là gì?

Tìm 1 từ trong từ điển:
- **Cách 1**: từ trang 1 lật từng trang (linear search)
- **Cách 2**: theo chữ đầu xác định vị trí, rồi binary search

Cả 2 tìm được, nhưng hiệu quả khác hẳn. **Algorithm = phương pháp giải vấn đề**.

<AlgorithmDemo />

**Chỉ số core**:

| Chỉ số | Nghĩa | Sao quan trọng |
|------|------|-----------|
| **Time complexity** | Trend thời gian run theo data size | Predict performance ở scale lớn |
| **Space complexity** | Trend memory theo data size | Đánh giá memory |
| **Correctness** | Có luôn cho kết quả đúng | Yêu cầu cơ bản |

::: tip Đọc table này
- **Time**: dùng Big O. O(n) nghĩa data ×2, time ×2; O(n²) nghĩa data ×2, time ×4
- **Space**: Big O. Có algorithm trade space cho time (hash table), có cái trade time cho space (compression)
- **Correctness**: phải đúng với mọi input. Edge case (input rỗng, cực lớn) dễ sai nhất
:::

---

## 1. Binary Search: mỗi lần loại nửa

### 1.1 Nguyên lý

::: tip 💡 Binary Search hoạt động thế nào?
**Tiền đề**: data phải sorted

**Process**:
1. Tìm element giữa
2. Nếu giữa = target → tìm thấy!
3. Nếu target < giữa → tìm nửa trái
4. Nếu target > giữa → tìm nửa phải
5. Mỗi lần loại nửa, tới khi tìm được hoặc xác định không tồn tại

**Time complexity**: O(log n)

**Ẩn dụ**: game đoán số. Tôi nghĩ số 1-100, bạn mỗi lần đoán giữa, tôi báo lớn/nhỏ. Tối đa 7 lần đoán được (2⁷ = 128 > 100).
:::

<SearchAlgorithmDemo />

### 1.2 Sao Binary Search nhanh?

| Data size | Linear search | Binary search |
|--------|---------|---------|
| 100 | 100 lần | 7 lần |
| 1,000 | 1,000 lần | 10 lần |
| 1,000,000 | 1,000,000 lần | 20 lần |
| 1,000,000,000 | 1B lần | 30 lần |

::: tip Sức mạnh logarit
Binary search O(log n) nghĩa:
- 1 tỉ data, max 30 lần
- 1000 tỉ data, max 40 lần

Đây là lý do Google search được hàng tỉ web trong mili-giây.
:::

### 1.3 Implementation

```python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # Not found
```

---

## 2. Sort algorithm

Sort là 1 trong các operation cơ bản nhất.

### 2.1 Bubble Sort: O(n²) — slow nhưng dễ hiểu

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

So sánh và swap từng đôi adjacent. Element lớn nhất "nổi" lên cuối mỗi pass.

### 2.2 Quick Sort: O(n log n) average

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

Chọn pivot, chia thành 3 phần (< pivot, = pivot, > pivot), recursive sort. Average O(n log n), worst O(n²).

### 2.3 Merge Sort: O(n log n) guaranteed

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

Chia đôi, sort đệ quy, merge. Always O(n log n) but tốn O(n) space.

<SortingAlgorithmDemo />

### 2.4 So sánh sort algorithm

| Algorithm | Time avg | Time worst | Space | Stable |
|---|---|---|---|---|
| Bubble | O(n²) | O(n²) | O(1) | ✅ |
| Selection | O(n²) | O(n²) | O(1) | ❌ |
| Insertion | O(n²) | O(n²) | O(1) | ✅ |
| Merge | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap | O(n log n) | O(n log n) | O(1) | ❌ |
| Counting | O(n+k) | O(n+k) | O(k) | ✅ |
| Radix | O(nk) | O(nk) | O(n+k) | ✅ |

**Khi nào dùng**:
- Generic: **Quick sort** (built-in C++, Java)
- Stable + worst-case guarantee: **Merge sort** (Java Arrays.sort for objects)
- Tiny array (<10): **Insertion sort**
- Integer range nhỏ: **Counting/Radix sort**

---

## 3. Complexity analysis: Big O

Big O mô tả **trend tăng** khi input size n tới infinity.

| Notation | Tên | Ví dụ algorithm |
|---|---|---|
| **O(1)** | Constant | Hash lookup, array access |
| **O(log n)** | Logarithmic | Binary search |
| **O(n)** | Linear | Linear search, loop 1 lần |
| **O(n log n)** | Linearithmic | Merge sort, Quick sort avg |
| **O(n²)** | Quadratic | Bubble sort, nested loop |
| **O(n³)** | Cubic | Triple nested loop, matrix multiply naive |
| **O(2ⁿ)** | Exponential | Recursive Fibonacci, brute force subset |
| **O(n!)** | Factorial | Traveling salesman brute force |

### 3.1 Quy tắc đơn giản hoá

1. **Drop constants**: O(2n) = O(n)
2. **Drop lower-order terms**: O(n² + n) = O(n²)
3. **Different inputs, different variables**: O(a + b) ≠ O(n)

### 3.2 Estimate practical

Cho 1 giây run-time (CPU modern):
- O(n²) handle ~10⁴ element
- O(n log n) handle ~10⁷
- O(n) handle ~10⁸
- O(log n) handle ~10¹⁸

Nếu input n = 1 triệu, algorithm O(n²) sẽ chạy ~12 ngày. Algorithm O(n log n) ~0.02 giây.

**Lesson**: chọn algorithm đúng quan trọng hơn micro-optimize.

---

## 4. Recursion + Divide & Conquer

### 4.1 Recursion

Function gọi chính nó.

```python
def factorial(n):
    if n == 0:           # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
```

3 phần bắt buộc:
1. **Base case**: điều kiện dừng
2. **Recursive case**: gọi chính nó với input nhỏ hơn
3. **Tiến về base case**: mỗi lần đệ quy phải gần base case hơn

### 4.2 Divide & Conquer

Pattern:
1. **Divide**: chia vấn đề thành sub-problem nhỏ hơn
2. **Conquer**: giải đệ quy sub-problem
3. **Combine**: gộp kết quả

Ví dụ: Merge sort, Quick sort, Binary search, FFT, Karatsuba multiplication.

```python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])      # Divide + conquer
    right = merge_sort(arr[mid:])     # Divide + conquer
    return merge(left, right)         # Combine
```

---

## 5. Greedy + Dynamic Programming

### 5.1 Greedy

Mỗi step chọn lựa chọn tốt nhất hiện tại (local optimum).

**Khi work**: vấn đề có "greedy choice property" — local optimum dẫn tới global optimum.

Ví dụ:
- Activity selection
- Huffman coding
- Dijkstra shortest path

### 5.2 Dynamic Programming (DP)

Chia thành subproblem overlap → store result tránh tính lại.

**2 cách**:
- **Top-down**: recursion + memoization
- **Bottom-up**: build table từ base case

```python
# Fibonacci - DP
def fib(n):
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

So với recursion naive: O(2ⁿ) → O(n) — speedup khổng lồ.

**Ví dụ DP classic**:
- Knapsack
- Longest Common Subsequence
- Edit distance (Levenshtein)
- Coin change
- Stock trading

---

## 6. Paradigm khác

### Backtracking
Thử mọi lựa chọn, quay lại khi sai. Ví dụ: N-Queens, Sudoku, permutation.

### Branch and Bound
Như backtracking nhưng cắt sớm khi biết nhánh không tốt.

### Randomized
Dùng random để get expected good performance. Ví dụ: Quick sort with random pivot, Monte Carlo, Las Vegas.

### Approximation
Cho NP-hard problem, chấp nhận solution gần optimal trong thời gian polynomial.

---

## 7. Algorithm trong AI/ML

- **Gradient descent**: optimize weights neural network
- **Backpropagation**: compute gradient hiệu quả
- **Beam search**: gen text với multiple candidate
- **MCTS** (Monte Carlo Tree Search): AlphaGo
- **A***: pathfinding game
- **K-means**: clustering
- **Random forest**: ensemble decision trees

---

## 8. Roadmap học

**Tuần 1-2**: Big O, array, linked list basics
**Tuần 3-4**: Stack, queue, hash table
**Tháng 2**: Tree, BST, traversal
**Tháng 3**: Graph, BFS/DFS, shortest path
**Tháng 4**: Sort, search, divide & conquer
**Tháng 5**: Recursion, backtracking
**Tháng 6**: DP, greedy
**Practice**: LeetCode 200-500 problem trong 6 tháng

---

## 9. Tổng kết

| Skill | Mô tả |
|---|---|
| **Decompose** | Chia vấn đề lớn thành nhỏ |
| **Pattern recognition** | Nhận biết "đây là DP", "đây là graph" |
| **Big O thinking** | Estimate complexity trước code |
| **Trade-off** | Space vs time, simple vs fast |

::: tip 2026 Update
- **AI-assisted algorithm**: Claude/GPT giúp brainstorm approach, optimize complexity
- **Interview thay đổi**: nhiều công ty test system design hơn DP/leetcode
- **Production reality**: hầu hết code dùng built-in (Quick sort, hash map), không tự implement
- **Vẫn quan trọng**: hiểu Big O để chọn architecture đúng, debug performance
- **VN dev**: practice LeetCode Easy/Medium cho phỏng vấn FAANG, Hard cho competitive programming
:::

## Tài liệu

- [LeetCode](https://leetcode.com/) - practice problems
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Algorithm Visualizations](https://visualgo.net/)
- [CLRS textbook](https://mitpress.mit.edu/9780262046305/)
- [Algorithm Design Manual - Skiena](http://www.algorist.com/)

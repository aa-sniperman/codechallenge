# Problem 4: Sum to N

This folder contains three different implementations of the `sum_to_n` problem.

The goal is to calculate the sum of all integers from `1` to `n`.

Example:

```text
sum_to_n(5) = 1 + 2 + 3 + 4 + 5 = 15
```

## Implementations

### 1. For Loop

File: `for-loop.ts`

This approach iterates from `1` to `n` and keeps a running total.

- Time complexity: `O(n)`
- Space complexity: `O(1)`

### 2. Recursion

File: `recursion.ts`

This approach defines the result as:

```text
sum_to_n(n) = n + sum_to_n(n - 1)
```

with a base case for small values such as `0` or `1`.

- Time complexity: `O(n)`
- Space complexity: `O(n)` because of the call stack

### 3. Math Formula

File: `math-formula.ts`

This approach uses the arithmetic series formula:

```text
n * (n + 1) / 2
```

- Time complexity: `O(1)`
- Space complexity: `O(1)`

## How to Run

Run the commands from inside the `problem-4` directory.

### Run each implementation

```bash
yarn problem-4:a 10
yarn problem-4:b 10
yarn problem-4:c 10
```

Each command takes an optional number argument.

If no argument is provided, the scripts use `5` by default.

Examples:

```bash
yarn problem-4:a
yarn problem-4:b
yarn problem-4:c
```

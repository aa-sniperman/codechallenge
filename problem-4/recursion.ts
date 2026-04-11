function sum_to_n_b(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw Error("Input must be a non-negative integer");
    }

    if (n <= 1) {
        return n;
    }

    return n + sum_to_n_b(n - 1);
}

const input = Number(process.argv[2] ?? 5);
if (!Number.isInteger(input)) {
    throw Error("Input must be an integer");
}

console.log(sum_to_n_b(input));

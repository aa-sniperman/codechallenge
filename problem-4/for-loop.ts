function sum_to_n_a(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw Error("Input must be a non-negative integer");
    }

    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
}

const input = Number(process.argv[2] ?? 5);
if (!Number.isInteger(input)) {
    throw Error("Input must be an integer");
}

console.log(sum_to_n_a(input));

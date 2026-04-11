function sum_to_n_c(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw Error("Input must be a non-negative integer");
    }

    return (n * (n + 1)) / 2;
}

const input = Number(process.argv[2] ?? 5);
if (!Number.isInteger(input)) {
    throw Error("Input must be an integer");
}

console.log(sum_to_n_c(input));

export function assertUnreachable(msg?: string): never {
  throw new Error(msg || 'assert unreachable')
}
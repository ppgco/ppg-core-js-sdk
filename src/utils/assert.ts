export function assert(resolution: boolean | number | string, msg?: string) {
  if (!resolution) {
    throw new Error(msg || 'assert not pass')
  }
}
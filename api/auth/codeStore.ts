export type CodeRecord = { code: string; expiresAt: number };

const globalRef = globalThis as unknown as {
  __eatEasyCodeStore?: Map<string, CodeRecord>;
};
export const codeStore: Map<string, CodeRecord> =
  globalRef.__eatEasyCodeStore ??
  (globalRef.__eatEasyCodeStore = new Map<string, CodeRecord>());

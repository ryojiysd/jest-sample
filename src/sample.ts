export const sum = (a: number, b: number): number => a + b;
export const sumAsync = async (a: number, b: number): Promise<number> => a + b;

export const throwError = (): void => {throw new Error('error')};
export const throwErrorAsync = async (): Promise<void> => {await sleep(); throw new Error('error')};

const sleep = async (): Promise<void> => await new Promise(resolve => setTimeout(resolve, 500));

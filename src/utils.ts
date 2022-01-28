export const isOutOfScreen = (width: number, height: number, x: number, y: number): { isOutOfScreenOnX: boolean, isOutOfScreenOnY: boolean } => {
  const { innerWidth, innerHeight } = window;

  return {
    isOutOfScreenOnX: width + x > innerWidth,
    isOutOfScreenOnY: height + y > innerHeight,
  };
};

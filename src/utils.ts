export const isOutOfScreen = (width: number, height: number, x: number, y: number): { isOutOfScreenOnX: boolean, isOutOfScreenOnY: boolean } => {
  const { innerWidth, innerHeight } = window;

  return {
    isOutOfScreenOnX: width + x > innerWidth,
    isOutOfScreenOnY: height + y > innerHeight,
  };
};

export const isTopEnough = (wrapperHeight: number, parentHeight: number, height: number, yPostition: number): boolean => {
  return ((wrapperHeight - parentHeight) / 2 + yPostition) > height;
}

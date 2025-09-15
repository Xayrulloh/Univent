export const getCleanPath = (pathname: string) => {
  return pathname.replace(/^\/(ru|uz|en)(\/|$)/, '/');
};
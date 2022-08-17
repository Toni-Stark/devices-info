export const RegSharePath = (path): string | undefined => {
  if (path) {
    let startIndex = path?.indexOf('http');
    let event = path?.slice(startIndex, path.length);
    let endIndex = event?.indexOf(' ');
    return event?.slice(0, endIndex);
  }
};

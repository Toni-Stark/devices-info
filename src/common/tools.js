export const RegSharePath = (path): string | undefined => {
  if (path) {
    let startIndex = path?.indexOf('http');
    let event = path?.slice(startIndex, path.length);
    let endIndex = event?.indexOf(' ');
    return event?.slice(0, endIndex);
  }
};

let timer = null;
export const throttle = (callback, time = 1000) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
    timer = null;
  }, time);
};

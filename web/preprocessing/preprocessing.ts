import Image, { ThresholdAlgorithm } from "image-js";

/*
 * GOOD treshold algorithms
 * "li"
 *
 *
 */

/**
 * @typedef {('huang'|'intermodes'|'isodata'|'li'|'maxentropy'|'mean'|'minerror'|'minimum'|'moments'|'otsu'|'percentile'|'renyientropy'|'shanbhag'|'triangle'|'yen')} ThresholdAlgorithm
 */

export const preProcessImg = (canvas: HTMLCanvasElement) => {
  const image = Image.fromCanvas(canvas);

  const gaussian = image
    .crop({ x: 225, y: 175, width: 200, height: 100 })
    .grey()
    .gaussianFilter({ radius: 4 })
    .dilate({ iterations: 1 })
    .erode({ iterations: 1 })
    .mask({ algorithm: "otsu" as ThresholdAlgorithm, threshold: 0.5 });
  //@ts-ignore

  //thresholdFilter(gaussian.data, 0.4);
  return gaussian;
};

function thresholdFilter(pixels: any, level: any) {
  if (level === undefined) {
    level = 0.5;
  }
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];

    const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    let value;
    if (gray >= thresh) {
      value = 255;
    } else {
      value = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
  }
}

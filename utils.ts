export const makeImgPath = (img: string, width: string = 'original') =>
  `https://image.tmdb.org/t/p/${width}${img}`;

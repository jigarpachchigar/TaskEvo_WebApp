export const pxToEm = (pixel, fSize = 14) => {
	return `${(pixel / fSize) * 1}em`;
};

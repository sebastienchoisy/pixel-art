export default class BoardModel {
  constructor(linesNb, colsNb, creationDate, endDate, pixels, userId) {
    this.linesNb = linesNb;
    this.colsNb = colsNb;
    this.creationDate = creationDate;
    this.endDate = endDate;
    this.pixels = pixels;
    this.userId = userId;
  }
}

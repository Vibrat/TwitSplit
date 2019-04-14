/**
 * Message Chunker
 * handler for message splitter and decoration
 *
 */
export class MessageChunker {
  public ERROR_WORD_EXCEED_50 =
    "ERROR: Hey i know you're excited, but make sure to type a word less than 50 charaters.";

  public splitMessage(message: string) {
    const max_length = 50;
    let chunkMessages = [];

    if (this._hasError(message)) {
      return [this.ERROR_WORD_EXCEED_50];
    }

    // Add  whitespace to the beginning of string to standardize pattern
    if (message.indexOf(" ") != 0) {
      message = ` ${message}`;
    }

    // Step 1: Detect BatchSize by message_length
    let batchSize = this._calculateBatch(message.length, max_length);
    for (let i = 1; i <= batchSize; i++) {
      chunkMessages.push(message.slice((i - 1) * max_length, i * max_length));
    }

    // Step 2: Detect BatchSize by WhiteSpace
    let newBatchSize = this._calculateBatchByWhiteSpace(
      chunkMessages,
      max_length
    );

    // Step 3: Start chunking messages
    let start = 0;
    let end = max_length;
    chunkMessages = [];
    for (let i = 1; i <= newBatchSize; i++) {
      const indicator = `${i}/${newBatchSize}`;
      const findLength = max_length - indicator.length;

      start = i == 1 ? 0 : end;
      end = message.lastIndexOf(" ", findLength + start);

      chunkMessages.push(
        indicator +
          (i != newBatchSize
            ? message.slice(start, end)
            : message.slice(start, message.length))
      );
    }

    return chunkMessages;
  }

  private _calculateBatchByWhiteSpace(chunkMessages: string[], batch: number) {
    let poolSize = chunkMessages.reduce(
      (total: number, message: string) => total + message.length,
      0
    );

    return this._recursiveLearningBatchSize(
      poolSize,
      chunkMessages.length,
      batch
    );
  }

  private _recursiveLearningBatchSize(
    poolSize: number,
    variations: number,
    batch: number,
    accumulativeGap = 0
  ) {
    let gap = 0;

    for (let i = 1; i <= variations; i++) {
      gap += `${i}/${variations}`.length;
    }

    let newBatchSize = Math.ceil((poolSize + gap) / batch);

    if ((gap - accumulativeGap) / batch <= 1) {
      return newBatchSize;
    } else {
      return this._recursiveLearningBatchSize(
        poolSize + gap,
        variations + 1,
        batch,
        gap
      );
    }
  }

  private _calculateBatch(dataLength: number, batch: number) {
    let batchSize = Math.ceil(dataLength / batch);
    let poolSizeGap = 0;
    for (let n = 1; n <= batchSize.toString().length; n++) {
      if (n != batchSize.toString().length) {
        poolSizeGap += 9 * 10 ** (n - 1) * n;
      } else {
        poolSizeGap +=
          (batchSize + 1 - 10 ** (batchSize.toString().length - 1)) *
          batchSize.toString().length;
      }
    }

    poolSizeGap += batchSize + batchSize.toString().length * batchSize;
    return Math.ceil((dataLength + poolSizeGap) / batch);
  }

  private _hasError(message: string) {
    // Search for string that has more than 50 charaters
    const validator = /^.*\s*(\w{50,})\s*.*$/g;
    return validator.test(message);
  }
}

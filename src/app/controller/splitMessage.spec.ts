import { MessageChunker } from "./splitMessage";

describe('Test: controller/splitMessage', () => {
    let messageChunker = new MessageChunker();
    let mockMessage = 'I can\'t believe Tweeter now supports chunking my messages, so I don\'t have to do it myself.';
    
    it("Should have error message", () => {
        expect(messageChunker.ERROR_WORD_EXCEED_50).toBeDefined();
    });

    it(`Should chunk message into two parts: ${mockMessage}`, () => {
        const messages = messageChunker.splitMessage(mockMessage);
        expect(messages.length).toEqual(2);
        expect(messages[0]).toEqual('1/2 I can\'t believe Tweeter now supports chunking');
        expect(messages[1]).toEqual('2/2 my messages, so I don\'t have to do it myself.');
    })
});
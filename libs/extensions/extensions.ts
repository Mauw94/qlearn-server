declare global {
    interface Array<T> {
        shuffle(): T[];
    }
}

Array.prototype.shuffle = function () {
    const shuffledArray = [...this];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

export { };
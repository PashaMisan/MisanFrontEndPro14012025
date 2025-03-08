function makeCachedCall(callbackFn) {
    const cacheStore = [];

    return function (phoneNumber) {
        let cacheItem = cacheStore.find(function (item) {
            return item.phoneNumber === phoneNumber;
        });

        if (!cacheItem) {
            cacheItem = {
                phoneNumber: phoneNumber,
                response: callbackFn(phoneNumber)
            };

            cacheStore.unshift(cacheItem);
            cacheStore.splice(10);
        }

        return cacheItem.response;
    };
}

const makeCall = makeCachedCall(function (phoneNumber) {
    const callResult = Math.floor(Math.random() * 2) ? 'успішний' : 'не успішний';

    return `Дзвінок за номером ${phoneNumber} ${callResult}!`;
});

console.log(makeCall("+380500000000"));
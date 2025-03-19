const emojiVotes = [
    {emoji: "😀", votes: 0},
    {emoji: "😅", votes: 0},
    {emoji: "😾", votes: 0},
    {emoji: "😢", votes: 0},
    {emoji: "🤬", votes: 0}
];
const voteContainer = document.getElementById('vote-container');

function render(emojiVotes, voteContainer) {
    emojiVotes.forEach((item) => {
        const voteItemContainer = document.createElement('div');
        const emojiContainer = document.createElement('div');
        const counterContainer = document.createElement('div');

        emojiContainer.classList.add('emoji-container');
        emojiContainer.innerText = item.emoji;
        emojiContainer.onclick = () => {
            item.votes++;
            counterContainer.innerText = item.votes;
        }

        counterContainer.classList.add('counter-container');
        counterContainer.innerText = item.votes;

        voteItemContainer.classList.add('text-center')
        voteItemContainer.appendChild(emojiContainer);
        voteItemContainer.appendChild(counterContainer);

        voteContainer.appendChild(voteItemContainer);
    });
}

render(emojiVotes, voteContainer);


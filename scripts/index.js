'use strict';

const templates = {
    cardFirst: qs('#card-first').innerText.trim(),
    cardSecond: qs('#card-second').innerText.trim(),
    cardThird: qs('#card-third').innerText.trim(),
    cardFourth: qs('#card-fourth').innerText.trim()
};

const feed = qs('.feed');

data.forEach((item) => {
    let temp;

    if (!item.hasOwnProperty('image')) {

        temp = templates.cardThird;
    } else if (item.hasOwnProperty('description')) {
        temp = item.size === 'l' ? templates.cardFourth : templates.cardFirst;
    } else {
        temp = templates.cardSecond;
    }

    feed.innerHTML += genCodeWithData(temp, item);
});

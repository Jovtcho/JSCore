function printPlayingArtist(paramsArr) {
    let trackName = paramsArr[0];
    let artistName = paramsArr[1];
    let trackDuration = paramsArr[2];

    return `Now Playing: ${artistName} - ${trackName} [${trackDuration}]`;
}

console.log(printPlayingArtist(['Number One', 'Nelly', '4:09']));
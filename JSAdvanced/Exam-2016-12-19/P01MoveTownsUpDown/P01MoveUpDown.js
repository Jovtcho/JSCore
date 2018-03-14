function move(direction) {
    let towns = $('#towns');
    let selectedTown = towns.find(':selected');
    if (direction === -1) {
        selectedTown.insertBefore(selectedTown.prev());
    } else if (direction === 1) {
        selectedTown.insertAfter(selectedTown.next());
    }
}
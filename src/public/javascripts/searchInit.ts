const searchTextBox = <HTMLInputElement>document.getElementById('searchInput');
window.onload = function () {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('q')) {
        searchTextBox.focus();
        // @ts-ignore
        searchTextBox.value = urlParams.get('q');
    }
}
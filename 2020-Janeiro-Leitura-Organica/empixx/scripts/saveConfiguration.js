const selects = document.querySelectorAll("select");

selects.forEach(select => {
  getConfiguration(select);

  select.addEventListener("change", event => {
    const value = select.options[select.selectedIndex].value;
    saveOnLocalStorage(select.name, value);
    setConfiguration();
  });
});

function saveOnLocalStorage(index, value) {
  window.localStorage.setItem(index, value);
}

function getConfiguration(select) {
  const item = window.localStorage.getItem(select.name);
  select.value = item ? item : select.options[0].value;
}

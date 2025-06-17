window.addEventListener('load', function () {
    document.querySelector('#search-input').addEventListener('input', filterList)
  
    function filterList() {
      const searchInput = document.querySelector('#search-input')
      const filter = searchInput.value.toLowerCase()
      const listItems = document.querySelectorAll('.list-group-item')
  
      listItems.forEach((item) => {
        let text = item.textContent;
        if (text.toLowerCase().includes(filter.toLowerCase())) {
          item.style.display = '';
        }
        else {
          item.style.display = 'none';
        }
      })
    }
    document.querySelector('#clearFilter').addEventListener('click', e => {
      const listItems = document.querySelectorAll('.list-group-item')
      listItems.forEach((item) => {
        item.style.display = '';
      })
    })
  })
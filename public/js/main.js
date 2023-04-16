// Get the button element
const myButton = document.getElementById("addAlbumBtn");

// Add a click event listener to the button
myButton.addEventListener("click", function() {
  // Redirect to another route
  window.location.href = "/api/albums";
});

function fetchAlbums(tableId) {
  // Fetch data from API
  fetch('http://localhost:3000/api/albums')
    .then(response => response.json())
    .then(albums => {
      // Get table element by ID
      const table = document.getElementById(tableId);
      
      // Create table header row with column headers
      const headerRow = table.insertRow();
      const titleHeader = headerRow.insertCell(0);
      titleHeader.innerText = 'Title';
      const artistHeader = headerRow.insertCell(1);
      artistHeader.innerText = 'Artist';
      const yearHeader = headerRow.insertCell(2);
      yearHeader.innerText = 'Year';
      const actionsHeader = headerRow.insertCell(3);
      actionsHeader.innerText = 'Actions';
      
      // Loop through albums and create table rows with album data and action buttons
      albums.forEach(album => {
        const row = table.insertRow();
        
        // Create cell for album title
        const titleCell = row.insertCell(0);
        titleCell.innerText = album.title;
        
        // Create cell for album artist
        const artistCell = row.insertCell(1);
        artistCell.innerText = album.artist;
        
        // Create cell for album year
        const yearCell = row.insertCell(2);
        yearCell.innerText = album.year;
        
        // Create cell for action buttons
        const actionsCell = row.insertCell(3);
        
        // Create update button
        const updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', () => {
          // Implement update functionality here
        });
        actionsCell.appendChild(updateButton);
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
          // Implement delete functionality here
          table.deleteRow(row.rowIndex);
        });
        actionsCell.appendChild(deleteButton);
        
        // Create details button
        const detailsButton = document.createElement('button');
        detailsButton.innerText = 'Details';
        detailsButton.addEventListener('click', () => {
          // Implement details functionality here
        });
        actionsCell.appendChild(detailsButton);
      });
    })
    .catch(error => console.error(error));
}

fetchAlbums("album-table")

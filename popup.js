document.addEventListener('DOMContentLoaded', function(domLoadEvent) {
    let me = this,
        jsonBinBtn = document.getElementById("jsonBinBtn"),
        exportListBtn = document.getElementById("exportListBtn"),
        importListBtn = document.getElementById("importListBtn"),
        showMoviesBtn = document.getElementById("showMoviesBtn"),
        clearListButton = document.getElementById("clearListBtn"),
        searchButton = document.getElementById("searchBtn");

    jsonBinBtn.addEventListener('click', event => onJsonBin(event));
    importListBtn.addEventListener('click', event => onImportList(event));
    exportListBtn.addEventListener('click', event => onExportList(event));
    showMoviesBtn.addEventListener('click', event => onShowMovies(event));
    clearListButton.addEventListener('click', event => onClearList(event));
    searchButton.addEventListener("click", event => onSearchMovies(event));

    function onJsonBin (event) {
        event.preventDefault();

        let getExitLocalItems = localStorage.getItem('movieCollector'),
            existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems),
            ul = document.getElementById("searchResult");

            if (!!existMovies) {
                ul.innerHTML =  `
                    <iframe style="overflow-y: auto; -webkit-overflow-scrolling: touch; display:block; vertical-align:top;" src="https://jsonbin.io/${existMovies.hasBin}"></iframe>
                    <small>Go to your Movie Bin <a href="https://jsonbin.io/${existMovies.hasBin}" target="_blank">BIN</a>.
                `;
            } else {
                ul.innerHTML = `
                <strong>No saved movies yet!</strong> <br/><br/>
                Please firstly search and add movies to your list, <br/> 
                then export your list.<br/><br/>
                Once your list exported, then you can display your Movie BIN.
             `;
            }


    }

    function onImportList (event) {
        event.preventDefault();

        let getExitLocalItems = localStorage.getItem('movieCollector'),
        existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems),
        ul = document.getElementById("searchResult");

        if (!!existMovies) {
            let existBindID = existMovies.hasBin && existMovies.hasBin,
                req = new XMLHttpRequest();

            if (!!existBindID) {
                req.onreadystatechange = () => {
                    if (req.readyState == XMLHttpRequest.DONE) {
                        let response = JSON.parse(req.responseText)

                        if (!!response) {
                            Object.assign(existMovies, response);
                            localStorage.setItem('movieCollector', JSON.stringify(existMovies));


                            ul.innerHTML =  `
                                <strong>Your Local Movie List has been updated! </strong><br/> 
                                Your BIN always reachable with 'BIN' button above!
                                <br/ > <br/ >
                                Updated List will display on here in 8 seconds...`;
                            setTimeout(() => {
                                onShowMovies(event);
                            }, 8000);
                        } else {
                            ul.innerHTML = response.message
                        }
                    }
                };

                    req.open("GET", `https://api.jsonbin.io/b/${existBindID}/latest`, true);
                    req.setRequestHeader("secret-key", "$2b$10$CC5Hg0I0rC54.5eoBo6ukuHVCzbhBarZradONopaiiw11XziXsmdi");
                    req.send();
            } else {
                ul.innerHTML = `
                <strong>No saved movies yet!</strong> <br/><br/>
                Please firstly search and add movies to your list, <br/> 
                then export your list. <br/><br/>
                Once your list exported, then you can import.
             `;
            }
        } else {
            ul.innerHTML = `
                <strong>No saved movies yet!</strong> <br/><br/>
                Please firstly search and add movies to your list, <br/> 
                then export your list. <br/><br/>
                Once your list exported, then you can import.
             `;
        }
    }

    function onExportList (event) {
        event.preventDefault();

        let getExitLocalItems = localStorage.getItem('movieCollector'),
            existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems),
            ul = document.getElementById("searchResult");

        if (!!existMovies) {
            let existBindID = existMovies.hasBin && existMovies.hasBin;
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    let response = JSON.parse(req.responseText)

                    if (response.success) {

                        Object.assign(existMovies, {
                            hasBin: response.parentId || response.id
                        });

                        localStorage.setItem('movieCollector', JSON.stringify(existMovies));

                        ul.innerHTML =  `
                            <strong>Your Movie BIN has been updated! </strong><br/> 
                            Your BIN always reachable with 'BIN' button above!
                            <br/ > <br/ >
                            Updated List will display on here in 8 seconds...`;

                        setTimeout(() => {
                            onShowMovies(event);
                        }, 8000);
                    } else {
                        ul.innerHTML = response.message
                    }
                }
            };

            if (!!existBindID) {
                req.open("PUT", `https://api.jsonbin.io/b/${existBindID}`, true);
                delete existMovies.hasBin
            } else {
                req.open("POST", "https://api.jsonbin.io/b", true);
            }

            req.setRequestHeader("private", "false");
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("secret-key", "$2b$10$CC5Hg0I0rC54.5eoBo6ukuHVCzbhBarZradONopaiiw11XziXsmdi");
            req.send(JSON.stringify(existMovies));
        } else {
            ul.innerHTML = `
                <strong>No saved movies yet!</strong> <br/><br/>
                Please firstly search and add movies to your list, <br/> 
                then export your list.
             `;
        }
    }

    function onClearList (event) {
        event.preventDefault();
        let ul = document.getElementById("searchResult");
        ul.innerHTML = "";
    }

    function onShowMovies (event) {
        event.preventDefault();

        let getExitLocalItems = localStorage.getItem('movieCollector'),
            existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems),
            ul = document.getElementById("searchResult");


        if (!!existMovies) {
            let size = Object.keys(existMovies).length;

            if (size <= 1 && !!existMovies.hasBin) {
                ul.innerHTML = `
                    <strong>No saved movies yet!</strong> <br/><br/>
                    Please firstly use Search and add movies to your list.
            `;
            } else {
                ul.innerHTML = "";

                Object.entries(existMovies).forEach(movie => {
                    if (movie[0] !== "hasBin") {
                        let savedMovie = movie[1],
                            li = document.createElement("li");

                            ul.appendChild(li);
                            li.classList.add('search-result');
                            li.movieMetaData = movie;
                            li.innerHTML = `
                                <img src="${savedMovie.Poster === "N/A" ? 'https://www.fillmurray.com/200/300' : savedMovie.Poster}" class="search-result-thumbnail">
                                <ul class="search-result-info">
                                    <li class="search-result-title">${savedMovie.Title}</li>
                                    <li class="search-result-year">
                                        <span>Released </span> ${savedMovie.Year}<br/><br/>
                                        <div class="saved-movie-card-buttons-container">
                                            <div class="save-movie-add-remove">
                                                <button class="delete-movie-btn" id="deleteMovieBtn-${savedMovie.imdbID}">Remove</button> 
                                            </div>
<!--                                            <div class="labels-dropdown">-->
<!--                                                <label for="labels"></label>-->
<!--                                                    <select id="labels">-->
<!--                                                        <option value="watch-later">Labels</option>-->
<!--                                                        <option value="watch-later">Watch Later</option>-->
<!--                                                        <option value="watched-movie">Watched</option>-->
<!--                                                    </select>-->
<!--                                            </div>-->
                                        </div>
                                    </li>
                                </ul>  
                            `;

                        document.getElementById(`deleteMovieBtn-${savedMovie.imdbID}`).addEventListener('click', event => onRemoveOnLocal(event));
                    }
                });
            }
        } else {
            ul.innerHTML = `
                <strong>No saved movies yet!</strong> <br/><br/>
                Please firstly search and add movies to your list.
             `;
        }
    }

    function onSearchMovies(event) {
        event.preventDefault();

        let inputField = document.getElementById("searchTerm"),
            inputText = inputField.value;

        fetch(`http://www.omdbapi.com/?apikey=628b3dc3&s=` + inputText)
            .then(response => response.json())
            .then(data => {
              addItem(data)
            })
            .catch((error) => {
              console.log(error);
            });


    }

    function addItem(data){
       let ul = document.getElementById("searchResult");


       if (data.Response === "False") {
           ul.innerHTML = data.Error;
       } else {
           ul.innerHTML = "";
           data.Search.forEach(movie => {
               let li = document.createElement("li");

               ul.appendChild(li);
               li.classList.add('search-result');
               li.movieMetaData = movie;
               li.innerHTML = `
                 <img src="${movie.Poster === "N/A" ? 'https://www.fillmurray.com/200/300' : movie.Poster}" class="search-result-thumbnail">
                  <ul class="search-result-info">
                      <li class="search-result-title">${movie.Title}</li>
                      <li class="search-result-year">
                         <div>
                             <span>Released </span> ${movie.Year} <br/><br/>
                            <div class="saved-movie-card-buttons-container">
                                <div class="save-movie-add-remove">
                                    <button class="save-movie-btn" id="saveMovieBtn-${movie.imdbID}">Add</button>
                                </div>
<!--                                <div class="labels-dropdown">-->
<!--                                    <label for="labels"></label>-->
<!--                                        <select id="labels">-->
<!--                                            <option value="watch-later">Labels</option>-->
<!--                                            <option value="watch-later">Watch Later</option>-->
<!--                                            <option value="watched-movie">Watched</option>-->
<!--                                        </select>-->
<!--                                </div>-->
                            </div>
                        </div>
                      </li>
                  </ul>  
            `;

            document.getElementById(`saveMovieBtn-${movie.imdbID}`).addEventListener('click', event => onSaveToLocal(event));
           });
       }
    }

    function onSaveToLocal (event) {
        let allMovies = {},
            addBtn = event.currentTarget,
            selectedMovie = addBtn.offsetParent.movieMetaData,
            getExitLocalItems = localStorage.getItem('movieCollector'),
            existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems);

        if (!!existMovies) {
            if (!existMovies.hasOwnProperty(selectedMovie.imdbID) ) {
                allMovies = Object.assign({[selectedMovie.imdbID]: selectedMovie}, existMovies);

                localStorage.setItem('movieCollector', JSON.stringify(allMovies));
                addBtn.innerText = "Saved";
            } else {
                addBtn.innerText = "Exist!";
            }
        } else {
            allMovies = {[selectedMovie.imdbID]: selectedMovie};

            localStorage.setItem('movieCollector', JSON.stringify(allMovies));
            addBtn.innerText = "Saved";
        }


        setTimeout(() => {
            addBtn.innerText = "Add"
        }, 1500)
    }

    function onRemoveOnLocal (event) {
        let deleteBtn = event.currentTarget,
            selectedMovie = deleteBtn.offsetParent.movieMetaData,
            getExitLocalItems = localStorage.getItem('movieCollector'),
            existMovies = !!getExitLocalItems && JSON.parse(getExitLocalItems);

        delete existMovies[selectedMovie[0]];
        localStorage.setItem('movieCollector', JSON.stringify(existMovies));

        onShowMovies(event);

    }
});

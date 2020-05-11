/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        let me = this;

        me.generateViewPort();
        me._initLocalListeners();
    }

    get _movieText() {
      return this.input.value
    }

    buttonFactory(buttons) {
        let me = this;

        buttons.forEach(button => {
            me[button.name] = me.createElement('button');
            me[button.name].textContent = button.text;
        });
    }

    generateViewPort() {
        let me = this;

        me.app = me.getElement('#root');

        // Step 1: App info
        me.title = me.createElement('h1');
        me.title.textContent = translations.APP_DESC;

        // Step 2: Form
        me.form = me.createElement('form');

        // Step 3: Input
        me.input = me.createElement('input');
        me.input.type = 'text';
        me.input.placeholder = translations.searchMovie;
        me.input.name = translations.movie;

        // Step 4: BUTTONS
        me.buttonFactory([
            {
                name: 'submitButton',
                text: translations.search,
            },
            {
                name: 'showListButton',
                text: translations.showList,
            },
            {
                name: 'exportListButton',
                text: translations.export,
            },
            {
                name: 'importListButton',
                text: translations.import,
            },
            {
                name: 'jsonBinButton',
                text: translations.bin,
            }
        ]);

        // Step 5: Empty List
        me.movieList = me.createElement('ul', 'movie-list');

        // Render elements to the screen.
        me.form.append(
            me.input,
            me.submitButton
        );

        me.app.append(
            me.title,
            me.form,

            // Additional buttons.
            me.showListButton,
            me.exportListButton,
            me.importListButton,
            me.jsonBinButton,

            me.movieList
        );

        me._temporaryMovieText = '';
    }

    _resetInput() {
      this.input.value = ''
    }

    createElement(tag, className) {
      const element = document.createElement(tag);

      if (className) element.classList.add(className);

      return element
    }

    getElement(selector) {
      const element = document.querySelector(selector)

      return element
    }

    displayMovies(movies) {
      // Delete all nodes
      while (this.movieList.firstChild) {
        this.movieList.removeChild(this.movieList.firstChild)
      }

      // Show default message
      if (movies.length === 0) {
        const p = this.createElement('p');
        p.textContent = translations.noAnySavedMovie;
        this.movieList.append(p)
      } else {
        // Create nodes
        movies.forEach(movie => {
          const li = this.createElement('li');
          li.id = movie.id;

          const checkbox = this.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = movie.complete;

          const span = this.createElement('span');
          span.contentEditable = true;
          span.classList.add('editable');

          if (movie.complete) {
            const strike = this.createElement('s');
            strike.textContent = movie.text;
            span.append(strike)
          } else {
            span.textContent = movie.text
          }

          const deleteButton = this.createElement('button', 'delete');
          deleteButton.textContent = translations.delete;
          li.append(checkbox, span, deleteButton);

          // Append nodes
          this.movieList.append(li)
        })
      }

      // Debugging
      //console.log(movies)
    }

    _initLocalListeners() {
        let me = this;

        me.movieList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                me._temporaryMovieText = event.target.innerText
            }
        });
    }

    bindAddMovie(handler) {
        console.log("ADD STEP-2: View > bindAddMovie");

        let me = this;

        me.form.addEventListener('submit', event => {
            event.preventDefault();

            if (me._movieText) {
                handler(me._movieText);
                me._resetInput();
            }
        });
    }

    bindDeleteMovie(handler) {
      this.movieList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)

          handler(id)
        }
      })
    }

    bindEditMovie(handler) {
      this.movieList.addEventListener('focusout', event => {
        if (this._temporaryMovieText) {
          const id = parseInt(event.target.parentElement.id)

          handler(id, this._temporaryMovieText)
          this._temporaryMovieText = ''
        }
      })
    }

    bindToggleMovie(handler) {
      this.movieList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)

          handler(id)
        }
      })
    }
}

export default View;

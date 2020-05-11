import Controller from './controller/Controller.js';
import MovieModel from './model/MovieModel.js';
import View from './view/View.js';

// Follow language change
import english from './locale/english.js';

// Set app wide translations.
window.translations = english || null;

const app = new Controller(new MovieModel(), new View());


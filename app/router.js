import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('persons', {path: '/persons/:person_id'});
  this.route('persons', {path: '/'});
  //this.route('person');
  this.route('expenses', {path: 'expenses/:expense_id'});
  this.route('expenses');
  //this.route('expense');
  this.route('transcations', {path: 'transcations/:transcation_id'});
  this.route('transcations');
});

export default Router;

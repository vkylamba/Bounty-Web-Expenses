import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'), //Todo: Make it date type
  whoPaid: DS.belongsTo('person'),
  amount: DS.attr('number'),
  description: DS.attr('string'),
  users: DS.hasMany('person'),
  amountPerUser: DS.attr('string'),
});

import DS from 'ember-data';

export default DS.Model.extend({
	from: DS.belongsTo('person'),
	to: DS.belongsTo('person'),
	date: DS.attr('string'), //Todo: make it date type
	amount: DS.attr('number'),
	isDone: DS.attr('boolean'),
});

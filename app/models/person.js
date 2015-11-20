import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	displayName: DS.attr('string'),
	description: DS.attr('string'), 
	/*totalSpent: DS.attr('number'),
	noInExpenses: DS.attr('number'),
	noOutExpenses: DS.attr('number'),
	getMoneyFrom: DS.attr('string'),*/
});

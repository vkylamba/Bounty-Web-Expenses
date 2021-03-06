import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isSelected: false,
	isBeingEdited: false,
	latestExpenseShare: 0,
	/*no_expenses: function(){
		var selected = this.get('expenses').filterBy('whoPaid', this.get('person'));
		return selected.get('length');
	}.property('expenses'),*/
	actions:{
		save: function()
		{
			//alert('Request to edit: ' + person_id);
			//var person =  this.get('person');
			//alert('Request to edit: ' + person.name);
			if (Ember.isEmpty(this.get('person.name')))
      		this.send('removePerson');
      	else
      		this.get('person').save();
			this.set('isBeingEdited',false);
		},
		edit: function()
		{
			this.set('isBeingEdited',true);
		},
		removePerson: function()
		{
			var person = this.get('person');
			person.deleteRecord();
			person.save();
		},
	},
});

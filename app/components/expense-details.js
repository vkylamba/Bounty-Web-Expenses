import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isSelected: false,
	isBeingEdited: false,
	actions:{
		edit: function(){
			this.set('isBeingEdited', true);
		},	
		Save: function(){
			var expense = this.get('expense');
			expense.save();
			this.set('isBeingEdited', false);
			this.sendAction('action');
		},
	}
});

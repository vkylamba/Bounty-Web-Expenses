import Ember from 'ember';

export default Ember.Component.extend({
	selectedPeople: [],
	isEnabled: false,
	actions: {
		enableSplit: function(){
			this.set('isEnabled', true);
		},
		splited: function(){
			var people = this.get('users');
			var selectedPeople = people.filterBy('isSelected', true);
			this.set('selectedPeople', selectedPeople);
			for(var i =0;i < selectedPeople.length; i++ )
			{
				//var total_amount = this.get('amount');
				selectedPeople.objectAt(i).set('isSelected', false);
			}
			//alert(this.get('selectedPeople'));
			
			this.set('isEnabled', false);
		},
	},
	/*click: function()
	{
		//this.set('isEnabled', true);
		//this.send('enableSplit');
		this.sendAction('action');
	},*/
});

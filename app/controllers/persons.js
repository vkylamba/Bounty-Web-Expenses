import Ember from 'ember';

export default Ember.Controller.extend({
	//itemController: 'person',
	select_link_name: 'all',
	init: function()
	{
		this.set('expenses', this.store.findAll('expense'));
		this.set('transcations', this.store.findAll('transcation'));
	},
	actions: {
		selectAll: function(){
			var people = this.get('model');
			if(this.get('select_link_name') == 'all')
			{
				people.forEach(function(person){
					person.set('isSelected', true);
				});
				this.set('select_link_name', 'none');
			}
			else
			{
				people.forEach(function(person){
					person.set('isSelected', false);
				});
				this.set('select_link_name', 'all');
			}
		},
		createPerson: function() {
			// Get the values
			var name = this.get('newName');
			var disp_name = this.get('newDisplayname');
			var desc = this.get('newDescription');
			if (name.trim().length == 0) { return; }

			// Create the new Person model
			var person = this.store.createRecord('person', {
			  name: name,
			  displayName: disp_name,
			  description: desc,
			});

			// Clear the "New Person" text fields
			this.set('newName', '');
			this.set('newDisplayname', '');
			this.set('newDescription', '');

			// Save the new model
			person.save();
		},
		deleteSelected: function()
		{
			 var selected = this.get('model').filterBy('isSelected', true);
			 selected.invoke('deleteRecord');
			 selected.invoke('save');
		},
	}
});

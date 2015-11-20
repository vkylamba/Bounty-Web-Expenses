import Ember from 'ember';

export default Ember.Route.extend({
	model(param)
	{
		if(param.expense_id)
			return this.store.findRecord('expense', param.expense_id);
		else
			return this.store.findAll('expense');
	},
	setupController: function(controller, model)
	{
		this._super(controller, model);
		this.controller.set("users", this.store.findAll('person'));
		//this.controller.set("transcations", this.store.findAll('transcation'));
	},
});

import Ember from 'ember';

export default Ember.Route.extend({
	model(param)
	{
		if(param.transcation_id)
			return this.store.findRecord('transcation', param.transcation_id);
		else
		{
			return this.store.findAll('transcation'); 
		}
	},
	/*setupController: function(controller, model)
	{
		this._super(controller, model);
		this.controller.set("people", this.store.findAll('person'));
		//this.controller.set("expenses", this.store.findAll('expense'));
	},*/
});

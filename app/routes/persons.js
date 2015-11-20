import Ember from 'ember';

export default Ember.Route.extend({
	model(param)
	{
		if(param.person_id)
			return this.store.findRecord('person', param.person_id);
		else
			return this.store.findAll('person');
	},
});

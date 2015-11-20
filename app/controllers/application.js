import Ember from 'ember';

export default Ember.Controller.extend({
	isactive1: true,
	isactive2: false,
	isactive3: false,
	actions:{
		changeTab: function(tab)
		{
			this.set('isactive1',false);
			this.set('isactive2',false);
			this.set('isactive3',false);
			if(tab == 1)
				this.set('isactive1',true);
			else if(tab == 2)
				this.set('isactive1',true);
			else
				this.set('isactive1',true);
		}
	},
});

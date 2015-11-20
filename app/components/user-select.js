import Ember from 'ember';

export default Ember.Component.extend({
	selected: 0,//this.get('choices'),
	change: function(e){
		this.set('selected', this.get('choices').objectAt(e.target.value-1));
		//alert("selected");
	}
});

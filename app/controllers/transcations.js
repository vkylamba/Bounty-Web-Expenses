import Ember from 'ember';

export default Ember.Controller.extend({
	/*people: null,
	expenses: null,*/
	proposedTranscations: [],
	showProposedTranscations: false,
	select_link_name: 'all',
	init: function(){
		this._super();
		this.set('people', this.store.findAll('person'));
		//this.set('expenses', this.store.findAll('expense'));
		//this.computePayments();
	},
	compute_payment: function(){
		var this_controller = this;
		var people = this.get('people');
		var proposedTranscations=[];
		people.forEach(function(person){
			if(person.hasOwnProperty('pay_money_to'))
			{
				var transcations = JSON.parse(person.get('pay_money_to'));
				/*console.log(transcations);
				proposedTranscations.push(transcations);
				for(var key in Object.keys(transcations))
				{
					alert(key);
				}*/
				var proposedTranscation = [];
				transcations.forEach(function(trans){
					//alert(Object.keys(trans));
					//alert(Object.keys(trans).length);
					//alert(trans['key']);
					if(Object.keys(trans).length > 0)
					{
						var toWhom, amount;
						//alert(parseInt(trans['key']));
						toWhom = people.filterBy('id', trans['key']).objectAt(0);
						//toWhom = trans['key'];
						//alert(toWhom);
						//alert('from ' + toWhom.get('name'));
						
						//Lets find the past transcations
						var amount_to_decrease = 0;
						var pastTranscations = this_controller.get('model');//store.findAll('transcation');
						//alert(pastTranscations.get('length'));
						//console.log(pastTranscations.objectAt(0).get('from').get('id'));
						//console.log(person.get('id'));
						pastTranscations.forEach(function(pastTranscation){
							if(pastTranscation.get('from').get('id') === person.get('id') 
								&& pastTranscation.get('to').get('id') === toWhom.get('id'))
							{
								amount_to_decrease += pastTranscation.get('amount');
							}
						});
						
						amount = parseFloat(trans['value']);
						if(amount_to_decrease < amount)
						{
							amount -= amount_to_decrease;
							proposedTranscation.set('from', person);
							//console.log(person);
							//console.log(proposedTranscation.get('from'));
							proposedTranscation.set('to', toWhom);
							proposedTranscation.set('amount', amount);
						
							proposedTranscations.pushObject(proposedTranscation);
						}
						proposedTranscation = [];
					}
				});
				
			}
		//alert(proposedTranscations);
		});
		this.set('proposedTranscations', proposedTranscations);
		this.set('number_of_payments', proposedTranscations.length);
	},
	actions:{
		computePayments: function(){
			this.compute_payment();
			this.set('showProposedTranscations', true);
		},
		selectAll: function(){
			var proposedTranscations = this.get('proposedTranscations');
			if(this.get('select_link_name') == 'all')
			{
				proposedTranscations.forEach(function(proposedTranscation){
					proposedTranscation.set('isSelected', true);
				});
				this.set('select_link_name', 'none');
			}
			else
			{
				proposedTranscations.forEach(function(proposedTranscation){
					proposedTranscation.set('isSelected', false);
				});
				this.set('select_link_name', 'all');
			}
		},
		payMoney: function(){
			//Create a new transcation record based on the proposed transcation which is selected
			var selected = this.get('proposedTranscations').filterBy('isSelected', true);
			var this_controller = this;
			selected.forEach(function(trans){
				//console.log(trans.get('from'));
				var transcation = this_controller.store.createRecord('Transcation', {
					date: '',
					from: trans.get('from'),
					to: trans.get('to'),
					amount: trans.get('amount'),
				});
				transcation.save();
				//Since this transcation is completed. Lets balance the records
				trans.get('from').decrementProperty('owedBy', trans.get('amount'));
				trans.get('from').incrementProperty('balance', trans.get('amount'));
				trans.get('to').decrementProperty('owes', trans.get('amount'));
				trans.get('to').decrementProperty('balance', trans.get('amount'));
				trans.set('isSelected', false);
			});
			//this.compute_payment();
			this.set('showProposedTranscations', false);
		},
	},
});

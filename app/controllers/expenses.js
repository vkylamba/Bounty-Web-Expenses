import Ember from 'ember';

export default Ember.Controller.extend({
	//needs: ['transcation'],
	//transcationsBinding: 'controllers.transcations',
	select_link_name: 'all',
	clearPeople: function()
	{
		//Initialize the properties of all the people
		this.get('users').forEach(function(person){
			person.set('noInExpenses', 0);
			person.set('noOutExpenses', 0);
			person.set('totalSpent', 0);
			person.set('owes', 0);
			person.set('owedBy', 0);
			person.set('balance', 0);
		});
	},
	resolveExpenses: function(expense, add){//expense is the expense to process
		//if add == 1, then add the current expense
		//if add == -1, then remove the expense
		 
		//this.get('model').forEach(function(expense){
			//alert(expense);
			//Extract the person who paid for the expense
			var whoPaid = expense.get('whoPaid');
			//Extract the members who were included in this expense
			var users = expense.get('users');
			//Extract the amount
			var amount = expense.get('amount')
			
			//Increase/decrease the totalSpent value for the person who paid based on the value of add
			whoPaid.incrementProperty('totalSpent', add*amount);
			whoPaid.incrementProperty('noInExpenses', add*1);
				
			//number of people who shared this expense
			var no_users = users.get('length');
			//alert('total_users:' + no_users);
			var owes = amount;
			//alert(transcations.objectAt(0));
			//Lets figure out how will pay money to the person who paid for the expense
			//for every person 'pay_money_to' stores the {persons, amount} values whom it will need to pay  
			users.forEach(function(user){
				var pay_money_to;
				var owedBy = 0;
				user.incrementProperty('noOutExpenses', add*1);
				if(!user.hasOwnProperty('pay_money_to'))
				{
					pay_money_to = [];
				}
				else
				{
					pay_money_to = JSON.parse(user.get('pay_money_to'));
					//alert('found');
				}
				if(user.get('id') == whoPaid.get('id'))
					owes -= (amount/no_users);
				else
				{
					//pay_money_to.filterBy();
					var exists = false;
					pay_money_to.forEach(function(pay){
					//alert(Object.keys(pay));
					//alert(pay['key']);
						console.log(pay['key']);
						console.log(whoPaid.get('id'));
						if(whoPaid.get('id') === pay['key'])
						{
							exists = true;
							//alert('Re: ' + user.get('name') + ' pays ' + (amount/no_users) + ' to: ' + whoPaid.get('name'));
							pay['value'] += add*(amount/no_users);
							//pay_money_to[whoPaid] += (amount/no_users);
							owedBy += (amount/no_users);
						}
					});
					if(!exists)
					{
						//alert(user.get('name') + ' pays ' + (amount/no_users) + ' to: ' + whoPaid.get('name'));
						pay_money_to.pushObject({
							key: whoPaid.get('id'),
							//key: whoPaid,
							value: add*(amount/no_users)
						});
						owedBy += (amount/no_users);
					}
				}
				
				user.incrementProperty('owedBy', add*owedBy);
				user.set('pay_money_to', JSON.stringify(pay_money_to));
			});
		
			whoPaid.incrementProperty('owes', add*owes);
			//calculate balance amount for each person
			this.get('users').forEach(function(person){
			if(!person.hasOwnProperty('noInExpenses'))
				person.set('noInExpenses', 0);
			if(!person.hasOwnProperty('noOutExpenses'))
				person.set('noOutExpenses', 0);
			if(!person.hasOwnProperty('totalSpent'))
				person.set('totalSpent', 0);
			if(!person.hasOwnProperty('owes'))
				person.set('owes', 0);
			if(!person.hasOwnProperty('owedBy'))
				person.set('owedBy', 0);
			person.set('balance', person.get('owes') - person.get('owedBy'));
		});
		//});
	},
	actions: {
		selectAll: function(){
			var expenses = this.get('model');
			if(this.get('select_link_name') == 'all')
			{
				expenses.forEach(function(expense){
					expense.set('isSelected', true);
				});
				this.set('select_link_name', 'none');
			}
			else
			{
				expenses.forEach(function(expense){
					expense.set('isSelected', false);
				});
				this.set('select_link_name', 'all');
			}
		},
		createExpense: function() {
			// Get the values
			var date = this.get('newDate');
			var desc = this.get('newDescription');
			var whoPaid = this.get('newWhopaid');
			var amount = parseFloat(this.get('newAmount'));
			var users = this.get('newUsers');
			
			//alert(whoPaid);
			//alert(users);
			if (date.trim().length == 0) { return; }
			if (whoPaid === undefined || amount === undefined || desc === undefined) { return; }

			// Create the new Expense model
			var expense = this.store.createRecord('Expense', {
			  date: date, 
			  description: desc,
			  whoPaid: whoPaid,//this.get('users').objectAt(whoPaid-1),
			  amount: amount,
			  users: users,//this.get('users'),
			});
			
			// Save the new model
			expense.save();
			// Clear the "New Person" text fields
			this.set('newDate', '');
			this.set('newDescription', '');
			//this.set('newWhopaid', '');
			this.set('newAmount', '');
			this.set('newUsers', '');
			this.resolveExpenses(expense, 1);
			//this.send('resolveExpenses');
			//this.resolveExpenses();
		},
		deleteSelected: function()
		{
			 var selected = this.get('model').filterBy('isSelected', true);
			 var this_controller = this;
			 selected.forEach(function(s){
			 	this_controller.resolveExpenses(s, -1);
			 });
			 selected.invoke('deleteRecord');
			 selected.invoke('save');
			 //this.send('resolveExpenses');
			 //this.resolveExpenses();
		},
		resolveExpenses: function(){
			//alert('here');
			var this_controller = this;
			this.clearPeople();
			this.get('model').forEach(function(expense){
				//alert(expense);
				this_controller.resolveExpenses(expense, 1);
			});
			//this.resolveExpenses();
		},
		submit: function(name)
		{
			this.controllerFor('transcation').send('computePayments');
		},
	}
});

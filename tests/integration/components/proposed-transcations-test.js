import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('proposed-transcations', 'Integration | Component | proposed transcations', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{proposed-transcations}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#proposed-transcations}}
      template block text
    {{/proposed-transcations}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

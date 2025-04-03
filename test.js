const models = require('./models');
const Persona = models.persona;
const sequelize = models.sequelize;
async function test() {

try {
console.log('\n=== CREATE TEST ===');
const newpersona = await persona.create({
nombre: 'Juan Pérez',
email: 'juan@example.com'
});
console.log('New Persona created:', newpersona.toJSON());

// READ - Find all Personas
console.log('\n=== READ TEST (All) ===');
const allpersonas = await persona.findAll();
console.log('All Personas:', JSON.stringify(allpersonas, null, 2));

// READ - Find one Persona by ID
console.log('\n=== READ TEST (Single) ===');
const foundpersona = await persona.findByPk(newpersona.id);
console.log('Found Persona:', foundpersona.toJSON());

// UPDATE - Modify a Persona
console.log('\n=== UPDATE TEST ===');
const updatedpersona = await foundpersona.update({
nombre: 'Juan Carlos Pérez',
email: 'juan.carlos@example.com'
});
console.log('Updated Persona:', updatedpersona.toJSON());
const estudante = await models.estudante.create({
matricula: 1234,
personaid: newpersona.id
});
//estudiante.setPersona(foundPersona);
// DELETE - Remove a Persona
/* console.log('\n=== DELETE TEST ===');
await updatedPersona.destroy();
console.log('Persona deleted');
*/
// Verify deletion
const deletedpersona = await persona.findByPk(newpersona.id);
console.log('Verify deletion:', deletedpersona ? 'Still exists' : 'Not found (correct)');

} catch (error) {
console.error('Error during CRUD tests:', error);
} finally {
// Close connection
await sequelize.close();
console.log('\nConnection closed');
}

}

test();
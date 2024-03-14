function addEducationField() {
    var num = document.getElementById('education_fields').childElementCount + 2;
    var div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="education_${num}" name="education[]" placeholder="Your Schooling & Education" required>
        <textarea id="education_${num}_description" name="education_description[]" placeholder="Description /optional"></textarea>
    `;
    document.getElementById('education_fields').appendChild(div);
}

function addSkillsField() {
    var num = document.getElementById('skills_fields').childElementCount + 2;
    var div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="skills_${num}" name="skills[]" placeholder="Your skills" required>`;
    document.getElementById('skills_fields').appendChild(div);
}

function addExperienceField() {
    var num = document.getElementById('experience_fields').childElementCount + 2;
    var div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="experience_${num}" name="experience[]" placeholder="Your Experience" required>
        <textarea id="experience_${num}_description" name="experience_description[]" placeholder="Description /optional"></textarea>
    `;
    document.getElementById('experience_fields').appendChild(div);
}

function addPassionField() {
    var num = document.getElementById('passion_fields').childElementCount + 2;
    var div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="passion_${num}" name="passion[]" placeholder="Your Passions" required> `;
    document.getElementById('passion_fields').appendChild(div);
}

function addHobbiesField() {
    var num = document.getElementById('hobbies_fields').childElementCount + 2;
    var div = document.createElement('div');
    div.innerHTML = `
        <input type="text" id="hobbies_${num}" name="hobbies[]" placeholder="Whats your hobby ?" required>`;
    document.getElementById('hobbies_fields').appendChild(div);
}

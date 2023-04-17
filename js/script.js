
const state = {
    gender: 'male',
    age: 0,
    height: 0,
    weight: 0,
    activity: 'min',
}



const genders = document.querySelectorAll('input[name="gender"]');
genders.forEach(el => el.addEventListener('click', ()=> {
    state.gender = el.value;
}))

const age = document.getElementById('age');
age.addEventListener('input', ()=> {
    state.age = Number(age.value);
});

const height = document.getElementById('height');
height.addEventListener('input', ()=> {
    state.heigt = Number(height.value);
});

const weight = document.getElementById('weight');
weight.addEventListener('input', ()=> {
    state.weight = Number(weight.value);
});

const activities = document.querySelectorAll('input[name="activity"]');
console.log(activities);
activities.forEach(el => el.addEventListener('click', ()=> {
    state.activity = el.value;
    console.log(state);
}))

const result = document.querySelector('.counter__result');
const supportWeight = document.querySelector('#calories-norm');
const lowWeight = document.querySelector('#calories-minimal');
const addWeight = document.querySelector('#calories-maximal');


const reset = document.querySelector('button[name="reset"]');
reset.addEventListener('click', ()=> {
    age.value = '';
    height.value = '';
    weight.value = '';
    state.activity = 'min';
    state.gender = 'male';
    result.classList.add('counter__result--hidden');
    activities.forEach(el => el.removeAttribute('checked'));
    genders.forEach(el => el.removeAttribute('checked'));
    document.querySelector('#gender-male').setAttribute('checked', true);
    document.querySelector('#activity-minimal').setAttribute('checked', true);
    setTimeout(()=> {
        reset.setAttribute('disabled', true);
        console.log(reset, state);
    },0);
   
})

// N = (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161


const calcBtn = document.querySelector('.form__submit-button');
calcBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const {weight, height, age, gender, activity} = state;
    console.log(weight, height, age, gender, activity)
    const coefGender = gender === 'male' ? 5 : -161;
    const N = (10 * weight) + (6.25 * height) + (5 * age) + coefGender;
    const res = N * getCoefActivity(state.activity);
    supportWeight.textContent = Math.floor(res);
    lowWeight.textContent = Math.floor(res - res * 0.15);
    addWeight.textContent = Math.floor(res + res * 0.15);
    result.classList.remove('counter__result--hidden');
})

const inputs = document.querySelectorAll('input');
console.log(inputs)


const form = document.querySelector('.form');
form.addEventListener('input', (e)=> {
    e.preventDefault();
    console.log(e.target.value);
    console.log(state);
    if(age.value.length || height.value.length || weight.value.length || state.activity.length || state.gender.length) {
        reset.disabled = false;
    } else {
        reset.disabled
    }

    if (state.age > 0 && height.value > 100 && weight.value > 30 && state.activity.length && state.gender.length) {
        calcBtn.disabled = false;
    } else {
        calcBtn.disabled = true;
    }
})

function getCoefActivity(value) {
    switch (value) {
        case 'min':
            return 1.2;
        case 'low':
            return 1.375;
        case 'medium':
            return 1.55;
        case 'high':
            return 1.725;
        case 'max':
            return 1.9;
        default :
            return 1;
    }
}

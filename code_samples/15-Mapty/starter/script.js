'use strict';


class Workout {
    // Class fields, no need to declare them on constructor this.field
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration){
        console.log(this);
        this.coords = coords; // [lat, lng]
        this.distance = distance; //km
        this.duration = duration; // min
        // this._setDescription();
    }

    _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
        months[this.date.getMonth()]} ${this.date.getDate()}`
    }

    click (){
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running'; //What runs first? constructor or class fields?
    constructor(coords, distance, duration, cadence){
        //when using "this" keyword on child class, first statement in child constructor needs to be super.
        super(coords, distance, duration); // looks like constructor runs first, this is not found on Parent constructor
        console.log(this.type); //but it also looks like super behind the scenes sets up class fields
        this.cadence = cadence;
        this.calcPace();
        this._setDescription(); // this is declared in child class since "type" field is not available to the parent class.
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed(){
        this.speed = this.distance / this.duration / 60;
        return this.speed;
    }
}

// const run1 =new Running([39,-12], 5.2, 24, 178);
// const cyclying1 =new Cycling([39,-12], 27, 95, 523);
// console.log(run1, cyclying1);


//////////////////////////////////////////////////////////////////////////////////////////
// APP
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    // Private fields
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];
    constructor (){
        // this.workouts = [];
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition (){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                function(){
                    alert("Could not get your position")
                }
            );
        }
    }

    _loadMap (position){
            console.log(position);
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
            const coords = [latitude, longitude];

            console.log(this);
            this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
            
            L.marker(coords).addTo(this.#map)
                .bindPopup('A pretty CSS popup.<br> Easily customizable.')
                .openPopup();
            

            this.#map.on('click', this._showForm.bind(this));

            this.#workouts.forEach(work => {
                this._renderWorkoutMarker(work);
            });
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';// to immediatly hide form
        form.classList.add("hidden"); 
        setTimeout(() => form.style.display = 'grid', 1000); // to avoid breaking animation when next workout is added
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');    
    }

    _newWorkout(e){
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp >= 0);
        // console.log(this);
        e.preventDefault();

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;

        let workout;
        if (type === 'running') {
            const cadence = +inputCadence.value;

            if(
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            ) return alert('Inputs need to be positive numbers');

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            if(
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            ) return alert('Inputs need to be positive numbers');

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        console.log(workout);
        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);

        this._hideForm();
        this._setLocalStorage();

        
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️':'🚴‍♀️'} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️':'🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            `;
        }
        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            `;
        }

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        console.log(workoutEl);
        if (!workoutEl) return;
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        console.log(workout);

        this.#map.setView(workout.coords,this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        })

        // workout.click(); //Since objects come from local storage, this method is lost :(
    }

    _setLocalStorage(){
        localStorage.setItem('workouts',JSON.stringify(this.#workouts));
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
    }

    reset (){
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();




// console.log(firstName);





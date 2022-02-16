const ttsApiKey = '1dfdbac38ba64adaa59116a15adeeca7';
const jokeApiUrl = `https://v2.jokeapi.dev/joke/Any`;

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


button.addEventListener

const toggleButton = () => {
    button.disabled = !button.disabled;
};

//speak the joke through html audio element
function tellMe(joke) {
    VoiceRSS.speech({
        key: ttsApiKey,
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

// get jokes from joke api
async function getJoke () {
    let joke = '';
    try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        }
        else {
            joke = data.joke;
        }
        //test-to-speech
        tellMe(joke);
        //disable button
        toggleButton();
    }
    catch (err) {
        console.log("iii", err);
    }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

// const button = document.getElementById("button");
// const result = document.getElementById("result");
// const main = document.getElementsByTagName("main")[0];
let listening = false;
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const stop = () => {
    // main.classList.remove("speaking");
    recognition.stop();
    // button.textContent = "Start listening";
};

const start = () => {
    // main.classList.add("speaking");
    recognition.start();
    // button.textContent = "Stop listening";
};

const onResult = event => {
    result.innerHTML = "";
    for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const p = document.createElement("p");
        if (res.isFinal) {
            p.classList.add("final");
        }
        p.appendChild(text);
        // result.appendChild(p);
    }
};
recognition.continuous = true;
recognition.interimResults = true;
recognition.addEventListener("result", onResult);
// button.addEventListener("click", event => {
//     listening ? stop() : start();
//     listening = !listening;
// });

export default { start, stop, recognition }
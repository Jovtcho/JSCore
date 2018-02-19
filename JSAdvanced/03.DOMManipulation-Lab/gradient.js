function attachGradientEvents() {
    let gradient = document.getElementById("gradient");
    gradient.addEventListener("mousemove", move);
    gradient.addEventListener("mouseout", out);

    function move(event) {
        let ratio = event.offsetX / (gradient.clientWidth - 1);
        let percentage = Math.floor(ratio * 100);
        document.getElementById("result").textContent = percentage + "%";
    }

    function out() {
        document.getElementById("result").textContent = "";
    }
}
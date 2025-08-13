let prevY = window.pageYOffset;

window.addEventListener("scroll", checkScroll);


const checkScroll = () => {
    // detects new state and compares it with the new one
    if ((document.body.getBoundingClientRect()).top > prevY)
        document.getElementById('info-box').setAttribute('data-scroll-direction', 'UP');
    else
        document.getElementById('info-box').setAttribute('data-scroll-direction', 'DOWN');
    // saves the new position for iteration.
    prevY = (document.body.getBoundingClientRect()).top;
}
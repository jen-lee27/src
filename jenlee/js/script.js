// upon page load
addEventListener("DOMContentLoaded", function () {
    let header = document.getElementById("nav");
    let headerOffset = header.offsetTop;
    window.addEventListener("scroll", function() {
        let scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

        console.log(scrollTop);
        if(scrollTop >= headerOffset)
            header.classList.add("on");
        else
            header.classList.remove("on");
    });
});
var h1 = document.querySelector("h1")
var h1text = h1.textContent

var splittedh1 = h1text.split("")

var clutter = "";

splittedh1.forEach(function(elem){
    clutter += `<span  class = "inline-block">
        ${elem}
    </span>`
})

h1.innerHTML = clutter;

gsap.to("h1 span",{
    color:"black",
    stagger:0.1,
    
    scrollTrigger:{
        trigger:"#page-2",
        scroller:"body",
        markers:true,
        start:"top 0",
        end:"top -80%",
        scrub:true,
        pin:true

    }

})
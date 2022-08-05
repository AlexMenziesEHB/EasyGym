
// Smooth Scroll
    // Nav Home
    document.querySelector("#navHome").addEventListener("click", function(){
        gsap.to(window, {duration: 0, scrollTo: "#home"});
    })

    // Nav Workout
    document.querySelector("#navWork").addEventListener("click", function(){
        gsap.to(window, {duration: 0, scrollTo: "#workouts"});
    })

    //  Nav How it works
    document.querySelector("#navHowW").addEventListener("click", function(){
        gsap.to(window, {duration: 0, scrollTo: "#HowItWorks"});
    })

    // Go top Footer
    document.querySelector("#footer-gotop").addEventListener("click", function(event){
        event.preventDefault()
        gsap.to(window, {duration: 0, scrollTo: 0});
    })

// Navbar fixed to top out of header
    // Select the Nav-Header DOM element
    gsap.to("#header", {
        // When a scroll is done
        scrollTrigger : {
            // ... and the DOM element "#home" is in the viewport
            trigger : "#home",
            // do:
            onToggle: self => {
                // when "#home" is out of the viewport
                if(!self.isActive){
                    // add the class that fixes the Nav on the top
                    document.querySelector("#header").classList.add("navbar-fixed-top")    
                }else{
                    // remove the class that fixes the Nav on the top
                    document.querySelector("#header").classList.remove("navbar-fixed-top")
                }
            }
        },
    })

// Reflect scrolling in navigation
    // If we are on the homepage
    if(document.URL.includes("index.html")){
        // Select the Nav "li" links
        document.querySelectorAll("#navbar > ul > li").forEach(function(elem,i){
            // For each one of the nav links
            if(document.querySelector("#"+elem.childNodes[0].dataset["navSection"]) !== null){
                gsap.to(elem, {
                    // On Scroll
                    scrollTrigger : {
                        // When their respective section is on viewport
                        trigger : "#"+elem.childNodes[0].dataset["navSection"],
                        // Toggle their class "active" when triggered
                        toggleClass : {targets: elem, className: "active"}
                    },
                })
            }
        })
    }
        
// Parallax
    // On the header
    gsap.to("#home", {
        // Update the background position
        backgroundPosition: "-50px 100%",
        ease: "none",
        // When scroll, do this animation
        scrollTrigger: {
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
        scrub: true
        }
    })

const tl = gsap.timeline({defaults: {duration: 0.75}})
const t2 = gsap.timeline({defaults: {duration: 0.05}})

tl.fromTo('.donutContainer', {scale: 0}, {scale: 1})
tl.fromTo('.donut', {opacity: 0, x:-300, rotation: '-45deg'}, {opacity: 1, x:0, rotation: '0deg'})

const svg = document.querySelector('svg');
svg.addEventListener('click', () => {

    t2.fromTo('.donut' , {scale: 1, rotation: '0deg'} , {scale: 1.25, rotation: '180deg', ease: "circ.in"})
    t2.fromTo('.donut' , {scale: 1.25, rotation: '180deg'} , {scale: 1, rotation: '360deg', ease: "circ.out"})
})

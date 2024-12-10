const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  const icon = hamburger.querySelector("i");

  hamburger.classList.toggle("active");

  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-bars-staggered");
  } else {
    icon.classList.remove("fa-bars-staggered");
    icon.classList.add("fa-bars");
  }
});

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${
      zValue * speedz
    }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${
      -xValue * speedx
    }px)) translateY(calc(-50% + ${yValue * speedy}px))`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});


////

let timeline = gsap.timeline();

const animationElements = [
  { name: "bg-img", distance: 200 },
  { name: "el-1", distance: 50 },
  { name: "el-2", distance: 70 },
  { name: "sm-4", distance: -250 },
  { name: "sm-5", distance: 150 },
];

animationElements.forEach((el) => {
  timeline.from(
    `.${el.name}`, 
    {
      top: `${document.querySelector(`.${el.name}`).offsetHeight / 2 - `${el.distance}`}px`,
      duration: 3.3,
      ease: "power3.out"
    },
  );
})
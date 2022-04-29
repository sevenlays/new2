const btn = document.querySelector('button'),
    overlay = document.querySelector('.overlay');

// btn.onclick = function () {
//     alert('Click');
// };
let i = 0;
const delElement = (event)=>{
    console.log(event.currentTarget);
    console.log(event.type);
    // i++;
    // if (i == 1) {
    //     btn.removeEventListener('click', delElement);
    // }
};

btn.addEventListener('click', delElement);
overlay.addEventListener('click', delElement);

const link = document.querySelector('a');
link.addEventListener('click', (event)=> {
    event.preventDefault();
    console.log(event.target);
});


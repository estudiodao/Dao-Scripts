const trabalhos = document.querySelectorAll('.task-board');
const trabalhos_cores = [];
trabalhos.forEach(e => {
    let classes = Array.from(e.classList);
    let regex = new RegExp('color-[a-z]+');
    let cor = classes.filter(c => c.match(regex));
    trabalhos_cores.push(cor);
});

const trabalhos_nomes = [];
trabalhos.forEach(e => {
    let nome = e.querySelector('.task-board-title a').innerText;
    trabalhos_nomes.push(nome);
});

let csv = "trabalhos, Cor";
for (let index = 0; index < trabalhos_nomes.length; index++) {
    csv += trabalhos_nomes[index];
    csv +=  ', ';
    csv += trabalhos_cores[index];
    csv += '\n';
}
console.log(csv);
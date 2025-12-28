
//Seleciona os botões  com a classe "tab"
const buttons = document.querySelectorAll ('.tab');

//ciclo for
buttons.forEach(btn => {
    //adiciona clicks aos elementos ".tab"
    btn.addEventListener('click', () => {
        //outro ciclo para quando os botoes sao clicados a remover a classe active de todos os botões
        //e a garantir que nenhum fica ativo antes de escolher o novo
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

    });



});



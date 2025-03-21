const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const cardsContainer = document.querySelector('.cards');

let flashCardsArray = [];

// Função para criar um flashcard na página
function adicionarFlashcard(card) {
  // Cria o contêiner principal do flashcard e armazena o id no dataset
  const flashCard = document.createElement('div');
  flashCard.className = 'flip-card';
  flashCard.dataset.id = card.id;

  // Cria a estrutura interna do flashcard
  const innerCard = document.createElement('div');
  innerCard.className = 'flip-card-inner';

  // Cria a parte da frente
  const frontCard = document.createElement('div');
  frontCard.className = 'flip-card-front';
  const pFront = document.createElement('p');
  pFront.textContent = card.frente;
  frontCard.appendChild(pFront);

  // Cria a parte de trás
  const backCard = document.createElement('div');
  backCard.className = 'flip-card-back';
  const pBack = document.createElement('p');
  pBack.textContent = card.verso;
  backCard.appendChild(pBack);

  // Monta a estrutura do flashcard
  innerCard.appendChild(frontCard);
  innerCard.appendChild(backCard);
  flashCard.appendChild(innerCard);

  // Cria o botão de remover e adiciona o event listener
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.classList.add("delete"); // Adiciona a classe "delete" para estilização
  removeButton.addEventListener('click', () => {
    // Remove o flashcard da página
    flashCard.remove();

    // Remove o flashcard do array filtrando pelo id
    flashCardsArray = flashCardsArray.filter(item => item.id !== card.id);

    // Atualiza os dados no localStorage
    atualizarLocalStorage();
  });
  flashCard.appendChild(removeButton);

  // Adiciona o flashcard ao container
  cardsContainer.appendChild(flashCard);
}

// Função para atualizar o localStorage com o array atual de flashcards
function atualizarLocalStorage() {
  localStorage.setItem('flashCards', JSON.stringify(flashCardsArray));
}

// Função para carregar os flashcards salvos no localStorage
function carregarFlashcards() {
  const dados = localStorage.getItem('flashCards');
  if (dados) {
    flashCardsArray = JSON.parse(dados);
    flashCardsArray.forEach(card => {
      adicionarFlashcard(card);
    });
  }
}

// Evento de clique para criar um novo flashcard
submitButton.addEventListener('click', () => {
  const valorInput = input.value;
  if (valorInput.includes(',')) {
    const partes = valorInput.split(',');
    const textoFrente = partes[0].trim();
    const textoVerso = partes[1].trim();

    // Cria um id único para identificar o flashcard
    const id = Date.now();
    const novoCard = { id, frente: textoFrente, verso: textoVerso };

    // Adiciona o flashcard no array e na página
    flashCardsArray.push(novoCard);
    adicionarFlashcard(novoCard);

    
    atualizarLocalStorage();
    input.value = '';
  } else {
    alert('Insira o texto no formato "frente, verso"');
  }
});

document.addEventListener('DOMContentLoaded', carregarFlashcards);

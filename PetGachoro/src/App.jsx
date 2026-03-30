import React, { useState, useEffect } from 'react';

// Dados fictícios para complementar a imagem da API
const mockDogs = [
  { id: 1, name: 'Caramelo', breed: 'Vira-lata', age: '3 anos', city: 'São Paulo, SP' },
  { id: 2, name: 'Rex', breed: 'Mistura de Pastor', age: '2 anos', city: 'Rio de Janeiro, RJ' },
  { id: 3, name: 'Luna', breed: 'Poodle', age: '4 anos', city: 'Curitiba, PR' },
  { id: 4, name: 'Thor', breed: 'Golden Retriever', age: '1 ano', city: 'Belo Horizonte, MG' },
  { id: 5, name: 'Bolinha', breed: 'Pug', age: '5 anos', city: 'Porto Alegre, RS' },
  { id: 6, name: 'Mel', breed: 'Beagle', age: '2 meses', city: 'Salvador, BA' },
];

export default function PetGachorro() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        // Mapeia nossos cachorros e busca uma imagem para cada um
        const dogsWithImages = await Promise.all(
          mockDogs.map(async (dog) => {
            try {
              // Fazendo a chamada para a API que você solicitou
              const response = await fetch('https://random.dog/woof.json');
              const data = await response.json();
              
              // Nota: Adapte o 'data.url' dependendo do formato real do JSON que essa API retorna.
              // Se a API retornar { message: "link_da_imagem" }, troque para data.message
              const imageUrl = data.url || data.message || data.image || 'https://via.placeholder.com/300?text=Cachorrinho';
              
              return { ...dog, image: imageUrl };
            } catch (err) {
              console.error(`Erro ao carregar imagem do ${dog.name}:`, err);
              // Imagem de fallback caso a requisição falhe
              return { ...dog, image: 'https://via.placeholder.com/300?text=Sem+Foto' };
            }
          })
        );
        
        setDogs(dogsWithImages);
      } catch (error) {
        console.error("Erro ao carregar a lista de cachorros.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogImages();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      {/* Cabeçalho */}
      <header className="bg-orange-500 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">🐾 PetGachorro</h1>
          <nav>
            <ul className="flex space-x-6 font-medium">
              <li><a href="#" className="hover:text-orange-200 transition">Início</a></li>
              <li><a href="#" className="hover:text-orange-200 transition">Sobre nós</a></li>
              <li><a href="#" className="hover:text-orange-200 transition">Como Adotar</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-6 mt-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Encontre seu novo melhor amigo!</h2>
          <p className="text-gray-600 text-lg">Estes peludos estão esperando por um lar cheio de amor.</p>
        </div>

        {/* Estado de Carregamento */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-2xl text-orange-500 font-semibold animate-pulse">Buscando cachorrinhos...</p>
          </div>
        ) : (
          /* Grid de Cachorros */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {dogs.map((dog) => (
              <div key={dog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={dog.image} 
                  alt={`Foto do ${dog.name}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{dog.name}</h3>
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {dog.age}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1"><strong>Raça:</strong> {dog.breed}</p>
                  <p className="text-gray-600 mb-4"><strong>Local:</strong> {dog.city}</p>
                  
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    Quero Adotar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-gray-300 py-8 text-center mt-12">
        <p>© 2026 PetGachorro. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">Adotar é um ato de amor.</p>
      </footer>
    </div>
  );
}
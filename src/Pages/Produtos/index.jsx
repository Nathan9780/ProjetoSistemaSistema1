import { useEffect, useState } from 'react';
import { api } from '../../Services/api';

export function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/produtos')
      .then((res) => {
        // AQUI ESTAVA O ERRO: Agora está setProdutos e não setClientes
        setProdutos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Estoque de Produtos - AGROVIDA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="p-4 border rounded-lg shadow-md bg-white border-l-8 border-l-green-600">
              <h3 className="font-bold text-lg text-gray-700">{produto.nome}</h3>
              <p className="text-gray-500">Preço: R$ {produto.preco?.toFixed(2)}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400 uppercase">Disponível</span>
                <span className={`text-xl font-black ${produto.estoque < 10 ? 'text-red-600' : 'text-green-700'}`}>
                  {produto.estoque} un
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Carregando estoque do Fabricio...</p>
        )}
      </div>
    </div>
  );
}
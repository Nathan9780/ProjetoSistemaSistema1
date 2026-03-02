// Importações

import { useEffect, useState } from "react";
import { api } from "../../Services/api";

export function Fornecedor() {
  const [fornecedor, setFornecedor] = useState([]);

  useEffect(() => {
    api
      .get("/Fornecedores")
      .then((res) => {
        setFornecedor(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar um possivel fornecedor:", err);
      });
  }, []);

  return (
    // Texto a cima da tabela
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-green-800">
        Fornecedores - AGROVIDA
      </h1>

      {/* Tabela que pega as informações dos fornecedores e aplica na tabela */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fornecedor.length > 0 ? (
          fornecedor.map((fornecedor) => (
            <div
              key={fornecedor.id}
              className="p-4 border rounded-lg shadow-md bg-white border-l-8 border-l-green-600"
            >
              <h3 className="font-bold text-lg text-gray-700">
                {fornecedor.nome}
              </h3>
              <h2 className="text-sm text-gray-500">{fornecedor.cidade}</h2>
              <h2 className="text-sm text-gray-500">
                {fornecedor.representante}
              </h2>
              <p className="text-gray-500">Produto: {fornecedor.produto}</p>
              <p className="text-gray-500">
                Preço: R$ {fornecedor.preco?.toFixed(2)}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400 uppercase">
                  Disponível
                </span>
                <span
                  className={`text-xl font-black ${fornecedor.estoque < 10 ? "text-red-600" : "text-green-700"}`}
                >
                  {fornecedor.estoque} un
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            Carregando estoque do Fabricio...
          </p>
        )}
      </div>
    </div>
  );
}

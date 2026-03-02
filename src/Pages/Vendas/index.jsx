import { useEffect, useState } from 'react';
import { api } from '../../Services/api';

export function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    api.get('/vendas').then(res => setVendas(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Relatório de Vendas (Financeiro)</h1>
      <table className="w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-3 text-left">Cliente</th>
            <th className="p-3 text-left">Produto</th>
            <th className="p-3 text-center">Qtd</th>
            <th className="p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(v => (
            <tr key={v.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{v.clienteNome}</td>
              <td className="p-3">{v.produtoNome}</td>
              <td className="p-3 text-center">{v.quantidade}</td>
              <td className="p-3 text-right font-bold text-green-700">R$ {v.valorTotal?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
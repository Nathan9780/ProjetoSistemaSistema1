import { useEffect, useState } from "react";
import { api } from "../../Services/api";
// import { toast } from "sonner";

// ... mantenha os imports anteriores e adicione:
import { FormCliente } from "./FormCliente";

export function Clientes() {
  const [clientes, setClientes] = useState([]);

  const carregarClientes = () => {
    api.get("/clientes").then((res) => setClientes(res.data));
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6 italic">
        AGROVIDA - Gestão
      </h1>

      {/* Aqui o Jadean insere os dados e o sistema atualiza a lista sozinha */}
      <FormCliente aoSalvar={carregarClientes} />

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Clientes Atendidos
      </h2>
      <div className="space-y-4">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="p-4 border-l-4 border-green-500 rounded shadow bg-white"
          >
            <p className="font-bold uppercase">{cliente.nome}</p>
            <p className="text-gray-500 italic text-sm">{cliente.cidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

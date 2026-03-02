import { useForm } from 'react-hook-form';
import { api } from '../../Services/api';
import { toast } from 'sonner';

export function FormCliente({ aoSalvar }) {
  const { register, handleSubmit, reset } = useForm();

  // Função que envia o novo cliente para o db.json
  const salvarDados = async (dados) => {
    try {
      await api.post('/clientes', dados);
      toast.success("Cliente cadastrado com sucesso!");
      reset();    // Limpa os campos após salvar
      aoSalvar(); // Chama a função para atualizar a lista automaticamente
    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(salvarDados)} className="bg-gray-100 p-6 rounded-lg mb-8 shadow-inner">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Novo Levantamento de Dados</h2>
      <div className="flex flex-col gap-3">
        <input 
          {...register("nome", { required: true })} 
          placeholder="Nome da Fazenda/Cliente" 
          className="p-2 border rounded shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        <input 
          {...register("cidade", { required: true })} 
          placeholder="Cidade" 
          className="p-2 border rounded shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition-colors">
          Cadastrar Cliente
        </button>
      </div>
    </form>
  );
}


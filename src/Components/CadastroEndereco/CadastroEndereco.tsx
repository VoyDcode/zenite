"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Endereco {
  nome: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  latitude: string;
  longitude: string;
  idUsuario: number;
}

export default function CadastroEndereco() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [endereco, setEndereco] = useState<Endereco>({
    nome: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    latitude: '',
    longitude: '',
    idUsuario: 0
  });

  useEffect(() => {
    const usuarioJSON = localStorage.getItem("usuarioLogado");
    if (!usuarioJSON) {
      router.push('/login');
      return;
    }

    const usuario = JSON.parse(usuarioJSON);
    setEndereco(prev => ({
      ...prev,
      idUsuario: usuario.id
    }));
  }, [router]);
    

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEndereco(prev => ({ ...prev, [name]: value }));

  if (name === 'cep') {
    let novoValor = value;
    novoValor = value.replace(/\D/g, '');
    setEndereco(prev => ({ ...prev, [name]: novoValor }));

  }
  
  if (name === 'cep' && value.length >= 8) {

    try {
      const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
      const data = await response.json();

      if (data.erro) {
        // setError('CEP não encontrado');
      } else {
        setEndereco(prev => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      // setError('Erro ao buscar CEP');
    }
  }
  };

  const pegarLatLong = async () => {
    try {
      const enderecoCompleto = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;

      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(enderecoCompleto)}&key=76f96f8dcfa6497497248424504e63bb`);
      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return {
          ...endereco,
          latitude: lat,
          longitude: lng,
        };
      }
    } catch {
      console.error('Erro ao obter coordenadas');
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const enderecoCompleto = await pegarLatLong(); // <- AQUI você espera o resultado

    if (!enderecoCompleto) {
      throw new Error('Não foi possível obter latitude/longitude');
    }
  

    setEndereco(enderecoCompleto)
    console.log(enderecoCompleto)
 
      const response = await fetch("https://zenite-gs-production.up.railway.app/endereco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(enderecoCompleto)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar endereço.");
      }

      alert("Endereço cadastrado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      // setError('Erro ao cadastrar endereço. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-400">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-2 text-center tracking-wide text-black">Cadastro de Endereço</h1>
        <p className="text-xs text-black font-semibold mb-6 text-center">
          Cadastre seu endereço usando apenas o cep
        </p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-bold text-black mb-1">Apelido do endereço</label>
              <input type="text" id="nome" name="nome" value={endereco.nome} onChange={handleChange} required className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="cep" className="block text-sm font-bold text-black mb-1">CEP</label>
              <input type="text" id="cep" name="cep" value={endereco.cep} onChange={handleChange} required className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="logradouro" className="block text-sm font-bold text-black mb-1">Logradouro</label>
              <input type="text" id="logradouro" name="logradouro" value={endereco.logradouro} readOnly className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="bairro" className="block text-sm font-bold text-black mb-1">Bairro</label>
              <input type="text" id="bairro" name="bairro" value={endereco.bairro} readOnly required className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="cidade" className="block text-sm font-bold text-black mb-1">Cidade</label>
              <input type="text" id="cidade" name="cidade" value={endereco.cidade} readOnly required className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="estado" className="block text-sm font-bold text-black mb-1">Estado</label>
              <input type="text" id="estado" name="estado" value={endereco.estado} readOnly required className="w-full bg-[#E9E9E9] border-none rounded px-3 py-2" />
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <button 
              type="submit" 
              className="w-60 bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Endereço'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
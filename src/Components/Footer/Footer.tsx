export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 w-full mt-auto">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-1">Zenite</h3>
            <p className="text-gray-300">
              Sistema de alerta e prevenção contra desastres naturais, focado em enchentes, chuvas intensas e desabamentos.
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col items-end">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-1">Contato</h3>
              <ul className="text-gray-300 space-y-0.5 text-center">
                <li>E-mail: contato@zenite.com</li>
                <li>Telefone: (11)4002-8922</li>
                <li>Endereço: São Paulo, SP</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-slate-300">
          <p className="text-sm text-gray-400 text-center">© 2025 Zenite. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
} 
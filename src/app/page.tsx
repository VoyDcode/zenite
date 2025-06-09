'use client'
import React from 'react';
import Link from 'next/link'

export default function Home() {
  return (
    <section className="w-full py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Seja bem-vindo ao Zenite!
          </h1>
          <p className="text-xl mb-4 text-black">
            Sua segurança é nossa prioridade
          </p>
          <p className="text-lg mb-8 text-black">
            Sistema de alerta e prevenção contra desastres naturais. Mantenha-se informado sobre riscos de enchentes, 
            chuvas intensas e desabamentos em sua região. Cadastre-se para receber alertas em tempo real.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/Alerta"
              className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors"
            >
              Ver Alertas
            </Link>
            <Link 
              href="/prevencao"
              className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors"
            >
              Medidas de Prevenção
            </Link>
            <Link 
              href="/cadastro-endereco"
              className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors"
              >
                Cadastrar Endereço
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
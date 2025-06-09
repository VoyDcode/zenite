'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect} from 'react';
import Link from 'next/link'
import { useState } from "react";
import { ContaType } from '@/types/conta';
import NavigationArrows from '../NavigationArrows';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [Logado, setLogado] = useState<ContaType | null>(null); 

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
      setLogado(JSON.parse(usuario));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setLogado(null);
    window.location.reload();
  };

  const getNavigationPaths = () => {
    switch (pathname) {
      case '/':
        return { prev: '/login', next: '/Alerta' };
      case '/Alerta':
        return { prev: '/', next: '/prevencao' };
      case '/prevencao':
        return { prev: '/Alerta', next: '/cadastro-endereco' };
      case '/cadastro-endereco':
        return { prev: '/prevencao', next: '/' };
      default:
        return { prev: '/', next: '/' };
    }
  };

  const { prev, next } = getNavigationPaths();

  return (
    <header className="bg-black w-full py-4">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity" aria-label="Ir para a página inicial">
            <Image src="/LOGO.png" alt="Logo Zenite" width={48} height={48} priority className="w-10 h-10 object-contain" />
            Zenite
          </button>
          <NavigationArrows previousPath={prev} nextPath={next} />
        </div>
        {Logado ? (
          <nav className="flex gap-4 items-center">
            <button onClick={handleLogout} className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors border-none cursor-pointer">Sair</button>
          </nav>
        ) : (
          <nav className="flex gap-4">
            <Link href="/Cadastrar" className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors border-none cursor-pointer text-decoration: none">Cadastro</Link>
            <Link href="/login" className="bg-[#64748B] hover:bg-[#475569] text-white font-semibold px-4 py-2 rounded transition-colors">Login</Link>
          </nav>
        )}
      </div>
    </header>
  );
} 
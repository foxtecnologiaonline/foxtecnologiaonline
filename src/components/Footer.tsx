import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-fox-gray-dark text-white">
      <div className="container-fox section-padding">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">FOX tecnologIA</h3>
            <p className="text-gray-400">
              Soluções inovadoras em tecnologia para transformar seu negócio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-fox-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-fox-orange transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/#produtos" className="hover:text-fox-orange transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-fox-orange transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:contato@foxtecnologia.online"
                className="flex items-center gap-2 text-gray-400 hover:text-fox-orange transition-colors"
              >
                <Mail size={20} />
                contato@foxtecnologia.online
              </a>
              <a
                href="tel:+5534991439633"
                className="flex items-center gap-2 text-gray-400 hover:text-fox-orange transition-colors"
              >
                <Phone size={20} />
                +55 (34) 99143-9633
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} FOX tecnologIA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

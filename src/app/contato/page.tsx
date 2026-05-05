import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato - FOX tecnologIA',
  description: 'Entre em contato conosco. Estamos prontos para ajudar sua empresa.',
}

export default function Contato() {
  return (
    <div>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-fox-orange to-fox-orange-dark text-white">
        <div className="container-fox text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Estamos prontos para ouvir você e ajudar sua empresa a crescer
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-fox">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-fox-gray-dark mb-8">
                Informações de Contato
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="text-fox-orange flex-shrink-0">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-fox-gray-dark mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:contato@foxtecnologia.online"
                      className="text-fox-gray-dark opacity-80 hover:text-fox-orange transition-colors"
                    >
                      contato@foxtecnologia.online
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="text-fox-orange flex-shrink-0">
                    <Phone size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-fox-gray-dark mb-2">
                      Celular
                    </h3>
                    <a
                      href="tel:+5534991439633"
                      className="text-fox-gray-dark opacity-80 hover:text-fox-orange transition-colors"
                    >
                      +55 (34) 99143-9633
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="text-fox-orange flex-shrink-0">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-fox-gray-dark mb-2">
                      Online
                    </h3>
                    <p className="text-fox-gray-dark opacity-80">
                      Atendemos clientes em todo o Brasil via digital
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

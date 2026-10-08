/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { useMotionPreference } from '../context/MotionContext';
import { MapPin, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export interface VisiteProps {
  content: SiteContent['visite'];
}

export const Visite: React.FC<VisiteProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  if (!content.enabled) return null;

  return (
    <section
      id="visite"
      aria-label="Localização e atendimento da clínica"
      className="py-20 md:py-32 relative bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: isReducedMotion ? 0.15 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] p-8 sm:p-12 lg:p-16 shadow-xs"
          style={{ borderRadius: 'var(--tema-radius-lg)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading and narrative */}
            <div className="lg:col-span-5">
              <span
                className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
                style={{ fontFamily: 'var(--tema-font-label)' }}
              >
                {content.kicker}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mt-3 mb-6">
                {content.title}{' '}
                <span className="italic font-light text-[var(--tema-color-accent-ink)]">
                  {content.highlightedWord}
                </span>
                .
              </h2>
              <p className="text-base text-[var(--tema-color-text-muted)] font-normal leading-relaxed mb-8">
                {content.description}
              </p>

              <div className="flex items-center gap-3 p-4 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] mb-8">
                <ShieldCheck className="h-5 w-5 text-[var(--tema-color-accent-ink)] shrink-0" aria-hidden="true" />
                <p className="text-xs text-[var(--tema-color-text-muted)] leading-relaxed">
                  {content.note}
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setIsContactModalOpen(true)}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                {content.primaryAction.label}
              </Button>
            </div>

            {/* Right Column: Information Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address card */}
              <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[var(--tema-color-accent-ink)] mb-4">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--tema-font-label)' }}
                    >
                      Endereço
                    </span>
                  </div>
                  <p className="text-sm text-[var(--tema-color-text)] leading-relaxed font-medium">
                    {content.address}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--tema-color-border)] text-xs text-[var(--tema-color-text-muted)]">
                  Fácil acesso com transporte e estacionamento conveniado
                </div>
              </div>

              {/* Schedule card */}
              <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[var(--tema-color-accent-ink)] mb-4">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: 'var(--tema-font-label)' }}
                    >
                      Horários
                    </span>
                  </div>
                  <p className="text-sm text-[var(--tema-color-text)] leading-relaxed font-medium">
                    {content.schedule}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--tema-color-border)] text-xs text-[var(--tema-color-text-muted)]">
                  Intervalos generosos entre pacientes
                </div>
              </div>

              {/* Direct message card */}
              <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 text-[var(--tema-color-accent-ink)] mb-2">
                      <MessageSquare className="h-5 w-5" aria-hidden="true" />
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--tema-font-label)' }}
                      >
                        Contato Direto
                      </span>
                    </div>
                    <p className="text-sm text-[var(--tema-color-text)] font-medium">
                      {content.contact}
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Enviar mensagem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact dialog modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setFormSent(false);
        }}
        title="Agendamento & Contato"
        maxWidth="md"
      >
        {formSent ? (
          <div className="py-8 text-center flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(31,111,92,0.1)] text-[var(--tema-color-accent-ink)] mb-4">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-normal text-[var(--tema-color-text)] mb-2">
              Mensagem registrada
            </h3>
            <p className="text-sm text-[var(--tema-color-text-muted)] max-w-sm mb-6 leading-relaxed">
              Recebemos sua solicitação de horário. Nossa equipe responderá em horário comercial pelo canal informado.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsContactModalOpen(false);
                setFormSent(false);
              }}
            >
              Fechar
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormSent(true);
            }}
            className="flex flex-col gap-4"
          >
            <Input
              label="Seu nome completo"
              placeholder="Ex.: Carolina Mendes"
              required
            />
            <Input
              label="E-mail ou WhatsApp"
              placeholder="Ex.: [seu contato de preferência]"
              required
            />
            <Textarea
              label="Motivo da consulta ou mensagem (opcional)"
              placeholder="Conte brevemente sobre suas queixas ou horários de preferência..."
              rows={3}
            />
            <p className="text-xs text-[var(--tema-color-text-muted)]">
              Seus dados são estritamente confidenciais e protegidos pela equipe da clínica.
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsContactModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" size="md" type="submit">
                Enviar solicitação
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};

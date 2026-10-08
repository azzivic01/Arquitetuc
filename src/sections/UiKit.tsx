/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { AnimatedLink } from '../components/ui/AnimatedLink';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Toggle } from '../components/ui/Toggle';
import { Tooltip } from '../components/ui/Tooltip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Marquee } from '../components/ui/Marquee';
import { SectionDivider } from '../components/ui/SectionDivider';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Share2,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const UiKit: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoDrawerOpen, setDemoDrawerOpen] = useState(false);
  const [progressVal, setProgressVal] = useState(65);

  return (
    <section
      id="laboratorio-ui"
      aria-label="Laboratório de componentes de interface"
      className="py-20 md:py-32 bg-[var(--tema-color-surface)] border-t border-[var(--tema-color-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-[var(--tema-color-accent-ink)]" aria-hidden="true" />
            <span
              className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
              style={{ fontFamily: 'var(--tema-font-label)' }}
            >
              Kit de Design & UI
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mb-4">
            Laboratório de{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              componentes
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed">
            Catálogo completo de elementos do sistema Alba. Cada componente é demonstrado em seus estados interativos (normal, hover, foco e desativado), utilizando exclusivamente as variáveis CSS do tema.
          </p>
        </div>

        {/* =========================================================================
            BLOCO 1: BOTÕES E AÇÕES
        ========================================================================= */}
        <div className="mb-20">
          <div className="border-b border-[var(--tema-color-border)] pb-3 mb-8">
            <h3 className="font-display text-2xl font-normal text-[var(--tema-color-text)]">
              01. Botões & Ações Interativas
            </h3>
            <p className="text-xs text-[var(--tema-color-text-muted)] mt-1">
              Alvos de toque ≥ 44×44px, foco visível de 2px com outline-offset, estados normais e cópias forçadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Primário */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono">
                Button / Primário
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Normal</span>
                  <Button variant="primary" size="md">Agendar consulta</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Hover (forçado)</span>
                  <Button variant="primary" size="md" forcedState="hover">Agendar consulta</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Foco (forçado)</span>
                  <Button variant="primary" size="md" forcedState="focus">Agendar consulta</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Carregando</span>
                  <Button variant="primary" size="md" forcedState="loading">Agendar consulta</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Desativado</span>
                  <Button variant="primary" size="md" forcedState="disabled">Agendar consulta</Button>
                </div>
              </div>
            </div>

            {/* Secundário */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono">
                Button / Secundário
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Normal</span>
                  <Button variant="secondary" size="md">Ver detalhes</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Hover (forçado)</span>
                  <Button variant="secondary" size="md" forcedState="hover">Ver detalhes</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Foco (forçado)</span>
                  <Button variant="secondary" size="md" forcedState="focus">Ver detalhes</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Desativado</span>
                  <Button variant="secondary" size="md" forcedState="disabled">Ver detalhes</Button>
                </div>
              </div>
            </div>

            {/* Fantasma & Tamanhos */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono">
                Button / Fantasma & Tamanhos
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Tamanho P (sm)</span>
                  <Button variant="primary" size="sm">Pequeno</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Tamanho M (md)</span>
                  <Button variant="primary" size="md">Médio</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Tamanho G (lg)</span>
                  <Button variant="primary" size="lg">Grande</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--tema-color-text-muted)]">Fantasma / Hover</span>
                  <Button variant="ghost" size="md" forcedState="hover" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* IconButton & AnimatedLink */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)]">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-4">
                IconButton / Variantes & Estados
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <IconButton aria-label="Favoritar" variant="primary">
                  <Heart className="h-4 w-4" />
                </IconButton>
                <IconButton aria-label="Favoritar hover" variant="primary" forcedState="hover">
                  <Heart className="h-4 w-4" />
                </IconButton>
                <IconButton aria-label="Compartilhar" variant="secondary">
                  <Share2 className="h-4 w-4" />
                </IconButton>
                <IconButton aria-label="Compartilhar foco" variant="secondary" forcedState="focus">
                  <Share2 className="h-4 w-4" />
                </IconButton>
                <IconButton aria-label="Calendário desativado" variant="ghost" forcedState="disabled">
                  <Calendar className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)]">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-4">
                AnimatedLink & Badges
              </span>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <AnimatedLink href="#laboratorio-ui">Link normal (passe o mouse)</AnimatedLink>
                  <AnimatedLink href="#laboratorio-ui" forcedHover>Link com hover forçado</AnimatedLink>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--tema-color-border)]">
                  <Badge variant="subtle">Subtle Badge</Badge>
                  <Badge variant="outline">Outline Badge</Badge>
                  <Badge variant="accent">Accent Badge</Badge>
                  <Badge variant="subtle" size="sm">Tamanho P</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCO 2: ENTRADAS DE FORMULÁRIO (INPUTS, CONTROLES)
        ========================================================================= */}
        <div className="mb-20">
          <div className="border-b border-[var(--tema-color-border)] pb-3 mb-8">
            <h3 className="font-display text-2xl font-normal text-[var(--tema-color-text)]">
              02. Formulários & Controles de Seleção
            </h3>
            <p className="text-xs text-[var(--tema-color-text-muted)] mt-1">
              Altura confortável ≥ 48px, rótulos acessíveis, mensagens de erro demonstrativas, caixas de seleção com alvo ≥ 44px.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Input Normal e Foco */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <Input
                label="Input de texto / Normal"
                placeholder="Digite seu nome..."
                helperText="Campo em estado regular de repouso."
              />
              <Input
                label="Input de texto / Foco visível (forçado)"
                defaultValue="Texto em foco de edição"
                forcedState="focus"
              />
            </div>

            {/* Input Erro e Desativado */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <Input
                label="Input de texto / Com erro"
                defaultValue="email-invalido@"
                error="Por favor, informe um endereço de e-mail válido."
              />
              <Input
                label="Input de texto / Desativado"
                defaultValue="Valor pré-definido bloqueado"
                forcedState="disabled"
              />
            </div>

            {/* Select & Textarea */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-4">
              <Select
                label="Select / Seletor de opções"
                options={[
                  { value: '1', label: 'Primeira consulta clínica' },
                  { value: '2', label: 'Retorno e acompanhamento' },
                  { value: '3', label: 'Revisão de rotina domiciliar' },
                ]}
              />
              <Textarea
                label="Textarea / Área de texto"
                placeholder="Descreva suas queixas..."
                rows={3}
                helperText="Espaço amplo para relato pessoal."
              />
            </div>
          </div>

          {/* Checkboxes, Radios e Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-2">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono mb-2">
                Checkbox (Alvo ≥ 44px)
              </span>
              <Checkbox label="Opção desmarcada" defaultChecked={false} />
              <Checkbox label="Opção selecionada" defaultChecked={true} />
              <Checkbox label="Foco visível (forçado)" forcedState="focus" defaultChecked={true} />
              <Checkbox label="Desativado" forcedState="disabled" defaultChecked={false} />
            </div>

            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-2">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono mb-2">
                RadioGroup
              </span>
              <RadioGroup
                name="demo-radio"
                label="Período de preferência"
                options={[
                  { value: 'manha', label: 'Manhã (luz natural)' },
                  { value: 'tarde', label: 'Tarde (silêncio)' },
                  { value: 'remoto', label: 'Orientação a distância' },
                ]}
                defaultValue="manha"
              />
            </div>

            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col gap-2">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono mb-2">
                Toggle / Switch
              </span>
              <Toggle
                label="Lembretes por mensagem"
                description="Avisos 24h antes da consulta"
                defaultChecked={true}
              />
              <Toggle
                label="Som ambiente na sala"
                description="Acústica suave e relaxante"
                defaultChecked={false}
              />
              <Toggle
                label="Modo foco forçado"
                forcedState="focus"
                defaultChecked={true}
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            BLOCO 3: CARDS, ABAS, ACORDEÃO E UTILITÁRIOS
        ========================================================================= */}
        <div className="mb-20">
          <div className="border-b border-[var(--tema-color-border)] pb-3 mb-8">
            <h3 className="font-display text-2xl font-normal text-[var(--tema-color-text)]">
              03. Painéis Estruturais, Diálogos & Utilidades
            </h3>
            <p className="text-xs text-[var(--tema-color-text-muted)] mt-1">
              Cards com borda de 1px e sombra sutil, acordeão com AnimatePresence, modais com focus trap e ESC, tooltips e progresso.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Card com e sem hover forçado */}
            <div className="flex flex-col gap-4">
              <Card clickable className="bg-[var(--tema-color-surface)]">
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-2">
                  Card Clicável / Normal
                </span>
                <h4 className="font-display text-xl font-normal text-[var(--tema-color-text)] mb-2">
                  Estrutura com borda e raio do tema
                </h4>
                <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
                  Passe o cursor sobre este card para observar a elevação suave e sutil (sem pulos).
                </p>
              </Card>

              <Card clickable forcedHover className="bg-[var(--tema-color-surface)]">
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-2">
                  Card / Hover Forçado
                </span>
                <h4 className="font-display text-xl font-normal text-[var(--tema-color-text)] mb-2">
                  Borda em acento e leve elevação
                </h4>
                <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
                  Demonstração estática do estado ativo de sobreposição de cursor.
                </p>
              </Card>
            </div>

            {/* Tabs demonstrativas */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-xs">
              <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-4">
                Componente Tabs (Navegação Acessível)
              </span>
              <Tabs
                tabs={[
                  {
                    id: 'tab-1',
                    label: 'Consulta',
                    content: (
                      <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
                        Atendimento inicial com escuta ativa, duração média de 60 minutos e ambiente preparado com luz natural.
                      </p>
                    ),
                  },
                  {
                    id: 'tab-2',
                    label: 'Acompanhamento',
                    content: (
                      <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
                        Sessões de retorno para revisão de fórmulas, observação da tolerância cutânea e ajustes necessários.
                      </p>
                    ),
                  },
                  {
                    id: 'tab-3',
                    label: 'Prescrição',
                    content: (
                      <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
                        Receituário limpo, com passos numerados e indicação de produtos gentis e sustentáveis.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          {/* Diálogos, Tooltip, Progresso e Marquee */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modal & Drawer triggers */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-2">
                  Modal & Drawer Lateral
                </span>
                <p className="text-xs text-[var(--tema-color-text-muted)] mb-4">
                  Ambos suportam fechamento por tecla ESC, travamento de foco e retorno ao botão disparador.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setDemoModalOpen(true)}
                >
                  Abrir Modal Demonstrativo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDemoDrawerOpen(true)}
                >
                  Abrir Drawer Lateral
                </Button>
              </div>
            </div>

            {/* Tooltip & Progresso */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between gap-6">
              <div>
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-3">
                  Tooltip & Barra de Progresso
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <Tooltip content="Tooltip acionado no repouso do mouse">
                    <Button variant="secondary" size="sm">Passe o mouse</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip forçado visível" forcedVisible>
                    <span className="text-xs text-[var(--tema-color-accent-ink)] font-semibold underline cursor-help">
                      Exibição forçada
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div>
                <ProgressBar
                  value={progressVal}
                  label="Evolução do tratamento"
                />
              </div>
            </div>

            {/* Marquee & Divisor */}
            <div className="p-6 rounded-[var(--tema-radius)] bg-[var(--tema-color-bg)] border border-[var(--tema-color-border)] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-3">
                  Marquee Contínuo
                </span>
                <Marquee
                  items={['Luz Natural', 'Escuta Atenta', 'Silêncio', 'Cuidado Gentil']}
                  speed={20}
                />
              </div>

              <div className="mt-6">
                <span className="text-xs font-semibold text-[var(--tema-color-accent-ink)] font-mono block mb-1">
                  SectionDivider
                </span>
                <SectionDivider withMark className="my-3!" />
              </div>
            </div>
          </div>
        </div>

        {/* Dialogs de teste do Kit */}
        <Modal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
          title="Demonstração do Modal"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
              Este diálogo exemplifica a retenção de foco acessível (Tab circula apenas dentro do modal) e fechamento automático ao pressionar a tecla ESC.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--tema-color-border)]">
              <Button variant="secondary" size="sm" onClick={() => setDemoModalOpen(false)}>
                Entendido
              </Button>
            </div>
          </div>
        </Modal>

        <Drawer
          isOpen={demoDrawerOpen}
          onClose={() => setDemoDrawerOpen(false)}
          title="Demonstração do Drawer"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed">
              Painel lateral expansível com transição suave que pode ser utilizado para menus aprofundados, filtros ou históricos clínicos.
            </p>
            <div className="pt-4">
              <Button variant="primary" size="sm" onClick={() => setDemoDrawerOpen(false)}>
                Fechar painel
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </section>
  );
};

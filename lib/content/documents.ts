export type MembershipDocument = {
  title: string
  description: string
  href: string
  kind: 'Положение' | 'Заявление'
}

/** Links come directly from the original /doks page. */
export const membershipDocuments: MembershipDocument[] = [
  {
    kind: 'Положение',
    title: 'Положение о членстве и взносах',
    description: 'Порядок вступления, права и обязанности членов Ассоциации, размер и порядок уплаты взносов.',
    href: 'https://drive.google.com/file/d/1xQuWJAT0eN2d0G-6d4qNlwb9gauu7ULo/view?usp=sharing',
  },
  {
    kind: 'Заявление',
    title: 'Заявление о входе в члены Ассоциации (физическое лицо)',
    description: 'Форма для граждан, вступающих в Ассоциацию.',
    href: 'https://drive.google.com/file/d/1Y6iui1ojjj6_JLQAcDF6czCHbKdD0jTB/view?usp=sharing',
  },
  {
    kind: 'Заявление',
    title: 'Заявление о входе в члены Ассоциации (юридическое лицо)',
    description: 'Форма для организаций, вступающих в Ассоциацию.',
    href: 'https://drive.google.com/file/d/17aoq9GIVNaICJE_-kS8fQL0l3inIaLgf/view?usp=sharing',
  },
  {
    kind: 'Заявление',
    title: 'Заявление о выходе из членов Ассоциации (физическое лицо)',
    description: 'Форма для граждан, прекращающих членство.',
    href: 'https://drive.google.com/file/d/1PTmqvffb-wcaEPCHZozeDDhOne7Byi2i/view?usp=sharing',
  },
  {
    kind: 'Заявление',
    title: 'Заявление о выходе из членов Ассоциации (юридическое лицо)',
    description: 'Форма для организаций, прекращающих членство.',
    href: 'https://drive.google.com/file/d/1adZSVyBWAOp7Aese9HTOZomvzCJOTMZ8/view?usp=sharing',
  },
]

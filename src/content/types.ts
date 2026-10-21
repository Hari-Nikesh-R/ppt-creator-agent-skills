/**
 * Presentation builder data models and type definitions.
 */

export type ThemeName =
  | 'tech-conference'
  | 'dark-technical'
  | 'minimal-corporate'
  | 'premium-business'
  | 'academic-research'
  | 'product-roadmap'
  | 'training-education';

export type LayoutType =
  | 'title'
  | 'agenda'
  | 'section-divider'
  | 'text-image'
  | 'hero-stat'
  | 'column-comparison'
  | 'timeline'
  | 'process-flow'
  | 'architecture-diagram'
  | 'code-example'
  | 'data-chart'
  | 'case-study'
  | 'pros-cons'
  | 'key-takeaways'
  | 'references-closing';

export interface ColorPalette {
  primary: string;       // HEX without '#'
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  success: string;
  warning: string;
  danger: string;
  codeBg: string;
  codeText: string;
}

export interface TypographyTokens {
  fontHeader: string;
  fontBody: string;
  fontCode: string;
  fontSizeTitle: number;
  fontSizeSubtitle: number;
  fontSizeSection: number;
  fontSizeSlideTitle: number;
  fontSizeHeading: number;
  fontSizeBody: number;
  fontSizeCaption: number;
  fontSizeCode: number;
}

export interface ThemeTokens {
  name: ThemeName;
  displayName: string;
  isDark: boolean;
  colors: ColorPalette;
  typography: TypographyTokens;
  borderRadius: number;
  cardPadding: number;
}

export interface SpeakerNotes {
  talkingPoints: string[];
  transition?: string;
  estimatedSeconds?: number;
  references?: string[];
}

export interface SlideReference {
  label: string;
  url: string;
  notes?: string;
}

export interface BaseSlideContent {
  id: string;
  layout: LayoutType;
  title: string;
  kicker?: string;
  subtitle?: string;
  notes?: SpeakerNotes;
  references?: SlideReference[];
}

export interface TitleSlideContent extends BaseSlideContent {
  layout: 'title';
  title: string;
  subtitle: string;
  presenter: string;
  role?: string;
  organization?: string;
  date?: string;
  eventOrContext?: string;
  tags?: string[];
}

export interface AgendaItem {
  number: string;
  title: string;
  description: string;
}

export interface AgendaSlideContent extends BaseSlideContent {
  layout: 'agenda';
  items: AgendaItem[];
  highlightIndex?: number;
}

export interface SectionDividerSlideContent extends BaseSlideContent {
  layout: 'section-divider';
  sectionNumber: string;
  sectionTitle: string;
  summary: string;
  keyTopics?: string[];
}

export interface TextImageSlideContent extends BaseSlideContent {
  layout: 'text-image';
  bodyParagraphs: string[];
  bulletPoints?: string[];
  imagePath?: string;
  imageCaption?: string;
  imagePosition?: 'left' | 'right';
}

export interface HeroStatMetric {
  stat: string;
  label: string;
  detail: string;
}

export interface HeroStatSlideContent extends BaseSlideContent {
  layout: 'hero-stat';
  mainStat: string;
  statLabel: string;
  contextSentence: string;
  supportingMetrics?: HeroStatMetric[];
  calloutNote?: string;
}

export interface ComparisonColumn {
  heading: string;
  badge?: string;
  description?: string;
  bullets: string[];
  highlight?: boolean;
}

export interface ColumnComparisonSlideContent extends BaseSlideContent {
  layout: 'column-comparison';
  columns: ComparisonColumn[];
  comparisonAspects?: string[];
}

export interface TimelineMilestone {
  dateOrPhase: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'future';
  badge?: string;
}

export interface TimelineSlideContent extends BaseSlideContent {
  layout: 'timeline';
  milestones: TimelineMilestone[];
  horizonLabel?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconOrTag?: string;
}

export interface ProcessFlowSlideContent extends BaseSlideContent {
  layout: 'process-flow';
  steps: ProcessStep[];
  outcomeSummary?: string;
}

export interface ArchitectureComponent {
  id: string;
  title: string;
  subtitle?: string;
  layer: 'client' | 'orchestration' | 'execution' | 'infrastructure' | 'storage' | 'external';
  details?: string[];
  badge?: string;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
  protocol?: string;
}

export interface ArchitectureDiagramSlideContent extends BaseSlideContent {
  layout: 'architecture-diagram';
  layers: {
    id: string;
    title: string;
    components: ArchitectureComponent[];
  }[];
  connections?: ArchitectureConnection[];
  keyInsight?: string;
}

export interface CodeExampleSlideContent extends BaseSlideContent {
  layout: 'code-example';
  language: string;
  filename?: string;
  code: string;
  explanationPoints: string[];
  calloutTitle?: string;
}

export interface ChartSeries {
  name: string;
  labels: string[];
  values: number[];
}

export interface DataChartSlideContent extends BaseSlideContent {
  layout: 'data-chart';
  chartType: 'bar' | 'col' | 'line' | 'pie' | 'doughnut';
  series: ChartSeries[];
  dataInsights: string[];
  sourceAttribution?: string;
}

export interface CaseStudySlideContent extends BaseSlideContent {
  layout: 'case-study';
  clientOrContext: string;
  problem: string;
  solution: string;
  results: string[];
  quoteOrTakeaway?: string;
}

export interface ProsConsSlideContent extends BaseSlideContent {
  layout: 'pros-cons';
  conceptName: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

export interface KeyTakeawaysSlideContent extends BaseSlideContent {
  layout: 'key-takeaways';
  takeaways: {
    title: string;
    action: string;
    icon?: string;
  }[];
  callToAction?: string;
}

export interface ReferencesClosingSlideContent extends BaseSlideContent {
  layout: 'references-closing';
  referencesList: {
    title: string;
    authorOrSource: string;
    url: string;
    note?: string;
  }[];
  contactInfo?: {
    name: string;
    role?: string;
    email?: string;
    socialHandle?: string;
    website?: string;
  };
  closingMessage?: string;
}

export type SlideContent =
  | TitleSlideContent
  | AgendaSlideContent
  | SectionDividerSlideContent
  | TextImageSlideContent
  | HeroStatSlideContent
  | ColumnComparisonSlideContent
  | TimelineSlideContent
  | ProcessFlowSlideContent
  | ArchitectureDiagramSlideContent
  | CodeExampleSlideContent
  | DataChartSlideContent
  | CaseStudySlideContent
  | ProsConsSlideContent
  | KeyTakeawaysSlideContent
  | ReferencesClosingSlideContent;

export interface PresentationMetadata {
  title: string;
  topic: string;
  author: string;
  organization?: string;
  targetAudience: string;
  presentationType: string;
  theme: ThemeName;
  aspectRatio: '16:9' | '4:3';
  createdAt: string;
  version: string;
  includeNotes: boolean;
  notes?: string;
}

export interface PresentationModel {
  metadata: PresentationMetadata;
  slides: SlideContent[];
}

export interface ValidationIssue {
  slideIndex: number;
  slideId: string;
  severity: 'error' | 'warning' | 'info';
  category: 'overflow' | 'contrast' | 'structure' | 'missing-content' | 'speaker-notes' | 'references';
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationReport {
  timestamp: string;
  totalSlides: number;
  passed: boolean;
  errorsCount: number;
  warningsCount: number;
  issues: ValidationIssue[];
  metrics: {
    avgWordsPerSlide: number;
    slidesWithNotesCount: number;
    slidesWithReferencesCount: number;
    uniqueLayoutsUsed: string[];
  };
}

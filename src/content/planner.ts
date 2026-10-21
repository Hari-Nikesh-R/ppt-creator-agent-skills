import {
  PresentationModel,
  ThemeName,
  SlideContent,
} from './types.js';

export interface PromptInterpretation {
  topic: string;
  targetAudience: string;
  presentationType: string;
  slideCount: number;
  theme: ThemeName;
  includeNotes: boolean;
  speakerOrAuthor: string;
  organization?: string;
  keyRequirements: string[];
}

/**
 * Parses user natural language prompt into structured presentation parameters.
 */
export function interpretPrompt(promptText: string): PromptInterpretation {
  const lower = promptText.toLowerCase();

  // Extract slide count if specified (e.g., "15-slide", "10 slides", "15 slides")
  const countMatch = lower.match(/(\d+)\s*[- ]*(?:slide|slides|pages)/);
  const slideCount = countMatch ? parseInt(countMatch[1], 10) : 10;

  // Determine audience
  let targetAudience = 'Professional & Technical Audience';
  if (lower.includes('java developer') || lower.includes('experienced java')) {
    targetAudience = 'Experienced Java Developers & Architects';
  } else if (lower.includes('executive') || lower.includes('c-level') || lower.includes('stakeholder')) {
    targetAudience = 'Executive Leadership & Strategic Stakeholders';
  } else if (lower.includes('beginner') || lower.includes('student') || lower.includes('training')) {
    targetAudience = 'Engineering Learners & Practitioners';
  }

  // Determine presentation type
  let presentationType = 'Technical Deep Dive';
  if (lower.includes('conference') || lower.includes('keynote')) {
    presentationType = 'Conference Technical Session';
  } else if (lower.includes('proposal') || lower.includes('pitch')) {
    presentationType = 'Business Proposal';
  } else if (lower.includes('roadmap')) {
    presentationType = 'Product Roadmap';
  }

  // Determine theme
  let theme: ThemeName = 'tech-conference';
  if (lower.includes('dark')) {
    theme = 'dark-technical';
  } else if (lower.includes('corporate') || lower.includes('minimal')) {
    theme = 'minimal-corporate';
  } else if (lower.includes('academic') || lower.includes('research')) {
    theme = 'academic-research';
  } else if (lower.includes('premium') || lower.includes('business')) {
    theme = 'premium-business';
  } else if (lower.includes('roadmap') || lower.includes('product')) {
    theme = 'product-roadmap';
  }

  const includeNotes = !lower.includes('no notes') && !lower.includes('without notes');

  // Key requirements
  const keyRequirements: string[] = [];
  if (lower.includes('diagram') || lower.includes('architecture')) keyRequirements.push('architecture-diagrams');
  if (lower.includes('code') || lower.includes('example')) keyRequirements.push('code-examples');
  if (lower.includes('comparison') || lower.includes('compare')) keyRequirements.push('comparisons');
  if (lower.includes('notes') || lower.includes('speaker notes')) keyRequirements.push('speaker-notes');
  if (lower.includes('reference') || lower.includes('citation')) keyRequirements.push('references');

  return {
    topic: promptText.slice(0, 100),
    targetAudience,
    presentationType,
    slideCount,
    theme,
    includeNotes,
    speakerOrAuthor: 'Senior AI & Java Systems Architect',
    organization: 'Technical Conference 2026',
    keyRequirements,
  };
}

/**
 * Creates an outline and slide plan for the requested topic.
 */
export function buildPresentationOutline(model: PresentationModel): string {
  const lines: string[] = [
    `# Presentation Outline: ${model.metadata.title}`,
    `**Audience:** ${model.metadata.targetAudience}  `,
    `**Type:** ${model.metadata.presentationType} | **Theme:** ${model.metadata.theme} | **Total Slides:** ${model.slides.length}`,
    '',
    '## Slide-by-Slide Narrative Flow',
  ];

  model.slides.forEach((slide, idx) => {
    lines.push(`### Slide ${idx + 1}: ${slide.title}`);
    lines.push(`- **Layout:** \`${slide.layout}\``);
    if (slide.kicker) lines.push(`- **Kicker:** *${slide.kicker}*`);
    if (slide.subtitle) lines.push(`- **Subtitle:** ${slide.subtitle}`);
    if (slide.notes?.talkingPoints && slide.notes.talkingPoints.length > 0) {
      lines.push(`- **Key Talking Points:**`);
      slide.notes.talkingPoints.forEach((p) => lines.push(`  - ${p}`));
    }
    if (slide.references && slide.references.length > 0) {
      lines.push(`- **References:**`);
      slide.references.forEach((r) => lines.push(`  - [${r.label}](${r.url})`));
    }
    lines.push('');
  });

  return lines.join('\n');
}

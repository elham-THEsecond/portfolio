/**
 * Core TypeScript definitions for Elham's 2025+ Interactive 3D Portfolio
 */

export type DeviceTier = 'high' | 'medium' | 'low';

export interface ProjectArchitecture {
  stateManagement: 'Riverpod 2.x' | 'BLoC 8.x' | 'MobX' | 'StateNotifier';
  renderEngine: 'Flutter Impeller / Skia' | 'Custom Metal / Vulkan Shaders' | 'Custom Painters & RenderObjects';
  keyPatterns: string[];
  performanceBudget: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ScreenContent {
  type: 'shader' | 'canvas' | 'mockup' | 'video';
  accentColor: string;
  bgGradient: string;
  title: string;
  subtitle: string;
  icon: string;
  mockupData: {
    headerTitle: string;
    metrics: { label: string; val: string }[];
    recentEvents: { name: string; detail: string; status: 'ok' | 'sync' | 'alert' }[];
  };
}

export interface Project3DState {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  category: 'mobile' | 'system' | 'shader';
  year: string;
  featured: boolean;
  architecture: ProjectArchitecture;
  metrics: ProjectMetric[];
  tags: string[];
  links: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
    caseStudy?: string;
  };
  phoneTransform: Project3DState;
  screenContent: ScreenContent;
}

export interface TerminalCommand {
  command: string;
  description?: string;
  output: string[];
}

export interface LabItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'ai-agent' | 'cli-tool' | 'runtime' | 'benchmark';
  status: 'active' | 'shipped' | 'experimental';
  version: string;
  stars?: number;
  tags: string[];
  terminal: TerminalCommand;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  bentoSize: 'normal' | 'wide' | 'tall';
}

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  manifesto: string;
  technicalRule: string;
  badge: string;
  tags: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'email' | 'resume';
  label: string;
  url: string;
  handle: string;
  highlight?: boolean;
}

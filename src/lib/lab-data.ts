import { LabItem, PhilosophyPillar, SocialLink } from '@/types';

export const LAB_ITEMS: LabItem[] = [
  {
    id: 'lab-dart-trace',
    slug: 'dart-trace',
    title: 'dart-trace',
    tagline: 'Zero-overhead frame timing & widget rebuild profiler for Dart VM',
    description:
      'High-resolution CLI profiler that attaches to the Dart VM Service Protocol. Intercepts frame rasterization times, flags unnecessary widget rebuild cascades, and outputs sub-millisecond timeline traces.',
    category: 'cli-tool',
    status: 'active',
    version: 'v1.4.2',
    stars: 340,
    tags: ['Dart', 'CLI', 'Performance', 'VM Service', 'Profiler'],
    terminal: {
      command: 'dart-trace --target=app.dart --budget=16.6ms --watch',
      description: 'Attaches to VM protocol and streams live frame timings',
      output: [
        '[OK] Connected to Dart VM at ws://127.0.0.1:8181/ws',
        '[STREAM] Sampling Impeller UI & Raster pipelines...',
        '[FRAME #1420] 4.12ms (UI: 2.10ms | Raster: 2.02ms) [60fps OK]',
        '[FRAME #1421] 3.88ms (UI: 1.95ms | Raster: 1.93ms) [60fps OK]',
        '[FRAME #1422] 4.45ms (UI: 2.30ms | Raster: 2.15ms) [60fps OK]',
        '[AUDIT] 0 jank spikes detected across 1,500 consecutive frames.',
      ],
    },
    githubUrl: 'https://github.com/elham/dart-trace',
    featured: true,
    bentoSize: 'wide',
  },
  {
    id: 'lab-graphify',
    slug: 'graphify-agent',
    title: 'graphify',
    tagline: 'Autonomous AST & architectural knowledge graph generator',
    description:
      'Translates massive codebases into queryable knowledge graphs with god-node detection and community clustering. Allows local AI agents to answer complex architectural queries without context dilution.',
    category: 'ai-agent',
    status: 'active',
    version: 'v2.1.0',
    stars: 820,
    tags: ['AI Agent', 'TypeScript', 'AST Analysis', 'Knowledge Graph', 'LLM'],
    terminal: {
      command: 'graphify analyze ./src --output=graph.json --detect-god-nodes',
      description: 'Parses codebase AST and clusters modular dependencies',
      output: [
        '[GRAPH] 420 source files indexed (18,400 AST nodes)',
        '[COMMUNITY] 8 cohesive architecture clusters identified',
        '[GOD-NODES] Found 1 high-centrality coordinator in /core/dispatcher.dart',
        '[REPORT] Modularity score: 94/100 • Generated interactive graph.json',
      ],
    },
    githubUrl: 'https://github.com/elham/graphify',
    featured: true,
    bentoSize: 'normal',
  },
  {
    id: 'lab-rea',
    slug: 'rea-engine',
    title: 'rea (Reverse Engineer)',
    tagline: 'Automated binary inspection & mobile artifact reconstructor',
    description:
      'Multi-engine CLI orchestrating APK, Mach-O, and WebAssembly deconstruction. Extracts Dart AOT snapshots, verifies JNI boundaries, and audits production mobile security posture.',
    category: 'runtime',
    status: 'shipped',
    version: 'v6.7.0',
    stars: 560,
    tags: ['Reverse Engineering', 'Rust', 'Dart AOT', 'Security', 'CLI'],
    terminal: {
      command: 'rea inspect ./app-release.apk --extract-dart-snapshots',
      description: 'Extracts Flutter AOT snapshot symbols and checks security',
      output: [
        '[INSPECT] Target: Flutter v3.24.1 (arm64-v8a)',
        '[SNAPSHOT] Isolated 482 Dart class descriptors & symbol strings',
        '[SECURITY] ProGuard obfuscation verified on JNI platform bindings',
        '[REPORT] Zero plaintext API tokens found in compiled strings.',
      ],
    },
    githubUrl: 'https://github.com/elham/rea',
    featured: true,
    bentoSize: 'normal',
  },
  {
    id: 'lab-riverpod-devlens',
    slug: 'riverpod-devlens',
    title: 'Riverpod DevLens',
    tagline: 'Real-time reactive state visualizer & time-travel debugger',
    description:
      'Developer tool that hooks into Riverpod ProviderContainer lifecycles. Renders an interactive live tree showing state diffs, cascade updates, and unobserved provider disposal.',
    category: 'cli-tool',
    status: 'active',
    version: 'v0.9.4',
    stars: 290,
    tags: ['Riverpod', 'DevTools', 'State Management', 'WebSockets', 'Flutter'],
    terminal: {
      command: 'devlens listen --port=9222 --filter=authProvider,marketProvider',
      description: 'Streams live Riverpod state transitions in real time',
      output: [
        '[DEV-LENS] Attached to ProviderContainer on port 9222',
        '[STATE-CHANGE] userProfileProvider: null -> State(id: "usr_99", verified: true)',
        '[REBUILD-CASCADE] 2 consumer widgets updated in 0.14ms',
        '[STATE-CHANGE] marketTickerProvider: updated 24 values without leak',
      ],
    },
    githubUrl: 'https://github.com/elham/riverpod-devlens',
    featured: true,
    bentoSize: 'normal',
  },
  {
    id: 'lab-impeller-play',
    slug: 'impeller-playground',
    title: 'impeller-play',
    tagline: 'Live GLSL shader previewer & Spir-V cross-compiler',
    description:
      'Lightweight local shader compiler for Flutter Impeller. Cross-compiles GLSL fragment shaders to Metal Shading Language (MSL) and Vulkan Spir-V with real-time viewport feedback.',
    category: 'benchmark',
    status: 'experimental',
    version: 'v0.4.1',
    tags: ['GLSL', 'Impeller', 'Shaders', 'Metal', 'Vulkan'],
    terminal: {
      command: 'impeller-play pulse.frag --backend=metal --validate-spirv',
      description: 'Live-compiles GLSL shader and tests Metal compatibility',
      output: [
        '[VALIDATE] Spir-V bytecode compliant with Apple GPU Family 7+',
        '[TRANSLATE] MSL fragment entrypoint generated cleanly',
        '[COMPILER] 0 warnings • Target execution time: 0.8ms/frame',
        '[VIEWPORT] Live test loop rendering at 120Hz',
      ],
    },
    githubUrl: 'https://github.com/elham/impeller-play',
    featured: false,
    bentoSize: 'normal',
  },
];

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    id: 'pillar-60fps',
    number: '01',
    title: 'The 60fps Standard',
    subtitle: 'Zero-Jank Discipline',
    manifesto:
      'A fluid interface is not a visual bonus; it is the fundamental baseline of trust. We measure frame execution budgets in microseconds, isolate state mutations to precise leaf nodes, and treat any dropped frame on a 120Hz display as an engineering defect.',
    technicalRule:
      'Main-thread frame time < 16.6ms (60Hz) or < 8.3ms (120Hz ProMotion). Expensive layout calculations, JSON deserialization, and encryption are offloaded to Dart Isolates.',
    badge: '16.6ms Hard Ceiling',
    tags: ['Impeller', 'Isolates', 'RepaintBoundaries', 'Frame Budgets'],
  },
  {
    id: 'pillar-physics',
    number: '02',
    title: 'Physical Direct Manipulation',
    subtitle: 'Tactile Momentum & Interruptibility',
    manifesto:
      'Gestures must possess physical weight and velocity. Touches should never feel like triggers that lock user input; every motion must be completely interruptible and fluidly change direction without jarring state resets.',
    technicalRule:
      'Critically damped spring transitions (damping: 1.0, response: 0.35s). Zero fixed-duration linear transitions on direct user gestures.',
    badge: 'Critically Damped Springs',
    tags: ['GestureArena', 'Custom RenderObjects', 'CoreHaptics', 'Spring Physics'],
  },
  {
    id: 'pillar-state',
    number: '03',
    title: 'Architectural Determinism',
    subtitle: 'Unidirectional Data Flow & Immutability',
    manifesto:
      'State should be single-source, predictable, and fully inspectable. We favor explicit dependency injection and selective listeners (Riverpod / BLoC) that prevent full-tree re-renders and guarantee zero side-effect leaks.',
    technicalRule:
      'Immutable state entities with compile-time code generation. UI rebuilds scoped to minimal affected widgets with zero whole-screen setState calls.',
    badge: 'Pure State Graphs',
    tags: ['Riverpod', 'BLoC', 'Code Generation', 'Pure Functions'],
  },
  {
    id: 'pillar-platform',
    number: '04',
    title: 'Deep Native Fidelity',
    subtitle: 'Beyond Cross-Platform Parity',
    manifesto:
      'Cross-platform development must never feel generic or sluggish. We leverage Dart FFI and low-level Platform Channels to command hardware capabilities, specialized audio buffers, and custom native shaders directly.',
    technicalRule:
      'Dart FFI zero-copy memory transfers for heavy native C/C++ libraries. Adaptive platform styling respecting iOS and Android interaction paradigms.',
    badge: 'Zero-Copy FFI',
    tags: ['Dart FFI', 'Platform Channels', 'Metal', 'Vulkan'],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/elham',
    handle: '@elham',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/elham',
    handle: 'in/elham',
  },
  {
    platform: 'x',
    label: 'X (Twitter)',
    url: 'https://x.com/elham_dev',
    handle: '@elham_dev',
  },
  {
    platform: 'email',
    label: 'Email',
    url: 'mailto:elham@example.com',
    handle: 'elham@example.com',
    highlight: true,
  },
  {
    platform: 'resume',
    label: 'Download CV',
    url: '/assets/Elham_Mobile_Engineer_Resume.pdf',
    handle: 'Resume PDF',
  },
];

import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'project-pulse',
    slug: 'pulse-telemetry',
    title: 'Pulse Telemetry',
    tagline: 'Real-time cardiovascular telemetry & biometrics engine',
    description:
      'High-frequency medical telemetry client designed for wearable sensors. Employs custom Flutter Impeller GLSL shaders to render continuous 120Hz waveform graphs without triggering garbage collection overhead on the main thread.',
    role: 'Lead Mobile Architect & Interaction Engineer',
    category: 'mobile',
    year: '2025',
    featured: true,
    architecture: {
      stateManagement: 'Riverpod 2.x',
      renderEngine: 'Custom Metal / Vulkan Shaders',
      keyPatterns: [
        'Zero-allocation Isolate worker streams',
        'Custom Impeller FragmentShader pipeline',
        'Offline-first drift/SQLite encrypted ring buffer',
        'Platform Channels for low-level BLE GATT scheduling',
      ],
      performanceBudget: 'Locked 60/120fps; < 8.2ms per frame render budget',
    },
    metrics: [
      { label: 'Render Budget', value: '8.2ms', description: 'Avg frame time on 120Hz ProMotion' },
      { label: 'Signal Jitter', value: '0.0ms', description: 'Zero dropped frames during stream' },
      { label: 'Active Users', value: '180K+', description: 'Across iOS and Android health clinics' },
    ],
    tags: ['Flutter 3.x', 'GLSL Shaders', 'Riverpod', 'Dart Isolates', 'BLE GATT', 'Impeller'],
    links: {
      github: 'https://github.com/elham/pulse-telemetry',
      live: 'https://pulse.elham.dev',
      caseStudy: '/case-study/pulse',
    },
    phoneTransform: {
      rotation: [0.08, -0.25, 0.04],
      position: [0, 0, 0],
      scale: 1,
    },
    screenContent: {
      type: 'shader',
      accentColor: '#22d3ee',
      bgGradient: 'from-cyan-950/40 via-zinc-950 to-black',
      title: 'PULSE // LIVE',
      subtitle: 'HRV 68ms • 72 BPM • NSR',
      icon: 'Activity',
      mockupData: {
        headerTitle: 'Biometric Stream #04',
        metrics: [
          { label: 'HR', val: '72 BPM' },
          { label: 'SpO2', val: '99%' },
          { label: 'Resp', val: '14/m' },
        ],
        recentEvents: [
          { name: 'Sinus Rhythm Normal', detail: 'Isolate filter: Passband 0.5-40Hz', status: 'ok' },
          { name: 'BLE Sync Latency', detail: '2.4ms BLE L2CAP packet loop', status: 'sync' },
          { name: 'Impeller Pipeline', detail: 'Fragment shader cached at boot', status: 'ok' },
        ],
      },
    },
  },
  {
    id: 'project-aura',
    slug: 'aura-spatial',
    title: 'Aura Spatial Synth',
    tagline: 'Multi-touch spatial audio controller & haptic canvas',
    description:
      'Expressive sound design tool bridging direct manipulation physics with sub-5ms audio synthesis. Features custom RenderObjects that translate 10-finger multi-touch vectors into MIDI/OSC parameters with tactile haptic feedback.',
    role: 'Principal Engineer & UI/UX Designer',
    category: 'mobile',
    year: '2024',
    featured: true,
    architecture: {
      stateManagement: 'BLoC 8.x',
      renderEngine: 'Custom Painters & RenderObjects',
      keyPatterns: [
        'Dart FFI bridge to C++ CoreAudio & Oboe engine',
        'Custom GestureArena recognizers for 10-touch polyphony',
        'CoreHaptics AHAP transient waveform synthesis',
        'Zero-latency canvas repaint boundaries',
      ],
      performanceBudget: 'Sub-5ms end-to-end touch-to-sound latency',
    },
    metrics: [
      { label: 'Audio Latency', value: '4.2ms', description: 'Measured via external acoustic loopback' },
      { label: 'Touch Polling', value: '120Hz', description: 'Direct RenderObject hit testing' },
      { label: 'Crash Rate', value: '0.01%', description: '99.99% crash-free stability' },
    ],
    tags: ['Flutter', 'Dart FFI', 'C++', 'CoreAudio', 'BLoC', 'Custom Gestures', 'Haptics'],
    links: {
      github: 'https://github.com/elham/aura-synth',
      live: 'https://aura.elham.dev',
      caseStudy: '/case-study/aura',
    },
    phoneTransform: {
      rotation: [0.28, 0.42, -0.12],
      position: [0, 0, 0],
      scale: 1,
    },
    screenContent: {
      type: 'canvas',
      accentColor: '#a855f7',
      bgGradient: 'from-purple-950/40 via-zinc-950 to-black',
      title: 'AURA // ENGINE',
      subtitle: 'Polyphonic Matrix • 8 Voices',
      icon: 'Sliders',
      mockupData: {
        headerTitle: 'Spatial Node Matrix',
        metrics: [
          { label: 'Voices', val: '8 Poly' },
          { label: 'Latency', val: '4.2ms' },
          { label: 'Output', val: '24-bit' },
        ],
        recentEvents: [
          { name: 'CoreAudio FFI Bind', detail: 'Zero-copy ring buffer initialized', status: 'ok' },
          { name: 'Touch Arena Match', detail: 'Polyphonic velocity registered', status: 'ok' },
          { name: 'AHAP Transient', detail: 'Hardware haptic wave dispatched', status: 'sync' },
        ],
      },
    },
  },
  {
    id: 'project-vertex',
    slug: 'vertex-terminal',
    title: 'Vertex Terminal',
    tagline: 'High-frequency institutional crypto orderbook & tape',
    description:
      'Trading terminal engineered to ingest and render 5,000+ WebSocket L2 market delta updates every second without dropping a single frame, leveraging selective Riverpod subscriptions and zero-copy binary buffer decoders.',
    role: 'Mobile Systems Lead',
    category: 'mobile',
    year: '2024',
    featured: true,
    architecture: {
      stateManagement: 'Riverpod 2.x',
      renderEngine: 'Flutter Impeller / Skia',
      keyPatterns: [
        'FlatBuffers schema compilation for binary deltas',
        'Off-thread Isolate tree aggregation for order depth',
        'Custom Canvas Candlestick & Volume micro-cache',
        'Selective Provider rebuild selectors targeting single cells',
      ],
      performanceBudget: 'Stable 60fps under 5,000 JSON/binary msgs/sec stress load',
    },
    metrics: [
      { label: 'Ingestion Rate', value: '5.2K/s', description: 'Market updates processed seamlessly' },
      { label: 'CPU Overhead', value: '-62%', description: 'Compared to standard JSON serialization' },
      { label: 'Execution', value: 'Sub-1ms', description: 'Internal action dispatch latency' },
    ],
    tags: ['Flutter', 'Riverpod', 'FlatBuffers', 'WebSockets', 'Isolates', 'Financial UI'],
    links: {
      github: 'https://github.com/elham/vertex-terminal',
      live: 'https://vertex.elham.dev',
      caseStudy: '/case-study/vertex',
    },
    phoneTransform: {
      rotation: [0.18, -0.38, 0.08],
      position: [0, 0, 0],
      scale: 1,
    },
    screenContent: {
      type: 'mockup',
      accentColor: '#10b981',
      bgGradient: 'from-emerald-950/40 via-zinc-950 to-black',
      title: 'VERTEX // L2',
      subtitle: 'BTC/USDT • $94,820.00 • +4.2%',
      icon: 'TrendingUp',
      mockupData: {
        headerTitle: 'Orderbook Depth L2',
        metrics: [
          { label: 'Spread', val: '0.01%' },
          { label: '24h Vol', val: '$1.4B' },
          { label: 'Speed', val: '0.8ms' },
        ],
        recentEvents: [
          { name: 'WebSocket Feed Synced', detail: '5,200 deltas/sec ingested on worker isolate', status: 'ok' },
          { name: 'Order Matching Engine', detail: 'Selective rebuild applied to top 5 levels', status: 'ok' },
          { name: 'Micro-cache Reused', detail: 'Candlestick canvas raster reused', status: 'sync' },
        ],
      },
    },
  },
  {
    id: 'project-kite',
    slug: 'kite-gis',
    title: 'Kite Spatial GIS',
    tagline: 'Offline-first autonomous UAV flight operations suite',
    description:
      'Field operations suite for autonomous drone swarms. Integrates SpatiaLite spatial database engines directly inside Flutter to render 10M+ offline vector geometry points with real-time waypoint trajectory calculation.',
    role: 'Lead Mobile Engineer',
    category: 'system',
    year: '2023',
    featured: true,
    architecture: {
      stateManagement: 'BLoC 8.x',
      renderEngine: 'Custom Painters & RenderObjects',
      keyPatterns: [
        'SpatiaLite C library compiled for arm64-v8a and Apple Silicon',
        'Custom vector tile rasterizer with Level-of-Detail LOD pyramids',
        'Mesh-radio peer synchronization via LoRa BLE bridge',
        'Background Geofencing supervisor daemon',
      ],
      performanceBudget: 'Continuous battery-friendly 60fps tracking over 8-hour missions',
    },
    metrics: [
      { label: 'Offline Data', value: '100%', description: 'Fully zero-internet mission ready' },
      { label: 'Points Rendered', value: '10M+', description: 'Smooth map pan & zoom with LOD' },
      { label: 'RAM Footprint', value: '<24MB', description: 'Peak memory usage during 3D terrain' },
    ],
    tags: ['Flutter', 'SpatiaLite', 'GIS', 'C / C++', 'BLoC', 'Drone Telemetry', 'Offline-First'],
    links: {
      github: 'https://github.com/elham/kite-gis',
      caseStudy: '/case-study/kite',
    },
    phoneTransform: {
      rotation: [0.32, 0.22, -0.06],
      position: [0, 0, 0],
      scale: 1,
    },
    screenContent: {
      type: 'shader',
      accentColor: '#f59e0b',
      bgGradient: 'from-amber-950/40 via-zinc-950 to-black',
      title: 'KITE // UAV-01',
      subtitle: 'ALT 142m • GPS 3D LOCK • MESH 98%',
      icon: 'Navigation',
      mockupData: {
        headerTitle: 'Autonomous Flight Track',
        metrics: [
          { label: 'Alt', val: '142m' },
          { label: 'Speed', val: '18m/s' },
          { label: 'Sat', val: '14 FIX' },
        ],
        recentEvents: [
          { name: 'SpatiaLite Query', detail: 'Spatial index lookup completed in 1.1ms', status: 'ok' },
          { name: 'Mesh LoRa Protocol', detail: 'Peer heartbeat confirmed with swarm lead', status: 'ok' },
          { name: 'Trajectory Safe', detail: 'No terrain elevation conflicts detected', status: 'sync' },
        ],
      },
    },
  },
];

# Jampack - Static Website Optimizer

## Project Overview

Jampack is a TypeScript-based post-processing tool that optimizes static websites for Core Web Vitals and user experience. It's not a bundler or framework, but rather takes the output of Static Site Generators (SSGs) and applies comprehensive optimizations.

**Current Branch**: `offload-scripts` - Working on script optimization features

## Architecture

### Two-Pass Processing
1. **Pass 1 (Optimize)**: Content-aware optimizations (images, CSS, scripts)
2. **Pass 2 (Compress)**: Asset compression while preserving filenames

### Core Modules

- **`src/index.ts`** - CLI entry point using Commander.js
- **`src/optimize.ts`** - Main optimization engine (Pass 1)
- **`src/compress.ts`** - Compression engine (Pass 2)
- **`src/config.ts`** - Type-safe configuration management
- **`src/state.ts`** - Global state management for optimization process

### Key Dependencies

- **Sharp** - Image processing and format conversion
- **Cheerio** - HTML parsing and manipulation
- **LightningCSS** - CSS optimization and minification
- **ESBuild/SWC** - JavaScript optimization
- **Critters** - Critical CSS extraction
- **defer.js** - Script loading optimization

## Main Features

### Image Optimization (`src/optimizers/image/`)
- Responsive image generation with srcset
- WebP and AVIF format conversion
- Lazy loading for below-the-fold images
- CDN image optimization (Unsplash, etc.)
- External image downloading and optimization

### Script Processing (`src/optimizers/script/`)
- Script deferral with defer.js integration
- Script offloading for non-critical resources
- Pattern-based script matching
- Loading strategy optimization

### CSS Optimization
- Critical CSS inlining to prevent FOUC
- Non-critical CSS lazy loading
- CSS compression with LightningCSS

### Performance Features
- Above/below-the-fold detection
- Link prefetching with quicklink
- Asset compression (HTML, CSS, JS, SVG, images)
- Viewport-based optimization strategies

## Configuration System

Configuration is managed through `src/config.ts` with TypeScript types for safety:

```typescript
interface Config {
  general: {
    verbose?: boolean;
    cache?: boolean;
    nocache?: boolean;
  };
  // ... extensive configuration options
}
```

### Configuration Modes
- **Default**: Balanced optimization
- **Fast**: Quick processing with basic optimizations
- **Custom**: Full control over all options

### Key Configuration Areas
- Browser compatibility targeting
- Image processing options (formats, quality, sizes)
- Script processing patterns
- CSS optimization settings
- Compression options per file type

## Development Workflow

### Build Process
```bash
# Development
pnpm build --watch

# Production build
pnpm build  # Compiles TypeScript to dist/

# Test with demo
pnpm try    # Uses demo_drc -> demo for testing
```

### Code Quality
```bash
pnpm lint   # ESLint with TypeScript support
```

### Project Structure
```
src/
├── index.ts              # CLI entry point
├── optimize.ts           # Main optimizer
├── compress.ts           # Asset compressor
├── config.ts             # Configuration
├── state.ts              # Global state
├── optimizers/           # Feature-specific optimizers
│   ├── image/
│   ├── script/
│   ├── css/
│   └── ...
├── compressors/          # File type compressors
├── utils/                # Utility functions
└── types/                # TypeScript definitions
```

## Key Files to Understand

### Core Processing
- **`src/optimize.ts:712`** - Main optimization loop
- **`src/compressors/`** - Individual file type processors
- **`src/optimizers/image/`** - Image processing pipeline

### Configuration
- **`src/config.ts`** - Configuration schema and defaults
- **`jampack.config.js`** - User configuration file (optional)

### Recent Development
- **Script optimization** - Integration with defer.js for script loading
- **Pattern matching** - Flexible script processing based on patterns
- **Performance metrics** - Core Web Vitals optimization focus

## Testing

Currently uses manual testing with demo sites:
- **`demo_drc/`** - Source demo content
- **`demo/`** - Processed output for testing
- **`pnpm try`** - Quick test command

## Package Management

- **Package Manager**: pnpm (preferred)
- **Node Version**: >=14.0.0
- **Module Type**: ES modules
- **TypeScript**: Strict compilation

## CLI Usage

```bash
# Basic usage
npx @divriots/jampack ./dist

# With options
jampack ./dist --verbose --fast
```

## Common Development Tasks

### Adding New Optimizers
1. Create optimizer in `src/optimizers/`
2. Register in main optimization loop
3. Add configuration options to config schema
4. Update TypeScript types

### Adding New Compressors
1. Implement in `src/compressors/`
2. Add file type detection
3. Configure compression settings
4. Test with sample files

### Debugging
- Use `--verbose` flag for detailed logging
- Check `state.ts` for processing metrics
- Monitor file size changes in output

## Performance Considerations

- **Memory**: Large image processing requires significant RAM
- **CPU**: Image conversion and compression are CPU-intensive
- **Caching**: Built-in caching system for faster subsequent runs
- **Parallel Processing**: Optimizers run concurrently where possible

## Recent Features (Current Branch)

Working on script optimization features:
- Script deferral patterns
- Offloading non-critical scripts
- Integration with @shinsenter/defer.js
- Performance-focused script loading strategies
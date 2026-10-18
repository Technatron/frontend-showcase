# GSAP — Complete Reference & Notes
> Based on official GSAP docs (gsap.com) + real usage from this project

---

## Table of Contents
1. [What is GSAP](#1-what-is-gsap)
2. [Core Methods](#2-core-methods)
3. [Easing](#3-easing)
4. [Stagger](#4-stagger)
5. [Timeline](#5-timeline)
6. [ScrollTrigger Plugin](#6-scrolltrigger-plugin)
7. [gsap.context — React Safety](#7-gsapcontext--react-safety)
8. [gsap.utils.toArray](#8-gsaputilstoarray)
9. [useGSAP Hook](#9-usegsap-hook)
10. [AnimatedTitle — Full Breakdown](#10-animatedtitle--full-breakdown)
11. [Hero Component — GSAP Usage](#11-hero-component--gsap-usage)
12. [About Component — GSAP Usage](#12-about-component--gsap-usage)
13. [Common Mistakes & Fixes](#13-common-mistakes--fixes)

---

## 1. What is GSAP

GSAP (GreenSock Animation Platform) is a JavaScript animation library that animates anything JavaScript can touch — DOM elements, SVG, canvas, React refs, plain objects, etc.

It is framework-agnostic but has first-class React support via `@gsap/react`.

**Install:**
```bash
npm install gsap @gsap/react
```

**Core import:**
```ts
import gsap from 'gsap';
```

**Plugin import:**
```ts
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
```

> Always register plugins ONCE, outside of components, at the module level.

---

## 2. Core Methods

### gsap.to()
Animates FROM the element's current state TO the values you provide.

```ts
gsap.to('.box', {
    x: 200,        // move 200px right
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
});
```

### gsap.from()
Animates FROM the values you provide TO the element's current/natural state.

```ts
gsap.from('.box', {
    y: -100,       // starts 100px above, lands at natural position
    opacity: 0,
    duration: 1
});
```

### gsap.fromTo()
You explicitly define BOTH the start and end state. Most predictable — nothing is assumed.

```ts
gsap.fromTo('.box',
    { opacity: 0, x: -200 },   // FROM
    { opacity: 1, x: 0, duration: 1 }  // TO
);
```

> Used in AnimatedTitle for the scatter-to-gather effect because each word needs a random starting position that GSAP cannot infer on its own.

### gsap.set()
Instantly sets properties with no animation. Used to establish an initial state before a timeline or scroll-triggered animation runs.

```ts
gsap.set('.box', { opacity: 0, y: 100 });
```

---

## 3. Easing

Easing controls the acceleration curve of an animation — how it speeds up and slows down.

### Ease families

| Family     | Description                                      |
|------------|--------------------------------------------------|
| `power1`   | Gentle, subtle                                   |
| `power2`   | Moderate — most common default                   |
| `power3`   | Strong acceleration/deceleration                 |
| `power4`   | Very aggressive                                  |
| `elastic`  | Overshoots and bounces back like a spring        |
| `bounce`   | Bounces at the end like a ball dropping          |
| `back`     | Slightly overshoots then settles                 |
| `circ`     | Circular motion curve                            |
| `expo`     | Exponential — very fast then very slow           |
| `sine`     | Smooth sine wave curve                           |
| `none`     | Linear — constant speed, no easing              |

### Ease modifiers

Each family supports three modifiers:

| Modifier | Meaning                                  |
|----------|------------------------------------------|
| `.in`    | Starts slow, ends fast                   |
| `.out`   | Starts fast, ends slow ← most natural    |
| `.inOut` | Slow start, fast middle, slow end        |

```ts
ease: 'power3.out'   // fast entry, gentle landing ← used in AnimatedTitle
ease: 'power1.inOut' // used in Hero video transitions
ease: 'elastic.out(1, 0.3)' // bouncy spring settle
```

> `power3.out` is ideal for the scatter-gather effect — words fly in fast and decelerate smoothly into position, which feels natural and satisfying.

---

## 4. Stagger

Stagger delays the start of each element's animation so they don't all move at once.

### Simple stagger (number)
```ts
gsap.to('.word', {
    opacity: 1,
    stagger: 0.05  // each word starts 0.05s after the previous
});
```

### Advanced stagger (object)
```ts
stagger: {
    amount: 0.8,      // total time distributed across ALL elements
    from: 'random',   // order: 'start' | 'end' | 'center' | 'random' | index number
    ease: 'power1.in' // easing applied to the stagger distribution itself
}
```

| `from` value | Behavior                                      |
|--------------|-----------------------------------------------|
| `'start'`    | First element animates first (left to right)  |
| `'end'`      | Last element animates first (right to left)   |
| `'center'`   | Middle elements animate first                 |
| `'random'`   | Random order — used in AnimatedTitle          |
| `0` (index)  | Starts from that specific element index       |

> `from: 'random'` is critical to the scatter-gather effect. If words arrived in order (left to right), it would look like a typewriter. Random arrival reinforces the "gathering from chaos" feel.

---

## 5. Timeline

A timeline sequences multiple animations with precise control over timing and overlap.

```ts
const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.out' }, // shared defaults
    onComplete: () => console.log('done'),
    repeat: -1,   // -1 = loop forever
    yoyo: true    // reverses on each repeat
});

tl.to('.box1', { x: 100 })
  .to('.box2', { y: 50 }, '-=0.5')  // starts 0.5s before previous ends
  .from('.box3', { opacity: 0 }, '+=0.2') // starts 0.2s after previous ends
  .to('.box4', { scale: 2 }, '<')   // starts at same time as previous
```

### Position parameter (3rd argument)

| Value      | Meaning                                         |
|------------|-------------------------------------------------|
| `'+=0.5'`  | 0.5s after previous animation ends             |
| `'-=0.5'`  | 0.5s before previous animation ends (overlap)  |
| `'<'`      | Same start time as previous animation           |
| `'<0.5'`   | 0.5s after the START of previous animation      |
| `2`        | Absolute time — at exactly 2 seconds            |
| `'myLabel'`| Jump to a named label                           |

### Timeline with ScrollTrigger
```ts
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#section',
        start: 'top center',
        end: 'bottom center',
        scrub: true
    }
});

tl.to('.el1', { x: 100 })
  .to('.el2', { opacity: 0 });
```
> Used in About.tsx — the clip-path expansion is a timeline driven by scroll scrubbing.

---

## 6. ScrollTrigger Plugin

ScrollTrigger links animations to the scroll position.

**Register once at module level:**
```ts
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
```

### Core properties

```ts
scrollTrigger: {
    trigger: '#section',      // element that triggers the animation
    start: 'top center',      // [trigger position] [viewport position]
    end: 'bottom top',        // when to end
    scrub: true,              // ties animation progress to scroll position
    pin: true,                // pins the trigger element during animation
    pinSpacing: true,         // adds space after pinned element
    markers: true,            // shows debug markers (dev only)
    toggleActions: 'play none none reverse',
    onEnter: () => {},
    onLeave: () => {},
    onEnterBack: () => {},
    onLeaveBack: () => {}
}
```

### start / end syntax

Format: `'[trigger edge] [viewport edge]'`

```
start: 'top bottom'      // when top of trigger hits bottom of viewport
start: 'center center'   // when center of trigger hits center of viewport
start: '100 bottom'      // 100px from top of trigger hits bottom of viewport
end: '+=800 center'      // 800px after start position
```

### toggleActions

Controls what happens at each of the 4 scroll events:
`'onEnter onLeave onEnterBack onLeaveBack'`

```ts
toggleActions: 'play none none reverse'
//              ↑     ↑     ↑          ↑
//           enter  leave  re-enter  scroll back up
```

| Value     | Meaning                          |
|-----------|----------------------------------|
| `play`    | Play forward                     |
| `pause`   | Pause at current position        |
| `resume`  | Resume from paused position      |
| `reverse` | Play in reverse                  |
| `restart` | Restart from beginning           |
| `reset`   | Jump back to start state         |
| `none`    | Do nothing                       |

### scrub

```ts
scrub: true      // animation progress = scroll progress (instant sync)
scrub: 0.5       // 0.5s lag — smoother, feels more physical
scrub: 2         // 2s lag — very smooth, cinematic
```

> Used in About.tsx with `scrub: 0.5` for the clip-path reveal. Used in Hero.tsx with `scrub: true` for the polygon clip-path morph.

### pin

```ts
pin: true         // sticks the trigger element to viewport while scrolling
pinSpacing: true  // pushes content below down to make room
```

> Used in About.tsx to freeze the section while the image expands.

---

## 7. gsap.context — React Safety

`gsap.context()` scopes all GSAP animations and selectors to a specific DOM subtree. When you call `.revert()`, it undoes ALL animations created inside that context — critical for React's strict mode and component unmounting.

```ts
useEffect(() => {
    const ctx = gsap.context(() => {
        // All GSAP code here is scoped to containerRef
        gsap.to('.animated-word', { opacity: 1 });
        // '.animated-word' only matches elements INSIDE containerRef
    }, containerRef);  // ← scope root

    return () => ctx.revert(); // cleanup on unmount
}, []);
```

**Why it matters in React:**
- Without context, `.animated-word` would match ALL elements on the page with that class, not just the ones inside this component
- Without `ctx.revert()`, animations persist after the component unmounts, causing memory leaks and visual bugs
- In React 18 Strict Mode, `useEffect` runs twice — `ctx.revert()` ensures the first run is fully cleaned up

---

## 8. gsap.utils.toArray

Converts a CSS selector string, NodeList, or array-like into a real JavaScript array of elements.

```ts
const words = gsap.utils.toArray('.animated-word') as HTMLElement[];
```

**Why use this instead of `document.querySelectorAll`?**
- Works inside `gsap.context()` scope (respects the scope root)
- Returns a proper array — you can use `.map()`, `.forEach()`, etc.
- Handles edge cases like single elements, null values, and React refs

**With function-based values:**
```ts
gsap.fromTo(words,
    {
        x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
        // ↑ function is called ONCE PER ELEMENT, giving each a unique value
    },
    { x: 0 }
);
```

> When a property value is a function, GSAP calls it for each element individually. This is how each word gets a unique random starting position.

---

## 9. useGSAP Hook

`@gsap/react` provides `useGSAP` as a React-aware replacement for `useEffect` + `gsap.context`.

```ts
import { useGSAP } from '@gsap/react';

useGSAP(() => {
    gsap.to('.box', { x: 100 });
}, { 
    dependencies: [someState],  // re-runs when these change
    revertOnUpdate: true        // reverts previous animation before re-running
});
```

**Comparison:**

| Feature                  | `useEffect` + `gsap.context` | `useGSAP`                    |
|--------------------------|------------------------------|------------------------------|
| Auto cleanup             | Manual `ctx.revert()`        | Automatic                    |
| Dependency tracking      | Manual `[]`                  | `{ dependencies: [] }`       |
| Revert on re-run         | Manual                       | `revertOnUpdate: true`       |
| Scope                    | Manual ref passed to context | Automatic (uses component)   |

> Hero.tsx uses `useGSAP` with `revertOnUpdate: true` so the video transition animation resets cleanly every time the video index changes.

---

## 10. AnimatedTitle — Full Breakdown

### What the component does

Takes a `title` string, splits it into lines (by `<br />`), then into individual words, and renders each word as a `<span class="animated-word">`. GSAP then animates all those spans from random scattered positions into their natural layout positions.

### The scatter-to-gather effect — line by line

```ts
const words = gsap.utils.toArray('.animated-word') as HTMLElement[];
```
Collects all word spans inside the `containerRef` scope into an array.

```ts
gsap.fromTo(words,
    {
        opacity: 0,
        x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
        y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
        rotation: () => (Math.random() - 0.5) * 360,
        scale: () => Math.random() * 2 + 0.5,
    },
```

**FROM state (initial — scattered):**

| Property     | Formula                                          | Effect                                              |
|--------------|--------------------------------------------------|-----------------------------------------------------|
| `opacity`    | `0`                                              | All words start invisible                           |
| `x`          | `(Math.random() - 0.5) * innerWidth * 1.5`       | Random horizontal position, up to 75% off-screen   |
| `y`          | `(Math.random() - 0.5) * innerHeight * 1.5`      | Random vertical position, up to 75% off-screen     |
| `rotation`   | `(Math.random() - 0.5) * 360`                    | Random spin between -180° and +180°                 |
| `scale`      | `Math.random() * 2 + 0.5`                        | Random size between 0.5x and 2.5x                  |

> `Math.random() - 0.5` shifts the range from `[0, 1]` to `[-0.5, +0.5]`, giving both positive and negative directions. Multiplying by `innerWidth * 1.5` ensures words start well outside the viewport.

```ts
    {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 2,
        stagger: {
            amount: 0.8,
            from: 'random',
        },
        scrollTrigger: {
            trigger: containerRef.current,
            start: '50 bottom',
            end: 'center bottom',
            toggleActions: 'play none none reverse',
        },
    }
```

**TO state (final — gathered):**

| Property     | Value          | Effect                                              |
|--------------|----------------|-----------------------------------------------------|
| `opacity`    | `1`            | Fully visible                                       |
| `x`, `y`     | `0`            | Natural DOM position                                |
| `rotation`   | `0`            | Upright                                             |
| `scale`      | `1`            | Natural size                                        |
| `ease`       | `power3.out`   | Fast approach, smooth landing                       |
| `duration`   | `2`            | 2 seconds per word's animation                      |
| `stagger.amount` | `0.8`      | 0.8s spread across all words                        |
| `stagger.from` | `'random'`   | Words arrive in random order                        |

**ScrollTrigger on this animation:**

```
start: '50 bottom'
```
Animation begins when the top of the container is 50px above the bottom of the viewport — i.e., just as it scrolls into view.

```
toggleActions: 'play none none reverse'
```
Plays forward on scroll down, reverses (scatters back) on scroll up. The words literally fly back apart when you scroll up.

### Visual timeline of the effect

```
Scroll down → container enters viewport
    ↓
Words appear scattered randomly across/outside the screen
    ↓
Each word flies toward its natural position (random order)
    ↓
All words land in place — title is readable
    ↓
Scroll up → words scatter back out
```

---

## 11. Hero Component — GSAP Usage

### Video transition animation

```ts
useGSAP(() => {
    if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' });

        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current?.play()
        });

        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut',
        });
    }
}, { dependencies: [currentIndex], revertOnUpdate: true });
```

- `gsap.set` makes the next video visible instantly (no animation)
- `gsap.to` expands the next video from its small preview size to full screen
- `gsap.from` makes the current video appear to shrink from full size (scale 0 = starting point)
- `onStart` callback fires the video `.play()` exactly when the animation begins
- `revertOnUpdate: true` ensures the previous transition is fully cleaned up before the next click triggers a new one

### Clip-path scroll morph

```ts
gsap.set('#video-frame', {
    clipPath: 'polygon(99.75% 16.3%, 74.53% 58.96%, 99.75% 99.75%, 0% 37.31%, 0% 0%)',
    borderRadius: '40% 40% 10% 50%'
});

gsap.from('#video-frame', {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    borderRadius: '0 0 0 0',
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true
    }
});
```

- `gsap.set` establishes the final (irregular polygon) shape as the natural state
- `gsap.from` animates FROM a normal rectangle TO the irregular shape as you scroll
- `scrub: true` ties the morph directly to scroll position — scroll down = more distorted, scroll up = back to rectangle
- GSAP can interpolate between `polygon()` values as long as both have the same number of points

---

## 12. About Component — GSAP Usage

### Pinned clip-path reveal

```ts
const clipAnimation = gsap.timeline({
    scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true
    }
});

clipAnimation.to('.mask-clip-path', {
    width: '100vw',
    height: '100vh',
    borderRadius: 0
});
```

- `pin: true` freezes `#clip` in the viewport while the user scrolls 800px
- During those 800px of scroll, the `.mask-clip-path` div expands from a small shape to full screen
- `scrub: 0.5` adds a 0.5s lag so the expansion feels smooth and physical rather than jittery
- `borderRadius: 0` removes rounded corners as it expands to full screen
- `pinSpacing: true` pushes content below down so nothing overlaps after the pin releases

---

## 13. Common Mistakes & Fixes

### 1. Animating with `.to()` but no initial state
```ts
// ❌ Nothing to animate from — element is already at opacity 1
gsap.to('.word', { opacity: 1 });

// ✅ Use gsap.set() first, or use gsap.from() / gsap.fromTo()
gsap.set('.word', { opacity: 0 });
gsap.to('.word', { opacity: 1 });
```

### 2. Registering plugins inside the component
```ts
// ❌ Re-registers on every render
const MyComponent = () => {
    gsap.registerPlugin(ScrollTrigger);
};

// ✅ Register once at module level
gsap.registerPlugin(ScrollTrigger);
const MyComponent = () => { ... };
```

### 3. Not cleaning up in React
```ts
// ❌ Animations persist after unmount
useEffect(() => {
    gsap.to('.box', { x: 100 });
}, []);

// ✅ Always revert context on cleanup
useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to('.box', { x: 100 });
    }, ref);
    return () => ctx.revert();
}, []);
```

### 4. CSS selector matching wrong elements
```ts
// ❌ Matches ALL .animated-word on the entire page
gsap.context(() => {
    gsap.to('.animated-word', { opacity: 1 });
});

// ✅ Scoped to containerRef — only matches inside this component
gsap.context(() => {
    gsap.to('.animated-word', { opacity: 1 });
}, containerRef);
```

### 5. Function values not being called per element
```ts
// ❌ Math.random() called once — all elements get the same value
gsap.fromTo(words, { x: Math.random() * 500 }, { x: 0 });

// ✅ Arrow function called once per element
gsap.fromTo(words, { x: () => Math.random() * 500 }, { x: 0 });
```

---

*Sources: gsap.com/docs, gsap.com/cheatsheet, @gsap/react docs*

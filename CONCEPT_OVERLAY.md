# Concept Overlay Feature - Documentation

**Status:** ⚠️ Hidden/In Progress  
**Date:** October 3, 2025  
**Location:** `components/ConceptOverlay.tsx` + `app/page.tsx`

---

## 🎯 Goal

Create a visual overlay on the **high-level overview** page that shows how different system components connect and interact. The overlay should:

1. **Display concept boxes** over specific panels/cards (Human, Orchestrator, Profiler, Tools, Document Intelligence, Knowledge Base)
2. **Connect boxes with arrows** showing data flow and relationships
3. **Hide automatically** when a user hovers over a panel to view details
4. **Stay fixed** within their respective panels when resizing

---

## 🏗️ Current Architecture

### Components

#### `ConceptOverlay.tsx`
- Main overlay component
- Renders concept boxes positioned relative to panel anchors
- Uses `useAnchorRects` hook to track panel positions dynamically
- Manages visibility based on which panel is hovered

#### `useAnchorRects.ts`
- Custom hook that uses `ResizeObserver`
- Tracks position and size of anchor elements (panels/cards)
- Returns `Rect` objects with `x`, `y`, `w`, `h` coordinates
- Recalculates on window resize or panel drag

#### `app/page.tsx`
- Contains refs for all anchor points:
  - `humanRef` → Teams & Access gradient card
  - `orchRef` → Level 1 - Orchestration Layer card
  - `agentsRef` → Level 2 - Agent Teams card
  - `toolsRef` → Level 3 - Domain-Specific Tools card
  - `kbRef` → Project Knowledge Base panel
  - `docintelRef` → Document Intelligence panel
- Passes `hoveredSection` state to control visibility

### Box → Panel Mapping

| Box Name | Anchored To | Parent Panel |
|----------|-------------|--------------|
| Human | Teams & Access card | Teams & Access (teams) |
| Orchestrator | Level 1 card | WindShift Workspace (workspace) |
| Profiler | Level 2 card | WindShift Workspace (workspace) |
| Agentic Deep Research | Level 3 card | WindShift Workspace (workspace) |
| Contract Review | Level 3 card | WindShift Workspace (workspace) |
| Document Intelligence | Doc Intel panel | Document Intelligence (documents) |
| Project Knowledge Base | KB panel | Project Knowledge Base (knowledge) |

---

## 🐛 Current Issues

### 1. **Box Positioning Inconsistency**
- **Problem:** Boxes sometimes drift out of their intended panels when resizing
- **Example:** Deep Research and Contract Review boxes can appear in Level 2 area when Level 3 is squeezed vertically
- **Root Cause:** Boxes are positioned relative to panel centers with offsets, which don't account for dynamic panel sizes

### 2. **Visibility Logic Issues**
- **Problem:** Boxes appear/disappear inconsistently
- **Expected:** Boxes should be visible on overview UNLESS their parent panel is hovered
- **Actual:** Sometimes boxes remain visible when they should hide, or hide when they shouldn't
- **Root Cause:** `hoveredSection` values ('projects', 'teams', 'exchange', 'workspace', 'knowledge', 'documents') may not always map correctly to box visibility flags

### 3. **Arrow Implementation (Currently Removed)**
- **Original Issue:** Arrows with bidirectional arrowheads were too small and hard to see
- **Attempted Fix:** Removed arrows entirely, but user wanted just the arrowheads removed, not the connection lines
- **Current State:** No arrows at all
- **Desired State:** Clean connection lines between boxes without arrowheads

### 4. **Edge-Based Positioning Complexity**
- **Current Approach:** Boxes positioned relative to panel **edges** (top-center, top-right)
- **Problem:** When panels resize, boxes maintain fixed pixel offsets from edges, which can cause overlap or drift
- **Need:** Either percentage-based positioning or constraint logic to keep boxes within bounds

---

## 🛠️ Path to Resolution

### Phase 1: Fix Box Positioning (Priority: HIGH)

**Option A: Constrained Edge Positioning**
```typescript
// Add bounds checking to Node component
if (left < rect.x + 10) left = rect.x + 10;
if (left > rect.x + rect.w - 10) left = rect.x + rect.w - 10;
if (top < rect.y + 10) top = rect.y + 10;
if (top > rect.y + rect.h - 10) top = rect.y + rect.h - 10;
```

**Option B: Percentage-Based Positioning**
```typescript
// Position based on % of panel dimensions
left = rect.x + (rect.w * 0.5); // 50% from left
top = rect.y + (rect.h * 0.1);  // 10% from top
```

**Option C: Dynamic Offset Adjustment**
```typescript
// Scale offsets based on panel size
const scaleX = rect.w / baseWidth;
const scaleY = rect.h / baseHeight;
offsetX *= scaleX;
offsetY *= scaleY;
```

**Recommendation:** Start with Option A (bounds checking) as it's simplest and most reliable.

---

### Phase 2: Fix Visibility Logic (Priority: HIGH)

**Current Logic:**
```typescript
const showHuman = hoveredSection !== "teams";
const showOrch = hoveredSection !== "workspace";
// etc...
```

**Issues:**
1. No check for `null` state (when nothing is hovered)
2. No verification that anchors exist before rendering

**Improved Logic:**
```typescript
// Only show if overview is active AND anchor exists AND parent not hovered
const showHuman = !showDetails && rects.human && hoveredSection !== "teams";
const showOrch = !showDetails && rects.orch && hoveredSection !== "workspace";
// etc...
```

**Testing Checklist:**
- [ ] All boxes visible on initial load (overview mode)
- [ ] Hover Teams & Access → Human box disappears
- [ ] Hover WindShift Workspace → Orchestrator, Profiler, both tool boxes disappear
- [ ] Hover Knowledge Base → KB box disappears
- [ ] Hover Document Intelligence → Doc Intel box disappears
- [ ] Hover Projects (no boxes) → No change
- [ ] Hover Exchange (no boxes) → No change

---

### Phase 3: Reimplement Arrows (Priority: MEDIUM)

**Design:**
- Simple SVG lines (no arrowheads)
- Subtle styling (thin, semi-transparent)
- Connect box centers using straight or curved paths

**Example Implementation:**
```typescript
function ConnectionLine({ from, to }: { from: Rect; to: Rect }) {
  const x1 = from.x + from.w / 2;
  const y1 = from.y + from.h / 2;
  const x2 = to.x + to.w / 2;
  const y2 = to.y + to.h / 2;
  
  return (
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#00458e" 
      strokeWidth="2" 
      opacity="0.4"
      strokeDasharray="5,5" // Optional: dashed line
    />
  );
}
```

**Connections to Implement:**
1. Human ↔ Orchestrator
2. Orchestrator ↔ Profiler
3. Profiler ↔ Agentic Deep Research
4. Profiler ↔ Contract Review
5. Document Intelligence → Profiler (one-way)
6. Profiler ↔ Knowledge Base

---

### Phase 4: Enhanced Debug Mode (Priority: LOW)

**Add to Debug Panel:**
- Real-time box coordinates
- Panel bounds visualization
- Collision detection warnings
- Anchor verification status

**Example:**
```typescript
{debug && (
  <div className="debug-panel">
    <h4>Box Positions:</h4>
    {boxes.map(box => (
      <div>
        {box.name}: ({box.x}, {box.y})
        {isOutOfBounds(box, box.parent) && <span>⚠️ Out of bounds!</span>}
      </div>
    ))}
  </div>
)}
```

---

## 🔧 How to Re-enable for Testing

### Step 1: Show Overlay
```typescript
// In app/page.tsx, line 41
const [showConcept, setShowConcept] = useState(true); // Change false → true
```

### Step 2: Show Debug Buttons
```typescript
// In app/page.tsx, line 109
{true && ( // Change false → true
  <div className="fixed top-3 right-[140px]...">
```

### Step 3: Use Debug Mode
1. Click "Concept: On" button
2. Click "Debug: On" button
3. See panel rectangles and visibility status
4. Test hover behavior on all panels
5. Resize panels and observe box positions

---

## 📝 Design Decisions

### Why Edge-Based Positioning?
- Center-based positioning caused boxes to move when panels resized
- Edge-based keeps boxes at consistent location within panel visual space
- 20px from top edge provides clearance for panel padding

### Why Separate Visibility Flags?
- Each box needs independent control
- Multiple boxes can belong to same parent panel
- Allows for future fine-grained control

### Why ResizeObserver?
- Automatically tracks all panel size/position changes
- Works with react-resizable-panels dynamic layout
- No manual recalculation needed

---

## 🚀 Next Steps (Week of Oct 7, 2025)

1. **Implement bounds checking** (Phase 1, Option A)
2. **Add null checks** to visibility logic (Phase 2)
3. **Test all hover scenarios** with checklist above
4. **Add simple connection lines** (Phase 3, no arrowheads)
5. **Verify resize behavior** across all panel configurations
6. **Document final offset values** for each box
7. **Remove debug code** or gate behind environment variable
8. **Deploy to staging** for review

---

## 📚 Related Files

- `/components/ConceptOverlay.tsx` - Main overlay component
- `/components/useAnchorRects.ts` - Position tracking hook  
- `/app/page.tsx` - Main page with refs and state
- `/tailwind.config.js` - Custom colors for boxes/lines

---

## 💡 Alternative Approaches (If Current Method Fails)

### Option 1: Fixed Pixel Positioning
- Abandon dynamic tracking
- Use fixed coordinates for standard layout
- Re-hide on resize until user stops dragging

### Option 2: SVG Overlay Layer
- Render entire concept map as single SVG
- Use viewBox to scale with container
- Separate from React component tree

### Option 3: Canvas-Based Rendering
- Use HTML Canvas instead of DOM elements
- Better performance for complex animations
- More control over rendering pipeline

---

**Last Updated:** October 3, 2025  
**Author:** Development Session with User (nikdu)  
**Status:** Ready for next iteration


# App Graph Builder

This is a responsive, interactive "App Graph Builder" built as a technical assessment. It demonstrates complex layout composition, interactive node-based canvas rendering, and  state management synchronization.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open your browser to `http://localhost:5173/` (or the port provided in your terminal).

*Note: This project uses Mock Service Worker (MSW) to intercept network requests. You will see an "[MSW] Mocking enabled" message in your browser console when it starts successfully.*

---

## 🛠️ Tech Stack & Architecture Choices

I chose a modern, production-ready stack designed for performance, maintainability, and clean architecture:

* **React + Vite + TypeScript:** Provides a fast, type-safe foundation.
* **ReactFlow (`reactflow`):** Chosen for the core canvas. It natively handles panning, zooming, and node drag-and-drop, allowing me to focus on custom node rendering and state syncing rather than math and physics.
* **Zustand:** Used for global UI state (e.g., tracking the `selectedAppId` and `selectedNodeId`). It was chosen over Redux or React Context because it is incredibly lightweight, requires zero boilerplate, and prevents unnecessary re-renders.
* **TanStack Query (React Query):** Used for fetching data from the mock API. It automatically handles `isLoading` states, caching, and background refetching, completely eliminating the need for messy `useEffect` data-fetching logic.
* **Mock Service Worker (MSW):** Used to mock the backend. Unlike static JSON files, MSW intercepts real `fetch` requests at the network level. This means the React code is written *exactly* as it would be for a real production backend.
* **Tailwind CSS + shadcn/ui:** Used for styling. Instead of heavy libraries like Material UI, shadcn provides accessible, unstyled components that I could easily customize with Tailwind to match the provided dark-mode screenshot perfectly.

---

## ✨ Key Features

* **Responsive Layout:** A clean, 3-pane layout on desktop that gracefully collapses into a mobile-friendly drawer (`Sheet`) on smaller screens.
* **Custom ReactFlow Nodes:** Built custom `ServiceNode` components that display dynamic metrics, dynamic status badge colors (Healthy, Degraded, Down), and inline sliders.
* **Bi-directional State Synchronization:** The most complex technical requirement. The memory slider in the Right Panel Inspector is perfectly synced with the memory slider inside the canvas node. Dragging one instantly updates the other via a custom `useUpdateNodeData` React hook.
* **Dynamic Refetching:** Selecting a different application from the top-right dropdown triggers TanStack Query to fetch and render a new graph automatically.

---

## ⚖️ Trade-offs & Known Limitations

Given the time constraints of the assessment, I made the following intentional trade-offs:

1. **Mock Data Variations:** While the application dropdown properly triggers a new network request with the dynamic `:appId` parameter, the MSW handler is currently hardcoded to return the same 3 nodes (Postgres, Redis, MongoDB) for every app. In a real scenario, the backend would return different graph arrays.
2. **Slider Performance vs. Global State:** When dragging the slider, I utilized a local React `useState` to handle the immediate visual drag smoothly, while simultaneously updating the global ReactFlow `setNodes` state. This prevents ReactFlow from dragging the entire node when you interact with the slider (achieved using the `nodrag` class constraint).
3. **Editable Node Names:** The node name can be edited directly from the inspector, and it instantly updates on the canvas. However, the custom nodes do not auto-resize horizontally if a massive string is entered, as I prioritized fixed widths to match the screenshot aesthetics.

---

## 🧠 What I Learned

This assessment was a fantastic challenge! It solidified my understanding of how to bridge local component state with global store state (Zustand) and external library state (ReactFlow). Ensuring that a component *outside* the canvas (the Right Panel) could control a node *inside* the canvas without causing performance bottlenecks was incredibly rewarding to solve.

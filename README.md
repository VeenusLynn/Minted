# Minted 🌿

**Minted** is a simple, personal finance tracker built for daily use. It works flawlessly across **iOS, Android, and Web** from a single codebase, making it effortless to log expenses, track income, monitor category budgets, and reach your savings goals.

---

## Key Features

- **Universal Single Codebase**: Runs natively on iOS and Android via Expo Go, and as a responsive web app in any browser.
- **Mint Design System**: Curated mint-green color palette with seamless **Dark Mode** and **Light Mode** support.
- **Offline-First & Instant**: All financial data is persisted locally using Zustand and AsyncStorage—no account or internet required to log transactions.
- **Data Visualization**: Interactive daily income vs. expense bar charts and budget remaining donut charts powered by `react-native-gifted-charts`.
- **Custom Numpad**: Built-in numpad modal for ultra-fast, friction-free transaction logging.
- **6 Main Views**:
  - **Home**: Total net balance, quick income/expense breakdown, and recent activity.
  - **Budget**: Daily income vs. expense bar chart, summary card, and financial insights.
  - **Goals**: Monthly savings target meter and goal progress trackers with quick-add actions.
  - **Chat**: Financial AI assistant placeholder (coming soon).
  - **Spending**: Donut chart with category spending percentages and breakdown details.
  - **Profile**: Theme mode toggle (Light/Dark/System), currency selector, data reset, and app settings.

---

## Tech Stack

| Layer                   | Technology                                                                                   |
| :---------------------- | :------------------------------------------------------------------------------------------- |
| **Framework**           | [Expo SDK 57](https://docs.expo.dev/) (React Native 0.86)                                    |
| **Navigation**          | [Expo Router](https://docs.expo.dev/router/introduction/) (Universal file-based routing)     |
| **Language**            | TypeScript (Strict type checking)                                                            |
| **State & Persistence** | [Zustand 5](https://github.com/pmndrs/zustand) + `@react-native-async-storage/async-storage` |
| **Theming**             | Centralized Theme Engine (`constants/theme.ts` + `useTheme()`)                               |
| **Icons & Motion**      | `lucide-react-native` + `react-native-reanimated`                                            |
| **Charts**              | `react-native-gifted-charts` + `react-native-svg` + `expo-linear-gradient`                   |

---

## Project Architecture

```
Minted/
├── app/                        # Expo Router Pages & Universal Routes
│   ├── (tabs)/                 # Main 6-Tab Navigation Bar
│   │   ├── index.tsx           # Home / Dashboard
│   │   ├── budget.tsx          # Bar Chart & Budget Summary
│   │   ├── goals.tsx           # Savings Goals & Monthly Target
│   │   ├── chat.tsx            # Chat Feature Placeholder
│   │   ├── spending.tsx        # Donut Chart & Spending Breakdown
│   │   ├── profile.tsx         # Settings & Theme Toggle
│   │   └── _layout.tsx         # Tab Bar Configuration
│   ├── add-transaction.tsx     # Modal with Custom Numpad
│   └── _layout.tsx             # Root Layout & Theme Provider
├── components/                 # Reusable UI & Chart Components
│   ├── BarChart.tsx            # Grouped Income/Expense Bar Chart
│   ├── DonutChart.tsx          # Remaining Budget Donut Chart
│   ├── CustomNumpad.tsx        # 3x4 Custom Numpad Grid
│   ├── MonthPicker.tsx         # Month/Year Selector
│   ├── CategoryIcon.tsx        # Dynamic Lucide Icon mapping
│   ├── TransactionItem.tsx     # Activity row component
│   └── ProgressBar.tsx         # Theme-aware progress meter
├── constants/                  # Color Tokens & Category Definitions
│   ├── theme.ts                # Single Source of Truth for Colors (Mint Palette)
│   ├── CategoryData.ts         # Category metadata & icon mapping
│   └── Colors.ts               # Re-exported theme tokens
├── context/
│   └── ThemeContext.tsx        # React Context & useTheme() hook
├── store/
│   └── useFinanceStore.ts      # Zustand Store with AsyncStorage persistence
└── types/
    └── finance.ts              # TypeScript interfaces (Transaction, Category, etc.)
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm** / **bun**
- **Expo Go App**: Download on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) to preview on mobile.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/VeenusLynn/Minted.git
   cd Minted
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

_(Note: If you encounter network SSL errors during npm install, run `npm config set strict-ssl false` beforehand)._

---

## Running the App

### Web Mode (Browser)

To run Minted in your web browser:

```bash
npm run web
# or
npx expo start --web
```

Open `http://localhost:8081` in your browser.

### Mobile Mode (Expo Go)

1. Start the Metro bundler:
   ```bash
   npm start
   # or
   npx expo start
   ```
2. Scan the QR code in your terminal with your phone's camera (iOS) or within the **Expo Go** app (Android).

> **Tip (Tunnel Mode)**: If your phone and computer are on different Wi-Fi networks or behind a firewall, start Expo with tunnel mode:
>
> ```bash
> npx expo start --tunnel
> ```

---

## Developer & Contribution Walkthrough

We welcome contributions! Please follow these guidelines when developing new features or bug fixes.

### 1. Theming Rule (No Hardcoded Colors)

**Crucial Rule**: Never hardcode hex color strings (e.g. `#FFFFFF` or `#000000`) inside components or screen styles. Always consume the centralized theme via `useTheme()`:

```tsx
import { useTheme } from "../context/ThemeContext";

export function MyComponent() {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <Text style={{ color: colors.text }}>Hello Minted</Text>
    </View>
  );
}
```

To modify or add global colors, edit [constants/theme.ts](file:///d:/Perso/Minted/constants/theme.ts).

### 2. State & Data Flow

All state updates (adding transactions, modifying budget limits, setting savings goals) flow through the Zustand store at [store/useFinanceStore.ts](file:///d:/Perso/Minted/store/useFinanceStore.ts).

Example of adding a store action:

```typescript
// 1. Define action interface in store/useFinanceStore.ts
interface FinanceState {
  // ...
  myNewAction: (param: string) => void;
}

// 2. Implement action with persistence
myNewAction: (param) => {
  set((state) => ({ ... }));
}
```

### 3. Adding a New Category

To add a new expense or income category:

1. Update `Category` union type in [types/finance.ts](file:///d:/Perso/Minted/types/finance.ts).
2. Add metadata (Lucide icon name & colors) in [constants/CategoryData.ts](file:///d:/Perso/Minted/constants/CategoryData.ts).

### 4. Code Quality & Verification Checks

Before submitting a Pull Request, ensure your code passes type checking and static exports:

```bash
# 1. Type Check (Must return 0 errors)
npx tsc --noEmit

# 2. Test Web Bundle Build
npx expo export --platform web
```

---

## Contribution Workflow

1. **Fork & Branch**: Create a feature branch off `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **Commit Changes**: Use descriptive commit messages:
   ```bash
   git commit -m "feat: add monthly budget limit progress alerts"
   ```
3. **Push & Open PR**: Push to your branch and open a Pull Request against `main`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

import { flavors } from "@catppuccin/palette";

import type {
  CatppuccinPaletteAnsi,
  CatppuccinFlavor,
  CatppuccinPalette,
  ThemeContext,
  ThemeOptions,
} from "@/types";

// Custom dark flavor color overrides based on Neovim/Ghostty/tmux palette
// base = editor background, mantle = surface, crust = deeper surface
const darkColorOverrides = {
  base: "#181818", // Editor background
  mantle: "#212121", // Surface (sidebar/panels/tabs)
  crust: "#141414", // Deeper surface (status bar/title bar)
};

// Custom dark flavor UI color overrides matching Neovim/Ghostty/tmux palette
// Target palette:
// - editor background: #181818
// - surface (sidebar/panels/tabs): #212121
// - deeper surface (status bar/title bar): #141414
// - borders/separators: #3b3b3b
// - default fg: #cdd6f4
// - muted fg: #585b70 (or #45475b)
// - primary accent (teal): #87afaf (focus/active states only)
// - secondary highlight: #f9e2af
// - selection bg: #353749 (with opacity variants)
const darkUIColorOverrides = {
  // ============================================
  // EDITOR
  // ============================================
  "editor.background": "#181818",
  "editor.foreground": "#cdd6f4",
  "editor.lineHighlightBackground": "#212121",
  "editor.lineHighlightBorder": "#00000000",
  "editor.selectionBackground": "#35374999", // Selection with opacity
  "editor.inactiveSelectionBackground": "#35374966", // Dimmer selection
  "editor.selectionHighlightBackground": "#35374966",
  "editor.wordHighlightBackground": "#35374966",
  "editor.wordHighlightStrongBackground": "#35374980",
  "editor.findMatchBackground": "#35374999",
  "editor.findMatchBorder": "#87afaf66",
  "editor.findMatchHighlightBackground": "#35374966",
  "editor.findMatchHighlightBorder": "#00000000",
  "editor.findRangeHighlightBackground": "#35374933",
  "editor.hoverHighlightBackground": "#35374966",
  "editor.rangeHighlightBackground": "#35374966",
  "editorCursor.foreground": "#cdd6f4",

  // Editor gutter/line numbers
  "editorGutter.background": "#181818",
  "editorLineNumber.foreground": "#585b70",
  "editorLineNumber.activeForeground": "#87afaf",

  // Editor widgets
  "editorWidget.background": "#212121",
  "editorWidget.foreground": "#cdd6f4",
  "editorWidget.border": "#3b3b3b",
  "editorHoverWidget.background": "#212121",
  "editorHoverWidget.border": "#3b3b3b",
  "editorSuggestWidget.background": "#212121",
  "editorSuggestWidget.border": "#3b3b3b",
  "editorSuggestWidget.foreground": "#cdd6f4",
  "editorSuggestWidget.selectedBackground": "#353749",
  "editorSuggestWidget.selectedForeground": "#cdd6f4",
  "editorSuggestWidget.highlightForeground": "#87afaf",
  "editorStickyScrollHover.background": "#212121",

  // Editor groups and borders
  "editorGroup.border": "#3b3b3b",
  "editorGroup.dropBackground": "#35374966",
  "editorGroupHeader.tabsBackground": "#212121",
  "editorGroupHeader.tabsBorder": "#3b3b3b",
  "editorGroupHeader.border": "#3b3b3b",

  // Indent guides
  "editorIndentGuide.background": "#3b3b3b66",
  "editorIndentGuide.activeBackground": "#3b3b3b",

  // Bracket matching
  "editorBracketMatch.background": "#35374966",
  "editorBracketMatch.border": "#87afaf66",

  // ============================================
  // TABS (FIX: currently wrong)
  // ============================================
  "tab.activeBackground": "#212121",
  "tab.inactiveBackground": "#212121",
  "tab.activeForeground": "#cdd6f4",
  "tab.inactiveForeground": "#585b70",
  "tab.border": "#3b3b3b",
  "tab.activeBorder": "#00000000",
  "tab.activeBorderTop": "#87afaf", // Subtle teal indicator for active tab
  "tab.unfocusedActiveBorderTop": "#87afaf66",
  "tab.hoverBackground": "#28282880",
  "tab.hoverForeground": "#cdd6f4",
  "tab.unfocusedActiveBackground": "#212121",
  "tab.unfocusedInactiveBackground": "#212121",
  "tab.unfocusedActiveForeground": "#cdd6f4",
  "tab.unfocusedInactiveForeground": "#585b70",
  "tab.lastPinnedBorder": "#3b3b3b",
  "tab.activeModifiedBorder": "#f9e2af",
  "tab.inactiveModifiedBorder": "#f9e2af66",

  // ============================================
  // EXPLORER / SIDEBAR (FIX: currently wrong)
  // ============================================
  "sideBar.background": "#212121",
  "sideBar.foreground": "#cdd6f4",
  "sideBar.border": "#3b3b3b",
  "sideBar.dropBackground": "#35374966",
  "sideBarTitle.foreground": "#cdd6f4",
  "sideBarSectionHeader.background": "#212121",
  "sideBarSectionHeader.foreground": "#cdd6f4",
  "sideBarSectionHeader.border": "#3b3b3b",

  // List/tree (explorer, search results, etc.)
  "list.activeSelectionBackground": "#353749",
  "list.activeSelectionForeground": "#cdd6f4",
  "list.activeSelectionIconForeground": "#cdd6f4",
  "list.inactiveSelectionBackground": "#35374966",
  "list.inactiveSelectionForeground": "#cdd6f4",
  "list.inactiveSelectionIconForeground": "#cdd6f4",
  "list.hoverBackground": "#28282880",
  "list.hoverForeground": "#cdd6f4",
  "list.focusBackground": "#353749",
  "list.focusForeground": "#cdd6f4",
  "list.focusOutline": "#87afaf",
  "list.focusHighlightForeground": "#87afaf",
  "list.highlightForeground": "#87afaf",
  "list.dropBackground": "#35374966",
  "list.warningForeground": "#f9e2af",

  // Tree indent guides
  "tree.indentGuidesStroke": "#3b3b3b",
  "tree.inactiveIndentGuidesStroke": "#3b3b3b66",
  "tree.tableColumnsBorder": "#3b3b3b",
  "tree.tableOddRowsBackground": "#21212180",

  // Icon colors (keep muted, don't wash out)
  "icon.foreground": "#cdd6f4",

  // ============================================
  // STATUS BAR / TITLE BAR
  // ============================================
  "statusBar.background": "#141414",
  "statusBar.foreground": "#585b70",
  "statusBar.border": "#3b3b3b",
  "statusBar.noFolderBackground": "#141414",
  "statusBar.noFolderForeground": "#585b70",
  "statusBar.noFolderBorder": "#3b3b3b",
  "statusBar.debuggingBackground": "#f38ba8",
  "statusBar.debuggingForeground": "#181818",
  "statusBarItem.activeBackground": "#35374966",
  "statusBarItem.hoverBackground": "#35374966",
  "statusBarItem.prominentForeground": "#87afaf",
  "statusBarItem.prominentBackground": "#00000000",
  "statusBarItem.prominentHoverBackground": "#35374966",
  "statusBarItem.remoteBackground": "#87afaf",
  "statusBarItem.remoteForeground": "#181818",

  "titleBar.activeBackground": "#141414",
  "titleBar.activeForeground": "#cdd6f4",
  "titleBar.inactiveBackground": "#141414",
  "titleBar.inactiveForeground": "#585b70",
  "titleBar.border": "#3b3b3b",

  // ============================================
  // ACTIVITY BAR
  // ============================================
  "activityBar.background": "#212121",
  "activityBar.foreground": "#87afaf",
  "activityBar.inactiveForeground": "#585b70",
  "activityBar.border": "#3b3b3b",
  "activityBar.activeBorder": "#87afaf",
  "activityBar.activeBackground": "#00000000",
  "activityBarBadge.background": "#87afaf",
  "activityBarBadge.foreground": "#181818",
  "activityBarTop.foreground": "#87afaf",
  "activityBarTop.inactiveForeground": "#585b70",
  "activityBarTop.activeBorder": "#87afaf",

  // ============================================
  // PANELS / TERMINAL
  // ============================================
  "panel.background": "#212121",
  "panel.border": "#3b3b3b",
  "panel.dropBorder": "#87afaf",
  "panelTitle.activeForeground": "#cdd6f4",
  "panelTitle.inactiveForeground": "#585b70",
  "panelTitle.activeBorder": "#87afaf",
  "panelSection.border": "#3b3b3b",
  "panelSection.dropBackground": "#35374966",
  "panelSectionHeader.background": "#212121",
  "panelSectionHeader.foreground": "#cdd6f4",
  "panelSectionHeader.border": "#3b3b3b",

  "terminal.background": "#181818",
  "terminal.foreground": "#cdd6f4",
  "terminal.border": "#3b3b3b",
  "terminal.selectionBackground": "#353749",
  "terminal.inactiveSelectionBackground": "#35374966",
  "terminalCursor.background": "#181818",
  "terminalCursor.foreground": "#cdd6f4",

  // ============================================
  // INPUTS / DROPDOWNS / WIDGETS
  // ============================================
  "input.background": "#212121",
  "input.foreground": "#cdd6f4",
  "input.border": "#3b3b3b",
  "input.placeholderForeground": "#585b70",
  "inputOption.activeBackground": "#353749",
  "inputOption.activeBorder": "#87afaf",
  "inputOption.activeForeground": "#cdd6f4",

  "dropdown.background": "#212121",
  "dropdown.foreground": "#cdd6f4",
  "dropdown.border": "#3b3b3b",
  "dropdown.listBackground": "#212121",

  "quickInput.background": "#212121",
  "quickInput.foreground": "#cdd6f4",
  "quickInputList.focusBackground": "#353749",
  "quickInputList.focusForeground": "#cdd6f4",
  "quickInputList.focusIconForeground": "#87afaf",
  "quickInputTitle.background": "#212121",

  "editorMarkerNavigation.background": "#212121",

  // ============================================
  // NOTIFICATIONS / POPUPS
  // ============================================
  "notifications.background": "#212121",
  "notifications.foreground": "#cdd6f4",
  "notifications.border": "#3b3b3b",
  "notificationCenter.border": "#3b3b3b",
  "notificationCenterHeader.background": "#212121",
  "notificationCenterHeader.foreground": "#cdd6f4",
  "notificationToast.border": "#3b3b3b",
  "notificationLink.foreground": "#87afaf",

  // ============================================
  // FOCUS / ACCENT (teal #87afaf only for active states)
  // ============================================
  focusBorder: "#87afaf",
  "selection.background": "#35374999",

  // Buttons
  "button.background": "#87afaf",
  "button.foreground": "#181818",
  "button.hoverBackground": "#97bfbf",
  "button.secondaryBackground": "#353749",
  "button.secondaryForeground": "#cdd6f4",
  "button.secondaryHoverBackground": "#454959",

  // Badges
  "badge.background": "#353749",
  "badge.foreground": "#cdd6f4",

  // Checkboxes
  "checkbox.background": "#212121",
  "checkbox.foreground": "#87afaf",
  "checkbox.border": "#3b3b3b",

  // Progress bar
  "progressBar.background": "#87afaf",

  // ============================================
  // BREADCRUMBS / LINKS
  // ============================================
  "breadcrumb.background": "#181818",
  "breadcrumb.foreground": "#585b70",
  "breadcrumb.focusForeground": "#87afaf",
  "breadcrumb.activeSelectionForeground": "#87afaf",
  "breadcrumbPicker.background": "#212121",

  "textLink.foreground": "#87afaf",
  "textLink.activeForeground": "#97bfbf",
  "textSeparator.foreground": "#3b3b3b",

  // ============================================
  // SEARCH / FIND
  // ============================================
  "searchEditor.findMatchBackground": "#35374966",
  "searchEditor.findMatchBorder": "#87afaf66",
  "searchEditor.textInputBorder": "#3b3b3b",
  "search.resultsInfoForeground": "#cdd6f4",

  // ============================================
  // PICKER / COMMAND PALETTE
  // ============================================
  "pickerGroup.foreground": "#87afaf",
  "pickerGroup.border": "#3b3b3b",

  // ============================================
  // MENU
  // ============================================
  "menu.background": "#212121",
  "menu.foreground": "#cdd6f4",
  "menu.border": "#3b3b3b",
  "menu.selectionBackground": "#353749",
  "menu.selectionForeground": "#cdd6f4",
  "menu.separatorBackground": "#3b3b3b",
  "menubar.selectionBackground": "#353749",
  "menubar.selectionForeground": "#cdd6f4",

  // ============================================
  // SETTINGS
  // ============================================
  "settings.headerForeground": "#cdd6f4",
  "settings.modifiedItemIndicator": "#87afaf",
  "settings.focusedRowBackground": "#35374966",
  "settings.dropdownBackground": "#212121",
  "settings.dropdownBorder": "#3b3b3b",
  "settings.textInputBackground": "#212121",
  "settings.textInputBorder": "#3b3b3b",
  "settings.numberInputBackground": "#212121",
  "settings.numberInputBorder": "#3b3b3b",

  // ============================================
  // PEEK VIEW
  // ============================================
  "peekView.border": "#87afaf",
  "peekViewEditor.background": "#212121",
  "peekViewEditorGutter.background": "#212121",
  "peekViewEditor.matchHighlightBackground": "#35374966",
  "peekViewEditor.matchHighlightBorder": "#87afaf66",
  "peekViewResult.background": "#212121",
  "peekViewResult.fileForeground": "#cdd6f4",
  "peekViewResult.lineForeground": "#cdd6f4",
  "peekViewResult.matchHighlightBackground": "#35374966",
  "peekViewResult.selectionBackground": "#353749",
  "peekViewResult.selectionForeground": "#cdd6f4",
  "peekViewTitle.background": "#212121",
  "peekViewTitleLabel.foreground": "#cdd6f4",
  "peekViewTitleDescription.foreground": "#585b70",

  // ============================================
  // SCROLLBAR / MINIMAP
  // ============================================
  "scrollbar.shadow": "#00000066",
  "scrollbarSlider.background": "#3b3b3b66",
  "scrollbarSlider.hoverBackground": "#3b3b3b99",
  "scrollbarSlider.activeBackground": "#3b3b3bcc",

  "minimap.background": "#181818",
  "minimap.selectionHighlight": "#35374999",
  "minimap.findMatchHighlight": "#87afaf66",
  "minimapSlider.background": "#3b3b3b33",
  "minimapSlider.hoverBackground": "#3b3b3b66",
  "minimapSlider.activeBackground": "#3b3b3b99",

  // ============================================
  // WELCOME / WALKTHROUGH
  // ============================================
  "welcomePage.background": "#181818",
  "welcomePage.tileBackground": "#212121",
  "welcomePage.progress.background": "#212121",
  "welcomePage.progress.foreground": "#87afaf",
  "walkThrough.embeddedEditorBackground": "#212121",

  // ============================================
  // COMMAND CENTER
  // ============================================
  "commandCenter.background": "#212121",
  "commandCenter.foreground": "#cdd6f4",
  "commandCenter.inactiveForeground": "#585b70",
  "commandCenter.activeForeground": "#87afaf",
  "commandCenter.activeBackground": "#353749",
  "commandCenter.border": "#3b3b3b",
  "commandCenter.inactiveBorder": "#3b3b3b",
  "commandCenter.activeBorder": "#87afaf",

  // ============================================
  // DEBUG TOOLBAR
  // ============================================
  "debugToolBar.background": "#212121",
  "debugToolBar.border": "#3b3b3b",

  // ============================================
  // CHAT / INTERACTIVE
  // ============================================
  "chat.slashCommandBackground": "#212121",
  "chat.avatarBackground": "#212121",
  "interactive.activeCodeBorder": "#87afaf",
  "interactive.inactiveCodeBorder": "#3b3b3b",

  // ============================================
  // TABLE / MISC
  // ============================================
  "table.headerBackground": "#212121",
  "table.headerForeground": "#cdd6f4",

  // Sash (panel resize)
  "sash.hoverBorder": "#87afaf",

  // GitLens
  "gitlens.gutterBackgroundColor": "#2121214d",

  // Symbol icons (keep Catppuccin accent colors but make folder/file use palette)
  "symbolIcon.folderForeground": "#87afaf",
  "symbolIcon.fileForeground": "#cdd6f4",
};
import { getTokenColors } from "./tokenColors";
import { getSemanticTokens } from "./semanticTokens";
import { getUiColors } from "./uiColors";

export const defaultOptions: ThemeOptions = {
  accent: "mauve",
  boldKeywords: true,
  italicComments: true,
  italicKeywords: true,
  colorOverrides: {},
  workbenchMode: "default",
  bracketMode: "rainbow",
  extraBordersEnabled: false,
  customUIColors: {},
  syncWithIconPack: true,
};

export const compileTheme = (
  flavor: CatppuccinFlavor | "dark" = "mocha",
  options: ThemeOptions = defaultOptions,
) => {
  // Handle custom "dark" flavor as mocha with overrides
  const baseFlavor = flavor === "dark" ? "mocha" : (flavor as CatppuccinFlavor);
  const flavorData = flavors[baseFlavor];
  const ctpPalette = {} as CatppuccinPalette;
  const paletteAnsi = {
    normal: {},
    bright: {},
  } as CatppuccinPaletteAnsi;

  for (const [k, v] of flavorData.colorEntries) {
    ctpPalette[k] = v.hex;
  }
  for (const [k, v] of flavorData.ansiColorEntries) {
    paletteAnsi.normal[k] = v.normal.hex;
    paletteAnsi.bright[k] = v.bright.hex;
  }

  const palette: CatppuccinPalette = {
    ...ctpPalette,
    // Apply dark overrides if dark flavor
    ...(flavor === "dark" ? darkColorOverrides : {}),
    ...options.colorOverrides?.all,
    ...options.colorOverrides?.[baseFlavor],
  };

  const context: ThemeContext = {
    flavor: baseFlavor,
    palette,
    paletteAnsi,
    options,
    isLatte: baseFlavor === "latte",
  };

  const uiColors = getUiColors(context);
  const tokenColors = getTokenColors(context);

  // Apply dark-specific UI color overrides
  const finalUiColors =
    flavor === "dark" ? { ...uiColors, ...darkUIColorOverrides } : uiColors;

  // Apply dark-specific token color overrides for comments
  // Using muted fg #585b70 for comments to match palette
  const finalTokenColors =
    flavor === "dark"
      ? tokenColors.map((token) => {
          // Override comment color to muted foreground
          if (
            token.scope &&
            (Array.isArray(token.scope)
              ? token.scope.some((s) => s.includes("comment"))
              : token.scope.includes("comment"))
          ) {
            return {
              ...token,
              settings: { ...token.settings, foreground: "#585b70" },
            };
          }
          return token;
        })
      : tokenColors;

  return {
    name:
      flavor === "dark" ? "Catppuccin Dark" : `Catppuccin ${flavorData.name}`,
    type: context.isLatte ? "light" : "dark",
    colors: finalUiColors,
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(context),
    tokenColors: finalTokenColors,
  };
};
